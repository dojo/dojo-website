<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Nested BorderContainer</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="style.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<div class="demoLayout" style="height: 300px; width: 300px" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="design: 'headline'">
			<div class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">center</div>
			<div class="demoLayout" style="height: 50%" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="region: 'top', splitter: true, design: 'headline'">
				<div class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">center</div>
				<div class="edgePanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'bottom'">bottom</div>
			</div>
			<div class="edgePanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="splitter: true, region: 'left'">left</div>
			<div class="demoLayout" style="width: 50%" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="region: 'right', design: 'headline'">
				<div class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'center'">center</div>
				<div class="edgePanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: 'left'">left</div>
			</div>
			<div class="edgePanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="splitter: true, region: 'bottom'">bottom</div>
		</div>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"], function(parser){
				parser.parse();
			});
		</script>
	</body>
</html>
