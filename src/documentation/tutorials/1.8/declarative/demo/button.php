<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: A Button</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Tutorial: A Button</h1>
	<button type="button" id="myButton" data-dojo-type="dijit/form/Button">
		<span>Click Me!</span>
	</button>
	<?php
		Utils::printDojoScript("isDebug: 1, async:1");
	?>
	<script>
		require(["dojo/parser", "dijit/form/Button", "dojo/domReady!"], function(parser){
			parser.parse();
		});
	</script>
</body>
</html>