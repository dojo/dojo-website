<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo:  Zooming, Scrolling, and Panning</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
	</head>
	<body class="claro">
		<h1>Zooming, Scrolling, and Panning</h1>
		<p>Adjust the scale of X and Y axes, then change the X and Y offsets.</p>

		<table>
			<tr><td align="center" class="pad">Scale X (<span id="scaleXValue">1</span>)</td></tr>
			<tr><td>
				<div id="scaleXSlider" data-dojo-type="dijit/form/HorizontalSlider" data-dojo-props="
						value: 1, minimum: 1, maximum: 5, discreteValues: 5, showButtons: false"
						style="width: 600px;">
					<div data-dojo-type="dijit/form/HorizontalRule" data-dojo-props="
						container: 'bottomDecoration', count: 5" style="height:5px;"></div>
					<div data-dojo-type="dijit/form/HorizontalRuleLabels" data-dojo-props="
						container: 'bottomDecoration', count: 5, minimum: 1, maximum: 5, constraints: {pattern: '##'}" style="height:1.2em;font-size:75%;color:gray;"></div>
				</div>
			</td></tr>
			<tr><td align="center" class="pad">Scale Y (<span id="scaleYValue">1</span>)</td></tr>
			<tr><td>
				<div id="scaleYSlider" data-dojo-type="dijit/form/HorizontalSlider" data-dojo-props="
						value: 1, minimum: 1, maximum: 5, discreteValues: 5, showButtons: false"
						style="width: 600px;">
					<div data-dojo-type="dijit/form/HorizontalRule" data-dojo-props="
						container: 'bottomDecoration', count: 5" style="height:5px;"></div>
					<div data-dojo-type="dijit/form/HorizontalRuleLabels" data-dojo-props="
						container: 'bottomDecoration', count: 5, minimum: 1, maximum: 5, constraints: {pattern: '##'}" style="height:1.2em;font-size:75%;color:gray;"></div>
				</div>
			</td></tr>
			<tr><td align="center" class="pad">Offset X (<span id="offsetXValue">0</span>)</td></tr>
			<tr><td>
				<div id="offsetXSlider" data-dojo-type="dijit/form/HorizontalSlider" data-dojo-props="
						value: 1, minimum: 0, maximum: 500, discreteValues: 501, showButtons: false"
						style="width: 600px;">
					<div data-dojo-type="dijit/form/HorizontalRule" data-dojo-props="
						container: 'bottomDecoration', count: 6" style="height:5px;"></div>
					<div data-dojo-type="dijit/form/HorizontalRuleLabels" data-dojo-props="
						container: 'bottomDecoration', count: 6, minimum: 0, maximum: 500, constraints: {pattern: '####'}" style="height:1.2em;font-size:75%;color:gray;"></div>
				</div>
			</td></tr>
			<tr><td align="center" class="pad">Offset Y (<span id="offsetYValue">0</span>)</td></tr>
			<tr><td>
				<div id="offsetYSlider" data-dojo-type="dijit/form/HorizontalSlider" data-dojo-props="
						value: 1, minimum: 0, maximum: 500, discreteValues: 501, showButtons: false"
						style="width: 600px;">
					<div data-dojo-type="dijit/form/HorizontalRule" data-dojo-props="
						container: 'bottomDecoration', count: 6" style="height:5px;"></div>
					<div data-dojo-type="dijit/form/HorizontalRuleLabels" data-dojo-props="
						container: 'bottomDecoration', count: 6, minimum: 0, maximum: 500, constraints: {pattern: '####'}" style="height:1.2em;font-size:75%;color:gray;"></div>
				</div>
			</td></tr>
		</table><br /><br />
		<div id="chart" style="width: 800px; height: 400px;"></div>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>

			// Require the dependencies
			require(["dijit/form/HorizontalSlider", "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels",
			"dojox/charting/Chart", "dojox/charting/themes/Claro", "dojox/lang/functional/object", "dijit/registry",
			"dojo/on", "dojo/dom", "dojo/_base/event", "dojo/parser", "dojox/charting/axis2d/Default",
			"dojox/charting/plot2d/Areas", "dojox/charting/plot2d/Grid", "dojo/domReady!"],
			function(HorizontalSlider, HorizontalRule, HorizontalRuleLabels, Chart, Claro, functionalObject,
			registry, on, dom, baseEvent, parser) {

				// Initialize chart, scales, and offsets
				var chart, moveable, scaleX = 1, scaleY = 1, offsetX = 0, offsetY = 0;

				// Updates the slider values, animates the change in scale and offsets
				var reflect = function(){
					functionalObject.forIn(chart.axes, function(axis){
						var scale  = axis.getWindowScale(),
							offset = Math.round(axis.getWindowOffset() * axis.getScaler().bounds.scale);
						if(axis.vertical){
							scaleY  = scale;
							offsetY = offset;
						}else{
							scaleX  = scale;
							offsetX = offset;
						}
					});
					setTimeout(function(){
						registry.byId("scaleXSlider").set("value", scaleX);
						registry.byId("offsetXSlider").set("value", offsetX);
						registry.byId("scaleYSlider").set("value", scaleY);
						registry.byId("offsetYSlider").set("value", offsetY);
					}, 25);
				};

				// Update the scale and offsets of *all* plots on the chart
				var update = function(){
					chart.setWindow(scaleX, scaleY, offsetX, offsetY, { duration: 1500 }).render();
					reflect();
				};

				// The following four methods are fired when the corresponding sliders are  changed
				var scaleXEvent = function(value){
					scaleX = value;
					dom.byId("scaleXValue").innerHTML = value;
					update();
				};

				var scaleYEvent = function(value){
					scaleY = value;
					dom.byId("scaleYValue").innerHTML = value;
					update();
				};

				var offsetXEvent = function(value){
					offsetX = value;
					dom.byId("offsetXValue").innerHTML = value;
					update();
				};

				var offsetYEvent = function(value){
					offsetY = value;
					dom.byId("offsetYValue").innerHTML = value;
					update();
				};

				// Function called when the mouse goes down
				var _init = null;
				var onMouseDown = function(e){
					console.warn("mousedown");
					_init = {x: e.clientX, y: e.clientY, ox: offsetX, oy: offsetY};
					baseEvent.stop(e);
				};

				// Function called when the mouse is released
				var onMouseUp = function(e){
					if(_init){
						// Clears the click/drag, updates the chart
						console.warn("mouseup");
						_init = null;
						reflect();
						baseEvent.stop(e);
					}
				};

				// Create the base chart
				chart = new Chart("chart");
				chart.setTheme(Claro);
				chart.addAxis("x", {fixLower: "minor", natural: true, stroke: "grey",
					majorTick: {stroke: "black", length: 4}, minorTick: {stroke: "gray", length: 2}});
				chart.addAxis("y", {vertical: true, min: 0, max: 30, majorTickStep: 5, minorTickStep: 1, stroke: "grey",
					majorTick: {stroke: "black", length: 4}, minorTick: {stroke: "gray", length: 2}});
				chart.addPlot("default", {type: "Areas", animate: {duration: 1800}});
				chart.addSeries("Series A", [0, 25, 5, 20, 10, 15, 5, 20, 0, 25]);
				chart.addAxis("x2", {fixLower: "minor", natural: true, leftBottom: false, stroke: "grey",
					majorTick: {stroke: "black", length: 4}, minorTick: {stroke: "gray", length: 2}});
				chart.addAxis("y2", {vertical: true, min: 0, max: 20, leftBottom: false, stroke: "grey",
					majorTick: {stroke: "black", length: 4}, minorTick: {stroke: "gray", length: 2}});
				chart.addPlot("plot2", {type: "Areas", hAxis: "x2", vAxis: "y2", animate: {duration: 1800}});
				chart.addSeries("Series B", [15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 15], {plot: "plot2"});
				chart.addPlot("grid", { type: "Grid", hMinorLines: true });
				chart.render();

				parser.parse();

				// Add change events to the sliders to know when chart changes should be triggered
				registry.byId("scaleXSlider").on("Change", scaleXEvent, true);
				registry.byId("scaleYSlider").on("Change", scaleYEvent, true);
				registry.byId("offsetXSlider").on("Change", offsetXEvent, true);
				registry.byId("offsetYSlider").on("Change", offsetYEvent, true);

				// Add mouse events to the chart to allow click and drag
				var chartNode = dom.byId("chart");
				on(chartNode, "mousedown", onMouseDown);
				on(chartNode, "mouseup",   onMouseUp);
			});

		</script>
	</body>
</html>
