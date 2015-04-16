<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: book</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>

</head>
<body class="claro">
	<h1>Demo: book</h1>
	<pre id="output">Not loaded yet...</pre>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dojo/store/JsonRest", "dojo/dom", "dojo/when", "dojo/json"],
	function(JsonRest, dom, when, JSON){
		var bookStore = new JsonRest({
			target: "books/"
		});

		when(bookStore.get(1)).then(function(results){
			dom.byId("output").innerHTML = JSON.stringify(results);
		});
	});
	</script>
</body>
</html>