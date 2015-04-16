dojo.provide("demo.app-step2");

demo.app = {
	store: null,
	query: dojo.config.flickrRequest || {},
	
	init: function() {
		// proceed directly with startup
		this.startup();
	},
	startup: function() {
		// create the data store
		var flickrStore = this.store = new dojox.data.FlickrRestStore();
		this.initUi();
	},
	
	initUi: function() {
		// summary: 
		// 		create and setup the UI with layout and widgets

		// set up ENTER keyhandling for the search keyword input field
		dojo.connect(dojo.byId("searchTerms"), "onkeypress", this, function(evt){
			if(evt.keyCode == dojo.keys.ENTER){
				dojo.stopEvent(evt);
				var terms = dojo.byId("searchTerms").value;
				if(terms.match(/\w+/)) {
					this.doSearch(terms);
				}
			}
		});

		// set up click handling for the search button
		dojo.connect(dojo.byId("searchBtn"), "onclick", this, function(evt){
			var terms = dojo.byId("searchTerms").value;
			if(terms.match(/\w+/)) {
				this.doSearch(terms);
			}
		});
	},
	doSearch: function(terms) {
		// summary: 
		// 		inititate a search for the given keywords
		
		console.log("Search for: " + terms);
	},
	onResult: function(term, items) {
		// summary: 
		// 		Handle fetch results
	}
};