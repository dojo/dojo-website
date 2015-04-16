<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dijit/Declaration Event Attachments</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
	</head>
	<body class="claro">
		<h1>Demo: dijit/Declaration Event Attachments</h1>
		<p>The following demonstrates defining a custom button widget, and then creating an instance of that widget.
		Take a look at the source code to see how it works.</p>

		<div data-dojo-type="dijit/Declaration" data-dojo-props="widgetClass:'CustomButton', defaults:{ counter:0 }">
			<button data-dojo-attach-event="onclick: myHandler" data-dojo-attach-point="containerNode"></button>
			<span data-dojo-attach-point="messageNode"></span>
			<script type="dojo/method" data-dojo-event="myHandler">
				this.messageNode.innerHTML = "You clicked me " + (++this.counter) + " times!";
			</script>
		</div>

		<button data-dojo-type="CustomButton">Click me for a message</button>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/parser", "dojo/domReady!"], function(parser) {
				parser.parse();
			});
		</script>
	</body>
</html>
