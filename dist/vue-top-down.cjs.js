'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function outerDom(outerHTML) {
  var mapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var rootSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

  var dom = str2dom(outerHTML, rootSelector);
  (typeof mapping === 'undefined' ? 'undefined' : _typeof(mapping)) === 'object' && Object.keys(mapping).forEach(function (k) {
    dom.querySelectorAll(k).forEach(function (n) {
      n.setAttribute('vue-component', kebab(mapping[k].name));
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
    // white space or dangling text node
    return el.data;
  }
  if (!(el instanceof HTMLElement)) {
    return null;
  }

  try {
    var vueComponent = el.getAttribute('vue-component');
    if (vueComponent) {
      return h(vueComponent, {
        props: {
          outerHTML: el.outerHTML,
          clazz: (el.getAttribute('class') || '').split(' '),
          styles: el.getAttribute('style')
        }
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
    return h('div', {
      attrs: {
        class: 'render-failure'
      }
    });
  }
}

var VueTopDown = {
  props: {
    outerHTML: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      root: '*',
      mapping: {}
    };
  },

  computed: {
    outerDom: function outerDom$$1() {
      return outerDom(this.outerHTML ? this.outerHTML : this.$el.outerHTML, this.mapping, this.root);
    }
  },
  render: function render(h) {
    return dom2render(h, this.outerDom);
  }
};

var VueTopDownItem = {
  props: {
    outerHTML: String,
    clazz: Array,
    styles: String
  },
  inheritAttrs: false
};

exports.VueTopDown = VueTopDown;
exports.VueTopDownItem = VueTopDownItem;
