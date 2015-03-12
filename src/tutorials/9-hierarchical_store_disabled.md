## Hierarchical Stores

Hierarchical stores define a mechanism for acccessing data that has parent-child relationships. The dstore interface defines an API for accessing children and root-level objects, and this can be consumed by [dgrid](http://dgrid.io/) tree grids.

There are two primary approaches to hierarchical data. The first approach is to have objects store a reference to their parent object. The second approach is to have objects have a property with an array of references to children objects.

### Parent-Based Hierarchy
Generally, the first approach is easier to implement, more scalable, and works well with dstore's notifications as well as back-end databases. We will look at this first. Again, each child object should have a `parent` property, that references the parent of the child. dstore includes a mixin, `dstore/Tree` that actually implements the hierarchical methods of dstore, for data that follows this pattern. If we provide data with `parent` properties, we can create a store (that can drive a dgrid tree(, by constructing a store with the `Tree` as mixin, and then using that with a grid:
```js
require(['dojo/_base/declare', 'dstore/Memory', 'dstore/Tree', 'dgrid/OnDemandGrid', 'dgrid/tree'],
		function (declare, Memory, Tree, Grid, tree) {
	var hierarchicalStore = new (declare([Memory, Tree]))({
		data: [
			{id: 1, name: 'One', parent: null},
			{id: 1.1, name: 'One point one', parent: 1},
			{id: 2, name: 'Two', parent: null},
			{id: 2.1, name: 'Two point one', parent: 2},
			{id: 2.2, name: 'Two point two', parent: 2},
			{id: 2.3, name: 'Two point three', parent: 2},
		]
	})
	var treeGrid = new Grid({
		columns: {
			name: tree({
				label: 'Name'
			})
		}
	});
});
```
To understand how this works, let's take a look at the `dstore/Tree`. This code can be an excellent starting point for creating your own hierarchical implementation. To implement the tree hierarchy, the first method that needs to be defined is `getChildren`. This method is called with a parent object, and should return a collection, representing the children of that parent. In `dstore/Tree` this is implementing by filtering for objects that match a given `parent` property value. Filtering on a store, for the children of parent objects could be implemented like this:

```js
getChildren: function (object) {
	return this.filter({
		parent: object ? this.getIdentity(object) : null
	});
}
```

However, one problem with this is that if we were to progressively call `getChildren()` again on the collection returned from `getChildren()`, we would end applying to filters with different parents, which would alwasy yield no results. What we really want is to always apply the filter to the original collection. We can do this by simply defining a property that will point to original collection, in the constructor. Once this property is defined, it will be copied/inherited by all sub-collections. We can then reference the original collection in our `getChildren` method:
```js
constructor: function () {
	this.root = this;
},
getChildren: function (object) {
	return this.root.filter({
		parent: object ? this.getIdentity(object) : null
	});
}
```
Once we have defined this key method, there are a couple of other methods that we can optionally provide. We can define a `mayHaveChildren` to can return whether or not it is possible that an object has a children. This can be useful when some node are known to be leaf nodes, and no children queries should be performed on them. We could alsow implement a getRootCollection() to return a collection of only the root-level objects. This can be done by filtering for objects that have no parent (or a null value for the `parent` property):
```js
mayHaveChildren: function (parent) {
	return parent.hasChildren;
},

getRootCollection: function () {
	return this.getChildren(null);
},
```
The parent-based approach is relatively simple to implement, it works equally well with client-side stores, including `dstore/Memory` as well as server side including `dstore/Request` and its subclass, `dstore/Rest`. It also works with with `Trackable` mixin, with notifications properly designating children repositioning if their parent refernece is changed. It also maps nicely to back-end databases that can index on a parent property, for fast (`O(log(n))`) access to data.

<a class="button" href="demo/treeGrid/parent_based.html">See the demo.</a>

### Children-Based Hierarchy
Next, we will look at the second approach, where objects have a property with children references. This can be useful as an easy way to define hierarchy for in memory. This can also be helpful where natural ordering of the children is important. This can also be used in situations where a child may have multiple parents. Let's again start with the `getChildren` method. The `getChildren` is a kind of query method, in that we provide parameters, and it returns a new collection representing the computed results. Previously we had implemented `getChildren` by simply delegating to the `filter` query method which handled creating a new dstore collection for us. In this, case we need to create our new query method, as this type of data computation can not be expressed merely in terms of another query method. We will use the `dstore/QueryMethod` to construct our query method. We give it a distinct query method `type` of `"children"`. 

Individual query methods are handled by the different stores. The `dstore/Memory` store uses the query engine (`dstore/objectQueryEngine`) to execute different query methods and the `dstore/Request` store uses render methods to convert query methods into URL query parameters. We could add a new method to the query engine, or a new render method to support our new query method. Or, `QueryMethod` allows us to directly inline specify a query function (which receives the quer arguments, and returns a function that can be applied to a collection, returning a new array of data), for use with client-side stores. Since we are using the `Memory` store, we can safely use this approach:
```js
	getChildren: new QueryMethod({
		type: 'children',
		querier: function (parent) {
			return function () {
				return parent.children;
			};
		}
	})
```

Continuing on with the other hierarchical methods, `mayHaveChildren` could simply check for the presence of the `children` property (the property that holds the array of children). And since we are now using arrays of references to define sets of children, we can do the same thing to define the root collection. We can define a root array, and implement `getRootCollection` as a call to `getChildren` with a psuedo root object:
```js
	mayHaveChildren: function (parent) {
		return 'children' in parent;
	},
	rootObjects: [
		// array of root-level objects
	],
	getRootCollection: function () {
		// create and pass in pseudo root object
		return this.getChildren({
			children: this.rootObjects
		});
	},
```
Again, this approach can be beneficial if we need to keep an ordered array of children. But again, remember, that our query method is a specific to client-side querying. We would need to add a render method if we were to use this with a server-side store. One other complication with this approach is that the `Trackable` mixin, which is designed to track data changes, and their index position, will not be aware of the modifications to the `children` arrays of parent objects, and how it affects children objects and their position in children collections. Such modifications will require more explicit handling or refreshing by UI components.

<a class="button" href="demo/treeGrid/child_based.html">See the demo.</a>

### Conclusion

dstore is designed to work well with hierarchical data, providing an out-of-the-box `Tree` mixin, and tested compatability with the latest dgrid version. We have covered the two major approaches to structuring hierarchical data, and you can use the provided components, or build your own hierarchical extensions.