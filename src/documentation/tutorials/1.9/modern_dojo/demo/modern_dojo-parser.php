<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: parser</title>
	<link rel="stylesheet" href="style.css" media="screen">
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Demo: parser</h1>
	<button data-dojo-type="dijit/form/Button" type="button">
		<span>Click</span>
		<script type="dojo/on" data-dojo-event="click" data-dojo-args="e">
			console.log("I was clicked!", e);
			this.set("label", "Clicked!");
		</script>
		<script type="dojo/watch" data-dojo-prop="label" data-dojo-args="prop, oldValue, newValue">
			console.log("button: " + prop + " changed from '" + oldValue + "' to '" + newValue + "'");
		</script>
	</button>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dojo/parser", "dijit/form/Button", "dojo/domReady!"], function(parser){
		parser.parse();
	});
	</script>
</body>
</html>
