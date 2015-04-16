<?php require("../../../resources/tutHead.inc"); ?>

<h3 id="contactsAppPhoneAddDetails">The Views</h3>
<p>The <strong>Contacts Application</strong> will include two views.  The first view will include the filtered
	<strong>list of contacts</strong> from the previous tutorial and the second view will show the <strong>details of a contact</strong> in
	either "View" or "Edit" mode.</p>
<div style="float: left; width: 100%; margin-top: 20px;">
	<p>This is how the <strong>List View of the Contacts Application</strong> will look on an iPhone iOS Simulator.</p>
	<div style="float: left; width: 50%;">
		<label  style="margin-left: 90px;">Contacts List</label>
		<img src="images/phoneImage1.png" alt="Phone Contacts List View" style="margin:0 auto;display:block;" />
	</div>
</div>
<div style="float: left; width: 100%; margin-top: 20px; margin-bottom: 20px">
	<p>This is how the <strong>Details View of the Contacts Application</strong> will look on an iPhone iOS Simulator.</p>
	<div style="float: left; width: 50%;">
		<label style="margin-left: 70px;">Contacts Details "View" Mode</label>
		<img src="images/phoneImage.png" alt="Phone Contacts Details View" style="margin:0 auto;display:block;" />
	</div>
	<div style="float: left; width: 50%;">
		<label style="margin-left: 70px;">Contacts Details "Edit" Mode</label>
		<img src="images/phoneupdate.png" alt="Phone Contacts Details View" style="margin:0 auto;display:block;" />
	</div>
</div>

<p>In addition to support for the Details view we will also add:</p>
	<ul>
		<li>Support to <strong>"Add", "Edit" and "Delete"</strong> a contact.</li>
		<li>Support to <strong>Transition</strong> from the <strong>list</strong> view to the <strong>details</strong> view and back.</li>
		<li><strong>History</strong> support for using the browser's back button, using <strong>"has"</strong> based config support.</li>
		<li><strong>NLS</strong> support for translated strings for the application and for each of the views.</li>
	</ul>

<p>The <strong>Contacts Application</strong> will have the following file structure:</p>

<pre>
	/contactsAppPhone/
			contacts.css
			contacts.js
			contacts.json
			contacts.php
			/nls/
				contacts.js
				details.js
				list.js
				/fr/
					contacts.js
					details.js
					list.js
			/views/
				details.html
				details.js
				list.html
				list.js
</pre>


<h3 id="updatecss">The CSS file for the application.</h3>

<p>Create the application CSS file and add it to the main HTML file.</p>
<p>To add it to the the main HTML file:</p>
<pre class="brush: js; html-script: true;">
&lt;link rel="stylesheet" href="contacts.css"&gt;
</pre>

<p>The <strong>application CSS</strong> (contacts.css) includes CSS related to the following:
<ul>
	<li>Making the labels gray and the text fields bold.</li>
	<li>In "View" mode the CSS will set the background color and border width of the text fields to make it obvious that the fields are not editable.</li>
	<li>In "View" mode the CSS will be used to hide the labels and fields for empty fields.</li>
</ul>

	The CSS file looks like this:</p>
<pre class="brush: js; html-script: true; highlight: [11,12,16,20,21]">
	.hidden {
		display: none !important;
	}

	.mblFormLayout {
		margin: 8px;
		background-color: rgba(0, 0, 0, 0);
	}

	.mblFormLayout > * > *:first-child {
		font-weight: normal;
		color: gray;
	}

	.mblFormLayoutReadOnly .readOnlyHidden {
		display: none !important;
	}

	.mblFormLayoutReadOnly .mblTextArea {
		background-color: rgba(0, 0, 0, 0);
		border-width: 0px;
	}
	.android_theme .mblFormLayoutReadOnly .mblTextArea {
		background-color: #d3d3d3;
	}

	.mblFormLayout .mblTextArea {
		font-weight: bold;
	}
</pre>

<h3 id="updatenls">The NLS files for the application.</h3>

