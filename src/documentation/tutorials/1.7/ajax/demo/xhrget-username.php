<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Check a Username's Availability</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Check a Username's Availability</h1>

		<p>Type a username to know its availability.  <em>("dojo" and "sitepen" are taken)</em></p>
		<br /><br />

		<strong>Desired Username:  </strong>
		<input type="text" id="usernameInput" size="12" />
		<span id="availabilityNode"></span>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			// Require the xhr module
			require(["dojo/_base/xhr", "dojo/on", "dojo/dom", "dojo/dom-class", "dojo/_base/lang", "dojo/domReady!"],
				function(xhr, on, dom, domClass, lang) {
					
					// Local var representing the node to be updated
					var availabilityNode = dom.byId("availabilityNode");
					var usernameNode = dom.byId("usernameInput");
					
					// Connect button
					on(usernameNode, "keyup", function(){
						// Get the value
						var value = lang.trim(usernameNode.value.toLowerCase());
						
						// If there's code...
						if(value != "") {
							// Using xhr.get, as very little information is being sent
							xhr.get({
								// The URL of the request
								url: "check-username.php",
								// Allow only 2 seconds for username check
								timeout: 2000,
								// Send the username to check base on an INPUT node's value
								content: {
									username: value
								},
								// The success callback with result from server
								load: function(result) {
									if(result == "available") {
										domClass.add(availabilityNode,"demoAvailable");
										domClass.remove(availabilityNode,"demoTaken");
										availabilityNode.innerHTML = "Username available!";
									}
									else {
										domClass.add(availabilityNode,"demoTaken");
										domClass.remove(availabilityNode,"demoAvailable");
										availabilityNode.innerHTML = "Username taken!  Please try another.";
									}
								}
							});
						}
						else {
							availabilityNode.innerHTML = "";
						}
					});
			});
		</script>
	</body>
</html>
