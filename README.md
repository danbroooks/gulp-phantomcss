
# gulp-phantomcss-options

Run your phantomCSS tests with Gulp.  
This is a fork of gulp-phantomcss by Dan Brooks. It allows passing command line options to phantomJs.

## Installation
Uninstall global node installations of casperjs and phantomjs

`npm install gulp-phantomcss-options -D`

## Usage

```js
var gulp = require('gulp');
var phantomcss = require('gulp-phantomcss');
var settings = require('../settings/phantomcss.json'); // path to a config file

gulp.task('phantomcss', function (){
  gulp.src('./testsuite.js')
    .pipe(phantomcss({
            screenshotRoot: './phantomcss/screenshots',
            failedComparisonsRoot: './phantomcss/failures',
            comparisonResultRoot: './phantomcss/results',
            screenshots: './phantomcss/base',
            logLevel: 'error' // or: 'info', 'debug'
          },
          '--ignore-ssl-errors=true' // pass command line options
        ));
});
```

## More info
See https://github.com/danbroooks/gulp-phantomcss