<?php require("../../../resources/tutHead.inc"); ?>

<h3 id="updatejsoncordova">We will update the Contacts Application to support
	<strong>Cordova/PhoneGap</strong> based access to the contacts on a device.</h3>

<p>Look here for details about <a href="http://docs.phonegap.com" target="_blank">Cordova/PhoneGap</a>.</p>

<p>The <strong>Contacts Application</strong> will have the following file structure:</p>

<pre>
	/contactsApp/
			contacts.css
			contacts.js
			contacts.json
			contacts.php
			contacts.profile.js
			package.json
			/build/
				build.profile.js
			/nls/  (the same as the previous Contacts Application)
			/views/  (the same as the previous Contacts Application)
</pre>

<p>The JSON configuration file <strong>contacts.json</strong> has to be updated in two sections to support
	<strong>Cordova/PhoneGap</strong>
<ul>
	<li>The <strong>stores</strong> will be updated with a <strong>has</strong> check for cordova to use a
		dcordova/ContactsStore. This shows the power of using <strong>has</strong> checking in the config along
	with the dojo/store so that the backend data can be swapped out without having to make any changes to the views or controllers.</li>
	<li>A <strong>has</strong> check for cordova will be used to update the <strong>dependencies</strong> to use a dcordova/ContactsStore.</li>
</ul>

