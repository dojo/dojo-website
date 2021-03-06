<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: NodeList.on via dojo/query</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: NodeList.on via dojo/query</h1>
		<button id="button1" class="clickMe">Click me</button>
		<button id="button2" class="clickMeAlso">Click me also</button>
		<button id="button3" class="clickMe">Click me too</button>
		<button id="button4" class="clickMeAlso">Please click me</button>
		<?php
                        Utils::printDojoScript("async: true");
		?>
		<script>
			require(["dojo/query", "dojo/_base/lang", "dojo/domReady!"], function(query, lang) {
				var myObject = {
					id: "myObject",
					onClick: function(evt){
						alert("The scope of this handler is " + this.id);
					}
				};
				query(".clickMe").on("click", myObject.onClick);
				query(".clickMeAlso").on("click", lang.hitch(myObject, "onClick"));
			});
		</script>
	</body>
</html>
