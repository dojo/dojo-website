<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Chaining Deferreds</title>

		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Chaining Deferreds</h1>

		<ul id="userlist"></ul>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>

			require(["dojo/_base/xhr", "dojo/_base/array", "dojo/dom-construct", "dojo/dom", "dojo/domReady!"], function(xhr, arrayUtil, domConstruct, dom) {

				function getUserList(){
					return xhr.get({
						url: "users-mangled.json",
						handleAs: "json"
					}).then(function(res){
						return arrayUtil.map(res, function(user){
							return {
								id: user[0],
								username: user[1],
								name: user[2]
							};
						});
					});
				}

				getUserList().then(function(users){
					var userlist = dom.byId("userlist");
					arrayUtil.forEach(users, function(user){
						domConstruct.create("li", {
							id: user.id,
							innerHTML: user.username + ": " + user.name
						}, userlist);
					});
				});

			});

		</script>
	</body>
</html>
