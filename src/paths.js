
var path = require('path');

var root = path.join(__dirname, '..');

var isWin = /^win/.test(process.platform);

var paths = {
  root: root,
  runnerjs: path.join(root, 'src', 'runner.js'),
  phantomjs: path.join(root, 'node_modules', '.bin', 'phantomjs'+(isWin ? ".cmd" : "")),
  phantomcss: path.join(root, 'bower_components', 'phantomcss')
};

paths.casper = path.join(paths.phantomcss, 'libs', 'casperjs');

var bin = {
  casper: path.join(paths.casper, 'bin')
};

paths.bin = bin;

module.exports = paths;
