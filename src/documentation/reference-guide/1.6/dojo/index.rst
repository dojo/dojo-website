.. _dojo/index:

Dojo
====

.. contents::
   :depth: 2

Dojo is divided into two parts: ``dojo.js``, and the rest of Dojo Core. Typically, if a function or Class exists within the dojo namespace directly (eg: ``dojo.require()``, ``dojo.addOnLoad()``) it is provided directly by ``dojo.js``. If the function or Class exists beneath the dojo namespace (eg: ``dojo.dnd.Mover``), you will need to require the appropriate module (eg: ``dojo.require("dojo.dnd.Mover");``)

These pages cover both cases, and indicate how they are provided.

==================
Base Dojo: dojo.js
==================

Dojo Base is the functionality you get by just including a stock built dojo.js or dojo.xd.js in your page.

Configuring Dojo
----------------

* :ref:`djConfig <djConfig>`

  Possibility to override certain global settings that control how the framework operates

Array utilities
---------------

Details on dojo.every, dojo.filter, dojo.forEach, dojo.indexOf, dojo.lastIndexOf, dojo.map, and dojo.some. See the :ref:`Array QuickStart <quickstart/arrays>` for an overview.

* :ref:`dojo.forEach <dojo/forEach>`

  Invokes a callback function for every item in array

* :ref:`dojo.map <dojo/map>`

  Applies a callback to each element of arr and returns an Array with the results

* :ref:`dojo.some <dojo/some>`

  Iterate over an array, escaping when the callback returns true for some logic check.

* :ref:`dojo.every <dojo/every>`

  Iterate over an array, escaping when the callback returns false for some logic check.

* :ref:`dojo.filter <dojo/filter>`

  Iterate over an array, reducing the array based on the callback return.

* :ref:`dojo.indexOf <dojo/indexOf>`

  Find the index of some element in an Array.

* :ref:`NodeList array methods <dojo/NodeList>`

  * NodeList.indexOf, NodeList.lastIndexOf, NodeList.forEach, NodeList.every, NodeList.some, NodeList.concat, NodeList.map, NodeList.filter, NodeList.at

Language Utilities
------------------

* :ref:`dojo.Deferred <dojo/Deferred>`

  Communication between threads

* :ref:`dojo.hitch <dojo/hitch>`

  Function that generates a wrapper function that ensures a function that will only ever execute in a defined scope.

* :ref:`dojo.partial <dojo/partial>`

  Function that generates a wrapper function that ensures a function will only ever execute globally.

* :ref:`dojo.delegate <dojo/delegate>`

  Returns a new object which "looks" to obj for properties which it does not have a value for.

* :ref:`dojo.isString <dojo/isString>`

  Checks if the parameter is a String

* :ref:`dojo.isArray <dojo/isArray>`

  Checks if the parameter is an Array

* :ref:`dojo.isFunction <dojo/isFunction>`

  Checks if the parameter is a Function

* :ref:`dojo.isObject <dojo/isObject>`

  Checks if the parameter is an Object

* :ref:`dojo.isArrayLike <dojo/isArrayLike>`

  Checks if the parameter is like an Array

* :ref:`dojo.isAlien <dojo/isAlien>`

  Checks if the parameter is a built-in function


String Utilities
----------------

* :ref:`dojo.trim <dojo/trim>`

  Trim whitespace from a String

* :ref:`dojo.replace <dojo/replace>`

  Simple templates with parameterized substitutions.

DOM
---

* :ref:`dojo.query <dojo/query>`

  The swiss army knife of DOM node manipulation in Dojo.

* :ref:`dojo.NodeList <dojo/NodeList>`

  A class to handle a list of DOM nodes. Most commonly returned from a `dojo.query` call.

* :ref:`dojo.doc <dojo/doc>`

  Alias for the current document

* :ref:`dojo.body <dojo/body>`

  Return the body element of the document

* :ref:`dojo.byId <dojo/byId>`

  Select a DOM node by 'id'

* Manipulation

  * :ref:`dojo.create <dojo/create>`

    Creates a dom node with optional values and placement

  * :ref:`dojo.place <dojo/place>`

    Place DOM nodes relative to others

  * NodeList.place

    Place DOM nodes in list relative to others

  * NodeList.orphan

  * NodeList.adopt

  * NodeList.clone

  * NodeList.addContent

  * :ref:`dojo.destroy <dojo/destroy>`

    Destroy a DOM element

  * :ref:`dojo.empty <dojo/empty>`

    Empty the contents of a DOM element

  * NodeList.empty