<p>The nls files <strong>(contacts.js, details.js, and list.js)</strong> include the following:</p>
<pre class="brush: js; html-script: true; highlight: [1,9,30]">
	(contacts.js)
		define({
			root: {
				contacts: "Contacts"
			},
			fr: true
		});

	(details.js)
		define({
			root: {
				home: "Home",
				work: "Work",
				cell: "Cell",
				name: "Name",
				first: "Firstname",
				last: "Lastname",
				company: "Company",
				details: "Details",
				mail: "E-mail",
				phone: "Phone",
				edit: "Edit",
				cancel: "Cancel",
				ok: "Ok",
				remove: "Delete the contact"
			},
			fr: true
		});

	(list.js)
		define({
			root: {
				search: "Search",
				add: "Add"
			},
			fr: true
		});
</pre>

<h3 id="updatejson">The JSON configuration file</h3>

<p>The JSON configuration file (contacts.json) is updated to add the following:</p>
<ul>
	<li>The "nls" files for the application and the views.</li>
	<li>The "defaultTransition" for the application.</li>
	<li>The <strong>details</strong> view controller, template and nls configuration.</li>
	<li>The <strong>"has"</strong> checks and configuration for the history support.</li>
</ul>

<pre class="brush: js; html-script: true; highlight: [1,2,7,9,10,11,12,15,16,21]">
	"nls": "contactsAppPhone/nls/contacts",
	"defaultTransition": "slide",
	"views": {
		"list": {
			"controller": "contactsAppPhone/views/list",
			"template": "contactsAppPhone/views/list.html",
			"nls": "contactsAppPhone/nls/list"
		},
		"details": {
			"controller": "contactsAppPhone/views/details",
			"template": "contactsAppPhone/views/details.html",
			"nls": "contactsAppPhone/nls/details"
		}
	},
	"has": {
		"html5history": {
			"controllers": [
				"dojox/app/controllers/History"
			]
		},
		"!html5history": {
			"controllers": [
				"dojox/app/controllers/HistoryHash"
			]
		}
	}
</pre>

<h3 id="updatemain">The main module of the application</h3>
<p>The main module (contacts.js) is updated to define the configuration flags needed by the configuration file
	using <strong>has</strong> support to add the setting for <strong>html5history</strong>.</p>
<pre class="brush: js; html-script: true; highlight: [8]">
	// we use 'define' and not 'require' to workaround Dojo build system
	// limitation that prevents from making of this file a layer if it
	// using 'require'
	define(["dojo/sniff", "dojo/json",
		"dojo/text!contactsAppPhone/contacts.json", "dojox/app/main"],
		function(has, json, config, Application){

		 has.add("html5history", !has("ie") || has("ie") > 9);
		 Application(json.parse(config));

	});
</pre>

<h3 id="updateviews">The <strong>"list"</strong> view</h3>
<p>The <strong>"list" view template</strong> (list.html) is updated to:</p>
<ul>
	<li>Include an <strong>Add</strong> button in the dojox/mobile/Heading.</li>
	<li>Use the <strong>nls</strong> strings for the "heading" text, "Add" button text and the "Search" string.</li>
	<li>Set the Add button <strong>"target"</strong> property to "details" in order to transition to the "details" view when add is clicked.</li>
	<li>Set the Add button <strong>"transitionOptions"</strong> property to use "edit: true" so that the details
		view will use "Edit" mode when adding an item.</li>
</ul>

<pre class="brush: html; highlight: [4,5,9,17]">
	&lt;div class="mblBackground"&gt;
		&lt;div data-dojo-type="dojox/mobile/Heading"
			 data-dojo-props="fixed: 'top'"&gt;
			${nls.contacts}
			&lt;button data-dojo-type="dojox/mobile/ToolBarButton"
					style="position: absolute; right: 0"
					data-dojo-props="target: 'details',
						transitionOptions: { params: { edit: true } }"
					data-dojo-attach-point="add"&gt;${nls.add}&lt;/button&gt;
		&lt;/div&gt;
		&lt;div data-dojo-type="dojox/mobile/EdgeToEdgeStoreList"
				data-dojo-mixins="dojox/mobile/FilteredListMixin"
				data-dojo-attach-point="contacts"
				data-dojo-props="store: this.loadedStores.contacts,
					labelProperty: 'displayName',
					itemRenderer: this.ContactListItem,
					placeHolder: '${nls.search}', stateful: false"&gt;
		&lt;/div&gt;
	&lt;/div&gt;
