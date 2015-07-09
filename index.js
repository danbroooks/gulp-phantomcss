'use strict';

var _ = require('lodash');

var paths = require('./src/paths.js');
var phantom = require('./src/spawnPhantom.js');

module.exports = function (opts) {

  if (_.isString(opts)) {
    var screenshotDir = opts;
    opts = {};
    opts.screenshots = screenshotDir;
  }

  return require('./src/gulp-phantomcss.js')
    .configure({
      paths: paths,
      phantom: phantom(paths.phantomjs).spawn
    })
    .through(opts);
};
