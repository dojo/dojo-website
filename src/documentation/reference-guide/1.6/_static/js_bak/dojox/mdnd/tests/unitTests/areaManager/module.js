if(!dojo._hasResource["dojox.mdnd.tests.unitTests.areaManager.module"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.mdnd.tests.unitTests.areaManager.module"] = true;
dojo.provide("dojox.mdnd.tests.unitTests.areaManager.module");

try{
	doh.registerUrl("dojox.mdnd.tests.unitTests.AreaManagerCoverPresence",
			dojo.moduleUrl("dojox.mdnd","tests/unitTests/areaManager/AreaManagerCoverPresence.html"), 60000);
	doh.registerUrl("dojox.mdnd.tests.unitTests.AreaManagerManagingDragItems",
			dojo.moduleUrl("dojox.mdnd","tests/unitTests/areaManager/AreaManagerManagingDragItems.html"), 60000);
	doh.registerUrl("dojox.mdnd.tests.unitTests.AreaManagerRegistering",
			dojo.moduleUrl("dojox.mdnd","tests/unitTests/areaManager/AreaManagerRegistering.html"), 60000);
}catch(e){
	doh.debug(e);
}

}
