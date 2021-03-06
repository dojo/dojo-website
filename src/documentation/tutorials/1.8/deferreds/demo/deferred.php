<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/Deferred</title>

		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: dojo/Deferred</h1>

		<ul id="userlist"></ul>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/Deferred", "dojo/request", "dojo/_base/array", "dojo/dom-construct", "dojo/dom", "dojo/domReady!"],
			function(Deferred, request, arrayUtil, domConstruct, dom) {
				var deferred = new Deferred(),
					userlist = dom.byId("userlist");

				deferred.then(function(res){
					arrayUtil.forEach(res, function(user){
						domConstruct.create("li", {
							id: user.id,
							innerHTML: user.username + ": " + user.name
						}, userlist);
					});
				},function(err){
					domConstruct.create("li", {
						innerHTML: "Error: " + err
					}, userlist);
				});

				// Send an HTTP request
				request.get("users.json", {
					handleAs: "json"}).then(
					function(response){
						// Resolve when content is received
						deferred.resolve(response);
					},
					function(error){
						// Reject on error
						deferred.reject(error);
					}
				);
			});
		</script>
	</body>
</html>
