<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Loading Overlay (Step 1)</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php /* For this demo, the script tag should be loaded earlier to avoid display of the HTML */
		Utils::printDojoScript("isDebug: true, async: true") ?>
	</head>
	<body>
		<div id="loadingOverlay" class="loadingOverlay pageOverlay">
			<div class="loadingMessage">Loading...</div>
		</div>

		<h1>Demo: Loading Overlay</h1>
		<p>The rest of your page...</p>
	</body>
</html>
