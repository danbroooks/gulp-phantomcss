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

// Initialise CasperJs
var phantomCSSPath = paths.phantomcss;
phantom.casperPath = paths.casper;
phantom.injectJs(paths.bin.casper + s + 'bootstrap.js');
phantom.casperTest = true; // fix for CasperError: casper.test property is only available using the `casperjs test` command in Casper 1.1

var casper = require('casper').create({
  viewportSize: viewportSize,
  logLevel: args.logLevel,
  verbose: true
});

// Require and initialise PhantomCSS module
var phantomcss = require(phantomCSSPath + s + 'phantomcss.js');
var addLabelToFailedImage = false;
var rebase = false;
var cleanupComparisonImages = false;
var comparisonResultRoot;
var mismatchTolerance = 0.05;
var hideElements;
var outputSettings;
var now = new Date();
var date = now.toDateString();
var reportName = date.replace(/\s/g, "-");
var fail = false; // Flag for failing tests

// Create report file if reportsRoot set in options
var sendResult = function(result, test) {
  if (args.reportsRoot) {
    fs.write(args.reportsRoot + s + reportName + '.txt', JSON.stringify(test) + ',');
  }
  console.log('[' + result + '] ' + JSON.stringify(test));
};

var onFail = function(test) {
  sendResult('Fail', test);
  fail = true;
};

var onPass = function(test) {
  sendResult('Pass', test);
};

var onNewImage = function(test) {
  console.log('[NEW IMAGE] ' + test.filename);
};

var onTimeout = function(test) {
  console.log('[TIMEOUT] ' + test.filename);
};

var onComplete = function(allTests, noOfFails, noOfErrors) {};

phantomcss.init({
  screenshotRoot: args.screenshots || args.screenshotRoot,
  failedComparisonsRoot: args.failures || args.failedComparisonsRoot,
  libraryRoot: args.libraryRoot || phantomCSSPath, // Give absolute path, otherwise PhantomCSS fails
  addLabelToFailedImage: args.addLabelToFailedImage || addLabelToFailedImage,
  comparisonResultRoot: args.comparisonResultRoot || args.results || comparisonResultRoot,
  rebase: args.rebase || rebase,
  cleanupComparisonImages: args.cleanupComparisonImages || cleanupComparisonImages,
  mismatchTolerance: args.mismatchTolerance || mismatchTolerance,
  outputSettings: args.outputSettings || outputSettings,
  hideElements: args.hideElements || hideElements,
  onPass: args.onPass || onPass,
  onFail: args.onFail || onFail,
  onTimeout: args.onTimeout || onTimeout,
  onComplete: args.onComplete || onComplete

});

if (args.turnOffAnimations) {
  phantomcss.turnOffAnimations();
}

// Run the test scenario
require(args.test);

// End tests and compare screenshots
casper.then(function() {
    phantomcss.compareSession();
  })
  .then(function() {
    casper.test.done();
  })
  .then(function() {
    if (fail) {
      phantom.exit(1);
    } else {
      phantom.exit(0);
    }
  });
