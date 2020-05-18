import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/** @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var XmlUtils = /*#__PURE__*/function () {
  function XmlUtils() {
    _classCallCheck(this, XmlUtils);
  }

  _createClass(XmlUtils, null, [{
    key: "findChild",
    value: function findChild(elem, name) {
      var children = XmlUtils.findChildren(elem, name);

      if (children.length !== 1) {
        return null;
      }

      return children[0];
    }
  }, {
    key: "findChildNS",
    value: function findChildNS(elem, ns, name) {
      var children = XmlUtils.findChildrenNS(elem, ns, name);

      if (children.length !== 1) {
        return null;
      }

      return children[0];
    }
  }, {
    key: "findChildren",
    value: function findChildren(elem, name) {
      return Array.from(elem.childNodes).filter(function (child) {
        return child instanceof Element && child.tagName === name;
      });
    }
  }, {
    key: "findChildrenNS",
    value: function findChildrenNS(elem, ns, name) {
      return Array.from(elem.childNodes).filter(function (child) {
        return child instanceof Element && child.localName === name && child.namespaceURI === ns;
      });
    }
  }, {
    key: "getAttributeNS",
    value: function getAttributeNS(elem, ns, name) {
      return elem.hasAttributeNS(ns, name) ? elem.getAttributeNS(ns, name) : null;
    }
  }, {
    key: "getContents",
    value: function getContents(elem) {
      var isText = function isText(child) {
        return child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE;
      };

      if (!Array.from(elem.childNodes).every(isText)) {
        return null;
      } // Read merged text content from all text nodes.


      return elem.textContent.trim();
    }
  }, {
    key: "parseAttr",
    value: function parseAttr(elem, name, parseFunction) {
      var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var parsedValue = null;
      var value = elem.getAttribute(name);

      if (value != null) {
        parsedValue = parseFunction(value);
      }

      return parsedValue == null ? defaultValue : parsedValue;
    }
  }, {
    key: "parseInt",
    value: function parseInt(intString) {
      var n = Number(intString);
      return n % 1 === 0 ? n : null;
    }
  }, {
    key: "parsePositiveInt",
    value: function parsePositiveInt(intString) {
      var n = Number(intString);
      return n % 1 === 0 && n > 0 ? n : null;
    }
  }, {
    key: "parseNonNegativeInt",
    value: function parseNonNegativeInt(intString) {
      var n = Number(intString);
      return n % 1 === 0 && n >= 0 ? n : null;
    }
  }, {
    key: "parseFloat",
    value: function parseFloat(floatString) {
      var n = Number(floatString);
      return !isNaN(n) ? n : null;
    }
  }, {
    key: "evalDivision",
    value: function evalDivision(exprString) {
      var res;
      var n;

      if (res = exprString.match(/^(\d+)\/(\d+)$/)) {
        n = Number(res[1]) / Number(res[2]);
      } else {
        n = Number(exprString);
      }

      return !isNaN(n) ? n : null;
    }
  }, {
    key: "parseXmlString",
    value: function parseXmlString(xmlString, expectedRootElemName) {
      var parser = new DOMParser();
      var rootElem = null;
      var xml = null;

      try {
        xml = parser.parseFromString(xmlString, 'text/xml');
      } catch (exception) {}

      if (xml) {
        // The top-level element in the loaded xml should have the
        // same type as the element linking.
        if (xml.documentElement.tagName === expectedRootElemName) {
          rootElem = xml.documentElement;
        }
      }

      if (rootElem && rootElem.getElementsByTagName('parsererror').length > 0) {
        return null;
      } // It had a parser error in it.


      return rootElem;
    }
  }, {
    key: "parseXml",
    value: function parseXml(xmlString, expectedRootElemName) {
      try {
        return XmlUtils.parseXmlString(xmlString, expectedRootElemName);
      } catch (exception) {
        return null;
      }
    }
  }]);

  return XmlUtils;
}();

export { XmlUtils as default };