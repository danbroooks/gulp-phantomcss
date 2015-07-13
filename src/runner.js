// from https://github.com/chrisgladd/grunt-phantomcss

var fs = require('fs');
var s = fs.separator;

// Parse arguments passed in
var args = JSON.parse(phantom.args[0]);
var paths = args.paths;

var viewportSize = {
  width: args.viewportSize[0],
  height: args.viewportSize[1]
};

// Messages are sent to the parent by appending them to the tempfile
var sendMessage = function() {
  fs.write(args.tempFile, JSON.stringify(Array.prototype.slice.call(arguments)) + '\n', 'a');
};

// Initialise CasperJs
var phantomCSSPath = paths.phantomcss;
phantom.casperPath = paths.casper;
phantom.injectJs(paths.bin.casper+s+'bootstrap.js');
phantom.casperTest = true; // fix for CasperError: casper.test property is only available using the `casperjs test` command in Casper 1.1


var casper = require('casper').create({
  viewportSize: viewportSize,
  logLevel: args.logLevel,
  verbose: true
});

// Require and initialise PhantomCSS module
var phantomcss = require(phantomCSSPath+s+'phantomcss.js');

phantomcss.init({
  screenshotRoot: args.screenshots,
  failedComparisonsRoot: args.failures,
  libraryRoot: phantomCSSPath, // Give absolute path, otherwise PhantomCSS fails

  onFail: function(test) {
    sendMessage('onFail', test);
  },
  onPass: function(test) {
    sendMessage('onPass', test);
  },
  onTimeout: function(test) {
    sendMessage('onTimeout', test);
  },
  onComplete: function(allTests, noOfFails, noOfErrors) {
    sendMessage('onComplete', allTests, noOfFails, noOfErrors);
  }
});

// Run the test scenario
require(args.test);

// End tests and compare screenshots
casper.then(function() {
  phantomcss.compareSession();
})
.then(function() {
  casper.test.done();
})
.run(function() {
  phantom.exit();
});