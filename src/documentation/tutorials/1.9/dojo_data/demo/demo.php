<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: DataGrid with CSV</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroGridCss();
		?>
		<style>
			#grid {
				width: 330px;
			}
		</style>
	</head>
	<body class="claro">
		<h1>Demo: DataGrid with CSV</h1>
		<div id="grid"></div>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require([
				"dojox/data/CsvStore",
				"dojox/grid/DataGrid",
				"dojo/domReady!"
			], function(CsvStore, DataGrid){
				var store = new CsvStore({
					url:"data/movies.csv"
				});
				var grid = new DataGrid({
					store: store,
					structure: [
						{name:"Title", field:"Title", width: "150px"},
						{name:"Year", field:"Year"},
						{name:"Producer", field:"Producer"}
					]
				}, "grid");
				grid.startup();
			});
		</script>
	</body>
</html>
