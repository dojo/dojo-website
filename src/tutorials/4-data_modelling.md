## Data Modelling in MVC

The Model-Viewer-Controller (MVC) is a dominant paradigm for application development. The MVC approach separates key common concerns for organized, manageable application code. Dojo is has long been driven by MVC principles, and [dstore](https://github.com/SitePen/dstore/) continues to provide a solid infrastructure for MVC applications. Here we will see how we can leverage dstore [stores](https://github.com/SitePen/dstore/blob/master/docs/Store.md) to create a robust model that can be used in the view and controller code.

### Models

The data model, the M in MVC, represents the core interface that your application is using to access and manipulate data. The model is the center of your application, the viewer and controller serve to connect the user with the data model in a friendly way. The model encapsulates the storage and validation concerns of your application.

The store and object modelling architecture fulfill the role of data model within Dojo applications. The store interface provides an API for interacting with a collection of objects, and the object data model provides an API for interacting with a single object. These interfaces are designed to separate the data concerns from the rest of the application. Different storage mediums, behaviors, and validation rules may be used without changing the data interface. Stores can be extended to provide far more than just storage capability. Let's look at constructing a basic store. We will use the `Rest` class to create our store, and add caching of our objects:

```js
require(['dstore/Rest', 'dstore/Cache', 'dojo/_base/declare'],
		function(Rest, Cache, declare){
	var CachedRest = declare([Rest, Cache]);
	var inventoryStore = new CachedRest({
		target: '/Inventory/'
	});
```

Now our inventoryStore represents our basic data model. We can retrieve data with `get()`, query with `filter()` and `sort()`, retrieve results with `forEach()`, `fetch()`, or `fetchRange()`, and modify with `put()` and `add()`. The store encapsulates the storage of this information, by handling the server interaction.

Our viewer can be connected to query results collection:

```js
var inStock = inventoryStore.filter({inStock: true});
viewResults(inStock);

// pass the results on to the view
function viewResults(results){
	var container = dom.byId('container');

	// results object provides a forEach method for iteration
	results.forEach(addRow);

	function addRow(item){
		var row = domConstruct.create('div',{
			innerHTML: item.name + ' quantity: ' + item.quantity
		}, container);
	}
}
```

Now our `viewResults` function acts as a viewer for the data model. We could also leverage `dojo/string`'s `substitute` function to do simple templating:

```js
function addRow(item){
	var row = domConstruct.create('div',{
		innerHTML: string.substitute(tmpl, item);
	}, container);
}
```

### Collection Data Binding

One important aspect of MVC is that viewers should monitor the data model, ready to respond to changes. This allows the controllers to avoid unnecessary couplings to the viewer. The controller should update the model, and then the viewer will observe and respond to this change. We can observe our collection by listening for `add`, `update`, and `delete` events:

```js
function viewResults(results){
	var container = dom.byId('container');
	var rows = [];

	results.forEach(insertRow);

	results.on('add', function(event){
		insertRow(event.target);
	});
	results.on('update', function(event){
		removeRow(event.target.id);
		insertRow(event.target);
	});
	results.on('delete', function(event){
		removeRow(event.id);
	});

	function insertRow(item){
		return domConstruct.create('div', {
			innerHTML: item.name + ' quantity: ' + item.quantity,
			className: 'item',
			id: item.id
		}, container);
	}

	function removeRow(id){
		domConstruct.destroy(id.toString());
	}
}
```

<a class="button" href="demo/dataModelling/data_modelling.html">View Demo</a>

We now have a view that can respond directly to model changes and our controller code can make changes to the data in the store in response to user interaction. The controller could call `put()`, `add()`, and `remove()` methods to affect changes. Typically controller code is concerned with handling events, so for example, we can create a new data object when a user clicks on the add button:

```js
on(addButton, 'click', function(){
	inventoryStore.add({
		name: 'Shoes',
		category: 'Clothing',
		quantity: 40
	});
});
```

<a class="button" href="demo/dataModelling/data_modelling.html">View Demo</a>

This will trigger an update in the view, and we don't need to directly interact with the view at all. This controller code is solely concerned with responding to user actions and controlling the model. The model's data storage and the view's rendering are completely separated from this code.

#### Hierarchy

As we add logic to our data model, we are adding meaning to our raw data. One of the meanings we can add to our data model is the exposure of hierarchy. The store may define a `getChildren()` method that we can implement to make parent-child relationships visible. There are different ways we can store these relationships.

Stored objects can hold an array of references to children. This can be a good design where small ordered lists are needed. Alternatively, objects can keep track of their parent. The latter is a more scalable design.

To implement the latter approach, we can simply add a `getChildren()` method to the store. In this example our hierarchy will come from having category objects that have individual items as children. We will create a `getChildren()` method that will find all objects whose category property matches the name of the parent object, therefore having the child/parent relationship defined as a property of the child.

```js
inventoryStore = new CachedRest({
	target: '/Inventory/',
	getChildren: function(parent){
		return this.filter({
			category: parent.id
		});
	},
	Model: ...
};
```

Now, hierarchical viewers can call `getChildren()` to get a list of children for an object without needing to understand the structure of the data. Retrieval of children might look like:

```js
inventoryStore.get('food').then(function(foodCategory){
	// retrieved the food category object, now get it's children
	inventoryStore.getChildren(foodCategory).forEach(function(food){
		// handle each item in the food category
	});
});
```

We can get the children of an object, now let's look at how to alter the collection of children of an object. When working with the inventoryStore we know that hierarchy is defined by the category property. If we want to move an item to be a child of a different category, we can simply change the category property.

```js
donut.set('category', 'Junk Food');
inventoryStore.put(donut);
```

One of the key concepts with Dojo stores is to provide a consistent interface between data models and other components. If we want our hierarchy to be defined in such a way that components can set the parent of an object without knowledge of the internal structure of the objects, we can use the `parent` property of the `options` parameter to the `put()` method:

```js
inventoryStore = new CachedRest({
	put: function(object, options){
		if(options.parent){
			object.category = options.parent;
		}
		return this.inherited(arguments);
	},
	...
};
```

Now we could change the parent:

```js
inventoryStore.put(donut, {parent: 'Junk Food'});
```

#### Transactional

Transactions are a critical part of many applications, and application logic often needs to define what operations need to be combined atomically. One approach to transactions is to collect all the operations during a transaction and send them all inside a single request when the transaction is committed. Here is an example of how we can do that:

```js
require(['dojo/_base/lang', 'dojo/request'],
		function(lang, request){
	lang.mixin(inventoryStore, {
		transaction: function(){
			// start a transaction, create a new array of operations
			this.operations = [];
			var store = this;
			return {
				commit: function(){
					// commit the transaction, sending all the operations in a single request
					return request.post('/Inventory/', {
						// send all the operations in the body
						data: JSON.stringify(store.operations)
					});
				},
				abort: function(){
					store.operations = [];
				}
			};
		},
		put: function(object, options){
			// ... any other logic ...

			// add it to the queue of operations
			this.operations.push({action:'put', object:object});
		},
		remove: function(id){
			// add it to the queue of operations
			this.operations.push({action:'remove', id:id});
		}
	});
```

And we could then create our custom operation that makes use of the transactions:

```js
removeCategory: function(category){
	// atomically remove entire category and the items within the category
	var transaction = this.transaction();

	var store = this;
	this.getChildren(category).forEach(function(item){
		// remove each child
		store.remove(item.id);
	}, this).then(function(){
		// now remove the category
		store.remove(category.id);
		// all done, commit the changes
		transaction.commit();
	});
}
```

### Summary

By using the dstore architecture, we have a solid data model foundation to build our MVC applications. Viewers can render data models and directly monitor and respond to changes in the data. Controllers can interact with data in a consistent manner without coupling to specific data structures, and without explicitly manipulating viewers. Collection and entity interfaces are clearly distinguished. All of this comes together to help you build organized, manageable applications with clean separation of concerns that can rapidly evolve.