/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

if(!dojo._hasResource["dijit._base.manager"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.manager"] = true;
dojo.provide("dijit._base.manager");


dojo.declare("dijit.WidgetSet", null, {
	// summary:
	//		A set of widgets indexed by id. A default instance of this class is
	//		available as `dijit.registry`
	//
	// example:
	//		Create a small list of widgets:
	//		|	var ws = new dijit.WidgetSet();
	//		|	ws.add(dijit.byId("one"));
	//		| 	ws.add(dijit.byId("two"));
	//		|	// destroy both:
	//		|	ws.forEach(function(w){ w.destroy(); });
	//
	// example:
	//		Using dijit.registry:
	//		|	dijit.registry.forEach(function(w){ /* do something */ });

	constructor: function(){
		this._hash = {};
		this.length = 0;
	},

	add: function(/*dijit._Widget*/ widget){
		// summary:
		//		Add a widget to this list. If a duplicate ID is detected, a error is thrown.
		//
		// widget: dijit._Widget
		//		Any dijit._Widget subclass.
		if(this._hash[widget.id]){
			throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
		}
		this._hash[widget.id] = widget;
		this.length++;
	},

	remove: function(/*String*/ id){
		// summary:
		//		Remove a widget from this WidgetSet. Does not destroy the widget; simply
		//		removes the reference.
		if(this._hash[id]){
			delete this._hash[id];
			this.length--;
		}
	},

	forEach: function(/*Function*/ func, /* Object? */thisObj){
		// summary:
		//		Call specified function for each widget in this set.
		//
		// func:
		//		A callback function to run for each item. Is passed the widget, the index
		//		in the iteration, and the full hash, similar to `dojo.forEach`.
		//
		// thisObj:
		//		An optional scope parameter
		//
		// example:
		//		Using the default `dijit.registry` instance:
		//		|	dijit.registry.forEach(function(widget){
		//		|		console.log(widget.declaredClass);
		//		|	});
		//
		// returns:
		//		Returns self, in order to allow for further chaining.

		thisObj = thisObj || dojo.global;
		var i = 0, id;
		for(id in this._hash){
			func.call(thisObj, this._hash[id], i++, this._hash);
		}
		return this;	// dijit.WidgetSet
	},

	filter: function(/*Function*/ filter, /* Object? */thisObj){
		// summary:
		//		Filter down this WidgetSet to a smaller new WidgetSet
		//		Works the same as `dojo.filter` and `dojo.NodeList.filter`
		//
		// filter:
		//		Callback function to test truthiness. Is passed the widget
		//		reference and the pseudo-index in the object.
		//
		// thisObj: Object?
		//		Option scope to use for the filter function.
		//
		// example:
		//		Arbitrary: select the odd widgets in this list
		//		|	dijit.registry.filter(function(w, i){
		//		|		return i % 2 == 0;
		//		|	}).forEach(function(w){ /* odd ones */ });

		thisObj = thisObj || dojo.global;
		var res = new dijit.WidgetSet(), i = 0, id;
		for(id in this._hash){
			var w = this._hash[id];
			if(filter.call(thisObj, w, i++, this._hash)){
				res.add(w);
			}
		}
		return res; // dijit.WidgetSet
	},

	byId: function(/*String*/ id){
		// summary:
		//		Find a widget in this list by it's id.
		// example:
		//		Test if an id is in a particular WidgetSet
		//		| var ws = new dijit.WidgetSet();
		//		| ws.add(dijit.byId("bar"));
		//		| var t = ws.byId("bar") // returns a widget
		//		| var x = ws.byId("foo"); // returns undefined

		return this._hash[id];	// dijit._Widget
	},

	byClass: function(/*String*/ cls){
		// summary:
		//		Reduce this widgetset to a new WidgetSet of a particular `declaredClass`
		//
		// cls: String
		//		The Class to scan for. Full dot-notated string.
		//
		// example:
		//		Find all `dijit.TitlePane`s in a page:
		//		|	dijit.registry.byClass("dijit.TitlePane").forEach(function(tp){ tp.close(); });

		var res = new dijit.WidgetSet(), id, widget;
		for(id in this._hash){
			widget = this._hash[id];
			if(widget.declaredClass == cls){
				res.add(widget);
			}
		 }
		 return res; // dijit.WidgetSet
},

	toArray: function(){
		// summary:
		//		Convert this WidgetSet into a true Array
		//
		// example:
		//		Work with the widget .domNodes in a real Array
		//		|	dojo.map(dijit.registry.toArray(), function(w){ return w.domNode; });

		var ar = [];
		for(var id in this._hash){
			ar.push(this._hash[id]);
		}
		return ar;	// dijit._Widget[]
},

	map: function(/* Function */func, /* Object? */thisObj){
		// summary:
		//		Create a new Array from this WidgetSet, following the same rules as `dojo.map`
		// example:
		//		|	var nodes = dijit.registry.map(function(w){ return w.domNode; });
		//
		// returns:
		//		A new array of the returned values.
		return dojo.map(this.toArray(), func, thisObj); // Array
	},

	every: function(func, thisObj){
		// summary:
		// 		A synthetic clone of `dojo.every` acting explicitly on this WidgetSet
		//
		// func: Function
		//		A callback function run for every widget in this list. Exits loop
		//		when the first false return is encountered.
		//
		// thisObj: Object?
		//		Optional scope parameter to use for the callback

		thisObj = thisObj || dojo.global;
		var x = 0, i;
		for(i in this._hash){
			if(!func.call(thisObj, this._hash[i], x++, this._hash)){
				return false; // Boolean
			}
		}
		return true; // Boolean
	},

	some: function(func, thisObj){
		// summary:
		// 		A synthetic clone of `dojo.some` acting explictly on this WidgetSet
		//
		// func: Function
		//		A callback function run for every widget in this list. Exits loop
		//		when the first true return is encountered.
		//
		// thisObj: Object?
		//		Optional scope parameter to use for the callback

		thisObj = thisObj || dojo.global;
		var x = 0, i;
		for(i in this._hash){
			if(func.call(thisObj, this._hash[i], x++, this._hash)){
				return true; // Boolean
			}
		}
		return false; // Boolean
	}

});

(function(){

	/*=====
	dijit.registry = {
		// summary:
		//		A list of widgets on a page.
		// description:
		//		Is an instance of `dijit.WidgetSet`
	};
	=====*/
	dijit.registry = new dijit.WidgetSet();

	var hash = dijit.registry._hash,
		attr = dojo.attr,
		hasAttr = dojo.hasAttr,
		style = dojo.style;

	dijit.byId = function(/*String|dijit._Widget*/ id){
		// summary:
		//		Returns a widget by it's id, or if passed a widget, no-op (like dojo.byId())
		return typeof id == "string" ? hash[id] : id; // dijit._Widget
	};

	var _widgetTypeCtr = {};
	dijit.getUniqueId = function(/*String*/widgetType){
		// summary:
		//		Generates a unique id for a given widgetType
	
		var id;
		do{
			id = widgetType + "_" +
				(widgetType in _widgetTypeCtr ?
					++_widgetTypeCtr[widgetType] : _widgetTypeCtr[widgetType] = 0);
		}while(hash[id]);
		return dijit._scopeName == "dijit" ? id : dijit._scopeName + "_" + id; // String
	};
	
	dijit.findWidgets = function(/*DomNode*/ root){
		// summary:
		//		Search subtree under root returning widgets found.
		//		Doesn't search for nested widgets (ie, widgets inside other widgets).
	
		var outAry = [];
	
		function getChildrenHelper(root){
			for(var node = root.firstChild; node; node = node.nextSibling){
				if(node.nodeType == 1){
					var widgetId = node.getAttribute("widgetId");
					if(widgetId){
						var widget = hash[widgetId];
						if(widget){	// may be null on page w/multiple dojo's loaded
							outAry.push(widget);
						}
					}else{
						getChildrenHelper(node);
					}
				}
			}
		}
	
		getChildrenHelper(root);
		return outAry;
	};
	
	dijit._destroyAll = function(){
		// summary:
		//		Code to destroy all widgets and do other cleanup on page unload
	
		// Clean up focus manager lingering references to widgets and nodes
		dijit._curFocus = null;
		dijit._prevFocus = null;
		dijit._activeStack = [];
	
		// Destroy all the widgets, top down
		dojo.forEach(dijit.findWidgets(dojo.body()), function(widget){
			// Avoid double destroy of widgets like Menu that are attached to <body>
			// even though they are logically children of other widgets.
			if(!widget._destroyed){
				if(widget.destroyRecursive){
					widget.destroyRecursive();
				}else if(widget.destroy){
					widget.destroy();
				}
			}
		});
	};
	
	if(dojo.isIE){
		// Only run _destroyAll() for IE because we think it's only necessary in that case,
		// and because it causes problems on FF.  See bug #3531 for details.
		dojo.addOnWindowUnload(function(){
			dijit._destroyAll();
		});
	}
	
	dijit.byNode = function(/*DOMNode*/ node){
		// summary:
		//		Returns the widget corresponding to the given DOMNode
		return hash[node.getAttribute("widgetId")]; // dijit._Widget
	};
	
	dijit.getEnclosingWidget = function(/*DOMNode*/ node){
		// summary:
		//		Returns the widget whose DOM tree contains the specified DOMNode, or null if
		//		the node is not contained within the DOM tree of any widget
		while(node){
			var id = node.getAttribute && node.getAttribute("widgetId");
			if(id){
				return hash[id];
			}
			node = node.parentNode;
		}
		return null;
	};

	var shown = (dijit._isElementShown = function(/*Element*/ elem){
		var s = style(elem);
		return (s.visibility != "hidden")
			&& (s.visibility != "collapsed")
			&& (s.display != "none")
			&& (attr(elem, "type") != "hidden");
	});
	
	dijit.hasDefaultTabStop = function(/*Element*/ elem){
		// summary:
		//		Tests if element is tab-navigable even without an explicit tabIndex setting
	
		// No explicit tabIndex setting, need to investigate node type
		switch(elem.nodeName.toLowerCase()){
			case "a":
				// An <a> w/out a tabindex is only navigable if it has an href
				return hasAttr(elem, "href");
			case "area":
			case "button":
			case "input":
			case "object":
			case "select":
			case "textarea":
				// These are navigable by default
				return true;
			case "iframe":
				// If it's an editor <iframe> then it's tab navigable.
				var body;
				try{
					// non-IE
					var contentDocument = elem.contentDocument;
					if("designMode" in contentDocument && contentDocument.designMode == "on"){
						return true;
					}
					body = contentDocument.body;
				}catch(e1){
					// contentWindow.document isn't accessible within IE7/8
					// if the iframe.src points to a foreign url and this
					// page contains an element, that could get focus
					try{
						body = elem.contentWindow.document.body;
					}catch(e2){
						return false;
					}
				}
				return body.contentEditable == 'true' || (body.firstChild && body.firstChild.contentEditable == 'true');
			default:
				return elem.contentEditable == 'true';
		}
	};
	
	var isTabNavigable = (dijit.isTabNavigable = function(/*Element*/ elem){
		// summary:
		//		Tests if an element is tab-navigable
	
		// TODO: convert (and rename method) to return effective tabIndex; will save time in _getTabNavigable()
		if(attr(elem, "disabled")){
			return false;
		}else if(hasAttr(elem, "tabIndex")){
			// Explicit tab index setting
			return attr(elem, "tabIndex") >= 0; // boolean
		}else{
			// No explicit tabIndex setting, so depends on node type
			return dijit.hasDefaultTabStop(elem);
		}
	});

	dijit._getTabNavigable = function(/*DOMNode*/ root){
		// summary:
		//		Finds descendants of the specified root node.
		//
		// description:
		//		Finds the following descendants of the specified root node:
		//		* the first tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the last tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the first element in document order with the lowest
		//		  positive tabIndex value
		//		* the last element in document order with the highest
		//		  positive tabIndex value
		var first, last, lowest, lowestTabindex, highest, highestTabindex, radioSelected = {};
		function radioName(node) {
			// If this element is part of a radio button group, return the name for that group.
			return node && node.tagName.toLowerCase() == "input" &&
				node.type && node.type.toLowerCase() == "radio" &&
				node.name && node.name.toLowerCase();
		}
		var walkTree = function(/*DOMNode*/parent){
			dojo.query("> *", parent).forEach(function(child){
				// Skip hidden elements, and also non-HTML elements (those in custom namespaces) in IE,
				// since show() invokes getAttribute("type"), which crash on VML nodes in IE.
				if((dojo.isIE && child.scopeName!=="HTML") || !shown(child)){
					return;
				}

				if(isTabNavigable(child)){
					var tabindex = attr(child, "tabIndex");
					if(!hasAttr(child, "tabIndex") || tabindex == 0){
						if(!first){ first = child; }
						last = child;
					}else if(tabindex > 0){
						if(!lowest || tabindex < lowestTabindex){
							lowestTabindex = tabindex;
							lowest = child;
						}
						if(!highest || tabindex >= highestTabindex){
							highestTabindex = tabindex;
							highest = child;
						}
					}
					var rn = radioName(child);
					if(dojo.attr(child, "checked") && rn) {
						radioSelected[rn] = child;
					}
				}
				if(child.nodeName.toUpperCase() != 'SELECT'){
					walkTree(child);
				}
			});
		};
		if(shown(root)){ walkTree(root) }
		function rs(node) {
			// substitute checked radio button for unchecked one, if there is a checked one with the same name.
			return radioSelected[radioName(node)] || node;
		}
		return { first: rs(first), last: rs(last), lowest: rs(lowest), highest: rs(highest) };
	}
	dijit.getFirstInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is first in the tabbing order
		var elems = dijit._getTabNavigable(dojo.byId(root));
		return elems.lowest ? elems.lowest : elems.first; // DomNode
	};
	
	dijit.getLastInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is last in the tabbing order
		var elems = dijit._getTabNavigable(dojo.byId(root));
		return elems.last ? elems.last : elems.highest; // DomNode
	};
	
	/*=====
	dojo.mixin(dijit, {
		// defaultDuration: Integer
		//		The default animation speed (in ms) to use for all Dijit
		//		transitional animations, unless otherwise specified
		//		on a per-instance basis. Defaults to 200, overrided by
		//		`djConfig.defaultDuration`
		defaultDuration: 200
	});
	=====*/
	
	dijit.defaultDuration = dojo.config["defaultDuration"] || 200;

})();

}

if(!dojo._hasResource["dojo.Stateful"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.Stateful"] = true;
dojo.provide("dojo.Stateful");


dojo.declare("dojo.Stateful", null, {
	// summary:
	//		Base class for objects that provide named properties with optional getter/setter
	//		control and the ability to watch for property changes
	// example:
	//	|	var obj = new dojo.Stateful();
	//	|	obj.watch("foo", function(){
	//	|		console.log("foo changed to " + this.get("foo"));
	//	|	});
	//	|	obj.set("foo","bar");
	postscript: function(mixin){
		if(mixin){
			dojo.mixin(this, mixin);
		}
	},
	
	get: function(/*String*/name){
		// summary:
		//		Get a property on a Stateful instance.
		//	name:
		//		The property to get.
		// description:
		//		Get a named property on a Stateful object. The property may
		//		potentially be retrieved via a getter method in subclasses. In the base class
		// 		this just retrieves the object's property.
		// 		For example:
		//	|	stateful = new dojo.Stateful({foo: 3});
		//	|	stateful.get("foo") // returns 3
		//	|	stateful.foo // returns 3
		
		return this[name];
	},
	set: function(/*String*/name, /*Object*/value){
		// summary:
		//		Set a property on a Stateful instance
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		// description:
		//		Sets named properties on a stateful object and notifies any watchers of
		// 		the property. A programmatic setter may be defined in subclasses.
		// 		For example:
		//	|	stateful = new dojo.Stateful();
		//	|	stateful.watch(function(name, oldValue, value){
		//	|		// this will be called on the set below
		//	|	}
		//	|	stateful.set(foo, 5);
		//
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|	myObj.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	})
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)
		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks){
			this._watchCallbacks(name, oldValue, value);
		}
		return this;
	},
	watch: function(/*String?*/name, /*Function*/callback){
		// summary:
		//		Watches a property for changes
		//	name:
		//		Indicates the property to watch. This is optional (the callback may be the
		// 		only parameter), and if omitted, all the properties will be watched
		// returns:
		//		An object handle for the watch. The unwatch method of this object
		// 		can be used to discontinue watching this property:
		//		|	var watchHandle = obj.watch("foo", callback);
		//		|	watchHandle.unwatch(); // callback won't be called now
		//	callback:
		//		The function to execute when the property changes. This will be called after
		//		the property has been changed. The callback will be called with the |this|
		//		set to the instance, the first argument as the name of the property, the
		// 		second argument as the old value and the third argument as the new value.
		
		var callbacks = this._watchCallbacks;
		if(!callbacks){
			var self = this;
			callbacks = this._watchCallbacks = function(name, oldValue, value, ignoreCatchall){
				var notify = function(propertyCallbacks){
					if(propertyCallbacks){
                        propertyCallbacks = propertyCallbacks.slice();
						for(var i = 0, l = propertyCallbacks.length; i < l; i++){
							try{
								propertyCallbacks[i].call(self, name, oldValue, value);
							}catch(e){
								console.error(e);
							}
						}
					}
				};
				notify(callbacks['_' + name]);
				if(!ignoreCatchall){
					notify(callbacks["*"]); // the catch-all
				}
			}; // we use a function instead of an object so it will be ignored by JSON conversion
		}
		if(!callback && typeof name === "function"){
			callback = name;
			name = "*";
		}else{
			// prepend with dash to prevent name conflicts with function (like "name" property)
			name = '_' + name;
		}
		var propertyCallbacks = callbacks[name];
		if(typeof propertyCallbacks !== "object"){
			propertyCallbacks = callbacks[name] = [];
		}
		propertyCallbacks.push(callback);
		return {
			unwatch: function(){
				propertyCallbacks.splice(dojo.indexOf(propertyCallbacks, callback), 1);
			}
		};
	}
	
});

}

if(!dojo._hasResource["dijit._WidgetBase"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._WidgetBase"] = true;
dojo.provide("dijit._WidgetBase");




(function(){

dojo.declare("dijit._WidgetBase", dojo.Stateful, {
	// summary:
	//		Future base class for all Dijit widgets.
	//		_Widget extends this class adding support for various features needed by desktop.

	// id: [const] String
	//		A unique, opaque ID string that can be assigned by users or by the
	//		system. If the developer passes an ID which is known not to be
	//		unique, the specified ID is ignored and the system-generated ID is
	//		used instead.
	id: "",

	// lang: [const] String
	//		Rarely used.  Overrides the default Dojo locale used to render this widget,
	//		as defined by the [HTML LANG](http://www.w3.org/TR/html401/struct/dirlang.html#adef-lang) attribute.
	//		Value must be among the list of locales specified during by the Dojo bootstrap,
	//		formatted according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt) (like en-us).
	lang: "",

	// dir: [const] String
	//		Bi-directional support, as defined by the [HTML DIR](http://www.w3.org/TR/html401/struct/dirlang.html#adef-dir)
	//		attribute. Either left-to-right "ltr" or right-to-left "rtl".  If undefined, widgets renders in page's
	//		default direction.
	dir: "",

	// class: String
	//		HTML class attribute
	"class": "",

	// style: String||Object
	//		HTML style attributes as cssText string or name/value hash
	style: "",

	// title: String
	//		HTML title attribute.
	//
	//		For form widgets this specifies a tooltip to display when hovering over
	//		the widget (just like the native HTML title attribute).
	//
	//		For TitlePane or for when this widget is a child of a TabContainer, AccordionContainer,
	//		etc., it's used to specify the tab label, accordion pane title, etc.
	title: "",

	// tooltip: String
	//		When this widget's title attribute is used to for a tab label, accordion pane title, etc.,
	//		this specifies the tooltip to appear when the mouse is hovered over that text.
	tooltip: "",

	// baseClass: [protected] String
	//		Root CSS class of the widget (ex: dijitTextBox), used to construct CSS classes to indicate
	//		widget state.
	baseClass: "",

	// srcNodeRef: [readonly] DomNode
	//		pointer to original DOM node
	srcNodeRef: null,

	// domNode: [readonly] DomNode
	//		This is our visible representation of the widget! Other DOM
	//		Nodes may by assigned to other properties, usually through the
	//		template system's dojoAttachPoint syntax, but the domNode
	//		property is the canonical "top level" node in widget UI.
	domNode: null,

	// containerNode: [readonly] DomNode
	//		Designates where children of the source DOM node will be placed.
	//		"Children" in this case refers to both DOM nodes and widgets.
	//		For example, for myWidget:
	//
	//		|	<div dojoType=myWidget>
	//		|		<b> here's a plain DOM node
	//		|		<span dojoType=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//		|	</div>
	//
	//		containerNode would point to:
	//
	//		|		<b> here's a plain DOM node
	//		|		<span dojoType=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//
	//		In templated widgets, "containerNode" is set via a
	//		dojoAttachPoint assignment.
	//
	//		containerNode must be defined for any widget that accepts innerHTML
	//		(like ContentPane or BorderContainer or even Button), and conversely
	//		is null for widgets that don't, like TextBox.
	containerNode: null,

/*=====
	// _started: Boolean
	//		startup() has completed.
	_started: false,
=====*/

	// attributeMap: [protected] Object
	//		attributeMap sets up a "binding" between attributes (aka properties)
	//		of the widget and the widget's DOM.
	//		Changes to widget attributes listed in attributeMap will be
	//		reflected into the DOM.
	//
	//		For example, calling set('title', 'hello')
	//		on a TitlePane will automatically cause the TitlePane's DOM to update
	//		with the new title.
	//
	//		attributeMap is a hash where the key is an attribute of the widget,
	//		and the value reflects a binding to a:
	//
	//		- DOM node attribute
	// |		focus: {node: "focusNode", type: "attribute"}
	// 		Maps this.focus to this.focusNode.focus
	//
	//		- DOM node innerHTML
	//	|		title: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		title: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		myClass: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		There are also some shorthands for backwards compatibility:
	//		- string --> { node: string, type: "attribute" }, for example:
	//	|	"focusNode" ---> { node: "focusNode", type: "attribute" }
	//		- "" --> { node: "domNode", type: "attribute" }
	attributeMap: {id:"", dir:"", lang:"", "class":"", style:"", title:""},

	// _blankGif: [protected] String
	//		Path to a blank 1x1 image.
	//		Used by <img> nodes in templates that really get their image via CSS background-image.
	_blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")).toString(),

	//////////// INITIALIZATION METHODS ///////////////////////////////////////

	postscript: function(/*Object?*/params, /*DomNode|String*/srcNodeRef){
		// summary:
		//		Kicks off widget instantiation.  See create() for details.
		// tags:
		//		private
		this.create(params, srcNodeRef);
	},

	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		// summary:
		//		Kick off the life-cycle of a widget
		// params:
		//		Hash of initialization parameters for widget, including
		//		scalar values (like title, duration etc.) and functions,
		//		typically callbacks like onClick.
		// srcNodeRef:
		//		If a srcNodeRef (DOM node) is specified:
		//			- use srcNodeRef.innerHTML as my contents
		//			- if this is a behavioral widget then apply behavior
		//			  to that srcNodeRef
		//			- otherwise, replace srcNodeRef with my generated DOM
		//			  tree
		// description:
		//		Create calls a number of widget methods (postMixInProperties, buildRendering, postCreate,
		//		etc.), some of which of you'll want to override. See http://docs.dojocampus.org/dijit/_Widget
		//		for a discussion of the widget creation lifecycle.
		//
		//		Of course, adventurous developers could override create entirely, but this should
		//		only be done as a last resort.
		// tags:
		//		private

		// store pointer to original DOM tree
		this.srcNodeRef = dojo.byId(srcNodeRef);

		// For garbage collection.  An array of handles returned by Widget.connect()
		// Each handle returned from Widget.connect() is an array of handles from dojo.connect()
		this._connects = [];

		// For garbage collection.  An array of handles returned by Widget.subscribe()
		// The handle returned from Widget.subscribe() is the handle returned from dojo.subscribe()
		this._subscribes = [];

		// mix in our passed parameters
		if(this.srcNodeRef && (typeof this.srcNodeRef.id == "string")){ this.id = this.srcNodeRef.id; }
		if(params){
			this.params = params;
			dojo._mixin(this, params);
		}
		this.postMixInProperties();

		// generate an id for the widget if one wasn't specified
		// (be sure to do this before buildRendering() because that function might
		// expect the id to be there.)
		if(!this.id){
			this.id = dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
		}
		dijit.registry.add(this);

		this.buildRendering();

		if(this.domNode){
			// Copy attributes listed in attributeMap into the [newly created] DOM for the widget.
			// Also calls custom setters for all attributes with custom setters.
			this._applyAttributes();

			// If srcNodeRef was specified, then swap out original srcNode for this widget's DOM tree.
			// For 2.0, move this after postCreate().  postCreate() shouldn't depend on the
			// widget being attached to the DOM since it isn't when a widget is created programmatically like
			// new MyWidget({}).   See #11635.
			var source = this.srcNodeRef;
			if(source && source.parentNode && this.domNode !== source){
				source.parentNode.replaceChild(this.domNode, source);
			}
		}

		if(this.domNode){
			// Note: for 2.0 may want to rename widgetId to dojo._scopeName + "_widgetId",
			// assuming that dojo._scopeName even exists in 2.0
			this.domNode.setAttribute("widgetId", this.id);
		}
		this.postCreate();

		// If srcNodeRef has been processed and removed from the DOM (e.g. TemplatedWidget) then delete it to allow GC.
		if(this.srcNodeRef && !this.srcNodeRef.parentNode){
			delete this.srcNodeRef;
		}

		this._created = true;
	},

	_applyAttributes: function(){
		// summary:
		//		Step during widget creation to copy all widget attributes to the
		//		DOM as per attributeMap and _setXXXAttr functions.
		// description:
		//		Skips over blank/false attribute values, unless they were explicitly specified
		//		as parameters to the widget, since those are the default anyway,
		//		and setting tabIndex="" is different than not setting tabIndex at all.
		//
		//		It processes the attributes in the attribute map first, and then
		//		it goes through and processes the attributes for the _setXXXAttr
		//		functions that have been specified
		// tags:
		//		private
		var condAttrApply = function(attr, scope){
			if((scope.params && attr in scope.params) || scope[attr]){
				scope.set(attr, scope[attr]);
			}
		};

		// Do the attributes in attributeMap
		for(var attr in this.attributeMap){
			condAttrApply(attr, this);
		}

		// And also any attributes with custom setters
		dojo.forEach(this._getSetterAttributes(), function(a){
			if(!(a in this.attributeMap)){
				condAttrApply(a, this);
			}
		}, this);
	},

	_getSetterAttributes: function(){
		// summary:
		//		Returns list of attributes with custom setters for this widget
		var ctor = this.constructor;
		if(!ctor._setterAttrs){
			var r = (ctor._setterAttrs = []),
				attrs,
				proto = ctor.prototype;
			for(var fxName in proto){
				if(dojo.isFunction(proto[fxName]) && (attrs = fxName.match(/^_set([a-zA-Z]*)Attr$/)) && attrs[1]){
					r.push(attrs[1].charAt(0).toLowerCase() + attrs[1].substr(1));
				}
			}
		}
		return ctor._setterAttrs;	// String[]
	},

	postMixInProperties: function(){
		// summary:
		//		Called after the parameters to the widget have been read-in,
		//		but before the widget template is instantiated. Especially
		//		useful to set properties that are referenced in the widget
		//		template.
		// tags:
		//		protected
	},

	buildRendering: function(){
		// summary:
		//		Construct the UI for this widget, setting this.domNode
		// description:
		//		Most widgets will mixin `dijit._Templated`, which implements this
		//		method.
		// tags:
		//		protected

		if(!this.domNode){
			// Create root node if it wasn't created by _Templated
			this.domNode = this.srcNodeRef || dojo.create('div');
		}

		// baseClass is a single class name or occasionally a space-separated list of names.
		// Add those classes to the DOMNode.  If RTL mode then also add with Rtl suffix.
		// TODO: make baseClass custom setter
		if(this.baseClass){
			var classes = this.baseClass.split(" ");
			if(!this.isLeftToRight()){
				classes = classes.concat( dojo.map(classes, function(name){ return name+"Rtl"; }));
			}
			dojo.addClass(this.domNode, classes);
		}
	},

	postCreate: function(){
		// summary:
		//		Processing after the DOM fragment is created
		// description:
		//		Called after the DOM fragment has been created, but not necessarily
		//		added to the document.  Do not include any operations which rely on
		//		node dimensions or placement.
		// tags:
		//		protected
	},

	startup: function(){
		// summary:
		//		Processing after the DOM fragment is added to the document
		// description:
		//		Called after a widget and its children have been created and added to the page,
		//		and all related widgets have finished their create() cycle, up through postCreate().
		//		This is useful for composite widgets that need to control or layout sub-widgets.
		//		Many layout widgets can use this as a wiring phase.
		this._started = true;
	},

	//////////// DESTROY FUNCTIONS ////////////////////////////////

	destroyRecursive: function(/*Boolean?*/ preserveDom){
		// summary:
		// 		Destroy this widget and its descendants
		// description:
		//		This is the generic "destructor" function that all widget users
		// 		should call to cleanly discard with a widget. Once a widget is
		// 		destroyed, it is removed from the manager object.
		// preserveDom:
		//		If true, this method will leave the original DOM structure
		//		alone of descendant Widgets. Note: This will NOT work with
		//		dijit._Templated widgets.

		this._beingDestroyed = true;
		this.destroyDescendants(preserveDom);
		this.destroy(preserveDom);
	},

	destroy: function(/*Boolean*/ preserveDom){
		// summary:
		// 		Destroy this widget, but not its descendants.
		//		This method will, however, destroy internal widgets such as those used within a template.
		// preserveDom: Boolean
		//		If true, this method will leave the original DOM structure alone.
		//		Note: This will not yet work with _Templated widgets

		this._beingDestroyed = true;
		this.uninitialize();
		var d = dojo,
			dfe = d.forEach,
			dun = d.unsubscribe;
		dfe(this._connects, function(array){
			dfe(array, d.disconnect);
		});
		dfe(this._subscribes, function(handle){
			dun(handle);
		});

		// destroy widgets created as part of template, etc.
		dfe(this._supportingWidgets || [], function(w){
			if(w.destroyRecursive){
				w.destroyRecursive();
			}else if(w.destroy){
				w.destroy();
			}
		});

		this.destroyRendering(preserveDom);
		dijit.registry.remove(this.id);
		this._destroyed = true;
	},

	destroyRendering: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Destroys the DOM nodes associated with this widget
		// preserveDom:
		//		If true, this method will leave the original DOM structure alone
		//		during tear-down. Note: this will not work with _Templated
		//		widgets yet.
		// tags:
		//		protected

		if(this.bgIframe){
			this.bgIframe.destroy(preserveDom);
			delete this.bgIframe;
		}

		if(this.domNode){
			if(preserveDom){
				dojo.removeAttr(this.domNode, "widgetId");
			}else{
				dojo.destroy(this.domNode);
			}
			delete this.domNode;
		}

		if(this.srcNodeRef){
			if(!preserveDom){
				dojo.destroy(this.srcNodeRef);
			}
			delete this.srcNodeRef;
		}
	},

	destroyDescendants: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Recursively destroy the children of this widget and their
		//		descendants.
		// preserveDom:
		//		If true, the preserveDom attribute is passed to all descendant
		//		widget's .destroy() method. Not for use with _Templated
		//		widgets.

		// get all direct descendants and destroy them recursively
		dojo.forEach(this.getChildren(), function(widget){
			if(widget.destroyRecursive){
				widget.destroyRecursive(preserveDom);
			}
		});
	},

	uninitialize: function(){
		// summary:
		//		Stub function. Override to implement custom widget tear-down
		//		behavior.
		// tags:
		//		protected
		return false;
	},

	////////////////// GET/SET, CUSTOM SETTERS, ETC. ///////////////////

	_setClassAttr: function(/*String*/ value){
		// summary:
		//		Custom setter for the CSS "class" attribute
		// tags:
		//		protected
		var mapNode = this[this.attributeMap["class"] || 'domNode'];
		dojo.replaceClass(mapNode, value, this["class"]);
		this._set("class", value);
	},

	_setStyleAttr: function(/*String||Object*/ value){
		// summary:
		//		Sets the style attribute of the widget according to value,
		//		which is either a hash like {height: "5px", width: "3px"}
		//		or a plain string
		// description:
		//		Determines which node to set the style on based on style setting
		//		in attributeMap.
		// tags:
		//		protected

		var mapNode = this[this.attributeMap.style || 'domNode'];

		// Note: technically we should revert any style setting made in a previous call
		// to his method, but that's difficult to keep track of.

		if(dojo.isObject(value)){
			dojo.style(mapNode, value);
		}else{
			if(mapNode.style.cssText){
				mapNode.style.cssText += "; " + value;
			}else{
				mapNode.style.cssText = value;
			}
		}

		this._set("style", value);
	},

	_attrToDom: function(/*String*/ attr, /*String*/ value){
		// summary:
		//		Reflect a widget attribute (title, tabIndex, duration etc.) to
		//		the widget DOM, as specified in attributeMap.
		//		Note some attributes like "type"
		//		cannot be processed this way as they are not mutable.
		//
		// tags:
		//		private

		var commands = this.attributeMap[attr];
		dojo.forEach(dojo.isArray(commands) ? commands : [commands], function(command){

			// Get target node and what we are doing to that node
			var mapNode = this[command.node || command || "domNode"];	// DOM node
			var type = command.type || "attribute";	// class, innerHTML, innerText, or attribute

			switch(type){
				case "attribute":
					if(dojo.isFunction(value)){ // functions execute in the context of the widget
						value = dojo.hitch(this, value);
					}

					// Get the name of the DOM node attribute; usually it's the same
					// as the name of the attribute in the widget (attr), but can be overridden.
					// Also maps handler names to lowercase, like onSubmit --> onsubmit
					var attrName = command.attribute ? command.attribute :
						(/^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr);

					dojo.attr(mapNode, attrName, value);
					break;
				case "innerText":
					mapNode.innerHTML = "";
					mapNode.appendChild(dojo.doc.createTextNode(value));
					break;
				case "innerHTML":
					mapNode.innerHTML = value;
					break;
				case "class":
					dojo.replaceClass(mapNode, value, this[attr]);
					break;
			}
		}, this);
	},

	get: function(name){
		// summary:
		//		Get a property from a widget.
		//	name:
		//		The property to get.
		// description:
		//		Get a named property from a widget. The property may
		//		potentially be retrieved via a getter method. If no getter is defined, this
		// 		just retrieves the object's property.
		// 		For example, if the widget has a properties "foo"
		//		and "bar" and a method named "_getFooAttr", calling:
		//	|	myWidget.get("foo");
		//		would be equivalent to writing:
		//	|	widget._getFooAttr();
		//		and:
		//	|	myWidget.get("bar");
		//		would be equivalent to writing:
		//	|	widget.bar;
		var names = this._getAttrNames(name);
		return this[names.g] ? this[names.g]() : this[name];
	},
	
	set: function(name, value){
		// summary:
		//		Set a property on a widget
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		// description:
		//		Sets named properties on a widget which may potentially be handled by a
		// 		setter in the widget.
		// 		For example, if the widget has a properties "foo"
		//		and "bar" and a method named "_setFooAttr", calling:
		//	|	myWidget.set("foo", "Howdy!");
		//		would be equivalent to writing:
		//	|	widget._setFooAttr("Howdy!");
		//		and:
		//	|	myWidget.set("bar", 3);
		//		would be equivalent to writing:
		//	|	widget.bar = 3;
		//
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|	myWidget.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	})
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)

		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var names = this._getAttrNames(name);
		if(this[names.s]){
			// use the explicit setter
			var result = this[names.s].apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			// if param is specified as DOM node attribute, copy it
			if(name in this.attributeMap){
				this._attrToDom(name, value);
			}
			this._set(name, value);
		}
		return result || this;
	},
	
	_attrPairNames: {},		// shared between all widgets
	_getAttrNames: function(name){
		// summary:
		//		Helper function for get() and set().
		//		Caches attribute name values so we don't do the string ops every time.
		// tags:
		//		private

		var apn = this._attrPairNames;
		if(apn[name]){ return apn[name]; }
		var uc = name.charAt(0).toUpperCase() + name.substr(1);
		return (apn[name] = {
			n: name+"Node",
			s: "_set"+uc+"Attr",
			g: "_get"+uc+"Attr"
		});
	},

	_set: function(/*String*/ name, /*anything*/ value){
		// summary:
		//		Helper function to set new value for specified attribute, and call handlers
		//		registered with watch() if the value has changed.
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks && this._created && value !== oldValue){
			this._watchCallbacks(name, oldValue, value);
		}
	},

	toString: function(){
		// summary:
		//		Returns a string that represents the widget
		// description:
		//		When a widget is cast to a string, this method will be used to generate the
		//		output. Currently, it does not implement any sort of reversible
		//		serialization.
		return '[Widget ' + this.declaredClass + ', ' + (this.id || 'NO ID') + ']'; // String
	},

	getDescendants: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		This method should generally be avoided as it returns widgets declared in templates, which are
		//		supposed to be internal/hidden, but it's left here for back-compat reasons.

		return this.containerNode ? dojo.query('[widgetId]', this.containerNode).map(dijit.byNode) : []; // dijit._Widget[]
	},

	getChildren: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		Does not return nested widgets, nor widgets that are part of this widget's template.
		return this.containerNode ? dijit.findWidgets(this.containerNode) : []; // dijit._Widget[]
	},

	connect: function(
			/*Object|null*/ obj,
			/*String|Function*/ event,
			/*String|Function*/ method){
		// summary:
		//		Connects specified obj/event to specified method of this object
		//		and registers for disconnect() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.connect, except with the
		//		implicit use of this widget as the target object.
		//		Events connected with `this.connect` are disconnected upon
		//		destruction.
		// returns:
		//		A handle that can be passed to `disconnect` in order to disconnect before
		//		the widget is destroyed.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when foo.bar() is called, call the listener we're going to
		//	|	// provide in the scope of btn
		//	|	btn.connect(foo, "bar", function(){
		//	|		console.debug(this.toString());
		//	|	});
		// tags:
		//		protected

		var handles = [dojo._connect(obj, event, this, method)];
		this._connects.push(handles);
		return handles;		// _Widget.Handle
	},

	disconnect: function(/* _Widget.Handle */ handles){
		// summary:
		//		Disconnects handle created by `connect`.
		//		Also removes handle from this widget's list of connects.
		// tags:
		//		protected
		for(var i=0; i<this._connects.length; i++){
			if(this._connects[i] == handles){
				dojo.forEach(handles, dojo.disconnect);
				this._connects.splice(i, 1);
				return;
			}
		}
	},

	subscribe: function(
			/*String*/ topic,
			/*String|Function*/ method){
		// summary:
		//		Subscribes to the specified topic and calls the specified method
		//		of this object and registers for unsubscribe() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.subscribe, except with the
		//		implicit use of this widget as the target object.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when /my/topic is published, this button changes its label to
		//	|   // be the parameter of the topic.
		//	|	btn.subscribe("/my/topic", function(v){
		//	|		this.set("label", v);
		//	|	});
		var handle = dojo.subscribe(topic, this, method);

		// return handles for Any widget that may need them
		this._subscribes.push(handle);
		return handle;
	},

	unsubscribe: function(/*Object*/ handle){
		// summary:
		//		Unsubscribes handle created by this.subscribe.
		//		Also removes handle from this widget's list of subscriptions
		for(var i=0; i<this._subscribes.length; i++){
			if(this._subscribes[i] == handle){
				dojo.unsubscribe(handle);
				this._subscribes.splice(i, 1);
				return;
			}
		}
	},

	isLeftToRight: function(){
		// summary:
		//		Return this widget's explicit or implicit orientation (true for LTR, false for RTL)
		// tags:
		//		protected
		return this.dir ? (this.dir == "ltr") : dojo._isBodyLtr(); //Boolean
	},

	placeAt: function(/* String|DomNode|_Widget */reference, /* String?|Int? */position){
		// summary:
		//		Place this widget's domNode reference somewhere in the DOM based
		//		on standard dojo.place conventions, or passing a Widget reference that
		//		contains and addChild member.
		//
		// description:
		//		A convenience function provided in all _Widgets, providing a simple
		//		shorthand mechanism to put an existing (or newly created) Widget
		//		somewhere in the dom, and allow chaining.
		//
		// reference:
		//		The String id of a domNode, a domNode reference, or a reference to a Widget posessing
		//		an addChild method.
		//
		// position:
		//		If passed a string or domNode reference, the position argument
		//		accepts a string just as dojo.place does, one of: "first", "last",
		//		"before", or "after".
		//
		//		If passed a _Widget reference, and that widget reference has an ".addChild" method,
		//		it will be called passing this widget instance into that method, supplying the optional
		//		position index passed.
		//
		// returns:
		//		dijit._Widget
		//		Provides a useful return of the newly created dijit._Widget instance so you
		//		can "chain" this function by instantiating, placing, then saving the return value
		//		to a variable.
		//
		// example:
		// | 	// create a Button with no srcNodeRef, and place it in the body:
		// | 	var button = new dijit.form.Button({ label:"click" }).placeAt(dojo.body());
		// | 	// now, 'button' is still the widget reference to the newly created button
		// | 	dojo.connect(button, "onClick", function(e){ console.log('click'); });
		//
		// example:
		// |	// create a button out of a node with id="src" and append it to id="wrapper":
		// | 	var button = new dijit.form.Button({},"src").placeAt("wrapper");
		//
		// example:
		// |	// place a new button as the first element of some div
		// |	var button = new dijit.form.Button({ label:"click" }).placeAt("wrapper","first");
		//
		// example:
		// |	// create a contentpane and add it to a TabContainer
		// |	var tc = dijit.byId("myTabs");
		// |	new dijit.layout.ContentPane({ href:"foo.html", title:"Wow!" }).placeAt(tc)

		if(reference.declaredClass && reference.addChild){
			reference.addChild(this, position);
		}else{
			dojo.place(this.domNode, reference, position);
		}
		return this;
	}
});

})();

}

if(!dojo._hasResource["dojo.window"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.window"] = true;
dojo.provide("dojo.window");

dojo.getObject("window", true, dojo);

dojo.window.getBox = function(){
	// summary:
	//		Returns the dimensions and scroll position of the viewable area of a browser window

	var scrollRoot = (dojo.doc.compatMode == 'BackCompat') ? dojo.body() : dojo.doc.documentElement;

	// get scroll position
	var scroll = dojo._docScroll(); // scrollRoot.scrollTop/Left should work
	return { w: scrollRoot.clientWidth, h: scrollRoot.clientHeight, l: scroll.x, t: scroll.y };
};

dojo.window.get = function(doc){
	// summary:
	// 		Get window object associated with document doc

	// In some IE versions (at least 6.0), document.parentWindow does not return a
	// reference to the real window object (maybe a copy), so we must fix it as well
	// We use IE specific execScript to attach the real window reference to
	// document._parentWindow for later use
	if(dojo.isIE && window !== document.parentWindow){
		/*
		In IE 6, only the variable "window" can be used to connect events (others
		may be only copies).
		*/
		doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
		//to prevent memory leak, unset it after use
		//another possibility is to add an onUnload handler which seems overkill to me (liucougar)
		var win = doc._parentWindow;
		doc._parentWindow = null;
		return win;	//	Window
	}

	return doc.parentWindow || doc.defaultView;	//	Window
};

dojo.window.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
	// summary:
	//		Scroll the passed node into view, if it is not already.
	
	// don't rely on node.scrollIntoView working just because the function is there

	try{ // catch unexpected/unrecreatable errors (#7808) since we can recover using a semi-acceptable native method
		node = dojo.byId(node);
		var doc = node.ownerDocument || dojo.doc,
			body = doc.body || dojo.body(),
			html = doc.documentElement || body.parentNode,
			isIE = dojo.isIE, isWK = dojo.isWebKit;
		// if an untested browser, then use the native method
		if((!(dojo.isMoz || isIE || isWK || dojo.isOpera) || node == body || node == html) && (typeof node.scrollIntoView != "undefined")){
			node.scrollIntoView(false); // short-circuit to native if possible
			return;
		}
		var backCompat = doc.compatMode == 'BackCompat',
			clientAreaRoot = backCompat? body : html,
			scrollRoot = isWK ? body : clientAreaRoot,
			rootWidth = clientAreaRoot.clientWidth,
			rootHeight = clientAreaRoot.clientHeight,
			rtl = !dojo._isBodyLtr(),
			nodePos = pos || dojo.position(node),
			el = node.parentNode,
			isFixed = function(el){
				return ((isIE <= 6 || (isIE && backCompat))? false : (dojo.style(el, 'position').toLowerCase() == "fixed"));
			};
		if(isFixed(node)){ return; } // nothing to do

		while(el){
			if(el == body){ el = scrollRoot; }
			var elPos = dojo.position(el),
				fixedPos = isFixed(el);
	
			if(el == scrollRoot){
				elPos.w = rootWidth; elPos.h = rootHeight;
				if(scrollRoot == html && isIE && rtl){ elPos.x += scrollRoot.offsetWidth-elPos.w; } // IE workaround where scrollbar causes negative x
				if(elPos.x < 0 || !isIE){ elPos.x = 0; } // IE can have values > 0
				if(elPos.y < 0 || !isIE){ elPos.y = 0; }
			}else{
				var pb = dojo._getPadBorderExtents(el);
				elPos.w -= pb.w; elPos.h -= pb.h; elPos.x += pb.l; elPos.y += pb.t;
			}
	
			if(el != scrollRoot){ // body, html sizes already have the scrollbar removed
				var clientSize = el.clientWidth,
					scrollBarSize = elPos.w - clientSize;
				if(clientSize > 0 && scrollBarSize > 0){
					elPos.w = clientSize;
					if(isIE && rtl){ elPos.x += scrollBarSize; }
				}
				clientSize = el.clientHeight;
				scrollBarSize = elPos.h - clientSize;
				if(clientSize > 0 && scrollBarSize > 0){
					elPos.h = clientSize;
				}
			}
			if(fixedPos){ // bounded by viewport, not parents
				if(elPos.y < 0){
					elPos.h += elPos.y; elPos.y = 0;
				}
				if(elPos.x < 0){
					elPos.w += elPos.x; elPos.x = 0;
				}
				if(elPos.y + elPos.h > rootHeight){
					elPos.h = rootHeight - elPos.y;
				}
				if(elPos.x + elPos.w > rootWidth){
					elPos.w = rootWidth - elPos.x;
				}
			}
			// calculate overflow in all 4 directions
			var l = nodePos.x - elPos.x, // beyond left: < 0
				t = nodePos.y - Math.max(elPos.y, 0), // beyond top: < 0
				r = l + nodePos.w - elPos.w, // beyond right: > 0
				bot = t + nodePos.h - elPos.h; // beyond bottom: > 0
			if(r * l > 0){
				var s = Math[l < 0? "max" : "min"](l, r);
				nodePos.x += el.scrollLeft;
				el.scrollLeft += (isIE >= 8 && !backCompat && rtl)? -s : s;
				nodePos.x -= el.scrollLeft;
			}
			if(bot * t > 0){
				nodePos.y += el.scrollTop;
				el.scrollTop += Math[t < 0? "max" : "min"](t, bot);
				nodePos.y -= el.scrollTop;
			}
			el = (el != scrollRoot) && !fixedPos && el.parentNode;
		}
	}catch(error){
		console.error('scrollIntoView: ' + error);
		node.scrollIntoView(false);
	}
};

}

if(!dojo._hasResource["dijit._base.focus"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.focus"] = true;
dojo.provide("dijit._base.focus");




// summary:
//		These functions are used to query or set the focus and selection.
//
//		Also, they trace when widgets become activated/deactivated,
//		so that the widget can fire _onFocus/_onBlur events.
//		"Active" here means something similar to "focused", but
//		"focus" isn't quite the right word because we keep track of
//		a whole stack of "active" widgets.  Example: ComboButton --> Menu -->
//		MenuItem.  The onBlur event for ComboButton doesn't fire due to focusing
//		on the Menu or a MenuItem, since they are considered part of the
//		ComboButton widget.  It only happens when focus is shifted
//		somewhere completely different.

dojo.mixin(dijit, {
	// _curFocus: DomNode
	//		Currently focused item on screen
	_curFocus: null,

	// _prevFocus: DomNode
	//		Previously focused item on screen
	_prevFocus: null,

	isCollapsed: function(){
		// summary:
		//		Returns true if there is no text selected
		return dijit.getBookmark().isCollapsed;
	},

	getBookmark: function(){
		// summary:
		//		Retrieves a bookmark that can be used with moveToBookmark to return to the same range
		var bm, rg, tg, sel = dojo.doc.selection, cf = dijit._curFocus;

		if(dojo.global.getSelection){
			//W3C Range API for selections.
			sel = dojo.global.getSelection();
			if(sel){
				if(sel.isCollapsed){
					tg = cf? cf.tagName : "";
					if(tg){
						//Create a fake rangelike item to restore selections.
						tg = tg.toLowerCase();
						if(tg == "textarea" ||
								(tg == "input" && (!cf.type || cf.type.toLowerCase() == "text"))){
							sel = {
								start: cf.selectionStart,
								end: cf.selectionEnd,
								node: cf,
								pRange: true
							};
							return {isCollapsed: (sel.end <= sel.start), mark: sel}; //Object.
						}
					}
					bm = {isCollapsed:true};
				}else{
					rg = sel.getRangeAt(0);
					bm = {isCollapsed: false, mark: rg.cloneRange()};
				}
			}
		}else if(sel){
			// If the current focus was a input of some sort and no selection, don't bother saving
			// a native bookmark.  This is because it causes issues with dialog/page selection restore.
			// So, we need to create psuedo bookmarks to work with.
			tg = cf ? cf.tagName : "";
			tg = tg.toLowerCase();
			if(cf && tg && (tg == "button" || tg == "textarea" || tg == "input")){
				if(sel.type && sel.type.toLowerCase() == "none"){
					return {
						isCollapsed: true,
						mark: null
					}
				}else{
					rg = sel.createRange();
					return {
						isCollapsed: rg.text && rg.text.length?false:true,
						mark: {
							range: rg,
							pRange: true
						}
					};
				}
			}
			bm = {};

			//'IE' way for selections.
			try{
				// createRange() throws exception when dojo in iframe
				//and nothing selected, see #9632
				rg = sel.createRange();
				bm.isCollapsed = !(sel.type == 'Text' ? rg.htmlText.length : rg.length);
			}catch(e){
				bm.isCollapsed = true;
				return bm;
			}
			if(sel.type.toUpperCase() == 'CONTROL'){
				if(rg.length){
					bm.mark=[];
					var i=0,len=rg.length;
					while(i<len){
						bm.mark.push(rg.item(i++));
					}
				}else{
					bm.isCollapsed = true;
					bm.mark = null;
				}
			}else{
				bm.mark = rg.getBookmark();
			}
		}else{
			console.warn("No idea how to store the current selection for this browser!");
		}
		return bm; // Object
	},

	moveToBookmark: function(/*Object*/bookmark){
		// summary:
		//		Moves current selection to a bookmark
		// bookmark:
		//		This should be a returned object from dijit.getBookmark()

		var _doc = dojo.doc,
			mark = bookmark.mark;
		if(mark){
			if(dojo.global.getSelection){
				//W3C Rangi API (FF, WebKit, Opera, etc)
				var sel = dojo.global.getSelection();
				if(sel && sel.removeAllRanges){
					if(mark.pRange){
						var r = mark;
						var n = r.node;
						n.selectionStart = r.start;
						n.selectionEnd = r.end;
					}else{
						sel.removeAllRanges();
						sel.addRange(mark);
					}
				}else{
					console.warn("No idea how to restore selection for this browser!");
				}
			}else if(_doc.selection && mark){
				//'IE' way.
				var rg;
				if(mark.pRange){
					rg = mark.range;
				}else if(dojo.isArray(mark)){
					rg = _doc.body.createControlRange();
					//rg.addElement does not have call/apply method, so can not call it directly
					//rg is not available in "range.addElement(item)", so can't use that either
					dojo.forEach(mark, function(n){
						rg.addElement(n);
					});
				}else{
					rg = _doc.body.createTextRange();
					rg.moveToBookmark(mark);
				}
				rg.select();
			}
		}
	},

	getFocus: function(/*Widget?*/ menu, /*Window?*/ openedForWindow){
		// summary:
		//		Called as getFocus(), this returns an Object showing the current focus
		//		and selected text.
		//
		//		Called as getFocus(widget), where widget is a (widget representing) a button
		//		that was just pressed, it returns where focus was before that button
		//		was pressed.   (Pressing the button may have either shifted focus to the button,
		//		or removed focus altogether.)   In this case the selected text is not returned,
		//		since it can't be accurately determined.
		//
		// menu: dijit._Widget or {domNode: DomNode} structure
		//		The button that was just pressed.  If focus has disappeared or moved
		//		to this button, returns the previous focus.  In this case the bookmark
		//		information is already lost, and null is returned.
		//
		// openedForWindow:
		//		iframe in which menu was opened
		//
		// returns:
		//		A handle to restore focus/selection, to be passed to `dijit.focus`
		var node = !dijit._curFocus || (menu && dojo.isDescendant(dijit._curFocus, menu.domNode)) ? dijit._prevFocus : dijit._curFocus;
		return {
			node: node,
			bookmark: (node == dijit._curFocus) && dojo.withGlobal(openedForWindow || dojo.global, dijit.getBookmark),
			openedForWindow: openedForWindow
		}; // Object
	},

	focus: function(/*Object || DomNode */ handle){
		// summary:
		//		Sets the focused node and the selection according to argument.
		//		To set focus to an iframe's content, pass in the iframe itself.
		// handle:
		//		object returned by get(), or a DomNode

		if(!handle){ return; }

		var node = "node" in handle ? handle.node : handle,		// because handle is either DomNode or a composite object
			bookmark = handle.bookmark,
			openedForWindow = handle.openedForWindow,
			collapsed = bookmark ? bookmark.isCollapsed : false;

		// Set the focus
		// Note that for iframe's we need to use the <iframe> to follow the parentNode chain,
		// but we need to set focus to iframe.contentWindow
		if(node){
			var focusNode = (node.tagName.toLowerCase() == "iframe") ? node.contentWindow : node;
			if(focusNode && focusNode.focus){
				try{
					// Gecko throws sometimes if setting focus is impossible,
					// node not displayed or something like that
					focusNode.focus();
				}catch(e){/*quiet*/}
			}
			dijit._onFocusNode(node);
		}

		// set the selection
		// do not need to restore if current selection is not empty
		// (use keyboard to select a menu item) or if previous selection was collapsed
		// as it may cause focus shift (Esp in IE).
		if(bookmark && dojo.withGlobal(openedForWindow || dojo.global, dijit.isCollapsed) && !collapsed){
			if(openedForWindow){
				openedForWindow.focus();
			}
			try{
				dojo.withGlobal(openedForWindow || dojo.global, dijit.moveToBookmark, null, [bookmark]);
			}catch(e2){
				/*squelch IE internal error, see http://trac.dojotoolkit.org/ticket/1984 */
			}
		}
	},

	// _activeStack: dijit._Widget[]
	//		List of currently active widgets (focused widget and it's ancestors)
	_activeStack: [],

	registerIframe: function(/*DomNode*/ iframe){
		// summary:
		//		Registers listeners on the specified iframe so that any click
		//		or focus event on that iframe (or anything in it) is reported
		//		as a focus/click event on the <iframe> itself.
		// description:
		//		Currently only used by editor.
		// returns:
		//		Handle to pass to unregisterIframe()
		return dijit.registerWin(iframe.contentWindow, iframe);
	},

	unregisterIframe: function(/*Object*/ handle){
		// summary:
		//		Unregisters listeners on the specified iframe created by registerIframe.
		//		After calling be sure to delete or null out the handle itself.
		// handle:
		//		Handle returned by registerIframe()

		dijit.unregisterWin(handle);
	},

	registerWin: function(/*Window?*/targetWindow, /*DomNode?*/ effectiveNode){
		// summary:
		//		Registers listeners on the specified window (either the main
		//		window or an iframe's window) to detect when the user has clicked somewhere
		//		or focused somewhere.
		// description:
		//		Users should call registerIframe() instead of this method.
		// targetWindow:
		//		If specified this is the window associated with the iframe,
		//		i.e. iframe.contentWindow.
		// effectiveNode:
		//		If specified, report any focus events inside targetWindow as
		//		an event on effectiveNode, rather than on evt.target.
		// returns:
		//		Handle to pass to unregisterWin()

		// TODO: make this function private in 2.0; Editor/users should call registerIframe(),

		var mousedownListener = function(evt){
			dijit._justMouseDowned = true;
			setTimeout(function(){ dijit._justMouseDowned = false; }, 0);
			
			// workaround weird IE bug where the click is on an orphaned node
			// (first time clicking a Select/DropDownButton inside a TooltipDialog)
			if(dojo.isIE && evt && evt.srcElement && evt.srcElement.parentNode == null){
				return;
			}

			dijit._onTouchNode(effectiveNode || evt.target || evt.srcElement, "mouse");
		};
		//dojo.connect(targetWindow, "onscroll", ???);

		// Listen for blur and focus events on targetWindow's document.
		// IIRC, I'm using attachEvent() rather than dojo.connect() because focus/blur events don't bubble
		// through dojo.connect(), and also maybe to catch the focus events early, before onfocus handlers
		// fire.
		// Connect to <html> (rather than document) on IE to avoid memory leaks, but document on other browsers because
		// (at least for FF) the focus event doesn't fire on <html> or <body>.
		var doc = dojo.isIE ? targetWindow.document.documentElement : targetWindow.document;
		if(doc){
			if(dojo.isIE){
				targetWindow.document.body.attachEvent('onmousedown', mousedownListener);
				var activateListener = function(evt){
					// IE reports that nodes like <body> have gotten focus, even though they have tabIndex=-1,
					// Should consider those more like a mouse-click than a focus....
					if(evt.srcElement.tagName.toLowerCase() != "#document" &&
						dijit.isTabNavigable(evt.srcElement)){
						dijit._onFocusNode(effectiveNode || evt.srcElement);
					}else{
						dijit._onTouchNode(effectiveNode || evt.srcElement);
					}
				};
				doc.attachEvent('onactivate', activateListener);
				var deactivateListener =  function(evt){
					dijit._onBlurNode(effectiveNode || evt.srcElement);
				};
				doc.attachEvent('ondeactivate', deactivateListener);

				return function(){
					targetWindow.document.detachEvent('onmousedown', mousedownListener);
					doc.detachEvent('onactivate', activateListener);
					doc.detachEvent('ondeactivate', deactivateListener);
					doc = null;	// prevent memory leak (apparent circular reference via closure)
				};
			}else{
				doc.body.addEventListener('mousedown', mousedownListener, true);
				var focusListener = function(evt){
					dijit._onFocusNode(effectiveNode || evt.target);
				};
				doc.addEventListener('focus', focusListener, true);
				var blurListener = function(evt){
					dijit._onBlurNode(effectiveNode || evt.target);
				};
				doc.addEventListener('blur', blurListener, true);

				return function(){
					doc.body.removeEventListener('mousedown', mousedownListener, true);
					doc.removeEventListener('focus', focusListener, true);
					doc.removeEventListener('blur', blurListener, true);
					doc = null;	// prevent memory leak (apparent circular reference via closure)
				};
			}
		}
	},

	unregisterWin: function(/*Handle*/ handle){
		// summary:
		//		Unregisters listeners on the specified window (either the main
		//		window or an iframe's window) according to handle returned from registerWin().
		//		After calling be sure to delete or null out the handle itself.

		// Currently our handle is actually a function
		handle && handle();
	},

	_onBlurNode: function(/*DomNode*/ node){
		// summary:
		// 		Called when focus leaves a node.
		//		Usually ignored, _unless_ it *isn't* follwed by touching another node,
		//		which indicates that we tabbed off the last field on the page,
		//		in which case every widget is marked inactive
		dijit._prevFocus = dijit._curFocus;
		dijit._curFocus = null;

		if(dijit._justMouseDowned){
			// the mouse down caused a new widget to be marked as active; this blur event
			// is coming late, so ignore it.
			return;
		}

		// if the blur event isn't followed by a focus event then mark all widgets as inactive.
		if(dijit._clearActiveWidgetsTimer){
			clearTimeout(dijit._clearActiveWidgetsTimer);
		}
		dijit._clearActiveWidgetsTimer = setTimeout(function(){
			delete dijit._clearActiveWidgetsTimer;
			dijit._setStack([]);
			dijit._prevFocus = null;
		}, 100);
	},

	_onTouchNode: function(/*DomNode*/ node, /*String*/ by){
		// summary:
		//		Callback when node is focused or mouse-downed
		// node:
		//		The node that was touched.
		// by:
		//		"mouse" if the focus/touch was caused by a mouse down event

		// ignore the recent blurNode event
		if(dijit._clearActiveWidgetsTimer){
			clearTimeout(dijit._clearActiveWidgetsTimer);
			delete dijit._clearActiveWidgetsTimer;
		}

		// compute stack of active widgets (ex: ComboButton --> Menu --> MenuItem)
		var newStack=[];
		try{
			while(node){
				var popupParent = dojo.attr(node, "dijitPopupParent");
				if(popupParent){
					node=dijit.byId(popupParent).domNode;
				}else if(node.tagName && node.tagName.toLowerCase() == "body"){
					// is this the root of the document or just the root of an iframe?
					if(node === dojo.body()){
						// node is the root of the main document
						break;
					}
					// otherwise, find the iframe this node refers to (can't access it via parentNode,
					// need to do this trick instead). window.frameElement is supported in IE/FF/Webkit
					node=dojo.window.get(node.ownerDocument).frameElement;
				}else{
					// if this node is the root node of a widget, then add widget id to stack,
					// except ignore clicks on disabled widgets (actually focusing a disabled widget still works,
					// to support MenuItem)
					var id = node.getAttribute && node.getAttribute("widgetId"),
						widget = id && dijit.byId(id);
					if(widget && !(by == "mouse" && widget.get("disabled"))){
						newStack.unshift(id);
					}
					node=node.parentNode;
				}
			}
		}catch(e){ /* squelch */ }

		dijit._setStack(newStack, by);
	},

	_onFocusNode: function(/*DomNode*/ node){
		// summary:
		//		Callback when node is focused

		if(!node){
			return;
		}

		if(node.nodeType == 9){
			// Ignore focus events on the document itself.  This is here so that
			// (for example) clicking the up/down arrows of a spinner
			// (which don't get focus) won't cause that widget to blur. (FF issue)
			return;
		}

		dijit._onTouchNode(node);

		if(node == dijit._curFocus){ return; }
		if(dijit._curFocus){
			dijit._prevFocus = dijit._curFocus;
		}
		dijit._curFocus = node;
		dojo.publish("focusNode", [node]);
	},

	_setStack: function(/*String[]*/ newStack, /*String*/ by){
		// summary:
		//		The stack of active widgets has changed.  Send out appropriate events and records new stack.
		// newStack:
		//		array of widget id's, starting from the top (outermost) widget
		// by:
		//		"mouse" if the focus/touch was caused by a mouse down event

		var oldStack = dijit._activeStack;
		dijit._activeStack = newStack;

		// compare old stack to new stack to see how many elements they have in common
		for(var nCommon=0; nCommon<Math.min(oldStack.length, newStack.length); nCommon++){
			if(oldStack[nCommon] != newStack[nCommon]){
				break;
			}
		}

		var widget;
		// for all elements that have gone out of focus, send blur event
		for(var i=oldStack.length-1; i>=nCommon; i--){
			widget = dijit.byId(oldStack[i]);
			if(widget){
				widget._focused = false;
				widget.set("focused", false);
				widget._hasBeenBlurred = true;
				if(widget._onBlur){
					widget._onBlur(by);
				}
				dojo.publish("widgetBlur", [widget, by]);
			}
		}

		// for all element that have come into focus, send focus event
		for(i=nCommon; i<newStack.length; i++){
			widget = dijit.byId(newStack[i]);
			if(widget){
				widget._focused = true;
				widget.set("focused", true);
				if(widget._onFocus){
					widget._onFocus(by);
				}
				dojo.publish("widgetFocus", [widget, by]);
			}
		}
	}
});

// register top window and all the iframes it contains
dojo.addOnLoad(function(){
	var handle = dijit.registerWin(window);
	if(dojo.isIE){
		dojo.addOnWindowUnload(function(){
			dijit.unregisterWin(handle);
			handle = null;
		})
	}
});

}

if(!dojo._hasResource["dojo.AdapterRegistry"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.AdapterRegistry"] = true;
dojo.provide("dojo.AdapterRegistry");


dojo.AdapterRegistry = function(/*Boolean?*/ returnWrappers){
	//	summary:
	//		A registry to make contextual calling/searching easier.
	//	description:
	//		Objects of this class keep list of arrays in the form [name, check,
	//		wrap, directReturn] that are used to determine what the contextual
	//		result of a set of checked arguments is. All check/wrap functions
	//		in this registry should be of the same arity.
	//	example:
	//	|	// create a new registry
	//	|	var reg = new dojo.AdapterRegistry();
	//	|	reg.register("handleString",
	//	|		dojo.isString,
	//	|		function(str){
	//	|			// do something with the string here
	//	|		}
	//	|	);
	//	|	reg.register("handleArr",
	//	|		dojo.isArray,
	//	|		function(arr){
	//	|			// do something with the array here
	//	|		}
	//	|	);
	//	|
	//	|	// now we can pass reg.match() *either* an array or a string and
	//	|	// the value we pass will get handled by the right function
	//	|	reg.match("someValue"); // will call the first function
	//	|	reg.match(["someValue"]); // will call the second

	this.pairs = [];
	this.returnWrappers = returnWrappers || false; // Boolean
};

dojo.extend(dojo.AdapterRegistry, {
	register: function(/*String*/ name, /*Function*/ check, /*Function*/ wrap, /*Boolean?*/ directReturn, /*Boolean?*/ override){
		//	summary:
		//		register a check function to determine if the wrap function or
		//		object gets selected
		//	name:
		//		a way to identify this matcher.
		//	check:
		//		a function that arguments are passed to from the adapter's
		//		match() function.  The check function should return true if the
		//		given arguments are appropriate for the wrap function.
		//	directReturn:
		//		If directReturn is true, the value passed in for wrap will be
		//		returned instead of being called. Alternately, the
		//		AdapterRegistry can be set globally to "return not call" using
		//		the returnWrappers property. Either way, this behavior allows
		//		the registry to act as a "search" function instead of a
		//		function interception library.
		//	override:
		//		If override is given and true, the check function will be given
		//		highest priority. Otherwise, it will be the lowest priority
		//		adapter.
		this.pairs[((override) ? "unshift" : "push")]([name, check, wrap, directReturn]);
	},

	match: function(/* ... */){
		// summary:
		//		Find an adapter for the given arguments. If no suitable adapter
		//		is found, throws an exception. match() accepts any number of
		//		arguments, all of which are passed to all matching functions
		//		from the registered pairs.
		for(var i = 0; i < this.pairs.length; i++){
			var pair = this.pairs[i];
			if(pair[1].apply(this, arguments)){
				if((pair[3])||(this.returnWrappers)){
					return pair[2];
				}else{
					return pair[2].apply(this, arguments);
				}
			}
		}
		throw new Error("No match found");
	},

	unregister: function(name){
		// summary: Remove a named adapter from the registry

		// FIXME: this is kind of a dumb way to handle this. On a large
		// registry this will be slow-ish and we can use the name as a lookup
		// should we choose to trade memory for speed.
		for(var i = 0; i < this.pairs.length; i++){
			var pair = this.pairs[i];
			if(pair[0] == name){
				this.pairs.splice(i, 1);
				return true;
			}
		}
		return false;
	}
});

}

if(!dojo._hasResource["dijit._base.place"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.place"] = true;
dojo.provide("dijit._base.place");




dijit.getViewport = function(){
	// summary:
	//		Returns the dimensions and scroll position of the viewable area of a browser window

	return dojo.window.getBox();
};

/*=====
dijit.__Position = function(){
	// x: Integer
	//		horizontal coordinate in pixels, relative to document body
	// y: Integer
	//		vertical coordinate in pixels, relative to document body

	thix.x = x;
	this.y = y;
}
=====*/


dijit.placeOnScreen = function(
	/* DomNode */			node,
	/* dijit.__Position */	pos,
	/* String[] */			corners,
	/* dijit.__Position? */	padding){
	// summary:
	//		Positions one of the node's corners at specified position
	//		such that node is fully visible in viewport.
	// description:
	//		NOTE: node is assumed to be absolutely or relatively positioned.
	//	pos:
	//		Object like {x: 10, y: 20}
	//	corners:
	//		Array of Strings representing order to try corners in, like ["TR", "BL"].
	//		Possible values are:
	//			* "BL" - bottom left
	//			* "BR" - bottom right
	//			* "TL" - top left
	//			* "TR" - top right
	//	padding:
	//		set padding to put some buffer around the element you want to position.
	// example:
	//		Try to place node's top right corner at (10,20).
	//		If that makes node go (partially) off screen, then try placing
	//		bottom left corner at (10,20).
	//	|	placeOnScreen(node, {x: 10, y: 20}, ["TR", "BL"])

	var choices = dojo.map(corners, function(corner){
		var c = { corner: corner, pos: {x:pos.x,y:pos.y} };
		if(padding){
			c.pos.x += corner.charAt(1) == 'L' ? padding.x : -padding.x;
			c.pos.y += corner.charAt(0) == 'T' ? padding.y : -padding.y;
		}
		return c;
	});

	return dijit._place(node, choices);
}

dijit._place = function(/*DomNode*/ node, choices, layoutNode, /*Object*/ aroundNodeCoords){
	// summary:
	//		Given a list of spots to put node, put it at the first spot where it fits,
	//		of if it doesn't fit anywhere then the place with the least overflow
	// choices: Array
	//		Array of elements like: {corner: 'TL', pos: {x: 10, y: 20} }
	//		Above example says to put the top-left corner of the node at (10,20)
	// layoutNode: Function(node, aroundNodeCorner, nodeCorner, size)
	//		for things like tooltip, they are displayed differently (and have different dimensions)
	//		based on their orientation relative to the parent.   This adjusts the popup based on orientation.
	//		It also passes in the available size for the popup, which is useful for tooltips to
	//		tell them that their width is limited to a certain amount.   layoutNode() may return a value expressing
	//		how much the popup had to be modified to fit into the available space.   This is used to determine
	//		what the best placement is.
	// aroundNodeCoords: Object
	//		Size of aroundNode, ex: {w: 200, h: 50}

	// get {x: 10, y: 10, w: 100, h:100} type obj representing position of
	// viewport over document
	var view = dojo.window.getBox();

	// This won't work if the node is inside a <div style="position: relative">,
	// so reattach it to dojo.doc.body.   (Otherwise, the positioning will be wrong
	// and also it might get cutoff)
	if(!node.parentNode || String(node.parentNode.tagName).toLowerCase() != "body"){
		dojo.body().appendChild(node);
	}

	var best = null;
	dojo.some(choices, function(choice){
		var corner = choice.corner;
		var pos = choice.pos;
		var overflow = 0;

		// calculate amount of space available given specified position of node
		var spaceAvailable = {
			w: corner.charAt(1) == 'L' ? (view.l + view.w) - pos.x : pos.x - view.l,
			h: corner.charAt(1) == 'T' ? (view.t + view.h) - pos.y : pos.y - view.t
		};

		// configure node to be displayed in given position relative to button
		// (need to do this in order to get an accurate size for the node, because
		// a tooltip's size changes based on position, due to triangle)
		if(layoutNode){
			var res = layoutNode(node, choice.aroundCorner, corner, spaceAvailable, aroundNodeCoords);
			overflow = typeof res == "undefined" ? 0 : res;
		}

		// get node's size
		var style = node.style;
		var oldDisplay = style.display;
		var oldVis = style.visibility;
		style.visibility = "hidden";
		style.display = "";
		var mb = dojo.marginBox(node);
		style.display = oldDisplay;
		style.visibility = oldVis;

		// coordinates and size of node with specified corner placed at pos,
		// and clipped by viewport
		var startX = Math.max(view.l, corner.charAt(1) == 'L' ? pos.x : (pos.x - mb.w)),
			startY = Math.max(view.t, corner.charAt(0) == 'T' ? pos.y : (pos.y - mb.h)),
			endX = Math.min(view.l + view.w, corner.charAt(1) == 'L' ? (startX + mb.w) : pos.x),
			endY = Math.min(view.t + view.h, corner.charAt(0) == 'T' ? (startY + mb.h) : pos.y),
			width = endX - startX,
			height = endY - startY;

		overflow += (mb.w - width) + (mb.h - height);

		if(best == null || overflow < best.overflow){
			best = {
				corner: corner,
				aroundCorner: choice.aroundCorner,
				x: startX,
				y: startY,
				w: width,
				h: height,
				overflow: overflow,
				spaceAvailable: spaceAvailable
			};
		}
		
		return !overflow;
	});

	// In case the best position is not the last one we checked, need to call
	// layoutNode() again.
	if(best.overflow && layoutNode){
		layoutNode(node, best.aroundCorner, best.corner, best.spaceAvailable, aroundNodeCoords);
	}

	// And then position the node.   Do this last, after the layoutNode() above
	// has sized the node, due to browser quirks when the viewport is scrolled
	// (specifically that a Tooltip will shrink to fit as though the window was
	// scrolled to the left).
	//
	// In RTL mode, set style.right rather than style.left so in the common case,
	// window resizes move the popup along with the aroundNode.
	var l = dojo._isBodyLtr(),
		s = node.style;
	s.top = best.y + "px";
	s[l ? "left" : "right"] = (l ? best.x : view.w - best.x - best.w) + "px";
	
	return best;
}

dijit.placeOnScreenAroundNode = function(
	/* DomNode */		node,
	/* DomNode */		aroundNode,
	/* Object */		aroundCorners,
	/* Function? */		layoutNode){

	// summary:
	//		Position node adjacent or kitty-corner to aroundNode
	//		such that it's fully visible in viewport.
	//
	// description:
	//		Place node such that corner of node touches a corner of
	//		aroundNode, and that node is fully visible.
	//
	// aroundCorners:
	//		Ordered list of pairs of corners to try matching up.
	//		Each pair of corners is represented as a key/value in the hash,
	//		where the key corresponds to the aroundNode's corner, and
	//		the value corresponds to the node's corner:
	//
	//	|	{ aroundNodeCorner1: nodeCorner1, aroundNodeCorner2: nodeCorner2, ...}
	//
	//		The following strings are used to represent the four corners:
	//			* "BL" - bottom left
	//			* "BR" - bottom right
	//			* "TL" - top left
	//			* "TR" - top right
	//
	// layoutNode: Function(node, aroundNodeCorner, nodeCorner)
	//		For things like tooltip, they are displayed differently (and have different dimensions)
	//		based on their orientation relative to the parent.   This adjusts the popup based on orientation.
	//
	// example:
	//	|	dijit.placeOnScreenAroundNode(node, aroundNode, {'BL':'TL', 'TR':'BR'});
	//		This will try to position node such that node's top-left corner is at the same position
	//		as the bottom left corner of the aroundNode (ie, put node below
	//		aroundNode, with left edges aligned).  If that fails it will try to put
	// 		the bottom-right corner of node where the top right corner of aroundNode is
	//		(ie, put node above aroundNode, with right edges aligned)
	//

	// get coordinates of aroundNode
	aroundNode = dojo.byId(aroundNode);
	var aroundNodePos = dojo.position(aroundNode, true);

	// place the node around the calculated rectangle
	return dijit._placeOnScreenAroundRect(node,
		aroundNodePos.x, aroundNodePos.y, aroundNodePos.w, aroundNodePos.h,	// rectangle
		aroundCorners, layoutNode);
};

/*=====
dijit.__Rectangle = function(){
	// x: Integer
	//		horizontal offset in pixels, relative to document body
	// y: Integer
	//		vertical offset in pixels, relative to document body
	// width: Integer
	//		width in pixels
	// height: Integer
	//		height in pixels

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
=====*/


dijit.placeOnScreenAroundRectangle = function(
	/* DomNode */			node,
	/* dijit.__Rectangle */	aroundRect,
	/* Object */			aroundCorners,
	/* Function */			layoutNode){

	// summary:
	//		Like dijit.placeOnScreenAroundNode(), except that the "around"
	//		parameter is an arbitrary rectangle on the screen (x, y, width, height)
	//		instead of a dom node.

	return dijit._placeOnScreenAroundRect(node,
		aroundRect.x, aroundRect.y, aroundRect.width, aroundRect.height,	// rectangle
		aroundCorners, layoutNode);
};

dijit._placeOnScreenAroundRect = function(
	/* DomNode */		node,
	/* Number */		x,
	/* Number */		y,
	/* Number */		width,
	/* Number */		height,
	/* Object */		aroundCorners,
	/* Function */		layoutNode){

	// summary:
	//		Like dijit.placeOnScreenAroundNode(), except it accepts coordinates
	//		of a rectangle to place node adjacent to.

	// TODO: combine with placeOnScreenAroundRectangle()

	// Generate list of possible positions for node
	var choices = [];
	for(var nodeCorner in aroundCorners){
		choices.push( {
			aroundCorner: nodeCorner,
			corner: aroundCorners[nodeCorner],
			pos: {
				x: x + (nodeCorner.charAt(1) == 'L' ? 0 : width),
				y: y + (nodeCorner.charAt(0) == 'T' ? 0 : height)
			}
		});
	}

	return dijit._place(node, choices, layoutNode, {w: width, h: height});
};

dijit.placementRegistry= new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",
	function(n, x){
		return typeof x == "object" &&
			typeof x.offsetWidth != "undefined" && typeof x.offsetHeight != "undefined";
	},
	dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",
	function(n, x){
		return typeof x == "object" &&
			"x" in x && "y" in x && "width" in x && "height" in x;
	},
	dijit.placeOnScreenAroundRectangle);

dijit.placeOnScreenAroundElement = function(
	/* DomNode */		node,
	/* Object */		aroundElement,
	/* Object */		aroundCorners,
	/* Function */		layoutNode){

	// summary:
	//		Like dijit.placeOnScreenAroundNode(), except it accepts an arbitrary object
	//		for the "around" argument and finds a proper processor to place a node.

	return dijit.placementRegistry.match.apply(dijit.placementRegistry, arguments);
};

dijit.getPopupAroundAlignment = function(/*Array*/ position, /*Boolean*/ leftToRight){
	// summary:
	//		Transforms the passed array of preferred positions into a format suitable for passing as the aroundCorners argument to dijit.placeOnScreenAroundElement.
	//
	// position: String[]
	//		This variable controls the position of the drop down.
	//		It's an array of strings with the following values:
	//
	//			* before: places drop down to the left of the target node/widget, or to the right in
	//			  the case of RTL scripts like Hebrew and Arabic
	//			* after: places drop down to the right of the target node/widget, or to the left in
	//			  the case of RTL scripts like Hebrew and Arabic
	//			* above: drop down goes above target node
	//			* below: drop down goes below target node
	//
	//		The list is positions is tried, in order, until a position is found where the drop down fits
	//		within the viewport.
	//
	// leftToRight: Boolean
	//		Whether the popup will be displaying in leftToRight mode.
	//
	var align = {};
	dojo.forEach(position, function(pos){
		switch(pos){
			case "after":
				align[leftToRight ? "BR" : "BL"] = leftToRight ? "BL" : "BR";
				break;
			case "before":
				align[leftToRight ? "BL" : "BR"] = leftToRight ? "BR" : "BL";
				break;
			case "below-alt":
				leftToRight = !leftToRight;
				// fall through
			case "below":
				// first try to align left borders, next try to align right borders (or reverse for RTL mode)
				align[leftToRight ? "BL" : "BR"] = leftToRight ? "TL" : "TR";
				align[leftToRight ? "BR" : "BL"] = leftToRight ? "TR" : "TL";
				break;
			case "above-alt":
				leftToRight = !leftToRight;
				// fall through
			case "above":
			default:
				// first try to align left borders, next try to align right borders (or reverse for RTL mode)
				align[leftToRight ? "TL" : "TR"] = leftToRight ? "BL" : "BR";
				align[leftToRight ? "TR" : "TL"] = leftToRight ? "BR" : "BL";
				break;
		}
	});
	return align;
};

}

if(!dojo._hasResource["dijit._base.window"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.window"] = true;
dojo.provide("dijit._base.window");



dijit.getDocumentWindow = function(doc){
	return dojo.window.get(doc);
};

}

if(!dojo._hasResource["dijit._base.popup"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.popup"] = true;
dojo.provide("dijit._base.popup");





/*=====
dijit.popup.__OpenArgs = function(){
	// popup: Widget
	//		widget to display
	// parent: Widget
	//		the button etc. that is displaying this popup
	// around: DomNode
	//		DOM node (typically a button); place popup relative to this node.  (Specify this *or* "x" and "y" parameters.)
	// x: Integer
	//		Absolute horizontal position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
	// y: Integer
	//		Absolute vertical position (in pixels) to place node at.  (Specify this *or* "around" parameter.)
	// orient: Object|String
	//		When the around parameter is specified, orient should be an
	//		ordered list of tuples of the form (around-node-corner, popup-node-corner).
	//		dijit.popup.open() tries to position the popup according to each tuple in the list, in order,
	//		until the popup appears fully within the viewport.
	//
	//		The default value is {BL:'TL', TL:'BL'}, which represents a list of two tuples:
	//			1. (BL, TL)
	//			2. (TL, BL)
	//		where BL means "bottom left" and "TL" means "top left".
	//		So by default, it first tries putting the popup below the around node, left-aligning them,
	//		and then tries to put it above the around node, still left-aligning them.   Note that the
	//		default is horizontally reversed when in RTL mode.
	//
	//		When an (x,y) position is specified rather than an around node, orient is either
	//		"R" or "L".  R (for right) means that it tries to put the popup to the right of the mouse,
	//		specifically positioning the popup's top-right corner at the mouse position, and if that doesn't
	//		fit in the viewport, then it tries, in order, the bottom-right corner, the top left corner,
	//		and the top-right corner.
	// onCancel: Function
	//		callback when user has canceled the popup by
	//			1. hitting ESC or
	//			2. by using the popup widget's proprietary cancel mechanism (like a cancel button in a dialog);
	//			   i.e. whenever popupWidget.onCancel() is called, args.onCancel is called
	// onClose: Function
	//		callback whenever this popup is closed
	// onExecute: Function
	//		callback when user "executed" on the popup/sub-popup by selecting a menu choice, etc. (top menu only)
	// padding: dijit.__Position
	//		adding a buffer around the opening position. This is only useful when around is not set.
	this.popup = popup;
	this.parent = parent;
	this.around = around;
	this.x = x;
	this.y = y;
	this.orient = orient;
	this.onCancel = onCancel;
	this.onClose = onClose;
	this.onExecute = onExecute;
	this.padding = padding;
}
=====*/

dijit.popup = {
	// summary:
	//		This singleton is used to show/hide widgets as popups.

	// _stack: dijit._Widget[]
	//		Stack of currently popped up widgets.
	//		(someone opened _stack[0], and then it opened _stack[1], etc.)
	_stack: [],
	
	// _beginZIndex: Number
	//		Z-index of the first popup.   (If first popup opens other
	//		popups they get a higher z-index.)
	_beginZIndex: 1000,

	_idGen: 1,

	_createWrapper: function(/*Widget || DomNode*/ widget){
		// summary:
		//		Initialization for widgets that will be used as popups.
		//		Puts widget inside a wrapper DIV (if not already in one),
		//		and returns pointer to that wrapper DIV.

		var wrapper = widget.declaredClass ? widget._popupWrapper : (dojo.hasClass(widget.parentNode, "dijitPopup") && widget.parentNode),
			node = widget.domNode || widget;

		if(!wrapper){
			// Create wrapper <div> for when this widget [in the future] will be used as a popup.
			// This is done early because of IE bugs where creating/moving DOM nodes causes focus
			// to go wonky, see tests/robot/Toolbar.html to reproduce
			wrapper = dojo.create("div",{
				"class":"dijitPopup",
				style:{ display: "none"},
				role: "presentation"
			}, dojo.body());
			wrapper.appendChild(node);

			var s = node.style;
			s.display = "";
			s.visibility = "";
			s.position = "";
			s.top = "0px";

			if(widget.declaredClass){		// TODO: in 2.0 change signature to always take widget, then remove if()
				widget._popupWrapper = wrapper;
				dojo.connect(widget, "destroy", function(){
					dojo.destroy(wrapper);
					delete widget._popupWrapper;
				});
			}
		}
		
		return wrapper;
	},

	moveOffScreen: function(/*Widget || DomNode*/ widget){
		// summary:
		//		Moves the popup widget off-screen.
		//		Do not use this method to hide popups when not in use, because
		//		that will create an accessibility issue: the offscreen popup is
		//		still in the tabbing order.

		// Create wrapper if not already there
		var wrapper = this._createWrapper(widget);

		dojo.style(wrapper, {
			visibility: "hidden",
			top: "-9999px",		// prevent transient scrollbar causing misalign (#5776), and initial flash in upper left (#10111)
			display: ""
		});
	},

	hide: function(/*dijit._Widget*/ widget){
		// summary:
		//		Hide this popup widget (until it is ready to be shown).
		//		Initialization for widgets that will be used as popups
		//
		// 		Also puts widget inside a wrapper DIV (if not already in one)
		//
		//		If popup widget needs to layout it should
		//		do so when it is made visible, and popup._onShow() is called.

		// Create wrapper if not already there
		var wrapper = this._createWrapper(widget);

		dojo.style(wrapper, "display", "none");
	},
		
	getTopPopup: function(){
		// summary:
		//		Compute the closest ancestor popup that's *not* a child of another popup.
		//		Ex: For a TooltipDialog with a button that spawns a tree of menus, find the popup of the button.
		var stack = this._stack;
		for(var pi=stack.length-1; pi > 0 && stack[pi].parent === stack[pi-1].widget; pi--){
			/* do nothing, just trying to get right value for pi */
		}
		return stack[pi];
	},

	open: function(/*dijit.popup.__OpenArgs*/ args){
		// summary:
		//		Popup the widget at the specified position
		//
		// example:
		//		opening at the mouse position
		//		|		dijit.popup.open({popup: menuWidget, x: evt.pageX, y: evt.pageY});
		//
		// example:
		//		opening the widget as a dropdown
		//		|		dijit.popup.open({parent: this, popup: menuWidget, around: this.domNode, onClose: function(){...}});
		//
		//		Note that whatever widget called dijit.popup.open() should also listen to its own _onBlur callback
		//		(fired from _base/focus.js) to know that focus has moved somewhere else and thus the popup should be closed.

		var stack = this._stack,
			widget = args.popup,
			orient = args.orient || (
				(args.parent ? args.parent.isLeftToRight() : dojo._isBodyLtr()) ?
				{'BL':'TL', 'BR':'TR', 'TL':'BL', 'TR':'BR'} :
				{'BR':'TR', 'BL':'TL', 'TR':'BR', 'TL':'BL'}
			),
			around = args.around,
			id = (args.around && args.around.id) ? (args.around.id+"_dropdown") : ("popup_"+this._idGen++);

		// If we are opening a new popup that isn't a child of a currently opened popup, then
		// close currently opened popup(s).   This should happen automatically when the old popups
		// gets the _onBlur() event, except that the _onBlur() event isn't reliable on IE, see [22198].
		while(stack.length && (!args.parent || !dojo.isDescendant(args.parent.domNode, stack[stack.length-1].widget.domNode))){
			dijit.popup.close(stack[stack.length-1].widget);
		}

		// Get pointer to popup wrapper, and create wrapper if it doesn't exist
		var wrapper = this._createWrapper(widget);


		dojo.attr(wrapper, {
			id: id,
			style: {
				zIndex: this._beginZIndex + stack.length
			},
			"class": "dijitPopup " + (widget.baseClass || widget["class"] || "").split(" ")[0] +"Popup",
			dijitPopupParent: args.parent ? args.parent.id : ""
		});

		if(dojo.isIE || dojo.isMoz){
			if(!widget.bgIframe){
				// setting widget.bgIframe triggers cleanup in _Widget.destroy()
				widget.bgIframe = new dijit.BackgroundIframe(wrapper);
			}
		}

		// position the wrapper node and make it visible
		var best = around ?
			dijit.placeOnScreenAroundElement(wrapper, around, orient, widget.orient ? dojo.hitch(widget, "orient") : null) :
			dijit.placeOnScreen(wrapper, args, orient == 'R' ? ['TR','BR','TL','BL'] : ['TL','BL','TR','BR'], args.padding);

		wrapper.style.display = "";
		wrapper.style.visibility = "visible";
		widget.domNode.style.visibility = "visible";	// counteract effects from _HasDropDown

		var handlers = [];

		// provide default escape and tab key handling
		// (this will work for any widget, not just menu)
		handlers.push(dojo.connect(wrapper, "onkeypress", this, function(evt){
			if(evt.charOrCode == dojo.keys.ESCAPE && args.onCancel){
				dojo.stopEvent(evt);
				args.onCancel();
			}else if(evt.charOrCode === dojo.keys.TAB){
				dojo.stopEvent(evt);
				var topPopup = this.getTopPopup();
				if(topPopup && topPopup.onCancel){
					topPopup.onCancel();
				}
			}
		}));

		// watch for cancel/execute events on the popup and notify the caller
		// (for a menu, "execute" means clicking an item)
		if(widget.onCancel){
			handlers.push(dojo.connect(widget, "onCancel", args.onCancel));
		}

		handlers.push(dojo.connect(widget, widget.onExecute ? "onExecute" : "onChange", this, function(){
			var topPopup = this.getTopPopup();
			if(topPopup && topPopup.onExecute){
				topPopup.onExecute();
			}
		}));

		stack.push({
			widget: widget,
			parent: args.parent,
			onExecute: args.onExecute,
			onCancel: args.onCancel,
 			onClose: args.onClose,
			handlers: handlers
		});

		if(widget.onOpen){
			// TODO: in 2.0 standardize onShow() (used by StackContainer) and onOpen() (used here)
			widget.onOpen(best);
		}

		return best;
	},

	close: function(/*dijit._Widget?*/ popup){
		// summary:
		//		Close specified popup and any popups that it parented.
		//		If no popup is specified, closes all popups.

		var stack = this._stack;

		// Basically work backwards from the top of the stack closing popups
		// until we hit the specified popup, but IIRC there was some issue where closing
		// a popup would cause others to close too.  Thus if we are trying to close B in [A,B,C]
		// closing C might close B indirectly and then the while() condition will run where stack==[A]...
		// so the while condition is constructed defensively.
		while((popup && dojo.some(stack, function(elem){return elem.widget == popup;})) ||
			(!popup && stack.length)){
			var top = stack.pop(),
				widget = top.widget,
				onClose = top.onClose;

			if(widget.onClose){
				// TODO: in 2.0 standardize onHide() (used by StackContainer) and onClose() (used here)
				widget.onClose();
			}
			dojo.forEach(top.handlers, dojo.disconnect);

			// Hide the widget and it's wrapper unless it has already been destroyed in above onClose() etc.
			if(widget && widget.domNode){
				this.hide(widget);
			}
                        
			if(onClose){
				onClose();
			}
		}
	}
};

// TODO: remove dijit._frames, it isn't being used much, since popups never release their
// iframes (see [22236])
dijit._frames = new function(){
	// summary:
	//		cache of iframes

	var queue = [];

	this.pop = function(){
		var iframe;
		if(queue.length){
			iframe = queue.pop();
			iframe.style.display="";
		}else{
			if(dojo.isIE < 9){
				var burl = dojo.config["dojoBlankHtmlUrl"] || (dojo.moduleUrl("dojo", "resources/blank.html")+"") || "javascript:\"\"";
				var html="<iframe src='" + burl + "'"
					+ " style='position: absolute; left: 0px; top: 0px;"
					+ "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
				iframe = dojo.doc.createElement(html);
			}else{
			 	iframe = dojo.create("iframe");
				iframe.src = 'javascript:""';
				iframe.className = "dijitBackgroundIframe";
				dojo.style(iframe, "opacity", 0.1);
			}
			iframe.tabIndex = -1; // Magic to prevent iframe from getting focus on tab keypress - as style didn't work.
			dijit.setWaiRole(iframe,"presentation");
		}
		return iframe;
	};

	this.push = function(iframe){
		iframe.style.display="none";
		queue.push(iframe);
	}
}();


dijit.BackgroundIframe = function(/*DomNode*/ node){
	// summary:
	//		For IE/FF z-index schenanigans. id attribute is required.
	//
	// description:
	//		new dijit.BackgroundIframe(node)
	//			Makes a background iframe as a child of node, that fills
	//			area (and position) of node

	if(!node.id){ throw new Error("no id"); }
	if(dojo.isIE || dojo.isMoz){
		var iframe = (this.iframe = dijit._frames.pop());
		node.appendChild(iframe);
		if(dojo.isIE<7 || dojo.isQuirks){
			this.resize(node);
			this._conn = dojo.connect(node, 'onresize', this, function(){
				this.resize(node);
			});
		}else{
			dojo.style(iframe, {
				width: '100%',
				height: '100%'
			});
		}
	}
};

dojo.extend(dijit.BackgroundIframe, {
	resize: function(node){
		// summary:
		// 		Resize the iframe so it's the same size as node.
		//		Needed on IE6 and IE/quirks because height:100% doesn't work right.
		if(this.iframe){
			dojo.style(this.iframe, {
				width: node.offsetWidth + 'px',
				height: node.offsetHeight + 'px'
			});
		}
	},
	destroy: function(){
		// summary:
		//		destroy the iframe
		if(this._conn){
			dojo.disconnect(this._conn);
			this._conn = null;
		}
		if(this.iframe){
			dijit._frames.push(this.iframe);
			delete this.iframe;
		}
	}
});

}

if(!dojo._hasResource["dijit._base.scroll"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.scroll"] = true;
dojo.provide("dijit._base.scroll");



dijit.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
	// summary:
	//		Scroll the passed node into view, if it is not already.
	//		Deprecated, use `dojo.window.scrollIntoView` instead.
	
	dojo.window.scrollIntoView(node, pos);
};

}

if(!dojo._hasResource["dojo.uacss"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.uacss"] = true;
dojo.provide("dojo.uacss");


(function(){
	// summary:
	//		Applies pre-set CSS classes to the top-level HTML node, based on:
	// 			- browser (ex: dj_ie)
	//			- browser version (ex: dj_ie6)
	//			- box model (ex: dj_contentBox)
	//			- text direction (ex: dijitRtl)
	//
	//		In addition, browser, browser version, and box model are
	//		combined with an RTL flag when browser text is RTL.  ex: dj_ie-rtl.

	var d = dojo,
		html = d.doc.documentElement,
		ie = d.isIE,
		opera = d.isOpera,
		maj = Math.floor,
		ff = d.isFF,
		boxModel = d.boxModel.replace(/-/,''),

		classes = {
			dj_ie: ie,
			dj_ie6: maj(ie) == 6,
			dj_ie7: maj(ie) == 7,
			dj_ie8: maj(ie) == 8,
			dj_ie9: maj(ie) == 9,
			dj_quirks: d.isQuirks,
			dj_iequirks: ie && d.isQuirks,

			// NOTE: Opera not supported by dijit
			dj_opera: opera,

			dj_khtml: d.isKhtml,

			dj_webkit: d.isWebKit,
			dj_safari: d.isSafari,
			dj_chrome: d.isChrome,

			dj_gecko: d.isMozilla,
			dj_ff3: maj(ff) == 3
		}; // no dojo unsupported browsers

	classes["dj_" + boxModel] = true;

	// apply browser, browser version, and box model class names
	var classStr = "";
	for(var clz in classes){
		if(classes[clz]){
			classStr += clz + " ";
		}
	}
	html.className = d.trim(html.className + " " + classStr);

	// If RTL mode, then add dj_rtl flag plus repeat existing classes with -rtl extension.
	// We can't run the code below until the <body> tag has loaded (so we can check for dir=rtl).
	// Unshift() is to run sniff code before the parser.
	dojo._loaders.unshift(function(){
		if(!dojo._isBodyLtr()){
			var rtlClassStr = "dj_rtl dijitRtl " + classStr.replace(/ /g, "-rtl ")
			html.className = d.trim(html.className + " " + rtlClassStr);
		}
	});
})();

}

if(!dojo._hasResource["dijit._base.sniff"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.sniff"] = true;
dojo.provide("dijit._base.sniff");



// summary:
//		Applies pre-set CSS classes to the top-level HTML node, see
//		`dojo.uacss` for details.
//
//		Simply doing a require on this module will
//		establish this CSS.  Modified version of Morris' CSS hack.

}

if(!dojo._hasResource["dijit._base.typematic"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.typematic"] = true;
dojo.provide("dijit._base.typematic");


dijit.typematic = {
	// summary:
	//		These functions are used to repetitively call a user specified callback
	//		method when a specific key or mouse click over a specific DOM node is
	//		held down for a specific amount of time.
	//		Only 1 such event is allowed to occur on the browser page at 1 time.

	_fireEventAndReload: function(){
		this._timer = null;
		this._callback(++this._count, this._node, this._evt);
		
		// Schedule next event, timer is at most minDelay (default 10ms) to avoid
		// browser overload (particularly avoiding starving DOH robot so it never gets to send a mouseup)
		this._currentTimeout = Math.max(
			this._currentTimeout < 0 ? this._initialDelay :
				(this._subsequentDelay > 1 ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay)),
			this._minDelay);
		this._timer = setTimeout(dojo.hitch(this, "_fireEventAndReload"), this._currentTimeout);
	},

	trigger: function(/*Event*/ evt, /*Object*/ _this, /*DOMNode*/ node, /*Function*/ callback, /*Object*/ obj, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start a timed, repeating callback sequence.
		//		If already started, the function call is ignored.
		//		This method is not normally called by the user but can be
		//		when the normal listener code is insufficient.
		// evt:
		//		key or mouse event object to pass to the user callback
		// _this:
		//		pointer to the user's widget space.
		// node:
		//		the DOM node object to pass the the callback function
		// callback:
		//		function to call until the sequence is stopped called with 3 parameters:
		// count:
		//		integer representing number of repeated calls (0..n) with -1 indicating the iteration has stopped
		// node:
		//		the DOM node object passed in
		// evt:
		//		key or mouse event object
		// obj:
		//		user space object used to uniquely identify each typematic sequence
		// subsequentDelay (optional):
		//		if > 1, the number of milliseconds until the 3->n events occur
		//		or else the fractional time multiplier for the next event's delay, default=0.9
		// initialDelay (optional):
		//		the number of milliseconds until the 2nd event occurs, default=500ms
		// minDelay (optional):
		//		the maximum delay in milliseconds for event to fire, default=10ms
		if(obj != this._obj){
			this.stop();
			this._initialDelay = initialDelay || 500;
			this._subsequentDelay = subsequentDelay || 0.90;
			this._minDelay = minDelay || 10;
			this._obj = obj;
			this._evt = evt;
			this._node = node;
			this._currentTimeout = -1;
			this._count = -1;
			this._callback = dojo.hitch(_this, callback);
			this._fireEventAndReload();
			this._evt = dojo.mixin({faux: true}, evt);
		}
	},

	stop: function(){
		// summary:
		//		Stop an ongoing timed, repeating callback sequence.
		if(this._timer){
			clearTimeout(this._timer);
			this._timer = null;
		}
		if(this._obj){
			this._callback(-1, this._node, this._evt);
			this._obj = null;
		}
	},

	addKeyListener: function(/*DOMNode*/ node, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a specific typematic key.
		//		See also the trigger method for other parameters.
		// keyObject:
		//		an object defining the key to listen for:
		// 		charOrCode:
		//			the printable character (string) or keyCode (number) to listen for.
		// 		keyCode:
		//			(deprecated - use charOrCode) the keyCode (number) to listen for (implies charCode = 0).
		// 		charCode:
		//			(deprecated - use charOrCode) the charCode (number) to listen for.
		// 		ctrlKey:
		//			desired ctrl key state to initiate the callback sequence:
		//			- pressed (true)
		//			- released (false)
		//			- either (unspecified)
		// 		altKey:
		//			same as ctrlKey but for the alt key
		// 		shiftKey:
		//			same as ctrlKey but for the shift key
		// returns:
		//		an array of dojo.connect handles
		if(keyObject.keyCode){
			keyObject.charOrCode = keyObject.keyCode;
			dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
		}else if(keyObject.charCode){
			keyObject.charOrCode = String.fromCharCode(keyObject.charCode);
			dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.", "", "2.0");
		}
		return [
			dojo.connect(node, "onkeypress", this, function(evt){
				if(evt.charOrCode == keyObject.charOrCode &&
				(keyObject.ctrlKey === undefined || keyObject.ctrlKey == evt.ctrlKey) &&
				(keyObject.altKey === undefined || keyObject.altKey == evt.altKey) &&
				(keyObject.metaKey === undefined || keyObject.metaKey == (evt.metaKey || false)) && // IE doesn't even set metaKey
				(keyObject.shiftKey === undefined || keyObject.shiftKey == evt.shiftKey)){
					dojo.stopEvent(evt);
					dijit.typematic.trigger(evt, _this, node, callback, keyObject, subsequentDelay, initialDelay, minDelay);
				}else if(dijit.typematic._obj == keyObject){
					dijit.typematic.stop();
				}
			}),
			dojo.connect(node, "onkeyup", this, function(evt){
				if(dijit.typematic._obj == keyObject){
					dijit.typematic.stop();
				}
			})
		];
	},

	addMouseListener: function(/*DOMNode*/ node, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a typematic mouse click.
		//		See the trigger method for other parameters.
		// returns:
		//		an array of dojo.connect handles
		var dc = dojo.connect;
		return [
			dc(node, "mousedown", this, function(evt){
				dojo.stopEvent(evt);
				dijit.typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay, minDelay);
			}),
			dc(node, "mouseup", this, function(evt){
				dojo.stopEvent(evt);
				dijit.typematic.stop();
			}),
			dc(node, "mouseout", this, function(evt){
				dojo.stopEvent(evt);
				dijit.typematic.stop();
			}),
			dc(node, "mousemove", this, function(evt){
				evt.preventDefault();
			}),
			dc(node, "dblclick", this, function(evt){
				dojo.stopEvent(evt);
				if(dojo.isIE){
					dijit.typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay, minDelay);
					setTimeout(dojo.hitch(this, dijit.typematic.stop), 50);
				}
			})
		];
	},

	addListener: function(/*Node*/ mouseNode, /*Node*/ keyNode, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay, /*Number?*/ minDelay){
		// summary:
		//		Start listening for a specific typematic key and mouseclick.
		//		This is a thin wrapper to addKeyListener and addMouseListener.
		//		See the addMouseListener and addKeyListener methods for other parameters.
		// mouseNode:
		//		the DOM node object to listen on for mouse events.
		// keyNode:
		//		the DOM node object to listen on for key events.
		// returns:
		//		an array of dojo.connect handles
		return this.addKeyListener(keyNode, keyObject, _this, callback, subsequentDelay, initialDelay, minDelay).concat(
			this.addMouseListener(mouseNode, _this, callback, subsequentDelay, initialDelay, minDelay));
	}
};

}

if(!dojo._hasResource["dijit._base.wai"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.wai"] = true;
dojo.provide("dijit._base.wai");


dijit.wai = {
	onload: function(){
		// summary:
		//		Detects if we are in high-contrast mode or not

		// This must be a named function and not an anonymous
		// function, so that the widget parsing code can make sure it
		// registers its onload function after this function.
		// DO NOT USE "this" within this function.

		// create div for testing if high contrast mode is on or images are turned off
		var div = dojo.create("div",{
			id: "a11yTestNode",
			style:{
				cssText:'border: 1px solid;'
					+ 'border-color:red green;'
					+ 'position: absolute;'
					+ 'height: 5px;'
					+ 'top: -999px;'
					+ 'background-image: url("' + (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")) + '");'
			}
		}, dojo.body());

		// test it
		var cs = dojo.getComputedStyle(div);
		if(cs){
			var bkImg = cs.backgroundImage;
			var needsA11y = (cs.borderTopColor == cs.borderRightColor) || (bkImg != null && (bkImg == "none" || bkImg == "url(invalid-url:)" ));
			dojo[needsA11y ? "addClass" : "removeClass"](dojo.body(), "dijit_a11y");
			if(dojo.isIE){
				div.outerHTML = "";		// prevent mixed-content warning, see http://support.microsoft.com/kb/925014
			}else{
				dojo.body().removeChild(div);
			}
		}
	}
};

// Test if computer is in high contrast mode.
// Make sure the a11y test runs first, before widgets are instantiated.
if(dojo.isIE || dojo.isMoz){	// NOTE: checking in Safari messes things up
	dojo._loaders.unshift(dijit.wai.onload);
}

dojo.mixin(dijit, {
	hasWaiRole: function(/*Element*/ elem, /*String?*/ role){
		// summary:
		//		Determines if an element has a particular role.
		// returns:
		//		True if elem has the specific role attribute and false if not.
		// 		For backwards compatibility if role parameter not provided,
		// 		returns true if has a role
		var waiRole = this.getWaiRole(elem);
		return role ? (waiRole.indexOf(role) > -1) : (waiRole.length > 0);
	},

	getWaiRole: function(/*Element*/ elem){
		// summary:
		//		Gets the role for an element (which should be a wai role).
		// returns:
		//		The role of elem or an empty string if elem
		//		does not have a role.
		 return dojo.trim((dojo.attr(elem, "role") || "").replace("wairole:",""));
	},

	setWaiRole: function(/*Element*/ elem, /*String*/ role){
		// summary:
		//		Sets the role on an element.
		// description:
		//		Replace existing role attribute with new role.

			dojo.attr(elem, "role", role);
	},

	removeWaiRole: function(/*Element*/ elem, /*String*/ role){
		// summary:
		//		Removes the specified role from an element.
		// 		Removes role attribute if no specific role provided (for backwards compat.)

		var roleValue = dojo.attr(elem, "role");
		if(!roleValue){ return; }
		if(role){
			var t = dojo.trim((" " + roleValue + " ").replace(" " + role + " ", " "));
			dojo.attr(elem, "role", t);
		}else{
			elem.removeAttribute("role");
		}
	},

	hasWaiState: function(/*Element*/ elem, /*String*/ state){
		// summary:
		//		Determines if an element has a given state.
		// description:
		//		Checks for an attribute called "aria-"+state.
		// returns:
		//		true if elem has a value for the given state and
		//		false if it does not.

		return elem.hasAttribute ? elem.hasAttribute("aria-"+state) : !!elem.getAttribute("aria-"+state);
	},

	getWaiState: function(/*Element*/ elem, /*String*/ state){
		// summary:
		//		Gets the value of a state on an element.
		// description:
		//		Checks for an attribute called "aria-"+state.
		// returns:
		//		The value of the requested state on elem
		//		or an empty string if elem has no value for state.

		return elem.getAttribute("aria-"+state) || "";
	},

	setWaiState: function(/*Element*/ elem, /*String*/ state, /*String*/ value){
		// summary:
		//		Sets a state on an element.
		// description:
		//		Sets an attribute called "aria-"+state.

		elem.setAttribute("aria-"+state, value);
	},

	removeWaiState: function(/*Element*/ elem, /*String*/ state){
		// summary:
		//		Removes a state from an element.
		// description:
		//		Sets an attribute called "aria-"+state.

		elem.removeAttribute("aria-"+state);
	}
});

}

if(!dojo._hasResource["dijit._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base"] = true;
dojo.provide("dijit._base");












}

if(!dojo._hasResource["dijit._Widget"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._Widget"] = true;
dojo.provide("dijit._Widget");





////////////////// DEFERRED CONNECTS ///////////////////

// This code is to assist deferring dojo.connect() calls in widgets (connecting to events on the widgets'
// DOM nodes) until someone actually needs to monitor that event.
dojo.connect(dojo, "_connect",
	function(/*dijit._Widget*/ widget, /*String*/ event){
		if(widget && dojo.isFunction(widget._onConnect)){
			widget._onConnect(event);
		}
	});

dijit._connectOnUseEventHandler = function(/*Event*/ event){};

////////////////// ONDIJITCLICK SUPPORT ///////////////////

// Keep track of where the last keydown event was, to help avoid generating
// spurious ondijitclick events when:
// 1. focus is on a <button> or <a>
// 2. user presses then releases the ENTER key
// 3. onclick handler fires and shifts focus to another node, with an ondijitclick handler
// 4. onkeyup event fires, causing the ondijitclick handler to fire
dijit._lastKeyDownNode = null;
if(dojo.isIE){
	(function(){
		var keydownCallback = function(evt){
			dijit._lastKeyDownNode = evt.srcElement;
		};
		dojo.doc.attachEvent('onkeydown', keydownCallback);
		dojo.addOnWindowUnload(function(){
			dojo.doc.detachEvent('onkeydown', keydownCallback);
		});
	})();
}else{
	dojo.doc.addEventListener('keydown', function(evt){
		dijit._lastKeyDownNode = evt.target;
	}, true);
}

(function(){

dojo.declare("dijit._Widget", dijit._WidgetBase, {
	// summary:
	//		Base class for all Dijit widgets.
	//
	//		Extends _WidgetBase, adding support for:
	//			- deferred connections
	//				A call like dojo.connect(myWidget, "onMouseMove", func)
	//				will essentially do a dojo.connect(myWidget.domNode, "onMouseMove", func)
	//			- ondijitclick
	//				Support new dojoAttachEvent="ondijitclick: ..." that is triggered by a mouse click or a SPACE/ENTER keypress
	//			- focus related functions
	//				In particular, the onFocus()/onBlur() callbacks.   Driven internally by
	//				dijit/_base/focus.js.
	//			- deprecated methods
	//			- onShow(), onHide(), onClose()
	//
	//		Also, by loading code in dijit/_base, turns on:
	//			- browser sniffing (putting browser id like .dj_ie on <html> node)
	//			- high contrast mode sniffing (add .dijit_a11y class to <body> if machine is in high contrast mode)
	

	////////////////// DEFERRED CONNECTS ///////////////////

	// _deferredConnects: [protected] Object
	//		attributeMap addendum for event handlers that should be connected only on first use
	_deferredConnects: {
		onClick: "",
		onDblClick: "",
		onKeyDown: "",
		onKeyPress: "",
		onKeyUp: "",
		onMouseMove: "",
		onMouseDown: "",
		onMouseOut: "",
		onMouseOver: "",
		onMouseLeave: "",
		onMouseEnter: "",
		onMouseUp: ""
	},

	onClick: dijit._connectOnUseEventHandler,
	/*=====
	onClick: function(event){
		// summary:
		//		Connect to this function to receive notifications of mouse click events.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onDblClick: dijit._connectOnUseEventHandler,
	/*=====
	onDblClick: function(event){
		// summary:
		//		Connect to this function to receive notifications of mouse double click events.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onKeyDown: dijit._connectOnUseEventHandler,
	/*=====
	onKeyDown: function(event){
		// summary:
		//		Connect to this function to receive notifications of keys being pressed down.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onKeyPress: dijit._connectOnUseEventHandler,
	/*=====
	onKeyPress: function(event){
		// summary:
		//		Connect to this function to receive notifications of printable keys being typed.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onKeyUp: dijit._connectOnUseEventHandler,
	/*=====
	onKeyUp: function(event){
		// summary:
		//		Connect to this function to receive notifications of keys being released.
		// event:
		//		key Event
		// tags:
		//		callback
	},
	=====*/
	onMouseDown: dijit._connectOnUseEventHandler,
	/*=====
	onMouseDown: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse button is pressed down.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseMove: dijit._connectOnUseEventHandler,
	/*=====
	onMouseMove: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves over nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseOut: dijit._connectOnUseEventHandler,
	/*=====
	onMouseOut: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves off of nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseOver: dijit._connectOnUseEventHandler,
	/*=====
	onMouseOver: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves onto nodes contained within this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseLeave: dijit._connectOnUseEventHandler,
	/*=====
	onMouseLeave: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves off of this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseEnter: dijit._connectOnUseEventHandler,
	/*=====
	onMouseEnter: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse moves onto this widget.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/
	onMouseUp: dijit._connectOnUseEventHandler,
	/*=====
	onMouseUp: function(event){
		// summary:
		//		Connect to this function to receive notifications of when the mouse button is released.
		// event:
		//		mouse Event
		// tags:
		//		callback
	},
	=====*/

	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		// To avoid double-connects, remove entries from _deferredConnects
		// that have been setup manually by a subclass (ex, by dojoAttachEvent).
		// If a subclass has redefined a callback (ex: onClick) then assume it's being
		// connected to manually.
		this._deferredConnects = dojo.clone(this._deferredConnects);
		for(var attr in this.attributeMap){
			delete this._deferredConnects[attr]; // can't be in both attributeMap and _deferredConnects
		}
		for(attr in this._deferredConnects){
			if(this[attr] !== dijit._connectOnUseEventHandler){
				delete this._deferredConnects[attr];	// redefined, probably dojoAttachEvent exists
			}
		}

		this.inherited(arguments);

		if(this.domNode){
			// If the developer has specified a handler as a widget parameter
			// (ex: new Button({onClick: ...})
			// then naturally need to connect from DOM node to that handler immediately,
			for(attr in this.params){
				this._onConnect(attr);
			}
		}
	},

	_onConnect: function(/*String*/ event){
		// summary:
		//		Called when someone connects to one of my handlers.
		//		"Turn on" that handler if it isn't active yet.
		//
		//		This is also called for every single initialization parameter
		//		so need to do nothing for parameters like "id".
		// tags:
		//		private
		if(event in this._deferredConnects){
			var mapNode = this[this._deferredConnects[event] || 'domNode'];
			this.connect(mapNode, event.toLowerCase(), event);
			delete this._deferredConnects[event];
		}
	},

	////////////////// FOCUS RELATED ///////////////////
	// _onFocus() and _onBlur() are called by the focus manager

	// focused: [readonly] Boolean
	//		This widget or a widget it contains has focus, or is "active" because
	//		it was recently clicked.
	focused: false,

	isFocusable: function(){
		// summary:
		//		Return true if this widget can currently be focused
		//		and false if not
		return this.focus && (dojo.style(this.domNode, "display") != "none");
	},

	onFocus: function(){
		// summary:
		//		Called when the widget becomes "active" because
		//		it or a widget inside of it either has focus, or has recently
		//		been clicked.
		// tags:
		//		callback
	},

	onBlur: function(){
		// summary:
		//		Called when the widget stops being "active" because
		//		focus moved to something outside of it, or the user
		//		clicked somewhere outside of it, or the widget was
		//		hidden.
		// tags:
		//		callback
	},

	_onFocus: function(e){
		// summary:
		//		This is where widgets do processing for when they are active,
		//		such as changing CSS classes.  See onFocus() for more details.
		// tags:
		//		protected
		this.onFocus();
	},

	_onBlur: function(){
		// summary:
		//		This is where widgets do processing for when they stop being active,
		//		such as changing CSS classes.  See onBlur() for more details.
		// tags:
		//		protected
		this.onBlur();
	},

	////////////////// DEPRECATED METHODS ///////////////////

	setAttribute: function(/*String*/ attr, /*anything*/ value){
		// summary:
		//		Deprecated.  Use set() instead.
		// tags:
		//		deprecated
		dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
		this.set(attr, value);
	},

	attr: function(/*String|Object*/name, /*Object?*/value){
		// summary:
		//		Set or get properties on a widget instance.
		//	name:
		//		The property to get or set. If an object is passed here and not
		//		a string, its keys are used as names of attributes to be set
		//		and the value of the object as values to set in the widget.
		//	value:
		//		Optional. If provided, attr() operates as a setter. If omitted,
		//		the current value of the named property is returned.
		// description:
		//		This method is deprecated, use get() or set() directly.

		// Print deprecation warning but only once per calling function
		if(dojo.config.isDebug){
			var alreadyCalledHash = arguments.callee._ach || (arguments.callee._ach = {}),
				caller = (arguments.callee.caller || "unknown caller").toString();
			if(!alreadyCalledHash[caller]){
				dojo.deprecated(this.declaredClass + "::attr() is deprecated. Use get() or set() instead, called from " +
				caller, "", "2.0");
				alreadyCalledHash[caller] = true;
			}
		}

		var args = arguments.length;
		if(args >= 2 || typeof name === "object"){ // setter
			return this.set.apply(this, arguments);
		}else{ // getter
			return this.get(name);
		}
	},
	
	////////////////// ONDIJITCLICK SUPPORT ///////////////////

	// nodesWithKeyClick: [private] String[]
	//		List of nodes that correctly handle click events via native browser support,
	//		and don't need dijit's help
	nodesWithKeyClick: ["input", "button"],

	connect: function(
			/*Object|null*/ obj,
			/*String|Function*/ event,
			/*String|Function*/ method){
		// summary:
		//		Connects specified obj/event to specified method of this object
		//		and registers for disconnect() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.connect, except with the
		//		implicit use of this widget as the target object.
		//		This version of connect also provides a special "ondijitclick"
		//		event which triggers on a click or space or enter keyup.
		//		Events connected with `this.connect` are disconnected upon
		//		destruction.
		// returns:
		//		A handle that can be passed to `disconnect` in order to disconnect before
		//		the widget is destroyed.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when foo.bar() is called, call the listener we're going to
		//	|	// provide in the scope of btn
		//	|	btn.connect(foo, "bar", function(){
		//	|		console.debug(this.toString());
		//	|	});
		// tags:
		//		protected

		var d = dojo,
			dc = d._connect,
			handles = this.inherited(arguments, [obj, event == "ondijitclick" ? "onclick" : event, method]);

		if(event == "ondijitclick"){
			// add key based click activation for unsupported nodes.
			// do all processing onkey up to prevent spurious clicks
			// for details see comments at top of this file where _lastKeyDownNode is defined
			if(d.indexOf(this.nodesWithKeyClick, obj.nodeName.toLowerCase()) == -1){ // is NOT input or button
				var m = d.hitch(this, method);
				handles.push(
					dc(obj, "onkeydown", this, function(e){
						//console.log(this.id + ": onkeydown, e.target = ", e.target, ", lastKeyDownNode was ", dijit._lastKeyDownNode, ", equality is ", (e.target === dijit._lastKeyDownNode));
						if((e.keyCode == d.keys.ENTER || e.keyCode == d.keys.SPACE) &&
							!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey){
							// needed on IE for when focus changes between keydown and keyup - otherwise dropdown menus do not work
							dijit._lastKeyDownNode = e.target;
							
							// Stop event to prevent scrolling on space key in IE.
							// But don't do this for _HasDropDown because it surpresses the onkeypress
							// event needed to open the drop down when the user presses the SPACE key.
							if(!("openDropDown" in this && obj == this._buttonNode)){
								e.preventDefault();
							}
						}
			 		}),
					dc(obj, "onkeyup", this, function(e){
						//console.log(this.id + ": onkeyup, e.target = ", e.target, ", lastKeyDownNode was ", dijit._lastKeyDownNode, ", equality is ", (e.target === dijit._lastKeyDownNode));
						if( (e.keyCode == d.keys.ENTER || e.keyCode == d.keys.SPACE) &&
							e.target == dijit._lastKeyDownNode &&	// === breaks greasemonkey
							!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey){
								//need reset here or have problems in FF when focus returns to trigger element after closing popup/alert
								dijit._lastKeyDownNode = null;
								return m(e);
						}
					})
				);
			}
		}

		return handles;		// _Widget.Handle
	},

	////////////////// MISCELLANEOUS METHODS ///////////////////

	_onShow: function(){
		// summary:
		//		Internal method called when this widget is made visible.
		//		See `onShow` for details.
		this.onShow();
	},

	onShow: function(){
		// summary:
		//		Called when this widget becomes the selected pane in a
		//		`dijit.layout.TabContainer`, `dijit.layout.StackContainer`,
		//		`dijit.layout.AccordionContainer`, etc.
		//
		//		Also called to indicate display of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
		// tags:
		//		callback
	},

	onHide: function(){
		// summary:
			//		Called when another widget becomes the selected pane in a
			//		`dijit.layout.TabContainer`, `dijit.layout.StackContainer`,
			//		`dijit.layout.AccordionContainer`, etc.
			//
			//		Also called to indicate hide of a `dijit.Dialog`, `dijit.TooltipDialog`, or `dijit.TitlePane`.
			// tags:
			//		callback
	},

	onClose: function(){
		// summary:
		//		Called when this widget is being displayed as a popup (ex: a Calendar popped
		//		up from a DateTextBox), and it is hidden.
		//		This is called from the dijit.popup code, and should not be called directly.
		//
		//		Also used as a parameter for children of `dijit.layout.StackContainer` or subclasses.
		//		Callback if a user tries to close the child.   Child will be closed if this function returns true.
		// tags:
		//		extension

		return true;		// Boolean
	}
});

})();

}

if(!dojo._hasResource["dojo.string"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.string"] = true;
dojo.provide("dojo.string");

dojo.getObject("string", true, dojo);

/*=====
dojo.string = {
	// summary: String utilities for Dojo
};
=====*/

dojo.string.rep = function(/*String*/str, /*Integer*/num){
	//	summary:
	//		Efficiently replicate a string `n` times.
	//	str:
	//		the string to replicate
	//	num:
	//		number of times to replicate the string
	
	if(num <= 0 || !str){ return ""; }
	
	var buf = [];
	for(;;){
		if(num & 1){
			buf.push(str);
		}
		if(!(num >>= 1)){ break; }
		str += str;
	}
	return buf.join("");	// String
};

dojo.string.pad = function(/*String*/text, /*Integer*/size, /*String?*/ch, /*Boolean?*/end){
	//	summary:
	//		Pad a string to guarantee that it is at least `size` length by
	//		filling with the character `ch` at either the start or end of the
	//		string. Pads at the start, by default.
	//	text:
	//		the string to pad
	//	size:
	//		length to provide padding
	//	ch:
	//		character to pad, defaults to '0'
	//	end:
	//		adds padding at the end if true, otherwise pads at start
	//	example:
	//	|	// Fill the string to length 10 with "+" characters on the right.  Yields "Dojo++++++".
	//	|	dojo.string.pad("Dojo", 10, "+", true);

	if(!ch){
		ch = '0';
	}
	var out = String(text),
		pad = dojo.string.rep(ch, Math.ceil((size - out.length) / ch.length));
	return end ? out + pad : pad + out;	// String
};

dojo.string.substitute = function(	/*String*/		template,
									/*Object|Array*/map,
									/*Function?*/	transform,
									/*Object?*/		thisObject){
	//	summary:
	//		Performs parameterized substitutions on a string. Throws an
	//		exception if any parameter is unmatched.
	//	template:
	//		a string with expressions in the form `${key}` to be replaced or
	//		`${key:format}` which specifies a format function. keys are case-sensitive.
	//	map:
	//		hash to search for substitutions
	//	transform:
	//		a function to process all parameters before substitution takes
	//		place, e.g. mylib.encodeXML
	//	thisObject:
	//		where to look for optional format function; default to the global
	//		namespace
	//	example:
	//		Substitutes two expressions in a string from an Array or Object
	//	|	// returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// by providing substitution data in an Array
	//	|	dojo.string.substitute(
	//	|		"File '${0}' is not found in directory '${1}'.",
	//	|		["foo.html","/temp"]
	//	|	);
	//	|
	//	|	// also returns "File 'foo.html' is not found in directory '/temp'."
	//	|	// but provides substitution data in an Object structure.  Dotted
	//	|	// notation may be used to traverse the structure.
	//	|	dojo.string.substitute(
	//	|		"File '${name}' is not found in directory '${info.dir}'.",
	//	|		{ name: "foo.html", info: { dir: "/temp" } }
	//	|	);
	//	example:
	//		Use a transform function to modify the values:
	//	|	// returns "file 'foo.html' is not found in directory '/temp'."
	//	|	dojo.string.substitute(
	//	|		"${0} is not found in ${1}.",
	//	|		["foo.html","/temp"],
	//	|		function(str){
	//	|			// try to figure out the type
	//	|			var prefix = (str.charAt(0) == "/") ? "directory": "file";
	//	|			return prefix + " '" + str + "'";
	//	|		}
	//	|	);
	//	example:
	//		Use a formatter
	//	|	// returns "thinger -- howdy"
	//	|	dojo.string.substitute(
	//	|		"${0:postfix}", ["thinger"], null, {
	//	|			postfix: function(value, key){
	//	|				return value + " -- howdy";
	//	|			}
	//	|		}
	//	|	);

	thisObject = thisObject || dojo.global;
	transform = transform ?
		dojo.hitch(thisObject, transform) : function(v){ return v; };

	return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,
		function(match, key, format){
			var value = dojo.getObject(key, false, map);
			if(format){
				value = dojo.getObject(format, false, thisObject).call(thisObject, value, key);
			}
			return transform(value, key).toString();
		}); // String
};

/*=====
dojo.string.trim = function(str){
	//	summary:
	//		Trims whitespace from both sides of the string
	//	str: String
	//		String to be trimmed
	//	returns: String
	//		Returns the trimmed string
	//	description:
	//		This version of trim() was taken from [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript).
	//		The short yet performant version of this function is dojo.trim(),
	//		which is part of Dojo base.  Uses String.prototype.trim instead, if available.
	return "";	// String
}
=====*/

dojo.string.trim = String.prototype.trim ?
	dojo.trim : // aliasing to the native function
	function(str){
		str = str.replace(/^\s+/, '');
		for(var i = str.length - 1; i >= 0; i--){
			if(/\S/.test(str.charAt(i))){
				str = str.substring(0, i + 1);
				break;
			}
		}
		return str;
	};

}

if(!dojo._hasResource["dojo.date.stamp"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.date.stamp"] = true;
dojo.provide("dojo.date.stamp");

dojo.getObject("date.stamp", true, dojo);

// Methods to convert dates to or from a wire (string) format using well-known conventions

dojo.date.stamp.fromISOString = function(/*String*/formattedString, /*Number?*/defaultTime){
	//	summary:
	//		Returns a Date object given a string formatted according to a subset of the ISO-8601 standard.
	//
	//	description:
	//		Accepts a string formatted according to a profile of ISO8601 as defined by
	//		[RFC3339](http://www.ietf.org/rfc/rfc3339.txt), except that partial input is allowed.
	//		Can also process dates as specified [by the W3C](http://www.w3.org/TR/NOTE-datetime)
	//		The following combinations are valid:
	//
	//			* dates only
	//			|	* yyyy
	//			|	* yyyy-MM
	//			|	* yyyy-MM-dd
	// 			* times only, with an optional time zone appended
	//			|	* THH:mm
	//			|	* THH:mm:ss
	//			|	* THH:mm:ss.SSS
	// 			* and "datetimes" which could be any combination of the above
	//
	//		timezones may be specified as Z (for UTC) or +/- followed by a time expression HH:mm
	//		Assumes the local time zone if not specified.  Does not validate.  Improperly formatted
	//		input may return null.  Arguments which are out of bounds will be handled
	// 		by the Date constructor (e.g. January 32nd typically gets resolved to February 1st)
	//		Only years between 100 and 9999 are supported.
	//
  	//	formattedString:
	//		A string such as 2005-06-30T08:05:00-07:00 or 2005-06-30 or T08:05:00
	//
	//	defaultTime:
	//		Used for defaults for fields omitted in the formattedString.
	//		Uses 1970-01-01T00:00:00.0Z by default.

	if(!dojo.date.stamp._isoRegExp){
		dojo.date.stamp._isoRegExp =
//TODO: could be more restrictive and check for 00-59, etc.
			/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
	}

	var match = dojo.date.stamp._isoRegExp.exec(formattedString),
		result = null;

	if(match){
		match.shift();
		if(match[1]){match[1]--;} // Javascript Date months are 0-based
		if(match[6]){match[6] *= 1000;} // Javascript Date expects fractional seconds as milliseconds

		if(defaultTime){
			// mix in defaultTime.  Relatively expensive, so use || operators for the fast path of defaultTime === 0
			defaultTime = new Date(defaultTime);
			dojo.forEach(dojo.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop){
				return defaultTime["get" + prop]();
			}), function(value, index){
				match[index] = match[index] || value;
			});
		}
		result = new Date(match[0]||1970, match[1]||0, match[2]||1, match[3]||0, match[4]||0, match[5]||0, match[6]||0); //TODO: UTC defaults
		if(match[0] < 100){
			result.setFullYear(match[0] || 1970);
		}

		var offset = 0,
			zoneSign = match[7] && match[7].charAt(0);
		if(zoneSign != 'Z'){
			offset = ((match[8] || 0) * 60) + (Number(match[9]) || 0);
			if(zoneSign != '-'){ offset *= -1; }
		}
		if(zoneSign){
			offset -= result.getTimezoneOffset();
		}
		if(offset){
			result.setTime(result.getTime() + offset * 60000);
		}
	}

	return result; // Date or null
};

/*=====
	dojo.date.stamp.__Options = function(){
		//	selector: String
		//		"date" or "time" for partial formatting of the Date object.
		//		Both date and time will be formatted by default.
		//	zulu: Boolean
		//		if true, UTC/GMT is used for a timezone
		//	milliseconds: Boolean
		//		if true, output milliseconds
		this.selector = selector;
		this.zulu = zulu;
		this.milliseconds = milliseconds;
	}
=====*/

dojo.date.stamp.toISOString = function(/*Date*/dateObject, /*dojo.date.stamp.__Options?*/options){
	//	summary:
	//		Format a Date object as a string according a subset of the ISO-8601 standard
	//
	//	description:
	//		When options.selector is omitted, output follows [RFC3339](http://www.ietf.org/rfc/rfc3339.txt)
	//		The local time zone is included as an offset from GMT, except when selector=='time' (time without a date)
	//		Does not check bounds.  Only years between 100 and 9999 are supported.
	//
	//	dateObject:
	//		A Date object

	var _ = function(n){ return (n < 10) ? "0" + n : n; };
	options = options || {};
	var formattedDate = [],
		getter = options.zulu ? "getUTC" : "get",
		date = "";
	if(options.selector != "time"){
		var year = dateObject[getter+"FullYear"]();
		date = ["0000".substr((year+"").length)+year, _(dateObject[getter+"Month"]()+1), _(dateObject[getter+"Date"]())].join('-');
	}
	formattedDate.push(date);
	if(options.selector != "date"){
		var time = [_(dateObject[getter+"Hours"]()), _(dateObject[getter+"Minutes"]()), _(dateObject[getter+"Seconds"]())].join(':');
		var millis = dateObject[getter+"Milliseconds"]();
		if(options.milliseconds){
			time += "."+ (millis < 100 ? "0" : "") + _(millis);
		}
		if(options.zulu){
			time += "Z";
		}else if(options.selector != "time"){
			var timezoneOffset = dateObject.getTimezoneOffset();
			var absOffset = Math.abs(timezoneOffset);
			time += (timezoneOffset > 0 ? "-" : "+") +
				_(Math.floor(absOffset/60)) + ":" + _(absOffset%60);
		}
		formattedDate.push(time);
	}
	return formattedDate.join('T'); // String
};

}

if(!dojo._hasResource["dojo.parser"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.parser"] = true;
dojo.provide("dojo.parser");



new Date("X"); // workaround for #11279, new Date("") == NaN

dojo.parser = new function(){
	// summary:
	//		The Dom/Widget parsing package

	var d = dojo;

	function val2type(/*Object*/ value){
		// summary:
		//		Returns name of type of given value.

		if(d.isString(value)){ return "string"; }
		if(typeof value == "number"){ return "number"; }
		if(typeof value == "boolean"){ return "boolean"; }
		if(d.isFunction(value)){ return "function"; }
		if(d.isArray(value)){ return "array"; } // typeof [] == "object"
		if(value instanceof Date) { return "date"; } // assume timestamp
		if(value instanceof d._Url){ return "url"; }
		return "object";
	}

	function str2obj(/*String*/ value, /*String*/ type){
		// summary:
		//		Convert given string value to given type
		switch(type){
			case "string":
				return value;
			case "number":
				return value.length ? Number(value) : NaN;
			case "boolean":
				// for checked/disabled value might be "" or "checked".	 interpret as true.
				return typeof value == "boolean" ? value : !(value.toLowerCase()=="false");
			case "function":
				if(d.isFunction(value)){
					// IE gives us a function, even when we say something like onClick="foo"
					// (in which case it gives us an invalid function "function(){ foo }").
					//	Therefore, convert to string
					value=value.toString();
					value=d.trim(value.substring(value.indexOf('{')+1, value.length-1));
				}
				try{
					if(value === "" || value.search(/[^\w\.]+/i) != -1){
						// The user has specified some text for a function like "return x+5"
						return new Function(value);
					}else{
						// The user has specified the name of a function like "myOnClick"
						// or a single word function "return"
						return d.getObject(value, false) || new Function(value);
					}
				}catch(e){ return new Function(); }
			case "array":
				return value ? value.split(/\s*,\s*/) : [];
			case "date":
				switch(value){
					case "": return new Date("");	// the NaN of dates
					case "now": return new Date();	// current date
					default: return d.date.stamp.fromISOString(value);
				}
			case "url":
				return d.baseUrl + value;
			default:
				return d.fromJson(value);
		}
	}

	var dummyClass = {}, instanceClasses = {
		// map from fully qualified name (like "dijit.Button") to structure like
		// { cls: dijit.Button, params: {label: "string", disabled: "boolean"} }
	};

	// Widgets like BorderContainer add properties to _Widget via dojo.extend().
	// If BorderContainer is loaded after _Widget's parameter list has been cached,
	// we need to refresh that parameter list (for _Widget and all widgets that extend _Widget).
	// TODO: remove this in 2.0, when we stop caching parameters.
	d.connect(d, "extend", function(){
		instanceClasses = {};
	});

	function getProtoInfo(cls, params){
		// cls: A prototype
		//		The prototype of the class to check props on
		// params: Object
		//		The parameters object to mix found parameters onto.
		for(var name in cls){
			if(name.charAt(0)=="_"){ continue; }	// skip internal properties
			if(name in dummyClass){ continue; }		// skip "constructor" and "toString"
			params[name] = val2type(cls[name]);
		}
		return params;
	}

	function getClassInfo(/*String*/ className, /*Boolean*/ skipParamsLookup){
		// summary:
		//		Maps a widget name string like "dijit.form.Button" to the widget constructor itself,
		//		and a list of that widget's parameters and their types
		// className:
		//		fully qualified name (like "dijit.form.Button")
		// returns:
		//		structure like
		//			{
		//				cls: dijit.Button,
		//				params: { label: "string", disabled: "boolean"}
		//			}

		var c = instanceClasses[className];
		if(!c){
			// get pointer to widget class
			var cls = d.getObject(className), params = null;
			if(!cls){ return null; }		// class not defined [yet]
			if(!skipParamsLookup){ // from fastpath, we don't need to lookup the attrs on the proto because they are explicit
				params = getProtoInfo(cls.prototype, {})
			}
			c = { cls: cls, params: params };
			
		}else if(!skipParamsLookup && !c.params){
			// if we're calling getClassInfo and have a cls proto, but no params info, scan that cls for params now
			// and update the pointer in instanceClasses[className]. This happens when a widget appears in another
			// widget's template which still uses dojoType, but an instance of the widget appears prior with a data-dojo-type,
			// skipping this lookup the first time.
			c.params = getProtoInfo(c.cls.prototype, {});
		}
		
		return c;
	}

	this._functionFromScript = function(script, attrData){
		// summary:
		//		Convert a <script type="dojo/method" args="a, b, c"> ... </script>
		//		into a function
		// script: DOMNode
		//		The <script> DOMNode
		// attrData: String
		//		For HTML5 compliance, searches for attrData + "args" (typically
		//		"data-dojo-args") instead of "args"
		var preamble = "";
		var suffix = "";
		var argsStr = (script.getAttribute(attrData + "args") || script.getAttribute("args"));
		if(argsStr){
			d.forEach(argsStr.split(/\s*,\s*/), function(part, idx){
				preamble += "var "+part+" = arguments["+idx+"]; ";
			});
		}
		var withStr = script.getAttribute("with");
		if(withStr && withStr.length){
			d.forEach(withStr.split(/\s*,\s*/), function(part){
				preamble += "with("+part+"){";
				suffix += "}";
			});
		}
		return new Function(preamble+script.innerHTML+suffix);
	};

	this.instantiate = function(/* Array */nodes, /* Object? */mixin, /* Object? */args){
		// summary:
		//		Takes array of nodes, and turns them into class instances and
		//		potentially calls a startup method to allow them to connect with
		//		any children.
		// nodes: Array
		//		Array of nodes or objects like
		//	|		{
		//	|			type: "dijit.form.Button",
		//	|			node: DOMNode,
		//	|			scripts: [ ... ],	// array of <script type="dojo/..."> children of node
		//	|			inherited: { ... }	// settings inherited from ancestors like dir, theme, etc.
		//	|		}
		// mixin: Object?
		//		An object that will be mixed in with each node in the array.
		//		Values in the mixin will override values in the node, if they
		//		exist.
		// args: Object?
		//		An object used to hold kwArgs for instantiation.
		//		See parse.args argument for details.

		var thelist = [],
		mixin = mixin||{};
		args = args||{};

		// TODO: for 2.0 default to data-dojo- regardless of scopeName (or maybe scopeName won't exist in 2.0)
		var attrName = (args.scope || d._scopeName) + "Type",	// typically "dojoType"
			attrData = "data-" + (args.scope || d._scopeName) + "-";	// typically "data-dojo-"

		d.forEach(nodes, function(obj){
			if(!obj){ return; }

			// Get pointers to DOMNode, dojoType string, and clsInfo (metadata about the dojoType), etc.
			var node, type, clsInfo, clazz, scripts, fastpath;
			if(obj.node){
				// new format of nodes[] array, object w/lots of properties pre-computed for me
				node = obj.node;
				type = obj.type;
				fastpath = obj.fastpath;
				clsInfo = obj.clsInfo || (type && getClassInfo(type, fastpath));
				clazz = clsInfo && clsInfo.cls;
				scripts = obj.scripts;
			}else{
				// old (backwards compatible) format of nodes[] array, simple array of DOMNodes. no fastpath/data-dojo-type support here.
				node = obj;
				type = attrName in mixin ? mixin[attrName] : node.getAttribute(attrName);
				clsInfo = type && getClassInfo(type);
				clazz = clsInfo && clsInfo.cls;
				scripts = (clazz && (clazz._noScript || clazz.prototype._noScript) ? [] :
							d.query("> script[type^='dojo/']", node));
			}
			if(!clsInfo){
				throw new Error("Could not load class '" + type);
			}

			// Setup hash to hold parameter settings for this widget.	Start with the parameter
			// settings inherited from ancestors ("dir" and "lang").
			// Inherited setting may later be overridden by explicit settings on node itself.
			var params = {};
				
			if(args.defaults){
				// settings for the document itself (or whatever subtree is being parsed)
				d._mixin(params, args.defaults);
			}
			if(obj.inherited){
				// settings from dir=rtl or lang=... on a node above this node
				d._mixin(params, obj.inherited);
			}
			
			// mix things found in data-dojo-props into the params
			if(fastpath){
				var extra = node.getAttribute(attrData + "props");
				if(extra && extra.length){
					try{
						extra = d.fromJson.call(args.propsThis, "{" + extra + "}");
						d._mixin(params, extra);
					}catch(e){
						// give the user a pointer to their invalid parameters. FIXME: can we kill this in production?
						throw new Error(e.toString() + " in data-dojo-props='" + extra + "'");
					}
				}

				// For the benefit of _Templated, check if node has data-dojo-attach-point/data-dojo-attach-event
				// and mix those in as though they were parameters
				var attachPoint = node.getAttribute(attrData + "attach-point");
				if(attachPoint){
					params.dojoAttachPoint = attachPoint;
				}
				var attachEvent = node.getAttribute(attrData + "attach-event");
				if(attachEvent){
					params.dojoAttachEvent = attachEvent;
				}
				dojo.mixin(params, mixin);
			}else{
				// FIXME: we need something like "deprecateOnce()" to throw dojo.deprecation for something.
				// remove this logic in 2.0
				// read parameters (ie, attributes) specified on DOMNode

				var attributes = node.attributes;

				// clsInfo.params lists expected params like {"checked": "boolean", "n": "number"}
				for(var name in clsInfo.params){
					var item = name in mixin ? { value:mixin[name], specified:true } : attributes.getNamedItem(name);
					if(!item || (!item.specified && (!dojo.isIE || name.toLowerCase()!="value"))){ continue; }
					var value = item.value;
					// Deal with IE quirks for 'class' and 'style'
					switch(name){
					case "class":
						value = "className" in mixin ? mixin.className : node.className;
						break;
					case "style":
						value = "style" in mixin ? mixin.style : (node.style && node.style.cssText); // FIXME: Opera?
					}
					var _type = clsInfo.params[name];
					if(typeof value == "string"){
						params[name] = str2obj(value, _type);
					}else{
						params[name] = value;
					}
				}
			}

			// Process <script type="dojo/*"> script tags
			// <script type="dojo/method" event="foo"> tags are added to params, and passed to
			// the widget on instantiation.
			// <script type="dojo/method"> tags (with no event) are executed after instantiation
			// <script type="dojo/connect" event="foo"> tags are dojo.connected after instantiation
			// note: dojo/* script tags cannot exist in self closing widgets, like <input />
			var connects = [],	// functions to connect after instantiation
				calls = [];		// functions to call after instantiation

			d.forEach(scripts, function(script){
				node.removeChild(script);
				// FIXME: drop event="" support in 2.0. use data-dojo-event="" instead
				var event = (script.getAttribute(attrData + "event") || script.getAttribute("event")),
					type = script.getAttribute("type"),
					nf = d.parser._functionFromScript(script, attrData);
				if(event){
					if(type == "dojo/connect"){
						connects.push({event: event, func: nf});
					}else{
						params[event] = nf;
					}
				}else{
					calls.push(nf);
				}
			});

			var markupFactory = clazz.markupFactory || clazz.prototype && clazz.prototype.markupFactory;
			// create the instance
			var instance = markupFactory ? markupFactory(params, node, clazz) : new clazz(params, node);
			thelist.push(instance);

			// map it to the JS namespace if that makes sense
			// FIXME: in 2.0, drop jsId support. use data-dojo-id instead
			var jsname = (node.getAttribute(attrData + "id") || node.getAttribute("jsId"));
			if(jsname){
				d.setObject(jsname, instance);
			}

			// process connections and startup functions
			d.forEach(connects, function(connect){
				d.connect(instance, connect.event, null, connect.func);
			});
			d.forEach(calls, function(func){
				func.call(instance);
			});
		});

		// Call startup on each top level instance if it makes sense (as for
		// widgets).  Parent widgets will recursively call startup on their
		// (non-top level) children
		if(!mixin._started){
			// TODO: for 2.0, when old instantiate() API is desupported, store parent-child
			// relationships in the nodes[] array so that no getParent() call is needed.
			// Note that will  require a parse() call from ContentPane setting a param that the
			// ContentPane is the parent widget (so that the parse doesn't call startup() on the
			// ContentPane's children)
			d.forEach(thelist, function(instance){
				if( !args.noStart && instance  &&
					dojo.isFunction(instance.startup) &&
					!instance._started &&
					(!instance.getParent || !instance.getParent())
				){
					instance.startup();
				}
			});
		}
		return thelist;
	};

	this.parse = function(rootNode, args){
		// summary:
		//		Scan the DOM for class instances, and instantiate them.
		//
		// description:
		//		Search specified node (or root node) recursively for class instances,
		//		and instantiate them. Searches for either data-dojo-type="Class" or
		//		dojoType="Class" where "Class" is a a fully qualified class name,
		//		like `dijit.form.Button`
		//
		//		Using `data-dojo-type`:
		//		Attributes using can be mixed into the parameters used to instantitate the
		//		Class by using a `data-dojo-props` attribute on the node being converted.
		//		`data-dojo-props` should be a string attribute to be converted from JSON.
		//
		//		Using `dojoType`:
		//		Attributes are read from the original domNode and converted to appropriate
		//		types by looking up the Class prototype values. This is the default behavior
		//		from Dojo 1.0 to Dojo 1.5. `dojoType` support is deprecated, and will
		//		go away in Dojo 2.0.
		//
		// rootNode: DomNode?
		//		A default starting root node from which to start the parsing. Can be
		//		omitted, defaulting to the entire document. If omitted, the `args`
		//		object can be passed in this place. If the `args` object has a
		//		`rootNode` member, that is used.
		//
		// args: Object
		//		a kwArgs object passed along to instantiate()
		//
		//			* noStart: Boolean?
		//				when set will prevent the parser from calling .startup()
		//				when locating the nodes.
		//			* rootNode: DomNode?
		//				identical to the function's `rootNode` argument, though
		//				allowed to be passed in via this `args object.
		//			* template: Boolean
		//				If true, ignores ContentPane's stopParser flag and parses contents inside of
		//				a ContentPane inside of a template.   This allows dojoAttachPoint on widgets/nodes
		//				nested inside the ContentPane to work.
		//			* inherited: Object
		//				Hash possibly containing dir and lang settings to be applied to
		//				parsed widgets, unless there's another setting on a sub-node that overrides
		//			* scope: String
		//				Root for attribute names to search for.   If scopeName is dojo,
		//				will search for data-dojo-type (or dojoType).   For backwards compatibility
		//				reasons defaults to dojo._scopeName (which is "dojo" except when
		//				multi-version support is used, when it will be something like dojo16, dojo20, etc.)
		//			* propsThis: Object
		//				If specified, "this" referenced from data-dojo-props will refer to propsThis.
		//				Intended for use from the widgets-in-template feature of `dijit._Templated`
		//
		// example:
		//		Parse all widgets on a page:
		//	|		dojo.parser.parse();
		//
		// example:
		//		Parse all classes within the node with id="foo"
		//	|		dojo.parser.parse(dojo.byId('foo'));
		//
		// example:
		//		Parse all classes in a page, but do not call .startup() on any
		//		child
		//	|		dojo.parser.parse({ noStart: true })
		//
		// example:
		//		Parse all classes in a node, but do not call .startup()
		//	|		dojo.parser.parse(someNode, { noStart:true });
		//	|		// or
		//	|		dojo.parser.parse({ noStart:true, rootNode: someNode });

		// determine the root node based on the passed arguments.
		var root;
		if(!args && rootNode && rootNode.rootNode){
			args = rootNode;
			root = args.rootNode;
		}else{
			root = rootNode;
		}
		args = args || {};

		var attrName = (args.scope || d._scopeName) + "Type",		// typically "dojoType"
			attrData = "data-" + (args.scope || d._scopeName) + "-";	// typically "data-dojo-"

		function scan(parent, list){
			// summary:
			//		Parent is an Object representing a DOMNode, with or without a dojoType specified.
			//		Scan parent's children looking for nodes with dojoType specified, storing in list[].
			//		If parent has a dojoType, also collects <script type=dojo/*> children and stores in parent.scripts[].
			// parent: Object
			//		Object representing the parent node, like
			//	|	{
			//	|		node: DomNode,			// scan children of this node
			//	|		inherited: {dir: "rtl"},	// dir/lang setting inherited from above node
			//	|
			//	|		// attributes only set if node has dojoType specified
			//	|		scripts: [],			// empty array, put <script type=dojo/*> in here
			//	|		clsInfo: { cls: dijit.form.Button, ...}
			//	|	}
			// list: DomNode[]
			//		Output array of objects (same format as parent) representing nodes to be turned into widgets

			// Effective dir and lang settings on parent node, either set directly or inherited from grandparent
			var inherited = dojo.clone(parent.inherited);
			dojo.forEach(["dir", "lang"], function(name){
				// TODO: what if this is a widget and dir/lang are declared in data-dojo-props?
				var val = parent.node.getAttribute(name);
				if(val){
					inherited[name] = val;
				}
			});

			// if parent is a widget, then search for <script type=dojo/*> tags and put them in scripts[].
			var scripts = parent.clsInfo && !parent.clsInfo.cls.prototype._noScript ? parent.scripts : null;

			// unless parent is a widget with the stopParser flag set, continue search for dojoType, recursively
			var recurse = (!parent.clsInfo || !parent.clsInfo.cls.prototype.stopParser) || (args && args.template);

			// scan parent's children looking for dojoType and <script type=dojo/*>
			for(var child = parent.node.firstChild; child; child = child.nextSibling){
				if(child.nodeType == 1){
					// FIXME: desupport dojoType in 2.0. use data-dojo-type instead
					var type, html5 = recurse && child.getAttribute(attrData + "type");
					if(html5){
						type = html5;
					}else{
						// fallback to backward compatible mode, using dojoType. remove in 2.0
						type = recurse && child.getAttribute(attrName);
					}
					
					var fastpath = html5 == type;

					if(type){
						// if dojoType/data-dojo-type specified, add to output array of nodes to instantiate
						var params = {
							"type": type,
							fastpath: fastpath,
							clsInfo: getClassInfo(type, fastpath), // note: won't find classes declared via dojo.Declaration
							node: child,
							scripts: [], // <script> nodes that are parent's children
							inherited: inherited // dir & lang attributes inherited from parent
						};
						list.push(params);

						// Recurse, collecting <script type="dojo/..."> children, and also looking for
						// descendant nodes with dojoType specified (unless the widget has the stopParser flag),
						scan(params, list);
					}else if(scripts && child.nodeName.toLowerCase() == "script"){
						// if <script type="dojo/...">, save in scripts[]
						type = child.getAttribute("type");
						if (type && /^dojo\/\w/i.test(type)) {
							scripts.push(child);
						}
					}else if(recurse){
						// Recurse, looking for grandchild nodes with dojoType specified
						scan({
							node: child,
							inherited: inherited
						}, list);
					}
				}
			}
		}

		// Make list of all nodes on page w/dojoType specified
		var list = [];
		scan({
			node: root ? dojo.byId(root) : dojo.body(),
			inherited: (args && args.inherited) || {
				dir: dojo._isBodyLtr() ? "ltr" : "rtl"
			}
		}, list);

		// go build the object instances
		var mixin = args && args.template ? {template: true} : null;
		return this.instantiate(list, mixin, args); // Array
	};
}();

//Register the parser callback. It should be the first callback
//after the a11y test.

(function(){
	var parseRunner = function(){
		if(dojo.config.parseOnLoad){
			dojo.parser.parse();
		}
	};

	// FIXME: need to clobber cross-dependency!!
	if(dojo.getObject("dijit.wai.onload") === dojo._loaders[0]){
		dojo._loaders.splice(1, 0, parseRunner);
	}else{
		dojo._loaders.unshift(parseRunner);
	}
})();

}

if(!dojo._hasResource["dojo.cache"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.cache"] = true;
dojo.provide("dojo.cache");


/*=====
dojo.cache = {
	// summary:
	// 		A way to cache string content that is fetchable via `dojo.moduleUrl`.
};
=====*/

	var cache = {};
	dojo.cache = function(/*String||Object*/module, /*String*/url, /*String||Object?*/value){
		// summary:
		// 		A getter and setter for storing the string content associated with the
		// 		module and url arguments.
		// description:
		// 		module and url are used to call `dojo.moduleUrl()` to generate a module URL.
		// 		If value is specified, the cache value for the moduleUrl will be set to
		// 		that value. Otherwise, dojo.cache will fetch the moduleUrl and store it
		// 		in its internal cache and return that cached value for the URL. To clear
		// 		a cache value pass null for value. Since XMLHttpRequest (XHR) is used to fetch the
		// 		the URL contents, only modules on the same domain of the page can use this capability.
		// 		The build system can inline the cache values though, to allow for xdomain hosting.
		// module: String||Object
		// 		If a String, the module name to use for the base part of the URL, similar to module argument
		// 		to `dojo.moduleUrl`. If an Object, something that has a .toString() method that
		// 		generates a valid path for the cache item. For example, a dojo._Url object.
		// url: String
		// 		The rest of the path to append to the path derived from the module argument. If
		// 		module is an object, then this second argument should be the "value" argument instead.
		// value: String||Object?
		// 		If a String, the value to use in the cache for the module/url combination.
		// 		If an Object, it can have two properties: value and sanitize. The value property
		// 		should be the value to use in the cache, and sanitize can be set to true or false,
		// 		to indicate if XML declarations should be removed from the value and if the HTML
		// 		inside a body tag in the value should be extracted as the real value. The value argument
		// 		or the value property on the value argument are usually only used by the build system
		// 		as it inlines cache content.
		//	example:
		//		To ask dojo.cache to fetch content and store it in the cache (the dojo["cache"] style
		// 		of call is used to avoid an issue with the build system erroneously trying to intern
		// 		this example. To get the build system to intern your dojo.cache calls, use the
		// 		"dojo.cache" style of call):
		// 		|	//If template.html contains "<h1>Hello</h1>" that will be
		// 		|	//the value for the text variable.
		//		|	var text = dojo["cache"]("my.module", "template.html");
		//	example:
		//		To ask dojo.cache to fetch content and store it in the cache, and sanitize the input
		// 		 (the dojo["cache"] style of call is used to avoid an issue with the build system
		// 		erroneously trying to intern this example. To get the build system to intern your
		// 		dojo.cache calls, use the "dojo.cache" style of call):
		// 		|	//If template.html contains "<html><body><h1>Hello</h1></body></html>", the
		// 		|	//text variable will contain just "<h1>Hello</h1>".
		//		|	var text = dojo["cache"]("my.module", "template.html", {sanitize: true});
		//	example:
		//		Same example as previous, but demostrates how an object can be passed in as
		//		the first argument, then the value argument can then be the second argument.
		// 		|	//If template.html contains "<html><body><h1>Hello</h1></body></html>", the
		// 		|	//text variable will contain just "<h1>Hello</h1>".
		//		|	var text = dojo["cache"](new dojo._Url("my/module/template.html"), {sanitize: true});

		//Module could be a string, or an object that has a toString() method
		//that will return a useful path. If it is an object, then the "url" argument
		//will actually be the value argument.
		if(typeof module == "string"){
			var pathObj = dojo.moduleUrl(module, url);
		}else{
			pathObj = module;
			value = url;
		}
		var key = pathObj.toString();

		var val = value;
		if(value != undefined && !dojo.isString(value)){
			val = ("value" in value ? value.value : undefined);
		}

		var sanitize = value && value.sanitize ? true : false;

		if(typeof val == "string"){
			//We have a string, set cache value
			val = cache[key] = sanitize ? dojo.cache._sanitize(val) : val;
		}else if(val === null){
			//Remove cached value
			delete cache[key];
		}else{
			//Allow cache values to be empty strings. If key property does
			//not exist, fetch it.
			if(!(key in cache)){
				val = dojo._getText(key);
				cache[key] = sanitize ? dojo.cache._sanitize(val) : val;
			}
			val = cache[key];
		}
		return val; //String
	};

	dojo.cache._sanitize = function(/*String*/val){
		// summary:
		//		Strips <?xml ...?> declarations so that external SVG and XML
		// 		documents can be added to a document without worry. Also, if the string
		//		is an HTML document, only the part inside the body tag is returned.
		// description:
		// 		Copied from dijit._Templated._sanitizeTemplateString.
		if(val){
			val = val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
			var matches = val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
			if(matches){
				val = matches[1];
			}
		}else{
			val = "";
		}
		return val; //String
	};

}

if(!dojo._hasResource["dijit._Templated"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._Templated"] = true;
dojo.provide("dijit._Templated");






dojo.declare("dijit._Templated",
	null,
	{
		// summary:
		//		Mixin for widgets that are instantiated from a template

		// templateString: [protected] String
		//		A string that represents the widget template. Pre-empts the
		//		templatePath. In builds that have their strings "interned", the
		//		templatePath is converted to an inline templateString, thereby
		//		preventing a synchronous network call.
		//
		//		Use in conjunction with dojo.cache() to load from a file.
		templateString: null,

		// templatePath: [protected deprecated] String
		//		Path to template (HTML file) for this widget relative to dojo.baseUrl.
		//		Deprecated: use templateString with dojo.cache() instead.
		templatePath: null,

		// widgetsInTemplate: [protected] Boolean
		//		Should we parse the template to find widgets that might be
		//		declared in markup inside it?  False by default.
		widgetsInTemplate: false,

		// skipNodeCache: [protected] Boolean
		//		If using a cached widget template node poses issues for a
		//		particular widget class, it can set this property to ensure
		//		that its template is always re-built from a string
		_skipNodeCache: false,

		// _earlyTemplatedStartup: Boolean
		//		A fallback to preserve the 1.0 - 1.3 behavior of children in
		//		templates having their startup called before the parent widget
		//		fires postCreate. Defaults to 'false', causing child widgets to
		//		have their .startup() called immediately before a parent widget
		//		.startup(), but always after the parent .postCreate(). Set to
		//		'true' to re-enable to previous, arguably broken, behavior.
		_earlyTemplatedStartup: false,

/*=====
		// _attachPoints: [private] String[]
		//		List of widget attribute names associated with dojoAttachPoint=... in the
		//		template, ex: ["containerNode", "labelNode"]
 		_attachPoints: [],
 =====*/

/*=====
		// _attachEvents: [private] Handle[]
		//		List of connections associated with dojoAttachEvent=... in the
		//		template
 		_attachEvents: [],
 =====*/

		constructor: function(){
			this._attachPoints = [];
			this._attachEvents = [];
		},

		_stringRepl: function(tmpl){
			// summary:
			//		Does substitution of ${foo} type properties in template string
			// tags:
			//		private
			var className = this.declaredClass, _this = this;
			// Cache contains a string because we need to do property replacement
			// do the property replacement
			return dojo.string.substitute(tmpl, this, function(value, key){
				if(key.charAt(0) == '!'){ value = dojo.getObject(key.substr(1), false, _this); }
				if(typeof value == "undefined"){ throw new Error(className+" template:"+key); } // a debugging aide
				if(value == null){ return ""; }

				// Substitution keys beginning with ! will skip the transform step,
				// in case a user wishes to insert unescaped markup, e.g. ${!foo}
				return key.charAt(0) == "!" ? value :
					// Safer substitution, see heading "Attribute values" in
					// http://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
					value.toString().replace(/"/g,"&quot;"); //TODO: add &amp? use encodeXML method?
			}, this);
		},

		buildRendering: function(){
			// summary:
			//		Construct the UI for this widget from a template, setting this.domNode.
			// tags:
			//		protected

			// Lookup cached version of template, and download to cache if it
			// isn't there already.  Returns either a DomNode or a string, depending on
			// whether or not the template contains ${foo} replacement parameters.
			var cached = dijit._Templated.getCachedTemplate(this.templatePath, this.templateString, this._skipNodeCache);

			var node;
			if(dojo.isString(cached)){
				node = dojo._toDom(this._stringRepl(cached));
				if(node.nodeType != 1){
					// Flag common problems such as templates with multiple top level nodes (nodeType == 11)
					throw new Error("Invalid template: " + cached);
				}
			}else{
				// if it's a node, all we have to do is clone it
				node = cached.cloneNode(true);
			}

			this.domNode = node;

			// Call down to _Widget.buildRendering() to get base classes assigned
			// TODO: change the baseClass assignment to attributeMap
			this.inherited(arguments);

			// recurse through the node, looking for, and attaching to, our
			// attachment points and events, which should be defined on the template node.
			this._attachTemplateNodes(node);

			if(this.widgetsInTemplate){
				// Store widgets that we need to start at a later point in time
				var cw = (this._startupWidgets = dojo.parser.parse(node, {
					noStart: !this._earlyTemplatedStartup,
					template: true,
					inherited: {dir: this.dir, lang: this.lang},
					propsThis: this,	// so data-dojo-props of widgets in the template can reference "this" to refer to me
					scope: "dojo"	// even in multi-version mode templates use dojoType/data-dojo-type
				}));

				this._supportingWidgets = dijit.findWidgets(node);

				this._attachTemplateNodes(cw, function(n,p){
					return n[p];
				});
			}

			this._fillContent(this.srcNodeRef);
		},

		_fillContent: function(/*DomNode*/ source){
			// summary:
			//		Relocate source contents to templated container node.
			//		this.containerNode must be able to receive children, or exceptions will be thrown.
			// tags:
			//		protected
			var dest = this.containerNode;
			if(source && dest){
				while(source.hasChildNodes()){
					dest.appendChild(source.firstChild);
				}
			}
		},

		_attachTemplateNodes: function(rootNode, getAttrFunc){
			// summary:
			//		Iterate through the template and attach functions and nodes accordingly.
			//		Alternately, if rootNode is an array of widgets, then will process dojoAttachPoint
			//		etc. for those widgets.
			// description:
			//		Map widget properties and functions to the handlers specified in
			//		the dom node and it's descendants. This function iterates over all
			//		nodes and looks for these properties:
			//			* dojoAttachPoint
			//			* dojoAttachEvent
			//			* waiRole
			//			* waiState
			// rootNode: DomNode|Array[Widgets]
			//		the node to search for properties. All children will be searched.
			// getAttrFunc: Function?
			//		a function which will be used to obtain property for a given
			//		DomNode/Widget
			// tags:
			//		private

			getAttrFunc = getAttrFunc || function(n,p){ return n.getAttribute(p); };

			var nodes = dojo.isArray(rootNode) ? rootNode : (rootNode.all || rootNode.getElementsByTagName("*"));
			var x = dojo.isArray(rootNode) ? 0 : -1;
			for(; x<nodes.length; x++){
				var baseNode = (x == -1) ? rootNode : nodes[x];
				if(this.widgetsInTemplate && (getAttrFunc(baseNode, "dojoType") || getAttrFunc(baseNode, "data-dojo-type"))){
					continue;
				}
				// Process dojoAttachPoint
				var attachPoint = getAttrFunc(baseNode, "dojoAttachPoint") || getAttrFunc(baseNode, "data-dojo-attach-point");
				if(attachPoint){
					var point, points = attachPoint.split(/\s*,\s*/);
					while((point = points.shift())){
						if(dojo.isArray(this[point])){
							this[point].push(baseNode);
						}else{
							this[point]=baseNode;
						}
						this._attachPoints.push(point);
					}
				}

				// Process dojoAttachEvent
				var attachEvent = getAttrFunc(baseNode, "dojoAttachEvent") || getAttrFunc(baseNode, "data-dojo-attach-event");;
				if(attachEvent){
					// NOTE: we want to support attributes that have the form
					// "domEvent: nativeEvent; ..."
					var event, events = attachEvent.split(/\s*,\s*/);
					var trim = dojo.trim;
					while((event = events.shift())){
						if(event){
							var thisFunc = null;
							if(event.indexOf(":") != -1){
								// oh, if only JS had tuple assignment
								var funcNameArr = event.split(":");
								event = trim(funcNameArr[0]);
								thisFunc = trim(funcNameArr[1]);
							}else{
								event = trim(event);
							}
							if(!thisFunc){
								thisFunc = event;
							}
							this._attachEvents.push(this.connect(baseNode, event, thisFunc));
						}
					}
				}

				// waiRole, waiState
				// TODO: remove this in 2.0, templates are now using role=... and aria-XXX=... attributes directicly
				var role = getAttrFunc(baseNode, "waiRole");
				if(role){
					dijit.setWaiRole(baseNode, role);
				}
				var values = getAttrFunc(baseNode, "waiState");
				if(values){
					dojo.forEach(values.split(/\s*,\s*/), function(stateValue){
						if(stateValue.indexOf('-') != -1){
							var pair = stateValue.split('-');
							dijit.setWaiState(baseNode, pair[0], pair[1]);
						}
					});
				}
			}
		},

		startup: function(){
			dojo.forEach(this._startupWidgets, function(w){
				if(w && !w._started && w.startup){
					w.startup();
				}
			});
			this.inherited(arguments);
		},

		destroyRendering: function(){
			// Delete all attach points to prevent IE6 memory leaks.
			dojo.forEach(this._attachPoints, function(point){
				delete this[point];
			}, this);
			this._attachPoints = [];

			// And same for event handlers
			dojo.forEach(this._attachEvents, this.disconnect, this);
			this._attachEvents = [];
			
			this.inherited(arguments);
		}
	}
);

// key is either templatePath or templateString; object is either string or DOM tree
dijit._Templated._templateCache = {};

dijit._Templated.getCachedTemplate = function(templatePath, templateString, alwaysUseString){
	// summary:
	//		Static method to get a template based on the templatePath or
	//		templateString key
	// templatePath: String||dojo.uri.Uri
	//		The URL to get the template from.
	// templateString: String?
	//		a string to use in lieu of fetching the template from a URL. Takes precedence
	//		over templatePath
	// returns: Mixed
	//		Either string (if there are ${} variables that need to be replaced) or just
	//		a DOM tree (if the node can be cloned directly)

	// is it already cached?
	var tmplts = dijit._Templated._templateCache;
	var key = templateString || templatePath;
	var cached = tmplts[key];
	if(cached){
		try{
			// if the cached value is an innerHTML string (no ownerDocument) or a DOM tree created within the current document, then use the current cached value
			if(!cached.ownerDocument || cached.ownerDocument == dojo.doc){
				// string or node of the same document
				return cached;
			}
		}catch(e){ /* squelch */ } // IE can throw an exception if cached.ownerDocument was reloaded
		dojo.destroy(cached);
	}

	// If necessary, load template string from template path
	if(!templateString){
		templateString = dojo.cache(templatePath, {sanitize: true});
	}
	templateString = dojo.string.trim(templateString);

	if(alwaysUseString || templateString.match(/\$\{([^\}]+)\}/g)){
		// there are variables in the template so all we can do is cache the string
		return (tmplts[key] = templateString); //String
	}else{
		// there are no variables in the template so we can cache the DOM tree
		var node = dojo._toDom(templateString);
		if(node.nodeType != 1){
			throw new Error("Invalid template: " + templateString);
		}
		return (tmplts[key] = node); //Node
	}
};

if(dojo.isIE){
	dojo.addOnWindowUnload(function(){
		var cache = dijit._Templated._templateCache;
		for(var key in cache){
			var value = cache[key];
			if(typeof value == "object"){ // value is either a string or a DOM node template
				dojo.destroy(value);
			}
			delete cache[key];
		}
	});
}

// These arguments can be specified for widgets which are used in templates.
// Since any widget can be specified as sub widgets in template, mix it
// into the base widget class.  (This is a hack, but it's effective.)
dojo.extend(dijit._Widget,{
	dojoAttachEvent: "",
	dojoAttachPoint: "",
	waiRole: "",
	waiState:""
});

}

if(!dojo._hasResource["dojox.string.Builder"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.string.Builder"] = true;
dojo.provide("dojox.string.Builder");

dojox.string.Builder = function(/*String?*/str){
	//	summary:
	//		A fast buffer for creating large strings.
	//
	//	length: Number
	//		The current length of the internal string.

	//	N.B. the public nature of the internal buffer is no longer
	//	needed because the IE-specific fork is no longer needed--TRT.
	var b = "";
	this.length = 0;
	
	this.append = function(/* String... */s){
		// summary: Append all arguments to the end of the buffer
		if(arguments.length>1){
			/*
				This is a loop unroll was designed specifically for Firefox;
				it would seem that static index access on an Arguments
				object is a LOT faster than doing dynamic index access.
				Therefore, we create a buffer string and take advantage
				of JS's switch fallthrough.  The peformance of this method
				comes very close to straight up string concatenation (+=).

				If the arguments object length is greater than 9, we fall
				back to standard dynamic access.

				This optimization seems to have no real effect on either
				Safari or Opera, so we just use it for all.

				It turns out also that this loop unroll can increase performance
				significantly with Internet Explorer, particularly when
				as many arguments are provided as possible.

				Loop unroll per suggestion from Kris Zyp, implemented by
				Tom Trenka.

				Note: added empty string to force a string cast if needed.
			 */
			var tmp="", l=arguments.length;
			switch(l){
				case 9: tmp=""+arguments[8]+tmp;
				case 8: tmp=""+arguments[7]+tmp;
				case 7: tmp=""+arguments[6]+tmp;
				case 6: tmp=""+arguments[5]+tmp;
				case 5: tmp=""+arguments[4]+tmp;
				case 4: tmp=""+arguments[3]+tmp;
				case 3: tmp=""+arguments[2]+tmp;
				case 2: {
					b+=""+arguments[0]+arguments[1]+tmp;
					break;
				}
				default: {
					var i=0;
					while(i<arguments.length){
						tmp += arguments[i++];
					}
					b += tmp;
				}
			}
		} else {
			b += s;
		}
		this.length = b.length;
		return this;	//	dojox.string.Builder
	};
	
	this.concat = function(/*String...*/s){
		//	summary:
		//		Alias for append.
		return this.append.apply(this, arguments);	//	dojox.string.Builder
	};
	
	this.appendArray = function(/*Array*/strings) {
		//	summary:
		//		Append an array of items to the internal buffer.

		//	Changed from String.prototype.concat.apply because of IE.
		return this.append.apply(this, strings);	//	dojox.string.Builder
	};
	
	this.clear = function(){
		//	summary:
		//		Remove all characters from the buffer.
		b = "";
		this.length = 0;
		return this;	//	dojox.string.Builder
	};
	
	this.replace = function(/* String */oldStr, /* String */ newStr){
		// 	summary:
		//		Replace instances of one string with another in the buffer.
		b = b.replace(oldStr,newStr);
		this.length = b.length;
		return this;	//	dojox.string.Builder
	};
	
	this.remove = function(/* Number */start, /* Number? */len){
		//	summary:
		//		Remove len characters starting at index start.  If len
		//		is not provided, the end of the string is assumed.
		if(len===undefined){ len = b.length; }
		if(len == 0){ return this; }
		b = b.substr(0, start) + b.substr(start+len);
		this.length = b.length;
		return this;	//	dojox.string.Builder
	};
	
	this.insert = function(/* Number */index, /* String */str){
		//	summary:
		//		Insert string str starting at index.
		if(index == 0){
			b = str + b;
		}else{
			b = b.slice(0, index) + str + b.slice(index);
		}
		this.length = b.length;
		return this;	//	dojox.string.Builder
	};
	
	this.toString = function(){
		//	summary:
		//		Return the string representation of the internal buffer.
		return b;	//	String
	};

	//	initialize the buffer.
	if(str){ this.append(str); }
};

}

if(!dojo._hasResource["dojox.string.tokenize"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.string.tokenize"] = true;
dojo.provide("dojox.string.tokenize");

dojox.string.tokenize = function(/*String*/ str, /*RegExp*/ re, /*Function?*/ parseDelim, /*Object?*/ instance){
	// summary:
	//		Split a string by a regular expression with the ability to capture the delimeters
	// parseDelim:
	//		Each group (excluding the 0 group) is passed as a parameter. If the function returns
	//		a value, it's added to the list of tokens.
	// instance:
	//		Used as the "this" instance when calling parseDelim
	var tokens = [];
	var match, content, lastIndex = 0;
	while(match = re.exec(str)){
		content = str.slice(lastIndex, re.lastIndex - match[0].length);
		if(content.length){
			tokens.push(content);
		}
		if(parseDelim){
			if(dojo.isOpera){
				var copy = match.slice(0);
				while(copy.length < match.length){
					copy.push(null);
				}
				match = copy;
			}
			var parsed = parseDelim.apply(instance, match.slice(1).concat(tokens.length));
			if(typeof parsed != "undefined"){
				tokens.push(parsed);
			}
		}
		lastIndex = re.lastIndex;
	}
	content = str.slice(lastIndex);
	if(content.length){
		tokens.push(content);
	}
	return tokens;
}

}

if(!dojo._hasResource["dojox.dtl._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl._base"] = true;
dojo.provide("dojox.dtl._base");




dojo.experimental("dojox.dtl");

(function(){
	var dd = dojox.dtl;

	dd.TOKEN_BLOCK = -1;
	dd.TOKEN_VAR = -2;
	dd.TOKEN_COMMENT = -3;
	dd.TOKEN_TEXT = 3;

	dd._Context = dojo.extend(function(dict){
		// summary: Pass one of these when rendering a template to tell the template what values to use.
		if(dict){
			dojo._mixin(this, dict);
			if(dict.get){
				// Preserve passed getter and restore prototype get
				this._getter = dict.get;
				delete this.get;
			}
		}
	},
	{
		push: function(){
			var last = this;
			var context = dojo.delegate(this);
			context.pop = function(){ return last; }
			return context;
		},
		pop: function(){
			throw new Error("pop() called on empty Context");
		},
		get: function(key, otherwise){
			var n = this._normalize;

			if(this._getter){
				var got = this._getter(key);
				if(typeof got != "undefined"){
					return n(got);
				}
			}

			if(typeof this[key] != "undefined"){
				return n(this[key]);
			}

			return otherwise;
		},
		_normalize: function(value){
			if(value instanceof Date){
				value.year = value.getFullYear();
				value.month = value.getMonth() + 1;
				value.day = value.getDate();
				value.date = value.year + "-" + ("0" + value.month).slice(-2) + "-" + ("0" + value.day).slice(-2);
				value.hour = value.getHours();
				value.minute = value.getMinutes();
				value.second = value.getSeconds();
				value.microsecond = value.getMilliseconds();
			}
			return value;
		},
		update: function(dict){
			var context = this.push();
			if(dict){
				dojo._mixin(this, dict);
			}
			return context;
		}
	});

	var smart_split_re = /("(?:[^"\\]*(?:\\.[^"\\]*)*)"|'(?:[^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+)/g;
	var split_re = /\s+/g;
	var split = function(/*String|RegExp?*/ splitter, /*Integer?*/ limit){
		splitter = splitter || split_re;
		if(!(splitter instanceof RegExp)){
			splitter = new RegExp(splitter, "g");
		}
		if(!splitter.global){
			throw new Error("You must use a globally flagged RegExp with split " + splitter);
		}
		splitter.exec(""); // Reset the global

		var part, parts = [], lastIndex = 0, i = 0;
		while(part = splitter.exec(this)){
			parts.push(this.slice(lastIndex, splitter.lastIndex - part[0].length));
			lastIndex = splitter.lastIndex;
			if(limit && (++i > limit - 1)){
				break;
			}
		}
		parts.push(this.slice(lastIndex));
		return parts;
	}

	dd.Token = function(token_type, contents){
		this.token_type = token_type;
		this.contents = new String(dojo.trim(contents));
		this.contents.split = split;
		this.split = function(){
			return String.prototype.split.apply(this.contents, arguments);
		}
	}
	dd.Token.prototype.split_contents = function(/*Integer?*/ limit){
		var bit, bits = [], i = 0;
		limit = limit || 999;
		while(i++ < limit && (bit = smart_split_re.exec(this.contents))){
			bit = bit[0];
			if(bit.charAt(0) == '"' && bit.slice(-1) == '"'){
				bits.push('"' + bit.slice(1, -1).replace('\\"', '"').replace('\\\\', '\\') + '"');
			}else if(bit.charAt(0) == "'" && bit.slice(-1) == "'"){
				bits.push("'" + bit.slice(1, -1).replace("\\'", "'").replace('\\\\', '\\') + "'");
			}else{
				bits.push(bit);
			}
		}
		return bits;
	}

	var ddt = dd.text = {
		_get: function(module, name, errorless){
			// summary: Used to find both tags and filters
			var params = dd.register.get(module, name.toLowerCase(), errorless);
			if(!params){
				if(!errorless){
					throw new Error("No tag found for " + name);
				}
				return null;
			}

			var fn = params[1];
			var require = params[2];

			var parts;
			if(fn.indexOf(":") != -1){
				parts = fn.split(":");
				fn = parts.pop();
			}

			dojo["require"](require);

			var parent = dojo.getObject(require);

			return parent[fn || name] || parent[name + "_"] || parent[fn + "_"];
		},
		getTag: function(name, errorless){
			return ddt._get("tag", name, errorless);
		},
		getFilter: function(name, errorless){
			return ddt._get("filter", name, errorless);
		},
		getTemplate: function(file){
			return new dd.Template(ddt.getTemplateString(file));
		},
		getTemplateString: function(file){
			return dojo._getText(file.toString()) || "";
		},
		_resolveLazy: function(location, sync, json){
			if(sync){
				if(json){
					return dojo.fromJson(dojo._getText(location)) || {};
				}else{
					return dd.text.getTemplateString(location);
				}
			}else{
				return dojo.xhrGet({
					handleAs: (json) ? "json" : "text",
					url: location
				});
			}
		},
		_resolveTemplateArg: function(arg, sync){
			if(ddt._isTemplate(arg)){
				if(!sync){
					var d = new dojo.Deferred();
					d.callback(arg);
					return d;
				}
				return arg;
			}
			return ddt._resolveLazy(arg, sync);
		},
		_isTemplate: function(arg){
			return (typeof arg == "undefined") || (typeof arg == "string" && (arg.match(/^\s*[<{]/) || arg.indexOf(" ") != -1));
		},
		_resolveContextArg: function(arg, sync){
			if(arg.constructor == Object){
				if(!sync){
					var d = new dojo.Deferred;
					d.callback(arg);
					return d;
				}
				return arg;
			}
			return ddt._resolveLazy(arg, sync, true);
		},
		_re: /(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(load\s*)?(.+?)\s*%\})/g,
		tokenize: function(str){
			return dojox.string.tokenize(str, ddt._re, ddt._parseDelims);
		},
		_parseDelims: function(varr, load, tag){
			if(varr){
				return [dd.TOKEN_VAR, varr];
			}else if(load){
				var parts = dojo.trim(tag).split(/\s+/g);
				for(var i = 0, part; part = parts[i]; i++){
					dojo["require"](part);
				}
			}else{
				return [dd.TOKEN_BLOCK, tag];
			}
		}
	}

	dd.Template = dojo.extend(function(/*String|dojo._Url*/ template, /*Boolean*/ isString){
		// template:
		//		The string or location of the string to
		//		use as a template
		var str = isString ? template : ddt._resolveTemplateArg(template, true) || "";
		var tokens = ddt.tokenize(str);
		var parser = new dd._Parser(tokens);
		this.nodelist = parser.parse();
	},
	{
		update: function(node, context){
			// node: DOMNode|String|dojo.NodeList
			//		A node reference or set of nodes
			// context: dojo._Url|String|Object
			//		The context object or location
			return ddt._resolveContextArg(context).addCallback(this, function(contextObject){
				var content = this.render(new dd._Context(contextObject));
				if(node.forEach){
					node.forEach(function(item){
						item.innerHTML = content;
					});
				}else{
					dojo.byId(node).innerHTML = content;
				}
				return this;
			});
		},
		render: function(context, /*concatenatable?*/ buffer){
			buffer = buffer || this.getBuffer();
			context = context || new dd._Context({});
			return this.nodelist.render(context, buffer) + "";
		},
		getBuffer: function(){
			
			return new dojox.string.Builder();
		}
	});

	var qfRe = /\{\{\s*(.+?)\s*\}\}/g;
	dd.quickFilter = function(str){
		if(!str){
			return new dd._NodeList();
		}

		if(str.indexOf("{%") == -1){
			return new dd._QuickNodeList(dojox.string.tokenize(str, qfRe, function(token){
				return new dd._Filter(token);
			}));
		}
	}

	dd._QuickNodeList = dojo.extend(function(contents){
		this.contents = contents;
	},
	{
		render: function(context, buffer){
			for(var i=0, l=this.contents.length; i<l; i++){
				if(this.contents[i].resolve){
					buffer = buffer.concat(this.contents[i].resolve(context));
				}else{
					buffer = buffer.concat(this.contents[i]);
				}
			}
			return buffer;
		},
		dummyRender: function(context){ return this.render(context, dd.Template.prototype.getBuffer()).toString(); },
		clone: function(buffer){ return this; }
	});

	dd._Filter = dojo.extend(function(token){
		// summary: Uses a string to find (and manipulate) a variable
		if(!token) throw new Error("Filter must be called with variable name");
		this.contents = token;

		var cache = this._cache[token];
		if(cache){
			this.key = cache[0];
			this.filters = cache[1];
		}else{
			this.filters = [];
			dojox.string.tokenize(token, this._re, this._tokenize, this);
			this._cache[token] = [this.key, this.filters];
		}
	},
	{
		_cache: {},
		_re: /(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,
		_values: {
			0: '"', // _("text")
			1: '"', // "text"
			2: "", // variable
			8: '"' // 'text'
		},
		_args: {
			4: '"', // :_("text")
			5: '"', // :"text"
			6: "", // :variable
			7: "'"// :'text'
		},
		_tokenize: function(){
			var pos, arg;

			for(var i = 0, has = []; i < arguments.length; i++){
				has[i] = (typeof arguments[i] != "undefined" && typeof arguments[i] == "string" && arguments[i]);
			}

			if(!this.key){
				for(pos in this._values){
					if(has[pos]){
						this.key = this._values[pos] + arguments[pos] + this._values[pos];
						break;
					}
				}
			}else{
				for(pos in this._args){
					if(has[pos]){
						var value = arguments[pos];
						if(this._args[pos] == "'"){
							value = value.replace(/\\'/g, "'");
						}else if(this._args[pos] == '"'){
							value = value.replace(/\\"/g, '"');
						}
						arg = [!this._args[pos], value];
						break;
					}
				}
				// Get a named filter
				var fn = ddt.getFilter(arguments[3]);
				if(!dojo.isFunction(fn)) throw new Error(arguments[3] + " is not registered as a filter");
				this.filters.push([fn, arg]);
			}
		},
		getExpression: function(){
			return this.contents;
		},
		resolve: function(context){
			if(typeof this.key == "undefined"){
				return "";
			}

			var str = this.resolvePath(this.key, context);

			for(var i = 0, filter; filter = this.filters[i]; i++){
				// Each filter has the function in [0], a boolean in [1][0] of whether it's a variable or a string
				// and [1][1] is either the variable name of the string content.
				if(filter[1]){
					if(filter[1][0]){
						str = filter[0](str, this.resolvePath(filter[1][1], context));
					}else{
						str = filter[0](str, filter[1][1]);
					}
				}else{
					str = filter[0](str);
				}
			}

			return str;
		},
		resolvePath: function(path, context){
			var current, parts;
			var first = path.charAt(0);
			var last = path.slice(-1);
			if(!isNaN(parseInt(first))){
				current = (path.indexOf(".") == -1) ? parseInt(path) : parseFloat(path);
			}else if(first == '"' && first == last){
				current = path.slice(1, -1);
			}else{
				if(path == "true"){ return true; }
				if(path == "false"){ return false; }
				if(path == "null" || path == "None"){ return null; }
				parts = path.split(".");
				current = context.get(parts[0]);

				if(dojo.isFunction(current)){
					var self = context.getThis && context.getThis();
					if(current.alters_data){
						current = "";
					}else if(self){
						current = current.call(self);
					}else{
						current = "";
					}
				}

				for(var i = 1; i < parts.length; i++){
					var part = parts[i];
					if(current){
						var base = current;
						if(dojo.isObject(current) && part == "items" && typeof current[part] == "undefined"){
							var items = [];
							for(var key in current){
								items.push([key, current[key]]);
							}
							current = items;
							continue;
						}

						if(current.get && dojo.isFunction(current.get) && current.get.safe){
							current = current.get(part);
						}else if(typeof current[part] == "undefined"){
							current = current[part];
							break;
						}else{
							current = current[part];
						}

						if(dojo.isFunction(current)){
							if(current.alters_data){
								current = "";
							}else{
								current = current.call(base);
							}
						}else if(current instanceof Date){
							current = dd._Context.prototype._normalize(current);
						}
					}else{
						return "";
					}
				}
			}
			return current;
		}
	});

	dd._TextNode = dd._Node = dojo.extend(function(/*Object*/ obj){
		// summary: Basic catch-all node
		this.contents = obj;
	},
	{
		set: function(data){
			this.contents = data;
			return this;
		},
		render: function(context, buffer){
			// summary: Adds content onto the buffer
			return buffer.concat(this.contents);
		},
		isEmpty: function(){
			return !dojo.trim(this.contents);
		},
		clone: function(){ return this; }
	});

	dd._NodeList = dojo.extend(function(/*Node[]*/ nodes){
		// summary: Allows us to render a group of nodes
		this.contents = nodes || [];
		this.last = "";
	},
	{
		push: function(node){
			// summary: Add a new node to the list
			this.contents.push(node);
			return this;
		},
		concat: function(nodes){
			this.contents = this.contents.concat(nodes);
			return this;
		},
		render: function(context, buffer){
			// summary: Adds all content onto the buffer
			for(var i = 0; i < this.contents.length; i++){
				buffer = this.contents[i].render(context, buffer);
				if(!buffer) throw new Error("Template must return buffer");
			}
			return buffer;
		},
		dummyRender: function(context){
			return this.render(context, dd.Template.prototype.getBuffer()).toString();
		},
		unrender: function(){ return arguments[1]; },
		clone: function(){ return this; },
		rtrim: function(){
			while(1){
				i = this.contents.length - 1;
				if(this.contents[i] instanceof dd._TextNode && this.contents[i].isEmpty()){
					this.contents.pop();
				}else{
					break;
				}
			}

			return this;
		}
	});

	dd._VarNode = dojo.extend(function(str){
		// summary: A node to be processed as a variable
		this.contents = new dd._Filter(str);
	},
	{
		render: function(context, buffer){
			var str = this.contents.resolve(context);
			if(!str.safe){
				str = dd._base.escape("" + str);
			}
			return buffer.concat(str);
		}
	});

	dd._noOpNode = new function(){
		// summary: Adds a no-op node. Useful in custom tags
		this.render = this.unrender = function(){ return arguments[1]; }
		this.clone = function(){ return this; }
	}

	dd._Parser = dojo.extend(function(tokens){
		// summary: Parser used during initialization and for tag groups.
		this.contents = tokens;
	},
	{
		i: 0,
		parse: function(/*Array?*/ stop_at){
			// summary: Turns tokens into nodes
			// description: Steps into tags are they're found. Blocks use the parse object
			//		to find their closing tag (the stop_at array). stop_at is inclusive, it
			//		returns the node that matched.
			var terminators = {}, token;
			stop_at = stop_at || [];
			for(var i = 0; i < stop_at.length; i++){
				terminators[stop_at[i]] = true;
			}

			var nodelist = new dd._NodeList();
			while(this.i < this.contents.length){
				token = this.contents[this.i++];
				if(typeof token == "string"){
					nodelist.push(new dd._TextNode(token));
				}else{
					var type = token[0];
					var text = token[1];
					if(type == dd.TOKEN_VAR){
						nodelist.push(new dd._VarNode(text));
					}else if(type == dd.TOKEN_BLOCK){
						if(terminators[text]){
							--this.i;
							return nodelist;
						}
						var cmd = text.split(/\s+/g);
						if(cmd.length){
							cmd = cmd[0];
							var fn = ddt.getTag(cmd);
							if(fn){
								nodelist.push(fn(this, new dd.Token(type, text)));
							}
						}
					}
				}
			}

			if(stop_at.length){
				throw new Error("Could not find closing tag(s): " + stop_at.toString());
			}

			this.contents.length = 0;
			return nodelist;
		},
		next_token: function(){
			// summary: Returns the next token in the list.
			var token = this.contents[this.i++];
			return new dd.Token(token[0], token[1]);
		},
		delete_first_token: function(){
			this.i++;
		},
		skip_past: function(endtag){
			while(this.i < this.contents.length){
				var token = this.contents[this.i++];
				if(token[0] == dd.TOKEN_BLOCK && token[1] == endtag){
					return;
				}
			}
			throw new Error("Unclosed tag found when looking for " + endtag);
		},
		create_variable_node: function(expr){
			return new dd._VarNode(expr);
		},
		create_text_node: function(expr){
			return new dd._TextNode(expr || "");
		},
		getTemplate: function(file){
			return new dd.Template(file);
		}
	});

	dd.register = {
		_registry: {
			attributes: [],
			tags: [],
			filters: []
		},
		get: function(/*String*/ module, /*String*/ name){
			var registry = dd.register._registry[module + "s"];
			for(var i = 0, entry; entry = registry[i]; i++){
				if(typeof entry[0] == "string"){
					if(entry[0] == name){
						return entry;
					}
				}else if(name.match(entry[0])){
					return entry;
				}
			}
		},
		getAttributeTags: function(){
			var tags = [];
			var registry = dd.register._registry.attributes;
			for(var i = 0, entry; entry = registry[i]; i++){
				if(entry.length == 3){
					tags.push(entry);
				}else{
					var fn = dojo.getObject(entry[1]);
					if(fn && dojo.isFunction(fn)){
						entry.push(fn);
						tags.push(entry);
					}
				}
			}
			return tags;
		},
		_any: function(type, base, locations){
			for(var path in locations){
				for(var i = 0, fn; fn = locations[path][i]; i++){
					var key = fn;
					if(dojo.isArray(fn)){
						key = fn[0];
						fn = fn[1];
					}
					if(typeof key == "string"){
						if(key.substr(0, 5) == "attr:"){
							var attr = fn;
							if(attr.substr(0, 5) == "attr:"){
								attr = attr.slice(5);
							}
							dd.register._registry.attributes.push([attr.toLowerCase(), base + "." + path + "." + attr]);
						}
						key = key.toLowerCase()
					}
					dd.register._registry[type].push([
						key,
						fn,
						base + "." + path
					]);
				}
			}
		},
		tags: function(/*String*/ base, /*Object*/ locations){
			dd.register._any("tags", base, locations);
		},
		filters: function(/*String*/ base, /*Object*/ locations){
			dd.register._any("filters", base, locations);
		}
	}

	var escapeamp = /&/g;
	var escapelt = /</g;
	var escapegt = />/g;
	var escapeqt = /'/g;
	var escapedblqt = /"/g;
	dd._base.escape = function(value){
		// summary: Escapes a string's HTML
		return dd.mark_safe(value.replace(escapeamp, '&amp;').replace(escapelt, '&lt;').replace(escapegt, '&gt;').replace(escapedblqt, '&quot;').replace(escapeqt, '&#39;'));
	}

	dd._base.safe = function(value){
		if(typeof value == "string"){
			value = new String(value);
		}
		if(typeof value == "object"){
			value.safe = true;
		}
		return value;
	}
	dd.mark_safe = dd._base.safe;

	dd.register.tags("dojox.dtl.tag", {
		"date": ["now"],
		"logic": ["if", "for", "ifequal", "ifnotequal"],
		"loader": ["extends", "block", "include", "load", "ssi"],
		"misc": ["comment", "debug", "filter", "firstof", "spaceless", "templatetag", "widthratio", "with"],
		"loop": ["cycle", "ifchanged", "regroup"]
	});
	dd.register.filters("dojox.dtl.filter", {
		"dates": ["date", "time", "timesince", "timeuntil"],
		"htmlstrings": ["linebreaks", "linebreaksbr", "removetags", "striptags"],
		"integers": ["add", "get_digit"],
		"lists": ["dictsort", "dictsortreversed", "first", "join", "length", "length_is", "random", "slice", "unordered_list"],
		"logic": ["default", "default_if_none", "divisibleby", "yesno"],
		"misc": ["filesizeformat", "pluralize", "phone2numeric", "pprint"],
		"strings": ["addslashes", "capfirst", "center", "cut", "fix_ampersands", "floatformat", "iriencode", "linenumbers", "ljust", "lower", "make_list", "rjust", "slugify", "stringformat", "title", "truncatewords", "truncatewords_html", "upper", "urlencode", "urlize", "urlizetrunc", "wordcount", "wordwrap"]
	});
	dd.register.filters("dojox.dtl", {
		"_base": ["escape", "safe"]
	});
})();

}

if(!dojo._hasResource["dojox.dtl.Context"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.Context"] = true;
dojo.provide("dojox.dtl.Context");


dojox.dtl.Context = dojo.extend(function(dict){
	this._this = {};
	dojox.dtl._Context.call(this, dict);
}, dojox.dtl._Context.prototype,
{
	getKeys: function(){
		var keys = [];
		for(var key in this){
			if(this.hasOwnProperty(key) && key != "_this"){
				keys.push(key);
			}
		}
		return keys;
	},
	extend: function(/*dojox.dtl.Context|Object*/ obj){
		// summary: Returns a clone of this context object, with the items from the
		//		passed objecct mixed in.
		return  dojo.delegate(this, obj);
	},
	filter: function(/*dojox.dtl.Context|Object|String...*/ filter){
		// summary: Returns a clone of this context, only containing the items
		//		defined in the filter.
		var context = new dojox.dtl.Context();
		var keys = [];
		var i, arg;
		if(filter instanceof dojox.dtl.Context){
			keys = filter.getKeys();
		}else if(typeof filter == "object"){
			for(var key in filter){
				keys.push(key);
			}
		}else{
			for(i = 0; arg = arguments[i]; i++){
				if(typeof arg == "string"){
					keys.push(arg);
				}
			}
		}

		for(i = 0, key; key = keys[i]; i++){
			context[key] = this[key];
		}

		return context;
	},
	setThis: function(/*Object*/ _this){
		this._this = _this;
	},
	getThis: function(){
		return this._this;
	},
	hasKey: function(key){
		if(this._getter){
			var got = this._getter(key);
			if(typeof got != "undefined"){
				return true;
			}
		}

		if(typeof this[key] != "undefined"){
			return true;
		}

		return false;
	}
});

}

if(!dojo._hasResource["dojox.dtl.dom"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.dom"] = true;
dojo.provide("dojox.dtl.dom");




(function(){
	var dd = dojox.dtl;

	dd.BOOLS = {checked: 1, disabled: 1, readonly: 1};
	dd.TOKEN_CHANGE = -11;
	dd.TOKEN_ATTR = -12;
	dd.TOKEN_CUSTOM = -13;
	dd.TOKEN_NODE = 1;

	var ddt = dd.text;
	var ddh = dd.dom = {
		_attributes: {},
		_uppers: {},
		_re4: /^function anonymous\(\)\s*{\s*(.*)\s*}$/,
		_reTrim: /(?:^[\n\s]*(\{%)?\s*|\s*(%\})?[\n\s]*$)/g,
		_reSplit: /\s*%\}[\n\s]*\{%\s*/g,
		getTemplate: function(text){
			if(typeof this._commentable == "undefined"){
				// Check to see if the browser can handle comments
				this._commentable = false;
				var div = document.createElement("div");
				div.innerHTML = "<!--Test comment handling, and long comments, using comments whenever possible.-->";
				if(div.childNodes.length && div.childNodes[0].nodeType == 8 && div.childNodes[0].data == "comment"){
					this._commentable = true;
				}
			}

			if(!this._commentable){
				// Strip comments
				text = text.replace(/<!--({({|%).*?(%|})})-->/g, "$1");
			}

			if(dojo.isIE){
				text = text.replace(/\b(checked|disabled|readonly|style)="/g, 't$1="');
			}
			text = text.replace(/\bstyle="/g, 'tstyle="');

			var match;
			var table = dojo.isWebKit;
			var pairs = [ // Format: [enable, parent, allowed children (first for nesting), nestings]
				[true, "select", "option"],
				[table, "tr", "td|th"],
				[table, "thead", "tr", "th"],
				[table, "tbody", "tr", "td"],
				[table, "table", "tbody|thead|tr", "tr", "td"]
			];
			var replacements = [];
			// Some tags can't contain text. So we wrap the text in tags that they can have.
			for(var i = 0, pair; pair = pairs[i]; i++){
				if(!pair[0]){
					continue;
				}
				if(text.indexOf("<" + pair[1]) != -1){
					var selectRe = new RegExp("<" + pair[1] + "(?:.|\n)*?>((?:.|\n)+?)</" + pair[1] + ">", "ig");
					tagLoop: while(match = selectRe.exec(text)){
						// Do it like this to make sure we don't double-wrap
						var inners = pair[2].split("|");
						var innerRe = [];
						for(var j = 0, inner; inner = inners[j]; j++){
							innerRe.push("<" + inner + "(?:.|\n)*?>(?:.|\n)*?</" + inner + ">");
						}
						var tags = [];
						var tokens = dojox.string.tokenize(match[1], new RegExp("(" + innerRe.join("|") + ")", "ig"), function(data){
							var tag = /<(\w+)/.exec(data)[1];
							if(!tags[tag]){
								tags[tag] = true;
								tags.push(tag);
							}
							return {data: data};
						});
						if(tags.length){
							var tag = (tags.length == 1) ? tags[0] : pair[2].split("|")[0];

							var replace = [];
							for(var j = 0, jl = tokens.length; j < jl; j++) {
								var token = tokens[j];
								if(dojo.isObject(token)){
									replace.push(token.data);
								}else{
									var stripped = token.replace(this._reTrim, "");
									if(!stripped){ continue; }
									token = stripped.split(this._reSplit);
									for(var k = 0, kl = token.length; k < kl; k++){
										var replacement = "";
										for(var p = 2, pl = pair.length; p < pl; p++){
											if(p == 2){
												replacement += "<" + tag + ' dtlinstruction="{% ' + token[k].replace('"', '\\"') + ' %}">';
											}else if(tag == pair[p]) {
												continue;
											}else{
												replacement += "<" + pair[p] + ">";
											}
										}
										replacement += "DTL";
										for(var p = pair.length - 1; p > 1; p--){
											if(p == 2){
												replacement += "</" + tag + ">";
											}else if(tag == pair[p]) {
												continue;
											}else{
												replacement += "</" + pair[p] + ">";
											}
										}
										replace.push("\xFF" + replacements.length);
										replacements.push(replacement);
									}
								}
							}
							text = text.replace(match[1], replace.join(""));
						}
					}
				}
			}

			for(var i=replacements.length; i--;){
				text = text.replace("\xFF" + i, replacements[i]);
			}

			var re = /\b([a-zA-Z_:][a-zA-Z0-9_\-\.:]*)=['"]/g;
			while(match = re.exec(text)){
				var lower = match[1].toLowerCase();
				if(lower == "dtlinstruction"){ continue; }
				if(lower != match[1]){
					this._uppers[lower] = match[1];
				}
				this._attributes[lower] = true;
			}
			var div = document.createElement("div");
			div.innerHTML = text;
			var output = {nodes: []};
			while(div.childNodes.length){
				output.nodes.push(div.removeChild(div.childNodes[0]))
			}

			return output;
		},
		tokenize: function(/*Node*/ nodes){
			var tokens = [];

			for(var i = 0, node; node = nodes[i++];){
				if(node.nodeType != 1){
					this.__tokenize(node, tokens);
				}else{
					this._tokenize(node, tokens);
				}
			}

			return tokens;
		},
		_swallowed: [],
		_tokenize: function(/*Node*/ node, /*Array*/ tokens){
			var first = false;
			var swallowed = this._swallowed;
			var i, j, tag, child;

			if(!tokens.first){
				// Try to efficiently associate tags that use an attribute to
				// remove the node from DOM (eg dojoType) so that we can efficiently
				// locate them later in the tokenizing.
				first = tokens.first = true;
				var tags = dd.register.getAttributeTags();
				for(i = 0; tag = tags[i]; i++){
					try{
						(tag[2])({ swallowNode: function(){ throw 1; }}, new dd.Token(dd.TOKEN_ATTR, ""));
					}catch(e){
						swallowed.push(tag);
					}
				}
			}

			for(i = 0; tag = swallowed[i]; i++){
				var text = node.getAttribute(tag[0]);
				if(text){
					var swallowed = false;
					var custom = (tag[2])({ swallowNode: function(){ swallowed = true; return node; }}, new dd.Token(dd.TOKEN_ATTR, tag[0] + " " + text));
					if(swallowed){
						if(node.parentNode && node.parentNode.removeChild){
							node.parentNode.removeChild(node);
						}
						tokens.push([dd.TOKEN_CUSTOM, custom]);
						return;
					}
				}
			}

			var children = [];
			if(dojo.isIE && node.tagName == "SCRIPT"){
				children.push({
					nodeType: 3,
					data: node.text
				});
				node.text = "";
			}else{
				for(i = 0; child = node.childNodes[i]; i++){
					children.push(child);
				}
			}

			tokens.push([dd.TOKEN_NODE, node]);

			var change = false;
			if(children.length){
				// Only do a change request if we need to
				tokens.push([dd.TOKEN_CHANGE, node]);
				change = true;
			}

			for(var key in this._attributes){
				var clear = false;

				var value = "";
				if(key == "class"){
					value = node.className || value;
				}else if(key == "for"){
					value = node.htmlFor || value;
				}else if(key == "value" && node.value == node.innerHTML){
					// Sometimes .value is set the same as the contents of the item (button)
					continue;
				}else if(node.getAttribute){
					value = node.getAttribute(key, 2) || value;
					if(key == "href" || key == "src"){
						if(dojo.isIE){
							var hash = location.href.lastIndexOf(location.hash);
							var href = location.href.substring(0, hash).split("/");
							href.pop();
							href = href.join("/") + "/";
							if(value.indexOf(href) == 0){
								value = value.replace(href, "");
							}
							value = decodeURIComponent(value);
						}
					}else if(key == "tstyle"){
						clear = key; // Placeholder because we can't use style
						key = "style";
					}else if(dd.BOOLS[key.slice(1)] && dojo.trim(value)){
						key = key.slice(1);
					}else if(this._uppers[key] && dojo.trim(value)){
						clear = this._uppers[key]; // Replaced by lowercase
					}
				}

				if(clear){
					// Clear out values that are different than will
					// be used in plugins
					node.setAttribute(clear, "");
					node.removeAttribute(clear);
				}

				if(typeof value == "function"){
					value = value.toString().replace(this._re4, "$1");
				}

				if(!change){
					// Only do a change request if we need to
					tokens.push([dd.TOKEN_CHANGE, node]);
					change = true;
				}

				// We'll have to resolve attributes during parsing (some ref plugins)

				tokens.push([dd.TOKEN_ATTR, node, key, value]);
			}

			for(i = 0, child; child = children[i]; i++){
				if(child.nodeType == 1){
					var instruction = child.getAttribute("dtlinstruction");
					if(instruction){
						child.parentNode.removeChild(child);
						child = {
							nodeType: 8,
							data: instruction
						};
					}
				}
				this.__tokenize(child, tokens);
			}

			if(!first && node.parentNode && node.parentNode.tagName){
				if(change){
					tokens.push([dd.TOKEN_CHANGE, node, true]);
				}
				tokens.push([dd.TOKEN_CHANGE, node.parentNode]);
				node.parentNode.removeChild(node);
			}else{
				// If this node is parentless, it's a base node, so we have to "up" change to itself
				// and note that it's a top-level to watch for errors
				tokens.push([dd.TOKEN_CHANGE, node, true, true]);
			}
		},
		__tokenize: function(child, tokens){
			var data = child.data;
			switch(child.nodeType){
				case 1:
					this._tokenize(child, tokens);
					return;
				case 3:
					if(data.match(/[^\s\n]/) && (data.indexOf("{{") != -1 || data.indexOf("{%") != -1)){
						var texts = ddt.tokenize(data);
						for(var j = 0, text; text = texts[j]; j++){
							if(typeof text == "string"){
								tokens.push([dd.TOKEN_TEXT, text]);
							}else{
								tokens.push(text);
							}
						}
					}else{
						tokens.push([child.nodeType, child]);
					}
					if(child.parentNode) child.parentNode.removeChild(child);
					return;
				case 8:
					if(data.indexOf("{%") == 0){
						var text = dojo.trim(data.slice(2, -2));
						if(text.substr(0, 5) == "load "){
							var parts = dojo.trim(text).split(/\s+/g);
							for(var i = 1, part; part = parts[i]; i++){
								dojo["require"](part);
							}
						}
						tokens.push([dd.TOKEN_BLOCK, text]);
					}
					if(data.indexOf("{{") == 0){
						tokens.push([dd.TOKEN_VAR, dojo.trim(data.slice(2, -2))]);
					}
					if(child.parentNode) child.parentNode.removeChild(child);
					return;
			}
		}
	};

	dd.DomTemplate = dojo.extend(function(/*String|DOMNode|dojo._Url*/ obj){
		// summary: Use this object for DOM templating
		if(!obj.nodes){
			var node = dojo.byId(obj);
			if(node && node.nodeType == 1){
				dojo.forEach(["class", "src", "href", "name", "value"], function(item){
					ddh._attributes[item] = true;
				});
				obj = {
					nodes: [node]
				};
			}else{
				if(typeof obj == "object"){
					obj = ddt.getTemplateString(obj);
				}
				obj = ddh.getTemplate(obj);
			}
		}

		var tokens = ddh.tokenize(obj.nodes);
		if(dd.tests){
			this.tokens = tokens.slice(0);
		}

		var parser = new dd._DomParser(tokens);
		this.nodelist = parser.parse();
	},
	{
		_count: 0,
		_re: /\bdojo:([a-zA-Z0-9_]+)\b/g,
		setClass: function(str){
			this.getRootNode().className = str;
		},
		getRootNode: function(){
			return this.buffer.rootNode;
		},
		getBuffer: function(){
			return new dd.DomBuffer();
		},
		render: function(context, buffer){
			buffer = this.buffer = buffer || this.getBuffer();
			this.rootNode = null;
			var output = this.nodelist.render(context || new dd.Context({}), buffer);
			for(var i = 0, node; node = buffer._cache[i]; i++){
				if(node._cache){
					node._cache.length = 0;
				}
			}
			return output;
		},
		unrender: function(context, buffer){
			return this.nodelist.unrender(context, buffer);
		}
	});

	dd.DomBuffer = dojo.extend(function(/*Node*/ parent){
		// summary: Allows the manipulation of DOM
		// description:
		//		Use this to append a child, change the parent, or
		//		change the attribute of the current node.
		this._parent = parent;
		this._cache = [];
	},
	{
		concat: function(/*DOMNode*/ node){
			var parent = this._parent;
			if(parent && node.parentNode && node.parentNode === parent && !parent._dirty){
				return this;
			}

			if(node.nodeType == 1 && !this.rootNode){
				this.rootNode = node || true;
				return this;
			}

			if(!parent){
				if(node.nodeType == 3 && dojo.trim(node.data)){
					throw new Error("Text should not exist outside of the root node in template");
				}
				return this;
			}
			if(this._closed){
				if(node.nodeType == 3 && !dojo.trim(node.data)){
					return this;
				}else{
					throw new Error("Content should not exist outside of the root node in template");
				}
			}
			if(parent._dirty){
				if(node._drawn && node.parentNode == parent){
					var caches = parent._cache;
					if(caches){
						for(var i = 0, cache; cache = caches[i]; i++){
							this.onAddNode && this.onAddNode(cache);
							parent.insertBefore(cache, node);
							this.onAddNodeComplete && this.onAddNodeComplete(cache);
						}
						caches.length = 0;
					}
				}
				parent._dirty = false;
			}
			if(!parent._cache){
				parent._cache = [];
				this._cache.push(parent);
			}
			parent._dirty = true;
			parent._cache.push(node);
			return this;
		},
		remove: function(obj){
			if(typeof obj == "string"){
				if(this._parent){
					this._parent.removeAttribute(obj);
				}
			}else{
				if(obj.nodeType == 1 && !this.getRootNode() && !this._removed){
					this._removed = true;
					return this;
				}
				if(obj.parentNode){
					this.onRemoveNode && this.onRemoveNode(obj);
					if(obj.parentNode){
						obj.parentNode.removeChild(obj);
					}
				}
			}
			return this;
		},
		setAttribute: function(key, value){
			var old = dojo.attr(this._parent, key);
			if(this.onChangeAttribute && old != value){
				this.onChangeAttribute(this._parent, key, old, value);
			}
			if(key == "style"){
				//console.log(value);
				this._parent.style.cssText = value;
			}else{
				dojo.attr(this._parent, key, value);
				//console.log(this._parent, key, value);
			}
			return this;
		},
		addEvent: function(context, type, fn, /*Array|Function*/ args){
			if(!context.getThis()){ throw new Error("You must use Context.setObject(instance)"); }
			this.onAddEvent && this.onAddEvent(this.getParent(), type, fn);
			var resolved = fn;
			if(dojo.isArray(args)){
				resolved = function(e){
					this[fn].apply(this, [e].concat(args));
				}
			}
			return dojo.connect(this.getParent(), type, context.getThis(), resolved);
		},
		setParent: function(node, /*Boolean?*/ up, /*Boolean?*/ root){
			if(!this._parent) this._parent = this._first = node;

			if(up && root && node === this._first){
				this._closed = true;
			}

			if(up){
				var parent = this._parent;
				var script = "";
				var ie = dojo.isIE && parent.tagName == "SCRIPT";
				if(ie){
					parent.text = "";
				}
				if(parent._dirty){
					var caches = parent._cache;
					var select = (parent.tagName == "SELECT" && !parent.options.length);
					for(var i = 0, cache; cache = caches[i]; i++){
						if(cache !== parent){
							this.onAddNode && this.onAddNode(cache);
							if(ie){
								script += cache.data;
							}else{
								parent.appendChild(cache);
								if(select && cache.defaultSelected && i){
									select = i;
								}
							}
							this.onAddNodeComplete && this.onAddNodeComplete(cache);
						}
					}
					if(select){
						parent.options.selectedIndex = (typeof select == "number") ? select : 0;
					}
					caches.length = 0;
					parent._dirty = false;
				}
				if(ie){
					parent.text = script;
				}
			}

			this._parent = node;
			this.onSetParent && this.onSetParent(node, up, root);
			return this;
		},
		getParent: function(){
			return this._parent;
		},
		getRootNode: function(){
			return this.rootNode;
		}
		/*=====
		,
		onSetParent: function(node, up){
			// summary: Stub called when setParent is used.
		},
		onAddNode: function(node){
			// summary: Stub called before new nodes are added
		},
		onAddNodeComplete: function(node){
			// summary: Stub called after new nodes are added
		},
		onRemoveNode: function(node){
			// summary: Stub called when nodes are removed
		},
		onChangeAttribute: function(node, attribute, old, updated){
			// summary: Stub called when an attribute is changed
		},
		onChangeData: function(node, old, updated){
			// summary: Stub called when a data in a node is changed
		},
		onClone: function(from, to){
			// summary: Stub called when a node is duplicated
			// from: DOMNode
			// to: DOMNode
		},
		onAddEvent: function(node, type, description){
			// summary: Stub to call when you're adding an event
			// node: DOMNode
			// type: String
			// description: String
		}
		=====*/
	});

	dd._DomNode = dojo.extend(function(node){
		// summary: Places a node into DOM
		this.contents = node;
	},
	{
		render: function(context, buffer){
			this._rendered = true;
			return buffer.concat(this.contents);
		},
		unrender: function(context, buffer){
			if(!this._rendered){
				return buffer;
			}
			this._rendered = false;
			return buffer.remove(this.contents);
		},
		clone: function(buffer){
			return new this.constructor(this.contents);
		}
	});

	dd._DomNodeList = dojo.extend(function(/*Node[]*/ nodes){
		// summary: A list of any DOM-specific node objects
		// description:
		//		Any object that's used in the constructor or added
		//		through the push function much implement the
		//		render, unrender, and clone functions.
		this.contents = nodes || [];
	},
	{
		push: function(node){
			this.contents.push(node);
		},
		unshift: function(node){
			this.contents.unshift(node);
		},
		render: function(context, buffer, /*Node*/ instance){
			buffer = buffer || dd.DomTemplate.prototype.getBuffer();

			if(instance){
				var parent = buffer.getParent();
			}
			for(var i = 0; i < this.contents.length; i++){
				buffer = this.contents[i].render(context, buffer);
				if(!buffer) throw new Error("Template node render functions must return their buffer");
			}
			if(parent){
				buffer.setParent(parent);
			}
			return buffer;
		},
		dummyRender: function(context, buffer, asNode){
			// summary: A really expensive way of checking to see how a rendering will look.
			//		Used in the ifchanged tag
			var div = document.createElement("div");

			var parent = buffer.getParent();
			var old = parent._clone;
			// Tell the clone system to attach itself to our new div
			parent._clone = div;
			var nodelist = this.clone(buffer, div);
			if(old){
				// Restore state if there was a previous clone
				parent._clone = old;
			}else{
				// Remove if there was no clone
				parent._clone = null;
			}

			buffer = dd.DomTemplate.prototype.getBuffer();
			nodelist.unshift(new dd.ChangeNode(div));
			nodelist.unshift(new dd._DomNode(div));
			nodelist.push(new dd.ChangeNode(div, true));
			nodelist.render(context, buffer);

			if(asNode){
				return buffer.getRootNode();
			}

			var html = div.innerHTML;
			return (dojo.isIE) ? html.replace(/\s*_(dirty|clone)="[^"]*"/g, "") : html;
		},
		unrender: function(context, buffer, instance){
			if(instance){
				var parent = buffer.getParent();
			}
			for(var i = 0; i < this.contents.length; i++){
				buffer = this.contents[i].unrender(context, buffer);
				if(!buffer) throw new Error("Template node render functions must return their buffer");
			}
			if(parent){
				buffer.setParent(parent);
			}
			return buffer;
		},
		clone: function(buffer){
			// summary:
			//		Used to create an identical copy of a NodeList, useful for things like the for tag.
			var parent = buffer.getParent();
			var contents = this.contents;
			var nodelist = new dd._DomNodeList();
			var cloned = [];
			for(var i = 0; i < contents.length; i++){
				var clone = contents[i].clone(buffer);
				if(clone instanceof dd.ChangeNode || clone instanceof dd._DomNode){
					var item = clone.contents._clone;
					if(item){
						clone.contents = item;
					}else if(parent != clone.contents && clone instanceof dd._DomNode){
						var node = clone.contents;
						clone.contents = clone.contents.cloneNode(false);
						buffer.onClone && buffer.onClone(node, clone.contents);
						cloned.push(node);
						node._clone = clone.contents;
					}
				}
				nodelist.push(clone);
			}

			for(var i = 0, clone; clone = cloned[i]; i++){
				clone._clone = null;
			}

			return nodelist;
		},
		rtrim: function(){
			while(1){
				var i = this.contents.length - 1;
				if(this.contents[i] instanceof dd._DomTextNode && this.contents[i].isEmpty()){
					this.contents.pop();
				}else{
					break;
				}
			}

			return this;
		}
	});

	dd._DomVarNode = dojo.extend(function(str){
		// summary: A node to be processed as a variable
		// description:
		//		Will render an object that supports the render function
		// 		and the getRootNode function
		this.contents = new dd._Filter(str);
	},
	{
		render: function(context, buffer){
			var str = this.contents.resolve(context);

			// What type of rendering?
			var type = "text";
			if(str){
				if(str.render && str.getRootNode){
					type = "injection";
				}else if(str.safe){
					if(str.nodeType){
						type = "node";
					}else if(str.toString){
						str = str.toString();
						type = "html";
					}
				}
			}

			// Has the typed changed?
			if(this._type && type != this._type){
				this.unrender(context, buffer);
			}
			this._type = type;

			// Now render
			switch(type){
			case "text":
				this._rendered = true;
				this._txt = this._txt || document.createTextNode(str);
				if(this._txt.data != str){
					var old = this._txt.data;
					this._txt.data = str;
					buffer.onChangeData && buffer.onChangeData(this._txt, old, this._txt.data);
				}
				return buffer.concat(this._txt);
			case "injection":
				var root = str.getRootNode();

				if(this._rendered && root != this._root){
					buffer = this.unrender(context, buffer);
				}
				this._root = root;

				var injected = this._injected = new dd._DomNodeList();
				injected.push(new dd.ChangeNode(buffer.getParent()));
				injected.push(new dd._DomNode(root));
				injected.push(str);
				injected.push(new dd.ChangeNode(buffer.getParent()));
				this._rendered = true;

				return injected.render(context, buffer);
			case "node":
				this._rendered = true;
				if(this._node && this._node != str && this._node.parentNode && this._node.parentNode === buffer.getParent()){
					this._node.parentNode.removeChild(this._node);
				}
				this._node = str;
				return buffer.concat(str);
			case "html":
				if(this._rendered && this._src != str){
					buffer = this.unrender(context, buffer);
				}
				this._src = str;

				// This can get reset in the above tag
				if(!this._rendered){
					this._rendered = true;
					this._html = this._html || [];
					var div = (this._div = this._div || document.createElement("div"));
					div.innerHTML = str;
					var children = div.childNodes;
					while(children.length){
						var removed = div.removeChild(children[0]);
						this._html.push(removed);
						buffer = buffer.concat(removed);
					}
				}

				return buffer;
			default:
				return buffer;
			}
		},
		unrender: function(context, buffer){
			if(!this._rendered){
				return buffer;
			}
			this._rendered = false;

			// Unrender injected nodes
			switch(this._type){
			case "text":
				return buffer.remove(this._txt);
			case "injection":
				return this._injection.unrender(context, buffer);
			case "node":
				if(this._node.parentNode === buffer.getParent()){
					return buffer.remove(this._node);
				}
				return buffer;
			case "html":
				for(var i=0, l=this._html.length; i<l; i++){
					buffer = buffer.remove(this._html[i]);
				}
				return buffer;
			default:
				return buffer;
			}
		},
		clone: function(){
			return new this.constructor(this.contents.getExpression());
		}
	});

	dd.ChangeNode = dojo.extend(function(node, /*Boolean?*/ up, /*Bookean*/ root){
		// summary: Changes the parent during render/unrender
		this.contents = node;
		this.up = up;
		this.root = root;
	},
	{
		render: function(context, buffer){
			return buffer.setParent(this.contents, this.up, this.root);
		},
		unrender: function(context, buffer){
			if(!buffer.getParent()){
				return buffer;
			}
			return buffer.setParent(this.contents);
		},
		clone: function(){
			return new this.constructor(this.contents, this.up, this.root);
		}
	});

	dd.AttributeNode = dojo.extend(function(key, value){
		// summary: Works on attributes
		this.key = key;
		this.value = value;
		this.contents = value;
		if(this._pool[value]){
			this.nodelist = this._pool[value];
		}else{
			if(!(this.nodelist = dd.quickFilter(value))){
				this.nodelist = (new dd.Template(value, true)).nodelist;
			}
			this._pool[value] = this.nodelist;
		}

		this.contents = "";
	},
	{
		_pool: {},
		render: function(context, buffer){
			var key = this.key;
			var value = this.nodelist.dummyRender(context);
			if(dd.BOOLS[key]){
				value = !(value == "false" || value == "undefined" || !value);
			}
			if(value !== this.contents){
				this.contents = value;
				return buffer.setAttribute(key, value);
			}
			return buffer;
		},
		unrender: function(context, buffer){
			this.contents = "";
			return buffer.remove(this.key);
		},
		clone: function(buffer){
			return new this.constructor(this.key, this.value);
		}
	});

	dd._DomTextNode = dojo.extend(function(str){
		// summary: Adds a straight text node without any processing
		this.contents = document.createTextNode(str);
		this.upcoming = str;
	},
	{
		set: function(data){
			this.upcoming = data;
			return this;
		},
		render: function(context, buffer){
			if(this.contents.data != this.upcoming){
				var old = this.contents.data;
				this.contents.data = this.upcoming;
				buffer.onChangeData && buffer.onChangeData(this.contents, old, this.upcoming);
			}
			return buffer.concat(this.contents);
		},
		unrender: function(context, buffer){
			return buffer.remove(this.contents);
		},
		isEmpty: function(){
			return !dojo.trim(this.contents.data);
		},
		clone: function(){
			return new this.constructor(this.contents.data);
		}
	});

	dd._DomParser = dojo.extend(function(tokens){
		// summary: Turn a simple array into a set of objects
		// description:
		//	This is also used by all tags to move through
		//	the list of nodes.
		this.contents = tokens;
	},
	{
		i: 0,
		parse: function(/*Array?*/ stop_at){
			var terminators = {};
			var tokens = this.contents;
			if(!stop_at){
				stop_at = [];
			}
			for(var i = 0; i < stop_at.length; i++){
				terminators[stop_at[i]] = true;
			}
			var nodelist = new dd._DomNodeList();
			while(this.i < tokens.length){
				var token = tokens[this.i++];
				var type = token[0];
				var value = token[1];
				if(type == dd.TOKEN_CUSTOM){
					nodelist.push(value);
				}else if(type == dd.TOKEN_CHANGE){
					var changeNode = new dd.ChangeNode(value, token[2], token[3]);
					value[changeNode.attr] = changeNode;
					nodelist.push(changeNode);
				}else if(type == dd.TOKEN_ATTR){
					var fn = ddt.getTag("attr:" + token[2], true);
					if(fn && token[3]){
						if (token[3].indexOf("{%") != -1 || token[3].indexOf("{{") != -1) {
							value.setAttribute(token[2], "");
						}
						nodelist.push(fn(null, new dd.Token(type, token[2] + " " + token[3])));
					}else if(dojo.isString(token[3])){
						if(token[2] == "style" || token[3].indexOf("{%") != -1 || token[3].indexOf("{{") != -1){
							nodelist.push(new dd.AttributeNode(token[2], token[3]));
						}else if(dojo.trim(token[3])){
							try{
								dojo.attr(value, token[2], token[3]);
							}catch(e){}
						}
					}
				}else if(type == dd.TOKEN_NODE){
					var fn = ddt.getTag("node:" + value.tagName.toLowerCase(), true);
					if(fn){
						// TODO: We need to move this to tokenization so that it's before the
						// 				node and the parser can be passed here instead of null
						nodelist.push(fn(null, new dd.Token(type, value), value.tagName.toLowerCase()));
					}
					nodelist.push(new dd._DomNode(value));
				}else if(type == dd.TOKEN_VAR){
					nodelist.push(new dd._DomVarNode(value));
				}else if(type == dd.TOKEN_TEXT){
					nodelist.push(new dd._DomTextNode(value.data || value));
				}else if(type == dd.TOKEN_BLOCK){
					if(terminators[value]){
						--this.i;
						return nodelist;
					}
					var cmd = value.split(/\s+/g);
					if(cmd.length){
						cmd = cmd[0];
						var fn = ddt.getTag(cmd);
						if(typeof fn != "function"){
							throw new Error("Function not found for " + cmd);
						}
						var tpl = fn(this, new dd.Token(type, value));
						if(tpl){
							nodelist.push(tpl);
						}
					}
				}
			}

			if(stop_at.length){
				throw new Error("Could not find closing tag(s): " + stop_at.toString());
			}

			return nodelist;
		},
		next_token: function(){
			// summary: Returns the next token in the list.
			var token = this.contents[this.i++];
			return new dd.Token(token[0], token[1]);
		},
		delete_first_token: function(){
			this.i++;
		},
		skip_past: function(endtag){
			return dd._Parser.prototype.skip_past.call(this, endtag);
		},
		create_variable_node: function(expr){
			return new dd._DomVarNode(expr);
		},
		create_text_node: function(expr){
			return new dd._DomTextNode(expr || "");
		},
		getTemplate: function(/*String*/ loc){
			return new dd.DomTemplate(ddh.getTemplate(loc));
		}
	});

})();

}

if(!dojo._hasResource["dojox.dtl.render.dom"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.render.dom"] = true;
dojo.provide("dojox.dtl.render.dom");




dojox.dtl.render.dom.Render = function(/*DOMNode?*/ attachPoint, /*dojox.dtl.DomTemplate?*/ tpl){
	this._tpl = tpl;
	this.domNode = dojo.byId(attachPoint);
}
dojo.extend(dojox.dtl.render.dom.Render, {
	setAttachPoint: function(/*Node*/ node){
		this.domNode = node;
	},
	render: function(/*Object*/ context, /*dojox.dtl.DomTemplate?*/ tpl, /*dojox.dtl.DomBuffer?*/ buffer){
		if(!this.domNode){
			throw new Error("You cannot use the Render object without specifying where you want to render it");
		}

		this._tpl = tpl = tpl || this._tpl;
		buffer = buffer || tpl.getBuffer();
		context = context || new dojox.dtl.Context();

		var frag = tpl.render(context, buffer).getParent();
		if(!frag){
			throw new Error("Rendered template does not have a root node");
		}

		if(this.domNode !== frag){
			this.domNode.parentNode.replaceChild(frag, this.domNode);
			this.domNode = frag;
		}
	}
});

}

if(!dojo._hasResource["dojox.dtl.contrib.dijit"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.contrib.dijit"] = true;
dojo.provide("dojox.dtl.contrib.dijit");




(function(){
	var dd = dojox.dtl;
	var ddcd = dd.contrib.dijit;

	ddcd.AttachNode = dojo.extend(function(keys, object){
		this._keys = keys;
		this._object = object;
	},
	{
		render: function(context, buffer){
			if(!this._rendered){
				this._rendered = true;
				for(var i=0, key; key = this._keys[i]; i++){
					context.getThis()[key] = this._object || buffer.getParent();
				}
			}
			return buffer;
		},
		unrender: function(context, buffer){
			if(this._rendered){
				this._rendered = false;
				for(var i=0, key; key = this._keys[i]; i++){
					if(context.getThis()[key] === (this._object || buffer.getParent())){
						delete context.getThis()[key];
					}
				}
			}
			return buffer;
		},
		clone: function(buffer){
			return new this.constructor(this._keys, this._object);
		}
	});

	ddcd.EventNode = dojo.extend(function(command, obj){
		this._command = command;

		var type, events = command.split(/\s*,\s*/);
		var trim = dojo.trim;
		var types = [];
		var fns = [];
		while(type = events.pop()){
			if(type){
				var fn = null;
				if(type.indexOf(":") != -1){
					// oh, if only JS had tuple assignment
					var funcNameArr = type.split(":");
					type = trim(funcNameArr[0]);
					fn = trim(funcNameArr.slice(1).join(":"));
				}else{
					type = trim(type);
				}
				if(!fn){
					fn = type;
				}
				types.push(type);
				fns.push(fn);
			}
		}

		this._types = types;
		this._fns = fns;
		this._object = obj;
		this._rendered = [];
	},
	{
		// _clear: Boolean
		//		Make sure we kill the actual tags (onclick problems, etc)
		_clear: false,
		render: function(context, buffer){
			for(var i = 0, type; type = this._types[i]; i++){
				if(!this._clear && !this._object){
					buffer.getParent()[type] = null;
				}
				var fn = this._fns[i];
				var args;
				if(fn.indexOf(" ") != -1){
					if(this._rendered[i]){
						dojo.disconnect(this._rendered[i]);
						this._rendered[i] = false;
					}
					args = dojo.map(fn.split(" ").slice(1), function(item){
						return new dd._Filter(item).resolve(context);
					});
					fn = fn.split(" ", 2)[0];
				}
				if(!this._rendered[i]){
					if(!this._object){
						this._rendered[i] = buffer.addEvent(context, type, fn, args);
					}else{
						this._rendered[i] = dojo.connect(this._object, type, context.getThis(), fn);
					}
				}
			}
			this._clear = true;

			return buffer;
		},
		unrender: function(context, buffer){
			while(this._rendered.length){
				dojo.disconnect(this._rendered.pop());
			}
			return buffer;
		},
		clone: function(){
			return new this.constructor(this._command, this._object);
		}
	});

	function cloneNode(n1){
		var n2 = n1.cloneNode(true);
		if(dojo.isIE){
			dojo.query("script", n2).forEach("item.text = this[index].text;", dojo.query("script", n1));
		}
		return n2;
	}

	ddcd.DojoTypeNode = dojo.extend(function(node, parsed){
		this._node = node;
		this._parsed = parsed;

		var events = node.getAttribute("dojoAttachEvent");
		if(events){
			this._events = new ddcd.EventNode(dojo.trim(events));
		}
		var attach = node.getAttribute("dojoAttachPoint");
		if(attach){
			this._attach = new ddcd.AttachNode(dojo.trim(attach).split(/\s*,\s*/));
		}

		if (!parsed){
			this._dijit = dojo.parser.instantiate([cloneNode(node)])[0];
		}else{
			node = cloneNode(node);
			var old = ddcd.widgetsInTemplate;
			ddcd.widgetsInTemplate = false;
			this._template = new dd.DomTemplate(node);
			ddcd.widgetsInTemplate = old;
		}
	},
	{
		render: function(context, buffer){
			if(this._parsed){
				var _buffer = new dd.DomBuffer();
				this._template.render(context, _buffer);
				var root = cloneNode(_buffer.getRootNode());
				var div = document.createElement("div");
				div.appendChild(root);
				var rendered = div.innerHTML;
				div.removeChild(root);
				if(rendered != this._rendered){
					this._rendered = rendered;
					if(this._dijit){
						this._dijit.destroyRecursive();
					}
					this._dijit = dojo.parser.instantiate([root])[0];
				}
			}

			var node = this._dijit.domNode;

			if(this._events){
				this._events._object = this._dijit;
				this._events.render(context, buffer);
			}
			if(this._attach){
				this._attach._object = this._dijit;
				this._attach.render(context, buffer);
			}

			return buffer.concat(node);
		},
		unrender: function(context, buffer){
			return buffer.remove(this._dijit.domNode);
		},
		clone: function(){
			return new this.constructor(this._node, this._parsed);
		}
	});

	dojo.mixin(ddcd, {
		widgetsInTemplate: true,
		dojoAttachPoint: function(parser, token){
			return new ddcd.AttachNode(token.contents.slice(16).split(/\s*,\s*/));
		},
		dojoAttachEvent: function(parser, token){
			return new ddcd.EventNode(token.contents.slice(16));
		},
		dojoType: function(parser, token){
			var parsed = false;
			if(token.contents.slice(-7) == " parsed"){
				parsed = true;
			}
			var contents = token.contents.slice(9);
			var dojoType = parsed ? contents.slice(0, -7) : contents.toString();

			if(ddcd.widgetsInTemplate){
				var node = parser.swallowNode();
				node.setAttribute("dojoType", dojoType);
				return new ddcd.DojoTypeNode(node, parsed);
			}

			return new dd.AttributeNode("dojoType", dojoType);
		},
		on: function(parser, token){
			// summary: Associates an event type to a function (on the current widget) by name
			var parts = token.contents.split();
			return new ddcd.EventNode(parts[0] + ":" + parts.slice(1).join(" "));
		}
	});

	dd.register.tags("dojox.dtl.contrib", {
		"dijit": ["attr:dojoType", "attr:dojoAttachPoint", ["attr:attach", "dojoAttachPoint"], "attr:dojoAttachEvent", [/(attr:)?on(click|key(up))/i, "on"]]
	});
})();

}

if(!dojo._hasResource["dojox.dtl._DomTemplated"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl._DomTemplated"] = true;
dojo.provide("dojox.dtl._DomTemplated");






dojox.dtl._DomTemplated = function(){};
dojox.dtl._DomTemplated.prototype = {
	_dijitTemplateCompat: false,
	buildRendering: function(){
		//	summary:
		//		Construct the UI for this widget, setting this.domNode.

		//render needs a domNode to work with
		this.domNode = this.srcNodeRef;

		if(!this._render){
			var ddcd = dojox.dtl.contrib.dijit;
			var old = ddcd.widgetsInTemplate;
			ddcd.widgetsInTemplate = this.widgetsInTemplate;
			this.template = this.template || this._getCachedTemplate(this.templatePath, this.templateString);
			this._render = new dojox.dtl.render.dom.Render(this.domNode, this.template);
			ddcd.widgetsInTemplate = old;
		}

		var context = this._getContext();
		if(!this._created){
			delete context._getter;
		}
		this.render(context);

		this.domNode = this.template.getRootNode();
		if(this.srcNodeRef && this.srcNodeRef.parentNode){
			dojo.destroy(this.srcNodeRef);
			delete this.srcNodeRef;
		}
	},
	setTemplate: function(/*String|dojo._Url*/ template, /*dojox.dtl.Context?*/ context){
		// summary:
		//		Quickly switch between templated by location
		if(dojox.dtl.text._isTemplate(template)){
			this.template = this._getCachedTemplate(null, template);
		}else{
			this.template = this._getCachedTemplate(template);
		}
		this.render(context);
	},
	render: function(/*dojox.dtl.Context?*/ context, /*dojox.dtl.DomTemplate?*/ tpl){
		if(tpl){
			this.template = tpl;
		}
		this._render.render(this._getContext(context), this.template);
	},
	_getContext: function(context){
		if (!(context instanceof dojox.dtl.Context)) {
			context = false;
		}
		context = context || new dojox.dtl.Context(this);
		context.setThis(this);
		return context;
	},
	_getCachedTemplate: function(templatePath, templateString){
		if(!this._templates){
			this._templates = {};
		}
		var key = templateString || templatePath.toString();
		var tmplts = this._templates;
		if(tmplts[key]){
			return tmplts[key];
		}
		return (tmplts[key] = new dojox.dtl.DomTemplate(
			dijit._Templated.getCachedTemplate(
				templatePath,
				templateString,
				true
			)
		));
	}
};

}

if(!dojo._hasResource["dojox.dtl.tag.loader"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.tag.loader"] = true;
dojo.provide("dojox.dtl.tag.loader");



(function(){
	var dd = dojox.dtl;
	var ddtl = dd.tag.loader;

	ddtl.BlockNode = dojo.extend(function(name, nodelist){
		this.name = name;
		this.nodelist = nodelist; // Can be overridden
	},
	{
		"super": function(){
			if(this.parent){
				var html = this.parent.nodelist.dummyRender(this.context, null, true);
				if(typeof html == "string"){
					html = new String(html);
				}
				html.safe = true;
				return html;
			}
			return '';
		},
		render: function(context, buffer){
			var name = this.name;
			var nodelist = this.nodelist;
			var parent;
			if(buffer.blocks){
				var block = buffer.blocks[name];
				if(block){
					parent = block.parent;
					nodelist = block.nodelist;
					block.used = true;
				}
			}

			this.rendered = nodelist;

			context = context.push();
			this.context = context;
			this.parent = null;
			if(nodelist != this.nodelist){
				this.parent = this;
			}
			context.block = this;

			if(buffer.getParent){
				var bufferParent = buffer.getParent();
				var setParent = dojo.connect(buffer, "onSetParent", function(node, up, root){
					if(up && root){
						buffer.setParent(bufferParent);
					}
				});
			}
			buffer = nodelist.render(context, buffer, this);
			setParent && dojo.disconnect(setParent);
			context = context.pop();
			return buffer;
		},
		unrender: function(context, buffer){
			return this.rendered.unrender(context, buffer);
		},
		clone: function(buffer){
			return new this.constructor(this.name, this.nodelist.clone(buffer));
		},
		toString: function(){ return "dojox.dtl.tag.loader.BlockNode"; }
	});

	ddtl.ExtendsNode = dojo.extend(function(getTemplate, nodelist, shared, parent, key){
		this.getTemplate = getTemplate;
		this.nodelist = nodelist;
		this.shared = shared;
		this.parent = parent;
		this.key = key;
	},
	{
		parents: {},
		getParent: function(context){
			var parent = this.parent;
			if(!parent){
				var string;
				parent = this.parent = context.get(this.key, false);
				if(!parent){
					throw new Error("extends tag used a variable that did not resolve");
				}
				if(typeof parent == "object"){
					var url = parent.url || parent.templatePath;
					if(parent.shared){
						this.shared = true;
					}
					if(url){
						parent = this.parent = url.toString();
					}else if(parent.templateString){
						// Allow the builder's string interning to work
						string = parent.templateString;
						parent = this.parent = " ";
					}else{
						parent = this.parent = this.parent.toString();
					}
				}
				if(parent && parent.indexOf("shared:") === 0){
					this.shared = true;
					parent = this.parent = parent.substring(7, parent.length);
				}
			}
			if(!parent){
				throw new Error("Invalid template name in 'extends' tag.");
			}
			if(parent.render){
				return parent;
			}
			if(this.parents[parent]){
				return this.parents[parent];
			}
			this.parent = this.getTemplate(string || dojox.dtl.text.getTemplateString(parent));
			if(this.shared){
				this.parents[parent] = this.parent;
			}
			return this.parent;
		},
		render: function(context, buffer){
			var parent = this.getParent(context);

			parent.blocks = parent.blocks || {};
			buffer.blocks = buffer.blocks || {};

			for(var i = 0, node; node = this.nodelist.contents[i]; i++){
				if(node instanceof dojox.dtl.tag.loader.BlockNode){
					var old = parent.blocks[node.name];
					if(old && old.nodelist != node.nodelist){
						// In a shared template, the individual blocks might change
						buffer = old.nodelist.unrender(context, buffer);
					}
					parent.blocks[node.name] = buffer.blocks[node.name] = {
						shared: this.shared,
						nodelist: node.nodelist,
						used: false
					}
				}
			}

			this.rendered = parent;
			return parent.nodelist.render(context, buffer, this);
		},
		unrender: function(context, buffer){
			return this.rendered.unrender(context, buffer, this);
		},
		toString: function(){ return "dojox.dtl.block.ExtendsNode"; }
	});

	ddtl.IncludeNode = dojo.extend(function(path, constant, getTemplate, text, parsed){
		this._path = path;
		this.constant = constant;
		this.path = (constant) ? path : new dd._Filter(path);
		this.getTemplate = getTemplate;
		this.text = text;
		this.parsed = (arguments.length == 5) ? parsed : true;
	},
	{
		_cache: [{}, {}],
		render: function(context, buffer){
			var location = ((this.constant) ? this.path : this.path.resolve(context)).toString();
			var parsed = Number(this.parsed);
			var dirty = false;
			if(location != this.last){
				dirty = true;
				if(this.last){
					buffer = this.unrender(context, buffer);
				}
				this.last = location;
			}

			var cache = this._cache[parsed];

			if(parsed){
				if(!cache[location]){
					cache[location] = dd.text._resolveTemplateArg(location, true);
				}
				if(dirty){
					var template = this.getTemplate(cache[location]);
					this.rendered = template.nodelist;
				}
				return this.rendered.render(context, buffer, this);
			}else{
				if(this.text instanceof dd._TextNode){
					if(dirty){
						this.rendered = this.text;
						this.rendered.set(dd.text._resolveTemplateArg(location, true));
					}
					return this.rendered.render(context, buffer);
				}else{
					if(!cache[location]){
						var nodelist = [];
						var div = document.createElement("div");
						div.innerHTML = dd.text._resolveTemplateArg(location, true);
						var children = div.childNodes;
						while(children.length){
							var removed = div.removeChild(children[0]);
							nodelist.push(removed);
						}
						cache[location] = nodelist;
					}
					if(dirty){
						this.nodelist = [];
						var exists = true;
						for(var i = 0, child; child = cache[location][i]; i++){
							this.nodelist.push(child.cloneNode(true));
						}
					}
					for(var i = 0, node; node = this.nodelist[i]; i++){
						buffer = buffer.concat(node);
					}
				}
			}
			return buffer;
		},
		unrender: function(context, buffer){
			if(this.rendered){
				buffer = this.rendered.unrender(context, buffer);
			}
			if(this.nodelist){
				for(var i = 0, node; node = this.nodelist[i]; i++){
					buffer = buffer.remove(node);
				}
			}
			return buffer;
		},
		clone: function(buffer){
			return new this.constructor(this._path, this.constant, this.getTemplate, this.text.clone(buffer), this.parsed);
		}
	});

	dojo.mixin(ddtl, {
		block: function(parser, token){
			var parts = token.contents.split();
			var name = parts[1];

			parser._blocks = parser._blocks || {};
			parser._blocks[name] = parser._blocks[name] || [];
			parser._blocks[name].push(name);

			var nodelist = parser.parse(["endblock", "endblock " + name]).rtrim();
			parser.next_token();
			return new dojox.dtl.tag.loader.BlockNode(name, nodelist);
		},
		extends_: function(parser, token){
			var parts = token.contents.split();
			var shared = false;
			var parent = null;
			var key = null;
			if(parts[1].charAt(0) == '"' || parts[1].charAt(0) == "'"){
				parent = parts[1].substring(1, parts[1].length - 1);
			}else{
				key = parts[1];
			}
			if(parent && parent.indexOf("shared:") == 0){
				shared = true;
				parent = parent.substring(7, parent.length);
			}
			var nodelist = parser.parse();
			return new dojox.dtl.tag.loader.ExtendsNode(parser.getTemplate, nodelist, shared, parent, key);
		},
		include: function(parser, token){
			var parts = token.contents.split();
			if(parts.length != 2){
				throw new Error(parts[0] + " tag takes one argument: the name of the template to be included");
			}
			var path = parts[1];
			var constant = false;
			if((path.charAt(0) == '"' || path.slice(-1) == "'") && path.charAt(0) == path.slice(-1)){
				path = path.slice(1, -1);
				constant = true;
			}
			return new ddtl.IncludeNode(path, constant, parser.getTemplate, parser.create_text_node());
		},
		ssi: function(parser, token){
			// We're going to treat things a little differently here.
			// First of all, this tag is *not* portable, so I'm not
			// concerned about it being a "drop in" replacement.

			// Instead, we'll just replicate the include tag, but with that
			// optional "parsed" parameter.
			var parts = token.contents.split();
			var parsed = false;
			if(parts.length == 3){
				parsed = (parts.pop() == "parsed");
				if(!parsed){
					throw new Error("Second (optional) argument to ssi tag must be 'parsed'");
				}
			}
			var node = ddtl.include(parser, new dd.Token(token.token_type, parts.join(" ")));
			node.parsed = parsed;
			return node;
		}
	});
})();

}

if(!dojo._hasResource["dojox.dtl.tag.logic"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.tag.logic"] = true;
dojo.provide("dojox.dtl.tag.logic");



(function(){
	var dd = dojox.dtl;
	var ddt = dd.text;
	var ddtl = dd.tag.logic;

	ddtl.IfNode = dojo.extend(function(bools, trues, falses, type){
		this.bools = bools;
		this.trues = trues;
		this.falses = falses;
		this.type = type;
	},
	{
		render: function(context, buffer){
			var i, bool, ifnot, filter, value;
			if(this.type == "or"){
				for(i = 0; bool = this.bools[i]; i++){
					ifnot = bool[0];
					filter = bool[1];
					value = filter.resolve(context);
					if((value && !ifnot) || (ifnot && !value)){
						if(this.falses){
							buffer = this.falses.unrender(context, buffer);
						}
						return (this.trues) ? this.trues.render(context, buffer, this) : buffer;
					}
				}
				if(this.trues){
					buffer = this.trues.unrender(context, buffer);
				}
				return (this.falses) ? this.falses.render(context, buffer, this) : buffer;
			}else{
				for(i = 0; bool = this.bools[i]; i++){
					ifnot = bool[0];
					filter = bool[1];
					value = filter.resolve(context);
					// If we ever encounter a false value
					if(value == ifnot){
						if(this.trues){
							buffer = this.trues.unrender(context, buffer);
						}
						return (this.falses) ? this.falses.render(context, buffer, this) : buffer;
					}
				}
				if(this.falses){
					buffer = this.falses.unrender(context, buffer);
				}
				return (this.trues) ? this.trues.render(context, buffer, this) : buffer;
			}
			return buffer;
		},
		unrender: function(context, buffer){
			buffer = (this.trues) ? this.trues.unrender(context, buffer) : buffer;
			buffer = (this.falses) ? this.falses.unrender(context, buffer) : buffer;
			return buffer;
		},
		clone: function(buffer){
			var trues = (this.trues) ? this.trues.clone(buffer) : null;
			var falses = (this.falses) ? this.falses.clone(buffer) : null;
			return new this.constructor(this.bools, trues, falses, this.type);
		}
	});

	ddtl.IfEqualNode = dojo.extend(function(var1, var2, trues, falses, negate){
		this.var1 = new dd._Filter(var1);
		this.var2 = new dd._Filter(var2);
		this.trues = trues;
		this.falses = falses;
		this.negate = negate;
	},
	{
		render: function(context, buffer){
			var var1 = this.var1.resolve(context);
			var var2 = this.var2.resolve(context);
			var1 = (typeof var1 != "undefined") ? var1 : "";
			var2 = (typeof var1 != "undefined") ? var2 : "";
			if((this.negate && var1 != var2) || (!this.negate && var1 == var2)){
				if(this.falses){
					buffer = this.falses.unrender(context, buffer, this);
				}
				return (this.trues) ? this.trues.render(context, buffer, this) : buffer;
			}
			if(this.trues){
				buffer = this.trues.unrender(context, buffer, this);
			}
			return (this.falses) ? this.falses.render(context, buffer, this) : buffer;
		},
		unrender: function(context, buffer){
			return ddtl.IfNode.prototype.unrender.call(this, context, buffer);
		},
		clone: function(buffer){
			var trues = this.trues ? this.trues.clone(buffer) : null;
			var falses = this.falses ? this.falses.clone(buffer) : null;
			return new this.constructor(this.var1.getExpression(), this.var2.getExpression(), trues, falses, this.negate);
		}
	});

	ddtl.ForNode = dojo.extend(function(assign, loop, reversed, nodelist){
		this.assign = assign;
		this.loop = new dd._Filter(loop);
		this.reversed = reversed;
		this.nodelist = nodelist;
		this.pool = [];
	},
	{
		render: function(context, buffer){
			var i, j, k;
			var dirty = false;
			var assign = this.assign;

			for(k = 0; k < assign.length; k++){
				if(typeof context[assign[k]] != "undefined"){
					dirty = true;
					context = context.push();
					break;
				}
			}
			if(!dirty && context.forloop){
				dirty = true;
				context = context.push();
			}

			var items = this.loop.resolve(context) || [];
			for(i = items.length; i < this.pool.length; i++){
				this.pool[i].unrender(context, buffer, this);
			}
			if(this.reversed){
				items = items.slice(0).reverse();
			}

			var isObject = dojo.isObject(items) && !dojo.isArrayLike(items);
			var arred = [];
			if(isObject){
				for(var key in items){
					arred.push(items[key]);
				}
			}else{
				arred = items;
			}

			var forloop = context.forloop = {
				parentloop: context.get("forloop", {})
			};
			var j = 0;
			for(i = 0; i < arred.length; i++){
				var item = arred[i];

				forloop.counter0 = j;
				forloop.counter = j + 1;
				forloop.revcounter0 = arred.length - j - 1;
				forloop.revcounter = arred.length - j;
				forloop.first = !j;
				forloop.last = (j == arred.length - 1);

				if(assign.length > 1 && dojo.isArrayLike(item)){
					if(!dirty){
						dirty = true;
						context = context.push();
					}
					var zipped = {};
					for(k = 0; k < item.length && k < assign.length; k++){
						zipped[assign[k]] = item[k];
					}
					dojo.mixin(context, zipped);
				}else{
					context[assign[0]] = item;
				}

				if(j + 1 > this.pool.length){
					this.pool.push(this.nodelist.clone(buffer));
				}
				buffer = this.pool[j++].render(context, buffer, this);
			}

			delete context.forloop;
			if(dirty){
				context = context.pop();
			}else{
				for(k = 0; k < assign.length; k++){
					delete context[assign[k]];
				}
			}
			return buffer;
		},
		unrender: function(context, buffer){
			for(var i = 0, pool; pool = this.pool[i]; i++){
				buffer = pool.unrender(context, buffer);
			}
			return buffer;
		},
		clone: function(buffer){
			return new this.constructor(this.assign, this.loop.getExpression(), this.reversed, this.nodelist.clone(buffer));
		}
	});

	dojo.mixin(ddtl, {
		if_: function(parser, token){
			var i, part, type, bools = [], parts = token.contents.split();
			parts.shift();
			token = parts.join(" ");
			parts = token.split(" and ");
			if(parts.length == 1){
				type = "or";
				parts = token.split(" or ");
			}else{
				type = "and";
				for(i = 0; i < parts.length; i++){
					if(parts[i].indexOf(" or ") != -1){
						// Note, since we split by and, this is the only place we need to error check
						throw new Error("'if' tags can't mix 'and' and 'or'");
					}
				}
			}
			for(i = 0; part = parts[i]; i++){
				var not = false;
				if(part.indexOf("not ") == 0){
					part = part.slice(4);
					not = true;
				}
				bools.push([not, new dd._Filter(part)]);
			}
			var trues = parser.parse(["else", "endif"]);
			var falses = false;
			var token = parser.next_token();
			if(token.contents == "else"){
				falses = parser.parse(["endif"]);
				parser.next_token();
			}
			return new ddtl.IfNode(bools, trues, falses, type);
		},
		_ifequal: function(parser, token, negate){
			var parts = token.split_contents();
			if(parts.length != 3){
				throw new Error(parts[0] + " takes two arguments");
			}
			var end = 'end' + parts[0];
			var trues = parser.parse(["else", end]);
			var falses = false;
			var token = parser.next_token();
			if(token.contents == "else"){
				falses = parser.parse([end]);
				parser.next_token();
			}
			return new ddtl.IfEqualNode(parts[1], parts[2], trues, falses, negate);
		},
		ifequal: function(parser, token){
			return ddtl._ifequal(parser, token);
		},
		ifnotequal: function(parser, token){
			return ddtl._ifequal(parser, token, true);
		},
		for_: function(parser, token){
			var parts = token.contents.split();
			if(parts.length < 4){
				throw new Error("'for' statements should have at least four words: " + token.contents);
			}
			var reversed = parts[parts.length - 1] == "reversed";
			var index = (reversed) ? -3 : -2;
			if(parts[parts.length + index] != "in"){
				throw new Error("'for' tag received an invalid argument: " + token.contents);
			}
			var loopvars = parts.slice(1, index).join(" ").split(/ *, */);
			for(var i = 0; i < loopvars.length; i++){
				if(!loopvars[i] || loopvars[i].indexOf(" ") != -1){
					throw new Error("'for' tag received an invalid argument: " + token.contents);
				}
			}
			var nodelist = parser.parse(["endfor"]);
			parser.next_token();
			return new ddtl.ForNode(loopvars, parts[parts.length + index + 1], reversed, nodelist);
		}
	});
})();

}

if(!dojo._hasResource["dojox.dtl.tag.loop"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.tag.loop"] = true;
dojo.provide("dojox.dtl.tag.loop");




(function(){
	var dd = dojox.dtl;
	var ddtl = dd.tag.loop;

	ddtl.CycleNode = dojo.extend(function(cyclevars, name, text, shared){
		this.cyclevars = cyclevars;
		this.name = name;
		this.contents = text;
		this.shared = shared || {counter: -1, map: {}};
	},
	{
		render: function(context, buffer){
			if(context.forloop && !context.forloop.counter0){
				this.shared.counter = -1;
			}

			++this.shared.counter;
			var value = this.cyclevars[this.shared.counter % this.cyclevars.length];

			var map = this.shared.map;
			if(!map[value]){
				map[value] = new dd._Filter(value);
			}
			value = map[value].resolve(context, buffer);

			if(this.name){
				context[this.name] = value;
			}
			this.contents.set(value);
			return this.contents.render(context, buffer);
		},
		unrender: function(context, buffer){
			return this.contents.unrender(context, buffer);
		},
		clone: function(buffer){
			return new this.constructor(this.cyclevars, this.name, this.contents.clone(buffer), this.shared);
		}
	});

	ddtl.IfChangedNode = dojo.extend(function(nodes, vars, shared){
		this.nodes = nodes;
		this._vars = vars;
		this.shared = shared || {last: null, counter: 0};
		this.vars = dojo.map(vars, function(item){
			return new dojox.dtl._Filter(item);
		});
	}, {
		render: function(context, buffer){
			if(context.forloop){
				if(context.forloop.counter <= this.shared.counter){
					this.shared.last = null;
				}
				this.shared.counter = context.forloop.counter;
			}

			var change;
			if(this.vars.length){
				change = dojo.toJson(dojo.map(this.vars, function(item){
					return item.resolve(context);
				}));
			}else{
				change = this.nodes.dummyRender(context, buffer);
			}

			if(change != this.shared.last){
				var firstloop = (this.shared.last === null);
				this.shared.last = change;
				context = context.push();
				context.ifchanged = {firstloop: firstloop};
				buffer = this.nodes.render(context, buffer);
				context = context.pop();
			}else{
				buffer = this.nodes.unrender(context, buffer);
			}
			return buffer;
		},
		unrender: function(context, buffer){
			return this.nodes.unrender(context, buffer);
		},
		clone: function(buffer){
			return new this.constructor(this.nodes.clone(buffer), this._vars, this.shared);
		}
	});

	ddtl.RegroupNode = dojo.extend(function(expression, key, alias){
		this._expression = expression;
		this.expression = new dd._Filter(expression);
		this.key = key;
		this.alias = alias;
	},
	{
		_push: function(container, grouper, stack){
			if(stack.length){
				container.push({ grouper: grouper, list: stack });
			}
		},
		render: function(context, buffer){
			context[this.alias] = [];
			var list = this.expression.resolve(context);
			if(list){
				var last = null;
				var stack = [];
				for(var i = 0; i < list.length; i++){
					var id = list[i][this.key];
					if(last !== id){
						this._push(context[this.alias], last, stack);
						last = id;
						stack = [list[i]];
					}else{
						stack.push(list[i]);
					}
				}
				this._push(context[this.alias], last, stack);
			}
			return buffer;
		},
		unrender: function(context, buffer){
			return buffer;
		},
		clone: function(context, buffer){
			return this;
		}
	});

	dojo.mixin(ddtl, {
		cycle: function(parser, token){
			// summary: Cycle among the given strings each time this tag is encountered
			var args = token.split_contents();

			if(args.length < 2){
				throw new Error("'cycle' tag requires at least two arguments");
			}

			if(args[1].indexOf(",") != -1){
				var vars = args[1].split(",");
				args = [args[0]];
				for(var i = 0; i < vars.length; i++){
					args.push('"' + vars[i] + '"');
				}
			}

			if(args.length == 2){
				var name = args[args.length - 1];

				if(!parser._namedCycleNodes){
					throw new Error("No named cycles in template: '" + name + "' is not defined");
				}
				if(!parser._namedCycleNodes[name]){
					throw new Error("Named cycle '" + name + "' does not exist");
				}

		        return parser._namedCycleNodes[name];
			}

			if(args.length > 4 && args[args.length - 2] == "as"){
				var name = args[args.length - 1];

				var node = new ddtl.CycleNode(args.slice(1, args.length - 2), name, parser.create_text_node());

				if(!parser._namedCycleNodes){
					parser._namedCycleNodes = {};
				}
				parser._namedCycleNodes[name] = node;
			}else{
				node = new ddtl.CycleNode(args.slice(1), null, parser.create_text_node());
			}

			return node;
		},
		ifchanged: function(parser, token){
			var parts = token.contents.split();
			var nodes = parser.parse(["endifchanged"]);
			parser.delete_first_token();
			return new ddtl.IfChangedNode(nodes, parts.slice(1));
		},
		regroup: function(parser, token){
			var tokens = dojox.string.tokenize(token.contents, /(\s+)/g, function(spaces){
				return spaces;
			});
			if(tokens.length < 11 || tokens[tokens.length - 3] != "as" || tokens[tokens.length - 7] != "by"){
				throw new Error("Expected the format: regroup list by key as newList");
			}
			var expression = tokens.slice(2, -8).join("");
			var key = tokens[tokens.length - 5];
			var alias = tokens[tokens.length - 1];
			return new ddtl.RegroupNode(expression, key, alias);
		}
	});
})();

}

if(!dojo._hasResource["dojox.dtl.filter.lists"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.filter.lists"] = true;
dojo.provide("dojox.dtl.filter.lists");



dojo.mixin(dojox.dtl.filter.lists, {
	_dictsort: function(a, b){
		if(a[0] == b[0]){
			return 0;
		}
		return (a[0] < b[0]) ? -1 : 1;
	},
	dictsort: function(value, arg){
		// summary: Takes a list of dicts, returns that list sorted by the property given in the argument.
		if(!arg){
			return value;
		}

		var i, item, items = [];
		if(!dojo.isArray(value)){
			var obj = value, value = [];
			for(var key in obj){
				value.push(obj[key]);
			}
		}
		for(i = 0; i < value.length; i++){
			items.push([new dojox.dtl._Filter('var.' + arg).resolve(new dojox.dtl._Context({ 'var' : value[i]})), value[i]]);
		}
		items.sort(dojox.dtl.filter.lists._dictsort);
		var output = [];
		for(i = 0; item = items[i]; i++){
			output.push(item[1]);
		}
		return output;
	},
	dictsortreversed: function(value, arg){
		// summary: Takes a list of dicts, returns that list sorted in reverse order by the property given in the argument.
		if(!arg) return value;

		var dictsort = dojox.dtl.filter.lists.dictsort(value, arg);
		return dictsort.reverse();
	},
	first: function(value){
		// summary: Returns the first item in a list
		return (value.length) ? value[0] : "";
	},
	join: function(value, arg){
		// summary: Joins a list with a string, like Python's ``str.join(list)``
		// description:
		//		Django throws a compile error, but JS can't do arg checks
		//		so we're left with run time errors, which aren't wise for something
		//		as trivial here as an empty arg.
		return value.join(arg || ",");
	},
	length: function(value){
		// summary: Returns the length of the value - useful for lists
		return (isNaN(value.length)) ? (value + "").length : value.length;
	},
	length_is: function(value, arg){
		// summary: Returns a boolean of whether the value's length is the argument
		return value.length == parseInt(arg);
	},
	random: function(value){
		// summary: Returns a random item from the list
		return value[Math.floor(Math.random() * value.length)];
	},
	slice: function(value, arg){
		// summary: Returns a slice of the list.
		// description:
		//		Uses the same syntax as Python's list slicing; see
		//		http://diveintopython.org/native_data_types/lists.html#odbchelper.list.slice
		//		for an introduction.
		//		Also uses the optional third value to denote every X item.
		arg = arg || "";
		var parts = arg.split(":");
		var bits = [];
		for(var i = 0; i < parts.length; i++){
			if(!parts[i].length){
				bits.push(null);
			}else{
				bits.push(parseInt(parts[i]));
			}
		}

		if(bits[0] === null){
			bits[0] = 0;
		}
		if(bits[0] < 0){
			bits[0] = value.length + bits[0];
		}
		if(bits.length < 2 || bits[1] === null){
			bits[1] = value.length;
		}
		if(bits[1] < 0){
			bits[1] = value.length + bits[1];
		}
		
		return value.slice(bits[0], bits[1]);
	},
	_unordered_list: function(value, tabs){
		var ddl = dojox.dtl.filter.lists;
		var i, indent = "";
		for(i = 0; i < tabs; i++){
			indent += "\t";
		}
		if(value[1] && value[1].length){
			var recurse = [];
			for(i = 0; i < value[1].length; i++){
				recurse.push(ddl._unordered_list(value[1][i], tabs + 1))
			}
			return indent + "<li>" + value[0] + "\n" + indent + "<ul>\n" + recurse.join("\n") + "\n" + indent + "</ul>\n" + indent + "</li>";
		}else{
			return indent + "<li>" + value[0] + "</li>";
		}
	},
	unordered_list: function(value){
		// summary:
		//		Recursively takes a self-nested list and returns an HTML unordered list --
		//		WITHOUT opening and closing <ul> tags.
		//	description:
		//		The list is assumed to be in the proper format. For example, if ``var`` contains
		//		``['States', [['Kansas', [['Lawrence', []], ['Topeka', []]]], ['Illinois', []]]]``,
		//		then ``{{ var|unordered_list }}`` would return::
		//
		//		|	<li>States
		//		|	<ul>
		//		|		<li>Kansas
		//		|		<ul>
		//		|			<li>Lawrence</li>
		//		|			<li>Topeka</li>
		//		|		</ul>
		//		|		</li>
		//		|		<li>Illinois</li>
		//		|	</ul>
		//		|	</li>
		return dojox.dtl.filter.lists._unordered_list(value, 1);
	}
});

}

if(!dojo._hasResource["dojo.date"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.date"] = true;
dojo.provide("dojo.date");

dojo.getObject("date", true, dojo);

/*=====
dojo.date = {
	// summary: Date manipulation utilities
}
=====*/

dojo.date.getDaysInMonth = function(/*Date*/dateObject){
	//	summary:
	//		Returns the number of days in the month used by dateObject
	var month = dateObject.getMonth();
	var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(month == 1 && dojo.date.isLeapYear(dateObject)){ return 29; } // Number
	return days[month]; // Number
};

dojo.date.isLeapYear = function(/*Date*/dateObject){
	//	summary:
	//		Determines if the year of the dateObject is a leap year
	//	description:
	//		Leap years are years with an additional day YYYY-02-29, where the
	//		year number is a multiple of four with the following exception: If
	//		a year is a multiple of 100, then it is only a leap year if it is
	//		also a multiple of 400. For example, 1900 was not a leap year, but
	//		2000 is one.

	var year = dateObject.getFullYear();
	return !(year%400) || (!(year%4) && !!(year%100)); // Boolean
};

// FIXME: This is not localized
dojo.date.getTimezoneName = function(/*Date*/dateObject){
	//	summary:
	//		Get the user's time zone as provided by the browser
	// dateObject:
	//		Needed because the timezone may vary with time (daylight savings)
	//	description:
	//		Try to get time zone info from toString or toLocaleString method of
	//		the Date object -- UTC offset is not a time zone.  See
	//		http://www.twinsun.com/tz/tz-link.htm Note: results may be
	//		inconsistent across browsers.

	var str = dateObject.toString(); // Start looking in toString
	var tz = ''; // The result -- return empty string if nothing found
	var match;

	// First look for something in parentheses -- fast lookup, no regex
	var pos = str.indexOf('(');
	if(pos > -1){
		tz = str.substring(++pos, str.indexOf(')'));
	}else{
		// If at first you don't succeed ...
		// If IE knows about the TZ, it appears before the year
		// Capital letters or slash before a 4-digit year
		// at the end of string
		var pat = /([A-Z\/]+) \d{4}$/;
		if((match = str.match(pat))){
			tz = match[1];
		}else{
		// Some browsers (e.g. Safari) glue the TZ on the end
		// of toLocaleString instead of putting it in toString
			str = dateObject.toLocaleString();
			// Capital letters or slash -- end of string,
			// after space
			pat = / ([A-Z\/]+)$/;
			if((match = str.match(pat))){
				tz = match[1];
			}
		}
	}

	// Make sure it doesn't somehow end up return AM or PM
	return (tz == 'AM' || tz == 'PM') ? '' : tz; // String
};

// Utility methods to do arithmetic calculations with Dates

dojo.date.compare = function(/*Date*/date1, /*Date?*/date2, /*String?*/portion){
	//	summary:
	//		Compare two date objects by date, time, or both.
	//	description:
	//  	Returns 0 if equal, positive if a > b, else negative.
	//	date1:
	//		Date object
	//	date2:
	//		Date object.  If not specified, the current Date is used.
	//	portion:
	//		A string indicating the "date" or "time" portion of a Date object.
	//		Compares both "date" and "time" by default.  One of the following:
	//		"date", "time", "datetime"

	// Extra step required in copy for IE - see #3112
	date1 = new Date(+date1);
	date2 = new Date(+(date2 || new Date()));

	if(portion == "date"){
		// Ignore times and compare dates.
		date1.setHours(0, 0, 0, 0);
		date2.setHours(0, 0, 0, 0);
	}else if(portion == "time"){
		// Ignore dates and compare times.
		date1.setFullYear(0, 0, 0);
		date2.setFullYear(0, 0, 0);
	}
	
	if(date1 > date2){ return 1; } // int
	if(date1 < date2){ return -1; } // int
	return 0; // int
};

dojo.date.add = function(/*Date*/date, /*String*/interval, /*int*/amount){
	//	summary:
	//		Add to a Date in intervals of different size, from milliseconds to years
	//	date: Date
	//		Date object to start with
	//	interval:
	//		A string representing the interval.  One of the following:
	//			"year", "month", "day", "hour", "minute", "second",
	//			"millisecond", "quarter", "week", "weekday"
	//	amount:
	//		How much to add to the date.

	var sum = new Date(+date); // convert to Number before copying to accomodate IE (#3112)
	var fixOvershoot = false;
	var property = "Date";

	switch(interval){
		case "day":
			break;
		case "weekday":
			//i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo.cldr.supplemental

			// Divide the increment time span into weekspans plus leftover days
			// e.g., 8 days is one 5-day weekspan / and two leftover days
			// Can't have zero leftover days, so numbers divisible by 5 get
			// a days value of 5, and the remaining days make up the number of weeks
			var days, weeks;
			var mod = amount % 5;
			if(!mod){
				days = (amount > 0) ? 5 : -5;
				weeks = (amount > 0) ? ((amount-5)/5) : ((amount+5)/5);
			}else{
				days = mod;
				weeks = parseInt(amount/5);
			}
			// Get weekday value for orig date param
			var strt = date.getDay();
			// Orig date is Sat / positive incrementer
			// Jump over Sun
			var adj = 0;
			if(strt == 6 && amount > 0){
				adj = 1;
			}else if(strt == 0 && amount < 0){
			// Orig date is Sun / negative incrementer
			// Jump back over Sat
				adj = -1;
			}
			// Get weekday val for the new date
			var trgt = strt + days;
			// New date is on Sat or Sun
			if(trgt == 0 || trgt == 6){
				adj = (amount > 0) ? 2 : -2;
			}
			// Increment by number of weeks plus leftover days plus
			// weekend adjustments
			amount = (7 * weeks) + days + adj;
			break;
		case "year":
			property = "FullYear";
			// Keep increment/decrement from 2/29 out of March
			fixOvershoot = true;
			break;
		case "week":
			amount *= 7;
			break;
		case "quarter":
			// Naive quarter is just three months
			amount *= 3;
			// fallthrough...
		case "month":
			// Reset to last day of month if you overshoot
			fixOvershoot = true;
			property = "Month";
			break;
//		case "hour":
//		case "minute":
//		case "second":
//		case "millisecond":
		default:
			property = "UTC"+interval.charAt(0).toUpperCase() + interval.substring(1) + "s";
	}

	if(property){
		sum["set"+property](sum["get"+property]()+amount);
	}

	if(fixOvershoot && (sum.getDate() < date.getDate())){
		sum.setDate(0);
	}

	return sum; // Date
};

dojo.date.difference = function(/*Date*/date1, /*Date?*/date2, /*String?*/interval){
	//	summary:
	//		Get the difference in a specific unit of time (e.g., number of
	//		months, weeks, days, etc.) between two dates, rounded to the
	//		nearest integer.
	//	date1:
	//		Date object
	//	date2:
	//		Date object.  If not specified, the current Date is used.
	//	interval:
	//		A string representing the interval.  One of the following:
	//			"year", "month", "day", "hour", "minute", "second",
	//			"millisecond", "quarter", "week", "weekday"
	//		Defaults to "day".

	date2 = date2 || new Date();
	interval = interval || "day";
	var yearDiff = date2.getFullYear() - date1.getFullYear();
	var delta = 1; // Integer return value

	switch(interval){
		case "quarter":
			var m1 = date1.getMonth();
			var m2 = date2.getMonth();
			// Figure out which quarter the months are in
			var q1 = Math.floor(m1/3) + 1;
			var q2 = Math.floor(m2/3) + 1;
			// Add quarters for any year difference between the dates
			q2 += (yearDiff * 4);
			delta = q2 - q1;
			break;
		case "weekday":
			var days = Math.round(dojo.date.difference(date1, date2, "day"));
			var weeks = parseInt(dojo.date.difference(date1, date2, "week"));
			var mod = days % 7;

			// Even number of weeks
			if(mod == 0){
				days = weeks*5;
			}else{
				// Weeks plus spare change (< 7 days)
				var adj = 0;
				var aDay = date1.getDay();
				var bDay = date2.getDay();

				weeks = parseInt(days/7);
				mod = days % 7;
				// Mark the date advanced by the number of
				// round weeks (may be zero)
				var dtMark = new Date(date1);
				dtMark.setDate(dtMark.getDate()+(weeks*7));
				var dayMark = dtMark.getDay();

				// Spare change days -- 6 or less
				if(days > 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = -1;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 0;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = -1;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = -2;
							break;
						// Range contains weekend
						case (dayMark + mod) > 5:
							adj = -2;
					}
				}else if(days < 0){
					switch(true){
						// Range starts on Sat
						case aDay == 6:
							adj = 0;
							break;
						// Range starts on Sun
						case aDay == 0:
							adj = 1;
							break;
						// Range ends on Sat
						case bDay == 6:
							adj = 2;
							break;
						// Range ends on Sun
						case bDay == 0:
							adj = 1;
							break;
						// Range contains weekend
						case (dayMark + mod) < 0:
							adj = 2;
					}
				}
				days += adj;
				days -= (weeks*2);
			}
			delta = days;
			break;
		case "year":
			delta = yearDiff;
			break;
		case "month":
			delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
			break;
		case "week":
			// Truncate instead of rounding
			// Don't use Math.floor -- value may be negative
			delta = parseInt(dojo.date.difference(date1, date2, "day")/7);
			break;
		case "day":
			delta /= 24;
			// fallthrough
		case "hour":
			delta /= 60;
			// fallthrough
		case "minute":
			delta /= 60;
			// fallthrough
		case "second":
			delta /= 1000;
			// fallthrough
		case "millisecond":
			delta *= date2.getTime() - date1.getTime();
	}

	// Round for fractional values and DST leaps
	return Math.round(delta); // Number (integer)
};

}

if(!dojo._hasResource["dojox.date.php"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.date.php"] = true;
dojo.provide("dojox.date.php");



dojox.date.php.format = function(/*Date*/ date, /*String*/ format){
	// summary: Get a formatted string for a given date object
	var df = new dojox.date.php.DateFormat(format);
	return df.format(date);
}

dojox.date.php.DateFormat = function(/*String*/ format){
	// summary: Format the internal date object
	if(!this.regex){
		var keys = [];
		for(var key in this.constructor.prototype){
			if(dojo.isString(key) && key.length == 1 && dojo.isFunction(this[key])){
				keys.push(key);
			}
		}
		this.constructor.prototype.regex = new RegExp("(?:(\\\\.)|([" + keys.join("") + "]))", "g");
	}

	var replacements = [];

	this.tokens = dojox.string.tokenize(format, this.regex, function(escape, token, i){
		if(token){
			replacements.push([i, token]);
			return token;
		}
		if(escape){
			return escape.charAt(1);
		}
	});

	this.replacements = replacements;
}
dojo.extend(dojox.date.php.DateFormat, {
	weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	weekdays_3: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	months_3: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	monthdays: [31,28,31,30,31,30,31,31,30,31,30,31],

	format: function(/*Date*/ date){
		this.date = date;
		for(var i = 0, replacement; replacement = this.replacements[i]; i++){
			this.tokens[replacement[0]] = this[replacement[1]]();
		}
		return this.tokens.join("");
	},

	// Day

	d: function(){
		// summary: Day of the month, 2 digits with leading zeros
		var j = this.j();
		return (j.length == 1) ? "0" + j : j;
	},

	D: function(){
		// summary: A textual representation of a day, three letters
		return this.weekdays_3[this.date.getDay()];
	},

	j: function(){
		// summary: Day of the month without leading zeros
		return this.date.getDate() + "";
	},

	l: function(){
		// summary: A full textual representation of the day of the week
		return this.weekdays[this.date.getDay()];
	},
	
	N: function(){
		// summary: ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)
		var w = this.w();
		return (!w) ? 7 : w;
	},

	S: function(){
		// summary: English ordinal suffix for the day of the month, 2 characters
		switch(this.date.getDate()){
			case 11: case 12: case 13: return "th";
			case 1: case 21: case 31: return "st";
			case 2: case 22: return "nd";
			case 3: case 23: return "rd";
			default: return "th";
		}
	},

	w: function(){
		// summary: Numeric representation of the day of the week
		return this.date.getDay() + "";
	},

	z: function(){
		// summary: The day of the year (starting from 0)
		var millis = this.date.getTime() - new Date(this.date.getFullYear(), 0, 1).getTime();
		return Math.floor(millis/86400000) + "";
	},

	// Week

	W: function(){
		// summary: ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0)
		var week;
		var jan1_w = new Date(this.date.getFullYear(), 0, 1).getDay() + 1;
		var w = this.date.getDay() + 1;
		var z = parseInt(this.z());

		if(z <= (8 - jan1_w) && jan1_w > 4){
			var last_year = new Date(this.date.getFullYear() - 1, this.date.getMonth(), this.date.getDate());
			if(jan1_w == 5 || (jan1_w == 6 && dojo.date.isLeapYear(last_year))){
				week = 53;
			}else{
				week = 52;
			}
		}else{
			var i;
			if(Boolean(this.L())){
				i = 366;
			}else{
				i = 365;
			}
			if((i - z) < (4 - w)){
				week = 1;
			}else{
				var j = z + (7 - w) + (jan1_w - 1);
				week = Math.ceil(j / 7);
				if(jan1_w > 4){
					--week;
				}
			}
		}
		
		return week;
	},

	// Month

	F: function(){
		// summary: A full textual representation of a month, such as January or March
		return this.months[this.date.getMonth()];
	},

	m: function(){
		// summary: Numeric representation of a month, with leading zeros
		var n = this.n();
		return (n.length == 1) ? "0" + n : n;
	},

	M: function(){
		// summary: A short textual representation of a month, three letters
		return this.months_3[this.date.getMonth()];
	},

	n: function(){
		// summary: Numeric representation of a month, without leading zeros
		return this.date.getMonth() + 1 + "";
	},

	t: function(){
		// summary: Number of days in the given month
		return (Boolean(this.L()) && this.date.getMonth() == 1) ? 29 : this.monthdays[this.getMonth()];
	},

	// Year

	L: function(){
		// summary: Whether it's a leap year
		return (dojo.date.isLeapYear(this.date)) ? "1" : "0";
	},

	o: function(){
		// summary:
		//		ISO-8601 year number. This has the same value as Y, except that if
		//		the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)
		// TODO: Figure out what this means
	},

	Y: function(){
		// summary: A full numeric representation of a year, 4 digits
		return this.date.getFullYear() + "";
	},

	y: function(){
		// summary: A two digit representation of a year
		return this.Y().slice(-2);
	},

	// Time

	a: function(){
		// summary: Lowercase Ante meridiem and Post meridiem
		return this.date.getHours() >= 12 ? "pm" : "am";
	},

	b: function(){
		// summary: Uppercase Ante meridiem and Post meridiem
		return this.a().toUpperCase();
	},

	B: function(){
		// summary:
		//	Swatch Internet time
		//	A day is 1,000 beats. All time is measured from GMT + 1
		var off = this.date.getTimezoneOffset() + 60;
		var secs = (this.date.getHours() * 3600) + (this.date.getMinutes() * 60) + this.getSeconds() + (off * 60);
		var beat = Math.abs(Math.floor(secs / 86.4) % 1000) + "";
		while(beat.length <  2) beat = "0" + beat;
		return beat;
	},

	g: function(){
		// summary: 12-hour format of an hour without leading zeros
		return (this.date.getHours() > 12) ? this.date.getHours() - 12 + "" : this.date.getHours() + "";
	},

	G: function(){
		// summary: 24-hour format of an hour without leading zeros
		return this.date.getHours() + "";
	},

	h: function(){
		// summary: 12-hour format of an hour with leading zeros
		var g = this.g();
		return (g.length == 1) ? "0" + g : g;
	},

	H: function(){
		// summary: 24-hour format of an hour with leading zeros
		var G = this.G();
		return (G.length == 1) ? "0" + G : G;
	},

	i: function(){
		// summary: Minutes with leading zeros
		var mins = this.date.getMinutes() + "";
		return (mins.length == 1) ? "0" + mins : mins;
	},

	s: function(){
		// summary: Seconds, with leading zeros
		var secs = this.date.getSeconds() + "";
		return (secs.length == 1) ? "0" + secs : secs;
	},

	// Timezone

	e: function(){
		// summary: Timezone identifier (added in PHP 5.1.0)
		return dojo.date.getTimezoneName(this.date);
	},

	I: function(){
		// summary: Whether or not the date is in daylight saving time
		// TODO: Can dojo.date do this?
	},

	O: function(){
		// summary: Difference to Greenwich time (GMT) in hours
		var off = Math.abs(this.date.getTimezoneOffset());
		var hours = Math.floor(off / 60) + "";
		var mins = (off % 60) + "";
		if(hours.length == 1) hours = "0" + hours;
		if(mins.length == 1) hours = "0" + mins;
		return ((this.date.getTimezoneOffset() < 0) ? "+" : "-") + hours + mins;
	},

	P: function(){
		// summary: Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)
		var O = this.O();
		return O.substring(0, 2) + ":" + O.substring(2, 4);
	},

	T: function(){
		// summary: Timezone abbreviation

		// Guess...
		return this.e().substring(0, 3);
	},

	Z: function(){
		// summary:
		//		Timezone offset in seconds. The offset for timezones west of UTC is always negative,
		//		and for those east of UTC is always positive.
		return this.date.getTimezoneOffset() * -60;
	},

	// Full Date/Time

	c: function(){
		// summary: ISO 8601 date (added in PHP 5)
		return this.Y() + "-" + this.m() + "-" + this.d() + "T" + this.h() + ":" + this.i() + ":" + this.s() + this.P();
	},

	r: function(){
		// summary: RFC 2822 formatted date
		return this.D() + ", " + this.d() + " " + this.M() + " " + this.Y() + " " + this.H() + ":" + this.i() + ":" + this.s() + " " + this.O();
	},

	U: function(){
		// summary: Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
		return Math.floor(this.date.getTime() / 1000);
	}

});

}

if(!dojo._hasResource["dojox.dtl.utils.date"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.utils.date"] = true;
dojo.provide("dojox.dtl.utils.date");



dojox.dtl.utils.date.DateFormat = function(/*String*/ format){
	dojox.date.php.DateFormat.call(this, format);
}
dojo.extend(dojox.dtl.utils.date.DateFormat, dojox.date.php.DateFormat.prototype, {
	f: function(){
		// summary:
		//		Time, in 12-hour hours and minutes, with minutes left off if they're zero.
		// description:
		//		Examples: '1', '1:30', '2:05', '2'
		//		Proprietary extension.
		return (!this.date.getMinutes()) ? this.g() : this.g() + ":" + this.i();
	},
	N: function(){
		// summary: Month abbreviation in Associated Press style. Proprietary extension.
		return dojox.dtl.utils.date._months_ap[this.date.getMonth()];
	},
	P: function(){
		// summary:
		//		Time, in 12-hour hours, minutes and 'a.m.'/'p.m.', with minutes left off
		//		if they're zero and the strings 'midnight' and 'noon' if appropriate.
		// description:
		//		Examples: '1 a.m.', '1:30 p.m.', 'midnight', 'noon', '12:30 p.m.'
		//		Proprietary extension.
		if(!this.date.getMinutes() && !this.date.getHours()){
			return 'midnight';
		}
		if(!this.date.getMinutes() && this.date.getHours() == 12){
			return 'noon';
		}
		return this.f() + " " + this.a();
	}
});

dojo.mixin(dojox.dtl.utils.date, {
	format: function(/*Date*/ date, /*String*/ format){
		var df = new dojox.dtl.utils.date.DateFormat(format);
		return df.format(date);
	},
	timesince: function(d, now){
		// summary:
		//		Takes two datetime objects and returns the time between then and now
		//		as a nicely formatted string, e.g "10 minutes"
		// description:
		//		Adapted from http://blog.natbat.co.uk/archive/2003/Jun/14/time_since
		if(!(d instanceof Date)){
			d = new Date(d.year, d.month, d.day);
		}
		if(!now){
			now = new Date();
		}

		var delta = Math.abs(now.getTime() - d.getTime());
		for(var i = 0, chunk; chunk = dojox.dtl.utils.date._chunks[i]; i++){
			var count = Math.floor(delta / chunk[0]);
			if(count) break;
		}
		return count + " " + chunk[1](count);
	},
	_chunks: [
		[60 * 60 * 24 * 365 * 1000, function(n){ return (n == 1) ? 'year' : 'years'; }],
		[60 * 60 * 24 * 30 * 1000, function(n){ return (n == 1) ? 'month' : 'months'; }],
		[60 * 60 * 24 * 7 * 1000, function(n){ return (n == 1) ? 'week' : 'weeks'; }],
		[60 * 60 * 24 * 1000, function(n){ return (n == 1) ? 'day' : 'days'; }],
		[60 * 60 * 1000, function(n){ return (n == 1) ? 'hour' : 'hours'; }],
		[60 * 1000, function(n){ return (n == 1) ? 'minute' : 'minutes'; }]
	],
	_months_ap: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
});

}

if(!dojo._hasResource["dojox.dtl.filter.dates"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.filter.dates"] = true;
dojo.provide("dojox.dtl.filter.dates");



(function(){
	var ddfd = dojox.dtl.filter.dates;

	dojo.mixin(ddfd, {
		_toDate: function(value){
			if(value instanceof Date){
				return value;
			}
			value = new Date(value);
			if(value.getTime() == new Date(0).getTime()){
				return "";
			}
			return value;
		},
		date: function(value, arg){
			// summary: Formats a date according to the given format
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			arg = arg || "N j, Y";
			return dojox.dtl.utils.date.format(value, arg);
		},
		time: function(value, arg){
			// summary: Formats a time according to the given format
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			arg = arg || "P";
			return dojox.dtl.utils.date.format(value, arg);
		},
		timesince: function(value, arg){
			// summary: Formats a date as the time since that date (i.e. "4 days, 6 hours")
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			var timesince = dojox.dtl.utils.date.timesince;
			if(arg){
				return timesince(arg, value);
			}
			return timesince(value);
		},
		timeuntil: function(value, arg){
			// summary: Formats a date as the time until that date (i.e. "4 days, 6 hours")
			value = ddfd._toDate(value);
			if(!value){
				return "";
			}
			var timesince = dojox.dtl.utils.date.timesince;
			if(arg){
				return timesince(arg, value);
			}
			return timesince(new Date(), value);
		}
	});
})();

}

if(!dojo._hasResource["dojox.dtl.filter.htmlstrings"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.filter.htmlstrings"] = true;
dojo.provide("dojox.dtl.filter.htmlstrings");



dojo.mixin(dojox.dtl.filter.htmlstrings, {
	_linebreaksrn: /(\r\n|\n\r)/g,
	_linebreaksn: /\n{2,}/g,
	_linebreakss: /(^\s+|\s+$)/g,
	_linebreaksbr: /\n/g,
	_removetagsfind: /[a-z0-9]+/g,
	_striptags: /<[^>]*?>/g,
	linebreaks: function(value){
		// summary: Converts newlines into <p> and <br />s
		var output = [];
		var dh = dojox.dtl.filter.htmlstrings;
		value = value.replace(dh._linebreaksrn, "\n");
		var parts = value.split(dh._linebreaksn);
		for(var i = 0; i < parts.length; i++){
			var part = parts[i].replace(dh._linebreakss, "").replace(dh._linebreaksbr, "<br />");
			output.push("<p>" + part + "</p>");
		}

		return output.join("\n\n");
	},
	linebreaksbr: function(value){
		// summary: Converts newlines into <br />s
		var dh = dojox.dtl.filter.htmlstrings;
		return value.replace(dh._linebreaksrn, "\n").replace(dh._linebreaksbr, "<br />");
	},
	removetags: function(value, arg){
		// summary: Removes a space separated list of [X]HTML tags from the output"
		var dh = dojox.dtl.filter.htmlstrings;
		var tags = [];
		var group;
		while(group = dh._removetagsfind.exec(arg)){
			tags.push(group[0]);
		}
		tags = "(" + tags.join("|") + ")";
		return value.replace(new RegExp("</?\s*" + tags + "\s*[^>]*>", "gi"), "");
	},
	striptags: function(value){
		// summary: Strips all [X]HTML tags
		return value.replace(dojox.dtl.filter.htmlstrings._striptags, "");
	}
});

}

if(!dojo._hasResource["dojox.string.sprintf"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.string.sprintf"] = true;
dojo.provide("dojox.string.sprintf");



dojox.string.sprintf = function(/*String*/ format, /*mixed...*/ filler){
	for(var args = [], i = 1; i < arguments.length; i++){
		args.push(arguments[i]);
	}
	var formatter = new dojox.string.sprintf.Formatter(format);
	return formatter.format.apply(formatter, args);
}

dojox.string.sprintf.Formatter = function(/*String*/ format){
	var tokens = [];
	this._mapped = false;
	this._format = format;
	this._tokens = dojox.string.tokenize(format, this._re, this._parseDelim, this);
}
dojo.extend(dojox.string.sprintf.Formatter, {
	_re: /\%(?:\(([\w_]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%scdeEfFgGiouxX])/g,
	_parseDelim: function(mapping, intmapping, flags, minWidth, period, precision, specifier){
		if(mapping){
			this._mapped = true;
		}
		return {
			mapping: mapping,
			intmapping: intmapping,
			flags: flags,
			_minWidth: minWidth, // May be dependent on parameters
			period: period,
			_precision: precision, // May be dependent on parameters
			specifier: specifier
		};
	},
	_specifiers: {
		b: {
			base: 2,
			isInt: true
		},
		o: {
			base: 8,
			isInt: true
		},
		x: {
			base: 16,
			isInt: true
		},
		X: {
			extend: ["x"],
			toUpper: true
		},
		d: {
			base: 10,
			isInt: true
		},
		i: {
			extend: ["d"]
		},
		u: {
			extend: ["d"],
			isUnsigned: true
		},
		c: {
			setArg: function(token){
				if(!isNaN(token.arg)){
					var num = parseInt(token.arg);
					if(num < 0 || num > 127){
						throw new Error("invalid character code passed to %c in sprintf");
					}
					token.arg = isNaN(num) ? "" + num : String.fromCharCode(num);
				}
			}
		},
		s: {
			setMaxWidth: function(token){
				token.maxWidth = (token.period == ".") ? token.precision : -1;
			}
		},
		e: {
			isDouble: true,
			doubleNotation: "e"
		},
		E: {
			extend: ["e"],
			toUpper: true
		},
		f: {
			isDouble: true,
			doubleNotation: "f"
		},
		F: {
			extend: ["f"]
		},
		g: {
			isDouble: true,
			doubleNotation: "g"
		},
		G: {
			extend: ["g"],
			toUpper: true
		}
	},
	format: function(/*mixed...*/ filler){
		if(this._mapped && typeof filler != "object"){
			throw new Error("format requires a mapping");
		}

		var str = "";
		var position = 0;
		for(var i = 0, token; i < this._tokens.length; i++){
			token = this._tokens[i];
			if(typeof token == "string"){
				str += token;
			}else{
				if(this._mapped){
					if(typeof filler[token.mapping] == "undefined"){
						throw new Error("missing key " + token.mapping);
					}
					token.arg = filler[token.mapping];
				}else{
					if(token.intmapping){
						var position = parseInt(token.intmapping) - 1;
					}
					if(position >= arguments.length){
						throw new Error("got " + arguments.length + " printf arguments, insufficient for '" + this._format + "'");
					}
					token.arg = arguments[position++];
				}

				if(!token.compiled){
					token.compiled = true;
					token.sign = "";
					token.zeroPad = false;
					token.rightJustify = false;
					token.alternative = false;

					var flags = {};
					for(var fi = token.flags.length; fi--;){
						var flag = token.flags.charAt(fi);
						flags[flag] = true;
						switch(flag){
							case " ":
								token.sign = " ";
								break;
							case "+":
								token.sign = "+";
								break;
							case "0":
								token.zeroPad = (flags["-"]) ? false : true;
								break;
							case "-":
								token.rightJustify = true;
								token.zeroPad = false;
								break;
							case "\#":
								token.alternative = true;
								break;
							default:
								throw Error("bad formatting flag '" + token.flags.charAt(fi) + "'");
						}
					}

					token.minWidth = (token._minWidth) ? parseInt(token._minWidth) : 0;
					token.maxWidth = -1;
					token.toUpper = false;
					token.isUnsigned = false;
					token.isInt = false;
					token.isDouble = false;
					token.precision = 1;
					if(token.period == '.'){
						if(token._precision){
							token.precision = parseInt(token._precision);
						}else{
							token.precision = 0;
						}
					}

					var mixins = this._specifiers[token.specifier];
					if(typeof mixins == "undefined"){
						throw new Error("unexpected specifier '" + token.specifier + "'");
					}
					if(mixins.extend){
						dojo.mixin(mixins, this._specifiers[mixins.extend]);
						delete mixins.extend;
					}
					dojo.mixin(token, mixins);
				}

				if(typeof token.setArg == "function"){
					token.setArg(token);
				}

				if(typeof token.setMaxWidth == "function"){
					token.setMaxWidth(token);
				}

				if(token._minWidth == "*"){
					if(this._mapped){
						throw new Error("* width not supported in mapped formats");
					}
					token.minWidth = parseInt(arguments[position++]);
					if(isNaN(token.minWidth)){
						throw new Error("the argument for * width at position " + position + " is not a number in " + this._format);
					}
					// negative width means rightJustify
					if (token.minWidth < 0) {
						token.rightJustify = true;
						token.minWidth = -token.minWidth;
					}
				}

				if(token._precision == "*" && token.period == "."){
					if(this._mapped){
						throw new Error("* precision not supported in mapped formats");
					}
					token.precision = parseInt(arguments[position++]);
					if(isNaN(token.precision)){
						throw Error("the argument for * precision at position " + position + " is not a number in " + this._format);
					}
					// negative precision means unspecified
					if (token.precision < 0) {
						token.precision = 1;
						token.period = '';
					}
				}

				if(token.isInt){
					// a specified precision means no zero padding
					if(token.period == '.'){
						token.zeroPad = false;
					}
					this.formatInt(token);
				}else if(token.isDouble){
					if(token.period != '.'){
						token.precision = 6;
					}
					this.formatDouble(token);
				}
				this.fitField(token);

				str += "" + token.arg;
			}
		}

		return str;
	},
	_zeros10: '0000000000',
	_spaces10: '          ',
	formatInt: function(token) {
		var i = parseInt(token.arg);
		if(!isFinite(i)){ // isNaN(f) || f == Number.POSITIVE_INFINITY || f == Number.NEGATIVE_INFINITY)
			// allow this only if arg is number
			if(typeof token.arg != "number"){
				throw new Error("format argument '" + token.arg + "' not an integer; parseInt returned " + i);
			}
			//return '' + i;
			i = 0;
		}

		// if not base 10, make negatives be positive
		// otherwise, (-10).toString(16) is '-a' instead of 'fffffff6'
		if(i < 0 && (token.isUnsigned || token.base != 10)){
			i = 0xffffffff + i + 1;
		}

		if(i < 0){
			token.arg = (- i).toString(token.base);
			this.zeroPad(token);
			token.arg = "-" + token.arg;
		}else{
			token.arg = i.toString(token.base);
			// need to make sure that argument 0 with precision==0 is formatted as ''
			if(!i && !token.precision){
				token.arg = "";
			}else{
				this.zeroPad(token);
			}
			if(token.sign){
				token.arg = token.sign + token.arg;
			}
		}
		if(token.base == 16){
			if(token.alternative){
				token.arg = '0x' + token.arg;
			}
			token.arg = token.toUpper ? token.arg.toUpperCase() : token.arg.toLowerCase();
		}
		if(token.base == 8){
			if(token.alternative && token.arg.charAt(0) != '0'){
				token.arg = '0' + token.arg;
			}
		}
	},
	formatDouble: function(token) {
		var f = parseFloat(token.arg);
		if(!isFinite(f)){ // isNaN(f) || f == Number.POSITIVE_INFINITY || f == Number.NEGATIVE_INFINITY)
			// allow this only if arg is number
			if(typeof token.arg != "number"){
				throw new Error("format argument '" + token.arg + "' not a float; parseFloat returned " + f);
			}
			// C99 says that for 'f':
			//   infinity -> '[-]inf' or '[-]infinity' ('[-]INF' or '[-]INFINITY' for 'F')
			//   NaN -> a string  starting with 'nan' ('NAN' for 'F')
			// this is not commonly implemented though.
			//return '' + f;
			f = 0;
		}

		switch(token.doubleNotation) {
			case 'e': {
				token.arg = f.toExponential(token.precision);
				break;
			}
			case 'f': {
				token.arg = f.toFixed(token.precision);
				break;
			}
			case 'g': {
				// C says use 'e' notation if exponent is < -4 or is >= prec
				// ECMAScript for toPrecision says use exponential notation if exponent is >= prec,
				// though step 17 of toPrecision indicates a test for < -6 to force exponential.
				if(Math.abs(f) < 0.0001){
					//print("forcing exponential notation for f=" + f);
					token.arg = f.toExponential(token.precision > 0 ? token.precision - 1 : token.precision);
				}else{
					token.arg = f.toPrecision(token.precision);
				}

				// In C, unlike 'f', 'gG' removes trailing 0s from fractional part, unless alternative format flag ("#").
				// But ECMAScript formats toPrecision as 0.00100000. So remove trailing 0s.
				if(!token.alternative){
					//print("replacing trailing 0 in '" + s + "'");
					token.arg = token.arg.replace(/(\..*[^0])0*/, "$1");
					// if fractional part is entirely 0, remove it and decimal point
					token.arg = token.arg.replace(/\.0*e/, 'e').replace(/\.0$/,'');
				}
				break;
			}
			default: throw new Error("unexpected double notation '" + token.doubleNotation + "'");
		}

		// C says that exponent must have at least two digits.
		// But ECMAScript does not; toExponential results in things like "1.000000e-8" and "1.000000e+8".
		// Note that s.replace(/e([\+\-])(\d)/, "e$10$2") won't work because of the "$10" instead of "$1".
		// And replace(re, func) isn't supported on IE50 or Safari1.
		token.arg = token.arg.replace(/e\+(\d)$/, "e+0$1").replace(/e\-(\d)$/, "e-0$1");

		// Ensure a '0' before the period.
		// Opera implements (0.001).toString() as '0.001', but (0.001).toFixed(1) is '.001'
		if(dojo.isOpera){
			token.arg = token.arg.replace(/^\./, '0.');
		}

		// if alt, ensure a decimal point
		if(token.alternative){
			token.arg = token.arg.replace(/^(\d+)$/,"$1.");
			token.arg = token.arg.replace(/^(\d+)e/,"$1.e");
		}

		if(f >= 0 && token.sign){
			token.arg = token.sign + token.arg;
		}

		token.arg = token.toUpper ? token.arg.toUpperCase() : token.arg.toLowerCase();
	},
	zeroPad: function(token, /*Int*/ length) {
		length = (arguments.length == 2) ? length : token.precision;
		if(typeof token.arg != "string"){
			token.arg = "" + token.arg;
		}

		var tenless = length - 10;
		while(token.arg.length < tenless){
			token.arg = (token.rightJustify) ? token.arg + this._zeros10 : this._zeros10 + token.arg;
		}
		var pad = length - token.arg.length;
		token.arg = (token.rightJustify) ? token.arg + this._zeros10.substring(0, pad) : this._zeros10.substring(0, pad) + token.arg;
	},
	fitField: function(token) {
		if(token.maxWidth >= 0 && token.arg.length > token.maxWidth){
			return token.arg.substring(0, token.maxWidth);
		}
		if(token.zeroPad){
			this.zeroPad(token, token.minWidth);
			return;
		}
		this.spacePad(token);
	},
	spacePad: function(token, /*Int*/ length) {
		length = (arguments.length == 2) ? length : token.minWidth;
		if(typeof token.arg != 'string'){
			token.arg = '' + token.arg;
		}

		var tenless = length - 10;
		while(token.arg.length < tenless){
			token.arg = (token.rightJustify) ? token.arg + this._spaces10 : this._spaces10 + token.arg;
		}
		var pad = length - token.arg.length;
		token.arg = (token.rightJustify) ? token.arg + this._spaces10.substring(0, pad) : this._spaces10.substring(0, pad) + token.arg;
	}
});

}

if(!dojo._hasResource["dojox.dtl.filter.strings"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.filter.strings"] = true;
dojo.provide("dojox.dtl.filter.strings");





dojo.mixin(dojox.dtl.filter.strings, {
	_urlquote: function(/*String*/ url, /*String?*/ safe){
		if(!safe){
			safe = "/";
		}
		return dojox.string.tokenize(url, /([^\w-_.])/g, function(token){
			if(safe.indexOf(token) == -1){
				if(token == " "){
					return "+";
				}else{
					return "%" + token.charCodeAt(0).toString(16).toUpperCase();
				}
			}
			return token;
		}).join("");
	},
	addslashes: function(value){
		// summary: Adds slashes - useful for passing strings to JavaScript, for example.
		return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/'/g, "\\'");
	},
	capfirst: function(value){
		// summary: Capitalizes the first character of the value
		value = "" + value;
		return value.charAt(0).toUpperCase() + value.substring(1);
	},
	center: function(value, arg){
		// summary: Centers the value in a field of a given width
		arg = arg || value.length;
		value = value + "";
		var diff = arg - value.length;
		if(diff % 2){
			value = value + " ";
			diff -= 1;
		}
		for(var i = 0; i < diff; i += 2){
			value = " " + value + " ";
		}
		return value;
	},
	cut: function(value, arg){
		// summary: Removes all values of arg from the given string
		arg = arg + "" || "";
		value = value + "";
		return value.replace(new RegExp(arg, "g"), "");
	},
	_fix_ampersands: /&(?!(\w+|#\d+);)/g,
	fix_ampersands: function(value){
		// summary: Replaces ampersands with ``&amp;`` entities
		return value.replace(dojox.dtl.filter.strings._fix_ampersands, "&amp;");
	},
	floatformat: function(value, arg){
		// summary: Format a number according to arg
		// description:
		//		If called without an argument, displays a floating point
		//		number as 34.2 -- but only if there's a point to be displayed.
		//		With a positive numeric argument, it displays that many decimal places
		//		always.
		//		With a negative numeric argument, it will display that many decimal
		//		places -- but only if there's places to be displayed.
		arg = parseInt(arg || -1, 10);
		value = parseFloat(value);
		var m = value - value.toFixed(0);
		if(!m && arg < 0){
			return value.toFixed();
		}
		value = value.toFixed(Math.abs(arg));
		return (arg < 0) ? parseFloat(value) + "" : value;
	},
	iriencode: function(value){
		return dojox.dtl.filter.strings._urlquote(value, "/#%[]=:;$&()+,!");
	},
	linenumbers: function(value){
		// summary: Displays text with line numbers
		var df = dojox.dtl.filter;
		var lines = value.split("\n");
		var output = [];
		var width = (lines.length + "").length;
		for(var i = 0, line; i < lines.length; i++){
			line = lines[i];
			output.push(df.strings.ljust(i + 1, width) + ". " + dojox.dtl._base.escape(line));
		}
		return output.join("\n");
	},
	ljust: function(value, arg){
		value = value + "";
		arg = parseInt(arg, 10);
		while(value.length < arg){
			value = value + " ";
		}
		return value;
	},
	lower: function(value){
		// summary: Converts a string into all lowercase
		return (value + "").toLowerCase();
	},
	make_list: function(value){
		// summary:
		//		Returns the value turned into a list. For an integer, it's a list of
		//		digits. For a string, it's a list of characters.
		var output = [];
		if(typeof value == "number"){
			value = value + "";
		}
		if(value.charAt){
			for(var i = 0; i < value.length; i++){
				output.push(value.charAt(i));
			}
			return output;
		}
		if(typeof value == "object"){
			for(var key in value){
				output.push(value[key]);
			}
			return output;
		}
		return [];
	},
	rjust: function(value, arg){
		value = value + "";
		arg = parseInt(arg, 10);
		while(value.length < arg){
			value = " " + value;
		}
		return value;
	},
	slugify: function(value){
		// summary: Converts to lowercase, removes
		//		non-alpha chars and converts spaces to hyphens
		value = value.replace(/[^\w\s-]/g, "").toLowerCase();
		return value.replace(/[\-\s]+/g, "-");
	},
	_strings: {},
	stringformat: function(value, arg){
		// summary:
		//		Formats the variable according to the argument, a string formatting specifier.
		//		This specifier uses Python string formating syntax, with the exception that
		//		the leading "%" is dropped.
		arg = "" + arg;
		var strings = dojox.dtl.filter.strings._strings;
		if(!strings[arg]){
			strings[arg] = new dojox.string.sprintf.Formatter("%" + arg);
		}
		return strings[arg].format(value);
	},
	title: function(value){
		// summary: Converts a string into titlecase
		var last, title = "";
		for(var i = 0, current; i < value.length; i++){
			current = value.charAt(i);
			if(last == " " || last == "\n" || last == "\t" || !last){
				title += current.toUpperCase();
			}else{
				title += current.toLowerCase();
			}
			last = current;
		}
		return title;
	},
	_truncatewords: /[ \n\r\t]/,
	truncatewords: function(value, arg){
		// summary: Truncates a string after a certain number of words
		// arg: Integer
		//		Number of words to truncate after
		arg = parseInt(arg, 10);
		if(!arg){
			return value;
		}

		for(var i = 0, j = value.length, count = 0, current, last; i < value.length; i++){
			current = value.charAt(i);
			if(dojox.dtl.filter.strings._truncatewords.test(last)){
				if(!dojox.dtl.filter.strings._truncatewords.test(current)){
					++count;
					if(count == arg){
						return value.substring(0, j + 1);
					}
				}
			}else if(!dojox.dtl.filter.strings._truncatewords.test(current)){
				j = i;
			}
			last = current;
		}
		return value;
	},
	_truncate_words: /(&.*?;|<.*?>|(\w[\w\-]*))/g,
	_truncate_tag: /<(\/)?([^ ]+?)(?: (\/)| .*?)?>/,
	_truncate_singlets: { br: true, col: true, link: true, base: true, img: true, param: true, area: true, hr: true, input: true },
	truncatewords_html: function(value, arg){
		arg = parseInt(arg, 10);

		if(arg <= 0){
			return "";
		}

		var strings = dojox.dtl.filter.strings;
		var words = 0;
		var open = [];

		var output = dojox.string.tokenize(value, strings._truncate_words, function(all, word){
			if(word){
				// It's an actual non-HTML word
				++words;
				if(words < arg){
					return word;
				}else if(words == arg){
					return word + " ...";
				}
			}
			// Check for tag
			var tag = all.match(strings._truncate_tag);
			if(!tag || words >= arg){
				// Don't worry about non tags or tags after our truncate point
				return;
			}
			var closing = tag[1];
			var tagname = tag[2].toLowerCase();
			var selfclosing = tag[3];
			if(closing || strings._truncate_singlets[tagname]){
			}else if(closing){
				var i = dojo.indexOf(open, tagname);
				if(i != -1){
					open = open.slice(i + 1);
				}
			}else{
				open.unshift(tagname);
			}
			return all;
		}).join("");

		output = output.replace(/\s+$/g, "");

		for(var i = 0, tag; tag = open[i]; i++){
			output += "</" + tag + ">";
		}

		return output;
	},
	upper: function(value){
		return value.toUpperCase();
	},
	urlencode: function(value){
		return dojox.dtl.filter.strings._urlquote(value);
	},
	_urlize: /^((?:[(>]|&lt;)*)(.*?)((?:[.,)>\n]|&gt;)*)$/,
	_urlize2: /^\S+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/,
	urlize: function(value){
		return dojox.dtl.filter.strings.urlizetrunc(value);
	},
	urlizetrunc: function(value, arg){
		arg = parseInt(arg);
		return dojox.string.tokenize(value, /(\S+)/g, function(word){
			var matches = dojox.dtl.filter.strings._urlize.exec(word);
			if(!matches){
				return word;
			}
			var lead = matches[1];
			var middle = matches[2];
			var trail = matches[3];

			var startsWww = middle.indexOf("www.") == 0;
			var hasAt = middle.indexOf("@") != -1;
			var hasColon = middle.indexOf(":") != -1;
			var startsHttp = middle.indexOf("http://") == 0;
			var startsHttps = middle.indexOf("https://") == 0;
			var firstAlpha = /[a-zA-Z0-9]/.test(middle.charAt(0));
			var last4 = middle.substring(middle.length - 4);

			var trimmed = middle;
			if(arg > 3){
				trimmed = trimmed.substring(0, arg - 3) + "...";
			}

			if(startsWww || (!hasAt && !startsHttp && middle.length && firstAlpha && (last4 == ".org" || last4 == ".net" || last4 == ".com"))){
				return '<a href="http://' + middle + '" rel="nofollow">' + trimmed + '</a>';
			}else if(startsHttp || startsHttps){
				return '<a href="' + middle + '" rel="nofollow">' + trimmed + '</a>';
			}else if(hasAt && !startsWww && !hasColon && dojox.dtl.filter.strings._urlize2.test(middle)){
				return '<a href="mailto:' + middle + '">' + middle + '</a>';
			}
			return word;
		}).join("");
	},
	wordcount: function(value){
		value = dojo.trim(value);
		if(!value){ return 0; }
		return value.split(/\s+/g).length;
	},
	wordwrap: function(value, arg){
		arg = parseInt(arg);
		// summary: Wraps words at specified line length
		var output = [];
		var parts = value.split(/\s+/g);
		if(parts.length){
			var word = parts.shift();
			output.push(word);
			var pos = word.length - word.lastIndexOf("\n") - 1;
			for(var i = 0; i < parts.length; i++){
				word = parts[i];
				if(word.indexOf("\n") != -1){
					var lines = word.split(/\n/g);
				}else{
					var lines = [word];
				}
				pos += lines[0].length + 1;
				if(arg && pos > arg){
					output.push("\n");
					pos = lines[lines.length - 1].length;
				}else{
					output.push(" ");
					if(lines.length > 1){
						pos = lines[lines.length - 1].length;
					}
				}
				output.push(word);
			}
		}
		return output.join("");
	}
});

}

if(!dojo._hasResource["dojo.fx.Toggler"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.fx.Toggler"] = true;
dojo.provide("dojo.fx.Toggler");


dojo.declare("dojo.fx.Toggler", null, {
	// summary:
	//		A simple `dojo.Animation` toggler API.
	//
	// description:
	//		class constructor for an animation toggler. It accepts a packed
	//		set of arguments about what type of animation to use in each
	//		direction, duration, etc. All available members are mixed into
	//		these animations from the constructor (for example, `node`,
	//		`showDuration`, `hideDuration`).
	//
	// example:
	//	|	var t = new dojo.fx.Toggler({
	//	|		node: "nodeId",
	//	|		showDuration: 500,
	//	|		// hideDuration will default to "200"
	//	|		showFunc: dojo.fx.wipeIn,
	//	|		// hideFunc will default to "fadeOut"
	//	|	});
	//	|	t.show(100); // delay showing for 100ms
	//	|	// ...time passes...
	//	|	t.hide();

	// node: DomNode
	//		the node to target for the showing and hiding animations
	node: null,

	// showFunc: Function
	//		The function that returns the `dojo.Animation` to show the node
	showFunc: dojo.fadeIn,

	// hideFunc: Function
	//		The function that returns the `dojo.Animation` to hide the node
	hideFunc: dojo.fadeOut,

	// showDuration:
	//		Time in milliseconds to run the show Animation
	showDuration: 200,

	// hideDuration:
	//		Time in milliseconds to run the hide Animation
	hideDuration: 200,

	// FIXME: need a policy for where the toggler should "be" the next
	// time show/hide are called if we're stopped somewhere in the
	// middle.
	// FIXME: also would be nice to specify individual showArgs/hideArgs mixed into
	// each animation individually.
	// FIXME: also would be nice to have events from the animations exposed/bridged

	/*=====
	_showArgs: null,
	_showAnim: null,

	_hideArgs: null,
	_hideAnim: null,

	_isShowing: false,
	_isHiding: false,
	=====*/

	constructor: function(args){
		var _t = this;

		dojo.mixin(_t, args);
		_t.node = args.node;
		_t._showArgs = dojo.mixin({}, args);
		_t._showArgs.node = _t.node;
		_t._showArgs.duration = _t.showDuration;
		_t.showAnim = _t.showFunc(_t._showArgs);

		_t._hideArgs = dojo.mixin({}, args);
		_t._hideArgs.node = _t.node;
		_t._hideArgs.duration = _t.hideDuration;
		_t.hideAnim = _t.hideFunc(_t._hideArgs);

		dojo.connect(_t.showAnim, "beforeBegin", dojo.hitch(_t.hideAnim, "stop", true));
		dojo.connect(_t.hideAnim, "beforeBegin", dojo.hitch(_t.showAnim, "stop", true));
	},

	show: function(delay){
		// summary: Toggle the node to showing
		// delay: Integer?
		//		Ammount of time to stall playing the show animation
		return this.showAnim.play(delay || 0);
	},

	hide: function(delay){
		// summary: Toggle the node to hidden
		// delay: Integer?
		//		Ammount of time to stall playing the hide animation
		return this.hideAnim.play(delay || 0);
	}
});

}

if(!dojo._hasResource["dojo.fx"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.fx"] = true;
dojo.provide("dojo.fx");



/*=====
dojo.fx = {
	// summary: Effects library on top of Base animations
};
=====*/
(function(){
	
	var d = dojo,
		_baseObj = {
			_fire: function(evt, args){
				if(this[evt]){
					this[evt].apply(this, args||[]);
				}
				return this;
			}
		};

	var _chain = function(animations){
		this._index = -1;
		this._animations = animations||[];
		this._current = this._onAnimateCtx = this._onEndCtx = null;

		this.duration = 0;
		d.forEach(this._animations, function(a){
			this.duration += a.duration;
			if(a.delay){ this.duration += a.delay; }
		}, this);
	};
	d.extend(_chain, {
		_onAnimate: function(){
			this._fire("onAnimate", arguments);
		},
		_onEnd: function(){
			d.disconnect(this._onAnimateCtx);
			d.disconnect(this._onEndCtx);
			this._onAnimateCtx = this._onEndCtx = null;
			if(this._index + 1 == this._animations.length){
				this._fire("onEnd");
			}else{
				// switch animations
				this._current = this._animations[++this._index];
				this._onAnimateCtx = d.connect(this._current, "onAnimate", this, "_onAnimate");
				this._onEndCtx = d.connect(this._current, "onEnd", this, "_onEnd");
				this._current.play(0, true);
			}
		},
		play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
			if(!this._current){ this._current = this._animations[this._index = 0]; }
			if(!gotoStart && this._current.status() == "playing"){ return this; }
			var beforeBegin = d.connect(this._current, "beforeBegin", this, function(){
					this._fire("beforeBegin");
				}),
				onBegin = d.connect(this._current, "onBegin", this, function(arg){
					this._fire("onBegin", arguments);
				}),
				onPlay = d.connect(this._current, "onPlay", this, function(arg){
					this._fire("onPlay", arguments);
					d.disconnect(beforeBegin);
					d.disconnect(onBegin);
					d.disconnect(onPlay);
				});
			if(this._onAnimateCtx){
				d.disconnect(this._onAnimateCtx);
			}
			this._onAnimateCtx = d.connect(this._current, "onAnimate", this, "_onAnimate");
			if(this._onEndCtx){
				d.disconnect(this._onEndCtx);
			}
			this._onEndCtx = d.connect(this._current, "onEnd", this, "_onEnd");
			this._current.play.apply(this._current, arguments);
			return this;
		},
		pause: function(){
			if(this._current){
				var e = d.connect(this._current, "onPause", this, function(arg){
						this._fire("onPause", arguments);
						d.disconnect(e);
					});
				this._current.pause();
			}
			return this;
		},
		gotoPercent: function(/*Decimal*/percent, /*Boolean?*/ andPlay){
			this.pause();
			var offset = this.duration * percent;
			this._current = null;
			d.some(this._animations, function(a){
				if(a.duration <= offset){
					this._current = a;
					return true;
				}
				offset -= a.duration;
				return false;
			});
			if(this._current){
				this._current.gotoPercent(offset / this._current.duration, andPlay);
			}
			return this;
		},
		stop: function(/*boolean?*/ gotoEnd){
			if(this._current){
				if(gotoEnd){
					for(; this._index + 1 < this._animations.length; ++this._index){
						this._animations[this._index].stop(true);
					}
					this._current = this._animations[this._index];
				}
				var e = d.connect(this._current, "onStop", this, function(arg){
						this._fire("onStop", arguments);
						d.disconnect(e);
					});
				this._current.stop();
			}
			return this;
		},
		status: function(){
			return this._current ? this._current.status() : "stopped";
		},
		destroy: function(){
			if(this._onAnimateCtx){ d.disconnect(this._onAnimateCtx); }
			if(this._onEndCtx){ d.disconnect(this._onEndCtx); }
		}
	});
	d.extend(_chain, _baseObj);

	dojo.fx.chain = function(/*dojo.Animation[]*/ animations){
		// summary:
		//		Chain a list of `dojo.Animation`s to run in sequence
		//
		// description:
		//		Return a `dojo.Animation` which will play all passed
		//		`dojo.Animation` instances in sequence, firing its own
		//		synthesized events simulating a single animation. (eg:
		//		onEnd of this animation means the end of the chain,
		//		not the individual animations within)
		//
		// example:
		//	Once `node` is faded out, fade in `otherNode`
		//	|	dojo.fx.chain([
		//	|		dojo.fadeIn({ node:node }),
		//	|		dojo.fadeOut({ node:otherNode })
		//	|	]).play();
		//
		return new _chain(animations) // dojo.Animation
	};

	var _combine = function(animations){
		this._animations = animations||[];
		this._connects = [];
		this._finished = 0;

		this.duration = 0;
		d.forEach(animations, function(a){
			var duration = a.duration;
			if(a.delay){ duration += a.delay; }
			if(this.duration < duration){ this.duration = duration; }
			this._connects.push(d.connect(a, "onEnd", this, "_onEnd"));
		}, this);
		
		this._pseudoAnimation = new d.Animation({curve: [0, 1], duration: this.duration});
		var self = this;
		d.forEach(["beforeBegin", "onBegin", "onPlay", "onAnimate", "onPause", "onStop", "onEnd"],
			function(evt){
				self._connects.push(d.connect(self._pseudoAnimation, evt,
					function(){ self._fire(evt, arguments); }
				));
			}
		);
	};
	d.extend(_combine, {
		_doAction: function(action, args){
			d.forEach(this._animations, function(a){
				a[action].apply(a, args);
			});
			return this;
		},
		_onEnd: function(){
			if(++this._finished > this._animations.length){
				this._fire("onEnd");
			}
		},
		_call: function(action, args){
			var t = this._pseudoAnimation;
			t[action].apply(t, args);
		},
		play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
			this._finished = 0;
			this._doAction("play", arguments);
			this._call("play", arguments);
			return this;
		},
		pause: function(){
			this._doAction("pause", arguments);
			this._call("pause", arguments);
			return this;
		},
		gotoPercent: function(/*Decimal*/percent, /*Boolean?*/ andPlay){
			var ms = this.duration * percent;
			d.forEach(this._animations, function(a){
				a.gotoPercent(a.duration < ms ? 1 : (ms / a.duration), andPlay);
			});
			this._call("gotoPercent", arguments);
			return this;
		},
		stop: function(/*boolean?*/ gotoEnd){
			this._doAction("stop", arguments);
			this._call("stop", arguments);
			return this;
		},
		status: function(){
			return this._pseudoAnimation.status();
		},
		destroy: function(){
			d.forEach(this._connects, dojo.disconnect);
		}
	});
	d.extend(_combine, _baseObj);

	dojo.fx.combine = function(/*dojo.Animation[]*/ animations){
		// summary:
		//		Combine a list of `dojo.Animation`s to run in parallel
		//
		// description:
		//		Combine an array of `dojo.Animation`s to run in parallel,
		//		providing a new `dojo.Animation` instance encompasing each
		//		animation, firing standard animation events.
		//
		// example:
		//	Fade out `node` while fading in `otherNode` simultaneously
		//	|	dojo.fx.combine([
		//	|		dojo.fadeIn({ node:node }),
		//	|		dojo.fadeOut({ node:otherNode })
		//	|	]).play();
		//
		// example:
		//	When the longest animation ends, execute a function:
		//	|	var anim = dojo.fx.combine([
		//	|		dojo.fadeIn({ node: n, duration:700 }),
		//	|		dojo.fadeOut({ node: otherNode, duration: 300 })
		//	|	]);
		//	|	dojo.connect(anim, "onEnd", function(){
		//	|		// overall animation is done.
		//	|	});
		//	|	anim.play(); // play the animation
		//
		return new _combine(animations); // dojo.Animation
	};

	dojo.fx.wipeIn = function(/*Object*/ args){
		// summary:
		//		Expand a node to it's natural height.
		//
		// description:
		//		Returns an animation that will expand the
		//		node defined in 'args' object from it's current height to
		//		it's natural height (with no scrollbar).
		//		Node must have no margin/border/padding.
		//
		// args: Object
		//		A hash-map of standard `dojo.Animation` constructor properties
		//		(such as easing: node: duration: and so on)
		//
		// example:
		//	|	dojo.fx.wipeIn({
		//	|		node:"someId"
		//	|	}).play()
		var node = args.node = d.byId(args.node), s = node.style, o;

		var anim = d.animateProperty(d.mixin({
			properties: {
				height: {
					// wrapped in functions so we wait till the last second to query (in case value has changed)
					start: function(){
						// start at current [computed] height, but use 1px rather than 0
						// because 0 causes IE to display the whole panel
						o = s.overflow;
						s.overflow = "hidden";
						if(s.visibility == "hidden" || s.display == "none"){
							s.height = "1px";
							s.display = "";
							s.visibility = "";
							return 1;
						}else{
							var height = d.style(node, "height");
							return Math.max(height, 1);
						}
					},
					end: function(){
						return node.scrollHeight;
					}
				}
			}
		}, args));

		d.connect(anim, "onEnd", function(){
			s.height = "auto";
			s.overflow = o;
		});

		return anim; // dojo.Animation
	};

	dojo.fx.wipeOut = function(/*Object*/ args){
		// summary:
		//		Shrink a node to nothing and hide it.
		//
		// description:
		//		Returns an animation that will shrink node defined in "args"
		//		from it's current height to 1px, and then hide it.
		//
		// args: Object
		//		A hash-map of standard `dojo.Animation` constructor properties
		//		(such as easing: node: duration: and so on)
		//
		// example:
		//	|	dojo.fx.wipeOut({ node:"someId" }).play()
		
		var node = args.node = d.byId(args.node), s = node.style, o;
		
		var anim = d.animateProperty(d.mixin({
			properties: {
				height: {
					end: 1 // 0 causes IE to display the whole panel
				}
			}
		}, args));

		d.connect(anim, "beforeBegin", function(){
			o = s.overflow;
			s.overflow = "hidden";
			s.display = "";
		});
		d.connect(anim, "onEnd", function(){
			s.overflow = o;
			s.height = "auto";
			s.display = "none";
		});

		return anim; // dojo.Animation
	};

	dojo.fx.slideTo = function(/*Object*/ args){
		// summary:
		//		Slide a node to a new top/left position
		//
		// description:
		//		Returns an animation that will slide "node"
		//		defined in args Object from its current position to
		//		the position defined by (args.left, args.top).
		//
		// args: Object
		//		A hash-map of standard `dojo.Animation` constructor properties
		//		(such as easing: node: duration: and so on). Special args members
		//		are `top` and `left`, which indicate the new position to slide to.
		//
		// example:
		//	|	dojo.fx.slideTo({ node: node, left:"40", top:"50", units:"px" }).play()

		var node = args.node = d.byId(args.node),
			top = null, left = null;

		var init = (function(n){
			return function(){
				var cs = d.getComputedStyle(n);
				var pos = cs.position;
				top = (pos == 'absolute' ? n.offsetTop : parseInt(cs.top) || 0);
				left = (pos == 'absolute' ? n.offsetLeft : parseInt(cs.left) || 0);
				if(pos != 'absolute' && pos != 'relative'){
					var ret = d.position(n, true);
					top = ret.y;
					left = ret.x;
					n.style.position="absolute";
					n.style.top=top+"px";
					n.style.left=left+"px";
				}
			};
		})(node);
		init();

		var anim = d.animateProperty(d.mixin({
			properties: {
				top: args.top || 0,
				left: args.left || 0
			}
		}, args));
		d.connect(anim, "beforeBegin", anim, init);

		return anim; // dojo.Animation
	};

})();

}

if(!dojo._hasResource["dojox.highlight._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight._base"] = true;
dojo.provide("dojox.highlight._base");
/*=====
	dojox.highlight = {
		//	summary:
		//		Syntax highlighting with language auto-detection package
		//
		//	description:
		//
		//		Syntax highlighting with language auto-detection package.
		//		Released under CLA by the Dojo Toolkit, original BSD release
		//		available from: http://softwaremaniacs.org/soft/highlight/
		//
		//
	};
=====*/

;(function(){
	var dh = dojox.highlight,
		C_NUMBER_RE = '\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)';
	
	// constants

	dh.constants = {
		IDENT_RE: '[a-zA-Z][a-zA-Z0-9_]*',
		UNDERSCORE_IDENT_RE: '[a-zA-Z_][a-zA-Z0-9_]*',
		NUMBER_RE: '\\b\\d+(\\.\\d+)?',
		C_NUMBER_RE: C_NUMBER_RE,
		// Common modes
		APOS_STRING_MODE: {
			className: 'string',
			begin: '\'', end: '\'',
			illegal: '\\n',
			contains: ['escape'],
			relevance: 0
		},
		QUOTE_STRING_MODE: {
			className: 'string',
			begin: '"',
			end: '"',
			illegal: '\\n',
			contains: ['escape'],
			relevance: 0
		},
		BACKSLASH_ESCAPE: {
			className: 'escape',
			begin: '\\\\.', end: '^',
			relevance: 0
		},
		C_LINE_COMMENT_MODE: {
			className: 'comment',
			begin: '//', end: '$',
			relevance: 0
		},
		C_BLOCK_COMMENT_MODE: {
			className: 'comment',
			begin: '/\\*', end: '\\*/'
		},
		HASH_COMMENT_MODE: {
			className: 'comment',
			begin: '#', end: '$'
		},
		C_NUMBER_MODE: {
			className: 'number',
			begin: C_NUMBER_RE, end: '^',
			relevance: 0
		}
	};

	// utilities
	
	function esc(value){
		return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
	}
	
	function verifyText(block){
		return dojo.every(block.childNodes, function(node){
			return node.nodeType == 3 || String(node.nodeName).toLowerCase() == 'br';
		});
	}

	function blockText(block){
		var result = [];
		dojo.forEach(block.childNodes, function(node){
			if(node.nodeType == 3){
				result.push(node.nodeValue);
			}else if(String(node.nodeName).toLowerCase() == 'br'){
				result.push("\n");
			}else{
				throw 'Complex markup';
			}
		});
		return result.join("");
	}

	function buildKeywordGroups(mode){
		if(!mode.keywordGroups){
			for(var key in mode.keywords){
				var kw = mode.keywords[key];
    			if(kw instanceof Object){  // dojo.isObject?
					mode.keywordGroups = mode.keywords;
				}else{
					mode.keywordGroups = {keyword: mode.keywords};
				}
				break;
			}
		}
	}
	
	function buildKeywords(lang){
		if(lang.defaultMode && lang.modes){
			buildKeywordGroups(lang.defaultMode);
			dojo.forEach(lang.modes, buildKeywordGroups);
		}
	}
	
	// main object

	var Highlighter = function(langName, textBlock){
		// initialize the state
		this.langName = langName;
		this.lang = dh.languages[langName];
		this.modes = [this.lang.defaultMode];
		this.relevance = 0;
		this.keywordCount = 0;
		this.result = [];
		
		// build resources lazily
		if(!this.lang.defaultMode.illegalRe){
			this.buildRes();
			buildKeywords(this.lang);
		}
		
		// run the algorithm
		try{
			this.highlight(textBlock);
			this.result = this.result.join("");
		}catch(e){
			if(e == 'Illegal'){
				this.relevance = 0;
				this.keywordCount = 0;
				this.partialResult = this.result.join("");
				this.result = esc(textBlock);
			}else{
				throw e;
			}
		}
	};

	dojo.extend(Highlighter, {
		buildRes: function(){
			dojo.forEach(this.lang.modes, function(mode){
				if(mode.begin){
					mode.beginRe = this.langRe('^' + mode.begin);
				}
				if(mode.end){
					mode.endRe = this.langRe('^' + mode.end);
				}
				if(mode.illegal){
					mode.illegalRe = this.langRe('^(?:' + mode.illegal + ')');
				}
			}, this);
			this.lang.defaultMode.illegalRe = this.langRe('^(?:' + this.lang.defaultMode.illegal + ')');
		},
		
		subMode: function(lexeme){
			var classes = this.modes[this.modes.length - 1].contains;
			if(classes){
				var modes = this.lang.modes;
				for(var i = 0; i < classes.length; ++i){
					var className = classes[i];
					for(var j = 0; j < modes.length; ++j){
						var mode = modes[j];
						if(mode.className == className && mode.beginRe.test(lexeme)){ return mode; }
					}
				}
			}
			return null;
		},

		endOfMode: function(lexeme){
			for(var i = this.modes.length - 1; i >= 0; --i){
				var mode = this.modes[i];
				if(mode.end && mode.endRe.test(lexeme)){ return this.modes.length - i; }
				if(!mode.endsWithParent){ break; }
			}
			return 0;
		},

		isIllegal: function(lexeme){
			var illegalRe = this.modes[this.modes.length - 1].illegalRe;
			return illegalRe && illegalRe.test(lexeme);
		},


		langRe: function(value, global){
			var mode =  'm' + (this.lang.case_insensitive ? 'i' : '') + (global ? 'g' : '');
			return new RegExp(value, mode);
		},
	
		buildTerminators: function(){
			var mode = this.modes[this.modes.length - 1],
				terminators = {};
			if(mode.contains){
				dojo.forEach(this.lang.modes, function(lmode){
					if(dojo.indexOf(mode.contains, lmode.className) >= 0){
						terminators[lmode.begin] = 1;
					}
				});
			}
			for(var i = this.modes.length - 1; i >= 0; --i){
				var m = this.modes[i];
				if(m.end){ terminators[m.end] = 1; }
				if(!m.endsWithParent){ break; }
			}
			if(mode.illegal){ terminators[mode.illegal] = 1; }
			var t = [];
			for(i in terminators){ t.push(i); }
			mode.terminatorsRe = this.langRe("(" + t.join("|") + ")");
		},

		eatModeChunk: function(value, index){
			var mode = this.modes[this.modes.length - 1];
			
			// create terminators lazily
			if(!mode.terminatorsRe){
				this.buildTerminators();
			}
	
			value = value.substr(index);
			var match = mode.terminatorsRe.exec(value);
			if(!match){
				return {
					buffer: value,
					lexeme: "",
					end:    true
				};
			}
			return {
				buffer: match.index ? value.substr(0, match.index) : "",
				lexeme: match[0],
				end:    false
			};
		},
	
		keywordMatch: function(mode, match){
			var matchStr = match[0];
			if(this.lang.case_insensitive){ matchStr = matchStr.toLowerCase(); }
			for(var className in mode.keywordGroups){
				if(matchStr in mode.keywordGroups[className]){ return className; }
			}
			return "";
		},
		
		buildLexemes: function(mode){
			var lexemes = {};
			dojo.forEach(mode.lexems, function(lexeme){
				lexemes[lexeme] = 1;
			});
			var t = [];
			for(var i in lexemes){ t.push(i); }
			mode.lexemsRe = this.langRe("(" + t.join("|") + ")", true);
		},
	
		processKeywords: function(buffer){
			var mode = this.modes[this.modes.length - 1];
			if(!mode.keywords || !mode.lexems){
				return esc(buffer);
			}
			
			// create lexemes lazily
			if(!mode.lexemsRe){
				this.buildLexemes(mode);
			}
			
			mode.lexemsRe.lastIndex = 0;
			var result = [], lastIndex = 0,
				match = mode.lexemsRe.exec(buffer);
			while(match){
				result.push(esc(buffer.substr(lastIndex, match.index - lastIndex)));
				var keywordM = this.keywordMatch(mode, match);
				if(keywordM){
					++this.keywordCount;
					result.push('<span class="'+ keywordM +'">' + esc(match[0]) + '</span>');
				}else{
					result.push(esc(match[0]));
				}
				lastIndex = mode.lexemsRe.lastIndex;
				match = mode.lexemsRe.exec(buffer);
			}
			result.push(esc(buffer.substr(lastIndex, buffer.length - lastIndex)));
			return result.join("");
		},
	
		processModeInfo: function(buffer, lexeme, end) {
			var mode = this.modes[this.modes.length - 1];
			if(end){
				this.result.push(this.processKeywords(mode.buffer + buffer));
				return;
			}
			if(this.isIllegal(lexeme)){ throw 'Illegal'; }
			var newMode = this.subMode(lexeme);
			if(newMode){
				mode.buffer += buffer;
				this.result.push(this.processKeywords(mode.buffer));
				if(newMode.excludeBegin){
					this.result.push(lexeme + '<span class="' + newMode.className + '">');
					newMode.buffer = '';
				}else{
					this.result.push('<span class="' + newMode.className + '">');
					newMode.buffer = lexeme;
				}
				this.modes.push(newMode);
				this.relevance += typeof newMode.relevance == "number" ? newMode.relevance : 1;
				return;
			}
			var endLevel = this.endOfMode(lexeme);
			if(endLevel){
				mode.buffer += buffer;
				if(mode.excludeEnd){
					this.result.push(this.processKeywords(mode.buffer) + '</span>' + lexeme);
				}else{
					this.result.push(this.processKeywords(mode.buffer + lexeme) + '</span>');
				}
				while(endLevel > 1){
					this.result.push('</span>');
					--endLevel;
					this.modes.pop();
				}
				this.modes.pop();
				this.modes[this.modes.length - 1].buffer = '';
				return;
			}
		},
	
		highlight: function(value){
			var index = 0;
			this.lang.defaultMode.buffer = '';
			do{
				var modeInfo = this.eatModeChunk(value, index);
				this.processModeInfo(modeInfo.buffer, modeInfo.lexeme, modeInfo.end);
				index += modeInfo.buffer.length + modeInfo.lexeme.length;
			}while(!modeInfo.end);
			if(this.modes.length > 1){
				throw 'Illegal';
			}
		}
	});
	
	// more utilities
	
	function replaceText(node, className, text){
		if(String(node.tagName).toLowerCase() == "code" && String(node.parentNode.tagName).toLowerCase() == "pre"){
			// See these 4 lines? This is IE's notion of "node.innerHTML = text". Love this browser :-/
			var container = document.createElement('div'),
				environment = node.parentNode.parentNode;
			container.innerHTML = '<pre><code class="' + className + '">' + text + '</code></pre>';
			environment.replaceChild(container.firstChild, node.parentNode);
		}else{
			node.className = className;
			node.innerHTML = text;
		}
	}
	function highlightStringLanguage(lang, str){
		var highlight = new Highlighter(lang, str);
		return {result:highlight.result, langName:lang, partialResult:highlight.partialResult};
	}

	function highlightLanguage(block, lang){
		var result = highlightStringLanguage(lang, blockText(block));
		replaceText(block, block.className, result.result);
	}

	function highlightStringAuto(str){
		var result = "", langName = "", bestRelevance = 2,
			textBlock = str;
		for(var key in dh.languages){
			if(!dh.languages[key].defaultMode){ continue; }	// skip internal members
			var highlight = new Highlighter(key, textBlock),
				relevance = highlight.keywordCount + highlight.relevance, relevanceMax = 0;
			if(!result || relevance > relevanceMax){
				relevanceMax = relevance;
				result = highlight.result;
				langName = highlight.langName;
			}
		}
		return {result:result, langName:langName};
	}
	
	function highlightAuto(block){
		var result = highlightStringAuto(blockText(block));
		if(result.result){
			replaceText(block, result.langName, result.result);
		}
	}
	
	// the public API

	dojox.highlight.processString = function(/* String */ str, /* String? */lang){
		// summary: highlight a string of text
		// returns: Object containing:
		//         result - string of html with spans to apply formatting
		//         partialResult - if the formating failed: string of html
		//                 up to the point of the failure, otherwise: undefined
		//         langName - the language used to do the formatting
		return lang ? highlightStringLanguage(lang, str) : highlightStringAuto(str);
	};

	dojox.highlight.init = function(/* String|DomNode */ node){
		//	summary: Highlight a passed node
		//
		//	description:
		//
		//		Syntax highlight a passed DomNode or String ID of a DomNode
		//
		//
		//	example:
		//	|	dojox.highlight.init("someId");
		//
		node = dojo.byId(node);
		if(dojo.hasClass(node, "no-highlight")){ return; }
		if(!verifyText(node)){ return; }
	
		var classes = node.className.split(/\s+/),
			flag = dojo.some(classes, function(className){
				if(className.charAt(0) != "_" && dh.languages[className]){
					highlightLanguage(node, className);
					return true;	// stop iterations
				}
				return false;	// continue iterations
			});
		if(!flag){
			highlightAuto(node);
		}
	};

/*=====
	dojox.highlight.Code = function(props, node){
		//	summary: A Class object to allow for dojoType usage with the highlight engine. This is
		//		NOT a Widget in the conventional sense, and does not have any member functions for
		//		the instance. This is provided as a convenience. You likely should be calling
		//		`dojox.highlight.init` directly.
		//
		//	props: Object?
		//		Unused. Pass 'null' or {}. Positional usage to allow `dojo.parser` to instantiate
		//		this class as other Widgets would be.
		//
		//	node: String|DomNode
		//		A String ID or DomNode reference to use as the root node of this instance.
		//
		//	example:
		//	|	<pre><code dojoType="dojox.highlight.Code">for(var i in obj){ ... }</code></pre>
		//
		//	example:
		//	|	var inst = new dojox.highlight.Code({}, "someId");
		//
		this.node = dojo.byId(node);
	};
=====*/

	dh.Code = function(p, n){ dh.init(n); };

})();

}

if(!dojo._hasResource["dojox.highlight"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight"] = true;
dojo.provide("dojox.highlight");


}

if(!dojo._hasResource["dojox.highlight.languages.xml"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight.languages.xml"] = true;
dojo.provide("dojox.highlight.languages.xml");



(function(){
	var XML_COMMENT = {
		className: 'comment',
		begin: '<!--', end: '-->'
	};
	
	var XML_ATTR = {
		className: 'attribute',
		begin: ' [a-zA-Z-]+=', end: '^',
		contains: ['value']
	};
	
	var XML_VALUE = {
		className: 'value',
		begin: '"', end: '"'
	};
	
	var dh = dojox.highlight, dhc = dh.constants;
	dh.languages.xml = {
		defaultMode: {
			contains: ['pi', 'comment', 'cdata', 'tag']
		},
		case_insensitive: true,
		modes: [
			{
				className: 'pi',
				begin: '<\\?', end: '\\?>',
				relevance: 10
			},
			XML_COMMENT,
			{
				className: 'cdata',
				begin: '<\\!\\[CDATA\\[', end: '\\]\\]>'
			},
			{
				className: 'tag',
				begin: '</?', end: '>',
				contains: ['title', 'tag_internal'],
				relevance: 1.5
			},
			{
				className: 'title',
				begin: '[A-Za-z:_][A-Za-z0-9\\._:-]+', end: '^',
				relevance: 0
			},
			{
				className: 'tag_internal',
				begin: '^', endsWithParent: true,
				contains: ['attribute'],
				relevance: 0,
				illegal: '[\\+\\.]'
			},
			XML_ATTR,
			XML_VALUE
		],
		// exporting constants
		XML_COMMENT: XML_COMMENT,
		XML_ATTR: XML_ATTR,
		XML_VALUE: XML_VALUE
	};
})();

}

if(!dojo._hasResource["dojox.highlight.languages.html"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight.languages.html"] = true;
dojo.provide("dojox.highlight.languages.html");




(function(){
	var HTML_TAGS = {
		'code': 1, 'kbd': 1, 'font': 1, 'noscript': 1, 'style': 1, 'img': 1,
		'title': 1, 'menu': 1, 'tt': 1, 'tr': 1, 'param': 1, 'li': 1, 'tfoot': 1,
		'th': 1, 'input': 1, 'td': 1, 'dl': 1, 'blockquote': 1, 'fieldset': 1,
		'big': 1, 'dd': 1, 'abbr': 1, 'optgroup': 1, 'dt': 1, 'button': 1,
		'isindex': 1, 'p': 1, 'small': 1, 'div': 1, 'dir': 1, 'em': 1, 'frame': 1,
		'meta': 1, 'sub': 1, 'bdo': 1, 'label': 1, 'acronym': 1, 'sup': 1,
		'body': 1, 'xml': 1, 'basefont': 1, 'base': 1, 'br': 1, 'address': 1,
		'strong': 1, 'legend': 1, 'ol': 1, 'script': 1, 'caption': 1, 's': 1,
		'col': 1, 'h2': 1, 'h3': 1, 'h1': 1, 'h6': 1, 'h4': 1, 'h5': 1, 'table': 1,
		'select': 1, 'noframes': 1, 'span': 1, 'area': 1, 'dfn': 1, 'strike': 1,
		'cite': 1, 'thead': 1, 'head': 1, 'option': 1, 'form': 1, 'hr': 1,
		'var': 1, 'link': 1, 'b': 1, 'colgroup': 1, 'ul': 1, 'applet': 1, 'del': 1,
		'iframe': 1, 'pre': 1, 'frameset': 1, 'ins': 1, 'tbody': 1, 'html': 1,
		'samp': 1, 'map': 1, 'object': 1, 'a': 1, 'xmlns': 1, 'center': 1,
		'textarea': 1, 'i': 1, 'q': 1, 'u': 1
	};
	var HTML_DOCTYPE = {
		className: 'doctype',
		begin: '<!DOCTYPE', end: '>',
		relevance: 10
	};
	var HTML_ATTR = {
		className: 'attribute',
		begin: ' [a-zA-Z]+', end: '^'
	};
	var HTML_VALUE = {
		className: 'value',
		begin: '[a-zA-Z0-9]+', end: '^'
	};

	var dh = dojox.highlight, dhc = dh.constants, dhl = dh.languages, x = dhl.xml;
	dhl.html = {
		defaultMode: {
			contains: ['tag', 'comment', 'doctype']
		},
		case_insensitive: true,
		modes: [
			x.XML_COMMENT,
			HTML_DOCTYPE,
			{
				className: 'tag',
				lexems: [dhc.IDENT_RE],
				keywords: HTML_TAGS,
				begin: '<[A-Za-z/]', end: '>',
				contains: ['attribute'],
				illegal: '[\\+\\.]'
			},
			x.XML_ATTR,
			HTML_ATTR,
			x.XML_VALUE,
			HTML_VALUE
		],
		// exporting constants
		HTML_TAGS: HTML_TAGS,
		HTML_DOCTYPE: HTML_DOCTYPE,
		HTML_ATTR: HTML_ATTR,
		HTML_VALUE: HTML_VALUE
	};
})();

}

if(!dojo._hasResource["dojox.highlight.languages.css"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight.languages.css"] = true;
dojo.provide("dojox.highlight.languages.css");




(function(){
	var dh = dojox.highlight, dhc = dh.constants, dhl = dh.languages;
	dhl.css = {
		defaultMode: {
			contains: ['id', 'class', 'attr_selector', 'rules', 'comment'],
			keywords: dhl.html.HTML_TAGS,
			lexems: [dhc.IDENT_RE],
			illegal: '='
		},
		case_insensitive: true,
		modes: [
			{
				className: 'id',
				begin: '\\#[A-Za-z0-9_-]+', end: '^'
			},
			{
				className: 'class',
				begin: '\\.[A-Za-z0-9_-]+', end: '^',
				relevance: 0
			},
			{
				className: 'attr_selector',
				begin: '\\[', end: '\\]',
				illegal: '$'
			},
			{
				className: 'rules',
				begin: '{', end: '}',
				lexems: ['[A-Za-z-]+'],
				keywords: {
					'play-during': 1, 'counter-reset': 1,
					'counter-increment': 1, 'min-height': 1, 'quotes': 1,
					'border-top': 1, 'pitch': 1, 'font': 1, 'pause': 1,
					'list-style-image': 1, 'border-width': 1, 'cue': 1,
					'outline-width': 1, 'border-left': 1, 'elevation': 1,
					'richness': 1, 'speech-rate': 1, 'border-bottom': 1,
					'border-spacing': 1, 'background': 1, 'list-style-type': 1,
					'text-align': 1, 'page-break-inside': 1, 'orphans': 1,
					'page-break-before': 1, 'text-transform': 1,
					'line-height': 1, 'padding-left': 1, 'font-size': 1,
					'right': 1, 'word-spacing': 1, 'padding-top': 1,
					'outline-style': 1, 'bottom': 1, 'content': 1,
					'border-right-style': 1, 'padding-right': 1,
					'border-left-style': 1, 'voice-family': 1,
					'background-color': 1, 'border-bottom-color': 1,
					'outline-color': 1, 'unicode-bidi': 1, 'max-width': 1,
					'font-family': 1, 'caption-side': 1,
					'border-right-width': 1, 'pause-before': 1,
					'border-top-style': 1, 'color': 1, 'border-collapse': 1,
					'border-bottom-width': 1, 'float': 1, 'height': 1,
					'max-height': 1, 'margin-right': 1, 'border-top-width': 1,
					'speak': 1, 'speak-header': 1, 'top': 1, 'cue-before': 1,
					'min-width': 1, 'width': 1, 'font-variant': 1,
					'border-top-color': 1, 'background-position': 1,
					'empty-cells': 1, 'direction': 1, 'border-right': 1,
					'visibility': 1, 'padding': 1, 'border-style': 1,
					'background-attachment': 1, 'overflow': 1,
					'border-bottom-style': 1, 'cursor': 1, 'margin': 1,
					'display': 1, 'border-left-width': 1, 'letter-spacing': 1,
					'vertical-align': 1, 'clip': 1, 'border-color': 1,
					'list-style': 1, 'padding-bottom': 1, 'pause-after': 1,
					'speak-numeral': 1, 'margin-left': 1, 'widows': 1,
					'border': 1, 'font-style': 1, 'border-left-color': 1,
					'pitch-range': 1, 'background-repeat': 1,
					'table-layout': 1, 'margin-bottom': 1,
					'speak-punctuation': 1, 'font-weight': 1,
					'border-right-color': 1, 'page-break-after': 1,
					'position': 1, 'white-space': 1, 'text-indent': 1,
					'background-image': 1, 'volume': 1, 'stress': 1,
					'outline': 1, 'clear': 1, 'z-index': 1,
					'text-decoration': 1, 'margin-top': 1, 'azimuth': 1,
					'cue-after': 1, 'left': 1, 'list-style-position': 1
				},
				contains: ['comment', 'value']
			},
			dhc.C_BLOCK_COMMENT_MODE,
			{
				className: 'value',
				begin: ':',
				end: ';',
				endsWithParent: true,
				excludeBegin: true,
				excludeEnd: true
			}
		]
	};
})();

}

if(!dojo._hasResource["dojox.highlight.languages.django"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight.languages.django"] = true;
dojo.provide("dojox.highlight.languages.django");





(function(){
	var dh = dojox.highlight, dhc = dh.constants, dhl = dh.languages, x = dhl.xml, h = dhl.html;
	dhl.django = {
		defaultMode: {
			contains: ['tag', 'comment', 'doctype', 'template_comment', 'template_tag', 'variable']
		},
		case_insensitive: true,
		modes: [
			x.XML_COMMENT,
			h.HTML_DOCTYPE,
			{
				className: 'tag',
				lexems: [dhc.IDENT_RE],
				keywords: h.HTML_TAGS,
				begin: '<[A-Za-z/]', end: '>',
				contains: ['attribute', 'template_comment', 'template_tag', 'variable']
			},
			x.XML_ATTR,
			h.HTML_ATTR,
			{
				className: 'value',
				begin: '"', end: '"',
				contains: ['template_comment', 'template_tag', 'variable']
			},
			h.HTML_VALUE,
			{
				className: 'template_comment',
				begin: '\\{\\%\\s*comment\\s*\\%\\}',
				end: '\\{\\%\\s*endcomment\\s*\\%\\}'
			},
			{
				className: 'template_comment',
				begin: '\\{#', end: '#\\}'
			},
			{
				className: 'template_tag',
				begin: '\\{\\%', end: '\\%\\}',
				lexems: [dhc.IDENT_RE],
				keywords: {
					'comment': 1, 'endcomment': 1, 'load': 1,
					'templatetag': 1, 'ifchanged': 1, 'endifchanged': 1,
					'if': 1, 'endif': 1, 'firstof': 1, 'for': 1,
					'endfor': 1, 'in': 1, 'ifnotequal': 1,
					'endifnotequal': 1, 'widthratio': 1, 'extends': 1,
					'include': 1, 'spaceless': 1, 'endspaceless': 1,
					'regroup': 1, 'by': 1, 'as': 1, 'ifequal': 1,
					'endifequal': 1, 'ssi': 1, 'now': 1, 'with': 1,
					'cycle': 1, 'url': 1, 'filter': 1, 'endfilter': 1,
					'debug': 1, 'block': 1, 'endblock': 1, 'else': 1
				},
				contains: ['filter']
			},
			{
				className: 'variable',
				begin: '\\{\\{', end: '\\}\\}',
				contains: ['filter']
			},
			{
				className: 'filter',
				begin: '\\|[A-Za-z]+\\:?', end: '^', excludeEnd: true,
				lexems: [dhc.IDENT_RE],
				keywords: {
					'truncatewords': 1, 'removetags': 1, 'linebreaksbr': 1,
					'yesno': 1, 'get_digit': 1, 'timesince': 1, 'random': 1,
					'striptags': 1, 'filesizeformat': 1, 'escape': 1,
					'linebreaks': 1, 'length_is': 1, 'ljust': 1, 'rjust': 1,
					'cut': 1, 'urlize': 1, 'fix_ampersands': 1, 'title': 1,
					'floatformat': 1, 'capfirst': 1, 'pprint': 1,
					'divisibleby': 1, 'add': 1, 'make_list': 1,
					'unordered_list': 1, 'urlencode': 1, 'timeuntil': 1,
					'urlizetrunc': 1, 'wordcount': 1, 'stringformat': 1,
					'linenumbers': 1, 'slice': 1, 'date': 1, 'dictsort': 1,
					'dictsortreversed': 1, 'default_if_none': 1,
					'pluralize': 1, 'lower': 1, 'join': 1, 'center': 1,
					'default': 1, 'truncatewords_html': 1, 'upper': 1,
					'length': 1, 'phone2numeric': 1, 'wordwrap': 1, 'time': 1,
					'addslashes': 1, 'slugify': 1, 'first': 1
				},
				contains: ['argument']
			},
			{
				className: 'argument',
				begin: '"', end: '"'
			}
		]
	};
})();

}

if(!dojo._hasResource["dojox.highlight.languages.javascript"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight.languages.javascript"] = true;
dojo.provide("dojox.highlight.languages.javascript");



(function(){
	var dh = dojox.highlight, dhc = dh.constants;
	dh.languages.javascript = {
		defaultMode: {
			lexems: [dhc.UNDERSCORE_IDENT_RE],
			contains: ['string', 'comment', 'number', 'regexp', 'function'],
			keywords: {
				'keyword': {
					'in': 1, 'if': 1, 'for': 1, 'while': 1, 'finally': 1, 'var': 1,
					'new': 1, 'function': 1, 'do': 1, 'return': 1, 'void': 1,
					'else': 1, 'break': 1, 'catch': 1, 'instanceof': 1, 'with': 1,
					'throw': 1, 'case': 1, 'default': 1, 'try': 1, 'this': 1,
					'switch': 1, 'continue': 1, 'typeof': 1, 'delete': 1
				},
				'literal': {'true': 1, 'false': 1, 'null': 1}
			}
		},
		modes: [
			dhc.C_LINE_COMMENT_MODE,
			dhc.C_BLOCK_COMMENT_MODE,
			dhc.C_NUMBER_MODE,
			dhc.APOS_STRING_MODE,
			dhc.QUOTE_STRING_MODE,
			dhc.BACKSLASH_ESCAPE,
			{
				className: 'regexp',
				begin: '/.*?[^\\\\/]/[gim]*', end: '^'
			},
			{
				className: 'function',
				begin: 'function\\b', end: '{',
				lexems: [dhc.UNDERSCORE_IDENT_RE],
				keywords: {'function': 1},
				contains: ['title', 'params']
			},
			{
				className: 'title',
				begin: dhc.UNDERSCORE_IDENT_RE, end: '^'
			},
			{
				className: 'params',
				begin: '\\(', end: '\\)',
				contains: ['string', 'comment']
			}
		]
	};
})();

}

if(!dojo._hasResource["dojox.highlight.languages._www"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.highlight.languages._www"] = true;
dojo.provide("dojox.highlight.languages._www");

/* common web-centric languages */






}

if(!dojo._hasResource["CodeGlass.beautify"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.beautify"] = true;
dojo.provide("CodeGlass.beautify");

/*jslint onevar: false, plusplus: false */
/*

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einars@gmail.com>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>

  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4) — indentation size,
    indent_char (default space) — character to indent with,
    preserve_newlines (default true) — whether existing line breaks should be preserved,
    indent_level (default 0)  — initial indentation level, you probably won't need this ever,

    space_after_anon_function (default false) — if true, then space is added between "function ()"
            (jslint is happy about this); if false, then the common "function()" output is used.

    e.g

    js_beautify(js_source_text, {indent_size: 1, indent_char: '\t'});


*/

dojo.mixin(CodeGlass, {
    js_beautify: function(js_source_text, options){
    
        var input, output, token_text, last_type, last_text, last_word, current_mode, modes, indent_string;
        var whitespace, wordchar, punct, parser_pos, line_starters, in_case, digits;
        var prefix, token_type, do_block_just_closed, var_line, var_line_tainted, if_line_flag;
        var indent_level;
    
    
        options                   = options || {};
        var opt_indent_size       = options.indent_size || 4;
        var opt_indent_char       = options.indent_char || ' ';
        var opt_preserve_newlines =
            typeof options.preserve_newlines === 'undefined' ? true : options.preserve_newlines;
        var opt_indent_level      = options.indent_level || 0; // starting indentation
        var opt_space_after_anon_function = options.space_after_anon_function === 'undefined' ? false : options.space_after_anon_function;
    
    
        function trim_output()
        {
            while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string)) {
                output.pop();
            }
        }
    
        function print_newline(ignore_repeated)
        {
    
            ignore_repeated = typeof ignore_repeated === 'undefined' ? true: ignore_repeated;
    
            if_line_flag = false;
            trim_output();
    
            if (!output.length) {
                return; // no newline on start of file
            }
    
            if (output[output.length - 1] !== "\n" || !ignore_repeated) {
                output.push("\n");
            }
            for (var i = 0; i < indent_level; i += 1) {
                output.push(indent_string);
            }
        }
    
    
    
        function print_space()
        {
            var last_output = ' ';
            if (output.length) {
                last_output = output[output.length - 1];
            }
            if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) { // prevent occassional duplicate space
                output.push(' ');
            }
        }
    
    
        function print_token()
        {
            output.push(token_text);
        }
    
        function indent()
        {
            indent_level += 1;
        }
    
    
        function unindent()
        {
            if (indent_level) {
                indent_level -= 1;
            }
        }
    
    
        function remove_indent()
        {
            if (output.length && output[output.length - 1] === indent_string) {
                output.pop();
            }
        }
    
    
        function set_mode(mode)
        {
            modes.push(current_mode);
            current_mode = mode;
        }
    
    
        function restore_mode()
        {
            do_block_just_closed = current_mode === 'DO_BLOCK';
            current_mode = modes.pop();
        }
    
    
        function in_array(what, arr)
        {
            for (var i = 0; i < arr.length; i += 1)
            {
                if (arr[i] === what) {
                    return true;
                }
            }
            return false;
        }
    
        // Walk backwards from the colon to find a '?' (colon is part of a ternary op)
        // or a '{' (colon is part of a class literal).  Along the way, keep track of
        // the blocks and expressions we pass so we only trigger on those chars in our
        // own level, and keep track of the colons so we only trigger on the matching '?'.
        function is_ternary_op() {
            var level = 0, colon_count = 0;
            for (var i = output.length - 1; i >= 0; i--) {
                switch (output[i]) {
                case ':':
                    if (level === 0) {
                        colon_count++;
                    }
                    break;
                case '?':
                    if (level === 0) {
                        if (colon_count === 0) {
                            return true;
                        } else {
                            colon_count--;
                        }
                    } 
                    break;
                case '{':
                    if (level === 0) {
                        return false;
                    }
                    level--;
                    break;
                case '(':
                case '[':
                    level--;
                    break;
                case ')':
                case ']':
                case '}':
                    level++;
                    break;
                }
            }
        }
    
    
        function get_next_token()
        {
            var n_newlines = 0;
    
            if (parser_pos >= input.length) {
                return ['', 'TK_EOF'];
            }
    
            var c = input.charAt(parser_pos);
            parser_pos += 1;
    
            while (in_array(c, whitespace)) {
                if (parser_pos >= input.length) {
                    return ['', 'TK_EOF'];
                }
    
                if (c === "\n") {
                    n_newlines += 1;
                }
    
                c = input.charAt(parser_pos);
                parser_pos += 1;
    
            }
    
            var wanted_newline = false;
    
            if (opt_preserve_newlines) {
                if (n_newlines > 1) {
                    for (var i = 0; i < 2; i += 1) {
                        print_newline(i === 0);
                    }
                }
                wanted_newline = (n_newlines === 1);
            }
    
    
            if (in_array(c, wordchar)) {
                if (parser_pos < input.length) {
                    while (in_array(input.charAt(parser_pos), wordchar)) {
                        c += input.charAt(parser_pos);
                        parser_pos += 1;
                        if (parser_pos === input.length) {
                            break;
                        }
                    }
                }
    
                // small and surprisingly unugly hack for 1E-10 representation
                if (parser_pos !== input.length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {
    
                    var sign = input.charAt(parser_pos);
                    parser_pos += 1;
    
                    var t = get_next_token(parser_pos);
                    c += sign + t[0];
                    return [c, 'TK_WORD'];
                }
    
                if (c === 'in') { // hack for 'in' operator
                    return [c, 'TK_OPERATOR'];
                }
                if (wanted_newline && last_type !== 'TK_OPERATOR' && !if_line_flag) {
                    print_newline();
                }
                return [c, 'TK_WORD'];
            }
    
            if (c === '(' || c === '[') {
                return [c, 'TK_START_EXPR'];
            }
    
            if (c === ')' || c === ']') {
                return [c, 'TK_END_EXPR'];
            }
    
            if (c === '{') {
                return [c, 'TK_START_BLOCK'];
            }
    
            if (c === '}') {
                return [c, 'TK_END_BLOCK'];
            }
    
            if (c === ';') {
                return [c, 'TK_SEMICOLON'];
            }
    
            if (c === '/') {
                var comment = '';
                // peek for comment /* ... */
                if (input.charAt(parser_pos) === '*') {
                    parser_pos += 1;
                    if (parser_pos < input.length) {
                        while (! (input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/') && parser_pos < input.length) {
                            comment += input.charAt(parser_pos);
                            parser_pos += 1;
                            if (parser_pos >= input.length) {
                                break;
                            }
                        }
                    }
                    parser_pos += 2;
                    return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
                }
                // peek for comment // ...
                if (input.charAt(parser_pos) === '/') {
                    comment = c;
                    while (input.charAt(parser_pos) !== "\x0d" && input.charAt(parser_pos) !== "\x0a") {
                        comment += input.charAt(parser_pos);
                        parser_pos += 1;
                        if (parser_pos >= input.length) {
                            break;
                        }
                    }
                    parser_pos += 1;
                    if (wanted_newline) {
                        print_newline();
                    }
                    return [comment, 'TK_COMMENT'];
                }
    
            }
    
            if (c === "'" || // string
            c === '"' || // string
            (c === '/' &&
            ((last_type === 'TK_WORD' && last_text === 'return') || (last_type === 'TK_START_EXPR' || last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EOF' || last_type === 'TK_SEMICOLON')))) { // regexp
                var sep = c;
                var esc = false;
                var resulting_string = c;
    
                if (parser_pos < input.length) {
                    if (sep === '/') {
                        //
                        // handle regexp separately...
                        //
    
                        var in_char_class = false;
                        while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
                            resulting_string += input.charAt(parser_pos);
                            if (!esc) {
                                esc = input.charAt(parser_pos) === '\\';
                                if (input.charAt(parser_pos) === '[') {
                                    in_char_class = true;
                                } else if (input.charAt(parser_pos) === ']') {
                                    in_char_class = false;
                                }
                            } else {
                                esc = false;
                            }
                            parser_pos += 1;
                            if (parser_pos >= input.length) {
                                // incomplete string/rexp when end-of-file reached. 
                                // bail out with what had been received so far.
                                return [resulting_string, 'TK_STRING'];
                            }
                        }
    
                    } else {
                        //
                        // and handle string also separately
                        //
                        while (esc || input.charAt(parser_pos) !== sep) {
                            resulting_string += input.charAt(parser_pos);
                            if (!esc) {
                                esc = input.charAt(parser_pos) === '\\';
                            } else {
                                esc = false;
                            }
                            parser_pos += 1;
                            if (parser_pos >= input.length) {
                                // incomplete string/rexp when end-of-file reached. 
                                // bail out with what had been received so far.
                                return [resulting_string, 'TK_STRING'];
                            }
                        }
                    }
    
    
    
                }
    
                parser_pos += 1;
    
                resulting_string += sep;
    
                if (sep === '/') {
                    // regexps may have modifiers /regexp/MOD , so fetch those, too
                    while (parser_pos < input.length && in_array(input.charAt(parser_pos), wordchar)) {
                        resulting_string += input.charAt(parser_pos);
                        parser_pos += 1;
                    }
                }
                return [resulting_string, 'TK_STRING'];
            }
    
            if (c === '#') {
                // Spidermonkey-specific sharp variables for circular references
                // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
                // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
                var sharp = '#';
                if (parser_pos < input.length && in_array(input.charAt(parser_pos), digits)) {
                    do {
                        c = input.charAt(parser_pos);
                        sharp += c;
                        parser_pos += 1;
                    } while (parser_pos < input.length && c !== '#' && c !== '=');
                    if (c === '#') {
                        return [sharp, 'TK_WORD'];
                    } else {
                        return [sharp, 'TK_OPERATOR'];
                    }
                }
            }
    
            if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
                parser_pos += 3;
                return ['<!--', 'TK_COMMENT'];
            }
    
            if (c === '-' && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
                parser_pos += 2;
                if (wanted_newline) {
                    print_newline();
                }
                return ['-->', 'TK_COMMENT'];
            }
    
            if (in_array(c, punct)) {
                while (parser_pos < input.length && in_array(c + input.charAt(parser_pos), punct)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input.length) {
                        break;
                    }
                }
    
                return [c, 'TK_OPERATOR'];
            }
    
            return [c, 'TK_UNKNOWN'];
        }
    
    
        //----------------------------------
    
        indent_string = '';
        while (opt_indent_size > 0) {
            indent_string += opt_indent_char;
            opt_indent_size -= 1;
        }
    
        indent_level = opt_indent_level;
    
        input = js_source_text;
    
        last_word = ''; // last 'TK_WORD' passed
        last_type = 'TK_START_EXPR'; // last token type
        last_text = ''; // last token text
        output = [];
    
        do_block_just_closed = false;
        var_line = false;         // currently drawing var .... ;
        var_line_tainted = false; // false: var a = 5; true: var a = 5, b = 6
    
        whitespace = "\n\r\t ".split('');
        wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
        digits = '0123456789'.split('');
    
        // <!-- is a special case (ok, it's a minor hack actually)
        punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::'.split(' ');
    
        // words which should always start on new line.
        line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');
    
        // states showing if we are currently in expression (i.e. "if" case) - 'EXPRESSION', or in usual block (like, procedure), 'BLOCK'.
        // some formatting depends on that.
        current_mode = 'BLOCK';
        modes = [current_mode];
    
        parser_pos = 0;
        in_case = false; // flag for parser that case/default has been processed, and next colon needs special attention
        while (true) {
            var t = get_next_token(parser_pos);
            token_text = t[0];
            token_type = t[1];
            if (token_type === 'TK_EOF') {
                break;
            }
    
            switch (token_type) {
    
            case 'TK_START_EXPR':
                var_line = false;
    
                if (token_text === '[') {
                    if (current_mode === '[EXPRESSION]') {
                        // multidimensional arrays
                        // (more like two-dimensional, though: deeper levels are treated the same as the second)
                        print_newline();
                        output.push(indent_string);
                    }
                }
    
                if (token_text === '[') {
                    set_mode('[EXPRESSION]');
                } else {
                    set_mode('(EXPRESSION)');
                }
                if (last_text === ';' || last_type === 'TK_START_BLOCK') {
                    print_newline();
                } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR') {
                    // do nothing on (( and )( and ][ and ]( ..
                } else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                    print_space();
                } else if (last_word === 'function') {
                    // function() vs function ()
                    if (opt_space_after_anon_function) {
                        print_space();
                    }
                } else if (in_array(last_word, line_starters)) {
                    print_space();
                }
                print_token();
                break;
    
            case 'TK_END_EXPR':
                restore_mode();
                print_token();
                break;
    
            case 'TK_START_BLOCK':
    
                if (last_word === 'do') {
                    set_mode('DO_BLOCK');
                } else {
                    set_mode('BLOCK');
                }
                if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                    if (last_type === 'TK_START_BLOCK') {
                        print_newline();
                    } else {
                        print_space();
                    }
                }
                print_token();
                indent();
                break;
    
            case 'TK_END_BLOCK':
                if (last_type === 'TK_START_BLOCK') {
                    // nothing
                    trim_output();
                    unindent();
                } else {
                    unindent();
                    print_newline();
                }
                print_token();
                restore_mode();
                break;
    
            case 'TK_WORD':
    
                if (do_block_just_closed) {
                    // do {} ## while ()
                    print_space();
                    print_token();
                    print_space();
                    do_block_just_closed = false;
                    break;
                }
    
                if (token_text === 'case' || token_text === 'default') {
                    if (last_text === ':') {
                        // switch cases following one another
                        remove_indent();
                    } else {
                        // case statement starts in the same line where switch
                        unindent();
                        print_newline();
                        indent();
                    }
                    print_token();
                    in_case = true;
                    break;
                }
    
                prefix = 'NONE';
    
                if (last_type === 'TK_END_BLOCK') {
                    if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                        prefix = 'NEWLINE';
                    } else {
                        prefix = 'SPACE';
                        print_space();
                    }
                } else if (last_type === 'TK_SEMICOLON' && (current_mode === 'BLOCK' || current_mode === 'DO_BLOCK')) {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_SEMICOLON' && (current_mode === '[EXPRESSION]' || current_mode === '(EXPRESSION)')) {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_STRING') {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_WORD') {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_START_BLOCK') {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_END_EXPR') {
                    print_space();
                    prefix = 'NEWLINE';
                }
    
                if (last_type !== 'TK_END_BLOCK' && in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                    print_newline();
                } else if (in_array(token_text, line_starters) || prefix === 'NEWLINE') {
                    if (last_text === 'else') {
                        // no need to force newline on else break
                        print_space();
                    } else if ((last_type === 'TK_START_EXPR' || last_text === '=' || last_text === ',') && token_text === 'function') {
                        // no need to force newline on 'function': (function
                        // DONOTHING
                    } else if (last_text === 'return' || last_text === 'throw') {
                        // no newline between 'return nnn'
                        print_space();
                    } else if (last_type !== 'TK_END_EXPR') {
                        if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
                            // no need to force newline on 'var': for (var x = 0...)
                            if (token_text === 'if' && last_word === 'else') {
                                // no newline for } else if {
                                print_space();
                            } else {
                                print_newline();
                            }
                        }
                    } else {
                        if (in_array(token_text, line_starters) && last_text !== ')') {
                            print_newline();
                        }
                    }
                } else if (prefix === 'SPACE') {
                    print_space();
                }
                print_token();
                last_word = token_text;
    
                if (token_text === 'var') {
                    var_line = true;
                    var_line_tainted = false;
                }
    
                if (token_text === 'if' || token_text === 'else') {
                    if_line_flag = true;
                }
    
                break;
    
            case 'TK_SEMICOLON':
    
                print_token();
                var_line = false;
                break;
    
            case 'TK_STRING':
    
                if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_SEMICOLON') {
                    print_newline();
                } else if (last_type === 'TK_WORD') {
                    print_space();
                }
                print_token();
                break;
    
            case 'TK_OPERATOR':
    
                var start_delim = true;
                var end_delim = true;
                if (var_line && token_text !== ',') {
                    var_line_tainted = true;
                    if (token_text === ':') {
                        var_line = false;
                    }
                }
                if (var_line && token_text === ',' && (current_mode === '[EXPRESSION]' || current_mode === '(EXPRESSION)')) {
                    // do not break on comma, for(var a = 1, b = 2)
                    var_line_tainted = false;
                }
    
                if (token_text === ':' && in_case) {
                    print_token(); // colon really asks for separate treatment
                    print_newline();
                    in_case = false; 
                    break;
                }
    
                if (token_text === '::') {
                    // no spaces around exotic namespacing syntax operator
                    print_token();
                    break;
                }
    
                if (token_text === ',') {
                    if (var_line) {
                        if (var_line_tainted) {
                            print_token();
                            print_newline();
                            var_line_tainted = false;
                        } else {
                            print_token();
                            print_space();
                        }
                    } else if (last_type === 'TK_END_BLOCK') {
                        print_token();
                        print_newline();
                    } else {
                        if (current_mode === 'BLOCK') {
                            print_token();
                            print_newline();
                        } else {
                            // EXPR or DO_BLOCK
                            print_token();
                            print_space();
                        }
                    }
                    break;
                } else if (token_text === '--' || token_text === '++') { // unary operators special case
                    if (last_text === ';') {
                        if (current_mode === 'BLOCK') {
                            // { foo; --i }
                            print_newline();
                            start_delim = true;
                            end_delim = false;
                        } else {
                            // space for (;; ++i)
                            start_delim = true;
                            end_delim = false;
                        }
                    } else {
                        if (last_text === '{') {
                            // {--i
                            print_newline();
                        }
                        start_delim = false;
                        end_delim = false;
                    }
                } else if ((token_text === '!' || token_text === '+' || token_text === '-') && (last_text === 'return' || last_text === 'case')) {
                    start_delim = true;
                    end_delim = false;
                } else if ((token_text === '!' || token_text === '+' || token_text === '-') && last_type === 'TK_START_EXPR') {
                    // special case handling: if (!a)
                    start_delim = false;
                    end_delim = false;
                } else if (last_type === 'TK_OPERATOR') {
                    start_delim = false;
                    end_delim = false;
                } else if (last_type === 'TK_END_EXPR') {
                    start_delim = true;
                    end_delim = true;
                } else if (token_text === '.') {
                    // decimal digits or object.property
                    start_delim = false;
                    end_delim = false;
    
                } else if (token_text === ':') {
                    if (is_ternary_op()) {
                        start_delim = true;
                    } else {
                        start_delim = false;
                    }
                }
                if (start_delim) {
                    print_space();
                }
    
                print_token();
    
                if (end_delim) {
                    print_space();
                }
                break;
    
            case 'TK_BLOCK_COMMENT':
    
                print_newline();
                print_token();
                print_newline();
                break;
    
            case 'TK_COMMENT':
    
                // print_newline();
                print_space();
                print_token();
                print_newline();
                break;
    
            case 'TK_UNKNOWN':
                print_token();
                break;
            }
    
            last_type = token_type;
            last_text = token_text;
        }
    
        return output.join('').replace(/\n+$/, '');
    
    }
});

}

if(!dojo._hasResource["CodeGlass.HTML-Beautify"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.HTML-Beautify"] = true;
dojo.provide("CodeGlass.HTML-Beautify");



/*

 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <elfz@laacz.lv>
    http://jsbeautifier.org


  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    style_html(html_source);

*/

dojo.mixin(CodeGlass, {
  style_html: function(html_source, indent_size, indent_character, max_char) {
  //Wrapper function to invoke all the necessary constructors and deal with the output.

    var Parser, multi_parser;

    function Parser() {

      this.pos = 0; //Parser position
      this.token = '';
      this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
      this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
        parent: 'parent1',
        parentcount: 1,
        parent1: ''
      };
      this.tag_type = '';
      this.token_text = this.last_token = this.last_text = this.token_type = '';


      this.Utils = { //Uilities made available to the various functions
        whitespace: "\n\r\t ".split(''),
        single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed'.split(','), //all the single tags for HTML
        extra_liners: 'head,body,/html'.split(','), //for tags that need a line of whitespace before them
        in_array: function (what, arr) {
          for (var i=0; i<arr.length; i++) {
            if (what === arr[i]) {
              return true;
            }
          }
          return false;
        }
      }

      this.get_content = function () { //function to capture regular content between tags

        var input_char = '';
        var content = [];
        var space = false; //if a space is needed
        while (this.input.charAt(this.pos) !== '<') {
          if (this.pos >= this.input.length) {
            return content.length?content.join(''):['', 'TK_EOF'];
          }

          input_char = this.input.charAt(this.pos);
          this.pos++;
          this.line_char_count++;


          if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
            if (content.length) {
              space = true;
            }
            this.line_char_count--;
            continue; //don't want to insert unnecessary space
          }
          else if (space) {
            if (this.line_char_count >= this.max_char) { //insert a line when the max_char is reached
              content.push('\n');
              for (var i=0; i<this.indent_level; i++) {
                content.push(this.indent_string);
              }
              this.line_char_count = 0;
            }
            else{
              content.push(' ');
              this.line_char_count++;
            }
            space = false;
          }
          content.push(input_char); //letter at-a-time (or string) inserted to an array
        }
        return content.length?content.join(''):'';
      }

      this.get_script = function () { //get the full content of a script to pass to js_beautify

        var input_char = '';
        var content = [];
        var reg_match = new RegExp('\<\/script' + '\>', 'igm');
        reg_match.lastIndex = this.pos;
        var reg_array = reg_match.exec(this.input);
        var end_script = reg_array?reg_array.index:this.input.length; //absolute end of script
        while(this.pos < end_script) { //get everything in between the script tags
          if (this.pos >= this.input.length) {
            return content.length?content.join(''):['', 'TK_EOF'];
          }

          input_char = this.input.charAt(this.pos);
          this.pos++;


          content.push(input_char);
        }
        return content.length?content.join(''):''; //we might not have any content at all
      }

      this.record_tag = function (tag){ //function to record a tag and its parent in this.tags Object
        if (this.tags[tag + 'count']) { //check for the existence of this tag type
          this.tags[tag + 'count']++;
          this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
        }
        else { //otherwise initialize this tag type
          this.tags[tag + 'count'] = 1;
          this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
        }
        this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
        this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
      }

      this.retrieve_tag = function (tag) { //function to retrieve the opening tag to the corresponding closer
        if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
          var temp_parent = this.tags.parent; //check to see if it's a closable tag.
          while (temp_parent) { //till we reach '' (the initial value);
            if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
              break;
            }
            temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
          }
          if (temp_parent) { //if we caught something
            this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
            this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
          }
          delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
          delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
          if (this.tags[tag + 'count'] == 1) {
            delete this.tags[tag + 'count'];
          }
          else {
            this.tags[tag + 'count']--;
          }
        }
      }

      this.get_tag = function () { //function to get a full tag and parse its type
        var input_char = '';
        var content = [];
        var space = false;

        do {
          if (this.pos >= this.input.length) {
            return content.length?content.join(''):['', 'TK_EOF'];
          }

          input_char = this.input.charAt(this.pos);
          this.pos++;
          this.line_char_count++;

          if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
            space = true;
            this.line_char_count--;
            continue;
          }

          if (input_char === "'" || input_char === '"') {
            if (!content[1] || content[1] !== '!') { //if we're in a comment strings don't get treated specially
              input_char += this.get_unformatted(input_char);
              space = true;
            }
          }

          if (input_char === '=') { //no space before =
            space = false;
          }

          if (content.length && content[content.length-1] !== '=' && input_char !== '>'
              && space) { //no space after = or before >
            if (this.line_char_count >= this.max_char) {
              this.print_newline(false, content);
              this.line_char_count = 0;
            }
            else {
              content.push(' ');
              this.line_char_count++;
            }
            space = false;
          }
          content.push(input_char); //inserts character at-a-time (or string)
        } while (input_char !== '>');

        var tag_complete = content.join('');
        var tag_index;
        if (tag_complete.indexOf(' ') != -1) { //if there's whitespace, thats where the tag name ends
          tag_index = tag_complete.indexOf(' ');
        }
        else { //otherwise go with the tag ending
          tag_index = tag_complete.indexOf('>');
        }
        var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
        if (tag_complete.charAt(tag_complete.length-2) === '/' ||
            this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
          this.tag_type = 'SINGLE';
        }
        else if (tag_check === 'script') { //for later script handling
          this.record_tag(tag_check);
          this.tag_type = 'SCRIPT';
        }
        else if (tag_check === 'style') { //for future style handling (for now it justs uses get_content)
          this.record_tag(tag_check);
          this.tag_type = 'STYLE';
        }
        else if (tag_check.charAt(0) === '!') { //peek for <!-- comment
          if (tag_check.indexOf('[if') != -1) { //peek for <!--[if conditional comment
            if (tag_complete.indexOf('!IE') != -1) { //this type needs a closing --> so...
              var comment = this.get_unformatted('-->', tag_complete); //...delegate to get_unformatted
              content.push(comment);
            }
            this.tag_type = 'START';
          }
          else if (tag_check.indexOf('[endif') != -1) {//peek for <!--[endif end conditional comment
            this.tag_type = 'END';
            this.unindent();
          }
          else if (tag_check.indexOf('[cdata[') != -1) { //if it's a <[cdata[ comment...
            var comment = this.get_unformatted(']]>', tag_complete); //...delegate to get_unformatted function
            content.push(comment);
            this.tag_type = 'SINGLE'; //<![CDATA[ comments are treated like single tags
          }
          else {
            var comment = this.get_unformatted('-->', tag_complete);
            content.push(comment);
            this.tag_type = 'SINGLE';
          }
        }
        else {
          if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
            this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
            this.tag_type = 'END';
          }
          else { //otherwise it's a start-tag
            this.record_tag(tag_check); //push it on the tag stack
            this.tag_type = 'START';
          }
          if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
            this.print_newline(true, this.output);
          }
        }
        return content.join(''); //returns fully formatted tag
      }

      this.get_unformatted = function (delimiter, orig_tag) { //function to return unformatted content in its entirety

        if (orig_tag && orig_tag.indexOf(delimiter) != -1) {
          return '';
        }
        var input_char = '';
        var content = '';
        var space = true;
        do {


          input_char = this.input.charAt(this.pos);
          this.pos++

          if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
            if (!space) {
              this.line_char_count--;
              continue;
            }
            if (input_char === '\n' || input_char === '\r') {
              content += '\n';
              for (var i=0; i<this.indent_level; i++) {
                content += this.indent_string;
              }
              space = false; //...and make sure other indentation is erased
              this.line_char_count = 0;
              continue;
            }
          }
          content += input_char;
          this.line_char_count++;
          space = true;


        } while (content.indexOf(delimiter) == -1);
        return content;
      }

      this.get_token = function () { //initial handler for token-retrieval
        var token;

        if (this.last_token === 'TK_TAG_SCRIPT') { //check if we need to format javascript
          var temp_token = this.get_script();
          if (typeof temp_token !== 'string') {
            return temp_token;
          }
          token = CodeGlass.js_beautify(temp_token,
                  {indent_size: this.indent_size, indent_char: this.indent_character, indent_level: this.indent_level}); //call the JS Beautifier
          return [token, 'TK_CONTENT'];
        }
        if (this.current_mode === 'CONTENT') {
          token = this.get_content();
          if (typeof token !== 'string') {
            return token;
          }
          else {
            return [token, 'TK_CONTENT'];
          }
        }

        if(this.current_mode === 'TAG') {
          token = this.get_tag();
          if (typeof token !== 'string') {
            return token;
          }
          else {
            var tag_name_type = 'TK_TAG_' + this.tag_type;
            return [token, tag_name_type];
          }
        }
      }

      this.printer = function (js_source, indent_character, indent_size, max_char) { //handles input/output and some other printing functions

        this.input = js_source || ''; //gets the input for the Parser
        this.output = [];
        this.indent_character = indent_character || ' ';
        this.indent_string = '';
        this.indent_size = indent_size || 2;
        this.indent_level = 0;
        this.max_char = max_char || 70; //maximum amount of characters per line
        this.line_char_count = 0; //count to see if max_char was exceeded

        for (var i=0; i<this.indent_size; i++) {
          this.indent_string += this.indent_character;
        }

        this.print_newline = function (ignore, arr) {
          this.line_char_count = 0;
          if (!arr || !arr.length) {
            return;
          }
          if (!ignore) { //we might want the extra line
            while (this.Utils.in_array(arr[arr.length-1], this.Utils.whitespace)) {
              arr.pop();
            }
          }
          arr.push('\n');
          for (var i=0; i<this.indent_level; i++) {
            arr.push(this.indent_string);
          }
        }


        this.print_token = function (text) {
          this.output.push(text);
        }

        this.indent = function () {
          this.indent_level++;
        }

        this.unindent = function () {
          if (this.indent_level > 0) {
            this.indent_level--;
          }
        }
      }
      return this;
    }

    /*_____________________--------------------_____________________*/



    multi_parser = new Parser(); //wrapping functions Parser
    multi_parser.printer(html_source, indent_character, indent_size); //initialize starting values



    while (true) {
        var t = multi_parser.get_token();
        multi_parser.token_text = t[0];
        multi_parser.token_type = t[1];

      if (multi_parser.token_type === 'TK_EOF') {
        break;
      }


      switch (multi_parser.token_type) {
        case 'TK_TAG_START': case 'TK_TAG_SCRIPT': case 'TK_TAG_STYLE':
          multi_parser.print_newline(false, multi_parser.output);
          multi_parser.print_token(multi_parser.token_text);
          multi_parser.indent();
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_END':
          multi_parser.print_newline(true, multi_parser.output);
          multi_parser.print_token(multi_parser.token_text);
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_TAG_SINGLE':
          multi_parser.print_newline(false, multi_parser.output);
          multi_parser.print_token(multi_parser.token_text);
          multi_parser.current_mode = 'CONTENT';
          break;
        case 'TK_CONTENT':
          if (multi_parser.token_text !== '') {
            multi_parser.print_newline(false, multi_parser.output);
            multi_parser.print_token(multi_parser.token_text);
          }
          multi_parser.current_mode = 'TAG';
          break;
      }
      multi_parser.last_token = multi_parser.token_type;
      multi_parser.last_text = multi_parser.token_text;
    }
    return multi_parser.output.join('');
  }
});

}

if(!dojo._hasResource["dojo.html"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.html"] = true;
dojo.provide("dojo.html");


dojo.getObject("html", true, dojo);

// the parser might be needed..
(function(){ // private scope, sort of a namespace

	// idCounter is incremented with each instantiation to allow asignment of a unique id for tracking, logging purposes
	var idCounter = 0,
		d = dojo;
	
	dojo.html._secureForInnerHtml = function(/*String*/ cont){
		// summary:
		//		removes !DOCTYPE and title elements from the html string.
		//
		//		khtml is picky about dom faults, you can't attach a style or <title> node as child of body
		//		must go into head, so we need to cut out those tags
		//	cont:
		//		An html string for insertion into the dom
		//
		return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig, ""); // String
	};

/*====
	dojo.html._emptyNode = function(node){
		// summary:
		//		removes all child nodes from the given node
		//	node: DOMNode
		//		the parent element
	};
=====*/
	dojo.html._emptyNode = dojo.empty;

	dojo.html._setNodeContent = function(/* DomNode */ node, /* String|DomNode|NodeList */ cont){
		// summary:
		//		inserts the given content into the given node
		//	node:
		//		the parent element
		//	content:
		//		the content to be set on the parent element.
		//		This can be an html string, a node reference or a NodeList, dojo.NodeList, Array or other enumerable list of nodes
		
		// always empty
		d.empty(node);

		if(cont) {
			if(typeof cont == "string") {
				cont = d._toDom(cont, node.ownerDocument);
			}
			if(!cont.nodeType && d.isArrayLike(cont)) {
				// handle as enumerable, but it may shrink as we enumerate it
				for(var startlen=cont.length, i=0; i<cont.length; i=startlen==cont.length ? i+1 : 0) {
					d.place( cont[i], node, "last");
				}
			} else {
				// pass nodes, documentFragments and unknowns through to dojo.place
				d.place(cont, node, "last");
			}
		}

		// return DomNode
		return node;
	};

	// we wrap up the content-setting operation in a object
	dojo.declare("dojo.html._ContentSetter", null,
		{
			// node: DomNode|String
			//		An node which will be the parent element that we set content into
			node: "",

			// content: String|DomNode|DomNode[]
			//		The content to be placed in the node. Can be an HTML string, a node reference, or a enumerable list of nodes
			content: "",
			
			// id: String?
			//		Usually only used internally, and auto-generated with each instance
			id: "",

			// cleanContent: Boolean
			//		Should the content be treated as a full html document,
			//		and the real content stripped of <html>, <body> wrapper before injection
			cleanContent: false,
			
			// extractContent: Boolean
			//		Should the content be treated as a full html document, and the real content stripped of <html>, <body> wrapper before injection
			extractContent: false,

			// parseContent: Boolean
			//		Should the node by passed to the parser after the new content is set
			parseContent: false,

			// parserScope: String
			//		Flag passed to parser.  Root for attribute names to search for.   If scopeName is dojo,
			//		will search for data-dojo-type (or dojoType).  For backwards compatibility
			//		reasons defaults to dojo._scopeName (which is "dojo" except when
			//		multi-version support is used, when it will be something like dojo16, dojo20, etc.)
			parserScope: dojo._scopeName,

			// startup: Boolean
			//		Start the child widgets after parsing them.   Only obeyed if parseContent is true.
			startup: true,
			
			// lifecyle methods
			constructor: function(/* Object */params, /* String|DomNode */node){
				//	summary:
				//		Provides a configurable, extensible object to wrap the setting on content on a node
				//		call the set() method to actually set the content..
 
				// the original params are mixed directly into the instance "this"
				dojo.mixin(this, params || {});

				// give precedence to params.node vs. the node argument
				// and ensure its a node, not an id string
				node = this.node = dojo.byId( this.node || node );
	
				if(!this.id){
					this.id = [
						"Setter",
						(node) ? node.id || node.tagName : "",
						idCounter++
					].join("_");
				}
			},
			set: function(/* String|DomNode|NodeList? */ cont, /* Object? */ params){
				// summary:
				//		front-end to the set-content sequence
				//	cont:
				//		An html string, node or enumerable list of nodes for insertion into the dom
				//		If not provided, the object's content property will be used
				if(undefined !== cont){
					this.content = cont;
				}
				// in the re-use scenario, set needs to be able to mixin new configuration
				if(params){
					this._mixin(params);
				}

				this.onBegin();
				this.setContent();
				this.onEnd();

				return this.node;
			},
			setContent: function(){
				// summary:
				//		sets the content on the node

				var node = this.node;
				if(!node) {
				    // can't proceed
					throw new Error(this.declaredClass + ": setContent given no node");
				}
				try{
					node = dojo.html._setNodeContent(node, this.content);
				}catch(e){
					// check if a domfault occurs when we are appending this.errorMessage
					// like for instance if domNode is a UL and we try append a DIV
	
					// FIXME: need to allow the user to provide a content error message string
					var errMess = this.onContentError(e);
					try{
						node.innerHTML = errMess;
					}catch(e){
						console.error('Fatal ' + this.declaredClass + '.setContent could not change content due to '+e.message, e);
					}
				}
				// always put back the node for the next method
				this.node = node; // DomNode
			},
			
			empty: function() {
				// summary
				//	cleanly empty out existing content

				// destroy any widgets from a previous run
				// NOTE: if you dont want this you'll need to empty
				// the parseResults array property yourself to avoid bad things happenning
				if(this.parseResults && this.parseResults.length) {
					dojo.forEach(this.parseResults, function(w) {
						if(w.destroy){
							w.destroy();
						}
					});
					delete this.parseResults;
				}
				// this is fast, but if you know its already empty or safe, you could
				// override empty to skip this step
				dojo.html._emptyNode(this.node);
			},
	
			onBegin: function(){
				// summary
				//		Called after instantiation, but before set();
				//		It allows modification of any of the object properties
				//		- including the node and content provided - before the set operation actually takes place
				//		This default implementation checks for cleanContent and extractContent flags to
				//		optionally pre-process html string content
				var cont = this.content;
	
				if(dojo.isString(cont)){
					if(this.cleanContent){
						cont = dojo.html._secureForInnerHtml(cont);
					}
  
					if(this.extractContent){
						var match = cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
						if(match){ cont = match[1]; }
					}
				}

				// clean out the node and any cruft associated with it - like widgets
				this.empty();
				
				this.content = cont;
				return this.node; /* DomNode */
			},
	
			onEnd: function(){
				// summary
				//		Called after set(), when the new content has been pushed into the node
				//		It provides an opportunity for post-processing before handing back the node to the caller
				//		This default implementation checks a parseContent flag to optionally run the dojo parser over the new content
				if(this.parseContent){
					// populates this.parseResults if you need those..
					this._parse();
				}
				return this.node; /* DomNode */
			},
	
			tearDown: function(){
				// summary
				//		manually reset the Setter instance if its being re-used for example for another set()
				// description
				//		tearDown() is not called automatically.
				//		In normal use, the Setter instance properties are simply allowed to fall out of scope
				//		but the tearDown method can be called to explicitly reset this instance.
				delete this.parseResults;
				delete this.node;
				delete this.content;
			},
  
			onContentError: function(err){
				return "Error occured setting content: " + err;
			},
			
			_mixin: function(params){
				// mix properties/methods into the instance
				// TODO: the intention with tearDown is to put the Setter's state
				// back to that of the original constructor (vs. deleting/resetting everything regardless of ctor params)
				// so we could do something here to move the original properties aside for later restoration
				var empty = {}, key;
				for(key in params){
					if(key in empty){ continue; }
					// TODO: here's our opportunity to mask the properties we dont consider configurable/overridable
					// .. but history shows we'll almost always guess wrong
					this[key] = params[key];
				}
			},
			_parse: function(){
				// summary:
				//		runs the dojo parser over the node contents, storing any results in this.parseResults
				//		Any errors resulting from parsing are passed to _onError for handling

				var rootNode = this.node;
				try{
					// store the results (widgets, whatever) for potential retrieval
					this.parseResults = dojo.parser.parse({
						rootNode: rootNode,
						noStart: !this.startup,
						inherited: {
							dir: this.dir,
							lang: this.lang
						},
						scope: this.parserScope
					});
				}catch(e){
					this._onError('Content', e, "Error parsing in _ContentSetter#"+this.id);
				}
			},
  
			_onError: function(type, err, consoleText){
				// summary:
				//		shows user the string that is returned by on[type]Error
				//		overide/implement on[type]Error and return your own string to customize
				var errText = this['on' + type + 'Error'].call(this, err);
				if(consoleText){
					console.error(consoleText, err);
				}else if(errText){ // a empty string won't change current content
					dojo.html._setNodeContent(this.node, errText, true);
				}
			}
	}); // end dojo.declare()

	dojo.html.set = function(/* DomNode */ node, /* String|DomNode|NodeList */ cont, /* Object? */ params){
			// summary:
			//		inserts (replaces) the given content into the given node. dojo.place(cont, node, "only")
			//		may be a better choice for simple HTML insertion.
			// description:
			//		Unless you need to use the params capabilities of this method, you should use
			//		dojo.place(cont, node, "only"). dojo.place() has more robust support for injecting
			//		an HTML string into the DOM, but it only handles inserting an HTML string as DOM
			//		elements, or inserting a DOM node. dojo.place does not handle NodeList insertions
			//		or the other capabilities as defined by the params object for this method.
			//	node:
			//		the parent element that will receive the content
			//	cont:
			//		the content to be set on the parent element.
			//		This can be an html string, a node reference or a NodeList, dojo.NodeList, Array or other enumerable list of nodes
			//	params:
			//		Optional flags/properties to configure the content-setting. See dojo.html._ContentSetter
			//	example:
			//		A safe string/node/nodelist content replacement/injection with hooks for extension
			//		Example Usage:
			//		dojo.html.set(node, "some string");
			//		dojo.html.set(node, contentNode, {options});
			//		dojo.html.set(node, myNode.childNodes, {options});
		if(undefined == cont){
			console.warn("dojo.html.set: no cont argument provided, using empty string");
			cont = "";
		}
		if(!params){
			// simple and fast
			return dojo.html._setNodeContent(node, cont, true);
		}else{
			// more options but slower
			// note the arguments are reversed in order, to match the convention for instantiation via the parser
			var op = new dojo.html._ContentSetter(dojo.mixin(
					params,
					{ content: cont, node: node }
			));
			return op.set();
		}
	};
})();

}

if(!dojo._hasResource["dojox.html._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.html._base"] = true;
/*
	Status: dont know where this will all live exactly
	Need to pull in the implementation of the various helper methods
	Some can be static method, others maybe methods of the ContentSetter (?)
	
	Gut the ContentPane, replace its _setContent with our own call to dojox.html.set()
	

*/

dojo.provide("dojox.html._base");



(function() {

	if(dojo.isIE){
		var alphaImageLoader = /(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
	}

	// css at-rules must be set before any css declarations according to CSS spec
	// match:
	// @import 'http://dojotoolkit.org/dojo.css';
	// @import 'you/never/thought/' print;
	// @import url("it/would/work") tv, screen;
	// @import url(/did/you/now.css);
	// but not:
	// @namespace dojo "http://dojotoolkit.org/dojo.css"; /* namespace URL should always be a absolute URI */
	// @charset 'utf-8';
	// @media print{ #menuRoot {display:none;} }
		
	// we adjust all paths that dont start on '/' or contains ':'
	//(?![a-z]+:|\/)

	var cssPaths = /(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;

	var adjustCssPaths = dojox.html._adjustCssPaths = function(cssUrl, cssText){
		//	summary:
		//		adjusts relative paths in cssText to be relative to cssUrl
		//		a path is considered relative if it doesn't start with '/' and not contains ':'
		//	description:
		//		Say we fetch a HTML page from level1/page.html
		//		It has some inline CSS:
		//			@import "css/page.css" tv, screen;
		//			...
		//			background-image: url(images/aplhaimage.png);
		//
		//		as we fetched this HTML and therefore this CSS
		//		from level1/page.html, these paths needs to be adjusted to:
		//			@import 'level1/css/page.css' tv, screen;
		//			...
		//			background-image: url(level1/images/alphaimage.png);
		//
		//		In IE it will also adjust relative paths in AlphaImageLoader()
		//			filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/alphaimage.png');
		//		will be adjusted to:
		//			filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='level1/images/alphaimage.png');
		//
		//		Please note that any relative paths in AlphaImageLoader in external css files wont work, as
		//		the paths in AlphaImageLoader is MUST be declared relative to the HTML page,
		//		not relative to the CSS file that declares it

		if(!cssText || !cssUrl){ return; }

		// support the ImageAlphaFilter if it exists, most people use it in IE 6 for transparent PNGs
		// We are NOT going to kill it in IE 7 just because the PNGs work there. Somebody might have
		// other uses for it.
		// If user want to disable css filter in IE6  he/she should
		// unset filter in a declaration that just IE 6 doesn't understands
		// like * > .myselector { filter:none; }
		if(alphaImageLoader){
			cssText = cssText.replace(alphaImageLoader, function(ignore, pre, delim, url, post){
				return pre + (new dojo._Url(cssUrl, './'+url).toString()) + post;
			});
		}

		return cssText.replace(cssPaths, function(ignore, delimStr, strUrl, delimUrl, urlUrl, media){
			if(strUrl){
				return '@import "' + (new dojo._Url(cssUrl, './'+strUrl).toString()) + '"' + media;
			}else{
				return 'url(' + (new dojo._Url(cssUrl, './'+urlUrl).toString()) + ')' + media;
			}
		});
	};

	// attributepaths one tag can have multiple paths, example:
	// <input src="..." style="url(..)"/> or <a style="url(..)" href="..">
	// <img style='filter:progid...AlphaImageLoader(src="noticeTheSrcHereRunsThroughHtmlSrc")' src="img">
	var htmlAttrPaths = /(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;

	var adjustHtmlPaths = dojox.html._adjustHtmlPaths = function(htmlUrl, cont){
		var url = htmlUrl || "./";

		return cont.replace(htmlAttrPaths,
			function(tag, start, name, delim, relUrl, delim2, cssText, end){
				return start + (name ?
							(name + '=' + delim + (new dojo._Url(url, relUrl).toString()) + delim)
						: ('style=' + delim2 + adjustCssPaths(url, cssText) + delim2)
				) + end;
			}
		);
	};
	
	var snarfStyles = dojox.html._snarfStyles = function	(/*String*/cssUrl, /*String*/cont, /*Array*/styles){
		/****************  cut out all <style> and <link rel="stylesheet" href=".."> **************/
		// also return any attributes from this tag (might be a media attribute)
		// if cssUrl is set it will adjust paths accordingly
		styles.attributes = [];

		return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,
			function(ignore, styleAttr, cssText, linkAttr, delim, href){
				// trim attribute
				var i, attr = (styleAttr||linkAttr||"").replace(/^\s*([\s\S]*?)\s*$/i, "$1");
				if(cssText){
					i = styles.push(cssUrl ? adjustCssPaths(cssUrl, cssText) : cssText);
				}else{
					i = styles.push('@import "' + href + '";');
					attr = attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi, ""); // remove rel=... and href=...
				}
				if(attr){
					attr = attr.split(/\s+/);// split on both "\n", "\t", " " etc
					var atObj = {}, tmp;
					for(var j = 0, e = attr.length; j < e; j++){
						tmp = attr[j].split('='); // split name='value'
						atObj[tmp[0]] = tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/, "$1"); // trim and remove ''
					}
					styles.attributes[i - 1] = atObj;
				}
				return "";
			}
		);
	};

	var snarfScripts = dojox.html._snarfScripts = function(cont, byRef){
		// summary
		//		strips out script tags from cont
		// invoke with
		//	byRef = {errBack:function(){/*add your download error code here*/, downloadRemote: true(default false)}}
		//	byRef will have {code: 'jscode'} when this scope leaves
		byRef.code = "";

		//Update script tags nested in comments so that the script tag collector doesn't pick
		//them up.
		cont = cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,
			function(comment){
				return comment.replace(/<(\/?)script\b/ig,"&lt;$1Script");
			}
		);

		function download(src){
			if(byRef.downloadRemote){
				// console.debug('downloading',src);
				//Fix up src, in case there were entity character encodings in it.
				//Probably only need to worry about a subset.
				src = src.replace(/&([a-z0-9#]+);/g, function(m, name) {
					switch(name) {
						case "amp"	: return "&";
						case "gt"	: return ">";
						case "lt"	: return "<";
						default:
							return name.charAt(0)=="#" ? String.fromCharCode(name.substring(1)) : "&"+name+";";
					}
				});
				dojo.xhrGet({
					url: src,
					sync: true,
					load: function(code){
						byRef.code += code+";";
					},
					error: byRef.errBack
				});
			}
		}
		
		// match <script>, <script type="text/..., but not <script type="dojo(/method)...
		return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,
			function(ignore, delim, src, code){
				if(src){
					download(src);
				}else{
					byRef.code += code;
				}
				return "";
			}
		);
	};
	
	var evalInGlobal = dojox.html.evalInGlobal = function(code, appendNode){
		// we do our own eval here as dojo.eval doesn't eval in global crossbrowser
		// This work X browser but but it relies on a DOM
		// plus it doesn't return anything, thats unrelevant here but not for dojo core
		appendNode = appendNode || dojo.doc.body;
		var n = appendNode.ownerDocument.createElement('script');
		n.type = "text/javascript";
		appendNode.appendChild(n);
		n.text = code; // DOM 1 says this should work
	};

	dojo.declare("dojox.html._ContentSetter", [dojo.html._ContentSetter], {
		// adjustPaths: Boolean
		//		Adjust relative paths in html string content to point to this page
		//		Only useful if you grab content from a another folder than the current one
		adjustPaths: false,
		referencePath: ".",
		renderStyles: false,

		executeScripts: false,
		scriptHasHooks: false,
		scriptHookReplacement: null,
		
		_renderStyles: function(styles){
			// insert css from content into document head
			this._styleNodes = [];
			var st, att, cssText, doc = this.node.ownerDocument;
			var head = doc.getElementsByTagName('head')[0];

			for(var i = 0, e = styles.length; i < e; i++){
				cssText = styles[i]; att = styles.attributes[i];
				st = doc.createElement('style');
				st.setAttribute("type", "text/css"); // this is required in CSS spec!

				for(var x in att){
					st.setAttribute(x, att[x]);
				}

				this._styleNodes.push(st);
				head.appendChild(st); // must insert into DOM before setting cssText

				if(st.styleSheet){ // IE
					st.styleSheet.cssText = cssText;
				}else{ // w3c
					st.appendChild(doc.createTextNode(cssText));
				}
			}
		},

		empty: function() {
			this.inherited("empty", arguments);
			
			// empty out the styles array from any previous use
			this._styles = [];
		},
		
		onBegin: function() {
			// summary
			//		Called after instantiation, but before set();
			//		It allows modification of any of the object properties - including the node and content
			//		provided - before the set operation actually takes place
			//		This implementation extends that of dojo.html._ContentSetter
			//		to add handling for adjustPaths, renderStyles on the html string content before it is set
			this.inherited("onBegin", arguments);
			
			var cont = this.content,
				node = this.node;
				
			var styles = this._styles;// init vars

			if(dojo.isString(cont)){
				if(this.adjustPaths && this.referencePath){
					cont = adjustHtmlPaths(this.referencePath, cont);
				}

				if(this.renderStyles || this.cleanContent){
					cont = snarfStyles(this.referencePath, cont, styles);
				}

				// because of a bug in IE, script tags that is first in html hierarchy doesnt make it into the DOM
				//	when content is innerHTML'ed, so we can't use dojo.query to retrieve scripts from DOM
				if(this.executeScripts){
					var _t = this;
					var byRef = {
						downloadRemote: true,
						errBack:function(e){
							_t._onError.call(_t, 'Exec', 'Error downloading remote script in "'+_t.id+'"', e);
						}
					};
					cont = snarfScripts(cont, byRef);
					this._code = byRef.code;
				}
			}
			this.content = cont;
		},
		
		onEnd: function() {
			// summary
			//		Called after set(), when the new content has been pushed into the node
			//		It provides an opportunity for post-processing before handing back the node to the caller
			//		This implementation extends that of dojo.html._ContentSetter
			
			var code = this._code,
				styles = this._styles;
				
			// clear old stylenodes from the DOM
			// these were added by the last set call
			// (in other words, if you dont keep and reuse the ContentSetter for a particular node
			// .. you'll have no practical way to do this)
			if(this._styleNodes && this._styleNodes.length){
				while(this._styleNodes.length){
					dojo.destroy(this._styleNodes.pop());
				}
			}
			// render new style nodes
			if(this.renderStyles && styles && styles.length){
				this._renderStyles(styles);
			}

			if(this.executeScripts && code){
				if(this.cleanContent){
					// clean JS from html comments and other crap that browser
					// parser takes care of in a normal page load
					code = code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g, '');
				}
				if(this.scriptHasHooks){
					// replace _container_ with this.scriptHookReplace()
					// the scriptHookReplacement can be a string
					// or a function, which when invoked returns the string you want to substitute in
					code = code.replace(/_container_(?!\s*=[^=])/g, this.scriptHookReplacement);
				}
				try{
					evalInGlobal(code, this.node);
				}catch(e){
					this._onError('Exec', 'Error eval script in '+this.id+', '+e.message, e);
				}
			}
			this.inherited("onEnd", arguments);
		},
		tearDown: function() {
			this.inherited(arguments);
			delete this._styles;
			// only tear down -or another set() - will explicitly throw away the
			// references to the style nodes we added
			if(this._styleNodes && this._styleNodes.length){
				while(this._styleNodes.length){
					dojo.destroy(this._styleNodes.pop());
				}
			}
			delete this._styleNodes;
			// reset the defaults from the prototype
			dojo.mixin(this, dojo.getObject(this.declaredClass).prototype);
		}
		
	});
	
	dojox.html.set = function(/* DomNode */ node, /* String|DomNode|NodeList */ cont, /* Object? */ params){
		// TODO: add all the other options
			// summary:
			//		inserts (replaces) the given content into the given node
			//	node:
			//		the parent element that will receive the content
			//	cont:
			//		the content to be set on the parent element.
			//		This can be an html string, a node reference or a NodeList, dojo.NodeList, Array or other enumerable list of nodes
			//	params:
			//		Optional flags/properties to configure the content-setting. See dojo.html._ContentSetter
			//	example:
			//		A safe string/node/nodelist content replacement/injection with hooks for extension
			//		Example Usage:
			//		dojo.html.set(node, "some string");
			//		dojo.html.set(node, contentNode, {options});
			//		dojo.html.set(node, myNode.childNodes, {options});
	 
		if(!params){
			// simple and fast
			return dojo.html._setNodeContent(node, cont, true);
		}else{
			// more options but slower
			var op = new dojox.html._ContentSetter(dojo.mixin(
					params,
					{ content: cont, node: node }
			));
			return op.set();
		}
	};
	
})();

}

if(!dojo._hasResource["CodeGlass.base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.base"] = true;
dojo.provide("CodeGlass.base");




// Why do we have to include this???










// make it fancy


// Code beautifying






//dojo.registerModulePath("CodeGlass.plugins", "../CodeGlass/plugins/dojo");

dojo.declare("CodeGlass.base",
	[dijit._Widget, dijit._Templated],
	{
	// summary:
	//		Simple widget allowing you to create complex demos
	//		for documentation projects
	// description:
	//		CodeClass allows...

	// width:
	//		default width of the viewer
	width: "700",

	// height:
	//		default height of the viewer
	height: "400",

	// src:
	//		optional src parameter to display external URL
	//		e.g. http://www.google.com
	src: "",

	// plugins:
	//		Plugins which get hooked into CodeGlass
	plugins: [
		  "dojo.version", "dojo.i18n", "dojo.extra",
		  "dojo.themes", "dojo.a11y", "dojo.dir"
	],

	// chrome:
	//		Chrome to be used for CodeGlass viewer
	chrome: "default",

	// pluginArgs:
	//		Object of arguments which get passed to all plugins
	pluginArgs: {},

	// type:
	//		Viewer type
	//		Can be type, inline and basic
	type: "dialog",

	constructor: function(){
		// summary:
		//		Declare properties we inject into the plugins
		//		This gets done here because as properties of
		//		the base object they would be the same for all
		//		instances.

		this.injectToolbars = [];
		this.injectVars = [];
	},

	postMixInProperties: function(){
		// summary:
		//		parse the child nodes and put the contents into
		//		the content object which then can be used by
		//		the dialog or other content display mechanisms

		// content:
		//		The Dom nodes of the srcNodeRef which we will
		//		parse.
		this.content = {};

		if (this.src){
			this.content.src = this.src;
		}else{
			this.content = this.parseNodes(this.srcNodeRef)
		}

		// Setting template path. This will define the basic l&f of
		// CodeGlass
		this["templatePath"] = dojo.moduleUrl(
			"CodeGlass.chromes." + this.chrome, "template.html"
		);
	},

	postCreate: function(){
		// summary:
		//		We do the preparation for the respective view
		//		here. Plugins get loaded dynamically and on
		//		asynch load we initialize CodeGlass

		// check whether we display an inline CodeGlass or a dialog
		var d = dojo;
		if (this.type == "dialog" || this.type == "basic"){
			d.place(this.viewerNode, d.body(), "last");
			d.removeClass(
				this.type == "dialog" ?
					this.nodeDialog : this.nodeBasic
				, "displayNone");

			d.connect(window, "onresize", this, "_position");
			d.subscribe("codeglass/open", this, function(t){
				if (this.isOpen && t != this){
					this.hide();
				}
			});
		}

		// FIXME: this should be hanled via a CSS class
		if (this.type == "basic"){
			d.style(this.domNode, "display", "inline");
		}

		// Register plugins
		d.forEach(this.plugins, function(plg){
			d["require"]("CodeGlass.plugins." + plg);
		});

		d.ready(this, function(){
			this._initPlugins();
			this._setupViewer();
		});
	},

	_initPlugins: function(){
		// summary:
		//		Create an instance of every loaded plugin and
		//		subscribe to plugin change events to allow
		//		cross plugin communication.

		this.pluginInstances = []; // Resetting plugin instances
		this.pluginSharedVars = []; // Resetting plugin shared vars

		dojo.forEach(this.plugins, function(plg){
			var o = dojo.getObject("CodeGlass.plugins." + plg),
				instance = new o({
					sharedVars: this.pluginSharedVars,
					vars: this.pluginArgs,
					codeGlassBaseId: this.id
				})
			;
			this.pluginInstances.push(instance);
			this._preparePlugin(instance);
		}, this);

		dojo.subscribe("CodeGlass/plugin/change/" + this.id, this, "_refreshViewer");
	},

	_preparePlugin: function(instance){
		// summary:
		//		retrieves the plugin info object so CodeGlass
		//		knows what to inject into its view.
		var props = instance.getVars();
		if (props.injectToolbar){
			// Init injectToolbars object
			if (!this.injectToolbars[props.injectToolbar]){
				 this.injectToolbars[props.injectToolbar] = [];
			}
			this.injectToolbars[props.injectToolbar]
				.push(instance.domNode);
		}
		// If the plugin has iframeProps we add those to the injectVars
		// object so CodeGlass can use them in the to be parsed
		// template
		if (props.iframeProps){
			for(var p in props.iframeProps){
				if (!this.injectVars[p]){
					this.injectVars[p] = "";
				}
				this.injectVars[p] += props.iframeProps[p];
			}
		}
	},

	_refreshViewer: function(){
		// summary:
		//	Reretrieves the plugin info object and rerenders the
		//	view. This is used by the plugins in case their values
		//	change and they require CodeGlass to reflect that
		//	change in the view.

		this.injectToolbars = [];
		this.injectVars = [];
		dojo.forEach(this.pluginInstances, function(plugin){
			this._preparePlugin(plugin);
		}, this);

		// FIXME: It might be nicer if this was a setter
		// and not a property
		this.viewer.toolbars = this.injectToolbars;
		this.viewer.iframeVars = this.injectVars;
		this.viewer._setup();
	},

	_setupViewer: function(){
		// summary:
		//	The actual CodeGlass.CodeViewer will get instantiated
		//	here. Toolbars and iframeVars get injected into the
		//	object here as well.
		var v = this.viewer = new CodeGlass.CodeViewer({
			id: this.id+"_Content",
			content: this.content,
			viewerBox: { w: this.width, h: this.height },
			iframeTemplate: dojo["cache"](
				"CodeGlass.chromes."+this.chrome, "iframe.html"
			),
			toolbars: this.injectToolbars,
			iframeVars: this.injectVars,
			showHeader: ( 	// this is a rather special property
					// since it is only of use in the case
					// that we display the header in a
					// dialog. Maybe this can be done nicer
				this.type == "inline" && this.src.length ?
				false : true
			)
		}, this.viewerNode);

		dojo.addClass(v.domNode, "CodeGlassViewer"+this.chrome);
		if (this.type == "dialog" || this.type == "basic"){
			// FIXME: this doesn't get cleaned up correctly
			dojo.query(".header .close", v.domNode)
				.removeClass("displayNone")
				.onclick(dojo.hitch(this, function(e){
					this.hide();
				})
			);
		}else{
			dojo.removeClass(v.domNode, "displayNone");
			v._setupIframe();

			dojo.addClass(v.domNode, "CodeGlassInline"+this.chrome);
		}
	},

	show: function(e){
		// summary:
		//		show the dialog and position it correctly
		//		on screen
		e.preventDefault(e);

		if (this.isOpen){
			return;
		}

		this.ce = dojo.coords(e.target, true);
		this._position();

		var v = this.viewer;
		v._toggleView();

		dojo.publish("codeglass/open", [this]);

		dojo.animateProperty({
			node: v.domNode,
			beforeBegin: dojo.hitch(this, function(){
				dojo.removeClass(v.domNode, "displayNone");
				dojo.query(".wrapper", v.domNode).style({
					"visibility": "hidden"
				});
			}),
			properties: {
				width: { start: this.ce.w, end: this.width},
				height: { start: this.ce.h, end: this.height},
				top: { start: this.ce.y, end: this.top },
				left: { start: this.ce.x, end: this.left }
			},
			duration: 300,
			onEnd: dojo.hitch(this, function(){
				dojo.style(v.loader, "opacity", "0");
				dojo.query(".wrapper", v.domNode).style({
					"visibility": "visible"
				});
				v._setupIframe();
				this.isOpen = true;
			})
		}).play();
	},

	hide: function(e){
		// summary:
		//		hide dialog

		var v = this.viewer;
		dojo.query(".wrapper", v.domNode)
			.style("visibility", "hidden");

		dojo.animateProperty({
			node: v.domNode,
			properties: {
				width: this.ce.w,
				height: this.ce.h,
				top: this.ce.y,
				left: this.ce.x
			},
			onEnd: dojo.hitch(this, function(){
				dojo.addClass(v.domNode, "displayNone");
				this.isOpen = false;
			})
		}).play();
	},

	_position: function(){
		// summary:
		//		positions dialog and background layer and
		//		additionally sizes background layer correctly

		// IE fires this even before we initialized the viewer
		if (!this.viewer || !this.viewer.domNode){
			return;
		}

		var dim = dijit.getViewport();

		this.top = dim.t+dim.h/2-this.height/2;
		this.left = dim.l+dim.w/2-this.width/2;

		dojo.style(this.viewer.domNode, {
			top: this.top+"px",
			left: this.left+"px"
		});
	},

	parseNodes: function(node){
		var el = node.firstChild,
				i = 0, frg = dojo.create('div'),
				tarea = dojo.create('textarea'),
				code, content = [];

		while (el){
			// The logic is kinda reverse and the markup confusing.
			// We are putting every node before a node with the
			// lang attribute into an object with the node
			// with the actual attribute.
			if (dojo.attr(el, "lang") != null){
				// Unescape HTML and make it look fancy
				code = dojo.query("pre", el).attr("innerHTML");
				//tarea[(
				//       dojo.isIE < 8 ? "innerText" : "innerHTML"
				//)] = code;
				// .innerText is not required for IE
				tarea.innerHTML = code;

				code = tarea.value;
				content[el.lang] = {
					"content": frg.innerHTML,
					"label": dojo.attr(el, "label"),
					"lang": el.lang,
					"code": code,
					"index": i
				};

				frg.innerHTML = ""; // reset fragment
			}else{
				frg.appendChild(dojo.clone(el));
			}
			el = el.nextSibling;
			i++;
		}
		// destroy some nodes we don't need
		dojo.destroy(tarea);
		dojo.destroy(frg);

		return content;
	}
});

// Simple iframe driven codeviewer
dojo.declare("CodeGlass.CodeViewer",
	[dijit._Widget, dojox.dtl._DomTemplated],
	{
	// summary:
	//		CodeViewer is a widget which provides you with options
	//		to execute code examples for documentation purposes.

	// templatePath:
	//		Path to the dialog template
	templateString: dojo.cache("CodeGlass", "templates/codeViewer.html", "<div class=\"codeGlassViewer displayNone\">\n\t<div class=\"wrapper\">\n\t\t<div class=\"header {% if not showHeader %}displayNone{% endif %}\" dojoAttachEvent=\"onclick: _toggleView\"\n\t\t\t>{% if showTabs %}<div title=\"containerIframe\" class=\"menuItem demo active\"><a href='#' dojoAttachPoint=\"firstLink\">Demo</a></div\n\t\t\t><div title=\"containerFull\" class=\"menuItem copy\"><a href=\"#\">Copy &amp; Paste</a></div\n\t\t\t\t>{% if javascriptcode %}<div title=\"containerJs\" class=\"menuItem javascript\"><a href='#'>JavaScript</a></div\n\t\t\t\t>{% endif %}{% if htmlcode %}<div title=\"containerHtml\" class=\"menuItem html\"><a href='#'>HTML</a></div\n\t\t\t\t>{% endif %}{% if csscode %}<div title=\"containerCss\" class=\"menuItem css\"><a href='#'>CSS</a></div>{% endif %}{% endif %}\n\t\t\t<div class=\"close displayNone\"><a href=\"#\"><span style=\"visibility:hidden\">X</span></a></div>\n\t\t</div>\n\t\t<div dojoAttachPoint=\"contentWrapper\" class=\"contentWrapper\">\n\t\t\t<div dojoAttachPoint=\"containerIframe\" class=\"iframe container\">\n\t\t\t\t<div dojoAttachPoint=\"loader\" class=\"loader\"><span>&nbsp;</span></div>\n\t\t\t</div>\n\t\t\t<div dojoAttachPoint=\"containerFull\" class=\"full container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\"><a href=\"#\">Copy to clipboard</a></div>\n\t\t\t\t\t<p>To run the demo in your own environment, copy and paste the full source into an editor and open it in a browser.</p>\n\t\t\t\t</div>\n\t\t\t\t<textarea dojoAttachPoint=\"textareaCode\">{{ renderedContent }}</textarea>\n\t\t\t</div>\n\t\t\t{% if javascriptcode %}\n\t\t\t<div dojoAttachPoint=\"containerJs\" class=\"js container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\">Copy to clipboard</div>\n\t\t\t\t\t{% if javascriptlabel %}<h1>{{ javascriptlabel|safe }}</h1>{% endif %}\n\t\t\t\t\t<div class=\"content\">{% if javascriptcontent %}{{ javascriptcontent|safe }}{% endif %}</div>\n\t\t\t\t</div>\n\t\t\t\t<pre>\n\t\t\t\t\t<code class=\"javascript\">{{ javascriptcode }}</code>\n\t\t\t\t</pre>\n\t\t\t</div>\n\t\t\t{% endif %}\n\t\t\t{% if htmlcode %}\n\t\t\t<div dojoAttachPoint=\"containerHtml\" class=\"html container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\">Copy to clipboard</div>\n\t\t\t\t\t{% if htmllabel %}<h1>{{ htmllabel|safe }}</h1>{% endif %}\n\t\t\t\t\t<div class=\"content\">{% if htmlcontent %}{{ htmlcontent|safe }}{% endif %}</div>\n\t\t\t\t</div>\n\t\t\t\t<pre>\n\t\t\t\t\t<code class=\"html\">{{ htmlcode }}</code>\n\t\t\t\t</pre>\n\t\t\t</div>\n\t\t\t{% endif %}\n\t\t\t{% if csscode %}\n\t\t\t<div dojoAttachPoint=\"containerCss\" class=\"css container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\">Copy to clipboard</div>\n\t\t\t\t\t{% if csslabel %}<h1>{{ csslabel|safe }}</h1>{% endif %}\n\t\t\t\t\t<div class=\"content\">{% if csscontent %}{{ csscontent|safe }}{% endif %}</div>\n\t\t\t\t</div>\n\t\t\t\t<pre>\n\t\t\t\t\t<code class=\"css\">{{ csscode }}</code>\n\t\t\t\t</pre>\n\t\t\t</div>\n\t\t\t{% endif %}\n\t\t</div>\n\t\t<div class=\"footer {% if not showFooter %}displayNone{% endif %}\" dojoAttachPoint=\"toolbarBottom\">\n\t\t\t{% if toolbarBottom %}{{ toolbarBottom|safe }}{% endif %}\n\t\t</div>\n\t</div>\n</div>\n"),

	// iframeTemplate:
	//		Template for the actual content of the iframe
	iframeTemplate: dojo.cache("CodeGlass", "templates/iframe.html", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n<html {% if html %}{{ html|safe }}{% endif %}>\n\t<head>\n\t\t{% if customHead %}{{ customHead|safe }}{% endif %}\n\t\t<style type=\"text/css\">\n\t\t\tbody, html {\n\t\t\t\tfont-family:helvetica,arial,sans-serif;\n\t\t\t\tfont-size:90%;\n\t\t\t}\n\t\t</style>\n\t\t{% if csscode %}{{ csscode|safe }}{% endif %}\n\t</head>\n\t<body {% if classBody %}class=\"{{ classBody }}\"{% endif %}>\n\t\t{% if htmlcode %}{{ htmlcode|safe }}{% endif %}\n\t</body>\n\n\t{% if customJavaScript %}{{ customJavaScript|safe }}{% endif %}\n\t{% if javascriptcode %}{{ javascriptcode|safe }}{% endif %}\n\n\t<!--\n\t\tNOTE: the following script tag is not intended for usage in real world!!\n\t\tit is part of the CodeGlass and you should just REMOVE it when you use the code\n\t-->\n\t<script type=\"text/javascript\">\n\t\tdojo.addOnLoad(function(){\n\t\t\tif (document.pub){\n\t\t\t\tdocument.pub();\n\t\t\t}\n\t\t});\n\t</script>\n</html>\n"),

	// currentView:
	//		Default is demo tab
	currentView: "containerIframe",

	// showHeader:
	//		Toggle header display
	showHeader: true,

	// showFooter:
	//		Toggle footer display
	showFooter: true,

	// showTabs:
	//		Toggle tab display
	showTabs: true,

	// toolbars:
	//		Array of toolbar items to be shown
	toolbars: null,

	// iframeVars:
	//		Array of variables which get injected into and rendered
	//		by the iframe
	iframeVars: null,

	constructor: function(args){
		this.toolbars = this.toolbars || [];
		this.iframeVars = this.iframeVars || [];
	},

	postMixInProperties: function(){
		// summary:
		//		Setting up the data to be rendered

		if (this.content.src){
			this.showTabs = false;
			this.showFooter = false;
		}else{
			this._buildTemplate();
		}
	},

	postCreate: function(){
		// summary:
		//		do all necessary setup and create background overlay. FIXME: should we add this to the template maybe?
		// build toolbars
		for (var toolbar in this.toolbars){
			dojo.forEach(this.toolbars[toolbar], function(n){
				this[toolbar].appendChild(n);
			}, this);
		}

		// setting the iframes width/height
		dojo.style(this.domNode, {
			width: this.viewerBox.w + "px",
			height: this.viewerBox.h + "px"
		});

		// setting margin of contentWrapper
		if (!this.showHeader){
			dojo.style(this.contentWrapper, "marginTop", 0+"px");
		}
		if (!this.showFooter){
			dojo.style(this.contentWrapper, "marginBottom", 0+"px");
		}

		// Hide header and footer during initialization
		dojo.query(".header > div, .footer > div", this.domNode).addClass("displayNone");
		dojo.subscribe("codeglass/loaded", this, function(){
			if (this == arguments[0]){
				dojo.fadeOut({
					node: this.loader,
					onEnd: dojo.hitch(this, function(){
						dojo.addClass(this.loader, "displayNone");
						dojo.query(".header > div, .footer > div", this.domNode).removeClass("displayNone");
						// only if we AREN't an inline example:
						setTimeout(dojo.hitch(this, function(){
							//console.log(this.isDialog, this.firstLink);
							//this.isDialog && console.log("wanting to focus!", this.firstLink);
							this.isDialog && this.firstLink && this.firstLink.focus();
						}), 25);
					})
				}).play();
			}
		});

		this._highlight();

		this.iframe = dojo.create("iframe", {}, this.containerIframe);
	},

	_buildTemplate: function(){
		// summary:
		//		Builds the template and renders all available
		//		variables
		var t = {}, key, frgTmpl, context;

		for (var dtlVar in this.iframeVars){
			t[dtlVar] = this.iframeVars[dtlVar];
		}
		for (var type in this.content){
			for (key in this.content[type]){
				// render code fragments
				var tk = type + "" + key;
				if (key == "code"){
					frgTmpl = new dojox.dtl.Template(this.content[type][key]);
					// we use the context for all rendered templates (user shouldn't see the replacements!)
					context = new dojox.dtl.Context(t);
					this[tk] = t[tk] = CodeGlass.style_html(frgTmpl.render(context), 4);
				}else{
					this[tk] = t[tk] = this.content[type][key];
				}
			}
		}
		var template = new dojox.dtl.Template(this.iframeTemplate);
		
		context = new dojox.dtl.Context(t);
		this.renderedContent = CodeGlass.style_html(template.render(context), 4);
	},

	_setupIframe: function(){
		// summary:
		//		creates iframe with the actual code to be executed

		// Clear iframe
		if (this.iframe){
			dojo.destroy(this.iframe);
		}

		this.iframe = dojo.create("iframe", {}, this.containerIframe);
		if (!this.content.src){
 			var doc = this.iframe.contentWindow.document,
 				content = this.renderedContent;

			doc.open();
			if (!dojo.isIE){
				doc.write(content);
				doc.close();
			}else{
				
				var bits = content.split("<" + "/script>"),
					lastBit = bits.pop(),
					currentScript; // the last script tag written into the iframe

				var readyStateCheck = function(){ // event handler for script blocks
					if(currentScript.readyState == "complete" || currentScript.readyState == "loaded"){
						// inline scripts: "complete", external scripts: "loaded"
						currentScript.detachEvent("onreadystatechange", readyStateCheck);
						writeNextBitIE();
					}
				};

				var writeNextBitIE = function(){
					var bit = bits.shift();

					if(dojo.isString(bit)){
						doc.write(bit + "<" + "/script>");
						currentScript = dojo.query("script", doc).pop();
						currentScript.attachEvent("onreadystatechange", readyStateCheck);
						readyStateCheck();
					}else{
						doc.write(lastBit);
						if(dojo.isIE > 7){ // otherwise IE8 freezes
							setTimeout(function(){
								doc.close();
							}, 100);
						}
						else {
							doc.close();
						}

					}
				};
				writeNextBitIE();
			}
 			doc.pub = dojo.hitch(this, function(){
 				dojo.publish("codeglass/loaded", [this]);
 			});
		}else{
			
			var e;
			// dojo.connect doesn't work on iframes in IE, see #9609
			if (this.iframe.addEventListener) {
				e = this.iframe.addEventListener("load", dojo.hitch(this, function(){
					dojo.publish("codeglass/loaded", [this]);
					this.iframe.removeEventListener(e);
				}) , false);
			} else if (this.iframe.attachEvent) {
				e = this.iframe.attachEvent("onload", dojo.hitch(this, function(){
					dojo.publish("codeglass/loaded", [this]);
					this.iframe.detachEvent(e);
				}));
			}
			dojo.attr(this.iframe, "src", this.content.src);
		}

		// setup pub hook for notification when everything is ready
		dojo.query(this.loader).removeClass("displayNone").style("opacity", 1);
	},

	_setup: function(){
		// summary:
		//		Helper function which makes sure the lifecycle
		//		of the template generation gets executed correctly

		dojo.query(".header ul", this.domNode).addClass("displayNone");
		this._buildTemplate(); // redraw iframe content
		this._toggleView(); // reset view to iframe to prevent errors initializing the demo on nodes with display: none
		this._setupIframe();

		this.textareaCode.value = this.renderedContent;
	},

	_toggleView: function(e){
		// summary:
		//		Simple toggle function to switch between
		//		available views

		e && e.preventDefault();

		var attr = e ? (dojo.attr(e.target, "title") || dojo.attr(e.target.parentNode, "title")) : null,
			type = attr ? attr : "containerIframe";
		if (this[type]){
			dojo.query('[title$=\"'+this.currentView+'\"]', this.domNode).removeClass("active");
			dojo.toggleClass(this[this.currentView], "displayNone");

			dojo.query('[title$=\"'+type+'\"]', this.domNode).addClass("active");
			dojo.toggleClass(this[type], "displayNone");

			this.currentView = type;

			// only do the sizing here once nodes are displayed
			this._size(this[type]);
		}
	},

	_highlight: function(){
		// summary:
		//		Code highlighting based on dojox.highlight

		dojo.query("code", this.domNode).forEach(dojox.highlight.init);
	},

	_size: function(node){
		// summary:
		//		Sizes the textareas and info nodes acording to
		//		viewer height

		// If we wouldn't have to support IE we could go for CSS3 here =/ aaarrrrrgghhh

		if (!this._sized){
			this._sized = {};
		}

		if (this._sized[node.className]){
			return;
		}
		// size inner elements properly
		var info = dojo.query("> div.info", node)[0];
		if (info){
			var typeCoords = dojo.coords(node),
				infoCoords = dojo.marginBox(info);

			dojo.query("textarea", node).style("height", (typeCoords.h-infoCoords.h)+"px");
			dojo.query("pre", node).style("height", (typeCoords.h-infoCoords.h-10)+"px"); // Subtracting 10 pixels because of box model padding :(
		}
		this._sized[node.className] = true;
	},

	_copyClipboard: function(){
		// summary:
		//		Helper function to copy code samples to clipboard

		console.warn("Not working yet :(\nDo you know flash and can write something to support this feature cross browser?\nThat would be awesome!!");
	}
});

// Extend nodelist
dojo.extend(dojo.NodeList, {
	CodeGlass: function(/* Object? */params){
		var o = dojo.getObject("CodeGlass.base");
		return this.forEach(function(elm){
			dojo.mixin({ type: "dialog" }, params);
			new o(params, elm);
		});
	}
});

}

if(!dojo._hasResource["CodeGlass.plugins._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins._base"] = true;
dojo.provide("CodeGlass.plugins._base");




dojo.declare("CodeGlass.plugins._base", dijit._Widget, {

	sharedVars: [],

	codeGlassBaseId: null,

	constructor: function(args){
		if (args.sharedVars){
			this.sharedVars = args.sharedVars;
		}
		if (args.vars){
			dojo.mixin(this, args.vars);
		}
	},

	getVars: function(){
		return {};
	}
});

dojo.provide("CodeGlass.plugins._baseTemplated");
dojo.declare("CodeGlass.plugins._baseTemplated", [CodeGlass.plugins._base, dijit._Templated],{
	injectToolbar: "toolbarBottom"
});

}

if(!dojo._hasResource["CodeGlass.plugins.dojo.version"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins.dojo.version"] = true;
dojo.provide("CodeGlass.plugins.dojo.version");



dojo.declare("CodeGlass.plugins.dojo.version",
	CodeGlass.plugins._baseTemplated,
	{

	injectNode: null,

	templateString: '<div class="menuItem version">Version: <select dojoAttachEvent="onchange: _changeVersion" dojoAttachPoint="versionInput"></select></div>',

	baseUrls: [
		{
			baseUrl:"http://ajax.googleapis.com/ajax/libs/dojo/1.6/",
			label: "1.6 (CDN)",
			xDomain: true,
			version: "1.6"
		},

		{
			baseUrl:"http://ajax.googleapis.com/ajax/libs/dojo/1.5/",
			label: "1.5 (CDN)",
			xDomain: true,
			version: "1.5"
		},

		{
			baseUrl: "http://ajax.googleapis.com/ajax/libs/dojo/1.4/",
			label: "1.4 (CDN)",
			xDomain: true,
			version: "1.4"
		},
		{
			baseUrl: "http://ajax.googleapis.com/ajax/libs/dojo/1.3/",
			label: "1.3 (CDN)",
			xDomain: true,
			version: "1.3"
		},
		{
			baseUrl: "http://ajax.googleapis.com/ajax/libs/dojo/1.2/",
			label: "1.2 (CDN)",
			xDomain: true,
			version: "1.2"
		},
		{
			// is default location for relative path'd dojo.js (CodeGlass == sibling of dojo/)
			baseUrl: dojo.config.baseUrl + "../../",
			label: "Trunk (slow)",
			xDomain: false,
			version: "trunk"
		}
	],

	baseUrl: "",

	baseUrlIndex: 0,

	version: "",

	djConfig: "parseOnLoad: true",

	injectToolbar: "toolbarBottom",

	postCreate: function(){
		if (this.version.length){
			var v = this.version.split("-"),
				start = v[0] > "0" ? v[0] : "0",
				end = v[1] ? v[1] : null;
		}

		var cnt = -1;
		this.suppVersions = [];
		// it is possible to inject baseUrls externally
		if(typeof(CodeGlassConfig) != "undefined" && typeof(CodeGlassConfig.baseUrls) != "undefined"){
			this.baseUrls = this.baseUrls.concat(CodeGlassConfig.baseUrls);
		}

		dojo.forEach(this.baseUrls, function(url, i){
			if ((!start || url.version >= start) && (!end || url.version <= end) || !url.version){
				this.suppVersions.push(i);
				++cnt;
			}
		}, this);

		this.baseUrlIndex = this.suppVersions[0]; // Set index of first array value
		dojo.forEach(this.suppVersions, function(version){
			dojo.create("option", { innerHTML: this.baseUrls[version].label, value: version }, this.versionInput);
		}, this);

		this.versionInput.selectedIndex = 0;
		this.sharedVars.djConfig = [];
		this._setSharedVars();
	},

	getVars: function(){
		// setup djConfig string
		var djConfig = [];
		for (var plugin in this.sharedVars.djConfig){
			djConfig.push(this.sharedVars.djConfig[plugin]);
		}
		return {
			injectToolbar: this.injectToolbar,
			iframeProps: {
				"baseUrl": this.baseUrls[this.baseUrlIndex].baseUrl,
				"baseUrlIndex": this.baseUrlIndex,
				"customJavaScript": '<scr' + 'ipt src="'
					+ this.baseUrls[this.baseUrlIndex].baseUrl + 'dojo/dojo' + (this.baseUrls[this.baseUrlIndex].xDomain ? ".xd" : "")
					+ '.js" djConfig="' + djConfig.join(",") + '"><' + '/scr' + 'ipt>'
			}
		};
	},

	_setSharedVars: function(){
		this.sharedVars.baseUrlIndex = this.baseUrlIndex;
		this.sharedVars.baseUrl = this.baseUrls[this.baseUrlIndex].baseUrl;
		this.sharedVars.djConfig["version"] = this.djConfig;
	},

	_changeVersion: function(){
		this.baseUrlIndex = this.versionInput.value;
		this.baseUrl = this.baseUrls[this.baseUrlIndex].baseUrl;

		this._setSharedVars();

		dojo.publish("CodeGlass/plugin/change/" + this.codeGlassBaseId, ["dojo.version"]);
	}
	
});

}

if(!dojo._hasResource["CodeGlass.plugins.dojo.i18n"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins.dojo.i18n"] = true;
dojo.provide("CodeGlass.plugins.dojo.i18n");



dojo.declare("CodeGlass.plugins.dojo.i18n",
	CodeGlass.plugins._baseTemplated,
	{

	injectNode: null,

	templateString: '<div class="menuItem i18n">Language: <select dojoAttachEvent="onchange: _changeI18n" dojoAttachPoint="i18nInput"><option value=""></option></select></div>',

	languages: dojo.cache("CodeGlass", "resources/languages.json", "[{iso: \"af\", name: \"Afrikaans\"}, \n{iso: \"ar\", name: \"Arabic\", dir: \"rtl\"}, \n{iso: \"az\", name: \"Azerbaijani\"}, \n{iso: \"be\", name: \"Belarusian\"}, \n{iso: \"bg\", name: \"Bulgarian\"}, \n{iso: \"bn\", name: \"Bengali\"}, \n{iso: \"bo\", name: \"Tibetan\"}, \n{iso: \"byn\", name: \"Blin\"}, \n{iso: \"ca\", name: \"Catalan\"}, \n{iso: \"cs\", name: \"Czech\"}, \n{iso: \"cy\", name: \"Welsh\"}, \n{iso: \"da\", name: \"Danish\"}, \n{iso: \"de\", name: \"German\"}, \n{iso: \"el\", name: \"Greek\"}, \n{iso: \"en\", name: \"English\"}, \n{iso: \"en-shaw\", name: \"English (Shaw)\"}, \n{iso: \"eo\", name: \"Esperanto\"}, \n{iso: \"es\", name: \"Spanish\"}, \n{iso: \"et\", name: \"Estonian\"}, \n{iso: \"eu\", name: \"Basque\"}, \n{iso: \"fa\", name: \"Persian\", dir: \"rtl\"}, \n{iso: \"fi\", name: \"Finnish\"}, \n{iso: \"fil\", name: \"Filipino\"}, \n{iso: \"fr\", name: \"French\"}, \n{iso: \"ga\", name: \"Irish\"}, \n{iso: \"gl\", name: \"Galician\"}, \n{iso: \"gsw\", name: \"Swiss German\"}, \n{iso: \"gu\", name: \"Gujarati\"}, \n{iso: \"gv\", name: \"Manx\"}, \n{iso: \"ha\", name: \"Hausa\"}, \n{iso: \"he\", name: \"Hebrew\", dir: \"rtl\"}, \n{iso: \"hi\", name: \"Hindi\"}, \n{iso: \"hr\", name: \"Croatian\"}, \n{iso: \"hu\", name: \"Hungarian\"}, \n{iso: \"hy\", name: \"Armenian\"}, \n{iso: \"id\", name: \"Indonesian\"}, \n{iso: \"ii\", name: \"Sichuan Yi\"}, \n{iso: \"is\", name: \"Icelandic\"}, \n{iso: \"it\", name: \"Italian\"}, \n{iso: \"ja\", name: \"Japanese\"}, \n{iso: \"ka\", name: \"Georgian\"}, \n{iso: \"kk\", name: \"Kazakh\"}, \n{iso: \"kl\", name: \"Kalaallisut\"}, \n{iso: \"km\", name: \"Khmer\"}, \n{iso: \"kn\", name: \"Kannada\"}, \n{iso: \"ko\", name: \"Korean\"}, \n{iso: \"kok\", name: \"Konkani\"}, \n{iso: \"kw\", name: \"Cornish\"}, \n{iso: \"lt\", name: \"Lithuanian\"}, \n{iso: \"lv\", name: \"Latvian\"}, \n{iso: \"mk\", name: \"Macedonian\"}, \n{iso: \"ml\", name: \"Malayalam\"}, \n{iso: \"mn\", name: \"Mongolian\"}, \n{iso: \"mo\", name: \"Moldavian\"}, \n{iso: \"mr\", name: \"Marathi\"}, \n{iso: \"ms\", name: \"Malay\"}, \n{iso: \"mt\", name: \"Maltese\"}, \n{iso: \"nb\", name: \"Norwegian Bokm√•l\"}, \n{iso: \"ne\", name: \"Nepali\"}, \n{iso: \"nl\", name: \"Dutch\"}, \n{iso: \"nn\", name: \"Norwegian Nynorsk\"}, \n{iso: \"no\", name: \"Norwegian\"}, \n{iso: \"om\", name: \"Oromo\"}, \n{iso: \"or\", name: \"Oriya\"}, \n{iso: \"pa\", name: \"Punjabi\", dir: \"rtl\"}, \n{iso: \"pl\", name: \"Polish\"}, \n{iso: \"ps\", name: \"Pashto\", dir: \"rtl\"}, \n{iso: \"pt\", name: \"Portuguese\"}, \n{iso: \"ro\", name: \"Romanian\"}, \n{iso: \"ru\", name: \"Russian\"}, \n{iso: \"sh\", name: \"Serbo-Croatian\"}, \n{iso: \"si\", name: \"Sinhalese\"}, \n{iso: \"sk\", name: \"Slovak\"}, \n{iso: \"sl\", name: \"Slovenian\"}, \n{iso: \"so\", name: \"Somali\"}, \n{iso: \"sq\", name: \"Albanian\"}, \n{iso: \"sr\", name: \"Serbian\"}, \n{iso: \"sv\", name: \"Swedish\"}, \n{iso: \"sw\", name: \"Swahili\"}, \n{iso: \"ta\", name: \"Tamil\"}, \n{iso: \"th\", name: \"Thai\"}, \n{iso: \"tl\", name: \"Tagalog\"}, \n{iso: \"tr\", name: \"Turkish\"}, \n{iso: \"uk\", name: \"Ukrainian\"}, \n{iso: \"ur\", name: \"Urdu\", dir: \"rtl\"}, \n{iso: \"vi\", name: \"Vietnamese\"}, \n{iso: \"yo\", name: \"Yoruba\"}, \n{iso: \"zh-hans\", name: \"Chinese Simplified\"}, \n{iso: \"zh-hant\", name: \"Chinese Traditional\"}, \n{iso: \"zu\", name: \"Zulu\"}]\n"),

	injectToolbar: "toolbarBottom",

	postCreate: function(){
		data = dojo.fromJson(this.languages);
		dojo.forEach(data, function(lang, i){
			dojo.create("option", { innerHTML: lang.name, value: lang.iso }, this.i18nInput);
		}, this);
	},

	getVars: function(){
		return {
			injectToolbar: this.injectToolbar,
			iframeProps: {
				"i18n": this.i18nInput.value
			}
		};
	},

	_changeI18n: function(){
		this.i18n = this.i18nInput.value;
		if (this.i18n.length){
			this.sharedVars.djConfig["i18n"] = (this.sharedVars.djConfig.length ? ", " : "") + "locale: '" + this.i18n + "'";
		}

		dojo.publish("CodeGlass/plugin/change/" + this.codeGlassBaseId, ["dojo.i18n"]);
	}
});

}

if(!dojo._hasResource["CodeGlass.plugins.dojo.themes"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins.dojo.themes"] = true;
dojo.provide("CodeGlass.plugins.dojo.themes");



dojo.declare("CodeGlass.plugins.dojo.themes",
	CodeGlass.plugins._baseTemplated,
	{

	injectNode: null,

	templateString: '<div class="menuItem theme">Theme: <select dojoAttachEvent="onchange: _changeTheme" dojoAttachPoint="themeInput"></select></div>',

	themes: [
		{ theme: "claro", label: "Claro" },
		{ theme: "tundra", label: "Tundra" },
		{ theme: "nihilo", label: "Nihilo" },
		{ theme: "soria", label: "Soria" }
	],

	// theme:
	//		the currently shown dojo theme
	theme: 0,

	injectToolbar: "toolbarBottom",

	postCreate: function(){
		if (!this.sharedVars.baseUrl){
			new Error("You need to load the Dojo version plugin before the themes plugin in order to work properly");
			return;
		}

		dojo.forEach(this.themes, function(theme, i){
			dojo.create("option", { innerHTML: theme.label, value: i }, this.themeInput);
		}, this);
		this.themeInput.selectedIndex = this.theme;
	},

	getVars: function(){
		return {
			injectToolbar: this.injectToolbar,
			iframeProps: {
				"customHead": '<link rel="stylesheet" type="text/css" href="'+this.sharedVars.baseUrl+'dijit/themes/'+this.themes[this.theme].theme+'/'+this.themes[this.theme].theme+'.css" />',
				"classBody": " "+this.themes[this.theme].theme+" ",
				"theme": this.themes[this.theme].theme
			}
		}
	},

	_changeTheme: function(){
		this.theme = this.themeInput.value;
		dojo.publish("CodeGlass/plugin/change/" + this.codeGlassBaseId, ["dojo.themes"]);
	}
});

}

if(!dojo._hasResource["CodeGlass.plugins.dojo.extra"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins.dojo.extra"] = true;
dojo.provide("CodeGlass.plugins.dojo.extra");



dojo.declare("CodeGlass.plugins.dojo.extra",
	CodeGlass.plugins._base, {

	//	dataUrl: The dataUrl should point to the root-directory of a dojo source release that is installed on the same host.
	//		Can be overwritten by CodeGlassConfig.dataUrl. 
	dataUrl: "/",
	
	postCreate: function(){
		// it is possible to inject a dataUrl externally
		if(typeof(CodeGlassConfig) != "undefined" && typeof(CodeGlassConfig.dataUrl) != "undefined"){
			this.dataUrl = CodeGlassConfig.dataUrl;
		}
	},
	
	getVars: function(){
		return {
			iframeProps: {
				dataUrl: this.dataUrl
			}
		};
	}
});

}

if(!dojo._hasResource["CodeGlass.plugins.dojo.dir"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins.dojo.dir"] = true;
dojo.provide("CodeGlass.plugins.dojo.dir");



dojo.declare("CodeGlass.plugins.dojo.dir",
	CodeGlass.plugins._baseTemplated,
	{

	injectNode: null,

	templateString: '<div class="menuItem dir">Rtl: <input type="checkbox" dojoAttachEvent="onclick: _changeDir" dojoAttachPoint="dirInput" value="rtl" /></div>',

	dir: "ltr",

	injectToolbar: "toolbarBottom",

	getVars: function(){
		return {
			injectToolbar: this.injectToolbar,
			iframeProps: {
				"html": ' dir="'+this.dir+'" '
			}
		};
	},

	_changeDir: function(){
		this.dir = this.dirInput.checked ? "rtl" : "ltr";
		dojo.publish("CodeGlass/plugin/change/" + this.codeGlassBaseId, ["dojo.dir"]);
	}
});

}

if(!dojo._hasResource["CodeGlass.plugins.dojo.a11y"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["CodeGlass.plugins.dojo.a11y"] = true;
dojo.provide("CodeGlass.plugins.dojo.a11y");



dojo.declare("CodeGlass.plugins.dojo.a11y",
	CodeGlass.plugins._baseTemplated,
	{
	templateString: '<div class="menuItem a11y">A11y: <input type="checkbox" dojoAttachEvent="onclick: _changeA11y" dojoAttachPoint="a11yInput" value="rtl" /></div>',

	injectToolbar: "toolbarBottom",

	getVars: function(){
		return {
			injectToolbar: this.injectToolbar,
			iframeProps: {
				"classBody": this.a11yInput.checked ? ' dijit_a11y ' : ''
			}
		};
	},

	_changeA11y: function(){
		this.a11y = this.a11yInput.checked ? "dijit_a11y" : "";

		dojo.publish("CodeGlass/plugin/change/" + this.codeGlassBaseId, ["dojo.a11y"]);
	}
});

}

if(!dojo._hasResource["docs.layer"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["docs.layer"] = true;
dojo.provide("docs.layer");








}

