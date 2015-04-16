<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Fetch JSON Data</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Fetch JSON Data</h1>

		<button id="getJson">Get JSON</button>
		<br /><br />

		<pre id="contentNode" style="display:none;"></pre>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			// Require the xhr module
			require(["dojo/_base/xhr", "dojo/on", "dojo/dom", "dojo/json", "dojo/domReady!"],
				function(xhr, on, dom, json) {
					
					// Get the content node
					var contentNode = dom.byId("contentNode");
					
					// Using xhr.get, as no information is being sent -- only requesting
					function getJSON() {
						xhr.get({
							// The URL of the request
							url: "countries.json",
							// Handle as JSON Data
							handleAs: "json",
							// The success callback with result from server
							load: function(newContent) {
								// Update with content
								contentNode.style.display = "";
								contentNode.innerHTML = "<strong>JSON loaded from server:</strong><br /><br />" +
									json.stringify(newContent) +
									"<br /><br /><strong>Look at the JSON data in the console as well!</strong>";
								// Log to console
								console.info("JSON loaded from server:  ", newContent);
							},
							// The error handler
							error: function() {
								// Do nothing -- keep old content there
							}
						});
					}
					
					// Connect the button click
					on(dom.byId("getJson"), "click", getJSON);
			});
		</script>
	</body>
</html>
