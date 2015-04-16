<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tutorial: Non-Widget Objects</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>
</head>
<body class="claro">
	<h1>Tutorial: Non-Widget Objects</h1>
	<div data-dojo-id="myStore" data-dojo-type="dojo/store/Memory" data-dojo-props="data: [
		{ name: 'Alabama', id: 'AL' },
		{ name: 'Alaska', id: 'AK' },
		{ name: 'Arizona', id: 'AZ' },
		{ name: 'California', id: 'CA' },
		{ name: 'Colorado', id: 'CO' },
		{ name: 'Connecticut', id: 'CT' },
		{ name: 'New York', id: 'NY' }
	]"></div>
	<select id="mySelect" name="state" value="CA" data-dojo-type="dijit/form/FilteringSelect" data-dojo-props="searchAttr: 'name', store: myStore"></select>
	<?php
		Utils::printDojoScript("isDebug: 1, async:1");
	?>
	<script>
		require([
			"dojo/parser",
			"dojo/store/Memory",
			"dijit/form/FilteringSelect",
			"dojo/domReady!"
		], function(parser){
			parser.parse();
		});
	</script>
</body>
</html>