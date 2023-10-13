"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (folderid, tofolderid) {
    (0, _invariant.default)(typeof folderid === "number", "`folderid` must be number.");
    (0, _invariant.default)(folderid !== 0, "`folderid` cannot be 0.");
    (0, _invariant.default)(tofolderid, "`tofolderid` is required.");
    return client.api("renamefolder", {
      params: {
        folderid: folderid,
        tofolderid: tofolderid
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};

exports.default = _default;