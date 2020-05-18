"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/* eslint-disable no-empty-function */
var ProxyPromise = /*#__PURE__*/function () {
  function ProxyPromise() {
    (0, _classCallCheck2["default"])(this, ProxyPromise);
    var resolvePromise;
    var rejectPromise;
    var promise = new Promise(function (resolve, reject) {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    var publicPromise = promise;
    publicPromise.resolve = resolvePromise;
    publicPromise.reject = rejectPromise;
    return publicPromise;
  }
  /** @param {T=} value */


  (0, _createClass2["default"])(ProxyPromise, [{
    key: "resolve",
    value: function resolve(value) {}
    /** @param {*=} reason */

  }, {
    key: "reject",
    value: function reject(reason) {}
  }]);
  return ProxyPromise;
}();

exports["default"] = ProxyPromise;