</pre>


<p>The <strong>"list" view controller</strong> (list.js) is updated to:</p>
<ul>
	<li>Set <strong>target: "details"</strong> property on ContactListItem which causes the transition to the
		"details" view when an item is selected.</li>
	<li>Add a <strong>postMixInProperties function</strong> on ContactListItem to set the params of the transitionOptions with the item's id.</li>
	<li>Remove the <strong>init</strong> function which was used to watch for clicks on the contacts list and use
		dom.byId and innerHTML to set the text to indicate which item was clicked, but it is no longer needed since the transition
		to the "details" view will be done when the item is clicked.</li>
</ul>

<pre class="brush: js; html-script: true; highlight: [6,8,10,12]">
	define(["dojo/_base/declare", "dojo/has",
		"dojox/mobile/ListItem", "dojox/mobile/EdgeToEdgeStoreList",
		"dojox/mobile/FilteredListMixin"],
		function(declare, has, ListItem){
		var ContactListItem = declare(ListItem, {
			target: "details",
			clickable: true,
			postMixInProperties: function(){
				this.inherited(arguments);
				this.transitionOptions = {
					params: {
						"id" : this.id
					}
				}
			}
		});

		return {
			ContactListItem: ContactListItem
		};
	});
</pre>

<h3 id="updatedetailsviews">The <strong>"details"</strong> view</h3>

<p>The "details" view (details.html) template's <strong>Heading</strong> has a label set with the nls string for "Details" and includes these ToolBarButtons:</p>
<ul>
	<li>A <strong>Back</strong> button which is used to transition back to the "list" view.</li>
		<ul>
			<li>The <strong>Back</strong> button sets the <strong>"arrow"</strong> property to "left" in order to look like a "back" button,
				and it uses the nls string for "Contacts" as it's label.</li>
			<li>The <strong>Back</strong> button sets the <strong>"target"</strong> property to "list" in order to transition
				back to the "list" view when clicked.</li>
			<li>The <strong>Back</strong> button is shown in "View" mode, and it is hidden in "Edit" mode.</li>
		</ul>
	<li>A <strong>Cancel</strong> button which is used to cancel out of "Edit" mode, and switch back to "View" mode.</li>
		<ul>
			<li>The <strong>Cancel</strong> button sets a <strong>"target"</strong> property to "details" along with transitionOptions
				to indicate that "edit" is false in order to stay on the "details" view but to change back to "View" mode.</li>
			<li>The <strong>Cancel</strong> button is shown in "Edit" mode, and it is hidden in "View" mode.</li>
		</ul>
	<li>An <strong>Edit</strong> button which is used to change from "View" mode to "Edit" mode.</li>
		<ul>
			<li>In "View" mode the <strong>Edit</strong> button is shown with a label of "Edit" and the button is used to change to
				"Edit" mode.</li>
			<li>In "Edit" mode the label is changed to <strong>Ok</strong> and the button is used to save the updates, and change back to
				"View" mode.</li>
			<li>The <strong>Edit</strong> button sets a <strong>"target"</strong> property to "details" in order to stay on the "details" view
				and the transitionOptions are set in the view controller (details.js) to change to "Edit" or "View" mode as needed.</li>
		</ul>
</ul>

