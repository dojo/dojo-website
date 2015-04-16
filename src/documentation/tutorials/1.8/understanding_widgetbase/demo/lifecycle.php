<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php'); ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: The Dijit Lifecycle</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss(); ?>
	</head>
	<body class="claro">
		<h1>Demo: Showing the lifecycle of a Widget</h1>
		<p>The list below is created dynamically during the instantiation of a simple Dijit button. For more detailed information
		(such as the arguments passed to each method), check your Firebug or Developer console.</p>
		<ol id="lifecycle"></ol>
		<div id="buttonContainer"></div>

    	<?php Utils::printDojoScript(); ?>
		<script>
		require(["dojo/_base/array", "dijit/form/Button", "dojo/aspect", "dojo/dom", "dojo/dom-construct", "dojo/domReady!"],
			function(array, Button, aspect, dom, domConstruct){
				// connect to the lifecycle methods of a dijit.form.Button
				var methods = [ "postscript", "create", "postMixInProperties", "buildRendering", "postCreate", "startup" ];
				array.forEach(methods, function(method){
					aspect.before(Button.prototype, method, function(){
						if(console && console.log) { console.log(method, arguments); }
						domConstruct.create("li", {
							innerHTML: method
						}, dom.byId("lifecycle"));
					});
				});

				// ok, create a button programmatically
				var button = Button({ label: "A button" }, dom.byId("buttonContainer"));
				button.startup();
			});
		</script>
	</body>
</html>
