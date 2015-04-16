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
			<input id="number">
		</div>
		<div>
			<label for="currency">Annual Salary:</label>
			<input id="currency">
		</div>
		<div>
			<label for="time">Start Time:</label>
			<input id="time">
		</div>
		<div>
			<label for="date">Start Date:</label>
			<input id="date">
		</div>
		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			// load requirements for declarative widgets in page content
			require(["dijit/form/NumberTextBox", "dijit/form/CurrencyTextBox", "dijit/form/TimeTextBox", "dijit/form/DateTextBox", "dojo/domReady!"], function(NumberTextBox, CurrencyTextBox, TimeTextBox, DateTextBox) {
				var number = new NumberTextBox({
					value: 54,
					required: true
				}, "number");
				number.startup();

				var currency = new CurrencyTextBox({
					value:54775.53,
					required:true,
					constraints:{fractional:true},
					currency:"USD",
					invalidMessage:"Invalid amount. Cents are mandatory."
				}, "currency");
				currency.startup();

				var time = new TimeTextBox({
					constraints: {
						timePattern: "HH:mm:ss",
						clickableIncrement: "T00:15:00",
						visibleIncrement: "T00:15:00",
						visibleRange: "T01:00:00"
					},
					invalidMessage:"Invalid time."
				},"time");
				time.startup();

				var date = new DateTextBox({
					value: new Date(2011, 8, 15)
				}, "date");
				date.startup();
			});
		</script>
	</body>
</html>
