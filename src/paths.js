
var path = require('path');

var paths = {};

paths.root = path.join(__dirname, '..');

paths.runnerjs = path.join(paths.root, 'src', 'runner.js');
paths.phantomcss = path.join(paths.root, 'node_modules', 'phantomcss');

module.exports = paths;
