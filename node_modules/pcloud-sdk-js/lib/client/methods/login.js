"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("../../utils");

var _default = function _default(_ref) {
  var client = _ref.client,
      setToken = _ref.setToken;
  return function (email, password) {
    (0, _invariant.default)(typeof email === "string" && (0, _utils.isEmail)(email), "`email` must be provided.");
    (0, _invariant.default)(password, "`password` is required.");
    (0, _invariant.default)(password.length, "`password` is required.");
    return client.api("userinfo", {
      params: {
        username: email,
        password: password,
        getauth: 1,
        logout: 1
      }
    }).then(function (_ref2) {
      var auth = _ref2.auth;
      setToken(auth);
      return auth;
    });
  };
};

exports.default = _default;