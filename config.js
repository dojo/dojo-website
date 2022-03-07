module.exports = function(grunt){

	var config = { };

	config.src = 'src';
	config.dest = 'dist';
	config.root = '/';

	config.dojo = {
		ver: {
			get major(){ return '1.17' },
			get minor(){ return '.1'},
			get full(){ return this.major + this.minor},
			//get cdn(){ return this.full },
			get cdn(){ return '1.14.1' },
		}
	};

	config.guide = {
		ver: config.dojo.ver.major,
	};

	config.urls = {
		//Internal
		api: config.root+'api/',
		blog: config.root+'blog/',
		contribute: config.root+'community/#contribute',
		docs: config.root+'documentation/',
		download: config.root+'download/',
		guide: config.root+'reference-guide/',
		license: config.root+'license.html',
		community: config.root+'community/',
		guidelines: config.root+'community/guidelines/',
		support: config.root+'community/#support',
		related: config.root+'community/#related',
		tutorials: config.root+'documentation/#tutorials',


		//External
		ext: {
			bugTracker: 'https://github.com/dojo/dojo',
			commercialSupport: 'http://www.sitepen.com/support/index.html',
			facebook: 'https://www.facebook.com/groups/4375511291/',
			github: 'https://github.com/dojo',
			googlePlus: 'https://plus.google.com/106701567946037375891/posts',
			irc: 'http://irc.lc/freenode/dojo/dtk_web_client@@@',
			gitter: 'https://gitter.im/dojo/dojo',
			mailingList: 'https://discourse.dojo.io/c/dojo1',
			stackoverflow: 'http://stackoverflow.com/questions/tagged/dojo',
			twitter: 'http://twitter.com/dojo',
			jsFoundation: 'https://js.foundation/',
			dojoio: 'https://dojo.io/',
			dstore: 'http://dstorejs.io',
			dgrid: 'http://dgrid.io',
			intern: 'http://theintern.io'
		},

		tuts: {
			//hello_dojo: config.root+'documentation/tutorials/'+config.dojo.ver.major+'/hello_dojo',
			hello_dojo: config.root+'documentation/tutorials/1.10/hello_dojo'
		},

		//Dojo Release URLs
		dojo: {
			get cdn(){ return '//ajax.googleapis.com/ajax/libs/dojo/'+config.dojo.ver.cdn+'/dojo/dojo.js'},
			download: 'http://download.dojotoolkit.org',
			get release(){ return this.download+'/release-'+config.dojo.ver.full },
			get sourceTar() { return this.release+'/dojo-release-'+config.dojo.ver.full+'-src.tar.gz'},
			get sourceZip() { return this.release+'/dojo-release-'+config.dojo.ver.full+'-src.zip'},
			get releaseTar() { return this.release+'/dojo-release-'+config.dojo.ver.full+'.tar.gz'},
			get releaseZip() { return this.release+'/dojo-release-'+config.dojo.ver.full+'.zip'},
			get releaseJs(){ return this.release+'/dojo.js'},
			get releaseJsUncompressed() { return this.release+'/dojo.js.uncompressed.js'},
		}
	};

	config.urls.subnav = {
		download: [
			{ url: '#cdn', label: 'CDN' },
			{ url: '#bower', label: 'Bower' },
			{ url: '#download', label: 'Download' },
			{ url: '#github', label: 'Github' }
		],
		community: [
			{ url: config.urls.support, label: 'Help & Support' },
			{ url: config.urls.related, label: 'Related Projects'},
			{ url: config.urls.contribute, label: 'Become a Contributor'},
			{ url: config.urls.guidelines, label: 'Community Guidelines'},
		],
	};

	return config;
}
