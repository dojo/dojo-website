if(!dojo._hasResource['dojox.mdnd.tests.unitTests.dropMode.module']){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource['dojox.mdnd.tests.unitTests.dropMode.module'] = true;
dojo.provide('dojox.mdnd.tests.unitTests.dropMode.module');

try{
	doh.registerUrl("dojox.mdnd.tests.unitTests.dropMode.VerticalDropModeTest",
			dojo.moduleUrl("dojox.mdnd","tests/unitTests/dropMode/VerticalDropModeTest.html"), 60000);
	doh.registerUrl("dojox.mdnd.tests.unitTests.dropMode.OverDropModeTest",
			dojo.moduleUrl("dojox.mdnd","tests/unitTests/dropMode/OverDropModeTest.html"), 60000);
}catch(e){
	doh.debug(e);
}

}