* Attributes

  * :ref:`dojo.formToJson <dojo/formToJson>`

    Create an object from an form node

  * :ref:`dojo.attr <dojo/attr>`

    Modifying DOM node attributes

  * :ref:`dojo.NodeList.attr <dojo/NodeList/attr>`

    Set/Get attributes for nodes in the list

  * :ref:`dojo.hasAttr <dojo/hasAttr>`

  * :ref:`dojo.removeAttr <dojo/removeAttr>`

  * :ref:`dojo.getNodeProp <dojo/getNodeProp>`

  * :ref:`dojo.formToObject <dojo/formToObject>`

  * :ref:`dojo.formToQuery <dojo/formToQuery>`

  * dojo.isDescendant

  * dojo.setSelectable


* Styles

  * :ref:`dojo.coords <dojo/coords>`

    Getter for the coordinates (relative to parent and absolute) of a DOM node.  Deprecated in Dojo 1.4.

  * NodeList.coords

    Getter for the coordinates of each node in the list.  Deprecated in Dojo 1.4.

  * :ref:`dojo.position <dojo/position>`

    Getter for the border-box x/y coordinates and size of a DOM node.

  * NodeList.position

    Calls :ref:`dojo.position <dojo/position>` for each node in the list and returns those objects as an Array.

  * :ref:`dojo.style <dojo/style>`

    A getter/setter for styles on a DOM node

  * :ref:`dojo.getComputedStyle <dojo/getComputedStyle>`

    Return a cachable object of all computed styles for a node

  * Class Utilities

    * :ref:`dojo.hasClass <dojo/hasClass>`

      Returns a boolean depending on whether or not a node has a passed class string.

    * :ref:`dojo.addClass <dojo/addClass>`

      Adds a CSS class to a node.

    * :ref:`dojo.removeClass <dojo/removeClass>`

      Removes a class from a Node.

    * :ref:`dojo.toggleClass <dojo/toggleClass>`

      Toggles a className (or now in 1.4 an array of classNames).

  * :ref:`dojo.marginBox <dojo/marginBox>`

    Getter/setter for the margin-box of node

  * :ref:`dojo.contentBox <dojo/contentBox>`

    Getter/setter for the content-box of node

Effects
-------

* :ref:`dojo.animateProperty <dojo/animateProperty>`

  The workhorse of most :ref:`dojo.fx <dojo/fx>` animations. Used for animating CSS properties

* :ref:`dojo.Animation <dojo/Animation>`

  **1.4+** previously dojo._Animation, the class behind all dojo.fx

* :ref:`dojo.anim <dojo/anim>`

  Shorthand version of animateProperty using positional arguments

* :ref:`dojo.fadeOut <dojo/fadeOut>`

* :ref:`dojo.fadeIn <dojo/fadeIn>`

Events
------

* :ref:`dojo.connect <dojo/connect>`

  Connects events to methods

* :ref:`NodeList.connect <dojo/NodeList>`

  Connects events to every node in the list, like dojo.connect

* :ref:`NodeList.events <dojo/NodeList>`

  Common event names mapped as functions on a NodeList - eg: .onclick(function(){})

* :ref:`dojo.disconnect <dojo/disconnect>`

  Disconnects methods from linked topics

* :ref:`dojo.subscribe <dojo/subscribe>`

  Linked a listener to a named topic

* :ref:`dojo.unsubscribe <dojo/unsubscribe>`

  Remove a topic listener

* :ref:`dojo.publish <dojo/publish>`

  Publish an event to all subscribers of a topic

* :ref:`dojo.connectPublisher <dojo/connectPublisher>`

  Ensure that everytime an event is called, a message is published on the topic.

* :ref:`dojo.stopEvent <dojo/stopEvent>`

  Stop an event's bubbling and propagation.


Document Lifecycle
------------------

* :ref:`dojo.addOnLoad <dojo/addOnLoad>`

  Call functions after the DOM has finished loading and widgets declared in markup have been instantiated

* :ref:`dojo.ready <dojo/ready>`

  **1.4+** Alias for :ref:`dojo.addOnLoad <dojo/addOnLoad>`

* :ref:`dojo.addOnUnload <dojo/addOnUnload>`

  Call functions when the page unloads

* :ref:`dojo.addOnWindowUnload <dojo/addOnWindowUnload>`

  Call functions when window.onunload fires

* :ref:`dojo.windowUnloaded <dojo/windowUnloaded>`

  Signal fired by impending window destruction

Ajax / IO
---------

* :ref:`IO Pipeline Topics <dojo/ioPipelineTopics>`

* :ref:`dojo.contentHandlers <dojo/contentHandlers>`

  **1.4+** Pre-defined XHR content handlers, and an extension point to add your own custom handling.

