!function(e){function n(n){for(var r,i,a=n[0],l=n[1],f=n[2],d=0,p=[];d<a.length;d++)i=a[d],o[i]&&p.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(c&&c(n);p.length;)p.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,a=1;a<t.length;a++){var l=t[a];0!==o[l]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={6:0},u=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t=o[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise(function(n,r){t=o[e]=[n,r]});n.push(t[2]=r);var u,a=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=function(e){return i.p+""+({}[e]||e)+".bundle.js"}(e),u=function(n){l.onerror=l.onload=null,clearTimeout(f);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+u+")");i.type=r,i.request=u,t[1](i)}o[e]=void 0}};var f=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,a.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i.oe=function(e){throw console.error(e),e};var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=n,a=a.slice();for(var f=0;f<a.length;f++)n(a[f]);var c=l;u.push([8,5]),t()}({4:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=u(t(1)),o=u(t(3));function u(e){return e&&e.__esModule?e:{default:e}}r.default.use(o.default);var i=[{path:"/hello-vue",component:function(){return t.e(0).then(t.bind(null,12))}},{path:"/page",component:function(){return t.e(1).then(t.bind(null,13))}},{path:"*",redirect:"/page"}];n.default=new o.default({routes:i})},8:function(e,n,t){"use strict";var r=i(t(1)),o=i(t(4)),u=t(2);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(){return t.e(4).then(t.bind(null,11))},l=function(){return t.e(3).then(t.t.bind(null,10,7))},f=function(){return t.e(2).then(t.bind(null,9))};r.default.config.devtools=!0,new r.default({router:o.default,mixins:[u.VueTopDown],components:{HeaderComp:a,FooterComp:f,MiddleComp:l},data:function(){return function(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}({},u.VTDConstants.MAPPING,{header:a,footer:f,".middle":l})}}).$mount("#app")}});