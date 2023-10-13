"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiRequest = _interopRequireDefault(require("../../../api/ApiRequest"));

var _default = function _default() {
  return function (filename) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (url) {
      var onBegin = options.onBegin,
          _onProgress = options.onProgress,
          onFinish = options.onFinish;
      onBegin && onBegin();
      return (0, _ApiRequest.default)(url, {
        type: "arraybuffer",
        onProgress: function onProgress(progress) {
          if (progress.direction === "download") {
            if (options.onProgress) {
              _onProgress && _onProgress(progress);
            }
          }
        }
      }).then(function (data) {
        if (options.onFinish) {
          onFinish && onFinish(data);
        }

        return data;
      });
    };
  };
};

exports.default = _default;