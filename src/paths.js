
var path = require('path');

var root = path.join(__dirname, '..');

var phantomjs = require('phantomjs-prebuilt');
var phantomjsBinPath = phantomjs.path;

//var isWin = /^win/.test(process.platform);
console.log('Hammer: ' + phantomjsBinPath);
var paths = {
    root: root,
    runnerjs: path.join(root, 'src', 'runner.js'),
    phantomjs: phantomjsBinPath,
    phantomcss: path.join(root, 'node_modules', 'phantomcss'),
    phantomcssModule: require.resolve('phantomcss')
};
console.log('yoyo'+paths.phantomcssModule);
paths.casper = path.join(paths.phantomcss, 'node_modules', 'casperjs');

var bin = {
    casper: path.join(paths.casper, 'bin')
};

paths.bin = bin;

module.exports = paths;
