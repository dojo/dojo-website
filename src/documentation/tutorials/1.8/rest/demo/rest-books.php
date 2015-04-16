<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: books</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>

</head>
<body class="claro">
	<h1>Demo: books</h1>
	<p>Check your JavaScript Console...</p>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dojo/store/JsonRest", "dojo/when"], function(JsonRest, when){
		var bookStore = new JsonRest({
			target: "books/"
		});

		when(bookStore.query()).then(function(results){
			console.log(results);
		});
	});
	</script>
</body>
</html>
