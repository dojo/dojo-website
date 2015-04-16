require([
	"doh/runner",
	"dojo/_base/declare",
	"demo/tests/util",
	"demo/authorBar",
	"dojo/Deferred"
], function(doh, declare, util, authorBar, Deferred){

	// initialize utility access
	var TF = declare(util.Fixture, {});
		mockMethod = util.mockMethod,
		unMockMethod = util.unMockMethod;

	// register the api tests
	doh.register("authorBar api", [

		// the mocking test checks to ensure methods can be mocked and unmocked
		// this allows you to intercept calls to methods, to be sure they are called
		new TF("mocking test", function(){
			var foo = { bar: function() { return "bar"; }};
			var hdl = mockMethod(foo, "bar", function() { return "mocked"; });
			doh.is("mocked", foo.bar(), "mocked method returns expected mock value");
			unMockMethod(hdl);
			doh.is("bar", foo.bar(), "un-mocked method returns expected original value");
		}),

		// test to ensure update calls loadData
		new TF("update calls loadData", function() {
				var ddfd = new doh.Deferred();
				var hdl = mockMethod(authorBar, "loadData", function() {
					var deferred = new Deferred();
					window.setTimeout(function() {
						deferred.resolve(true);
					},50);
					return deferred.promise; 
				});
				// update is expecting a promise from loadData
				authorBar.update().then(ddfd.getTestCallback(function(){}));

				unMockMethod(hdl);
				return ddfd;
		}),

		// ensure either onDataLoad or onLoadError is called when loadData is called
		new TF("loadData callbacks", function() {
			var hdl = mockMethod(authorBar, "onDataLoad", function() { ddfd.callback("pass"); }),
			hdlError = mockMethod(authorBar, "onLoadError", function() { ddfd.callback("pass"); });
			var ddfd = new doh.Deferred();

			ddfd.addCallback(function(result){
				unMockMethod(hdl);
				unMockMethod(hdlError);
				doh.is("pass", result, "call to loadData() should trigger onDataLoad/onLoadError callbacks");
			});
			authorBar.loadData();
			return ddfd;
		})
	]);
});
