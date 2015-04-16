<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit Select</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<div style="width:50%;">
			<div style="width:50%;float: left;">
				<h1>dijit/form/Select</h1>
				<label for="stateSelect">State:</label>
				<select id="stateSelect" data-dojo-type="dijit.form.Select" name="stateSelect"
					data-dojo-props="
						onChange: function(value){
							document.getElementById('value').innerHTML = value;
							document.getElementById('displayedValue').innerHTML = this.get('displayedValue');
						}">
					<option value="" selected="selected">Select a state</option>
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>
					<option value="AZ">Arizona</option>
					<option value="AR">Arkansas</option>
					<option value="CA">California</option>
				</select>
			</div>
			<div style="width:50%;float: right;"><h1>Values:</h1>
				<div><strong>value:</strong> <span id="value"></span></div>
				<div><strong>displayedValue:</strong> <span id="displayedValue"></span></div>
				<h5>*Note how the submitted value will be the internal option value</h5>
			</div>
		</div>

		<?php Utils::printDojoScript("isDebug: true, async: true, parseOnLoad: true") ?>
		<script>
			require(["dijit/form/Select", "dojo/parser", "dojo/domReady!"]);
		</script>
	</body>
</html>
