dojo.provide("demo.app-step4");

demo.app = {
	store: null,
	query: dojo.config.flickrRequest || {},

	itemTemplate: '<img src="${thumbnail}"/>${title}',
	itemClass: 'item',
	_itemsById: {},

	largeImageProperty: "media.l", // path to the large image url in the store item
	thumbnailImageProperty: "media.t", // path to the thumb url in the store item
	
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
		
		var request = {
			query: dojo.delegate(this.query, {
				text: terms
			}),
			count: 10,
			onComplete: dojo.hitch(this, function(items, request){
				this.onResult(terms, items);
			}),
			onError: dojo.hitch(console, "error")
		};
		this.store.fetch(request);
	},
	onResult: function(term, items) {
		// summary: 
		// 		Handle fetch results
		
		// FlickrStore doesn't support the Identity API
		// so we populate our own byId lookup
		var itemsById = this._itemsById;
		dojo.forEach(items, function(item){
			// add entry to id=>item lookup
			itemsById[item.id] = item;
		}, this);
		
		var contr = dijit.byId("tabs"); 
		var listNode = dojo.create("ul", {
			'class': 'demoImageList',
			'id': 'panel'+contr.getChildren().length
		});

		// create the new tab panel for this search
		console.log("creating tab w. listNode");
		var panel = new dijit.layout.ContentPane({
			title: term, 
			content: listNode,
			closable: true
		});
		contr.addChild(panel);
		// render the items into the <ul> node
		console.log("rendering items into listNode");
		this.renderItems(items, listNode);
		// make this tab selected
		console.log("selecting new child");
		contr.selectChild(panel);
	},
	
	renderItem: function(item, refNode, posn) {
		// summary: 
		// 		Create HTML string to represent the given item
		var props = dojo.delegate(item, {
			thumbnail: dojo.getObject(this.thumbnailImageProperty, false, item)
		});
		
		return dojo.create("li", {
			'class': this.itemClass,
			innerHTML: dojo.string.substitute(this.itemTemplate, props)
		}, refNode, posn);
	},
	renderItems: function(items, listNode, idPrefix){
		// summary: 
		// 		Put rendering of the items into the given container (list) node
		
		var store = this.store, 
			frag = dojo.doc.createDocumentFragment();

		var lis = dojo.forEach(items, function(item){
			// what no getIdentity? and getValue(item, 'id') returns undefined???
			var node = this.renderItem(item);
			node.id = (idPrefix || listNode.id) + "_" + item.id;
			frag.appendChild( node );
		}, this);
		listNode.appendChild(frag);
	}
};