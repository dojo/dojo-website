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
	<h3>MenuBar Demo</h3>
	<div id="mainMenu"></div>
	<p>Last selected: <span id="lastSelected">none</span></p>

	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("isDebug:1, async:1");
	?>
	<script>
        require([
            "dojo/dom",
            "dijit/registry",
            "dijit/Menu",
            "dijit/MenuItem", 
            "dijit/MenuBar",
            "dijit/MenuBarItem", 
            "dijit/PopupMenuBarItem", 
            "dojo/domReady!"
        ], function(dom, registry, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem){
			// a menu item selection handler
			var onItemSelect = function(event){
				dom.byId("lastSelected").innerHTML = this.get("label");
			};
			// create the Menu container
			var mainMenu = new MenuBar({}, "mainMenu");

			// create Menu container and child MenuItems for our sub-menu
			// (no srcNodeRef; we will add it under a PopupMenuItem)
			var taskMenu = new Menu({
				id: "taskMenu"
			});

			// define the task sub-menu items
			taskMenu.addChild(new MenuItem({
				id: "complete",
				label: "Mark as Complete",
				onClick: onItemSelect
			}) );

			taskMenu.addChild(new MenuItem({
				id: "cancel",
				label: "Cancel",
				onClick: onItemSelect
			}) );

			taskMenu.addChild(new MenuItem({
				id: "begin",
				label: "Begin",
				onClick: onItemSelect
			}) );

			// create and add main menu items
			mainMenu.addChild(new MenuBarItem({
				id: "edit",
				label: "Edit",
				onClick: onItemSelect
			}) );

			mainMenu.addChild(new MenuBarItem({
				id: "view",
				label: "View",
				onClick: onItemSelect
			}) );

			// make task menu item open the sub-menu we defined above
			mainMenu.addChild(new PopupMenuBarItem({
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
