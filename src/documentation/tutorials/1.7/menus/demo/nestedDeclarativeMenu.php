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
	<div id="mainMenu" data-dojo-type="dijit.Menu">
		<div id="edit"
				data-dojo-type="dijit.MenuItem">
			Edit
		</div>
		<div id="view"
				data-dojo-type="dijit.MenuItem">
			View
		</div>
		<div id="task" data-dojo-type="dijit.PopupMenuItem">
			<span>Task</span>
			<div id="taskMenu" data-dojo-type="dijit.Menu">
				<div id="complete"
						data-dojo-type="dijit.MenuItem">
					Mark as Complete
				</div>
				<div id="cancel"
						data-dojo-type="dijit.MenuItem">
					Cancel
				</div>
				<div id="begin"
						data-dojo-type="dijit.MenuItem">
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
            "dojo/_base/Deferred",
            "dojo/dom",
            "dijit/WidgetSet",
            "dijit/Menu",
            "dijit/MenuItem",
            "dijit/PopupMenuItem",
            "dojo/domReady!"
        ], function(registry, parser, Deferred, dom){
			// a menu item selection handler
            var onItemSelect = function(evt){
				// retrieve the widget representing the item clicked
				var item = registry.getEnclosingWidget(evt.target);
				dom.byId("lastSelected").innerHTML =
					item.get("label");
			};

			Deferred.when(parser.parse(), function(){
				registry.byClass("dijit.MenuItem").forEach(function(item){
					// provide an implementation for the onClick method
					item.onClick = onItemSelect;
				});
			});

		});
	</script>
</body>
</html>
