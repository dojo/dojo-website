<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Connecting DataGrid to a Store</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printLinkStyleTags(array('dojo/resources/dojo.css',
			'dijit/themes/claro/claro.css',
			'dojox/grid/resources/Grid.css',
			'dojox/grid/resources/claroGrid.css')) ?>
	</head>
	<body class="claro">
		<h1>Demo: Connecting DataGrid to a Store</h1>
		<p class="tip">This is a front-end code demonstration and is not connected to a server with data persistence, so while the code provided will work with a server that provides the appropriate REST API, clicking "Save" in this demo will not work.</p>

		<div id="target-node-id"></div>
		<button id="save">Save</button>
		<?php Utils::printDojoScript("async: true, isDebug: true, parseOnLoad: true") ?>
		<script>
			require([
				"dojo/store/JsonRest",
				"dojo/store/Memory",
				"dojo/store/Cache",
				"dojox/grid/DataGrid",
				"dojo/data/ObjectStore",
				"dojo/query",
				"dojo/domReady!"
			], function(JsonRest, Memory, Cache, DataGrid, ObjectStore, query){
				var myStore, dataStore, grid;
				myStore = new Cache(JsonRest({target:"MyData/"}), new Memory());
				grid = new DataGrid({
					store: dataStore = new ObjectStore({objectStore: myStore}),
					structure: [
						{name:"State Name", field:"name", width: "200px"},
						{name:"Abbreviation", field:"abbreviation", width: "200px", editable: true}
					]
				}, "target-node-id"); // make sure you have a target HTML element with this id
				grid.startup();
				query("#save").on("click", function(){
					dataStore.save();
				});
			});
		</script>
	</body>
</html>
