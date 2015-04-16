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
	<h3>Declarative Menu using iconClass</h3>
	<div id="mainMenu" data-dojo-type="dijit/Menu">
		<div id="edit" 
				data-dojo-type="dijit/MenuItem" 
				data-dojo-props="iconClass: 'dijitIconEdit'">
			Edit
		</div>
		<div id="view"
				data-dojo-type="dijit/MenuItem" 
				data-dojo-props="iconClass: 'dijitIconApplication'">
			View
		</div>
		<div id="task" 
				data-dojo-type="dijit/MenuItem" 
				data-dojo-props="iconClass: 'dijitIconTask'">
			Task
		</div>
	</div>
	<h3>Programmatic Menu using iconClass</h3>
	<div id="progMenu"></div>
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
            "dojo/parser",
            "dojo/dom",
            "dojo/ready",
            "dijit/WidgetSet"
        ], function(Menu, MenuItem, registry, parser, dom, ready){

        	ready(function(){
				// a menu item selection handler
				var onItemSelect = function(evt){
					// retrieve the widget representing the item clicked
					var item = registry.getEnclosingWidget(evt.target);
					dom.byId("lastSelected").innerHTML =
						item.get("label");
				};

				// create equivalent programmatic example
				var menu = new Menu({
				}, "progMenu");

				menu.addChild( new MenuItem({
					id: "p_edit",
					label: "Edit",
					iconClass: "dijitIconEdit"
				}) );

				menu.addChild( new MenuItem({
					id: "p_view",
					label: "View",
					iconClass: "dijitIconApplication"
				}) );

				menu.addChild( new MenuItem({
					id: "p_task",
					label: "Task",
					iconClass: "dijitIconTask"
				}) );

				menu.startup();
				parser.parse().then(function(){
					registry.byClass("dijit.MenuItem").forEach(function(item){
						// provide an implementation for the onClick method
						item.onClick = onItemSelect;
					});
				});
			});

		});
	</script>
</body>
</html>
