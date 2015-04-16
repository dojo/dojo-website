<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php'); ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: DOH TestSuite - Author Bar</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss(); ?>
	</head>
	<body>
		<h1>Demo: Author Bar</h1>

		<script>
			dojoConfig = {
				async: true,
				isDebug: true,
				tlmSiblingOfDojo: false,
				baseUrl: '.',
				paths: {
					dojo: '<?php echo Utils::$cdn ?>dojo'
				},
				authorsUrl: '../resources/authors.json',
				authorName: 'Betsy Gamrat'
			};
		</script>
		<?php
			Utils::printDojoScript();
		?>
		<script>
			require(["authorBar"],function(authorBar){
				authorBar.update();
			});
		</script>
	</body>
</html>
