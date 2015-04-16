<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: watch</title>
	<link rel="stylesheet" href="style.css" media="screen">
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Demo: watch</h1>
	<button id="someNode" type="button"></button>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dijit/form/Button", "dojo/domReady!"], function(Button){
		var button = new Button({
			label: "A label"
		}, "someNode");

		// Sets up a watch on button.label
		var handle = button.watch("label", function(attr, oldValue, newValue){
			console.log("button." + attr + " changed from '" + oldValue + "' to '" + newValue + "'");
		});

		// Gets the current label
		var label = button.get("label");
		console.log("button's current label: " + label);

		// This changes the value and should call the watch
		button.set("label", "A different label");

		// This will stop watching button.label
		handle.unwatch();

		button.set("label", "Even more different");
	});
	</script>
</body>
</html>
