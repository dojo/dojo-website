/* jshint node: true */
var path = require('path');
var marked = require('marked');

module.exports = function (grunt) {

	// Build config variables
	var config = require('./config.js')(grunt);

	// Reads and parses the roadmap json
	var roadmap = require('./tasks/roadmap.js')(grunt);


	var ejsOptions = {
		dojo: config.dojo,
		url: config.urls,
		rev: Date.now(),
		roadmap: roadmap
	};


	grunt.initConfig({
		// This is a custom task that compiles markdown tutorials
		// in `src` and moves them to `dest`, running each through the
		// specified ejs `template`. Within the template, two variables
		// are made available: `content`, which is the resulting tutorial
		// HTML, and `tutorials`, which is an array all tutorials represented
		// as objects, each with a `filename` and `title` property.
		config: config,

		tutorials: {
			all: {
				options: ejsOptions,
				src: '<%= config.src %>/documentation/tutorials/',
				dest: '<%= config.dest %>/documentation/tutorials/',
				template: '<%= config.src %>/_templates/tutorial.ejs',
				indexTemplate: '<%= config.src %>/documentation/index.ejs',
				indexDest: '<%= config.dest %>/documentation/'
			}
		},

		// Compile the Reference Guide and API docs
		exec: {
			guide: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.10 ../../../<%= config.dest %>/reference-guide/1.10'
			},
			guide19: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.9/ ../../../<%= config.dest %>/reference-guide/1.9'
			},
			guide18: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.8/ ../../../<%= config.dest %>/reference-guide/1.8'
			},
			guide17: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -a -c ./ ./1.7/ ../../../<%= config.dest %>/reference-guide/1.7'
			},
		},

		spawn: {
			api: {
				command: "node",
				commandArgs: ["build"],
				directory: "tasks/api",
				opts: {
					cwd: __dirname + '/tasks/api'
        		},
				useQuotes: true,
				quoteDelimiter: "\"",
				groupFiles: true,
				passThrough: true
			},
		},

		ejs: {
			all: {
				options: ejsOptions,
				cwd: config.src,
				src: ['**/*.ejs', '!_templates/**/*', '!_partials/**/*', '!documentation/**/*.ejs'],
				dest: config.dest,
				expand: true,
				ext: '.html'
			},

			//Docs need to have partials compiled to HTML first
			docs: {
				options: ejsOptions,
				cwd: '<%= config.src %>/_partials',
				src: ['header.ejs', 'footer.ejs'],
				dest: '<%= config.src %>/_partials/tmp',
				expand: true,
				ext: '.html'
			}
		},

		highlight: {
		    task: {
		      options: {},
		      files: { '<%= config.dest %>/download/index.html':['<%= config.dest %>/download/index.html']}
			}
		},

		stylus: {
			options: {'include css': true, 'compress':true},
			index: {
				files: {
					'<%= config.dest %>/css/index.css': '<%= config.src %>/css/index.styl',
					'<%= config.dest %>/css/api.css': '<%= config.src %>/css/views/api.styl',
					'<%= config.dest %>/css/guide.css': '<%= config.src %>/css/views/guide.styl',
					'<%= config.dest %>/blog/wp-content/themes/dtk/style.css' : '<%= config.src %>/css/views/blog.styl'
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 1337,
					base: config.dest
				}
			}
		},

		sync: {
			images: {
				files: [{
					cwd: config.src,
					src: ['images/**', 'css/images/**', 'css/fonts/**'],
					dest: config.dest,
					expand: true,
				}],
				verbose: true
			},
			scripts: {
				files: [{
					cwd: config.src,
					src: ['scripts/**', '!scripts/dojo/**/*'],
					dest: config.dest,
					expand: true,
				}],
				verbose: true
			},
			dojo: {
				files: [{
					cwd: config.src,
					src: ['scripts/dojo/**/*'],
					dest: config.dest,
					expand: true,
				}],
				verbose: true
			},
			blog: {
				files: [
					{
						cwd: '<%= config.src %>/blog',
						src: ['dtk/**/*'],
						dest: '<%= config.dest %>/blog/wp-content/themes/',
						expand: true,
					},
					{
						cwd: '<%= config.src %>/_partials/tmp',
						src: ['header.html', 'footer.html'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/inc'
					},
					{
						cwd: '<%= config.src %>/scripts',
						src: ['nav.js', 'dojo/dojo/**/*'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/js'
					},
					{
						cwd: '<%= config.src %>/css',
						src: ['fonts/**/*'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/css'
					}
				],
				verbose: true
			}
		},

		watch: {
			ejs: {
				files: ['<%= config.src %>/**/*.ejs', '<%= config.src %>/community/roadmap/packages.json','!<%= config.src %>/documentation/**/*'],
				tasks: ['ejs', 'highlight']
			},

			tutorials: {
				files: ['<%= config.src %>/documentation/tutorials/**/*.md', '<%= config.src %>/documentation/index.ejs', '<%= config.src %>/_templates/tutorial.ejs', '!<%= config.src %>/**/README.md'],
				tasks: ['tutorials']
			},
			blog: {
				files: ['<%= config.src %>/blog/dtk/**/*', '<%= config.src %>_partials/**/*.ejs'],
				tasks: ['sync:blog']
			},
			stylus: {
				files: ['<%= config.src %>/**/*.styl', '!<%= config.src %>/vendor/**'],
				tasks: ['stylus', 'sync:images']
			},
			js: {
				files: ['<%= config.src %>/scripts/**/*.js', '<%= config.src %>/scripts/*.js', '!<%= config.src %>/scripts/dojo/**', '!<%= config.src %>/scripts/syntaxhighlighter/**'],
				tasks: ['sync:scripts']
			},
			partials: {
				files: ['<%=config.src%>/_partials/**/*.ejs'],
				tasks: ['stylus', 'ejs', 'highlight', 'sync']
			}
		},

		clean: {
			dist: {
				src: ['<%=config.dest%>/*','!<%=config.dest%>/blog/**']
			}
		}
});

	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-highlight');
	grunt.loadNpmTasks('grunt-spawn');
	grunt.loadTasks('tasks');

	grunt.registerTask('docs',['ejs:docs', 'exec', 'spawn']);
	grunt.registerTask('delete', ['clean:dist'])

	grunt.registerTask('deploy', ['delete', 'stylus', 'sync', 'ejs', 'tutorials', 'highlight', 'docs']);
	grunt.registerTask('default', ['delete', 'stylus', 'sync', 'ejs', 'tutorials', 'highlight']);
	grunt.registerTask('develop', ['stylus', 'ejs', 'sync', 'highlight', 'tutorials', 'connect', 'watch']);
};
