<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: NodeList Extensions: dojo/NodeList-data</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<h1>Demo: NodeList Extensions: dojo/NodeList-data</h1>
		<button type="button" id="btn">Inspect Data</button>

		<h3>Fruits</h3>
		<p>Click the fruits you like!</p>
		<ul class="fruitList">
			<li class="fresh">Apples</li>
			<li class="fresh">Persimmons</li>
			<li class="fresh">Grapes</li>
			<li class="fresh">Fresh Figs</li>
			<li class="dried">Dates</li>
			<li class="dried">Raisins</li>
			<li class="dried">Prunes</li>
			<li class="fresh dried">Apricots</li>
			<li class="fresh">Peaches</li>
			<li class="fresh">Bananas</li>
			<li class="fresh">Cherries</li>
		</ul>
		<?php
			Utils::printDojoScript("async: true");
		?>
		<script>
			require(["dojo/query", "dojo/NodeList-data", "dojo/domReady!"], function(query, NodeList){
				function mark(evt){
					var nodeList = new NodeList(this);		// make a new NodeList from the clicked element
					nodeList.data("updated", new Date());	// update the 'updated' key for this element via the NodeList
				}
				
				query("li")							// get all list items
					.data("updated", new Date())	// set the initial data for each matching element
					.on("click", mark);				// add the event handler
			
				query("#btn").on("click", function(){
					query("li").data("updated").forEach(function(date){
						log(date.getTime());
					});
				});

				function log(msg){
					var c = document.getElementById("console");
					if(!c){
						c = document.createElement("div");
						c.setAttribute("id", "console");
						document.body.appendChild(c);
					}
					c.innerHTML += "<div>" + msg + "</div>";
				}
			});
		</script>
	</body>
</html>