<pre class="brush: html;highlight: [4,5,7,9,11,12,13,15,17,19,20]">
	&lt;div data-dojo-type="dojox/mobile/Heading"
		data-dojo-props="fixed: 'top'"&gt;
		&lt;button data-dojo-type="dojox/mobile/ToolBarButton"
				data-dojo-attach-point="backButton"
				data-dojo-props="arrow: 'left', target: 'list'"
				style="position: absolute; left: 0"
				class="backButton"&gt;${nls.contacts}&lt;/button&gt;
		&lt;button data-dojo-type="dojox/mobile/ToolBarButton"
				data-dojo-attach-point="cancelButton"
				style="position: absolute; left: 0; display: 'none'"
				data-dojo-props="target: 'details',
					transitionOptions: { params: { edit: false } }"&gt;
			${nls.cancel}
		&lt;/button&gt;
		${nls.details}
		&lt;button data-dojo-type="dojox/mobile/ToolBarButton"
				data-dojo-attach-point="editButton"
				style="position: absolute; right: 0"
				data-dojo-props="target: 'details',
					transitionOptions: { params: { } }"&gt;&lt;/button&gt;
	&lt;/div&gt;
</pre>


<p>The <strong>"details" view template</strong> (details.html) also includes:</p>
<ul>
	<li>A dojox/mobile/ScrollableView with a dojox/mobile/FormLayout, and labels and fields for:</li>
	<ul>
		<li><strong>Name</strong> (first name, and last name). Shown below.</li>
		<li><strong>Company</strong>. Shown below.</li>
		<li><strong>Home and Work Phone</strong>. Not shown below, very similar to "Company".</li>
		<li><strong>Home and Work Email</strong>. Not shown below, very similar to "Company"</li>
		<li><strong>Delete button</strong> The Delete button is only available in Edit mode. Shown below.</li>
	</ul>
</ul>

<pre class="brush: html; highlight: [7,12,22,34]">
	&lt;div data-dojo-type="dojox/mobile/ScrollableView"&gt;
		&lt;div data-dojo-type="dojox/mobile/FormLayout"
				data-dojo-attach-point="formLayout"&gt;
			&lt;div&gt;
				&lt;label for="firstname"&gt;${nls.name}&lt;/label&gt;
				&lt;fieldset&gt;
					&lt;input id="firstname" name="firstname"
							data-dojo-type="dojox/mobile/TextArea"
							data-dojo-props="readOnly: true,
									placeHolder: '${nls.first}'"
							data-dojo-attach-point="firstname"&gt;
					&lt;input id="lastname" name="lastname"
							data-dojo-type="dojox/mobile/TextArea"
							data-dojo-props="readOnly: true,
									placeHolder: '${nls.last}'"
							data-dojo-attach-point="lastname"&gt;
				&lt;/fieldset&gt;
			&lt;/div&gt;
			&lt;div&gt;
				&lt;label for="company"&gt;${nls.company}&lt;/label&gt;
				&lt;fieldset&gt;
					&lt;input id="company" name="company"
							data-dojo-type="dojox/mobile/TextArea"
							data-dojo-props="readOnly: true,
									placeHolder: '${nls.company}'"
							data-dojo-attach-point="company"&gt;
				&lt;/fieldset&gt;
			&lt;/div&gt;
			&lt;!-- Home Phone, Work Phone, Home Email and Work Email would
					be here but are not shown to save space.
			--&gt;
			&lt;div&gt;
				&lt;div&gt;&lt;/div&gt;
				&lt;button data-dojo-type="dojox/mobile/Button"
						data-dojo-attach-point="deleteButton"
						data-dojo-attach-event="onClick: _deleteContact"
						class="mblRedButton" style="padding: 0 10px"&gt;
					${nls.remove}
				&lt;/button&gt;
			&lt;/div&gt;
		&lt;/div&gt;
	&lt;/div&gt;
</pre>


<h4 id="updatedetailsviewcontroller">The <strong>"details"</strong> view controller</h4>

<p>The <strong>"details" view controller</strong> (details.js) is large because it is responsible for most of the work
	in the Contacts application.</p>
