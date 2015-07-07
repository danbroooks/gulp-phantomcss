'use strict';

var _ = require('lodash');
var path = require('path');
var through = require('through2');

var paths = require('./src/paths.js');
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

  opts.phantomCSSPath = paths.phantomcss;
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
        paths.runnerjs,
        JSON.stringify(opts)
      ])
      .on('exit', function(){
        running--;
        if (running === 0) { cb(); }
      });
    });
  });

};
