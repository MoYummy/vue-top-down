var VTD = {
  // html
  COMPONENT: '_VueTopDown_component',
  FAILURE: '_VueTopDown_failure',

  // user input
  ROOT: '$_VueTopDown_root',
  MAPPING: '$_VueTopDown_mapping',

  // props
  OUTER_HTML: '$_VueTopDown_outerHTML',
  CLASS: '$_VueTopDown_class',
  STYLE: '$_VueTopDown_style',

  // internal
  OUTER_DOM: '$_VueTopDown_outerDom',
  RENDER: '$_VueTopDown_render',
  LIMIT: '$_VueTopDown_limit'
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function linkMapping() {
  var mapping = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var compKeys = Object.keys(components);
  var compValues = Object.values(components);
  var linked = {};

  var _loop = function _loop(k) {
    var comp = mapping[k];
    var i = compValues.findIndex(function (x) {
      return x === comp;
    });
    i === -1 && console.warn(k + ' is missing');
    linked[k] = compKeys[i];
  };

  for (var k in mapping) {
    _loop(k);
  }
  return linked;
}

function outerDom(outerHTML) {
  var mapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var rootSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';

  var dom = str2dom(outerHTML, rootSelector);
  dom.removeAttribute(VTD.COMPONENT);
  (typeof mapping === 'undefined' ? 'undefined' : _typeof(mapping)) === 'object' && Object.keys(mapping).forEach(function (k) {
    var comp = mapping[k];
    if (typeof comp !== 'string') {
      return;
    }
    try {
      dom.querySelectorAll(k).forEach(function (el) {
        return el.setAttribute(VTD.COMPONENT, kebab(comp));
      });
    } catch (err) {}
  });
  return dom;
}

function str2dom(outerHTML) {
  var rootSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';

  var dom = document.createElement('div');
  dom.setAttribute('id', 'root');
  dom.innerHTML = outerHTML;
  var el = void 0;
  try {
    el = dom.querySelector(rootSelector);
    if (el) {
      return el;
    }
  } catch (err) {
    console.error(err);
  }
  try {
    el = dom.querySelector('*');
    return el ? el : dom;
  } catch (err) {
    console.error(err);
    return dom;
  }
}

function kebab() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return typeof str === 'string' ? str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : '';
}

function dom2render(h, el) {
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!(h instanceof Function)) {
    return null;
  }

  if (el instanceof Text) {
    return el.data;
  }

  if (!(el instanceof HTMLElement)) {
    return null;
  }

  var vueComponent = el.getAttribute(VTD.COMPONENT);
  if (vueComponent) {
    var _props;

    return render(h, vueComponent, {
      props: (_props = {}, _defineProperty(_props, VTD.OUTER_HTML, el.outerHTML), _defineProperty(_props, VTD.CLASS, (el.getAttribute('class') || '').split(' ')), _defineProperty(_props, VTD.STYLE, el.getAttribute('style')), _props)
    });
  }

  var children = [];
  el.childNodes.forEach(function (n) {
    var vnode = dom2render(h, n, depth + 1);
    vnode && children.push(vnode);
  });
  var attrs = {};
  el.getAttributeNames().forEach(function (attr) {
    attrs[attr] = el.getAttribute(attr);
  });
  return render(h, el.tagName, { attrs: attrs }, children);
}

function render(h, tag, opts, children) {
  try {
    return children ? h(tag, opts, children) : h(tag, opts);
  } catch (err) {
    console.error(err);
    var el = document.createElement(tag);
    el.setAttribute([VTD.FAILURE], '');
    return el;
  }
}

var _props;

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VueTopDown = {
  props: (_props = {}, _defineProperty$1(_props, VTD.OUTER_HTML, String), _defineProperty$1(_props, VTD.CLASS, Array), _defineProperty$1(_props, VTD.STYLE, String), _props),
  inheritAttrs: false,
  data: function data() {
    var _ref;

    return _ref = {}, _defineProperty$1(_ref, VTD.ROOT, '*'), _defineProperty$1(_ref, VTD.MAPPING, {}), _defineProperty$1(_ref, VTD.RENDER, null), _defineProperty$1(_ref, VTD.OUTER_DOM, null), _defineProperty$1(_ref, VTD.LIMIT, 0), _ref;
  },

  computed: _defineProperty$1({}, VTD.OUTER_DOM, function () {
    var outerHTML = this.$props[VTD.OUTER_HTML] ? this.$props[VTD.OUTER_HTML] : this.$el.outerHTML;
    var mapping = linkMapping(this.$data[VTD.MAPPING], this.$options.components);
    return outerDom(outerHTML, mapping, this.$data[VTD.ROOT]);
  }),
  render: function render(h) {
    if (this.$data[VTD.LIMIT] > 1e2) {
      console.warn('Too many times for render function to be called');
      return this.$data[VTD.RENDER];
    }
    var r = dom2render(h, this[VTD.OUTER_DOM]);
    this.$nextTick(function () {
      // debugObj(this.$data[VTD.RENDER])
    });
    return r;
  }
};

var _props$1;

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VueTopDownItem = {
  props: (_props$1 = {}, _defineProperty$2(_props$1, VTD.OUTER_HTML, String), _defineProperty$2(_props$1, VTD.CLASS, Array), _defineProperty$2(_props$1, VTD.STYLE, String), _props$1),
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

export { VueTopDown, VueTopDownItem, VTD as VTDConstants };
