'use strict';

var _ = require('lodash');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');

var runnerjs = path.join(__dirname, 'runner.js');
var phantomcss = path.join(__dirname, 'node_modules', 'phantomcss');

var spawnPhantom = require('./src/spawnPhantom.js');

module.exports = function (opts) {

  if (_.isString(opts)) {
    var screenshotDir = opts;
    opts = {};
    opts.screenshots = screenshotDir;
  }

  opts = _.extend({
    screenshots: 'screenshots',
    results: 'results',
    viewportSize: [1280, 800],
    logLevel: 'error'
  }, opts || {});

  opts.phantomCSSPath = phantomcss;
  var tests = [];

  return through.obj(function (file, enc, cb) {
    tests.push( path.resolve(file.path) );
    cb(null, file);
  }, function(cb){
    var running = 0;
    tests.forEach(function(test) {
      opts.test = test;
      running++;

      spawnPhantom([
        runnerjs,
        JSON.stringify(opts)
      ])
      .on('exit', function(){
        running--;
        if (running === 0) { cb(); }
      });
    });
  });

};
