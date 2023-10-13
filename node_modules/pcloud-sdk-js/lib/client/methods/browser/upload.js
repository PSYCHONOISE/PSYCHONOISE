"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _invariant = _interopRequireDefault(require("invariant"));

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (file) {
    var folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _invariant.default)(file, "`file` is required.");
    (0, _invariant.default)((0, _typeof2.default)(file) === "object", "`file` of type File must be supplied.");
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
    }).then(function (_ref2) {
      var metadata = _ref2.metadata,
          checksums = _ref2.checksums;
      var response = {
        metadata: metadata[0],
        checksums: checksums[0]
      };
      onFinish && onFinish(response);
      return response;
    });
  };
};

exports.default = _default;