<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: ISO Dates with dojo.data.stamp</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: ISO Dates with dojo.data.stamp</h1>
		<p>Parsing and outputting ISO-8601 date formats</p>

		<div class="resultPanel">
			<pre id="outbox"></pre>
		</div>

		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
		require(["dojo/date/stamp", "dojo/dom", "dojo/_base/xhr", "dojo/_base/array", "dojo/domReady!"], 
				function(stamp, dom, xhr, arrayUtil){
			
			demo = {
				normalize: function(entry, dateParam) {
					dateParam = dateParam || "Date";
					if(!entry.jsDate || !(entry.jsDate instanceof Date)) {
						var datestr = entry[dateParam];
						var date = new Date(entry[dateParam]);
						entry.jsDate =  date;
					}
					return entry;
				},

				formatDates: function(entries) {
					var now = new Date(), 
						nowStr = now.toUTCString();
					var tweetDateStr = "Wed May 11 2011 03:40:18 (tweet date)", 
						tweetDate = new Date("Wed May 11 2011 03:40:18");
					var firstManInSpaceStr = "April 12, 1961 (first man in space)", 
						firstManInSpace = new Date("April 12, 1961");

					var parseResults = {
						"2011-05-13 (ISO Date)": stamp.fromISOString("2011-05-13"),
						"Combined date and time in UTC": stamp.fromISOString("2011-05-13T08:05:00"),
						"Time": stamp.fromISOString("T08:05:00")
					};

					var formatResults = {};
					formatResults[firstManInSpaceStr] = stamp.toISOString(firstManInSpace);

					formatResults[tweetDateStr] = stamp.toISOString(tweetDate);

					formatResults[nowStr+ " (now) - date only"]
						= stamp.toISOString(now, { selector: "date" });

					formatResults[nowStr+ " (now) - time only"]
						= stamp.toISOString(now, { selector: "time" });

					var resultLines = [];
					resultLines.push("Parsing\n=======");
					for(var label in parseResults) {
						resultLines.push('<h4>'+label+'</h4>' + parseResults[label]);
					}
					resultLines.push("\nFormatting\n==========");
					for(var label in formatResults) {
						resultLines.push('<h4>'+label+'</h4>' + formatResults[label]);
					}

					this.showResult(
						"ISO Date formatting", 
						resultLines.join("\n")
					);
				},
				showResult: function(heading, content){
					// IE8 strips whitespace when assigning to innerHTML, so use outerHTML
					dom.byId("outbox").outerHTML = '<pre id="outbox">' + content + '</pre>';
				}
			};

			// load some tweets
			xhr.get({
				url: '../resources/astro_nicole.json',
				handleAs: "json",
				load: function(data) {
					// normalize to give each entry a jsDate property
					var spaceTweets = arrayUtil.map(data, function(entry) {
						return demo.normalize(entry, "created_at");
					});
					// format the entries
					demo.formatDates(spaceTweets);
				}, 
				error: function(err) {
					console.warn("tweets: ", err);
				}
			});
		});
		</script>
	</body>
</html>
