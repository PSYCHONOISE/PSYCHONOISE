"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCache;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var defaultExpiry = 30;

function createCache() {
  var cacheObj = {};

  function cacheid(name) {
    var cacheid = name;
    var n = 0;

    if (arguments.length > 1 && (0, _typeof2.default)(arguments[1]) === "object") {
      for (n in arguments[1]) {
        if (Object.prototype.hasOwnProperty.call(arguments[1], n)) {
          cacheid += "-" + n + ":" + arguments[1][n];
        }
      }
    } else {
      for (n = 1; n < arguments.length; ++n) {
        if (Object.prototype.hasOwnProperty.call(arguments, n)) {
          cacheid += "-" + arguments[n];
        }
      }
    }

    return cacheid;
  }

  function get(key) {
    clean();

    if (has(key)) {
      return cacheObj[key].data;
    }

    return false;
  }

  function has(key) {
    return key in cacheObj && cacheObj[key].expiry > Date.now();
  }

  function getOrSet(key, val) {
    var expiry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultExpiry;

    if (!has(key)) {
      set(key, val, expiry);
    }

    return get(key);
  }

  function set(key, val) {
    var expiry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultExpiry;
    cacheObj[key] = {
      expiry: Date.now() + expiry * 1000,
      data: val
    };
  }

  function expire(key) {
    if (key in cacheObj) {
      delete cacheObj[key];
    }
  }

  function expireMatch(q) {
    var key;

    for (key in cacheObj) {
      if (key.match(q)) {
        expire(key);
      }
    }
  }

  function clean() {
    for (var n in cacheObj) {
      if (cacheObj[n].expiry < Date.now()) {
        delete cacheObj[n];
      }
    }
  }

  function cleanAll() {
    cacheObj = {};
  }

  return {
    cacheid: cacheid,
    has: has,
    get: get,
    set: set,
    getOrSet: getOrSet,
    expire: expire,
    expireMatch: expireMatch,
    clean: clean,
    cleanAll: cleanAll
  };
}
/*
function debug(): CacheStore {
  return cacheObj;
}
*/