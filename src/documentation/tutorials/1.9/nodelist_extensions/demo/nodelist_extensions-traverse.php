<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: NodeList Extensions: dojo/NodeList-traverse</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: NodeList Extensions: dojo/NodeList-traverse</h1>

		<h3>All Fruit</h3>
		<ul>
			<li><h4>Alkaline Fruits</h4>
				<ul class="fruitList">
					<li class="alkaline yum">Apples</li>
					<li class="alkaline">Persimmons</li>
					<li class="alkaline">Thompson Grapes (Seedless)</li>
					<li class="alkaline">Muscat Grapes</li>
					<li class="alkaline">All Sweet Grapes</li>
					<li class="alkaline">Fresh Figs</li>
					<li class="alkaline">Dates</li>
					<li class="alkaline">Figs</li>
					<li class="alkaline yum">Raisins</li>
					<li class="alkaline yuck">Prunes</li>
					<li class="alkaline">Apricots</li>
					<li class="alkaline">Peaches</li>
					<li class="alkaline yum">Bananas</li>
					<li class="alkaline">Cherries</li>
					<li class="alkaline">Bananas</li>
					<li class="alkaline">Litchi "Nuts"</li>
					<li class="alkaline">Carob</li>

				</ul>
			</li>
			<li><h4>Subacidic Fruits</h4>
				<ul class="fruitList">
					<li class="subacidic">Sweet Apples (Delicious)</li>
					<li class="subacidic">Sweet Peaches</li>
					<li class="subacidic">Sweet Nectarines</li>
					<li class="subacidic">Pears</li>
					<li class="subacidic">Sweet Cherries</li>
					<li class="subacidic">Some Grapes (Neither sweet nor sour)</li>
					<li class="subacidic">Papayas</li>
					<li class="subacidic">Mangos</li>
					<li class="subacidic">Apricots</li>
					<li class="subacidic">Fresh Litchi "Nuts"</li>
					<li class="subacidic">Sweet Plums</li>
					<li class="subacidic">Blueberries</li>
					<li class="subacidic">Raspberries</li>
					<li class="subacidic">Blackberries</li>
					<li class="subacidic">Mulberries</li>
					<li class="subacidic">Huckleberries</li>
					<li class="subacidic">Cherimoyas</li>		
				</ul>
				</li>
			<li><h4>Acid Fruits</h4>
				<ul class="fruitList">
					<li class="acid">Oranges</li>
					<li class="acid">Grapefruit</li>
					<li class="acid">Pineapples</li>
					<li class="acid">Strawberries</li>
					<li class="acid">Pomegranates</li>
					<li class="acid yuck">Lemons</li>
					<li class="acid">Kiwi Fruit</li>
					<li class="acid">Kumquats</li>
					<li class="acid">Loquats</li>
					<li class="acid">Carambolas</li>
					<li class="acid yuck">Loganberries</li>
					<li class="acid">Gooseberries</li>
					<li class="acid">Cranberries </li>
					<li class="acid">Limes</li>
					<li class="acid">Sour Apples</li>
					<li class="acid">Sour Grapes</li>
					<li class="acid">Sour Peaches</li>
					<li class="acid">Sour Nectarines</li>
					<li class="acid">Sour Plums</li>
					<li class="acid yuck">Sour Cherries</li>		
				</ul>
				</li>
			<li><h4>Melons</h4>
				<ul class="fruitList">
					<li class="melon">Watermelon</li>
					<li class="melon yum">Honeydew Melon</li>
					<li class="melon">Honey Balls</li>
					<li class="melon yum">Cantaloupe</li>
					<li class="melon yuck">Muskmelon</li>
					<li class="melon">Casaba Melon</li>
					<li class="melon">Crenshaw Melon</li>
					<li class="melon">Pie Melon</li>
					<li class="melon">Banana Melon</li>
					<li class="melon">Persian Melon</li>
					<li class="melon">Christmas Melon</li>
					<li class="melon">Nutmeg Melon</li>		
				</ul>
				</li>
		</ul>		
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript("async: true");
		?>
		<script>
			
			require(["dojo/query", "dojo/NodeList-traverse", "dojo/NodeList-dom", "dojo/domReady!"], function(query){
				query("li.yum")             // get LI elements with the class 'yum'
					.addClass("highlight")  // add a 'highlight' class to those LI elements
					.closest(".fruitList")  // find the closest parent elements of those LIs with the class 'fruitList'
					.prev()                 // get the previous sibling (headings in this case) of each of those fruitList elements
					.addClass("happy")      // add a 'happy' class to those headings
					.style({backgroundPosition: "left", paddingLeft: "20px"}); // add some style properties to those headings
			});
			
		</script>
	</body>
</html>
