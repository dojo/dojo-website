<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Refresh a Node's Content</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Refresh a Node's Content</h1>

		<p>Click the button below to refresh the content.</p>

		<button id="refreshButton">Refresh Content</button>
		<br /><br />

		<p id="contentNode"></p>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
		
			// Require the xhr module
			require(["dojo/_base/xhr", "dojo/on", "dojo/dom", "dojo/domReady!"],
				function(xhr, on, dom) {
					
					// Function that refreshes the SPAN node
					function refreshContent() {
						// Using xhr.get, as very little information is being sent
						xhr.get({
							// The URL of the request
							url: "get-content.php",
							// The success callback with result from server
							load: function(newContent) {
								dom.byId("contentNode").innerHTML = newContent;
							},
							// The error handler
							error: function() {
								// Do nothing -- keep old content there
							},
							// generate an extra GET variable to prevent browsers from caching
							preventCache: true
						});
					}
					
					// Populate content initially
					refreshContent();
					
					// Connect button
					on(dom.byId("refreshButton"), "click", refreshContent);
			});
		</script>
	</body>
</html>
