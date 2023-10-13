"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var permissionsMap = {
  view: 0,
  edit: 7
};

var _default = function _default(_ref) {
  var client = _ref.client,
      type = _ref.type;
  return function (folderid, userid, clientid) {
    var access = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "view";
    (0, _invariant.default)(type === "pcloud", "This method supports only clients of type `pcloud`.");
    (0, _invariant.default)(typeof folderid === "number", "`folderid` must be number.");
    (0, _invariant.default)(folderid !== 0, "`folderid` cannot be 0.");
    (0, _invariant.default)(["view", "edit"].indexOf(access) != -1, "`permissions` can be either `view` or `edit`.");
    (0, _invariant.default)(userid, "`userid` is required.");
    (0, _invariant.default)(typeof userid === "number", "`userid` is required.");
    (0, _invariant.default)(parseInt(userid), "`userid` must be either number or a valid mail address.");
    (0, _invariant.default)(clientid, "`clientid` is required");
    (0, _invariant.default)(typeof clientid === "string", "`clientid` is required");
    return client.api("sharefolder", {
      params: {
        folderid: folderid,
        permissions: permissionsMap[access],
        userid: userid,
        client_id: clientid
      }
    }).then(function () {
      return true;
    });
  };
};

exports.default = _default;