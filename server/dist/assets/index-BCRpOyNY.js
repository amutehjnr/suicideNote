function hm(e,t){for(var n=0;n<t.length;n++){const a=t[n];if(typeof a!="string"&&!Array.isArray(a)){for(const o in a)if(o!=="default"&&!(o in e)){const r=Object.getOwnPropertyDescriptor(a,o);r&&Object.defineProperty(e,o,r.get?r:{enumerable:!0,get:()=>a[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function mm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var hc={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oo=Symbol.for("react.element"),fm=Symbol.for("react.portal"),pm=Symbol.for("react.fragment"),gm=Symbol.for("react.strict_mode"),ym=Symbol.for("react.profiler"),wm=Symbol.for("react.provider"),vm=Symbol.for("react.context"),km=Symbol.for("react.forward_ref"),Im=Symbol.for("react.suspense"),bm=Symbol.for("react.memo"),Em=Symbol.for("react.lazy"),Tl=Symbol.iterator;function Sm(e){return e===null||typeof e!="object"?null:(e=Tl&&e[Tl]||e["@@iterator"],typeof e=="function"?e:null)}var mc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fc=Object.assign,pc={};function da(e,t,n){this.props=e,this.context=t,this.refs=pc,this.updater=n||mc}da.prototype.isReactComponent={};da.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};da.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function gc(){}gc.prototype=da.prototype;function Ci(e,t,n){this.props=e,this.context=t,this.refs=pc,this.updater=n||mc}var Ti=Ci.prototype=new gc;Ti.constructor=Ci;fc(Ti,da.prototype);Ti.isPureReactComponent=!0;var xl=Array.isArray,yc=Object.prototype.hasOwnProperty,xi={current:null},wc={key:!0,ref:!0,__self:!0,__source:!0};function vc(e,t,n){var a,o={},r=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(r=""+t.key),t)yc.call(t,a)&&!wc.hasOwnProperty(a)&&(o[a]=t[a]);var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];o.children=u}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)o[a]===void 0&&(o[a]=l[a]);return{$$typeof:oo,type:e,key:r,ref:i,props:o,_owner:xi.current}}function _m(e,t){return{$$typeof:oo,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ai(e){return typeof e=="object"&&e!==null&&e.$$typeof===oo}function Nm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Al=/\/+/g;function Vr(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Nm(""+e.key):t.toString(36)}function Oo(e,t,n,a,o){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(r){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case oo:case fm:i=!0}}if(i)return i=e,o=o(i),e=a===""?"."+Vr(i,0):a,xl(o)?(n="",e!=null&&(n=e.replace(Al,"$&/")+"/"),Oo(o,t,n,"",function(c){return c})):o!=null&&(Ai(o)&&(o=_m(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(Al,"$&/")+"/")+e)),t.push(o)),1;if(i=0,a=a===""?".":a+":",xl(e))for(var l=0;l<e.length;l++){r=e[l];var u=a+Vr(r,l);i+=Oo(r,t,n,u,o)}else if(u=Sm(e),typeof u=="function")for(e=u.call(e),l=0;!(r=e.next()).done;)r=r.value,u=a+Vr(r,l++),i+=Oo(r,t,n,u,o);else if(r==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function wo(e,t,n){if(e==null)return e;var a=[],o=0;return Oo(e,a,"","",function(r){return t.call(n,r,o++)}),a}function Cm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ye={current:null},Do={transition:null},Tm={ReactCurrentDispatcher:Ye,ReactCurrentBatchConfig:Do,ReactCurrentOwner:xi};function kc(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:wo,forEach:function(e,t,n){wo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return wo(e,function(){t++}),t},toArray:function(e){return wo(e,function(t){return t})||[]},only:function(e){if(!Ai(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Q.Component=da;Q.Fragment=pm;Q.Profiler=ym;Q.PureComponent=Ci;Q.StrictMode=gm;Q.Suspense=Im;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Tm;Q.act=kc;Q.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=fc({},e.props),o=e.key,r=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(r=t.ref,i=xi.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)yc.call(t,u)&&!wc.hasOwnProperty(u)&&(a[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)a.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];a.children=l}return{$$typeof:oo,type:e.type,key:o,ref:r,props:a,_owner:i}};Q.createContext=function(e){return e={$$typeof:vm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:wm,_context:e},e.Consumer=e};Q.createElement=vc;Q.createFactory=function(e){var t=vc.bind(null,e);return t.type=e,t};Q.createRef=function(){return{current:null}};Q.forwardRef=function(e){return{$$typeof:km,render:e}};Q.isValidElement=Ai;Q.lazy=function(e){return{$$typeof:Em,_payload:{_status:-1,_result:e},_init:Cm}};Q.memo=function(e,t){return{$$typeof:bm,type:e,compare:t===void 0?null:t}};Q.startTransition=function(e){var t=Do.transition;Do.transition={};try{e()}finally{Do.transition=t}};Q.unstable_act=kc;Q.useCallback=function(e,t){return Ye.current.useCallback(e,t)};Q.useContext=function(e){return Ye.current.useContext(e)};Q.useDebugValue=function(){};Q.useDeferredValue=function(e){return Ye.current.useDeferredValue(e)};Q.useEffect=function(e,t){return Ye.current.useEffect(e,t)};Q.useId=function(){return Ye.current.useId()};Q.useImperativeHandle=function(e,t,n){return Ye.current.useImperativeHandle(e,t,n)};Q.useInsertionEffect=function(e,t){return Ye.current.useInsertionEffect(e,t)};Q.useLayoutEffect=function(e,t){return Ye.current.useLayoutEffect(e,t)};Q.useMemo=function(e,t){return Ye.current.useMemo(e,t)};Q.useReducer=function(e,t,n){return Ye.current.useReducer(e,t,n)};Q.useRef=function(e){return Ye.current.useRef(e)};Q.useState=function(e){return Ye.current.useState(e)};Q.useSyncExternalStore=function(e,t,n){return Ye.current.useSyncExternalStore(e,t,n)};Q.useTransition=function(){return Ye.current.useTransition()};Q.version="18.3.1";hc.exports=Q;var b=hc.exports;const s=mm(b),xm=hm({__proto__:null,default:s},[b]);var Ss={},Ic={exports:{}},rt={},bc={exports:{}},Ec={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(x,M){var j=x.length;x.push(M);e:for(;0<j;){var V=j-1>>>1,U=x[V];if(0<o(U,M))x[V]=M,x[j]=U,j=V;else break e}}function n(x){return x.length===0?null:x[0]}function a(x){if(x.length===0)return null;var M=x[0],j=x.pop();if(j!==M){x[0]=j;e:for(var V=0,U=x.length,de=U>>>1;V<de;){var ye=2*(V+1)-1,Ve=x[ye],Me=ye+1,F=x[Me];if(0>o(Ve,j))Me<U&&0>o(F,Ve)?(x[V]=F,x[Me]=j,V=Me):(x[V]=Ve,x[ye]=j,V=ye);else if(Me<U&&0>o(F,j))x[V]=F,x[Me]=j,V=Me;else break e}}return M}function o(x,M){var j=x.sortIndex-M.sortIndex;return j!==0?j:x.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var r=performance;e.unstable_now=function(){return r.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var u=[],c=[],d=1,m=null,g=3,S=!1,y=!1,k=!1,E=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(x){for(var M=n(c);M!==null;){if(M.callback===null)a(c);else if(M.startTime<=x)a(c),M.sortIndex=M.expirationTime,t(u,M);else break;M=n(c)}}function N(x){if(k=!1,p(x),!y)if(n(u)!==null)y=!0,ee(C);else{var M=n(c);M!==null&&ae(N,M.startTime-x)}}function C(x,M){y=!1,k&&(k=!1,f(B),B=-1),S=!0;var j=g;try{for(p(M),m=n(u);m!==null&&(!(m.expirationTime>M)||x&&!X());){var V=m.callback;if(typeof V=="function"){m.callback=null,g=m.priorityLevel;var U=V(m.expirationTime<=M);M=e.unstable_now(),typeof U=="function"?m.callback=U:m===n(u)&&a(u),p(M)}else a(u);m=n(u)}if(m!==null)var de=!0;else{var ye=n(c);ye!==null&&ae(N,ye.startTime-M),de=!1}return de}finally{m=null,g=j,S=!1}}var A=!1,P=null,B=-1,$=5,W=-1;function X(){return!(e.unstable_now()-W<$)}function Z(){if(P!==null){var x=e.unstable_now();W=x;var M=!0;try{M=P(!0,x)}finally{M?ne():(A=!1,P=null)}}else A=!1}var ne;if(typeof h=="function")ne=function(){h(Z)};else if(typeof MessageChannel<"u"){var ve=new MessageChannel,R=ve.port2;ve.port1.onmessage=Z,ne=function(){R.postMessage(null)}}else ne=function(){E(Z,0)};function ee(x){P=x,A||(A=!0,ne())}function ae(x,M){B=E(function(){x(e.unstable_now())},M)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(x){x.callback=null},e.unstable_continueExecution=function(){y||S||(y=!0,ee(C))},e.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<x?Math.floor(1e3/x):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(x){switch(g){case 1:case 2:case 3:var M=3;break;default:M=g}var j=g;g=M;try{return x()}finally{g=j}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(x,M){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var j=g;g=x;try{return M()}finally{g=j}},e.unstable_scheduleCallback=function(x,M,j){var V=e.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?V+j:V):j=V,x){case 1:var U=-1;break;case 2:U=250;break;case 5:U=1073741823;break;case 4:U=1e4;break;default:U=5e3}return U=j+U,x={id:d++,callback:M,priorityLevel:x,startTime:j,expirationTime:U,sortIndex:-1},j>V?(x.sortIndex=j,t(c,x),n(u)===null&&x===n(c)&&(k?(f(B),B=-1):k=!0,ae(N,j-V))):(x.sortIndex=U,t(u,x),y||S||(y=!0,ee(C))),x},e.unstable_shouldYield=X,e.unstable_wrapCallback=function(x){var M=g;return function(){var j=g;g=M;try{return x.apply(this,arguments)}finally{g=j}}}})(Ec);bc.exports=Ec;var Am=bc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pm=b,ot=Am;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Sc=new Set,ja={};function Mn(e,t){aa(e,t),aa(e+"Capture",t)}function aa(e,t){for(ja[e]=t,e=0;e<t.length;e++)Sc.add(t[e])}var Ot=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_s=Object.prototype.hasOwnProperty,Lm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Pl={},Ll={};function Mm(e){return _s.call(Ll,e)?!0:_s.call(Pl,e)?!1:Lm.test(e)?Ll[e]=!0:(Pl[e]=!0,!1)}function Bm(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Rm(e,t,n,a){if(t===null||typeof t>"u"||Bm(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ge(e,t,n,a,o,r,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=r,this.removeEmptyString=i}var Le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Le[e]=new Ge(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Le[t]=new Ge(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Le[e]=new Ge(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Le[e]=new Ge(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Le[e]=new Ge(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Le[e]=new Ge(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Le[e]=new Ge(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Le[e]=new Ge(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Le[e]=new Ge(e,5,!1,e.toLowerCase(),null,!1,!1)});var Pi=/[\-:]([a-z])/g;function Li(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Pi,Li);Le[t]=new Ge(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Pi,Li);Le[t]=new Ge(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Pi,Li);Le[t]=new Ge(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Le[e]=new Ge(e,1,!1,e.toLowerCase(),null,!1,!1)});Le.xlinkHref=new Ge("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Le[e]=new Ge(e,1,!1,e.toLowerCase(),null,!0,!0)});function Mi(e,t,n,a){var o=Le.hasOwnProperty(t)?Le[t]:null;(o!==null?o.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Rm(t,n,o,a)&&(n=null),a||o===null?Mm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,a=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var zt=Pm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,vo=Symbol.for("react.element"),Fn=Symbol.for("react.portal"),jn=Symbol.for("react.fragment"),Bi=Symbol.for("react.strict_mode"),Ns=Symbol.for("react.profiler"),_c=Symbol.for("react.provider"),Nc=Symbol.for("react.context"),Ri=Symbol.for("react.forward_ref"),Cs=Symbol.for("react.suspense"),Ts=Symbol.for("react.suspense_list"),Oi=Symbol.for("react.memo"),$t=Symbol.for("react.lazy"),Cc=Symbol.for("react.offscreen"),Ml=Symbol.iterator;function ya(e){return e===null||typeof e!="object"?null:(e=Ml&&e[Ml]||e["@@iterator"],typeof e=="function"?e:null)}var fe=Object.assign,qr;function Na(e){if(qr===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);qr=t&&t[1]||""}return`
`+qr+e}var Jr=!1;function Kr(e,t){if(!e||Jr)return"";Jr=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var a=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){a=c}e.call(t.prototype)}else{try{throw Error()}catch(c){a=c}e()}}catch(c){if(c&&a&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),r=a.stack.split(`
`),i=o.length-1,l=r.length-1;1<=i&&0<=l&&o[i]!==r[l];)l--;for(;1<=i&&0<=l;i--,l--)if(o[i]!==r[l]){if(i!==1||l!==1)do if(i--,l--,0>l||o[i]!==r[l]){var u=`
`+o[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=l);break}}}finally{Jr=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Na(e):""}function Om(e){switch(e.tag){case 5:return Na(e.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return e=Kr(e.type,!1),e;case 11:return e=Kr(e.type.render,!1),e;case 1:return e=Kr(e.type,!0),e;default:return""}}function xs(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case jn:return"Fragment";case Fn:return"Portal";case Ns:return"Profiler";case Bi:return"StrictMode";case Cs:return"Suspense";case Ts:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Nc:return(e.displayName||"Context")+".Consumer";case _c:return(e._context.displayName||"Context")+".Provider";case Ri:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Oi:return t=e.displayName||null,t!==null?t:xs(e.type)||"Memo";case $t:t=e._payload,e=e._init;try{return xs(e(t))}catch{}}return null}function Dm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xs(t);case 8:return t===Bi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function sn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Tc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Fm(e){var t=Tc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,r=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){a=""+i,r.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ko(e){e._valueTracker||(e._valueTracker=Fm(e))}function xc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Tc(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Qo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function As(e,t){var n=t.checked;return fe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Bl(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=sn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ac(e,t){t=t.checked,t!=null&&Mi(e,"checked",t,!1)}function Ps(e,t){Ac(e,t);var n=sn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ls(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ls(e,t.type,sn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Rl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ls(e,t,n){(t!=="number"||Qo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ca=Array.isArray;function Kn(e,t,n,a){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&a&&(e[n].defaultSelected=!0)}else{for(n=""+sn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,a&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Ms(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return fe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ol(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(T(92));if(Ca(n)){if(1<n.length)throw Error(T(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:sn(n)}}function Pc(e,t){var n=sn(t.value),a=sn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function Dl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Lc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bs(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Lc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Io,Mc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Io=Io||document.createElement("div"),Io.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Io.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Wa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Aa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},jm=["Webkit","ms","Moz","O"];Object.keys(Aa).forEach(function(e){jm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Aa[t]=Aa[e]})});function Bc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Aa.hasOwnProperty(e)&&Aa[e]?(""+t).trim():t+"px"}function Rc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,o=Bc(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,o):e[n]=o}}var Wm=fe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rs(e,t){if(t){if(Wm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function Os(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ds=null;function Di(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fs=null,Qn=null,Xn=null;function Fl(e){if(e=io(e)){if(typeof Fs!="function")throw Error(T(280));var t=e.stateNode;t&&(t=Nr(t),Fs(e.stateNode,e.type,t))}}function Oc(e){Qn?Xn?Xn.push(e):Xn=[e]:Qn=e}function Dc(){if(Qn){var e=Qn,t=Xn;if(Xn=Qn=null,Fl(e),t)for(e=0;e<t.length;e++)Fl(t[e])}}function Fc(e,t){return e(t)}function jc(){}var Qr=!1;function Wc(e,t,n){if(Qr)return e(t,n);Qr=!0;try{return Fc(e,t,n)}finally{Qr=!1,(Qn!==null||Xn!==null)&&(jc(),Dc())}}function za(e,t){var n=e.stateNode;if(n===null)return null;var a=Nr(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(T(231,t,typeof n));return n}var js=!1;if(Ot)try{var wa={};Object.defineProperty(wa,"passive",{get:function(){js=!0}}),window.addEventListener("test",wa,wa),window.removeEventListener("test",wa,wa)}catch{js=!1}function zm(e,t,n,a,o,r,i,l,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var Pa=!1,Xo=null,Zo=!1,Ws=null,Um={onError:function(e){Pa=!0,Xo=e}};function $m(e,t,n,a,o,r,i,l,u){Pa=!1,Xo=null,zm.apply(Um,arguments)}function Hm(e,t,n,a,o,r,i,l,u){if($m.apply(this,arguments),Pa){if(Pa){var c=Xo;Pa=!1,Xo=null}else throw Error(T(198));Zo||(Zo=!0,Ws=c)}}function Bn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function zc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function jl(e){if(Bn(e)!==e)throw Error(T(188))}function Ym(e){var t=e.alternate;if(!t){if(t=Bn(e),t===null)throw Error(T(188));return t!==e?null:e}for(var n=e,a=t;;){var o=n.return;if(o===null)break;var r=o.alternate;if(r===null){if(a=o.return,a!==null){n=a;continue}break}if(o.child===r.child){for(r=o.child;r;){if(r===n)return jl(o),e;if(r===a)return jl(o),t;r=r.sibling}throw Error(T(188))}if(n.return!==a.return)n=o,a=r;else{for(var i=!1,l=o.child;l;){if(l===n){i=!0,n=o,a=r;break}if(l===a){i=!0,a=o,n=r;break}l=l.sibling}if(!i){for(l=r.child;l;){if(l===n){i=!0,n=r,a=o;break}if(l===a){i=!0,a=r,n=o;break}l=l.sibling}if(!i)throw Error(T(189))}}if(n.alternate!==a)throw Error(T(190))}if(n.tag!==3)throw Error(T(188));return n.stateNode.current===n?e:t}function Uc(e){return e=Ym(e),e!==null?$c(e):null}function $c(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=$c(e);if(t!==null)return t;e=e.sibling}return null}var Hc=ot.unstable_scheduleCallback,Wl=ot.unstable_cancelCallback,Gm=ot.unstable_shouldYield,Vm=ot.unstable_requestPaint,we=ot.unstable_now,qm=ot.unstable_getCurrentPriorityLevel,Fi=ot.unstable_ImmediatePriority,Yc=ot.unstable_UserBlockingPriority,er=ot.unstable_NormalPriority,Jm=ot.unstable_LowPriority,Gc=ot.unstable_IdlePriority,br=null,Ct=null;function Km(e){if(Ct&&typeof Ct.onCommitFiberRoot=="function")try{Ct.onCommitFiberRoot(br,e,void 0,(e.current.flags&128)===128)}catch{}}var vt=Math.clz32?Math.clz32:Zm,Qm=Math.log,Xm=Math.LN2;function Zm(e){return e>>>=0,e===0?32:31-(Qm(e)/Xm|0)|0}var bo=64,Eo=4194304;function Ta(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function tr(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,o=e.suspendedLanes,r=e.pingedLanes,i=n&268435455;if(i!==0){var l=i&~o;l!==0?a=Ta(l):(r&=i,r!==0&&(a=Ta(r)))}else i=n&~o,i!==0?a=Ta(i):r!==0&&(a=Ta(r));if(a===0)return 0;if(t!==0&&t!==a&&!(t&o)&&(o=a&-a,r=t&-t,o>=r||o===16&&(r&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-vt(t),o=1<<n,a|=e[n],t&=~o;return a}function ef(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tf(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,o=e.expirationTimes,r=e.pendingLanes;0<r;){var i=31-vt(r),l=1<<i,u=o[i];u===-1?(!(l&n)||l&a)&&(o[i]=ef(l,t)):u<=t&&(e.expiredLanes|=l),r&=~l}}function zs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Vc(){var e=bo;return bo<<=1,!(bo&4194240)&&(bo=64),e}function Xr(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ro(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-vt(t),e[t]=n}function nf(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-vt(n),r=1<<o;t[o]=0,a[o]=-1,e[o]=-1,n&=~r}}function ji(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-vt(n),o=1<<a;o&t|e[a]&t&&(e[a]|=t),n&=~o}}var re=0;function qc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Jc,Wi,Kc,Qc,Xc,Us=!1,So=[],Xt=null,Zt=null,en=null,Ua=new Map,$a=new Map,Yt=[],af="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zl(e,t){switch(e){case"focusin":case"focusout":Xt=null;break;case"dragenter":case"dragleave":Zt=null;break;case"mouseover":case"mouseout":en=null;break;case"pointerover":case"pointerout":Ua.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":$a.delete(t.pointerId)}}function va(e,t,n,a,o,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:r,targetContainers:[o]},t!==null&&(t=io(t),t!==null&&Wi(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function of(e,t,n,a,o){switch(t){case"focusin":return Xt=va(Xt,e,t,n,a,o),!0;case"dragenter":return Zt=va(Zt,e,t,n,a,o),!0;case"mouseover":return en=va(en,e,t,n,a,o),!0;case"pointerover":var r=o.pointerId;return Ua.set(r,va(Ua.get(r)||null,e,t,n,a,o)),!0;case"gotpointercapture":return r=o.pointerId,$a.set(r,va($a.get(r)||null,e,t,n,a,o)),!0}return!1}function Zc(e){var t=vn(e.target);if(t!==null){var n=Bn(t);if(n!==null){if(t=n.tag,t===13){if(t=zc(n),t!==null){e.blockedOn=t,Xc(e.priority,function(){Kc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Fo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=$s(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Ds=a,n.target.dispatchEvent(a),Ds=null}else return t=io(n),t!==null&&Wi(t),e.blockedOn=n,!1;t.shift()}return!0}function Ul(e,t,n){Fo(e)&&n.delete(t)}function rf(){Us=!1,Xt!==null&&Fo(Xt)&&(Xt=null),Zt!==null&&Fo(Zt)&&(Zt=null),en!==null&&Fo(en)&&(en=null),Ua.forEach(Ul),$a.forEach(Ul)}function ka(e,t){e.blockedOn===t&&(e.blockedOn=null,Us||(Us=!0,ot.unstable_scheduleCallback(ot.unstable_NormalPriority,rf)))}function Ha(e){function t(o){return ka(o,e)}if(0<So.length){ka(So[0],e);for(var n=1;n<So.length;n++){var a=So[n];a.blockedOn===e&&(a.blockedOn=null)}}for(Xt!==null&&ka(Xt,e),Zt!==null&&ka(Zt,e),en!==null&&ka(en,e),Ua.forEach(t),$a.forEach(t),n=0;n<Yt.length;n++)a=Yt[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<Yt.length&&(n=Yt[0],n.blockedOn===null);)Zc(n),n.blockedOn===null&&Yt.shift()}var Zn=zt.ReactCurrentBatchConfig,nr=!0;function sf(e,t,n,a){var o=re,r=Zn.transition;Zn.transition=null;try{re=1,zi(e,t,n,a)}finally{re=o,Zn.transition=r}}function lf(e,t,n,a){var o=re,r=Zn.transition;Zn.transition=null;try{re=4,zi(e,t,n,a)}finally{re=o,Zn.transition=r}}function zi(e,t,n,a){if(nr){var o=$s(e,t,n,a);if(o===null)ls(e,t,a,ar,n),zl(e,a);else if(of(o,e,t,n,a))a.stopPropagation();else if(zl(e,a),t&4&&-1<af.indexOf(e)){for(;o!==null;){var r=io(o);if(r!==null&&Jc(r),r=$s(e,t,n,a),r===null&&ls(e,t,a,ar,n),r===o)break;o=r}o!==null&&a.stopPropagation()}else ls(e,t,a,null,n)}}var ar=null;function $s(e,t,n,a){if(ar=null,e=Di(a),e=vn(e),e!==null)if(t=Bn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=zc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ar=e,null}function ed(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(qm()){case Fi:return 1;case Yc:return 4;case er:case Jm:return 16;case Gc:return 536870912;default:return 16}default:return 16}}var Jt=null,Ui=null,jo=null;function td(){if(jo)return jo;var e,t=Ui,n=t.length,a,o="value"in Jt?Jt.value:Jt.textContent,r=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===o[r-a];a++);return jo=o.slice(e,1<a?1-a:void 0)}function Wo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function _o(){return!0}function $l(){return!1}function st(e){function t(n,a,o,r,i){this._reactName=n,this._targetInst=o,this.type=a,this.nativeEvent=r,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(r):r[l]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?_o:$l,this.isPropagationStopped=$l,this}return fe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=_o)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=_o)},persist:function(){},isPersistent:_o}),t}var ha={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$i=st(ha),so=fe({},ha,{view:0,detail:0}),uf=st(so),Zr,es,Ia,Er=fe({},so,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ia&&(Ia&&e.type==="mousemove"?(Zr=e.screenX-Ia.screenX,es=e.screenY-Ia.screenY):es=Zr=0,Ia=e),Zr)},movementY:function(e){return"movementY"in e?e.movementY:es}}),Hl=st(Er),cf=fe({},Er,{dataTransfer:0}),df=st(cf),hf=fe({},so,{relatedTarget:0}),ts=st(hf),mf=fe({},ha,{animationName:0,elapsedTime:0,pseudoElement:0}),ff=st(mf),pf=fe({},ha,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gf=st(pf),yf=fe({},ha,{data:0}),Yl=st(yf),wf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kf={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function If(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=kf[e])?!!t[e]:!1}function Hi(){return If}var bf=fe({},so,{key:function(e){if(e.key){var t=wf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?vf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hi,charCode:function(e){return e.type==="keypress"?Wo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ef=st(bf),Sf=fe({},Er,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gl=st(Sf),_f=fe({},so,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hi}),Nf=st(_f),Cf=fe({},ha,{propertyName:0,elapsedTime:0,pseudoElement:0}),Tf=st(Cf),xf=fe({},Er,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Af=st(xf),Pf=[9,13,27,32],Yi=Ot&&"CompositionEvent"in window,La=null;Ot&&"documentMode"in document&&(La=document.documentMode);var Lf=Ot&&"TextEvent"in window&&!La,nd=Ot&&(!Yi||La&&8<La&&11>=La),Vl=" ",ql=!1;function ad(e,t){switch(e){case"keyup":return Pf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function od(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wn=!1;function Mf(e,t){switch(e){case"compositionend":return od(t);case"keypress":return t.which!==32?null:(ql=!0,Vl);case"textInput":return e=t.data,e===Vl&&ql?null:e;default:return null}}function Bf(e,t){if(Wn)return e==="compositionend"||!Yi&&ad(e,t)?(e=td(),jo=Ui=Jt=null,Wn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return nd&&t.locale!=="ko"?null:t.data;default:return null}}var Rf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Rf[e.type]:t==="textarea"}function rd(e,t,n,a){Oc(a),t=or(t,"onChange"),0<t.length&&(n=new $i("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Ma=null,Ya=null;function Of(e){gd(e,0)}function Sr(e){var t=$n(e);if(xc(t))return e}function Df(e,t){if(e==="change")return t}var sd=!1;if(Ot){var ns;if(Ot){var as="oninput"in document;if(!as){var Kl=document.createElement("div");Kl.setAttribute("oninput","return;"),as=typeof Kl.oninput=="function"}ns=as}else ns=!1;sd=ns&&(!document.documentMode||9<document.documentMode)}function Ql(){Ma&&(Ma.detachEvent("onpropertychange",id),Ya=Ma=null)}function id(e){if(e.propertyName==="value"&&Sr(Ya)){var t=[];rd(t,Ya,e,Di(e)),Wc(Of,t)}}function Ff(e,t,n){e==="focusin"?(Ql(),Ma=t,Ya=n,Ma.attachEvent("onpropertychange",id)):e==="focusout"&&Ql()}function jf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sr(Ya)}function Wf(e,t){if(e==="click")return Sr(t)}function zf(e,t){if(e==="input"||e==="change")return Sr(t)}function Uf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var It=typeof Object.is=="function"?Object.is:Uf;function Ga(e,t){if(It(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var o=n[a];if(!_s.call(t,o)||!It(e[o],t[o]))return!1}return!0}function Xl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zl(e,t){var n=Xl(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Xl(n)}}function ld(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ld(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ud(){for(var e=window,t=Qo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Qo(e.document)}return t}function Gi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function $f(e){var t=ud(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ld(n.ownerDocument.documentElement,n)){if(a!==null&&Gi(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,r=Math.min(a.start,o);a=a.end===void 0?r:Math.min(a.end,o),!e.extend&&r>a&&(o=a,a=r,r=o),o=Zl(n,r);var i=Zl(n,a);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),r>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Hf=Ot&&"documentMode"in document&&11>=document.documentMode,zn=null,Hs=null,Ba=null,Ys=!1;function eu(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ys||zn==null||zn!==Qo(a)||(a=zn,"selectionStart"in a&&Gi(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ba&&Ga(Ba,a)||(Ba=a,a=or(Hs,"onSelect"),0<a.length&&(t=new $i("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=zn)))}function No(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Un={animationend:No("Animation","AnimationEnd"),animationiteration:No("Animation","AnimationIteration"),animationstart:No("Animation","AnimationStart"),transitionend:No("Transition","TransitionEnd")},os={},cd={};Ot&&(cd=document.createElement("div").style,"AnimationEvent"in window||(delete Un.animationend.animation,delete Un.animationiteration.animation,delete Un.animationstart.animation),"TransitionEvent"in window||delete Un.transitionend.transition);function _r(e){if(os[e])return os[e];if(!Un[e])return e;var t=Un[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in cd)return os[e]=t[n];return e}var dd=_r("animationend"),hd=_r("animationiteration"),md=_r("animationstart"),fd=_r("transitionend"),pd=new Map,tu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function un(e,t){pd.set(e,t),Mn(t,[e])}for(var rs=0;rs<tu.length;rs++){var ss=tu[rs],Yf=ss.toLowerCase(),Gf=ss[0].toUpperCase()+ss.slice(1);un(Yf,"on"+Gf)}un(dd,"onAnimationEnd");un(hd,"onAnimationIteration");un(md,"onAnimationStart");un("dblclick","onDoubleClick");un("focusin","onFocus");un("focusout","onBlur");un(fd,"onTransitionEnd");aa("onMouseEnter",["mouseout","mouseover"]);aa("onMouseLeave",["mouseout","mouseover"]);aa("onPointerEnter",["pointerout","pointerover"]);aa("onPointerLeave",["pointerout","pointerover"]);Mn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Mn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Mn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Mn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Mn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Mn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vf=new Set("cancel close invalid load scroll toggle".split(" ").concat(xa));function nu(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,Hm(a,t,void 0,e),e.currentTarget=null}function gd(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],o=a.event;a=a.listeners;e:{var r=void 0;if(t)for(var i=a.length-1;0<=i;i--){var l=a[i],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==r&&o.isPropagationStopped())break e;nu(o,l,c),r=u}else for(i=0;i<a.length;i++){if(l=a[i],u=l.instance,c=l.currentTarget,l=l.listener,u!==r&&o.isPropagationStopped())break e;nu(o,l,c),r=u}}}if(Zo)throw e=Ws,Zo=!1,Ws=null,e}function le(e,t){var n=t[Ks];n===void 0&&(n=t[Ks]=new Set);var a=e+"__bubble";n.has(a)||(yd(t,e,2,!1),n.add(a))}function is(e,t,n){var a=0;t&&(a|=4),yd(n,e,a,t)}var Co="_reactListening"+Math.random().toString(36).slice(2);function Va(e){if(!e[Co]){e[Co]=!0,Sc.forEach(function(n){n!=="selectionchange"&&(Vf.has(n)||is(n,!1,e),is(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Co]||(t[Co]=!0,is("selectionchange",!1,t))}}function yd(e,t,n,a){switch(ed(t)){case 1:var o=sf;break;case 4:o=lf;break;default:o=zi}n=o.bind(null,t,n,e),o=void 0,!js||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),a?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function ls(e,t,n,a,o){var r=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var l=a.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(i===4)for(i=a.return;i!==null;){var u=i.tag;if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;i=i.return}for(;l!==null;){if(i=vn(l),i===null)return;if(u=i.tag,u===5||u===6){a=r=i;continue e}l=l.parentNode}}a=a.return}Wc(function(){var c=r,d=Di(n),m=[];e:{var g=pd.get(e);if(g!==void 0){var S=$i,y=e;switch(e){case"keypress":if(Wo(n)===0)break e;case"keydown":case"keyup":S=Ef;break;case"focusin":y="focus",S=ts;break;case"focusout":y="blur",S=ts;break;case"beforeblur":case"afterblur":S=ts;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=Hl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=df;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=Nf;break;case dd:case hd:case md:S=ff;break;case fd:S=Tf;break;case"scroll":S=uf;break;case"wheel":S=Af;break;case"copy":case"cut":case"paste":S=gf;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=Gl}var k=(t&4)!==0,E=!k&&e==="scroll",f=k?g!==null?g+"Capture":null:g;k=[];for(var h=c,p;h!==null;){p=h;var N=p.stateNode;if(p.tag===5&&N!==null&&(p=N,f!==null&&(N=za(h,f),N!=null&&k.push(qa(h,N,p)))),E)break;h=h.return}0<k.length&&(g=new S(g,y,null,n,d),m.push({event:g,listeners:k}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",g&&n!==Ds&&(y=n.relatedTarget||n.fromElement)&&(vn(y)||y[Dt]))break e;if((S||g)&&(g=d.window===d?d:(g=d.ownerDocument)?g.defaultView||g.parentWindow:window,S?(y=n.relatedTarget||n.toElement,S=c,y=y?vn(y):null,y!==null&&(E=Bn(y),y!==E||y.tag!==5&&y.tag!==6)&&(y=null)):(S=null,y=c),S!==y)){if(k=Hl,N="onMouseLeave",f="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(k=Gl,N="onPointerLeave",f="onPointerEnter",h="pointer"),E=S==null?g:$n(S),p=y==null?g:$n(y),g=new k(N,h+"leave",S,n,d),g.target=E,g.relatedTarget=p,N=null,vn(d)===c&&(k=new k(f,h+"enter",y,n,d),k.target=p,k.relatedTarget=E,N=k),E=N,S&&y)t:{for(k=S,f=y,h=0,p=k;p;p=On(p))h++;for(p=0,N=f;N;N=On(N))p++;for(;0<h-p;)k=On(k),h--;for(;0<p-h;)f=On(f),p--;for(;h--;){if(k===f||f!==null&&k===f.alternate)break t;k=On(k),f=On(f)}k=null}else k=null;S!==null&&au(m,g,S,k,!1),y!==null&&E!==null&&au(m,E,y,k,!0)}}e:{if(g=c?$n(c):window,S=g.nodeName&&g.nodeName.toLowerCase(),S==="select"||S==="input"&&g.type==="file")var C=Df;else if(Jl(g))if(sd)C=zf;else{C=jf;var A=Ff}else(S=g.nodeName)&&S.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(C=Wf);if(C&&(C=C(e,c))){rd(m,C,n,d);break e}A&&A(e,g,c),e==="focusout"&&(A=g._wrapperState)&&A.controlled&&g.type==="number"&&Ls(g,"number",g.value)}switch(A=c?$n(c):window,e){case"focusin":(Jl(A)||A.contentEditable==="true")&&(zn=A,Hs=c,Ba=null);break;case"focusout":Ba=Hs=zn=null;break;case"mousedown":Ys=!0;break;case"contextmenu":case"mouseup":case"dragend":Ys=!1,eu(m,n,d);break;case"selectionchange":if(Hf)break;case"keydown":case"keyup":eu(m,n,d)}var P;if(Yi)e:{switch(e){case"compositionstart":var B="onCompositionStart";break e;case"compositionend":B="onCompositionEnd";break e;case"compositionupdate":B="onCompositionUpdate";break e}B=void 0}else Wn?ad(e,n)&&(B="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(B="onCompositionStart");B&&(nd&&n.locale!=="ko"&&(Wn||B!=="onCompositionStart"?B==="onCompositionEnd"&&Wn&&(P=td()):(Jt=d,Ui="value"in Jt?Jt.value:Jt.textContent,Wn=!0)),A=or(c,B),0<A.length&&(B=new Yl(B,e,null,n,d),m.push({event:B,listeners:A}),P?B.data=P:(P=od(n),P!==null&&(B.data=P)))),(P=Lf?Mf(e,n):Bf(e,n))&&(c=or(c,"onBeforeInput"),0<c.length&&(d=new Yl("onBeforeInput","beforeinput",null,n,d),m.push({event:d,listeners:c}),d.data=P))}gd(m,t)})}function qa(e,t,n){return{instance:e,listener:t,currentTarget:n}}function or(e,t){for(var n=t+"Capture",a=[];e!==null;){var o=e,r=o.stateNode;o.tag===5&&r!==null&&(o=r,r=za(e,n),r!=null&&a.unshift(qa(e,r,o)),r=za(e,t),r!=null&&a.push(qa(e,r,o))),e=e.return}return a}function On(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function au(e,t,n,a,o){for(var r=t._reactName,i=[];n!==null&&n!==a;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===a)break;l.tag===5&&c!==null&&(l=c,o?(u=za(n,r),u!=null&&i.unshift(qa(n,u,l))):o||(u=za(n,r),u!=null&&i.push(qa(n,u,l)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var qf=/\r\n?/g,Jf=/\u0000|\uFFFD/g;function ou(e){return(typeof e=="string"?e:""+e).replace(qf,`
`).replace(Jf,"")}function To(e,t,n){if(t=ou(t),ou(e)!==t&&n)throw Error(T(425))}function rr(){}var Gs=null,Vs=null;function qs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Js=typeof setTimeout=="function"?setTimeout:void 0,Kf=typeof clearTimeout=="function"?clearTimeout:void 0,ru=typeof Promise=="function"?Promise:void 0,Qf=typeof queueMicrotask=="function"?queueMicrotask:typeof ru<"u"?function(e){return ru.resolve(null).then(e).catch(Xf)}:Js;function Xf(e){setTimeout(function(){throw e})}function us(e,t){var n=t,a=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(a===0){e.removeChild(o),Ha(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=o}while(n);Ha(t)}function tn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function su(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ma=Math.random().toString(36).slice(2),Nt="__reactFiber$"+ma,Ja="__reactProps$"+ma,Dt="__reactContainer$"+ma,Ks="__reactEvents$"+ma,Zf="__reactListeners$"+ma,ep="__reactHandles$"+ma;function vn(e){var t=e[Nt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Dt]||n[Nt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=su(e);e!==null;){if(n=e[Nt])return n;e=su(e)}return t}e=n,n=e.parentNode}return null}function io(e){return e=e[Nt]||e[Dt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function $n(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function Nr(e){return e[Ja]||null}var Qs=[],Hn=-1;function cn(e){return{current:e}}function ue(e){0>Hn||(e.current=Qs[Hn],Qs[Hn]=null,Hn--)}function se(e,t){Hn++,Qs[Hn]=e.current,e.current=t}var ln={},We=cn(ln),Ke=cn(!1),Cn=ln;function oa(e,t){var n=e.type.contextTypes;if(!n)return ln;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var o={},r;for(r in n)o[r]=t[r];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Qe(e){return e=e.childContextTypes,e!=null}function sr(){ue(Ke),ue(We)}function iu(e,t,n){if(We.current!==ln)throw Error(T(168));se(We,t),se(Ke,n)}function wd(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var o in a)if(!(o in t))throw Error(T(108,Dm(e)||"Unknown",o));return fe({},n,a)}function ir(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ln,Cn=We.current,se(We,e),se(Ke,Ke.current),!0}function lu(e,t,n){var a=e.stateNode;if(!a)throw Error(T(169));n?(e=wd(e,t,Cn),a.__reactInternalMemoizedMergedChildContext=e,ue(Ke),ue(We),se(We,e)):ue(Ke),se(Ke,n)}var Lt=null,Cr=!1,cs=!1;function vd(e){Lt===null?Lt=[e]:Lt.push(e)}function tp(e){Cr=!0,vd(e)}function dn(){if(!cs&&Lt!==null){cs=!0;var e=0,t=re;try{var n=Lt;for(re=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Lt=null,Cr=!1}catch(o){throw Lt!==null&&(Lt=Lt.slice(e+1)),Hc(Fi,dn),o}finally{re=t,cs=!1}}return null}var Yn=[],Gn=0,lr=null,ur=0,ut=[],ct=0,Tn=null,Mt=1,Bt="";function pn(e,t){Yn[Gn++]=ur,Yn[Gn++]=lr,lr=e,ur=t}function kd(e,t,n){ut[ct++]=Mt,ut[ct++]=Bt,ut[ct++]=Tn,Tn=e;var a=Mt;e=Bt;var o=32-vt(a)-1;a&=~(1<<o),n+=1;var r=32-vt(t)+o;if(30<r){var i=o-o%5;r=(a&(1<<i)-1).toString(32),a>>=i,o-=i,Mt=1<<32-vt(t)+o|n<<o|a,Bt=r+e}else Mt=1<<r|n<<o|a,Bt=e}function Vi(e){e.return!==null&&(pn(e,1),kd(e,1,0))}function qi(e){for(;e===lr;)lr=Yn[--Gn],Yn[Gn]=null,ur=Yn[--Gn],Yn[Gn]=null;for(;e===Tn;)Tn=ut[--ct],ut[ct]=null,Bt=ut[--ct],ut[ct]=null,Mt=ut[--ct],ut[ct]=null}var at=null,nt=null,ce=!1,wt=null;function Id(e,t){var n=dt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function uu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,at=e,nt=tn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,at=e,nt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Tn!==null?{id:Mt,overflow:Bt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=dt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,at=e,nt=null,!0):!1;default:return!1}}function Xs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Zs(e){if(ce){var t=nt;if(t){var n=t;if(!uu(e,t)){if(Xs(e))throw Error(T(418));t=tn(n.nextSibling);var a=at;t&&uu(e,t)?Id(a,n):(e.flags=e.flags&-4097|2,ce=!1,at=e)}}else{if(Xs(e))throw Error(T(418));e.flags=e.flags&-4097|2,ce=!1,at=e}}}function cu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;at=e}function xo(e){if(e!==at)return!1;if(!ce)return cu(e),ce=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!qs(e.type,e.memoizedProps)),t&&(t=nt)){if(Xs(e))throw bd(),Error(T(418));for(;t;)Id(e,t),t=tn(t.nextSibling)}if(cu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){nt=tn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}nt=null}}else nt=at?tn(e.stateNode.nextSibling):null;return!0}function bd(){for(var e=nt;e;)e=tn(e.nextSibling)}function ra(){nt=at=null,ce=!1}function Ji(e){wt===null?wt=[e]:wt.push(e)}var np=zt.ReactCurrentBatchConfig;function ba(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(T(309));var a=n.stateNode}if(!a)throw Error(T(147,e));var o=a,r=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===r?t.ref:(t=function(i){var l=o.refs;i===null?delete l[r]:l[r]=i},t._stringRef=r,t)}if(typeof e!="string")throw Error(T(284));if(!n._owner)throw Error(T(290,e))}return e}function Ao(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function du(e){var t=e._init;return t(e._payload)}function Ed(e){function t(f,h){if(e){var p=f.deletions;p===null?(f.deletions=[h],f.flags|=16):p.push(h)}}function n(f,h){if(!e)return null;for(;h!==null;)t(f,h),h=h.sibling;return null}function a(f,h){for(f=new Map;h!==null;)h.key!==null?f.set(h.key,h):f.set(h.index,h),h=h.sibling;return f}function o(f,h){return f=rn(f,h),f.index=0,f.sibling=null,f}function r(f,h,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<h?(f.flags|=2,h):p):(f.flags|=2,h)):(f.flags|=1048576,h)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,h,p,N){return h===null||h.tag!==6?(h=ys(p,f.mode,N),h.return=f,h):(h=o(h,p),h.return=f,h)}function u(f,h,p,N){var C=p.type;return C===jn?d(f,h,p.props.children,N,p.key):h!==null&&(h.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===$t&&du(C)===h.type)?(N=o(h,p.props),N.ref=ba(f,h,p),N.return=f,N):(N=Vo(p.type,p.key,p.props,null,f.mode,N),N.ref=ba(f,h,p),N.return=f,N)}function c(f,h,p,N){return h===null||h.tag!==4||h.stateNode.containerInfo!==p.containerInfo||h.stateNode.implementation!==p.implementation?(h=ws(p,f.mode,N),h.return=f,h):(h=o(h,p.children||[]),h.return=f,h)}function d(f,h,p,N,C){return h===null||h.tag!==7?(h=Sn(p,f.mode,N,C),h.return=f,h):(h=o(h,p),h.return=f,h)}function m(f,h,p){if(typeof h=="string"&&h!==""||typeof h=="number")return h=ys(""+h,f.mode,p),h.return=f,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case vo:return p=Vo(h.type,h.key,h.props,null,f.mode,p),p.ref=ba(f,null,h),p.return=f,p;case Fn:return h=ws(h,f.mode,p),h.return=f,h;case $t:var N=h._init;return m(f,N(h._payload),p)}if(Ca(h)||ya(h))return h=Sn(h,f.mode,p,null),h.return=f,h;Ao(f,h)}return null}function g(f,h,p,N){var C=h!==null?h.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return C!==null?null:l(f,h,""+p,N);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case vo:return p.key===C?u(f,h,p,N):null;case Fn:return p.key===C?c(f,h,p,N):null;case $t:return C=p._init,g(f,h,C(p._payload),N)}if(Ca(p)||ya(p))return C!==null?null:d(f,h,p,N,null);Ao(f,p)}return null}function S(f,h,p,N,C){if(typeof N=="string"&&N!==""||typeof N=="number")return f=f.get(p)||null,l(h,f,""+N,C);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case vo:return f=f.get(N.key===null?p:N.key)||null,u(h,f,N,C);case Fn:return f=f.get(N.key===null?p:N.key)||null,c(h,f,N,C);case $t:var A=N._init;return S(f,h,p,A(N._payload),C)}if(Ca(N)||ya(N))return f=f.get(p)||null,d(h,f,N,C,null);Ao(h,N)}return null}function y(f,h,p,N){for(var C=null,A=null,P=h,B=h=0,$=null;P!==null&&B<p.length;B++){P.index>B?($=P,P=null):$=P.sibling;var W=g(f,P,p[B],N);if(W===null){P===null&&(P=$);break}e&&P&&W.alternate===null&&t(f,P),h=r(W,h,B),A===null?C=W:A.sibling=W,A=W,P=$}if(B===p.length)return n(f,P),ce&&pn(f,B),C;if(P===null){for(;B<p.length;B++)P=m(f,p[B],N),P!==null&&(h=r(P,h,B),A===null?C=P:A.sibling=P,A=P);return ce&&pn(f,B),C}for(P=a(f,P);B<p.length;B++)$=S(P,f,B,p[B],N),$!==null&&(e&&$.alternate!==null&&P.delete($.key===null?B:$.key),h=r($,h,B),A===null?C=$:A.sibling=$,A=$);return e&&P.forEach(function(X){return t(f,X)}),ce&&pn(f,B),C}function k(f,h,p,N){var C=ya(p);if(typeof C!="function")throw Error(T(150));if(p=C.call(p),p==null)throw Error(T(151));for(var A=C=null,P=h,B=h=0,$=null,W=p.next();P!==null&&!W.done;B++,W=p.next()){P.index>B?($=P,P=null):$=P.sibling;var X=g(f,P,W.value,N);if(X===null){P===null&&(P=$);break}e&&P&&X.alternate===null&&t(f,P),h=r(X,h,B),A===null?C=X:A.sibling=X,A=X,P=$}if(W.done)return n(f,P),ce&&pn(f,B),C;if(P===null){for(;!W.done;B++,W=p.next())W=m(f,W.value,N),W!==null&&(h=r(W,h,B),A===null?C=W:A.sibling=W,A=W);return ce&&pn(f,B),C}for(P=a(f,P);!W.done;B++,W=p.next())W=S(P,f,B,W.value,N),W!==null&&(e&&W.alternate!==null&&P.delete(W.key===null?B:W.key),h=r(W,h,B),A===null?C=W:A.sibling=W,A=W);return e&&P.forEach(function(Z){return t(f,Z)}),ce&&pn(f,B),C}function E(f,h,p,N){if(typeof p=="object"&&p!==null&&p.type===jn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case vo:e:{for(var C=p.key,A=h;A!==null;){if(A.key===C){if(C=p.type,C===jn){if(A.tag===7){n(f,A.sibling),h=o(A,p.props.children),h.return=f,f=h;break e}}else if(A.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===$t&&du(C)===A.type){n(f,A.sibling),h=o(A,p.props),h.ref=ba(f,A,p),h.return=f,f=h;break e}n(f,A);break}else t(f,A);A=A.sibling}p.type===jn?(h=Sn(p.props.children,f.mode,N,p.key),h.return=f,f=h):(N=Vo(p.type,p.key,p.props,null,f.mode,N),N.ref=ba(f,h,p),N.return=f,f=N)}return i(f);case Fn:e:{for(A=p.key;h!==null;){if(h.key===A)if(h.tag===4&&h.stateNode.containerInfo===p.containerInfo&&h.stateNode.implementation===p.implementation){n(f,h.sibling),h=o(h,p.children||[]),h.return=f,f=h;break e}else{n(f,h);break}else t(f,h);h=h.sibling}h=ws(p,f.mode,N),h.return=f,f=h}return i(f);case $t:return A=p._init,E(f,h,A(p._payload),N)}if(Ca(p))return y(f,h,p,N);if(ya(p))return k(f,h,p,N);Ao(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,h!==null&&h.tag===6?(n(f,h.sibling),h=o(h,p),h.return=f,f=h):(n(f,h),h=ys(p,f.mode,N),h.return=f,f=h),i(f)):n(f,h)}return E}var sa=Ed(!0),Sd=Ed(!1),cr=cn(null),dr=null,Vn=null,Ki=null;function Qi(){Ki=Vn=dr=null}function Xi(e){var t=cr.current;ue(cr),e._currentValue=t}function ei(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function ea(e,t){dr=e,Ki=Vn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Je=!0),e.firstContext=null)}function mt(e){var t=e._currentValue;if(Ki!==e)if(e={context:e,memoizedValue:t,next:null},Vn===null){if(dr===null)throw Error(T(308));Vn=e,dr.dependencies={lanes:0,firstContext:e}}else Vn=Vn.next=e;return t}var kn=null;function Zi(e){kn===null?kn=[e]:kn.push(e)}function _d(e,t,n,a){var o=t.interleaved;return o===null?(n.next=n,Zi(t)):(n.next=o.next,o.next=n),t.interleaved=n,Ft(e,a)}function Ft(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Ht=!1;function el(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Nd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Rt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function nn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,te&2){var o=a.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),a.pending=t,Ft(e,n)}return o=a.interleaved,o===null?(t.next=t,Zi(a)):(t.next=o.next,o.next=t),a.interleaved=t,Ft(e,n)}function zo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ji(e,n)}}function hu(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var o=null,r=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};r===null?o=r=i:r=r.next=i,n=n.next}while(n!==null);r===null?o=r=t:r=r.next=t}else o=r=t;n={baseState:a.baseState,firstBaseUpdate:o,lastBaseUpdate:r,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function hr(e,t,n,a){var o=e.updateQueue;Ht=!1;var r=o.firstBaseUpdate,i=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var u=l,c=u.next;u.next=null,i===null?r=c:i.next=c,i=u;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==i&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=u))}if(r!==null){var m=o.baseState;i=0,d=c=u=null,l=r;do{var g=l.lane,S=l.eventTime;if((a&g)===g){d!==null&&(d=d.next={eventTime:S,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=e,k=l;switch(g=t,S=n,k.tag){case 1:if(y=k.payload,typeof y=="function"){m=y.call(S,m,g);break e}m=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=k.payload,g=typeof y=="function"?y.call(S,m,g):y,g==null)break e;m=fe({},m,g);break e;case 2:Ht=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[l]:g.push(l))}else S={eventTime:S,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=S,u=m):d=d.next=S,i|=g;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;g=l,l=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(d===null&&(u=m),o.baseState=u,o.firstBaseUpdate=c,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else r===null&&(o.shared.lanes=0);An|=i,e.lanes=i,e.memoizedState=m}}function mu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],o=a.callback;if(o!==null){if(a.callback=null,a=n,typeof o!="function")throw Error(T(191,o));o.call(a)}}}var lo={},Tt=cn(lo),Ka=cn(lo),Qa=cn(lo);function In(e){if(e===lo)throw Error(T(174));return e}function tl(e,t){switch(se(Qa,t),se(Ka,e),se(Tt,lo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Bs(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Bs(t,e)}ue(Tt),se(Tt,t)}function ia(){ue(Tt),ue(Ka),ue(Qa)}function Cd(e){In(Qa.current);var t=In(Tt.current),n=Bs(t,e.type);t!==n&&(se(Ka,e),se(Tt,n))}function nl(e){Ka.current===e&&(ue(Tt),ue(Ka))}var he=cn(0);function mr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ds=[];function al(){for(var e=0;e<ds.length;e++)ds[e]._workInProgressVersionPrimary=null;ds.length=0}var Uo=zt.ReactCurrentDispatcher,hs=zt.ReactCurrentBatchConfig,xn=0,me=null,be=null,_e=null,fr=!1,Ra=!1,Xa=0,ap=0;function Re(){throw Error(T(321))}function ol(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!It(e[n],t[n]))return!1;return!0}function rl(e,t,n,a,o,r){if(xn=r,me=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Uo.current=e===null||e.memoizedState===null?ip:lp,e=n(a,o),Ra){r=0;do{if(Ra=!1,Xa=0,25<=r)throw Error(T(301));r+=1,_e=be=null,t.updateQueue=null,Uo.current=up,e=n(a,o)}while(Ra)}if(Uo.current=pr,t=be!==null&&be.next!==null,xn=0,_e=be=me=null,fr=!1,t)throw Error(T(300));return e}function sl(){var e=Xa!==0;return Xa=0,e}function _t(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _e===null?me.memoizedState=_e=e:_e=_e.next=e,_e}function ft(){if(be===null){var e=me.alternate;e=e!==null?e.memoizedState:null}else e=be.next;var t=_e===null?me.memoizedState:_e.next;if(t!==null)_e=t,be=e;else{if(e===null)throw Error(T(310));be=e,e={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},_e===null?me.memoizedState=_e=e:_e=_e.next=e}return _e}function Za(e,t){return typeof t=="function"?t(e):t}function ms(e){var t=ft(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var a=be,o=a.baseQueue,r=n.pending;if(r!==null){if(o!==null){var i=o.next;o.next=r.next,r.next=i}a.baseQueue=o=r,n.pending=null}if(o!==null){r=o.next,a=a.baseState;var l=i=null,u=null,c=r;do{var d=c.lane;if((xn&d)===d)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),a=c.hasEagerState?c.eagerState:e(a,c.action);else{var m={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=m,i=a):u=u.next=m,me.lanes|=d,An|=d}c=c.next}while(c!==null&&c!==r);u===null?i=a:u.next=l,It(a,t.memoizedState)||(Je=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=u,n.lastRenderedState=a}if(e=n.interleaved,e!==null){o=e;do r=o.lane,me.lanes|=r,An|=r,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function fs(e){var t=ft(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var a=n.dispatch,o=n.pending,r=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do r=e(r,i.action),i=i.next;while(i!==o);It(r,t.memoizedState)||(Je=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),n.lastRenderedState=r}return[r,a]}function Td(){}function xd(e,t){var n=me,a=ft(),o=t(),r=!It(a.memoizedState,o);if(r&&(a.memoizedState=o,Je=!0),a=a.queue,il(Ld.bind(null,n,a,e),[e]),a.getSnapshot!==t||r||_e!==null&&_e.memoizedState.tag&1){if(n.flags|=2048,eo(9,Pd.bind(null,n,a,o,t),void 0,null),Ne===null)throw Error(T(349));xn&30||Ad(n,t,o)}return o}function Ad(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=me.updateQueue,t===null?(t={lastEffect:null,stores:null},me.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Pd(e,t,n,a){t.value=n,t.getSnapshot=a,Md(t)&&Bd(e)}function Ld(e,t,n){return n(function(){Md(t)&&Bd(e)})}function Md(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!It(e,n)}catch{return!0}}function Bd(e){var t=Ft(e,1);t!==null&&kt(t,e,1,-1)}function fu(e){var t=_t();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Za,lastRenderedState:e},t.queue=e,e=e.dispatch=sp.bind(null,me,e),[t.memoizedState,e]}function eo(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=me.updateQueue,t===null?(t={lastEffect:null,stores:null},me.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function Rd(){return ft().memoizedState}function $o(e,t,n,a){var o=_t();me.flags|=e,o.memoizedState=eo(1|t,n,void 0,a===void 0?null:a)}function Tr(e,t,n,a){var o=ft();a=a===void 0?null:a;var r=void 0;if(be!==null){var i=be.memoizedState;if(r=i.destroy,a!==null&&ol(a,i.deps)){o.memoizedState=eo(t,n,r,a);return}}me.flags|=e,o.memoizedState=eo(1|t,n,r,a)}function pu(e,t){return $o(8390656,8,e,t)}function il(e,t){return Tr(2048,8,e,t)}function Od(e,t){return Tr(4,2,e,t)}function Dd(e,t){return Tr(4,4,e,t)}function Fd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function jd(e,t,n){return n=n!=null?n.concat([e]):null,Tr(4,4,Fd.bind(null,t,e),n)}function ll(){}function Wd(e,t){var n=ft();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&ol(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function zd(e,t){var n=ft();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&ol(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function Ud(e,t,n){return xn&21?(It(n,t)||(n=Vc(),me.lanes|=n,An|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Je=!0),e.memoizedState=n)}function op(e,t){var n=re;re=n!==0&&4>n?n:4,e(!0);var a=hs.transition;hs.transition={};try{e(!1),t()}finally{re=n,hs.transition=a}}function $d(){return ft().memoizedState}function rp(e,t,n){var a=on(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Hd(e))Yd(t,n);else if(n=_d(e,t,n,a),n!==null){var o=He();kt(n,e,a,o),Gd(n,t,a)}}function sp(e,t,n){var a=on(e),o={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Hd(e))Yd(t,o);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var i=t.lastRenderedState,l=r(i,n);if(o.hasEagerState=!0,o.eagerState=l,It(l,i)){var u=t.interleaved;u===null?(o.next=o,Zi(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch{}finally{}n=_d(e,t,o,a),n!==null&&(o=He(),kt(n,e,a,o),Gd(n,t,a))}}function Hd(e){var t=e.alternate;return e===me||t!==null&&t===me}function Yd(e,t){Ra=fr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Gd(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ji(e,n)}}var pr={readContext:mt,useCallback:Re,useContext:Re,useEffect:Re,useImperativeHandle:Re,useInsertionEffect:Re,useLayoutEffect:Re,useMemo:Re,useReducer:Re,useRef:Re,useState:Re,useDebugValue:Re,useDeferredValue:Re,useTransition:Re,useMutableSource:Re,useSyncExternalStore:Re,useId:Re,unstable_isNewReconciler:!1},ip={readContext:mt,useCallback:function(e,t){return _t().memoizedState=[e,t===void 0?null:t],e},useContext:mt,useEffect:pu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,$o(4194308,4,Fd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return $o(4194308,4,e,t)},useInsertionEffect:function(e,t){return $o(4,2,e,t)},useMemo:function(e,t){var n=_t();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=_t();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=rp.bind(null,me,e),[a.memoizedState,e]},useRef:function(e){var t=_t();return e={current:e},t.memoizedState=e},useState:fu,useDebugValue:ll,useDeferredValue:function(e){return _t().memoizedState=e},useTransition:function(){var e=fu(!1),t=e[0];return e=op.bind(null,e[1]),_t().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=me,o=_t();if(ce){if(n===void 0)throw Error(T(407));n=n()}else{if(n=t(),Ne===null)throw Error(T(349));xn&30||Ad(a,t,n)}o.memoizedState=n;var r={value:n,getSnapshot:t};return o.queue=r,pu(Ld.bind(null,a,r,e),[e]),a.flags|=2048,eo(9,Pd.bind(null,a,r,n,t),void 0,null),n},useId:function(){var e=_t(),t=Ne.identifierPrefix;if(ce){var n=Bt,a=Mt;n=(a&~(1<<32-vt(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xa++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ap++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},lp={readContext:mt,useCallback:Wd,useContext:mt,useEffect:il,useImperativeHandle:jd,useInsertionEffect:Od,useLayoutEffect:Dd,useMemo:zd,useReducer:ms,useRef:Rd,useState:function(){return ms(Za)},useDebugValue:ll,useDeferredValue:function(e){var t=ft();return Ud(t,be.memoizedState,e)},useTransition:function(){var e=ms(Za)[0],t=ft().memoizedState;return[e,t]},useMutableSource:Td,useSyncExternalStore:xd,useId:$d,unstable_isNewReconciler:!1},up={readContext:mt,useCallback:Wd,useContext:mt,useEffect:il,useImperativeHandle:jd,useInsertionEffect:Od,useLayoutEffect:Dd,useMemo:zd,useReducer:fs,useRef:Rd,useState:function(){return fs(Za)},useDebugValue:ll,useDeferredValue:function(e){var t=ft();return be===null?t.memoizedState=e:Ud(t,be.memoizedState,e)},useTransition:function(){var e=fs(Za)[0],t=ft().memoizedState;return[e,t]},useMutableSource:Td,useSyncExternalStore:xd,useId:$d,unstable_isNewReconciler:!1};function gt(e,t){if(e&&e.defaultProps){t=fe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ti(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:fe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var xr={isMounted:function(e){return(e=e._reactInternals)?Bn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=He(),o=on(e),r=Rt(a,o);r.payload=t,n!=null&&(r.callback=n),t=nn(e,r,o),t!==null&&(kt(t,e,o,a),zo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=He(),o=on(e),r=Rt(a,o);r.tag=1,r.payload=t,n!=null&&(r.callback=n),t=nn(e,r,o),t!==null&&(kt(t,e,o,a),zo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=He(),a=on(e),o=Rt(n,a);o.tag=2,t!=null&&(o.callback=t),t=nn(e,o,a),t!==null&&(kt(t,e,a,n),zo(t,e,a))}};function gu(e,t,n,a,o,r,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,r,i):t.prototype&&t.prototype.isPureReactComponent?!Ga(n,a)||!Ga(o,r):!0}function Vd(e,t,n){var a=!1,o=ln,r=t.contextType;return typeof r=="object"&&r!==null?r=mt(r):(o=Qe(t)?Cn:We.current,a=t.contextTypes,r=(a=a!=null)?oa(e,o):ln),t=new t(n,r),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=xr,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=r),t}function yu(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&xr.enqueueReplaceState(t,t.state,null)}function ni(e,t,n,a){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},el(e);var r=t.contextType;typeof r=="object"&&r!==null?o.context=mt(r):(r=Qe(t)?Cn:We.current,o.context=oa(e,r)),o.state=e.memoizedState,r=t.getDerivedStateFromProps,typeof r=="function"&&(ti(e,t,r,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&xr.enqueueReplaceState(o,o.state,null),hr(e,n,o,a),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function la(e,t){try{var n="",a=t;do n+=Om(a),a=a.return;while(a);var o=n}catch(r){o=`
Error generating stack: `+r.message+`
`+r.stack}return{value:e,source:t,stack:o,digest:null}}function ps(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ai(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var cp=typeof WeakMap=="function"?WeakMap:Map;function qd(e,t,n){n=Rt(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){yr||(yr=!0,mi=a),ai(e,t)},n}function Jd(e,t,n){n=Rt(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var o=t.value;n.payload=function(){return a(o)},n.callback=function(){ai(e,t)}}var r=e.stateNode;return r!==null&&typeof r.componentDidCatch=="function"&&(n.callback=function(){ai(e,t),typeof a!="function"&&(an===null?an=new Set([this]):an.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function wu(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new cp;var o=new Set;a.set(t,o)}else o=a.get(t),o===void 0&&(o=new Set,a.set(t,o));o.has(n)||(o.add(n),e=Sp.bind(null,e,t,n),t.then(e,e))}function vu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ku(e,t,n,a,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Rt(-1,1),t.tag=2,nn(n,t,1))),n.lanes|=1),e)}var dp=zt.ReactCurrentOwner,Je=!1;function $e(e,t,n,a){t.child=e===null?Sd(t,null,n,a):sa(t,e.child,n,a)}function Iu(e,t,n,a,o){n=n.render;var r=t.ref;return ea(t,o),a=rl(e,t,n,a,r,o),n=sl(),e!==null&&!Je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,jt(e,t,o)):(ce&&n&&Vi(t),t.flags|=1,$e(e,t,a,o),t.child)}function bu(e,t,n,a,o){if(e===null){var r=n.type;return typeof r=="function"&&!gl(r)&&r.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=r,Kd(e,t,r,a,o)):(e=Vo(n.type,null,a,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!(e.lanes&o)){var i=r.memoizedProps;if(n=n.compare,n=n!==null?n:Ga,n(i,a)&&e.ref===t.ref)return jt(e,t,o)}return t.flags|=1,e=rn(r,a),e.ref=t.ref,e.return=t,t.child=e}function Kd(e,t,n,a,o){if(e!==null){var r=e.memoizedProps;if(Ga(r,a)&&e.ref===t.ref)if(Je=!1,t.pendingProps=a=r,(e.lanes&o)!==0)e.flags&131072&&(Je=!0);else return t.lanes=e.lanes,jt(e,t,o)}return oi(e,t,n,a,o)}function Qd(e,t,n){var a=t.pendingProps,o=a.children,r=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},se(Jn,tt),tt|=n;else{if(!(n&1073741824))return e=r!==null?r.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,se(Jn,tt),tt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=r!==null?r.baseLanes:n,se(Jn,tt),tt|=a}else r!==null?(a=r.baseLanes|n,t.memoizedState=null):a=n,se(Jn,tt),tt|=a;return $e(e,t,o,n),t.child}function Xd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function oi(e,t,n,a,o){var r=Qe(n)?Cn:We.current;return r=oa(t,r),ea(t,o),n=rl(e,t,n,a,r,o),a=sl(),e!==null&&!Je?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,jt(e,t,o)):(ce&&a&&Vi(t),t.flags|=1,$e(e,t,n,o),t.child)}function Eu(e,t,n,a,o){if(Qe(n)){var r=!0;ir(t)}else r=!1;if(ea(t,o),t.stateNode===null)Ho(e,t),Vd(t,n,a),ni(t,n,a,o),a=!0;else if(e===null){var i=t.stateNode,l=t.memoizedProps;i.props=l;var u=i.context,c=n.contextType;typeof c=="object"&&c!==null?c=mt(c):(c=Qe(n)?Cn:We.current,c=oa(t,c));var d=n.getDerivedStateFromProps,m=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function";m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==a||u!==c)&&yu(t,i,a,c),Ht=!1;var g=t.memoizedState;i.state=g,hr(t,a,i,o),u=t.memoizedState,l!==a||g!==u||Ke.current||Ht?(typeof d=="function"&&(ti(t,n,d,a),u=t.memoizedState),(l=Ht||gu(t,n,l,a,g,u,c))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=u),i.props=a,i.state=u,i.context=c,a=l):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,Nd(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:gt(t.type,l),i.props=c,m=t.pendingProps,g=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=mt(u):(u=Qe(n)?Cn:We.current,u=oa(t,u));var S=n.getDerivedStateFromProps;(d=typeof S=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==m||g!==u)&&yu(t,i,a,u),Ht=!1,g=t.memoizedState,i.state=g,hr(t,a,i,o);var y=t.memoizedState;l!==m||g!==y||Ke.current||Ht?(typeof S=="function"&&(ti(t,n,S,a),y=t.memoizedState),(c=Ht||gu(t,n,c,a,g,y,u)||!1)?(d||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,y,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,y,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=u,a=c):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),a=!1)}return ri(e,t,n,a,r,o)}function ri(e,t,n,a,o,r){Xd(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return o&&lu(t,n,!1),jt(e,t,r);a=t.stateNode,dp.current=t;var l=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=sa(t,e.child,null,r),t.child=sa(t,null,l,r)):$e(e,t,l,r),t.memoizedState=a.state,o&&lu(t,n,!0),t.child}function Zd(e){var t=e.stateNode;t.pendingContext?iu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&iu(e,t.context,!1),tl(e,t.containerInfo)}function Su(e,t,n,a,o){return ra(),Ji(o),t.flags|=256,$e(e,t,n,a),t.child}var si={dehydrated:null,treeContext:null,retryLane:0};function ii(e){return{baseLanes:e,cachePool:null,transitions:null}}function eh(e,t,n){var a=t.pendingProps,o=he.current,r=!1,i=(t.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(r=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),se(he,o&1),e===null)return Zs(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,r?(a=t.mode,r=t.child,i={mode:"hidden",children:i},!(a&1)&&r!==null?(r.childLanes=0,r.pendingProps=i):r=Lr(i,a,0,null),e=Sn(e,a,n,null),r.return=t,e.return=t,r.sibling=e,t.child=r,t.child.memoizedState=ii(n),t.memoizedState=si,e):ul(t,i));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return hp(e,t,i,a,l,o,n);if(r){r=a.fallback,i=t.mode,o=e.child,l=o.sibling;var u={mode:"hidden",children:a.children};return!(i&1)&&t.child!==o?(a=t.child,a.childLanes=0,a.pendingProps=u,t.deletions=null):(a=rn(o,u),a.subtreeFlags=o.subtreeFlags&14680064),l!==null?r=rn(l,r):(r=Sn(r,i,n,null),r.flags|=2),r.return=t,a.return=t,a.sibling=r,t.child=a,a=r,r=t.child,i=e.child.memoizedState,i=i===null?ii(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},r.memoizedState=i,r.childLanes=e.childLanes&~n,t.memoizedState=si,a}return r=e.child,e=r.sibling,a=rn(r,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function ul(e,t){return t=Lr({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Po(e,t,n,a){return a!==null&&Ji(a),sa(t,e.child,null,n),e=ul(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hp(e,t,n,a,o,r,i){if(n)return t.flags&256?(t.flags&=-257,a=ps(Error(T(422))),Po(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(r=a.fallback,o=t.mode,a=Lr({mode:"visible",children:a.children},o,0,null),r=Sn(r,o,i,null),r.flags|=2,a.return=t,r.return=t,a.sibling=r,t.child=a,t.mode&1&&sa(t,e.child,null,i),t.child.memoizedState=ii(i),t.memoizedState=si,r);if(!(t.mode&1))return Po(e,t,i,null);if(o.data==="$!"){if(a=o.nextSibling&&o.nextSibling.dataset,a)var l=a.dgst;return a=l,r=Error(T(419)),a=ps(r,a,void 0),Po(e,t,i,a)}if(l=(i&e.childLanes)!==0,Je||l){if(a=Ne,a!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(a.suspendedLanes|i)?0:o,o!==0&&o!==r.retryLane&&(r.retryLane=o,Ft(e,o),kt(a,e,o,-1))}return pl(),a=ps(Error(T(421))),Po(e,t,i,a)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=_p.bind(null,e),o._reactRetry=t,null):(e=r.treeContext,nt=tn(o.nextSibling),at=t,ce=!0,wt=null,e!==null&&(ut[ct++]=Mt,ut[ct++]=Bt,ut[ct++]=Tn,Mt=e.id,Bt=e.overflow,Tn=t),t=ul(t,a.children),t.flags|=4096,t)}function _u(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),ei(e.return,t,n)}function gs(e,t,n,a,o){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:o}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=a,r.tail=n,r.tailMode=o)}function th(e,t,n){var a=t.pendingProps,o=a.revealOrder,r=a.tail;if($e(e,t,a.children,n),a=he.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&_u(e,n,t);else if(e.tag===19)_u(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(se(he,a),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&mr(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),gs(t,!1,o,n,r);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&mr(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}gs(t,!0,n,null,r);break;case"together":gs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ho(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),An|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,n=rn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=rn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function mp(e,t,n){switch(t.tag){case 3:Zd(t),ra();break;case 5:Cd(t);break;case 1:Qe(t.type)&&ir(t);break;case 4:tl(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,o=t.memoizedProps.value;se(cr,a._currentValue),a._currentValue=o;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(se(he,he.current&1),t.flags|=128,null):n&t.child.childLanes?eh(e,t,n):(se(he,he.current&1),e=jt(e,t,n),e!==null?e.sibling:null);se(he,he.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return th(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),se(he,he.current),a)break;return null;case 22:case 23:return t.lanes=0,Qd(e,t,n)}return jt(e,t,n)}var nh,li,ah,oh;nh=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};li=function(){};ah=function(e,t,n,a){var o=e.memoizedProps;if(o!==a){e=t.stateNode,In(Tt.current);var r=null;switch(n){case"input":o=As(e,o),a=As(e,a),r=[];break;case"select":o=fe({},o,{value:void 0}),a=fe({},a,{value:void 0}),r=[];break;case"textarea":o=Ms(e,o),a=Ms(e,a),r=[];break;default:typeof o.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=rr)}Rs(n,a);var i;n=null;for(c in o)if(!a.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var l=o[c];for(i in l)l.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ja.hasOwnProperty(c)?r||(r=[]):(r=r||[]).push(c,null));for(c in a){var u=a[c];if(l=o!=null?o[c]:void 0,a.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(i in l)!l.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in u)u.hasOwnProperty(i)&&l[i]!==u[i]&&(n||(n={}),n[i]=u[i])}else n||(r||(r=[]),r.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(r=r||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(r=r||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ja.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&le("scroll",e),r||l===u||(r=[])):(r=r||[]).push(c,u))}n&&(r=r||[]).push("style",n);var c=r;(t.updateQueue=c)&&(t.flags|=4)}};oh=function(e,t,n,a){n!==a&&(t.flags|=4)};function Ea(e,t){if(!ce)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Oe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,a|=o.subtreeFlags&14680064,a|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,a|=o.subtreeFlags,a|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function fp(e,t,n){var a=t.pendingProps;switch(qi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Oe(t),null;case 1:return Qe(t.type)&&sr(),Oe(t),null;case 3:return a=t.stateNode,ia(),ue(Ke),ue(We),al(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(xo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,wt!==null&&(gi(wt),wt=null))),li(e,t),Oe(t),null;case 5:nl(t);var o=In(Qa.current);if(n=t.type,e!==null&&t.stateNode!=null)ah(e,t,n,a,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(T(166));return Oe(t),null}if(e=In(Tt.current),xo(t)){a=t.stateNode,n=t.type;var r=t.memoizedProps;switch(a[Nt]=t,a[Ja]=r,e=(t.mode&1)!==0,n){case"dialog":le("cancel",a),le("close",a);break;case"iframe":case"object":case"embed":le("load",a);break;case"video":case"audio":for(o=0;o<xa.length;o++)le(xa[o],a);break;case"source":le("error",a);break;case"img":case"image":case"link":le("error",a),le("load",a);break;case"details":le("toggle",a);break;case"input":Bl(a,r),le("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!r.multiple},le("invalid",a);break;case"textarea":Ol(a,r),le("invalid",a)}Rs(n,r),o=null;for(var i in r)if(r.hasOwnProperty(i)){var l=r[i];i==="children"?typeof l=="string"?a.textContent!==l&&(r.suppressHydrationWarning!==!0&&To(a.textContent,l,e),o=["children",l]):typeof l=="number"&&a.textContent!==""+l&&(r.suppressHydrationWarning!==!0&&To(a.textContent,l,e),o=["children",""+l]):ja.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&le("scroll",a)}switch(n){case"input":ko(a),Rl(a,r,!0);break;case"textarea":ko(a),Dl(a);break;case"select":case"option":break;default:typeof r.onClick=="function"&&(a.onclick=rr)}a=o,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Lc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[Nt]=t,e[Ja]=a,nh(e,t,!1,!1),t.stateNode=e;e:{switch(i=Os(n,a),n){case"dialog":le("cancel",e),le("close",e),o=a;break;case"iframe":case"object":case"embed":le("load",e),o=a;break;case"video":case"audio":for(o=0;o<xa.length;o++)le(xa[o],e);o=a;break;case"source":le("error",e),o=a;break;case"img":case"image":case"link":le("error",e),le("load",e),o=a;break;case"details":le("toggle",e),o=a;break;case"input":Bl(e,a),o=As(e,a),le("invalid",e);break;case"option":o=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},o=fe({},a,{value:void 0}),le("invalid",e);break;case"textarea":Ol(e,a),o=Ms(e,a),le("invalid",e);break;default:o=a}Rs(n,o),l=o;for(r in l)if(l.hasOwnProperty(r)){var u=l[r];r==="style"?Rc(e,u):r==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Mc(e,u)):r==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Wa(e,u):typeof u=="number"&&Wa(e,""+u):r!=="suppressContentEditableWarning"&&r!=="suppressHydrationWarning"&&r!=="autoFocus"&&(ja.hasOwnProperty(r)?u!=null&&r==="onScroll"&&le("scroll",e):u!=null&&Mi(e,r,u,i))}switch(n){case"input":ko(e),Rl(e,a,!1);break;case"textarea":ko(e),Dl(e);break;case"option":a.value!=null&&e.setAttribute("value",""+sn(a.value));break;case"select":e.multiple=!!a.multiple,r=a.value,r!=null?Kn(e,!!a.multiple,r,!1):a.defaultValue!=null&&Kn(e,!!a.multiple,a.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=rr)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Oe(t),null;case 6:if(e&&t.stateNode!=null)oh(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(T(166));if(n=In(Qa.current),In(Tt.current),xo(t)){if(a=t.stateNode,n=t.memoizedProps,a[Nt]=t,(r=a.nodeValue!==n)&&(e=at,e!==null))switch(e.tag){case 3:To(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&To(a.nodeValue,n,(e.mode&1)!==0)}r&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Nt]=t,t.stateNode=a}return Oe(t),null;case 13:if(ue(he),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ce&&nt!==null&&t.mode&1&&!(t.flags&128))bd(),ra(),t.flags|=98560,r=!1;else if(r=xo(t),a!==null&&a.dehydrated!==null){if(e===null){if(!r)throw Error(T(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(T(317));r[Nt]=t}else ra(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Oe(t),r=!1}else wt!==null&&(gi(wt),wt=null),r=!0;if(!r)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||he.current&1?Ee===0&&(Ee=3):pl())),t.updateQueue!==null&&(t.flags|=4),Oe(t),null);case 4:return ia(),li(e,t),e===null&&Va(t.stateNode.containerInfo),Oe(t),null;case 10:return Xi(t.type._context),Oe(t),null;case 17:return Qe(t.type)&&sr(),Oe(t),null;case 19:if(ue(he),r=t.memoizedState,r===null)return Oe(t),null;if(a=(t.flags&128)!==0,i=r.rendering,i===null)if(a)Ea(r,!1);else{if(Ee!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=mr(e),i!==null){for(t.flags|=128,Ea(r,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)r=n,e=a,r.flags&=14680066,i=r.alternate,i===null?(r.childLanes=0,r.lanes=e,r.child=null,r.subtreeFlags=0,r.memoizedProps=null,r.memoizedState=null,r.updateQueue=null,r.dependencies=null,r.stateNode=null):(r.childLanes=i.childLanes,r.lanes=i.lanes,r.child=i.child,r.subtreeFlags=0,r.deletions=null,r.memoizedProps=i.memoizedProps,r.memoizedState=i.memoizedState,r.updateQueue=i.updateQueue,r.type=i.type,e=i.dependencies,r.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return se(he,he.current&1|2),t.child}e=e.sibling}r.tail!==null&&we()>ua&&(t.flags|=128,a=!0,Ea(r,!1),t.lanes=4194304)}else{if(!a)if(e=mr(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ea(r,!0),r.tail===null&&r.tailMode==="hidden"&&!i.alternate&&!ce)return Oe(t),null}else 2*we()-r.renderingStartTime>ua&&n!==1073741824&&(t.flags|=128,a=!0,Ea(r,!1),t.lanes=4194304);r.isBackwards?(i.sibling=t.child,t.child=i):(n=r.last,n!==null?n.sibling=i:t.child=i,r.last=i)}return r.tail!==null?(t=r.tail,r.rendering=t,r.tail=t.sibling,r.renderingStartTime=we(),t.sibling=null,n=he.current,se(he,a?n&1|2:n&1),t):(Oe(t),null);case 22:case 23:return fl(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?tt&1073741824&&(Oe(t),t.subtreeFlags&6&&(t.flags|=8192)):Oe(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function pp(e,t){switch(qi(t),t.tag){case 1:return Qe(t.type)&&sr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ia(),ue(Ke),ue(We),al(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return nl(t),null;case 13:if(ue(he),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));ra()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ue(he),null;case 4:return ia(),null;case 10:return Xi(t.type._context),null;case 22:case 23:return fl(),null;case 24:return null;default:return null}}var Lo=!1,Fe=!1,gp=typeof WeakSet=="function"?WeakSet:Set,O=null;function qn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){ge(e,t,a)}else n.current=null}function ui(e,t,n){try{n()}catch(a){ge(e,t,a)}}var Nu=!1;function yp(e,t){if(Gs=nr,e=ud(),Gi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var o=a.anchorOffset,r=a.focusNode;a=a.focusOffset;try{n.nodeType,r.nodeType}catch{n=null;break e}var i=0,l=-1,u=-1,c=0,d=0,m=e,g=null;t:for(;;){for(var S;m!==n||o!==0&&m.nodeType!==3||(l=i+o),m!==r||a!==0&&m.nodeType!==3||(u=i+a),m.nodeType===3&&(i+=m.nodeValue.length),(S=m.firstChild)!==null;)g=m,m=S;for(;;){if(m===e)break t;if(g===n&&++c===o&&(l=i),g===r&&++d===a&&(u=i),(S=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=S}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Vs={focusedElem:e,selectionRange:n},nr=!1,O=t;O!==null;)if(t=O,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,O=e;else for(;O!==null;){t=O;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var k=y.memoizedProps,E=y.memoizedState,f=t.stateNode,h=f.getSnapshotBeforeUpdate(t.elementType===t.type?k:gt(t.type,k),E);f.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(N){ge(t,t.return,N)}if(e=t.sibling,e!==null){e.return=t.return,O=e;break}O=t.return}return y=Nu,Nu=!1,y}function Oa(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var o=a=a.next;do{if((o.tag&e)===e){var r=o.destroy;o.destroy=void 0,r!==void 0&&ui(t,n,r)}o=o.next}while(o!==a)}}function Ar(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function ci(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function rh(e){var t=e.alternate;t!==null&&(e.alternate=null,rh(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Nt],delete t[Ja],delete t[Ks],delete t[Zf],delete t[ep])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sh(e){return e.tag===5||e.tag===3||e.tag===4}function Cu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sh(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function di(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=rr));else if(a!==4&&(e=e.child,e!==null))for(di(e,t,n),e=e.sibling;e!==null;)di(e,t,n),e=e.sibling}function hi(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(hi(e,t,n),e=e.sibling;e!==null;)hi(e,t,n),e=e.sibling}var xe=null,yt=!1;function Ut(e,t,n){for(n=n.child;n!==null;)ih(e,t,n),n=n.sibling}function ih(e,t,n){if(Ct&&typeof Ct.onCommitFiberUnmount=="function")try{Ct.onCommitFiberUnmount(br,n)}catch{}switch(n.tag){case 5:Fe||qn(n,t);case 6:var a=xe,o=yt;xe=null,Ut(e,t,n),xe=a,yt=o,xe!==null&&(yt?(e=xe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):xe.removeChild(n.stateNode));break;case 18:xe!==null&&(yt?(e=xe,n=n.stateNode,e.nodeType===8?us(e.parentNode,n):e.nodeType===1&&us(e,n),Ha(e)):us(xe,n.stateNode));break;case 4:a=xe,o=yt,xe=n.stateNode.containerInfo,yt=!0,Ut(e,t,n),xe=a,yt=o;break;case 0:case 11:case 14:case 15:if(!Fe&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){o=a=a.next;do{var r=o,i=r.destroy;r=r.tag,i!==void 0&&(r&2||r&4)&&ui(n,t,i),o=o.next}while(o!==a)}Ut(e,t,n);break;case 1:if(!Fe&&(qn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(l){ge(n,t,l)}Ut(e,t,n);break;case 21:Ut(e,t,n);break;case 22:n.mode&1?(Fe=(a=Fe)||n.memoizedState!==null,Ut(e,t,n),Fe=a):Ut(e,t,n);break;default:Ut(e,t,n)}}function Tu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new gp),t.forEach(function(a){var o=Np.bind(null,e,a);n.has(a)||(n.add(a),a.then(o,o))})}}function pt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];try{var r=e,i=t,l=i;e:for(;l!==null;){switch(l.tag){case 5:xe=l.stateNode,yt=!1;break e;case 3:xe=l.stateNode.containerInfo,yt=!0;break e;case 4:xe=l.stateNode.containerInfo,yt=!0;break e}l=l.return}if(xe===null)throw Error(T(160));ih(r,i,o),xe=null,yt=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(c){ge(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)lh(t,e),t=t.sibling}function lh(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(pt(t,e),Et(e),a&4){try{Oa(3,e,e.return),Ar(3,e)}catch(k){ge(e,e.return,k)}try{Oa(5,e,e.return)}catch(k){ge(e,e.return,k)}}break;case 1:pt(t,e),Et(e),a&512&&n!==null&&qn(n,n.return);break;case 5:if(pt(t,e),Et(e),a&512&&n!==null&&qn(n,n.return),e.flags&32){var o=e.stateNode;try{Wa(o,"")}catch(k){ge(e,e.return,k)}}if(a&4&&(o=e.stateNode,o!=null)){var r=e.memoizedProps,i=n!==null?n.memoizedProps:r,l=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{l==="input"&&r.type==="radio"&&r.name!=null&&Ac(o,r),Os(l,i);var c=Os(l,r);for(i=0;i<u.length;i+=2){var d=u[i],m=u[i+1];d==="style"?Rc(o,m):d==="dangerouslySetInnerHTML"?Mc(o,m):d==="children"?Wa(o,m):Mi(o,d,m,c)}switch(l){case"input":Ps(o,r);break;case"textarea":Pc(o,r);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!r.multiple;var S=r.value;S!=null?Kn(o,!!r.multiple,S,!1):g!==!!r.multiple&&(r.defaultValue!=null?Kn(o,!!r.multiple,r.defaultValue,!0):Kn(o,!!r.multiple,r.multiple?[]:"",!1))}o[Ja]=r}catch(k){ge(e,e.return,k)}}break;case 6:if(pt(t,e),Et(e),a&4){if(e.stateNode===null)throw Error(T(162));o=e.stateNode,r=e.memoizedProps;try{o.nodeValue=r}catch(k){ge(e,e.return,k)}}break;case 3:if(pt(t,e),Et(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Ha(t.containerInfo)}catch(k){ge(e,e.return,k)}break;case 4:pt(t,e),Et(e);break;case 13:pt(t,e),Et(e),o=e.child,o.flags&8192&&(r=o.memoizedState!==null,o.stateNode.isHidden=r,!r||o.alternate!==null&&o.alternate.memoizedState!==null||(hl=we())),a&4&&Tu(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Fe=(c=Fe)||d,pt(t,e),Fe=c):pt(t,e),Et(e),a&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(O=e,d=e.child;d!==null;){for(m=O=d;O!==null;){switch(g=O,S=g.child,g.tag){case 0:case 11:case 14:case 15:Oa(4,g,g.return);break;case 1:qn(g,g.return);var y=g.stateNode;if(typeof y.componentWillUnmount=="function"){a=g,n=g.return;try{t=a,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(k){ge(a,n,k)}}break;case 5:qn(g,g.return);break;case 22:if(g.memoizedState!==null){Au(m);continue}}S!==null?(S.return=g,O=S):Au(m)}d=d.sibling}e:for(d=null,m=e;;){if(m.tag===5){if(d===null){d=m;try{o=m.stateNode,c?(r=o.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"):(l=m.stateNode,u=m.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Bc("display",i))}catch(k){ge(e,e.return,k)}}}else if(m.tag===6){if(d===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(k){ge(e,e.return,k)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;d===m&&(d=null),m=m.return}d===m&&(d=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:pt(t,e),Et(e),a&4&&Tu(e);break;case 21:break;default:pt(t,e),Et(e)}}function Et(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(sh(n)){var a=n;break e}n=n.return}throw Error(T(160))}switch(a.tag){case 5:var o=a.stateNode;a.flags&32&&(Wa(o,""),a.flags&=-33);var r=Cu(e);hi(e,r,o);break;case 3:case 4:var i=a.stateNode.containerInfo,l=Cu(e);di(e,l,i);break;default:throw Error(T(161))}}catch(u){ge(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wp(e,t,n){O=e,uh(e)}function uh(e,t,n){for(var a=(e.mode&1)!==0;O!==null;){var o=O,r=o.child;if(o.tag===22&&a){var i=o.memoizedState!==null||Lo;if(!i){var l=o.alternate,u=l!==null&&l.memoizedState!==null||Fe;l=Lo;var c=Fe;if(Lo=i,(Fe=u)&&!c)for(O=o;O!==null;)i=O,u=i.child,i.tag===22&&i.memoizedState!==null?Pu(o):u!==null?(u.return=i,O=u):Pu(o);for(;r!==null;)O=r,uh(r),r=r.sibling;O=o,Lo=l,Fe=c}xu(e)}else o.subtreeFlags&8772&&r!==null?(r.return=o,O=r):xu(e)}}function xu(e){for(;O!==null;){var t=O;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Fe||Ar(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!Fe)if(n===null)a.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:gt(t.type,n.memoizedProps);a.componentDidUpdate(o,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var r=t.updateQueue;r!==null&&mu(t,r,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}mu(t,i,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var m=d.dehydrated;m!==null&&Ha(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}Fe||t.flags&512&&ci(t)}catch(g){ge(t,t.return,g)}}if(t===e){O=null;break}if(n=t.sibling,n!==null){n.return=t.return,O=n;break}O=t.return}}function Au(e){for(;O!==null;){var t=O;if(t===e){O=null;break}var n=t.sibling;if(n!==null){n.return=t.return,O=n;break}O=t.return}}function Pu(e){for(;O!==null;){var t=O;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ar(4,t)}catch(u){ge(t,n,u)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var o=t.return;try{a.componentDidMount()}catch(u){ge(t,o,u)}}var r=t.return;try{ci(t)}catch(u){ge(t,r,u)}break;case 5:var i=t.return;try{ci(t)}catch(u){ge(t,i,u)}}}catch(u){ge(t,t.return,u)}if(t===e){O=null;break}var l=t.sibling;if(l!==null){l.return=t.return,O=l;break}O=t.return}}var vp=Math.ceil,gr=zt.ReactCurrentDispatcher,cl=zt.ReactCurrentOwner,ht=zt.ReactCurrentBatchConfig,te=0,Ne=null,ke=null,Pe=0,tt=0,Jn=cn(0),Ee=0,to=null,An=0,Pr=0,dl=0,Da=null,qe=null,hl=0,ua=1/0,Pt=null,yr=!1,mi=null,an=null,Mo=!1,Kt=null,wr=0,Fa=0,fi=null,Yo=-1,Go=0;function He(){return te&6?we():Yo!==-1?Yo:Yo=we()}function on(e){return e.mode&1?te&2&&Pe!==0?Pe&-Pe:np.transition!==null?(Go===0&&(Go=Vc()),Go):(e=re,e!==0||(e=window.event,e=e===void 0?16:ed(e.type)),e):1}function kt(e,t,n,a){if(50<Fa)throw Fa=0,fi=null,Error(T(185));ro(e,n,a),(!(te&2)||e!==Ne)&&(e===Ne&&(!(te&2)&&(Pr|=n),Ee===4&&Gt(e,Pe)),Xe(e,a),n===1&&te===0&&!(t.mode&1)&&(ua=we()+500,Cr&&dn()))}function Xe(e,t){var n=e.callbackNode;tf(e,t);var a=tr(e,e===Ne?Pe:0);if(a===0)n!==null&&Wl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&Wl(n),t===1)e.tag===0?tp(Lu.bind(null,e)):vd(Lu.bind(null,e)),Qf(function(){!(te&6)&&dn()}),n=null;else{switch(qc(a)){case 1:n=Fi;break;case 4:n=Yc;break;case 16:n=er;break;case 536870912:n=Gc;break;default:n=er}n=yh(n,ch.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ch(e,t){if(Yo=-1,Go=0,te&6)throw Error(T(327));var n=e.callbackNode;if(ta()&&e.callbackNode!==n)return null;var a=tr(e,e===Ne?Pe:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=vr(e,a);else{t=a;var o=te;te|=2;var r=hh();(Ne!==e||Pe!==t)&&(Pt=null,ua=we()+500,En(e,t));do try{bp();break}catch(l){dh(e,l)}while(!0);Qi(),gr.current=r,te=o,ke!==null?t=0:(Ne=null,Pe=0,t=Ee)}if(t!==0){if(t===2&&(o=zs(e),o!==0&&(a=o,t=pi(e,o))),t===1)throw n=to,En(e,0),Gt(e,a),Xe(e,we()),n;if(t===6)Gt(e,a);else{if(o=e.current.alternate,!(a&30)&&!kp(o)&&(t=vr(e,a),t===2&&(r=zs(e),r!==0&&(a=r,t=pi(e,r))),t===1))throw n=to,En(e,0),Gt(e,a),Xe(e,we()),n;switch(e.finishedWork=o,e.finishedLanes=a,t){case 0:case 1:throw Error(T(345));case 2:gn(e,qe,Pt);break;case 3:if(Gt(e,a),(a&130023424)===a&&(t=hl+500-we(),10<t)){if(tr(e,0)!==0)break;if(o=e.suspendedLanes,(o&a)!==a){He(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Js(gn.bind(null,e,qe,Pt),t);break}gn(e,qe,Pt);break;case 4:if(Gt(e,a),(a&4194240)===a)break;for(t=e.eventTimes,o=-1;0<a;){var i=31-vt(a);r=1<<i,i=t[i],i>o&&(o=i),a&=~r}if(a=o,a=we()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*vp(a/1960))-a,10<a){e.timeoutHandle=Js(gn.bind(null,e,qe,Pt),a);break}gn(e,qe,Pt);break;case 5:gn(e,qe,Pt);break;default:throw Error(T(329))}}}return Xe(e,we()),e.callbackNode===n?ch.bind(null,e):null}function pi(e,t){var n=Da;return e.current.memoizedState.isDehydrated&&(En(e,t).flags|=256),e=vr(e,t),e!==2&&(t=qe,qe=n,t!==null&&gi(t)),e}function gi(e){qe===null?qe=e:qe.push.apply(qe,e)}function kp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var o=n[a],r=o.getSnapshot;o=o.value;try{if(!It(r(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Gt(e,t){for(t&=~dl,t&=~Pr,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-vt(t),a=1<<n;e[n]=-1,t&=~a}}function Lu(e){if(te&6)throw Error(T(327));ta();var t=tr(e,0);if(!(t&1))return Xe(e,we()),null;var n=vr(e,t);if(e.tag!==0&&n===2){var a=zs(e);a!==0&&(t=a,n=pi(e,a))}if(n===1)throw n=to,En(e,0),Gt(e,t),Xe(e,we()),n;if(n===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,gn(e,qe,Pt),Xe(e,we()),null}function ml(e,t){var n=te;te|=1;try{return e(t)}finally{te=n,te===0&&(ua=we()+500,Cr&&dn())}}function Pn(e){Kt!==null&&Kt.tag===0&&!(te&6)&&ta();var t=te;te|=1;var n=ht.transition,a=re;try{if(ht.transition=null,re=1,e)return e()}finally{re=a,ht.transition=n,te=t,!(te&6)&&dn()}}function fl(){tt=Jn.current,ue(Jn)}function En(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Kf(n)),ke!==null)for(n=ke.return;n!==null;){var a=n;switch(qi(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&sr();break;case 3:ia(),ue(Ke),ue(We),al();break;case 5:nl(a);break;case 4:ia();break;case 13:ue(he);break;case 19:ue(he);break;case 10:Xi(a.type._context);break;case 22:case 23:fl()}n=n.return}if(Ne=e,ke=e=rn(e.current,null),Pe=tt=t,Ee=0,to=null,dl=Pr=An=0,qe=Da=null,kn!==null){for(t=0;t<kn.length;t++)if(n=kn[t],a=n.interleaved,a!==null){n.interleaved=null;var o=a.next,r=n.pending;if(r!==null){var i=r.next;r.next=o,a.next=i}n.pending=a}kn=null}return e}function dh(e,t){do{var n=ke;try{if(Qi(),Uo.current=pr,fr){for(var a=me.memoizedState;a!==null;){var o=a.queue;o!==null&&(o.pending=null),a=a.next}fr=!1}if(xn=0,_e=be=me=null,Ra=!1,Xa=0,cl.current=null,n===null||n.return===null){Ee=1,to=t,ke=null;break}e:{var r=e,i=n.return,l=n,u=t;if(t=Pe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,d=l,m=d.tag;if(!(d.mode&1)&&(m===0||m===11||m===15)){var g=d.alternate;g?(d.updateQueue=g.updateQueue,d.memoizedState=g.memoizedState,d.lanes=g.lanes):(d.updateQueue=null,d.memoizedState=null)}var S=vu(i);if(S!==null){S.flags&=-257,ku(S,i,l,r,t),S.mode&1&&wu(r,c,t),t=S,u=c;var y=t.updateQueue;if(y===null){var k=new Set;k.add(u),t.updateQueue=k}else y.add(u);break e}else{if(!(t&1)){wu(r,c,t),pl();break e}u=Error(T(426))}}else if(ce&&l.mode&1){var E=vu(i);if(E!==null){!(E.flags&65536)&&(E.flags|=256),ku(E,i,l,r,t),Ji(la(u,l));break e}}r=u=la(u,l),Ee!==4&&(Ee=2),Da===null?Da=[r]:Da.push(r),r=i;do{switch(r.tag){case 3:r.flags|=65536,t&=-t,r.lanes|=t;var f=qd(r,u,t);hu(r,f);break e;case 1:l=u;var h=r.type,p=r.stateNode;if(!(r.flags&128)&&(typeof h.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(an===null||!an.has(p)))){r.flags|=65536,t&=-t,r.lanes|=t;var N=Jd(r,l,t);hu(r,N);break e}}r=r.return}while(r!==null)}fh(n)}catch(C){t=C,ke===n&&n!==null&&(ke=n=n.return);continue}break}while(!0)}function hh(){var e=gr.current;return gr.current=pr,e===null?pr:e}function pl(){(Ee===0||Ee===3||Ee===2)&&(Ee=4),Ne===null||!(An&268435455)&&!(Pr&268435455)||Gt(Ne,Pe)}function vr(e,t){var n=te;te|=2;var a=hh();(Ne!==e||Pe!==t)&&(Pt=null,En(e,t));do try{Ip();break}catch(o){dh(e,o)}while(!0);if(Qi(),te=n,gr.current=a,ke!==null)throw Error(T(261));return Ne=null,Pe=0,Ee}function Ip(){for(;ke!==null;)mh(ke)}function bp(){for(;ke!==null&&!Gm();)mh(ke)}function mh(e){var t=gh(e.alternate,e,tt);e.memoizedProps=e.pendingProps,t===null?fh(e):ke=t,cl.current=null}function fh(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=pp(n,t),n!==null){n.flags&=32767,ke=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ee=6,ke=null;return}}else if(n=fp(n,t,tt),n!==null){ke=n;return}if(t=t.sibling,t!==null){ke=t;return}ke=t=e}while(t!==null);Ee===0&&(Ee=5)}function gn(e,t,n){var a=re,o=ht.transition;try{ht.transition=null,re=1,Ep(e,t,n,a)}finally{ht.transition=o,re=a}return null}function Ep(e,t,n,a){do ta();while(Kt!==null);if(te&6)throw Error(T(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var r=n.lanes|n.childLanes;if(nf(e,r),e===Ne&&(ke=Ne=null,Pe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Mo||(Mo=!0,yh(er,function(){return ta(),null})),r=(n.flags&15990)!==0,n.subtreeFlags&15990||r){r=ht.transition,ht.transition=null;var i=re;re=1;var l=te;te|=4,cl.current=null,yp(e,n),lh(n,e),$f(Vs),nr=!!Gs,Vs=Gs=null,e.current=n,wp(n),Vm(),te=l,re=i,ht.transition=r}else e.current=n;if(Mo&&(Mo=!1,Kt=e,wr=o),r=e.pendingLanes,r===0&&(an=null),Km(n.stateNode),Xe(e,we()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],a(o.value,{componentStack:o.stack,digest:o.digest});if(yr)throw yr=!1,e=mi,mi=null,e;return wr&1&&e.tag!==0&&ta(),r=e.pendingLanes,r&1?e===fi?Fa++:(Fa=0,fi=e):Fa=0,dn(),null}function ta(){if(Kt!==null){var e=qc(wr),t=ht.transition,n=re;try{if(ht.transition=null,re=16>e?16:e,Kt===null)var a=!1;else{if(e=Kt,Kt=null,wr=0,te&6)throw Error(T(331));var o=te;for(te|=4,O=e.current;O!==null;){var r=O,i=r.child;if(O.flags&16){var l=r.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(O=c;O!==null;){var d=O;switch(d.tag){case 0:case 11:case 15:Oa(8,d,r)}var m=d.child;if(m!==null)m.return=d,O=m;else for(;O!==null;){d=O;var g=d.sibling,S=d.return;if(rh(d),d===c){O=null;break}if(g!==null){g.return=S,O=g;break}O=S}}}var y=r.alternate;if(y!==null){var k=y.child;if(k!==null){y.child=null;do{var E=k.sibling;k.sibling=null,k=E}while(k!==null)}}O=r}}if(r.subtreeFlags&2064&&i!==null)i.return=r,O=i;else e:for(;O!==null;){if(r=O,r.flags&2048)switch(r.tag){case 0:case 11:case 15:Oa(9,r,r.return)}var f=r.sibling;if(f!==null){f.return=r.return,O=f;break e}O=r.return}}var h=e.current;for(O=h;O!==null;){i=O;var p=i.child;if(i.subtreeFlags&2064&&p!==null)p.return=i,O=p;else e:for(i=h;O!==null;){if(l=O,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ar(9,l)}}catch(C){ge(l,l.return,C)}if(l===i){O=null;break e}var N=l.sibling;if(N!==null){N.return=l.return,O=N;break e}O=l.return}}if(te=o,dn(),Ct&&typeof Ct.onPostCommitFiberRoot=="function")try{Ct.onPostCommitFiberRoot(br,e)}catch{}a=!0}return a}finally{re=n,ht.transition=t}}return!1}function Mu(e,t,n){t=la(n,t),t=qd(e,t,1),e=nn(e,t,1),t=He(),e!==null&&(ro(e,1,t),Xe(e,t))}function ge(e,t,n){if(e.tag===3)Mu(e,e,n);else for(;t!==null;){if(t.tag===3){Mu(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(an===null||!an.has(a))){e=la(n,e),e=Jd(t,e,1),t=nn(t,e,1),e=He(),t!==null&&(ro(t,1,e),Xe(t,e));break}}t=t.return}}function Sp(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=He(),e.pingedLanes|=e.suspendedLanes&n,Ne===e&&(Pe&n)===n&&(Ee===4||Ee===3&&(Pe&130023424)===Pe&&500>we()-hl?En(e,0):dl|=n),Xe(e,t)}function ph(e,t){t===0&&(e.mode&1?(t=Eo,Eo<<=1,!(Eo&130023424)&&(Eo=4194304)):t=1);var n=He();e=Ft(e,t),e!==null&&(ro(e,t,n),Xe(e,n))}function _p(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ph(e,n)}function Np(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(T(314))}a!==null&&a.delete(t),ph(e,n)}var gh;gh=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ke.current)Je=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Je=!1,mp(e,t,n);Je=!!(e.flags&131072)}else Je=!1,ce&&t.flags&1048576&&kd(t,ur,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;Ho(e,t),e=t.pendingProps;var o=oa(t,We.current);ea(t,n),o=rl(null,t,a,e,o,n);var r=sl();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Qe(a)?(r=!0,ir(t)):r=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,el(t),o.updater=xr,t.stateNode=o,o._reactInternals=t,ni(t,a,e,n),t=ri(null,t,a,!0,r,n)):(t.tag=0,ce&&r&&Vi(t),$e(null,t,o,n),t=t.child),t;case 16:a=t.elementType;e:{switch(Ho(e,t),e=t.pendingProps,o=a._init,a=o(a._payload),t.type=a,o=t.tag=Tp(a),e=gt(a,e),o){case 0:t=oi(null,t,a,e,n);break e;case 1:t=Eu(null,t,a,e,n);break e;case 11:t=Iu(null,t,a,e,n);break e;case 14:t=bu(null,t,a,gt(a.type,e),n);break e}throw Error(T(306,a,""))}return t;case 0:return a=t.type,o=t.pendingProps,o=t.elementType===a?o:gt(a,o),oi(e,t,a,o,n);case 1:return a=t.type,o=t.pendingProps,o=t.elementType===a?o:gt(a,o),Eu(e,t,a,o,n);case 3:e:{if(Zd(t),e===null)throw Error(T(387));a=t.pendingProps,r=t.memoizedState,o=r.element,Nd(e,t),hr(t,a,null,n);var i=t.memoizedState;if(a=i.element,r.isDehydrated)if(r={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){o=la(Error(T(423)),t),t=Su(e,t,a,n,o);break e}else if(a!==o){o=la(Error(T(424)),t),t=Su(e,t,a,n,o);break e}else for(nt=tn(t.stateNode.containerInfo.firstChild),at=t,ce=!0,wt=null,n=Sd(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ra(),a===o){t=jt(e,t,n);break e}$e(e,t,a,n)}t=t.child}return t;case 5:return Cd(t),e===null&&Zs(t),a=t.type,o=t.pendingProps,r=e!==null?e.memoizedProps:null,i=o.children,qs(a,o)?i=null:r!==null&&qs(a,r)&&(t.flags|=32),Xd(e,t),$e(e,t,i,n),t.child;case 6:return e===null&&Zs(t),null;case 13:return eh(e,t,n);case 4:return tl(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=sa(t,null,a,n):$e(e,t,a,n),t.child;case 11:return a=t.type,o=t.pendingProps,o=t.elementType===a?o:gt(a,o),Iu(e,t,a,o,n);case 7:return $e(e,t,t.pendingProps,n),t.child;case 8:return $e(e,t,t.pendingProps.children,n),t.child;case 12:return $e(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,o=t.pendingProps,r=t.memoizedProps,i=o.value,se(cr,a._currentValue),a._currentValue=i,r!==null)if(It(r.value,i)){if(r.children===o.children&&!Ke.current){t=jt(e,t,n);break e}}else for(r=t.child,r!==null&&(r.return=t);r!==null;){var l=r.dependencies;if(l!==null){i=r.child;for(var u=l.firstContext;u!==null;){if(u.context===a){if(r.tag===1){u=Rt(-1,n&-n),u.tag=2;var c=r.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}r.lanes|=n,u=r.alternate,u!==null&&(u.lanes|=n),ei(r.return,n,t),l.lanes|=n;break}u=u.next}}else if(r.tag===10)i=r.type===t.type?null:r.child;else if(r.tag===18){if(i=r.return,i===null)throw Error(T(341));i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),ei(i,n,t),i=r.sibling}else i=r.child;if(i!==null)i.return=r;else for(i=r;i!==null;){if(i===t){i=null;break}if(r=i.sibling,r!==null){r.return=i.return,i=r;break}i=i.return}r=i}$e(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,a=t.pendingProps.children,ea(t,n),o=mt(o),a=a(o),t.flags|=1,$e(e,t,a,n),t.child;case 14:return a=t.type,o=gt(a,t.pendingProps),o=gt(a.type,o),bu(e,t,a,o,n);case 15:return Kd(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,o=t.pendingProps,o=t.elementType===a?o:gt(a,o),Ho(e,t),t.tag=1,Qe(a)?(e=!0,ir(t)):e=!1,ea(t,n),Vd(t,a,o),ni(t,a,o,n),ri(null,t,a,!0,e,n);case 19:return th(e,t,n);case 22:return Qd(e,t,n)}throw Error(T(156,t.tag))};function yh(e,t){return Hc(e,t)}function Cp(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function dt(e,t,n,a){return new Cp(e,t,n,a)}function gl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Tp(e){if(typeof e=="function")return gl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ri)return 11;if(e===Oi)return 14}return 2}function rn(e,t){var n=e.alternate;return n===null?(n=dt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Vo(e,t,n,a,o,r){var i=2;if(a=e,typeof e=="function")gl(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case jn:return Sn(n.children,o,r,t);case Bi:i=8,o|=8;break;case Ns:return e=dt(12,n,t,o|2),e.elementType=Ns,e.lanes=r,e;case Cs:return e=dt(13,n,t,o),e.elementType=Cs,e.lanes=r,e;case Ts:return e=dt(19,n,t,o),e.elementType=Ts,e.lanes=r,e;case Cc:return Lr(n,o,r,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _c:i=10;break e;case Nc:i=9;break e;case Ri:i=11;break e;case Oi:i=14;break e;case $t:i=16,a=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=dt(i,n,t,o),t.elementType=e,t.type=a,t.lanes=r,t}function Sn(e,t,n,a){return e=dt(7,e,a,t),e.lanes=n,e}function Lr(e,t,n,a){return e=dt(22,e,a,t),e.elementType=Cc,e.lanes=n,e.stateNode={isHidden:!1},e}function ys(e,t,n){return e=dt(6,e,null,t),e.lanes=n,e}function ws(e,t,n){return t=dt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function xp(e,t,n,a,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xr(0),this.expirationTimes=Xr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xr(0),this.identifierPrefix=a,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function yl(e,t,n,a,o,r,i,l,u){return e=new xp(e,t,n,l,u),t===1?(t=1,r===!0&&(t|=8)):t=0,r=dt(3,null,null,t),e.current=r,r.stateNode=e,r.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},el(r),e}function Ap(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function wh(e){if(!e)return ln;e=e._reactInternals;e:{if(Bn(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Qe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var n=e.type;if(Qe(n))return wd(e,n,t)}return t}function vh(e,t,n,a,o,r,i,l,u){return e=yl(n,a,!0,e,o,r,i,l,u),e.context=wh(null),n=e.current,a=He(),o=on(n),r=Rt(a,o),r.callback=t??null,nn(n,r,o),e.current.lanes=o,ro(e,o,a),Xe(e,a),e}function Mr(e,t,n,a){var o=t.current,r=He(),i=on(o);return n=wh(n),t.context===null?t.context=n:t.pendingContext=n,t=Rt(r,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=nn(o,t,i),e!==null&&(kt(e,o,i,r),zo(e,o,i)),i}function kr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Bu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function wl(e,t){Bu(e,t),(e=e.alternate)&&Bu(e,t)}function Pp(){return null}var kh=typeof reportError=="function"?reportError:function(e){console.error(e)};function vl(e){this._internalRoot=e}Br.prototype.render=vl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));Mr(e,t,null,null)};Br.prototype.unmount=vl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Pn(function(){Mr(null,e,null,null)}),t[Dt]=null}};function Br(e){this._internalRoot=e}Br.prototype.unstable_scheduleHydration=function(e){if(e){var t=Qc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Yt.length&&t!==0&&t<Yt[n].priority;n++);Yt.splice(n,0,e),n===0&&Zc(e)}};function kl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Rr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ru(){}function Lp(e,t,n,a,o){if(o){if(typeof a=="function"){var r=a;a=function(){var c=kr(i);r.call(c)}}var i=vh(t,a,e,0,null,!1,!1,"",Ru);return e._reactRootContainer=i,e[Dt]=i.current,Va(e.nodeType===8?e.parentNode:e),Pn(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof a=="function"){var l=a;a=function(){var c=kr(u);l.call(c)}}var u=yl(e,0,!1,null,null,!1,!1,"",Ru);return e._reactRootContainer=u,e[Dt]=u.current,Va(e.nodeType===8?e.parentNode:e),Pn(function(){Mr(t,u,n,a)}),u}function Or(e,t,n,a,o){var r=n._reactRootContainer;if(r){var i=r;if(typeof o=="function"){var l=o;o=function(){var u=kr(i);l.call(u)}}Mr(t,i,e,o)}else i=Lp(n,t,e,o,a);return kr(i)}Jc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ta(t.pendingLanes);n!==0&&(ji(t,n|1),Xe(t,we()),!(te&6)&&(ua=we()+500,dn()))}break;case 13:Pn(function(){var a=Ft(e,1);if(a!==null){var o=He();kt(a,e,1,o)}}),wl(e,1)}};Wi=function(e){if(e.tag===13){var t=Ft(e,134217728);if(t!==null){var n=He();kt(t,e,134217728,n)}wl(e,134217728)}};Kc=function(e){if(e.tag===13){var t=on(e),n=Ft(e,t);if(n!==null){var a=He();kt(n,e,t,a)}wl(e,t)}};Qc=function(){return re};Xc=function(e,t){var n=re;try{return re=e,t()}finally{re=n}};Fs=function(e,t,n){switch(t){case"input":if(Ps(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var o=Nr(a);if(!o)throw Error(T(90));xc(a),Ps(a,o)}}}break;case"textarea":Pc(e,n);break;case"select":t=n.value,t!=null&&Kn(e,!!n.multiple,t,!1)}};Fc=ml;jc=Pn;var Mp={usingClientEntryPoint:!1,Events:[io,$n,Nr,Oc,Dc,ml]},Sa={findFiberByHostInstance:vn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Bp={bundleType:Sa.bundleType,version:Sa.version,rendererPackageName:Sa.rendererPackageName,rendererConfig:Sa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Uc(e),e===null?null:e.stateNode},findFiberByHostInstance:Sa.findFiberByHostInstance||Pp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bo.isDisabled&&Bo.supportsFiber)try{br=Bo.inject(Bp),Ct=Bo}catch{}}rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mp;rt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!kl(t))throw Error(T(200));return Ap(e,t,null,n)};rt.createRoot=function(e,t){if(!kl(e))throw Error(T(299));var n=!1,a="",o=kh;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=yl(e,1,!1,null,null,n,!1,a,o),e[Dt]=t.current,Va(e.nodeType===8?e.parentNode:e),new vl(t)};rt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=Uc(t),e=e===null?null:e.stateNode,e};rt.flushSync=function(e){return Pn(e)};rt.hydrate=function(e,t,n){if(!Rr(t))throw Error(T(200));return Or(null,e,t,!0,n)};rt.hydrateRoot=function(e,t,n){if(!kl(e))throw Error(T(405));var a=n!=null&&n.hydratedSources||null,o=!1,r="",i=kh;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=vh(t,null,e,1,n??null,o,!1,r,i),e[Dt]=t.current,Va(e),a)for(e=0;e<a.length;e++)n=a[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Br(t)};rt.render=function(e,t,n){if(!Rr(t))throw Error(T(200));return Or(null,e,t,!1,n)};rt.unmountComponentAtNode=function(e){if(!Rr(e))throw Error(T(40));return e._reactRootContainer?(Pn(function(){Or(null,null,e,!1,function(){e._reactRootContainer=null,e[Dt]=null})}),!0):!1};rt.unstable_batchedUpdates=ml;rt.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!Rr(n))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return Or(e,t,n,!1,a)};rt.version="18.3.1-next-f1338f8080-20240426";function Ih(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ih)}catch(e){console.error(e)}}Ih(),Ic.exports=rt;var Rp=Ic.exports,Ou=Rp;Ss.createRoot=Ou.createRoot,Ss.hydrateRoot=Ou.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function no(){return no=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},no.apply(this,arguments)}var Qt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Qt||(Qt={}));const Du="popstate";function Op(e){e===void 0&&(e={});function t(a,o){let{pathname:r,search:i,hash:l}=a.location;return yi("",{pathname:r,search:i,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(a,o){return typeof o=="string"?o:bh(o)}return Fp(t,n,null,e)}function Ie(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Il(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Dp(){return Math.random().toString(36).substr(2,8)}function Fu(e,t){return{usr:e.state,key:e.key,idx:t}}function yi(e,t,n,a){return n===void 0&&(n=null),no({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?fa(t):t,{state:n,key:t&&t.key||a||Dp()})}function bh(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function fa(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}function Fp(e,t,n,a){a===void 0&&(a={});let{window:o=document.defaultView,v5Compat:r=!1}=a,i=o.history,l=Qt.Pop,u=null,c=d();c==null&&(c=0,i.replaceState(no({},i.state,{idx:c}),""));function d(){return(i.state||{idx:null}).idx}function m(){l=Qt.Pop;let E=d(),f=E==null?null:E-c;c=E,u&&u({action:l,location:k.location,delta:f})}function g(E,f){l=Qt.Push;let h=yi(k.location,E,f);c=d()+1;let p=Fu(h,c),N=k.createHref(h);try{i.pushState(p,"",N)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;o.location.assign(N)}r&&u&&u({action:l,location:k.location,delta:1})}function S(E,f){l=Qt.Replace;let h=yi(k.location,E,f);c=d();let p=Fu(h,c),N=k.createHref(h);i.replaceState(p,"",N),r&&u&&u({action:l,location:k.location,delta:0})}function y(E){let f=o.location.origin!=="null"?o.location.origin:o.location.href,h=typeof E=="string"?E:bh(E);return h=h.replace(/ $/,"%20"),Ie(f,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,f)}let k={get action(){return l},get location(){return e(o,i)},listen(E){if(u)throw new Error("A history only accepts one active listener");return o.addEventListener(Du,m),u=E,()=>{o.removeEventListener(Du,m),u=null}},createHref(E){return t(o,E)},createURL:y,encodeLocation(E){let f=y(E);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:g,replace:S,go(E){return i.go(E)}};return k}var ju;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ju||(ju={}));function jp(e,t,n){return n===void 0&&(n="/"),Wp(e,t,n)}function Wp(e,t,n,a){let o=typeof t=="string"?fa(t):t,r=_h(o.pathname||"/",n);if(r==null)return null;let i=Eh(e);zp(i);let l=null;for(let u=0;l==null&&u<i.length;++u){let c=Zp(r);l=Kp(i[u],c)}return l}function Eh(e,t,n,a){t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a="");let o=(r,i,l)=>{let u={relativePath:l===void 0?r.path||"":l,caseSensitive:r.caseSensitive===!0,childrenIndex:i,route:r};u.relativePath.startsWith("/")&&(Ie(u.relativePath.startsWith(a),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(a.length));let c=_n([a,u.relativePath]),d=n.concat(u);r.children&&r.children.length>0&&(Ie(r.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Eh(r.children,t,d,c)),!(r.path==null&&!r.index)&&t.push({path:c,score:qp(c,r.index),routesMeta:d})};return e.forEach((r,i)=>{var l;if(r.path===""||!((l=r.path)!=null&&l.includes("?")))o(r,i);else for(let u of Sh(r.path))o(r,i,u)}),t}function Sh(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,o=n.endsWith("?"),r=n.replace(/\?$/,"");if(a.length===0)return o?[r,""]:[r];let i=Sh(a.join("/")),l=[];return l.push(...i.map(u=>u===""?r:[r,u].join("/"))),o&&l.push(...i),l.map(u=>e.startsWith("/")&&u===""?"/":u)}function zp(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Jp(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}const Up=/^:[\w-]+$/,$p=3,Hp=2,Yp=1,Gp=10,Vp=-2,Wu=e=>e==="*";function qp(e,t){let n=e.split("/"),a=n.length;return n.some(Wu)&&(a+=Vp),t&&(a+=Hp),n.filter(o=>!Wu(o)).reduce((o,r)=>o+(Up.test(r)?$p:r===""?Yp:Gp),a)}function Jp(e,t){return e.length===t.length&&e.slice(0,-1).every((a,o)=>a===t[o])?e[e.length-1]-t[t.length-1]:0}function Kp(e,t,n){let{routesMeta:a}=e,o={},r="/",i=[];for(let l=0;l<a.length;++l){let u=a[l],c=l===a.length-1,d=r==="/"?t:t.slice(r.length)||"/",m=Qp({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},d),g=u.route;if(!m)return null;Object.assign(o,m.params),i.push({params:o,pathname:_n([r,m.pathname]),pathnameBase:og(_n([r,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(r=_n([r,m.pathnameBase]))}return i}function Qp(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=Xp(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let r=o[0],i=r.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:a.reduce((c,d,m)=>{let{paramName:g,isOptional:S}=d;if(g==="*"){let k=l[m]||"";i=r.slice(0,r.length-k.length).replace(/(.)\/+$/,"$1")}const y=l[m];return S&&!y?c[g]=void 0:c[g]=(y||"").replace(/%2F/g,"/"),c},{}),pathname:r,pathnameBase:i,pattern:e}}function Xp(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Il(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,l,u)=>(a.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),a]}function Zp(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Il(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function _h(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}const eg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tg=e=>eg.test(e);function ng(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:o=""}=typeof e=="string"?fa(e):e,r;if(n)if(tg(n))r=n;else{if(n.includes("//")){let i=n;n=n.replace(/\/\/+/g,"/"),Il(!1,"Pathnames cannot have embedded double slashes - normalizing "+(i+" -> "+n))}n.startsWith("/")?r=zu(n.substring(1),"/"):r=zu(n,t)}else r=t;return{pathname:r,search:rg(a),hash:sg(o)}}function zu(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function vs(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ag(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Nh(e,t){let n=ag(e);return t?n.map((a,o)=>o===n.length-1?a.pathname:a.pathnameBase):n.map(a=>a.pathnameBase)}function Ch(e,t,n,a){a===void 0&&(a=!1);let o;typeof e=="string"?o=fa(e):(o=no({},e),Ie(!o.pathname||!o.pathname.includes("?"),vs("?","pathname","search",o)),Ie(!o.pathname||!o.pathname.includes("#"),vs("#","pathname","hash",o)),Ie(!o.search||!o.search.includes("#"),vs("#","search","hash",o)));let r=e===""||o.pathname==="",i=r?"/":o.pathname,l;if(i==null)l=n;else{let m=t.length-1;if(!a&&i.startsWith("..")){let g=i.split("/");for(;g[0]==="..";)g.shift(),m-=1;o.pathname=g.join("/")}l=m>=0?t[m]:"/"}let u=ng(o,l),c=i&&i!=="/"&&i.endsWith("/"),d=(r||i===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||d)&&(u.pathname+="/"),u}const _n=e=>e.join("/").replace(/\/\/+/g,"/"),og=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),rg=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,sg=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function ig(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Th=["post","put","patch","delete"];new Set(Th);const lg=["get",...Th];new Set(lg);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ao(){return ao=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},ao.apply(this,arguments)}const bl=b.createContext(null),ug=b.createContext(null),uo=b.createContext(null),Dr=b.createContext(null),hn=b.createContext({outlet:null,matches:[],isDataRoute:!1}),xh=b.createContext(null);function co(){return b.useContext(Dr)!=null}function Rn(){return co()||Ie(!1),b.useContext(Dr).location}function Ah(e){b.useContext(uo).static||b.useLayoutEffect(e)}function pa(){let{isDataRoute:e}=b.useContext(hn);return e?bg():cg()}function cg(){co()||Ie(!1);let e=b.useContext(bl),{basename:t,future:n,navigator:a}=b.useContext(uo),{matches:o}=b.useContext(hn),{pathname:r}=Rn(),i=JSON.stringify(Nh(o,n.v7_relativeSplatPath)),l=b.useRef(!1);return Ah(()=>{l.current=!0}),b.useCallback(function(c,d){if(d===void 0&&(d={}),!l.current)return;if(typeof c=="number"){a.go(c);return}let m=Ch(c,JSON.parse(i),r,d.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:_n([t,m.pathname])),(d.replace?a.replace:a.push)(m,d.state,d)},[t,a,i,r,e])}function Ph(){let{matches:e}=b.useContext(hn),t=e[e.length-1];return t?t.params:{}}function dg(e,t){return hg(e,t)}function hg(e,t,n,a){co()||Ie(!1);let{navigator:o}=b.useContext(uo),{matches:r}=b.useContext(hn),i=r[r.length-1],l=i?i.params:{};i&&i.pathname;let u=i?i.pathnameBase:"/";i&&i.route;let c=Rn(),d;if(t){var m;let E=typeof t=="string"?fa(t):t;u==="/"||(m=E.pathname)!=null&&m.startsWith(u)||Ie(!1),d=E}else d=c;let g=d.pathname||"/",S=g;if(u!=="/"){let E=u.replace(/^\//,"").split("/");S="/"+g.replace(/^\//,"").split("/").slice(E.length).join("/")}let y=jp(e,{pathname:S}),k=yg(y&&y.map(E=>Object.assign({},E,{params:Object.assign({},l,E.params),pathname:_n([u,o.encodeLocation?o.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?u:_n([u,o.encodeLocation?o.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),r,n,a);return t&&k?b.createElement(Dr.Provider,{value:{location:ao({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:Qt.Pop}},k):k}function mg(){let e=Ig(),t=ig(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},t),n?b.createElement("pre",{style:o},n):null,null)}const fg=b.createElement(mg,null);class pg extends b.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?b.createElement(hn.Provider,{value:this.props.routeContext},b.createElement(xh.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function gg(e){let{routeContext:t,match:n,children:a}=e,o=b.useContext(bl);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),b.createElement(hn.Provider,{value:t},a)}function yg(e,t,n,a){var o;if(t===void 0&&(t=[]),n===void 0&&(n=null),a===void 0&&(a=null),e==null){var r;if(!n)return null;if(n.errors)e=n.matches;else if((r=a)!=null&&r.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,l=(o=n)==null?void 0:o.errors;if(l!=null){let d=i.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);d>=0||Ie(!1),i=i.slice(0,Math.min(i.length,d+1))}let u=!1,c=-1;if(n&&a&&a.v7_partialHydration)for(let d=0;d<i.length;d++){let m=i[d];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(c=d),m.route.id){let{loaderData:g,errors:S}=n,y=m.route.loader&&g[m.route.id]===void 0&&(!S||S[m.route.id]===void 0);if(m.route.lazy||y){u=!0,c>=0?i=i.slice(0,c+1):i=[i[0]];break}}}return i.reduceRight((d,m,g)=>{let S,y=!1,k=null,E=null;n&&(S=l&&m.route.id?l[m.route.id]:void 0,k=m.route.errorElement||fg,u&&(c<0&&g===0?(Eg("route-fallback"),y=!0,E=null):c===g&&(y=!0,E=m.route.hydrateFallbackElement||null)));let f=t.concat(i.slice(0,g+1)),h=()=>{let p;return S?p=k:y?p=E:m.route.Component?p=b.createElement(m.route.Component,null):m.route.element?p=m.route.element:p=d,b.createElement(gg,{match:m,routeContext:{outlet:d,matches:f,isDataRoute:n!=null},children:p})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?b.createElement(pg,{location:n.location,revalidation:n.revalidation,component:k,error:S,children:h(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):h()},null)}var Lh=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Lh||{}),Mh=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Mh||{});function wg(e){let t=b.useContext(bl);return t||Ie(!1),t}function vg(e){let t=b.useContext(ug);return t||Ie(!1),t}function kg(e){let t=b.useContext(hn);return t||Ie(!1),t}function Bh(e){let t=kg(),n=t.matches[t.matches.length-1];return n.route.id||Ie(!1),n.route.id}function Ig(){var e;let t=b.useContext(xh),n=vg(),a=Bh();return t!==void 0?t:(e=n.errors)==null?void 0:e[a]}function bg(){let{router:e}=wg(Lh.UseNavigateStable),t=Bh(Mh.UseNavigateStable),n=b.useRef(!1);return Ah(()=>{n.current=!0}),b.useCallback(function(o,r){r===void 0&&(r={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,ao({fromRouteId:t},r)))},[e,t])}const Uu={};function Eg(e,t,n){Uu[e]||(Uu[e]=!0)}function Sg(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function _g(e){let{to:t,replace:n,state:a,relative:o}=e;co()||Ie(!1);let{future:r,static:i}=b.useContext(uo),{matches:l}=b.useContext(hn),{pathname:u}=Rn(),c=pa(),d=Ch(t,Nh(l,r.v7_relativeSplatPath),u,o==="path"),m=JSON.stringify(d);return b.useEffect(()=>c(JSON.parse(m),{replace:n,state:a,relative:o}),[c,m,o,n,a]),null}function yn(e){Ie(!1)}function Ng(e){let{basename:t="/",children:n=null,location:a,navigationType:o=Qt.Pop,navigator:r,static:i=!1,future:l}=e;co()&&Ie(!1);let u=t.replace(/^\/*/,"/"),c=b.useMemo(()=>({basename:u,navigator:r,static:i,future:ao({v7_relativeSplatPath:!1},l)}),[u,l,r,i]);typeof a=="string"&&(a=fa(a));let{pathname:d="/",search:m="",hash:g="",state:S=null,key:y="default"}=a,k=b.useMemo(()=>{let E=_h(d,u);return E==null?null:{location:{pathname:E,search:m,hash:g,state:S,key:y},navigationType:o}},[u,d,m,g,S,y,o]);return k==null?null:b.createElement(uo.Provider,{value:c},b.createElement(Dr.Provider,{children:n,value:k}))}function Cg(e){let{children:t,location:n}=e;return dg(wi(t),n)}new Promise(()=>{});function wi(e,t){t===void 0&&(t=[]);let n=[];return b.Children.forEach(e,(a,o)=>{if(!b.isValidElement(a))return;let r=[...t,o];if(a.type===b.Fragment){n.push.apply(n,wi(a.props.children,r));return}a.type!==yn&&Ie(!1),!a.props.index||!a.props.children||Ie(!1);let i={id:a.props.id||r.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(i.children=wi(a.props.children,r)),n.push(i)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vi(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let a=e[n];return t.concat(Array.isArray(a)?a.map(o=>[n,o]):[[n,a]])},[]))}function Tg(e,t){let n=vi(e);return t&&t.forEach((a,o)=>{n.has(o)||t.getAll(o).forEach(r=>{n.append(o,r)})}),n}const xg="6";try{window.__reactRouterVersion=xg}catch{}const Ag="startTransition",$u=xm[Ag];function Pg(e){let{basename:t,children:n,future:a,window:o}=e,r=b.useRef();r.current==null&&(r.current=Op({window:o,v5Compat:!0}));let i=r.current,[l,u]=b.useState({action:i.action,location:i.location}),{v7_startTransition:c}=a||{},d=b.useCallback(m=>{c&&$u?$u(()=>u(m)):u(m)},[u,c]);return b.useLayoutEffect(()=>i.listen(d),[i,d]),b.useEffect(()=>Sg(a),[a]),b.createElement(Ng,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:i,future:a})}var Hu;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Hu||(Hu={}));var Yu;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Yu||(Yu={}));function Lg(e){let t=b.useRef(vi(e)),n=b.useRef(!1),a=Rn(),o=b.useMemo(()=>Tg(a.search,n.current?null:t.current),[a.search]),r=pa(),i=b.useCallback((l,u)=>{const c=vi(typeof l=="function"?l(o):l);n.current=!0,r("?"+c,u)},[r,o]);return[o,i]}/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Mg={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bg=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Ce=(e,t)=>{const n=b.forwardRef(({color:a="currentColor",size:o=24,strokeWidth:r=2,absoluteStrokeWidth:i,className:l="",children:u,...c},d)=>b.createElement("svg",{ref:d,...Mg,width:o,height:o,stroke:a,strokeWidth:i?Number(r)*24/Number(o):r,className:["lucide",`lucide-${Bg(e)}`,l].join(" "),...c},[...t.map(([m,g])=>b.createElement(m,g)),...Array.isArray(u)?u:[u]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rg=Ce("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Og=Ce("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dg=Ce("Book",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20",key:"t4utmx"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fg=Ce("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jg=Ce("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wg=Ce("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zg=Ce("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ug=Ce("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $g=Ce("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hg=Ce("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yg=Ce("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gg=Ce("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=Ce("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qg=Ce("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=Ce("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kg=Ce("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qg=Ce("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=Ce("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Zg={Star:qg,Book:Dg,Users:Qg,Award:Og,ChevronDown:jg,Menu:Yg,X:Xg,Eye:Ug,Heart:$g,MessageCircle:Gg,Check:Fg,Copy:Wg,DollarSign:zg,TrendingUp:Jg,Mail:Hg,Twitter:Kg,Share2:Vg,ArrowRight:Rg},z=({name:e,...t})=>{const n=Zg[e];return n?s.createElement(n,{...t}):null},ey="_container_168f3_1",ty="_navbar_168f3_13",ny="_navContent_168f3_31",ay="_logo_168f3_45",oy="_logoIcon_168f3_57",ry="_logoText_168f3_69",sy="_desktopNav_168f3_81",iy="_navLink_168f3_93",ly="_mobileMenuButton_168f3_111",uy="_mobileMenu_168f3_111",cy="_mobileMenuContent_168f3_139",dy="_mobileNavLink_168f3_153",hy="_hero_168f3_173",my="_heroGrid_168f3_185",fy="_heroContent_168f3_195",py="_heroTitle_168f3_203",gy="_heroSubtitle_168f3_219",yy="_ratingText_168f3_231",wy="_ctaButtons_168f3_241",vy="_ctaButton_168f3_241",ky="_instantAccess_168f3_267",Iy="_heroCard_168f3_277",by="_previewSection_168f3_373",Ey="_sectionTitle_168f3_383",Sy="_sectionSubtitle_168f3_397",_y="_previewCard_168f3_407",Ny="_previewHeader_168f3_425",Cy="_previewTitle_168f3_439",Ty="_openReaderButton_168f3_451",xy="_eyeIcon_168f3_473",Ay="_previewContent_168f3_483",Py="_previewText_168f3_491",Ly="_previewNote_168f3_503",My="_accessForm_168f3_517",By="_accessInputGroup_168f3_529",Ry="_accessNote_168f3_541",Oy="_statsSection_168f3_555",Dy="_statsGrid_168f3_567",Fy="_statItem_168f3_581",jy="_statNumber_168f3_589",Wy="_statLabel_168f3_601",zy="_reviewsSection_168f3_611",Uy="_reviewsGrid_168f3_619",$y="_reviewHeader_168f3_629",Hy="_reviewDate_168f3_641",Yy="_reviewText_168f3_653",Gy="_reviewer_168f3_665",Vy="_ratingBadge_168f3_675",qy="_ratingScore_168f3_693",Jy="_affiliateSection_168f3_707",Ky="_affiliateSubtitle_168f3_717",Qy="_highlightGreen_168f3_729",Xy="_affiliateStats_168f3_737",Zy="_affiliateCard_168f3_757",ew="_successStory_168f3_775",tw="_storyContent_168f3_791",nw="_storyAvatar_168f3_803",aw="_storyText_168f3_831",ow="_storyAuthor_168f3_843",rw="_affiliateSteps_168f3_853",sw="_step_168f3_865",iw="_stepIcon_168f3_873",lw="_stepTitle_168f3_897",uw="_stepDescription_168f3_911",cw="_explanationTitle_168f3_921",dw="_explanationText_168f3_935",hw="_affiliateForm_168f3_943",mw="_formTitle_168f3_955",fw="_formGroup_168f3_971",pw="_linkBox_168f3_987",gw="_linkLabel_168f3_1005",yw="_linkCode_168f3_1029",ww="_linkActions_168f3_1061",vw="_copyButtonLarge_168f3_1073",kw="_socialShare_168f3_1137",Iw="_shareLabel_168f3_1151",bw="_socialButtons_168f3_1167",Ew="_twitterShare_168f3_1181",Sw="_whatsappShare_168f3_1219",_w="_facebookShare_168f3_1257",Nw="_calculator_168f3_1297",Cw="_calculatorTitle_168f3_1313",Tw="_sliderContainer_168f3_1329",xw="_sliderLabel_168f3_1337",Aw="_slider_168f3_1329",Pw="_sliderLabels_168f3_1415",Lw="_earningsDisplay_168f3_1431",Mw="_earningsAmount_168f3_1447",Bw="_earningsText_168f3_1463",Rw="_emailConfirmation_168f3_1475",Ow="_linkNote_168f3_1525",Dw="_successMessage_168f3_1549",Fw="_successText_168f3_1587",jw="_formNote_168f3_1757",Ww="_faqSection_168f3_1773",zw="_faqGrid_168f3_1783",Uw="_faqQuestion_168f3_1797",$w="_faqAnswer_168f3_1811",Hw="_finalCTA_168f3_1823",Yw="_ctaTitle_168f3_1837",Gw="_ctaSubtitle_168f3_1849",Vw="_ctaFeatures_168f3_1861",qw="_footer_168f3_1873",Jw="_footerGrid_168f3_1885",Kw="_footerSection_168f3_1897",Qw="_footerTitle_168f3_1905",Xw="_footerText_168f3_1917",Zw="_footerBottom_168f3_1927",ev="_copyright_168f3_1939",tv="_crisisNote_168f3_1949",nv="_readerContainer_168f3_1961",av="_readerHeader_168f3_1971",ov="_readerNav_168f3_1987",rv="_readerTitle_168f3_2001",sv="_backButton_168f3_2013",iv="_readerContent_168f3_2035",lv="_ebookContent_168f3_2043",uv="_contentLine_168f3_2061",cv="_fullAccessText_168f3_2071",dv="_successNote_168f3_2113",hv="_purchaseOverlay_168f3_2123",mv="_purchaseBtn_168f3_2145",fv="_purchaseText_168f3_2159",pv="_bookCoverContainer_168f3_2393",gv="_bookCover_168f3_2393",yv="_bookCoverBadge_168f3_2439",wv="_bestsellerBadge_168f3_2453",v={container:ey,navbar:ty,navContent:ny,logo:ay,logoIcon:oy,logoText:ry,desktopNav:sy,navLink:iy,mobileMenuButton:ly,mobileMenu:uy,mobileMenuContent:cy,mobileNavLink:dy,hero:hy,heroGrid:my,heroContent:fy,heroTitle:py,heroSubtitle:gy,ratingText:yy,ctaButtons:wy,ctaButton:vy,instantAccess:ky,heroCard:Iy,previewSection:by,sectionTitle:Ey,sectionSubtitle:Sy,previewCard:_y,previewHeader:Ny,previewTitle:Cy,openReaderButton:Ty,eyeIcon:xy,previewContent:Ay,previewText:Py,previewNote:Ly,accessForm:My,accessInputGroup:By,accessNote:Ry,statsSection:Oy,statsGrid:Dy,statItem:Fy,statNumber:jy,statLabel:Wy,reviewsSection:zy,reviewsGrid:Uy,reviewHeader:$y,reviewDate:Hy,reviewText:Yy,reviewer:Gy,ratingBadge:Vy,ratingScore:qy,affiliateSection:Jy,affiliateSubtitle:Ky,highlightGreen:Qy,affiliateStats:Xy,affiliateCard:Zy,successStory:ew,storyContent:tw,storyAvatar:nw,storyText:aw,storyAuthor:ow,affiliateSteps:rw,step:sw,stepIcon:iw,stepTitle:lw,stepDescription:uw,explanationTitle:cw,explanationText:dw,affiliateForm:hw,formTitle:mw,formGroup:fw,linkBox:pw,linkLabel:gw,linkCode:yw,linkActions:ww,copyButtonLarge:vw,socialShare:kw,shareLabel:Iw,socialButtons:bw,twitterShare:Ew,whatsappShare:Sw,facebookShare:_w,calculator:Nw,calculatorTitle:Cw,sliderContainer:Tw,sliderLabel:xw,slider:Aw,sliderLabels:Pw,earningsDisplay:Lw,earningsAmount:Mw,earningsText:Bw,emailConfirmation:Rw,linkNote:Ow,successMessage:Dw,successText:Fw,formNote:jw,faqSection:Ww,faqGrid:zw,faqQuestion:Uw,faqAnswer:$w,finalCTA:Hw,ctaTitle:Yw,ctaSubtitle:Gw,ctaFeatures:Vw,footer:qw,footerGrid:Jw,footerSection:Kw,footerTitle:Qw,footerText:Xw,footerBottom:Zw,copyright:ev,crisisNote:tv,readerContainer:nv,readerHeader:av,readerNav:ov,readerTitle:rv,backButton:sv,readerContent:iv,ebookContent:lv,contentLine:uv,fullAccessText:cv,successNote:dv,purchaseOverlay:hv,purchaseBtn:mv,purchaseText:fv,bookCoverContainer:pv,bookCover:gv,bookCoverBadge:yv,bestsellerBadge:wv};function Rh(e,t){return function(){return e.apply(t,arguments)}}const{toString:vv}=Object.prototype,{getPrototypeOf:El}=Object,{iterator:Fr,toStringTag:Oh}=Symbol,jr=(e=>t=>{const n=vv.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),bt=e=>(e=e.toLowerCase(),t=>jr(t)===e),Wr=e=>t=>typeof t===e,{isArray:ga}=Array,ca=Wr("undefined");function ho(e){return e!==null&&!ca(e)&&e.constructor!==null&&!ca(e.constructor)&&Ze(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Dh=bt("ArrayBuffer");function kv(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Dh(e.buffer),t}const Iv=Wr("string"),Ze=Wr("function"),Fh=Wr("number"),mo=e=>e!==null&&typeof e=="object",bv=e=>e===!0||e===!1,qo=e=>{if(jr(e)!=="object")return!1;const t=El(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Oh in e)&&!(Fr in e)},Ev=e=>{if(!mo(e)||ho(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},Sv=bt("Date"),_v=bt("File"),Nv=bt("Blob"),Cv=bt("FileList"),Tv=e=>mo(e)&&Ze(e.pipe),xv=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Ze(e.append)&&((t=jr(e))==="formdata"||t==="object"&&Ze(e.toString)&&e.toString()==="[object FormData]"))},Av=bt("URLSearchParams"),[Pv,Lv,Mv,Bv]=["ReadableStream","Request","Response","Headers"].map(bt),Rv=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function fo(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let a,o;if(typeof e!="object"&&(e=[e]),ga(e))for(a=0,o=e.length;a<o;a++)t.call(null,e[a],a,e);else{if(ho(e))return;const r=n?Object.getOwnPropertyNames(e):Object.keys(e),i=r.length;let l;for(a=0;a<i;a++)l=r[a],t.call(null,e[l],l,e)}}function jh(e,t){if(ho(e))return null;t=t.toLowerCase();const n=Object.keys(e);let a=n.length,o;for(;a-- >0;)if(o=n[a],t===o.toLowerCase())return o;return null}const bn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Wh=e=>!ca(e)&&e!==bn;function ki(){const{caseless:e,skipUndefined:t}=Wh(this)&&this||{},n={},a=(o,r)=>{const i=e&&jh(n,r)||r;qo(n[i])&&qo(o)?n[i]=ki(n[i],o):qo(o)?n[i]=ki({},o):ga(o)?n[i]=o.slice():(!t||!ca(o))&&(n[i]=o)};for(let o=0,r=arguments.length;o<r;o++)arguments[o]&&fo(arguments[o],a);return n}const Ov=(e,t,n,{allOwnKeys:a}={})=>(fo(t,(o,r)=>{n&&Ze(o)?Object.defineProperty(e,r,{value:Rh(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),e),Dv=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Fv=(e,t,n,a)=>{e.prototype=Object.create(t.prototype,a),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},jv=(e,t,n,a)=>{let o,r,i;const l={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),r=o.length;r-- >0;)i=o[r],(!a||a(i,e,t))&&!l[i]&&(t[i]=e[i],l[i]=!0);e=n!==!1&&El(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Wv=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const a=e.indexOf(t,n);return a!==-1&&a===n},zv=e=>{if(!e)return null;if(ga(e))return e;let t=e.length;if(!Fh(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Uv=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&El(Uint8Array)),$v=(e,t)=>{const a=(e&&e[Fr]).call(e);let o;for(;(o=a.next())&&!o.done;){const r=o.value;t.call(e,r[0],r[1])}},Hv=(e,t)=>{let n;const a=[];for(;(n=e.exec(t))!==null;)a.push(n);return a},Yv=bt("HTMLFormElement"),Gv=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,a,o){return a.toUpperCase()+o}),Gu=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Vv=bt("RegExp"),zh=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),a={};fo(n,(o,r)=>{let i;(i=t(o,r,e))!==!1&&(a[r]=i||o)}),Object.defineProperties(e,a)},qv=e=>{zh(e,(t,n)=>{if(Ze(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const a=e[n];if(Ze(a)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},Jv=(e,t)=>{const n={},a=o=>{o.forEach(r=>{n[r]=!0})};return ga(e)?a(e):a(String(e).split(t)),n},Kv=()=>{},Qv=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Xv(e){return!!(e&&Ze(e.append)&&e[Oh]==="FormData"&&e[Fr])}const Zv=e=>{const t=new Array(10),n=(a,o)=>{if(mo(a)){if(t.indexOf(a)>=0)return;if(ho(a))return a;if(!("toJSON"in a)){t[o]=a;const r=ga(a)?[]:{};return fo(a,(i,l)=>{const u=n(i,o+1);!ca(u)&&(r[l]=u)}),t[o]=void 0,r}}return a};return n(e,0)},ek=bt("AsyncFunction"),tk=e=>e&&(mo(e)||Ze(e))&&Ze(e.then)&&Ze(e.catch),Uh=((e,t)=>e?setImmediate:t?((n,a)=>(bn.addEventListener("message",({source:o,data:r})=>{o===bn&&r===n&&a.length&&a.shift()()},!1),o=>{a.push(o),bn.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Ze(bn.postMessage)),nk=typeof queueMicrotask<"u"?queueMicrotask.bind(bn):typeof process<"u"&&process.nextTick||Uh,ak=e=>e!=null&&Ze(e[Fr]),_={isArray:ga,isArrayBuffer:Dh,isBuffer:ho,isFormData:xv,isArrayBufferView:kv,isString:Iv,isNumber:Fh,isBoolean:bv,isObject:mo,isPlainObject:qo,isEmptyObject:Ev,isReadableStream:Pv,isRequest:Lv,isResponse:Mv,isHeaders:Bv,isUndefined:ca,isDate:Sv,isFile:_v,isBlob:Nv,isRegExp:Vv,isFunction:Ze,isStream:Tv,isURLSearchParams:Av,isTypedArray:Uv,isFileList:Cv,forEach:fo,merge:ki,extend:Ov,trim:Rv,stripBOM:Dv,inherits:Fv,toFlatObject:jv,kindOf:jr,kindOfTest:bt,endsWith:Wv,toArray:zv,forEachEntry:$v,matchAll:Hv,isHTMLForm:Yv,hasOwnProperty:Gu,hasOwnProp:Gu,reduceDescriptors:zh,freezeMethods:qv,toObjectSet:Jv,toCamelCase:Gv,noop:Kv,toFiniteNumber:Qv,findKey:jh,global:bn,isContextDefined:Wh,isSpecCompliantForm:Xv,toJSONObject:Zv,isAsyncFn:ek,isThenable:tk,setImmediate:Uh,asap:nk,isIterable:ak};let G=class $h extends Error{static from(t,n,a,o,r,i){const l=new $h(t.message,n||t.code,a,o,r);return l.cause=t,l.name=t.name,i&&Object.assign(l,i),l}constructor(t,n,a,o,r){super(t),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),a&&(this.config=a),o&&(this.request=o),r&&(this.response=r,this.status=r.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:_.toJSONObject(this.config),code:this.code,status:this.status}}};G.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";G.ERR_BAD_OPTION="ERR_BAD_OPTION";G.ECONNABORTED="ECONNABORTED";G.ETIMEDOUT="ETIMEDOUT";G.ERR_NETWORK="ERR_NETWORK";G.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";G.ERR_DEPRECATED="ERR_DEPRECATED";G.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";G.ERR_BAD_REQUEST="ERR_BAD_REQUEST";G.ERR_CANCELED="ERR_CANCELED";G.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";G.ERR_INVALID_URL="ERR_INVALID_URL";const ok=null;function Ii(e){return _.isPlainObject(e)||_.isArray(e)}function Hh(e){return _.endsWith(e,"[]")?e.slice(0,-2):e}function Vu(e,t,n){return e?e.concat(t).map(function(o,r){return o=Hh(o),!n&&r?"["+o+"]":o}).join(n?".":""):t}function rk(e){return _.isArray(e)&&!e.some(Ii)}const sk=_.toFlatObject(_,{},null,function(t){return/^is[A-Z]/.test(t)});function zr(e,t,n){if(!_.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=_.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(k,E){return!_.isUndefined(E[k])});const a=n.metaTokens,o=n.visitor||d,r=n.dots,i=n.indexes,u=(n.Blob||typeof Blob<"u"&&Blob)&&_.isSpecCompliantForm(t);if(!_.isFunction(o))throw new TypeError("visitor must be a function");function c(y){if(y===null)return"";if(_.isDate(y))return y.toISOString();if(_.isBoolean(y))return y.toString();if(!u&&_.isBlob(y))throw new G("Blob is not supported. Use a Buffer instead.");return _.isArrayBuffer(y)||_.isTypedArray(y)?u&&typeof Blob=="function"?new Blob([y]):Buffer.from(y):y}function d(y,k,E){let f=y;if(y&&!E&&typeof y=="object"){if(_.endsWith(k,"{}"))k=a?k:k.slice(0,-2),y=JSON.stringify(y);else if(_.isArray(y)&&rk(y)||(_.isFileList(y)||_.endsWith(k,"[]"))&&(f=_.toArray(y)))return k=Hh(k),f.forEach(function(p,N){!(_.isUndefined(p)||p===null)&&t.append(i===!0?Vu([k],N,r):i===null?k:k+"[]",c(p))}),!1}return Ii(y)?!0:(t.append(Vu(E,k,r),c(y)),!1)}const m=[],g=Object.assign(sk,{defaultVisitor:d,convertValue:c,isVisitable:Ii});function S(y,k){if(!_.isUndefined(y)){if(m.indexOf(y)!==-1)throw Error("Circular reference detected in "+k.join("."));m.push(y),_.forEach(y,function(f,h){(!(_.isUndefined(f)||f===null)&&o.call(t,f,_.isString(h)?h.trim():h,k,g))===!0&&S(f,k?k.concat(h):[h])}),m.pop()}}if(!_.isObject(e))throw new TypeError("data must be an object");return S(e),t}function qu(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(a){return t[a]})}function Sl(e,t){this._pairs=[],e&&zr(e,this,t)}const Yh=Sl.prototype;Yh.append=function(t,n){this._pairs.push([t,n])};Yh.toString=function(t){const n=t?function(a){return t.call(this,a,qu)}:qu;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function ik(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Gh(e,t,n){if(!t)return e;const a=n&&n.encode||ik,o=_.isFunction(n)?{serialize:n}:n,r=o&&o.serialize;let i;if(r?i=r(t,o):i=_.isURLSearchParams(t)?t.toString():new Sl(t,o).toString(a),i){const l=e.indexOf("#");l!==-1&&(e=e.slice(0,l)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Ju{constructor(){this.handlers=[]}use(t,n,a){return this.handlers.push({fulfilled:t,rejected:n,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){_.forEach(this.handlers,function(a){a!==null&&t(a)})}}const Vh={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},lk=typeof URLSearchParams<"u"?URLSearchParams:Sl,uk=typeof FormData<"u"?FormData:null,ck=typeof Blob<"u"?Blob:null,dk={isBrowser:!0,classes:{URLSearchParams:lk,FormData:uk,Blob:ck},protocols:["http","https","file","blob","url","data"]},_l=typeof window<"u"&&typeof document<"u",bi=typeof navigator=="object"&&navigator||void 0,hk=_l&&(!bi||["ReactNative","NativeScript","NS"].indexOf(bi.product)<0),mk=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",fk=_l&&window.location.href||"http://localhost",pk=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:_l,hasStandardBrowserEnv:hk,hasStandardBrowserWebWorkerEnv:mk,navigator:bi,origin:fk},Symbol.toStringTag,{value:"Module"})),je={...pk,...dk};function gk(e,t){return zr(e,new je.classes.URLSearchParams,{visitor:function(n,a,o,r){return je.isNode&&_.isBuffer(n)?(this.append(a,n.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function yk(e){return _.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function wk(e){const t={},n=Object.keys(e);let a;const o=n.length;let r;for(a=0;a<o;a++)r=n[a],t[r]=e[r];return t}function qh(e){function t(n,a,o,r){let i=n[r++];if(i==="__proto__")return!0;const l=Number.isFinite(+i),u=r>=n.length;return i=!i&&_.isArray(o)?o.length:i,u?(_.hasOwnProp(o,i)?o[i]=[o[i],a]:o[i]=a,!l):((!o[i]||!_.isObject(o[i]))&&(o[i]=[]),t(n,a,o[i],r)&&_.isArray(o[i])&&(o[i]=wk(o[i])),!l)}if(_.isFormData(e)&&_.isFunction(e.entries)){const n={};return _.forEachEntry(e,(a,o)=>{t(yk(a),o,n,0)}),n}return null}function vk(e,t,n){if(_.isString(e))try{return(t||JSON.parse)(e),_.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(n||JSON.stringify)(e)}const po={transitional:Vh,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const a=n.getContentType()||"",o=a.indexOf("application/json")>-1,r=_.isObject(t);if(r&&_.isHTMLForm(t)&&(t=new FormData(t)),_.isFormData(t))return o?JSON.stringify(qh(t)):t;if(_.isArrayBuffer(t)||_.isBuffer(t)||_.isStream(t)||_.isFile(t)||_.isBlob(t)||_.isReadableStream(t))return t;if(_.isArrayBufferView(t))return t.buffer;if(_.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let l;if(r){if(a.indexOf("application/x-www-form-urlencoded")>-1)return gk(t,this.formSerializer).toString();if((l=_.isFileList(t))||a.indexOf("multipart/form-data")>-1){const u=this.env&&this.env.FormData;return zr(l?{"files[]":t}:t,u&&new u,this.formSerializer)}}return r||o?(n.setContentType("application/json",!1),vk(t)):t}],transformResponse:[function(t){const n=this.transitional||po.transitional,a=n&&n.forcedJSONParsing,o=this.responseType==="json";if(_.isResponse(t)||_.isReadableStream(t))return t;if(t&&_.isString(t)&&(a&&!this.responseType||o)){const i=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(l){if(i)throw l.name==="SyntaxError"?G.from(l,G.ERR_BAD_RESPONSE,this,null,this.response):l}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:je.classes.FormData,Blob:je.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};_.forEach(["delete","get","head","post","put","patch"],e=>{po.headers[e]={}});const kk=_.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Ik=e=>{const t={};let n,a,o;return e&&e.split(`
`).forEach(function(i){o=i.indexOf(":"),n=i.substring(0,o).trim().toLowerCase(),a=i.substring(o+1).trim(),!(!n||t[n]&&kk[n])&&(n==="set-cookie"?t[n]?t[n].push(a):t[n]=[a]:t[n]=t[n]?t[n]+", "+a:a)}),t},Ku=Symbol("internals");function _a(e){return e&&String(e).trim().toLowerCase()}function Jo(e){return e===!1||e==null?e:_.isArray(e)?e.map(Jo):String(e)}function bk(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=n.exec(e);)t[a[1]]=a[2];return t}const Ek=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ks(e,t,n,a,o){if(_.isFunction(a))return a.call(this,t,n);if(o&&(t=n),!!_.isString(t)){if(_.isString(a))return t.indexOf(a)!==-1;if(_.isRegExp(a))return a.test(t)}}function Sk(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,a)=>n.toUpperCase()+a)}function _k(e,t){const n=_.toCamelCase(" "+t);["get","set","has"].forEach(a=>{Object.defineProperty(e,a+n,{value:function(o,r,i){return this[a].call(this,t,o,r,i)},configurable:!0})})}let et=class{constructor(t){t&&this.set(t)}set(t,n,a){const o=this;function r(l,u,c){const d=_a(u);if(!d)throw new Error("header name must be a non-empty string");const m=_.findKey(o,d);(!m||o[m]===void 0||c===!0||c===void 0&&o[m]!==!1)&&(o[m||u]=Jo(l))}const i=(l,u)=>_.forEach(l,(c,d)=>r(c,d,u));if(_.isPlainObject(t)||t instanceof this.constructor)i(t,n);else if(_.isString(t)&&(t=t.trim())&&!Ek(t))i(Ik(t),n);else if(_.isObject(t)&&_.isIterable(t)){let l={},u,c;for(const d of t){if(!_.isArray(d))throw TypeError("Object iterator must return a key-value pair");l[c=d[0]]=(u=l[c])?_.isArray(u)?[...u,d[1]]:[u,d[1]]:d[1]}i(l,n)}else t!=null&&r(n,t,a);return this}get(t,n){if(t=_a(t),t){const a=_.findKey(this,t);if(a){const o=this[a];if(!n)return o;if(n===!0)return bk(o);if(_.isFunction(n))return n.call(this,o,a);if(_.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=_a(t),t){const a=_.findKey(this,t);return!!(a&&this[a]!==void 0&&(!n||ks(this,this[a],a,n)))}return!1}delete(t,n){const a=this;let o=!1;function r(i){if(i=_a(i),i){const l=_.findKey(a,i);l&&(!n||ks(a,a[l],l,n))&&(delete a[l],o=!0)}}return _.isArray(t)?t.forEach(r):r(t),o}clear(t){const n=Object.keys(this);let a=n.length,o=!1;for(;a--;){const r=n[a];(!t||ks(this,this[r],r,t,!0))&&(delete this[r],o=!0)}return o}normalize(t){const n=this,a={};return _.forEach(this,(o,r)=>{const i=_.findKey(a,r);if(i){n[i]=Jo(o),delete n[r];return}const l=t?Sk(r):String(r).trim();l!==r&&delete n[r],n[l]=Jo(o),a[l]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return _.forEach(this,(a,o)=>{a!=null&&a!==!1&&(n[o]=t&&_.isArray(a)?a.join(", "):a)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const a=new this(t);return n.forEach(o=>a.set(o)),a}static accessor(t){const a=(this[Ku]=this[Ku]={accessors:{}}).accessors,o=this.prototype;function r(i){const l=_a(i);a[l]||(_k(o,i),a[l]=!0)}return _.isArray(t)?t.forEach(r):r(t),this}};et.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);_.reduceDescriptors(et.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(a){this[n]=a}}});_.freezeMethods(et);function Is(e,t){const n=this||po,a=t||n,o=et.from(a.headers);let r=a.data;return _.forEach(e,function(l){r=l.call(n,r,o.normalize(),t?t.status:void 0)}),o.normalize(),r}function Jh(e){return!!(e&&e.__CANCEL__)}let go=class extends G{constructor(t,n,a){super(t??"canceled",G.ERR_CANCELED,n,a),this.name="CanceledError",this.__CANCEL__=!0}};function Kh(e,t,n){const a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new G("Request failed with status code "+n.status,[G.ERR_BAD_REQUEST,G.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function Nk(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Ck(e,t){e=e||10;const n=new Array(e),a=new Array(e);let o=0,r=0,i;return t=t!==void 0?t:1e3,function(u){const c=Date.now(),d=a[r];i||(i=c),n[o]=u,a[o]=c;let m=r,g=0;for(;m!==o;)g+=n[m++],m=m%e;if(o=(o+1)%e,o===r&&(r=(r+1)%e),c-i<t)return;const S=d&&c-d;return S?Math.round(g*1e3/S):void 0}}function Tk(e,t){let n=0,a=1e3/t,o,r;const i=(c,d=Date.now())=>{n=d,o=null,r&&(clearTimeout(r),r=null),e(...c)};return[(...c)=>{const d=Date.now(),m=d-n;m>=a?i(c,d):(o=c,r||(r=setTimeout(()=>{r=null,i(o)},a-m)))},()=>o&&i(o)]}const Ir=(e,t,n=3)=>{let a=0;const o=Ck(50,250);return Tk(r=>{const i=r.loaded,l=r.lengthComputable?r.total:void 0,u=i-a,c=o(u),d=i<=l;a=i;const m={loaded:i,total:l,progress:l?i/l:void 0,bytes:u,rate:c||void 0,estimated:c&&l&&d?(l-i)/c:void 0,event:r,lengthComputable:l!=null,[t?"download":"upload"]:!0};e(m)},n)},Qu=(e,t)=>{const n=e!=null;return[a=>t[0]({lengthComputable:n,total:e,loaded:a}),t[1]]},Xu=e=>(...t)=>_.asap(()=>e(...t)),xk=je.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,je.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(je.origin),je.navigator&&/(msie|trident)/i.test(je.navigator.userAgent)):()=>!0,Ak=je.hasStandardBrowserEnv?{write(e,t,n,a,o,r,i){if(typeof document>"u")return;const l=[`${e}=${encodeURIComponent(t)}`];_.isNumber(n)&&l.push(`expires=${new Date(n).toUTCString()}`),_.isString(a)&&l.push(`path=${a}`),_.isString(o)&&l.push(`domain=${o}`),r===!0&&l.push("secure"),_.isString(i)&&l.push(`SameSite=${i}`),document.cookie=l.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Pk(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Lk(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Qh(e,t,n){let a=!Pk(t);return e&&(a||n==!1)?Lk(e,t):t}const Zu=e=>e instanceof et?{...e}:e;function Ln(e,t){t=t||{};const n={};function a(c,d,m,g){return _.isPlainObject(c)&&_.isPlainObject(d)?_.merge.call({caseless:g},c,d):_.isPlainObject(d)?_.merge({},d):_.isArray(d)?d.slice():d}function o(c,d,m,g){if(_.isUndefined(d)){if(!_.isUndefined(c))return a(void 0,c,m,g)}else return a(c,d,m,g)}function r(c,d){if(!_.isUndefined(d))return a(void 0,d)}function i(c,d){if(_.isUndefined(d)){if(!_.isUndefined(c))return a(void 0,c)}else return a(void 0,d)}function l(c,d,m){if(m in t)return a(c,d);if(m in e)return a(void 0,c)}const u={url:r,method:r,data:r,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:l,headers:(c,d,m)=>o(Zu(c),Zu(d),m,!0)};return _.forEach(Object.keys({...e,...t}),function(d){const m=u[d]||o,g=m(e[d],t[d],d);_.isUndefined(g)&&m!==l||(n[d]=g)}),n}const Xh=e=>{const t=Ln({},e);let{data:n,withXSRFToken:a,xsrfHeaderName:o,xsrfCookieName:r,headers:i,auth:l}=t;if(t.headers=i=et.from(i),t.url=Gh(Qh(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),l&&i.set("Authorization","Basic "+btoa((l.username||"")+":"+(l.password?unescape(encodeURIComponent(l.password)):""))),_.isFormData(n)){if(je.hasStandardBrowserEnv||je.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if(_.isFunction(n.getHeaders)){const u=n.getHeaders(),c=["content-type","content-length"];Object.entries(u).forEach(([d,m])=>{c.includes(d.toLowerCase())&&i.set(d,m)})}}if(je.hasStandardBrowserEnv&&(a&&_.isFunction(a)&&(a=a(t)),a||a!==!1&&xk(t.url))){const u=o&&r&&Ak.read(r);u&&i.set(o,u)}return t},Mk=typeof XMLHttpRequest<"u",Bk=Mk&&function(e){return new Promise(function(n,a){const o=Xh(e);let r=o.data;const i=et.from(o.headers).normalize();let{responseType:l,onUploadProgress:u,onDownloadProgress:c}=o,d,m,g,S,y;function k(){S&&S(),y&&y(),o.cancelToken&&o.cancelToken.unsubscribe(d),o.signal&&o.signal.removeEventListener("abort",d)}let E=new XMLHttpRequest;E.open(o.method.toUpperCase(),o.url,!0),E.timeout=o.timeout;function f(){if(!E)return;const p=et.from("getAllResponseHeaders"in E&&E.getAllResponseHeaders()),C={data:!l||l==="text"||l==="json"?E.responseText:E.response,status:E.status,statusText:E.statusText,headers:p,config:e,request:E};Kh(function(P){n(P),k()},function(P){a(P),k()},C),E=null}"onloadend"in E?E.onloadend=f:E.onreadystatechange=function(){!E||E.readyState!==4||E.status===0&&!(E.responseURL&&E.responseURL.indexOf("file:")===0)||setTimeout(f)},E.onabort=function(){E&&(a(new G("Request aborted",G.ECONNABORTED,e,E)),E=null)},E.onerror=function(N){const C=N&&N.message?N.message:"Network Error",A=new G(C,G.ERR_NETWORK,e,E);A.event=N||null,a(A),E=null},E.ontimeout=function(){let N=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const C=o.transitional||Vh;o.timeoutErrorMessage&&(N=o.timeoutErrorMessage),a(new G(N,C.clarifyTimeoutError?G.ETIMEDOUT:G.ECONNABORTED,e,E)),E=null},r===void 0&&i.setContentType(null),"setRequestHeader"in E&&_.forEach(i.toJSON(),function(N,C){E.setRequestHeader(C,N)}),_.isUndefined(o.withCredentials)||(E.withCredentials=!!o.withCredentials),l&&l!=="json"&&(E.responseType=o.responseType),c&&([g,y]=Ir(c,!0),E.addEventListener("progress",g)),u&&E.upload&&([m,S]=Ir(u),E.upload.addEventListener("progress",m),E.upload.addEventListener("loadend",S)),(o.cancelToken||o.signal)&&(d=p=>{E&&(a(!p||p.type?new go(null,e,E):p),E.abort(),E=null)},o.cancelToken&&o.cancelToken.subscribe(d),o.signal&&(o.signal.aborted?d():o.signal.addEventListener("abort",d)));const h=Nk(o.url);if(h&&je.protocols.indexOf(h)===-1){a(new G("Unsupported protocol "+h+":",G.ERR_BAD_REQUEST,e));return}E.send(r||null)})},Rk=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let a=new AbortController,o;const r=function(c){if(!o){o=!0,l();const d=c instanceof Error?c:this.reason;a.abort(d instanceof G?d:new go(d instanceof Error?d.message:d))}};let i=t&&setTimeout(()=>{i=null,r(new G(`timeout of ${t}ms exceeded`,G.ETIMEDOUT))},t);const l=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(c=>{c.unsubscribe?c.unsubscribe(r):c.removeEventListener("abort",r)}),e=null)};e.forEach(c=>c.addEventListener("abort",r));const{signal:u}=a;return u.unsubscribe=()=>_.asap(l),u}},Ok=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let a=0,o;for(;a<n;)o=a+t,yield e.slice(a,o),a=o},Dk=async function*(e,t){for await(const n of Fk(e))yield*Ok(n,t)},Fk=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:a}=await t.read();if(n)break;yield a}}finally{await t.cancel()}},ec=(e,t,n,a)=>{const o=Dk(e,t);let r=0,i,l=u=>{i||(i=!0,a&&a(u))};return new ReadableStream({async pull(u){try{const{done:c,value:d}=await o.next();if(c){l(),u.close();return}let m=d.byteLength;if(n){let g=r+=m;n(g)}u.enqueue(new Uint8Array(d))}catch(c){throw l(c),c}},cancel(u){return l(u),o.return()}},{highWaterMark:2})},tc=64*1024,{isFunction:Ro}=_,jk=(({Request:e,Response:t})=>({Request:e,Response:t}))(_.global),{ReadableStream:nc,TextEncoder:ac}=_.global,oc=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Wk=e=>{e=_.merge.call({skipUndefined:!0},jk,e);const{fetch:t,Request:n,Response:a}=e,o=t?Ro(t):typeof fetch=="function",r=Ro(n),i=Ro(a);if(!o)return!1;const l=o&&Ro(nc),u=o&&(typeof ac=="function"?(y=>k=>y.encode(k))(new ac):async y=>new Uint8Array(await new n(y).arrayBuffer())),c=r&&l&&oc(()=>{let y=!1;const k=new n(je.origin,{body:new nc,method:"POST",get duplex(){return y=!0,"half"}}).headers.has("Content-Type");return y&&!k}),d=i&&l&&oc(()=>_.isReadableStream(new a("").body)),m={stream:d&&(y=>y.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(y=>{!m[y]&&(m[y]=(k,E)=>{let f=k&&k[y];if(f)return f.call(k);throw new G(`Response type '${y}' is not supported`,G.ERR_NOT_SUPPORT,E)})});const g=async y=>{if(y==null)return 0;if(_.isBlob(y))return y.size;if(_.isSpecCompliantForm(y))return(await new n(je.origin,{method:"POST",body:y}).arrayBuffer()).byteLength;if(_.isArrayBufferView(y)||_.isArrayBuffer(y))return y.byteLength;if(_.isURLSearchParams(y)&&(y=y+""),_.isString(y))return(await u(y)).byteLength},S=async(y,k)=>{const E=_.toFiniteNumber(y.getContentLength());return E??g(k)};return async y=>{let{url:k,method:E,data:f,signal:h,cancelToken:p,timeout:N,onDownloadProgress:C,onUploadProgress:A,responseType:P,headers:B,withCredentials:$="same-origin",fetchOptions:W}=Xh(y),X=t||fetch;P=P?(P+"").toLowerCase():"text";let Z=Rk([h,p&&p.toAbortSignal()],N),ne=null;const ve=Z&&Z.unsubscribe&&(()=>{Z.unsubscribe()});let R;try{if(A&&c&&E!=="get"&&E!=="head"&&(R=await S(B,f))!==0){let V=new n(k,{method:"POST",body:f,duplex:"half"}),U;if(_.isFormData(f)&&(U=V.headers.get("content-type"))&&B.setContentType(U),V.body){const[de,ye]=Qu(R,Ir(Xu(A)));f=ec(V.body,tc,de,ye)}}_.isString($)||($=$?"include":"omit");const ee=r&&"credentials"in n.prototype,ae={...W,signal:Z,method:E.toUpperCase(),headers:B.normalize().toJSON(),body:f,duplex:"half",credentials:ee?$:void 0};ne=r&&new n(k,ae);let x=await(r?X(ne,W):X(k,ae));const M=d&&(P==="stream"||P==="response");if(d&&(C||M&&ve)){const V={};["status","statusText","headers"].forEach(Ve=>{V[Ve]=x[Ve]});const U=_.toFiniteNumber(x.headers.get("content-length")),[de,ye]=C&&Qu(U,Ir(Xu(C),!0))||[];x=new a(ec(x.body,tc,de,()=>{ye&&ye(),ve&&ve()}),V)}P=P||"text";let j=await m[_.findKey(m,P)||"text"](x,y);return!M&&ve&&ve(),await new Promise((V,U)=>{Kh(V,U,{data:j,headers:et.from(x.headers),status:x.status,statusText:x.statusText,config:y,request:ne})})}catch(ee){throw ve&&ve(),ee&&ee.name==="TypeError"&&/Load failed|fetch/i.test(ee.message)?Object.assign(new G("Network Error",G.ERR_NETWORK,y,ne),{cause:ee.cause||ee}):G.from(ee,ee&&ee.code,y,ne)}}},zk=new Map,Zh=e=>{let t=e&&e.env||{};const{fetch:n,Request:a,Response:o}=t,r=[a,o,n];let i=r.length,l=i,u,c,d=zk;for(;l--;)u=r[l],c=d.get(u),c===void 0&&d.set(u,c=l?new Map:Wk(t)),d=c;return c};Zh();const Nl={http:ok,xhr:Bk,fetch:{get:Zh}};_.forEach(Nl,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const rc=e=>`- ${e}`,Uk=e=>_.isFunction(e)||e===null||e===!1;function $k(e,t){e=_.isArray(e)?e:[e];const{length:n}=e;let a,o;const r={};for(let i=0;i<n;i++){a=e[i];let l;if(o=a,!Uk(a)&&(o=Nl[(l=String(a)).toLowerCase()],o===void 0))throw new G(`Unknown adapter '${l}'`);if(o&&(_.isFunction(o)||(o=o.get(t))))break;r[l||"#"+i]=o}if(!o){const i=Object.entries(r).map(([u,c])=>`adapter ${u} `+(c===!1?"is not supported by the environment":"is not available in the build"));let l=n?i.length>1?`since :
`+i.map(rc).join(`
`):" "+rc(i[0]):"as no adapter specified";throw new G("There is no suitable adapter to dispatch the request "+l,"ERR_NOT_SUPPORT")}return o}const em={getAdapter:$k,adapters:Nl};function bs(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new go(null,e)}function sc(e){return bs(e),e.headers=et.from(e.headers),e.data=Is.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),em.getAdapter(e.adapter||po.adapter,e)(e).then(function(a){return bs(e),a.data=Is.call(e,e.transformResponse,a),a.headers=et.from(a.headers),a},function(a){return Jh(a)||(bs(e),a&&a.response&&(a.response.data=Is.call(e,e.transformResponse,a.response),a.response.headers=et.from(a.response.headers))),Promise.reject(a)})}const tm="1.13.4",Ur={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Ur[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});const ic={};Ur.transitional=function(t,n,a){function o(r,i){return"[Axios v"+tm+"] Transitional option '"+r+"'"+i+(a?". "+a:"")}return(r,i,l)=>{if(t===!1)throw new G(o(i," has been removed"+(n?" in "+n:"")),G.ERR_DEPRECATED);return n&&!ic[i]&&(ic[i]=!0,console.warn(o(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(r,i,l):!0}};Ur.spelling=function(t){return(n,a)=>(console.warn(`${a} is likely a misspelling of ${t}`),!0)};function Hk(e,t,n){if(typeof e!="object")throw new G("options must be an object",G.ERR_BAD_OPTION_VALUE);const a=Object.keys(e);let o=a.length;for(;o-- >0;){const r=a[o],i=t[r];if(i){const l=e[r],u=l===void 0||i(l,r,e);if(u!==!0)throw new G("option "+r+" must be "+u,G.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new G("Unknown option "+r,G.ERR_BAD_OPTION)}}const Ko={assertOptions:Hk,validators:Ur},St=Ko.validators;let Nn=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Ju,response:new Ju}}async request(t,n){try{return await this._request(t,n)}catch(a){if(a instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const r=o.stack?o.stack.replace(/^.+\n/,""):"";try{a.stack?r&&!String(a.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(a.stack+=`
`+r):a.stack=r}catch{}}throw a}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Ln(this.defaults,n);const{transitional:a,paramsSerializer:o,headers:r}=n;a!==void 0&&Ko.assertOptions(a,{silentJSONParsing:St.transitional(St.boolean),forcedJSONParsing:St.transitional(St.boolean),clarifyTimeoutError:St.transitional(St.boolean)},!1),o!=null&&(_.isFunction(o)?n.paramsSerializer={serialize:o}:Ko.assertOptions(o,{encode:St.function,serialize:St.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Ko.assertOptions(n,{baseUrl:St.spelling("baseURL"),withXsrfToken:St.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=r&&_.merge(r.common,r[n.method]);r&&_.forEach(["delete","get","head","post","put","patch","common"],y=>{delete r[y]}),n.headers=et.concat(i,r);const l=[];let u=!0;this.interceptors.request.forEach(function(k){typeof k.runWhen=="function"&&k.runWhen(n)===!1||(u=u&&k.synchronous,l.unshift(k.fulfilled,k.rejected))});const c=[];this.interceptors.response.forEach(function(k){c.push(k.fulfilled,k.rejected)});let d,m=0,g;if(!u){const y=[sc.bind(this),void 0];for(y.unshift(...l),y.push(...c),g=y.length,d=Promise.resolve(n);m<g;)d=d.then(y[m++],y[m++]);return d}g=l.length;let S=n;for(;m<g;){const y=l[m++],k=l[m++];try{S=y(S)}catch(E){k.call(this,E);break}}try{d=sc.call(this,S)}catch(y){return Promise.reject(y)}for(m=0,g=c.length;m<g;)d=d.then(c[m++],c[m++]);return d}getUri(t){t=Ln(this.defaults,t);const n=Qh(t.baseURL,t.url,t.allowAbsoluteUrls);return Gh(n,t.params,t.paramsSerializer)}};_.forEach(["delete","get","head","options"],function(t){Nn.prototype[t]=function(n,a){return this.request(Ln(a||{},{method:t,url:n,data:(a||{}).data}))}});_.forEach(["post","put","patch"],function(t){function n(a){return function(r,i,l){return this.request(Ln(l||{},{method:t,headers:a?{"Content-Type":"multipart/form-data"}:{},url:r,data:i}))}}Nn.prototype[t]=n(),Nn.prototype[t+"Form"]=n(!0)});let Yk=class nm{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(r){n=r});const a=this;this.promise.then(o=>{if(!a._listeners)return;let r=a._listeners.length;for(;r-- >0;)a._listeners[r](o);a._listeners=null}),this.promise.then=o=>{let r;const i=new Promise(l=>{a.subscribe(l),r=l}).then(o);return i.cancel=function(){a.unsubscribe(r)},i},t(function(r,i,l){a.reason||(a.reason=new go(r,i,l),n(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=a=>{t.abort(a)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new nm(function(o){t=o}),cancel:t}}};function Gk(e){return function(n){return e.apply(null,n)}}function Vk(e){return _.isObject(e)&&e.isAxiosError===!0}const Ei={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ei).forEach(([e,t])=>{Ei[t]=e});function am(e){const t=new Nn(e),n=Rh(Nn.prototype.request,t);return _.extend(n,Nn.prototype,t,{allOwnKeys:!0}),_.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return am(Ln(e,o))},n}const K=am(po);K.Axios=Nn;K.CanceledError=go;K.CancelToken=Yk;K.isCancel=Jh;K.VERSION=tm;K.toFormData=zr;K.AxiosError=G;K.Cancel=K.CanceledError;K.all=function(t){return Promise.all(t)};K.spread=Gk;K.isAxiosError=Vk;K.mergeConfig=Ln;K.AxiosHeaders=et;K.formToJSON=e=>qh(_.isHTMLForm(e)?new FormData(e):e);K.getAdapter=em.getAdapter;K.HttpStatusCode=Ei;K.default=K;const{Axios:xS,AxiosError:AS,CanceledError:PS,isCancel:LS,CancelToken:MS,VERSION:BS,all:RS,Cancel:OS,isAxiosError:DS,spread:FS,toFormData:jS,AxiosHeaders:WS,HttpStatusCode:zS,formToJSON:US,getAdapter:$S,mergeConfig:HS}=K,wn="/api/v1";console.log("🔗 PaymentService initialized with API_URL:",wn);const lc=e=>{const n=`; ${document.cookie}`.split(`; ${e}=`);return n.length===2?n.pop().split(";").shift():null},Ue={async getCurrencyOptions(){try{return(await K.get(`${wn}/payments/currency-options`)).data}catch(e){return console.error("❌ Failed to get currency options:",e),{success:!1,error:"Failed to get currency options"}}},async validateAccessCode(e,t="suicide-note-2026"){var n,a;try{const o=e.trim().toUpperCase();console.log("🔑 Validating access code:",{code:o,ebookId:t});const r=await K.post(`${wn}/payments/validate-access-code`,{code:o,ebookSlug:t});return r.data.success&&localStorage.setItem(`ebook_access_${t}`,o),r.data}catch(o){return console.error("❌ Validation error:",o),{success:!1,error:((a=(n=o.response)==null?void 0:n.data)==null?void 0:a.error)||"Failed to validate access code"}}},getAffiliateCodeFromCookie(){return lc("affiliate_ref")},getCampaignFromCookie(){return lc("affiliate_campaign")},async initializePayment(e){var t,n,a,o,r,i;try{e.affiliateCode||(e.affiliateCode=this.getAffiliateCodeFromCookie()),e.campaignName||(e.campaignName=this.getCampaignFromCookie()),console.log("📤 Sending payment request with affiliate:",{affiliateCode:e.affiliateCode,campaignName:e.campaignName});const l=await K.post(`${wn}/payments/initialize`,e,{headers:{"Content-Type":"application/json",Accept:"application/json"},withCredentials:!0});return console.log("✅ Backend response:",l.data),l.data}catch(l){return console.error("❌ Payment initialization failed:",((t=l.response)==null?void 0:t.data)||l.message),{success:!1,error:((a=(n=l.response)==null?void 0:n.data)==null?void 0:a.error)||l.message||"Payment initialization failed",details:(r=(o=l.response)==null?void 0:o.data)==null?void 0:r.details,status:(i=l.response)==null?void 0:i.status}}},async verifyPayment(e){var t,n,a;try{console.log("🔗 Verifying payment with reference:",e);const o=await K.post(`${wn}/payments/verify`,{reference:e},{headers:{"Content-Type":"application/json"},withCredentials:!0});return console.log("✅ Verification response:",o.data),o.data.success&&((t=o.data.data)!=null&&t.accessCode)&&localStorage.setItem("ebook_access_suicide-note-2026",o.data.data.accessCode),o.data}catch(o){return console.error("❌ Payment verification failed:",o),{success:!1,error:((a=(n=o.response)==null?void 0:n.data)==null?void 0:a.error)||o.message||"Payment verification failed"}}},async getUserPurchases(){try{return(await K.get(`${wn}/payments/purchases`,{withCredentials:!0})).data}catch(e){return console.error("Get purchases failed:",e),{success:!1,error:"Failed to fetch purchases"}}},async trackAffiliateClick(e){try{return(await K.get(`${wn}/payments/track-click`,{params:{affiliateCode:e},withCredentials:!0})).data}catch(t){return console.error("Track affiliate click failed:",t),{success:!1,error:"Failed to track affiliate click"}}},hasExistingAccess(e="suicide-note-2026"){const t=localStorage.getItem(`ebook_access_${e}`);return t?{hasAccess:!1,accessCode:t,needsRevalidation:!0}:{hasAccess:!1}},clearAllAccessCodes(){return Object.keys(localStorage).forEach(t=>{t.startsWith("ebook_access_")&&localStorage.removeItem(t)}),localStorage.removeItem("recent_purchase"),console.log("🧹 All local access codes cleared"),{success:!0}}},fn="/api/v1",uc=e=>{const n=`; ${document.cookie}`.split(`; ${e}=`);return n.length===2?n.pop().split(";").shift():null};class qk{constructor(){this.authToken=null}setAuthToken(t){this.authToken=t,t?K.defaults.headers.common["x-affiliate-token"]=t:delete K.defaults.headers.common["x-affiliate-token"]}getAuthToken(){return this.authToken||localStorage.getItem("affiliate_token")}async request(t,n,a=null){var o,r,i;try{const l=this.getAuthToken(),u={method:t,url:`${fn}${n}`,headers:{"Content-Type":"application/json","x-affiliate-token":l},withCredentials:!0};return a&&(t==="post"||t==="put")&&(u.data=a),(await K(u)).data}catch(l){return console.error(`❌ ${t.toUpperCase()} ${n} failed:`,l),{success:!1,error:((r=(o=l.response)==null?void 0:o.data)==null?void 0:r.error)||l.message||"Request failed",status:(i=l.response)==null?void 0:i.status}}}async registerAffiliate(t,n=""){var a,o,r,i;try{console.log("📝 Registering affiliate with email:",t,"and name:",n);const l=await K.post(`${fn}/affiliate/register`,{email:t,name:n},{withCredentials:!0,headers:{"Content-Type":"application/json"}});return console.log("✅ Register response:",l.data),l.data}catch(l){return console.error("❌ Register affiliate failed:",l),console.error("Error details:",(a=l.response)==null?void 0:a.data),{success:!1,error:((r=(o=l.response)==null?void 0:o.data)==null?void 0:r.error)||"Failed to register as affiliate",details:(i=l.response)==null?void 0:i.data}}}async getDashboard(){return this.request("get","/affiliate/dashboard")}async getEarnings(){return this.request("get","/affiliate/earnings")}async getReferrals(t=1,n=20){return this.request("get",`/affiliate/referrals?page=${t}&limit=${n}`)}async getPerformanceReport(t="month"){var n,a;try{return(await K.get(`${fn}/affiliate/performance/${t}`,{withCredentials:!0})).data}catch(o){return console.error("❌ Get performance report failed:",o),{success:!1,error:((a=(n=o.response)==null?void 0:n.data)==null?void 0:a.error)||"Failed to fetch performance report"}}}async getCampaigns(){return this.request("get","/affiliate/campaigns")}async createCampaign(t){return this.request("post","/affiliate/campaigns",t)}async updateBankDetails(t){return this.request("post","/affiliate/bank-details",t)}async getBankDetails(){return this.request("get","/affiliate/bank-details")}async requestPayout(t){return this.request("post","/affiliate/request-payout",{amount:t})}async getPayoutHistory(){return this.request("get","/affiliate/payouts")}async generateCampaignLink(t,n=null,a=null){var o,r;try{return(await K.post(`${fn}/affiliate/generate-link`,{name:t,medium:n,source:a},{withCredentials:!0})).data}catch(i){return console.error("❌ Generate campaign link failed:",i),{success:!1,error:((r=(o=i.response)==null?void 0:o.data)==null?void 0:r.error)||"Failed to generate campaign link"}}}async getLeaderboard(t="month",n=10){var a,o;try{return(await K.get(`${fn}/affiliate/leaderboard?period=${t}&limit=${n}`,{withCredentials:!0})).data}catch(r){return console.error("❌ Get leaderboard failed:",r),{success:!1,error:((o=(a=r.response)==null?void 0:a.data)==null?void 0:o.error)||"Failed to fetch leaderboard"}}}async deactivateAccount(){var t,n;try{return(await K.post(`${fn}/affiliate/deactivate`,{},{withCredentials:!0})).data}catch(a){return console.error("❌ Deactivate account failed:",a),{success:!1,error:((n=(t=a.response)==null?void 0:t.data)==null?void 0:n.error)||"Failed to deactivate account"}}}async checkAffiliateStatus(){try{if(console.log("🔍 Checking affiliate status..."),this.getAuthToken()){const a=await this.getDashboard();if(a.success)return{isAffiliate:!0,data:a.data}}const n=localStorage.getItem("user");if(n){const a=JSON.parse(n);if(a.role==="affiliate")return{isAffiliate:!0,data:{user:a}}}return{isAffiliate:!1,data:null}}catch(t){return console.error("❌ Check affiliate status error:",t),{isAffiliate:!1,data:null}}}async validateToken(t){var n,a;try{return(await K.get(`${fn}/affiliate/token/info/${t}`)).data}catch(o){return{success:!1,error:((a=(n=o.response)==null?void 0:n.data)==null?void 0:a.error)||"Invalid token"}}}getAffiliateCodeFromUrl(){return new URLSearchParams(window.location.search).get("ref")}getCampaignFromUrl(){return new URLSearchParams(window.location.search).get("campaign")}getAffiliateCodeFromCookie(){return uc("affiliate_ref")}getCampaignFromCookie(){return uc("affiliate_campaign")}generateShareLink(t,n=null,a=null,o=null){let r=`${window.location.origin}/?ref=${t}`;return n&&(r+=`&campaign=${encodeURIComponent(n)}`),a&&(r+=`&medium=${encodeURIComponent(a)}`),o&&(r+=`&source=${encodeURIComponent(o)}`),r}}const De=new qk,Jk="_modalOverlay_1ekxk_1",Kk="_modalContainer_1ekxk_41",Qk="_modalContent_1ekxk_77",Xk="_modalHeader_1ekxk_91",Zk="_modalTitle_1ekxk_109",eI="_closeButton_1ekxk_123",tI="_priceSection_1ekxk_169",nI="_currencyToggle_1ekxk_181",aI="_currencyButton_1ekxk_193",oI="_active_1ekxk_235",rI="_currencyIcon_1ekxk_265",sI="_currencyCode_1ekxk_275",iI="_currencyPrice_1ekxk_289",lI="_currencyMethod_1ekxk_303",uI="_priceDescription_1ekxk_315",cI="_stepContent_1ekxk_333",dI="_formGroup_1ekxk_341",hI="_submitButton_1ekxk_415",mI="_arrow_1ekxk_475",fI="_spinner_1ekxk_483",pI="_paymentFeatures_1ekxk_511",gI="_featureItem_1ekxk_525",yI="_featureIcon_1ekxk_541",wI="_paymentNote_1ekxk_553",vI="_affiliateBadge_1ekxk_647",kI="_affiliateIcon_1ekxk_677",II="_affiliateText_1ekxk_685",bI="_affiliateNote_1ekxk_693",EI="_affiliateNoteIcon_1ekxk_719",J={modalOverlay:Jk,modalContainer:Kk,modalContent:Qk,modalHeader:Xk,modalTitle:Zk,closeButton:eI,priceSection:tI,currencyToggle:nI,currencyButton:aI,active:oI,currencyIcon:rI,currencyCode:sI,currencyPrice:iI,currencyMethod:lI,priceDescription:uI,stepContent:cI,formGroup:dI,submitButton:hI,arrow:mI,spinner:fI,paymentFeatures:pI,featureItem:gI,featureIcon:yI,paymentNote:wI,affiliateBadge:vI,affiliateIcon:kI,affiliateText:II,affiliateNote:bI,affiliateNoteIcon:EI};let SI={data:""},_I=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||SI},NI=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,CI=/\/\*[^]*?\*\/|  +/g,cc=/\n+/g,Vt=(e,t)=>{let n="",a="",o="";for(let r in e){let i=e[r];r[0]=="@"?r[1]=="i"?n=r+" "+i+";":a+=r[1]=="f"?Vt(i,r):r+"{"+Vt(i,r[1]=="k"?"":t)+"}":typeof i=="object"?a+=Vt(i,t?t.replace(/([^,])+/g,l=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,l):l?l+" "+u:u)):r):i!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=Vt.p?Vt.p(r,i):r+":"+i+";")}return n+(t&&o?t+"{"+o+"}":o)+a},At={},om=e=>{if(typeof e=="object"){let t="";for(let n in e)t+=n+om(e[n]);return t}return e},TI=(e,t,n,a,o)=>{let r=om(e),i=At[r]||(At[r]=(u=>{let c=0,d=11;for(;c<u.length;)d=101*d+u.charCodeAt(c++)>>>0;return"go"+d})(r));if(!At[i]){let u=r!==e?e:(c=>{let d,m,g=[{}];for(;d=NI.exec(c.replace(CI,""));)d[4]?g.shift():d[3]?(m=d[3].replace(cc," ").trim(),g.unshift(g[0][m]=g[0][m]||{})):g[0][d[1]]=d[2].replace(cc," ").trim();return g[0]})(e);At[i]=Vt(o?{["@keyframes "+i]:u}:u,n?"":"."+i)}let l=n&&At.g?At.g:null;return n&&(At.g=At[i]),((u,c,d,m)=>{m?c.data=c.data.replace(m,u):c.data.indexOf(u)===-1&&(c.data=d?u+c.data:c.data+u)})(At[i],t,a,l),i},xI=(e,t,n)=>e.reduce((a,o,r)=>{let i=t[r];if(i&&i.call){let l=i(n),u=l&&l.props&&l.props.className||/^go/.test(l)&&l;i=u?"."+u:l&&typeof l=="object"?l.props?"":Vt(l,""):l===!1?"":l}return a+o+(i??"")},"");function $r(e){let t=this||{},n=e.call?e(t.p):e;return TI(n.unshift?n.raw?xI(n,[].slice.call(arguments,1),t.p):n.reduce((a,o)=>Object.assign(a,o&&o.call?o(t.p):o),{}):n,_I(t.target),t.g,t.o,t.k)}let rm,Si,_i;$r.bind({g:1});let Wt=$r.bind({k:1});function AI(e,t,n,a){Vt.p=t,rm=e,Si=n,_i=a}function mn(e,t){let n=this||{};return function(){let a=arguments;function o(r,i){let l=Object.assign({},r),u=l.className||o.className;n.p=Object.assign({theme:Si&&Si()},l),n.o=/ *go\d+/.test(u),l.className=$r.apply(n,a)+(u?" "+u:"");let c=e;return e[0]&&(c=l.as||e,delete l.as),_i&&c[0]&&_i(l),rm(c,l)}return o}}var PI=e=>typeof e=="function",Ni=(e,t)=>PI(e)?e(t):e,LI=(()=>{let e=0;return()=>(++e).toString()})(),MI=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),BI=20,sm="default",im=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(i=>i.id===t.toast.id?{...i,...t.toast}:i)};case 2:let{toast:a}=t;return im(e,{type:e.toasts.find(i=>i.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(i=>i.id===o||o===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+r}))}}},RI=[],OI={toasts:[],pausedAt:void 0,settings:{toastLimit:BI}},na={},lm=(e,t=sm)=>{na[t]=im(na[t]||OI,e),RI.forEach(([n,a])=>{n===t&&a(na[t])})},um=e=>Object.keys(na).forEach(t=>lm(e,t)),DI=e=>Object.keys(na).find(t=>na[t].toasts.some(n=>n.id===e)),Cl=(e=sm)=>t=>{lm(t,e)},FI=(e,t="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(n==null?void 0:n.id)||LI()}),yo=e=>(t,n)=>{let a=FI(t,e,n);return Cl(a.toasterId||DI(a.id))({type:2,toast:a}),a.id},Ae=(e,t)=>yo("blank")(e,t);Ae.error=yo("error");Ae.success=yo("success");Ae.loading=yo("loading");Ae.custom=yo("custom");Ae.dismiss=(e,t)=>{let n={type:3,toastId:e};t?Cl(t)(n):um(n)};Ae.dismissAll=e=>Ae.dismiss(void 0,e);Ae.remove=(e,t)=>{let n={type:4,toastId:e};t?Cl(t)(n):um(n)};Ae.removeAll=e=>Ae.remove(void 0,e);Ae.promise=(e,t,n)=>{let a=Ae.loading(t.loading,{...n,...n==null?void 0:n.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let r=t.success?Ni(t.success,o):void 0;return r?Ae.success(r,{id:a,...n,...n==null?void 0:n.success}):Ae.dismiss(a),o}).catch(o=>{let r=t.error?Ni(t.error,o):void 0;r?Ae.error(r,{id:a,...n,...n==null?void 0:n.error}):Ae.dismiss(a)}),e};var jI=Wt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,WI=Wt`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,zI=Wt`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,UI=mn("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${jI} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${WI} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${zI} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,$I=Wt`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,HI=mn("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${$I} 1s linear infinite;
`,YI=Wt`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,GI=Wt`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,VI=mn("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${YI} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${GI} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,qI=mn("div")`
  position: absolute;
`,JI=mn("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,KI=Wt`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,QI=mn("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${KI} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,XI=({toast:e})=>{let{icon:t,type:n,iconTheme:a}=e;return t!==void 0?typeof t=="string"?b.createElement(QI,null,t):t:n==="blank"?null:b.createElement(JI,null,b.createElement(HI,{...a}),n!=="loading"&&b.createElement(qI,null,n==="error"?b.createElement(UI,{...a}):b.createElement(VI,{...a})))},ZI=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,eb=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,tb="0%{opacity:0;} 100%{opacity:1;}",nb="0%{opacity:1;} 100%{opacity:0;}",ab=mn("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ob=mn("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,rb=(e,t)=>{let n=e.includes("top")?1:-1,[a,o]=MI()?[tb,nb]:[ZI(n),eb(n)];return{animation:t?`${Wt(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Wt(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};b.memo(({toast:e,position:t,style:n,children:a})=>{let o=e.height?rb(e.position||t||"top-center",e.visible):{opacity:0},r=b.createElement(XI,{toast:e}),i=b.createElement(ob,{...e.ariaProps},Ni(e.message,e));return b.createElement(ab,{className:e.className,style:{...o,...n,...e.style}},typeof a=="function"?a({icon:r,message:i}):b.createElement(b.Fragment,null,r,i))});AI(b.createElement);$r`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var D=Ae;const sb=({isOpen:e,onClose:t,onSuccess:n,ebookId:a,ebookPrice:o,ebookTitle:r="Suicide Note",affiliateCode:i,campaignName:l})=>{const[u,c]=b.useState(""),[d,m]=b.useState(""),[g,S]=b.useState("NGN"),[y,k]=b.useState(!1),[E,f]=b.useState(i),[h,p]=b.useState(l),[N,C]=b.useState({NGN:{symbol:"₦",code:"NGN",amount:2500,displayAmount:"2,500",paymentMethod:"paystack",icon:"🇳🇬",description:"Pay with Naira (Local cards, Bank Transfer, USSD)"},USD:{symbol:"$",code:"USD",amount:500,displayAmount:"5.00",paymentMethod:"paystack",icon:"🌍",description:"Pay with Dollars (International cards)"}});b.useEffect(()=>{e&&(async()=>{var W,X;if(!i){const Z=(W=Ue.getAffiliateCodeFromCookie)==null?void 0:W.call(Ue);Z&&(f(Z),console.log("🎯 Found affiliate code in cookie:",Z))}if(!l){const Z=(X=Ue.getCampaignFromCookie)==null?void 0:X.call(Ue);Z&&(p(Z),console.log("📊 Found campaign in cookie:",Z))}})()},[e,i,l]),b.useEffect(()=>{e&&(async()=>{const W=await Ue.getCurrencyOptions();W.success&&C(W.data)})()},[e]);const A=$=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($);b.useEffect(()=>{var $;if(e){const W=document.cookie.split("; ").find(Z=>Z.startsWith("affiliate_ref="));console.log("🍪 Raw cookies:",document.cookie),console.log("🍪 Affiliate cookie found:",W);const X=($=Ue.getAffiliateCodeFromCookie)==null?void 0:$.call(Ue);console.log("🎯 Affiliate code from cookie service:",X),console.log("🎯 Current affiliateCode state:",E)}},[e,E]);const P=async()=>{var $,W;if(console.log("🔴 AMOUNT BEING SENT:",{selectedCurrency:g,selectedOption:N[g],amount:N[g].amount,expectedDisplay:g==="NGN"?"₦2,500":"$5.00"}),!A(u)){D.error("Please enter a valid email");return}console.log("📦 GuestCheckoutModal props:",{ebookId:a,ebookPrice:o,ebookTitle:r,affiliateCode:E,campaignName:h,currency:g}),k(!0);try{const X=N[g],Z={ebookId:String(a),email:u.trim(),name:d.trim()||u.split("@")[0],amount:X.amount,currency:g};E&&E.trim()!==""?(Z.affiliateCode=String(E).trim(),console.log("🎯 Adding affiliate code to payment:",E)):console.log("ℹ️ No affiliate code found for this payment"),Z.campaignName=(h==null?void 0:h.trim())||"direct-purchase",console.log("📤 Sending payment data with affiliate:",{...Z,hasAffiliate:!!Z.affiliateCode});const ne=await Ue.initializePayment(Z);if(console.log("✅ Payment initialization result:",ne),ne!=null&&ne.success){const ve=(($=ne.data)==null?void 0:$.authorizationUrl)||((W=ne.data)==null?void 0:W.authorization_url);if(ve){console.log(`🔗 Redirecting to Paystack (${g}) with affiliate:`,E||"none");const R={reference:ne.data.reference,ebookTitle:r,amount:g==="USD"?5:o,currency:g,affiliateCode:E,timestamp:new Date().toISOString()};localStorage.setItem("pending_purchase",JSON.stringify(R)),console.log("💾 Saved pending purchase with affiliate:",R),window.location.href=ve}else console.error("❌ No authorization URL in response:",ne),D.error("Payment initialization failed - no payment link generated")}else console.error("❌ Payment initialization failed:",ne),D.error((ne==null?void 0:ne.error)||"Payment initialization failed")}catch(X){console.error("❌ Payment failed:",X),D.error((X==null?void 0:X.message)||"Payment failed")}finally{k(!1)}};if(!e)return null;const B=N[g];return s.createElement("div",{className:J.modalOverlay},s.createElement("div",{className:J.modalContainer},s.createElement("div",{className:J.modalContent},s.createElement("div",{className:J.modalHeader},s.createElement("button",{onClick:t,className:J.closeButton,disabled:y},s.createElement(z,{name:"X"})),s.createElement("h2",{className:J.modalTitle},"Complete Your Purchase")),s.createElement("div",{className:J.priceSection},E&&s.createElement("div",{className:J.affiliateBadge},s.createElement("span",{className:J.affiliateIcon},"🎯"),s.createElement("span",{className:J.affiliateText},"Referred by affiliate")),s.createElement("div",{className:J.currencyToggle},s.createElement("button",{className:`${J.currencyButton} ${g==="NGN"?J.active:""}`,onClick:()=>S("NGN"),disabled:y},s.createElement("span",{className:J.currencyIcon},N.NGN.icon),s.createElement("span",{className:J.currencyCode},"NGN"),s.createElement("span",{className:J.currencyPrice},N.NGN.symbol,N.NGN.displayAmount),s.createElement("span",{className:J.currencyMethod},"Paystack")),s.createElement("button",{className:`${J.currencyButton} ${g==="USD"?J.active:""}`,onClick:()=>S("USD"),disabled:y},s.createElement("span",{className:J.currencyIcon},N.USD.icon),s.createElement("span",{className:J.currencyCode},"USD"),s.createElement("span",{className:J.currencyPrice},N.USD.symbol,N.USD.displayAmount),s.createElement("span",{className:J.currencyMethod},"Paystack"))),s.createElement("p",{className:J.priceDescription},B.description)),s.createElement("div",{className:J.stepContent},s.createElement("div",{className:J.formGroup},s.createElement("label",null,"Email Address *"),s.createElement("input",{type:"email",value:u,onChange:$=>c($.target.value),disabled:y,placeholder:"you@example.com",autoFocus:!0})),s.createElement("div",{className:J.formGroup},s.createElement("label",null,"Your Name (Optional)"),s.createElement("input",{type:"text",value:d,onChange:$=>m($.target.value),disabled:y,placeholder:"Enter your name"})),s.createElement("button",{onClick:P,disabled:y||!A(u),className:J.submitButton},y?s.createElement(s.Fragment,null,s.createElement("span",{className:J.spinner}),s.createElement("span",null,"Processing...")):s.createElement(s.Fragment,null,s.createElement("span",null,"Pay ",B.symbol,B.displayAmount),s.createElement("span",{className:J.arrow},"→"))),E&&s.createElement("div",{className:J.affiliateNote},s.createElement(z,{name:"Gift",className:J.affiliateNoteIcon}),s.createElement("span",null,"You were referred by an affiliate. They'll earn commission on your purchase.")),s.createElement("div",{className:J.paymentFeatures},s.createElement("div",{className:J.featureItem},s.createElement(z,{name:"Shield",className:J.featureIcon}),s.createElement("span",null,"Secure Payment")),s.createElement("div",{className:J.featureItem},s.createElement(z,{name:"Lock",className:J.featureIcon}),s.createElement("span",null,"Encrypted Transaction")),s.createElement("div",{className:J.featureItem},s.createElement(z,{name:"CheckCircle",className:J.featureIcon}),s.createElement("span",null,"Instant Access"))),s.createElement("div",{className:J.paymentNote},s.createElement(z,{name:"Info"})," Powered by Paystack - Secure payments in ",g)))))},Te=K.create({baseURL:"http://localhost:5000/api/v1",headers:{"Content-Type":"application/json"},withCredentials:!0,timeout:1e4});Te.interceptors.request.use(e=>{const t=localStorage.getItem("token");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));Te.interceptors.response.use(e=>e,e=>{var n;const{response:t}=e;if(t)switch(t.status){case 401:window.location.pathname.includes("/login")||(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.href="/login");break;case 403:D.error("You do not have permission to perform this action");break;case 404:console.log("Resource not found:",e.config.url);break;case 422:const a=t.data.errors||{};Object.values(a).forEach(o=>{D.error(o)});break;case 500:D.error("Server error. Please try again later.");break;default:D.error(((n=t.data)==null?void 0:n.message)||"An error occurred")}else e.code==="ECONNABORTED"?D.error("Request timeout. Please check your connection."):navigator.onLine?D.error("Network error. Please check your connection."):D.error("No internet connection. Please check your network.");return Promise.reject(e)});const ib={getAll:e=>Te.get("/ebooks",{params:e}),getById:e=>Te.get(`/ebooks/${e}`),getPreview:e=>Te.get(`/ebooks/${e}/preview`),getContent:(e,t)=>Te.get(`/ebooks/${e}/content`,{params:{code:t}}),getReviews:(e,t)=>Te.get(`/ebooks/${e}/reviews`,{params:t}),addReview:(e,t)=>Te.post(`/ebooks/${e}/reviews`,t),markHelpful:(e,t)=>Te.post(`/ebooks/${e}/reviews/${t}/helpful`),search:e=>Te.get("/ebooks/search",{params:{query:e}}),getFeatured:()=>Te.get("/ebooks/featured"),getCategories:()=>Te.get("/ebooks/categories"),validateAccessCode:e=>Te.post("/ebooks/validate-access-code",{code:e}),getReadingProgress:e=>Te.get(`/ebooks/${e}/progress`),saveReadingProgress:(e,t)=>Te.post(`/ebooks/${e}/progress`,t),testConnection:()=>Te.get("/ebooks/debug/test-route"),checkEbook:e=>Te.get(`/ebooks/debug/check-ebook/${e}`)},dc=`CHAPTER ONE

**The Note Begins**

I'm writing this because I need someone to understand.

Not my mother, who will cry and ask what she did wrong. Not my father,
who will wonder where he failed as a man. Not Tola, too busy with her
husband and children to notice I've been disappearing for years. Not
Deji, who has exams next week and a future that shouldn't be shadowed by
this.

Someone. Anyone. Maybe no one.

I'm using loose sheets torn from an old exercise book that I used in my
final year at LASU, pages still blank after the semester ended. I told
myself I'd use them for something eventually. Grocery lists, maybe. Or
tracking my Clash of Clans progress. But they've sat in that wardrobe
for two years, and tonight, I finally know what they're for.

It's Friday, November 15, 2024. 11:47 PM. NEPA took light around
nine---unusual, because they normally let us have power until at least
ten on weekends. I'm sitting at the small table in my self-contain,
writing by the light of my phone's flashlight propped against the wall.
The battery is at 23%. When it dies, I'll have to stop, but by then this
should be finished.

My name is Eliora Oluwafemi Adetayo. Eliora means my God is light,
Oluwafemi---God loves me, and Adetayo---the crown meets joy. My parents
named me like I was supposed to be something. Like these names would
protect me or guide me or make me into a relevant person.

I am twenty-six years old. I have a degree in Business Administration
from Lagos State University, Second Class Lower. I work as a warehouse
associate for a Chinese import company in Apapa, scanning inventory and
recording stock numbers. I make ₦65,000 a month. After transport, food,
and rent---which my parents helped pay this year because I couldn't
manage it alone---I have maybe ₦8,000 left for everything else. I live
in Ojuelegba in a room so small I can touch opposite walls if I spread
my arms wide enough.

This is my life. This has been my life for two and a half years, and I
can't see how it will ever be different.

I should start at the beginning, give context, explain the journey, make
it make sense, right? But I don't know where the beginning is. When I
graduated and couldn't find work? When I took this warehouse job
"temporarily" and got stuck? When my university friends scattered across
Lagos, Abuja, abroad, and our group chat went silent? When I realized I
could go weeks without anyone saying my name out loud?

Maybe there is no beginning. Maybe this has always been here, waiting.

The thing about Lagos is, you can be surrounded by twenty million people
and still drown in loneliness. I learned that slowly, the way you learn
anything that kills you---one day at a time, so gradually you don't
notice until you're already gone.

I wake up at 5 AM every day because my commute takes two hours. Danfo
from Ojuelegba to CMS, then another from CMS to Apapa. The conductors
shout the same routes in the same rhythm---"CMS! CMS! One chance! Enter,
we dey go!"---and I squeeze into seats meant for three people but
holding four, my body pressed against strangers who smell like sweat and
heat and the same exhaustion I feel.

No one looks at anyone. That's the rule of Lagos transport. You stare at
your phone or out the window or at nothing, because eye contact is an
invitation, and we're all too tired for invitations.

I clock in at 7 AM. Mr. Chen, my manager, barely looks up from his
clipboard. I don't think he knows my full name. He calls me "You" or
"Hey" or sometimes just points. The warehouse is concrete floors and
fluorescent lights that make these annoying buzz sounds. Metal shelves
stretch up to the ceiling, rows and rows of boxes with codes I've
memorized without meaning to: 3847B, rechargeable fans. 4729C, phone
chargers. 6012A, plastic basins.

I scan items. I record numbers in the computer. I stack boxes. I move to
the next section. The beep of the scanner becomes the only rhythm in my
day.

Ibrahim tries to talk to me sometimes. He's from Kano, been here four
years, always inviting me to lunch: "Bros, come chop na." I tell him I'm
not hungry or I brought food or maybe later. After six months, he
stopped asking. He still greets me every morning---"Bros, how
far?"---and I nod or say "I dey" and that's it. He's not unkind. I'm
just not much of a talker.

Ngozi at the front desk says "Good morning!" every day with this bright
smile like she means it. She waves. She tries. I mumble something back.
She deserves better than my mumbling, but I don't have better to give.

At 4 PM, I clock out. Two hours back to Ojuelegba. By the time I get
home, it's past six and I'm so tired I can feel it in my bones. Not
tired from physical work---the warehouse isn't hard labor, just mindless
repetition. Tired from existing. Tired from pretending I'm fine when Mr.
Chen yells about working faster. Tired from sitting in traffic watching
the sun set behind buildings I'll never afford to live in. Tired from
being invisible.

I eat---usually bread and eggs or indomie if I'm too drained to
cook---and then I open my laptop.

This is the only part of the day that feels like anything.

I play Clash of Clans. My username is SilentKing047. Town Hall Level 11,
working toward 12. My clan is called Naija Warriors, mostly Nigerians
living abroad---London, Texas, Toronto---people who left and made
something of themselves. They don't know I'm a warehouse worker living
in a self-contain in Ojuelegba. They think I'm a student, I think, or
maybe they don't think about me at all except when I attack in clan
wars.

I'm good at it. I know troop combinations, attack strategies, when to
use spells and when to save them. I can three-star bases that should be
too strong for my level. In the clan chat, people say "Nice hit, Silent"
or "Clutch attack, bro." For those few seconds, I feel like I did
something that mattered.

I upgrade my barracks. I collect resources. I watch the timer count
down---six hours until my barbarian king is done upgrading, twelve hours
until I can use my army again. I check the app obsessively, even at
work, because there's always something to do, some progress to track. I
can measure my life in these small victories: archer tower to level 13,
clan castle to level 6, war stars earned.

But when I close the app, nothing has changed. My room is still small.
My bank account is still nearly empty. I'm still twenty-six with a
business degree and a job that doesn't require one. The progress isn't
real. It's pixels on a screen. And I know this, but I keep playing
because at least it's something.

Sometimes I watch films. Korean dramas, mostly---the ones where people
are sad but beautiful, where suffering is aesthetic and meaningful. Or
Hollywood movies where the underdog wins, where the quiet guy turns out
to be secretly brilliant, where hard work pays off and people notice. I
download them using Airtel night plan. My internet is too slow for
streaming, and I can't afford more data.

I fall asleep with my laptop still playing, voices in a language I don't
always understand filling the silence so I don't have to hear how alone
I am.

At night, after the films end or I've finally closed Clash of Clans,
there's the other thing. The thing I don't want to write about but
should, because this is supposed to be honest.

I masturbate. Not because I'm thinking about anyone or because I want to
--- but because when the urge comes, I don't have the energy to resist.
It's routine now---like brushing my teeth, only sadder.

[CONTENT CONTINUES BUT BLURS COMPLETELY]`,lb=()=>{var Ve,Me;const e=pa();Rn();const[t,n]=b.useState(!1),[a,o]=b.useState(""),[r,i]=b.useState(!1),[l,u]=b.useState(!1),[c,d]=b.useState(""),[m,g]=b.useState(""),[S,y]=b.useState(""),[k,E]=b.useState(!1),[f,h]=b.useState(!1),[p,N]=b.useState(!1),[C,A]=b.useState(!1),[P,B]=b.useState(!1),[$,W]=b.useState(20),[X,Z]=b.useState([{name:"Chioma A.",rating:5,text:"This book saved my life. I was in a dark place and Eliora's story showed me I wasn't alone. The honest portrayal of depression in Nigeria is exactly what we need.",date:"2 weeks ago"},{name:"Tunde O.",rating:5,text:"As someone who has struggled with mental health, this resonated deeply. Loba Yusuf captures the Lagos experience perfectly - the isolation in crowds, the pressure to succeed.",date:"1 month ago"},{name:"Amara K.",rating:5,text:"Raw, honest, and hopeful. Every Nigerian should read this. It's time we stop treating mental health as a 'white people problem' and start having real conversations.",date:"3 weeks ago"}]),[ne,ve]=b.useState([{q:"Can I download the ebook?",a:"No, this is a web-based reading experience. You'll receive an access code after purchase that lets you read the full book online anytime. This protects the author's intellectual property while giving you unlimited access."},{q:"How does the affiliate program work?",a:"Promote the book using your unique affiliate link and earn 50% commission on every sale. You'll receive your commission via Paystack within 7 days of each sale."},{q:"Is this book appropriate for all ages?",a:"This book is recommended for readers 18+ due to mature themes including depression, suicidal ideation, and mental health struggles. Please read the content warnings before purchasing."},{q:"What payment methods do you accept?",a:"We accept all major cards, bank transfers, and USSD payments through Paystack's secure payment gateway."}]),[R,ee]=b.useState({readers:127,rating:4.9,chapters:10,price:3e3,affiliateCommission:1500,affiliateRate:.5});b.useEffect(()=>{console.log("🍪 All cookies on page load:",document.cookie);const F=document.cookie.replace(/(?:(?:^|.*;\s*)affiliate_ref\s*\=\s*([^;]*).*$)|^.*$/,"$1");console.log("🍪 affiliate_ref from cookies:",F)},[]),b.useEffect(()=>{(async()=>{const q=new URLSearchParams(window.location.search),H=q.get("reference")||q.get("trxref");if(console.log("🔍 Payment callback detected:",{reference:H,fullUrl:window.location.href}),H){window.history.replaceState({},document.title,window.location.pathname);try{D.loading("Verifying your payment...");const oe=await Ue.verifyPayment(H);if(oe.success){const pe={purchase:oe.data,accessCode:oe.data.accessCode||"SN-"+Math.random().toString(36).substring(2,10).toUpperCase(),timestamp:new Date().toISOString()};localStorage.setItem("recent_purchase",JSON.stringify(pe)),oe.data.accessCode&&localStorage.setItem("ebook_access_suicide-note-2026",oe.data.accessCode),console.log("✅ Payment verified, redirecting to thank you page"),D.dismiss(),setTimeout(()=>{window.location.href="https://suicidenote.onrender.com/thank-you"},300);return}else D.error("Payment verification failed. Please contact support.")}catch(oe){console.error("Payment verification error:",oe),D.error("Failed to verify payment. Please try again.")}finally{D.dismiss()}}localStorage.getItem("ebook_access_suicide-note-2026")&&i(!0),ae()})()},[e]);const ae=async()=>{var q;const F="suicide-note-2026";try{const H=await ib.getById(F);if(console.log("🔍 API Response:",H.data),(q=H.data)!=null&&q.success){const Y=H.data.data.ebook||H.data.data;if(console.log("📦 Ebook data:",Y),console.log("💰 Price from API:",Y.price),Y.price||Y.salesCount||Y.ratings){const oe=Y.price||Y.currentPrice,pe=oe===25?3e3:oe||R.price;ee(ze=>{var L;return{...ze,readers:Y.salesCount||Y.readerCount||ze.readers,rating:((L=Y.ratings)==null?void 0:L.average)||Y.averageRating||ze.rating,price:pe,affiliateCommission:Math.floor(pe*(Y.affiliateCommissionRate||Y.affiliateRate||.5)),affiliateRate:Y.affiliateCommissionRate||Y.affiliateRate||.5}})}}}catch{console.log("Using default data")}},x=()=>{E(!1),N(!0)},M=async F=>{try{E(!0);const H=new URLSearchParams(window.location.search).get("ref"),Y=await Ue.initializePayment("suicide-note-2026",H);Y.success||D.error(Y.error||"Failed to initialize payment")}catch(q){console.error("Payment processing error:",q),D.error("Payment processing failed. Please try again.")}finally{E(!1)}},j=async()=>{if(!a.trim()){D.error("Please enter an access code");return}console.log("🎬 handleAccessCode started with code:",a),E(!0);try{const F=await Ue.validateAccessCode(a,"suicide-note-2026");if(console.log("🔑 Validation result:",F),F.success){console.log("✅ Access granted!");const q=a.trim().toUpperCase();localStorage.setItem("ebook_access_suicide-note-2026",q),console.log("🧭 Attempting navigation methods..."),console.log("Method 1: Direct URL redirect"),window.location.href=`/read/suicide-note-2026?accessCode=${q}&validated=true`,setTimeout(()=>{console.log("Method 2: Using navigate()"),e("/read/suicide-note-2026",{state:{accessCode:q,validationData:F.data,timestamp:new Date().toISOString()},replace:!0})},100),setTimeout(()=>{console.log("Method 3: History API"),window.history.pushState({accessCode:q},"","/read/suicide-note-2026"),window.dispatchEvent(new PopStateEvent("popstate"))},200),D.success("Access granted! Redirecting...")}else console.error("❌ Access denied:",F.error),D.error(F.error||"Invalid access code"),o("")}catch(F){console.error("🔥 Validation error:",F),D.error("Failed to validate access code")}finally{E(!1)}},V=async()=>{if(!c){D.error("Please enter your email address");return}if(!c.includes("@")){D.error("Please enter a valid email address");return}h(!0);try{console.log("🔗 Generating affiliate link for:",c),console.log("📧 With name:",m);const F=await De.registerAffiliate(c,m);if(console.log("📝 Registration result:",F),!F.success){D.error(F.error||"Failed to register as affiliate"),h(!1);return}if(F.affiliate){const q=F.affiliate.link||De.generateShareLink(F.affiliate.code);y(q),A(!0),localStorage.setItem("affiliate_info",JSON.stringify({affiliateCode:F.affiliate.code,email:c,name:m,link:q,generatedAt:new Date().toISOString()})),D.success("🎉 Affiliate link generated! Check your email for dashboard access."),setTimeout(()=>{const H=document.getElementById("affiliate-link-section");H&&H.scrollIntoView({behavior:"smooth",block:"start"})},300)}else{const q=Date.now(),H=Math.random().toString(36).substr(2,8).toUpperCase(),Y=`AFF${q.toString(36).toUpperCase()}${H}`,oe=De.generateShareLink(Y);y(oe),A(!0),D.success("Affiliate link generated!")}}catch(F){console.error("❌ Affiliate generation error:",F),D.error("Failed to generate affiliate link. Please try again.")}finally{h(!1)}},U=()=>{S&&(navigator.clipboard.writeText(S),B(!0),setTimeout(()=>B(!1),2e3),D.success("Link copied to clipboard!"))},de=F=>`₦${(F*R.affiliateCommission).toLocaleString()}`,ye=()=>{if(!r){const F=dc.split(`
`);return s.createElement("div",{className:v.ebookContent},F.map((q,H)=>{let Y=0;const oe=F.length,pe=Math.floor(oe*.6);return H>pe&&(Y=(H-pe)/(oe-pe)*10),s.createElement("p",{key:H,className:v.contentLine,style:{filter:Y>0?`blur(${Y}px)`:"none",userSelect:Y>5?"none":"auto"}},q)}),s.createElement("div",{className:v.purchaseOverlay},s.createElement("button",{onClick:x,className:`btn btn-primary ${v.purchaseBtn}`,disabled:k},k?"Processing...":`Buy Full Book - ₦${R.price.toLocaleString()}`),s.createElement("p",{className:v.purchaseText},"Continue reading instantly after purchase")))}return s.createElement("div",{className:v.ebookContent},s.createElement("p",{className:v.fullAccessText},"You have full access to this book. Thank you for your purchase!"),dc.split(`
`).map((F,q)=>s.createElement("p",{key:q,className:v.contentLine},F)),s.createElement("div",{className:v.successMessage},s.createElement("p",{className:v.successText},"[Full book content continues for all chapters...]"),s.createElement("p",{className:v.successNote},"In production, the complete book would load here after payment verification")))};return l?s.createElement("div",{className:v.readerContainer},s.createElement("div",{className:v.readerHeader},s.createElement("div",{className:"container"},s.createElement("div",{className:v.readerNav},s.createElement("h1",{className:v.readerTitle},"Suicide Note"),s.createElement("button",{onClick:()=>u(!1),className:v.backButton},"← Back to Homepage")))),s.createElement("div",{className:v.readerContent},s.createElement("div",{className:"container"},ye()))):s.createElement("div",{className:v.container},s.createElement(sb,{isOpen:p,onClose:()=>N(!1),onSuccess:M,ebookId:"suicide-note-2026",ebookPrice:R.price,ebookTitle:"Suicide Note",affiliateCode:new URLSearchParams(window.location.search).get("ref")}),s.createElement("nav",{className:v.navbar},s.createElement("div",{className:"container"},s.createElement("div",{className:v.navContent},s.createElement("div",{className:v.logo},s.createElement(z,{name:"Book",className:v.logoIcon}),s.createElement("span",{className:v.logoText},"Suicide Note")),s.createElement("div",{className:v.desktopNav},s.createElement("a",{href:"#preview",className:v.navLink},"Preview"),s.createElement("a",{href:"#reviews",className:v.navLink},"Reviews"),s.createElement("a",{href:"#faq",className:v.navLink},"FAQ"),s.createElement("a",{href:"#affiliate",className:v.navLink},"Affiliate"),s.createElement("button",{onClick:x,className:"btn btn-primary",disabled:k},k?"Processing...":"Buy Now")),s.createElement("button",{className:v.mobileMenuButton,onClick:()=>n(!t),disabled:k},s.createElement(z,{name:t?"X":"Menu"})))),t&&s.createElement("div",{className:v.mobileMenu},s.createElement("div",{className:v.mobileMenuContent},s.createElement("a",{href:"#preview",className:v.mobileNavLink},"Preview"),s.createElement("a",{href:"#reviews",className:v.mobileNavLink},"Reviews"),s.createElement("a",{href:"#faq",className:v.mobileNavLink},"FAQ"),s.createElement("a",{href:"#affiliate",className:v.mobileNavLink},"Affiliate"),s.createElement("button",{onClick:x,className:"btn btn-primary w-full",disabled:k},k?"Processing...":"Buy Now")))),s.createElement("section",{className:v.hero},s.createElement("div",{className:"container"},s.createElement("div",{className:v.heroGrid},s.createElement("div",{className:v.heroContent},s.createElement("span",{className:"badge badge-red"},"#1 Nigerian Mental Health Fiction"),s.createElement("h1",{className:v.heroTitle},"A Story of Darkness, Hope, and Healing"),s.createElement("p",{className:v.heroSubtitle},"Follow Eliora's journey from the edge of despair to finding community, purpose, and reasons to live in Lagos, Nigeria."),s.createElement("div",{className:"rating mb-6"},[...Array(5)].map((F,q)=>s.createElement(z,{key:q,name:"Star",className:"star"})),s.createElement("span",{className:v.ratingText},R.rating.toFixed(1),"/5 from ",R.readers," readers")),s.createElement("div",{className:v.ctaButtons},s.createElement("button",{onClick:x,className:`btn btn-primary ${v.ctaButton}`,disabled:k},k?"Processing...":`Buy Now - ₦${R.price.toLocaleString()}`),s.createElement("button",{onClick:()=>u(!0),className:`btn btn-outline ${v.ctaButton}`},"Read Preview")),s.createElement("p",{className:v.instantAccess},"Instant access • Read online • No downloads needed")),s.createElement("div",{className:v.heroCard},s.createElement("div",{className:v.bookCoverContainer},s.createElement("img",{src:"/images/suicide-note-cover.jpeg",alt:"Suicide Note Book Cover",className:v.bookCover,onError:F=>{F.target.onerror=null,F.target.src="https://via.placeholder.com/400x600?text=Suicide+Note+Cover"}}),s.createElement("div",{className:v.bookCoverBadge},s.createElement("span",{className:v.bestsellerBadge},"#1 Bestseller"))))))),s.createElement("section",{id:"preview",className:v.previewSection},s.createElement("div",{className:"container"},s.createElement("div",{className:"text-center mb-12"},s.createElement("h2",{className:v.sectionTitle},"Preview the First Chapter"),s.createElement("p",{className:v.sectionSubtitle},"Read before you buy - see if this book resonates with you")),s.createElement("div",{className:v.previewCard},s.createElement("div",{className:v.previewHeader},s.createElement("h3",{className:v.previewTitle},"Chapter One: The Note Begins"),s.createElement("button",{onClick:()=>u(!0),className:v.openReaderButton},s.createElement(z,{name:"Eye",className:v.eyeIcon}),s.createElement("span",null,"Open Reader"))),s.createElement("div",{className:v.previewContent},s.createElement("p",{className:v.previewText},`"I'm writing this because I need someone to understand. Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man..."`),s.createElement("p",{className:v.previewNote},"Preview continues in the reader. Purchase to read all ",R.chapters," chapters.")),s.createElement("div",{className:v.accessForm},s.createElement("div",{className:v.accessInputGroup},s.createElement("input",{type:"text",placeholder:"Enter access code from purchase",value:a,onChange:F=>o(F.target.value),className:"form-input",disabled:k}),s.createElement("button",{onClick:j,className:"btn btn-secondary",disabled:k},k?"Validating...":"Access Full Book")),s.createElement("p",{className:v.accessNote},"Already purchased? Enter your access code to read the full book"))))),s.createElement("section",{className:v.statsSection},s.createElement("div",{className:"container"},s.createElement("div",{className:v.statsGrid},s.createElement("div",{className:v.statItem},s.createElement("div",{className:v.statNumber},R.readers,"+"),s.createElement("div",{className:v.statLabel},"Happy Readers")),s.createElement("div",{className:v.statItem},s.createElement("div",{className:v.statNumber},R.rating.toFixed(1),"/5"),s.createElement("div",{className:v.statLabel},"Average Rating")),s.createElement("div",{className:v.statItem},s.createElement("div",{className:v.statNumber},R.chapters),s.createElement("div",{className:v.statLabel},"Powerful Chapters")),s.createElement("div",{className:v.statItem},s.createElement("div",{className:v.statNumber},"₦",R.price.toLocaleString()),s.createElement("div",{className:v.statLabel},"One-Time Payment"))))),s.createElement("section",{id:"reviews",className:v.reviewsSection},s.createElement("div",{className:"container"},s.createElement("div",{className:"text-center mb-12"},s.createElement("h2",{className:v.sectionTitle},"What Readers Are Saying"),s.createElement("p",{className:v.sectionSubtitle},"Real reviews from real readers")),s.createElement("div",{className:v.reviewsGrid},X.map((F,q)=>s.createElement("div",{key:q,className:"card"},s.createElement("div",{className:v.reviewHeader},s.createElement("div",{className:"rating"},[...Array(F.rating||5)].map((H,Y)=>s.createElement(z,{key:Y,name:"Star",className:"star"}))),s.createElement("span",{className:v.reviewDate},F.date||"Recently")),s.createElement("p",{className:v.reviewText},F.text),s.createElement("p",{className:v.reviewer},"- ",F.name||"Anonymous Reader")))),s.createElement("div",{className:"text-center mt-12"},s.createElement("div",{className:v.ratingBadge},s.createElement("div",{className:"rating"},[...Array(5)].map((F,q)=>s.createElement(z,{key:q,name:"Star",className:"star",style:{width:"1.5rem",height:"1.5rem"}}))),s.createElement("span",{className:v.ratingScore},R.rating.toFixed(1)," out of 5 stars"))))),s.createElement("section",{id:"affiliate",className:v.affiliateSection},s.createElement("div",{className:"container"},s.createElement("div",{className:"text-center"},s.createElement("span",{className:"badge badge-green"},"💰 Earn ₦",R.affiliateCommission.toLocaleString()," Per Sale"),s.createElement("h2",{className:`${v.sectionTitle} mt-4`},"Become an Affiliate Partner"),s.createElement("p",{className:v.affiliateSubtitle},"Earn ",s.createElement("strong",{className:v.highlightGreen},Math.round(R.affiliateRate*100),"% commission")," on every sale. Share a book that matters and get paid for it."),s.createElement("div",{className:v.affiliateStats},s.createElement("p",null,"Sell 2 books = ",s.createElement("strong",{className:v.highlightGreen},"₦",(R.affiliateCommission*2).toLocaleString())),s.createElement("p",null,"Sell 20 books = ",s.createElement("strong",{className:v.highlightGreen},"₦",(R.affiliateCommission*20).toLocaleString())),s.createElement("p",null,"Sell 50 books = ",s.createElement("strong",{className:v.highlightGreen},"₦",(R.affiliateCommission*50).toLocaleString()))),s.createElement("div",{className:v.affiliateCard},s.createElement("div",{className:v.successStory},s.createElement("div",{className:v.storyContent},s.createElement("div",{className:v.storyAvatar},((Me=(Ve=X.find(F=>{var q;return(q=F.name)==null?void 0:q.includes("Tunde")}))==null?void 0:Ve.name)==null?void 0:Me.charAt(0))||"T"),s.createElement("div",null,s.createElement("p",{className:v.storyText},`"I've earned `,s.createElement("strong",{className:v.highlightGreen},"₦",(R.affiliateCommission*37.6).toLocaleString()," in 2 months"),' just by sharing this book on my Twitter. It helped me with my own mental health journey, and now I help others find it while earning."'),s.createElement("p",{className:v.storyAuthor},"- Tunde O., Affiliate Partner")))),s.createElement("div",{className:v.affiliateSteps},s.createElement("div",{className:v.step},s.createElement("div",{className:v.stepIcon},s.createElement(z,{name:"Users"})),s.createElement("h3",{className:v.stepTitle},"1. Sign Up Free"),s.createElement("p",{className:v.stepDescription},"Get your unique affiliate link instantly - no approval needed")),s.createElement("div",{className:v.step},s.createElement("div",{className:v.stepIcon},s.createElement(z,{name:"MessageCircle"})),s.createElement("h3",{className:v.stepTitle},"2. Share Everywhere"),s.createElement("p",{className:v.stepDescription},"Twitter, WhatsApp, Facebook, Instagram, your blog")),s.createElement("div",{className:v.step},s.createElement("div",{className:v.stepIcon},s.createElement(z,{name:"Award"})),s.createElement("h3",{className:v.stepTitle},"3. Earn ₦",R.affiliateCommission.toLocaleString()," Each"),s.createElement("p",{className:v.stepDescription},"Get ",Math.round(R.affiliateRate*100),"% commission paid via Paystack within 7 days"))),s.createElement("div",{className:"pro-tip"},s.createElement("h3",{className:v.explanationTitle},"Why We Offer ",Math.round(R.affiliateRate*100),"% Commission"),s.createElement("p",{className:v.explanationText},"Most Nigerian ebooks offer 20-30%. We offer ",s.createElement("strong",null,Math.round(R.affiliateRate*100),"%")," because this book changes lives, and we want you to be genuinely motivated to share it. When you succeed, we succeed. It's that simple.")),s.createElement("div",{className:v.affiliateForm,id:"affiliate-link-section"},s.createElement("h3",{className:v.formTitle},"Get Your Affiliate Link Now"),C?s.createElement("div",{className:v.linkBox},s.createElement("p",{className:v.linkLabel},"🎉 Your affiliate link is ready!"),s.createElement("code",{className:v.linkCode},S),s.createElement("div",{className:v.linkActions},s.createElement("button",{onClick:U,className:v.copyButtonLarge},s.createElement(z,{name:"Copy"})," ",P?"Copied!":"Copy Link")),s.createElement("div",{className:v.socialShare},s.createElement("p",{className:v.shareLabel},"Share on:"),s.createElement("div",{className:v.socialButtons},s.createElement("a",{href:`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just earned from sharing this powerful book about mental health in Nigeria. Join me as an affiliate and earn 50% commission!")}&url=${encodeURIComponent(S)}`,target:"_blank",rel:"noopener noreferrer",className:v.twitterShare},s.createElement(z,{name:"Twitter"})," Twitter"),s.createElement("a",{href:`https://wa.me/?text=${encodeURIComponent(`Check out this powerful book about mental health in Nigeria. I'm earning as an affiliate and you can too! ${S}`)}`,target:"_blank",rel:"noopener noreferrer",className:v.whatsappShare},s.createElement(z,{name:"MessageCircle"})," WhatsApp"),s.createElement("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(S)}`,target:"_blank",rel:"noopener noreferrer",className:v.facebookShare},s.createElement(z,{name:"Facebook"})," Facebook"))),s.createElement("div",{className:v.calculator},s.createElement("h4",{className:v.calculatorTitle},"💰 Estimate Your Earnings"),s.createElement("div",{className:v.sliderContainer},s.createElement("label",{className:v.sliderLabel},"How many sales per month?"),s.createElement("input",{type:"range",min:"5",max:"100",step:"5",value:$,onChange:F=>W(Number(F.target.value)),className:v.slider}),s.createElement("div",{className:v.sliderLabels},s.createElement("span",null,"5 sales"),s.createElement("span",null,"100 sales"))),s.createElement("div",{className:v.earningsDisplay},s.createElement("div",{className:v.earningsAmount},de($)),s.createElement("p",{className:v.earningsText},"per month with ",$," sales"))),s.createElement("p",{className:v.linkNote},"Share this link and earn ₦",R.affiliateCommission.toLocaleString()," per sale! We'll email you tracking updates and payout information."),s.createElement("p",{className:v.emailConfirmation},s.createElement("small",null,"We've sent a confirmation to ",s.createElement("strong",null,c)))):s.createElement(s.Fragment,null,s.createElement("div",{className:v.formGroup},s.createElement("input",{type:"text",placeholder:"Your name (optional)",value:m,onChange:F=>g(F.target.value),className:"form-input",disabled:f})),s.createElement("div",{className:v.formGroup},s.createElement("input",{type:"email",placeholder:"Enter your email *",value:c,onChange:F=>d(F.target.value),className:"form-input",disabled:f,required:!0})),s.createElement("button",{onClick:V,className:"btn btn-green",disabled:f||!c||!c.includes("@")},f?s.createElement(s.Fragment,null,s.createElement("span",{className:"spinner-sm mr-2"}),"Processing..."):"Get My Affiliate Link →"),s.createElement("p",{className:v.formNote},"No approval process. Start earning immediately."))))))),s.createElement("section",{id:"faq",className:v.faqSection},s.createElement("div",{className:"container"},s.createElement("div",{className:"text-center mb-12"},s.createElement("h2",{className:v.sectionTitle},"Frequently Asked Questions"),s.createElement("p",{className:v.sectionSubtitle},"Everything you need to know")),s.createElement("div",{className:v.faqGrid},ne.map((F,q)=>s.createElement("div",{key:q,className:"card"},s.createElement("h3",{className:v.faqQuestion},F.q),s.createElement("p",{className:v.faqAnswer},F.a)))))),s.createElement("section",{className:v.finalCTA},s.createElement("div",{className:"container text-center"},s.createElement("h2",{className:v.ctaTitle},"Ready to Read Eliora's Story?"),s.createElement("p",{className:v.ctaSubtitle},"Join ",R.readers,"+ readers who found hope, understanding, and connection in this powerful story"),s.createElement("button",{onClick:x,className:`btn ${v.ctaButton}`,disabled:k},k?"Processing...":`Buy Now - ₦${R.price.toLocaleString()}`),s.createElement("p",{className:v.ctaFeatures},"✓ Instant access ✓ Read online anytime ✓ Secure payment via Paystack"))),s.createElement("footer",{className:v.footer},s.createElement("div",{className:"container"},s.createElement("div",{className:v.footerGrid},s.createElement("div",{className:v.footerSection},s.createElement("h3",{className:v.footerTitle},"About the Book"),s.createElement("p",{className:v.footerText},"A powerful Nigerian fiction exploring mental health, depression, and the journey to healing through community and connection.")),s.createElement("div",{className:v.footerSection},s.createElement("h3",{className:v.footerTitle},"Crisis Resources"),s.createElement("p",{className:v.footerText},"Nigeria Emergency: 112"),s.createElement("p",{className:v.footerText},"Lagos Emergency: 767")),s.createElement("div",{className:v.footerSection},s.createElement("h3",{className:v.footerTitle},"Connect"),s.createElement("p",{className:v.footerText},"Email: support@suicidenote.com"),s.createElement("p",{className:v.footerText},"Follow @loba_yusuf on X"))),s.createElement("div",{className:v.footerBottom},s.createElement("p",{className:v.copyright},"© 2026 Loba Yusuf. All rights reserved. | This is a work of fiction."),s.createElement("p",{className:v.crisisNote},"If you're experiencing suicidal thoughts, please seek help immediately. You are not alone.")))))},ub="_container_7lc5b_1",cb="_header_7lc5b_13",db="_headerContent_7lc5b_23",hb="_logoIcon_7lc5b_37",mb="_logoText_7lc5b_49",fb="_mainContent_7lc5b_63",pb="_successCard_7lc5b_73",gb="_successHeader_7lc5b_83",yb="_successCheck_7lc5b_97",wb="_checkIcon_7lc5b_119",vb="_successTitle_7lc5b_131",kb="_successSubtitle_7lc5b_143",Ib="_accessSection_7lc5b_155",bb="_accessCard_7lc5b_163",Eb="_accessTitle_7lc5b_179",Sb="_codeDisplay_7lc5b_195",_b="_codeText_7lc5b_215",Nb="_copyButton_7lc5b_231",Cb="_copyIcon_7lc5b_265",Tb="_startReadingButton_7lc5b_275",xb="_bookIcon_7lc5b_289",Ab="_arrowIcon_7lc5b_289",Pb="_codeNote_7lc5b_299",Lb="_warningText_7lc5b_311",Mb="_affiliateCard_7lc5b_323",Bb="_affiliateContent_7lc5b_339",Rb="_affiliateTitle_7lc5b_347",Ob="_affiliateSubtitle_7lc5b_361",Db="_valueProposition_7lc5b_373",Fb="_valueContent_7lc5b_387",jb="_valueTitle_7lc5b_397",Wb="_valueList_7lc5b_411",zb="_valueItem_7lc5b_419",Ub="_checkCircle_7lc5b_433",$b="_smallCheckIcon_7lc5b_457",Hb="_highlightGreen_7lc5b_469",Yb="_earningsCard_7lc5b_477",Gb="_earningsTitle_7lc5b_489",Vb="_earningsList_7lc5b_503",qb="_earningItem_7lc5b_513",Jb="_earningHeader_7lc5b_525",Kb="_earningLabel_7lc5b_539",Qb="_earningAmount_7lc5b_547",Xb="_earningNote_7lc5b_559",Zb="_premiumEarning_7lc5b_569",e1="_premiumLabel_7lc5b_583",t1="_premiumAmount_7lc5b_591",n1="_premiumNote_7lc5b_601",a1="_socialProof_7lc5b_613",o1="_socialContent_7lc5b_631",r1="_socialAvatar_7lc5b_643",s1="_socialText_7lc5b_671",i1="_highlightYellow_7lc5b_685",l1="_socialAuthor_7lc5b_695",u1="_socialStats_7lc5b_705",c1="_calculatorTitle_7lc5b_725",d1="_calculatorContent_7lc5b_741",h1="_sliderLabel_7lc5b_751",m1="_sliderContainer_7lc5b_765",f1="_slider_7lc5b_751",p1="_sliderLabels_7lc5b_811",g1="_earningsDisplay_7lc5b_827",y1="_earningsAmount_7lc5b_843",w1="_earningsText_7lc5b_855",v1="_yearlyEarnings_7lc5b_863",k1="_formTitle_7lc5b_877",I1="_signupForm_7lc5b_893",b1="_emailInput_7lc5b_903",E1="_generateButton_7lc5b_915",S1="_dollarIcon_7lc5b_931",_1="_formNote_7lc5b_941",N1="_statsGrid_7lc5b_955",C1="_statCard_7lc5b_969",T1="_statIcon_7lc5b_983",x1="_statText_7lc5b_997",A1="_generatedLinkSection_7lc5b_1011",P1="_successMessage_7lc5b_1021",L1="_bigCheckIcon_7lc5b_1037",M1="_successHeading_7lc5b_1049",B1="_linkContainer_7lc5b_1061",R1="_linkLabel_7lc5b_1073",O1="_linkDisplay_7lc5b_1089",D1="_linkCode_7lc5b_1101",F1="_copyLinkButton_7lc5b_1125",j1="_sharingGuide_7lc5b_1163",W1="_guideTitle_7lc5b_1175",z1="_socialGrid_7lc5b_1187",U1="_socialItem_7lc5b_1199",$1="_twitterIcon_7lc5b_1213",H1="_whatsappIcon_7lc5b_1225",Y1="_facebookIcon_7lc5b_1237",G1="_emailIcon_7lc5b_1249",V1="_socialName_7lc5b_1261",q1="_socialDescription_7lc5b_1273",J1="_tipText_7lc5b_1283",K1="_emailConfirmation_7lc5b_1295",Q1="_confirmationText_7lc5b_1309",X1="_userEmail_7lc5b_1319",Z1="_confirmationNote_7lc5b_1331",eE="_whyTitle_7lc5b_1343",tE="_whyGrid_7lc5b_1359",nE="_whyCard_7lc5b_1373",aE="_whyIcon_7lc5b_1383",oE="_purpleIcon_7lc5b_1405",rE="_blueIcon_7lc5b_1417",sE="_greenIcon_7lc5b_1429",iE="_whyCardTitle_7lc5b_1441",lE="_whyCardText_7lc5b_1453",uE="_finalCTA_7lc5b_1465",cE="_finalTitle_7lc5b_1479",dE="_finalSubtitle_7lc5b_1493",hE="_readingButton_7lc5b_1503",mE="_footer_7lc5b_1519",fE="_footerContent_7lc5b_1533",pE="_footerText_7lc5b_1541",gE="_copyright_7lc5b_1551",yE="_loadingContainer_7lc5b_1669",wE="_spinner_7lc5b_1687",vE="_internationalCard_7lc5b_1717",kE="_internationalContent_7lc5b_1733",IE="_internationalTitle_7lc5b_1741",bE="_internationalSubtitle_7lc5b_1755",EE="_internationalMessage_7lc5b_1765",SE="_globeIcon_7lc5b_1789",_E="_internationalMessageTitle_7lc5b_1803",NE="_internationalMessageText_7lc5b_1817",CE="_internationalFeatures_7lc5b_1829",TE="_feature_7lc5b_1843",xE="_featureCheckIcon_7lc5b_1863",AE="_purchaseInfo_7lc5b_1879",PE="_purchaseId_7lc5b_1905",LE="_purchaseAmount_7lc5b_1907",ME="_paymentMethod_7lc5b_1909",w={container:ub,header:cb,headerContent:db,logoIcon:hb,logoText:mb,mainContent:fb,successCard:pb,successHeader:gb,successCheck:yb,checkIcon:wb,successTitle:vb,successSubtitle:kb,accessSection:Ib,accessCard:bb,accessTitle:Eb,codeDisplay:Sb,codeText:_b,copyButton:Nb,copyIcon:Cb,startReadingButton:Tb,bookIcon:xb,arrowIcon:Ab,codeNote:Pb,warningText:Lb,affiliateCard:Mb,affiliateContent:Bb,affiliateTitle:Rb,affiliateSubtitle:Ob,valueProposition:Db,valueContent:Fb,valueTitle:jb,valueList:Wb,valueItem:zb,checkCircle:Ub,smallCheckIcon:$b,highlightGreen:Hb,earningsCard:Yb,earningsTitle:Gb,earningsList:Vb,earningItem:qb,earningHeader:Jb,earningLabel:Kb,earningAmount:Qb,earningNote:Xb,premiumEarning:Zb,premiumLabel:e1,premiumAmount:t1,premiumNote:n1,socialProof:a1,socialContent:o1,socialAvatar:r1,socialText:s1,highlightYellow:i1,socialAuthor:l1,socialStats:u1,calculatorTitle:c1,calculatorContent:d1,sliderLabel:h1,sliderContainer:m1,slider:f1,sliderLabels:p1,earningsDisplay:g1,earningsAmount:y1,earningsText:w1,yearlyEarnings:v1,formTitle:k1,signupForm:I1,emailInput:b1,generateButton:E1,dollarIcon:S1,formNote:_1,statsGrid:N1,statCard:C1,statIcon:T1,statText:x1,generatedLinkSection:A1,successMessage:P1,bigCheckIcon:L1,successHeading:M1,linkContainer:B1,linkLabel:R1,linkDisplay:O1,linkCode:D1,copyLinkButton:F1,sharingGuide:j1,guideTitle:W1,socialGrid:z1,socialItem:U1,twitterIcon:$1,whatsappIcon:H1,facebookIcon:Y1,emailIcon:G1,socialName:V1,socialDescription:q1,tipText:J1,emailConfirmation:K1,confirmationText:Q1,userEmail:X1,confirmationNote:Z1,whyTitle:eE,whyGrid:tE,whyCard:nE,whyIcon:aE,purpleIcon:oE,blueIcon:rE,greenIcon:sE,whyCardTitle:iE,whyCardText:lE,finalCTA:uE,finalTitle:cE,finalSubtitle:dE,readingButton:hE,footer:mE,footerContent:fE,footerText:pE,copyright:gE,loadingContainer:yE,spinner:wE,internationalCard:vE,internationalContent:kE,internationalTitle:IE,internationalSubtitle:bE,internationalMessage:EE,globeIcon:SE,internationalMessageTitle:_E,internationalMessageText:NE,internationalFeatures:CE,feature:TE,featureCheckIcon:xE,purchaseInfo:AE,purchaseId:PE,purchaseAmount:LE,paymentMethod:ME},BE=({onBackToHome:e})=>{var q;const[t,n]=b.useState(""),[a,o]=b.useState(""),[r,i]=b.useState(!1),[l,u]=b.useState(""),[c,d]=b.useState(!1),[m,g]=b.useState(!1),[S,y]=b.useState(!1),[k,E]=b.useState(20),[f,h]=b.useState(null),[p,N]=b.useState(""),[C,A]=b.useState(!0),[P,B]=b.useState(null),[$,W]=b.useState("NGN"),[X,Z]=b.useState("paystack"),[ne,ve]=b.useState(""),[R,ee]=b.useState(.5),[ae,x]=b.useState(1250),M=Rn(),j=pa();b.useEffect(()=>{(async()=>{var Y,oe,pe;try{A(!0),console.log("🔍 ThankYouPage mounted, checking URL...");const ze=new URLSearchParams(M.search),L=ze.get("reference"),it=ze.get("trxref"),lt=ze.get("session_id"),xt=L||it||lt;if(console.log("📋 URL parameters:",{reference:L,trxref:it,sessionId:lt,paymentRef:xt,fullUrl:window.location.href}),xt){console.log("✅ Found payment reference:",xt);const Se=await Ue.verifyPayment(xt);if(console.log("🔍 Verification result:",Se),Se.success){console.log("🎉 Payment verified successfully");const ie=((Y=Se.data)==null?void 0:Y.purchase)||Se.data,Be=(oe=Se.data)==null?void 0:oe.accessCode,Hr=(pe=Se.data)==null?void 0:pe.verifiedData,Yr=(ie==null?void 0:ie.currency)||"NGN",Gr=(ie==null?void 0:ie.paymentMethod)||"paystack";console.log("🔑 Access code received:",Be),console.log("💰 Currency:",Yr),console.log("💳 Payment method:",Gr),h(ie),N(Be),W(Yr),Z(Gr);const cm=(ie==null?void 0:ie.amount)||2500,dm=Math.floor(cm*.5);x(dm),localStorage.setItem("recent_purchase",JSON.stringify({purchase:ie,accessCode:Be,reference:xt,verifiedData:Hr,currency:Yr,paymentMethod:Gr,timestamp:new Date().toISOString()})),Be&&localStorage.setItem("ebook_access_suicide-note-2026",Be),localStorage.removeItem("pending_purchase"),D.success("🎉 Payment successful! Your access code is ready.")}else{console.error("❌ Payment verification failed:",Se.error);const ie=localStorage.getItem("pending_purchase");if(ie)try{const Be=JSON.parse(ie);console.log("📂 Using cached purchase info:",Be);const Hr=`SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`;N(Hr),h(Be),W(Be.currency||"NGN"),Z(Be.paymentMethod||"paystack"),D.warning("Payment verification pending. Using cached purchase info.")}catch(Be){console.error("Error parsing pending purchase:",Be),D.error("Invalid purchase data"),j("/")}else D.error("Payment verification failed. Please contact support."),j("/")}}else{console.log("⚠️ No payment reference found in URL"),console.log("🔍 Checking localStorage for saved purchase...");const Se=localStorage.getItem("recent_purchase");if(Se)try{const ie=JSON.parse(Se);console.log("📂 Found saved purchase:",ie),h(ie.purchase),N(ie.accessCode),W(ie.currency||"NGN"),Z(ie.paymentMethod||"paystack"),D.success("Welcome back! Your access code is ready.")}catch(ie){console.error("Error parsing saved purchase:",ie),D.error("No valid purchase found"),j("/")}else console.log("❌ No saved purchase found in localStorage"),D.error("No purchase found. Please make a purchase first."),j("/")}}catch(ze){console.error("🔥 Payment verification error:",ze),D.error("Error verifying payment. Please contact support."),j("/")}finally{A(!1)}})()},[M,j]),b.useEffect(()=>{(()=>{try{const Y=localStorage.getItem("user");if(Y){const pe=JSON.parse(Y);B(pe),pe.email&&n(pe.email),pe.name&&o(pe.name)}const oe=localStorage.getItem("guest_email");oe&&!t&&n(oe)}catch(Y){console.error("Error initializing user:",Y)}})()},[]);const V=(H,Y)=>{if(!H){D.error("Nothing to copy");return}navigator.clipboard.writeText(H).then(()=>{Y==="code"?(g(!0),setTimeout(()=>g(!1),2e3)):(y(!0),setTimeout(()=>y(!1),2e3)),D.success("Copied to clipboard!")}).catch(oe=>{console.error("Failed to copy:",oe),D.error("Failed to copy to clipboard")})},U=async()=>{if(!t){D.error("Please enter your email address");return}if(!t.includes("@")){D.error("Please enter a valid email address");return}d(!0);try{console.log("🔗 Generating affiliate link for:",t),console.log("📧 With name:",a);const H=await De.registerAffiliate(t,a);if(console.log("📝 Registration result:",H),!H.success){D.error(H.error||"Failed to register as affiliate"),d(!1);return}if(H.affiliate){const Y=H.affiliate.link;u(Y),ve(H.affiliate.code),i(!0),localStorage.setItem("affiliate_info",JSON.stringify({affiliateCode:H.affiliate.code,email:t,name:a,link:Y,generatedAt:new Date().toISOString()})),D.success("🎉 Affiliate link generated! Check your email for dashboard access."),setTimeout(()=>{const oe=document.getElementById("affiliate-link-section");oe&&oe.scrollIntoView({behavior:"smooth",block:"start"})},300)}else{const Y=Date.now(),oe=Math.random().toString(36).substr(2,8).toUpperCase(),pe=`AFF${Y.toString(36).toUpperCase()}${oe}`,ze=De.generateShareLink(pe);u(ze),i(!0),D.success("Affiliate link generated!")}}catch(H){console.error("Affiliate generation error:",H),D.error("Failed to generate affiliate link. Please try again.")}finally{d(!1)}},de=H=>(H*ae).toLocaleString("en-NG",{style:"currency",currency:"NGN",minimumFractionDigits:0,maximumFractionDigits:0}).replace("NGN","₦"),ye=()=>f?$==="USD"?`$${f.amount?(f.amount/100).toFixed(2):"5.00"}`:`₦${(f.amount||2500).toLocaleString()}`:"",Ve=()=>X==="stripe"?"Stripe (Credit/Debit Card)":"Paystack";b.useEffect(()=>{console.log("🍪 All cookies:",document.cookie),console.log("🍪 affiliate_ref:",document.cookie.replace(/(?:(?:^|.*;\s*)affiliate_ref\s*\=\s*([^;]*).*$)|^.*$/,"$1"))},[]);const Me=()=>{var H;if(!p){D.error("Access code not available");return}try{localStorage.setItem("ebook_access_suicide-note-2026",p),localStorage.setItem("last_ebook_accessed","suicide-note-2026"),localStorage.setItem("last_access_time",new Date().toISOString()),console.log("📚 Starting reading with access code:",p),j("/read/suicide-note-2026",{state:{accessCode:p,purchaseId:f==null?void 0:f._id,ebookTitle:((H=f==null?void 0:f.ebook)==null?void 0:H.title)||"Suicide Note",currency:$}})}catch(Y){console.error("Error starting reading:",Y),D.error("Error accessing book. Please try again.")}},F=()=>{e?e():j("/")};return C?s.createElement("div",{className:w.loadingContainer},s.createElement("div",{className:w.spinner}),s.createElement("p",null,"Verifying your payment...")):s.createElement("div",{className:w.container},s.createElement("div",{className:w.header},s.createElement("div",{className:"container"},s.createElement("div",{className:w.headerContent},s.createElement("div",{className:w.logo},s.createElement(z,{name:"Book",className:w.logoIcon}),s.createElement("span",{className:w.logoText},"Suicide Note")),s.createElement("button",{onClick:F,className:w.backButton,disabled:C},"← Back to Home")))),s.createElement("div",{className:"container"},s.createElement("div",{className:w.mainContent},s.createElement("div",{className:`card ${w.successCard}`},s.createElement("div",{className:w.successHeader},s.createElement("div",{className:w.successCheck},s.createElement(z,{name:"Check",className:w.checkIcon})),s.createElement("h1",{className:w.successTitle},"🎉 Payment Successful!"),s.createElement("p",{className:w.successSubtitle},"Thank you for purchasing Suicide Note. Your access code is ready."),f&&s.createElement("div",{className:w.purchaseInfo},s.createElement("p",null,"Purchase ID: ",s.createElement("span",{className:w.purchaseId},(q=f._id)==null?void 0:q.substring(0,8),"...")),s.createElement("p",null,"Amount: ",s.createElement("span",{className:w.purchaseAmount},ye())),s.createElement("p",null,"Payment Method: ",s.createElement("span",{className:w.paymentMethod},Ve())))),s.createElement("div",{className:w.accessSection},s.createElement("div",{className:w.accessCard},s.createElement("h2",{className:w.accessTitle},"Your Access Code"),s.createElement("div",{className:w.codeDisplay},s.createElement("code",{className:w.codeText},p),s.createElement("button",{onClick:()=>V(p,"code"),className:w.copyButton,disabled:!p||m},s.createElement(z,{name:"Copy",className:w.copyIcon}),s.createElement("span",null,m?"Copied!":"Copy"))),s.createElement("div",{className:"text-center"},s.createElement("button",{onClick:Me,className:`btn btn-blue ${w.startReadingButton}`,disabled:!p||C},s.createElement(z,{name:"Book",className:w.bookIcon}),s.createElement("span",null,C?"Loading...":"Start Reading Now"),s.createElement(z,{name:"ArrowRight",className:w.arrowIcon})),s.createElement("p",{className:w.codeNote},"Click above to access your book or enter your code on the main page"))),s.createElement("div",{className:"warning-box"},s.createElement("p",{className:w.warningText},s.createElement("strong",null,"📧 Important:")," We've also sent this access code to your email. Save it somewhere safe - you'll need it to read the book anytime.")))),$==="NGN"&&s.createElement("div",{className:w.affiliateCard},s.createElement("div",{className:w.affiliateContent},s.createElement("div",{className:"text-center mb-8"},s.createElement("span",{className:"badge badge-yellow animate-pulse mb-4"},"⚡ WAIT! ONE MORE THING..."),s.createElement("h2",{className:w.affiliateTitle},"Want to Earn Your Money Back?"),s.createElement("p",{className:w.affiliateSubtitle},"You just invested ₦",(f==null?void 0:f.amount)||2500,". What if you could earn that back (and more) just by sharing this book?")),s.createElement("div",{className:w.valueProposition},s.createElement("div",{className:w.valueContent},s.createElement("div",null,s.createElement("h3",{className:w.valueTitle},"Here's the Deal:"),s.createElement("ul",{className:w.valueList},s.createElement("li",{className:w.valueItem},s.createElement("div",{className:w.checkCircle},s.createElement(z,{name:"Check",className:w.smallCheckIcon})),s.createElement("span",null,"Get your unique affiliate link instantly")),s.createElement("li",{className:w.valueItem},s.createElement("div",{className:w.checkCircle},s.createElement(z,{name:"Check",className:w.smallCheckIcon})),s.createElement("span",null,"Share on Twitter, WhatsApp, Facebook, Instagram")),s.createElement("li",{className:w.valueItem},s.createElement("div",{className:w.checkCircle},s.createElement(z,{name:"Check",className:w.smallCheckIcon})),s.createElement("span",null,"Earn ",s.createElement("strong",{className:w.highlightGreen},"₦",ae," (50%)")," per sale")),s.createElement("li",{className:w.valueItem},s.createElement("div",{className:w.checkCircle},s.createElement(z,{name:"Check",className:w.smallCheckIcon})),s.createElement("span",null,"Get paid automatically via Paystack in 7 days")),s.createElement("li",{className:w.valueItem},s.createElement("div",{className:w.checkCircle},s.createElement(z,{name:"Check",className:w.smallCheckIcon})),s.createElement("span",null,"No approval needed - start immediately")))),s.createElement("div",{className:w.earningsCard},s.createElement("h3",{className:w.earningsTitle},"💰 Your Earning Potential"),s.createElement("div",{className:w.earningsList},s.createElement("div",{className:w.earningItem},s.createElement("div",{className:w.earningHeader},s.createElement("span",{className:w.earningLabel},"Just 2 sales:"),s.createElement("span",{className:w.earningAmount},"₦",(ae*2).toLocaleString())),s.createElement("p",{className:w.earningNote},"Your money back!")),s.createElement("div",{className:w.earningItem},s.createElement("div",{className:w.earningHeader},s.createElement("span",{className:w.earningLabel},"20 sales:"),s.createElement("span",{className:w.earningAmount},"₦",(ae*20).toLocaleString())),s.createElement("p",{className:w.earningNote},"One good Twitter thread")),s.createElement("div",{className:w.earningItem},s.createElement("div",{className:w.earningHeader},s.createElement("span",{className:w.earningLabel},"50 sales:"),s.createElement("span",{className:w.earningAmount},"₦",(ae*50).toLocaleString())),s.createElement("p",{className:w.earningNote},"Consistent sharing")),s.createElement("div",{className:w.premiumEarning},s.createElement("div",{className:w.earningHeader},s.createElement("span",{className:w.premiumLabel},"100 sales:"),s.createElement("span",{className:w.premiumAmount},"₦",(ae*100).toLocaleString())),s.createElement("p",{className:w.premiumNote},"Our top affiliate last month!")))))),s.createElement("div",{className:w.socialProof},s.createElement("div",{className:w.socialContent},s.createElement("div",{className:w.socialAvatar},"T"),s.createElement("div",null,s.createElement("p",{className:w.socialText},`"I've earned `,s.createElement("span",{className:w.highlightYellow},"₦",(ae*37.6).toLocaleString()," in just 2 months"),' by sharing this book on Twitter. I posted one thread about my mental health journey and how this book helped me. The book basically paid for itself after 2 sales, everything else is pure profit!"'),s.createElement("p",{className:w.socialAuthor},"- Tunde O., Lagos"),s.createElement("div",{className:w.socialStats},s.createElement("span",null,"✓ 38 sales"),s.createElement("span",null,"✓ ₦",(ae*38).toLocaleString()," earned"),s.createElement("span",null,"✓ Started 2 months ago"))))),s.createElement("div",{className:"card mb-8"},s.createElement("h3",{className:w.calculatorTitle},"Calculate Your Potential Earnings"),s.createElement("div",{className:w.calculatorContent},s.createElement("label",{className:w.sliderLabel},"How many sales do you think you can make per month?"),s.createElement("div",{className:w.sliderContainer},s.createElement("input",{type:"range",min:"5",max:"100",step:"5",value:k,onChange:H=>E(Number(H.target.value)),className:w.slider,disabled:c}),s.createElement("div",{className:w.sliderLabels},s.createElement("span",null,"5 sales"),s.createElement("span",null,"100 sales"))),s.createElement("div",{className:w.earningsDisplay},s.createElement("div",{className:w.earningsAmount},de(k)),s.createElement("p",{className:w.earningsText},"per month with ",k," sales"),s.createElement("p",{className:w.yearlyEarnings},"That's ",de(k*12)," per year!")))),s.createElement("div",{className:"card"},s.createElement("h3",{className:w.formTitle},"Get Your Affiliate Link Now (Takes 30 Seconds)"),r?s.createElement("div",{id:"generated-link",className:w.generatedLinkSection},s.createElement("div",{className:w.successMessage},s.createElement(z,{name:"Check",className:w.bigCheckIcon}),s.createElement("h3",{className:w.successHeading},"Success! Your Link is Ready"),s.createElement("p",{className:w.successText},"Start sharing and earning right now!")),s.createElement("div",{className:w.linkContainer},s.createElement("label",{className:w.linkLabel},"Your Unique Affiliate Link:"),s.createElement("div",{className:w.linkDisplay},s.createElement("code",{className:w.linkCode},l),s.createElement("button",{onClick:()=>V(l,"link"),className:w.copyLinkButton,disabled:S},s.createElement(z,{name:"Copy",className:w.copyIcon}),s.createElement("span",null,S?"Copied!":"Copy")))),s.createElement("div",{className:w.socialShareSection},s.createElement("h4",{className:w.shareTitle},"📱 Share Your Link Now:"),s.createElement("div",{className:w.socialShareButtons},s.createElement("a",{href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just earned my money back from this powerful book about mental health in Nigeria. Join me as an affiliate and earn ₦${ae} per sale!`)}&url=${encodeURIComponent(l)}`,target:"_blank",rel:"noopener noreferrer",className:w.twitterShareButton},s.createElement(z,{name:"Twitter"})," Twitter"),s.createElement("a",{href:`https://wa.me/?text=${encodeURIComponent(`I just earned my money back from this powerful book about mental health in Nigeria. Get your affiliate link and earn ₦${ae} per sale! ${l}`)}`,target:"_blank",rel:"noopener noreferrer",className:w.whatsappShareButton},s.createElement(z,{name:"MessageCircle"})," WhatsApp"),s.createElement("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(l)}`,target:"_blank",rel:"noopener noreferrer",className:w.facebookShareButton},s.createElement(z,{name:"Facebook"})," Facebook"))),s.createElement("div",{className:w.sharingGuide},s.createElement("h4",{className:w.guideTitle},"📱 How to Share Your Link:"),s.createElement("div",{className:w.socialGrid},s.createElement("div",{className:w.socialItem},s.createElement(z,{name:"Twitter",className:w.twitterIcon}),s.createElement("div",null,s.createElement("p",{className:w.socialName},"Twitter/X"),s.createElement("p",{className:w.socialDescription},"Share your story + link in a thread"))),s.createElement("div",{className:w.socialItem},s.createElement(z,{name:"MessageCircle",className:w.whatsappIcon}),s.createElement("div",null,s.createElement("p",{className:w.socialName},"WhatsApp Status"),s.createElement("p",{className:w.socialDescription},"Post to your status with link"))),s.createElement("div",{className:w.socialItem},s.createElement(z,{name:"Share2",className:w.facebookIcon}),s.createElement("div",null,s.createElement("p",{className:w.socialName},"Facebook"),s.createElement("p",{className:w.socialDescription},"Share in groups or your timeline"))),s.createElement("div",{className:w.socialItem},s.createElement(z,{name:"Mail",className:w.emailIcon}),s.createElement("div",null,s.createElement("p",{className:w.socialName},"Email"),s.createElement("p",{className:w.socialDescription},"Send to friends and family"))))),s.createElement("div",{className:"pro-tip"},s.createElement("p",{className:w.tipText},s.createElement("strong",null,"💡 Pro Tip:")," The more personal your recommendation, the better! Share how this book helped YOU with mental health awareness. Authentic stories sell better than generic promotions.")),s.createElement("div",{className:w.emailConfirmation},s.createElement("p",{className:w.confirmationText},s.createElement("strong",null,"We've emailed your affiliate link to:"),s.createElement("br",null),s.createElement("span",{className:w.userEmail},t)),s.createElement("p",{className:w.confirmationNote},"Track your earnings, get payment updates, and access promotional materials via email."))):s.createElement("div",null,s.createElement("div",{className:w.signupForm},s.createElement("input",{type:"text",placeholder:"Your name (optional)",value:a,onChange:H=>o(H.target.value),className:`form-input ${w.nameInput}`,disabled:c}),s.createElement("input",{type:"email",placeholder:"Enter your email address *",value:t,onChange:H=>n(H.target.value),className:`form-input ${w.emailInput}`,disabled:c,required:!0}),s.createElement("button",{onClick:U,className:`btn btn-green ${w.generateButton}`,disabled:c||!t||!t.includes("@")},c?s.createElement(s.Fragment,null,s.createElement("span",{className:"spinner-sm mr-2"}),"Processing..."):s.createElement(s.Fragment,null,s.createElement(z,{name:"DollarSign",className:w.dollarIcon}),s.createElement("span",null,"Generate My Affiliate Link"),s.createElement(z,{name:"ArrowRight",className:w.arrowIcon}))),s.createElement("p",{className:w.formNote},"No approval needed. Start earning immediately.")),s.createElement("div",{className:w.statsGrid},s.createElement("div",{className:w.statCard},s.createElement(z,{name:"Users",className:w.statIcon}),s.createElement("p",{className:w.statText},"143 Active Affiliates")),s.createElement("div",{className:w.statCard},s.createElement(z,{name:"TrendingUp",className:w.statIcon}),s.createElement("p",{className:w.statText},"₦2.4M Paid Out")),s.createElement("div",{className:w.statCard},s.createElement(z,{name:"Check",className:w.statIcon}),s.createElement("p",{className:w.statText},"7-Day Payouts"))))))),$==="USD"&&s.createElement("div",{className:w.internationalCard},s.createElement("div",{className:w.internationalContent},s.createElement("div",{className:"text-center mb-8"},s.createElement("span",{className:"badge badge-blue animate-pulse mb-4"},"🌍 INTERNATIONAL PURCHASE"),s.createElement("h2",{className:w.internationalTitle},"Thank You for Your Support!"),s.createElement("p",{className:w.internationalSubtitle},"Your purchase helps bring important conversations about mental health to a global audience.")),s.createElement("div",{className:w.internationalMessage},s.createElement(z,{name:"Globe",className:w.globeIcon}),s.createElement("div",null,s.createElement("h3",{className:w.internationalMessageTitle},"You now have full access to the book"),s.createElement("p",{className:w.internationalMessageText},'Your access code above will give you unlimited access to "Suicide Note" by Loba Yusuf. You can read online anytime, anywhere in the world.'))),s.createElement("div",{className:w.internationalFeatures},s.createElement("div",{className:w.feature},s.createElement(z,{name:"CheckCircle",className:w.featureCheckIcon}),s.createElement("span",null,"Full book access")),s.createElement("div",{className:w.feature},s.createElement(z,{name:"CheckCircle",className:w.featureCheckIcon}),s.createElement("span",null,"Read online anytime")),s.createElement("div",{className:w.feature},s.createElement(z,{name:"CheckCircle",className:w.featureCheckIcon}),s.createElement("span",null,"No expiration")),s.createElement("div",{className:w.feature},s.createElement(z,{name:"CheckCircle",className:w.featureCheckIcon}),s.createElement("span",null,"Support mental health awareness"))))),$==="NGN"&&s.createElement("div",{className:"card mb-8"},s.createElement("h2",{className:w.whyTitle},"Why Our Affiliates Succeed"),s.createElement("div",{className:w.whyGrid},s.createElement("div",{className:w.whyCard},s.createElement("div",{className:w.whyIcon},s.createElement(z,{name:"Book",className:w.purpleIcon})),s.createElement("h3",{className:w.whyCardTitle},"Powerful Product"),s.createElement("p",{className:w.whyCardText},"This book changes lives. When you share it, you're genuinely helping people - not just selling.")),s.createElement("div",{className:w.whyCard},s.createElement("div",{className:w.whyIcon},s.createElement(z,{name:"DollarSign",className:w.blueIcon})),s.createElement("h3",{className:w.whyCardTitle},"50% Commission"),s.createElement("p",{className:w.whyCardText},"Most Nigerian ebooks offer 20-30%. We offer 50% because we want you motivated to share.")),s.createElement("div",{className:w.whyCard},s.createElement("div",{className:w.whyIcon},s.createElement(z,{name:"TrendingUp",className:w.greenIcon})),s.createElement("h3",{className:w.whyCardTitle},"Easy to Promote"),s.createElement("p",{className:w.whyCardText},"Mental health is trending. People want this content. One good post can get you 20+ sales.")))),s.createElement("div",{className:w.finalCTA},s.createElement("h3",{className:w.finalTitle},"Ready to Start Reading?"),s.createElement("p",{className:w.finalSubtitle},"Your access code is ready. Click below to begin your journey with Eliora's story."),s.createElement("button",{onClick:Me,className:`btn btn-blue ${w.readingButton}`,disabled:!p||C},s.createElement(z,{name:"Book",className:w.bookIcon}),s.createElement("span",null,"Start Reading Now"))))),s.createElement("footer",{className:w.footer},s.createElement("div",{className:"container"},s.createElement("div",{className:w.footerContent},s.createElement("p",{className:w.footerText},"Questions? Email us at support@suicidenote.com"),s.createElement("p",{className:w.copyright},"© 2026 Loba Yusuf. All rights reserved.")))))},qt=[{page:1,chapter:"Cover",content:`SUICIDE NOTE
by Loba Yusuf

Copyright © 2026 Loba Yusuf
All rights reserved.`,wordCount:25},{page:2,chapter:"Important Mental Health Notice",content:`Important Mental Health Notice

This book contains themes of depression, suicidal thoughts, emotional distress, and mental health struggles. It may be emotionally difficult for some readers.

This work is not intended to encourage or promote suicide, self-harm, or hopelessness. Its purpose is to reflect lived emotional experiences and highlight the importance of connection, understanding, and support.

Fiction Disclaimer
Suicide Note is a work of fiction. All characters, events, and situations are fictional.

Crisis Support Resources (Nigeria)
Nigeria Emergency Number: 112
Lagos Emergency Lines: 767 or 112`,wordCount:120},{page:3,chapter:"Dedication",content:`For everyone who has ever felt alone in a crowd,
For every soul that has whispered, "I can't do this anymore,"
For the fighters who wake up each morning and try again,
And for those who couldn't—may your memory inspire us to be kinder.

This is for Lagos, with all its chaos and beauty.
This is for Nigeria, with all its contradictions.
This is for humanity, in all its broken, beautiful glory.`,wordCount:85},{page:4,chapter:"CONTENTS",content:`CONTENTS

Copyright
Important Mental Health Notice
Fiction Disclaimer
Crisis Support Resources (Nigeria)

Chapter One: The Note Begins
Chapter Two: The Days After
Chapter Three: One More Chance
Chapter Four: Strangers Who Understand
Chapter Five: The Facebook Confession
Chapter Six: Learning to Reach
Chapter Seven: The First Meeting
Chapter Eight: Something Worth Fighting For
Chapter Nine: Years Later
Chapter Ten: What Was Always There
A Note from the Author`,wordCount:60},{page:5,chapter:"Chapter One: The Note Begins",content:`CHAPTER ONE
The Note Begins

I'm writing this because I need someone to understand.

Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man. Not Tola, too busy with her husband and children to notice I've been disappearing for years. Not Deji, who has exams next week and a future that shouldn't be shadowed by this.

Someone. Anyone. Maybe no one.

I'm using loose sheets torn from an old exercise book that I used in my final year at LASU, pages still blank after the semester ended. I told myself I'd use them for something eventually. Grocery lists, maybe. Or tracking my Clash of Clans progress. But they've sat in that wardrobe for two years, and tonight, I finally know what they're for.

It's Friday, November 15, 2024. 11:47 PM. NEPA took light around nine—unusual, because they normally let us have power until at least ten on weekends. I'm sitting at the small table in my self-contain, writing by the light of my phone's flashlight propped against the wall. The battery is at 23%. When it dies, I'll have to stop, but by then this should be finished.`,wordCount:210},{page:6,chapter:"Chapter One: The Note Begins (Continued)",content:`My name is Eliora Oluwafemi Adetayo. Eliora means my God is light, Oluwafemi—God loves me, and Adetayo—the crown meets joy. My parents named me like I was supposed to be something. Like these names would protect me or guide me or make me into a relevant person.

I am twenty-six years old. I have a degree in Business Administration from Lagos State University, Second Class Lower. I work as a warehouse associate for a Chinese import company in Apapa, scanning inventory and recording stock numbers. I make ₦65,000 a month. After transport, food, and rent—which my parents helped pay this year because I couldn't manage it alone—I have maybe ₦8,000 left for everything else. I live in Ojuelegba in a room so small I can touch opposite walls if I spread my arms wide enough.

This is my life. This has been my life for two and a half years, and I can't see how it will ever be different.

I should start at the beginning, give context, explain the journey, make it make sense, right? But I don't know where the beginning is. When I graduated and couldn't find work? When I took this warehouse job "temporarily" and got stuck? When my university friends scattered across Lagos, Abuja, abroad, and our group chat went silent? When I realized I could go weeks without anyone saying my name out loud?

Maybe there is no beginning. Maybe this has always been here, waiting.`,wordCount:260},{page:7,chapter:"Chapter One: The Note Begins (Continued)",content:`The thing about Lagos is, you can be surrounded by twenty million people and still drown in loneliness. I learned that slowly, the way you learn anything that kills you—one day at a time, so gradually you don't notice until you're already gone.

I wake up at 5 AM every day because my commute takes two hours. Danfo from Ojuelegba to CMS, then another from CMS to Apapa. The conductors shout the same routes in the same rhythm—"CMS! CMS! One chance! Enter, we dey go!"—and I squeeze into seats meant for three people but holding four, my body pressed against strangers who smell like sweat and heat and the same exhaustion I feel.

No one looks at anyone. That's the rule of Lagos transport. You stare at your phone or out the window or at nothing, because eye contact is an invitation, and we're all too tired for invitations.

I clock in at 7 AM. Mr. Chen, my manager, barely looks up from his clipboard. I don't think he knows my full name. He calls me "You" or "Hey" or sometimes just points. The warehouse is concrete floors and fluorescent lights that make these annoying buzz sounds. Metal shelves stretch up to the ceiling, rows and rows of boxes with codes I've memorized without meaning to: 3847B, rechargeable fans. 4729C, phone chargers. 6012A, plastic basins.`,wordCount:240},{page:8,chapter:"Chapter One: The Note Begins (Continued)",content:`I scan items. I record numbers in the computer. I stack boxes. I move to the next section. The beep of the scanner becomes the only rhythm in my day.

Ibrahim tries to talk to me sometimes. He's from Kano, been here four years, always inviting me to lunch: "Bros, come chop na." I tell him I'm not hungry or I brought food or maybe later. After six months, he stopped asking. He still greets me every morning—"Bros, how far?"—and I nod or say "I dey" and that's it. He's not unkind. I'm just not much of a talker.

Ngozi at the front desk says "Good morning!" every day with this bright smile like she means it. She waves. She tries. I mumble something back. She deserves better than my mumbling, but I don't have better to give.

At 4 PM, I clock out. Two hours back to Ojuelegba. By the time I get home, it's past six and I'm so tired I can feel it in my bones. Not tired from physical work—the warehouse isn't hard labor, just mindless repetition. Tired from existing. Tired from pretending I'm fine when Mr. Chen yells about working faster. Tired from sitting in traffic watching the sun set behind buildings I'll never afford to live in. Tired from being invisible.`,wordCount:240},{page:9,chapter:"Chapter One: The Note Begins (Continued)",content:`I eat—usually bread and eggs or indomie if I'm too drained to cook—and then I open my laptop.

This is the only part of the day that feels like anything.

I play Clash of Clans. My username is SilentKing047. Town Hall Level 11, working toward 12. My clan is called Naija Warriors, mostly Nigerians living abroad—London, Texas, Toronto—people who left and made something of themselves. They don't know I'm a warehouse worker living in a self-contain in Ojuelegba. They think I'm a student, I think, or maybe they don't think about me at all except when I attack in clan wars.

I'm good at it. I know troop combinations, attack strategies, when to use spells and when to save them. I can three-star bases that should be too strong for my level. In the clan chat, people say "Nice hit, Silent" or "Clutch attack, bro." For those few seconds, I feel like I did something that mattered.

I upgrade my barracks. I collect resources. I watch the timer count down—six hours until my barbarian king is done upgrading, twelve hours until I can use my army again. I check the app obsessively, even at work, because there's always something to do, some progress to track. I can measure my life in these small victories: archer tower to level 13, clan castle to level 6, war stars earned.`,wordCount:250},{page:10,chapter:"Chapter One: The Note Begins (Continued)",content:`But when I close the app, nothing has changed. My room is still small. My bank account is still nearly empty. I'm still twenty-six with a business degree and a job that doesn't require one. The progress isn't real. It's pixels on a screen. And I know this, but I keep playing because at least it's something.

Sometimes I watch films. Korean dramas, mostly—the ones where people are sad but beautiful, where suffering is aesthetic and meaningful. Or Hollywood movies where the underdog wins, where the quiet guy turns out to be secretly brilliant, where hard work pays off and people notice. I download them using Airtel night plan. My internet is too slow for streaming, and I can't afford more data.

I fall asleep with my laptop still playing, voices in a language I don't always understand filling the silence so I don't have to hear how alone I am.`,wordCount:160},{page:11,chapter:"Chapter One: The Note Begins (Continued)",content:`At night, after the films end or I've finally closed Clash of Clans, there's the other thing. The thing I don't want to write about but should, because this is supposed to be honest.

I masturbate. Not because I'm thinking about anyone or because I want to — but because when the urge comes, I don't have the energy to resist. It's routine now—like brushing my teeth, only sadder.

And then, immediately after, I hate myself.

I lie there in the dark—or if NEPA has given us light, in the dim yellow glow of my single bulb—and I feel disgusting. I feel like this is proof of what I am: empty, broken, alone. I think about how I'm twenty-six and this is my life, this is what I've become. A man who goes to a job that means nothing, plays a game that means nothing, and jerks off in the dark because he has no one and nothing else.

The shame is worse than the loneliness sometimes. At least loneliness is passive. Shame is active. It tells me I deserve this. It tells me I did this to myself by being too quiet, too awkward, too much of a failure to make friends or find a girlfriend or build the kind of life where someone might notice if I disappeared.

I wash my hands. I lie down. I stare at the ceiling and listen to the generator from the next compound and the distant sound of a church vigil—someone praising God at midnight while I'm here thinking about how easy it would be to just let all of this end.

This is every night. This has been every night for longer than I can remember.`,wordCount:280},{page:12,chapter:"Chapter One: The Note Begins (Continued)",content:`My mother calls on Sundays. Every Sunday after church, between 2 and 3 PM—she teaches at a primary school in Surulere, so Sundays are her time to check on everyone—my phone rings with "Mummy Calling" on the screen. I let it go to voicemail, then text: "Sorry, busy. Will call later."

I never call later.

She leaves messages: "Eli mi, I just want to hear your voice. Are you eating well? Are you coming to service this week? Call me, please."

I can't. Because if I hear her voice, really hear it, I'll break. Because she'll ask how I am and I'll have to lie, and I'm so tired of lying. Because she'll say "God has plans for you, you'll see," and I don't have the strength to explain that if God has plans, He's kept them well hidden.

My father calls less often. Maybe once a month, short and direct: "Eliora. How is work?" I tell him it's fine. He says, "Good. A man must work." Then silence. Then, "Your mother worries about you." Then goodbye.

Daddy doesn't understand me. He worked for thirty-two years in the civil service, provided for his family, did his duty. Now he runs a small provisions shop near the house. He looks at me and sees waste—a son with a degree working a job that doesn't require one, living alone instead of saving to build something, twenty-six and unmarried with no prospects. I'm not the son he thought he'd raised. I'm proof that good names and good intentions don't guarantee good outcomes.`,wordCount:280},{page:13,chapter:"Chapter One: The Note Begins (Continued)",content:`Tola texts sometimes: "Eli, how you defy?" I read them, don't respond. A week later, she texts again: "Bro, you good?" I type "Yeah, fine" and send it. She replies with "Ok o. Call me when you're free" but doesn't push. She has two children and a husband and a life in Ibadan that's full enough without her strange brother who never talks.

Deji visits my place maybe twice a year. He's studying Mechanical Engineering at UNILAG, living the life I was supposed to live—campus, friends, future. He's everything I'm not: social, optimistic, confident. Last time he came, he talked about his project, his classmates, a girl he likes. I listened and felt nothing. Not happy for him. Not envious. Just... distant. Like his life was happening somewhere I couldn't reach, even though he was sitting three feet away. He said, "Bros Eli, you too quiet sha. You good?" I told him I was just tired from work.

He believes me. Everyone believes me. Or maybe they just don't want to ask harder questions.

I have no friends. I should be clear about that. I have people who were friends—Kunle, Femi, Tosin from university—but we don't talk anymore. The group chat died sometime in 2023. Kunle works in a bank in VI, posts pictures of client meetings and beach weekends. Femi is doing his master's in the UK, living the dream we all talked about. Tosin got married last year; I saw it on Instagram, didn't congratulate him.

They didn't abandon me. I just... faded. Stopped responding to invitations, stopped showing up to hangouts, stopped contributing to conversations until there was nothing left to include me in. By the time I realized I was alone, it was too late to go back. You can't just reappear in people's lives after two years of silence and expect them to hold space for you.`,wordCount:320},{page:14,chapter:"Chapter One: The Note Begins (Continued)",content:`I scroll through Instagram sometimes and see them living. Vacations. Promotions. Relationships. Children. Achievements. They're moving forward, and I'm here in Ojuelegba in a room that smells like old cooking oil from the neighboring flat, writing a suicide note by phone light because NEPA took the power and I took everything else from myself.

The worst part is I don't even blame them for forgetting me. I forgot myself first.

Today was bad. Worse than usual, which is saying something.

Mr. Chen called me to the loading dock around noon. I thought maybe there was a special delivery, something that needed extra hands. Instead, he started yelling. "Why you so slow? Every day, slow, slow, slow! Other workers finish two sections, you finish one! You think we pay you to waste time?"

I stood there. I didn't have an answer because he was right—I am slow. Not because I'm incapable but because I don't care. Because scanning item 4729C feels exactly the same as scanning item 3847B, and my body moves through the motions like it's underwater, and some days it takes everything I have just to show up.

But I didn't say that. I said, "Sorry, sir. I'll work faster."`,wordCount:210},{page:15,chapter:"Chapter One: The Note Begins (Continued)",content:`He waved his hand like I was a fly. "You always sorry. Sorry doesn't finish the job. Faster, or we find someone else."

The other workers heard. Ibrahim looked uncomfortable. Ngozi, passing by with some papers, gave me a sympathetic glance. I felt overwhelmed with shame—not just for being yelled at but for being yelled at because I deserve it, because I'm failing even at this simple, meaningless job.

I spent the rest of the day working faster, scanning items without looking, stacking boxes without caring if they were straight. My hands shook. I wanted to cry. I didn't, because crying at work would be the final humiliation, but I felt it building in my chest like pressure.

At 4 PM, I clocked out and walked past Ibrahim without responding to his "Bros, you good?" I got on the danfo and stared out the window while the conductor shouted and traffic dragged on.

When I got home, my landlady, Iya Alaje, was sitting outside on the bench by her door. "Eli, you never eat today?" she asked, like she always does. "Come take rice."

"Thank you, ma," I said. "I don eat."

I hadn't. But I went inside anyway, closed my door, and sat on my bed in the dark.

NEPA took light at 9 PM, and I thought: Good. Let it stay dark.

That's when I took out this notebook.`,wordCount:240},{page:16,chapter:"Chapter One: The Note Begins (Continued)",content:`I've been thinking about this for weeks. Months, maybe. Not in a dramatic way—no sudden decision, no breaking point. Just a quiet certainty that's been building like dust in a room no one cleans. One day you notice it's everywhere, and you realize it's been accumulating all along.

I don't want to die, exactly. That's not quite right. I just don't want to live like this anymore. And since I can't see how life gets better—how I escape the warehouse, how I make friends at twenty-six, how I stop feeling like a ghost in my own city—this seems like the only option.

I'm tired. I'm so tired.

Tired of the danfo commute. Tired of Mr. Chen's yelling. Tired of pretending to my parents that everything is fine. Tired of scrolling through Instagram seeing everyone else's lives moving forward. Tired of masturbating in the dark and hating myself after. Tired of Clash of Clans victories that don't mean anything. Tired of Ngozi's bright "Good morning!" when I have nothing bright to give back. Tired of being invisible. Tired of being heavy. Tired of being me.

If I were gone, honestly, would anyone really miss me?

Mummy would cry. She'd blame herself, ask God why, light candles at church. Dad would be disappointed one final time. Tola would feel guilty for not staying in closer touch. Deji would be confused—"But he seemed fine when I saw him."

But after the funeral, after seven days of mourning, after the initial shock, life would continue. Mummy would still teach. Daddy would still run his shop. Tola would still raise her children. Deji would still finish his degree. The warehouse would hire someone else, someone faster. Ibrahim would eat lunch alone or find another coworker. Ngozi would greet whoever sat at my station.

The world would close over the space I left like water over a stone. In six months, maybe a year, I'd just be a sad story they occasionally remember: "Remember Eli? So sad. He was always so quiet."`,wordCount:340},{page:17,chapter:"Chapter One: The Note Begins (Continued)",content:`That's the truth, isn't it? I'm already gone. I've been gone for years. This would just make it official.

I've researched methods. I'm not going to write them here—I won't do that to whoever reads this, won't put those thoughts in someone else's head. But I know what I'll do. It's not impulsive. I've thought it through. I've made sure it will work, that it won't just leave me damaged and more miserable. I've thought about logistics, timing, who will find me and when.

Tomorrow is Saturday. I don't work weekends. No one will expect to hear from me. If I do it in the morning, my body won't be discovered until Sunday at least, maybe Monday when I don't show up to work. That gives me time. That gives everyone else time to be doing normal Saturday things when it happens, so no one has to feel responsible.

Deji has an exam on Tuesday. I thought about waiting until after, but that's just delaying the inevitable. And besides, maybe this way he'll have something bigger to think about than exam stress. Maybe my death will be the thing that makes him realize life is short, that he should appreciate what he has. Maybe I can give him that gift, at least—perspective through absence.

Just to clarify, I'm not angry. This isn't revenge or a cry for help. I'm just... done. I've tried. I got up every day for two and a half years. I went to work. I paid rent. I called my mother back occasionally. I existed. But existing isn't living, and I don't have the energy to figure out how to turn one into the other.

Some people aren't meant for this. Some people don't have what it takes. I think I'm one of them.`,wordCount:290},{page:18,chapter:"Chapter One: The Note Begins (Continued)",content:`My phone battery is at 11% now. The light is dimming. I should finish this.

If you're reading this—Mummy, Daddy, Tola, Deji, whoever finds this note—I'm sorry. I'm sorry I wasn't stronger. I'm sorry I couldn't be the son, the brother, the friend, the person you wanted or needed. I'm sorry for the pain this will cause. I know that's selfish. I know this will hurt you. But I hurt too, and I can't carry it anymore.

Thank you for trying. Thank you for the Sunday calls I didn't answer, the food I didn't accept, the invitations I declined. Thank you for seeing me even when I made myself invisible. I know you loved me. I just couldn't feel it through the weight.

Mummy, you did nothing wrong. You were a good mother. You prayed for me, you called me, you cooked for me when I visited. This isn't your fault. Sometimes people are just born with something broken inside, and love isn't enough to fix it.

Daddy, I'm sorry I wasted the sacrifice you made for my education. I'm sorry I'm not the man you raised me to be. You did your best. I just couldn't do mine.

Tola, I'm sorry I was so distant. I'm sorry I made you feel like you had to keep trying when I'd already given up. You're a good sister. I was just a bad brother.

Deji, do well on your exam. Finish your degree. Build something. Be everything I couldn't be. Don't let this stop you. I'm already gone—this just makes it official.

To anyone else who somehow cares: I'm sorry I disappeared before I disappeared. I'm sorry I was so heavy to know. I'm sorry I couldn't be lighter.

My name is Eliora Oluwafemi Adetayo. I am twenty-six years old. I work in a warehouse. I live in Ojuelegba. I play Clash of Clans. I watch films. I exist in the spaces between other people's lives, and I'm tired of existing.

By the time you read this, I'll be—`,wordCount:310},{page:19,chapter:"Chapter One: The Note Begins (Continued)",content:`My phone dies.

The flashlight cuts out mid-sentence, plunging the room into complete darkness. For a moment, I just sit there, pen still touching paper, the last word unfinished.

I'll be—

What? Gone? Dead? Free? At peace?

I don't know. I was writing on momentum, and now the momentum has stopped.

I should get up, find my power bank, charge my phone, finish the sentence. That was the plan—finish the note, sleep a few hours, wake up, and do it. Clean. Final. Done.

But I'm so tired. Tired in a way that makes even reaching for the power bank feel impossible. The bed is right there, close enough to touch in the dark. My body aches from sitting at this table. The note is done enough. No one needs the ending—they'll figure it out.

I close the notebook. The darkness is complete now—no light from outside because it's past midnight and the compound is asleep, no streetlights because this is Ojuelegba and we don't have streetlights, no phone because it's dead. Just dark. Just silence. Just me.

I'll finish it tomorrow. I'll do it tomorrow.

I lie down on my bed without undressing, without washing up, still wearing my work clothes that smell like warehouse dust and sweat. I close my eyes.

Just for a little while. Just to rest.

Tomorrow.

But somewhere between closing my eyes and sleep, something shifts. Not a thought, exactly. Not a decision. Just... something.

Maybe it's exhaustion. Maybe it's the dark. Maybe it's that my body has finally hit some kind of limit and is forcing me to stop.

Or maybe it's that the note is finished—the words are written, the explanation is done—and I don't have to carry it in my head anymore. It's on paper now. It exists outside of me. And somehow that makes it less urgent.`,wordCount:310},{page:20,chapter:"Chapter One: The Note Begins (Continued)",content:`I don't destroy the note. I don't change my mind, not really. But I don't get up and do it either.

I just... wait.

Just today, I think as sleep pulls me under. I'll see about tomorrow.

The notebook sits closed on the table. The pen lies beside it. My phone is dead.

Outside, Lagos sleeps and breathes and lives without knowing or caring that somewhere in Ojuelegba, a twenty-six-year-old man named Eliora almost didn't see another sunrise.

Almost.`,wordCount:90},{page:21,chapter:"Chapter Two: The Days After",content:`CHAPTER TWO
The Days After

I wake up to sunlight.

That's the first thing I notice—bright, insistent light cutting through the gap in my curtains, falling directly across my face. My body aches like I've been hit by a danfo. My mouth tastes like something died in it. My head feels stuffed with cotton.

But I'm awake. I'm alive.

For a moment, I don't remember. Then I do.

The note. The phone dying. The decision to sleep. The thought: Just today. I'll see about tomorrow.

I turn my head slowly. The loose sheets are still on the table where I left them, pen lying beside them. Evidence. Proof that last night happened. That I sat in the dark and wrote my goodbye to the world.

But the world is still here. And so am I.

I sit up, my back protesting. I'm still wearing my work clothes from Friday—the faded orange polo shirt, the black trousers that smell like warehouse dust and sweat. I fell asleep without washing, without changing, without doing anything except exist.

And now it's Saturday morning. November 16, 2024.

I'm supposed to be dead.

I don't know what to do with this information.`,wordCount:210},{page:22,chapter:"Chapter Two: The Days After (Continued)",content:`I get up because my bladder demands it. Walk to the shared bathroom down the corridor, past other tenants' doors—Mama Tunde's, Brother Segun's, the young couple whose names I never learned. The bathroom is empty, thankfully. I pee, wash my face with the brown water that comes from the tap, avoid looking at myself in the cracked mirror.

When I come back to my room, the sheets are still there. Staring at me. Accusing me.

You didn't finish. You didn't follow through. You couldn't even do this right.

I should tear them up. Burn them. Flush them down the toilet. Make them disappear so I can pretend last night didn't happen.

Instead, I fold them carefully. Three sheets of paper covered in my handwriting, the last sentence incomplete: By the time you read this, I'll be—

I'll be what? Still here, apparently. Still in Ojuelegba. Still twenty-six. Still a warehouse worker with a business degree and ₦8,000 in my bank account.

I open my wardrobe—the small wooden one with a missing hinge that I bought secondhand when I moved in. Push aside clothes I barely wear, old textbooks from LASU I'll never open again, a box of random cables and chargers. I place the folded sheets beneath everything, in the back corner where I won't see them unless I look.

Not destroyed. Just... kept.

I don't know why. Maybe as proof. Proof that I was there, at the edge. Proof that I stepped back, even if I don't know why.

I close the wardrobe. Stand there for a moment, staring at the door.

Then I lie back down on my bed and stare at the ceiling.`,wordCount:260},{page:23,chapter:"Chapter Two: The Days After (Continued)",content:`The day stretches ahead. Empty. Purposeless. What do people do on Saturdays?

I try to remember what I used to do. Before the warehouse job. Before the depression became this heavy. Before I stopped pretending I was okay.

Nothing comes to mind. Maybe I never had Saturday plans. Maybe I've always been like this—alone, aimless, just existing.

My phone is still dead on the table, plugged into the charger now. I wait for it to come back to life. The screen flickers—5%. Then 8%. Then 12%.

When it finally turns on, I half expect messages. Someone noticing I'm gone. Someone wondering where I am.

There's nothing. Well, not nothing. A text from Mummy from last night: "Eli mi, call me back please. I'm worried."

I sent her a text Friday after work—"Sorry, busy. Will call later." She replied asking if I was okay, if I'd eaten. I never responded.

I stare at her message. I should reply. I should call. I should do something to let her know I'm still here.

But I don't. Because then she'll ask questions. She'll hear something in my voice. She'll know something is wrong. And I don't have the energy to lie convincingly.`,wordCount:210},{page:24,chapter:"Chapter Two: The Days After (Continued)",content:`I scroll through my phone instead. Instagram. Everyone's Saturday is better than mine. Kunle at a beach in Lekki with colleagues from the bank. Femi's Instagram story showing his UK university campus, autumn leaves, caption: "Loving this weather ♣️." Tosin posted photos of his wife and daughter—the daughter is maybe six months now, I've lost track.

I close Instagram. Open Clash of Clans. My Town Hall has been raided overnight—lost some resources, shield is down. I should rebuild, attack back, maintain my trophies. But I stare at the screen and feel nothing.

The game that used to mean something—the upgrades, the victories, the clan chat saying "Nice hit, Silent"—now just looks like what it is. Pixels. Code. Meaningless.

I close the app. Open it again. Close it. Open it.

Eventually I force myself to play. Run a few attacks. Win some loot. Upgrade a cannon. Go through the motions because it's something to do. Because the alternative is lying here thinking about the note in the wardrobe and why I'm still alive when I planned not to be.`,wordCount:210},{page:25,chapter:"Chapter Two: The Days After (Continued)",content:`Around noon, I hear sounds outside my window. Children playing in the compound. Someone's radio blasting gospel music—one of those energetic Pentecostal songs about victory and breakthrough. A woman's voice calling out: "Tunde! Tunde, come and eat!"

Life. Normal Saturday life. Happening all around me like I'm not here.

I'm supposed to be dead, and children are playing football. I'm supposed to be gone, and someone's cooking lunch. The world didn't pause. Didn't notice. Didn't care.

Which is exactly what I said in the note, isn't it? That the world would close over the space I left like water over a stone.

Except I'm still here. So there's no space. No absence. Just me, lying in my room, listening to life happen outside.

I should eat something. My stomach is empty, cramping slightly. I haven't eaten since... yesterday morning? That bread and egg before I went to work. Before Mr. Chen yelled at me. Before everything that led to the note.

I get up, check my provisions. Half a loaf of bread that's going stale. Three eggs. Some Indomie noodles. A tin of sardines. The supplies of someone who barely cares about eating.

I make Indomie because it's easiest—boil water in my hot pot, add the noodles and seasoning, wait three minutes. Eat it straight from the pot because I can't be bothered with a plate.

It tastes like nothing. Or maybe I'm too numb to register taste. I eat because my body needs fuel, not because I'm hungry. Not because I enjoy it.

When I'm done, I wash the pot in the bucket of water by the door—NEPA hasn't brought light yet today, so the electric pump isn't working. I'll need to fetch water from the compound tap later. Add it to the list of things I should do but probably won't.`,wordCount:320},{page:26,chapter:"Chapter Two: The Days After (Continued)",content:`I lie back down.

The ceiling has a crack that runs from the corner to the light fixture. I've stared at it so many times I've memorized the pattern. It looks like a river. Or maybe a road. Leading somewhere. Leading away.

I close my eyes.

I need to sleep.

When I wake up, the day will have moved forward. The room is dimmer. The sounds outside have shifted—less children playing, more adults moving around, someone cooking, smoke and spices drifting through the compound.

My phone says 5:47 PM. I've wasted most of the day sleeping. Or not wasted—what else was I going to do?

I check my messages. Nothing new. No one looking for me. No one wondering where I am.

This should feel freeing. Instead it just confirms what I already know: I'm invisible. I could disappear and it would take days for anyone to notice. I almost did disappear, and no one knows. No one suspects.

There's a knock on my door.

I freeze. Who—?

"Eli?" A woman's voice. Older. Familiar.

Iya Alaje. My landlady.

I don't answer immediately. Maybe if I stay quiet, she'll think I'm not here. She'll go away.

Another knock. "Eli, I know you defy inside. I see your light."

What light? NEPA hasn't—oh. My phone screen. The glow probably visible under the door gap.

I get up slowly, open the door only a fraction. "Good evening, ma."`,wordCount:240},{page:27,chapter:"Chapter Two: The Days After (Continued)",content:`Iya Alaje is standing there in her wrapper and buba, headscarf tied tight, fanning herself with a small handheld fan. She looks at me with those knowing eyes that have seen sixty-something years of people and their problems.

"You defy house since morning?" she asks.

"Yes, ma. I'm just resting."

"Resting." She says it like she doesn't quite believe me. "You never eat today?"

"I ate, ma. Indomie."

"Indomie." She shakes her head. "Young people and indomie. That thing no get nutrition. Come, I get rice and stew. Come take."

This is the part where I usually decline. Where I say thank you but no, I'm fine, I don eat already.

But something about her standing there, offering food she didn't have to offer, looking at me with concern she didn't have to feel.

"Thank you, ma," I hear myself say. "But I'm really okay. I don chop already."

She narrows her eyes. "You sure? You look somehow."

"I'm just tired from work, ma. You know how it is."

She studies me for another moment, then nods slowly. "Okay o. But if you need anything, come and knock. I dey house."

"Yes, ma. Thank you."

She turns to leave, then pauses. "Eli."

"Ma?"

"You too quiet, you know. You always lock yourself inside. Sometimes you need to come outside. Greet people. Sit small. Life too hard to carry alone."

I don't know what to say to that. So I just nod.

She walks away, and I close the door.`,wordCount:270},{page:28,chapter:"Chapter Two: The Days After (Continued)",content:`I stand there for a moment, her words echoing. Life too hard to carry alone.

She doesn't know how right she is. She doesn't know I almost stopped carrying it. That I almost put it down permanently.

But she noticed something. She came to check on me. She offered food.

She was there. And I said no.

Evening becomes night. NEPA brings light around 7 PM—the bulb in my room flickers on, the fan starts whirring. I should count my blessings. Instead I just notice that with the light on, the room looks even more depressing. The peeling paint. The water stains on the ceiling. The emptiness.

I open my laptop. Watch a Korean drama I've been halfway through for weeks—something about a CEO and a secretary falling in love. It's escapist. Ridiculous. Comforting in its predictability.

But tonight I can't focus. I keep thinking about the note. About the fact that I'm here. About tomorrow.

Because tomorrow is Sunday. And Sunday means Mummy will call. And I'll have to decide whether to answer. Whether to keep pretending. Whether to admit something is wrong.

I don't have answers.

I close the laptop. Lie in the dark even though the light is on. The fan spins above me, blades slightly bent, making a clicking sound every rotation. Click, click, click. Rhythmic. Almost soothing.

My phone buzzes. Instagram notification. Deji posted a photo—him and his friends at a house party somewhere in VI, everyone holding bottles of beer, laughing at the camera. Caption: "Squad 100."

He looks so alive. So present. So... here.

I'm here too. Physically. But I'm not alive the way he's alive. I'm just... existing. Going through motions. Waiting.

For what? I don't know anymore.`,wordCount:280},{page:29,chapter:"Chapter Two: The Days After (Continued)",content:`I close Instagram. Stare at my home screen. My wallpaper is the default—some generic nature photo that came with the phone. I never bothered to change it. Why would I? It's just a phone. Just a screen I look at while my life doesn't happen.

I open my browser. Type: "how to stop feeling empty."

Articles pop up. "10 Ways to Beat Depression." "Finding Purpose When You Feel Lost." "The Science of Happiness."

I've read articles like these before. They all say the same things: exercise, eat well, connect with others, find hobbies, practice gratitude, seek professional help.

I know what I'm supposed to do. I just can't do it.

Or won't. I don't know the difference anymore.

I close the browser.

The note is in the wardrobe. I could take it out. Read it again. Remember why I wrote it. Remember what I was feeling.

Or I could leave it there. Pretend last night didn't happen. Wake up tomorrow and go through the motions again. Survive another day.

Just today, I think. I'll see about tomorrow.

It's the same thought I had last night. The thought that kept me from finishing the note. From following through.

Maybe it's enough. Maybe surviving one day at a time is all I can do right now.

Maybe that has to be enough.`,wordCount:220},{page:30,chapter:"Chapter Two: The Days After (Continued)",content:`I don't remember falling asleep, but I must have because suddenly it's dark outside and my phone says 11:34 PM. The fan is still spinning. The light is still on. I'm still in my work clothes from Friday, now two days old, smelling of sweat and warehouse and giving up.

I should shower. Should change. Should do something that resembles self-care.

Instead I just lie there.

Tomorrow is Sunday. Mummy will call. I'll have to decide what to do.

Tomorrow is Sunday. The day after I was supposed to die.

Tomorrow is Sunday. And I'll still be here.

I close my eyes. The fan clicks above me. The compound is quiet now—everyone asleep, everyone resting before another week begins.

I'm still here.

For better or worse, I'm still here.`,wordCount:150},{page:31,chapter:"Chapter Three: One More Chance",content:`CHAPTER THREE
One More Chance

Sunday arrives whether I want it to or not.

I wake up around 9 AM to the blast of morning praise from giant speakers from somewhere down the street. Multiple churches, actually—this is Lagos, there's a church every fifty meters. The sounds overlap, creating a chaotic symphony of worship. Drums. Keyboards. Voices raised in praise. Someone speaking in tongues through a microphone that crackles with feedback.

Hallelujah! Thank you Jesus! We bless your name!

I pull my pillow over my head, but the sound still seeps through. Sunday morning in Lagos. Everyone praising God except me.

Mummy will be at Christ Church right now. Probably sitting in her usual spot—third row from the front, left side. Daddy beside her, checking his watch periodically, ready to leave the moment the service ends. She'll be singing along to the hymns, hands slightly raised, eyes closed. Believing. Trusting. Certain that God has plans.

I wonder if she's praying for me. She probably is. "Lord, touch my son Eli. Whatever is troubling him, Lord, remove it. Bring him back to church. Bring him back to you."

But I'm not troubled by something God can remove. I'm troubled by everything. By existing. By the weight of being alive when I don't know how to live.

My phone sits on the table, fully charged now. I stare at it from my bed. Waiting. Knowing what's coming.

It rings at 2:47 PM. Right on schedule.

"Mummy Calling" flashes on the screen.

I watch it ring. Once. Twice. Three times. My thumb hovers over the red decline button. That's what I usually do—let it ring out, send a text later: "Sorry, was busy."

But something stops me. Maybe it's Iya Alaje's words from yesterday: Life too hard to carry alone. Maybe it's guilt from the note I wrote, the goodbye I almost said.

I answer.

"Hello, Mummy."`,wordCount:310},{page:32,chapter:"Chapter Three: One More Chance (Continued)",content:`There's a surprised pause. Like she didn't actually expect me to pick up.

"Eli? Eli mi! You pick! Thank God!" Her voice floods with relief. "I was worried o. You don't answer my calls. You don't reply my messages. What is happening?"

"Nothing, Mummy. I'm fine. Just been busy with work."

"Busy, busy. You're always busy." She doesn't sound angry, just tired. "How is work? How is everything?"

"Fine. Everything is fine."

"You sure? You sound somehow."

I close my eyes. She can hear it. Even through the phone, across the distance, she can hear that something is wrong.

"I'm just tired, Mummy. You know how Lagos is. Work and traffic and everything."

"Hmm." That skeptical Yoruba mother sound. "You need to rest. You need to eat proper food, not just indomie and bread. When are you coming home? Come this Sunday. Let me cook for you."

"I'll try, Mummy."

"Try. You always say try." She sighs. "Anyway, service was good today. Pastor preached about not giving up when life is hard. About how God has plans even when we can't see them. You need to hear messages like that. Why don't you come to church again?"

Because I don't believe God has plans for me. Because if He does, they're terrible plans. Because sitting in church and pretending to worship feels like the biggest lie I could tell.

But I can't say that. So I say: "I will come, Mummy. Soon."

"Soon, soon." Another sigh. "Eli, talk to me. What is really wrong?"

Everything. Nothing. I don't know anymore.

"I'm just tired, Mummy. Work stress. That's all."`,wordCount:270},{page:33,chapter:"Chapter Three: One More Chance (Continued)",content:`She's quiet for a moment. I can hear sounds in the background—Daddy's voice asking something, probably "Is that Eli?", other people talking, maybe Tola and her family visiting.

"Okay," Mummy says finally. "But if something is worrying you, you can tell me. You know that, right? I'm your mother. Whatever it is, we can—"

"I know, Mummy. Thank you. But I'm fine. Really."

Another pause. She doesn't believe me, but she's not going to push. That's how we are—I lie, she accepts the lie, we both pretend everything is okay because the alternative is too hard.

"Okay o. But call me more often, please. Don't just disappear. And come home soon. You hear?"

"Yes, Mummy."

"Daddy wants to talk to you."

Before I can respond, I hear shuffling, and then Daddy's voice: "Eliora."

"Yes, sir."

"How is work?"

"Fine, sir."

"Good. A man must work." Pause. "Your mother worries about you."

"I know, sir."

"So call her more often. Come home more often. You understand?"

"Yes, sir."

"Okay. Take care of yourself."

And he's gone. Handed the phone back to Mummy. That's the extent of our conversation. How is work. Good. Take care.`,wordCount:210},{page:34,chapter:"Chapter Three: One More Chance (Continued)",content:`Mummy comes back on: "Eli mi, I love you. You know that?"

Something tightens in my chest. "I know, Mummy. I love you too."

"Okay. God bless you. I'll talk to you next week."

"Okay. Bye, Mummy."

I hang up.

Sit there holding the phone.

She loves me. I know she does. But her love can't fix what's broken in me. Her prayers can't make me want to be alive. Her cooking can't fill the emptiness.

And the worst part is, I almost made sure she'd never call me again. I almost made sure the next time she said "Eli mi" would be at my funeral.

The thought makes my stomach turn.

The rest of Sunday drags. I try to watch more of the Korean drama but can't focus. Try to play Clash of Clans but lose interest after one attack. Scroll through Instagram until I hate everyone and myself.

Evening comes. NEPA takes light at 6 PM, earlier than usual. The room goes dark. The fan stops. The heat immediately becomes oppressive—November in Lagos isn't as hot as the rainy season, but without a fan, even mild heat feels suffocating.

I lie in the dark, sweating, listening to generators roar to life around the compound. Other people have generators or can afford to buy fuel for their landlord's generator. I don't. So I just lie here in the dark, like I was two nights ago when I wrote the note.

The parallel isn't lost on me.

Two nights ago, in this same darkness, I wrote: By the time you read this, I'll be—

But I'm not. I'm here. In the same darkness. The same room. The same life.

What changed? Why am I here?`,wordCount:270},{page:35,chapter:"Chapter Three: One More Chance (Continued)",content:`I don't have an answer. Just exhaustion. Just the thought: One more day. Tomorrow I'll see.

Tomorrow is Monday. Back to the warehouse. Back to Mr. Chen and his yelling. Back to Ibrahim's invitations I'll decline. Back to Ngozi's greetings I'll mumble at. Back to pretending I'm okay.

But tonight, in this darkness, something occurs to me.

I have nothing to lose by trying something different.

That sounds dramatic. Like some revelation. But it's simpler than that. I'm at zero. Below zero. I was ready to die three days ago. So what's the worst that can happen if I... what? Reach out? Try something? Look for help?

I can't get lower than I already am.

The thought sits there, not quite hopeful but not quite hopeless either. Just... factual.

When NEPA brings the light back around 8 PM, I open my laptop. Open Facebook. I haven't been on Facebook in months—it's mostly just people from secondary school and university posting life updates I don't care about, or relatives sharing prayer messages and political rants.

But tonight, I search. Type into the search bar: "depression support Nigeria."

Several results pop up. Groups. Pages. Resources.

I click on one: "Naija Mental Health Support"

A safe space for Nigerians struggling with depression, anxiety, and mental health challenges. You're not alone.

3,247 members.

I read the description. The rules. Posts must be respectful. No judgment. No "just pray" advice. No telling people to "snap out of it." Actual support. Actual understanding.

I hover my cursor over "Join Group."

What if I join and it's fake? What if people are judgmental anyway? What if I post something and get attacked? What if—

What if it helps?

I click Join.

The admins accept me within five minutes. Suddenly I'm in.`,wordCount:300},{page:36,chapter:"Chapter Three: One More Chance (Continued)",content:`I scroll through the posts. My heart is pounding, but I keep reading.

Someone posted two hours ago: "Bad day today. Couldn't get out of bed until 3 PM. Just needed to say it somewhere where people understand."

Twenty-three comments. Every single one supportive:

"I feel you. Some days are like that. You still got out of bed eventually. That counts."

"Been there so many times. You're not alone."

"Proud of you for making it out of bed at all. Rest of the day is a bonus."

Another post from this morning: "Three months since my last panic attack. Not cured. Not 'better.' But surviving. Wanted to celebrate somewhere that gets it."

Forty-seven comments celebrating with them.

Another: "Does anyone else feel like they're watching their life from outside? Like you're not really here? Or is that just me?"

Sixty-two comments. Every single person saying yes, I feel that, you're not alone, it's called dissociation, I thought I was the only one.

I read post after post after post. And slowly, something in my chest loosens.

These are my thoughts. My feelings. Written by strangers across Lagos, Abuja, Port Harcourt, even Nigerians abroad. People I've never met who somehow know exactly what it's like.

You're not alone.

That's what the group description said. I thought it was just words. But reading these posts, seeing people admit the same things I feel—the exhaustion, the emptiness, the feeling of being outside your own life—

Maybe I'm not alone.

Not in the sense that I have friends or people who know me. But in the sense that other people feel this too. Other Nigerians. Other people who grew up being told to "just pray" or "stop being weak" or "what do you have to be depressed about?"

They're here. And they're talking. And they're not being judged.`,wordCount:300},{page:37,chapter:"Chapter Three: One More Chance (Continued)",content:`I spend two hours reading. I don't post anything. Just lurk. Learn.

I learn that one of the most active members is a guy named Seun—graphic designer in Lagos, deals with bipolar disorder, posts a mix of funny memes and raw 3 AM confessions. People love him.

I learn that there's a pastor in Abuja—Pastor Michael—who had a breakdown three years ago and now advocates for mental health in church settings. He posts things like: "Mental illness is not a spiritual failure. Go to therapy. Take your medication. God gave us doctors for a reason."

I learn that there's a young woman named Amara in Port Harcourt who writes poetry about depression. Today she posted: "Today I existed. Didn't achieve anything. Didn't feel anything. Just existed. And somehow, that's enough."

I learn that there's a Nigerian man living in London—people call him Uncle T—who survived a suicide attempt five years ago and now mentors others. He posted this morning: "Five years ago today, I tried to end my life. Today I'm having breakfast with my wife and kids, planning our Christmas trip. Recovery is real. It's possible. If you're reading this and you're struggling—please stay. Please wait. It can get different."

I stare at that post for a long time.

Five years ago, he tried. Now he's planning Christmas trips.

Three days ago, I wrote a suicide note. Now I'm... what? Still here. Still struggling. But reading posts from people who understand.

It's not much. But it's something.

Around 10 PM, someone posts: "Rough night. Really rough. Could use some encouragement."

The comments flood in immediately:

"You got this. One minute at a time if you need to."

"We're here. You're not alone. Keep breathing."

"Call the crisis line if you need to: 080012345678. No shame in asking for help."

"Survived rough nights before. You can survive this one too."

I watch the comments accumulate. Watch strangers hold this person up with words. With presence. With the simple act of responding.`,wordCount:320},{page:38,chapter:"Chapter Three: One More Chance (Continued)",content:`My fingers hover over the keyboard.

I could post. I could say: I almost didn't make it this week. I wrote a suicide note. My phone died before I could finish. I don't know why I'm still here.

I could say it. People would respond. They'd understand. They wouldn't judge.

But I can't. Not yet. It's too much. Too raw. Too real.

Instead, I keep lurking. Keep reading. Keep learning that maybe, possibly, I'm not as alone as I thought.

I close my laptop around midnight. Lie in bed staring at the ceiling.

Three days ago, I was ready to die.

Two days ago, I survived Saturday by sleeping through most of it.

Today, I answered Mummy's call. I found a group of people who understand.

Tomorrow, I'll go back to the warehouse. Back to the routine. Back to the life I was ready to leave.

But maybe—maybe—there's something different now. Not hope, exactly. Not even close. But... possibility. The possibility that I'm not uniquely broken. That other people feel this way. That some of them survived. That some of them got better. Or at least got different.

Uncle T survived his attempt five years ago. Now he's planning Christmas trips.

Maybe five years from now, I could be... somewhere else. Someone else. Maybe not happy. But alive. Functioning. Surviving.

It's not much to hold onto. But it's more than I had three days ago.

One more day, I think. I'll see about tomorrow.

And this time, the thought feels less like resignation and more like... what? Not quite hope. But maybe the beginning of something that could become hope. Eventually. Someday.

I close my eyes.

Outside, Lagos settles into its Sunday night rhythm. Generators humming. Dogs barking. Someone's TV playing a Nollywood movie too loud. The sounds of a city that doesn't sleep, that doesn't care if I'm here or not.

But I'm here. For now, that's enough.

Tomorrow, I'll see.`,wordCount:300},{page:39,chapter:"Chapter Four: Strangers Who Understand",content:`CHAPTER FOUR
Strangers Who Understand

The alarm goes off at 5 AM Monday morning. Same time as always. Same sound—that aggressive default iPhone alarm that feels like an attack.

I hit snooze. Then snooze again. Then force myself up because if I don't leave by 5:30, I'll miss the early danfo and the commute will take three hours instead of two.

I dress in the same routine. Work polo—I have three, rotate them, wash one every few days whether it needs it or not. Black trousers. Worn sneakers. Spray some deodorant even though I'll be sweating it off by the time I reach CMS.

I grab my phone, my wallet, my earphones. Lock my door. Walk past the other rooms in the compound—everyone still asleep at this hour except the early risers like me, the ones whose jobs demand we leave before the sun comes out.

Outside, the sky is that pre-dawn gray. Not quite dark, not quite light. Lagos is quieter now than it will be in two hours, but never actually quiet. Generators still running. A rooster crowing from somewhere. The Muslim call to prayer echoing from a nearby mosque. The city waking up slowly.

I join the queue at the danfo stop. About fifteen people already waiting, some half-asleep on their feet. The conductors start shouting as the yellow buses pull up: "CMS! CMS! One chance! Enter we dey go!"

I squeeze into a seat between a woman who smells like too much perfume and a man whose body radiates a stifling, nervous heat. We pull away, the conductor hanging out the door, hitting the side of the bus to signal the driver when to stop, when to go.

I put in my earphones. Not playing music—I just don't want anyone trying to talk to me. The bus ride is a blur of potholes, near-accidents, the conductor arguing with passengers about change, the driver cursing at other drivers in Yoruba.

Two hours later, I clock in at the warehouse at 7:02 AM.

Mr. Chen doesn't look up from his clipboard. "You're late."

"Sorry, sir. Traffic."

He waves his hand dismissively. "Start with section C. Quick quick."

I grab a scanner and head to section C. The fluorescent lights buzz overhead. The warehouse is already hot even though it's early. By noon it'll be unbearable.

I scan items. 3847B. 4729C. 6012A. Beep. Record. Stack. Move to the next. The rhythm of my life. The soundtrack of my existence.`,wordCount:350},{page:40,chapter:"Chapter Four: Strangers Who Understand (Continued)",content:`At 9 AM, Ibrahim appears with his usual greeting. "Bros! How far? How was your weekend?"

I glance at him. He's smiling, always smiling. How does he do that? How does he show up to this same job, this same warehouse, this same repetitive nothing, and still smile?

"It was okay," I say.

"Just okay? You no go anywhere? No party? No enjoyment?"

"No. Just stayed home."

"Ah ah, bros. You too serious. All work no play, you know. You need to enjoy small." He leans against a stack of boxes. "Me, I video called my family in Kano. My children dem dey grow fast. The small one, Aisha, she just start to talk. She dey call me on the phone: 'Daddy! Daddy!' My heart just full, you know?"

I nod because I don't know what else to do. Ibrahim talks about his family the way some people talk about football—with passion, with joy, with the certainty that this thing matters more than anything.

"When last you call your family?" he asks.

"Yesterday. I talked to my mum."

"That's good! Family is important. You know, that's what keeps me going here. I do this work, I suffer small, but I know say na for my family. Every month I send money home. That one sweet me pass anything."

He says this like it's simple. Like purpose can be that straightforward—work hard, send money home, support your family. Maybe for him it is simple.

For me, nothing is simple.

"Anyway," Ibrahim continues, "lunch time, make we go that buka for road. My treat today. I just collect salary, I fit afford am."

There it is. The invitation. Like clockwork. Every few days, Ibrahim asks. And every time, I decline.

But something in me hesitates today.

I think about the Facebook group. About Uncle T's post: Five years ago, I tried to end my life. Today I'm having breakfast with my wife and kids.

I think about the group description: You're not alone.

I think about Iya Alaje: Life too hard to carry alone.

What if I said yes? Just once. Just to see what happens.

"Okay," I hear myself say.

Ibrahim's eyes widen. "For real?"

"Yeah. Okay."

His smile gets even bigger. "Ah! Finally! I been dey try for months o! You go see, that buka rice sweet die. Oya, 1 PM we go."

He walks away, practically bouncing. Like I just made his day by agreeing to eat rice with him.

I stand there, scanner in hand, slightly stunned by what I just did.

I said yes.`,wordCount:400},{page:41,chapter:"Chapter Four: Strangers Who Understand (Continued)",content:`At 1 PM, Ibrahim finds me. "Bros! Time to chop!"

We walk to the buka—just a small roadside place with plastic chairs and tables, a woman cooking over a big pot, the smell of jollof rice and fried chicken making my stomach suddenly remember that I haven't eaten since yesterday's indomie.

"Two plates of rice with chicken," Ibrahim tells the woman. "And two bottles of Coke."

We sit at a plastic table under a tree. The buka is full of warehouse workers, truck drivers, people on their lunch break. Everyone eating quickly, efficiently, because break time is short.

Our food comes—massive plates of jollof rice, fried chicken, some coleslaw on the side. The rice is bright orange, glistening with oil. I can tell just by looking that it's going to be too spicy, too much, but my body doesn't care. I'm suddenly starving.

We eat in silence for a few minutes. Then Ibrahim says, "So bros, you been dey quiet pass normal these days. Everything okay?"

I chew slowly, buying time. "Yeah. Just work stress."

"Work stress." He nods. "I feel you. This work self, e no easy. But you know, sometimes na more than work stress. Sometimes na life stress."

I glance at him. He's looking at me with genuine concern.

"You get family here for Lagos?" he asks.

"Yeah. My parents are in Surulere. My sister is in Ibadan. My brother is at UNILAG."

"So you dey see them regular?"

"Not really."

"Why?"

Good question. Why don't I see them? Because seeing them means questions. Means pretending. Means feeling like a failure next to my successful sister and promising brother.

"Just busy," I say.

Ibrahim shakes his head. "Bros, I no dey see my family for three months now. Three months. You know how that one pain me? But you, your family dey Lagos and you no dey see them. That one no good o."

"It's complicated."

"Life always complicated. But family na family. Even when them annoy you, even when them no understand you, them still dey there. You get am for Lagos—use am."

He says this simply, like it's obvious. Like I should just call my parents, visit on weekends, act like a normal son.

But it's not that simple. Is it?`,wordCount:350},{page:42,chapter:"Chapter Four: Strangers Who Understand (Continued)",content:`We finish eating. Ibrahim insists on paying even though I offer. "I tell you say na my treat. Next time you fit pay."

Next time. He's already planning next time. Already assuming this will happen again.

And maybe it will. The rice was good. The conversation wasn't torture. Ibrahim is... nice. Actually nice. Not pitying me or trying to fix me. Just treating me like a person.

As we walk back to the warehouse, he says, "You know, bros, if something dey worry you, you fit talk. I no go judge. I just dey here."

I don't respond. But something in my chest loosens slightly.

I just dey here.

Such simple words. But they mean something.

The afternoon shifts by in the usual haze of scanning and stacking. But something is different. I said yes to lunch. Ibrahim noticed I'm struggling. The Facebook group exists on my phone, full of people who understand.

Small things. Tiny things. But they're accumulating.

At 4 PM, I clock out. The commute back to Ojuelegba is the usual nightmare—traffic, heat, bodies pressed together, conductor shouting. But I have my earphones in, and this time I'm actually playing music. Lo-fi hip-hop. Something calm. Something that makes the chaos bearable.

When I get home, Iya Alaje is sitting outside, fanning herself. "Eli! Welcome back. You look better today."

"Thank you, ma."

"You wan chop? I get rice—"

"Thank you, ma. I ate at work."

"Eh? You ate at work?" She looks surprised. "That's good. Very good. Make sure you defy eat proper food o, not just indomie."

"Yes, ma."

I go inside. Shower with the bucket of water I fetched yesterday. Change into worn shorts and a t-shirt. Sit on my bed with my laptop.

And I open the Facebook group.

I spend the next hour reading. Learning the rhythms of the community. Who posts when. Who responds to what. The inside jokes. The recurring themes.`,wordCount:320},{page:43,chapter:"Chapter Four: Strangers Who Understand (Continued)",content:`Someone posts: "Day 47 of therapy. Today my therapist asked what I do for fun and I realized I don't remember what fun is. So that was depressing."

The comments mix humor with support: "Fun? Never heard of her," "Your therapist really came for you like that huh," "But real talk, rediscovering fun is part of recovery. Start small."

Another post: "To everyone who got out of bed today: I see you. I'm proud of you. That counts."

Someone responds: "I didn't get out of bed today. Does that make me a failure?"

And immediately: "No. Tomorrow is another chance. No judgment here."

I keep reading. And then I see a post that stops me cold.

It's from someone named Sarah. Posted two hours ago:

"I've been planning my suicide for two months. Tonight feels like the night. I'm scared but also relieved. Does that make sense?"

My heart starts pounding.

The comments are already flooding in:

"Sarah, please call the crisis line: 080012345678. Please wait. Please."

"It makes sense. I've been there. The relief you feel is from the idea of pain ending, not from dying. There are other ways for pain to end."

"I almost did it three years ago. I'm so glad I didn't. Please give it one more day."

"We're here. You're not alone. Talk to us."

I stare at the post. At her words: I'm scared but also relieved.

I know that feeling. That exact feeling. The fear mixed with relief. The certainty that this is the only way. The exhaustion that makes death feel like rest.

I was her. Three days ago, I was her.

My hands are shaking as I type a comment:

"I almost did it last week. I wrote the note. I had a plan. I don't know why I didn't do it. But I'm glad I waited. Please wait too."

I hover over "Post Comment" for a full minute. Then I click.

The comment appears immediately. My first actual participation in the group. My first confession.

Within seconds, people respond—not just to Sarah, but to me:

Seun: "Welcome, guy. This space is safe."

Pastor Michael: "Brother, thank you for your honesty. You're not alone."

Uncle T: "Proud of you for being here, mate."

And Sarah replies to me directly: "Thank you. I'm waiting. Just for tonight. I'll see about tomorrow."

I'll see about tomorrow.

Those words. My words. The thought that kept me alive.

And now maybe they're keeping her alive too.`,wordCount:430},{page:44,chapter:"Chapter Four: Strangers Who Understand (Continued)",content:`Then a private message pops up. From someone named Chidinma Okafor.

I open it.

"Hi. I saw your comment. I've been there too—two years ago, I was exactly where you are. I'm glad you're here. If you ever want to talk, I'm here."

I stare at the message. A stranger. Offering to talk. Just because she saw my comment. Just because she's been there.

I don't know what to say. Don't know if I should respond. What would I even say?

But the message sits there. Waiting. An offer. A hand extended.

I type: "Thank you. I don't really know how to talk about this stuff. But thanks for reaching out."

I hit send before I can overthink it.

She replies almost immediately: "You don't have to know how. You just start. And it gets easier. Take your time. No pressure. I'm Dinma, by the way. I'm in Lagos too—Yaba."

"I'm Eli. Ojuelegba."

"Small world. Lagos can feel massive and tiny at the same time, right?"

"Yeah. Exactly that."

We message back and forth for a few minutes. Nothing deep. Just small talk about Lagos—the traffic, NEPA, the eternal struggle of living here. But it feels... nice. Normal. Like talking to someone who gets it without me having to explain.

Eventually she says: "I have to go—work stuff. But I'm glad you commented today. Glad you're here. Talk soon?"

"Yeah. Talk soon."

I close the laptop. Sit there on my bed, slightly stunned.

I commented on someone's post about suicide. I admitted I'd been there. People responded without judgment. Someone messaged me privately, offered to talk. And I talked.

Small things. But they feel huge.

That night, I can't sleep. Not because I'm miserable—well, I am, but it's different tonight. I keep thinking about the group. About Sarah saying she'll wait, just for tonight. About Dinma messaging me. About Ibrahim's lunch invitation. About Iya Alaje noticing I look better.

About the note in my wardrobe. The note that says: By the time you read this, I'll be—

But I'm not. I'm here. And today, for the first time in I don't know how long, I did more than just survive. I participated. I reached out. I let people in, even just a little.

It's not much. I'm still depressed. Still struggling. Still going to a job I hate, living in a room that's too small, feeling empty most of the time.

But I'm not completely alone anymore. There are people who understand. People who've been where I am. People who made it through.

And if they made it through, maybe I can too.

Just one more day, I think. I'll see about tomorrow.

But this time, tomorrow doesn't feel quite as terrifying.

This time, there's something to wake up for. Not much. Just a Facebook group. Just strangers who understand. Just the possibility that maybe, possibly, things could be different.

It's not hope. Not yet.

But it's close.`,wordCount:490},{page:45,chapter:"Chapter Five: The Facebook Confession",content:`CHAPTER FIVE
The Facebook Confession

Three weeks pass.

Not quickly. Depression doesn't make time move quickly. Each day still drags, still requires effort just to get through. But the days are... different now.

I have routines that aren't just survival. Monday through Friday: warehouse, lunch with Ibrahim, evening on the Facebook group. Weekends: Mummy's Sunday call, messages with Dinma, reading posts, occasionally commenting.

It's not much. But it's structure. It's connection. It's something other than just existing.

It's a Tuesday morning in early December when Ibrahim asks me something different.

We're at the buka, eating jollof rice that's too spicy but somehow perfect. He's telling me about his son learning to ride a bicycle—well, not a bicycle exactly, one of those small tricycles. He's showing me a video on his phone, and I'm actually watching, actually smiling at this little boy who looks exactly like Ibrahim, wobbling on the tricycle and laughing.

"He's going to fall," I say.

"I know. He go fall many times. But he go learn. That's how life is." Ibrahim puts his phone away. "Speaking of falling and learning—I defy go to this thing on Saturday. The youth for my church organize one small gathering. Nothing serious, just people wey dey worship together, eating, gisting. You fit come if you want."

I freeze mid-bite. "Church thing?"

"Yeah, but no be like service. Just people gathering. Some of us dey far from family, so we dey try make our own family here for Lagos. You go like am. Good food, good people."

"I don't know..."

"No pressure, bros. I just say make I invite you. If you come, good. If you no come, we still dey cool." He shrugs. "But I think e go do you good. You too dey lock yourself for house. Sometimes you need to just dey around people, you know?"

The thought of being around strangers at a church gathering gives me anxiety. Small talk. Pretending to be okay. Someone asking why I don't go to church anymore. Having to explain or lie or both.

But I think about the Facebook group. About how scared I was to post, and how it ended up being one of the best things I've done. About Dinma's message: You're not hard to see. You just needed the right people looking.

"Maybe," I hear myself say. "I'll think about it."

Ibrahim's face lights up. "That's all I ask. Just think about am."`,wordCount:340},{page:46,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`That evening, I message Dinma about it.

"Ibrahim invited me to a church gathering on Saturday. I don't know if I should go."

She responds within minutes: "Do you want to go?"

"I don't know. The idea of being around people exhausts me. But also... I'm tired of being alone all the time."

"That's fair. What's the worst that could happen?"

I think about that. "Awkward conversation. People asking questions I don't want to answer. Feeling out of place. Wanting to leave but being stuck there."

"Okay. And the best that could happen?"

I haven't thought about that. "I don't know. Maybe it's nice? Maybe I meet people who are cool?"

"So worst case, you're uncomfortable for a few hours. Best case, it's actually good. And if it's terrible, you leave. You're an adult. You can just go."

She makes it sound simple. Maybe it is simple and I'm making it complicated.

"When's the last time you did something social?" she asks.

"I eat lunch with Ibrahim every day now."

"That's huge! But I mean something outside work. Something just for you."

"Never? I don't know. Not since university, maybe."

"Eli, that's years. Don't you think it's time to try?"

I stare at her message. She's right. I've been isolating for years. And yes, it's safe. But it's also killing me slowly.

"Maybe you're right."

"I'm definitely right. Go to the church thing. If it's terrible, leave. But at least try. For me?"

"For you?"

"Yes. I'm invested in your recovery now. You're my friend. I want you to do things that might help."

Friend. She called me her friend.

When's the last time I had a friend? When's the last time someone claimed me like that?

"Okay. I'll go. Just for a little bit."

"Proud of you! Report back after. I want to hear everything."`,wordCount:300},{page:47,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`Saturday arrives too quickly.

I spend the morning anxious. Change my outfit three times. A t-shirt feels too casual. A button-up feels like I'm trying too hard. I settle on a polo shirt—the one I save for non-work occasions, slightly faded but clean.

Ibrahim told me the gathering is at someone's house in Ogba. I take a danfo there, arriving around 2 PM. The house is a small bungalow in a compound, music already playing—gospel, but the kind with drums and energy, not the kind with slow pace.

I stand outside for a full two minutes, debating whether to go in or turn around and go home.

Then I see Ibrahim at the gate. "Bros! You come! I defy happy o! Come, come."

He practically pulls me inside. The compound is full of people—maybe twenty, thirty—sitting on benches, on the ground, standing in groups. Kids running around. Someone grilling suya by the corner. The smell of jollof rice and fried chicken coming from inside the house.

"Make I introduce you," Ibrahim says, leading me to a group of people near the grill.

"This na my guy from work, Eli. Eli, this na my people—Chidi, Blessing, Pastor Jude, Sister Amaka..."

Names blur together. People smile, say "welcome," ask how I am. I mumble responses, feeling overwhelmed already.

"You want drink? Coke? Fanta?" Ibrahim asks.

"Coke is fine."

He disappears to get it, leaving me standing awkwardly with strangers. Chidi—or was it Pastor Jude?—asks what I do. I tell him warehouse work. He nods politely. Asks if I go to church. I say sometimes, which is a lie. He starts to invite me to his church but then someone calls him away, and I'm left alone again.

I should leave. This was a mistake. I don't belong here.

But then a woman approaches—older, maybe fifties, with a warm smile. "You must be Eli. Ibrahim talks about you all the time."

"He does?"

"Oh yes! 'My guy from work, he too quiet but he get sense.' That's you, right?"

I don't know what to say to that.

She laughs. "Don't look so surprised. Ibrahim likes you. He's worried about you, actually. Says you too defy stay alone." She gestures to a bench. "Come sit. I'm Mama Grace. I'm like everybody's mother here. We defy far from our families, so we make our own."

I sit because refusing would be rude. She sits beside me, fanning herself with a paper plate.`,wordCount:380},{page:48,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`"So Eli, where you from?"

"Surulere. My parents are there."

"Surulere! That's not far. You see them often?"

"Not really."

"Hmm. Why?"

The question is direct but not unkind. I struggle to answer.

"It's... complicated."

"Life always complicated." She says it like Ibrahim said it—like it's obvious. "But family is family. Even when they annoy you, even when they no understand you, them still your people. You too young to defy avoid your family."

"They don't really understand me."

"Who understand anybody completely? I been marry for thirty years, my husband still defy surprise me. Understanding is overrated. Presence is what matters."

I think about Mummy's Sunday calls. About how she doesn't understand my depression, but she calls anyway. About how Daddy helped with rent without making me explain why I needed help.

Presence. They've been present. I've been absent.

"Maybe you're right," I say quietly.

"I know I'm right. I'm old. Old people always right." She grins. "Now come, make we go chop before these children finish all the food."

I eat jollof rice and chicken with Mama Grace and a few others. The conversation flows around me—church gossip, complaints about Lagos, someone's cousin getting married, prayer requests for someone's sick mother. I don't contribute much, but no one seems to mind. They just include me naturally, like I belong.

After eating, some people start playing music—someone brought a guitar. They're singing worship songs, but informal, just for fun. Mama Grace is clapping along. Kids are dancing. Ibrahim is laughing at something Chidi said.

I sit on the edge, watching. Not participating but not completely outside either. Just... there.

And it's not terrible. It's actually... nice. Seeing people just exist together. Seeing community work. Seeing what it looks like when people choose to show up for each other.

Around 5 PM, I tell Ibrahim I need to go.

"So soon? We never even pray!"

"I know, but... I should get back."

He doesn't push. Just walks me to the gate. "Thank you for coming, bros. I know say e no easy for you. But you try. That one count."

"Thank you for inviting me."

"Anytime. Anytime you wan come, just tell me. We dey do this every month."`,wordCount:390},{page:49,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`On the danfo ride home, I think about what Mama Grace said. Presence is what matters.

I've been so focused on people not understanding me that I haven't appreciated people being there. Mummy calling every Sunday. Daddy helping with rent. Even Tola's occasional texts. They're present. In their way. Imperfectly. But they're there.

And I've been pushing them away because they don't understand.

Maybe understanding isn't the point. Maybe presence is enough.

That evening, I message the Facebook group:

"Update: I went to a social gathering today. First one in years. It was awkward. I didn't know what to say most of the time. But it was also... okay. People were nice. I didn't die from discomfort. Small wins."

The responses come fast:

Seun: "YOOO! Look at you being social! Proud of you, guy!"

Amara: "This is huge. I haven't gone to anything social in months. You're inspiring me."

Uncle T: "Mate, this is exactly how it starts. Small steps. Uncomfortable steps. They add up."

And Dinma: "I KNEW you could do it! See? Not as terrible as you thought, right?"

I smile at my phone. She was right. It wasn't as terrible as I thought.

The next day, Sunday, I do something I haven't done in months.

After Mummy calls—same time, 2:47 PM—and we talk for the usual fifteen minutes, I say: "Mummy, I'll come visit next Sunday. For lunch."

There's a pause. "You serious?"

"Yes. I'll come."

"Eh! God is good! Thank you, my son! I will cook your favorite. Amala and ewedu!"

"Thank you, Mummy."

When I hang up, I feel nervous. Visiting means questions. Means Daddy's disappointed looks. Means Tola and her perfect life if she's visiting. Means Deji's energy that makes me feel even more inadequate.

But I said I'd go. And I need to try.

Presence matters. Even imperfect presence.

Tuesday at work, something shifts with Ngozi.

I'm walking past her desk and she calls out: "Eli! Wait!"

I stop. "Yeah?"

"I've been wanting to ask—you like reading?"

"Uh... sometimes. Why?"

She pulls out a book from her bag. "I just finish this one. Nigerian author. E sweet die. I think you go like am."

She hands it to me. Americanah by Chimamanda Ngozi Adichie. I've heard of it but never read it.

"I don't know if I have time—"

"Just try am. Return am when you finish. No pressure."

I take the book because refusing would be weird. "Okay. Thank you."

"You're welcome! And Eli?"

"Yeah?"

"I happy say you dey talk more these days. You used to just grunt and walk past. This one is better."

She says it with such genuine warmth that I don't know how to respond.

"I'm trying," I finally say.

"Good. Keep trying."`,wordCount:460},{page:50,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`That night, I start reading the book. Just a few pages. Then a few more. Then I can't stop.

It's about a Nigerian woman navigating identity, belonging, depression, love, Lagos vs. America. About feeling like an outsider everywhere. About trying to figure out where you fit.

I read until 1 AM. Until my eyes hurt. Until I have to force myself to stop because I have work in the morning.

When's the last time I read for pleasure? Years. Maybe since university.

But this book—it's giving me something. Not answers. But recognition. The feeling of seeing yourself in someone else's story.

I message Dinma: "Ngozi at work gave me a book. I haven't been able to put it down. When did reading become something I forgot I liked?"

She responds even though it's late: "That's how depression works. It makes you forget what you enjoyed. But you're remembering now. That's good. That's recovery."

"Is that what this is? Recovery?"

"What else would you call it?"

I think about the past few weeks. Lunch with Ibrahim. The church gathering. Visiting family next Sunday. Reading. Posting in the Facebook group. Talking to Dinma daily.

Small things. Uncomfortable things. Things that require effort.

But they're things. Actions. Not just surviving. Actually doing.

"I guess you're right. It doesn't feel like recovery. It just feels like... trying."

"Trying IS recovery. There's no magic moment where you suddenly feel better. It's just trying, every day, even when it's hard."

"When does it stop being hard?"

"I don't know. Maybe it doesn't. Maybe we just get better at doing hard things."

I read her message three times. Maybe we just get better at doing hard things.`,wordCount:280},{page:51,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`Sunday comes. I dress in proper clothes—not work clothes, not stay-at-home clothes, but actual going-somewhere clothes. I take a danfo to Surulere, nervous the entire way.

When I arrive at the compound, everything looks the same. The house. The neighbors. Mama Chinedu selling akara by the gate. She sees me and calls out: "Eh! Eli! Long time!"

"Good afternoon, ma."

"Your mama go dey happy o. She been dey talk about you coming."

I walk to the door. Knock. Mummy opens it, and her face lights up.

"Eli mi! You come! Come inside, come inside!"

The house smells like home—amala cooking, ewedu, the onions and peppers Mummy uses in her stew. Everything familiar. Everything I've been avoiding.

Daddy is in the living room, reading a newspaper. He looks up. "Eliora."

"Good afternoon, sir."

He nods. Goes back to his newspaper. But I see the corner of his mouth twitch slightly. Not quite a smile, but close.

Deji is there too, on the couch with his phone. "Bros! You finally show your face! Where you been?"

"Just working. Busy."

"Too busy to see family? That's cold, bro."

Mummy swats him. "Leave your brother. He's here now. That's what matters."

We eat lunch together. Mummy serves too much food, as always. The amala is perfect—smooth, thick, exactly how I like it. The ewedu is slimy and delicious. The stew is spicy enough to make my eyes water.

We don't talk about anything deep. Just surface things. Daddy's shop doing better. Tola visiting next weekend. Deji's project presentation. Mummy's students preparing for exams.

Normal family conversation. To be honest, I miss having this kind of conversation.

After lunch, I help Mummy wash dishes. She's humming a worship song.

"Eli mi, I happy you come," she says, not looking at me, focused on scrubbing a pot.

"I should come more often."

"Yes. You should. I'm your mother. I miss you."

Something in my chest cracks open. When's the last time someone said they missed me?

"I miss you too, Mummy."

She glances at me, eyes shining. "Then don't stay away so long. Promise me."

"I promise."`,wordCount:340},{page:52,chapter:"Chapter Five: The Facebook Confession (Continued)",content:`On the danfo ride back to Ojuelegba, I feel exhausted. Social interaction always exhausts me. But it's different from the bone-deep exhaustion of depression.

This is the exhaustion of effort. Of showing up. Of trying.

And beneath the exhaustion, there's something else. Something small and fragile.

Not quite happiness. But not despair either.

Maybe this is what healing looks like. Not dramatic transformation. Just small actions, accumulating. Saying yes instead of no. Showing up instead of hiding. Reaching out instead of pulling away.

I message Dinma: "I visited my family today. It was good. Exhausting but good."

"I'm so proud of you. That's huge."

"It doesn't feel huge. Just feels like lunch."

"Sometimes the huge things feel ordinary when you're doing them. But they're not. You're doing the work. Keep going."

That night, I update the Facebook group:

"Progress report: Had lunch with my coworker three times this week. Went to a social gathering. Visited my family. Started reading again. Small things. But they're adding up. For the first time in years, I'm not just surviving. I'm trying. And maybe that's enough."

I also did something I'd been avoiding: I messaged Seun for that therapist recommendation he'd offered back in December.

He responded within an hour with the name, fee and location of a professional—Dr. Okonkwo in Ikeja—₦20,000 per session.

I stared at the fee. ₦20,000 was more than a quarter of my monthly salary. But I saved the message. Didn't make an appointment yet. Didn't even know if I was ready.

But I saved it. That felt like something.

Forty-three people react. Twenty-two comments. Every single one some variation of: Proud of you. Keep going. This is what recovery looks like.

And I realize: they're right.

This is recovery. Not feeling better. Not being cured. Just doing things differently. Choosing connection over isolation. Choosing presence over absence. Choosing to try, even when it's hard.

It's a start, and for now, this is enough.`,wordCount:350},{page:53,chapter:"Chapter Six: Learning to Reach",content:`CHAPTER SIX
Learning to Reach

The Facebook group announces a meetup.

I see the post on a Wednesday evening in late December. Pastor Michael is visiting Lagos for a conference and suggests gathering—anyone interested, no pressure. The location: Terra Kulture in Victoria Island. Saturday afternoon. Just coffee and conversation.

My first instinct is to scroll past. Pretend I didn't see it. Keep things online where they're safe.

But then Dinma messages me privately: "You going to the meetup?"

I stare at her message. "I don't know. Nervous."

"Me too. But I think I'm going to try. It would be nice to meet people who get it. And... I'd like to meet you. If you're comfortable."

I read that last sentence five times. I'd like to meet you.

We've been messaging for over a month now. Daily conversations about everything—work stress, family drama, Lagos frustrations, books we're reading, films we've watched. She knows about the suicide note. About the warehouse. About my family. About the depression that still sits heavy on some days.

And she still wants to meet me.

"What if it's awkward?" I type. "What if I don't know what to say?"

"Then it's awkward. We figure it out. No pressure. Just coffee."

"What if I'm disappointing in person?"

"Eli, I've read your suicide note. I've heard about your worst days. I've seen you vulnerable and honest and scared. You couldn't disappoint me if you tried."

I sit with that. She's seen me at my worst—through words, at least. And she still wants to meet.

"Okay. I'll go. Just stay a little bit."

"That's all I'm asking. Just try."`,wordCount:250},{page:54,chapter:"Chapter Six: Learning to Reach (Continued)",content:`I tell Ibrahim about it at lunch the next day.

"You go meet people from the internet?" He looks concerned. "Bros, you sure say e safe?"

"It's a support group. For mental health. And it's in a public place."

"Mental health support for computer?" He looks confused.

"No. Online. Like Facebook."

"Oh! Facebook!" His face clears. "You get mental health group for Facebook?"

"Yeah. It's... it's been helping me. These past few weeks. It's why I've been better."

Ibrahim studies me. "You been going through something. I know. I been wondering but I no wan pry. This Facebook thing help you?"

"Yeah. A lot."

He nods slowly. "Okay. That's good. You need help, you take help. No shame in that." He pauses. "But this meeting—you dey go alone?"

"Yeah."

"You want me to come? I fit wait outside. Just in case."

The offer catches me off guard. "You'd do that?"

"Bros, you be my guy. If you defy nervous, I fit defy there. I no need to go inside. I just defy close by."

Something warm spreads through my chest. "Thank you. But I think I need to do this alone."

"Okay. But call me if anything. You hear?"

"I hear."`,wordCount:200},{page:55,chapter:"Chapter Six: Learning to Reach (Continued)",content:`Saturday arrives with the weight of inevitability.

I change my outfit four times. Jeans feel too casual. Trousers feel like I'm trying too hard. I settle on jeans and a plain t-shirt—the blue one that's not faded yet. Spray deodorant. Check my hair in the mirror. It's low-cut like always, nothing special. I look... ordinary. Exactly like what I am: a twenty-six-year-old warehouse worker with a business degree he's not using.

Will Dinma be disappointed? Will she see me and realize she's been messaging someone painfully average?

I almost don't go. Almost text her that I'm sick. Almost stay in my room where it's safe.

But I think about the past month. About Ibrahim's church gathering. About visiting family. About all the uncomfortable things I've done that turned out okay.

Just try, Dinma said. Just try.

I leave my room at noon. The danfo to VI takes forever—Lagos traffic on Saturday is its own special hell. By the time I reach Terra Kulture, I'm sweating despite the harmattan breeze, my t-shirt sticking to my back.

The venue is beautiful. More beautiful than I expected. Not some dingy spot but an actual cultural center—art on the walls, a bookshop in the corner, outdoor seating area with umbrellas and plants. The kind of place I'd normally feel too out of place to enter.

But I see someone waving from a table in the outdoor section. A guy in his late twenties with glasses and a bright patterned shirt.

"Eli?" he calls out.

I walk over, trying not to seem as nervous as I feel. "Yeah. Hi."

"Guy, I'm Seun!" He stands and practically bounces toward me, extending his hand. His handshake is firm, enthusiastic. "I'm so glad you came! This is Pastor Michael—" He gestures to an older man in casual clothes, warm smile, maybe late thirties. "And this is Amara—" A young woman with braids, shy smile, maybe early twenties.

"Nice to meet you," I manage.

"And I'm Dinma."

I turn.

She's standing slightly apart from the group. Jeans. Graphic tee that says "Ctrl+Alt+Delete Your Problems." Natural hair in twists. Glasses. About my height, maybe slightly shorter.

She's real. Actually real. Not just words on a screen but a person standing in front of me.

"Hi," I say. It comes out quieter than I intended.

"Hi." She smiles. A warm, genuine smile. "You made it."

"Yeah. I almost didn't."

"Me too. But here we are."

For a moment we just look at each other. This is the person I've been messaging every day. The person who knows about the suicide note, the warehouse, the depression. The person who said I'm not hard to see.

And she's real. And I'm real. And we're both here.`,wordCount:480},{page:56,chapter:"Chapter Six: Learning to Reach (Continued)",content:`"You want coffee?" she asks. "I'm buying. You came all the way from Ojuelegba—that's a journey."

"You don't have to—"

"I want to. Come on."

We walk to the counter together. The others chat behind us, giving us space.

"You're real," I say, then immediately feel stupid. "Sorry, that's weird."

Dinma laughs—a genuine, warm sound. "So are you. I was worried I'd built you up in my head and reality would be disappointing."

"And?"

"You're not disappointing." She orders—cappuccino for herself and regular black coffee for me. "Actually, you're exactly what I expected. Quiet. Thoughtful. A bit nervous."

"Very nervous."

"Me too. But in a good way."

We return to the table with our coffee. The conversation flows surprisingly easily. Seun is exactly as online—funny, warm, open. He talks about his graphic design work, about managing bipolar disorder, about being gay in Lagos without actually saying the words directly but making it clear enough.

"It's a whole thing," he says with a grin. "But we move."

Pastor Michael talks about his breakdown three years ago. How he hid it from his congregation until he couldn't anymore. How getting help saved his marriage, his ministry, his life.

"Mental illness isn't spiritual failure," he says firmly. "That's what I tell my church now. Go to therapy. Take your medication. God gave us doctors for a reason."

Amara shares about post-graduation anxiety. Her parents' confusion about why she's "sad when she has a degree." Her poetry as an outlet.

"They keep asking what's wrong with me," she says softly. "Like I can just explain it. Like there's a reason."

"There doesn't have to be a reason," Dinma says. "Sometimes you're just struggling. And that's valid."

And then they turn to me. "What about you, Eli? How you doing?"

I'm not good at this. At talking about myself. At being vulnerable in person.

But I think about my post in the group. About how scared I was to share my story and how it ended up helping people.

"I wrote a suicide note five weeks ago," I say quietly. "I was going to do it. My phone died before I finished. I don't know why I didn't follow through. But I didn't. And then I found the group. And... I'm still here."

The table is silent for a moment. Then Seun reaches across and squeezes my shoulder. "Guy, thank you for sharing. And thank you for staying."

"We're glad you didn't go through with it and that you're here today," Pastor Michael says simply.

"Your post about that helped me," Amara says. "I was having a really bad night and I read it and thought: if he can wait one more day, maybe I can too."

I don't know what to say to that. How do you respond when someone tells you your survival helped them survive?

"Thank you," I manage. "For being here. All of you."`,wordCount:450},{page:57,chapter:"Chapter Six: Learning to Reach (Continued)",content:`We talk for two hours. About Lagos, about mental health, about the absurdity of Nigerian families who think depression is a "white people problem." About medication, therapy, coping mechanisms. About bad days and good days and the days in between.

It's the most honest conversation I've had in years. Maybe ever. No pretending. No performing. Just people admitting the hard stuff and supporting each other through it.

Eventually Pastor Michael checks his watch. "I have to head out—evening service. But this was beautiful. We should do this more often."

Amara nods. "I need to catch my bus to Ikeja. But yes. Let's meet again."

Seun gets a call—his fiancé wondering where he is. "Guy, I gotta run. But Eli, bros, I'm so happy to finally meet you face-to-face. Let's link up again soon, yeah?"

One by one, they leave. Until it's just me and Dinma.

"You want to walk around a bit?" she asks. "I'm not ready to get on a bus yet."

"Yeah. Okay."

We walk through the art gallery section of Terra Kulture. Paintings and sculptures by Nigerian artists. We don't talk much. Just look at the art, occasionally commenting.

We stop in front of a painting—a woman standing alone in a crowded market, somehow isolated despite the people around her.

"That was me two years ago," Dinma says quietly. "Surrounded by millions in Lagos. Completely alone."

"Me too," I say.

She looks at me. "But not anymore, right? Not completely?"

"Not completely," I agree.

We keep walking. Pass a sculpture of tangled metal that somehow forms a recognizable human figure. Pass a painting of Ojuelegba—I recognize the junction, the chaos, the yellow danfo buses.

"That's near where I live," I say, pointing.

"Really? I've been there. It's chaotic."

"That's putting it mildly."

She laughs. We end up at the bookshop section, browsing titles. She picks up a book, shows it to me. "Have you read this?"

"No. Is it good?"

"I don't know yet. But the cover looks interesting."

"That's how I choose books too."

"By the cover? That's terrible criteria."

"It's worked so far."

We exchange phone numbers—real phone numbers, not just Facebook Messenger. Make tentative plans to meet again. Maybe next week. Maybe at a buka in Yaba—cheaper than VI, closer for both of us.

As I get ready to leave, I say: "Thank you."

"For what?"

"For messaging me that first time. For... seeing me."

"Eli, you're not hard to see. I keep telling you that." She smiles. "But you're welcome. Thank you for replying. For being brave enough to keep showing up."

On the danfo ride home, I can't stop thinking about the day.

I met people from the internet and didn't die of awkwardness. I had real conversations with real people about real things. Seun is exactly as funny in person as online. Pastor Michael is genuinely warm. Amara is sweet. And Dinma...

Dinma is real. Not just a profile picture or words on a screen. A person. With braids and glasses and a laugh that makes me want to make her laugh again.`,wordCount:500},{page:58,chapter:"Chapter Six: Learning to Reach (Continued)",content:`I message the group when I get home:

"Attended the meetup today. Met some of you in person. It was terrifying and wonderful and I'm so glad I went. Thank you for existing. Thank you for showing up. Thank you for being real."

The responses come quickly:

Seun: "It was so good meeting you, guy! Next time we're doing this, I'm buying the coffee. Your turn to pick the place."

Pastor Michael: "Brother Eli, your presence blessed us today. Thank you for your courage."

Amara: "Meeting you made everything feel more real. More hopeful. Thank you."

And Dinma: "I had a really good time. Let's do it again soon? Same time next week?"

"Same time next week," I confirm.

That night, I lie in bed thinking about the painting—the woman alone in the crowd.

That was me. For years. Invisible in a city of twenty million people. Drowning in crowds.

But today I wasn't alone. I was with people. Real people. People who see me. People I'm learning to see.

The suicide note is still in my wardrobe. I haven't forgotten about it. Haven't forgotten how close I came.

But it feels further away now. Like something that happened to a different version of me.

Five weeks ago, I was ready to die. Today, I met friends for coffee and made plans for next week.

Things can change. Not magically. Not overnight. But slowly, with effort, with small scary steps.

I think about Dinma's smile. About Seun's enthusiastic handshake. About Pastor Michael's warmth. About Amara saying my post helped her.

I think about the next meetup. About seeing Dinma again. About maybe, possibly, this being the beginning of something.

Not a cure. Not "better." But different. A different way of existing. A different way of being in the world.

With people. With connection. With the possibility that maybe, just maybe, there are things worth staying for.

I'm still Eli. Still introverted. Still working a warehouse job I hate. Still living in Ojuelegba in a room that's too small. Still struggling with depression that comes and goes.

But I'm not alone anymore.

And that's something. That's everything.

I fall asleep thinking about next Saturday. About coffee with Dinma. About having something to look forward to.

And for the first time in years, looking forward doesn't feel impossible.`,wordCount:390},{page:59,chapter:"Chapter Seven: The First Meeting",content:`CHAPTER SEVEN
The First Meeting

The next Saturday, I meet Dinma at a buka in Yaba.

Not Terra Kulture this time—too expensive to make it a regular thing. Instead, we're at a roadside spot with plastic chairs and tables, a woman frying plantain in a massive frying pan, the smell of jollof rice making my stomach rumble even though I ate breakfast.

Dinma is already there when I arrive, sitting at a table under a faded umbrella, scrolling through her phone. She looks up as I approach, and her face brightens.

"You came," she says.

"Did you think I wouldn't?"

"I don't know. People say they'll come and then... life happens."

I sit across from her. "I'm here."

"You're here."

We order—two plates of jollof rice with chicken, two bottles of Coke. The food comes quickly, steaming hot, the rice bright orange and glistening with oil.

"This looks amazing," Dinma says.

"Better than Terra Kulture?"

"Different. But yes, maybe better." She takes a bite, closes her eyes. "Oh my God. This is incredible."

We eat in comfortable silence for a few minutes. Then she asks, "How was your week?"

"Same as always. Warehouse. Ibrahim. NEPA taking light every night. You?"

"Work was stressful. My manager keeps piling on projects like I don't have deadlines. But I'm managing." She pauses. "I've been thinking about last Saturday. About meeting everyone."

"Me too."

"It was nice, right? Meeting people who get it."

"Yeah. It was... I don't know. Validating, I guess. Seeing that you're all real. That the support isn't just words on a screen."

Dinma nods. "That's exactly it. Online is good. But being in the same space, seeing faces, hearing voices—it's different."

"Different how?"

She thinks about it. "More real. More accountable, maybe. When someone says 'I'm here for you' online, it's easy. But when they show up in person, sacrifice their Saturday, travel across Lagos—that means something."

I think about Seun traveling from Lekki. About Pastor Michael making time despite his busy schedule. About Amara coming all the way from her side of Lagos.

About Dinma being here now, sharing jollof rice with me at a roadside buka when she could be anywhere else.

"You're right," I say. "It does mean something."`,wordCount:340},{page:60,chapter:"Chapter Seven: The First Meeting (Continued)",content:`We finish eating and sit there talking. About everything and nothing. She tells me about growing up in Enugu, about moving to Lagos two years ago for work, about how lonely she felt at first.

"I'd walk through Yaba market and see thousands of people and feel completely alone," she says. "Like I was a ghost. People moved around me, through me, but nobody saw me."

"I know that feeling."

"I know you do. That's why I messaged you that first time. I saw your comment on Sarah's post and I thought: he gets it. He's been there."

"Why did you almost not message me?"

She looks surprised. "How did you know I almost didn't?"

"You told me. That first week."

"Oh. Right." She fidgets with her Coke bottle. "I was scared. What if you didn't reply? What if I said the wrong thing? What if you thought I was weird for reaching out to a stranger?"

"I didn't think that."

"I know. But I didn't know that then." She smiles slightly. "I'm glad I took the risk."

"Me too."

We're quiet for a moment. Around us, Lagos continues—okadas zipping past, hawkers calling out their wares, someone's radio playing Afrobeats too loud. The chaos we've both learned to live with.`,wordCount:210},{page:61,chapter:"Chapter Seven: The First Meeting (Continued)",content:`We start meeting every Saturday after that.

Sometimes at bukas. Sometimes at Muri Okunola Park when we can afford the entrance fee. Once at a tech meetup she invites me to—I feel completely out of place surrounded by developers talking about coding languages I don't understand, but I go anyway because she asked.

We text every day. Not just about depression or struggles, but about everything. She sends me memes about area boys. I send her photos of the most ridiculous things I see at the warehouse—a box labeled "Fragile" that's completely crushed, a delivery guy sleeping in his truck at noon, the way the fluorescent lights make everything look slightly dystopian.

"You should take more photos," she says one Saturday. We're at the park, sitting on the grass (she insisted—"We're paying ₦500 to enter, we're using the grass").

"I just take them on my phone. Nothing special."

"So? Some of the best photographers started with phone cameras. You have an eye for things. You notice what other people miss."

"Like what?"

"Like that photo you sent me of the warehouse at dawn. The way the light came through the high windows. The empty shelves. It was beautiful. And sad. But mostly beautiful."

"You thought that was beautiful?"

"Yeah. It showed loneliness but also... I don't know. Potential. Like waiting for something to fill the space."

I think about that. The empty warehouse. Waiting to be filled.

Maybe that's what I am too. Empty but waiting. Ready to be filled with something that matters.

"You should take more," Dinma says again. "Start really looking at things. Lagos is full of moments people miss because they're rushing. You could capture them."

"I wouldn't know where to start."

"Start with what you see every day. The danfo rides. The compound. The warehouse. Document your life. See what happens."`,wordCount:300},{page:62,chapter:"Chapter Seven: The First Meeting (Continued)",content:`So I start taking photos. Really taking them, not just random snapshots.

I photograph the danfo interior at dawn—the empty seats, the way the early light filters through dirty windows, the conductor's hand hanging out the door.

I photograph Ibrahim laughing at lunch, mid-sentence, full of life and expression.

I photograph Ngozi at her desk, surrounded by papers, that determined look she gets when she's focused.

I photograph Iya Alaje sweeping the compound, the broom making patterns in the dust.

I photograph my own room—the smallness of it, the cracked ceiling, the single bulb, the wardrobe where the note is hidden. Not to document despair but to document reality. This is where I am. This is where I'm surviving.

I show some to Dinma. She studies them on my phone, zooming in, looking carefully.

"Eli, these are really good."

"They're just phone photos."

"They're more than that. They tell stories. This one of Ibrahim—you can see his whole personality in one frame. And this one of your room... it's not sad. It's honest. That matters."

"You think?"

"I know. You should do something with these."

"Like what?"

"I don't know. Instagram, maybe? Or just keep them for yourself. But don't stop. This is something you're good at. And you need to have something you're good at that isn't just surviving."

Her words stay with me. Something you're good at that isn't just surviving.

I've been surviving for so long I forgot there could be other things. Other purposes.

Maybe photography could be that. Not a career—I'm realistic. But something. A reason to pay attention. A reason to notice beauty in places I'd normally see only emptiness.`,wordCount:300},{page:63,chapter:"Chapter Seven: The First Meeting (Continued)",content:`It's mid-March when things shift between us.

We're at Muri Okunola Park again. She's telling me about a panic attack she had at work last week—hid in the bathroom for twenty minutes trying to breathe, her coworker found her and asked if she was okay.

"I told her I was fine," Dinma says. "Just stressed. She didn't push. But I felt so weak, you know? Like I should be past this by now."

"You're not weak," I say.

"How do you know? You've seen me cry via text multiple times."

"Because you keep going. You get panic attacks and you still show up to work. You have bad days and you still help other people in the group. That's not weakness. That's strength."

Dinma looks at me—really looks at me. "When did you get so wise?"

"I'm not wise. I'm just repeating what you said to me in January."

She laughs, then her expression softens. "Eli, can I tell you something?"

"Yeah."

"I'm glad you didn't finish that note. I'm glad your phone died. I'm glad you're here." She pauses, looking down at her hands. "I know we met because we were both struggling. But lately... I've been thinking that even if I wasn't struggling, I'd still want to know you. Does that make sense?"

My heart is pounding. "Yeah. It makes sense."

"Good." She looks up, her eyes locking with mine. "Because I like you. Not just as a friend who gets the depression thing. I just... like you."

For a moment, I can't breathe. Someone likes me. Not tolerates me. Not feels sorry for me. Likes me.

"I like you too," I manage. "I've liked you for a while."

"How long is a while?"

"Since Terra Kulture, maybe. Or before that. I don't know. I'm not good at this."

Dinma smiles—that warm, genuine smile I've come to recognize. "Neither am I. But maybe we can figure it out together?"

"Yeah," I say. "Yeah, we can try."

She reaches for my hand. This time, I hold on tighter.

We don't kiss that day—it feels too fast, too much. But we hold hands as we walk back to the park entrance. We hold hands on the danfo ride to Yaba (we're going the same direction anyway). We hold hands until we have to split up—her to her flat, me to Ojuelegba.

And I feel something I haven't felt in years: hope. Not the fragile, tentative hope of "maybe I won't die today." Real hope. The kind that imagines a future. Dinma in my future. Possibilities in my future.`,wordCount:430},{page:64,chapter:"Chapter Seven: The First Meeting (Continued)",content:`That night, I message the Facebook group:

"Update: I have someone I really care about. Her name is Dinma. I met her here. We've been talking for months. Today she told me she likes me. I told her I like her too. This doesn't fix everything. I still have bad days. But having someone who sees me, who chooses me—that means something. Thank you for existing so we could find each other."

The responses flood in:

Seun: "YOOOOO! My guy! I'm so happy for you! When's the wedding?"

Pastor Michael: "This is beautiful, Brother Eli. God is good. We're celebrating with you."

Amara: "This gives me so much hope. Congratulations!"

Uncle T: "Mate, remember when you wrote that note five months ago? Look at you now. This is what staying looks like. So proud."

Five months ago. That's all it's been. Five months since I sat in the dark writing my suicide note, convinced nothing would ever change.

Now I have Dinma. I have the group. I have Ibrahim at work, lunch twice a week now. I have Ngozi who always brightens when she sees me. I have Iya Alaje who insists on feeding me at least once a week. I have my mother's Sunday calls, which I answer more often than not now. I have photography—something that makes me look at the world differently.

I still work at the warehouse. I still make ₦65,000. I still live in Ojuelegba in a room barely bigger than a closet. None of the external circumstances have changed.

But everything has changed.`,wordCount:230},{page:65,chapter:"Chapter Seven: The First Meeting (Continued)",content:`Dinma and I become official in late March. We don't make a big announcement. Just start calling each other boyfriend and girlfriend. Start planning our weeks around each other. Start thinking in terms of "we" instead of just "I."

She comes to visit my place for the first time in April. I'm nervous—it's so small, so shabby compared to her shared flat in Yaba. But she steps inside, looks around, and says, "It's cozy. Very you."

"It's tiny."

"So? It's yours. That is what matters."

We sit on my bed and talk. At some point, she notices the wardrobe.

"Is that where you keep it? The note?"

"Yeah."

"Can I ask why you kept it?"

"I don't know. Proof, maybe? That I was there. That I didn't go through with it. Sometimes I need to remember how close I came. How different things are now."

Dinma is quiet for a moment. "Do you ever think about... doing it again?"

The question is harder now that we're together. Scarier. Because now it's not just about me.

"Sometimes," I admit. "Bad days, I still think about it. But it's different. Before, it felt like the only option. Now it feels like... a thought I have. A dark thought. But just a thought. I don't make plans anymore. I don't research methods. I just... have the thought, and then I text you or the group or I call Ibrahim. And it passes."

"Good," Dinma says. "That's good. And if it doesn't pass? If it gets bad again?"

"Then I'll tell you. I promise."

"Okay." She takes my hand. "I'm not here to fix you, Eli. I can't fix you. But I'm here. Whatever that's worth."

"It's worth everything," I say.`,wordCount:260},{page:66,chapter:"Chapter Seven: The First Meeting (Continued)",content:`In April, I finally made the appointment with the therapist Seun recommended.

I'd been staring at Dr. Okonkwo's contact information since March, the message from Seun still saved in my phone. ₦20,000 per session. I'd done the math a hundred times—could I afford it? Should I wait until I had more saved? But Dinma kept gently suggesting it, and the Facebook group kept sharing their therapy wins, and one Tuesday morning I just... called.

Dr. Okonkwo's office was in Ikeja. Small, with motivational posters on the walls that felt slightly patronizing but well-meaning. The first session was awkward. She asked me questions I didn't know how to answer. "How long have you been feeling this way?" Since forever? Since I could remember?

"Tell me about your support system." What support system? Then I realized—I had one now. Dinma. Ibrahim. The Facebook group. Iya Alaje. My family, in their imperfect way.

"That's good," Dr. Okonkwo said. "Community is crucial. But you also need clinical support."

By the third session, she suggested medication. Antidepressants. The idea terrified me—what if they changed who I was? What if they didn't work? What if I became dependent?

"They're not magic," she said. "They won't fix everything. But they can make the bad days less crushing. Give you space to do the work."

Small white pills every morning with breakfast. The side effects hit in the first week—nausea, headaches, feeling slightly disconnected. But Dr. Okonkwo said to push through, that it would stabilize.

She was right. By week three, I noticed something. Not happiness—I still wasn't happy. But the weight was lighter. The darkness wasn't as suffocating. Getting out of bed didn't feel impossible, just hard. Hard I could work with.

I still had bad days. Still had moments where I wondered if any of this was worth it. But I went. I kept going. Added therapy to the list of things I was doing to stay alive.

It wasn't a cure. Dr. Okonkwo kept reminding me of that. "This is management, not elimination. You're learning to live with depression, not erase it."

But management was more than I'd had before. Management meant I could function. Could work. Could love Dinma. Could take photos. Could show up.

And showing up was everything.`,wordCount:350},{page:67,chapter:"Chapter Eight: Something Worth Fighting For",content:`CHAPTER EIGHT
Something Worth Fighting For

One Saturday in May, Dinma convinces me to do something I never thought I'd do.

There's a local art exhibition organized by a collective in Yaba. Small, nothing major. They're accepting photo submissions.

"You should submit," she says.

"Submit what? My phone photos?"

"Yes! They're good, Eli. Better than good."

"They're just pictures of Lagos. Of my life. Nothing special."

"That's exactly what makes them special. Most people photograph Lagos like it's this exotic thing. You photograph it like it's home. Like it's real. That matters."

I'm skeptical. But she's so insistent that I finally agree to submit three photos: the danfo conductor mid-shout, Iya Alaje sweeping the compound, and the warehouse at dawn.

Two weeks later, I get an email.

They want to display the warehouse photo. Opening reception in June.

I read the email five times before it feels real.

"I got in," I tell Dinma over the phone, voice shaking.

"Of course you did! I knew you would!"

"It's just one photo. In a small exhibition. It's not a big deal. Right?"

"Eli," she says firmly. "It IS a big deal. Six months ago, you were playing Clash of Clans and feeling like your life meant nothing. Now you're being exhibited. That's growth. That's proof you're creating something real."`,wordCount:210},{page:68,chapter:"Chapter Eight: Something Worth Fighting For (Continued)",content:`The exhibition opening is terrifying.

I almost don't go. But Dinma picks me up—literally comes to Ojuelegba, refuses to let me back out.

The space is small—a converted warehouse (ironically) in Yaba, white walls, twenty artists displaying work. And there, on the wall, is my photo. Printed large. Framed. With a small placard: "Warehouse Dawn" by Eliora Adetayo.

My name. My work. On a wall. Where people can see it.

A few people stop to look. One woman says to her friend, "I love this one. It's so quiet. So lonely, but beautiful."

Lonely. Yes. But beautiful too. She gets it.

Seun shows up (he lives in Lekki but makes the trip). Ibrahim somehow finds out and comes straight from work, still in his warehouse uniform. Even Iya Alaje appears briefly—Dinma told her, apparently.

"This is you?" Iya Alaje asks, pointing at the placard.

"Yes, ma."

She looks at the photo for a long time. "It's good. You're talented. I didn't know."

"I didn't know either," I admit.

She pats my shoulder. "Keep doing it. The world needs to see what you see."

That night, I create an Instagram account: @LagosUnseen and post a photo—my first Instagram post ever. Me standing next to my framed photo at the exhibition.

Caption: "Six months ago I wrote a suicide note. Tonight my photo is on a wall at an art exhibition. Life is strange. I'm glad I stayed to see this."

No one sees it. I have zero followers. But it exists.`,wordCount:260},{page:69,chapter:"Chapter Eight: Something Worth Fighting For (Continued)",content:`Later that night, I'm lying in bed, unable to sleep. Not from anxiety. From something else. Something I can't quite name.

Dinma is beside me—she decided to stay over, said the commute back to Yaba was too far this late. She's asleep now, breathing softly, one arm draped across my chest. The weight of it feels good. Real. Proof that someone wants to be here, in this small room in Ojuelegba, with me.

I think about the exhibition. About strangers stopping to look at my photo. About that woman saying it was lonely but beautiful. About Seun traveling from Lekki. About Ibrahim showing up in his work uniform. About Iya Alaje patting my shoulder and telling me to keep going.

Six months ago, I couldn't have imagined this. Not because I lacked imagination, but because I genuinely believed nothing would ever be different. That this—the emptiness, the warehouse, the isolation—was all there would ever be.

But here I am. My photo on a wall. My girlfriend asleep beside me. My phone full of messages from people celebrating with me.

I'm not fixed. I know that. Tomorrow I'll still wake up at 5 AM for the warehouse. Still scan inventory under fluorescent lights. Still make barely enough money. Still have days where getting out of bed feels impossible.

But I have this too. This moment. This person. This proof that I can create something that matters.

Dinma stirs, mumbles something in her sleep. Her hand tightens slightly on my chest, like she's holding on even unconsciously.

I think about what she said months ago: You're not hard to see.

Maybe she's right. Maybe I was never actually invisible. Maybe I was just looking in the wrong places, at people who weren't looking back.

But now I have people who look. Who see me. Who show up.

And maybe that's what makes life worth living. Not the absence of pain. Not some final achievement. Just people. Connection. The knowledge that you matter to someone. That your presence—your actual existence—makes someone else's life better.

I matter to Dinma. To Ibrahim. To the Facebook group. To Iya Alaje. Even to Ngozi and Mummy and, in his own way, Daddy.

I'm not just surviving anymore. I'm living. Creating. Reaching for things.

And tomorrow I'll keep reaching.

For better photos. For more moments like this. For whatever comes next.

Because the reaching is the point. The striving is the meaning.

I close my eyes, Dinma's warmth beside me, and for the first time in years, I fall asleep not just grateful to have survived the day, but actually looking forward to tomorrow.`,wordCount:430},{page:70,chapter:"Chapter Nine: Years Later",content:`CHAPTER NINE
Years Later

November 2028.

I wake up to sunlight streaming through curtains that are supposed to block light properly—not the thin, torn ones from Ojuelegba, but actual curtains that Dinma picked out when we moved in together two years ago.

The room is quiet except for her breathing beside me. Still asleep, her hair spread across the pillow, one hand tucked under her cheek. Saturday morning. No alarms. No rushing. Just time.

I get up carefully, trying not to wake her. Our bedroom is small but it's ours—a one-bedroom flat in Yaba, nothing fancy, but it has a proper kitchen and a tiny balcony where we sometimes sit in the evenings watching Lagos chaos unfold below.

I head to the kitchen to make some toast. I pull the bread from the cupboard—it's fresh, a far cry from the stale loaves I used to scavenge in Ojuelegba. While the slices crisp up in the toaster, I check my phone. Messages from the Facebook group—someone posted at 3 AM about a rough night, others responded with support. The group is still active, still that same mix of people checking in, sharing struggles, celebrating wins.

I scroll through. Seun got married last year—his wedding photos are still his profile picture, him and Chidi in matching agbadas, huge smiles. Pastor Michael's church now has a full mental health ministry, therapists on staff, support groups every week. Amara moved to Abuja for work, posts poetry occasionally. Uncle T visited Lagos three months ago, we all met up—he's exactly the same, just with more gray in his beard.

And scattered throughout are newer members. People who joined last week, last month, last year. People finding the same refuge I found four years ago.

Four years. It doesn't feel possible.

I open Instagram—@LagosUnseen now has 15,247 followers. My last post from Wednesday got 2,341 likes: a photo of a danfo conductor mid-leap, hanging off the bus door, frozen in motion against the blur of traffic.

The toaster pops, interrupting my scrolling. I'm not famous. Not even close. But I'm known in small circles. Photography circles. Nigerian art circles. People who appreciate Lagos documented honestly—not as tourist attraction, not as poverty porn, just as reality. Beautiful and chaotic and human.

I butter the toast and set two plates—one with a little extra jam for Dinma. I carry them back to the bedroom. She's awake now, scrolling through her phone, squinting without her glasses.

"Morning," she says, reaching for her plate. "You're up early."

"Couldn't sleep."

"Bad thoughts?"

It's a question she asks casually now. No fear in it. Just checking in.

"No. Good thoughts, actually. Just thinking about today."

Today we're moving. Again. Not far—two streets over to a slightly bigger place. Two bedrooms instead of one. Bigger kitchen. Actual balcony instead of tiny one. Room for my photography equipment that's currently crammed into corners.

Room to grow.`,wordCount:430},{page:71,chapter:"Chapter Nine: Years Later (Continued)",content:`"You nervous about the move?" she asks.

"A little. You?"

"A little." She takes a bite of her toast. "But good nervous. The new place has better light. Your photos are going to be amazing."

I smile. She's always thinking about my photography. Always encouraging. Always believing I can do more than I think I can.

"How's work?" I ask.

"Busy. But good. The promotion is still... a lot. But I'm managing."

She got promoted to Senior Developer six months ago. More responsibility. More money—₦280,000 a month now. Way more than my ₦120,000 from the media company where I work as a photography assistant.

But I freelance on the side. Shoot events on weekends. Sell prints through Instagram. Teach photography workshops once a month at a community center in Yaba. All together, I'm making decent money now. Not rich. But comfortable. We're comfortable.

"You still love it?" I ask.

"Most days. Some days I want to quit and sell plantain by the roadside. But most days, yeah. I love it."

"Good."

We sit in comfortable silence, eating breakfast. Outside, Lagos is waking up—generators starting, church loudspeakers beginning, someone's rooster crowing despite this being the city.

"You ready for today?" Dinma asks.

"As ready as I'll ever be."

"We could tell them to wait. Do it next weekend."

"No. We scheduled the movers. We told the landlord. We're doing it."

She grins. "Look at you. Decisive. Four years ago you couldn't decide what to eat for breakfast."

"Four years ago I barely ate breakfast."

"Exactly. Look at you now."`,wordCount:250},{page:72,chapter:"Chapter Nine: Years Later (Continued)",content:`The movers arrive at 10 AM. Two guys with a small truck. We don't have much furniture—most of it came with the flat. Just our personal stuff. Books. Clothes. My camera equipment. Dinma's tech setup. Kitchen things we've accumulated.

And boxes. So many boxes of random things we've collected over two years of living together.

I'm carrying a box labeled "Kitchen Stuff" when I reach the back of our bedroom closet and find something I'd forgotten about—a blue notebook. ₦200 price tag still faintly visible on the cover. Pages yellowed at the edges.

I freeze.

Set down the box. Pick up the notebook. My heart is suddenly pounding.

I know what this is. Even before opening it, I know.

The suicide note.

I'd completely forgotten about it. Moved it here from Ojuelegba when Dinma and I got this place, shoved it in the back of the closet beneath old clothes and forgotten items. And then just... forgot. Stopped thinking about it.

I open it slowly. Carefully. Like it might crumble.

The loose sheets are still there, folded inside the front cover. My handwriting, slightly frantic. November 15, 2024.

I'm writing this because I need someone to understand...

I read the first few lines. Then stop. I don't need to read more. I know what it says.

I know who wrote it.

But sitting here, four years later, in this bedroom I share with Dinma, reading these words feels surreal. Like reading someone else's diary. Like this was written by a different person in a different life.

That person thought the warehouse was forever. That emptiness was permanent. That nothing would ever change.

But everything changed.

"Eli?" Dinma's voice from the doorway. "You okay? You've been in here for—" She stops. Sees the notebook in my hands. "Is that...?"

"Yeah."

She comes in, sits beside me on the floor. "I didn't know you still had it."

"I forgot about it. It was buried in the closet. I haven't looked at it in... years, probably."

"Do you want to read it?"

"I don't know."

She waits. Doesn't push. Just sits with me.`,wordCount:310},{page:73,chapter:"Chapter Nine: Years Later (Continued)",content:`I turn the page. After the suicide note, there are other entries. Dated. Written over months in late 2024 and early 2025.

December 1, 2024: I joined a Facebook group today. I don't know if it will help. But I needed to do something different.

December 15, 2024: Her name is Dinma. We've been talking for two weeks. She makes me laugh. I forgot I could laugh.

January 10, 2025: I had lunch with Ibrahim today. I said yes. It was... nice. I forgot people could be nice.

February 3, 2025: I called Mummy back. We talked for twenty minutes. She didn't ask hard questions. She just talked. I just listened. It was enough.

March 28, 2025: Dinma said she likes me. Not friend-likes. Likes-likes. Someone likes me. I don't understand it. But I'm grateful.

May 2, 2025: I'm taking photos now. Dinma says I have an eye for photography. Maybe she's right. Maybe I see things worth seeing.

Page after page. Months documented. The journey from that November night to something resembling life.

I'd forgotten I wrote these. After the suicide note, I'd started using the notebook as a journal—processing, reflecting, documenting small wins.

The entries stop around July 2025. I got busier. Didn't need the journal as much. Had Dinma to talk to, the group to share with. The notebook got packed away, forgotten.

Until now.

"Eli," Dinma says softly. "Look at you then. Look at you now."

I close the notebook. Look at her. "I almost wasn't here."

"I know."

"If my phone hadn't died. If I'd woken up and finished it. If I'd just... gone through with it."

"But you didn't."

"But I almost did. And if I had, none of this would exist. We wouldn't exist."

She takes my hand. "But we do exist. You're here. We're here. That's what matters."

"I know. It's just... reading those entries. Seeing how bad it was. How close I came."

"Are you glad you kept it?"

I think about that. "Yeah. I think I am. It's proof, you know? That I was there. That I made a different choice. That things can change even when they feel permanent."

"Do you want to keep it? Or are you ready to let it go?"

I look at the notebook. At the suicide note I never finished. At the journal entries documenting my slow climb back to life.

"I think I'll keep it," I say. "Not to dwell on it. But to remember. Sometimes I need to remember how far I've come."

Dinma nods. "Okay. Where should we put it?"

"New place. Somewhere safe. But not hidden. Not buried in a closet. Just... kept."

"Okay."

We pack the notebook carefully in a box labeled "Personal - Eli." With my other important things—old LASU documents, family photos, the program from my first real photography exhibition two years ago, the business cards from my freelance work.`,wordCount:470},{page:74,chapter:"Chapter Nine: Years Later (Continued)",content:`The movers load everything onto the truck. We do a final walk-through of the flat—making sure we got everything, making sure we're leaving it clean for the next tenants.

I stand in the middle of our now-empty bedroom. This room where we've slept for two years. Where we've fought and made up. Where we've celebrated good news and consoled each other through bad days. Where we've built a life together.

"Ready?" Dinma asks from the doorway.

"Yeah. Let's go."

The new place is just two streets over but it feels different. Bigger. Brighter. Windows that actually let in light. Space that feels like possibility.

We spend the afternoon unpacking. Setting up furniture. Arguing playfully about where things should go.

"The couch faces the window," Dinma insists.

"But then the TV is at a weird angle."

"So move the TV."

"You want me to move the TV?"

"Yes."

"Fine. You win. You always win."

She grins. "Exactly. Don't forget it."

By evening, we're exhausted but the place is starting to look like home. We order jollof rice and chicken from a buka nearby—too tired to cook. Eat sitting on the floor because we haven't set up the dining table yet.

"I like this place," Dinma says, looking around.

"Yeah?"

"Yeah. It feels... I don't know. Like a fresh start."

"We've been together for almost four years. How is this a fresh start?"

"Not a fresh start from us. A fresh start from everything before. Like we're building something new. Something that's completely ours."

I think about that. She's right. This place isn't haunted by my past. Isn't the room where I was alone and depressed for years. Isn't marked by old pain.

This is new. This is ours. This is what we're building together.

"Yeah," I say. "I like that."`,wordCount:270},{page:75,chapter:"Chapter Nine: Years Later (Continued)",content:`Later that night, after we've set up our bedroom, after we've showered and changed and collapsed into bed exhausted, I lie there unable to sleep.

Not from anxiety. Not from dark thoughts. Just from the strangeness of change. Of growth. Of being here.

Dinma is already asleep, breathing steadily beside me.

I think about the notebook now packed away in its box. About the suicide note I wrote four years ago. About the journal entries documenting my climb back.

November 15, 2024 to November 16, 2028. Four years.

That person who wrote the note wouldn't believe this if you told him. Wouldn't believe he'd have a girlfriend—now talking about maybe getting married someday. Wouldn't believe he'd be a photographer. Wouldn't believe he'd have friends, community, purpose. Wouldn't believe he'd be happy. Or not always happy, but content. Alive. Actually living.

But here I am.

I'm twenty-nine now. Still introverted. Still have hard days. Still see a therapist every other week. Still take medication. Still check in with the Facebook group. Still need support.

But I have a life. A full life. With people and purpose and possibility.

The warehouse is four years behind me. I left that job in 2026, finally. Got brave enough to quit. To try something else. To believe I deserved better.

Ibrahim and I still keep in touch. He visited his family in Kano finally, two years ago. Stays there for a month every year now. We message occasionally, he still calls me "bros," still checks in.

Ngozi moved to a better job. We're Facebook friends. She likes all my photography posts.

Iya Alaje still lives in that compound in Ojuelegba. I visit sometimes, bring her groceries. She still calls me "omo mi." Still tells me to keep creating. Still proud, in her way.

My family and I are better. Not perfect. But better. I visit Surulere once a month. Mummy cooks too much food. Daddy asks about my "photography business" with cautious pride. Tola and I video call occasionally. Deji graduated, works as a mechanical engineer, still looks up to his older brother for reasons I don't fully understand.

Everything is different.

And it started with one night. One phone dying. One decision to wait. Just one more day.

That day became four years.

Became this.

I close my eyes, Dinma's warmth beside me, and think: I'm glad I stayed. I'm so glad I stayed.

Not because everything is perfect now. It's not.

But because staying gave me the chance to see what could happen. To see what change looks like. To see what a life could be.

And this life—imperfect, complicated, still hard sometimes—this life is worth living.

I fall asleep grateful. Not just for surviving, but for thriving. For being here. For having tomorrow.

For having chosen, again and again, to stay.`,wordCount:460},{page:76,chapter:"Chapter Ten: What Was Always There",content:`CHAPTER TEN
What Was Always There

Sunday morning, November 17, 2028.

I wake up to Dinma making breakfast—the smell of indomie and fried eggs drifting through our new apartment. Sunlight streams through the balcony door, brighter than our old place. The boxes from yesterday's move are still stacked against the walls, but the bedroom is set up, the kitchen is functional, and it already feels like home.

I join her in the kitchen. She's humming something—a worship song, I think. She grew up Pentecostal, still goes to church occasionally. I don't go with her most times, but I don't mind when she plays gospel music while cooking.

"Morning," she says. "Coffee's ready."

I pour myself a cup. Stand there watching her cook, this woman I met from a Facebook support group, who saw something in me worth reaching out for, who's been beside me for almost four years now.

"What?" she asks, catching me staring.

"Nothing. Just thinking."

"About?"

"About how I almost missed this. All of this."

She turns off the stove, plates the indomie and eggs, brings them to our small dining table that we assembled last night. We sit across from each other, morning light falling between us.

"The notebook really got to you, huh?" she says.

"Yeah. I guess it did."

We eat in comfortable silence for a few minutes. Outside, Lagos is doing its Sunday morning thing—church loudspeakers blasting, generators, someone's TV playing too loud, the sounds of a city that never really sleeps.

My phone buzzes. I check it. Mummy calling.

I almost ignore it—force of habit. But Dinma squeezes my hand, and I answer.

"Hello, Mummy."

"Eli mi! Good morning o! You're not in church?"

"Not today, ma. Dinma and I just moved to a new place yesterday. Still settling."

"Eh? New place? You didn't tell me!"

"I'm telling you now. Still in Yaba. Just bigger."

"That's good, that's good. Is Dinma there? Let me greet her."

I hand the phone to Dinma. They chat for a few minutes—Dinma is better at this than I am, knows how to navigate my mother's questions without getting overwhelmed. When she hands the phone back, Mummy says:

"Eli, when are you people getting married?"

I laugh. "Mummy, we just moved in together."

"Together? You're living together?" Her voice rises slightly. Not scandalized exactly, but concerned. "Eli, you know that's not proper. You should marry first."

"Mummy, we're adults."

"Adults should do proper things. Bring her home properly. Let us do introduction. Let the families meet."

I glance at Dinma. She's grinning, clearly hearing Mummy's voice through the phone.

"Soon, Mummy. We'll do it soon."

"You keep saying soon, soon. I'm not getting younger o. I want to see my children settled."

"I am settled, Mummy."

"Settled is when you have wife and children and you're going to church every Sunday."

"That's your version of settled."

She sighs. "Okay o. But don't wait too long. Life is short."

After we hang up, Dinma says, "She wants grandchildren."

"Everything. She wants everything."

"And what do you want?"

I think about that. What do I want?

"This," I say. "What I have. It's enough."`,wordCount:470},{page:77,chapter:"Chapter Ten: What Was Always There (Continued)",content:`After breakfast, we decide to explore the neighborhood. We've lived in Yaba for two years, but this street is new to us. Different shops, different faces, different rhythms.

We walk hand in hand, no particular destination. Just moving through Lagos on a Sunday morning when it's almost peaceful. Almost.

We pass a small church—not the big ones with fancy buildings, just one of those house churches where someone converted their living room into a worship space. The door is open, music pouring out. A woman's voice singing, off-key but enthusiastic. People clapping. The sound of praise and worship.

"You know what I realized yesterday?" I say. "When I found the notebook."

"What?"

"All the support I thought I didn't have—it was there. Mummy calling every Sunday even when I didn't answer. Daddy helping with rent without making me explain. Iya Alaje offering food every week. Ibrahim inviting me to lunch for six months before I said yes. Ngozi greeting me every morning."

Dinma nods. "They were all there."

"They were. I just couldn't see it. Depression made me blind to what was right in front of me."

"And now?"

"Now I answer the calls. I accept the food. I say yes to lunch. I see it."

We keep walking.

"The thing is," I continue, "I thought I was invisible. But people were seeing me the whole time. They just couldn't reach me through the depression. That wasn't their fault. It wasn't mine either. It just... was."

"But you can reach them now," Dinma says.

"Yeah. I can."`,wordCount:240},{page:78,chapter:"Chapter Ten: What Was Always There (Continued)",content:`That evening, we host a small gathering at the new place. Not a housewarming exactly—we haven't unpacked enough for that. Just a few people coming by to see the new spot.

Seun arrives first with Chidi, his husband. They bring wine and chin-chin, make jokes about our half-unpacked boxes, compliment the natural light.

"This place is nice o," Seun says. "Upgrade from the last one."

"Small upgrade," I say.

"Still an upgrade. That's growth, guy."

We video call Pastor Michael in Abuja—he can't make it physically but wanted to join virtually. His face appears on my laptop screen, that same warm smile.

"Brother Eli, Sister Dinma, congratulations on the new place. May God bless every corner of it."

"Thank you, Pastor," Dinma says.

Uncle T is in London but joins via video too. We set up the laptop so he can see everyone, be part of the gathering even from thousands of miles away.

"Mate, the place looks brilliant," he says. "Remember four years ago?"

"How could I forget?"

"You've come so far. So bloody far. I'm proud of you."

We eat takeout—jollof rice and chicken from a nearby buka. We talk and laugh and share stories. Seun tells embarrassing wedding stories. Pastor Michael shares updates about his church's mental health ministry—they're training more counselors, reaching more people. Uncle T talks about his kids (teenagers now, driving him crazy but he loves it).

And I find myself standing slightly apart at one point, watching the scene. My apartment. My girlfriend—soon to be fiancée, probably. My friends. My people.

This didn't exist four years ago. Now I have this.

After everyone leaves, after we've cleaned up the takeout containers and said our goodbyes and closed the door on a good day, Dinma and I collapse on the couch.

"Good day?" she asks.

"Really good day."

We sit in comfortable silence. The apartment settles around us—new creaks, new sounds, new rhythms. But it feels right. Feels like home.

"Thank you," I say to Dinma.

"For what?"

"For messaging me that day. For seeing me. For staying."

"You make it sound like I did something special. I just sent a message."

"You did do something special. You reached out to a stranger who was struggling. You took a risk. You stayed even when things were hard. That's everything."

She leans her head on my shoulder. "You're stuck with me now."

"Good."

Later that night, lying in bed in our new room, I think about the notebook now packed away in the dining table drawer. Not hidden. Not forgotten. Just kept.

A reminder of where I was. Of how close I came. Of the choice I made—not once, but every day for four years.

The choice to stay. To try. To reach. To see.`,wordCount:430},{page:79,chapter:"Chapter Ten: What Was Always There (Continued)",content:`My name is Eliora Oluwafemi Adetayo.

Eliora—my God is light.

And now, finally, I can see it.

Not because everything is perfect. It's not. I still have hard days. Still struggle sometimes with the weight of being alive.

But I can see the light anyway. In Dinma's hand in mine. In Seun's laugh. In Ibrahim's "Bros, how far?" In Mummy's persistent Sunday calls. In the photos I take. In the community I'm part of. In the life I'm building, day by day, choice by choice.

The light was always there. In the people who kept showing up. In the support I couldn't access. In the possibilities I couldn't see.

I just had to stay long enough to see it.

And I did.

I stayed.

And I'm so, so glad I did.`,wordCount:150},{page:80,chapter:"Crisis Support Resources",content:`Crisis Support Resources (Nigeria)

If you or someone you know is in immediate danger:

Nigeria Emergency Number: 112

Lagos Emergency Lines: 767 or 112

You may also go to the nearest hospital emergency department.

For ongoing support, consider contacting licensed mental health professionals, trusted community leaders, or mental health advocacy organizations.

If you are outside Nigeria, please contact your local emergency number or a suicide prevention hotline in your country.`,wordCount:90},{page:81,chapter:"A Note From the Author",content:`A Note From the Author

If this story meant something to you—and you know someone who might need it—you are welcome to share it.

I've set up a small supporter program for readers who would like to help share Suicide Note. Details are optional and can be found at:

suicidenotebook.com/share

Thank you for reading. Take care.

Loba Yusuf`,wordCount:60}],RE=qt.reduce((e,t)=>e+(t.wordCount||0),0),Dn=qt.length,OE=Math.ceil(RE/200),DE=()=>{const e=new Set;return qt.filter(t=>e.has(t.chapter)?!1:(e.add(t.chapter),!0)).map(t=>({chapter:t.chapter,page:t.page}))},Es={validateAccessCode:async(e,t)=>new Promise(n=>{setTimeout(()=>{e&&(e.startsWith("SN-")||e.startsWith("FREE-"))?n({success:!0}):n({success:!1})},500)}),verifyPayment:async e=>new Promise(t=>{setTimeout(()=>{t({success:!0,data:{accessCode:`SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`}})},500)})},FE=()=>{const{ebookId:e="suicide-note-2026"}=Ph(),t=pa(),n=Rn(),a=14,o=24,[r,i]=b.useState(()=>{const R=localStorage.getItem("rdr_fontSize");return R?parseInt(R):16}),[l,u]=b.useState(4),[c,d]=b.useState(!1),[m,g]=b.useState("Chapter One: The Note Begins"),[S,y]=b.useState(""),[k,E]=b.useState(!1),[f,h]=b.useState(!0),[p,N]=b.useState(null),C=DE();b.useEffect(()=>{(async()=>{var M;const ee=new URLSearchParams(n.search),ae=ee.get("accessCode"),x=ee.get("reference");try{h(!0);const j=localStorage.getItem(`ebook_access_${e}`);if(j)if((await Es.validateAccessCode(j,e)).success){y(j),E(!0);const U=localStorage.getItem(`bookmark_${e}`);if(U){const de=parseInt(U);de>0&&de<=qt.length&&(u(de),g(qt[de-1].chapter))}h(!1);return}else{localStorage.removeItem(`ebook_access_${e}`),h(!1);return}if(ae)(await Es.validateAccessCode(ae,e)).success&&(y(ae),E(!0),localStorage.setItem(`ebook_access_${e}`,ae));else if(x){const V=await Es.verifyPayment(x);if(V.success){const U=((M=V.data)==null?void 0:M.accessCode)||`SN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`;y(U),E(!0),localStorage.setItem(`ebook_access_${e}`,U)}}}catch(j){console.error("Reader initialization error:",j)}finally{h(!1)}})()},[e,n.search]),b.useEffect(()=>{k&&l&&(localStorage.setItem(`bookmark_${e}`,l.toString()),N(l))},[l,e,k]),b.useEffect(()=>{localStorage.setItem("rdr_fontSize",r),document.documentElement.style.setProperty("--font-size",`${r}px`)},[r]),b.useEffect(()=>{const R=qt.find(ee=>ee.page===l);R&&g(R.chapter)},[l]);const A=R=>R.split(`

`).map((ae,x)=>{const M=ae.trim();if(!M)return null;const j=M.includes("CHAPTER")||M==="The Note Begins"||M==="The Days After"||M==="One More Chance"||M==="Strangers Who Understand"||M==="The Facebook Confession"||M==="Learning to Reach"||M==="The First Meeting"||M==="Something Worth Fighting For"||M==="Years Later"||M==="What Was Always There"||M==="Crisis Support Resources"||M==="A Note From the Author",V=M.split(`
`);return V.length>1?V.map((U,de)=>{if(!U.trim())return null;const ye=U.includes("CHAPTER")||U==="The Note Begins"||U==="The Days After"||U==="One More Chance"||U==="Strangers Who Understand"||U==="The Facebook Confession"||U==="Learning to Reach"||U==="The First Meeting"||U==="Something Worth Fighting For"||U==="Years Later"||U==="What Was Always There"||U==="Crisis Support Resources"||U==="A Note From the Author";return s.createElement("p",{key:`${x}-${de}`,className:ye?"chapter-title":""},U.trim())}):s.createElement("p",{key:x,className:j?"chapter-title":""},M)}),P=()=>{r>a&&i(R=>R-1)},B=()=>{r<o&&i(R=>R+1)},$=()=>{d(!c)},W=(R,ee)=>{u(ee),d(!1),window.scrollTo({top:0,behavior:"smooth"})},X=()=>{l>1&&(u(R=>R-1),window.scrollTo({top:0,behavior:"smooth"}))},Z=()=>{l<Dn&&(u(R=>R+1),window.scrollTo({top:0,behavior:"smooth"}))};b.useEffect(()=>{const R=ee=>{k&&(ee.key==="ArrowLeft"&&!ee.ctrlKey&&!ee.metaKey?X():ee.key==="ArrowRight"&&!ee.ctrlKey&&!ee.metaKey&&Z())};return document.addEventListener("keydown",R),()=>document.removeEventListener("keydown",R)},[k,l]);const ne=l/Dn*100,ve=qt.find(R=>R.page===l)||qt[3];return f?s.createElement("div",{className:"loading-container"},s.createElement("div",{className:"spinner"}),s.createElement("p",null,"Loading your book...")):k?s.createElement("div",{className:"reader-page"},s.createElement("header",{className:"header"},s.createElement("button",{className:"header-back",onClick:()=>t("/")},s.createElement("svg",{width:"9",height:"15",viewBox:"0 0 9 15",fill:"none","aria-hidden":"true"},s.createElement("path",{d:"M8 1L1 7.5L8 14",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})),"Back"),s.createElement("div",{className:"header-center"},s.createElement("div",{className:"header-title"},"Suicide Note"),s.createElement("div",{className:"header-author"},"by Loba Yusuf")),s.createElement("div",{className:"font-controls",role:"group","aria-label":"Font size controls"},s.createElement("button",{className:"font-btn",onClick:P,disabled:r<=a,"aria-label":"Decrease font size"},"−"),s.createElement("span",{className:"font-size-label"},r,"px"),s.createElement("button",{className:"font-btn",onClick:B,disabled:r>=o,"aria-label":"Increase font size"},"+"))),s.createElement("div",{className:"progress-bar-wrap",role:"progressbar","aria-valuenow":l,"aria-valuemin":"1","aria-valuemax":Dn,"aria-label":"Reading progress"},s.createElement("div",{className:"progress-bar-fill",style:{width:`${ne}%`}})),s.createElement("div",{className:"chapter-toggle-wrap"},s.createElement("button",{className:"chapter-toggle-btn",onClick:$,"aria-expanded":c,"aria-controls":"chapterList"},s.createElement("span",{className:"chapter-toggle-icon"},"📖"),s.createElement("span",{className:"chapter-toggle-label"},m),s.createElement("span",{className:`chapter-chevron ${c?"open":""}`,"aria-hidden":"true"},"⌄")),s.createElement("div",{className:`chapter-list ${c?"open":""}`,id:"chapterList",role:"list"},C.map((R,ee)=>s.createElement("button",{key:ee,className:`chapter-item ${R.chapter===m?"current":""}`,role:"listitem",onClick:()=>W(R.chapter,R.page)},R.chapter)))),s.createElement("main",{className:"reading-area"},s.createElement("article",{className:"reading-text"},A(ve.content))),s.createElement("nav",{className:"page-nav","aria-label":"Page navigation"},s.createElement("button",{className:"nav-btn",onClick:X,disabled:l<=1,"aria-label":"Previous page"},"Previous"),s.createElement("div",{className:"page-indicator","aria-live":"polite"},"Page ",l," of ",Dn),s.createElement("button",{className:"nav-btn",onClick:Z,disabled:l>=Dn,"aria-label":"Next page"},"Next →")),s.createElement("footer",{className:"site-footer"},s.createElement("div",{className:"footer-section"},s.createElement("div",{className:"footer-label"},"Your Access Code"),s.createElement("div",{className:"footer-code"},S)),s.createElement("div",{className:"footer-section"},s.createElement("div",{className:"footer-distress"},"If you're experiencing emotional distress:"),s.createElement("div",{className:"footer-emergency"},"🇳🇬 Nigeria Emergency: ",s.createElement("strong",null,"112")),s.createElement("div",{className:"footer-emergency"},"🏙️ Lagos Emergency: ",s.createElement("strong",null,"767"))),s.createElement("div",{className:"footer-section"},s.createElement("div",{className:"footer-label"},"Follow the Author"),s.createElement("div",{className:"footer-social-row"},s.createElement("span",{className:"social-icon fb","aria-hidden":"true"},"f"),s.createElement("a",{href:"https://facebook.com/olorunloba.yusuf",className:"footer-link",target:"_blank",rel:"noopener"},"olorunloba.yusuf")),s.createElement("div",{className:"footer-social-row"},s.createElement("span",{className:"social-icon ig","aria-hidden":"true"},"ig"),s.createElement("a",{href:"https://instagram.com/loba_yusuf",className:"footer-link",target:"_blank",rel:"noopener"},"@loba_yusuf")),s.createElement("div",{className:"footer-social-row"},s.createElement("span",{className:"social-icon tw","aria-hidden":"true"},"𝕏"),s.createElement("a",{href:"https://twitter.com/loba_yusuf",className:"footer-link",target:"_blank",rel:"noopener"},"@loba_yusuf"))),s.createElement("div",{className:"footer-meta"},"Reading time: ~",OE," min  ·  ",Dn," pages total"))):s.createElement("div",{className:"access-denied"},s.createElement("h2",null,"Access Denied"),s.createElement("p",null,"Please purchase the book to read the full content."),s.createElement("button",{onClick:()=>t("/"),className:"home-btn"},"Go to Homepage"))},jE=()=>{const{token:e}=Ph(),t=pa();return b.useEffect(()=>{(async()=>{var a,o,r;if(console.log("🔍 Token from URL params:",e),console.log("🔍 Full URL:",window.location.href),!e||e==="undefined"||e.trim()===""){console.error("❌ No valid token provided in URL"),D.error("Invalid dashboard link: No token provided"),setTimeout(()=>{t("/")},3e3);return}try{console.log("🔍 Validating token:",e);const i=await K.get(`/api/v1/affiliate/token/validate/${e}`);console.log("✅ Validation response:",i.data),i.data.success?(localStorage.setItem("affiliate_token",e),t(`/affiliate/dashboard?token=${e}`)):(D.error("Invalid or expired dashboard link"),setTimeout(()=>{t("/")},2e3))}catch(i){console.error("❌ Token validation error:",i),console.error("Error response:",(a=i.response)==null?void 0:a.data),D.error(((r=(o=i.response)==null?void 0:o.data)==null?void 0:r.error)||"Invalid or expired dashboard link"),setTimeout(()=>{t("/")},2e3)}})()},[e,t]),s.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",backgroundColor:"#f9f9f9"}},s.createElement("div",{style:{width:"50px",height:"50px",border:"4px solid #e0e0e0",borderTop:"4px solid #059669",borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:"20px"}}),s.createElement("p",{style:{color:"#333",fontSize:"16px"}},e&&e!=="undefined"?"Validating your dashboard access...":"Invalid dashboard link..."),s.createElement("style",null,`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `))},WE="_container_18f2y_3",zE="_loadingContainer_18f2y_15",UE="_spinner_18f2y_33",$E="_header_18f2y_215",HE="_headerContent_18f2y_233",YE="_title_18f2y_245",GE="_headerStats_18f2y_259",VE="_headerStat_18f2y_259",qE="_headerStatLabel_18f2y_279",JE="_headerStatValue_18f2y_291",KE="_tabs_18f2y_305",QE="_tab_18f2y_305",XE="_activeTab_18f2y_355",ZE="_tabContent_18f2y_385",e0="_tabTitle_18f2y_397",t0="_overview_18f2y_413",n0="_linkCard_18f2y_423",a0="_linkCardTitle_18f2y_437",o0="_linkDisplay_18f2y_451",r0="_linkCode_18f2y_463",s0="_copyButton_18f2y_485",i0="_linkNote_18f2y_521",l0="_statsGrid_18f2y_531",u0="_statCard_18f2y_543",c0="_statIcon_18f2y_563",d0="_statInfo_18f2y_571",h0="_statLabel_18f2y_581",m0="_statValue_18f2y_593",f0="_recentSection_18f2y_607",p0="_sectionTitle_18f2y_635",g0="_referralsList_18f2y_665",y0="_referralItem_18f2y_675",w0="_referralInfo_18f2y_693",v0="_referralName_18f2y_705",k0="_referralEbook_18f2y_715",I0="_referralMeta_18f2y_725",b0="_referralAmount_18f2y_737",E0="_referralCommission_18f2y_745",S0="_referralDate_18f2y_755",_0="_campaigns_18f2y_767",N0="_campaignsHeader_18f2y_781",C0="_createButton_18f2y_795",T0="_campaignsGrid_18f2y_831",x0="_campaignCard_18f2y_843",A0="_campaignName_18f2y_855",P0="_campaignStats_18f2y_869",L0="_campaignStat_18f2y_869",M0="_campaignStatLabel_18f2y_893",B0="_campaignStatValue_18f2y_905",R0="_campaignLink_18f2y_917",O0="_campaignLinkCode_18f2y_937",D0="_copySmallButton_18f2y_953",F0="_campaignCreated_18f2y_969",j0="_referrals_18f2y_665",W0="_referralsTable_18f2y_995",z0="_referralsHeader_18f2y_1005",U0="_referralRow_18f2y_1027",$0="_referralCell_18f2y_1047",H0="_referralCellLabel_18f2y_1057",Y0="_commissionAmount_18f2y_1071",G0="_emptyState_18f2y_1229",V0="_emptyStateSub_18f2y_1241",q0="_emptyStateButton_18f2y_1251",J0="_payouts_18f2y_1273",K0="_payoutsGrid_18f2y_1287",Q0="_bankDetailsCard_18f2y_1299",X0="_payoutCard_18f2y_1299",Z0="_cardTitle_18f2y_1311",eS="_formGroup_18f2y_1325",tS="_formRow_18f2y_1381",nS="_bankDetails_18f2y_1299",aS="_bankDetail_18f2y_1299",oS="_bankDetailLabel_18f2y_1419",rS="_bankDetailValue_18f2y_1427",sS="_saveButton_18f2y_1437",iS="_payoutButton_18f2y_1437",lS="_editButton_18f2y_1471",uS="_earningsSummary_18f2y_1491",cS="_earningRow_18f2y_1505",dS="_earningAmount_18f2y_1527",hS="_payoutForm_18f2y_1537",mS="_payoutNote_18f2y_1545",fS="_bankRequired_18f2y_1559",pS="_modalOverlay_18f2y_1577",gS="_modal_18f2y_1577",yS="_modalHeader_18f2y_1621",wS="_modalTitle_18f2y_1637",vS="_modalClose_18f2y_1649",kS="_modalBody_18f2y_1665",IS="_modalFooter_18f2y_1673",bS="_cancelButton_18f2y_1689",I={container:WE,loadingContainer:zE,spinner:UE,header:$E,headerContent:HE,title:YE,headerStats:GE,headerStat:VE,headerStatLabel:qE,headerStatValue:JE,tabs:KE,tab:QE,activeTab:XE,tabContent:ZE,tabTitle:e0,overview:t0,linkCard:n0,linkCardTitle:a0,linkDisplay:o0,linkCode:r0,copyButton:s0,linkNote:i0,statsGrid:l0,statCard:u0,statIcon:c0,statInfo:d0,statLabel:h0,statValue:m0,recentSection:f0,sectionTitle:p0,referralsList:g0,referralItem:y0,referralInfo:w0,referralName:v0,referralEbook:k0,referralMeta:I0,referralAmount:b0,referralCommission:E0,referralDate:S0,campaigns:_0,campaignsHeader:N0,createButton:C0,campaignsGrid:T0,campaignCard:x0,campaignName:A0,campaignStats:P0,campaignStat:L0,campaignStatLabel:M0,campaignStatValue:B0,campaignLink:R0,campaignLinkCode:O0,copySmallButton:D0,campaignCreated:F0,referrals:j0,referralsTable:W0,referralsHeader:z0,referralRow:U0,referralCell:$0,referralCellLabel:H0,commissionAmount:Y0,emptyState:G0,emptyStateSub:V0,emptyStateButton:q0,payouts:J0,payoutsGrid:K0,bankDetailsCard:Q0,payoutCard:X0,cardTitle:Z0,formGroup:eS,formRow:tS,bankDetails:nS,bankDetail:aS,bankDetailLabel:oS,bankDetailValue:rS,saveButton:sS,payoutButton:iS,editButton:lS,earningsSummary:uS,earningRow:cS,earningAmount:dS,payoutForm:hS,payoutNote:mS,bankRequired:fS,modalOverlay:pS,modal:gS,modalHeader:yS,modalTitle:wS,modalClose:vS,modalBody:kS,modalFooter:IS,cancelButton:bS},ES=()=>{var x,M,j,V,U,de,ye,Ve,Me,F,q,H,Y,oe,pe,ze;const[e]=Lg(),[t,n]=b.useState("overview"),[a,o]=b.useState(!0),[r,i]=b.useState(null),[l,u]=b.useState(null),[c,d]=b.useState([]),[m,g]=b.useState([]),[S,y]=b.useState({accountNumber:"",accountName:"",bankCode:"",bankName:""}),[k,E]=b.useState(!1),[f,h]=b.useState(!1),[p,N]=b.useState({name:"",description:"",medium:"",source:""}),[C,A]=b.useState(""),[P,B]=b.useState(""),[$,W]=b.useState("");b.useEffect(()=>{const L=e.get("token");if(!L){D.error("No access token provided"),setTimeout(()=>{window.location.href="/"},2e3);return}W(L),De.setAuthToken(L),X()},[e]);const X=async()=>{var L,it;o(!0);try{const[lt,xt,Se,ie,Be]=await Promise.all([De.getDashboard(),De.getEarnings(),De.getReferrals(1,20),De.getCampaigns(),De.getBankDetails()]);console.log("Dashboard response:",lt),console.log("Earnings response:",xt),console.log("Referrals response:",Se),Se.success&&((L=Se.data)!=null&&L.referrals)&&(console.log("🔍 First referral details:",Se.data.referrals[0]),console.log("🔍 All referrals:",Se.data.referrals)),lt.success&&i(lt.data),xt.success&&u(xt.data),Se.success&&d(Se.data.referrals||[]),ie.success&&g(ie.data),Be.success&&(y(Be.data.bankDetails||{}),E(Be.data.hasBankDetails||!1))}catch(lt){console.error("Error loading dashboard:",lt),D.error("Failed to load dashboard data"),((it=lt.response)==null?void 0:it.status)===401&&(D.error("Invalid or expired access link"),setTimeout(()=>{window.location.href="/"},2e3))}finally{o(!1)}},Z=async()=>{if(!p.name){D.error("Campaign name is required");return}o(!0);const L=await De.createCampaign(p);if(L.success){D.success("Campaign created successfully!"),h(!1),N({name:"",description:"",medium:"",source:""});const it=await De.getCampaigns();it.success&&g(it.data)}else D.error(L.error||"Failed to create campaign");o(!1)},ne=async()=>{if(!S.accountNumber||!S.accountName||!S.bankCode||!S.bankName){D.error("All bank details are required");return}o(!0);const L=await De.updateBankDetails(S);L.success?(D.success("Bank details updated successfully!"),E(!0)):D.error(L.error||"Failed to update bank details"),o(!1)},ve=async()=>{if(!C||parseFloat(C)<=0){D.error("Please enter a valid amount");return}const L=parseFloat(C)*100;o(!0);const it=await De.requestPayout(L);if(it.success){D.success("Payout requested successfully!"),A("");const lt=await De.getEarnings();lt.success&&u(lt.data)}else D.error(it.error||"Failed to request payout");o(!1)},R=L=>{navigator.clipboard.writeText(L),B(L),D.success("Copied to clipboard!"),setTimeout(()=>B(""),2e3)},ee=L=>!L&&L!==0?"₦0":L,ae=L=>{if(!L)return"N/A";try{return new Date(L).toLocaleDateString("en-NG",{year:"numeric",month:"short",day:"numeric"})}catch{return"N/A"}};return a?s.createElement("div",{className:I.loadingContainer},s.createElement("div",{className:I.spinner}),s.createElement("p",null,"Loading your affiliate dashboard...")):s.createElement("div",{className:I.container},s.createElement("div",{className:I.header},s.createElement("div",{className:I.headerContent},s.createElement("h1",{className:I.title},"Affiliate Dashboard"),s.createElement("div",{className:I.headerStats},s.createElement("div",{className:I.headerStat},s.createElement("span",{className:I.headerStatLabel},"Total Earnings"),s.createElement("span",{className:I.headerStatValue},((x=r==null?void 0:r.earnings)==null?void 0:x.formattedTotal)||"₦0")),s.createElement("div",{className:I.headerStat},s.createElement("span",{className:I.headerStatLabel},"Pending"),s.createElement("span",{className:I.headerStatValue},((M=r==null?void 0:r.earnings)==null?void 0:M.formattedPending)||"₦0")),s.createElement("div",{className:I.headerStat},s.createElement("span",{className:I.headerStatLabel},"Referrals"),s.createElement("span",{className:I.headerStatValue},((j=r==null?void 0:r.stats)==null?void 0:j.totalReferrals)||0))))),s.createElement("div",{className:I.tabs},s.createElement("button",{className:`${I.tab} ${t==="overview"?I.activeTab:""}`,onClick:()=>n("overview")},"Overview"),s.createElement("button",{className:`${I.tab} ${t==="campaigns"?I.activeTab:""}`,onClick:()=>n("campaigns")},"Campaigns"),s.createElement("button",{className:`${I.tab} ${t==="referrals"?I.activeTab:""}`,onClick:()=>n("referrals")},"Referrals"),s.createElement("button",{className:`${I.tab} ${t==="payouts"?I.activeTab:""}`,onClick:()=>n("payouts")},"Payouts")),s.createElement("div",{className:I.tabContent},t==="overview"&&r&&s.createElement("div",{className:I.overview},s.createElement("div",{className:I.linkCard},s.createElement("h3",{className:I.linkCardTitle},"Your Affiliate Link"),s.createElement("div",{className:I.linkDisplay},s.createElement("code",{className:I.linkCode},(V=r.affiliate)==null?void 0:V.link),s.createElement("button",{onClick:()=>{var L;return R((L=r.affiliate)==null?void 0:L.link)},className:I.copyButton},s.createElement(z,{name:"Copy"}),s.createElement("span",null,"Copy"))),s.createElement("p",{className:I.linkNote},"Share this link to earn 50% commission on every sale!")),s.createElement("div",{className:I.statsGrid},s.createElement("div",{className:I.statCard},s.createElement("div",{className:I.statIcon},"💰"),s.createElement("div",{className:I.statInfo},s.createElement("span",{className:I.statLabel},"Total Earnings"),s.createElement("span",{className:I.statValue},(U=r.earnings)==null?void 0:U.formattedTotal))),s.createElement("div",{className:I.statCard},s.createElement("div",{className:I.statIcon},"⏳"),s.createElement("div",{className:I.statInfo},s.createElement("span",{className:I.statLabel},"Pending"),s.createElement("span",{className:I.statValue},(de=r.earnings)==null?void 0:de.formattedPending))),s.createElement("div",{className:I.statCard},s.createElement("div",{className:I.statIcon},"✅"),s.createElement("div",{className:I.statInfo},s.createElement("span",{className:I.statLabel},"Paid"),s.createElement("span",{className:I.statValue},(ye=r.earnings)==null?void 0:ye.formattedPaid))),s.createElement("div",{className:I.statCard},s.createElement("div",{className:I.statIcon},"👥"),s.createElement("div",{className:I.statInfo},s.createElement("span",{className:I.statLabel},"Total Clicks"),s.createElement("span",{className:I.statValue},((Ve=r.stats)==null?void 0:Ve.totalClicks)||0))),s.createElement("div",{className:I.statCard},s.createElement("div",{className:I.statIcon},"📊"),s.createElement("div",{className:I.statInfo},s.createElement("span",{className:I.statLabel},"Conversion Rate"),s.createElement("span",{className:I.statValue},((F=(Me=r.stats)==null?void 0:Me.conversionRate)==null?void 0:F.toFixed(1))||"0","%"))),s.createElement("div",{className:I.statCard},s.createElement("div",{className:I.statIcon},"📅"),s.createElement("div",{className:I.statInfo},s.createElement("span",{className:I.statLabel},"Joined"),s.createElement("span",{className:I.statValue},ae((q=r.affiliate)==null?void 0:q.createdAt))))),c.length>0&&s.createElement("div",{className:I.recentSection},s.createElement("h3",{className:I.sectionTitle},"Recent Referrals"),s.createElement("div",{className:I.referralsList},c.slice(0,5).map(L=>s.createElement("div",{key:L.id,className:I.referralItem},s.createElement("div",{className:I.referralInfo},s.createElement("span",{className:I.referralName},L.customer),s.createElement("span",{className:I.referralEbook},L.ebook)),s.createElement("div",{className:I.referralMeta},s.createElement("span",{className:I.referralAmount},L.amount),s.createElement("span",{className:I.referralCommission},"+",L.commission),s.createElement("span",{className:I.referralDate},ae(L.date)))))))),t==="campaigns"&&s.createElement("div",{className:I.campaigns},s.createElement("div",{className:I.campaignsHeader},s.createElement("h2",{className:I.tabTitle},"Your Campaigns"),s.createElement("button",{onClick:()=>h(!0),className:I.createButton},s.createElement(z,{name:"Plus"})," New Campaign")),m.length===0?s.createElement("div",{className:I.emptyState},s.createElement("p",null,"You haven't created any campaigns yet."),s.createElement("button",{onClick:()=>h(!0),className:I.emptyStateButton},"Create Your First Campaign")):s.createElement("div",{className:I.campaignsGrid},m.map(L=>s.createElement("div",{key:L.name,className:I.campaignCard},s.createElement("h3",{className:I.campaignName},L.name),s.createElement("div",{className:I.campaignStats},s.createElement("div",{className:I.campaignStat},s.createElement("span",{className:I.campaignStatLabel},"Clicks"),s.createElement("span",{className:I.campaignStatValue},L.clicks)),s.createElement("div",{className:I.campaignStat},s.createElement("span",{className:I.campaignStatLabel},"Conversions"),s.createElement("span",{className:I.campaignStatValue},L.conversions)),s.createElement("div",{className:I.campaignStat},s.createElement("span",{className:I.campaignStatLabel},"Conv. Rate"),s.createElement("span",{className:I.campaignStatValue},L.conversionRate,"%")),s.createElement("div",{className:I.campaignStat},s.createElement("span",{className:I.campaignStatLabel},"Earnings"),s.createElement("span",{className:I.campaignStatValue},ee(L.earnings)))),s.createElement("div",{className:I.campaignLink},s.createElement("code",{className:I.campaignLinkCode},L.link),s.createElement("button",{onClick:()=>R(L.link),className:I.copySmallButton},s.createElement(z,{name:"Copy"}))),s.createElement("p",{className:I.campaignCreated},"Created: ",ae(L.createdAt)))))),t==="referrals"&&s.createElement("div",{className:I.referrals},s.createElement("h2",{className:I.tabTitle},"Your Referrals"),c.length===0?s.createElement("div",{className:I.emptyState},s.createElement("p",null,"You haven't made any referrals yet."),s.createElement("p",{className:I.emptyStateSub},"Share your affiliate link to start earning!")):s.createElement("div",{className:I.referralsTable},s.createElement("div",{className:I.referralsHeader},s.createElement("span",null,"Customer"),s.createElement("span",null,"Ebook"),s.createElement("span",null,"Amount"),s.createElement("span",null,"Commission"),s.createElement("span",null,"Date")),c.map(L=>s.createElement("div",{key:L.id,className:I.referralRow},s.createElement("span",{className:I.referralCell},s.createElement("span",{className:I.referralCellLabel},"Customer:"),L.customer),s.createElement("span",{className:I.referralCell},s.createElement("span",{className:I.referralCellLabel},"Ebook:"),L.ebook),s.createElement("span",{className:I.referralCell},s.createElement("span",{className:I.referralCellLabel},"Amount:"),L.amount),s.createElement("span",{className:I.referralCell},s.createElement("span",{className:I.referralCellLabel},"Commission:"),s.createElement("span",{className:I.commissionAmount},L.commission)),s.createElement("span",{className:I.referralCell},s.createElement("span",{className:I.referralCellLabel},"Date:"),ae(L.date)))))),t==="payouts"&&s.createElement("div",{className:I.payouts},s.createElement("h2",{className:I.tabTitle},"Payout Settings"),s.createElement("div",{className:I.payoutsGrid},s.createElement("div",{className:I.bankDetailsCard},s.createElement("h3",{className:I.cardTitle},"Bank Details"),k?s.createElement("div",{className:I.bankDetails},s.createElement("div",{className:I.bankDetail},s.createElement("span",{className:I.bankDetailLabel},"Account Number:"),s.createElement("span",{className:I.bankDetailValue},S.accountNumber)),s.createElement("div",{className:I.bankDetail},s.createElement("span",{className:I.bankDetailLabel},"Account Name:"),s.createElement("span",{className:I.bankDetailValue},S.accountName)),s.createElement("div",{className:I.bankDetail},s.createElement("span",{className:I.bankDetailLabel},"Bank:"),s.createElement("span",{className:I.bankDetailValue},S.bankName)),s.createElement("button",{onClick:()=>E(!1),className:I.editButton},"Edit Details")):s.createElement("div",{className:I.bankForm},s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Account Number"),s.createElement("input",{type:"text",value:S.accountNumber,onChange:L=>y({...S,accountNumber:L.target.value}),placeholder:"10-digit account number",maxLength:"10"})),s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Account Name"),s.createElement("input",{type:"text",value:S.accountName,onChange:L=>y({...S,accountName:L.target.value}),placeholder:"Full account name"})),s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Bank Code"),s.createElement("input",{type:"text",value:S.bankCode,onChange:L=>y({...S,bankCode:L.target.value}),placeholder:"e.g., 058 for GTBank"})),s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Bank Name"),s.createElement("input",{type:"text",value:S.bankName,onChange:L=>y({...S,bankName:L.target.value}),placeholder:"e.g., GTBank"})),s.createElement("button",{onClick:ne,className:I.saveButton,disabled:a},a?"Saving...":"Save Bank Details"))),s.createElement("div",{className:I.payoutCard},s.createElement("h3",{className:I.cardTitle},"Request Payout"),s.createElement("div",{className:I.earningsSummary},s.createElement("div",{className:I.earningRow},s.createElement("span",null,"Pending Earnings:"),s.createElement("span",{className:I.earningAmount},((H=r==null?void 0:r.earnings)==null?void 0:H.formattedPending)||"₦0")),s.createElement("div",{className:I.earningRow},s.createElement("span",null,"Minimum Payout:"),s.createElement("span",{className:I.earningAmount},((Y=r==null?void 0:r.payout)==null?void 0:Y.formattedThreshold)||"₦5,000"))),k?s.createElement("div",{className:I.payoutForm},s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Amount to Withdraw (₦)"),s.createElement("input",{type:"number",value:C,onChange:L=>A(L.target.value),placeholder:"Enter amount",min:(oe=r==null?void 0:r.payout)!=null&&oe.threshold?r.payout.threshold/100:50,max:(pe=l==null?void 0:l.pending)!=null&&pe.amount?l.pending.amount/100:0})),s.createElement("button",{onClick:ve,className:I.payoutButton,disabled:a||!C||parseFloat(C)<((ze=r==null?void 0:r.payout)!=null&&ze.threshold?r.payout.threshold/100:50)},a?"Processing...":"Request Payout"),s.createElement("p",{className:I.payoutNote},"Payouts are processed within 7 business days")):s.createElement("div",{className:I.bankRequired},s.createElement("p",null,"Please add your bank details first to request payouts.")))))),f&&s.createElement("div",{className:I.modalOverlay},s.createElement("div",{className:I.modal},s.createElement("div",{className:I.modalHeader},s.createElement("h3",{className:I.modalTitle},"Create New Campaign"),s.createElement("button",{onClick:()=>h(!1),className:I.modalClose},s.createElement(z,{name:"X"}))),s.createElement("div",{className:I.modalBody},s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Campaign Name *"),s.createElement("input",{type:"text",value:p.name,onChange:L=>N({...p,name:L.target.value}),placeholder:"e.g., Twitter Promo, WhatsApp Status"})),s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Description (Optional)"),s.createElement("textarea",{value:p.description,onChange:L=>N({...p,description:L.target.value}),placeholder:"Describe your campaign",rows:"3"})),s.createElement("div",{className:I.formRow},s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Medium (Optional)"),s.createElement("input",{type:"text",value:p.medium,onChange:L=>N({...p,medium:L.target.value}),placeholder:"e.g., social, email"})),s.createElement("div",{className:I.formGroup},s.createElement("label",null,"Source (Optional)"),s.createElement("input",{type:"text",value:p.source,onChange:L=>N({...p,source:L.target.value}),placeholder:"e.g., twitter, facebook"})))),s.createElement("div",{className:I.modalFooter},s.createElement("button",{onClick:()=>h(!1),className:I.cancelButton},"Cancel"),s.createElement("button",{onClick:Z,className:I.createButton,disabled:a||!p.name},a?"Creating...":"Create Campaign")))))};function SS(){const[e,t]=b.useState(!1),n=()=>{t(!0)},a=()=>{t(!1)};return s.createElement(Cg,null,s.createElement(yn,{path:"/",element:s.createElement(lb,{onPurchase:n,purchaseComplete:e})}),s.createElement(yn,{path:"/thank-you",element:s.createElement(BE,{onBackToHome:a,purchaseComplete:e})}),s.createElement(yn,{path:"*",element:s.createElement(_g,{to:"/"})}),s.createElement(yn,{path:"/read/:ebookId",element:s.createElement(FE,null)}),s.createElement(yn,{path:"/affiliate/token/:token",element:s.createElement(jE,null)}),s.createElement(yn,{path:"/affiliate/dashboard",element:s.createElement(ES,null)}))}const _S=Ss.createRoot(document.getElementById("root"));_S.render(s.createElement(s.StrictMode,null,s.createElement(Pg,null,s.createElement(SS,null))));
