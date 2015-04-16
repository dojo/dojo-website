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
	<div id="mainMenu"></div>
	<p>Last selected: <span id="lastSelected">none</span></p>
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("isDebug:1, async:1");
	?>
	<script>
        require([
            "dijit/Menu",
            "dijit/MenuItem", 
            "dijit/registry",
            "dojo/dom",
            "dojo/domReady!"
        ], function(Menu, MenuItem, registry, dom){
			// a menu item selection handler
            var onItemSelect = function(evt){
        		// retrieve the widget representing the item clicked
        		var item = registry.getEnclosingWidget(evt.target);
        		dom.byId("lastSelected").innerHTML = 
        			item.get("label");
        	};
            // create the Menu container
			var menu = new Menu({
			}, "mainMenu");
			
			// create and add child item widgets
			// for each of "edit", "view", "task"
			
			menu.addChild( new MenuItem({
				id: "edit",
				label: "Edit",
				// provide an implementation for the onClick method
				onClick: onItemSelect 
			}) );
			
			menu.addChild( new MenuItem({
				id: "view",
				label: "View",
				onClick: onItemSelect 
			}) );
			
			menu.addChild( new MenuItem({
				id: "task",
				label: "Task",
				onClick: onItemSelect 
			}) );
			
			menu.startup();        	
		});
	</script>
</body>
</html>
