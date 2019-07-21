'use strict';

var _ = require('lodash');

var paths = require('./src/paths.js');
var phantom = require('./src/spawnPhantom.js');
/**
 * module 'gulp-phantomcss'
 * @param  {object} opts    Object of options passed to PhantomCSS: {screenshotRoot: '', ...}
 * @param  {array}  flags 	Array of command-line options passed to PhantomJS: ['--debug=true', ...], see: http://phantomjs.org/api/command-line.html
 */
module.exports = function (opts, flags) {
  return require('./src/gulp-phantomcss.js')
    .configure({
      paths: paths,
      phantom: phantom(paths.phantomjs).spawn
    })
    .through(opts, flags);
};
