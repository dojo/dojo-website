<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo.config.baseUrl</title>
		<link rel="stylesheet" href="style.css" media="screen">
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
		<h1>Demo: dojo/_base/config.baseUrl</h1>
		<div id="dialog" data-dojo-type="demo/AuthoredDialog"
			data-dojo-props="title: 'dojo/_base/config.baseUrl demo', authorAvatarSrc: '/includes/authors/sam_foster/avatar.jpg', authorName: 'Sam Foster'">
		</div>
		<script>
			var dojoConfig = {
				has: {
					"dojo-firebug": true,
					"dojo-debug-messages": true
				},
				packages: [
					{
						name: "demo",
						location: "/documentation/tutorials/1.8/dojo_config/demo"
					}
				]
			};
		</script>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
				require(["demo/AuthoredDialog", "dojo/ready", "dijit/registry", "dojo/json", "dojo/_base/config",
				"dojo/parser", "dojo/domReady!"],
				function(AuthoredDialog, ready, registry, JSON, config, parser) {
				ready(function(){
					parser.parse();
					var dialog = registry.byId("dialog");
					dialog.set("content", "<pre>" + JSON.stringify(config, null, "\t") + "</pre>");
					dialog.show();
				});
			});
		</script>
	</body>
</html>
