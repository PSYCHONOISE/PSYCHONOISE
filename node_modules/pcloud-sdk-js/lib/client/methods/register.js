"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("../../utils");

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (email, password) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _invariant.default)(typeof email === "string" && (0, _utils.isEmail)(email), "`email` must be provided.");
    (0, _invariant.default)(password, "`password` is required.");
    (0, _invariant.default)(password.length, "`password` is required.");
    var params = {
      mail: email,
      password: password,
      getauth: 1,
      logout: 1,
      termsaccepted: "yes"
    };

    if (options.invite) {
      params.invite = options.invite;
    }

    if (options.ref) {
      params.ref = options.ref;
    }

    if (ENV === "web") {
      params.os = 4;
      params.device = navigator.userAgent;
    }

    return client.api("register", {
      params: params
    }).then(function (response) {
      return response.userid;
    });
  };
};

exports.default = _default;