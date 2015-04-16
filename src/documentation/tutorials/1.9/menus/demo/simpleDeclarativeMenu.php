<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Demo: Dijit Menus</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h3>Menu Demo</h3>
	<div id="mainMenu" data-dojo-type="dijit/Menu">
		<div id="edit" data-dojo-type="dijit/MenuItem">Edit</div>
		<div id="view" data-dojo-type="dijit/MenuItem">View</div>
		<div id="task" data-dojo-type="dijit/MenuItem">Task</div>
	</div>
	<p>Last selected: <span id="lastSelected">none</span></p>
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("isDebug:1, async:1");
	?>
	<script>
        require([
            "dijit/registry",
            "dojo/parser",
            "dojo/dom",
			"dijit/WidgetSet", // for registry.byClass
            "dijit/Menu",
            "dijit/MenuItem",
            "dojo/domReady!"
        ], function(registry, parser, dom){
			// a menu item selection handler
			var onItemSelect = function(event){
				dom.byId("lastSelected").innerHTML = this.get("label");
			};

			parser.parse();

			registry.byClass("dijit.MenuItem").forEach(function(item){
				item.on('click', onItemSelect);
			});
		});
	</script>
</body>
</html>
