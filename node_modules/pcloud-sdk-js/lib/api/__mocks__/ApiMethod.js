"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.one = one;
exports.text = text;
exports.success = success;
exports.error = error;
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Mock for api/method
 *
 * Exports the actual mock (apiMethod) as default and:
 *  on(match: (method, options) => boolean, respond: (method, params) => data, onFire?: () => void)
 *  one: same as on, but handler is removed upon first usage
 *
 * helpers that enhance response for use in the respond function
 * success(data: mixed) => success api payload
 * error(result: number, error: string) => error api payload
 * httpError(code: number, error: string) => network error payload
 *
 */
var handlers = []; // $FlowExpectError

var _default = jest.fn(function (method, options) {
  var promised = null;

  var _iterator = _createForOfIteratorHelper(handlers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2.default)(_step.value, 3),
          match = _step$value[0],
          respond = _step$value[1],
          onFire = _step$value[2];

      if (match(method, options)) {
        promised = respond(method, options);

        if (onFire) {
          onFire(method, options);
        }

        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (promised === null) {
    throw new Error("No route found for: ".concat(method, ". Handlers: ").concat(handlers.length, " "));
  }

  return promised;
});

exports.default = _default;

function on(match, respond, onFire) {
  handlers.push([match, respond, onFire]);
}

function one(match, respond, onFire) {
  var me = [function () {
    var isMatch = match.apply(null, arguments);

    if (isMatch) {
      handlers.splice(handlers.indexOf(me), 1);
    }

    return isMatch;
  }, respond, onFire];
  handlers.push(me);
}

function text(data) {
  return function () {
    return Promise.resolve(data);
  };
}

function success(data) {
  return function () {
    data.result = 0;
    return Promise.resolve(data);
  };
}

function error(result, error) {
  return function (method, options) {
    var errorObj = {
      result: result,
      error: error
    };

    if (options.onError) {
      options.onError(errorObj);
    }

    return Promise.reject(errorObj);
  };
}