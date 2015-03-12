## Connecting with Forms

The dmodel package provides a great way of encapsulating your data layer with a consistent interface for working with different storage mediums as well as a validation, property metadata, and change notifications.  Combining dmodel's powerful model management with forms allows us to nicely separate the concerns of the data layer from the rest of our application.  In this tutorial we will walk though how to create forms that are driven by dmodel model objects.

### The basic form

The first thing we need to do is define our data model and choose a store type.  After that we can create our form and connect the data to our form.  Let's begin with a simple data model for tracking weather:

```js
require(['dmodel/Model', 'dstore/Memory'], function(Model, Memory){
	var WeatherModel = declare(Model, {
	schema: {
		location: 'string',
		temperature: 'number',
		skies: 'string'
	}
});

return new Memory({ Model: WeatherModel });
```

Each weather report should include three pieces of data: a location, the temperature, and some information on the sky conditions. For each property we've set the type (string or number), which dmodel will use to select the appropriate validator. The Memory store is being used throughout our demos but we could swap it out for any Store.
Next we create the form to collect our data:

```html
<form>
	<div>
		<label>Location <input name="location" type="text"></label>
		<label>Temperature <input name="temperature" type="number"></label>
	</div>
	<div>
		<label>Skies <
		select name="skies">
			<option>Cloudy</option>
			<option>Sunny</option>
		</select></label>
	</div>
	<button type="button">Save</button>
</form>
```

Now that we have defined our model and our form, we are ready to connect them together.  First, ask the store for a new model object to persist our form data:

```js
var model = store.create();
```

Once we have access to our model we can get individual property objects:

```js
var property = model.property('location');
```

Now we can write a function or component that can generically connect a property instance to a form input. Then we can connect each property that we defined in the model schema with each of the form elements:

```js
function bindInput(input, property) {
	on(input, 'change', storeInput);
	property.observe(onPropertyChange);

	// initialize the input to the current value of the property
	input.value = property.valueOf() || '';

	// stores the input to the model
	function storeInput() {
		property.put(input.value);
	}

	// handles updates from the model
	function onPropertyChange(value) {
		input.value = value;
	}
}
```

Above we have created a two-way binding between our form and model properties.  When each input in the field changes, `storeInput` will put the input value into our property and if the property on the model were to be updated from elsewhere `onPropertyChange` will update the input element of our form.

<a class="button" href="demo/forms/basic_form_demo.html">View Demo</a>

### Using metadata with forms

Now we are ready to add some metadata to our schema to help describe the behavior and function of our properties.

```js
var WeatherModel = declare(Model, {
	schema: {
		location: {
			type: 'string',
			required: true,
			description: 'Current city'
		},
		temperature: {
			type: 'number',
			required: true,
			description: 'degrees fahrenheit'
		},
		skies: {
			type: 'string',
			options: ['Cloudy', 'Sunny']
		}
	}
});
```

In order to add additional metadata we switched our property descriptors to an object notation.  dmodel allows for arbitrary metadata to be appended to each property, but some properties or methods are recognized by the system.  In our code above the type and required properties will be used for validation. Read the [dmodel documentation](https://github.com/SitePen/dmodel/) for more information about writing schemas.

Now we can use our property metadata in our `bindInput` function. The `required` property can be directly applied as an attribute. We will use the `description` as our placeholder. And finally, we can actually construct the options in our `<select>` from the options defined in our schema, giving us a further schema-driven form (and we can remove the inline options from the form, and just use a simple `<select>` declaration).

```js
function bindInput(input, property) {
	...
	// Attach metadata from the model to the input
	input.required = property.required;
	if(property.description) {
		input.placeholder = property.description;
	}

	if (property.options) {
		// make options if those are defined
		var options = property.options;
		for (var i = 0; i < options.length; i++) {
			input.appendChild(document.createElement('option')).innerHTML = options[i];
		}
	}
	...
```

<a class="button" href="demo/forms/form_demo_with_metadata.html">View Demo</a>

### Adding validation

In addition to using the default validation settings for `number` and `string` property types, dmodel has several Validation classes to accommodate specific data validation. Let's use the NumericValidator to limit the temperature range:

```js
require(['dmodel/Model', 'dmodel/validators/NumericValidator',
		function(Model, NumericValidator){
	var WeatherModel = declare(Model, {
		schema: {
			location: { ... }
			temperature: new declare(NumericValidator, {
				required: true,
				description: 'degrees fahrenheit',
				minimum: -100,
				maximum: 200
			}),
			skies: { ... }
		}
	});
```

The temperature property is using the `NumericValidator` to only validate numeric values that are between the minimum and maximum defined. Here we have defined a minimum of -100 and a maximum of 200.

We should also update the form to reflect that the entry failed to validate by adding a validation error message next to the input. All Properties and Models have an `errors` property that is set when an error is reported by a validator. By observing changes on the `errors` property we can react to validation issues and update our form accordingly. First, we will observe for updates to the errors:

```js
property.property('errors').observe(onError);
```

Next we will implement the `onError` function to add our error message next to the input:

```js
function bindInput(input, property) {
	...
	property.property('errors').observe(onError);
	...

	function onError(message) {
		// clear any previous errors first
		...
		if(message) {
			// add an error message next to the input
			var errorSpan = input.parentNode.appendChild(document.createElement('span'));
			domclass.add(errorSpan, 'error');
			errorSpan.innerHTML = message;
		}
	}
}
```

<a class="button" href="demo/forms/form_demo_with_validation.html">View Demo</a>

### Conclusion

One of the key purposes of the dmodel data modelling system is to provide a well-encapsulated connection between properties and form elements.  Through dmodel you can create a robust, well-defined model that drives the rest of your application.  For more information, check out the reference documentation in the
	[dmodel project](https://github.com/SitePen/dmodel).