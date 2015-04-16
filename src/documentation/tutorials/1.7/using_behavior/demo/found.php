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
		<h1>Tutorial: The 'found' pseudo-event in dojo/behavior</h1>
		
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
		<div id="available" class="summary">No items available</div>
		<div id="summary" class="summary">No items in cart</div>
		<p>
			<button id="resetButton" class="demoBtn">Reset</button>
		</p>

		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			
			// Require the behavior resource
			require(["dojo/dom", "dojo/dom-class", "dojo/behavior", "dojo/domReady!"], function(dom, domClass, behavior) {
				
				// track the number of products available
				var availableCount = 0;
				// track the number of products "bought"
				var productCount = 0;


				// function to update rendering for the summaries
				function onUpdate(){
					dom.byId("summary").innerHTML = 
						productCount + " items in cart";
					dom.byId("available").innerHTML = 
						availableCount + " product lines available";
				}

				// function to handle click on 'buy' buttons
				function onPurchaseClick(evt){
					productCount++;
					onUpdate();
				}
				// function to handle 'found' event for products
				function onProductFound(elm){
					availableCount++;
				}

				// a simple behavior 'sheet', which sets up event handlers on all elements 
				// which match the '.buyButton' query
				var myBehavior = {
					"button": {
						// bindings for all button elements
						found: function(elm){
							console.log("button found: ", elm);
						},
						onmousedown: function(evt){
							domClass.add(evt.target, "buttonDown");
						},
						onmouseup: function(evt){
							domClass.remove(evt.target, "buttonDown");
						}
					},
					".buyButton": {
						// bindings for buyButtons specifically
						found: onProductFound,

						onclick: onPurchaseClick
				    }, 
					"#resetButton": {
						// wire up the reset button so it clears the products-purchased count
						onclick: function(evt) {
							productCount = 0;
							onUpdate();
						}
					}
				};
				
				// register the behavior 'sheet'
				behavior.add(myBehavior);
				
				// apply all registered behaviors to the current document
				behavior.apply();
				
				// update rendering
				onUpdate();
				
			});
		</script>
	</body>
</html>
