
var path = require('path');

var root = path.join(__dirname, '..');

var phantomjs = require('phantomjs-prebuilt');
var phantomjsBinPath = phantomjs.path;

var getInstalledPath = require('get-installed-path');

var paths = {
    root: root,
    runnerjs: path.join(root, 'src', 'runner.js'),
    phantomjs: phantomjsBinPath,
    phantomcss: getInstalledPath('phantomcss', true)//path.join(root, 'node_modules', 'phantomcss')
};

paths.casper = getInstalledPath('casperjs', true);//path.join(paths.phantomcss, 'node_modules', 'casperjs');

var bin = {
    casper: path.join(paths.casper, 'bin')
};

paths.bin = bin;

module.exports = paths;