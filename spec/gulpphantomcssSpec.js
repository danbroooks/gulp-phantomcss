'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');

function validFile() {
  return {
    isStream: () => false,
    path: ''
  };
}

describe("gulp-phantomcss", function () {

  var through = { obj: sinon.stub() };

  var phantomcss = proxyquire('../src/gulp-phantomcss', {
    'through2-concurrent': through
  });

  var runnerPath = '/path/to/runner';

  phantomcss.configure({
    phantom: () => undefined,
    paths: { runnerjs: runnerPath }
  });

  beforeEach(function () {
    spyOn(phantomcss, 'phantom').and.returnValue({ on: () => true });
  });

  it('should run use argument as value for \'screenshots\' when passed in a string value', function () {
    var screenshotPath = '/a/path/for/screenshots';
    phantomcss.through(screenshotPath);
    through.obj.yield(validFile());

    expect(phantomcss.phantom).toHaveBeenCalledWith(
      runnerPath,
      jasmine.objectContaining({ screenshots: screenshotPath })
    );
  });
});
