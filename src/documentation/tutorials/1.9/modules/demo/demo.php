<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Using require</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="style.css" media="screen">
	</head>

	<body>
		<h1>Demo: Using require to load AMD modules</h1>
		<p>
		The output below was generated with a simple module that was loaded.
		</p>

		<!-- Our file structure doesn't exactly match what's described in the tutorial, so
			a little extra configuration is necessary - we'll cover this in detail later -->
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
				"app/counter"
			], function(counter) {
				log(counter.getValue());
				counter.increment();
				log(counter.getValue());
				counter.decrement();
				log(counter.getValue());

				// Define the "log" function to display console-like messages directly on the page
				function log(msg){
					var c = document.getElementById("console");
					if(!c){
						c = document.createElement("div");
						c.id = "console"
						document.body.appendChild(c);
					}
					c.innerHTML += "<div>" + msg + "</div>";
				}
			});
		</script>
	</body>
</html>