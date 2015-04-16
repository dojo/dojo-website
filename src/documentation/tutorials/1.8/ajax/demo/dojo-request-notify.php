<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: dojo/request/notify</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printClaroCss();
		?>
    </head>
    <body class="claro">
	    <h1>Demo: dojo/request/notify</h1>
    	<div id="buttonContainer">
    		<p>Click the buttons to see dojo/request/notify run.  Success will run a successful request sequence, Fail will handle an error from the server.</p>
    		<p>The demo includes short delays to make it easier to see the activity.</p>
    		<button class="action" id="successBtn">Succeed</button>
    		<button class="action" id="failBtn">Fail</button>
    	</div>

    	<h2>Status</h2>
    	<div id="divStatus">
    		<p class="ready">Ready</p>
    	</div>
    	<?php
    		include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
    		Utils::printDojoScript();
    	?>
        <!--FIXME: Use something besides topic? Update for changes to notify?-->
        <script>
			require(["dojo/dom", "dojo/request", "dojo/request/notify",
					"dojo/on", "dojo/dom-construct", "dojo/query",
					"dojo/domReady!"],
				function(dom, request, notify, on, domConstruct){
					// Listen for events from request providers
					notify("start", function(){
						domConstruct.place("<p>Start</p>","divStatus");
					});
					notify("send", function(data, cancel){
						domConstruct.place("<p>Sent request</p>","divStatus");
					});
					notify("load", function(data){
						domConstruct.place("<p>Load (response received)</p>","divStatus");
					});
					notify("error", function(error){
						domConstruct.place("<p class=\"error\">Error</p>","divStatus");
					});
					notify("done", function(data){
						domConstruct.place("<p>Done (response processed)</p>","divStatus");
						if(data instanceof Error){
							domConstruct.place("<p class=\"error\">Error</p>","divStatus");
						}else{
							domConstruct.place("<p class=\"success\">Success</p>","divStatus");
						}
					});
					notify("stop", function(){
						domConstruct.place("<p>Stop</p>","divStatus");
						domConstruct.place("<p class=\"ready\">Ready</p>", "divStatus");
					});

					// Use event delegation to only listen for clicks that
					// come from nodes with a class of "action"
					on(dom.byId("buttonContainer"), ".action:click", function(evt){
						domConstruct.empty("divStatus");
						request.get("../resources/php/notify-demo.php", {
							query: {
								success: this.id === "successBtn"
							},
							handleAs: "json"
						});
					});
				}
			);
        </script>
    </body>
</html>
