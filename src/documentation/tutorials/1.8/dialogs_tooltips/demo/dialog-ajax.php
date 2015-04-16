<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Ajax Dialog with Black Underlay</title>

		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<style>
			/* colors the underlay black instead of white
			 * We're using '.claro .dijitDialogUnderlay' as our selector,
			 * to match the specificity in claro.css */
			.claro .dijitDialogUnderlay { background:#000; }
		</style>
	</head>
	<body class="claro">
		<h1>Demo: Ajax Dialog with Black Underlay</h1>
		<p>Click the button below to show a dialog which loads its content via Ajax.</p>

		<button onclick="showDialog();">Load Ajax Dialog</button>

		<div class="dijitHidden">
			<div data-dojo-type="dijit/Dialog" style="width:600px;" data-dojo-props="title:'Ajax Dialog',href:'dialog-ajax-content.php',loadingMessage:'Loading dialog content...'" id="ajaxDialog"></div>
		</div>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			// Require the Dialog class
			require(["dijit/registry", "dojo/parser", "dojo/ready", "dijit/Dialog"], function(registry, parser, ready){
				ready(function(){
					parser.parse();
				});

				// Show the dialog
				showDialog = function() {
					registry.byId("ajaxDialog").show();
				}
				// Hide the dialog
				hideDialog = function() {
					registry.byId("ajaxDialog").hide();
				}

			});
		</script>
	</body>
</html>
