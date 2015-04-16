<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: helloworld</title>
	<link rel="stylesheet" href="style.css" media="screen">
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
</head>
<body>
	<h1>Demo: helloworld</h1>
	<div id="helloworld"></div>
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dojo/dom", "dojo/domReady!"], function(dom){
		dom.byId("helloworld").innerHTML = "Hello New World!";
	});
	</script>
</body>
</html>
