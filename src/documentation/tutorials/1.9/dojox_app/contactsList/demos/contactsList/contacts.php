<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
		<meta name="apple-mobile-web-app-capable" content="yes" />

		<title>Contacts List Demo: Using dojox/app</title>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		?>
		<script src="/js/dojo/1.9/dojox/mobile/deviceTheme.js"></script>
	</head>
	<body>
		<script>
			// See the using Custom Modules with a CDN Tutorial for an explination of how
			// on how 
			var dojoConfig = {
				async: true,
				dojoBlankHtmlUrl: location.pathname.replace(/\/[^/]+$/, "") + "/blank.html",
				packages: [{
					name: "contactsList",
					location: location.pathname.replace(/\/[^/]+$/, "") + "/"
				}]
			};
		</script>

		<?php
			Utils::printDojoScript();
		?>

		<script>
			require(["contactsList/contacts"]);
		</script>

	</body>
</html>
