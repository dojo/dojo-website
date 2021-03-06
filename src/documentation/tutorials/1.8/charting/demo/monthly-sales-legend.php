<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Monthly Sales with Legend, Tooltips, and Magnify</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
	</head>
	<body class="claro">
		<h1>Demo: Monthly Sales with Legend, Tooltips, and Magnify</h1>
		
		<div id="chartNode" style="width:800px;height:400px;"></div>
		<div id="legend"></div>
		
		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
		require([
			 // Require the basic chart class
			"dojox/charting/Chart",

			// Require the theme of our choosing
			"dojox/charting/themes/Claro",
			
			// Charting plugins: 

			// 	We want to plot Lines 
			"dojox/charting/plot2d/Lines",

			// Load the Legend, Tooltip, and Magnify classes
			"dojox/charting/widget/Legend",
			"dojox/charting/action2d/Tooltip",
			"dojox/charting/action2d/Magnify",
			
			//	We want to use Markers
			"dojox/charting/plot2d/Markers",

			//	We'll use default x/y axes
			"dojox/charting/axis2d/Default",

			// Wait until the DOM is ready
			"dojo/domReady!"
		], function(Chart, theme, LinesPlot, Legend, Tooltip, Magnify) {
			
			// Define the data
			var chartData = [10000,9200,11811,12000,7662,13887,14200,12222,12000,10009,11288,12099];
			var chartData2 = [3000,12000,17733,9876,12783,12899,13888,13277,14299,12345,12345,15763];
			var chartData3 = [3000,12000,17733,9876,12783,12899,13888,13277,14299,12345,12345,15763].reverse();
			
			// Create the chart within it's "holding" node
			var chart = new Chart("chartNode");

			// Set the theme
			chart.setTheme(theme);

			// Add the only/default plot 
			chart.addPlot("default", {
				type: LinesPlot,
				markers: true
			});
			
			// Add axes
			chart.addAxis("x");
			chart.addAxis("y", { min: 5000, max: 30000, vertical: true, fixLower: "major", fixUpper: "major" });

			// Add the series of data
			chart.addSeries("Monthly Sales - 2010",chartData);
			chart.addSeries("Monthly Sales - 2009",chartData2);
			chart.addSeries("Monthly Sales - 2008",chartData3);
			
			// Create the tooltip
			var tip = new Tooltip(chart,"default");
			
			// Create the magnifier
			var mag = new Magnify(chart,"default");
			
			// Render the chart!
			chart.render();
			
			// Create the legend
			var legend = new Legend({ chart: chart }, "legend");
		});
		
		</script>
	</body>
</html>
