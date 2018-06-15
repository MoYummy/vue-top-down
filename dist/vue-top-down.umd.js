(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['vue-top-down'] = {})));
}(this, (function (exports) { 'use strict';

  var VTD = {
    COMPONENT: '_VueTopDown_component',
    FAILURE: '_VueTopDown_failure',
    OUTER_HTML: '$_VueTopDown_outerHTML',
    ROOT: '$_VueTopDown_root',
    MAPPING: '$_VueTopDown_mapping',
    CLASS: '$_VueTopDown_class',
    STYLE: '$_VueTopDown_style',
    RENDER: '$_VueTopDown_render'
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function outerDom(outerHTML) {
    var mapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rootSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

    var dom = str2dom(outerHTML, rootSelector);
    (typeof mapping === 'undefined' ? 'undefined' : _typeof(mapping)) === 'object' && Object.keys(mapping).forEach(function (k) {
      dom.querySelectorAll(k).forEach(function (n) {
        n.setAttribute(VTD.COMPONENT, kebab(mapping[k].name));
      });
    });
    return dom;
  }

  function str2dom(outerHTML) {
    var rootSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';

    var dom = document.createElement('div');
    dom.setAttribute('id', 'root');
    dom.innerHTML = outerHTML;
    try {
      var el = dom.querySelector(rootSelector);
      return el === null ? dom : el;
    } catch (err) {
      console.error(err);
      return dom;
    }
  }

  function kebab() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function dom2render(h, el) {
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (!(h instanceof Function)) {
      return null;
    }

    if (!el) {
      return null;
    }
    if (el instanceof Text) {
      return el.data;
    }
    if (!(el instanceof HTMLElement)) {
      return null;
    }

    try {
      var vueComponent = el.getAttribute(VTD.COMPONENT);
      if (vueComponent) {
        var _props;

        return h(vueComponent, {
          props: (_props = {}, _defineProperty(_props, VTD.OUTER_HTML, el.outerHTML), _defineProperty(_props, VTD.CLASS, (el.getAttribute('class') || '').split(' ')), _defineProperty(_props, VTD.STYLE, el.getAttribute('style')), _props)
        });
      } else {
        var children = [];
        el.childNodes.forEach(function (n) {
          var vnode = dom2render(h, n, depth + 1);
          vnode && children.push(vnode);
        });
        var attrs = {};
        el.getAttributeNames().forEach(function (attr) {
          attrs[attr] = el.getAttribute(attr);
        });
        return h(el.tagName, {
          attrs: attrs
        }, children);
      }
    } catch (err) {
      console.error(err);
      return h(el.tagName, {
        attrs: _defineProperty({}, VTD.FAILURE, '')
      });
    }
  }

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var VueTopDown = {
    data: function data() {
      var _ref;

      return _ref = {}, _defineProperty$1(_ref, VTD.ROOT, '*'), _defineProperty$1(_ref, VTD.MAPPING, {}), _defineProperty$1(_ref, VTD.RENDER, null), _ref;
    },
    render: function render(h) {
      if (this[VTD.RENDER]) {
        return this[VTD.RENDER];
      }
      var od = outerDom(this.$el.outerHTML, this.$data[VTD.MAPPING], this.$data[VTD.ROOT]);
      this[VTD.RENDER] = dom2render(h, od);
      return this[VTD.RENDER];
    }
  };

  var _props;

  function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var VueTopDownItem = {
    props: (_props = {}, _defineProperty$2(_props, VTD.OUTER_HTML, String), _defineProperty$2(_props, VTD.CLASS, Array), _defineProperty$2(_props, VTD.STYLE, String), _props),
    inheritAttrs: false,
    computed: {
      outerHTML: function outerHTML() {
        return this[VTD.OUTER_HTML];
      },
      clazz: function clazz() {
        return this[VTD.CLASS];
      }
    }
  };

  exports.VueTopDown = VueTopDown;
  exports.VueTopDownItem = VueTopDownItem;
  exports.VTDConstants = VTD;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
