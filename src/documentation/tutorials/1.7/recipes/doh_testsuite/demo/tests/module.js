// there are three test sets to run: api, data and page
require(["doh/runner", "require", "demo/tests/api", "demo/tests/data"],
	function(doh, require){
		try {
			// register the test page, which initiates the doh
			doh.registerUrl("in-page authorBar", require.toUrl("demo/tests/test_authorBar.php"), 5000); // timeout test after 5 seconds
		} catch(e) {
			doh.debug(e);
	}
});
