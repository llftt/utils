import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/* eslint-disable no-empty-function */
var ProxyPromise = /*#__PURE__*/function () {
  function ProxyPromise() {
    _classCallCheck(this, ProxyPromise);

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


  _createClass(ProxyPromise, [{
    key: "resolve",
    value: function resolve(value) {}
    /** @param {*=} reason */

  }, {
    key: "reject",
    value: function reject(reason) {}
  }]);

  return ProxyPromise;
}();

export { ProxyPromise as default };