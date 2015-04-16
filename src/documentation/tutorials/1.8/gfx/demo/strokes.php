<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: GFX Strokes</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>

	</head>
	<body>
		<h1>Demo: GFX Strokes</h1>

		<div id="surfaceElement" style="border:1px solid #ccc;width:400px;height:400px;"></div>

		<?php Utils::printDojoScript("isDebug: true, async: true,  parseOnLoad: true") ?>
		<script>

			require(["dojox/gfx", "dojo/domReady!"], function(gfx) {
				// Create a GFX surface
				// Arguments:  node, width, height
				surface = dojox.gfx.createSurface("surfaceElement", 400, 400);

				// Create a rectangle with a basic black border
				surface.createRect({x: 100, y: 50, width: 200, height: 100 }).setStroke("#000");

				// Create a circle with a 3-pixel dotted red border
				surface.createCircle({ cx: 300, cy: 300, rx:50, r:25 }).setStroke({
					style: "Dot", width: 3, cap: "round", color: "#f00"
				});

				// Create a circle with
				// Create a circle with a 3-pixel dotted red border
				surface.createCircle({ cx: 150, cy: 250, rx:100, r:50 }).setStroke({
					style: "Dash", width: 3, cap: "butt", color: "#00f"
				});
			});

		</script>

	</body>
</html>
