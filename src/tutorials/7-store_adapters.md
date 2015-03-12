## Using Dojo stores with dstore
dstore is an object store API designed to join data consumers with data providers and replaces the Dojo object store API.  You may have stores and widgets built using the Dojo object store API but would like to start using dstore.  Here we will look at how the dstore object store interface and Dojo object store interface can be adapted to work together allowing you to make a gradual transition to dstore.

### What is different?

The Dojo store and dstore interfaces have similarities.  For example, they have identical `get(id)`, `add(object, directives)` and `remove(id)` methods.  But where are they different?

The differences lie in how to query the stores for data.  In the Dojo object store interface, you call `query(query, options)` to search for data in your store using the `query` parameter to filter the data and the `options` parameter to control paging and sorting.

```js
employeeStore.query({department:'sales'}, {
	sort:[{attribute:'state', descending: false}],
	start: 0,
	count: 10
}).forEach(function(employeeName){
	employeeView.add(employeeName);
});
```

Filtering, sorting and paging are done in dstore by calling individual methods.

```js
employeeStore.filter({department:'sales'})
	.sort('state', false)
	.forEach(function(employeeName){
		employeeView.add(employeeName);
	});
```

Because of the differences, a widget that expects a Dojo object store will not work properly when handed a dstore object store.  dstore includes adapter modules that helps eliminate the differences: `dstore/legacy/StoreAdapter` and `dstore/legacy/DstoreAdapter`.

### StoreAdapter

When you need to use a Dojo object store but want to use the dstore API, modify the legacy store using `dstore/legacy/StoreAdapter`. The module provides a wrapper to adapt a Dojo object store class. To use the wrapper, we construct an adapter instance:

```js
require[
	'dojo/_base/declare',
	'dojo/store/Memory',
	'dstore/legacy/StoreAdapter'
], function(declare, Memory, StoreAdapter){
	// Create employeeData array here

	var employeeStore = new StoreAdapter({
		objectStore: new Memory({
			data: employeeData
		})
	});

	employeeStore.sort('state')
		.filter({department:'sales'})
		.forEach(function(employeeName){
			employeeView.add(employeeName);
		});
});
```

<a class="button" href="demo/store_adapters.html">View Demo</a>

### DstoreAdapter

When using a dstore object store with a component that only accepts a Dojo object store, modify the dstore object store using `dstore/legacy/DstoreAdapter`.  The module provides a mixin to adapt a dstore object store class.  Use `declare` to combine the adapter with the class:

```js
require[
	'dojo/_base/declare',
	'dgrid/OnDemandGrid',
	'dstore/Rest',
	'dstore/legacy/DstoreAdapter'
], function(declare, OnDemandGrid, Rest, DstoreAdapter){
	var AdaptedRestStore = declare([Rest, DstoreAdapter]);
	var employeeStore = new DstoreAdapter(new Rest({
		// Configure the Rest store
	});

	var grid = new OnDemandGrid({
		store: employeeStore,
		columns: {
			name: 'Employee Name',
			state: 'State',
			department: 'Department'
		}
	}, 'grid');
});
```

<a class="button" href="demo/store_adapters.html">View Demo</a>

### StoreSeries

To populate a Dojox chart with data from a dstore object store, use the `dstore/charting/StoreSeries` class to adapt the store:

```js
// Adds a StoreSeries to the y axis. All items are include in the chart
// and the "value" property from each item is plotted.
chart.addSeries('y', new StoreSeries(store));
```

The second parameter to the `StoreSeries` constructor indicates what data should be retrieved from each store item and plotted on the chart.  If the parameter is a string, then that string is the name of the store item's property.  When the second parameter is omitted, "value" is used by default.

```js
// Plot each employee's sales total.
chart.addSeries('y', new StoreSeries(employeeStore, 'salesTotal'));
```

A function can also be passed to the `StoreSeries` constructor that returns the data to be plotted for each item:

```js
// Plot each employee's progress towards their sales goal.
chart.addSeries('y', new StoreSeries(employeeStore, function(employee){
		return employee.salesGoal - employee.salesTotal;
}));
```

<a class="button" href="demo/store_adapters.html">View Demo</a>

### Conclusion

The dstore library contains the tools you need to make a smooth transition from Dojo object stores to dstore object stores.  Review the dstore documentation referenced below to learn more about the capabilities of dstore.

### Additional Resources

* [dstore Documentation](https://github.com/SitePen/dstore/blob/master/README.md)