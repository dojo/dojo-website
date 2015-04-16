<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/xhr</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: dojo/request/xhr error</h1>
		<p>Click the button below to see how dojo/request/xhr handles an error.</p>
		<div>
			<button id="errorButton">Request a file that doesn't exist</button>
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
					// Attach the onclick event handler to the errorButton
					on(dom.byId('errorButton'),"click", function(evt){
						// Request a file that does not exist
						request.get("../resources/text/file_not_found", {
							// The data returned will be text
							handleAs: "text"
							}).then(function(response){
								// Display the text file content
								resultDiv.innerHTML="<pre>"+response+"</pre>";
							},
							function(error){
								// Display the error returned
								resultDiv.innerHTML="<div class=\"error\">"+error+"<div>";
							});
					});
				});
		</script>
		
	</body>
</html>
