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
		refguideUrl: root + 'documentation/reference-guide/' + currentDojoVersion,
		downloadUrl: root + '#download'
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
				template: 'src/templates/tutorial.ejs'
			}
		},
		// Compile the reference guide
		exec: {
			refguide: {
				cwd: 'src/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ -d '+refGuideVersion+' '+refGuideVersion+' ../../dist/documentation/reference-guide/'+refGuideVersion
			}
		},
		ejs: {
			all: {
				options: ejsOptions,
				cwd: 'src',
				src: ['**/*.ejs', '!templates/**/*'],
				dest: 'dist',
				expand: true,
				ext: '.html'
			}
		},
		stylus: {
			options: {'include css': true},
			index: {
				files: {'dist/css/index.css': 'src/css/index.styl', 'dist/css/tutorials.css': 'src/css/tutorials.styl'}
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
		copy: {
			images: {
				files: [{
					cwd: 'src',
					src: ['images/**'],
					dest: 'dist',
					expand: true
				}]
			}
		},
		watch: {
			ejs: {
				files: ['src/**/*.ejs'],
				tasks: ['ejs', 'tutorials']
			},
			stylus: {
				files: ['src/**/*.styl'],
				tasks: ['stylus', 'copy:images']
			},
			md: {
				files: ['src/documentation/tutorials/**/*.md'],
				tasks: ['tutorials']
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
	grunt.loadTasks('tasks');

	grunt.registerTask('deploy', ['clean', 'ejs', 'stylus', 'copy', 'tutorials']);
	grunt.registerTask('default', ['clean', 'ejs', 'stylus', 'copy', 'tutorials']);
	grunt.registerTask('refguide',['exec']);
	grunt.registerTask('develop', ['clean', 'ejs', 'stylus', 'copy', 'tutorials', 'connect', 'watch']);
};
