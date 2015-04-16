<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: More Dijit Buttons</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
		<style>
			.dj_ie8 .dijitMenuItemLabel {
				position: static;
			}
		</style>
	</head>
	<body class="claro">
		<h1>Demo: More dijit/form/Button(s)!</h1>
		<p>
			In this demo, we see three other types of buttons included in the
			<code>dijit/form</code> namespace.
		</p>
		<div>
			<button id="toggle"></button>
			<button id="combo"></button>
			<button id="dropDown"></button>
		</div>
		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			
			require(["dijit/form/ToggleButton", "dijit/form/ComboButton", "dijit/Menu", "dijit/MenuItem", "dijit/form/DropDownButton", "dijit/TooltipDialog"], function(ToggleButton, ComboButton, Menu, MenuItem, DropDownButton, TooltipDialog) {
				
				var toggleButton = new ToggleButton({
					iconClass: "dijitCheckBoxIcon",
					label: "Toggle",
					checked: true
				}, "toggle");
				toggleButton.startup();

				var menu = new Menu({
					id: "saveMenu"
				});
				var menuItem1 = new MenuItem({
					label: "Save",
					iconClass: "dijitEditorIcon dijitEditorIconSave",
					onClick: function() { console.log("Save"); }
				});
				var menuItem2 = new MenuItem({
					label: "Save As",
					onClick: function() { console.log("Save As"); }
				});
				menu.addChild(menuItem1);
				menu.addChild(menuItem2);
				var comboButton = new ComboButton({
					optionsTitle: "Save Options",
					iconClass: "dijitIconFile",
					label: "Combo",
					dropDown: menu,
					onClick:function(){ console.log("Clicked ComboButton"); }
				}, "combo");
				comboButton.startup();
				menu.startup(); // this also starts up its child MenuItems

				var tooltip = new TooltipDialog({
					content: "This is a TooltipDialog. You could even put a form in here!"
				});
				var dropDownButton = new DropDownButton({
					iconClass: "dijitIconApplication",
					label: "DropDown",
					dropDown: tooltip
				}, "dropDown");
				dropDownButton.startup();
				tooltip.startup();
				
			});
			
		</script>
	</body>
</html>
