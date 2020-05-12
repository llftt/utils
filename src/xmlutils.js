
/** @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export default class XmlUtils {

    static findChild(elem, name) {
        const children = XmlUtils.findChildren(elem, name);
        if (children.length !== 1) {
            return null;
        }
        return children[0];
    }

    static findChildNS(elem, ns, name) {
        const children = XmlUtils.findChildrenNS(elem, ns, name);
        if (children.length !== 1) {
            return null;
        }
        return children[0];
    }

    static findChildren(elem, name) {
        return Array.from(elem.childNodes).filter((child) => {
            return child instanceof Element && child.tagName === name;
        });
    }

    static findChildrenNS(elem, ns, name) {
        return Array.from(elem.childNodes).filter((child) => {
            return child instanceof Element && child.localName === name &&
          child.namespaceURI === ns;
        });
    }

    static getAttributeNS(elem, ns, name) {
        return elem.hasAttributeNS(ns, name) ? elem.getAttributeNS(ns, name) : null;
    }

    static getContents(elem) {
        const isText = (child) => {
            return child.nodeType === Node.TEXT_NODE ||
          child.nodeType === Node.CDATA_SECTION_NODE;
        };
        if (!Array.from(elem.childNodes).every(isText)) {
            return null;
        }

        // Read merged text content from all text nodes.
        return elem.textContent.trim();
    }


    static parseAttr(elem, name, parseFunction, defaultValue = null) {
        let parsedValue = null;

        const value = elem.getAttribute(name);
        if (value != null) {
            parsedValue = parseFunction(value);
        }
        return parsedValue == null ? defaultValue : parsedValue;
    }

    static parseInt(intString) {
        const n = Number(intString);
        return (n % 1 === 0) ? n : null;
    }

    static parsePositiveInt(intString) {
        const n = Number(intString);
        return (n % 1 === 0) && (n > 0) ? n : null;
    }

    static parseNonNegativeInt(intString) {
        const n = Number(intString);
        return (n % 1 === 0) && (n >= 0) ? n : null;
    }

    static parseFloat(floatString) {
        const n = Number(floatString);
        return !isNaN(n) ? n : null;
    }

    static evalDivision(exprString) {
        let res;
        let n;
        if ((res = exprString.match(/^(\d+)\/(\d+)$/))) {
            n = Number(res[1]) / Number(res[2]);
        } else {
            n = Number(exprString);
        }
        return !isNaN(n) ? n : null;
    }

    static parseXmlString(xmlString, expectedRootElemName) {
        const parser = new DOMParser();
        let rootElem = null;
        let xml = null;
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
        }  // It had a parser error in it.

        return rootElem;
    }


    static parseXml(xmlString, expectedRootElemName) {
        try {
            return XmlUtils.parseXmlString(xmlString, expectedRootElemName);
        } catch (exception) {
            return null;
        }
    }
}
