"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var client = _ref.client;
  return function (fileid, filename) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var getfilelink = client.getfilelink,
        download = client.download;
    return getfilelink(fileid).then(download(filename, options));
  };
};

exports.default = _default;