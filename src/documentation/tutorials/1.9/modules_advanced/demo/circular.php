<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Circular dependencies</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="style.css" media="screen">
	</head>

	<body>
		<h1>Demo: Circular dependencies</h1>
		<p>
		You might expect to see the message "apples and oranges", but the circular dependency instead causes an error (see the script console).
		</p>

		<script>
			dojoConfig = {
				async: true,
				isDebug: true,
				baseUrl: '.',
				tlmSiblingOfDojo: false
			};
		</script>
		<?php
			Utils::printDojoScript()
		?>
		<script>
			require([
				"my/moduleA"
			], function(moduleA) {
				moduleA.print();
			});

			function log(msg){
				var c = document.getElementById("console");
				if(!c){
					c = document.createElement("div");
					c.id = "console"
					document.body.appendChild(c);
				}
				c.innerHTML += "<div>" + msg + "</div>";
			}
		</script>
	</body>
</html>