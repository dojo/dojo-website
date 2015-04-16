<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: fx.fadeIn and fx.fadeOut</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Tutorial: dojo.fadeIn and dojo.fadeOut</h1>
		<button id="fadeOutButton">Fade block out</button>
		<button id="fadeInButton">Fade block in</button>

		<div id="fadeTarget" class="red-block">
			A red block
		</div>
		<?php
                        Utils::printDojoScript("async: true, isDebug: true");
                ?>
		<script>
			require(["dojo/_base/fx", "dojo/on", "dojo/dom", "dojo/domReady!"], function(fx, on, dom) {
				var fadeOutButton = dom.byId("fadeOutButton"),
					fadeInButton = dom.byId("fadeInButton"),
					fadeTarget = dom.byId("fadeTarget");

				on(fadeOutButton, "click", function(evt){
					fx.fadeOut({ node: fadeTarget }).play();
				});
				on(fadeInButton, "click", function(evt){
					fx.fadeIn({ node: fadeTarget }).play();
				});
			});
		</script>
	</body>
</html>
