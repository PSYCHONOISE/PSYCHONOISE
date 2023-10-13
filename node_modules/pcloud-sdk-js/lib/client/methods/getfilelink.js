"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../utils");

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (fileid) {
    return client.api("getfilelink", {
      params: {
        fileid: fileid,
        forcedownload: 1
      }
    }).then(function (ret) {
      return (0, _utils.pCloudUrl)(ret);
    });
  };
};

exports.default = _default;