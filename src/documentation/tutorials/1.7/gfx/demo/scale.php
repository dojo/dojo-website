<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Scaling and Skewing Shapes</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<h1>Demo: Scaling and Skewing Shapes</h1>
		<div id="surfaceElement" style="border:1px solid #ccc;width:400px;height:400px;"></div>

		<br /><br />
		<button data-dojo-type="dijit.form.Button" data-dojo-props="onClick:shrink">Shrink</button>
		<button data-dojo-type="dijit.form.Button" data-dojo-props="onClick:grow">Grow</button>
		<button data-dojo-type="dijit.form.Button" data-dojo-props="onClick:skew">Skew -20</button>
		<button data-dojo-type="dijit.form.Button" data-dojo-props="onClick:skewBack">Skew 20</button>

		<?php Utils::printDojoScript("isDebug: true, async: true,  parseOnLoad: true") ?>
		<script>

			require(["dojox/gfx", "dojox/gfx/fx", "dijit/form/Button", "dojo/parser", "dojo/domReady!"], function(gfx, gfxFx, Button) {

				// Function to start animations
				shrink = function() {
					group.applyTransform(gfx.matrix.scale({ x: 0.5, y: 0.5 }));
				};

				grow = function() {
					group.applyTransform(gfx.matrix.scale({ x: 2, y: 2 }));
				};

				skew  = function() {
					group.applyTransform(gfx.matrix.skewYg(-20));
				};

				skewBack = function() {
					group.applyTransform(gfx.matrix.skewYg(20));
				};


				// Create a GFX surface
				// Arguments:  node, width, height
				surface = gfx.createSurface("surfaceElement", 400, 400);

				// Create a group
				group = surface.createGroup();

				var circle1 = group.createCircle({ cx: 100, cy: 300, r:50 }).setFill({
					type: "radial",
					cx: 100,
					cy: 300,
					colors: [
						{ offset: 0,   color: "#f3001f" },
						{ offset: 1,   color: "#a40016" }
					]
				});
				var circle2 = group.createCircle({ cx: 100, cy: 100, r:50 }).setFill({
					type: "radial",
					cx: 100,
					cy: 100,
					colors: [
						{ offset: 0,   color: "#f3001f" },
						{ offset: 1,   color: "#a40016" }
					]
				});
				var circle3 = group.createCircle({ cx: 300, cy: 300, r:50 }).setFill({
					type: "radial",
					cx: 300,
					cy: 300,
					colors: [
						{ offset: 0,   color: "#f3001f" },
						{ offset: 1,   color: "#a40016" }
					]
				});
				var circle4 = group.createCircle({ cx: 300, cy: 100, r:50 }).setFill({
					type: "radial",
					cx: 300,
					cy: 100,
					colors: [
						{ offset: 0,   color: "#f3001f" },
						{ offset: 1,   color: "#a40016" }
					]
				});

			});

		</script>
	</body>
</html>
