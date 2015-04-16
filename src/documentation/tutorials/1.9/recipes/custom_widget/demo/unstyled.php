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
						name: "myApp",
						location: base + "/myApp"
					}]
				};
			})();
		</script>
		<?php Utils::printDojoScript() ?>
		<script>
			// Bring in our custom widget
			require(["dojo/request", "dojo/dom", "dojo/_base/array", "myApp/widget/AuthorWidget", "dojo/domReady!"],
				function(request, dom, arrayUtil, AuthorWidget){
					// Load up our authors
					request("myApp/data/authors.json", {
						handleAs: "json"
					}).then(function(authors){
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
