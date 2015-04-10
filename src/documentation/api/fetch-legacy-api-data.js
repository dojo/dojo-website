var sys = require('sys'),
  exec = require('child_process').exec,
  targz = require('tar.gz'),
  fsExtra = require('fs-extra'),
  path = require('path'),
  config = require('../../../config.js')();

console.log('Fetching old API documentation...');
fsExtra.remove(path.join(config.src, 'documentation/api/_tmp'), function () {
  exec('git clone https://github.com/lbod/dojo-site-api.git ' + path.join(config.src, 'documentation/api/_tmp'),
    function (error, stdout, stderr) {
      new targz().extract(
        path.join(config.src, 'documentation/api/_tmp/legacyhtml.tar.gz'),
        path.join(config.src, 'documentation/api'), function () {
          fsExtra.remove(path.join(config.src, 'documentation/api/_tmp'), function () {}); 
          console.log('Fetching old API documentation...DONE.');
        });
  });
});