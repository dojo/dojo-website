if(!dojo._hasResource["tests.uacss"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["tests.uacss"] = true;
dojo.provide("tests.uacss");

// Run tests for sniffer browser and setting corresponding class name on <html>

try{
	doh.registerUrl("tests.uacss.sniffQuirks", dojo.moduleUrl("dojo", "tests/uacss/sniffQuirks.html"));
	doh.registerUrl("tests.uacss.sniffStandards", dojo.moduleUrl("dojo", "tests/uacss/sniffStandards.html"));
}catch(e){
	doh.debug(e);
}

}
