/* jshint node: true */

module.exports = function (grunt) {

	// If this site is served from a subdirectory,
	// it can be passed in using the --root=/subdir/path option
	var root = grunt.option('root') || '/';
	var currentDojoVersion = '1.10';
	var refGuideVersion = grunt.option('dojo') || currentDojoVersion;

	var ejsOptions = {
		root: root,
		currentDojoVersion: currentDojoVersion,
		githubUrl: 'https://github.com/dojo',
		tutorialsUrl: root + 'documentation/tutorials',
		refguideUrl: root + 'reference-guide/' + currentDojoVersion,
		apiUrl: root + 'api/',
		downloadUrl: root + '#download',
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
	grunt.registerTask('docs',['exec']);
	grunt.registerTask('develop', ['ejs', 'stylus', 'sync', 'tutorials', 'connect', 'watch']);
};
