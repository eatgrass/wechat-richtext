;
(function () {
    if (!window) {
        return;
    }

    const objectProto = Object.prototype
    const hasOwnProperty = objectProto.hasOwnProperty

    const eq = function (value, other) {
        return value === other || (value !== value && other !== other)
    }

    const defaults = function (object, ...sources) {
        object = Object(object)
        sources.forEach((source) => {
            if (source != null) {
                source = Object(source)
                for (const key in source) {
                    const value = object[key]
                    if (value === undefined ||
                        (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                        object[key] = source[key]
                    }
                }
            }
        })
        return object
    }

    const WechatRichText = function (options) {
        const supportedTags = [
            'a',
            'abbr',
            'b',
            'blockquote',
            'br',
            'code',
            'col',
            'colgroup',
            'dd',
            'del',
            'div',
            'dl',
            'dt',
            'em',
            'fieldset',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'hr',
            'i',
            'img',
            'ins',
            'label',
            'legend',
            'li',
            'ol',
            'p',
            'q',
            'span',
            'strong',
            'sub',
            'sup',
            'table',
            'tbody',
            'td',
            'tfoot',
            'th',
            'thead',
            'tr',
            'ul'
        ];

        const supportedAttrs = {
            'col': ['span', 'width'],
            'colgroup': ['span', 'width'],
            'img': ['alt', 'src', 'height', 'width'],
            'ol': ['start', 'type'],
            'table': ['width'],
            'td': ['colspan', 'height', 'rowspan', 'width'],
            'th': ['colspan', 'height', 'rowspan', 'width']
        };

        const _default = {
            useClass: false,
        }

        const _options = defaults(options, _default)

        const convert = function (nodes) { // html collection
            let arr = [];
            const length = nodes.childNodes == null ? 0 : nodes.childNodes.length;
            let i = -1;
            while (++i < length) {
                let node = nodes.childNodes[i];
                let ele = {};
                if (node.nodeType == 3) { //text node
                    if (node.textContent.trim() == '') {
                        continue;
                    }
                    ele.type = 'text';
                    ele.text = node.textContent;
                    arr.push(ele);
                }

                if (node.nodeType == 1) {
                    if (!supportedTags.includes(node.localName)) {
                        continue;
                    }
                    ele.type = 'node';
                    ele.name = node.localName;
                    ele.attrs = extractAttributes(node);
                    if (node.childNodes.length > 0) {
                        ele.children = convert(node);
                    }
                    arr.push(ele);
                }
            }
            return arr;
        }

        const extractAttributes = function (node) {
            let attributes = node.attributes;
            let length = node.attributes == null ? 0 : node.attributes.length
            let i = -1;
            let attrs = {};
            while (++i < length) {
                let attr = node.attributes[i];
                if ((supportedAttrs[node.localName] && supportedAttrs[node.localName].includes(attr.name)) || (_options.useClass && attr.name === 'class')) {
                    attrs[attr.name] = attr.nodeValue;
                }
            }
            if (_options.style[node.localName]) {
                attrs.style = _options.style[node.localName];
            }
            return attrs;
        }

        return {
            parse: function (html) {
                return convert(html);
            }
        };
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return WechatRichText;
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = WechatRichText;
    } else {
        window.WechatRichText = WechatRichText;
    }

}).call(this);
