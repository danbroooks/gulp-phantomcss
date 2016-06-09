var path = require('path');
var fs = require('fs');

var root = path.join(__dirname, '..');
var parentNodeModules = path.join(root, '..');
var rootNodeModules = path.join(root, 'node_modules');

var currentNodeModules;
try {
  if (fs.lstatSync(path.join(rootNodeModules, 'phantomcss')).isDirectory()) {
    currentNodeModules = rootNodeModules;
  }
} catch (e) {
  currentNodeModules = parentNodeModules;
}

var phantomjs = require('phantomjs-prebuilt');
var phantomjsBinPath = phantomjs.path;

var paths = {
  root: root,
  runnerjs: path.join(root, 'src', 'runner.js'),
  phantomjs: phantomjsBinPath,
  phantomcss: path.join(currentNodeModules, 'phantomcss'),
  casper: path.join(currentNodeModules, 'casperjs')
};

var bin = {
  casper: path.join(paths.casper, 'bin')
};

paths.bin = bin;

module.exports = paths;
