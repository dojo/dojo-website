define(["dojo/_base/declare", "dojo/_base/lang"],
function(declare, lang) {
	return {
		// mockMethod intercepts an object's method to ensure it is called
		mockMethod: function(obj, methName, fn) {
			var orig = obj[methName];
			var handle = [obj, methName, orig];
			obj[methName] = fn;
			return handle;
		},

		// unMockMethod restores the original method
		unMockMethod: function(handle) {
			handle[0][handle[1]] = handle[2];
		},

		// test fixture, identifies the test and executes it
		Fixture: declare(null,{
			name: "",
			timeout: 2000, // 2 seconds.
			_count: 0,

			setUp: function(props) {
				console.log("TestFixture: " + this.name);
			},
			constructor: function(name, props){
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
					props.name = name || "test_" + (this._count++);
				}
				lang.mixin(this,props);
			},
			tearDown: function() {}
		})
	};
});
