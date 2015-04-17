.. _dojo/attr:

dojo.attr
=========

:Available: since V1.2

.. contents::
   :depth: 2

A getter and setter for DOM attributes, events and CSS styles


============
Introduction
============

``dojo.attr()`` gives you a unified API to deal with DOM Node attribute and property values. It checks an attribute and if there is a property with the same name, it will get/set its value. Otherwise it will work with DOM node attributes.

On top of that several browsers deal with attribute setting and getting in different ways.

If an attribute was not specified for the DOM node, it will return a falsy value (see :ref:`dojo.hasAttr <dojo/hasAttr>`). If you want to get a default value for missing attributes, use :ref:`dojo.getNodeProp <dojo/getNodeProp>`, which always falls back to properties, if they are available.


=====
Usage
=====

.. code-block :: javascript
 :linenos:

 dojo.attr(node, attr, value);

node
  id or reference of the DOM node to get/set style for

attr
  the attribute property name or an object with key/value pairs suitable for setting each property.

value
  If passed, sets value on the node for an attribute, handling cross-browser concerns.

Notes on event handlers
-----------------------

This function can be used to associate a function with a DOM event. Please note that:

* Only functions are supported. If you want to use strings, convert them to functions first.
* Setting an event handler removes a previously set event handler, if it was set with ``dojo.attr()`` too.
* Internally it uses :ref:`dojo.connect <dojo/connect>` to attach an event handler. See :ref:`dojo.connect <dojo/connect>` for more details on event processing.
* Unlike :ref:`dojo.connect <dojo/connect>` no handle is returned. It means that there is no simple way to remove the event handler: use ``dojo.attr()`` to set event handlers only in simple cases. Always consider to use :ref:`dojo.connect <dojo/connect>` and :ref:`dojo.disconnect <dojo/disconnect>` instead.

========
Examples
========

Setting different node attributes
---------------------------------

The following example will set several attributes such as the "tabindex" and "name"

.. code-example ::

  .. js ::

    <script type="text/javascript">
      function setAttributes(){
          dojo.attr('testNode', {
                    tabIndex: 1,
                    name: "nameAtt",
                    innerHTML: "New Content"
          });
      }

      function displayAttributes(){
          dojo.attr("console", "innerHTML",
             "tabindex: "+dojo.attr("testNode", "tabindex")+"\n" +
             "name: "+dojo.attr("testNode", "name")+"\n" +
             "innerHTML: "+dojo.attr("testNode", "innerHTML")+"\n"
          );
      }
    </script>

  .. html ::

    <button dojoType="dijit.form.Button" id="buttonOne" onClick="setAttributes();">Set attributes</button>
    <button dojoType="dijit.form.Button" id="buttonTwo" onClick="displayAttributes();">Get attributes</button>
    <div id="testNode">Hi friends :)</div>
    <div id="console"></div>

Setting events
--------------

This example will demonstrate how you can set events using dojo.attr(). You should still consider using :ref:`dojo.connect <dojo/connect>` when you are dealing with events since you are getting lots more possibilities and granularity with using :ref:`dojo.connect <dojo/connect>`.  In particular you get a handle to later disconnect the event.

.. code-example ::

  .. js ::

    <script type="text/javascript">
      function setupHandlers(){
          dojo.attr("testNodeTwo", "onmouseover", function(evt){
            dojo.attr("consoleOne", "innerHTML", "The mouse is over");
          });

          dojo.attr("testNodeTwo", "onclick", function(evt){
            dojo.attr("consoleOne", "innerHTML", "The mouse was clicked");
          });
      }
    </script>

  .. html ::

    <button dojoType="dijit.form.Button" id="buttonThree" onClick="setupHandlers();">Setup handlers</button>
    <div id="testNodeTwo">Hi, try the events! Click me or hover me.</div>
    <div id="consoleOne"></div>

Setting styles
--------------

The following example will set the "style" attribute of the given dom node. When you set "style" with dojo.attr() it delegates the work to :ref:`dojo.style() <dojo/style>`.

.. code-example ::

  .. js ::

    <script type="text/javascript">
      function changeStyle(){
          dojo.attr("testNodeThree", "style", {padding: "5px", border: "1px solid #ccc", background: "#eee"});
      }
    </script>

  .. html ::

    <button dojoType="dijit.form.Button" id="buttonFour" onClick="changeStyle();">Change style</button>
    <div id="testNodeThree">Hi, change my style</div>

========
See also
========

DOM operations:

* :ref:`dojo.getNodeProp <dojo/getNodeProp>`
* :ref:`dojo.hasAttr <dojo/hasAttr>`
* :ref:`dojo.removeAttr <dojo/attr>`
* :ref:`dojo.style <dojo/style>`

NodeList:

* :ref:`dojo.NodeList <dojo/NodeList>`
* :ref:`dojo.NodeList.attr <dojo/NodeList/attr>`
* :ref:`dojo.NodeList.removeAttr <dojo/NodeList/removeAttr>`

External links:

* `DOM Attributes and The Dojo Toolkit 1.2 <http://www.sitepen.com/blog/2008/10/23/dom-attributes-and-the-dojo-toolkit-12/>`_
