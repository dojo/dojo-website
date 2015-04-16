<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Application Config</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
		<style>
			#dialog { min-width: 200px; }
		</style>
	</head>
	<body class="claro">
		<h1>Demo: Application Config</h1>
		<script>
			dojoConfig = {
				has: {
					"dojo-firebug": true,
					"dojo-debug-messages": true
				},
				app: {
					userName: "Anonymous"
				}
			};
		</script>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dijit/Dialog", "dijit/registry", "dojo/_base/lang", "dojo/json", "dojo/_base/config", "dojo/io-query",
			"dojo/domReady!"],
			function(Dialog, registry, lang, JSON, config, ioQuery) {
				// pull configuration from the query string
				// and mix it into our app config
				var queryParams = ioQuery.queryToObject(location.search.substring(1));
				lang.mixin(config.app, queryParams);

				// Create a dialog
				var dialog = new Dialog({
					title: 'Welcome back ' + config.app.userName,
					content: '<pre>' + JSON.stringify(config, null, '\t') + '</pre>'
				});

				// Draw on the app config to put up a personalized message
				dialog.show();
			});
		</script>
	</body>
</html>
