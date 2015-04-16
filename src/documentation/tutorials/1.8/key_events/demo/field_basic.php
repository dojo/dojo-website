<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/keys</title>

		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<style>
			input {
				display: block;
			}
		</style>

	</head>
	<body>
		<h1>Press any key</h1>
		keyCode value: <input type="text" id="keyCode" size="2">
		<?php Utils::printDojoScript("async: true") ?>
		</script>
		<script>
			require(["dojo/on", "dojo/domReady!"], function(on) {
				on(document, "keyup", function(event) {
					document.getElementById("keyCode").value = event.keyCode;
				});
			});
		</script>
</body>
</html>
