"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (fileid, toname) {
    (0, _invariant.default)(typeof fileid === "number", "`fileid` must be number.");
    (0, _invariant.default)(fileid !== 0, "`fileid` cannot be 0.");
    (0, _invariant.default)(toname, "`toname` is required.");
    (0, _invariant.default)(toname.length, "`toname` is required.");
    return client.api("renamefile", {
      params: {
        fileid: fileid,
        toname: toname
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};

exports.default = _default;