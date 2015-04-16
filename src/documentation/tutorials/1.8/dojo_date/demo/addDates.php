<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Date Arithmetic</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Date Arithmetic</h1>
		<p>Adding and subtracting from dates</p>

		<div class="resultPanel">
			<pre id="outbox"></pre>
		</div>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
		require(["dojo/date", "dojo/dom", "dojo/domReady!"],
				function(date, dom){
			
			var testDate = new Date("Wed May 11 2011 03:40:18 GMT+0100 (BST)"),
					nextWeek = date.add(testDate, "week", 1),
					lastYear = date.add(testDate, "year", -1);

			showResult("Date Arithmetic", 
				[
					"test date:\t\t" + testDate, 
					"test date + 1 week:\t" + nextWeek,
					"one year earlier:\t" + lastYear	
				].join("\n"));
			function showResult(heading, content){
				// IE8 strips whitespace when assigning to innerHTML, so use outerHTML
				dom.byId("outbox").outerHTML = '<pre id="outbox">' + content + '</pre>';
			}
		});
		</script>
	</body>
</html>
