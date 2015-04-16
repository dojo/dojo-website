dojo.provide("demo.app-step5");

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

		// create a single Lightbox instnace which will get reused
		this.lightbox = new dojox.image.LightboxNano({});

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
	showImage: function(url, originNode){
		// summary: 
		// 		Show the full-size image indicated by the given url
		this.lightbox.show({ 
			href:url, origin: originNode 
		});
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
		var panel = new dijit.layout.ContentPane({
			title: term, 
			content: listNode,
			closable: true
		});
		contr.addChild(panel);

		// render the items into the <ul> node
		this.renderItems(items, listNode);

		// make this tab selected
		contr.selectChild(panel);

		// connect mouse click events to our event delegation method
		var hdl = dojo.connect(listNode, "onclick", this, "_onListClick");
	},
	
	showItemById: function(id, originNode) {
		var item = this._itemsById[id];
		if(item) {
			this.showImage( dojo.getObject(this.largeImageProperty, false, item), originNode);
		}
	},
	
	_onListClick: function(evt) {
		var node = evt.target, 
			containerNode = dijit.byId("tabs").containerNode;
		
		for(var node = evt.target; (node && node !==containerNode); node = node.parentNode){
			if(dojo.hasClass(node, this.itemClass)) {
				this.showItemById(node.id.substring(node.id.indexOf("_") +1), node);
				break;
			}
		}
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