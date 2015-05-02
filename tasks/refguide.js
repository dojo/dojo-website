var ejs = require('ejs');
var path = require('path');

/* global module:false*/
module.exports = function (grunt) {

	/**
	 * Custom task to generate reference-guide
	 *
	 **/
	grunt.registerMultiTask('refguide', 'Compile reference-guide to HTML', function () {
		var done = this.async(),
			self = this;

		function generateGuide(ver) {
			grunt.util.spawn({
			  cmd: 'sphinx-build',
			  args: ['-b', 'html', '-D', 'release="'+ver+'"', '-a', '-c', self.data.src, path.join(self.data.src, ver), path.join(self.data.dest, ver) ],
			  opts: {stdio: 'inherit'}
			}, function done() {
			  grunt.log.ok('reference-guide '+ver+' created');
			  done(true);
			});
		}

		for(var i=0; i<= self.data.versions.length; i++) {
			generateGuide(self.data.versions[i]);
		}

		/*self.data.versions.forEach(function(ver){
			generateGuide(ver);
		});*/
	});
};