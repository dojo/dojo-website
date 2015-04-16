<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Border Animation</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h3>Demo: Border Animation</h3>
		<button id="startButton">Grow Borders</button>
		<button id="reverseButton">Shrink Borders</button>

		<div id="anim8target" class="box" style="border-style:outset">
			<div class="innerBox">A box</div>
		</div>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/_base/fx", "dojo/on", "dojo/dom", "dojo/domReady!"], function(baseFx, on, dom) {
				var startButton = dom.byId("startButton"),
					reverseButton = dom.byId("reverseButton"),
					anim8target = dom.byId("anim8target");
					
					// Set up a couple of click handlers to run our animations
					on(startButton, "click", function(evt){
						baseFx.animateProperty({
							node: anim8target,
							properties: { borderWidth: 100 }
						}).play();
					});
					on(reverseButton, "click", function(evt){
						baseFx.animateProperty({
							node: anim8target,
							properties: { borderWidth: 1 }
						}).play();
					});
			});
			
		</script>
	</body>
</html>
