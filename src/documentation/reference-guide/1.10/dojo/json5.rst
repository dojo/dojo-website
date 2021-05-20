.. _dojo/json5:

==========
dojo/json5
==========

:since: 1.17.0

**dojo/json5** is a port of the `JSON5 project <https://github.com/json5/json5>`_ to AMD modules redistributed with
Dojo. JSON5 is a superset of JSON with expanded syntax support. The primary advantages for Dojo are support for unquoted
identifiers and single-quoted values. This enables ``json5.parse()`` to be used with Dojo templates to parse values
that require use of `eval()` in Dojo releases prior to 1.17.

The API is the same as ``dojo/json``: ``json5.parse()`` and ``json5.stringify()``. The JSON5 syntax is documented at
`json5.org <http://json5.org/>`_.

See Also
========

* :ref:`dojo/json <dojo/json>` - JSON parser
