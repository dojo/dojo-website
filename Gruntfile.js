/* jshint node: true */
var path = require('path');

module.exports = function (grunt) {

	var root = '/';

	// Dojo Release Version
	var dojoVersionMajor = '1.10';
	var dojoVersionMinor = '.4';
	var dojoVersionFull = dojoVersionMajor + dojoVersionMinor;
	var dojoVersionCdn = '1.10.3';


	var refGuideVersion = grunt.option('dojo') || dojoVersionMajor;

	var urls = {
		//Internal
		api: root + 'api/',
		blog: root + 'blog/',
		contribute: root + 'community/contribute.html',
		docs: root + 'documentation',
		download: root + 'download/',
		guide: root + 'reference-guide/' + dojoVersionMajor,
		license: root + 'license/',
		roadmap: root + 'community/roadmap.html',
		support: root + '#support',
		tutorials: root + 'documentation/tutorials',

		//External
		ext: {
			bugTracker: 'https://bugs.dojotoolkit.org/',
			commercialSupport: 'http://www.sitepen.com/support/index.html',
			facebook: 'https://www.facebook.com/groups/4375511291/',
			github: 'https://github.com/dojo',
			googlePlus: 'https://plus.google.com/106701567946037375891/posts',
			irc: 'http://irc.lc/freenode/dojo/t4nk@@@',
			mailingList: 'http://mail.dojotoolkit.org/mailman/listinfo/dojo-contributors',
			stackoverflow: 'http://stackoverflow.com/questions/tagged/dojo',
			twitter: 'http://twitter.com/dojo',
			dojoFoundation: 'http://dojofoundation.org'
		},

		//Dojo Release URLs
		dojo: {
			cdn: '//ajax.googleapis.com/ajax/libs/dojo/'+dojoVersionCdn+'/dojo/dojo.js',
			download: 'http://download.dojotoolkit.org',
			release: this.download+'/release-'+dojoVersionMajor,
			releaseTar: this.release+'/dojo-release-'+dojoVersionMajor+'.tar.gz',
			releaseZip: this.release+'/dojo-release-'+dojoVersionMajor+'.zip',
			releaseJs: this.release+'/dojo.js',
			releaseJsUncompressed: this.release+'/dojo.js.uncompressed.js',
		}
	};



	var ejsOptions = {
		root: root,
		dojoVersionMajor: dojoVersionMajor,
		dojoVersionFull: dojoVersionFull,
		url: urls,
		rev: Date.now()
	};

	grunt.initConfig({
		// This is a custom task that compiles markdown tutorials
		// in `src` and moves them to `dest`, running each through the
		// specified ejs `template`. Within the template, two variables
		// are made available: `content`, which is the resulting tutorial
		// HTML, and `tutorials`, which is an array all tutorials represented
		// as objects, each with a `filename` and `title` property.
		tutorials: {
			all: {
				options: ejsOptions,
				src: 'src/documentation/tutorials/',
				dest: 'dist/documentation/tutorials/',
				template: 'src/_templates/tutorial.ejs'
			}
		},

		// Compile the Reference Guide and API docs
		exec: {
			guide: {
				cwd: 'src/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ -d '+refGuideVersion+' '+refGuideVersion+' ../../../dist/reference-guide/'+refGuideVersion
			},
			api: {
				cwd: 'tasks/api',
				cmd: 'node build'
			}
		},
		ejs: {
			all: {
				options: ejsOptions,
				cwd: 'src',
				src: ['**/*.ejs', '!_templates/**/*', '!_partials/**/*'],
				dest: 'dist',
				expand: true,
				ext: '.html'
			},

			//Docs need to have partials compiled to HTML first
			docs: {
				options: ejsOptions,
				cwd: 'src/_partials',
				src: ['header.ejs', 'footer.ejs'],
				dest: 'src/_partials/tmp',
				expand: true,
				ext: '.html'
			}
		},

		stylus: {
			options: {'include css': true, 'compress':true},
			index: {
				files: {'dist/css/index.css': 'src/css/index.styl', 'dist/css/tutorials.css': 'src/css/views/tutorials.styl', 'dist/css/api.css': 'src/css/views/api.styl', 'dist/css/guide.css': 'src/css/views/guide.styl'}
			}
		},
		connect: {
			server: {
				options: {
					port: 1337,
					base: 'dist'
				}
			}
		},
		sync: {
			images: {
				files: [{
					cwd: 'src',
					src: ['images/**', 'css/images/**', 'css/fonts/**'],
					dest: 'dist',
					expand: true,
				}],
				verbose: true
			},
			scripts: {
				files: [{
					cwd: 'src',
					src: ['scripts/**'],
					dest: 'dist',
					expand: true,
				}],
				verbose: true
			}
		},
		watch: {
			ejs: {
				files: ['src/**/*.ejs'],
				tasks: ['ejs']
			},
			md: {
				files: ['src/documentation/tutorials/**/*.ejs', '!src/**/README.md'],
				tasks: ['tutorials']
			},
			stylus: {
				files: ['src/**/*.styl', '!src/vendor/**'],
				tasks: ['stylus', 'sync:images']
			},
			js: {
				files: ['src/scripts/**/*.js', 'src/scripts/*.js', '!src/scripts/dojo/**', '!src/scripts/syntaxhighlighter/**'],
				tasks: ['sync:scripts']
			}
		},
		clean: ['dist']
	});

	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadTasks('tasks');

	grunt.registerTask('deploy', ['clean', 'ejs', 'stylus', 'sync', 'tutorials', 'exec']);
	grunt.registerTask('default', ['clean', 'ejs', 'stylus', 'sync', 'tutorials']);
	grunt.registerTask('docs',['ejs:docs', 'exec']);
	grunt.registerTask('develop', ['ejs', 'stylus', 'sync', 'tutorials', 'connect', 'watch']);
};
