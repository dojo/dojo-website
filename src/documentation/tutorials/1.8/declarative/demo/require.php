<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: Declarative Require</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Tutorial: Declarative Require</h1>
	<script type="dojo/require">
		registry: "dijit/registry"
	</script>
	<button type="button" id="button1" disabled="disabled" data-dojo-type="dijit/form/Button">
		<span>I'm disabled</span>
	</button>
	<button type="button" id="button2" data-dojo-type="dijit/form/Button">
		<span>Click Me!</span>
		<script type="dojo/on" data-dojo-event="click">
			var button1 = registry.byId("button1");
			button1.on("click", function(){
				console.log("I was clicked!");
			});
			button1.set("label", "I'm enabled");
			button1.set("disabled", false);
		</script>
	</button>
	<?php
		Utils::printDojoScript("isDebug: 1, async:1");
	?>
	<script>
		require([
			"dojo/parser",
			"dijit/form/Button",
			"dojo/domReady!"
		], function(parser){
			parser.parse();
		});
	</script>
</body>
</html>