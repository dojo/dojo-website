<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Using _TemplatedMixin</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
		<style>
			.someWidgetTitle { cursor: pointer; }
		</style>
	</head>
	<body class="claro">
		<h1>Demo: Using _TemplatedMixin</h1>
		<div data-dojo-type="demo.SomeWidget" data-dojo-props="title:'Our Some Widget'">
			<div>Don't forget to click on the title!</div>
			<p>This is arbitrary content!</p>
			<button data-dojo-type="dijit.form.Button">My Button</button>
			<p>More arbitrary content!</p>
		</div>
		<?php
			Utils::printDojoScript("async: true");
		?>
		<script>
			
			// To keep the example simple, we're declaring our widget inline.
			// Future tutorials will explain how to properly separate this out into its own file.
			
			require([
				"dojo/_base/declare",
				"dojo/parser",
				"dijit/_WidgetBase",
				"dijit/_OnDijitClickMixin",
				"dijit/_TemplatedMixin",
				"dijit/form/Button",
				"dojo/text!./templates/SomeWidget.html"
			], function(declare, parser, _WidgetBase, _OnDijitClickMixin, _TemplatedMixin, Button, template) {
				// Declare our widget
				declare("demo.SomeWidget", [_WidgetBase, _OnDijitClickMixin, _TemplatedMixin], {
					//	get our template
					templateString: template,

					//	some properties
					baseClass: "someWidgetBase",
					title: "",	//	we'll set this from the widget def

					//	hidden counter
					_counter: 1,
					_firstClicked: false,

					//	define an onClick handler
					onClick: function(){
						if(this._firstClicked){
							this.titleNode.innerHTML = this.title + " was clicked " + (++this._counter) + " times.";
						} else {
							this.titleNode.innerHTML = this.title + " was clicked!";
							this._firstClicked = true;
						}
					},

					postCreate: function(){
						this.titleNode.innerHTML = this.title;
					}
				});

				parser.parse();
			});

		</script>
	</body>
</html>