<ul>
	<li>The <strong>"beforeActivate"</strong> function in a view is called each time a view is transitioned to.  The "beforeActivate" function
		in the "details" view controller calls "_beforeActivate".</li>
		<ul>
			<li>"_beforeActivate" determines if we are in "Edit" mode or "View" mode, and sets up the buttons, domNodes and handlers accordingly.</li>
			<li>"_beforeActivate" determines the "id" of the selected contact, and gets the data for the contact from the contacts store using
				the view's loadedStores property and the contact's "id".</li>
			<li>"_beforeActivate" initializes the form with the values from the selected contact's data.</li>
			<li>"_beforeActivate" calls "_hideEmptyFields" to hide the form fields which do not have a value set when in "View" Mode.</li>
		</ul>
	<li>The <strong>"_saveForm"</strong> function in the "details" view controller is called when the "Ok" button is clicked in "Edit" mode.</li>
		<ul>
			<li>"_saveForm" creates a promise named "_savePromise" to return the contact after the save is completed.  This promise
			is used in "beforeActivate" to be sure the save is completed before calling "_beforeActivate" to update the form data from the store.</li>
			<li>"_saveForm" calls "_createContact" if the contact does not exist, which is indicated by the "id" being "undefined".</li>
			<li>If the "id" is set, "_saveForm" calls "_saveContact" to update the contact with the latest input from the form.</li>
			<li>After the "_saveForm" call is complete "put" is called on the contacts store to update the contact in the store, and
				when the "put" is complete "resolve" is called for the "_savePromise".</li>
			<li>The view template will cause a transition when the "Ok" button is clicked. This transition causes
				"beforeActivate" to be called which will switch back to "View" mode.</li>
		</ul>
	<li>The <strong>"_createContact"</strong> function in the "details" view controller is called when the "Ok" button is clicked for a new contact.</li>
		<ul>
			<li>"_createContact" creates an empty contact and calls "_saveContact(contact)" to update empty Contact with the latest
				input from the form.</li>
			<li>"_createContact" also calls "add" on the store to add the new contact to the store, and resolves the "_savePromise"
				which was setup by "_saveForm" and is used in "beforeActivate".</li>
		</ul>
	<li>The <strong>"_saveContact"</strong> function in the "details" view controller is called from "_saveForm" or "_createContact"
		when the "Ok" button is clicked in order to update the contact with the latest changes from the form.</li>
		<ul>
			<li>"_saveContact" will update the first and last names, and combine them to update the display name, it will also update the company.</li>
			<li>"_saveContact" uses a loop and a DATA_MAPPING object to update the home and work phone and emails.</li>
		</ul>
	<li>The <strong>"_hideEmptyFields"</strong> function in the "details" view controller is called from "_beforeActivate"
		when not in "Edit" mode, in order to hide the fields which are not set.</li>
		<ul>
			<li>"_hideEmptyFields" uses "dojo/query" to find any form fields which are currently hidden, and removes the class
				which is used to hide the fields.</li>
			<li>"_hideEmptyFields" uses "dojo/query" again to find any input fields in the form which do not have a value, and
				adds the class which is used to hide the fields to the node's parent.</li>
		</ul>
	<li>The <strong>"_deleteContact"</strong> function in the "details" view controller is called from the view template
		when the "Delete" button is clicked.</li>
		<ul>
			<li>"_deleteContact" will access the contacts store with the loadedStores on the view, and call remove to delete the
				contact from the store.</li>
			<li>"_deleteContact" will use access the  app from the view, and use the app to call "transitionToView" to transition
				back to the "list" view after the contact is deleted.</li>
		</ul>
</ul>

