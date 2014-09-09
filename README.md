
# gulp-phantomcss

Run your phantomCSS tests with Gulp.

## Installation

`npm install gulp-phantomcss -D`

If casper isn't already installed, install that too!

`npm install -g casperjs`

## Useage

gulpfile.js

    var gulp = require('gulp');
    var phantomcss = require('gulp-phantomcss');

    gulp.task('phantomcss', function (){
      gulp.src('./testsuite.js')
        .pipe(phantomcss());
    });

testsuite.js

    casper.
      start( 'http://www.google.co.uk' ).
      then(function(){
        phantomcss.screenshot('#hplogo', 'google');
      });

    casper.run();


## Testing

Run tests with `npm test`
