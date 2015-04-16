<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Tutorial: dojo/behavior</title>
		<link rel="stylesheet" href="style.css" media="screen" />
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen" />
	</head>
	<body>
		<h1>Tutorial: A behavior module</h1>
		
		<h3>Product List</h3>
		<ul class="productList">
			<li>
				<h4>Product line 1</h4>	
				<button class="buyButton demoBtn">Buy Me</button>
			</li>
			<li>
				<h4>Product line 2</h4>	
				<button class="buyButton demoBtn">Buy Me</button>
			</li>
			<li>
				<h4>Product line 3</h4>	
				<button class="buyButton demoBtn">Buy Me</button>
			</li>
		</ul>
		<h3>Recommendations</h3>
		<ul id="recommendedList" class="productList">
			<li><a class="recommendedLink" href="./recommendedItems.html">Get Recommendations</a></li>
		</ul>
		
		<div id="summary" class="summary">No items in cart</div>

		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			
			// Get dojo so we can require the right path
			require(["dojo"], function(dojo) {
				
				// map the current directory as the path for code in the 'tutorial' namespace
				dojo.registerModulePath("tutorial", location.pathname.replace(/\/\w+\.html$/, ""));
				
				// Require the behavior resource
				require(["dojo/behavior", "tutorial/behavior", "dojo/domReady!"], function(behavior, tutorialBehavior) {
					
					// register the behavior 'sheet'
					behavior.add(tutorialBehavior);

					// apply all registered behaviors to the current document
					behavior.apply();
				});
				
			});
			
			
		</script>
	</body>
</html>
