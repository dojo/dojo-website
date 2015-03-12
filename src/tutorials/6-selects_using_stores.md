## Advanced Select Using Stores

You should already be familiar with the concepts behind [`dstore`](./index.html); perhaps you have also already observed how some widgets interact with stores. Dijit's select widgets are also capable of working with `dstore` using its adapters.

Select widgets have an optional `store` property; passing a `dojo/store` instance to the select widget via this property will instruct the widget to populate its drop-down list with the items from the specified store. We explore this with the following three select widgets: `dijit/form/Select`, `dijit/form/FilteringSelect`, and `dijit/form/ComboBox`.

In this tutorial we will focus on using dstore stores, which have evolved their interface somewhat from `dojo/store`'s API. Consequently, we will use dstore's `dojo/store` [adapter](https://github.com/SitePen/dstore/blob/master/docs/Adapters.md) to ensure that our stores work properly with Dijit's select widgets.

_**Note**: Fun fact: even when you create a `dijit/form/FilteringSelect` or `dijit/form/ComboBox` from markup, the widget internally converts it to a store!_

To demonstrate select widgets and data stores working together, we will recreate our select widgets for US states programmatically. To keep things simple, we use an instance of [`dstore/Memory`](https://github.com/SitePen/dstore/blob/master/docs/Stores.md), fetching its data from a JSON resource whose contents look something like this:

```js
[
	{ 'abbreviation': 'AL', 'name': 'Alabama' },

	... other 48 states here ...

	{ 'abbreviation': 'WY', 'name': 'Wyoming' }
]
```

Notice that in addition to the name, there is an abbreviation. It will become the "internal value" of each item.

_**Note**: When populating from a store, the `value` of a `dijit/form/Select` or `dijit/form/FilteringSelect` reports the_ identity _of the selected item. (This means that select widgets expect a store which implements getIdentity().)_

Let's say that we have a web page set up with the Claro theme, and that the above JSON resource is available as `states.json` within the same folder as the page. We can instantiate a Memory with an adapter to consume the resource, then create a select widget referencing the store, like so:

##### Select

```html
<body class="claro">
	<div id="stateSelect"></div>

	<script>
		require(['dijit/form/Select', 'dstore/Memory', 'dstore/DstoreAdapter',
			'dojo/json', 'dojo/text!./states.json', 'dojo/domReady!'
		], function(Select, Memory, DstoreAdapter, json, states){

			// create store instance referencing data from states.json
			var stateStore = new DstoreAdapter(
				new Memory({
					idProperty: 'abbreviation',
					data: json.parse(states)
				})
			);

			// create Select widget, populating its options from the store
			var select = new Select({
				name: 'stateSelect',
				store: stateStore,
				style: 'width: 200px;',
				labelAttr: 'name',
				maxHeight: -1, // tells _HasDropDown to fit menu within viewport
				onChange: function(value){
					document.getElementById('value').innerHTML = value;
					document.getElementById('displayedValue').innerHTML = this.get('displayedValue');
				}
			}, 'stateSelect');
			select.startup();
		});
	</script>
</body>
```

##### FilteringSelect
```html
<body class="claro">
	<div id="stateSelect"></div>

	<script>
		require(['dijit/form/FilteringSelect', 'dstore/Memory', 'dstore/DstoreAdapter',
			'dojo/json', 'dojo/text!./states.json', 'dojo/domReady!'],
		function(FilteringSelect, Memory, DstoreAdapter, json, states){
			// create store instance referencing data from states.json
			var stateStore = new DstoreAdapter(
				new Memory({
					idProperty: 'abbreviation',
					data: json.parse(states)
				})
			);

			// create FilteringSelect widget, populating its options from the store
			var select = new FilteringSelect({
				name: 'stateSelect',
				placeHolder: 'Select a State',
				store: stateStore,
				onChange: function(val){
					document.getElementById('value').innerHTML = val;
					document.getElementById('displayedValue').innerHTML = this.get('displayedValue');
				}
			}, 'stateSelect');
			select.startup();
		});
	</script>
</body>
```

##### ComboBox

```html
<body class="claro">
	<div id="stateSelect"></div>

	<script>
		require(['dijit/form/ComboBox', 'dstore/Memory', 'dstore/DstoreAdapter',
			'dojo/json', 'dojo/text!./states.json', 'dojo/domReady!'],
		function(ComboBox, Memory, DstoreAdapter, json, states){
			// create store instance referencing data from states.json
			var stateStore = new DstoreAdapter(
				new Memory({
					idProperty: 'abbreviation',
					data: json.parse(states)
				})
			);

			// create ComboBox widget, populating its options from the store
			var select = new ComboBox({
				name: 'stateSelect',
				placeHolder: 'Select a State',
				store: stateStore,
				onChange: function(value){
					document.getElementById('value').innerHTML = value;
				}
			}, 'stateSelect');
			select.startup();
		});
	</script>
</body>
```

<ul class="button-group">
	<li><a class="button" href="demo/selectStores/ProgSelect.html">View Select Demo</a></li>
	<li><a class="button" href="demo/selectStores/ProgFilteringSelect.html">View FilteringSelect Demo</a></li>
	<li><a class="button" href="demo/selectStores/ProgComboBox.html">View ComboBox Demo</a></li>
</ul>

_**Note**: When creating widgets programmatically, don't forget to call `startup` on your widget instances once they have been placed in the document. (The parser takes care of this for you in the case of declarative instantiation.) Forgetting to call `startup` is a very common mistake, and while its effects may vary from widget to widget, you can generally expect odd behavior to ensue. For example, if we were to forget to call `startup` in the `dijit/form/Select` example above, you would find that the drop-down list would be empty._


Notice how similar these examples are&mdash;the primary difference being which widget is `require`d and instantiated. Aside from that, there are only a few differences:

* We add `maxHeight: -1` for Select, to prevent the drop-down menu from causing the entire page to grow in size; FilteringSelect and ComboBox already do this by default.
* We add `placeHolder` text for FilteringSelect and ComboBox&mdash;Select does not support this.
* labelAttr, the attribute used for the label, is specified for the Select&mdash; for ComboBox and FilteringSelect labelAttr defaults to searchAttr, and searchAttr defaults to "name", so we didn't bother specifying it in the examples.
* Select needs an explicit width setting.

_**Note**: You may have noticed that our `dijit/form/Select` example does not have an empty-valued "Select a state" item this time around. The smoothest way to resolve this would be to also include this item in the store. For the purposes of this example, however, we have omitted it in favor of a more natural presentation of the other two widgets, while still being able to use the same store and JSON resource for all three._

We have now observed how all three Dijit select widgets can be created programmatically, populating their lists from a data store via the `store` property. Next we will take a closer look at some behaviors and capabilities that set these widgets apart from one another.

_**Note**: It is technically possible to declaratively create Dijit select widgets using stores as well; however, doing so is not recommended, since it requires exposing the store as a global object in the web page or application. Declarative instantiation of select widgets is best reserved for instances which take advantage of their ability to be created with markup very similar to that of a standard HTML select element. It is far more common and appropriate to use stores in conjunction with programmatically-created select widgets._

### Using Stores with FilteringSelect and ComboBox

It makes sense to look at `dijit/form/FilteringSelect` and `dijit/form/ComboBox` together, as both inherit the same codebase and thus share the same behavior in terms of how they interact with a data store.

_**Note**: While FilteringSelect and ComboBox behave identically within the confines of this discussion, please remember that these two widgets report `value` differently&mdash;see the [Dojo Toolkit tutorial on select widgets](http://dojotoolkit.org/documentation/tutorials/1.10/selects) for details._

In the previous tutorial, we only looked at the most important widget properties to get up and running. There are a few additional properties of interest particularly when working with stores:

* **`searchAttr`:** Name of the attribute to match text field input against when filtering the list; defaults to `"name"`.
* **`pageSize`:** Limits how many list options will be displayed at a time&mdash;if the number of results exceeds this limit, a special item will be added to the list at each end, for moving to the next or previous "page". The default is `Infinity` (no limit).

_**Note**: that `pageSize` can also be used when creating widgets from markup&mdash;we did not introduce it in the previous tutorial simply because it is not a feature normally encountered in a standard HTML select element._

Noting the properties above gives us some insight as to the behavior of these two widgets&mdash;they do not rely upon the store's label attribute(s). Rather, they expect you to specify which item attribute to use for searching and displaying items in the drop-down list.

In our states drop-down example above, notice that we did not specify `searchAttr`; this is because our data items already have a `name` attribute, which contains what we want to search against and display in the list&mdash;therefore, the example "just works".

### Using Stores with dijit/form/Select

We noted earlier that when using stores, `dijit/form/Select` and `dijit/form/FilteringSelect` associate their `value` with the identity of the currently-selected item. However, `dijit/form/Select` possesses an important limitation: it is implemented in such a way that it does not handle non-string item identities well. Particularly, setting the current value of the widget programmatically via `select.set('value', id)` will not work with non-string (e.g. numeric) identities.

_**Note**: For best results, only use `dijit/form/Select` with a store whose items' identities are strings._

_**Note**: Another important detail: when changing the store referenced by a `dijit/form/Select` widget after initialization, you might be inclined to call `widget.set('store', newStore)` as with other select widgets, but this will not work with `dijit/form/Select`&mdash;instead, call `widget.setStore(newStore)`._

### Conclusion

Dijit offers a number of widgets for enriching the user experience normally found in HTML select elements. These widgets can be created via markup with minimal changes to ordinary HTML code, but can also be instantiated programmatically&mdash;primarily through cooperation with stores. We can wrap dstore stores with `DstoreAdapter` to make them interoperable with Dijit widgets expecting the `dojo/store` API.

After reading a number of these tutorials, you should feel more comfortable with the basic building blocks Dijit provides for creating rich, functional user interfaces. We hope this encourages you to start exploring and building awesome applications with Dojo and dstore!
