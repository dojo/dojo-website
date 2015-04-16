<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html>
	<head>
		<title>About us</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
		<ul id="menu"><li><a href="index.php">Home</a></li><li><a href="about.php">About us</a></li></ul>
		<div id="content">We are a good company.</div>
		<?php Utils::printDojoScript("") ?>
		<script>
			var demo = /[?&](demo[0-9].js)/.exec(location.search);
			document.write('<script src="' + (demo ? demo[1] : 'demo2.js') + '"><\/script>');
		</script>
	</body>
</html>
