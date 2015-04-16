<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/keys</title>

		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<style>
			input {
				display: block;
			}
		</style>

	</head>
	<body>
		<h1>Press any key</h1>
		keyCode value: <input type="text" id="keyCode" size="2">
		<script src="//ajax.googleapis.com/ajax/libs/dojo/1.6.3/dojo/dojo.xd.js">
		</script>
		<script>
			dojo.connect(document, "onkeyup", function(event) {
				dojo.byId("keyCode").value = event.keyCode;
			});
		</script>
</body>
</html>
