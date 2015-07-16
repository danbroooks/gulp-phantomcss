var _ = require('lodash');
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports.configure = function(config) {
  this.paths = config.paths;
  this.phantom = config.phantom;
  return this;
};

module.exports.through = function(args) {
  args = _.extend({
    screenshots: 'screenshots',
    results: 'results',
    viewportSize: [1280, 800],
    logLevel: 'error'
  }, args || {});

  args.paths = this.paths;
  var phantom = this.phantom;
  var error = 0;

  function endStream(file, cb) {
    if (args.breakOnError && error > 0) {
      return this.emit('error', new PluginError(
          'gulp-phantomcss', 'Some tests have failed.'
      ));
    }
    this.emit('end');
  }

  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      return this.emit('error', new PluginError(
          'gulp-phantomcss',  'Streaming not supported'
      ));
    }
    args.test = path.resolve(file.path);

    phantom(args.paths.runnerjs, args)
      .on('exit', function(fail) {
        if (fail) {
          error++;
        }
        cb(null, file);
      });
  }, endStream);
  return stream;
};
