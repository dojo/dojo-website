<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit CheckBox</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="demo.css">
	</head>

	<body class="claro">
		<h2>dijit.form.CheckBox</h2>
		<div>
			<h3>Declarative Checkboxes</h3>

			<p>
				<input type="checkbox" id="dbox1" checked
					data-dojo-type="dijit/form/CheckBox">
				<label for="dbox1">Want</label>
			</p>

			<p>
				<input type="checkbox" id="dbox2"
					data-dojo-type="dijit/form/CheckBox">
				<label for="dbox2">Need</label>
			</p>

			<p>
				<input type="checkbox" id="dbox3" checked disabled
					data-dojo-type="dijit/form/CheckBox">
				<label for="dbox3">Disabled option</label>
			</p>
		</div>

		<h3>Programmatic Checkboxes</h3>
		<div>
			<p id="pbox1_container">
				<label for="pbox1">Want</label>
			</p>

			<p id="pbox2_container">
				<label for="pbox2">Need</label>
			</p>

			<p id="pbox3_container">
				<label for="pbox3">Disabled option</label>
			</p>
		</div>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			
			require(["dijit/form/CheckBox", "dojo/parser", "dojo/ready"], function(CheckBox, parser, ready) {

				ready(function(){

					parser.parse();

					var box1 = new CheckBox({
						id: "pbox1",
						checked: true
					});
					// place the widget on the page
					box1.placeAt("pbox1_container", "first");

					var box2 = new CheckBox({
						id: "pbox2"
					});
					box2.placeAt("pbox2_container", "first");

					var box3 = new CheckBox({
						id: "pbox3",
						checked: true,
						disabled: true
					});
					box3.placeAt("pbox3_container", "first");
				});
				
			});
			
		</script>
	</body>
</html>