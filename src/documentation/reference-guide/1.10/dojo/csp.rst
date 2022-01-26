.. _dojo/csp:

=======================
Content Security Policy
=======================

Content Security Policy (CSP) is a web browser security standard introduced to prevent cross-site scriping,
clickjacking, and other code injection attacks. Version 1.0 was published as W3C Candidate Recommendation in 2012 and
it has had widespread browser support since then.

Some of the features provided by JavaScript and web browsers that have enabled Dojo to be very powerful have also been
taken advantage of by attackers. Enabling a strict CSP configuration on a typical Dojo application could render much of
the application unusable. With careful planning and configuration a Dojo application can successfully be deployed with
a strict CSP configuration.

Dojo 1.17 and greater
=====================

Dojo 1.17 added the :ref:`dojo/json5 <dojo/json5>` module which significantly improves functionality of
:ref:`dojo/parser <dojo/parser>` in a strict CSP environment. There are still some restrictions to follow for
compliance with a strict CSP configuration: ``default-src 'self'``.


Dojo configuration
------------------

The Dojo configuration must include the following settings:

.. js ::

  {
    async: true,
	  has: {
	    'csp-restrictions': true,
	    'dojo-v1x-i18n-Api': false
	  }
  }

Code restrictions
-----------------

* All application modules must be AMD; no pre-1.7 Dojo modules
* No inline JavaScript
* All attributes parsed with :ref:`dojo/parser <dojo/parser>` (e.g. ``data-dojo-props``) must conform to
  `JSON5 <http://json5.org/>`_ syntax
  - no JavaScript identifiers or expressions in data attributes
  - ``data-dojo-props`` sometimes includes references to ``this`` or other JavaScript variables, or even JavaScript
  expressions. This works with ``eval()``, but is not valid JSON5 and will not work with CSP restrictions.
* :ref:`dojo/xhr <dojo/xhr>`, :ref:`dojo/request <dojo/request>`
  - avoid ``handleAs: 'javascript'``
* Avoid using the :ref:`dojo/io/script <dojo/io/script>` and :ref:`dojo/request/script <dojo/request/script>` modules
* Avoid using the :ref:`dojo/rpc/RpcService <dojo/rpc/RpcService>` module

Dojo 1.16 and earlier
=====================

Earlier versions of Dojo must follow all the restrictions listed above plus the following:

* No data attributes (``data-dojo-props``, ``data-dojo-config``)
  - Dojo must be configured with a ``dojoConfig.js`` file loaded in a ``script`` element
  - widgets must be configured programmatically instead of using ``data-dojo-props`` in the markup

See Also
========

* `Content Security Policy (Google Developers) <https://developers.google.com/web/fundamentals/security/csp>`_

* `Content Security Policy (MDN) <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>`_
