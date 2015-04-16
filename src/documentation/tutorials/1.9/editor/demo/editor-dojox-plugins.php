<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Additional DojoX Plugins</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php Utils::printClaroCss() ?>
		<?php Utils::printLinkStyleTags(array(
			'dojox/editor/plugins/resources/editorPlugins.css',
			'dojox/editor/plugins/resources/css/PageBreak.css',
			'dojox/editor/plugins/resources/css/ShowBlockNodes.css',
			'dojox/editor/plugins/resources/css/Preview.css',
			'dojox/editor/plugins/resources/css/Save.css',
			'dojox/editor/plugins/resources/css/Breadcrumb.css',
			'dojox/editor/plugins/resources/css/FindReplace.css',
			'dojox/editor/plugins/resources/css/PasteFromWord.css',
			'dojox/editor/plugins/resources/css/InsertAnchor.css',
			'dojox/editor/plugins/resources/css/CollapsibleToolbar.css',
			'dojox/editor/plugins/resources/css/Blockquote.css',
			'dojox/editor/plugins/resources/css/Smiley.css')) ?>
	</head>
	<body class="claro">
		<h1>Demo: Additional DojoX Plugins</h1>
		<div data-dojo-type="dijit/Editor" style="width:800px;min-height:100px;" data-dojo-props="extraPlugins:['prettyprint','pagebreak','showblocknodes','preview','save','toolbarlinebreak','normalizeindentoutdent','breadcrumb','findreplace','pastefromword','insertanchor','collapsibletoolbar','foreColor', 'hiliteColor','blockquote','smiley','uploadImage']">
			This is the <strong>default</strong> content.
		</div>
		<?php Utils::printDojoScript("async: true,parseOnLoad: true") ?>
		<script>
			// Include the class
			require(["dijit/Editor", "dojo/parser",
				"dojox/editor/plugins/PrettyPrint",
				"dojox/editor/plugins/PageBreak",
				"dojox/editor/plugins/ShowBlockNodes",
				"dojox/editor/plugins/Preview",
				"dojox/editor/plugins/Save",
				"dojox/editor/plugins/ToolbarLineBreak",
				"dojox/editor/plugins/NormalizeIndentOutdent",
				"dojox/editor/plugins/Breadcrumb",
				"dojox/editor/plugins/FindReplace",
				"dojox/editor/plugins/PasteFromWord",
				"dojox/editor/plugins/InsertAnchor",
				"dojox/editor/plugins/CollapsibleToolbar",
				"dojox/editor/plugins/TextColor",
				"dojox/editor/plugins/Blockquote",
				"dojox/editor/plugins/Smiley",
				"dojox/editor/plugins/UploadImage"]);
		</script>
	</body>
</html>
