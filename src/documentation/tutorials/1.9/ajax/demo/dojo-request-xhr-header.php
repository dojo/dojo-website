<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/xhr Headers</title>
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
		<h1>Demo: dojo/request/xhr Headers</h1>
		<p>Use dojo/request.post to validate a username and password. In this case, a valid password is the reverse of the username.<br>
			After, the Auth-Token is then retrieved from the promise.response.
		</p>
		<div id="resultDiv">
			<div><label>Server Message:</label><span id="svrMessage"></span></div>
			<div><label>Auth Token:</label><span id="svrToken"></span></div>
		</div>
		<form id="formNode">
			<div><label>Username: </label><input type="text" name="username" /></div>
			<div><label>Password: </label><input type="password" name="password" /></div>
			<button type="submit"  >Login</button>
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
						var promise = request.post("../resources/php/login-demo.php", {
							// Send the username and password
							data: domForm.toObject("formNode"),
							// Wait 2 seconds for a response
							timeout: 2000
						});

						// Use promise.response.then, NOT promise.then
						promise.response.then(function(response){

							// get the message from the data property
							var message = response.data;

							// Access the 'Auth-Token' header
							var token = response.getHeader('Auth-Token');

							dom.byId('svrMessage').innerHTML = message;
							dom.byId('svrToken').innerHTML = token;
						});
					});
				}
			);
		</script>
	</body>
</html>
