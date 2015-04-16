require([
	"doh/runner",
	"dojo/dom",
	"dojo/_base/lang",
	"dojo/_base/config",
	"dojo/request",
	"dojo/json",
	"dojo/_base/declare",
	"demo/tests/util",
	"demo/authorBar"
], function(doh, dom, lang, config, request, JSON, declare, util, authorBar){

	// set the source of the authors
	lang.mixin(config, {
		authorsUrl: "/documentation/tutorials/1.9/recipes/doh_testsuite/resources/authors.json"
	});

	// get the author data and extract the first author
	var cfg = config,
		dataLoaded = false,
		data = false,
		author = null;

	// set the authorName for the author bar to the value assigned above
	var TF = declare(util.Fixture, {
		setUp: function() {
			if (cfg.authorsUrl) {
				 request(cfg.authorsUrl, {sync: true, handleAs: "json"}).then(function(jsonData) {
					data = jsonData;
					if (data && (data.length > 0)) {
						dataLoaded = true;
						author = data[0];
						// make sure the config'd authorName is a known quantity at the start of every test
						cfg.authorName = author.name;
					}},
					function(error) {
						cfg.authorName = false;
					});
			} else {
				cfg.authorName = false;
			}
		}
	});

	// set up mocking access
	var mockMethod = util.mockMethod,
		unMockMethod = util.unMockMethod;

	// register the data tests
	doh.register("authorBar data", [

		// smoke tests to ensure there is an authorName and authorBar with an update method
		new TF("smoke test", function() {
			doh.t(true, "Smoke test fixture");
			doh.t(Boolean(cfg.authorName), "Check authorName config property");
			doh.t(authorBar, "Check demo.authorBar has loaded");
			authorBar.update().then(function() {
				var html = dom.byId("author").innerHTML.toString();
				doh.t(html.indexOf(cfg.authorName) > -1, "Element has our updated authorName in it");
			});
		}),

		// data loading is defined as successful if data was loaded from the authors URL and there is some data
		new TF("data loading", function() {
			doh.t(dataLoaded, "Authors data can be retrieved with the authorsUrl property");
			doh.t(data.length && data instanceof Object, "Authors data is an object with gt 0 entries");
		}),

		// this test ensures the data for the selected author has the required properties
		new TF("expected author data properties", function() {
			doh.t(Boolean(author.name), "Author entry has name property");
			doh.t(Boolean(author.bio), "Author entry has bio property");
			doh.t(Boolean(author.avatar), "Author entry has avatar property");
		}),

		// test to ensure the render method is called by onDataLoad
		new TF("handle good data", function() {
			var success = false;
			var renderHdl = mockMethod(authorBar, "render", function(){
				success = true;
			});
			authorBar.onDataLoad([author]);
			doh.t(success, "render method was called when onDataLoad is passed good data");
			unMockMethod(renderHdl);
		}),

		// test to ensure the onError method is called if the data cannot be rendered
		new TF("handle empty data", function() {
			var flag = false;
			var errorHdl = mockMethod(authorBar, "onError", function(){
				flag = true;
			});
			authorBar.onDataLoad([]);
			doh.t(flag, "onError method was called when onDataLoad is passed empty data");
			unMockMethod(errorHdl);
		})
	]);
});
