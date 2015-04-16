<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: fx.wipeIn and fx.wipeOut</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Tutorial: fx.wipeIn and fx.wipeOut</h1>
		<button id="wipeOutButton">Wipe block out</button>
		<button id="wipeInButton">Wipe block in</button>

		<div id="wipeTarget" class="red-block wipe">
			A red block
		</div>
		<?php
                        Utils::printDojoScript("async: true, isDebug: true");
                ?>
		<script>
			
			require(["dojo/fx", "dojo/on", "dojo/dom", "dojo/domReady!"], function(fx, on, dom) {
				var wipeOutButton = dom.byId("wipeOutButton"),
					wipeInButton = dom.byId("wipeInButton"),
					wipeTarget = dom.byId("wipeTarget");

				on(wipeOutButton, "click", function(evt){
					fx.wipeOut({ node: wipeTarget }).play();
				});
				on(wipeInButton, "click", function(evt){
					fx.wipeIn({ node: wipeTarget }).play();
				});
			});
			
		</script>
	</body>
</html>
