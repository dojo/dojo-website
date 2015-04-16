<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Progammatic Layout</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<link rel="stylesheet" href="style.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
	</head>
	<body class="claro">
		<div id="appLayout" class="demoLayout"></div>
		<div id="startContent">
			<h4>Starting Content</h4>
			<button id="createTabBtn">Add another tab</button>
		</div>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
			require(["dojo/on", "dojo/dom", "dojo/ready", "dijit/registry", "dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"],
			function(on, dom, ready, registry, BorderContainer, TabContainer, ContentPane){
				function addTab(name) {
					var pane = new ContentPane({
						title: name,
						content: "<h4>" + name + "</h4>"
					});
					registry.byId("contentTabs").addChild(pane);
				}

				ready(function(){
					// create the BorderContainer and attach it to our appLayout div
					var appLayout = new BorderContainer({
						design: "headline"
					}, "appLayout");


					// create the TabContainer
					var contentTabs = new TabContainer({
						region: "center",
						id: "contentTabs",
						tabPosition: "bottom",
						"class": "centerPanel",
						href: "contentCenter.html"
					})

					// add the TabContainer as a child of the BorderContainer
					appLayout.addChild( contentTabs );

					// create and add the BorderContainer edge regions
					appLayout.addChild(
						new ContentPane({
							region: "top",
							"class": "edgePanel",
							content: "Header content (top)"
						})
					)
					appLayout.addChild(
						new ContentPane({
							region: "left",
							id: "leftCol", "class": "edgePanel",
							content: "Sidebar content (left)",
							splitter: true
						})
					);

					// Add initial content to the TabContainer
					contentTabs.addChild(
						new ContentPane({
							title: "Start"
						}, "startContent")
					);

					var tabCounter = 1;
					on(dom.byId("createTabBtn"), "click", function(evt){
						addTab("Tab " + (++tabCounter));
					});

					// start up and do layout
					appLayout.startup();
				});
			});
		</script>
	</body>
</html>
