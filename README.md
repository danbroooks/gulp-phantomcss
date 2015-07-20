
# gulp-phantomcss

Run your phantomCSS tests with Gulp.

## Installation

`npm install gulp-phantomcss -D`

If casper isn't already installed, install that too!

`npm install -g casperjs`

## Usage

```js
var gulp = require('gulp');
var phantomcss = require('gulp-phantomcss');

gulp.task('phantomcss', function (){
  gulp.src('./testsuite.js')
    .pipe(phantomcss());
});
```

Example ./testsuite.js :

```js
casper.
  start( 'http://www.google.co.uk' ).
  then(function(){
    phantomcss.screenshot('#hplogo', 'google');
  });

casper.run();
```

### Options

Options passed in to the plugin will be forwarded on to phantomcss, these include:

#### options.screenshotRoot

Type: `String`

Default: `'screenshots'`

Directory where screenshot test fixtures are stored.

#### options.comparisonResultRoot

Type: `String`

Default: `'results'`

Directory where source, diff and failure screenshots are stored.

#### options.breakOnError

Type: `boolean`

Default: `false`

If true, gulp task will exit with error code if there are any failing tests.

The following options passed in to the plugin will be forwarded on to casperjs, these include:

#### options.viewportSize

Type: `Array`

Default: `[1280, 800]`

Viewport size to run the test in. Useful for running tests for multiple window sizes.

#### options.logLevel

Type: `String`

Default: `'error'`

Log level for CasperJS, see [CasperJS: Logging](http://casperjs.readthedocs.org/en/latest/logging.html) for more information.

## Testing

Run tests with `npm test`
