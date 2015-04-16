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

			#console {
				margin-top: 2em;
				border-top: 1px solid #333;
			}
			
			#console div {
				background: #eee; 
				padding:5px 10px;
				margin-top: 2px;
			}
		</style>

	</head>
	<body>
		<h1>Press Up or Down Arrow Keys (see console)</h1>
		<input type="text" id="input1" value="up">
		<input type="text" id="input2" value="down">
		<input type="submit" id="send" value="send">
		<script src="//ajax.googleapis.com/ajax/libs/dojo/1.6.3/dojo/dojo.xd.js">
		</script>
		<script>
			function log(msg){
				var c = document.getElementById("console");
				if(!c){
					c = dojo.create("div", {
						id: "console"
					}, document.body);
				}
				c.innerHTML += "<div>" + msg + "</div>";
			}

			dojo.query("input[type='text']").connect("onkeydown", function (event) {
				switch(event.keyCode) {
					case dojo.keys.UP_ARROW:
						event.preventDefault();
						//preventing the default behavior in case your browser
						// uses autosuggest when you hit the down or up arrow.
						log("up arrow has been pressed");
						break;
					case dojo.keys.DOWN_ARROW:
						event.preventDefault();
						//preventing the default behavior in case your browser
						// uses autosuggest when you hit the down or up arrow.
						log("down arrow has been pressed");
						break;
					case dojo.keys.ENTER:
						log("enter has been pressed");
						break;
					default:
						log("some other key: " + event.keyCode);
				}
			});
		</script>
	</body>
</html>
