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
	<h3>Nested Menu Demo</h3>
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
            "dijit/PopupMenuItem", 
            "dijit/registry",
            "dojo/dom",
            "dojo/domReady!"
        ], function(Menu, MenuItem, PopupMenuItem, registry, dom){
			// a menu item selection handler
            var onItemSelect = function(evt){
        		// retrieve the widget representing the item clicked
        		var item = registry.getEnclosingWidget(evt.target);
        		dom.byId("lastSelected").innerHTML = 
        			item.get("label");
        	};
			// create the Menu container
			var mainMenu = new Menu({
			}, "mainMenu");
			
			// create Menu container and child MenuItems for our sub-menu
			// (no srcNodeRef; we will add it under a PopupMenuItem)
			var taskMenu = new Menu({
				id: "taskMenu"
			});
			
			// define the task sub-menu items
			taskMenu.addChild( new MenuItem({
				id: "complete",
				label: "Mark as Complete",
				// provide an implementation for the onClick method
				onClick: onItemSelect 
			}) );
			
			taskMenu.addChild( new MenuItem({
				id: "cancel",
				label: "Cancel",
				// provide an implementation for the onClick method
				onClick: onItemSelect 
			}) );
			
			taskMenu.addChild( new MenuItem({
				id: "begin",
				label: "Begin",
				// provide an implementation for the onClick method
				onClick: onItemSelect 
			}) );
			
			// create and add main menu items
			mainMenu.addChild( new MenuItem({
				id: "edit",
				label: "Edit",
				// provide an implementation for the onClick method
				onClick: onItemSelect 
			}) );
			
			mainMenu.addChild( new MenuItem({
				id: "view",
				label: "View",
				onClick: onItemSelect 
			}) );
			
			// make task menu item open the sub-menu we defined above
			mainMenu.addChild( new PopupMenuItem({
				id: "task",
				label: "Task",
				popup: taskMenu
			}) );
			
			mainMenu.startup();
			taskMenu.startup();
		});
	</script>
</body>
</html>
