<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Using _TemplatedMixin</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: Using _TemplatedMixin</h1>
		<div data-dojo-type="demo/SomeWidget" data-dojo-props="title:'Our Some Widget'">
			<div>Don't forget to click on the title!</div>
			<p>This is arbitrary content!</p>
			<button data-dojo-type="dijit/form/Button">My Button</button>
			<p>More arbitrary content!</p>
		</div>
		<script>
			// See the using Custom Modules with a CDN Tutorial for more
			// information on configuring Dojo for CDN usage
			var dojoConfig = {
				async: true,
				dojoBlankHtmlUrl: location.pathname.replace(/\/[^/]+$/, "") + "/blank.html",
				packages: [{
					name: "demo",
					location: location.pathname.replace(/\/[^/]+$/, "") + "/"
				}]
			};
		</script>
		<?php
			Utils::printDojoScript();
		?>
		<script>
			require([
				"dojo/parser",
				"demo/SomeWidget",
				"dijit/form/Button",
			], function(parser) {
				// Invoke the dojo/parser
				parser.parse();
			});
		</script>
	</body>
</html>
