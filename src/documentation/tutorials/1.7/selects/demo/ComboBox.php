<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit ComboBox</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<div style="width:50%;">
			<div style="width:50%;float: left;">
				<h1>dijit/form/ComboBox</h1>
				<label for="stateSelect">State:</label>
				<select id="stateSelect" name="stateSelect" data-dojo-type="dijit.form.ComboBox"
					data-dojo-props="
						value: '',
						placeHolder: 'Select a State',
						onChange: function(value){ document.getElementById('value').innerHTML = value; }">
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>
					<option value="AZ">Arizona</option>
					<option value="AR">Arkansas</option>
					<option value="CA">California</option>
				</select>
			</div>
			<div style="width:50%;float: right;"><h1>Submitted Value: </h1>
				<div id="value"></div>
				<h5>*Note how the submitted value will be the displayed value</h5>
			</div>
		</div>
		<?php Utils::printDojoScript("isDebug: true, async: true, parseOnLoad: true") ?>
		<script>
			require(["dijit/form/ComboBox", "dojo/parser", "dojo/domReady!"]);
		</script>
	</body>
</html>
