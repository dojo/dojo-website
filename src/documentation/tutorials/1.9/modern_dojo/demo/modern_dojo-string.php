<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: string</title>
	<link rel="stylesheet" href="style.css" media="screen">
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
</head>
<body>
	<h1>Demo: string</h1>
	<pre id="someNode"></pre>
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dojo/dom", "dojo/string", "dojo/domReady!"], function(dom, string){
		dom.byId("someNode").innerHTML = string.trim("  I Like Trim Strings ");
	});
	</script>
</body>
</html>
