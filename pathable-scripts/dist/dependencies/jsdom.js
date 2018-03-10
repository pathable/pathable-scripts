'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var doc = _jsdom2.default.jsdom('<!doctype html><html><body></body></html>');
  global.document = doc;
  global.window = doc.defaultView;
  global.navigator = doc.defaultView.navigator;
  global.HTMLElement = window.HTMLElement;

  window.matchMedia = window.matchMedia || function matchMedia() {
    return {
      matches: false,
      addListener: function addListener() {},
      removeListener: function removeListener() {}
    };
  };
};