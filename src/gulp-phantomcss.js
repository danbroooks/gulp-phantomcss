
var _ = require('lodash');
var path = require('path');
var through = require('through2');

module.exports.configure = function(config) {
  this.paths = config.paths;
  this.phantom = config.phantom;
  return this;
};

module.exports.through = function(args){
  args = _.extend({
    screenshots: 'screenshots',
    results: 'results',
    viewportSize: [1280, 800],
    logLevel: 'error'
  }, args || {});

  args.paths = this.paths;
  var phantom = this.phantom;

  var stream = through.obj(function(file, enc, cb) {
    args.test = path.resolve(file.path);

    phantom(args.paths.runnerjs, args)
      .on('exit', function(){
          cb(null, file);
      });
  });

  return stream;
};
