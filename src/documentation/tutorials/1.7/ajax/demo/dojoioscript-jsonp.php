<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: JSONP and dojo/io/script</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: JSONP and dojo/io/script</h1>

		<button id="getJson">Get Pull Requests</button>
		<br /><br />

		<div id="pullsHolder"></div>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			// Require the xhr module
			require(["dojo/io/script", "dojo/on", "dojo/dom", "dojo/_base/array", "dojo/domReady!"],
				function(script, on, dom, arrayUtil) {
					
					// Connect the button
					on(dom.byId("getJson"), "click", function() {
						// Output message to DOM
						var pullsHolder = dom.byId("pullsHolder");
						// Use the get method
						script.get({
							// The URL to get JSON from GitHub
							url: "https://api.github.com/repos/dojo/dojo/pulls",
							// The callback paramater
							callbackParamName: "callback", // GitHub requires "callback"
							// The success callback
							load: function(pullsJson) {  // GitHub sent us information!
								// Log the result to console for inspection
								console.info("GitHub returned: ",pullsJson);
	
								// Output the pulls to a DOM element
								// Or output a "no pulls" message
								var message = "";
	
								// If there were pulls returned...
								if(pullsJson.data && pullsJson.data.length) {
									// Start the list
									message += "<ul>";
									// For every pull returned
									arrayUtil.forEach(pullsJson.data,function(pull) {
										message += "<li><a href='" + pull.url + "'>" + pull.title + "</a></li>";
									});
									//End the list
									message += "</ul>";
								}
								else { // Output "no pulls" message
									message = "No pull requests about Dojo were available.";
								}
								// Output message to DOM
								pullsHolder.innerHTML = message;
							},
							// Ooops!  Error!
							error: function() {
								pullsHolder.innerHTML = "Error!  Pull requests could not be received.";
							}
						});
					});
			});
		</script>
	</body>
</html>
