module.exports = function(grunt){

	var roadmap = {};

	roadmap.packages = grunt.file.readJSON('./src/community/roadmap/packages.json').packages;

	roadmap.counts = {
	    total: roadmap.packages.length,
	    planning: 0,
	    dev: 0,
	    complete: 0
	};

	roadmap.packages.forEach(function(pkg) {
	    switch(pkg.status) {
	        case 'planning':
					roadmap.counts.planning++;
	                break;

	        case 'dev':
	            	roadmap.counts.dev++;
	            	break;

	        case 'complete':
					roadmap.counts.complete++;
	            	break;
	    }
	});

	return roadmap;
}