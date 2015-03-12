## Data Modelling in MVC

The Model-Viewer-Controller (MVC) is a critical concept for application development. The MVC approach separates key common concerns for organized, manageable application code. Dojo is has long been driven by MVC principles, and [dmodel](https://github.com/SitePen/dmodel/) builds upon the collection capabilities of [dstore](https://github.com/SitePen/dstore/) to provide object-level data modeling. The foundation of a well-designed MVC application is a solid data model. Here we will see how we can leverage [model objects](https://github.com/SitePen/dmodel/) to create a robust model that can be used in the view and controller code.

### Object Data Models: dmodel/Model

dmodel, in combination with dstore, provides a complete solution for data modelling, from collection level concerns to the entity level concerns of objects. dmodel uses the same concept of a consistent uniform interface for modeling individual objects. We can use the `dmodel/Model` interface to interact with objects, and by default all objects returned from the store are instances of this class. The interface is simple, there are several key methods (more are <a href="https://github.com/SitePen/dmodel">described here</a>):

* `get(name)` - Retrieves the value of the given named property.
* `set(name, value)` - Sets the value of the given named property.
* `property(name)` - This returns a property instance object. This property object allows us to monitor and change an individual property.

The property instance object has a few key methods as well:

* `observe(listener)` - Adds a listener that is called with the current value and any future values.
* `put(value)` - Sets the value of this property.

This interface affords the same opportunity as the store for viewers to be given data so they can render it and react to changes in the data. Let's create a viewer that binds a simple HTML form to an object. First, our HTML, which could look like this:

```html
<form id="itemForm">
	Name: <input type="text" name="name" />
	Quantity: <input type="text" name="quantity" />
</form>
```

And then we could bind to the HTML:

```js
function viewInForm(object, form){
	// copy initial values into form inputs
	query('input', form).forEach(function(input){
		var property = object.property(input.name);
		property.observe(function(value){
			// get the current value, respond to any changes in the property
			input.value = value;
		});
		on(input, 'change', function(){
			// respond to user input changes to update the property value
			property.put(input.value);
		});
	});
}
```

Now we can initiate this from within an object from the store:

```js
var currentItem;
inventoryStore.get(id).then(function(item){
	currentItem = item;
	viewInForm(item, dom.byId('itemForm'));
});
```

<a class="button" href="demo/dataModelling/data_modelling.html">View Demo</a>

And now the controller code can modify this object, and the viewer will respond instantly:

```js
item.set('quantity', 4);
```

In the case of a form, we may also want to add `onchange` event listeners that would update the object when the input changes, so as to make the data binding bidirectional (changes to the object are reflected in the form, and changes in the form are reflected in the object), as we did above.

Also remember that the wrapped object can and should be `save()` objects to the store when changes are ready to be committed. We could also have controller code:

```js
on(saveButton, 'click', function(){
	currentItem.save(); // save the current state of the Model item
});
```

<a class="button" href="demo/dataModelling/data_modelling.html">View Demo</a>

#### Validation

With dmodel data models, we can also define schemas to define the structure of the objects stored and returned from the stores. The schema defined data models can provide validation, notification of property changes, and easy access to saving or deleting an object. To begin using validation, we need to define our data model. We do this by by extending dmodel's `Model` class, with a schema object describing the property constraints. We then set the `Model` subclass as the store's `Model` property:

```js
require(['dstore/Rest', 'dmodel/validators/NumericValidator', 'dojo/_base/declare'],
		function(Rest, NumericValidator, declare){

	inventoryStore = new CachedRest({
		target: '/Inventory/',
		Model: declare(Model, {
			schema: {
				inStock: 'boolean',
				price: 'number',
				quantity: new NumericValidator({
					minimum: 0
				})
			}
		});
});
```

Now object updates will be checked by our data model's validation logic:

```js
inventoryStore.get('donut').then(function(donut){
	// this is an invalid change, and will result in an error being set on the object
	donut.set(quantity, -1);
	// the validation errors can be accessed from the errors property
	var errors = donut.get('errors');
	// these are acceptable changes
	donut.set(quantity, 1);
	donut.set(inStock, true);
	// now that we have valid values, we can save the object
	// (which causes a put() back to the store)
	donut.save();
});
```

<a class="button" href="demo/dataModelling/data_modelling.html">View Demo</a>

### Summary

By using the dmodel object modes, we can build applications that can respond to changes in objects.