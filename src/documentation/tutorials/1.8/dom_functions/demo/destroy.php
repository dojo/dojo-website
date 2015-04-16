<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: empty and destroy</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: empty and destroy</h1>

		<button id="destroyFirst">Destroy the first list item</button>
		<button id="destroyAll">Destroy all list items</button>

		<ul id="list">
			<li id="one">One</li>
			<li id="two">Two</li>
			<li id="three">Three</li>
			<li id="four">Four</li>
			<li id="five">Five</li>
		</ul>
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript("isDebug:1, async:1");
    	?>
		<script>
			require(["dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/domReady!"], function(dom, domConstruct, on) {
				function destroyFirst(){
					var list = dom.byId("list"),
						items = list.getElementsByTagName("li");
						
					if(items.length){
						domConstruct.destroy(items[0]);
					}
				}
				function destroyAll(){
					domConstruct.empty("list");
				}
				
				// Connect buttons
				on(dom.byId("destroyFirst"), "click", destroyFirst);
				on(dom.byId("destroyAll"), "click", destroyAll);
				
			});
		</script>
	</body>
</html>
