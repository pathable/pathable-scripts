'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtraPromise = require('fs-extra-promise');

var _fsExtraPromise2 = _interopRequireDefault(_fsExtraPromise);

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var excludedFolders = ['node_modules', 'scripts'];

exports.default = function () {
  var packageInfo = JSON.parse(_fs2.default.readFileSync(_constants.vendorDir + '/package.json', 'utf8'));
  var packageName = packageInfo.name;
  var dependencies = Object.keys(packageInfo.dependencies);

  // eslint-disable-next-line
  console.warn('\x1B[32mClearing unused dependencies exports from ' + packageName + '...\x1B[0m');

  var works = [];
  _fs2.default.readdir(_constants.vendorDir + '/', function (err, files) {
    if (err) throw new Error(err);

    files.forEach(function (file) {
      var filePath = _constants.vendorDir + '/' + file;
      if (_fs2.default.existsSync(filePath) && _fs2.default.statSync(filePath).isDirectory() && !(0, _lodash2.default)(excludedFolders, file) && _fs2.default.existsSync(filePath + '/.exported') && !(0, _lodash2.default)(dependencies, file)) {
        var work = _fsExtraPromise2.default.remove(filePath);
        works.push(work);
        // eslint-disable-next-line
        console.warn('\x1B[34mUnused dependency cleared: ' + file + '\x1B[0m');
      }
    });
  });

  Promise.all(works).then(function () {
    // eslint-disable-next-line
    console.warn('\x1B[32mUnused dependencies exports cleared.\x1B[0m');
  });
};