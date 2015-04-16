<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit FilteringSelect</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<div style="width:540px;">
			<h1 style="text-align: center;">Programmatic Example</h1>
			<div style="width:50%;float: left;">
				<h1>dijit/form/FilteringSelect</h1>
				<label for="stateSelect">State:</label>
				<div id="stateSelect"></div>
			</div>
			<div style="width:50%;float: right;"><h1>Values:</h1>
				<div><strong>value:</strong> <span id="value"></span></div>
				<div><strong>displayedValue:</strong> <span id="displayedValue"></span></div>
				<h5>*Note how the submitted value will be the identity of the store item</h5>
			</div>
		</div>

		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			require(["dijit/form/FilteringSelect", "dojo/store/Memory",
					"dojo/json", "dojo/text!./states.json", "dojo/ready"],
				function(FilteringSelect, Memory, json, states, ready) {

				ready(function(){
					// create store instance referencing data from states.json
					var stateStore = new Memory({
						idProperty: "abbreviation",
						data: json.parse(states)
					});

					// create FilteringSelect widget, populating its options from the store
					var select = new FilteringSelect({
						name: "stateSelect",
						placeHolder: "Select a State",
						store: stateStore,
						onChange: function(val){
							document.getElementById("value").innerHTML = val;
							document.getElementById("displayedValue").innerHTML = this.get("displayedValue");
						}
					}, "stateSelect");
					select.startup();
				});
			});
			
		</script>
	</body>
</html>
