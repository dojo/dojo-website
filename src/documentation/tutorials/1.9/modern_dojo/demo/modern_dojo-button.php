<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: button</title>
	<link rel="stylesheet" href="style.css" media="screen">
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>

</head>
<body class="claro">
	<h1>Demo: button</h1>
	<button id="button1" type="button">Button1</button>
	<button id="button2" data-dojo-type="dijit/form/Button" type="button">Button2</button>
	<button id="button3" data-dojo-type="dijit/form/Button" type="button">
		<span>Button3</span>
		<script type="dojo/on" data-dojo-event="click">
			console.log("I was clicked");
		</script>
	</button>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require([
		"dojo/dom",
		"dojo/on",
		"dojo/parser",
		"dijit/registry",
		"dijit/form/Button",
		"dojo/domReady!"
	], function(dom, on, parser, registry){
		var myClick = function(evt){
			console.log("I was clicked");
		};

		parser.parse();

		on(dom.byId("button1"), "click", myClick);
		on(registry.byId("button2"), "click", myClick);
	});
	</script>
</body>
</html>
