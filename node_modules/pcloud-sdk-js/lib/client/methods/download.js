"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiRequest = _interopRequireDefault(require("../../api/ApiRequest"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _default = function _default() {
  return function (filename) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (url) {
      if (options.onBegin) {
        options.onBegin();
      }

      return (0, _ApiRequest.default)(url, {
        type: "arraybuffer",
        pipe: _fs.default.createWriteStream(filename),
        onProgress: function onProgress(progress) {
          if (progress.direction === "download") {
            if (options.onProgress) {
              options.onProgress(progress);
            }
          }
        }
      }).then(function () {
        var file = {
          path: filename,
          name: _path.default.basename(filename),
          size: _fs.default.statSync(filename).size
        };

        if (options.onFinish) {
          options.onFinish(file);
        }

        return file;
      });
    };
  };
};

exports.default = _default;