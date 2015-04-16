dojo.provide("tutorial.behavior");

(function(){
	
	// track the number of products "bought"
	var productCount = 0;
	
	// function to update rendering for the summary
	function onUpdate(){
		dojo.byId("summary").innerHTML = 
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
		return dojo.xhrGet({
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
	tutorial.behavior = {
		".buyButton" : {
			onclick: onPurchaseClick,
			onmousedown: function(evt){
				dojo.addClass(evt.target, "buttonDown");
			},
			onmouseup: function(evt){
				dojo.removeClass(evt.target, "buttonDown");
			}
	    }, 
		".recommendedLink": {
			onclick: function(evt){
				dojo.stopEvent(evt);
				loadContentAsFragment(
					dojo.byId("recommendedList"), // the target node 
					evt.target.href // the url
				).then(function(){
					// when the new content is loaded in, 
					// re-apply the behavior
					dojo.behavior.apply();
				})
				
			}
		}
	};

})();
