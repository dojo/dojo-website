<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dijit/Declaration with Connections</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
	</head>
	<body class="claro">
		<h1>Demo: dijit/Declaration with Connections</h1>
		<p>
		The following demonstrates using a script block in your custom widget definition that <em>connects</em>
		to an existing Widget method.  Take a look at the source to see how it is done.
		</p>

		<div data-dojo-type="dijit.Declaration" data-dojo-props="widgetClass:'foo'">
			<p style="background-color:#FC3;font-weight:bold;" data-dojo-attach-point="messageNode"></p>
			<script type="dojo/connect" data-dojo-event="startup">
				this.messageNode.innerHTML = "This message was created during <code>startup</code>.";
			</script>
		</div>

		<div data-dojo-type="foo"></div>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/parser", "dijit/Declaration", "dojo/domReady!"], function(parser) {
				parser.parse();
			});
		</script>
	</body>
</html>
