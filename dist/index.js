"use strict";

require("babel-polyfill");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var criticalCSSParser = require('critical-css-parser');

var inline = require('inline-critical');

var fs = require('fs');

var path = require('path');

var DEFAULTS = {
  base: 'dist/',
  src: 'index.html',
  target: 'index-critical.html',
  inlineGoogleFonts: true,
  minify: true,
  ignoreStylesheets: [/bootstrap/],
  whitelist: /#foo|\.bar/
};
/**
 * Inline critical CSS
 * @param  {object} options Options
 * @return {Promise<true>} Result success
 */

function criticalCSSInliner(_x) {
  return _criticalCSSInliner.apply(this, arguments);
}

function _criticalCSSInliner() {
  _criticalCSSInliner = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(options) {
    var props, css, html, inlined;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            props = _objectSpread({}, DEFAULTS, options);
            _context.next = 3;
            return criticalCSSParser({
              type: 'localServer',
              entrypoint: props.base,
              filename: props.src,
              enableGoogleFonts: props.inlineGoogleFonts,
              minify: props.minify,
              whitelist: props.whitelist
            });

          case 3:
            css = _context.sent;
            html = fs.readFileSync(path.resolve(props.base, props.src), 'utf8');
            inlined = inline(html, css.critical, {
              extract: true,
              basePath: props.base,
              minify: props.minify,
              ignore: props.ignoreStylesheets
            });
            fs.writeFileSync(path.resolve(props.base, props.target), inlined, 'utf8');
            return _context.abrupt("return", true);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _criticalCSSInliner.apply(this, arguments);
}

module.exports = criticalCSSInliner;