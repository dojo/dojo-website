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
	<div id="mainMenu" data-dojo-type="dijit/MenuBar">
		<div id="edit"
				data-dojo-type="dijit/MenuBarItem">
			Edit
		</div>
		<div id="view"
				data-dojo-type="dijit/MenuBarItem">
			View
		</div>
		<div id="task" data-dojo-type="dijit/PopupMenuBarItem">
			<span>Task</span>
			<div id="taskMenu" data-dojo-type="dijit/Menu">
				<div id="complete"
						data-dojo-type="dijit/MenuItem">
					Mark as Complete
				</div>
				<div id="cancel"
						data-dojo-type="dijit/MenuItem">
					Cancel
				</div>
				<div id="begin"
						data-dojo-type="dijit/MenuItem">
					Begin
				</div>
			</div>
		</div><!-- end of sub-menu -->
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
            "dojo/ready",
            "dijit/WidgetSet",
            "dijit/Menu",
            "dijit/MenuItem", 
            "dijit/MenuBar",
            "dijit/MenuBarItem", 
            "dijit/PopupMenuBarItem"
        ], function(registry, parser, dom, ready){
        	ready(function(){
				// a menu item selection handler
				var onItemSelect = function(evt){
					// retrieve the widget representing the item clicked
					var item = registry.getEnclosingWidget(evt.target);
					dom.byId("lastSelected").innerHTML =
						item.get("label");
				};

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
