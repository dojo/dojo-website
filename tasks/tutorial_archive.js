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
	grunt.registerMultiTask('tutorial_archive', 'Compile 1.6-1.9 tutorials to HTML', function () {
		var done = this.async(),
			self = this;
			//grunt.log.ok(path.relative(self.data.src, "./src"));


		function generateTutorials() {
			grunt.log.ok('Generating tutorials...');
			var names = grunt.file.expand({cwd: self.data.src}, ['**/**/tutorial.html']);

			// copy tutorial support files
			grunt.file.expand({
				cwd: self.data.src,
				filter: 'isFile'
			}, ['**', '!**/**/tutorial.html']).forEach(function (file) {
				var src = path.join(self.data.src, file);
				var dest = path.join(self.data.dest, file);
				grunt.file.copy(src, dest);
			});


			// Copy each file from the source to the destination,
			// parsing the markdown of each tutorial and rendering
			// inside a tutorial template specified via the task config
			names.forEach(function (name) {

				var src = path.join(self.data.src, name);
				var meta = grunt.file.readJSON(path.join(self.data.src, path.dirname(name), 'meta.json'));
				var summary = grunt.file.read(path.join(self.data.src, path.dirname(name), 'summary.html'));
				var dest = path.join(self.data.dest, path.dirname(name), 'index.html');

				//console.log(meta);
				grunt.log.ok('Converting: ' + name + ' -> ' + dest);

				var file = self.data.template;
				var templateData = Object.create(self.data.options);
				templateData.title = meta.title;
				templateData.dojoVersion = meta.dojoVersion;
				templateData.summary = summary;
				templateData.content = grunt.file.read(src);
				var comp = ejs.compile(grunt.file.read(file), {filename: file})(templateData);

				grunt.file.write(dest, comp);
			});


			// tell everyone we are done
			grunt.log.ok('Created ' + names.length + ' files.');

			done(true);
		}

		generateTutorials();
	});
};