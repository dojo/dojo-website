<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/script</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: dojo/request/script</h1>
		<p>Click the button below to see dojo/request/script in action.</p>
		<div>
			<button class="action" id="makeRequest">Make JSONP Request</button>
		</div>
		<br /><br />
		<div id="resultDiv">
		</div>
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript();
    	?>
    	<script>
			require(["dojo/dom", "dojo/on", "dojo/request/script", "dojo/json", "dojo/domReady!"],
				function(dom, on, script, JSON){
					// Results will be displayed in resultDiv
					var resultDiv = dom.byId("resultDiv");

					// Attach the onclick event handler to the makeRequest button
					on(dom.byId('makeRequest'),"click", function(evt){

						// When the makeRequest button is clicked, send the current date 
						// and time to the server in a JSONP request
						var d = new Date(),
							dateNow = d.toString(); 
						script.get("../resources/php/jsonp-demo.php",{
							// Tell the server that the callback name to
							// use is in the "callback" query parameter
							jsonp: "callback",
							// Send the date and time
							query: {
								clienttime: dateNow
							}
						}).then(function(data){
							// Display the result
							resultDiv.innerHTML = JSON.stringify(data);
						});
					});
				}
			);
		</script>
	</body>
</html>
