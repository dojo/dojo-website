## Store Driven Tree

The [Dojo `Tree` component](http://dojotoolkit.org/reference-guide/dijit/Tree.html) provides a comprehensive, familiar, and intuitive drill-down presentation of hierarchical data. `Tree` supports lazy loading of branches, making it highly scalable for large data sets. It is a great widget to use when data have parent-child relationships.

Here we will learn how to use the new dstore interface with `Tree`. In this tutorial, we use a data source that provides information on the US government structure and display the information in a Tree in order to easily descend into child sections and collapse sections we're not working with. We start with existing store classes and add hierarchical behavior that will be used by `Tree` for lazy loading. This will demonstrate how to separate the data model concerns from the presentation.

The first example uses a static tree with the data sourced from a single JSON file. This can be used to provide navigation through data. The final example shows how data can be lazy-loaded.

### Tree with a Static Store

A static store is well-suited for a tree with a limited size. In this example, clicking on the tree nodes displays a related image.

The first step is to create the data. We will use the Memory store, which means that the store data is JSON-encoded, and can contain supporting information. In this case, the `name` is used to label each node of the tree. This tree has four `items`, and each has a `name` and an `id`.


```js
{
	"name": "US Government",
	"id": "root",
	"children": [
		{
			"name": "Congress",
			"id": "congress"
		},
		{
			"name": "Executive",
			"id": "exec"
		},
		{
			"name": "Judicial",
			"id": "judicial"
		}
	]
}
```

A tree is served data from an object implementing the [dijit/tree/model](http://dojotoolkit.org/reference-guide/dijit/tree/Model.html) interface. In this example we will be adapting a dstore store to work with this interface.

In order to do this, we also need to define the model logic that describes the hierarchy within our data. `Tree` requires five model methods to render data as a tree:

* `getIdentity(object)` - Already provided by the store and doesn't usually need to be reimplemented.
* `mayHaveChildren(object)` - Indicates whether or not an object may have children (prior to actually loading the children). In this example, we will treat the presence of a `children` property as the indication of having children.
* `getChildren(parent, onComplete, onError)` - Called to retrieve the children. This may execute asynchronously and should call the onComplete callback when finished. In this example, we will do a get() to retrieve the full representation of the parent object to get the children. Once the parent is fully loaded, we return the `children` array from the parent.
* `getRoot(onItem)` - Called to retrieve the root node. The onItem callback should be called with the root object. In this example, we get() the object with the id/URL of "root" for the root object.
* `getLabel(object)` - Returns the label for the object (this is the text that is displayed next to the node in the tree). In this example, the label is just the `name` property of the object.

The code below creates a `Memory` store, defining these methods to match the interface expected by `Tree`. Finally, the `onLoad` and `onClick` events are used to display the associated image.

```js
require([
	'dojo/dom', 'dojo/json', 'dstore/Memory',
	'dijit/Tree', 'dojo/text!./data/static', 'dojo/domReady!'
], function(dom, JSON, Memory, Tree, data){
	// set up the store to get the tree data
	var governmentStore = new Memory({
		data: [ JSON.parse(data) ],
		getChildren: function(object, onComplete){
			return onComplete(object.children || []);
		},
		mayHaveChildren: function(item){
			return 'children' in item;
		},
		getRoot: function(onItem, onError){
			// there should be only a single object in (the root of) this collection,
			// so we just return that
			this.forEach(onItem);
		},
		getLabel: function(object){
			return object.name;
		}
	});

	// set up the tree, assigning governmentStore
	var governmentTree = new Tree({
		model: governmentStore,
		onOpenClick: true,
		onLoad: function(){
			dom.byId('image').src = '../resources/images/root.jpg';
		},
		onClick: function(item){
			dom.byId('image').src = '../resources/images/'+item.id+'.jpg';

		}
	}, 'divTree');
	governmentTree.startup();
});
```

<a class="button" href="demo/storeTree/store_driven_tree_basic.html">View Demo</a>

### Lazy Loading Tree

When data sets become large, it's better to fetch items from the server as needed (a.k.a. lazy loading), rather than initially downloading all the data. To take advantage of lazy loading, when loading an object with its children, our server provides each child of the object, but only includes enough data in the children to render it. The requested object is a "full" representation of the object. However, for each child only the `name` property (for the label), the `id` property (to identify the object), and a boolean for the `children` property (indicating if it may have children) are included. These child objects are effectively partial representations. This approach to lazy loading ensures that only one request is needed each time a node is expanded (rather than a request for each child node of the expanded node).

The first step, again, is to create the data.  In real life, the data would likely be stored in a database and served by a REST-ful service like Persevere or CouchDB. However, for the purposes of this demo example, we will create data where each tree item is stored in a separate file on the server:

```js
data/
    cabinet
    congress
    exec
    root
```
Further, each item has a stub listing of its children (i.e. listing the name of each child, but not that
child's children). So, the data file for Congress will be called "congress" and will look like this:

```js
{
	"name": "Congress",
	"id": "congress",
	"children": [
		{
			"name": "House of Representatives",
			"id": "house"

		},
		{
			"name": "Senate",
			"id": "senate"
		}
	]
}
```

Next we create our data store. This will be the store that drives the Tree. Here we will use the `Rest` store, which facilitates lazy loading of data. Here is the basic instantiation of the `Rest` store for connecting to our server:

```js
require(['dstore/Rest'], function(Rest) {
	var usGov = new Rest({
		target: 'data/',
		getChildren: function(object, onComplete){
			// object may just be a stub object, so get the full object first and then
			// return its list of children
			this.get(object.id).then(function(fullObject){
				onComplete(fullObject.children);
			});
		},
		... // the rest of the methods can be implemented as in the first example
	});
});
```

Note how `getChildren()` may be passed a stub object like:


```js
{
	"name": "Congress",
	"id": "congress",
	"children": true
}
```

So, in order to get the children, it first needs to fetch the file called "congress":

```js
{
	"name": "Congress",
	"id": "congress",
	"children": [
		{
			"name": "House of Representatives",
			"id": "house"

		},
		{
			"name": "Senate",
			"id": "senate"
		}
	]
}
```

The code to retrieve the root object, and instantiate the tree is similar to that above:


```js
require([
	'dstore/Rest',
	'dijit/Tree', 'dojo/domReady!'
], function(Rest, Tree){
	var usGov = new Rest({
		...
		getRoot: function(onItem){
			this.get('root').then(onItem);
		}
	});

	tree = new Tree({
		model: usGov
	}, 'tree'); // make sure you have a target HTML element with this id
	tree.startup();
});
```

Note that we altered the custom `getRoot()` method to retrieve the root object by id, instead of by query, for simplicity of retrieval. Since our server is merely serving static files, and cannot respond to queries, we overrode the `getRoot()` method to just do a `get()` call.


<a class="button" href="demo/storeTree/store_driven_tree_lazy.html">View Demo</a>

###Conclusion

The `Tree` is designed to properly separate the model concerns from presentation, and the new object store can easily be extended with hierarchical logic to drive the `Tree`. The `Tree` provides important features such as keyboard navigation and accessibility. Also, the `Tree` and object store combination leverages the additional powerful functionality of the `Tree` including scalable lazy loading. We encourage you to [explore the Tree documentation](http://dojotoolkit.org/reference-guide/dijit/Tree.html) in more depth to learn more about the `Tree` capabilities such as styling, icon customization, and its API. In a future tutorial we will look at how to interact with changes to data and how to implement Drag n' Drop support.