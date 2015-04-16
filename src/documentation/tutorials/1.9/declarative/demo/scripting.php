<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: Declarative Scripting</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Tutorial: Declarative Scripting</h1>
	<div id="someDialog" data-dojo-type="dijit/Dialog" data-dojo-props="title: 'Hello World!'">
		<p>I am a dialog. That makes me happy.</p>
	</div>
	<button type="button" id="myButton" data-dojo-type="dijit/form/Button">
		<span>Click Me!</span>
		<script type="dojo/on" data-dojo-event="click">
			var registry = require("dijit/registry");
			registry.byId("someDialog").show();
		</script>
	</button>
	<?php
		Utils::printDojoScript("isDebug: 1, async: 1");
	?>
	<script>
		require([
			"dojo/parser",
			"dijit/registry",
			"dijit/form/Button",
			"dijit/Dialog",
			"dojo/domReady!"
		], function(parser){
			parser.parse();
		});
	</script>
</body>
</html>