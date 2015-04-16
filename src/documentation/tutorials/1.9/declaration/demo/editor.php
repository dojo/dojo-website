<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dijit/Declaration--Putting it Together</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printClaroCss();
    		Utils::printClaroGridCss();
			Utils::printDojoScript("async: true, parseOnLoad: false");
		?>
		<script>
			require(["dojo/parser", "dojo/domReady!"], function(parser){
				parser.parse();
			});

			//	this is our test data; we're going to use it in our custom widget instance.
			var data = {
				identifier: "id",
				label: "name",
				items: [
					{
						"id": 1,
						"name": "Brian Arnold",
						"avatar": "/includes/authors/brian_arnold/avatar.jpg",
						"company": "SitePen, Inc.",
						"bio": "Brian Arnold is a software engineer at <a href=\"http://www.sitepen.com\">SitePen, Inc</a>. He has a lovely wife, two cute dogs, is an active member of (and presenter at) <a href=\"http://webuquerque.com\">Webuquerque</a>, and ranks among the top 3% of fake guitarists in Rock Band."
					},
					{
						"id": 2,
						"name": "Bryan Forbes",
						"avatar": "/includes/authors/bryan_forbes/avatar.jpg",
						"company": "SitePen, Inc.",
						"bio": "Bryan Forbes has used Dojo since 2006 and became a Dojo committer shortly thereafter. He rewrote Dojo's effects system for the 0.3 release and currently maintains the DataGrid. He is a senior software engineer at <a href=\"http://www.sitepen.com\">SitePen, Inc</a>."
					},
					{
						"id": 3,
						"name": "David Walsh",
						"avatar": "/includes/authors/david_walsh/avatar.jpg",
						"company": "SitePen, Inc.",
						"bio": "David Walsh is a software engineer at <a href=\"http://www.sitepen.com\">SitePen, Inc.</a> that blogs frequently about Dojo <a href=\"http://davidwalsh.name/tutorials/dojo\">at his blog</a>."
					},
					{
						"id": 4,
						"name": "Kris Zyp",
						"avatar": "/includes/authors/kris_zyp/avatar.jpg",
						"company": "SitePen, Inc.",
						"bio": "Kris Zyp is a Dojo committer and senior software engineer at <a href=\"http://www.sitepen.com\">SitePen, Inc.</a>"
					},
					{
						"id": 5,
						"name": "Sam Foster",
						"avatar": "/includes/authors/sam_foster/avatar.jpg",
						"company": "SitePen, Inc.",
						"bio": "Sam Foster is a Dojo committer and senior software engineer at <a href=\"http://www.sitepen.com\">SitePen, Inc.</a>"
					},
					{
						"id": 6,
						"name": "Tom Trenka",
						"avatar": "/includes/authors/tom_trenka/avatar.jpg",
						"company": "SitePen, Inc.",
						"bio": "Tom Trenka is one of the original Dojo committers, owner of many DojoX modules and a Senior Software Engineer at <a href=\"http://www.sitepen.com\">SitePen, Inc</a>. He is also a former university lecturer and an accomplished musician."
					}
				]
			};

			//	this is our programmatic layout for the internal grid; we're going to pass this in our widget instance.
			var layout = {
				defaultCell: { width: 10, editable: false, headerStyles: 'padding: 0', styles: 'text-align: center; padding: 2px;' },
				cells: [
					{ name: "ID", field: "id" },
					{ name: "Avatar", field: "avatar", formatter: function(value){
						return '<img src="' + value + '" border="0" width="90" height="90" />';
					}},
					{ name: "Name", field: "name", styles: "text-align: left;", width: "100%"},
					{ name: "Company", field: "company", width: 14 }
				]
			};
		</script>
	</head>
	<body class="claro">
		<h1>Demo: dijit/Declaration&mdash;Putting it Together</h1>
		<p>
		The following represents a more complex widget created with dijit/Declaration.  Take a look at the source to see
		how it works.
		</p>

		<script type="dojo/require">
			lang: "dojo/_base/lang",
			ItemFileReadStore: "dojo/data/ItemFileReadStore",
			BorderContainer: "dijit/layout/BorderContainer",
			ContentPane: "dijit/layout/ContentPane",
			Editor: "dijit/Editor"
		</script>

		<div data-dojo-type="dijit/Declaration" data-dojo-props="widgetClass:'ComplexWidget', defaults:{ title:'A Complex Widget' }">
			<div data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="liveSplitters: false, design: 'headline'" style="width:100%;height:640px;">
				<div data-dojo-attach-point="headerPane" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top',splitter:false" style="background-color:#efefef;">
					<h2 style="margin:0;">${title}</h2>
				</div>
				<div data-dojo-attach-point="grid" data-dojo-type="dojox/grid/DataGrid" data-dojo-props="region:'center'">
				</div>
				<div data-dojo-attach-point="editorPane" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'bottom', splitter:true">
					<div data-dojo-attach-point="editor" data-dojo-type="dijit/Editor">Click on a row to edit the author's bio (does not save).</div>
				</div>
			</div>
			<script type="dojo/method" data-dojo-event="postCreate">
				this.inherited(arguments);

				//	set the structure of our grid, and set up the connection to it.
				this.grid.set('structure', this.layout);

				//	when someone clicks on a row, set the value of the editor to be the included bio.
				var grid = this.grid, editor = this.editor;
				grid.on("rowClick", function(evt){
					var idx = evt.rowIndex,
						item = grid.getItem(idx),
						value = grid.store.getValue(item, "bio");

					editor.set("value", value);
				});
			</script>
			<script type="dojo/connect" data-dojo-event="startup">
				//	we set the grid's data in our startup method, so that it has a chance to render properly.
				if(this.data){
					// set up our store with the data
					this.store = new ItemFileReadStore({ data: this.data });
					
					//	feed the grid with the store
					this.grid.setStore(this.store);
				}
			</script>
		</div>

		<div style="border:1px solid #999;">
			<div id="test" data-dojo-type="ComplexWidget" data-dojo-props="title: 'Dojo Tutorial Authors', data: data, layout: layout"></div>
		</div>
	</body>
</html>
