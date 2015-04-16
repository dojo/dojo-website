<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/script</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: dojo/request/script</h1>
		<p>Click the button below to see dojo/request/registry search for content on both the local server and on twitter.</p>
		<p>twitter is searched for results tagged with the search text.  The local results include some common web terms such as <em>dojo, php</em> and <em>javascript</em>.</p>
		<div>
			<label>Search: <input type="text" id="searchText" /></label>
			<button class="action" id="searchButton">Go</button>
		</div>
		<br /><br />
		<h2>twitter Results</h2>
		<div id="twitterDiv">
		</div>
		<h2>Local Results</h2>
		<div id="localResourceDiv">
		</div>
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript();
    	?>
		<script>
			require(["dojo/request/registry", "dojo/request/script", "dojo/dom",
					"dojo/dom-construct", "dojo/on", "dojo/domReady!"],
				function(request, script, dom, domConstuct, on){
					// Registers anything that starts with "http://" to be sent to the script provider,
					// requests for a local search will use xhr
					request.register(/^https?:\/\//i, script);

					// When the search button is clicked
					on(dom.byId("searchButton"), "click", function(){
						// First send a request to twitter for all tweets tagged with the search string
						request("http://search.twitter.com/search.json", {
							query: {
								q:"#" + dom.byId("searchText").value,
								result_type:"mixed",
								lang:"en"
							},
							jsonp: "callback"
						}).then(function(data){
							// If the tweets node exists, destroy it
							if (dom.byId("tweets")){
								domConstuct.destroy("tweets");
							}
							// If at least one result was returned
							if (data.results.length > 0) {
								// Create a new tweet list
								domConstuct.create("ul", {id: "tweets"},"twitterDiv");
								// Add each tweet as an li
								while (data.results.length>0){
									domConstuct.create("li", {innerHTML: data.results.shift().text},"tweets");
								}
							}else{
								// No results returned
								domConstuct.create("p", {id:"tweets",innerHTML:"None"},"twitterDiv");
							}
						});
						// Next send a request to the local search
						request("../resources/php/search.php", {
							query: {
								q: dom.byId("searchText").value
							},
							handleAs: "json"
						}).then(
							function(data){
								dom.byId('localResourceDiv').innerHTML =
									"<p><strong>" + data.name + "</strong><br />" +
									"<a href=\"" + data.url + "\">" + data.url + "</a><br />";
							},
							function(error){
								// If no results are found, the local search returns a 404
								dom.byId('localResourceDiv').innerHTML = "<p>None</p>";
							}
						);
					});
				}
			);
		</script>
	</body>
</html>
