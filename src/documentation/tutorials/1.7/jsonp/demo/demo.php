<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: jsonp Dojo pull requests</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: jsonp Dojo pull requests</h1>
		<ul id="pullrequests">

		<ul>
		<?php Utils::printDojoScript("async:true, parseOnLoad: true") ?>
		<script>
			require(["dojo/io/script", "dojo/dom-construct", "dojo/dom", "dojo/_base/array",
			"dojo/domReady!"
			], function(ioScript, domConstruct, dom, arrayUtil){
				ioScript.get({
					url: "https://api.github.com/repos/dojo/dojo/pulls",
					jsonp: "callback"
				}).then(function(response){
					return response.data;
				}).then(function(results){
					// Create a document fragment to keep from
					// doing live DOM manipulation
					var fragment = document.createDocumentFragment();
					arrayUtil.forEach(results, function(pull){
						var li = domConstruct.create("li", {}, fragment);
						var link = domConstruct.create("a", {href: pull.url, innerHTML: pull.title}, li);
					});
					domConstruct.place(fragment, dom.byId("pullrequests"));
				});
			});
		</script>
	</body>
</html>

