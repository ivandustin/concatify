// Generated by CoffeeScript 1.6.3
(function() {
  var configfile, cwd, file, files, fs, getFilesSync, isAll, path, pile, processFileSync, processed, removeStar, _i, _j, _len, _len1, _ref;

  fs = require('fs');

  cwd = process.cwd();

  configfile = require(cwd + '/concatify.json');

  pile = "";

  processed = [];

  processFileSync = function(filename) {
    var contents, isProcessed;
    isProcessed = processed.indexOf(filename) === -1 ? false : true;
    if (isProcessed) {
      return false;
    }
    contents = fs.readFileSync(filename);
    pile += contents;
    processed.push(filename);
    return true;
  };

  isAll = function(path) {
    if (path.substr(-2, path.length) === '/*') {
      return true;
    }
    return false;
  };

  getFilesSync = function(dir) {
    var file, filenames, files, stat, _i, _len;
    filenames = [];
    files = fs.readdirSync(dir);
    files = files.map(function(file) {
      return dir + '/' + file;
    });
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      stat = fs.statSync(file);
      if (stat.isFile()) {
        filenames.push(file);
      }
    }
    return filenames;
  };

  removeStar = function(path) {
    if (!isAll(path)) {
      return path;
    }
    return path.substring(0, path.length - 2);
  };

  _ref = configfile.paths;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    path = _ref[_i];
    path = cwd + '/' + path;
    if (isAll(path)) {
      path = removeStar(path);
      files = getFilesSync(path);
      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
        file = files[_j];
        processFileSync(file);
      }
    } else {
      file = path;
      processFileSync(file);
    }
  }

  fs.writeFileSync(configfile.filename, pile);

}).call(this);
