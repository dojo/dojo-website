define(["dojo/dom", "dojo/dom-class", "dojo/behavior", "dojo/_base/xhr", "dojo/_base/event"], function(dom, domClass, behavior, xhr, baseEvent) {
	
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
	return {
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
});