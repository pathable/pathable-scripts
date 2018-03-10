'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _exportVendor = require('./export-vendor');

var _exportVendor2 = _interopRequireDefault(_exportVendor);

var _cleanVendor = require('./clean-vendor');

var _cleanVendor2 = _interopRequireDefault(_cleanVendor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1').command('export-vendor').action(_exportVendor2.default);

_commander2.default.version('0.0.1').command('clean-vendor').action(_cleanVendor2.default);

_commander2.default.parse(process.argv);