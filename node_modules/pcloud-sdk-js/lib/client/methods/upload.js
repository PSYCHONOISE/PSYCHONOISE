"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (file) {
    var folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _invariant.default)(file, "`file` is required.");
    (0, _invariant.default)(typeof file === "string", "`file` must be supplied");
    (0, _invariant.default)(require("fs").existsSync(file), "File: ".concat(file, " is not accessible."));
    var onBegin = options.onBegin,
        _onProgress = options.onProgress,
        onFinish = options.onFinish;
    onBegin && onBegin();
    return client.api("uploadfile", {
      method: "post",
      params: {
        folderid: folderid,
        nopartial: 1
      },
      files: [{
        file: file
      }],
      onProgress: function onProgress(progress) {
        if (progress.direction === "upload") {
          _onProgress && _onProgress(progress);
        }
      }
    }).then(function (response) {
      var ret = apiResponseToReturn(response);
      onFinish && onFinish(ret);
      return ret;
    });
  };
};

exports.default = _default;

function apiResponseToReturn(_ref2) {
  var metadata = _ref2.metadata,
      checksums = _ref2.checksums;
  return {
    metadata: metadata[0],
    checksums: checksums[0]
  };
}