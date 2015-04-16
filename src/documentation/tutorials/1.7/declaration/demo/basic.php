<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dijit/Declaration</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
	</head>
	<body class="claro">
		<h1>Demo: dijit/Declaration</h1>
		<p>
		The following demonstrates the basic use of dijit/Declaration.  Take a look at the source code to
		see how it works.  Hover over the links to be sure the correct employee id was rendered!
		(Note that clicking the links is not meant to work, since this is just a demo of Declaration,
		not a full application.)
		</p>
		 
		<div data-dojo-type="dijit.Declaration" data-dojo-props="widgetClass:'Employee', defaults: { empid:123, name:'' }">
			<span>${name}</span>
			<a href="update.php?id=${empid}">update</a>
			<a href="delete.php?id=${empid}">delete</a>
		</div>

		<div data-dojo-type="Employee" data-dojo-props="empid: 100, name:'John Doe'"></div>
		<div data-dojo-type="Employee" data-dojo-props="empid: 101, name:'Jane Doe'"></div>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/parser", "dijit/Declaration", "dojo/domReady!"], function(parser) {
				parser.parse();
			});
		</script>
	</body>
</html>
