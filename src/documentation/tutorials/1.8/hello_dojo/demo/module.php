<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: Hello Dojo!</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
	<script>
		// Instead of using data-dojo-config, we’re creating a dojoConfig object
		// *before* we load dojo.js; they’re functionally identical.
		var dojoConfig = {
			async: true,
			// This code registers the correct location of the "demo" package
			// so we can load Dojo from the CDN whilst still being able to
			// load local modules
			packages: [{
				name: "demo",
				location: location.pathname.replace(/\/[^/]*$/, '')
			}]
		};
	</script>
</head>
<body>
	<h1 id="greeting">Hello</h1>
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("isDebug:1, async:1");
	?>
	<script>
		// Require the module we just created
		require(["demo/myModule"], function(myModule){
			// Use our module to change the text in the greeting
			myModule.setText("greeting", "Hello Dojo!");

			// After a few seconds, restore the text to its original state
			setTimeout(function(){
				myModule.restoreText("greeting");
			}, 3000);
		});
	</script>
</body>
</html>
