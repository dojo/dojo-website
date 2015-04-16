<?php
	include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Lazy Loading a Tree</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: Lazy Loading A Tree</h1>
		<div id="tree"></div>

		<?php
			Utils::printDojoScript("async: true");
		?>
		<script>
			require([
				"dojo/store/JsonRest",
				"dijit/Tree",
				"dijit/tree/ObjectStoreModel",
				"dojo/domReady!"
			], function(JsonRest, Tree, ObjectStoreModel){

				// create store
				var usGov = new JsonRest({
					target: "data/",

					getChildren: function(object){
						// object may just be stub object, so get the full object first and then return it's
						// list of children
						return this.get(object.id).then(function(fullObject){
							return fullObject.children;
						});
					}
				});

				// create model to interface Tree to store
				var model = new ObjectStoreModel({
					store: usGov,

					getRoot: function(onItem){
						this.store.get("root").then(onItem);
					},

					mayHaveChildren: function(object){
						return "children" in object;
					}
				});

				var tree = new Tree({
					model: model,
					persist: false
				}, "tree"); // make sure you have a target HTML element with this id
				tree.startup();
			});
		</script>
	</body>
</html>
