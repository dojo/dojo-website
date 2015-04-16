<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: DojoX DataGrid</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen" type="text/css">
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    	?>
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroGridCss();
    	?>
		<link rel="stylesheet" href="style.css" media="screen" type="text/css">
		<style>
		body.claro {
			font-family: Tahoma, Arial, Helvetica, sans-serif;
			font-size: 11px;
			width: 580px;
			height: 229px;
			margin: 0;
			padding: 0;
		}
		.dojoxGridRowEditing td {
			background-color: #F4FFF4;
		}
		.dojoxGrid input, .dojoxGrid select, .dojoxGrid textarea {
			margin: 0;
			padding: 0;
			border-style: none;
			width: 100%;
			font-size: 100%;
			font-family: inherit;
		}
		.dojoxGrid input {
		}
		.dojoxGrid select {
		}
		.dojoxGrid textarea {
		}
		#grid {
			width: 100%;
			height: 100%;
		}
		</style>
	</head>
	<body class="claro">
		<div id="grid"></div>

		<!-- load dojo and provide config via data attribute -->
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript("async: true");
		?>
		<script>
			require([
				"dojox/grid/DataGrid",
				"dojo/store/Memory",
				"dojo/data/ObjectStore",
				"dojo/_base/lang",
				"dojo/ready"
			], function(DataGrid, Memory, ObjectStore, lang, ready){
				// ==========================================================================
				// Custom formatter
				// ==========================================================================
				var formatMoney = function(inDatum) {
					return isNaN(inDatum) ? '...' : '$' + parseFloat(inDatum).toFixed(2);
				}

				// ==========================================================================
				// Grid structure
				// ==========================================================================
				// global var "gridLayout"
				var gridLayout = [{
					defaultCell: { width: 4, editable: true, styles: 'text-align: right;'  },
					cells: [
						{ name: 'Id', field: 'id', width: 4 },
						{ name: 'Priority', field: 'col1', width: 9, styles: 'text-align: center;', type: dojox.grid.cells.Select, options: ["normal", "note", "important"] },
						{ name: 'Mark', width: 5, field: 'col2', styles: 'text-align: center;', type: dojox.grid.cells.Bool },
						{ name: 'Message', field: 'col4', styles: '', width: '100%' }
					]
				},{
					defaultCell: { width: 6, editable: true, styles: 'text-align: right;' },
					rows: [
						{ name: 'Amount', width: 7, field: 'col6', formatter: formatMoney },
						{ name: 'Detail', value: 'Detail',width:6}
					]
				}];

				// example sample data and code
				var data_items = [];

				var data_list = [
					{ col1: "normal", col2: false, col3: "new", col4: 'But are not followed by two hexadecimal', col5: 29.91, col6: 10, col7: false },
					{ col1: "important", col2: false, col3: "new", col4: 'Because a % sign always indicates', col5: 9.33, col6: -5, col7: false },
					{ col1: "important", col2: false, col3: "read", col4: 'Signs can be selectively', col5: 19.34, col6: 0, col7: true },
					{ col1: "note", col2: false, col3: "read", col4: 'However the reserved characters', col5: 15.63, col6: 0, col7: true },
					{ col1: "normal", col2: false, col3: "replied", col4: 'It is therefore necessary', col5: 24.22, col6: 5.50, col7: true },
					{ col1: "important", col2: false, col3: "replied", col4: 'To problems of corruption by', col5: 9.12, col6: -3, col7: true },
					{ col1: "note", col2: false, col3: "replied", col4: 'Which would simply be awkward in', col5: 12.15, col6: -4, col7: false }
				];
				var rows = 100;
				for(var i=0, l=data_list.length; i<rows; i++){
					data_items.push(lang.mixin({ id: i }, data_list[i%l]));
				}

				// global var "test_store"
				var test_store = new ObjectStore({ objectStore: new Memory({ data: data_items }) });

				// instantiate declarative widgets
				ready(function(){
					var grid = new DataGrid({
						rowSelector: "20px",
						store: test_store,
						structure: gridLayout
					}, "grid");
					grid.startup();
				});
			});
		</script>
	</body>
</html>
