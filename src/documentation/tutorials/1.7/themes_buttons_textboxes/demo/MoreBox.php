<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: More Dijit TextBoxes</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
		<style>
			body > div { margin-bottom:20px; }
		</style>
	</head>
	<body class="claro">
		<h1>dijit/form/NumberTextBox, dijit/form/CurrencyTextBox, dijit/form/TimeTextBox, dijit/form/DateTextBox</h1>
		<div>
			<label for="number">Age:</label>
			<input id="number" type="text" value="54" required="true" data-dojo-type="dijit.form.NumberTextBox">
		</div>
		<div>
			<label for="currency">Annual Salary:</label>
				<input id="currency"  value="54775.53" required="true" 
					data-dojo-type="dijit.form.CurrencyTextBox"
					data-dojo-props="
						constraints:{fractional:true},
						currency:'USD',
						invalidMessage:'Invalid amount. Cents are mandatory.'">
		</div>
		<div>
			<label for="time">Start Time:</label>
			<input id="time" required="true" data-dojo-type="dijit.form.TimeTextBox"
				data-dojo-props="
					constraints: {
						timePattern: 'HH:mm:ss',
						clickableIncrement: 'T00:15:00',
						visibleIncrement: 'T00:15:00',
						visibleRange: 'T01:00:00'
					},
					invalidMessage:'Invalid time.'">
		</div>
		<div>
			<label for="date">Start Date:</label>
				<input id="date" data-dojo-type="dijit.form.DateTextBox" value="2011-09-15">
		</div>
		<?php Utils::printDojoScript("isDebug: true, async: true, parseOnLoad: true") ?>
		<script>
			// load requirements for declarative widgets in page content
			require(["dojo/parser", "dijit/form/NumberTextBox", "dijit/form/CurrencyTextBox", "dijit/form/TimeTextBox", "dijit/form/DateTextBox", "dojo/domReady!"]);
		</script>
	</body>
</html>
