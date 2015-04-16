<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: create</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: create</h1>

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
			require(["dojo/dom", "dojo/dom-construct", "dojo/domReady!"], function(dom, domConstruct) {
				
				var list = dom.byId("list"),
					three = dom.byId("three");

				domConstruct.create("li", {
					innerHTML: "Six"
				}, list);

				domConstruct.create("li", {
					innerHTML: "Seven",
					className: "seven",
					style: {
						fontWeight: "bold"
					}
				}, list);

				domConstruct.create("li", {
					innerHTML: "Three and a half"
				}, three, "after");
				
			});
		</script>
	</body>
</html>
