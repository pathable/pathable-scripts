'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

var _jsdom = require('./jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint-disable global-require, import/no-dynamic-require */


(0, _jsdom2.default)();

var TAB = '  ';
var subDependencies = ['react-dom/server', 'react-dom/test-utils'];
var dependenciesToSkip = ['filepicker-js', 'node-sass', 'react-rnd'];

var exportTemplate = function exportTemplate(dependency) {
  var defaultTemplate = 'export { default } from \'' + dependency + '\';';
  var allModuleTemplate = 'export * from \'' + dependency + '\';\n';
  if ((0, _lodash2.default)(dependenciesToSkip, dependency)) {
    return defaultTemplate + '\n' + allModuleTemplate;
  }
  var module = require(_constants.vendorDir + '/node_modules/' + dependency);
  var submodules = '*';
  try {
    submodules = Object.keys(module);
    if (submodules.length === 0 || module.default) {
      return defaultTemplate + '\n' + allModuleTemplate;
    }
    submodules = submodules.join(',\n' + TAB);
  } catch (e) {
    return defaultTemplate + '\n' + allModuleTemplate;
  }
  var exportContent = '\n' + TAB + submodules + ',\n';
  var moduleTemplate = 'export {' + exportContent + '} from \'' + dependency + '\';\n';
  return defaultTemplate + '\n' + moduleTemplate;
};

var successExport = function successExport(dependency, dir) {
  _fsPromise2.default.writeFile(dir + '/.exported', '');
  // eslint-disable-next-line
  console.warn('\x1B[34mDependency exported: ' + dependency + '\x1B[0m');
};

exports.default = function () {
  var packageInfo = JSON.parse(_fs2.default.readFileSync(_constants.vendorDir + '/package.json', 'utf8'));
  var packageName = packageInfo.name;
  var dependencies = [].concat(subDependencies, _toConsumableArray(Object.keys(packageInfo.dependencies)));

  // eslint-disable-next-line
  console.warn('\x1B[32mExporting dependencies from ' + packageName + '...\x1B[0m');

  var works = [];
  dependencies.forEach(function (dependency) {
    var dir = _constants.vendorDir + '/' + dependency;
    if (!_fs2.default.existsSync(dir)) {
      _mkdirp2.default.sync(dir);
    }

    var shouldExport = true;
    if (shouldExport) {
      var exportContent = exportTemplate(dependency);
      var work = _fsPromise2.default.writeFile(dir + '/index.js', exportContent).then(function () {
        successExport(dependency, dir);
      }).catch(function (error) {
        throw new Error(error);
      });
      works.push(work);
    }
  });

  Promise.all(works).then(function () {
    // eslint-disable-next-line
    console.warn('\x1B[32mAll dependencies exported.\x1B[0m');
    // eslint-disable-next-line
    console.warn('\x1B[32mYou can use the dependencies from other apps or packages by using:\n`import [...] from \'meteor/' + packageName + '/[DEPENDENCY]\'`\x1B[0m');
  });
};