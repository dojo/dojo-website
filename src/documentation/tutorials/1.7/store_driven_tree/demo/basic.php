<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit Tree</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.7.8/dijit/themes/claro/claro.css">
		<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.7.8/dojo/dojo.js"
			data-dojo-config="isDebug: true, async: false, parseOnLoad: false">
		</script>
		<script>
			dojo.require("dojo.parser");
			dojo.require("dojo.data.ItemFileReadStore");
			dojo.require("dijit.Tree");
			dojo.require("dijit.tree.ForestStoreModel");

			// when dojo is loaded and ready
			dojo.ready(function(){

				// set up the store to get the tree data
				var governmentStore = new dojo.data.ItemFileReadStore({
					url: "data/static"
				});

				// set up the model, assigning governmentStore
				var governmentModel = new dijit.tree.ForestStoreModel({
					store: governmentStore,
					query: {"id": "*"},
					rootId: "root",
					rootLabel: "US Government",
					childrenAttrs: "items"
				});

				// set up the tree, assigning governmentModel
				var governmentTree = new dijit.Tree({
					model: governmentModel,
					onOpenClick: true,
					onLoad: function(){
						dojo.byId('image').src = '../resources/images/root.jpg';
					},
					onClick: function(item){
						dojo.byId('image').src = '../resources/images/'+item.id+'.jpg';

					}
				},"divTree");
			});
		</script>
	</head>
	<body class="claro">
		<h1>Demo: Dijit Tree</h1>
		<div class="column" id="tree">
			<h1>Tree</h1>
			<div id="divTree"></div>
		</div>
		<div class="column">
			<h1>Image</h1>
			<img id="image" />
		</div>
	</body>
</html>
