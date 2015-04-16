<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: fx.chain</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Tutorial: fx.chain</h1>
		<button id="slideAwayButton">Slide block away</button>
		<button id="slideBackButton">Slide block back</button>

		<div id="slideTarget" class="red-block slide chain">
			A red block
		</div>
		<?php
                        Utils::printDojoScript("async: true, isDebug: true");
                ?>
		</script>
		<script>
			
			require(["dojo/_base/fx", "dojo/fx", "dojo/on", "dojo/domReady!"], function(baseFx, fx, on) {
				
				var slideAwayButton = document.getElementById("slideAwayButton"),
					slideBackButton = document.getElementById("slideBackButton"),
					slideTarget = document.getElementById("slideTarget");
					
				// Set up a couple of click handlers to run our chained animations
				on(slideAwayButton, "click", function(evt){
					fx.chain([
						baseFx.fadeIn({ node: slideTarget }),
						fx.slideTo({ node: slideTarget, left: "200", top: "200" }),
						baseFx.fadeOut({ node: slideTarget })
					]).play();
				});
				on(slideBackButton, "click", function(evt){
					fx.chain([
						baseFx.fadeIn({ node: slideTarget }),
						fx.slideTo({ node: slideTarget, left: "0", top: "100" }),
						baseFx.fadeOut({ node: slideTarget })
					]).play();
				});
				
			});
		</script>
	</body>
</html>
