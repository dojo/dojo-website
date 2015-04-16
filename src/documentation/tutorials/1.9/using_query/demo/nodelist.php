<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Tutorial: NodeList</title>

		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">

		<!-- load SyntaxHighlighter for showing source -->
		<script src="/highlight/scripts/shCore.js"></script>
		<link type="text/css" rel="stylesheet" href="/highlight/styles/shCoreDefault.css"/>
		<script src='/highlight/scripts/shBrushXml.js' type='text/javascript'></script>
		<script src='/highlight/scripts/shBrushCss.js' type='text/javascript'></script>

	</head>
	<body>
		<h1>Tutorial: NodeList</h1>

		<p>Click the buttons below to execute the corresponding query and NodeList functions.</p>

		<button id="oddForEach">query(".odd").forEach(...)</button><br />
		<button id="evenAddBlue">query(".even").addClass("blue")</button><br />
		<button id="oddAddBlue">query(".odd").removeClass("red").addClass("blue")</button><br />
		<button id="evenStyle">query(".even").style("color", "white").addClass("italic")</button><br />

		<br />
		<div id="list">
			<div class="odd">One</div>
			<div class="even">Two</div>
			<div class="odd">Three</div>
			<div class="even">Four</div>
			<div class="odd">Five</div>
			<div class="even">Six</div>
		</div>

		<p>This list is rendered from the following markup:</p>
<pre class="brush: html;">&lt;div id="list"&gt;
	&lt;div class="odd"&gt;One&lt;/div&gt;
	&lt;div class="even"&gt;Two&lt;/div&gt;
	&lt;div class="odd"&gt;Three&lt;/div&gt;
	&lt;div class="even"&gt;Four&lt;/div&gt;
	&lt;div class="odd"&gt;Five&lt;/div&gt;
	&lt;div class="even"&gt;Six&lt;/div&gt;
&lt;/div&gt;</pre>

		<?php Utils::printDojoScript("async: true") ?>
		<script>

			// Wait for the DOM to be ready before working with it
			require(["dojo/query", "dojo/dom-class", "dojo/on", "dojo/NodeList-dom", "dojo/domReady!"], function(query, domClass, on) {

				function oddForEach(){
					query(".odd").forEach(function(node){
						// For each node with a class of "odd",
						// remove the class "blue" and add the class "red"
						domClass.remove(node, "blue");
						domClass.add(node, "red");
					});
				}

				function oddAddBlue(){
					// For each node with a class of "odd",
					// remove the class "red" and add the class "blue"
					query(".odd").removeClass("red").addClass("blue");
				}

				function evenAddBlue(){
					// For each node with a class of "even",
					// add the class "blue"
					query(".even").addClass("blue");
				}

				function evenStyle(){
					// For each node with a class of "even",
					// Set its color CSS style to "white" and add a class of "italic"
					query(".even").style("color", "white").addClass("italic");
				}

				// Connect the buttons
				on(document.getElementById("oddForEach"), "click", oddForEach);
				on(document.getElementById("evenAddBlue"), "click", evenAddBlue);
				on(document.getElementById("oddAddBlue"), "click", oddAddBlue);
				on(document.getElementById("evenStyle"), "click", evenStyle);

			});

			SyntaxHighlighter.all();
		</script>
	</body>
</html>
