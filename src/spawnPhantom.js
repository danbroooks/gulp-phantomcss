
var spawn = require('child_process').spawn;

module.exports = function (phantomPath) {

  return {

    spawn: function (script, args) {
      var opts = {
        stdio: 'inherit',
        cwd: process.cwd()
      };

      return spawn(phantomPath, [script, JSON.stringify(args)], opts);
    }

  };

};
