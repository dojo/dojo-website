<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit RadioButton</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="demo.css">
	</head>
	<body class="claro">
		<h2>dijit/form/RadioButton value setters</h2>
		<h3>Pizza Toppings</h3>
		<ul style="list-style-type: none">
			<li>
				<input id="topping1" type="radio" name="topping" value="anchovies" checked
					data-dojo-type="dijit/form/RadioButton">
				<label for="topping1">Anchovies</label>
			</li>
			<li>
				<input id="topping2" type="radio" name="topping" value="olives"
					data-dojo-type="dijit/form/RadioButton">
				<label for="topping2">Olives</label>
			</li>
			<li>
				<input id="topping3" type="radio" name="topping" value="pineapple"
					data-dojo-type="dijit/form/RadioButton">
				<label for="topping3">Pineapple</label>
			</li>
		</ul>
		<button id="summaryBtn">Which Toppings?</button>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dijit/form/RadioButton", "dojo/on", "dijit/registry", "dojo/parser", "dojo/ready"], function(RadioButton, on, registry, parser, ready) {

				ready(function(){
					parser.parse();

					on(document.getElementById("summaryBtn"), "click", function(evt){
						var toppings = [];

						if(registry.byId("topping1").get("checked")){
							toppings.push(registry.byId("topping1").get("value"));
						}

						if(registry.byId("topping2").get("checked")){
							toppings.push(registry.byId("topping2").get("value"));
						}

						if(registry.byId("topping3").get("checked")) {
							toppings.push(registry.byId("topping3").get("value"));
						}

						alert("Topping: " + toppings.join(", "));
					});
				});
			});

		</script>
	</body>
</html>