* :ref:`dojo.xhr <dojo/xhr>`

  Core for all xhr* verbs, eg: xhrPost, getGet

* :ref:`dojo.xhrDelete <dojo/xhrDelete>`

* :ref:`dojo.xhrGet <dojo/xhrGet>`

* :ref:`dojo.xhrPost <dojo/xhrPost>`

* :ref:`dojo.xhrPut <dojo/xhrPut>`

* :ref:`dojo.rawXhrPost <dojo/rawXhrPost>`

* :ref:`dojo.rawXhrPut <dojo/rawXhrPut>`

Package System
--------------

* :ref:`dojo.registerModulePath <dojo/registerModulePath>`

  Maps module name to a path

* :ref:`dojo.require <dojo/require>`

  Loads a Javascript module from the appropriate URI

* :ref:`dojo.provide <dojo/provide>`

* :ref:`dojo.moduleUrl <dojo/moduleUrl>`

JSON Tools
----------

* :ref:`dojo.fromJson <dojo/fromJson>`

  Parses a JSON string to return a JavaScript object

* :ref:`dojo.toJson <dojo/toJson>`

  Returns a JSON serialization of an object

Objects / OO Tools
------------------

* :ref:`dojo.mixin <dojo/mixin>`

  Mixes one object into another. Can be used as a shallow copy

* :ref:`dojo.declare <dojo/declare>`

  Creates a constructor using a compact notation for inheritance and prototype extension

* :ref:`dojo.extend <dojo/extend>`

* :ref:`dojo.exists <dojo/exists>`

  Determine if an object supports a given method

* :ref:`dojo.delegate <dojo/delegate>`

  Delegate an Object (beget)

* :ref:`dojo.getObject <dojo/getObject>`

  Get a property from a dot-separated string, such as "A.B.C"

* :ref:`dojo.setObject <dojo/setObject>`

  Set a property from a dot-separated string, such as "A.B.C"

* :ref:`dojo.objectToQuery <dojo/objectToQuery>`

* :ref:`dojo.queryToObject <dojo/queryToObject>`

* :ref:`NodeList.instantiate <dojo/NodeList>`

  Create classes out of each node in the list


Colors
------

* :ref:`dojo._base.Color <dojo/_base/Color>`

  Color object and utility functions to handle colors.
  Details on

* dojo.colorFromArray

* dojo.colorFromHex

* dojo.colorFromString

* dojo.colorFromRgb.


Miscellaneous Base
------------------

* :ref:`dojo.deprecated <dojo/deprecated>`

  Log a debug message to indicate that a behavior has been deprecated

* :ref:`dojo.eval <dojo/eval>`

  Evaluate some string of JavaScript

* :ref:`dojo.global <dojo/global>`

  Alias for the global scope

* :ref:`dojo.keys <dojo/keys>`

  A collection of key constants.

* :ref:`dojo.locale <dojo/locale>`

  A string containing the current locale as defined by Dojo

* :ref:`dojo.setContext <dojo/setContext>`

  Changes the behavior of many core Dojo functions that deal with namespace and DOM lookup

* :ref:`dojo.version <dojo/version>`

  The current version number of Dojo

* :ref:`dojo.withDoc <dojo/withDoc>`

  Call callback with documentObject as dojo.doc

* :ref:`dojo.withGlobal <dojo/withGlobal>`

  Call callback with globalObject as dojo.global and globalObject.document as dojo.doc


=========
Dojo Core
=========

* :ref:`dojo.AdapterRegistry <dojo/AdapterRegistry>`

  A registry to make contextual calling/searching easier

* :ref:`dojo.back <dojo/back>`

  Browser history management resources (Back button functionality)

* :ref:`dojo.behavior <dojo/behavior>`

  Utility for unobtrusive/progressive event binding, DOM traversal, and manipulation

* :ref:`dojo.cldr <dojo/cldr>`

  A Common Locale Data Repository (CLDR) implementation

* :ref:`dojo.cache <dojo/cache>`

  **1.4+** A mechanism to cache inline text.

* :ref:`dojo.colors <dojo/colors>`

  CSS color manipulation functions

* :ref:`dojo.cookie <dojo/cookie>`

  Simple HTTP cookie manipulation

* :ref:`dojo.currency <dojo/currency>`

  Localized formatting and parsing routines for currency data

