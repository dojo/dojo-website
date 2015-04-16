require(["dojo/dom", "dojo/_base/xhr", "dojo/hash", "dojo/on", "dojo/dom-attr", "dojo/topic", "dojo/query", "dojo/domReady!"], 
function(dom, xhr, hash, on, domAttr, topic) {
	// find the content element and store a reference
	var content = dom.byId("content"),
		// store the last requested page so we do not make multiple requests for the same content
		lastPage = (/([^\/]+).php$/.exec(location.pathname) ||		
					[])[1] || "index";		

	// create a function to load new content
	function loadContent(page){
		// default page is "index"
		if (!page) page = "index";
	
		// if this is the same page displayed, abandon the load	
		if(lastPage === page){
			return;	
		}	
	
		// remember the last page that was requested	
		lastPage = page;
	
		// get the page content using an Ajax GET
		xhr.get({
			url: page + ".json",
			handleAs: "json",
			load: function(data){
				// change the page hash
				hash(page);	
				// update the page title and content
				document.title = data.title;	
				content.innerHTML = data.content;
			},
			error: function(data){					
				// handle any errors
				content.innerHTML = "Error! Please wait.";
				// try navigating directly to the page
				location.href = page + ".php";	
			}
		});
	}

	// for each click on an anchor inside the menu	
	on(document.getElementById("menu"), "a:click", function (evt) {
		// stop the browser from navigating to the page
		evt.preventDefault();
		// retrieve the hash that we want to load and load it
		var page = domAttr.get(this, "href").replace(".php", "");
		loadContent(page);
	});
	
	topic.subscribe("/dojo/hashchange", function(hash){		// any time the page hash changes
		loadContent(hash);  					// load new content
	});
	
	hash(location.hash || lastPage, true);				// set the default page hash
});
