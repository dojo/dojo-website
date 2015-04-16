<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit ToggleButton</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="demo.css">
	</head>
	<body class="claro">
		<h3>dijit/form/ToggleButton</h3>
		<h4>Declaration Using Markup</h4>
		<input type="checkbox" checked
			data-dojo-type="dijit.form.ToggleButton"
			data-dojo-props="iconClass: 'dijitCheckBoxIcon', label: 'Toggle Me'">

		<h4>Programmatic Declaration</h4>
		<div id="toggleButtonProgrammatic"></div>
		<input type="button" value="Change label" id="changeLabel">
		<input type="button" value="Change icon" id="changeIcon">

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			
			require(["dijit/form/RadioButton", "dijit/form/ToggleButton", "dojo/on", "dijit/registry", "dojo/parser", "dojo/domReady!"], function(RadioButton, ToggleButton, on, registry, parser) {
				
				parser.parse();
				
				var myToggleButton = new ToggleButton({
					checked: true,
					iconClass: "dijitCheckBoxIcon",
					label: "Toggle Me, Too."
				},"toggleButtonProgrammatic");

				on(document.getElementById("changeLabel"), "click", function(){
					// provide a new label for the button
					myToggleButton.set("label", "New Label");
				});

				on(document.getElementById("changeIcon"), "click", function(){
					// hook a .recent rule in our stylesheet
					myToggleButton.set("iconClass", "dijitRadioIcon");
				});
				
			});

		</script>
	</body>
</html>