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

		<h2>Result from chaining from original deferred</h2>
		<ul id="userlist1"></ul>

		<h2>Result from chaining from original.then()</h2>
		<ul id="userlist2"></ul>

		<h2>Result from chaining from original deferred after previous calls</h2>
		<ul id="userlist3"></ul>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>

			require(["dojo/_base/xhr", "dojo/_base/array", "dojo/json", "dojo/dom-construct", "dojo/dom", "dojo/domReady!"],
			function(xhr, arrayUtil, JSON, domConstruct, dom) {

				var original = xhr.get({
					url: "users-mangled.json",
					handleAs: "json"
				});

				var result = original.then(function(res){
					var userlist = dom.byId("userlist1");

					return arrayUtil.map(res, function(user){
						domConstruct.create("li", {
							innerHTML: JSON.stringify(user)
						}, userlist);

						return {
							id: user[0],
							username: user[1],
							name: user[2]
						};
					});
				});

				result.then(function(objs){
					var userlist = dom.byId("userlist2");

					arrayUtil.forEach(objs, function(user){
						domConstruct.create("li", {
							innerHTML: JSON.stringify(user)
						}, userlist);
					});
				});

				original.then(function(res){
					var userlist = dom.byId("userlist3");

					arrayUtil.forEach(res, function(user){
						domConstruct.create("li", {
							innerHTML: JSON.stringify(user)
						}, userlist);
					});
				});

			});

		</script>
	</body>
</html>
