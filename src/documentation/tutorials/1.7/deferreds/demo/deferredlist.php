<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/DeferredList</title>

		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: dojo/DeferredList</h1>

		<ul id="statuslist"></ul>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>

			require(["dojo/DeferredList", "dojo/_base/xhr", "dojo/_base/array", "dojo/dom-construct", "dojo/dom", "dojo/domReady!"], function(DeferredList, xhr, arrayUtil, domConstruct, dom) {

				var usersDef = xhr.get({
					url: "users.json",
					handleAs: "json"
				}).then(function(res){
					var users = {};

					arrayUtil.forEach(res, function(user){
						users[user.id] = user;
					});

					return users;
				});

				var statusesDef = xhr.get({
					url: "statuses.json",
					handleAs: "json"
				});

				var defs = new DeferredList([usersDef, statusesDef]);

				defs.then(function(results){
					var users = results[0][1],
						statuses = results[1][1],
						statuslist = dom.byId("statuslist");

					if(!results[0][0] || !results[1][0]){
						domConstruct.create("li", {
							innerHTML: "An error occurred"
						}, statuslist);
						return;
					}

					arrayUtil.forEach(statuses, function(status){
						var user = users[status.userId];

						domConstruct.create("li", {
							id: status.id,
							innerHTML: user.name + ' said, "' + status.status + '"'
						}, statuslist);
					});
				});

			});

		</script>
	</body>
</html>
