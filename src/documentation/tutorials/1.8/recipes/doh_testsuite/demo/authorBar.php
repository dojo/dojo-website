<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: DOH TestSuite - Author Bar</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../../resources/style/demo.css" media="screen">
                <?php
                        include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
                        Utils::printDojoScript("async: true, parseOnLoad: false, baseUrl: '.', tlmSiblingOfDojo: false, authorsUrl: '../resources/authors.json', authorName: 'Betsy Gamrat'");
		?>
		<script>
			require(["authorBar"],function(authorBar){
				authorBar.update();
			});
		</script>
	</head>
	<body>
		<h1>Demo: Author Bar</h1>
	</body>
</html>
