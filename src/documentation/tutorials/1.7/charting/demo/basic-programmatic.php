<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Basic Programmatic Chart</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Basic Programmatic Chart</h1>
		
		<!-- create the chart -->
		<div id="chartNode" style="width: 550px; height: 550px;"></div>
		
		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>

			// x and y coordinates used for easy understanding of where they should display
			// Data represents website visits over a week period
			chartData = [
				{ x: 1, y: 19021 },
				{ x: 1, y: 12837 },
				{ x: 1, y: 12378 },
				{ x: 1, y: 21882 },
				{ x: 1, y: 17654 },
				{ x: 1, y: 15833 },
				{ x: 1, y: 16122 }
			];

			require([
				 // Require the basic 2d chart resource
				"dojox/charting/Chart",
				
				// Require the theme of our choosing
				"dojox/charting/themes/Claro",

				// Charting plugins: 

				// 	Require the Pie type of Plot 
				"dojox/charting/plot2d/Pie",

				// Wait until the DOM is ready
				"dojo/domReady!"
			], function(Chart, theme, PiePlot){

				// Create the chart within it's "holding" node
				var pieChart = new Chart("chartNode");
				
				// Set the theme
				pieChart.setTheme(theme);
				
				// Add the only/default plot 
				pieChart.addPlot("default", {
					type: PiePlot, // our plot2d/Pie module reference as type value
					radius: 200,
					fontColor: "black",
					labelOffset: "-20"
				});
				
				// Add the series of data
				pieChart.addSeries("January",chartData);

				// Render the chart!
				pieChart.render();

			});
		</script>
	</body>
</html>
