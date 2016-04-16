
var path = require('path');

var root = path.join(__dirname, '..');

var isWin = /^win/.test(process.platform);

var paths = {
    root: root,
    runnerjs: path.join(root, 'src', 'runner.js'),
    phantomjs: path.join(root, 'node_modules', '.bin', 'phantomjs' + (isWin ? ".cmd" : "")),
    phantomcss: path.join(root, 'node_modules', 'phantomcss')
};

paths.casper = path.join(paths.phantomcss, 'node_modules', 'casperjs');

var bin = {
    casper: path.join(paths.casper, 'bin')
};

paths.bin = bin;

module.exports = paths;
