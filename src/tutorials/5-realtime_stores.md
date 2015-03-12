## Realtime Stores

In this tutorial we are going to build on what we learned in the [introduction](index.html) to dstore. Once we query a store and get a new collection back, we can call `forEach` on the collection and iterate through the result set and call `on` to setup listeners for events associated with data changes. For example:

```js
require(['dojo/dom', 'dojo/dom-construct', 'dojo/domReady!'], function(dom, domConstruct){
	function viewResults(results){
		var container = dom.byId('container');

		// functions called within observe callback below
		function addRow(market, before){
			// add or insert row into DOM
			domConstruct.create('div', {
				innerHTML: market.name + ' index: ' + market.index.toFixed(2) +
					' at: ' + market.date.toLocaleTimeString(),
				id: 'market-' + market.id
			}, before || container, before ? 'before' : 'append');
		}
		function deleteRow(id){
			// remove row from DOM and array (splice returns the removed items)
			domConstruct.destroy('market-' + id);
		}

		// add initial items, and handle future changes
		results.forEach(function(object){
			addRow(object);
		});
		results.on('delete', function(event){
			deleteRow(event.id);
		});
		results.on('add', function(event){
			addRow(event.target);
		});
		results.on('update', function(event){
			// find where to insert
			var nextElement = dom.byId(event.target.id).nextSibling;
			// to update, we delete and then add (in the same place)
			deleteRow(event.target.id);
			addRow(event.target, nextElement);
		});
	}

	// We pass the full store as the collection to render. We can do this,
	// or query/filter it first.
	viewResults(marketStore);
});
```

The essential way to monitor store data is by registering listeners for the `delete`, `add`, and `update` events. The `delete` event object includes an `id` property to indicate the id of the object that was deleted. The `add` and `update` events include a `target` property, which is the object that was updated or added. In the preceding example, we add all new objects to the end of the collection, and when an object is updated, its position is retained in the DOM.

### Tracking Position

The approach above deals with changes in a relatively simple way. Added objects always go at the end, and updated objects stay in place. However, we may want more precise direction about where objects should be located. If we have a sorted collection, updates or new objects might need to be placed in a specific position according to the collection's sorted order. We can add support for tracking the position of updates by using the Trackable mixin. With the Trackable mixin added to a store, we can call the store's `track` method to get a collection that includes index information in its `delete`, `add`, and `update` events.

With index information available to us, we can take a different approach to updating the UI, keeping track of rows using an array and moving elements to the appropriate index based on the event information:

```js
require(['dojo/dom', 'dojo/dom-construct', 'dojo/domReady!'], function(dom, domConstruct){
	function viewResults(results){
		var container = dom.byId('container');
		var rows = [];

		// functions called within observe callback below
		function addRow(market, i){
			// insert row into DOM, and also into our internal array
			var nextElement = rows[i],
				referenceNode = nextElement || container,
				position = nextElement ? 'before' : 'append',
				marketElement = domConstruct.create('div', {
					innerHTML: market.name + ' index: ' + market.index.toFixed(2) +
						' at: ' + market.date.toLocaleTimeString(),
				}, referenceNode, position);
			rows.splice(i, 0, marketElement);
		}
		function deleteRow(i){
			// remove row from DOM and array (splice returns the removeed items)
			domConstruct.destroy(rows.splice(i, 1)[0]);
		}

		// add initial items, and handle future changes
		results.forEach(addRow);
		results.on('delete, add, update', function(event){
			if(event.previousIndex > -1){
				// if we have a previous index (the case of delete or update)
				// we delete that row
				deleteRow(event.previousIndex);
			}
			if(event.target){
				// if we have a new object, insert it with the index
				// (the case of update or add)
				addRow(event.target, event.index);
			}
		});
	}

	var trackedCollection = marketStore.track();
	viewResults(trackedCollection);
});
```

By mixing in the `Trackable` store and using `track()` to create a tracked collection, we can utilize index information on the events. Each event now contains the following additional properties:

* <strong>`previousIndex`:</strong> This is the index of where the object was previously located (if it was deleted or updated) in the collection. This will be undefined if the object did not previously have a known index in the collection.
* <strong>`index`:</strong> This is the index of where the object is now located (if it was added or updated) in the collection. This will be undefined if the object does not have a known index in the collection.

