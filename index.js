'use strict';

var _ = require('lodash');

var paths = require('./src/paths.js');
var phantom = require('./src/spawnPhantom.js');

module.exports = function (opts) {
  return require('./src/gulp-phantomcss.js')
    .configure({
      paths: paths,
      phantom: phantom(paths.phantomjs).spawn
    })
    .through(opts);
};
