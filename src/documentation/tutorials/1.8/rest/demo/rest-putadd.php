<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Demo: put add</title>
	<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	<?php
		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
		Utils::printClaroCss();
	?>

</head>
<body class="claro">
	<h1>Demo: put add</h1>
	<button type="button" id="b1" disabled="disabled">Update Item</button>
	<h3>Book ID 1 Before</h3>
	<pre id="o1"><em>Nothing Yet...</em></pre>
	<h3>Book ID 1 After Put</h3>
	<pre id="o2"><em>Nothing Yet...</em></pre>
	<button type="button" id="b2" disabled="disabled">Add Item</button>
	<h3>Books After Add</h3>
	<pre id="o3"><em>Nothing Yet...</em></pre>
	<?php
		Utils::printDojoScript("async: true");
	?>
	<script>
	require(["dojo/store/JsonRest", "dojo/when", "dojo/dom", "dojo/dom-attr", "dojo/json", "dojo/on", "dojo/domReady!"],
	function(JsonRest, when, dom, attr, JSON, on){
		var bookStore = new JsonRest({
			target: "books/"
		});

		on(dom.byId("b1"), "click", function(e){
			when(bookStore.get(1)).then(function(book){
				dom.byId("o1").innerHTML = JSON.stringify(book);
				book.author = "Huxley, Aldous";
				when(bookStore.put(book)).then(function(result){
					dom.byId("o2").innerHTML = JSON.stringify(result);
					attr.remove("b2", "disabled");
				});
			});
		});

		on(dom.byId("b2"), "click", function(e){
			when(bookStore.add({
				title: "Catcher in the Rye",
				author: "J. D. Salinger",
				price: 0.98
			})).then(function(){
				dom.byId("o3").innerHTML = "";
				bookStore.query().forEach(function(book){
					dom.byId("o3").innerHTML += JSON.stringify(book) + "\n";
				});
			})
		});

		attr.remove("b1", "disabled");

	});
	</script>
</body>
</html>
