var path = require('path');
var through2Concurrent = require('through2-concurrent');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var _ = require('lodash');

module.exports.configure = function (config) {
  this.paths = config.paths;
  this.phantom = config.phantom;
  return this;
};

module.exports.through = function (args, flags) {

  if (_.isString(args)) {
    args = { screenshots: args };
  }

  args = _.extend({
    screenshots: 'screenshots',
    results: 'results',
    viewportSize: [1280, 800],
    logLevel: 'error'
  }, args || {});

  args.paths = this.paths;
  var phantom = this.phantom;
  var error = 0;

  function transform(file, enc, callback) {
    if (file.isStream()) {
      return this.emit('error', new PluginError(
        'gulp-phantomcss', 'Streaming not supported'
      ));
    }

    args.test = path.resolve(file.path);

    phantom(args.paths.runnerjs, args, flags)
      .on('exit', function (fail) {
        if (fail) {
          error++;
        }
        callback(null, file);
      });
  }

  function flush() {
    if (args.breakOnError && error > 0) {
      return this.emit('error', new PluginError(
        'gulp-phantomcss', 'Some tests have failed.'
      ));
    }
    this.emit('end');
  }

  return through2Concurrent.obj({maxConcurrency: 10}, transform, flush);
};
