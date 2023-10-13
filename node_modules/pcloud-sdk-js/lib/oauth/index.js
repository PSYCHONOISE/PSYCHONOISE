"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(require("url"));

var _invariant = _interopRequireDefault(require("invariant"));

var _ApiMethod = _interopRequireDefault(require("../api/ApiMethod"));

var _functions = require("../utils/functions");

var protocol = "https";
var host = "my.pcloud.com";
var path = "/oauth2/authorize";

function buildOauthUrl(query) {
  return _url.default.format({
    protocol: protocol,
    hostname: host,
    pathname: path,
    query: query
  });
}

function initOauthToken(options) {
  var _options$client_id = options.client_id,
      client_id = _options$client_id === void 0 ? null : _options$client_id,
      _options$redirect_uri = options.redirect_uri,
      redirect_uri = _options$redirect_uri === void 0 ? null : _options$redirect_uri,
      _options$receiveToken = options.receiveToken,
      receiveToken = _options$receiveToken === void 0 ? null : _options$receiveToken,
      _options$response_typ = options.response_type,
      response_type = _options$response_typ === void 0 ? "token" : _options$response_typ;
  (0, _invariant.default)(client_id, "`client_id` is required.");
  (0, _invariant.default)(redirect_uri, "`redirect_uri` is required.");
  (0, _invariant.default)(receiveToken, "`receiveToken` is required.");
  var oauthUrl = buildOauthUrl({
    redirect_uri: redirect_uri,
    client_id: client_id,
    response_type: response_type
  });
  window.open(oauthUrl, "oauth", "width=680,height=700");

  window.__setPcloudToken = function (token, locationid) {
    receiveToken(token, locationid);
    delete window.__setPcloudToken;
  };
}

function initOauthPollToken(options) {
  var request_id = (0, _functions.generateRandomString)(40);
  var _options$client_id2 = options.client_id,
      client_id = _options$client_id2 === void 0 ? null : _options$client_id2,
      _options$receiveToken2 = options.receiveToken,
      receiveToken = _options$receiveToken2 === void 0 ? null : _options$receiveToken2,
      _options$onError = options.onError,
      onError = _options$onError === void 0 ? null : _options$onError;
  (0, _invariant.default)(client_id, "`client_id` is required.");
  (0, _invariant.default)(receiveToken, "`receiveToken` is required.");
  (0, _invariant.default)(onError, "`onError` is required.");
  var oauthUrl = buildOauthUrl({
    request_id: request_id,
    client_id: client_id,
    response_type: "poll_token"
  });
  window.open(oauthUrl, "", "width=680,height=700");
  (0, _ApiMethod.default)("oauth2_token", {
    apiServer: "eapi.pcloud.com",
    params: {
      client_id: client_id,
      request_id: request_id
    }
  }).then(function (res) {
    receiveToken(res.access_token, res.locationid);
  }).catch(function (err) {
    onError(err);
  });
  (0, _ApiMethod.default)("oauth2_token", {
    apiServer: "api.pcloud.com",
    params: {
      client_id: client_id,
      request_id: request_id
    }
  }).then(function (res) {
    receiveToken(res.access_token, res.locationid);
  }).catch(function (err) {
    onError(err);
  });
}

function popup() {
  var matchToken = location.hash.match(/access_token=([^&]+)/);
  var matchCode = location.search.match(/code=([^&]+)/);
  var locationIdMatch = location.hash.match(/locationid=([^&]+)/);
  var locationid = locationIdMatch ? locationIdMatch[1] : null;
  var token = matchToken ? matchToken[1] : matchCode ? matchCode[1] : null;

  if (token) {
    window.opener.__setPcloudToken(token, locationid);

    window.close();
  }
}

function getTokenFromCode(code, client_id, app_secret) {
  return (0, _ApiMethod.default)("oauth2_token", {
    params: {
      client_id: client_id,
      client_secret: app_secret,
      code: code
    }
  });
}

var _default = {
  initOauthToken: initOauthToken,
  initOauthPollToken: initOauthPollToken,
  popup: popup,
  getTokenFromCode: getTokenFromCode
};
exports.default = _default;