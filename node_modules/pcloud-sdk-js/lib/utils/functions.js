"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmail = isEmail;
exports.fileext = fileext;
exports.formatSize = formatSize;
exports.uniqueNumber = uniqueNumber;
exports.randomNumber = randomNumber;
exports.methodStringify = methodStringify;
exports.pCloudUrl = pCloudUrl;
exports.generateRandomString = generateRandomString;

function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\s".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function fileext(filename) {
  return filename.split(".").pop();
}

function formatSize(sizebytes, prec) {
  if (prec === undefined) {
    prec = 1;
  }

  sizebytes = parseInt(sizebytes, 10);

  if (sizebytes >= 1099511627776) {
    return (sizebytes / 1099511627776).toFixed(prec) + " Tb";
  } else if (sizebytes >= 1073741824) {
    return (sizebytes / 1073741824).toFixed(prec) + " Gb";
  } else if (sizebytes >= 1048576) {
    return (sizebytes / 1048576).toFixed(prec) + " Mb";
  } else if (sizebytes >= 1024) {
    return (sizebytes / 1024).toFixed(prec) + " Kb";
  } else {
    return sizebytes.toFixed(prec) + " B";
  }
}

var start = 0;

function uniqueNumber() {
  return ++start;
}

function randomNumber() {
  var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  return Math.random() * (10 << chars);
}

function methodStringify(method, params) {
  return JSON.stringify({
    method: method,
    params: params
  });
}

function pCloudUrl(data) {
  return "https://" + data.hosts[0] + data.path;
}

function generateRandomString(length) {
  var strArr = [];
  var base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    strArr.push(base[Math.floor(Math.random() * 100)]);
  }

  return strArr.join("");
}