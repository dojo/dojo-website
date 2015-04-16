dojo.provide("demo.tests.api");
dojo.require("demo.authorBar");
dojo.require("demo.tests.util");

(function(){
	dojo.mixin(dojo.config, {
		authorsUrl: dojo.moduleUrl('demo', '../resources/authors.json'),
		authorName: 'Sam Foster'
	});
	var cfg = dojo.config, 
		util = demo.tests.util,
		TF = util.Fixture, 
		mockMethod = demo.tests.util.mockMethod, 
		unMockMethod = demo.tests.util.unMockMethod;
	
	

doh.register("authorBar api", [
	{
		name: "mocking test", 
		runTest: function() {
			var foo = { bar: function() { return "bar"; }};
			var hdl = mockMethod(foo, "bar", function() { return "mocked"; });
			doh.is("mocked", foo.bar(), "mocked method returns expected mock value");
			unMockMethod(hdl);
			doh.is("bar", foo.bar(), "un-mocked method returns expected original value");
		}
	},
	new TF("update calls loadData", function() {
			var hdl = mockMethod(demo.authorBar, "loadData", function() { return "pass"; });
			doh.is("pass", demo.authorBar.update(), "call to update() should result in call to loadData");
			unMockMethod(hdl);
	}),
	new TF("loadData callbacks", function() {
			var hdl = mockMethod(demo.authorBar, "onDataLoad", function() { ddfd.callback("pass"); }),
				hdlError = mockMethod(demo.authorBar, "onLoadError", function() { ddfd.callback("pass"); });
			var ddfd = new doh.Deferred();

			ddfd.addCallback(function(result){
				unMockMethod(hdl);
				unMockMethod(hdlError);
				doh.is("pass", result, "call to loadData() should trigger onDataLoad/onLoadError callbacks");
			});
			demo.authorBar.loadData();
			return ddfd;
	})
	// onDataLoad
]);

})();
