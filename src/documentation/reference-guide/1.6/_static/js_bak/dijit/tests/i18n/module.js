if(!dojo._hasResource["dijit.tests.i18n.module"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit.tests.i18n.module"] = true;
dojo.provide("dijit.tests.i18n.module");

try{
	if(dojo.isBrowser){
		doh.registerUrl("dijit.tests.i18n.currency", dojo.moduleUrl("dijit", "tests/i18n/currency.html"), 999999);
		doh.registerUrl("dijit.tests.i18n.date", dojo.moduleUrl("dijit", "tests/i18n/date.html"), 999999);
		doh.registerUrl("dijit.tests.i18n.number", dojo.moduleUrl("dijit", "tests/i18n/number.html"), 999999);
		doh.registerUrl("dijit.tests.i18n.textbox", dojo.moduleUrl("dijit", "tests/i18n/textbox.html"), 999999);
		doh.registerUrl("dijit.tests.i18n.time", dojo.moduleUrl("dijit", "tests/i18n/time.html"), 999999);
		doh.registerUrl("dijit.tests.i18n.digit", dojo.moduleUrl("dijit", "tests/i18n/digit.html"), 999999);
	}
}catch(e){
	doh.debug(e);
}

}
