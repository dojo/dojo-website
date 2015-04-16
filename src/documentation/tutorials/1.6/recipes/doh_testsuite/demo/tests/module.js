dojo.provide("demo.tests.module");
try{
	dojo.require("demo.tests.data");
	dojo.require("demo.tests.api");
	doh.registerUrl("in-page authorBar", dojo.moduleUrl("demo", "tests/test_authorBar.html"), 20000); // timeout test after 20 seconds
}catch(e){
	doh.debug(e);
}
