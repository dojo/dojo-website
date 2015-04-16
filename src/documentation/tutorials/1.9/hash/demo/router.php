<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Welcome</title>
		<link rel="stylesheet" href="style.css">
		<?php Utils::printLinkStyleTags(array("dojo/resources/dojo.css", "dijit/themes/claro/claro.css")) ?>
		<?php Utils::printClaroGridCss("") ?>
	</head>
	<body class="claro">
		<h3>Select a User to View Their Details</h3>
		<br />
		<div id="grid"></div>
		<?php Utils::printDojoScript("") ?>
		<script src="demo4.js"></script>
	</body>
</html>
