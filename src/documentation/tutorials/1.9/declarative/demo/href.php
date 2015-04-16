<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: Loading Content with Scripting</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Tutorial: Loading Content with Scripting</h1>
	<div id="tc" data-dojo-type="dijit/layout/TabContainer" data-dojo-props="style: { height: '200px', width: '400px' }">
		<div id="atab" data-dojo-type="dijit/layout/ContentPane" 
			data-dojo-props="title: 'A Tab', href: 'content.html'"></div>
	</div>
	<?php
		Utils::printDojoScript("isDebug: 1, async:1");
	?>
	<script>
		require([
			"dojo/parser",
			"dijit/form/Button",
			"dijit/layout/ContentPane",
			"dijit/layout/TabContainer",
			"dojo/domReady!"
		], function(parser){
			parser.parse();
		});
	</script>
</body>
</html>