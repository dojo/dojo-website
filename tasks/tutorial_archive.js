var ejs = require('ejs');
var highlighter = require('highlight.js');
var path = require('path');
var fs = require('fs');


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
	grunt.registerMultiTask('tutorial_archive', 'Compile old archived tutorials to HTML', function () {
		var //done = this.async(),
			self = this;


		function generateIndex(ver) {
			var tutorialData = [];
			var order = require(path.join('../',self.data.src, ver, '/tutorialOrder.js'))(grunt);

			order.forEach(function(sect, idx){
				tutorialData[idx] = {
					title: sect.category,
					titleId: '',
					data: []
				};

				sect.tutorials.forEach(function(tut){

					var fileBase = path.join('./',self.data.src, ver, tut);
					var meta = grunt.file.readJSON(path.join(fileBase, '/meta.json'));

					tutorialData[idx].data.push({
						folderName: tut,
						meta: meta,
						description: grunt.file.read(path.join(fileBase, '/summary.html')),
						content: grunt.file.read(path.join(fileBase, '/tutorial.html')),
						tutUrl: path.join(self.data.options.url.docs, 'tutorials',ver,tut,'/index.html'),
						title: meta.title,
						cssClass:'',
						category:'',
						rev: self.data.options.rev,
						dojo: self.data.options.dojo,
						url: self.data.options.url,
						dojoVersion: meta.dojoVersion
					});
				});
			});

			var file = self.data.indexTemplate;
			var dest = path.join(self.data.indexDest, ver, 'index.html');

			var templateData = {
				url: self.data.options.url,
				rev: self.data.options.rev,
				dojo: self.data.options.dojo,
				tutorials: tutorialData,
				ver: ver
			};

			var comp = ejs.compile(grunt.file.read(file), {filename: file})(templateData);

			grunt.file.write(dest, comp);

			generateTutorials(ver, tutorialData)
		}

		function generateTutorials(ver, tutorials) {
			grunt.log.ok('Generating archived tutorials...');
			//var names = grunt.file.expand({cwd: self.data.src}, ['**/**/tutorial.html']);

			// copy tutorial support files
			grunt.file.expand({
				cwd: path.join(self.data.src, ver),
				filter: 'isFile'
			}, ['**', '!**/**/tutorial.html']).forEach(function (file) {
				var src = path.join(self.data.src, ver, file);
				var dest = path.join(self.data.dest, ver, file);
				grunt.file.copy(src, dest);
			});


			// Copy each file from the source to the destination,
			// parsing the markdown of each tutorial and rendering
			// inside a tutorial template specified via the task config

			var file = self.data.template;


			tutorials.forEach(function(cat) {
				cat.data.forEach(function(tutData) {
					var comp = ejs.compile(grunt.file.read(file), {filename: file})(tutData);
					var dest = path.join(self.data.dest, ver, tutData.folderName, 'index.html');
					grunt.file.write(dest, comp);
					grunt.log.ok('Created: '+ dest);
				});
			});


		}

		self.data.versions.forEach(function(ver) {
			generateIndex(ver);
			//done(true);
		});
	});
};