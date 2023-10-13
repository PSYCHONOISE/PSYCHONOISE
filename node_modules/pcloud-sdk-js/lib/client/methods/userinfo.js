"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var client = _ref.client;
  return function () {
    return client.api("userinfo");
  };
};

exports.default = _default;