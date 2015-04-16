<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Deferred.when for creation</title>

		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">


	</head>
	<body>
		<h1>Demo: Deferred.when for creation</h1>

		<h2>List 1 (from server)</h2>
		<ul id="userlist1"></ul>

		<h2>List 2 (from static array)</h2>
		<ul id="userlist2"></ul>
		<?php Utils::printDojoScript("async: true") ?>
		<script>
			require([
				"dojo/_base/Deferred",
				"dojo/_base/xhr",
				"dojo/_base/array",
				"dojo/dom",
				"dojo/dom-construct",
				"dojo/json",
				"dojo/domReady"
			], function(Deferred, xhr, arrayUtil, dom, domConstruct, JSON, domReady){
				function createUserList(node, users){
					var nodeRef = dom.byId(node);

					return Deferred.when(
						users,
						function(users){
							arrayUtil.forEach(users, function(user){
								domConstruct.create("li", {
									innerHTML: JSON.stringify(user)
								}, nodeRef);
							});
						},
						function(error){
							domConstruct.create("li", {
								innerHTML: "Error: " + error
							}, nodeRef);
						}
					);
				}

				domReady(function(){
					var users = xhr.get({
						url: "users-mangled.json",
						handleAs: "json"
					}).then(function(response){
						return arrayUtil.map(response, function(user){
							return {
								id: user[0],
								username: user[1],
								name: user[2]
							};
						});
					});

					createUserList("userlist1", users);
					createUserList("userlist2",
						[{ id: 100, username: "username100", name: "User 100" }]);
				});
			});
		</script>
	</body>
</html>
