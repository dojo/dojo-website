<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Custom Editor</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: Custom Editor</h1>
		<p>The following Editor instance allows only a select few tools:</p>
		<div data-dojo-type="dijit/Editor" style="width:700px;min-height:100px;" data-dojo-props="plugins:['bold','italic','|','cut','copy','paste','|','insertUnorderedList']"></div>
		<?php
			Utils::printDojoScript("async: true,parseOnLoad: true");
		?>
		<script>
			// Include the class
			require(["dijit/Editor", "dojo/parser"]);
		</script>
	</body>
</html>
