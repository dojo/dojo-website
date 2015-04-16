require([
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/hash",
	"dojo/on",
	"dojo/request",
	"dojo/topic",
	"dojo/query" // for dojo/on event delegation
], function(dom, domAttr, hash, on, request, topic){
	// find the content element and store a reference
	var contentNode = dom.byId("content"),
		prefix = "!",
		// store the last requested page so we do not make multiple requests for the same content
		lastPage = (/([^\/]+).php$/.exec(location.pathname) || [])[1] || "index";

	on(dom.byId("menu"), "a:click", function(event){
		// prevent loading a new page - we're doing a single page app
		event.preventDefault();
		var page = domAttr.get(this, "href").replace(".php", "");
		loadPage(page);
	});

	topic.subscribe("/dojo/hashchange", function(newHash){
		// parse the plain hash value, e.g. "index" from "!index"
		loadPage(newHash.substr(prefix.length));
	});

	hash(prefix + (location.hash || lastPage), true); // set the default page hash

	function loadPage(page){
		hash(prefix + page);

		// get the page content using an Ajax GET
		request(page + ".json", {
			handleAs: "json"
		}).then(function (data) {
			// update the page title and content
			document.title = data.title;	
			contentNode.innerHTML = data.content;
		});
	}
});