<pre class="brush: js; html-script: true; highlight: [5,6,7,8,25,26,27,28,29,30,31,32,33,34]">
	"stores": {
		"contacts": {
			"type": "dojo/store/Memory",
			"has": {
				"cordova": {
					"type": "dcordova/ContactsStore",
					"params": { "displayName": true }
				}
			},
			"observable": true,
			"params": {
				"data": [
				:  :  :
	"has": {
		"html5history": {
			"controllers": [
				"dojox/app/controllers/History"
			]
		},
		"!html5history": {
			"controllers": [
				"dojox/app/controllers/HistoryHash"
			]
		},
		"!cordova": {
			"dependencies": [
				"dojo/store/Memory"
			]
		},
		"cordova": {
			"dependencies": [
				"dcordova/ContactsStore"
			]
		}
	}
</pre>

<h3 id="updatemaincordova">Update the main module of your application for Cordova/PhoneGap.</h3>
<p>The main module (contacts.js) will be updated to check for cordova and if it is available
	it will use the <strong>Cordova/PhoneGap</strong> support.</p>
<pre class="brush: js; html-script: true; highlight: [19, 21,22,26]">
	// we use 'define' and not 'require' to workaround Dojo build system limitation that prevents from making of this file
	// a layer if it using 'require'
	define(["dojo/sniff", "dojo/request", "dojo/json", "dojo/text!contactsApp/contacts.json", "dojox/app/main", "dojox/mobile/common"],
		function(has, request, json, config, Application, common){

		// if we exclude the cordova trick the init could be as simple as:
		// has.add("html5history", !has("ie") || has("ie") > 9);
		// has.add("phone", ((window.innerWidth || document.documentElement.clientWidth) <= common.tabletSize));
		// Application(json.parse(config));

		// trick to know if cordova optional project is here or not
		var init = function(){
			// populate has flag on whether html5 history is correctly supported or not
			has.add("html5history", !has("ie") || has("ie") > 9);
			has.add("phone", ((window.innerWidth || document.documentElement.clientWidth) <= common.tabletSize));
			Application(json.parse(config));
		};
		// check if cordova project's here
		request("../dcordova/sniff.js").then(function(){
			// cordova project is here, sniff cordova features and load the app
			require(["dcordova/sniff"], function(){
				init();
			});
		}, function(){
			// cordova project is not here, directly load the app
			init();
		});
	});
</pre>


<h3 id="updateindexcordova">For Cordova/PhoneGap you will need to setup an index.html file, and build the application for Cordova/PhoneGap.</h3>
<p>This index.html file was setup to work with <strong>Cordova/PhoneGap</strong>.</p>
<pre class="brush: js; html-script: true; highlight: [9,10,11,12,15]">
	&lt;!DOCTYPE html&gt;
	&lt;html&gt;
	    &lt;head&gt;
	        &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /&gt;
	        &lt;meta name="format-detection" content="telephone=no" /&gt;
	        &lt;meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1,
				minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" /&gt;
	        &lt;title&gt;Contacts App&lt;/title&gt;
	        &lt;link rel="stylesheet" href="{path_to_contactsApp}/contactsApp/contacts.css"&gt;
	    	&lt;script src="{path_to_dojox}/dojox/mobile/deviceTheme.js"&gt;&lt;/script&gt;
	        &lt;script src="cordova-2.7.0.js"&gt;&lt;/script&gt;
	        &lt;script src="{path_to_dojo}/dojo/dojo.js"
											data-dojo-config="app: {debugApp: 1}, async: true"&gt;&lt;/script&gt;
			&lt;script&gt
	            require(["contactsApp/contacts"]);
			&lt;/script&gt;
	    &lt;/head&gt;
	    &lt;body&gt;
	    &lt;/body&gt;
	&lt;/html&gt;
</pre>

<p>We can not run in Cordova/PhoneGap as part of this demo, you will need to install Cordova/PhoneGap and build the application to run on Cordova/PhoneGap.
	See the Getting Started Guides at the <a href="http://docs.phonegap.com/" target="_blank">The Cordova/PhoneGap Documentation</a> for more details.
</p>


<a class="demoBtn demo" href="demos/contactsApp/contacts.php" target="_blank">Run the Contacts Application Demo</a>
<a class="demoBtn demo" href="https://github.com/edchat/dojox_app_tutorial/tree/master/contactsCordova/demos/contactsApp" target="_blank">View the contactsApp source on github</a>


<h3>Contacts Application on github</h3>

<p>These tutorials have contained links to the code used for the demos in a github project used for this tutorial, but if you
	want to run the code on your own server, you will want to get the Contacts Application from this github project:
<a href="https://github.com/cjolif/dojo-contacts-app">https://github.com/cjolif/dojo-contacts-app</a></p>


<h3 id="buildApp">Building an Application</h3>

<p>Now that we have completed the Contacts Application we will show you how to <strong>build</strong> it.
	dojox/app provides extensions to the Dojo build system to make it easy to build an application for production.  Here is a link to the
	<a href="http://dojotoolkit.org/reference-guide/dojox/app.html#building-an-application" target="_blank">dojox/app documentation for building an application</a>.</p>

<p>For these build instructions we will assume that the Contacts Application has been pulled from the github repository above, along with
	dojo, dijit, dojox, and util into a directory named <strong>myApps</strong> so the file structure would look like this:

<pre>
	/myApps/
		/contactsApp/
			contacts.css
			contacts.html
			contacts.js
			contacts.json
			contacts.profile.js
			package.json
			/build/
				build.profile.js
			/nls/  (the same as the previous Contacts Application)
			/views/  (the same as the previous Contacts Application)
		/dijit/
		/dojo/
		/dojox/
		/util/
</pre>
</p>

<p>First take a look at the <strong>Dojo build system profile</strong> for the Contacts
	Application <strong>(build.profile.js)</strong>.  The profile will contain the key information of your build and
	import the dojox/app extensions into the build process as shown below:
<pre class="brush: js; html-script: true; highlight: [1,8,19,27,31,32]">
	require(["dojox/app/build/buildControlApp"], function(){
	});

	var profile = {
		// relative to this file
		basePath: "../..",
		// relative to base path
		releaseDir: "./contactsApp-release",
		action: "release",
		cssOptimize: "comments",
		mini: true,
		packages:[{
			name: "dojo",
			location: "./dojo"
		},{
			name: "dijit",
			location: "./dijit"
		},{
			name: "contactsApp",
			location: "./contactsApp"
		},{
			name: "dojox",
			location: "./dojox"
		}],
		selectorEngine: "acme",
		layers: {
			"dojo/dojo": {
				boot: true,
				customBase: true
			},
			"contactsApp/contacts": {
				include: ["contactsApp/contacts"]
			}
		}
	};
</pre>
<p>Optionally you could replace the packages section with this:</p>
<pre class="brush: js; html-script: true; highlight: [2,3,4]">
		packages: [
			'dojo',
			'dijit',
			'dojox',
			{
				name: "contactsApp",
				location: "./contactsApp"
			}
		],
</pre>

<p>The command you would run to <strong>build</strong> your application would look like this:</p>
<pre class="brush: js; html-script: true;">
	./build.sh --profile {path-to-myApps}/contactsApp/build/build.profile.js
		--appConfigFile {path-to-myApps}/contactsApp/contacts.json
</pre>

<p>The build output will be in /myApps/contactsApp-release/ as specified in <stong>releaseDir</stong>.</p>
<p class="proTip">There may be some errors related to the view template html files like this:</p>
<pre>
error(303) Missing include module for layer. missing: contactsApp/views/details.html; layer: contactsApp/contacts
</pre>
<p class="proTip">These errors can be ignored for now, the build still runs with the errors.  The errors are related to
	this trac ticket: <a href="https://bugs.dojotoolkit.org/ticket/17144" target="_blank">https://bugs.dojotoolkit.org/ticket/17144</a>
</p>

<p>Watch the network tab in the debugger while running the built version of the application from <strong>/myApps/contactsApp-release/</strong>
	and you can see that only a few script files are loaded are loaded.</p>
<ul>
	<li><strong>deviceTheme.js</strong> is loaded from contacts.html</li>
	<li><strong>dojo.js</strong> is loaded from contacts.html</li>
	<li><strong>contacts.js</strong> is loaded from dojo.js</li>
	<li><strong>contacts_en-us.js</strong> is loaded from dojo.js</li>
	<li><strong>memory.js</strong> is loaded because it was not included in the layer because the dependency in the config was inside a <strong>has</strong> section</li>
	<li><strong>QueryResults.js</strong> is loaded because memory.js requires it.</li>
	<li><strong>SimpleQueryEngine.js</strong> is loaded because memory.js requires it.</li>
	<li><strong>History.js</strong> is loaded because it was not included in the layer because the dependency in the config was inside a <strong>has</strong> section</li>
</ul>
<p>Update the build profile to include <strong>memory.js</strong> and <strong>History.js</strong>, to include these scripts and
	the ones they require in the build layer.</p>
<pre class="brush: js; html-script: true; highlight: [1,5,6]">
		layers: {
			"contactsApp/contacts": {
				include: [
					"contactsApp/contacts",
					"dojo/store/Memory",
					"dojox/app/controllers/History"
				]
			}
		}
	};
</pre>
<p>After a rebuild check the network tab in the debugger while running the built version again and you will see that
	the ones included in the layer are no longer loaded, now only these script files are loaded.
</p>
<ul>
	<li><strong>deviceTheme.js</strong> is loaded from contacts.html</li>
	<li><strong>dojo.js is</strong> loaded from contacts.html</li>
	<li><strong>contacts.js</strong> is loaded from dojo.js</li>
	<li><strong>contacts_en-us.js</strong> is loaded from dojo.js</li>
</ul>

<p>Alternatively, you can build a layer per-view, instead of a single layer for the entire application. Set
	the <strong>multipleAppConfigLayers</strong> property to true in your profile to build a layer for each view.
	This can be useful since dojox/app will only load a view when it is being transitioned to for the first time.
	So if an application has a lot of views that will not be navigated to in a typical usage of the application, and
	you do not want to load everything upfront, you can set <strong>multipleAppConfigLayers: true</strong> in your
	build profile. In this case the controller file of each view will be used as the layer for the view.</p>

<p>Modify the build profile above by adding a line with <strong>multipleAppConfigLayers: true,</strong> and then
	rebuild the application.  Look for <strong>Layer Contents:</strong> in the <strong>build-report.txt</strong> to see
	which layers have been created, you should see these layers:</p>
<ul>
	<li>contactsApp/contacts:</li>
	<li>dojo/dojo:</li>
	<li>contactsApp/views/list:</li>
	<li>contactsApp/views/details:</li>
</ul>
<p>Size your browser window to be the size of a phone, so that the list and details view will not be shown in two columns.
	Watch the network tab in the debugger while you run this built version of the application, notice that
	<strong>details.js</strong> is not loaded until you select a contact and transition to the details view.</p>


<p>By default the dojox/app build extension will use the first layer it finds while processing the profile to bundle all
	of the modules for the application.  You can specify a specific layer to use by
	passing <strong>--appConfigLayer layer/name</strong> on the command line.  It can be a layer listed in the
	profile or one not listed in the profile for example: .</p>
<pre class="brush: js; html-script: true;">
	./build.sh --profile {path-to-myApps}/contactsApp/build/build.profile.js
		--appConfigFile {path-to-myApps}/contactsApp/contacts.json
		--appConfigLayer contactsApp/contacts
</pre>

<h3 id="createAppTips">Tips for creating an Application using dojox/app</h3>

<ul>
	<li>Leverage the View lifecycle methods to perform actions at the right moment in your View controller:
	<strong>init, beforeActivate, afterActivate, beforeDeactivate, afterDeactivate, destroy</strong></li>
	<li>Each view can access store data through the <strong>loadedStores</strong> property. Stores from the application,
		from a parent view or for the view itself are all available to the view with the <strong>loadedStores</strong> property.</li>
	<li>Each view can access its translation through the <strong>nls</strong> property. NLS can either be shared or specific
		to a view, they are inherited.</li>
	<li>In order to get a responsive design and the best performance, leverage <strong>CSS and CSS media
		queries</strong> where possible to layout/display/hide elements based on the destination channel characteristics.</li>
	<li>Define <strong>has</strong> flags that corresponds to your different channels.</li>
	<li>Leverage the <strong>has</strong> flags both in the configuration file to configure the layout of the
		application and in the view templates & controllers to possibly change the behavior of the application
		based on the channel.</li>
</ul>


<h3>Conclusion</h3>

<p>In this tutorial we learned how to update the Contacts Application to use Cordova/PhoneGap based access the native
	contacts on a mobile device, and how to use the dojox/app "Build" support.
</p>


<?php include("../series.inc"); ?>

