"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ApiMethod;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _url = _interopRequireDefault(require("url"));

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("../utils");

var _ApiRequest = _interopRequireDefault(require("./ApiRequest"));

var defaultApiServer = "eapi.pcloud.com";
var locations = {
  1: "api.pcloud.com",
  2: "eapi.pcloud.com"
};

function ApiMethod(method) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$apiServer = options.apiServer,
      apiServer = _options$apiServer === void 0 ? defaultApiServer : _options$apiServer,
      _options$apiProtocol = options.apiProtocol,
      apiProtocol = _options$apiProtocol === void 0 ? "https" : _options$apiProtocol,
      _options$params = options.params,
      params = _options$params === void 0 ? {} : _options$params,
      requestParams = (0, _objectWithoutProperties2.default)(options, ["apiServer", "apiProtocol", "params"]);
  (0, _invariant.default)((0, _utils.isApiMethod)(method), "Method `" + method + "` is not pCloud API method.");
  (0, _invariant.default)(!(0, _utils.isAuthMethod)(method) || "auth" in params || "access_token" in params || "username" in params, "`auth` must be present for methods that require authentication.");

  var requestUrl = _url.default.format({
    protocol: apiProtocol,
    host: locations[locationid] || apiServer,
    pathname: method,
    query: params
  });

  if (requestParams.responseType === undefined) {
    requestParams.responseType = "json";
  }

  return (0, _ApiRequest.default)(requestUrl, requestParams).then(function (response) {
    if (requestParams.responseType === "json") {
      if (response.result !== 0) {
        return Promise.reject(response);
      }
    }

    return response;
  });
}