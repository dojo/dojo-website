<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Send Form Data via xhr.post</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Send Form Data via xhr.post</h1>

		<p>Click the button below to send the form to the server using xhr.post</p>

		<form id="formNode">
			<label class="qhead">Your Name</label>
			<input type="text" name="name" /><br />

			<label class="qhead">Your Bio</label>
			<textarea name="bio" rows="5" cols="20"></textarea><br />

			<label class="qhead">Your Color</label>
			<select name="favoriteColor">
				<option value="Red">Red</option>
				<option value="Green">Green</option>
				<option value="Blue">Blue</option>
			</select><br />

			<label class="qhead">Dojo User?</label>
			<input type="radio" name="dojoUser" value="Yes" id="dojoUser1" /> <label for="dojoUser1">Yes</label>
			<input type="radio" name="dojoUser" value="No" id="dojoUser2" /> <label for="dojoUser2">No</label>
			<br />

			<label class="qhead">Favorite Days</label>
			<input type="checkbox" name="favoriteDays[]" id="day1" value="Sunday" /> <label for="day1">Sunday</label>
			<input type="checkbox" name="favoriteDays[]" id="day2" value="Monday" /> <label for="day2">Monday</label>
			<input type="checkbox" name="favoriteDays[]" id="day3" value="Tuesday" /> <label for="day3">Tuesday</label>
			<input type="checkbox" name="favoriteDays[]" id="day4" value="Wednesday" /> <label for="day4">Wednesday</label>
			<input type="checkbox" name="favoriteDays[]" id="day5" value="Thursday" /> <label for="day5">Thursday</label>
			<input type="checkbox" name="favoriteDays[]" id="day6" value="Friday" /> <label for="day6">Friday</label>
			<input type="checkbox" name="favoriteDays[]" id="day7" value="Saturday" /> <label for="day7">Saturday</label>

		</form>
		<div style="margin:2em 0">
			<button id="sendForm">Send Form</button>
		</div>
		<pre id="formResultNode"></pre>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			
			// Require the xhr module
			require(["dojo/_base/xhr", "dojo/on", "dojo/dom", "dojo/domReady!"],
				function(xhr, on, dom) {
					
					// When the send button is clicekd
					on(dom.byId("sendForm"), "click", function() {
						
						// Get the result node
						var resultNode = dom.byId("formResultNode");
						
						// Post the form information
						xhr.post({
							// The URL of the request
							url: "send-form.php",
							// Form to send
							form: dom.byId("formNode"),
							// The success callback with result from server
							load: function(newContent) {
								resultNode.style.display = "block";
								resultNode.innerHTML = newContent;
							},
							// The error handler
							error: function() {
								resultNode.innerHTML = "Your form could not be sent.";
							}
						});
					});
			});
		</script>
	</body>
</html>
