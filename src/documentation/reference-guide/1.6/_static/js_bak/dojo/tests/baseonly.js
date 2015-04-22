if(!dojo._hasResource["dojo.tests.baseonly"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo.tests.baseonly"] = true;
dojo.provide("dojo.tests.baseonly");

try{
	dojo.require("tests._base");
}catch(e){
	doh.debug(e);
}

}
