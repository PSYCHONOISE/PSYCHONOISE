"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _default = function _default(_ref) {
  var client = _ref.client;
  return function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var parentfolderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    (0, _invariant.default)(name.length, "`name` for is required");
    (0, _invariant.default)(typeof name === "string", "`name` is required and be a string.");
    (0, _invariant.default)(typeof parentfolderid === "number", "`parentfolderid` is required.");
    return client.api("createfolder", {
      params: {
        name: name,
        folderid: parentfolderid
      }
    }).then(function (response) {
      return response.metadata;
    });
  };
};

exports.default = _default;