<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit CheckBox/RadioButton onChange</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="demo.css">
	</head>
	<body class="claro">
		<h2>Using onChange</h2>

		<h3>Pizza Toppings</h3>
		<ul style="list-style-type: none">
			<li>
				<input id="topping1" name="topping" type="radio" value="anchovies" checked
					data-dojo-type="dijit/form/RadioButton">
				<label for="topping1">Anchovies</label>
			</li>
			<li>
				<input id="topping2" name="topping" type="radio" value="pineapple"
					data-dojo-type="dijit/form/RadioButton">
				<label for="topping2">Pineapple</label>
			</li>
		</ul>
		<div id="toppingNote">Likes the salty!</div>

		<h3>Crust</h3>
		<p>
			<input id="crust" name="crust" type="checkbox" value="thick"
				data-dojo-type="dijit/form/CheckBox">
			<label for="crust">Thick Crust</label>
		</p>
		<div id="crustNote"></div>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>

			require(["dijit/form/RadioButton", "dijit/registry", "dojo/parser", "dojo/domReady!"], function(RadioButton, registry, parser){
				parser.parse();

				var summaryNode = document.getElementById("toppingNote"),
					remarkNode = document.getElementById("crustNote");

				registry.byId("topping1").on("change", function(isChecked){
					if(isChecked){
						summaryNode.innerHTML = "Likes the salty!";
					}
				}, true);

				registry.byId("topping2").on("change", function(isChecked){
					if(isChecked){
						summaryNode.innerHTML = "Likes the sweet!";
					}
				}, true);

				registry.byId("crust").on("change", function(isChecked){
					remarkNode.innerHTML = isChecked ? "Healthy gums!" : "";
				}, true);
			});			
		</script>
	</body>
</html>