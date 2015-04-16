<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: Hello Dojo!</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
</head>
<body>
	<h1 id="greeting">Hello</h1>
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printDojoScript("isDebug:1, async:1");
	?>
	<script>
		require([
			'dojo/dom',
			'dojo/domReady!'
		], function (dom) {
			var greeting = dom.byId('greeting');
			greeting.innerHTML += ' from Dojo!';
		});
	</script>
</body>
</html>