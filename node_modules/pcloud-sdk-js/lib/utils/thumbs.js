"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createParser;
exports.THUMB_URL = exports.THUMB_LINEID = exports.THUMB_SIZE = exports.THUMB_RESULT = exports.THUMB_FILEID = void 0;
var THUMB_FILEID = 0;
exports.THUMB_FILEID = THUMB_FILEID;
var THUMB_RESULT = 1;
exports.THUMB_RESULT = THUMB_RESULT;
var THUMB_SIZE = 2;
exports.THUMB_SIZE = THUMB_SIZE;
var THUMB_LINEID = 2;
exports.THUMB_LINEID = THUMB_LINEID;
var THUMB_URL = 3;
exports.THUMB_URL = THUMB_URL;

function createParser() {
  var lastLinePos = 0;
  var thumbs = [];
  var nextLinePos;
  return function (text) {
    var setThumbs = []; // eslint-disable-next-line no-constant-condition

    while (1) {
      nextLinePos = text.indexOf("\n", lastLinePos + 1);

      if (nextLinePos === -1) {
        break;
      }

      var _parseLines = parseLines(text.substr(lastLinePos, nextLinePos - lastLinePos)),
          result = _parseLines.result,
          size = _parseLines.size,
          url = _parseLines.url,
          fileid = _parseLines.fileid;

      lastLinePos = nextLinePos;

      if (result === 6001) {
        url = thumbs[parseInt(size, 10)].url;
        result = 0;
      }

      if (result === 0) {
        var thumb = {
          url: url,
          fileid: fileid
        };
        thumbs.push(thumb);
        setThumbs.push(thumb);
      }
    }

    return setThumbs;
  };
}

function parseLines(line) {
  var obj = line.split("|");
  return {
    result: parseInt(obj[THUMB_RESULT], 10),
    url: THUMB_URL in obj ? obj[THUMB_URL].trim() : "",
    fileid: parseInt(obj[THUMB_FILEID], 10),
    size: obj[THUMB_SIZE]
  };
}