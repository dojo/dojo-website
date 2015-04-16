<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: on</title>
	<link rel="stylesheet" href="style.css" media="screen">
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Demo: on</h1>
	<button id="someNode" type="button"></button>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dijit/form/Button", "dojo/domReady!"], function(Button){
		var button = new Button({
			label: "Click Me!"
		}, "someNode");

		// Sets the event handling for the button
		button.on("click", function(e){
		console.log("I was clicked!", e);
		});
	});
	</script>
</body>
</html>
