<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: GFX Surface</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body>
		<h1>Demo: GFX Surface</h1>

		<div id="surfaceElement" style="border:1px solid #ccc;width:400px;height:400px;"></div>

		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>

			require(["dojox/gfx", "dojo/domReady!"], function(gfx) {
				surface = gfx.createSurface("surfaceElement", 400, 400);
			});

		</script>
	</body>
</html>
