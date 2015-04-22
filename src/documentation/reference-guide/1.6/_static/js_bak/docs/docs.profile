dependencies = {

	// Sphinx version overrides this in the makefile
	version: "0.0.0-" + (+new Date()),
	releaseName:"trunk",
	cssOptimize:"comments.keepLines",
	optimize:"shrinksafe",
	action:"clean,release",
	copyTests:"true",
	mini:"false",
	
	layers: [
		// for docs.dojocampus.org:
		{
			name: "../docs/layer.js",
			dependencies: [
				"docs.layer"
			]
		},
			
		// for Sphinx export
		{
			name: "../docs/doclayer.js",
			dependencies: [
				"docs.doclayer"
			]
		},
		
		// for tmpdocs.campus
		{
			name: "../docs/wiki.js",
			dependencies:[
				"docs.wiki"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "docs", "../docs" ],
		[ "CodeGlass", "../CodeGlass" ]
	]
	
};
