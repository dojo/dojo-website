<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Array Looping</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Array Looping</h1>

		<p>The following lists' items are created by looping through an array of strings.</p>
		<ul id="list1"></ul>
		<ul id="list2"></ul>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/_base/array", "dojo/dom-construct", "dojo/dom", "dojo/domReady!"]
			, function(arrayUtil, domConstruct, dom) {
				var arr = ["one", "two", "three", "four"],
					list1 = dom.byId("list1"),
					list2 = dom.byId("list2"),
					myObject = {
						prefix: "ITEM: ",
						formatItem: function(item, index){
							return this.prefix + item + " (" + index + ")";
						},
						outputItems: function(arr, node){
							arrayUtil.forEach(arr, function(item, index){
								domConstruct.create("li", {
									innerHTML: this.formatItem(item, index)
								}, node);
							}, this);
						}
					};

				// Skip over index 4, leaving it undefined
				arr[5] = "six";

				arrayUtil.forEach(arr, function(item, index){
					// This function is called for every item in the array
					if(index == 3){
						// This changes the original array,
						// which changes the item passed to
						// the sixth invocation of this function
						arr[5] = "seven";
					}
					domConstruct.create("li", {
						innerHTML: item + " (" + index + ")"
					}, list1);
				});

				myObject.outputItems(arr, list2);
				
			});
		</script>
	</body>
</html>
