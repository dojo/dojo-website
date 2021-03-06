<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Inspecting Dates</title>
		<link rel="stylesheet" href="style.css" media="screen">
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
	</head>
	<body>
		<h1>Demo: Sorting Dates</h1>
		<p>Using <code>dojo/date.compare</code> to custom sort a series of dates</p>
		<div class="resultPanel">
			<h2 id="heading">Tweets sorted by time-of-day sent</h2>
			<pre id="outbox"></pre>
		</div>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/', dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php');
			Utils::printDojoScript();
		?>
		<script>
		require(["dojo/date", "dojo/date/locale", "dojo/dom", "dojo/_base/xhr", "dojo/_base/array", "dojo/domReady!"], 
				function(date, dateLocale, dom, xhr, arrayUtil){
			
			demo = {
				normalize: function(entry, dateParam) {
					dateParam = dateParam || "Date";
					if(!entry.jsDate || !(entry.jsDate instanceof Date)) {
						var date = dateLocale.parse(entry[dateParam], {selector: 'date', datePattern: 'EEE MMM dd HH:mm:ss +ZZZZ yyyy'});
						entry.jsDate = date;
					}
					return entry;
				},

				formatEntries: function(entries) {
					return "<ol>"+arrayUtil.map(entries, function(entry) {
						var text = entry.text.replace(/http:\/\/\S+/g, function(url){
							return '<a href="'+url+'">'+url+'</a>';
						});
						return '<li><span class="datelabel">'+entry.jsDate.toString() + '</span>' + text + '</li>';
					}).join("\n") + "</ol>";
				},

				timeSort: function(entries) {
					var sortEntries = [].concat(entries);
					sortEntries.sort(function(a, b){
						return date.compare(a.jsDate, b.jsDate, "time");
					});
					return sortEntries;
				},

				tweetsByTimeSent: function(tweets) {
					var sortedEntries = this.timeSort(tweets);
					var msg = this.formatEntries(sortedEntries);
					this.showResult("Time sorted entries", msg);
				},

				showResult: function(heading, content){
					dom.byId("outbox").innerHTML = content;
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
					// send over the first 5
					demo.tweetsByTimeSent(spaceTweets);
				}, 
				error: function(err) {
					console.warn("tweets: ", err);
				}
			});
		});
		</script>
	</body>
</html>
