<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Locale options for dojo.config</title>
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
		<h1>Demo: Locale options for dojo/_base/config</h1>
				// look for a locale=xx query string param, else default to 'en-us'
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript("has:{'dojo-firebug':true, 'dojo-debug-messages': true}, foo: 'bar', async: 1, isDebug: 1, locale: location.search.match(/locale=([\w\-]+)/) ? RegExp.$1 : 'en-us'");
		?>
		<script>
			// require the locale, Dialog, json, config, dojo body, i18n, and domReady plugin
			require(["dojo/date/locale", "dijit/Dialog", "dojo/json", "dojo/_base/config", "dojo/_base/window", "dojo/i18n", "dojo/domReady!"]
			, function(locale, Dialog, JSON, config, win) {
				var now = new Date();
				var dlg = new Dialog({
					id: 'dialog',
					// set a title on the dialog of today's date, 
					// using a localized date format
					title: 'Today: '+ locale.format(now, {
							formatLength:'full',selector:'date'
					})
				}).placeAt(win.body());
				dlg.startup();
				
				dlg.set("content", '<pre>' + JSON.stringify(config, null, '\t') + '</pre>');
				dlg.show();
			});
		</script>
	</body>
</html>
