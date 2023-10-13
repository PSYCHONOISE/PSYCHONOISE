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
  return function (urls) {
    var folderid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _invariant.default)(urls, "`file` is required.");
    (0, _invariant.default)(typeof urls === "string", "`file` must be supplied");
    var onBegin = options.onBegin,
        onProgress = options.onProgress,
        onFinish = options.onFinish;
    var progressId = "pcloud-sdk-remote-" + (0, _utils.uniqueNumber)() + "-" + (0, _utils.randomNumber)();
    var progressTimeout;

    var progress = function progress(apiServer) {
      pollProgress(apiServer);
      progressTimeout = setTimeout(function () {
        return progress(apiServer);
      }, 200);
    };

    var stopProgress = function stopProgress() {
      if (progressTimeout) {
        clearTimeout(progressTimeout);
      }
    };

    var pollProgress = function pollProgress(apiServer) {
      client.api("uploadprogress", {
        params: {
          progresshash: progressId,
          apiServer: apiServer
        }
      }).then(function (_ref2) {
        var files = _ref2.files;
        return onProgress && onProgress(calculateProgress(files));
      }).catch(function (_ref3) {
        var result = _ref3.result,
            error = _ref3.error;

        if (result === 1900) {
          onProgress && onProgress(calculateProgress());
        }

        console.log(error);
      });
    };

    onBegin && onBegin();
    return client.api("currentserver").then(function (_ref4) {
      var hostname = _ref4.hostname;
      var promise = client.api("downloadfile", {
        method: "post",
        params: {
          folderid: folderid,
          progresshash: progressId,
          nopartial: 1,
          url: urls,
          apiServer: hostname
        }
      });
      progress(hostname);
      return promise;
    }).then(function (_ref5) {
      var metadata = _ref5.metadata;
      stopProgress();
      onFinish && onFinish({
        metadata: metadata[0]
      });
      return {
        metadata: metadata[0]
      };
    }).catch(function (err) {
      stopProgress();
      console.log("Error", err);
    });
  };
};

exports.default = _default;

var calculateProgress = function calculateProgress() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    all: {
      downloaded: files.reduce(function (n, _ref6) {
        var _ref6$downloaded = _ref6.downloaded,
            downloaded = _ref6$downloaded === void 0 ? 0 : _ref6$downloaded;
        return n + downloaded;
      }, 0),
      size: files.reduce(function (n, _ref7) {
        var _ref7$size = _ref7.size,
            size = _ref7$size === void 0 ? 0 : _ref7$size;
        return n + size;
      }, 0)
    },
    files: files
  };
};