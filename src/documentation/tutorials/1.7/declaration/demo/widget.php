<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dijit/Declaration with widgets</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
	</head>
	<body class="claro">
		<h1>Demo: dijit/Declaration with widgets</h1>
		<p>
		The following demonstrates including existing widgets inside the template for a custom Declaration.
		Take a look at the source to see how it works!
		</p>

		<div data-dojo-type="dijit.Declaration" data-dojo-props="widgetClass:'WithWidget', defaults: { progress:100 }">
			<p data-dojo-attach-point="firstTextNode"></p>
			<div data-dojo-type="dijit.ProgressBar" data-dojo-props="style:'width:400px', maximum:200, progress: ${progress}"></div>
			<p data-dojo-attach-point="lastTextNode"></p>

			<script type="dojo/method" data-dojo-event="postCreate">
				this.firstTextNode.innerHTML = "Text created on postCreate!";
			</script>
			<script type="dojo/connect" data-dojo-event="startup">
				this.lastTextNode.innerHTML = "Text created on startup!";
			</script>
		</div>

		<div style="border:1px solid #999;background-color:#fc0;padding:1em;">
			<div data-dojo-type="WithWidget" data-dojo-props="progress: 150"></div>
		</div>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			
			require(["dojo/parser", "dijit/Declaration", "dijit/ProgressBar", "dojo/domReady!"], function(parser) {
				parser.parse();
			});
			
		</script>
	</body>
</html>