<pre class="brush: js; html-script: true; highlight: [30,36,38,41,52,54,61,62,74,82,87,88,92,96,103,104,114,116,119,160,165,169,173,175,177,181,189,199,203,208,215,220,231,233,247,248,250,252,258,264,266,269]">
define(["dojo/_base/array", "dojo/_base/lang", "dojo/has", "dojo/when",
	"dojo/Deferred", "dojo/query", "dojo/dom-class", "dijit/registry",
	"dojox/mobile/Button", "dojox/mobile/FormLayout",
	"dojox/mobile/TextArea"],
	function(array, lang, has, when, Deferred, query, domClass,
			 registry){

	var DATA_MAPPING = {
		"phonehome": "phoneNumbers.home",
		"phonework": "phoneNumbers.work",
		"mailhome": "emails.home",
		"mailwork": "emails.work"
	};

	var getStoreField = function(arr, type){
		var index = array.indexOf(arr, function(item){
			return (item.type == type);
		});
		if(index == -1){
			// create one
			arr.push({
				type: type
			});
			index = arr.length - 1;
		}
		return arr[index];
	};

	return {
		beforeActivate: function(){
			// in case we are still under saving previous
			// modifications, let's wait for the operation
			// to be completed and use the resulting
			// contact as input
			var view = this;
			when(view._savePromise, function(contact){
				view._savePromise = null;
				view._beforeActivate(contact);
			});
		},
		_beforeActivate: function(contact){
			// get the id of the displayed contact from the params if
			// we don't have a contact or from the contact if we have
			// one
			if(contact){
				this.params.id = contact.id;
			}
			var id = this.params.id;

			// are we in edit mode or not? if we are we need to
			// slightly update the view for that
			var edit = this.params.edit;
			// are we in create mode
			var create = (typeof id === "undefined");
			// change widgets readonly value based on that
			query("input", this.domNode).forEach(function(node){
				registry.byNode(node).set("readOnly", !edit);
			});
			// in edit mode change the label and params of the
			// edit button
			this.editButton.set("label",
				edit?this.nls.ok:this.nls.edit);
			// put a listener to save the form when we are editing if
			// there is not one already
			if(!this._onHandler && edit){
				this._onHandler = this.editButton.on("click",
					lang.hitch(this, this._saveForm));
			}else if(this._onHandler && !edit){
				this._onHandler.remove();
				this._onHandler = null;
			}
			var editButtonOptions =
				this.editButton.transitionOptions;
			editButtonOptions.params.edit = !edit;
			// also update the edit & ok button to reference the
			// currently displayed item
			editButtonOptions.params.id = id;
			var cancelButtonOptions =
				this.cancelButton.transitionOptions;
			if(create){
				// if we cancel we want to go back to main view
				cancelButtonOptions.target = "list";
				if(cancelButtonOptions.params.id){
					delete cancelButtonOptions.params.id;
				}
			}else{
				cancelButtonOptions.target = "details";
				cancelButtonOptions.params.id = id;
			}
			// hide back button in edit mode
			if(edit){
				domClass.add(this.backButton.domNode, "hidden");
				domClass.remove(this.formLayout.domNode,
					"mblFormLayoutReadOnly");
			}else{
				domClass.remove(this.backButton.domNode, "hidden");
				domClass.add(this.formLayout.domNode,
					"mblFormLayoutReadOnly");
			}
			// cancel button must be shown in edit mode only,
			// same for delete button if we are not creating a
			// new contact
			this.cancelButton.domNode.style.display = edit?"":"none";
			this.deleteButton.domNode.style.display =
				(edit&&(typeof id !== "undefined"))?"":"none";

			// let's fill the form with the currently selected contact
			// if nothing selected skip that part
			var view = this;
			var promise = null;
			if(!create && !contact){
				id = id.toString();
				// get the contact on the store
				promise = this.loadedStores.contacts.get(id);
			}else{
				promise = contact;
			}
			when(promise, function(contact){
				view.firstname.set("value",
					contact ? contact.name.givenName : null);
				view.lastname.set("value",
					contact ? contact.name.familyName : null);
				if(contact && contact.organizations &&
					contact.organizations.length){
					view.company.set("value",
						contact.organizations[0].name);
				}else{
					view.company.set("value", null);
				}
				// reset binding fields
				for(var key in DATA_MAPPING){
					view[key].set("value", null);
				}
				if(contact){
					// set each phone number to the corresponding form
					// field
					array.forEach(contact.phoneNumbers,
						function(number){
						// for now we just skip non supported
						// fields, ideally we should have a generic
						// mechanism to deal with them
						var phonekey = "phone"+number.type;
						if(view[phonekey]){
							view[phonekey].set("value", number.value);
						}
					});
					// set each mail field to the corresponding form
					// field
					array.forEach(contact.emails, function(mail){
						// for now we just skip non supported
						// fields, ideally we should have a generic
						// mechanism to deal with them
						var mailkey = "mail"+mail.type;
						if(view[mailkey]){
							view[mailkey].set("value", mail.value);
						}
					});
					// hide empty fields when not in edit mode
					if(!edit){
						view._hideEmptyFields(view);
					}
				}
			});
		},
		_saveForm: function(){
			var id = this.params.id, view = this;
			view._savePromise = new Deferred();
			if(typeof id === "undefined"){
				view._createContact();
			}else{
				// get the contact on the store
				var promise =
					this.loadedStores.contacts.get(id.toString());
				when(promise, function(contact){
					view._saveContact(contact);
					// save the updated item into the store
					when(view.loadedStores.contacts.put(contact),
						function(savedContact){
							// some store do return a contact some
							// other an ID
							view._savePromise.resolve(
								savedContact == id ?
									contact:savedContact);
						}
					);
				});
			}
		},
		_createContact: function(){
			var contact = {
				"id": (Math.round(Math.random()*1000000)).toString(),
				"name": {},
				"displayName": "",
				"phoneNumbers": [],
				"emails": [],
				"organizations": []
			};
			var view = this;
			this._saveContact(contact);
			when(this.loadedStores.contacts.add(contact),
				function(savedContact){
					// some store do return a contact some other an ID
					view._savePromise.resolve(savedContact ==
						contact.id ? contact : savedContact);
				}
			);
		},
		_saveContact: function(contact){
			// set back the values on the contact object
			var value, keys;
			// deal with name first
			var displayName = "";
			value = this.firstname.get("value");
			if(typeof value !== "undefined"){
				contact.name.givenName = value;
				displayName += value;
			}
			value = this.lastname.get("value");
			if(typeof value !== "undefined"){
				contact.name.familyName = value;
				displayName += " " + value;
			}
			contact.displayName = displayName;
			value = this.company.get("value");
			if(typeof value !== "undefined"){
				if(!contact.organizations){
					contact.organizations = [{}];
				}else if(contact.organizations.length == 0){
					contact.organizations.push({});
				}
				contact.organizations[0].name = value;
			}
			for(var key in DATA_MAPPING){
				value = this[key].get("value");
				if(typeof value !== "undefined"){
					// there is a value, save it
					keys = DATA_MAPPING[key].split(".");
					if(contact[keys[0]] == null){
						contact[keys[0]] = [];
					}
					getStoreField(contact[keys[0]],
						keys[1]).value = value;
				}
			}
		},
		_hideEmptyFields: function(view){
			query(".readOnlyHidden",
				view.formLayout.domNode).forEach(function(node){
				domClass.remove(node, "readOnlyHidden");
			});
			query("input",
				view.formLayout.domNode).forEach(function(node){
				var val = registry.byNode(node).get("value");
				if(!val && node.parentNode.parentNode &&
					node.id !== "firstname" &&
					node.id !== "lastname"){
						domClass.add(node.parentNode.parentNode,
							"readOnlyHidden");
				}
			});

		},
		_deleteContact: function(){
			var view = this;
			when(this.loadedStores.contacts.remove(
				this.params.id.toString()), function(){
				// we want to be back to list
				view.app.transitionToView(view.domNode, {
					target: "list" });
			});
		}
	}
});
</pre>


<a class="demoBtn demo" href="demos/contactsAppPhone/contacts.php" target="_blank">Run the Contacts Application</a>
<a class="demoBtn demo" href="https://github.com/edchat/dojox_app_tutorial/tree/master/contactsPhone/demos/contactsAppPhone" target="_blank">View the contactsAppPhone source on github</a>

<h3>Conclusion</h3>

<p>In this tutorial, we've learned how to update the Contacts List Application to add a Details View, along with
support to Add, Edit and Delete contacts.  The next step will be to use a two column layout on a tablet.
</p>

<?php include("../series.inc"); ?>

