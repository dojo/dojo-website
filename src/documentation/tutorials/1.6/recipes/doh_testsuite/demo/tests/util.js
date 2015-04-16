dojo.provide("demo.tests.util")

demo.tests.util = {
	mockMethod: function(obj, methName, fn) {
		var orig = obj[methName];
		var handle = [obj, methName, orig];
		obj[methName] = fn;
		return handle;
	}, 
	unMockMethod: function(handle) {
		handle[0][handle[1]] = handle[2];
	}, 
	Fixture: dojo.declare(null, {
		name: "",
		timeout: 2000, // 2 seconds.

		setUp: function(props) {
			console.log("TestFixture: " + this.name);
		},
		constructor: function(name, props) {
			if(!props) {
				props = name || {};
			}
			if(typeof props == "function") {
				var fn = props;
				props = {
					runTest: fn
				};
			}
			if(!props.name) {
				props.name = name || "test_" + (demo.tests.util.Fixture._count++);
			}
			dojo.mixin(this, props);
		},
		tearDown: function() {}
	})
};
demo.tests.util.Fixture._count = 0;
