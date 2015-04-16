<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/xhr</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: dojo/request/xhr</h1>
		<p>Click the button below to see dojo/request/xhr in action.</p>
		<div>
			<button id="textButton">Request Text File</button>
		</div>
		<br /><br />
		<div id="resultDiv">
		</div>
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript();
    	?>
		<script>
			require(["dojo/dom", "dojo/on", "dojo/request", "dojo/domReady!"],
				function(dom, on, request){
					// Results will be displayed in resultDiv
					var resultDiv = dom.byId("resultDiv");

					// Attach the onclick event handler to the textButton
					on(dom.byId('textButton'), "click", function(evt){
						// Request the text file
						request.get("../resources/text/psalm_of_life.txt").then(
							function(response){
								// Display the text file content
								resultDiv.innerHTML = "<pre>" + response + "</pre>";
							},
							function(error){
								// Display the error returned
								resultDiv.innerHTML = "<div class=\"error\">" + error + "<div>";
							}
						);
					});
				}
			);
		</script>
	</body>
</html>
