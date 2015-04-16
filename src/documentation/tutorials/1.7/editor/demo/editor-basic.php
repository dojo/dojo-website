<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Basic Editor</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: Basic Editor</h1>
		<p>The following is the default editor, no special settings or plugins.</p>
		<div data-dojo-type="dijit.Editor"></div>
		<?php
			Utils::printDojoScript("async: true,parseOnLoad: true");
		?>
		<script>
			// Include the class
			require(["dijit/Editor", "dojo/parser", "dojo/domReady!"]);
		</script>
	</body>
</html>
