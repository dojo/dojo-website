<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: byId</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: byId</h1>

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
			// Require the DOM resource
			require(["dojo/dom", "dojo/domReady!"], function(dom) {
				
				function setText(node, text){
					node = dom.byId(node);
					node.innerHTML = text;
				}

				var one = dom.byId("one");
				setText(one, "One has been set");
				setText("two", "Two has been set as well");
				
			});
		</script>

	</body>
</html>
