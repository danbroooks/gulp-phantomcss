
var _ = require('lodash');
var path = require('path');
var through = require('through2');

var plugin = {};

plugin.configure = function(config) {
  this.paths = config.paths;
  this.phantom = config.phantom;
  return this;
};

plugin.through = function(args){
  args = _.extend({
    screenshots: 'screenshots',
    results: 'results',
    viewportSize: [1280, 800],
    logLevel: 'error'
  }, args || {});

  args.phantomCSSPath = this.paths.phantomcss;
  var phantom = this.phantom;

  var stream = through.obj(function(file, enc, cb) {
    var test = path.resolve(file.path);

    phantom([ paths.runnerjs, JSON.stringify(opts) ])
      .on('exit', function(){
          cb(null, file);
      });
  });
};

module.exports = plugin;
