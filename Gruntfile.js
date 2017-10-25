/* jshint node: true */
var path = require('path');
var marked = require('marked');

module.exports = function (grunt) {

	// Build config variables
	var config = require('./config.js')(grunt);


	var ejsOptions = {
		dojo: config.dojo,
		url: config.urls,
		rev: Date.now(),
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
				template: '<%= config.src %>/documentation/tutorials/templates/tutorial.ejs',
				indexTemplate: '<%= config.src %>/documentation/index.ejs',
				indexDest: '<%= config.dest %>/documentation/'
			}
		},

		tutorial_archive: {
			all: {
				options: ejsOptions,
				versions: ['1.6','1.7','1.8','1.9'],
				src: '<%= config.src %>/documentation/tutorials/',
				dest: '<%= config.dest %>/documentation/tutorials/',
				template: '<%= config.src %>/documentation/tutorials/templates/tutorial_archive.ejs',
				indexTemplate: '<%= config.src %>/documentation/tutorials/templates/tutorial_archive_index.ejs',
				indexDest: '<%= config.dest %>/documentation/tutorials/'
			}
		},

		// Compile the Reference Guide and API docs
		exec: {
			guide: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -D release="1.10" -D html_static_path="1.10/_static" -a -c ./ ./1.10 ../../../<%= config.dest %>/reference-guide/1.10'
			},
			guide19: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -D release="1.9" -D html_static_path="1.9/_static" -a -c ./ ./1.9/ ../../../<%= config.dest %>/reference-guide/1.9'
			},
			guide18: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -D release="1.8" -D html_static_path="1.8/_static" -a -c ./ ./1.8/ ../../../<%= config.dest %>/reference-guide/1.8'
			},
			guide17: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -D release="1.7" -D html_static_path="1.7/_static" -a -c ./ ./1.7/ ../../../<%= config.dest %>/reference-guide/1.7'
			},
			guide16: {
				cwd: '<%= config.src %>/documentation/reference-guide',
				cmd: 'sphinx-build -b html -D release="1.6" -D html_static_path="1.6/_static" -a -c ./ ./1.6/ ../../../<%= config.dest %>/reference-guide/1.6'
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
				src: ['index.ejs', 'license.ejs', 'community/**/*.ejs', 'download/**/*.ejs'],
				dest: config.dest,
				expand: true,
				ext: '.html'
			},

			//Docs need to have partials compiled to HTML first
			docs: {
				options: ejsOptions,
				cwd: '<%= config.src %>/_partials',
				src: ['header.ejs', 'footer.ejs', 'favicons.ejs'],
				dest: '<%= config.src %>/_partials/tmp',
				expand: true,
				ext: '.html'
			}
		},

		highlight: {
		    task: {
		      options: {},
		      files: {'<%= config.dest %>/download/index.html':['<%= config.dest %>/download/index.html']}
			}
		},

		stylus: {
			compile: {
		    	options: {
					'include css': true,
					compress:true,
				},
				files: {
					'<%= config.dest %>/css/index.css': '<%= config.src %>/css/index.styl',
					'<%= config.dest %>/css/api.css': '<%= config.src %>/css/views/api.styl',
					'<%= config.dest %>/css/guide.css': '<%= config.src %>/css/views/guide.styl',
					'<%= config.dest %>/css/blog.css' : '<%= config.src %>/css/views/blog.styl',
					'<%= config.dest %>/css/tutorial_archive.css' : '<%= config.src %>/css/views/tutorial_archive.styl'
				}
			},
		},

		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: '<%= config.dest %>/css',
		      src: ['*.css'],
		      dest: '<%= config.dest %>/css',
		      ext: '.css'
		    }],
		    verbose: true
		  },
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
			assets: {
				files: [
					{
						cwd: '<%=config.src%>',
						src: ['images/**', 'css/images/**'],
						dest: '<%=config.dest%>',
						expand: true,
					},
					{
						cwd: '<%=config.src%>/documentation/reference-guide/',
						src: ['.htaccess'],
						dest: '<%=config.dest%>/reference-guide/'
					},
					{
						cwd: '<%=config.src%>/documentation/api/',
						src: ['.htaccess'],
						dest: '<%=config.dest%>/api/'
					},
					{
						cwd: '<%=config.src%>/css/fonts/icomoon_icons/fonts',
						src: ['*'],
						dest: '<%=config.dest%>/css/fonts',
						expand: true,
					},
					{
						cwd: '<%=config.src%>/css/fonts/icomoon_trusted/fonts',
						src: ['*'],
						dest: '<%=config.dest%>/css/fonts',
						expand: true,
					}
				],
				verbose: true
			},

			scripts: {
				files: [
					{
						cwd: config.src,
						src: ['scripts/**', '!scripts/dojo/**/*'],
						dest: config.dest,
						expand: true,
					},
					{
						cwd: '<%=config.src %>/scripts/dojo/release',
						src: ['**/*', '!build-report.txt'],
						dest: '<%=config.dest %>/scripts/dojo',
						expand: true,
					}
				],
				verbose: true
			},

			apiArchive: {
				files: [
					{
						cwd: '<%=config.src%>/documentation/api',
						src: ['1.3/**/*', '1.4/**/*', '1.5/**/*', '1.6/**/*', '1.7/**/*'],
						dest: '<%=config.dest%>/api',
						expand: true,
					}
				],
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
						src: ['header.html', 'footer.html', 'favicons.html'],
						dest: '<%= config.dest %>/blog/wp-content/themes/dtk/inc'
					}
				],
				verbose: true
			},
		},

		watch: {
			ejs: {
				files: ['<%= config.src %>/**/*.ejs',
						'<%= config.src %>/community/**/*.ejs',
						'<%= config.src %>/documentation/tutorials/**/*.md',
						'!<%= config.src %>/images/**/*',
						'!**/*/tutorial_archive.ejs',
						'!<%= config.src %>/_templates/tutorial_archive_index.ejs',
						'!<%= config.src %>/**/README.md'],
				tasks: ['ejs', 'tutorials', 'highlight']
			},

			tutorial_archive: {
				files: ['<%= config.src %>/_templates/tutorial_archive.ejs'],
				tasks: ['tutorial_archive']
			},

			blog: {
				files: ['<%= config.src %>/blog/dtk/**/*', '<%= config.src %>_partials/**/*.ejs'],
				tasks: ['sync:blog']
			},
			stylus: {
				files: ['<%= config.src %>/**/*.styl', '!<%= config.src %>/vendor/**'],
				tasks: ['css']
			},
			js: {
				files: ['<%= config.src %>/scripts/**/*.js', '<%= config.src %>/scripts/*.js', '!<%= config.src %>/scripts/dojo/**', '!<%= config.src %>/scripts/syntaxhighlighter/**'],
				tasks: ['sync:scripts']
			}
		},

		clean: {
			dist: {
				src: ['<%=config.dest%>/*', '<%=config.dest%>/blog/wp-content/themes/dtk/**/*','!<%=config.dest%>/blog/**']
			}
		}
});

	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-highlight');
	grunt.loadNpmTasks('grunt-spawn');

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['develop']);
	grunt.registerTask('api', ['spawn']);
	grunt.registerTask('guide', ['ejs:docs','exec']);
	grunt.registerTask('docs',['ejs:docs', 'exec', 'spawn', 'sync:apiArchive', 'tutorials', 'tutorial_archive']);
	grunt.registerTask('up', ['css', 'ejs', 'highlight','sync', 'tutorials', 'tutorial_archive']);
	grunt.registerTask('css', ['stylus', 'cssmin', 'sync:assets']);
	grunt.registerTask('delete', ['clean:dist'])
	grunt.registerTask('deploy', ['delete', 'css', 'sync', 'ejs', 'tutorials', 'tutorial_archive', 'highlight', 'docs']);
	grunt.registerTask('develop', ['css', 'ejs', 'sync', 'highlight', 'tutorials', 'tutorial_archive', 'connect', 'watch']);

};