The index information helps us understand how changes relate to the current collection, because the meaning of each notification is contextualized to its collection. A notification that indicates that an object was inserted (with no previous index) to the result set does not necessarily imply that the object was just created; it could have been created or updated in such a way that it now belongs to the result set. The same is true of an event with a previousIndex, but no index value; the object may have been updated or deleted to trigger removal from the current (possibly filtered) collection.

_**Note**: that the `index` position applies to the result set after the `previousIndex` position has been deleted (and the array may be shifted)._

This functionality&mdash;providing notification of changes to the underlying data&mdash;is available in any store that provides a `track` method on its collections.  The easiest way to add this functionality to a store is to mix in the `Trackable` class. As an example, we create a class composed from `Memory` and `Trackable` and instantiate it with a sample data set:

```js
require(['dstore/Memory', 'dstore/Trackable', 'dojo/_base/declare'],
		function(Memory, Trackable, declare){
	var data = [
		{'name': 'Dow Jones', 'index': 12197.88, 'date': new Date()},
		{'name': 'Nasdaq', 'index': 2730.68, 'date': new Date()},
		{'name': 'S&P 500', 'index': 1310.19, 'date': new Date()}
	];
	// mixin Trackable to enable position tracking:
	var TrackableMemory = declare([Memory, Trackable]);
	// create the store with the data
	marketStore = new TrackableMemory({data: data, idProperty: 'name'});
});
```

<a class="button" href="demo/realtime_stores.html">View Demo</a>

Now whenever we locally initiate a modification to data via `put`, `add`, or `delete` calls, notifications can be delivered to the view renderer so it can automatically update the view.

### Remotely-Initiated Notifications

Mixing in `Trackable` enabled position information for tracked collections. However, if you are creating a Comet-style real-time application, you may also have notifications that have originated from other users and are being delivered from the server. In this case, it no longer makes sense to do `put`, `add`, and `delete` calls&mdash;since these signify operations performed by the local user, which need to be sent to the server. With server-initiated calls, we don't want the update operation sent back to the server as the server already knows about the change, and suppressing these "echoes" can actually be somewhat challenging to implement on the server.

Because of this, we actually want to directly emit notification events ourselves. The `Trackable` mixin is designed to handle notifications regardless of where they originate from. The primary difference between a `put` call and emitting a data event is that a `put` is _requesting a change to take place_, whereas a emitting an event indicates _that a change already took place_.

To emit notification events, we can call the `emit` method on the base store, passing the same type of event object that we expected to receive in the first example. For example:

```js
marketStore.emit('update', {
	target: {'date': '2008-02-29', 'name': 'Dow Jones', 'index': 12197.88}
);
```

For our demonstration, we emulate remote trigger with a simple random `setInterval` function:

```js
setInterval(function(){
	// choose a market randomly
	var market = data[Math.floor(Math.random() * 3)];
	// change it randomly
	market.index += Math.random() - 0.5;
	// update date
	market.date = new Date();
	// notify of the change
	marketStore.emit('update', {target: market});
}, 1000); // every second
```

<a class="button" href="demo/realtime_stores.html">View Demo</a>

Since emitting events is commonly coupled with Comet-driven messaging, let's look at how we can use this with [dojox/socket](http://www.sitepen.com/blog/2012/11/05/dojo-websocket-with-amd/), which provides Comet-style communication based on WebSockets with fallback to XHR long-polling. `dojox/socket` allows us to connect to a server using WebSocket or XHR with long-lived connection, and asynchronously receive messages from a server when they are available. Here we create a socket connection and use the messages from the server to notify the store of updates:

```js
require(['dojox/socket'], function(Socket){
	var socket = Socket('/comet');
	socket.on('message', function(event){
		var data = event.data;
		store.emit(data.action, {target: data.object, id: data.id});
	});
});
```
### Implementing your own `track` method

There may be situations where it is more efficient to directly implement your own `track` method. This can be important if you have specialized caching or notification schemes, or if you implement new querying methods in addition to `delete`, `add`, and `update`. We can simply implement the `track` method on our store, and it will be present on subcollections returned by the query methods.

### Conclusion

The notification event pattern in the dstore interface provides a powerful foundation for delivering real-time updates integrated with the data model. Data viewers can connect to query results without any knowledge of how the data change. With a consistent API, viewers can respond to these data changes regardless of whether they were initiated locally or relayed via a remote service.
