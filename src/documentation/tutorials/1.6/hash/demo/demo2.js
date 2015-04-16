dojo.require("dojo.hash");                                           // add dojo.hash support
dojo.require("dojox.NodeList.delegate");                             // add event delegation support

dojo.ready(function(){                                               // when the DOM is ready and our dependencies are loaded
	var content = dojo.byId("content"),                              // find the content element and store a reference
	    lastPage = (/([^\/]+).html$/.exec(location.pathname) ||      // store the last requested page so we do not make
					[])[1] || "index";                               // multiple requests for the same content
	
	function loadContent(page){                                      // create a function to load new content
		page || (page = "index");                                    // default page to "index"
		
		if(lastPage === page){                                       // if we already just loaded this page
			return;                                                  // cancel loading
		}
		
		lastPage = page;                                             // remember the last page that was requested
		
		dojo.xhrGet({                                                // using an Ajax GET request…
			url: page + ".json",                                     // fetch page.json
			handleAs: "json",                                        // make sure it’s handled as JSON
			load: function(data){                                    // if the load was successful…
				dojo.hash(page);                                     // change the page hash
				document.title = data.title;                         // change the page title
				content.innerHTML = data.content;                    // change the page content
			},
			error: function(data){                                   // if the load was unsuccessful…
				content.innerHTML = "Error! Please wait.";           // display an error
				location.href = page + ".html";                      // try navigating directly to the correct page
			}
		});
	}
	
	dojo.query("#menu").delegate("a", "click", function(evt){        // for each click on an anchor inside #menu…
		evt.preventDefault();                                        // stop the browser from navigating to the page
		
		var page = dojo.attr(this, "href").replace(".html", "");     // retrieve the hash that we want to load
		loadContent(page);                                           // & load it
	});
	
	
	dojo.subscribe("/dojo/hashchange", function(hash){               // any time the page hash changes
		loadContent(hash);                                           // load new content
	});
	
	dojo.hash(location.hash || lastPage, true);                      // set the default page hash
});