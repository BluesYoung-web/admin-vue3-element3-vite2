function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){_defineProperty(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var __vite_style__=document.createElement("style");__vite_style__.innerHTML=".main[data-v-760bd9ab]{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:800px;padding:2.5rem;width:100%}.board[data-v-760bd9ab]{height:100%;width:48%}textarea[data-v-760bd9ab]{height:680px;width:100%}",document.head.appendChild(__vite_style__),System.register(["./vendor-legacy.369deba3.js"],(function(e){"use strict";var t,n,r,i,a,o,c,u,s,l,d,f,b,p,v,y;return{setters:[function(e){t=e.Z,n=e.$,r=e.a0,i=e.a1,a=e.d,o=e.g,c=e.h,u=e.o,s=e.c,l=e.e,d=e.q,f=e.a2,b=e.k,p=e.w,v=e.p,y=e.b}],execute:function(){var w="undefined"!=typeof window,_=function(e){return"string"==typeof e},g=function(){};function m(e){t()&&n(e)}var O,h=w?window:void 0;function j(){for(var e,t,n,a,o=arguments.length,c=new Array(o),u=0;u<o;u++)c[u]=arguments[u];if(_(c[0])?(t=c[0],n=c[1],a=c[2],e=h):(e=c[0],t=c[1],n=c[2],a=c[3]),!e)return g;var s=g,l=r((function(){return i(e)}),(function(e){s(),e&&(e.addEventListener(t,n,a),s=function(){e.removeEventListener(t,n,a),s=g})}),{immediate:!0,flush:"post"}),d=function(){l(),s()};return m(d),d}!function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"}(O||(O={}));var x=p();v("data-v-760bd9ab");var P={class:"main"},k={class:"text-2xl text-center font-bold"};y();var E=a({name:"UseEventListener"});e("default",a(_objectSpread(_objectSpread({},E),{},{expose:[],setup:function(e){var t=o(""),n=o(),r=o("");return j(n,"input",(function(e){r.value=t.value})),j(document,"visibilitychange",(function(){return console.log("页面显示状态变更")})),function(e,i){var a=c("el-card");return u(),s("div",P,[l(a,{class:"board"},{default:x((function(){return[d(l("textarea",{"onUpdate:modelValue":i[1]||(i[1]=function(e){return t.value=e}),ref:n,placeholder:"请输入任意内容"},null,512),[[f,t.value]])]})),_:1}),l(a,{class:"board"},{default:x((function(){return[l("pre",k,b(r.value),1)]})),_:1})])}}}))).__scopeId="data-v-760bd9ab"}}}));