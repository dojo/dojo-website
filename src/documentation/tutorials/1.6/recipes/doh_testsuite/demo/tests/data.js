dojo.provide("demo.tests.data");
dojo.require("demo.authorBar");
dojo.require("demo.tests.util");

(function(){
	dojo.mixin(dojo.config, {
		authorsUrl: dojo.moduleUrl('demo', '../resources/authors.json')
	});
	var cfg = dojo.config, 
		util = demo.tests.util,

		dataText = cfg.authorsUrl && dojo._getText(cfg.authorsUrl),
		data = dataText ? dojo.fromJson(dataText) : [], 
		author = data.shift();

	var TF = dojo.declare(util.Fixture, {
		setUp: function() {
			// make sure the config'd authorName is a known quantity at the start of every test
			dojo.config.authorName = author.name;
		}
	});
	var mockMethod = demo.tests.util.mockMethod, 
		unMockMethod = demo.tests.util.unMockMethod;

doh.register("authorBar data", [
	new TF("smoke test", function() {
			doh.t(true, "Smoke test fixture");
			doh.t(Boolean(cfg.authorName), "Check authorName config property");
			doh.t(demo.authorBar && demo.authorBar.update, "Check demo.authorBar has loaded");
	}),
	new TF("data loading", function() {
			doh.t(dataText, "Authors data can be retrieved with the authorsUrl property");
			doh.t(data.length && data instanceof Array, "Authors data deserializes to an array with gt 0 entries");
	}),
	new TF("expected author data properties", function() {
			doh.t(Boolean(author.name), "Author entry has name property");
			doh.t(Boolean(author.bio), "Author entry has bio property");
			doh.t(Boolean(author.avatar), "Author entry has avatar property");
	}), 
	new TF("handle good data", function() {
			var success = false;
			var renderHdl = mockMethod(demo.authorBar, "render", function(){
				success = true;
			});
			demo.authorBar.onDataLoad([author]);
			doh.t(success, "render method was called when onDataLoad is passed good data");
			unMockMethod(renderHdl);
	}),
	new TF("handle empty data", function() {
			var flag = false;
			var renderHdl = mockMethod(demo.authorBar, "onError", function(){
				flag = true;
			});
			demo.authorBar.onDataLoad([]);
			doh.t(flag, "onError method was called when onDataLoad is passed empty data");
			unMockMethod(renderHdl);
	})
]);

})();
