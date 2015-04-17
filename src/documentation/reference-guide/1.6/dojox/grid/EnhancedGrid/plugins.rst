.. _dojox/grid/EnhancedGrid/plugins:

dojox.grid.EnhancedGrid.plugins
===============================

:Authors: Zhu Xiao Wen
:Project owner: Nathan Toone
:Available: since V.1.6

EnhancedGrid provides a plugin framework, which can support a rich set of new features as plugins.
The followings are implemented in Dojo 1.6:

===========
Plugin List
===========

These plugins are loaded on demand, so they must be required and declared before being used.

  * :ref:`Filter <dojox/grid/EnhancedGrid/plugins/Filter>` - Support for defining rules to filter grid content in various data types.
  * :ref:`Exporter <dojox/grid/EnhancedGrid/plugins/Exporter>` - Support for exporting grid content to various formats.
  * :ref:`Printer <dojox/grid/EnhancedGrid/plugins/Printer>` - Provide convenient ways to printing grid.
  * :ref:`Selector <dojox/grid/EnhancedGrid/plugins/Selector>` - Unified extended selection support for rows, columns and cells. 
  * :ref:`DnD <dojox/grid/EnhancedGrid/plugins/DnD>` - Drag-and-drop support for rows/columns/cells, both within grid and out of grid.
  * :ref:`Pagination <dojox/grid/EnhancedGrid/plugins/Pagination>` - A different approach to work with huge data set besides the default virtual scrolling way
  * :ref:`CellMerge <dojox/grid/EnhancedGrid/plugins/CellMerge>` - Support for merging adjacent cells within a row.
  * :ref:`Cookie <dojox/grid/EnhancedGrid/plugins/Cookie>` - Persistence of grid preferences, like column width, column order and sorting order.
  * :ref:`Search <dojox/grid/EnhancedGrid/plugins/Search>` - Support for searching the grid by regular expressions as well as wildcard pattern.

========
See Also
========

* :ref:`dojox.grid.DataGrid <dojox/grid/DataGrid>` - The base grid
* :ref:`dojox.grid.EnhancedGrid <dojox/grid/EnhancedGrid>` - The enhanced grid supporting plugins
* :ref:`dojox.grid.TreeGrid <dojox/grid/TreeGrid>` - Grid with collapsable rows and model-based (:ref:`dijit.tree.ForestStoreModel <dijit/tree/ForestStoreModel>`) structure
