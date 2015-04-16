<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Dijit Buttons</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
	</head>
	<body class="claro">
		<h1>Demo: dijit/form/Button</h1>
		<p>
			Below, we see <code>dijit/form/Button</code> in two forms: as a standard button, and
			using an icon with no label.  Be sure to open the console to see messages when clicking
			the buttons!
		</p>
		<div>
			<button id="btn" data-dojo-type="dijit/form/Button"
				data-dojo-props="
					onClick:function(){ console.log('First button was clicked!'); }">
				Click Me!
			</button>
			<button id="btn2" data-dojo-type="dijit/form/Button"
				data-dojo-props="
					iconClass:'dijitIconNewTask',
					showLabel:false,
					onClick:function(){ console.log('Second button was clicked!'); }">
				Click Me!
			</button>
		</div>
		<?php Utils::printDojoScript("isDebug: true, async: true, parseOnLoad: true") ?>
		<script>
			// load requirements for declarative widgets in page content
			require(["dojo/parser", "dijit/form/Button", "dojo/domReady!"]);
		</script>
	</body>
</html>
