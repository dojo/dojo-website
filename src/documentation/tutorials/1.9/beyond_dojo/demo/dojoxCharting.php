<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Demo: DojoX Charting</title>
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="style.css" media="screen" type="text/css">
	</head>
	<body class="claro">
		<h1>Demo: DojoX Charting</h1>

		<div data-dojo-type="dojox/charting/widget/Chart" theme="dojox.charting.themes.Claro" id="viewsChart" style="width: 550px; height: 550px;">
			<!-- Pie Chart: add the plot -->
			<div class="plot" name="default" type="Pie" radius="200" fontcolor="#000" labeloffset="-20"></div><!-- pieData is the data source -->
			<div class="series" name="Last Week's Visits" array="chartData"></div>
		</div>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			// x and y coordinates used for easy understanding of where they should display
			// Data represents website visits over a week period
			chartData = [
				{ x: "1", y: "19021" },
				{ x: "1", y: "12837" },
				{ x: "1", y: "12378" },
				{ x: "1", y: "21882" },
				{ x: "1", y: "17654" },
				{ x: "1", y: "15833" },
				{ x: "1", y: "16122" }
			];
			require([
				"dojo/parser",
				// Require the basic chart resource: Chart
				"dojox/charting/widget/Chart",
				// Explicitly require Pie chart
				"dojox/charting/plot2d/Pie",
				// Require the theme of our choosing
				//"Claro", new in Dojo 1.6, will be used
				"dojox/charting/themes/Claro",
				"dojo/domReady!"
			], function(parser){
				parser.parse();
			});
		</script>
	</body>
</html>
