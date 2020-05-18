"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Xml2Json = /*#__PURE__*/function () {
  function Xml2Json() {
    (0, _classCallCheck2["default"])(this, Xml2Json);
  }

  (0, _createClass2["default"])(Xml2Json, null, [{
    key: "parse",
    value: function parse(xmlDocStr) {
      var xmlDoc = Xml2Json.parseXmlString(xmlDocStr);

      if (xmlDoc != null) {
        return Xml2Json.parseDOMChildren(xmlDoc);
      } else {
        return null;
      }
    }
  }, {
    key: "parseXmlString",
    value: function parseXmlString(xmlDocStr) {
      if (xmlDocStr === undefined) {
        return null;
      }

      var xmlDoc;
      var parser = new window.DOMParser(); //IE9+ 不需要处理IE10以下

      try {
        xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml');

        if (xmlDoc.getElementsByTagNameNS('*', 'parsererror').length > 0) {
          xmlDoc = null;
        }
      } catch (err) {
        xmlDoc = null;
      }

      return xmlDoc;
    }
  }, {
    key: "parseDOMChildren",
    value: function parseDOMChildren(node, path) {
      if (node.nodeType === Node.DOCUMENT_NODE) {
        var result = {};
        var nodeChildren = node.childNodes; // Alternative for firstElementChild which is not supported in some environments

        for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
          var child = nodeChildren[cidx];

          if (child.nodeType === Node.ELEMENT_NODE) {
            result = Xml2Json.parseDOMChildren(child);
          }
        }

        return result;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        var _result = {};
        _result.__cnt = 0;
        var children = [];
        var _nodeChildren = node.childNodes; // Children nodes

        for (var _cidx = 0; _cidx < _nodeChildren.length; _cidx++) {
          var _child = _nodeChildren[_cidx];
          var childName = Xml2Json.getNodeLocalName(_child);

          if (_child.nodeType !== Node.COMMENT_NODE) {
            var childPath = path + '.' + childName;
            _result.__cnt++;

            if (_result[childName] == null) {
              var c = Xml2Json.parseDOMChildren(_child, childPath);

              if (childName !== '#text' || /[^\s]/.test(c)) {
                var o = {};
                o[childName] = c;
                children.push(o);
              }

              _result[childName] = c;
              Xml2Json.toArrayAccessForm(_result, childName);
            } else {
              if (_result[childName] != null) {
                if (!(_result[childName] instanceof Array)) {
                  _result[childName] = [_result[childName]];
                  Xml2Json.toArrayAccessForm(_result, childName, childPath);
                }
              }

              var _c = Xml2Json.parseDOMChildren(_child, childPath);

              if (childName !== '#text' || /[^\s]/.test(_c)) {
                // Don't add white-space text nodes
                var _o = {};
                _o[childName] = _c;
                children.push(_o);
              }

              _result[childName][_result[childName].length] = _c;
            }
          }
        } // Attributes


        for (var aidx = 0; aidx < node.attributes.length; aidx++) {
          var attr = node.attributes[aidx];
          _result.__cnt++;
          var value2 = attr.value;
          _result[attr.name] = value2;
        } // Node namespace prefix


        var nodePrefix = node.prefix;

        if (nodePrefix != null && nodePrefix !== '') {
          _result.__cnt++;
          _result.__prefix = nodePrefix;
        }

        if (_result['#text'] != null) {
          _result.__text = _result['#text'];

          if (_result.__text instanceof Array) {
            _result.__text = _result.__text.join('\n');
          } // if(config.escapeMode)
          // result.__text = unescapeXmlChars(result.__text);


          delete _result['#text'];
          delete _result['#text_asArray'];
        }

        if (_result['#cdata-section'] != null) {
          _result.__cdata = _result['#cdata-section'];
          delete _result['#cdata-section'];
          delete _result['#cdata-section_asArray'];
        }

        if (_result.__cnt === 1 && _result.__text != null) {
          _result = _result.__text;
        } else if (_result.__cnt === 1 && _result.__cdata != null) {
          _result = _result.__cdata;
        }

        delete _result.__cnt;
        return _result;
      } else if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
        return node.nodeValue;
      }
    }
  }, {
    key: "getNodeLocalName",
    value: function getNodeLocalName(node) {
      var nodeLocalName = node.localName;

      if (nodeLocalName == null) {
        nodeLocalName = node.baseName;
      } // Yeah, this is IE!!


      if (nodeLocalName == null || nodeLocalName === '') {
        nodeLocalName = node.nodeName;
      } // =="" is IE too


      return nodeLocalName;
    }
  }, {
    key: "toArrayAccessForm",
    value: function toArrayAccessForm(obj, childName) {
      if (!(obj[childName] instanceof Array)) {
        obj[childName] = [obj[childName]];
      }
    }
  }]);
  return Xml2Json;
}();

exports["default"] = Xml2Json;