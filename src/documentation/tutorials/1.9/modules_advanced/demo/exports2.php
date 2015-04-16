<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Resolving circular dependencies with "exports"</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="style.css" media="screen">
	</head>

	<body>
		<h1>Demo: Resolving circular dependencies with "exports"</h1>
		<p>
		With our circular dependency resolved, you should see the message "apples and oranges" below.
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
				"my/a"
			], function(a) {
				a.print();
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