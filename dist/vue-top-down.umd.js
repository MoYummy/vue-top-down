(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueTopDown = {})));
}(this, (function (exports) { 'use strict';

  var VueTopDown = {
    str: 'VueTopDown.str'
  };

  var VueTopDownItem = {
    str: 'VueTopDownItem.str'
  };

  exports.VueTopDown = VueTopDown;
  exports.VueTopDownItem = VueTopDownItem;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
