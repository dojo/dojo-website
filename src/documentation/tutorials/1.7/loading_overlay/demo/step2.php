<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Loading Overlay (Step 2)</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php /* For this demo, the script should load earlier to prevent display of the HTML */
		Utils::printDojoScript("isDebug: true, async: true") ?>
	</head>
	<body>
		<div id="loadingOverlay" class="loadingOverlay pageOverlay"></div>
		<script>
			var demo;
			require(["dojo/_base/declare", "dojo/dom", "dojo/dom-style"],
			function(declare, dom, domStyle){
				var Demo = declare(null, {
					overlayNode:null,
					constructor:function(){
						// save a reference to the overlay
						this.overlayNode = dom.byId('loadingOverlay');
					},
					// called to hide the loading overlay
					endLoading:function(){
						domStyle.set(this.overlayNode,'display','none');
					}
				});
				demo = new Demo();
			});
		</script>
		<h1>Demo: Loading Overlay</h1>
		<p>The rest of your page...</p>
	</body>
</html>
