'use strict';

var _ = require('lodash');

var gulpPhantomCss = require('./src/gulp-phantomcss.js').configure({
    paths: require('./src/paths.js'),
    phantom: require('./src/spawnPhantom.js')
});

module.exports = function (opts) {

  if (_.isString(opts)) {
    var screenshotDir = opts;
    opts = {};
    opts.screenshots = screenshotDir;
  }

  return gulpPhantomCss.through(opts);
};
