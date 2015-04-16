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
		<h1>Tutorial: Using pub/sub with dojo/behavior</h1>
		
		<h3>Product List</h3>
		<ul class="productList inactive">
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
		<button id="activate">Activate</button>
		<div id="summary" class="summary">No items in cart</div>

		<?php Utils::printDojoScript("isDebug: true, async: true") ?>
		<script>
			
			// Require the behavior resource
			require(["dojo/dom", "dojo/dom-class", "dojo/behavior", "dojo/query", "dojo/topic", "dojo/NodeList-dom", "dojo/domReady!"], function(dom, domClass, behavior, query, topic) {
				// track the number of products "bought"
				var productCount = 0;

				// function to update rendering for the summary
				function onUpdate(){
					dom.byId("summary").innerHTML = 
						productCount + " items in cart";
				}

				// function to update products-purchased state
				function purchaseProduct(){
					productCount++;
					onUpdate();
				}

				topic.subscribe("/buyButton/clicked", function(evt){
					// a default listener for click events on 'buy' buttons
					console.log("default handler for events on the /buyButton/click topic. isActive: ", isActive);
				});

				var handles = {},		// where we'll store our subscribe handles
				 	isActive = false; 	// track active state of the form

				function toggleActive(){
					if(isActive) { 
						// set to inactive state
						// unsubscribe listeners
						query(".productList").addClass("inactive");
						handles.activate.remove();
					} else { 
						// set to active state
						// start listening to the /buyButton/clicked topic
						handles.activate = topic.subscribe("/buyButton/clicked", purchaseProduct);
						query(".productList").removeClass("inactive");
					}
					isActive = !isActive;
				}

				function onActiveClick(evt){
					// update active state
					toggleActive();
					evt.target.innerHTML = isActive ? 
						"Deactivate" : "Activate";
				}

				// a simple behavior 'sheet', which sets up event handlers on all elements 
				// which match the '.buyButton' query
				var myBehavior = {
					".buyButton" : {
						// publish an event on the '/buyButton/clicked' channel
						onclick: "/buyButton/clicked",
						onmousedown: function(evt){
							domClass.add(evt.target, "buttonDown");
						},
						onmouseup: function(evt){
							domClass.remove(evt.target, "buttonDown");
						}
				    },
					"#activate": {
						// wire up the toggle button
						onclick: onActiveClick
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
