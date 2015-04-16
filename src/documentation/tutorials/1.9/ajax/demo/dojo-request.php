<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Code Sample: dojo/request</title>
	</head>
	<body>
		<div id="resultDiv">
		</div>
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript();
    	?>
		<script>
			require(["dojo/dom", "dojo/request", "dojo/domReady!"],
				function(dom, request){
					request.get("../resources/text/psalm_of_life.txt", {
						handleAs: "text"
						}).then(function(response){
							dom.byId('resultDiv').innerHTML =
								"<pre>"+response+"</pre>";
					});
				});
		</script>
	</body>
</html>
