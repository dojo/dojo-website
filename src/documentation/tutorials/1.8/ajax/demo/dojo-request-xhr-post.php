<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/xhr.post</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<style>
			label{
				display: inline-block;
				width: 115px;
			}
			#resultDiv div, #formNode div{
				margin-bottom: 5px;
			}
		</style>
	</head>
	<body>
		<h1>Demo: dojo/request/xhr.post</h1>
		<p>Use of xhr.post to validate a username and password. In this case, a valid password is the reverse of the username.</p>
		<div id="resultDiv">
			<div><label>Server Message:</label><span id="svrMessage"></span></div>
		</div>
		<form id="formNode">
			<div><label>Username: </label><input type="text" name="username" /></div>
			<div><label>Password: </label><input type="password" name="password" /></div>
			<button type="submit">Login</button>
		</form>
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript();
    	?>
		<script>
			require(["dojo/dom", "dojo/on", "dojo/request", "dojo/dom-form"],
				function(dom, on, request, domForm){

					var form = dom.byId('formNode');

					// Attach the onsubmit event handler of the form
					on(form, "submit", function(evt){

						// prevent the page from navigating after submit
						evt.stopPropagation();
						evt.preventDefault();

						// Post the data to the server
						request.post("../resources/php/login-demo.php", {
							// Send the username and password
							data: domForm.toObject("formNode"),
							// Wait 2 seconds for a response
							timeout: 2000

						}).then(function(response){
							dom.byId('svrMessage').innerHTML = response;
						});
					});
				}
			);
		</script>
	</body>
</html>
