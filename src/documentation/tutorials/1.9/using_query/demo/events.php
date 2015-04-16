<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: NodeList Events</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Tutorial: NodeList Events</h1>

		<button class="hookUp demoBtn">Click Me!</button>
		<button class="hookUp demoBtn">Click Me!</button>
		<button class="hookUp demoBtn">Click Me!</button>
		<button class="hookUp demoBtn">Click Me!</button>

		<?php Utils::printDojoScript("async: true") ?>
		<script>
			// Wait for the DOM to be ready before working with it
			require(["dojo/query", "dojo/domReady!"], function(query) {
				query(".hookUp").on("click", function(){
					alert("This button is hooked up!");
				});
			});
		</script>
	</body>
</html>
