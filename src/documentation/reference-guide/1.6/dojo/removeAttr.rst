.. _dojo/removeAttr:

dojo.removeAttr
===============

:Available: since V1.2

.. contents::
   :depth: 2

Removes an attribute.


============
Introduction
============

``dojo.removeAttr()`` removes an attribute. It is modeled after DOM's `removeAttribute <https://developer.mozilla.org/En/DOM/Element.removeAttribute>`_, but unlike the latter it normalizes standard attribute names to smooth over differences between browsers, or to provide convenient aliases, e.g., ``className`` is aliased to ``class``, and so on. The same algorithm is used by `dojo.attr <dojo/attr>`_.


=====
Usage
=====

.. code-block :: javascript
 :linenos:

 dojo.removeAttr(node, attr);

node
  id or reference of the DOM node to get/set style for

attr
  the attribute property name.


========
Examples
========

Removing an attribute
---------------------

The following example will remove ``disabled`` from the ``input`` node.

.. code-example ::

  .. js ::

    <script type="text/javascript">
      function remAttr(){
        dojo.removeAttr("model", "disabled");
      }
    </script>

  .. html ::

    <p><input id="model" name="model" disabled="disabled" value="some text"> &mdash; our model node</p>
    <p><button onclick="remAttr();">Remove "disabled"</button></p>

========
See also
========

DOM operations:

* :ref:`dojo.attr <dojo/attr>`
* :ref:`dojo.hasAttr <dojo/hasAttr>`
* :ref:`dojo.getNodeProp <dojo/getNodeProp>`
* :ref:`dojo.style <dojo/style>`

NodeList:

* :ref:`dojo.NodeList <dojo/NodeList>`
* :ref:`dojo.NodeList.removeAttr <dojo/NodeList/removeAttr>`
* :ref:`dojo.NodeList.attr <dojo/NodeList/attr>`

External links:

* `DOM Attributes and The Dojo Toolkit 1.2 <http://www.sitepen.com/blog/2008/10/23/dom-attributes-and-the-dojo-toolkit-12/>`_
