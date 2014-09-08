'use strict';

var gutil = require('gulp-util');
var through = require('through2');

var path = require('path');
var phantomBinary = require('phantomjs').path;
var runnerPath = path.join(__dirname, '..', 'phantomjs', 'runner.js');
var phantomCSSPath = path.join(__dirname, '..', 'bower_components', 'phantomcss');

module.exports = function (options) {
  if (!options) throw new gutil.PluginError('gulp-phantomcss', 'Missing options');

  if (typeof options === 'string') {
    var configFile = options;
    options = {
      configFile: configFile
    };
  }

        // exec('phpunit <%= file.path %>')

  return through.obj(function (file, enc, cb) {
    console.log('first');
    cb(null, file);
  }, function(cb) {
    console.log('second');
  });

};
