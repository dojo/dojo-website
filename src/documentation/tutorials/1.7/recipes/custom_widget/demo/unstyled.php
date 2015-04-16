<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Custom Widget</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Custom Widget</h1>
		<div id="authorContainer"></div>
		<!-- Configure Dojo -->
		<script>
			 var dojoConfig = (function(){
				var base = location.href.split("/");
				base.pop();
				base = base.join("/");
				return {
					async: true,
					isDebug: true,
					packages: [{
						name: "custom",
						location: base + "/custom"
					}]
				};
			})();
		</script>
		<?php Utils::printDojoScript() ?>
		<script>
			// Bring in our custom widget
			require(["dojo/_base/xhr", "dojo/dom", "dojo/_base/array", "custom/AuthorWidget", "dojo/domReady!"],
				function(xhr, dom, arrayUtil, AuthorWidget){
					// Load up our authors
					var def = xhr.get({
						url: "authors.json",
						handleAs: "json"
					});

					// Once ready, process the authors
					def.then(function(authors){
						// Get a reference to our container div
						var authorContainer = dom.byId("authorContainer");

						arrayUtil.forEach(authors, function(author){
							// Create our widget and place it
							var widget = new AuthorWidget(author).placeAt(authorContainer);
						});
					});
			});
		</script>
	</body>
</html>
