"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (fileid) {
    (0, _invariant.default)(typeof fileid === "number", "`fileid` must be a number.");
    (0, _invariant.default)(fileid, "`fileid` is required.");
    return client.api("deletefile", {
      params: {
        fileid: fileid
      }
    }).then(function () {
      return true;
    });
  };
};

exports.default = _default;