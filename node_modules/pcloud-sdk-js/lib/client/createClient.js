"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClient;

var _invariant = _interopRequireDefault(require("invariant"));

var _deepAssign = _interopRequireDefault(require("deep-assign"));

var _ApiMethod = _interopRequireDefault(require("../api/ApiMethod"));

var methods = _interopRequireWildcard(require("./methods"));

var _utils = require("../utils");

var defaultApiServer = "api.pcloud.com";

function createClient(token) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "oauth";
  var useProxy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  (0, _invariant.default)(["oauth", "pcloud"].indexOf(type) !== -1, "`type` must be either `oauth` or `pcloud`.");

  if (type === "oauth") {
    (0, _invariant.default)(typeof token === "string", "`token` is required.");
    (0, _invariant.default)(token.length, "`token` is required.");
  } // Local Params
  // apiServer, token, type


  function initialOptions(method) {
    var options = {
      params: {}
    };

    if ((0, _utils.isAuthMethod)(method) && token) {
      options.params["oauth" === type ? "access_token" : "auth"] = token;
    }

    return options;
  }

  function api(method) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var mergeOptions = (0, _deepAssign.default)({}, initialOptions(method), options);
    return (0, _ApiMethod.default)(method, mergeOptions).catch(function (error) {
      if (error.result === 500 && apiServer !== defaultApiServer) {
        // reset API server
        apiServer = defaultApiServer; // retry

        return api(method, options);
      } else {
        return Promise.reject(error);
      }
    });
  }

  function setupProxy() {
    return api("getapiserver", {}).then(function (response) {
      return apiServer = response.api[0];
    });
  }

  function setToken(newToken) {
    token = newToken;
  } // client api for end users


  var client = {
    api: api,
    setupProxy: setupProxy
  };
  var pcloudMethod;

  for (var method in methods) {
    if (Object.prototype.hasOwnProperty.call(methods, method)) {
      var baseMethod = methods[method];
      pcloudMethod = baseMethod({
        client: client,
        setToken: setToken,
        type: type
      });

      if (typeof pcloudMethod === "function") {
        client[method] = pcloudMethod;
      }
    }
  }

  if (useProxy) {
    setupProxy();
  }

  return client;
}