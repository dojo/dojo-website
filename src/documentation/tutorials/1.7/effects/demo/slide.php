<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: fx.slideTo</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Tutorial: fx.slideTo</h1>
		<button id="slideAwayButton">Slide block away</button>
		<button id="slideBackButton">Slide block back</button>

		<div id="slideTarget" class="red-block slide">
			A red block
		</div>
		<?php
                        Utils::printDojoScript("async: true, isDebug: true");
                ?>
		<script>
			
			require(["dojo/fx", "dojo/on", "dojo/dom", "dojo/domReady!"], function(fx, on, dom) {
				var slideAwayButton = dom.byId("slideAwayButton"),
					slideBackButton = dom.byId("slideBackButton"),
					slideTarget = dom.byId("slideTarget");

				on(slideAwayButton, "click", function(evt){
					fx.slideTo({ node: slideTarget, left: "200", top: "200" }).play();
				});
				on(slideBackButton, "click", function(evt){
					fx.slideTo({ node: slideTarget, left: "0", top: "100" }).play();
				});
			});
			
		</script>
	</body>
</html>
