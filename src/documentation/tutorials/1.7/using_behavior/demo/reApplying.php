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
		<h1>Tutorial: Re-applying behaviors with dojo/behavior</h1>
		
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
			
			// Require the behavior resource
			require(["dojo/dom", "dojo/dom-class", "dojo/_base/xhr", "dojo/behavior", "dojo/_base/event", "dojo/domReady!"], function(dom, domClass, xhr, behavior, baseEvent) {
				
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

				function loadContentAsFragment(node, contentUrl){
					// summary: 
					// 		Fetch a page and extract out the list items
					return xhr.get({
						url: contentUrl,
						load: function(html){
							// extract out the list items
							html = html.substring(html.indexOf('<li'));
							html = html.substring(0, html.lastIndexOf('</li>')+5);
							node.innerHTML = html;
						}
					}); // return the deferred
				}

				// behavior 'sheet'
				var myBehavior = {
					".buyButton" : {
						onclick: onPurchaseClick,
						onmousedown: function(evt){
							domClass.add(evt.target, "buttonDown");
						},
						onmouseup: function(evt){
							domClass.remove(evt.target, "buttonDown");
						}
				    }, 
					".recommendedLink": {
						onclick: function(evt){
							baseEvent.stop(evt);
							loadContentAsFragment(
								dom.byId("recommendedList"), // the target node 
								evt.target.href // the url
							).then(function(){
								// when the new content is loaded in, 
								// re-apply the behavior
								behavior.apply();
							});
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
