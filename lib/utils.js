"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Utils = /*#__PURE__*/function () {
  function Utils() {
    (0, _classCallCheck2["default"])(this, Utils);
  }

  (0, _createClass2["default"])(Utils, null, [{
    key: "parseDate",

    /**
    * Parses an XML date string.
    * @param {string} dateString
    * @return {?number} The parsed date in seconds on success; otherwise, return
    *   null.
    */
    value: function parseDate(dateString) {
      if (!dateString) {
        return null;
      } // Times in the manifest should be in UTC. If they don't specify a timezone,
      // Date.parse() will use the local timezone instead of UTC.  So manually add
      // the timezone if missing ('Z' indicates the UTC timezone).
      // Format: YYYY-MM-DDThh:mm:ss.ssssss


      if (/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(dateString)) {
        // eslint-disable-next-line no-param-reassign
        dateString += 'Z';
      }

      var result = Date.parse(dateString);
      return !isNaN(result) ? Math.floor(result / 1000.0) : null;
    }
  }, {
    key: "parseDuration",
    value: function parseDuration(durationString) {
      if (!durationString) {
        return null;
      }

      var re = '^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?' + '(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$';
      var matches = new RegExp(re).exec(durationString);

      if (!matches) {
        return null;
      } // Note: Number(null) == 0 but Number(undefined) == NaN.


      var years = Number(matches[1] || null);
      var months = Number(matches[2] || null);
      var days = Number(matches[3] || null);
      var hours = Number(matches[4] || null);
      var minutes = Number(matches[5] || null);
      var seconds = Number(matches[6] || null); // Assume a year always has 365 days and a month always has 30 days.

      var d = 60 * 60 * 24 * 365 * years + 60 * 60 * 24 * 30 * months + 60 * 60 * 24 * days + 60 * 60 * hours + 60 * minutes + seconds;
      return isFinite(d) ? d : null;
    }
  }, {
    key: "parseRange",
    value: function parseRange(rangeString) {
      var matches = /([0-9]+)-([0-9]+)/.exec(rangeString);

      if (!matches) {
        return null;
      }

      var start = Number(matches[1]);

      if (!isFinite(start)) {
        return null;
      }

      var end = Number(matches[2]);

      if (!isFinite(end)) {
        return null;
      }

      return {
        start: start,
        end: end
      };
    }
  }]);
  return Utils;
}();

exports["default"] = Utils;