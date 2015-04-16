<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE html>
<html>
	<head>
		<title>Welcome</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
		<ul id="menu">
			<li><a href="index.php">Home</a></li>
			<li><a href="about.php">About us</a></li>
		</ul>
		<div id="content">Welcome to the home page!</div>
		<textarea id="loadTimeTextBox" style="width: 26em; height: 7em; margin-top: 5em;"></textarea>

		<?php Utils::printDojoScript("") ?>
		<script src="demo2.js"></script>

		<script>
			document.getElementById("loadTimeTextBox").value = "Page loaded at " + new Date() +
				"\nNotice that this doesn't change as you click links - content is being loaded dynamically without reloading the page";
		</script>
	</body>
</html>