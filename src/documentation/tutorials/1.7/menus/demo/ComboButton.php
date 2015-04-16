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
	<p>This page demonstrates declarative and programmatic usage of
		<code>dijit/Menu</code> inside <code>dijit/form/ComboButton</code> and
		<code>dijit/form/DropDownButton</code>.
	</p>
	<h3>Declarative Demo</h3>
	
	<div id="comboButton" data-dojo-type="dijit.form.ComboButton">
		<span>Do Something</span>
		<div data-dojo-type="dijit.Menu">
			<div data-dojo-type="dijit.MenuItem">
				Edit
			</div>
			<div data-dojo-type="dijit.MenuItem">
				View
			</div>
			<div data-dojo-type="dijit.MenuItem">
				Task
			</div>
		</div>
	</div>
	<div id="dropDownButton" data-dojo-type="dijit.form.DropDownButton">
		<span>Select Action</span>
		<div data-dojo-type="dijit.Menu">
			<div data-dojo-type="dijit.MenuItem">
				Edit
			</div>
			<div data-dojo-type="dijit.MenuItem">
				View
			</div>
			<div data-dojo-type="dijit.MenuItem">
				Task
			</div>
		</div>
	</div>

	<h3>Programmatic Demo</h3>
	<div id="comboBtn"></div>
	<div id="dropDownBtn"></div>
	<p>Last selected: <span id="lastSelected">none</span></p>

	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("isDebug:1, async:1");
	?>
	<script>
	    require([
            "dijit/Menu",
            "dijit/MenuItem", 
            "dijit/form/ComboButton",
            "dijit/form/DropDownButton",
            "dijit/registry",
            "dojo/parser",
            "dojo/dom",
            "dojo/_base/Deferred",
            "dijit/WidgetSet",
            "dojo/domReady!"
        ], function(Menu, MenuItem, ComboButton, DropDownButton, registry, parser, dom, Deferred){
			// a menu item selection handler
            var onItemSelect = function(evt){
        		// retrieve the widget representing the item clicked
        		var item = registry.getEnclosingWidget(evt.target);
        		dom.byId("lastSelected").innerHTML = 
        			item.get("label");
        	};
            
    		var menu = new Menu({ id: "mainMenu" });
			
			// create child item widgets for each
			// of 'edit','view','task'
			menu.addChild( new MenuItem({
				label: "Edit"
			}) );
			
			menu.addChild( new MenuItem({
				label: "View"
			}) );
			
			menu.addChild( new MenuItem({
				label: "Task"
			}) );
			
			// create a ComboButton and DropDownButton and add the Menu to each
			var comboBtn = new ComboButton({
				label: "Do Something", 
				dropDown: menu
			}, "comboBtn");
			
			var dropDownBtn = new DropDownButton({
				label: "Select Action",
				dropDown: menu
			}, "dropDownBtn");
			
			menu.startup();
			comboBtn.startup();
			dropDownBtn.startup();
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