* :ref:`dojo.data <dojo/data>`

  A uniform data access layer

  * :ref:`dojo.data.api <dojo/data/api>`

  * :ref:`dojo.data.api.Read <dojo/data/api/Read>`

  * :ref:`dojo.data.api.Write <dojo/data/api/Write>`

  * :ref:`dojo.data.api.Identity <dojo/data/api/Identity>`

  * :ref:`dojo.data.api.Notification <dojo/data/api/Notification>`

  * :ref:`dojo.data.ItemFileReadStore <dojo/data/ItemFileReadStore>`

  * :ref:`dojo.data.ItemFileWriteStore <dojo/data/ItemFileWriteStore>`

* :ref:`dojo.date <dojo/date>`

  Date manipulation utilities

  * dojo.date.locale

    Offers a library of localization methods to format and parse dates and times

    * :ref:`dojo.date.locale.addCustomFormats <dojo/date/locale/addCustomFormats>`

      Adds a reference to a bundle containing localized custom formats to be used by date/time formatting and parsing routines.

    * :ref:`dojo.date.locale.format <dojo/date/locale/format>`

      Formats a Date object as a String, using locale-specific settings or custom patterns.

    * :ref:`dojo.date.locale.getNames <dojo/date/locale/getNames>`

      Used to get localized strings from dojo.cldr for day or month names.

    * :ref:`dojo.date.locale.isWeekend <dojo/date/locale/isWeekend>`

      Determines if the date falls on a weekend, according to local custom.

    * :ref:`dojo.date.locale.parse <dojo/date/locale/parse>`

      Converts a properly formatted string to a primitive Date object, using locale-specific settings.

    * :ref:`dojo.date.locale.regexp <dojo/date/locale/regexp>`

      Builds the regular needed to parse a localized date

* :ref:`dojo.DeferredList <dojo/DeferredList>`

  Event handling for a group of Deferred objects

* :ref:`dojo.dnd <dojo/dnd>`

  Drag and Drop

  * :ref:`dojo.dnd.Moveable <dojo/dnd/Moveable>`

* :ref:`dojo.fx <dojo/fx>`

  Effects library on top of Base animations

* :ref:`dojo.gears <dojo/gears>`

  Google Gears

* :ref:`dojo.hash <dojo/hash>`
 
  Normalized onhashchange module


* :ref:`dojo.html <dojo/html>`

  Inserting contents in HTML nodes

* :ref:`dojo.i18n <dojo/i18n>`

  Utility classes to enable loading of resources for internationalization

* Additional AJAX I/O transports (dojo.io)

  * :ref:`dojo.io.iframe <dojo/io/iframe>`

    Sends an AJAX I/O call using an IFrame

  * :ref:`dojo.io.script <dojo/io/script>`

    Sends a JSONP request using a script tag

* :ref:`dojo.jaxer <dojo/jaxer>`

* :ref:`dojo.NodeList-data <dojo/NodeList-data>`

  Adds a .data() and .removeData() API to :ref:`dojo.query <dojo/query>` operations

* :ref:`dojo.NodeList-fx <dojo/NodeList-fx>`

  Adds dojo.fx animation support to dojo.query()

* :ref:`dojo.NodeList-html <dojo/NodeList-html>`

  Adds a chainable html method to dojo.query()

* :ref:`dojo.NodeList-manipulate <dojo/NodeList-manipulate>`

  **1.4+** Method extensions to dojo.NodeList/dojo.query() that manipulate HTML.

* :ref:`dojo.NodeList-traverse <dojo/NodeList-traverse>`

  **1.4+** Method extensions to dojo.NodeList/dojo.query() for traversing the DOM.

* :ref:`dojo.number <dojo/number>`

  Localized formatting and parsing methods for number data

* :ref:`dojo.parser <dojo/parser>`

  The Dom/Widget parsing package

* :ref:`dojo.regexp <dojo/regexp>`

  Regular expressions and Builder resources

* :ref:`dojo.robot <dojo/robot>`

  experimental module for DOH users

* :ref:`dojo.robotx <dojo/robotx>`

  experimental module for DOH users

* :ref:`dojo.rpc <dojo/rpc>`

  Communicate via Remote Procedure Calls (RPC) with Backend Servers

  * :ref:`dojo.rpc.JsonpService <dojo/rpc/JsonpService>`

    Generic JSONP service

  * :ref:`dojo.rpc.JsonService <dojo/rpc/JsonService>`

    JSON RPC service

  * :ref:`dojo.rpc.RpcService <dojo/rpc/RpcService>`

    RPC service class

* :ref:`dojo.string <dojo/string>`

  String utilities for Dojo


========
See also
========

* :ref:`Dijit <dijit/index>`

  The widget system layered on top of Dojo

* :ref:`DojoX <dojox/index>`

  An area for development of extensions to the Dojo toolkit
