var ejs = require('ejs');
var highlighter = require('highlight.js');
var marked = require('meta-marked');
var path = require('path');
var cheerio = require('cheerio');
var Entities = require('html-entities').XmlEntities;


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

	entities = new Entities();

	grunt.registerMultiTask('tutorials', 'Compile tutorials to HTML', function () {
		var //done = this.async(),
			self = this;
			//grunt.log.ok(path.relative(self.data.src, "./src"));

		var tutorials = {};

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


		function generateTutorials() {
			grunt.log.ok('Generating tutorials...');
			var names = grunt.file.expand({cwd: self.data.src}, ['**/**/*.md', '!**/**/README.md']);

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

				var src = path.join(self.data.src, name);
				self.data.options.root = path.relative(src, './');
				var dest = path.join(self.data.dest, path.dirname(name), 'index.html');

				grunt.log.ok('Converting: ' + name + ' -> ' + dest);

				grunt.file.copy(src, dest, {
					process: function (src) {
						try {
							var file = self.data.template;
							var templateData = Object.create(self.data.options);
							var rendered = marked(src);
							templateData.content = rendered.html;
							$ = cheerio.load(templateData.content);

							templateData.category = '';


							if(rendered.meta && rendered.meta.Category) {
								templateData.category = rendered.meta.Category;
							}

							templateData.title = entities.encode($('h2').first().text());
							templateData.description = entities.encode($('p').first().text());
							templateData.tutUrl = path.join('tutorials/', path.dirname(name), 'index.html');
							var category = templateData.category.replace(/\s/g, '-').toLowerCase().split(',');

							if(!tutorials[category]) {
								tutorials[category] = {
									title: templateData.category,
									titleId: category,
									data: []
								}
							}

							tutorials[category].data.push({
								title: templateData.title,
								description: templateData.description,
								tutUrl: templateData.tutUrl,
								category: templateData.category,
								cssClass: category
							});

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

			//done(true);
		}

		function generateIndex() {
			//Generate the index page.
			try {
				var file = self.data.indexTemplate;

				var tutorialOrder = [
					'getting-started',
					'modules',
					'dom-basics',
					'fundamentals',
					'widgets',
					'working-with-data',
					'mobile',
					'dojox/app'
				];

				// Hack to put the Hello Dojo tutorial first
				tutorials['getting-started'].data.forEach(function(tut, idx, arr) {
					if(tut.title == "Hello Dojo!") {
						var tmp = arr[0];
						arr[0] = arr[idx];
						arr[idx] = tmp;
					}
				});

				var templateData = {
					tutorials: tutorials,
					url: self.data.options.url,
					rev: self.data.options.rev,
					dojo: self.data.options.dojo,
					categoryOrder: tutorialOrder
				}


				var dest = path.join(self.data.indexDest, 'index.html');
				var html = ejs.compile(grunt.file.read(file), {filename: file})(templateData);
				grunt.file.write(dest, html);

			} catch (e) {
				grunt.log.error(e);
				grunt.fail.warn('EJS failed to compile.');
			}

		}

		generateTutorials();
		generateIndex();
	});
};