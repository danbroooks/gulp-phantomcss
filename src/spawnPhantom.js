
var spawn = require('child_process').spawn;

module.exports = function (args){
    var opts = {
        stdio: 'inherit',
        cwd: process.cwd()
    };
    return spawn(require('phantomjs').path, args, opts);
};