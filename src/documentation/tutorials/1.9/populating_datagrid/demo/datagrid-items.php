<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojox/grid/DataGrid Simple Structure</title>
		<?php Utils::printLinkStyleTags(array('dojo/resources/dojo.css',
			'dijit/themes/claro/claro.css',
			'dojox/grid/resources/Grid.css',
			'dojox/grid/resources/claroGrid.css')) ?>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">

	</head>
	<body class="claro">
		<h1>Demo: dojox/grid/DataGrid Simple Structure</h1>

		<br/>
		<div id="grid"></div>
		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>


		require([
			"dojox/grid/DataGrid",
			"dojo/store/Memory",
			"dojo/data/ObjectStore",
			"dojo/request",
			"dojo/domReady!"
		], function(DataGrid, Memory, ObjectStore, request){
			var grid, dataStore;
			request("hof-batting.json", {
				handleAs: "json"
			}).then(function(data){
				dataStore =  new ObjectStore({ objectStore:new Memory({ data: data.items }) });

				grid = new DataGrid({
					store: dataStore,
					items:data.items,
					structure: [
						{ name: "First Name", field: "first", width: "25%" },
						{ name: "Last Name", field: "last", width: "25%" },
						{ name: "G", field: "totalG", width: "10%" },
						{ name: "AB", field: "totalAB", width: "10%" },
						{ name: "R", field: "totalR", width: "10%" },
						{ name: "H", field: "totalH", width: "10%" },
						{ name: "RBI", field: "totalRBI", width: "10%" }
					]
				}, "grid");
				grid.startup();
			});
		});
		</script>
	</body>
</html>
