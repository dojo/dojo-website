<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Stacked Dialogs</title>

		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body class="claro">
		<h1>Demo: Stacked Dialogs</h1>

		<button onclick="createDialog(true);">Create New Dialog</button>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			// Require the Dialog class
			require(["dijit/Dialog", "dojo/domReady!"], function(Dialog){
			// Create counter
				var counter = 1;
				// Create a new Dialog
				window.createDialog = function(first) {
					// Create a new dialog
					var dialog = new Dialog({
						// Dialog title
						title: "New Dialog " + counter,
						// Create Dialog content
						content: (!first ? "I am a dialog on top of other dialogs" : "I am the bottom dialog") + "<br /><br /><button onclick='createDialog();'>Create another dialog.</button>"
					});
					dialog.show();
					counter++;
				}
			});
		</script>
	</body>
</html>
