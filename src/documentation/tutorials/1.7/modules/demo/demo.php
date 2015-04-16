<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Defining Modules</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Defining Modules</h1>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require([
				"dojo/domReady!"
			], function(){
        </script>
	</body>
</html>
