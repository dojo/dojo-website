.. _dojo/NodeList-fx:

dojo.NodeList-fx
================

:Status: Draft
:Since: 1.2


.. contents::
   :depth: 2

This module incorporates :ref:`dojo.fx <dojo/fx>` functionality into :ref:`dojo.query <dojo/query>` by extending the :ref:`dojo.NodeList <dojo/NodeList>` Class.

The first most important thing to do is require the module into your page:

.. code-block :: javascript

  dojo.require("dojo.NodeList-fx");

To use your newly created functions in NodeList, issue a ``dojo.query()`` call:

.. code-example ::

  .. html ::

     <button id="fadebutton">Fade Them Out</button>
     <div id="fadebuttontarget">
        <li class="thinger">Item One</li>
        <li class="thinger">Item Two</li>
     </div>

  .. js ::

     <script type="text/javascript">
        dojo.require("dojo.NodeList-fx");
        dojo.addOnLoad(function(){
            dojo.query("#fadebutton").onclick(function(){
                dojo.query("#fadebuttontarget li").fadeOut().play();
            });
        });
     </script>

The most important thing to note is `NodeList <dojo/NodeList>` animations return an instance of a :ref:`dojo.Animation <dojo/Animation>`, the foundation for all Dojo FX. This prevents further chaining, as you have to explicitly call ``.play()`` on the returned animation. **New** Dojo 1.4 introduced a way to allow continued chaining with the caveat you cannot obtain a reference to the animations after they have begun. Simply pass the *auto* parameter.

.. code-block :: javascript
  :linenos:

  dojo.require("dojo.NodeList-fx");
  dojo.ready(function(){
       dojo.query("li.evens")
           .fadeOut({
              duration:1000,
              onEnd: function(){ ... },
              // begin playing immediately, and return the nodeList for further iteration
              auto:true
           })
           .onclick(doSomething)
       ;
  });

The parameters you can specify to each animation provided are identical to their :ref:`dojo.fx <dojo/fx>` counterparts, omitting the ``node:`` parameter, as each node in the NodeList is passed for you.

There are more NodeList animations provided by the :ref:`dojox.fx.ext-dojo.NodeList <dojox/fx/ext-dojo/NodeList>` module, in the :ref:`dojox.fx <dojox/fx>` project.

.. _dojo.fx: dojo/fx
.. _dojox.fx: dojox/fx
