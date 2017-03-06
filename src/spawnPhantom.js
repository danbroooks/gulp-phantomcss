var spawn = require('child_process').spawn;

module.exports = function (phantomPath) {
  return {
    spawn: function (script, args, flags) {
      var opts = {
        stdio: 'inherit',
        cwd: process.cwd()
      };
      var flagsList = (typeof flags === 'string')? [flags]: (flags || []);
      return spawn(phantomPath, flagsList.concat([script, JSON.stringify(args)]), opts);
    }
  };
};
