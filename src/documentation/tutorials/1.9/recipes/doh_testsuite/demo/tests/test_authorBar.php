<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php'); ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: DOH TestSuite - Author Bar</title>
		<link rel="stylesheet" href="../style.css" media="screen">
		<link rel="stylesheet" href="../../../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss(); ?>
		<script>
			/* DOH not supported on CDN, hence use of Dojo site link */
			dojoConfig = {
				async: true,
				parseOnLoad: false,
				paths: {
					demo: location.pathname.substring(0, location.pathname.lastIndexOf('/tests')),
					doh: '/js/dojo/1.9/util/doh',
				},
				authorsUrl: '/documentation/tutorials/1.9/recipes/doh_testsuite/resources/authors.json',
				authorName: 'Sam Foster'
			};
		</script>
		<?php 
			Utils::printDojoScript();
		?>
		<script>
			require(["doh/runner",
				"demo/authorBar",
				"dojo/dom",
				"dojo/_base/config",
				"demo/tests/util",
				"dojo/domReady!"
			], function(doh,authorBar,dom,config,util){
				var TF = util.Fixture;
				// register the browser test group
				doh.register("browser tests", [
					// test to ensure the authorBar was rendered and has the right authorName in it
					new TF("authorBar rendered", function() {
						doh.t((dom.byId("author")!==null), "Element exists");
						var html=dom.byId("author").innerHTML.toString();
						doh.t(html.indexOf(config.authorName) > -1, "Element has our authorName in it");
					}),

					// test to ensure the right styling is applied
					new TF("style", function() {
						var node = dom.byId("author");
						// check that the node got some style from the stylesheet
						// we'll infer that from offsetHeight
						var styledHeight = node.offsetHeight;
						var origClass = node.className;
						node.className = node;
						doh.isNot(styledHeight, node.offsetHeight, "Unstyled element doesnt match styled element height");
						// put it back
						node.className = origClass;
					}),

					// test to ensure updates to the content of the authorBar work
					new TF("re-update", function() {
						var newAuthor = config.authorName = "Brian Arnold";
						authorBar.update().then(function() {
							var html = dom.byId("author").innerHTML.toString();
							doh.t(html.indexOf(newAuthor) > -1, "Element has our updated authorName in it");
						});
					}),

					// test to make sure the authorBar isn't destroyed if an update fails
					new TF("bad data url", function() {
						var authorName = config.authorName;
						config.authorsUrl = "./notthere.json";
						// attempt to update with bad data url
						authorBar.update().then(function() {
							// ensure the authorBar didn't get wiped
							var html=dom.byId("author").innerHTML.toString();
							doh.t(html.indexOf(authorName) > -1, "Load error handled, element not touched");
						});
					}),

					// test to make sure invalid data is not displayed
					new TF("missing author handling", function () {
						var authorName = config.authorName,
							badAuthor = config.authorName = "Pliny the Elder";

						// attempt to update with bad data url
						authorBar.update().then(function() {
							// ensure the authorBar didn't get wiped
							var html=dom.byId("author").innerHTML.toString();
							doh.t(html.indexOf(badAuthor) == -1, "error handled, bad author not inserted");
							doh.t(html.indexOf(authorName) > -1, "error handled, original author intact");
						});
					})
				]);
			authorBar.update().then(function(){ 
				doh.run(); 
			});
			});
		</script>
	</head>
	<body>
		<h1>Demo: DOH TestSuite - Author Bar</h1>
	</body>
</html>
