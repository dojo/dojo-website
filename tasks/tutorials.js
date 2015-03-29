var ejs = require('ejs');
var highlighter = require('highlight.js');
var marked = require('marked');
var path = require('path');

/* global module:false*/
module.exports = function (grunt) {

	/**
	 * Custom task to generate tutorials or documentation
	 *
	 *	tutorials: {
	 *		all: {
	 *			src: 'src/tutorials/',
	 *			dest: 'dist/tutorials/',
	 *			template: 'src/templates/tutorial.ejs'
	 *		}
	 *	}
	 *
	 **/
	grunt.registerMultiTask('tutorials', 'Compile tutorials to HTML', function () {
		var done = this.async(),
			self = this;
			//grunt.log.ok(path.relative(self.data.src, "./src"));


		marked.setOptions({
			gfm: true,
			anchors: true,
			base: '/',
			pedantic: false,
			sanitize: false,
			highlight: function (code, lang) {
				if (!lang) { return code; }
				var langMap = {
					js: 'javascript',
					shell: 'bash',
					html: 'xml'
				};
				if (lang in langMap) { lang = langMap[lang]; }
				try {
					return highlighter.highlight(lang, code).value;
				} catch (error) {
					grunt.log.error('[lang: %s] %s', lang, error.message);
					return 'ERROR';
				}
			}
		});


		function generate() {
			grunt.log.ok(self.data.src);
			grunt.log.ok('Generating tutorials...');

			// We assume that any top-level markdown file is a tutorial.
			// We record disabled tutorials to hide those from the menu
			var names = grunt.file.expand({cwd: self.data.src}, ['**/**/*.md', '!**/**/README.md']);
			var tutorials = names.map(function (name) {
					return {
						title: name.replace(/_/g, ' ').replace('.md', '').replace(/^\d+-/, ''),
						filename: name.replace('.md', '').replace(/^\d+-/, '') + '.html',
						disabled: name.indexOf('disabled') > -1
					};
				});

			// copy tutorial support files
			grunt.file.expand({
				cwd: self.data.src,
				filter: 'isFile'
			}, ['**', '!**/*.md']).forEach(function (file) {
				var src = path.join(self.data.src, file);
				var dest = path.join(self.data.dest, file);
				grunt.file.copy(src, dest);
			});

			// Copy each file from the source to the destination,
			// parsing the markdown of each tutorial and rendering
			// inside a tutorial template specified via the task config
			names.forEach(function (name) {
				grunt.log.ok(self.data.dest + name);
				var src = path.join(self.data.src, name);
				self.data.options.root = path.relative(src, './');
				var dest = path.join(self.data.dest, path.dirname(name), 'index.html');
				//console.log(self.data.options.root);
				//console.log(src);
				console.log(dest);

				grunt.file.copy(src, dest, {
					process: function (src) {
						try {
							var file = self.data.template;

							var templateData = Object.create(self.data.options);
							templateData.content = marked(src);
							templateData.tutorials = tutorials;
							templateData.title = name.replace(/_/g, ' ').replace('.md', '').replace(/^\d+-/, '');

							return ejs.compile(grunt.file.read(file), {filename: file})(templateData);
						} catch (e) {
							grunt.log.error(e);
							grunt.fail.warn('EJS failed to compile.');
						}
					}
				});
			});

			// tell everyone we are done
			grunt.log.ok('Created ' + names.length + ' files.');

			done(true);
		}

		generate();
	});
};