<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojox/grid/DataGrid Cell Styles</title>
		<?php Utils::printClaroCss() ?>
		<?php Utils::printLinkStyleTags(array('dojo/resources/dojo.css','dojox/grid/resources/claroGrid.css')) ?>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">

		<style>
			.firstName {
				font-style: italic;
			}
			.lastName {
				font-weight: bold;
			}
		</style>
	</head>
	<body class="claro">
		<h1>Demo: dojox/grid/DataGrid Cell Styles</h1>

		<br/>
		<div id="grid"></div>

		<?php
			Utils::printDojoScript();
		?>
		<script>
			var grid, dataStore, store;
			require([
				"dojox/grid/DataGrid",
				"dojo/store/Memory",
				"dojo/data/ObjectStore",
				"dojo/request",
				"dojo/domReady!"
			], function(DataGrid, Memory, ObjectStore, request){
				request.get("hof-batting.json", {
					handleAs: "json"
				}).then(function(data){

					store = new Memory({ data: data.items });
					dataStore = new ObjectStore({ objectStore: store });

					grid = new DataGrid({
						store: dataStore,
						query: { id: "*" },
						structure: [
							{ name: "First Name", field: "first", width: "84px", classes: "firstName" },
							{ name: "Last Name", field: "last", width: "84px", cellClasses: "lastName" },
							{ name: "Bats", field: "bats", width: "70px", cellStyles: "text-align: right;" },
							{ name: "Throws", field: "throws", width: "70px" },
							{ name: "G", field: "totalG", width: "60px" },
							{ name: "AB", field: "totalAB", width: "60px" },
							{ name: "Games as Batter", field: "totalGAB", width: "120px", styles: "text-align: center;" },
							{ name: "R", field: "totalR", width: "60px" },
							{ name: "RBI", field: "totalRBI", width: "60px" },
							{ name: "BB", field: "totalBB", width: "60px" },
							{ name: "K", field: "totalK", width: "60px" },
							{ name: "H", field: "totalH", width: "60px" },
							{ name: "2B", field: "total2B", width: "60px" },
							{ name: "3B", field: "total3B", width: "60px" },
							{ name: "HR", field: "totalHR", width: "60px" }
						]
					}, "grid");
					// since we created this grid programmatically, call startup to render it
					grid.startup();
				});
			});
		</script>
	</body>
</html>
