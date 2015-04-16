<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: dojo/behavior</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Tutorial: Defining simple behaviors with dojo/behavior</h1>
		
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
		<div id="summary" class="summary">No items in cart</div>

		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			
			// Require the behavior resource
			require(["dojo/dom", "dojo/dom-class", "dojo/behavior", "dojo/domReady!"], function(dom, domClass, behavior) {
				
				// track the number of products "bought"
				var productCount = 0;

				// function to update rendering for the summary
				function onUpdate(){
					dom.byId("summary").innerHTML = 
						productCount + " items in cart";
				}

				// function to handle click on 'buy' buttons
				function onPurchaseClick(evt){
					productCount++;
					onUpdate();
				}

				// a simple behavior 'sheet', which sets up event handlers on all elements 
				// which match the '.buyButton' query
				var myBehavior = {
					".buyButton" : {
						onclick: onPurchaseClick,
						onmousedown: function(evt){
							domClass.add(evt.target, "buttonDown");
						},
						onmouseup: function(evt){
							domClass.remove(evt.target, "buttonDown");
						}
				    }
				};
				
				// register the behavior 'sheet'
				behavior.add(myBehavior);

				// apply all registered behaviors to the current document
				behavior.apply();
				
			});
		</script>
	</body>
</html>
