.. _dojox/layout/ExpandoPane:

dojox.layout.ExpandoPane
========================

:Status: Draft
:Version: 1.0
:Authors: ?--
:Project owner: ?--
:Available: since V?

.. contents::
   :depth: 2

dojox.layout.ExpandoPane is a self-collapsing widget for use in a :ref:`BorderContainer <dijit/layout/BorderContainer>`.


============
Introduction
============

This is an experimental widget which provides Expando-like capabilities to a region in a Dijit :ref:`BorderContainer <dijit/layout/BorderContainer>`. The use is able to single-click an icon to open or close the region.

=====
Usage
=====

The ExpandoPane is used in a similar way to the way a dijit :ref:`ContentPane <dijit/layout/ContentPane>` is used, but it provides a user interface to "collapse" and "expand" the Pane.

You should ensure that you include the ExpandoPane CSS in your application in order to have the pane render properly:

.. code-block :: css
 :linenos:

 <style type="text/css">
   @import url("dojox/layout/resources/ExpandoPane.css");
 </style>


========
Examples
========

Programmatic example
--------------------

TODO: example

Declarative example
-------------------

.. code-example ::

  .. js ::

    <script type="text/javascript">
      dojo.require("dijit.layout.ContentPane");
      dojo.require("dijit.layout.BorderContainer");
      dojo.require("dojox.layout.ExpandoPane");
    </script>

  .. html ::

    <div dojoType="dijit.layout.BorderContainer" design="sidebar" gutters="true" liveSplitters="true" id="borderContainer">
      <div dojoType="dojox.layout.ExpandoPane" title="Left Expando" maxWidth="225" splitter="true" region="leading" style="width: 225px;">
        Hi. I'm the Expando Pane
      </div>
      <div dojoType="dijit.layout.ContentPane" splitter="true" region="center">Hi, I'm center</div>
    </div>

  .. css ::

    <style type="text/css">
      @import url("{{ baseUrl }}dojox/layout/resources/ExpandoPane.css");

      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
      }

      #borderContainer {
        width: 100%;
        height: 100%;
      }
    </style>



========
See also
========

* TODO: links to other related articles
