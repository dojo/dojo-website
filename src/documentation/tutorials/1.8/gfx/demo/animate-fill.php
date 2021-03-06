<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Animating Fills, Fonts, and Strokes</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<h1>Demo: Animating Fills, Fonts, and Strokes</h1>

		<div id="surfaceElement" style="border:1px solid #ccc;width:400px;height:400px;"></div>
		<br /><br />
		<button data-dojo-type="dijit/form/Button" data-dojo-props="onClick:doAnimations">Start Animations</button>

		<?php Utils::printDojoScript("isDebug: true, async: true, parseOnLoad: true") ?>
		<script>

			require(["dojox/gfx", "dojox/gfx/fx", "dijit/form/Button", "dojo/parser", "dojo/domReady!"], function(gfx, gfxFx) {
				// Function to start animations
				doAnimations = function() {

					console.warn("Do Animations!");

					gfxFx.animateFill({
						shape: circle,
						duration: 500,
						color: { start: "blue", end: "green" }
					}).play();
					gfxFx.animateStroke({
						shape: rectangle,
						duration: 500,
						color: { start: "yellow", end: "black" },
						width: { end: 15 },
						join:  { values: ["miter", "bevel", "round"] }
					}).play();
					gfxFx.animateFont({
						shape: text,
						duration: 500,
						variant: { values: ["normal", "small-caps"] },
						size:  { end: 20, units: "pt" },
						color: "green"
					}).play();
				};

				// Create a GFX surface
				// Arguments:  node, width, height
				surface = gfx.createSurface("surfaceElement", 400, 400);

				// Create a circle, a dojox.gfx.fx instance, play it immediately
				circle = surface.createCircle({ cx: 50, cy: 50, rx: 50, r: 25 }).setFill("blue");


				// Create a rectangle, animate its stroke
				rectangle = surface.createRect({x: 100, y: 50, width: 200, height: 100 }).setStroke("yellow");


				// Create text, animate it
				text = surface.createText({ x:64, y:220, text:"Vector Graphics Rock!", align:"start"}).setFont({ family:"Arial", size:"20pt", weight:"bold" }).setFill("red");

			});

		</script>

	</body>
</html>
