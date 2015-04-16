<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Programmatic Editor</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: Programmatic Editor</h1>
		<p>The following Editor instance allows only a select few tools, and is created programmatically:</p>
		<div style="width:700px;min-height:100px;" id="myEditor"></div>
		<?php
			Utils::printDojoScript("async: true");
		?>
		<!-- Notice that there's no parseOnLoad -->
		<script>
			// Include the class
			require(["dijit/Editor", "dojo/domReady!"], function(Editor){
				// Make our editor
				new Editor({
					plugins: ["bold","italic","|","cut","copy","paste","|","insertUnorderedList"]
				}, "myEditor");
			});
		</script>
	</body>
</html>
