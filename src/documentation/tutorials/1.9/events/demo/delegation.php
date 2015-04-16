<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Event Delegation with dojo/on</title>

		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
                <?php
			Utils::printClaroCss();
		?>
	</head>
	<body>
		<h1>Demo: Event Delegation with dojo/on</h1>
		<div id="parentDiv">
			<button id="button1" class="clickMe">Click me</button>
			<button id="button2" class="clickMe">Click me also</button>
			<button id="button3" class="clickMe">Click me too</button>
			<button id="button4" class="clickMe">Please click me</button>
		</div>
                <?php
                        Utils::printDojoScript("async: true");
                ?>
		<script>

			require(["dojo/on", "dojo/dom", "dojo/query", "dojo/domReady!"], function(on, dom) {
				var myObject = {
					id: "myObject",
					onClick: function(evt){
						alert("The scope of this handler is " + this.id);
					}
				};
				var div = dom.byId("parentDiv");
				on(div, ".clickMe:click", myObject.onClick);
			});
		</script>
	</body>
</html>
