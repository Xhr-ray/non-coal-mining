(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Qn(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const z={},_t=[],He=()=>{},Qs=()=>!1,hn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),gn=e=>e.startsWith("onUpdate:"),oe=Object.assign,es=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},mr=Object.prototype.hasOwnProperty,H=(e,t)=>mr.call(e,t),M=Array.isArray,bt=e=>Ut(e)==="[object Map]",ei=e=>Ut(e)==="[object Set]",bs=e=>Ut(e)==="[object Date]",I=e=>typeof e=="function",ee=e=>typeof e=="string",$e=e=>typeof e=="symbol",$=e=>e!==null&&typeof e=="object",ti=e=>($(e)||I(e))&&I(e.then)&&I(e.catch),ni=Object.prototype.toString,Ut=e=>ni.call(e),yr=e=>Ut(e).slice(8,-1),si=e=>Ut(e)==="[object Object]",ts=e=>ee(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ot=Qn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),mn=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},_r=/-\w/g,Ee=mn(e=>e.replace(_r,t=>t.slice(1).toUpperCase())),br=/\B([A-Z])/g,ht=mn(e=>e.replace(br,"-$1").toLowerCase()),ii=mn(e=>e.charAt(0).toUpperCase()+e.slice(1)),Pn=mn(e=>e?`on${ii(e)}`:""),Ge=(e,t)=>!Object.is(e,t),An=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ri=(e,t,n,s=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:s,value:n})},vr=e=>{const t=parseFloat(e);return isNaN(t)?e:t},xr=e=>{const t=ee(e)?Number(e):NaN;return isNaN(t)?e:t};let vs;const yn=()=>vs||(vs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function _n(e){if(M(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],i=ee(s)?Tr(s):_n(s);if(i)for(const r in i)t[r]=i[r]}return t}else if(ee(e)||$(e))return e}const Sr=/;(?![^(]*\))/g,Cr=/:([^]+)/,Dr=/\/\*[^]*?\*\//g;function Tr(e){const t={};return e.replace(Dr,"").split(Sr).forEach(n=>{if(n){const s=n.split(Cr);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function bn(e){let t="";if(ee(e))t=e;else if(M(e))for(let n=0;n<e.length;n++){const s=bn(e[n]);s&&(t+=s+" ")}else if($(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const wr="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Er=Qn(wr);function oi(e){return!!e||e===""}function Pr(e,t){if(e.length!==t.length)return!1;let n=!0;for(let s=0;n&&s<e.length;s++)n=ns(e[s],t[s]);return n}function ns(e,t){if(e===t)return!0;let n=bs(e),s=bs(t);if(n||s)return n&&s?e.getTime()===t.getTime():!1;if(n=$e(e),s=$e(t),n||s)return e===t;if(n=M(e),s=M(t),n||s)return n&&s?Pr(e,t):!1;if(n=$(e),s=$(t),n||s){if(!n||!s)return!1;const i=Object.keys(e).length,r=Object.keys(t).length;if(i!==r)return!1;for(const o in e){const l=e.hasOwnProperty(o),c=t.hasOwnProperty(o);if(l&&!c||!l&&c||!ns(e[o],t[o]))return!1}}return String(e)===String(t)}const li=e=>!!(e&&e.__v_isRef===!0),we=e=>ee(e)?e:e==null?"":M(e)||$(e)&&(e.toString===ni||!I(e.toString))?li(e)?we(e.value):JSON.stringify(e,ci,2):String(e),ci=(e,t)=>li(t)?ci(e,t.value):bt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[s,i],r)=>(n[Mn(s,r)+" =>"]=i,n),{})}:ei(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Mn(n))}:$e(t)?Mn(t):$(t)&&!M(t)&&!si(t)?String(t):t,Mn=(e,t="")=>{var n;return $e(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ce;class Ar{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&ce&&(ce.active?(this.parent=ce,this.index=(ce.scopes||(ce.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes){const s=this.scopes.slice();for(t=0,n=s.length;t<n;t++)s[t].pause()}for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes){const i=this.scopes.slice();for(t=0,n=i.length;t<n;t++)i[t].resume()}const s=this.effects.slice();for(t=0,n=s.length;t<n;t++)s[t].resume()}}run(t){if(this._active){const n=ce;try{return ce=this,t()}finally{ce=n}}}on(){++this._on===1&&(this.prevScope=ce,ce=this)}off(){if(this._on>0&&--this._on===0){if(ce===this)ce=this.prevScope;else{let t=ce;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){const i=this.scopes.slice();for(n=0,s=i.length;n<s;n++)i[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function Mr(){return ce}let Y;const On=new WeakSet;class ai{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ce&&(ce.active?ce.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,On.has(this)&&(On.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||ui(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,xs(this),di(this);const t=Y,n=Pe;Y=this,Pe=!0;try{return this.fn()}finally{pi(this),Y=t,Pe=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)rs(t);this.deps=this.depsTail=void 0,xs(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?On.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){kn(this)&&this.run()}get dirty(){return kn(this)}}let fi=0,It,Lt;function ui(e,t=!1){if(e.flags|=8,t){e.next=Lt,Lt=e;return}e.next=It,It=e}function ss(){fi++}function is(){if(--fi>0)return;if(Lt){let t=Lt;for(Lt=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;It;){let t=It;for(It=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(s){e||(e=s)}t=n}}if(e)throw e}function di(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function pi(e){let t,n=e.depsTail,s=n;for(;s;){const i=s.prevDep;s.version===-1?(s===n&&(n=i),rs(s),Or(s)):t=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}e.deps=t,e.depsTail=n}function kn(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(hi(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function hi(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Nt)||(e.globalVersion=Nt,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!kn(e))))return;e.flags|=2;const t=e.dep,n=Y,s=Pe;Y=e,Pe=!0;try{di(e);const i=e.fn(e._value);(t.version===0||Ge(i,e._value))&&(e.flags|=128,e._value=i,t.version++)}catch(i){throw t.version++,i}finally{Y=n,Pe=s,pi(e),e.flags&=-3}}function rs(e,t=!1){const{dep:n,prevSub:s,nextSub:i}=e;if(s&&(s.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=s,e.nextSub=void 0),n.subs===e&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)rs(r,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Or(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Pe=!0;const gi=[];function Ye(){gi.push(Pe),Pe=!1}function ze(){const e=gi.pop();Pe=e===void 0?!0:e}function xs(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Y;Y=void 0;try{t()}finally{Y=n}}}let Nt=0;class Ir{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class mi{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Y||!Pe||Y===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Y)n=this.activeLink=new Ir(Y,this),Y.deps?(n.prevDep=Y.depsTail,Y.depsTail.nextDep=n,Y.depsTail=n):Y.deps=Y.depsTail=n,yi(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Y.depsTail,n.nextDep=void 0,Y.depsTail.nextDep=n,Y.depsTail=n,Y.deps===n&&(Y.deps=s)}return n}trigger(t){this.version++,Nt++,this.notify(t)}notify(t){ss();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{is()}}}function yi(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let s=t.deps;s;s=s.nextDep)yi(s)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const Kn=new WeakMap,ut=Symbol(""),Wn=Symbol(""),jt=Symbol("");function fe(e,t,n){if(Pe&&Y){let s=Kn.get(e);s||Kn.set(e,s=new Map);let i=s.get(n);i||(s.set(n,i=new mi),i.map=s,i.key=n),i.track()}}function qe(e,t,n,s,i,r){const o=Kn.get(e);if(!o){Nt++;return}const l=c=>{c&&c.trigger()};if(ss(),t==="clear")o.forEach(l);else{const c=M(e),d=c&&ts(n);if(c&&n==="length"){const f=Number(s);o.forEach((p,v)=>{(v==="length"||v===jt||!$e(v)&&v>=f)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),d&&l(o.get(jt)),t){case"add":c?d&&l(o.get("length")):(l(o.get(ut)),bt(e)&&l(o.get(Wn)));break;case"delete":c||(l(o.get(ut)),bt(e)&&l(o.get(Wn)));break;case"set":bt(e)&&l(o.get(ut));break}}is()}function gt(e){const t=k(e);return t===e?t:(fe(t,"iterate",jt),Ae(e)?t:t.map(Je))}function vn(e){return fe(e=k(e),"iterate",jt),e}function Be(e,t){return tt(e)?St(dt(e)?Je(t):t):Je(t)}const Lr={__proto__:null,[Symbol.iterator](){return In(this,Symbol.iterator,e=>Be(this,e))},concat(...e){return gt(this).concat(...e.map(t=>M(t)?gt(t):t))},entries(){return In(this,"entries",e=>(e[1]=Be(this,e[1]),e))},every(e,t){return ke(this,"every",e,t,void 0,arguments)},filter(e,t){return ke(this,"filter",e,t,n=>n.map(s=>Be(this,s)),arguments)},find(e,t){return ke(this,"find",e,t,n=>Be(this,n),arguments)},findIndex(e,t){return ke(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ke(this,"findLast",e,t,n=>Be(this,n),arguments)},findLastIndex(e,t){return ke(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ke(this,"forEach",e,t,void 0,arguments)},includes(...e){return Ln(this,"includes",e)},indexOf(...e){return Ln(this,"indexOf",e)},join(e){return gt(this).join(e)},lastIndexOf(...e){return Ln(this,"lastIndexOf",e)},map(e,t){return ke(this,"map",e,t,void 0,arguments)},pop(){return wt(this,"pop")},push(...e){return wt(this,"push",e)},reduce(e,...t){return Ss(this,"reduce",e,t)},reduceRight(e,...t){return Ss(this,"reduceRight",e,t)},shift(){return wt(this,"shift")},some(e,t){return ke(this,"some",e,t,void 0,arguments)},splice(...e){return wt(this,"splice",e)},toReversed(){return gt(this).toReversed()},toSorted(e){return gt(this).toSorted(e)},toSpliced(...e){return gt(this).toSpliced(...e)},unshift(...e){return wt(this,"unshift",e)},values(){return In(this,"values",e=>Be(this,e))}};function In(e,t,n){const s=vn(e),i=s[t]();return s!==e&&!Ae(e)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=n(r.value)),r}),i}const Fr=Array.prototype;function ke(e,t,n,s,i,r){const o=vn(e),l=o!==e&&!Ae(e),c=o[t];if(c!==Fr[t]){const p=c.apply(e,r);return l?Je(p):p}let d=n;o!==e&&(l?d=function(p,v){return n.call(this,Be(e,p),v,e)}:n.length>2&&(d=function(p,v){return n.call(this,p,v,e)}));const f=c.call(o,d,s);return l&&i?i(f):f}function Ss(e,t,n,s){const i=vn(e),r=i!==e&&!Ae(e);let o=n,l=!1;i!==e&&(r?(l=s.length===0,o=function(d,f,p){return l&&(l=!1,d=Be(e,d)),n.call(this,d,Be(e,f),p,e)}):n.length>3&&(o=function(d,f,p){return n.call(this,d,f,p,e)}));const c=i[t](o,...s);return l?Be(e,c):c}function Ln(e,t,n){const s=k(e);fe(s,"iterate",jt);const i=s[t](...n);return(i===-1||i===!1)&&as(n[0])?(n[0]=k(n[0]),s[t](...n)):i}function wt(e,t,n=[]){Ye(),ss();const s=k(e)[t].apply(e,n);return is(),ze(),s}const Rr=Qn("__proto__,__v_isRef,__isVue"),_i=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter($e));function Br(e){$e(e)||(e=String(e));const t=k(this);return fe(t,"has",e),t.hasOwnProperty(e)}class bi{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){if(n==="__v_skip")return t.__v_skip;const i=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?Gr:Ci:r?Si:xi).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const o=M(t);if(!i){let c;if(o&&(c=Lr[n]))return c;if(n==="hasOwnProperty")return Br}const l=Reflect.get(t,n,me(t)?t:s);if(($e(n)?_i.has(n):Rr(n))||(i||fe(t,"get",n),r))return l;if(me(l)){const c=o&&ts(n)?l:l.value;return i&&$(c)?Gn(c):c}return $(l)?i?Gn(l):ls(l):l}}class vi extends bi{constructor(t=!1){super(!1,t)}set(t,n,s,i){let r=t[n];const o=M(t)&&ts(n);if(!this._isShallow){const d=tt(r);if(!Ae(s)&&!tt(s)&&(r=k(r),s=k(s)),!o&&me(r)&&!me(s))return d||(r.value=s),!0}const l=o?Number(n)<t.length:H(t,n),c=Reflect.set(t,n,s,me(t)?t:i);return t===k(i)&&c&&(l?Ge(s,r)&&qe(t,"set",n,s):qe(t,"add",n,s)),c}deleteProperty(t,n){const s=H(t,n);t[n];const i=Reflect.deleteProperty(t,n);return i&&s&&qe(t,"delete",n,void 0),i}has(t,n){const s=Reflect.has(t,n);return(!$e(n)||!_i.has(n))&&fe(t,"has",n),s}ownKeys(t){return fe(t,"iterate",M(t)?"length":ut),Reflect.ownKeys(t)}}class Nr extends bi{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const jr=new vi,Hr=new Nr,$r=new vi(!0);const Un=e=>e,Jt=e=>Reflect.getPrototypeOf(e);function Vr(e,t,n){return function(...s){const i=this.__v_raw,r=k(i),o=bt(r),l=e==="entries"||e===Symbol.iterator&&o,c=e==="keys"&&o,d=i[e](...s),f=n?Un:t?St:Je;return!t&&fe(r,"iterate",c?Wn:ut),oe(Object.create(d),{next(){const{value:p,done:v}=d.next();return v?{value:p,done:v}:{value:l?[f(p[0]),f(p[1])]:f(p),done:v}}})}}function Xt(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function kr(e,t){const n={get(i){const r=this.__v_raw,o=k(r),l=k(i);e||(Ge(i,l)&&fe(o,"get",i),fe(o,"get",l));const{has:c}=Jt(o),d=t?Un:e?St:Je;if(c.call(o,i))return d(r.get(i));if(c.call(o,l))return d(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!e&&fe(k(i),"iterate",ut),i.size},has(i){const r=this.__v_raw,o=k(r),l=k(i);return e||(Ge(i,l)&&fe(o,"has",i),fe(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,c=k(l),d=t?Un:e?St:Je;return!e&&fe(c,"iterate",ut),l.forEach((f,p)=>i.call(r,d(f),d(p),o))}};return oe(n,e?{add:Xt("add"),set:Xt("set"),delete:Xt("delete"),clear:Xt("clear")}:{add(i){const r=k(this),o=Jt(r),l=k(i),c=!t&&!Ae(i)&&!tt(i)?l:i;return o.has.call(r,c)||Ge(i,c)&&o.has.call(r,i)||Ge(l,c)&&o.has.call(r,l)||(r.add(c),qe(r,"add",c,c)),this},set(i,r){!t&&!Ae(r)&&!tt(r)&&(r=k(r));const o=k(this),{has:l,get:c}=Jt(o);let d=l.call(o,i);d||(i=k(i),d=l.call(o,i));const f=c.call(o,i);return o.set(i,r),d?Ge(r,f)&&qe(o,"set",i,r):qe(o,"add",i,r),this},delete(i){const r=k(this),{has:o,get:l}=Jt(r);let c=o.call(r,i);c||(i=k(i),c=o.call(r,i)),l&&l.call(r,i);const d=r.delete(i);return c&&qe(r,"delete",i,void 0),d},clear(){const i=k(this),r=i.size!==0,o=i.clear();return r&&qe(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{n[i]=Vr(i,e,t)}),n}function os(e,t){const n=kr(e,t);return(s,i,r)=>i==="__v_isReactive"?!e:i==="__v_isReadonly"?e:i==="__v_raw"?s:Reflect.get(H(n,i)&&i in s?n:s,i,r)}const Kr={get:os(!1,!1)},Wr={get:os(!1,!0)},Ur={get:os(!0,!1)};const xi=new WeakMap,Si=new WeakMap,Ci=new WeakMap,Gr=new WeakMap;function qr(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ls(e){return tt(e)?e:cs(e,!1,jr,Kr,xi)}function Yr(e){return cs(e,!1,$r,Wr,Si)}function Gn(e){return cs(e,!0,Hr,Ur,Ci)}function cs(e,t,n,s,i){if(!$(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;const r=i.get(e);if(r)return r;const o=qr(yr(e));if(o===0)return e;const l=new Proxy(e,o===2?s:n);return i.set(e,l),l}function dt(e){return tt(e)?dt(e.__v_raw):!!(e&&e.__v_isReactive)}function tt(e){return!!(e&&e.__v_isReadonly)}function Ae(e){return!!(e&&e.__v_isShallow)}function as(e){return e?!!e.__v_raw:!1}function k(e){const t=e&&e.__v_raw;return t?k(t):e}function zr(e){return!H(e,"__v_skip")&&Object.isExtensible(e)&&ri(e,"__v_skip",!0),e}const Je=e=>$(e)?ls(e):e,St=e=>$(e)?Gn(e):e;function me(e){return e?e.__v_isRef===!0:!1}function Jr(e){return me(e)?e.value:e}const Xr={get:(e,t,n)=>t==="__v_raw"?e:Jr(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const i=e[t];return me(i)&&!me(n)?(i.value=n,!0):Reflect.set(e,t,n,s)}};function Di(e){return dt(e)?e:new Proxy(e,Xr)}class Zr{constructor(t,n,s){this.fn=t,this.setter=n,this._value=void 0,this.dep=new mi(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Nt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Y!==this)return ui(this,!0),!0}get value(){const t=this.dep.track();return hi(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Qr(e,t,n=!1){let s,i;return I(e)?s=e:(s=e.get,i=e.set),new Zr(s,i,n)}const Zt={},sn=new WeakMap;let at;function eo(e,t=!1,n=at){if(n){let s=sn.get(n);s||sn.set(n,s=[]),s.push(e)}}function to(e,t,n=z){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:c}=n,d=w=>i?w:Ae(w)||i===!1||i===0?et(w,1):et(w);let f,p,v,D,L=!1,A=!1;if(me(e)?(p=()=>e.value,L=Ae(e)):dt(e)?(p=()=>d(e),L=!0):M(e)?(A=!0,L=e.some(w=>dt(w)||Ae(w)),p=()=>e.map(w=>{if(me(w))return w.value;if(dt(w))return d(w);if(I(w))return c?c(w,2):w()})):I(e)?t?p=c?()=>c(e,2):e:p=()=>{if(v){Ye();try{v()}finally{ze()}}const w=at;at=f;try{return c?c(e,3,[D]):e(D)}finally{at=w}}:p=He,t&&i){const w=p,U=i===!0?1/0:i;p=()=>et(w(),U)}const J=Mr(),V=()=>{f.stop(),J&&J.active&&es(J.effects,f)};if(r&&t){const w=t;t=(...U)=>{const ne=w(...U);return V(),ne}}let R=A?new Array(e.length).fill(Zt):Zt;const N=w=>{if(!(!(f.flags&1)||!f.dirty&&!w))if(t){const U=f.run();if(w||i||L||(A?U.some((ne,ue)=>Ge(ne,R[ue])):Ge(U,R))){v&&v();const ne=at;at=f;try{const ue=[U,R===Zt?void 0:A&&R[0]===Zt?[]:R,D];R=U,c?c(t,3,ue):t(...ue)}finally{at=ne}}}else f.run()};return l&&l(N),f=new ai(p),f.scheduler=o?()=>o(N,!1):N,D=w=>eo(w,!1,f),v=f.onStop=()=>{const w=sn.get(f);if(w){if(c)c(w,4);else for(const U of w)U();sn.delete(f)}},t?s?N(!0):R=f.run():o?o(N.bind(null,!0),!0):f.run(),V.pause=f.pause.bind(f),V.resume=f.resume.bind(f),V.stop=V,V}function et(e,t=1/0,n){if(t<=0||!$(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,me(e))et(e.value,t,n);else if(M(e))for(let s=0;s<e.length;s++)et(e[s],t,n);else if(ei(e)||bt(e))e.forEach(s=>{et(s,t,n)});else if(si(e)){for(const s in e)et(e[s],t,n);for(const s of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,s)&&et(e[s],t,n)}return e}/**
* @vue/runtime-core v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Gt(e,t,n,s){try{return s?e(...s):e()}catch(i){xn(i,t,n)}}function Te(e,t,n,s){if(I(e)){const i=Gt(e,t,n,s);return i&&ti(i)&&i.catch(r=>{xn(r,t,n)}),i}if(M(e)){const i=[];for(let r=0;r<e.length;r++)i.push(Te(e[r],t,n,s));return i}}function xn(e,t,n,s=!0){const i=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||z;if(t){let l=t.parent;const c=t.proxy,d=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const f=l.ec;if(f){for(let p=0;p<f.length;p++)if(f[p](e,c,d)===!1)return}l=l.parent}if(r){Ye(),Gt(r,null,10,[e,c,d]),ze();return}}no(e,n,i,s,o)}function no(e,t,n,s=!0,i=!1){if(i)throw e;console.error(e)}const pe=[];let Re=-1;const vt=[];let Qe=null,mt=0;const Ti=Promise.resolve();let rn=null;function so(e){const t=rn||Ti;return e?t.then(this?e.bind(this):e):t}function io(e){let t=Re+1,n=pe.length;for(;t<n;){const s=t+n>>>1,i=pe[s],r=Ht(i);r<e||r===e&&i.flags&2?t=s+1:n=s}return t}function fs(e){if(!(e.flags&1)){const t=Ht(e),n=pe[pe.length-1];!n||!(e.flags&2)&&t>=Ht(n)?pe.push(e):pe.splice(io(t),0,e),e.flags|=1,wi()}}function wi(){rn||(rn=Ti.then(Pi))}function ro(e){if(!M(e))Qe&&e.id===-1?Qe.splice(mt+1,0,e):e.flags&1||(vt.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)vt.push(e[t]);wi()}function Cs(e,t,n=Re+1){for(;n<pe.length;n++){const s=pe[n];if(s&&s.flags&2){if(e&&s.id!==e.uid)continue;pe.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Ei(e){if(vt.length){const t=[...new Set(vt)].sort((n,s)=>Ht(n)-Ht(s));if(vt.length=0,Qe){for(let n=0;n<t.length;n++)Qe.push(t[n]);return}for(Qe=t,mt=0;mt<Qe.length;mt++){const n=Qe[mt];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Qe=null,mt=0}}const Ht=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Pi(e){try{for(Re=0;Re<pe.length;Re++){const t=pe[Re];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Gt(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Re<pe.length;Re++){const t=pe[Re];t&&(t.flags&=-2)}Re=-1,pe.length=0,Ei(),rn=null,(pe.length||vt.length)&&Pi()}}let je=null,Ai=null;function on(e){const t=je;return je=e,Ai=e&&e.type.__scopeId||null,t}function Mi(e,t=je,n){if(!t||e._n)return e;const s=(...i)=>{s._d&&fn(-1);const r=on(t),o=pt.length;let l;try{l=e(...i)}finally{for(let c=pt.length;c>o;c--)or();on(r),s._d&&fn(1)}return l};return s._n=!0,s._c=!0,s._d=!0,s}function rt(e,t,n,s){const i=e.dirs,r=t&&t.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let c=l.dir[s];c&&(Ye(),Te(c,n,8,[e.el,l,e,t]),ze())}}function oo(e,t){if(ge){let n=ge.provides;const s=ge.parent&&ge.parent.provides;s===n&&(n=ge.provides=Object.create(s)),n[e]=t}}function tn(e,t,n=!1){const s=ar();if(s||xt){let i=xt?xt._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&I(t)?t.call(s&&s.proxy):t}}const lo=Symbol.for("v-scx"),co=()=>tn(lo);function Fn(e,t,n){return Oi(e,t,n)}function Oi(e,t,n=z){const{immediate:s,deep:i,flush:r,once:o}=n,l=oe({},n),c=t&&s||!t&&r!=="post";let d;if(Kt){if(r==="sync"){const D=co();d=D.__watcherHandles||(D.__watcherHandles=[])}else if(!c){const D=()=>{};return D.stop=He,D.resume=He,D.pause=He,D}}const f=ge;l.call=(D,L,A)=>Te(D,f,L,A);let p=!1;r==="post"?l.scheduler=D=>{_e(D,f&&f.suspense)}:r!=="sync"&&(p=!0,l.scheduler=(D,L)=>{L?D():fs(D)}),l.augmentJob=D=>{t&&(D.flags|=4),p&&(D.flags|=2,f&&(D.id=f.uid,D.i=f))};const v=to(e,t,l);return Kt&&(d?d.push(v):c&&v()),v}function ao(e,t,n){const s=this.proxy,i=ee(e)?e.includes(".")?Ii(s,e):()=>s[e]:e.bind(s,s);let r;I(t)?r=t:(r=t.handler,n=t);const o=qt(this),l=Oi(i,r.bind(s),n);return o(),l}function Ii(e,t){const n=t.split(".");return()=>{let s=e;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}const fo=Symbol("_vte"),Sn=e=>e.__isTeleport,De=Symbol("_leaveCb"),Et=Symbol("_enterCb");function uo(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return $i(()=>{e.isMounted=!0}),Vi(()=>{e.isUnmounting=!0}),e}const Ce=[Function,Array],Li={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Ce,onEnter:Ce,onAfterEnter:Ce,onEnterCancelled:Ce,onBeforeLeave:Ce,onLeave:Ce,onAfterLeave:Ce,onLeaveCancelled:Ce,onBeforeAppear:Ce,onAppear:Ce,onAfterAppear:Ce,onAppearCancelled:Ce},Fi=e=>{const t=e.subTree;return t.component?Fi(t.component):t},po={name:"BaseTransition",props:Li,setup(e,{slots:t}){const n=ar(),s=uo();return()=>{const i=t.default&&Ni(t.default(),!0),r=i&&i.length?Ri(i):n.subTree?yt():void 0;if(!r)return;const o=k(e),{mode:l}=o;if(s.isLeaving)return Rn(r);const c=ln(r);if(!c)return Rn(r);let d=qn(c,o,s,n,p=>d=p);c.type!==he&&$t(c,d);let f=n.subTree&&ln(n.subTree);if(f&&f.type!==he&&!ft(f,c)&&Fi(n).type!==he){let p=qn(f,o,s,n);if($t(f,p),l==="out-in"&&c.type!==he)return s.isLeaving=!0,p.afterLeave=()=>{s.isLeaving=!1,n.job.flags&8||n.update(),delete p.afterLeave,f=void 0},Rn(r);l==="in-out"&&c.type!==he?p.delayLeave=(v,D,L)=>{const A=Bi(s,f);A[String(f.key)]=f,v[De]=()=>{D(),v[De]=void 0,delete d.delayedLeave,f=void 0},d.delayedLeave=()=>{L(),delete d.delayedLeave,f=void 0}}:f=void 0}else f&&(f=void 0);return r}}};function Ri(e){let t=e[0];if(e.length>1){for(const n of e)if(n.type!==he){t=n;break}}return t}const ho=po;function Bi(e,t){const{leavingVNodes:n}=e;let s=n.get(t.type);return s||(s=Object.create(null),n.set(t.type,s)),s}function qn(e,t,n,s,i){const{appear:r,mode:o,persisted:l=!1,onBeforeEnter:c,onEnter:d,onAfterEnter:f,onEnterCancelled:p,onBeforeLeave:v,onLeave:D,onAfterLeave:L,onLeaveCancelled:A,onBeforeAppear:J,onAppear:V,onAfterAppear:R,onAppearCancelled:N}=t,w=String(e.key),U=Bi(n,e),ne=(F,K)=>{F&&Te(F,s,9,K)},ue=(F,K)=>{const Z=K[1];ne(F,K),M(F)?F.every(T=>T.length<=1)&&Z():F.length<=1&&Z()},ye={mode:o,persisted:l,beforeEnter(F){let K=c;if(!n.isMounted)if(r)K=J||c;else return;F[De]&&F[De](!0);const Z=U[w];Z&&ft(e,Z)&&Z.el[De]&&Z.el[De](),ne(K,[F])},enter(F){if(U[w]===e)return;let K=d,Z=f,T=p;if(!n.isMounted)if(r)K=V||d,Z=R||f,T=N||p;else return;let X=!1;F[Et]=Ve=>{X||(X=!0,Ve?ne(T,[F]):ne(Z,[F]),ye.delayedLeave&&ye.delayedLeave(),F[Et]=void 0)};const ae=F[Et].bind(null,!1);K?ue(K,[F,ae]):ae()},leave(F,K){const Z=String(e.key);if(F[Et]&&F[Et](!0),n.isUnmounting)return K();ne(v,[F]);let T=!1;F[De]=ae=>{T||(T=!0,K(),ae?ne(A,[F]):ne(L,[F]),F[De]=void 0,U[Z]===e&&delete U[Z])};const X=F[De].bind(null,!1);U[Z]=e,D?ue(D,[F,X]):X()},clone(F){const K=qn(F,t,n,s,i);return i&&i(K),K}};return ye}function Rn(e){if(Cn(e))return e=nt(e),e.children=null,e}function ln(e){if(!Cn(e))return Sn(e.type)&&e.children?Ri(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&I(n.default))return n.default()}}function $t(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;const n=e.component.subTree;$t(Sn(n.type)&&ln(n)||n,t)}else e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ni(e,t=!1,n){let s=[],i=0;for(let r=0;r<e.length;r++){let o=e[r];const l=n==null?o.key:String(n)+String(o.key!=null?o.key:r);o.type===be?(o.patchFlag&128&&i++,s=s.concat(Ni(o.children,t,l))):(t||o.type!==he)&&s.push(l!=null?nt(o,{key:l}):o)}if(i>1)for(let r=0;r<s.length;r++)s[r].patchFlag=-2;return s}function ji(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Ds(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const cn=new WeakMap;function Ft(e,t,n,s,i=!1){if(M(e)){e.forEach((A,J)=>Ft(A,t&&(M(t)?t[J]:t),n,s,i));return}if(Rt(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Ft(e,t,n,s.component.subTree);return}const r=s.shapeFlag&4?ps(s.component):s.el,o=i?null:r,{i:l,r:c}=e,d=t&&t.r,f=l.refs===z?l.refs={}:l.refs,p=l.setupState,v=k(p),D=p===z?Qs:A=>Ds(f,A)?!1:H(v,A),L=(A,J)=>!(J&&Ds(f,J));if(d!=null&&d!==c){if(Ts(t),ee(d))f[d]=null,D(d)&&(p[d]=null);else if(me(d)){const A=t;L(d,A.k)&&(d.value=null),A.k&&(f[A.k]=null)}}if(I(c))Gt(c,l,12,[o,f]);else{const A=ee(c),J=me(c);if(A||J){const V=()=>{if(e.f){const R=A?D(c)?p[c]:f[c]:L()||!e.k?c.value:f[e.k];if(i)M(R)&&es(R,r);else if(M(R))R.includes(r)||R.push(r);else if(A)f[c]=[r],D(c)&&(p[c]=f[c]);else{const N=[r];L(c,e.k)&&(c.value=N),e.k&&(f[e.k]=N)}}else A?(f[c]=o,D(c)&&(p[c]=o)):J&&(L(c,e.k)&&(c.value=o),e.k&&(f[e.k]=o))};if(o){const R=()=>{V(),cn.delete(e)};R.id=-1,cn.set(e,R),_e(R,n)}else Ts(e),V()}}}function Ts(e){const t=cn.get(e);t&&(t.flags|=8,cn.delete(e))}yn().requestIdleCallback;yn().cancelIdleCallback;const Rt=e=>!!e.type.__asyncLoader,Cn=e=>e.type.__isKeepAlive;function go(e,t){Hi(e,"a",t)}function mo(e,t){Hi(e,"da",t)}function Hi(e,t,n=ge){const s=e.__wdc||(e.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return e()});if(Dn(t,s,n),n){let i=n.parent;for(;i&&i.parent;)Cn(i.parent.vnode)&&yo(s,t,n,i),i=i.parent}}function yo(e,t,n,s){const i=Dn(t,e,s,!0);ki(()=>{es(s[t],i)},n)}function Dn(e,t,n=ge,s=!1){if(n){const i=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...o)=>{Ye();const l=qt(n),c=Te(t,n,e,o);return l(),ze(),c});return s?i.unshift(r):i.push(r),r}}const Xe=e=>(t,n=ge)=>{(!Kt||e==="sp")&&Dn(e,(...s)=>t(...s),n)},_o=Xe("bm"),$i=Xe("m"),bo=Xe("bu"),vo=Xe("u"),Vi=Xe("bum"),ki=Xe("um"),xo=Xe("sp"),So=Xe("rtg"),Co=Xe("rtc");function Do(e,t=ge){Dn("ec",e,t)}const To=Symbol.for("v-ndc");function Qt(e,t,n,s){let i;const r=n,o=M(e);if(o||ee(e)){const l=o&&dt(e);let c=!1,d=!1;l&&(c=!Ae(e),d=tt(e),e=vn(e)),i=new Array(e.length);for(let f=0,p=e.length;f<p;f++)i[f]=t(c?d?St(Je(e[f])):Je(e[f]):e[f],f,void 0,r)}else if(typeof e=="number"){i=new Array(e);for(let l=0;l<e;l++)i[l]=t(l+1,l,void 0,r)}else if($(e))if(e[Symbol.iterator])i=Array.from(e,(l,c)=>t(l,c,void 0,r));else{const l=Object.keys(e);i=new Array(l.length);for(let c=0,d=l.length;c<d;c++){const f=l[c];i[c]=t(e[f],f,c,r)}}else i=[];return i}const Yn=e=>e?fr(e)?ps(e):Yn(e.parent):null,Bt=oe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Yn(e.parent),$root:e=>Yn(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Wi(e),$forceUpdate:e=>e.f||(e.f=()=>{fs(e.update)}),$nextTick:e=>e.n||(e.n=so.bind(e.proxy)),$watch:e=>ao.bind(e)}),Bn=(e,t)=>e!==z&&!e.__isScriptSetup&&H(e,t),wo={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:c}=e;if(t[0]!=="$"){const v=o[t];if(v!==void 0)switch(v){case 1:return s[t];case 2:return i[t];case 4:return n[t];case 3:return r[t]}else{if(Bn(s,t))return o[t]=1,s[t];if(i!==z&&H(i,t))return o[t]=2,i[t];if(H(r,t))return o[t]=3,r[t];if(n!==z&&H(n,t))return o[t]=4,n[t];zn&&(o[t]=0)}}const d=Bt[t];let f,p;if(d)return t==="$attrs"&&fe(e.attrs,"get",""),d(e);if((f=l.__cssModules)&&(f=f[t]))return f;if(n!==z&&H(n,t))return o[t]=4,n[t];if(p=c.config.globalProperties,H(p,t))return p[t]},set({_:e},t,n){const{data:s,setupState:i,ctx:r}=e;return Bn(i,t)?(i[t]=n,!0):s!==z&&H(s,t)?(s[t]=n,!0):H(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:i,props:r,type:o}},l){let c;return!!(n[l]||e!==z&&l[0]!=="$"&&H(e,l)||Bn(t,l)||H(r,l)||H(s,l)||H(Bt,l)||H(i.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:H(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function ws(e){return M(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let zn=!0;function Eo(e){const t=Wi(e),n=e.proxy,s=e.ctx;zn=!1,t.beforeCreate&&Es(t.beforeCreate,e,"bc");const{data:i,computed:r,methods:o,watch:l,provide:c,inject:d,created:f,beforeMount:p,mounted:v,beforeUpdate:D,updated:L,activated:A,deactivated:J,beforeDestroy:V,beforeUnmount:R,destroyed:N,unmounted:w,render:U,renderTracked:ne,renderTriggered:ue,errorCaptured:ye,serverPrefetch:F,expose:K,inheritAttrs:Z,components:T,directives:X,filters:ae}=t;if(d&&Po(d,s,null),o)for(const Q in o){const q=o[Q];I(q)&&(s[Q]=q.bind(n))}if(i){const Q=i.call(n,n);$(Q)&&(e.data=ls(Q))}if(zn=!0,r)for(const Q in r){const q=r[Q],st=I(q)?q.bind(n,n):I(q.get)?q.get.bind(n,n):He,Yt=!I(q)&&I(q.set)?q.set.bind(n):He,it=ul({get:st,set:Yt});Object.defineProperty(s,Q,{enumerable:!0,configurable:!0,get:()=>it.value,set:Me=>it.value=Me})}if(l)for(const Q in l)Ki(l[Q],s,n,Q);if(c){const Q=I(c)?c.call(n):c;Reflect.ownKeys(Q).forEach(q=>{oo(q,Q[q])})}f&&Es(f,e,"c");function re(Q,q){M(q)?q.forEach(st=>Q(st.bind(n))):q&&Q(q.bind(n))}if(re(_o,p),re($i,v),re(bo,D),re(vo,L),re(go,A),re(mo,J),re(Do,ye),re(Co,ne),re(So,ue),re(Vi,R),re(ki,w),re(xo,F),M(K))if(K.length){const Q=e.exposed||(e.exposed={});K.forEach(q=>{Object.defineProperty(Q,q,{get:()=>n[q],set:st=>n[q]=st,enumerable:!0})})}else e.exposed||(e.exposed={});U&&e.render===He&&(e.render=U),Z!=null&&(e.inheritAttrs=Z),T&&(e.components=T),X&&(e.directives=X),F&&ji(e)}function Po(e,t,n=He){M(e)&&(e=Jn(e));for(const s in e){const i=e[s];let r;$(i)?"default"in i?r=tn(i.from||s,i.default,!0):r=tn(i.from||s):r=tn(i),me(r)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[s]=r}}function Es(e,t,n){Te(M(e)?e.map(s=>s.bind(t.proxy)):e.bind(t.proxy),t,n)}function Ki(e,t,n,s){let i=s.includes(".")?Ii(n,s):()=>n[s];if(ee(e)){const r=t[e];I(r)&&Fn(i,r)}else if(I(e))Fn(i,e.bind(n));else if($(e))if(M(e))e.forEach(r=>Ki(r,t,n,s));else{const r=I(e.handler)?e.handler.bind(n):t[e.handler];I(r)&&Fn(i,r,e)}}function Wi(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=e.appContext,l=r.get(t);let c;return l?c=l:!i.length&&!n&&!s?c=t:(c={},i.length&&i.forEach(d=>an(c,d,o,!0)),an(c,t,o)),$(t)&&r.set(t,c),c}function an(e,t,n,s=!1){const{mixins:i,extends:r}=t;r&&an(e,r,n,!0),i&&i.forEach(o=>an(e,o,n,!0));for(const o in t)if(!(s&&o==="expose")){const l=Ao[o]||n&&n[o];e[o]=l?l(e[o],t[o]):t[o]}return e}const Ao={data:Ps,props:As,emits:As,methods:At,computed:At,beforeCreate:de,created:de,beforeMount:de,mounted:de,beforeUpdate:de,updated:de,beforeDestroy:de,beforeUnmount:de,destroyed:de,unmounted:de,activated:de,deactivated:de,errorCaptured:de,serverPrefetch:de,components:At,directives:At,watch:Oo,provide:Ps,inject:Mo};function Ps(e,t){return t?e?function(){return oe(I(e)?e.call(this,this):e,I(t)?t.call(this,this):t)}:t:e}function Mo(e,t){return At(Jn(e),Jn(t))}function Jn(e){if(M(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function de(e,t){return e?[...new Set([].concat(e,t))]:t}function At(e,t){return e?oe(Object.create(null),e,t):t}function As(e,t){return e?M(e)&&M(t)?[...new Set([...e,...t])]:oe(Object.create(null),ws(e),ws(t??{})):t}function Oo(e,t){if(!e)return t;if(!t)return e;const n=oe(Object.create(null),e);for(const s in t)n[s]=de(e[s],t[s]);return n}function Ui(){return{app:null,config:{isNativeTag:Qs,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Io=0;function Lo(e,t){return function(s,i=null){I(s)||(s=oe({},s)),i!=null&&!$(i)&&(i=null);const r=Ui(),o=new WeakSet,l=[];let c=!1;const d=r.app={_uid:Io++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:pl,get config(){return r.config},set config(f){},use(f,...p){return o.has(f)||(f&&I(f.install)?(o.add(f),f.install(d,...p)):I(f)&&(o.add(f),f(d,...p))),d},mixin(f){return r.mixins.includes(f)||r.mixins.push(f),d},component(f,p){return p?(r.components[f]=p,d):r.components[f]},directive(f,p){return p?(r.directives[f]=p,d):r.directives[f]},mount(f,p,v){if(!c){const D=d._ceVNode||ve(s,i);return D.appContext=r,v===!0?v="svg":v===!1&&(v=void 0),e(D,f,v),c=!0,d._container=f,f.__vue_app__=d,ps(D.component)}},onUnmount(f){l.push(f)},unmount(){c&&(Te(l,d._instance,16),e(null,d._container),delete d._container.__vue_app__)},provide(f,p){return r.provides[f]=p,d},runWithContext(f){const p=xt;xt=d;try{return f()}finally{xt=p}}};return d}}let xt=null;const Fo=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ee(t)}Modifiers`]||e[`${ht(t)}Modifiers`];function Ro(e,t,...n){if(e.isUnmounted)return;const s=e.vnode.props||z;let i=n;const r=t.startsWith("update:"),o=r&&Fo(s,t.slice(7));o&&(o.trim&&(i=n.map(f=>ee(f)?f.trim():f)),o.number&&(i=n.map(vr)));let l,c=s[l=Pn(t)]||s[l=Pn(Ee(t))];!c&&r&&(c=s[l=Pn(ht(t))]),c&&Te(c,e,6,i);const d=s[l+"Once"];if(d){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,Te(d,e,6,i)}}const Bo=new WeakMap;function Gi(e,t,n=!1){const s=n?Bo:t.emitsCache,i=s.get(e);if(i!==void 0)return i;const r=e.emits;let o={},l=!1;if(!I(e)){const c=d=>{const f=Gi(d,t,!0);f&&(l=!0,oe(o,f))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!r&&!l?($(e)&&s.set(e,null),null):(M(r)?r.forEach(c=>o[c]=null):oe(o,r),$(e)&&s.set(e,o),o)}function Tn(e,t){return!e||!hn(t)?!1:(t=t.slice(2),t=t==="Once"?t:t.replace(/Once$/,""),H(e,t[0].toLowerCase()+t.slice(1))||H(e,ht(t))||H(e,t))}function Ms(e){const{type:t,vnode:n,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:c,render:d,renderCache:f,props:p,data:v,setupState:D,ctx:L,inheritAttrs:A}=e,J=on(e);let V,R;try{if(n.shapeFlag&4){const w=i||s,U=w;V=Ne(d.call(U,w,f,p,D,v,L)),R=l}else{const w=t;V=Ne(w.length>1?w(p,{attrs:l,slots:o,emit:c}):w(p,null)),R=t.props?l:No(l)}}catch(w){pt.length=0,xn(w,e,1),V=ve(he)}let N=V;if(R&&A!==!1){const w=Object.keys(R),{shapeFlag:U}=N;w.length&&U&7&&(r&&w.some(gn)&&(R=jo(R,r)),N=nt(N,R,!1,!0))}if(n.dirs&&(N=nt(N,null,!1,!0),N.dirs=N.dirs?N.dirs.concat(n.dirs):n.dirs),n.transition){const w=Sn(N.type)&&ln(N)||N;$t(w,n.transition)}return V=N,on(J),V}const No=e=>{let t;for(const n in e)(n==="class"||n==="style"||hn(n))&&((t||(t={}))[n]=e[n]);return t},jo=(e,t)=>{const n={};for(const s in e)(!gn(s)||!(s.slice(9)in t))&&(n[s]=e[s]);return n};function Ho(e,t,n){const{props:s,children:i,component:r}=e,{props:o,children:l,patchFlag:c}=t,d=r.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return s?Os(s,o,d):!!o;if(c&8){const f=t.dynamicProps;for(let p=0;p<f.length;p++){const v=f[p];if(qi(o,s,v)&&!Tn(d,v))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Os(s,o,d):!0:!!o;return!1}function Os(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(qi(t,e,r)&&!Tn(n,r))return!0}return!1}function qi(e,t,n){const s=e[n],i=t[n];return n==="style"&&$(s)&&$(i)?!ns(s,i):s!==i}function $o({vnode:e,parent:t,suspense:n},s){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===e&&(i.suspense.vnode.el=i.el=s,e=i),i===e)(e=t.vnode).el=s,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=s)}const Yi={},zi=()=>Object.create(Yi),Ji=e=>Object.getPrototypeOf(e)===Yi;function Vo(e,t,n,s=!1){const i={},r=zi();e.propsDefaults=Object.create(null),Xi(e,t,i,r);for(const o in e.propsOptions[0])o in i||(i[o]=void 0);n?e.props=s?i:Yr(i):e.type.props?e.props=i:e.props=r,e.attrs=r}function ko(e,t,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=e,l=k(i),[c]=e.propsOptions;let d=!1;if((s||o>0)&&!(o&16)){if(o&8){const f=e.vnode.dynamicProps;for(let p=0;p<f.length;p++){let v=f[p];if(Tn(e.emitsOptions,v))continue;const D=t[v];if(c)if(H(r,v))D!==r[v]&&(r[v]=D,d=!0);else{const L=Ee(v);i[L]=Xn(c,l,L,D,e,!1)}else D!==r[v]&&(r[v]=D,d=!0)}}}else{Xi(e,t,i,r)&&(d=!0);let f;for(const p in l)(!t||!H(t,p)&&((f=ht(p))===p||!H(t,f)))&&(c?n&&(n[p]!==void 0||n[f]!==void 0)&&(i[p]=Xn(c,l,p,void 0,e,!0)):delete i[p]);if(r!==l)for(const p in r)(!t||!H(t,p))&&(delete r[p],d=!0)}d&&qe(e.attrs,"set","")}function Xi(e,t,n,s){const[i,r]=e.propsOptions;let o=!1,l;if(t)for(let c in t){if(Ot(c))continue;const d=t[c];let f;i&&H(i,f=Ee(c))?!r||!r.includes(f)?n[f]=d:(l||(l={}))[f]=d:Tn(e.emitsOptions,c)||(!(c in s)||d!==s[c])&&(s[c]=d,o=!0)}if(r){const c=k(n),d=l||z;for(let f=0;f<r.length;f++){const p=r[f];n[p]=Xn(i,c,p,d[p],e,!H(d,p))}}return o}function Xn(e,t,n,s,i,r){const o=e[n];if(o!=null){const l=H(o,"default");if(l&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&I(c)){const{propsDefaults:d}=i;if(n in d)s=d[n];else{const f=qt(i);s=d[n]=c.call(null,t),f()}}else s=c;i.ce&&i.ce._setProp(n,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===ht(n))&&(s=!0))}return s}const Ko=new WeakMap;function Zi(e,t,n=!1){const s=n?Ko:t.propsCache,i=s.get(e);if(i)return i;const r=e.props,o={},l=[];let c=!1;if(!I(e)){const f=p=>{c=!0;const[v,D]=Zi(p,t,!0);oe(o,v),D&&l.push(...D)};!n&&t.mixins.length&&t.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!r&&!c)return $(e)&&s.set(e,_t),_t;if(M(r))for(let f=0;f<r.length;f++){const p=Ee(r[f]);Is(p)&&(o[p]=z)}else if(r)for(const f in r){const p=Ee(f);if(Is(p)){const v=r[f],D=o[p]=M(v)||I(v)?{type:v}:oe({},v),L=D.type;let A=!1,J=!0;if(M(L))for(let V=0;V<L.length;++V){const R=L[V],N=I(R)&&R.name;if(N==="Boolean"){A=!0;break}else N==="String"&&(J=!1)}else A=I(L)&&L.name==="Boolean";D[0]=A,D[1]=J,(A||H(D,"default"))&&l.push(p)}}const d=[o,l];return $(e)&&s.set(e,d),d}function Is(e){return e[0]!=="$"&&!Ot(e)}const us=e=>e==="_"||e==="_ctx"||e==="$stable",ds=e=>M(e)?e.map(Ne):[Ne(e)],Wo=(e,t,n)=>{if(t._n)return t;const s=Mi((...i)=>ds(t(...i)),n);return s._c=!1,s},Qi=(e,t,n)=>{const s=e._ctx;for(const i in e){if(us(i))continue;const r=e[i];if(I(r))t[i]=Wo(i,r,s);else if(r!=null){const o=ds(r);t[i]=()=>o}}},er=(e,t)=>{const n=ds(t);e.slots.default=()=>n},tr=(e,t,n)=>{for(const s in t)(n||!us(s))&&(e[s]=t[s])},Uo=(e,t,n)=>{const s=e.slots=zi();if(e.vnode.shapeFlag&32){const i=t._;i?(tr(s,t,n),n&&ri(s,"_",i,!0)):Qi(t,s)}else t&&er(e,t)},Go=(e,t,n)=>{const{vnode:s,slots:i}=e;let r=!0,o=z;if(s.shapeFlag&32){const l=t._;l?n&&l===1?r=!1:tr(i,t,n):(r=!t.$stable,Qi(t,i)),o=t}else t&&(er(e,t),o={default:1});if(r)for(const l in i)!us(l)&&o[l]==null&&delete i[l]},_e=Xo;function qo(e){return Yo(e)}function Yo(e,t){const n=yn();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:c,setText:d,setElementText:f,parentNode:p,nextSibling:v,setScopeId:D=He,insertStaticContent:L}=e,A=(a,u,h,_=null,y=null,g=null,S=void 0,x=null,b=!!u.dynamicChildren)=>{if(a===u)return;a&&!ft(a,u)&&(_=zt(a),Me(a,y,g,!0),a=null),u.patchFlag===-2&&(b=!1,u.dynamicChildren=null);const{type:m,ref:P,shapeFlag:C}=u;switch(m){case wn:J(a,u,h,_);break;case he:V(a,u,h,_);break;case jn:a==null&&R(u,h,_,S);break;case be:T(a,u,h,_,y,g,S,x,b);break;default:C&1?U(a,u,h,_,y,g,S,x,b):C&6?X(a,u,h,_,y,g,S,x,b):(C&64||C&128)&&m.process(a,u,h,_,y,g,S,x,b,Dt)}P!=null&&y?Ft(P,a&&a.ref,g,u||a,!u):P==null&&a&&a.ref!=null&&Ft(a.ref,null,g,a,!0)},J=(a,u,h,_)=>{if(a==null)s(u.el=l(u.children),h,_);else{const y=u.el=a.el;u.children!==a.children&&d(y,u.children)}},V=(a,u,h,_)=>{a==null?s(u.el=c(u.children||""),h,_):u.el=a.el},R=(a,u,h,_)=>{[a.el,a.anchor]=L(a.children,u,h,_,a.el,a.anchor)},N=({el:a,anchor:u},h,_)=>{let y;for(;a&&a!==u;)y=v(a),s(a,h,_),a=y;s(u,h,_)},w=({el:a,anchor:u})=>{let h;for(;a&&a!==u;)h=v(a),i(a),a=h;i(u)},U=(a,u,h,_,y,g,S,x,b)=>{if(u.type==="svg"?S="svg":u.type==="math"&&(S="mathml"),a==null)ne(u,h,_,y,g,S,x,b);else{const m=a.el&&a.el._isVueCE?a.el:null;try{m&&m._beginPatch(),F(a,u,y,g,S,x,b)}finally{m&&m._endPatch()}}},ne=(a,u,h,_,y,g,S,x)=>{let b,m;const{props:P,shapeFlag:C,transition:E,dirs:O}=a;if(b=a.el=o(a.type,g,P&&P.is,P),C&8?f(b,a.children):C&16&&ye(a.children,b,null,_,y,Nn(a,g),S,x),O&&rt(a,null,_,"created"),ue(b,a,a.scopeId,S,_),P){for(const G in P)G!=="value"&&!Ot(G)&&r(b,G,null,P[G],g,_);"value"in P&&r(b,"value",null,P.value,g),(m=P.onVnodeBeforeMount)&&Fe(m,_,a)}O&&rt(a,null,_,"beforeMount");const j=zo(y,E);j&&E.beforeEnter(b),s(b,u,h),((m=P&&P.onVnodeMounted)||j||O)&&_e(()=>{try{m&&Fe(m,_,a),j&&E.enter(b),O&&rt(a,null,_,"mounted")}finally{}},y)},ue=(a,u,h,_,y)=>{if(h&&D(a,h),_)for(let g=0;g<_.length;g++)D(a,_[g]);if(y){let g=y.subTree;if(u===g||rr(g.type)&&(g.ssContent===u||g.ssFallback===u)){const S=y.vnode;ue(a,S,S.scopeId,S.slotScopeIds,y.parent)}}},ye=(a,u,h,_,y,g,S,x,b=0)=>{for(let m=b;m<a.length;m++){const P=a[m]=x?Ue(a[m]):Ne(a[m]);A(null,P,u,h,_,y,g,S,x)}},F=(a,u,h,_,y,g,S)=>{const x=u.el=a.el;let{patchFlag:b,dynamicChildren:m,dirs:P}=u;b|=a.patchFlag&16;const C=a.props||z,E=u.props||z;let O;if(h&&ot(h,!1),(O=E.onVnodeBeforeUpdate)&&Fe(O,h,u,a),P&&rt(u,a,h,"beforeUpdate"),h&&ot(h,!0),m&&(!a.dynamicChildren||a.dynamicChildren.length!==m.length)&&(b=0,S=!1,m=null),(C.innerHTML&&E.innerHTML==null||C.textContent&&E.textContent==null)&&f(x,""),m?K(a.dynamicChildren,m,x,h,_,Nn(u,y),g):S||q(a,u,x,null,h,_,Nn(u,y),g,!1),b>0){if(b&16)Z(x,C,E,h,y);else if(b&2&&C.class!==E.class&&r(x,"class",null,E.class,y),b&4&&r(x,"style",C.style,E.style,y),b&8){const j=u.dynamicProps;for(let G=0;G<j.length;G++){const W=j[G],se=C[W],le=E[W];(le!==se||W==="value")&&r(x,W,se,le,y,h)}}b&1&&a.children!==u.children&&f(x,u.children)}else!S&&m==null&&Z(x,C,E,h,y);((O=E.onVnodeUpdated)||P)&&_e(()=>{O&&Fe(O,h,u,a),P&&rt(u,a,h,"updated")},_)},K=(a,u,h,_,y,g,S)=>{for(let x=0;x<u.length;x++){const b=a[x],m=u[x],P=b.el&&(b.type===be||!ft(b,m)||b.shapeFlag&198)?p(b.el):h;A(b,m,P,null,_,y,g,S,!0)}},Z=(a,u,h,_,y)=>{if(u!==h){if(u!==z)for(const g in u)!Ot(g)&&!(g in h)&&r(a,g,u[g],null,y,_);for(const g in h){if(Ot(g))continue;const S=h[g],x=u[g];S!==x&&g!=="value"&&r(a,g,x,S,y,_)}"value"in h&&r(a,"value",u.value,h.value,y)}},T=(a,u,h,_,y,g,S,x,b)=>{const m=u.el=a?a.el:l(""),P=u.anchor=a?a.anchor:l("");let{patchFlag:C,dynamicChildren:E,slotScopeIds:O}=u;O&&(x=x?x.concat(O):O),a==null?(s(m,h,_),s(P,h,_),ye(u.children||[],h,P,y,g,S,x,b)):C>0&&C&64&&E&&a.dynamicChildren&&a.dynamicChildren.length===E.length?(K(a.dynamicChildren,E,h,y,g,S,x),(u.key!=null||y&&u===y.subTree)&&nr(a,u,!0)):q(a,u,h,P,y,g,S,x,b)},X=(a,u,h,_,y,g,S,x,b)=>{u.slotScopeIds=x,a==null?u.shapeFlag&512?y.ctx.activate(u,h,_,S,b):ae(u,h,_,y,g,S,b):Ve(a,u,b)},ae=(a,u,h,_,y,g,S)=>{const x=a.component=rl(a,_,y);if(Cn(a)&&(x.ctx.renderer=Dt),ol(x,!1,S),x.asyncDep){if(y&&y.registerDep(x,re,S),!a.el){const b=x.subTree=ve(he);V(null,b,u,h),a.placeholder=b.el}}else re(x,a,u,h,y,g,S)},Ve=(a,u,h)=>{const _=u.component=a.component;if(Ho(a,u,h))if(_.asyncDep&&!_.asyncResolved){Q(_,u,h);return}else _.next=u,_.update();else u.el=a.el,_.vnode=u},re=(a,u,h,_,y,g,S)=>{const x=()=>{if(a.isMounted){let{next:C,bu:E,u:O,parent:j,vnode:G}=a;{const Ie=sr(a);if(Ie){C&&(C.el=G.el,Q(a,C,S)),Ie.asyncDep.then(()=>{_e(()=>{a.isUnmounted||m()},y)});return}}let W=C,se;ot(a,!1),C?(C.el=G.el,Q(a,C,S)):C=G,E&&An(E),(se=C.props&&C.props.onVnodeBeforeUpdate)&&Fe(se,j,C,G),ot(a,!0);const le=Ms(a),Oe=a.subTree;a.subTree=le,A(Oe,le,p(Oe.el),zt(Oe),a,y,g),C.el=le.el,W===null&&$o(a,le.el),O&&_e(O,y),(se=C.props&&C.props.onVnodeUpdated)&&_e(()=>Fe(se,j,C,G),y)}else{let C;const{el:E,props:O}=u,{bm:j,m:G,parent:W,root:se,type:le}=a,Oe=Rt(u);ot(a,!1),j&&An(j),!Oe&&(C=O&&O.onVnodeBeforeMount)&&Fe(C,W,u),ot(a,!0);{se.ce&&se.ce._hasShadowRoot()&&se.ce._injectChildStyle(le,a.parent?a.parent.type:void 0);const Ie=a.subTree=Ms(a);A(null,Ie,h,_,a,y,g),u.el=Ie.el}if(G&&_e(G,y),!Oe&&(C=O&&O.onVnodeMounted)){const Ie=u;_e(()=>Fe(C,W,Ie),y)}(u.shapeFlag&256||W&&Rt(W.vnode)&&W.vnode.shapeFlag&256)&&a.a&&_e(a.a,y),a.isMounted=!0,u=h=_=null}};a.scope.on();const b=a.effect=new ai(x);a.scope.off();const m=a.update=b.run.bind(b),P=a.job=b.runIfDirty.bind(b);P.i=a,P.id=a.uid,b.scheduler=()=>fs(P),ot(a,!0),m()},Q=(a,u,h)=>{u.component=a;const _=a.vnode.props;a.vnode=u,a.next=null,ko(a,u.props,_,h),Go(a,u.children,h),Ye(),Cs(a),ze()},q=(a,u,h,_,y,g,S,x,b=!1)=>{const m=a&&a.children,P=a?a.shapeFlag:0,C=u.children,{patchFlag:E,shapeFlag:O}=u;if(E>0){if(E&128){Yt(m,C,h,_,y,g,S,x,b);return}else if(E&256){st(m,C,h,_,y,g,S,x,b);return}}O&8?(P&16&&Ct(m,y,g),C!==m&&f(h,C)):P&16?O&16?Yt(m,C,h,_,y,g,S,x,b):Ct(m,y,g,!0):(P&8&&f(h,""),O&16&&ye(C,h,_,y,g,S,x,b))},st=(a,u,h,_,y,g,S,x,b)=>{a=a||_t,u=u||_t;const m=a.length,P=u.length,C=Math.min(m,P);let E;for(E=0;E<C;E++){const O=u[E]=b?Ue(u[E]):Ne(u[E]);A(a[E],O,h,null,y,g,S,x,b)}m>P?Ct(a,y,g,!0,!1,C):ye(u,h,_,y,g,S,x,b,C)},Yt=(a,u,h,_,y,g,S,x,b)=>{let m=0;const P=u.length;let C=a.length-1,E=P-1;for(;m<=C&&m<=E;){const O=a[m],j=u[m]=b?Ue(u[m]):Ne(u[m]);if(ft(O,j))A(O,j,h,null,y,g,S,x,b);else break;m++}for(;m<=C&&m<=E;){const O=a[C],j=u[E]=b?Ue(u[E]):Ne(u[E]);if(ft(O,j))A(O,j,h,null,y,g,S,x,b);else break;C--,E--}if(m>C){if(m<=E){const O=E+1,j=O<P?u[O].el:_;for(;m<=E;)A(null,u[m]=b?Ue(u[m]):Ne(u[m]),h,j,y,g,S,x,b),m++}}else if(m>E)for(;m<=C;)Me(a[m],y,g,!0),m++;else{const O=m,j=m,G=new Map;for(m=j;m<=E;m++){const xe=u[m]=b?Ue(u[m]):Ne(u[m]);xe.key!=null&&G.set(xe.key,m)}let W,se=0;const le=E-j+1;let Oe=!1,Ie=0;const Tt=new Array(le);for(m=0;m<le;m++)Tt[m]=0;for(m=O;m<=C;m++){const xe=a[m];if(se>=le){Me(xe,y,g,!0);continue}let Le;if(xe.key!=null)Le=G.get(xe.key);else for(W=j;W<=E;W++)if(Tt[W-j]===0&&ft(xe,u[W])){Le=W;break}Le===void 0?Me(xe,y,g,!0):(Tt[Le-j]=m+1,Le>=Ie?Ie=Le:Oe=!0,A(xe,u[Le],h,null,y,g,S,x,b),se++)}const ms=Oe?Jo(Tt):_t;for(W=ms.length-1,m=le-1;m>=0;m--){const xe=j+m,Le=u[xe],ys=u[xe+1],_s=xe+1<P?ys.el||ir(ys):_;Tt[m]===0?A(null,Le,h,_s,y,g,S,x,b):Oe&&(W<0||m!==ms[W]?it(Le,h,_s,2):W--)}}},it=(a,u,h,_,y=null)=>{const{el:g,type:S,transition:x,children:b,shapeFlag:m}=a;if(m&6){it(a.component.subTree,u,h,_);return}if(m&128){a.suspense.move(u,h,_);return}if(m&64){S.move(a,u,h,Dt);return}if(S===be){s(g,u,h);for(let C=0;C<b.length;C++)it(b[C],u,h,_);s(a.anchor,u,h);return}if(S===jn){N(a,u,h);return}if(_!==2&&m&1&&x)if(_===0)x.persisted&&!g[De]?s(g,u,h):(x.beforeEnter(g),s(g,u,h),_e(()=>x.enter(g),y));else{const{leave:C,delayLeave:E,afterLeave:O}=x,j=()=>{a.ctx.isUnmounted?i(g):s(g,u,h)},G=()=>{const W=g._isLeaving||!!g[De];g._isLeaving&&g[De](!0),x.persisted&&!W?j():C(g,()=>{j(),O&&O()})};E?E(g,j,G):G()}else s(g,u,h)},Me=(a,u,h,_=!1,y=!1)=>{const{type:g,props:S,ref:x,children:b,dynamicChildren:m,shapeFlag:P,patchFlag:C,dirs:E,cacheIndex:O,memo:j}=a;if(C===-2&&(y=!1),x!=null&&(Ye(),Ft(x,null,h,a,!0),ze()),O!=null&&(u.renderCache[O]=void 0),P&256){u.ctx.deactivate(a);return}const G=P&1&&E,W=!Rt(a);let se;if(W&&(se=S&&S.onVnodeBeforeUnmount)&&Fe(se,u,a),P&6)gr(a.component,h,_);else{if(P&128){a.suspense.unmount(h,_);return}G&&rt(a,null,u,"beforeUnmount"),P&64?a.type.remove(a,u,h,Dt,_):m&&!m.hasOnce&&(g!==be||C>0&&C&64)?Ct(m,u,h,!1,!0):(g===be&&C&384||!y&&P&16)&&Ct(b,u,h),_&&hs(a)}const le=j!=null&&O==null;(W&&(se=S&&S.onVnodeUnmounted)||G||le)&&_e(()=>{se&&Fe(se,u,a),G&&rt(a,null,u,"unmounted"),le&&(a.el=null)},h)},hs=a=>{const{type:u,el:h,anchor:_,transition:y}=a;if(u===be){hr(h,_);return}if(u===jn){w(a);return}const g=()=>{i(h),y&&!y.persisted&&y.afterLeave&&y.afterLeave()};if(a.shapeFlag&1&&y&&!y.persisted){const{leave:S,delayLeave:x}=y,b=()=>S(h,g);x?x(a.el,g,b):b()}else g()},hr=(a,u)=>{let h;for(;a!==u;)h=v(a),i(a),a=h;i(u)},gr=(a,u,h)=>{const{bum:_,scope:y,job:g,subTree:S,um:x,m:b,a:m}=a;Ls(b),Ls(m),_&&An(_),y.stop(),g&&(g.flags|=8,Me(S,a,u,h)),x&&_e(x,u),_e(()=>{a.isUnmounted=!0},u)},Ct=(a,u,h,_=!1,y=!1,g=0)=>{for(let S=g;S<a.length;S++)Me(a[S],u,h,_,y)},zt=a=>{if(a.shapeFlag&6)return zt(a.component.subTree);if(a.shapeFlag&128)return a.suspense.next();const u=v(a.anchor||a.el),h=u&&u[fo];return h?v(h):u};let En=!1;const gs=(a,u,h)=>{let _;a==null?u._vnode&&(Me(u._vnode,null,null,!0),_=u._vnode.component):A(u._vnode||null,a,u,null,null,null,h),u._vnode=a,En||(En=!0,Cs(_),Ei(),En=!1)},Dt={p:A,um:Me,m:it,r:hs,mt:ae,mc:ye,pc:q,pbc:K,n:zt,o:e};return{render:gs,hydrate:void 0,createApp:Lo(gs)}}function Nn({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function ot({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function zo(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function nr(e,t,n=!1){const s=e.children,i=t.children;if(M(s)&&M(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=Ue(i[r]),l.el=o.el),!n&&l.patchFlag!==-2&&nr(o,l)),l.type===wn&&(l.patchFlag===-1&&(l=i[r]=Ue(l)),l.el=o.el),l.type===he&&!l.el&&(l.el=o.el)}}function Jo(e){const t=e.slice(),n=[0];let s,i,r,o,l;const c=e.length;for(s=0;s<c;s++){const d=e[s];if(d!==0){if(i=n[n.length-1],e[i]<d){t[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,e[n[l]]<d?r=l+1:o=l;d<e[n[r]]&&(r>0&&(t[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=t[o];return n}function sr(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:sr(t)}function Ls(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ir(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?ir(t.subTree):null}const rr=e=>e.__isSuspense;function Xo(e,t){t&&t.pendingBranch?M(e)?t.effects.push(...e):t.effects.push(e):ro(e)}const be=Symbol.for("v-fgt"),wn=Symbol.for("v-txt"),he=Symbol.for("v-cmt"),jn=Symbol.for("v-stc"),pt=[];let Se=null;function te(e=!1){pt.push(Se=e?null:[])}function or(){pt.pop(),Se=pt[pt.length-1]||null}let Vt=1;function fn(e,t=!1){Vt+=e,e<0&&Se&&t&&(Se.hasOnce=!0)}function lr(e){return e.dynamicChildren=Vt>0?Se||_t:null,or(),Vt>0&&Se&&Se.push(e),e}function ie(e,t,n,s,i,r){return lr(B(e,t,n,s,i,r,!0))}function Zo(e,t,n,s,i){return lr(ve(e,t,n,s,i,!0))}function un(e){return e?e.__v_isVNode===!0:!1}function ft(e,t){return e.type===t.type&&e.key===t.key}const cr=({key:e})=>e??null,nn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ee(e)||me(e)||I(e)?{i:je,r:e,k:t,f:!!n}:e:null);function B(e,t=null,n=null,s=0,i=null,r=e===be?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&cr(t),ref:t&&nn(t),scopeId:Ai,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:je};return l?(dn(c,n),r&128&&e.normalize(c)):n&&(c.shapeFlag|=ee(n)?8:16),Vt>0&&!o&&Se&&(c.patchFlag>0||r&6)&&c.patchFlag!==32&&Se.push(c),c}const ve=Qo;function Qo(e,t=null,n=null,s=0,i=null,r=!1){if((!e||e===To)&&(e=he),un(e)){const l=nt(e,t,!0);return n&&dn(l,n),Vt>0&&!r&&Se&&(l.shapeFlag&6?Se[Se.indexOf(e)]=l:Se.push(l)),l.patchFlag=-2,l}if(fl(e)&&(e=e.__vccOpts),t){t=el(t);let{class:l,style:c}=t;l&&!ee(l)&&(t.class=bn(l)),$(c)&&(as(c)&&!M(c)&&(c=oe({},c)),t.style=_n(c))}const o=ee(e)?1:rr(e)?128:Sn(e)?64:$(e)?4:I(e)?2:0;return B(e,t,n,s,i,o,r,!0)}function el(e){return e?as(e)||Ji(e)?oe({},e):e:null}function nt(e,t,n=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:c}=e,d=t?nl(i||{},t):i,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:d,key:d&&cr(d),ref:t&&t.ref?n&&r?M(r)?r.concat(nn(t)):[r,nn(t)]:nn(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:l,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==be?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&nt(e.ssContent),ssFallback:e.ssFallback&&nt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&s&&$t(f,c.clone(f)),f}function tl(e=" ",t=0){return ve(wn,null,e,t)}function yt(e="",t=!1){return t?(te(),Zo(he,null,e)):ve(he,null,e)}function Ne(e){return e==null||typeof e=="boolean"?ve(he):M(e)?ve(be,null,e.slice()):un(e)?Ue(e):ve(wn,null,String(e))}function Ue(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:nt(e)}function dn(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(M(t))n=16;else if(typeof t=="object")if(s&65){const i=t.default;i&&(i._c&&(i._d=!1),dn(e,i()),i._c&&(i._d=!0));return}else{n=32;const i=t._;!i&&!Ji(t)?t._ctx=je:i===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else if(I(t)){if(s&65){dn(e,{default:t});return}t={default:t,_ctx:je},n=32}else t=String(t),s&64?(n=16,t=[tl(t)]):n=8;e.children=t,e.shapeFlag|=n}function nl(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const i in s)if(i==="class")t.class!==s.class&&(t.class=bn([t.class,s.class]));else if(i==="style")t.style=_n([t.style,s.style]);else if(hn(i)){const r=t[i],o=s[i];o&&r!==o&&!(M(r)&&r.includes(o))?t[i]=r?[].concat(r,o):o:o==null&&r==null&&!gn(i)&&(t[i]=o)}else i!==""&&(t[i]=s[i])}return t}function Fe(e,t,n,s=null){Te(e,t,7,[n,s])}const sl=Ui();let il=0;function rl(e,t,n){const s=e.type,i=(t?t.appContext:e.appContext)||sl,r={uid:il++,vnode:e,type:s,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ar(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zi(s,i),emitsOptions:Gi(s,i),emit:null,emitted:null,propsDefaults:z,inheritAttrs:s.inheritAttrs,ctx:z,data:z,props:z,attrs:z,slots:z,refs:z,setupState:z,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Ro.bind(null,r),e.ce&&e.ce(r),r}let ge=null;const ar=()=>ge||je;let pn,kt;{const e=yn(),t=(n,s)=>{let i;return(i=e[n])||(i=e[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};pn=t("__VUE_INSTANCE_SETTERS__",n=>ge=n),kt=t("__VUE_SSR_SETTERS__",n=>Kt=n)}const qt=e=>{const t=ge;return pn(e),e.scope.on(),()=>{e.scope.off(),pn(t)}},Fs=()=>{ge&&ge.scope.off(),pn(null)};function fr(e){return e.vnode.shapeFlag&4}let Kt=!1;function ol(e,t=!1,n=!1){t&&kt(t);const{props:s,children:i}=e.vnode,r=fr(e);Vo(e,s,r,t),Uo(e,i,n||t);const o=r?ll(e,t):void 0;return t&&kt(!1),o}function ll(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,wo);const{setup:s}=n;if(s){Ye();const i=e.setupContext=s.length>1?al(e):null,r=qt(e),o=Gt(s,e,0,[e.props,i]),l=ti(o);if(ze(),r(),(l||e.sp)&&!Rt(e)&&ji(e),l){if(o.then(Fs,Fs),t)return o.then(c=>{kt(!0);try{Rs(e,c,t)}finally{kt(!1)}}).catch(c=>{xn(c,e,0)});e.asyncDep=o}else Rs(e,o)}else ur(e)}function Rs(e,t,n){I(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:$(t)&&(e.setupState=Di(t)),ur(e)}function ur(e,t,n){const s=e.type;e.render||(e.render=s.render||He);{const i=qt(e);Ye();try{Eo(e)}finally{ze(),i()}}}const cl={get(e,t){return fe(e,"get",""),e[t]}};function al(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,cl),slots:e.slots,emit:e.emit,expose:t}}function ps(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Di(zr(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Bt)return Bt[n](e)},has(t,n){return n in t||n in Bt}})):e.proxy}function fl(e){return I(e)&&"__vccOpts"in e}const ul=(e,t)=>Qr(e,t,Kt);function dl(e,t,n){try{fn(-1);const s=arguments.length;return s===2?$(t)&&!M(t)?un(t)?ve(e,null,[t]):ve(e,t):ve(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&un(n)&&(n=[n]),ve(e,t,n))}finally{fn(1)}}const pl="3.5.41";/**
* @vue/runtime-dom v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Zn;const Bs=typeof window<"u"&&window.trustedTypes;if(Bs)try{Zn=Bs.createPolicy("vue",{createHTML:e=>e})}catch{}const dr=Zn?e=>Zn.createHTML(e):e=>e,hl="http://www.w3.org/2000/svg",gl="http://www.w3.org/1998/Math/MathML",We=typeof document<"u"?document:null,Ns=We&&We.createElement("template"),ml={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,s)=>{const i=t==="svg"?We.createElementNS(hl,e):t==="mathml"?We.createElementNS(gl,e):n?We.createElement(e,{is:n}):We.createElement(e);return e==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:e=>We.createTextNode(e),createComment:e=>We.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>We.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,s,i,r){const o=n?n.previousSibling:t.lastChild;if(i&&(i===r||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{Ns.innerHTML=dr(s==="svg"?`<svg>${e}</svg>`:s==="mathml"?`<math>${e}</math>`:e);const l=Ns.content;if(s==="svg"||s==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}t.insertBefore(l,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ze="transition",Pt="animation",Wt=Symbol("_vtc"),pr={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},yl=oe({},Li,pr),_l=e=>(e.displayName="Transition",e.props=yl,e),bl=_l((e,{slots:t})=>dl(ho,vl(e),t)),lt=(e,t=[])=>{M(e)?e.forEach(n=>n(...t)):e&&e(...t)},js=e=>e?M(e)?e.some(t=>t.length>1):e.length>1:!1;function vl(e){const t={};for(const T in e)T in pr||(t[T]=e[T]);if(e.css===!1)return t;const{name:n="v",type:s,duration:i,enterFromClass:r=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=r,appearActiveClass:d=o,appearToClass:f=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:v=`${n}-leave-active`,leaveToClass:D=`${n}-leave-to`}=e,L=xl(i),A=L&&L[0],J=L&&L[1],{onBeforeEnter:V,onEnter:R,onEnterCancelled:N,onLeave:w,onLeaveCancelled:U,onBeforeAppear:ne=V,onAppear:ue=R,onAppearCancelled:ye=N}=t,F=(T,X,ae,Ve)=>{T._enterCancelled=Ve,ct(T,X?f:l),ct(T,X?d:o),ae&&ae()},K=(T,X)=>{T._isLeaving=!1,ct(T,p),ct(T,D),ct(T,v),X&&X()},Z=T=>(X,ae)=>{const Ve=T?ue:R,re=()=>F(X,T,ae);lt(Ve,[X,re]),Hs(()=>{ct(X,T?c:r),Ke(X,T?f:l),js(Ve)||$s(X,s,A,re)})};return oe(t,{onBeforeEnter(T){lt(V,[T]),Ke(T,r),Ke(T,o)},onBeforeAppear(T){lt(ne,[T]),Ke(T,c),Ke(T,d)},onEnter:Z(!1),onAppear:Z(!0),onLeave(T,X){T._isLeaving=!0;const ae=()=>K(T,X);Ke(T,p),T._enterCancelled?(Ke(T,v),Ks(T)):(Ks(T),Ke(T,v)),Hs(()=>{T._isLeaving&&(ct(T,p),Ke(T,D),js(w)||$s(T,s,J,ae))}),lt(w,[T,ae])},onEnterCancelled(T){F(T,!1,void 0,!0),lt(N,[T])},onAppearCancelled(T){F(T,!0,void 0,!0),lt(ye,[T])},onLeaveCancelled(T){K(T),lt(U,[T])}})}function xl(e){if(e==null)return null;if($(e))return[Hn(e.enter),Hn(e.leave)];{const t=Hn(e);return[t,t]}}function Hn(e){return xr(e)}function Ke(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[Wt]||(e[Wt]=new Set)).add(t)}function ct(e,t){t.split(/\s+/).forEach(s=>s&&e.classList.remove(s));const n=e[Wt];n&&(n.delete(t),n.size||(e[Wt]=void 0))}function Hs(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Sl=0;function $s(e,t,n,s){const i=e._endId=++Sl,r=()=>{i===e._endId&&s()};if(n!=null)return setTimeout(r,n);const{type:o,timeout:l,propCount:c}=Cl(e,t);if(!o)return s();const d=o+"end";let f=0;const p=()=>{e.removeEventListener(d,v),r()},v=D=>{D.target===e&&++f>=c&&p()};setTimeout(()=>{f<c&&p()},l+1),e.addEventListener(d,v)}function Cl(e,t){const n=window.getComputedStyle(e),s=L=>(n[L]||"").split(", "),i=s(`${Ze}Delay`),r=s(`${Ze}Duration`),o=Vs(i,r),l=s(`${Pt}Delay`),c=s(`${Pt}Duration`),d=Vs(l,c);let f=null,p=0,v=0;t===Ze?o>0&&(f=Ze,p=o,v=r.length):t===Pt?d>0&&(f=Pt,p=d,v=c.length):(p=Math.max(o,d),f=p>0?o>d?Ze:Pt:null,v=f?f===Ze?r.length:c.length:0);const D=f===Ze&&/\b(?:transform|all)(?:,|$)/.test(s(`${Ze}Property`).toString());return{type:f,timeout:p,propCount:v,hasTransform:D}}function Vs(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,s)=>ks(n)+ks(e[s])))}function ks(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Ks(e){return(e?e.ownerDocument:document).body.offsetHeight}function Dl(e,t,n){const s=e[Wt];s&&(t=(t?[t,...s]:[...s]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Ws=Symbol("_vod"),Tl=Symbol("_vsh"),wl=Symbol(""),El=/(?:^|;)\s*display\s*:/;function Pl(e,t,n){const s=e.style,i=ee(n);let r=!1;if(n&&!i){if(t)if(ee(t))for(const o of t.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Mt(s,l,"")}else for(const o in t)n[o]==null&&Mt(s,o,"");for(const o in n){o==="display"&&(r=!0);const l=n[o];l!=null?Ml(e,o,!ee(t)&&t?t[o]:void 0,l)||Mt(s,o,l):Mt(s,o,"")}}else if(i){if(t!==n){const o=s[wl];o&&(n+=";"+o),s.cssText=n,r=El.test(n)}}else t&&e.removeAttribute("style");Ws in e&&(e[Ws]=r?s.display:"",e[Tl]&&(s.display="none"))}const Us=/\s*!important$/;function Mt(e,t,n){if(M(n))n.forEach(s=>Mt(e,t,s));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const s=Al(e,t);Us.test(n)?e.setProperty(ht(s),n.replace(Us,""),"important"):e[s]=n}}const Gs=["Webkit","Moz","ms"],$n={};function Al(e,t){const n=$n[t];if(n)return n;let s=Ee(t);if(s!=="filter"&&s in e)return $n[t]=s;s=ii(s);for(let i=0;i<Gs.length;i++){const r=Gs[i]+s;if(r in e)return $n[t]=r}return t}function Ml(e,t,n,s){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ee(s)&&n===s}const qs="http://www.w3.org/1999/xlink";function Ys(e,t,n,s,i,r=Er(t)){s&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(qs,t.slice(6,t.length)):e.setAttributeNS(qs,t,n):n==null||r&&!oi(n)?e.removeAttribute(t):e.setAttribute(t,r?"":$e(n)?String(n):n)}function zs(e,t,n,s,i){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?dr(n):n);return}const r=e.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const l=typeof e[t];l==="boolean"?n=oi(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Ol(e,t,n,s){e.addEventListener(t,n,s)}function Il(e,t,n,s){e.removeEventListener(t,n,s)}const Js=Symbol("_vei");function Ll(e,t,n,s,i=null){const r=e[Js]||(e[Js]={}),o=r[t];if(s&&o)o.value=s;else{const[l,c]=Bl(t);if(s){const d=r[t]=Hl(s,i);Ol(e,l,d,c)}else o&&(Il(e,l,o,c),r[t]=void 0)}}const Fl=/(Once|Passive|Capture)$/,Rl=/^on:?(?:Once|Passive|Capture)$/;function Bl(e){let t,n;for(;(n=e.match(Fl))&&!Rl.test(e);)t||(t={}),e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===":"?e.slice(3):ht(e.slice(2)),t]}let Vn=0;const Nl=Promise.resolve(),jl=()=>Vn||(Nl.then(()=>Vn=0),Vn=Date.now());function Hl(e,t){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;const i=n.value;if(M(i)){const r=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{r.call(s),s._stopped=!0};const o=i.slice(),l=[s];for(let c=0;c<o.length&&!s._stopped;c++){const d=o[c];d&&Te(d,t,5,l)}}else Te(i,t,5,[s])};return n.value=e,n.attached=jl(),n}const Xs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,$l=(e,t,n,s,i,r)=>{const o=i==="svg";t==="class"?Dl(e,s,o):t==="style"?Pl(e,n,s):hn(t)?gn(t)||Ll(e,t,n,s,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Vl(e,t,s,o))?(zs(e,t,s),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ys(e,t,s,o,r,t!=="value")):e._isVueCE&&(kl(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!ee(s)))?zs(e,Ee(t),s,r,t):(t==="true-value"?e._trueValue=s:t==="false-value"&&(e._falseValue=s),Ys(e,t,s,o))};function Vl(e,t,n,s){if(s)return!!(t==="innerHTML"||t==="textContent"||t in e&&Xs(t)&&I(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const i=e.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Xs(t)&&ee(n)?!1:t in e}function kl(e,t){const n=e._def.props;if(!n)return!1;const s=Ee(t);return Array.isArray(n)?n.some(i=>Ee(i)===s):Object.keys(n).some(i=>Ee(i)===s)}const Kl=["ctrl","shift","alt","meta"],Wl={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Kl.some(n=>e[`${n}Key`]&&!t.includes(n))},Ul=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=(i,...r)=>{for(let o=0;o<t.length;o++){const l=Wl[t[o]];if(l&&l(i,t))return}return e(i,...r)})},Gl=oe({patchProp:$l},ml);let Zs;function ql(){return Zs||(Zs=qo(Gl))}const Yl=(...e)=>{const t=ql().createApp(...e),{mount:n}=t;return t.mount=s=>{const i=Jl(s);if(!i)return;const r=t._component;!I(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=n(i,!1,zl(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},t};function zl(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Jl(e){return ee(e)?document.querySelector(e):e}const en={blueButtons:[{id:1,text:"地质勘探",category:"exploration"},{id:2,text:"基建/开采计划",category:"planning"},{id:3,text:"穿孔作业",category:"piercing"},{id:4,text:"爆破作业",category:"blasting"},{id:5,text:"铲装作业",category:"dumping"},{id:6,text:"运输作业",category:"transportation"},{id:7,text:"破碎作业",category:"crushing"},{id:8,text:"筛分/选矿",category:"beneficiation"},{id:9,text:"尾矿处置",category:"tailings"},{id:10,text:"井筒/斜坡道开拓",category:"exploit"},{id:11,text:"掘进作业",category:"tunnelling"},{id:12,text:"支护作业",category:"supporting"},{id:13,text:"采矿作业",category:"mining"},{id:14,text:"装载作业",category:"loading"},{id:15,text:"运输作业",category:"Transportation"},{id:16,text:"井下破碎/转运",category:"Crushing"},{id:17,text:"提升作业",category:"lift"},{id:18,text:"充填作业",category:"packing"},{id:19,text:"通风系统",category:"ventilating"},{id:20,text:"排水系统",category:"drainage"},{id:21,text:"供配电系统",category:"power"},{id:22,text:"调度与通信系统",category:"communication"},{id:23,text:"自动化控制系统",category:"automation"},{id:24,text:"安全监测系统",category:"safety "},{id:25,text:"综合管控平台",category:"platform"}],redButtons:[{id:101,text:"尾矿库安全红线",category:"TailingsSafety"},{id:102,text:"边坡安全红线",category:"SlopeSafety"},{id:103,text:"爆破境界红线",category:"BlastingSafety"},{id:104,text:"井下安全监测红线",category:"MonitoringSafety"},{id:105,text:"提升运输安全红线",category:"TransportationSafety"}]},Xl={blue:{layout:"grid",cols:5,rows:5,spacingX:15,spacingY:12,startX:15,startY:20},red:{layout:"vertical",spacingY:18,startX:90,startY:10}},Zl=["专业的技术团队和设备","严格的质量控制标准","实时的监控系统","完善的应急预案","持续的技术改进和优化"],Ql={1:{title:"地质勘探",shortDescription:"地质勘探是矿山开发的基础工作，通过地质调查、物探、化探、钻探等手段，查明矿体的形态、规模、品位和赋存条件，为矿山设计和开采提供可靠的地质资料。",longDescription:`
## 地质勘探的重要性

地质勘探是矿山开发的首要环节，是所有矿山建设的基础工作。通过系统的地质勘探工作，我们可以：

### 1. 查明矿体特征
- **矿体形态**: 确定矿体的空间分布、形状和大小
- **矿石品位**: 分析矿石中有用组分的含量和分布规律
- **地质构造**: 查明矿区的褶皱、断层、节理等构造特征
- **开采技术条件**: 评估矿床的水文地质、工程地质条件

### 2. 勘探方法选择
我们采用多种勘探手段相结合的方式：

- **地质调查**: 通过地表地质测绘，了解矿化线索和地质特征
- **物探方法**: 利用磁法、电法、地震等物理探测方法
- **化探分析**: 通过土壤、岩石地球化学测量发现异常
- **钻探验证**: 通过岩心钻探直接获取矿体信息
- **采样测试**: 系统采样进行化学分析和选矿试验

### 3. 勘探成果应用
地质勘探的最终成果包括：
- 矿体三维模型和资源储量估算
- 开拓方案和采矿方法选择
- 选矿工艺流程设计
- 经济评价和环境评估

高质量的地质勘探工作为矿山的后续建设和生产提供了可靠的地质依据，是确保矿山建设和生产成功的关键。
    `,images:[{src:"/kantan1.png",caption:"地质勘探作业现场",alt:"勘探设备和工作人员"},{src:"/kantan2.jpg",caption:"钻探岩心采样",alt:"钻探获取的岩心样本"}],features:["综合运用地质调查、物探、化探等多种勘探手段","高精度钻探技术获取准确矿体参数","三维地质建模技术精确描绘矿体形态","资源储量估算和评价","经济效益分析和开采技术条件研究"],stats:{勘探面积:"2.5平方公里",钻孔数量:"156个",探明储量:"8500万吨",勘探周期:"18个月",投资金额:"1.8亿元"}},2:{title:"基建/开采计划",shortDescription:"基建/开采计划是矿山建设的指导文件，根据地质勘探成果，编制矿山基本建设和开采设计方案，确定矿山规模、开采方法、开拓系统、运输方式等关键技术参数。",longDescription:`
## 基建/开采计划的重要性

基建/开采计划是矿山建设的总体指导文件，是连接地质勘探成果与矿山生产建设的桥梁。通过科学合理的基建计划，确保矿山建设的有序进行和投资效益的最大化。

### 1. 建设规划要点
- **矿山规模确定**: 根据储量规模和市场需求，合理确定矿山建设规模
- **开采方法选择**: 综合考虑矿体赋存条件，选择最优开采方法
- **开拓系统设计**: 设计合理的井巷工程布置和运输系统
- **设备选型配套**: 选择高效节能的采矿设备和配套系统

### 2. 主要设计内容
基建计划包括以下主要设计内容：

- **总体布置**: 矿山地面设施和井下工程的整体规划
- **采矿方法**: 根据矿体条件选择适合的采矿工艺
- **开拓运输**: 确定开拓方式和运输系统方案
- **通风安全**: 设计通风系统和安全避险设施
- **供电系统**: 配置可靠的供配电系统
- **给排水系统**: 设计生产和生活给排水系统

### 3. 投资与进度控制
- **投资估算**: 精确估算基建投资和流动资金
- **进度安排**: 制定合理的建设进度计划
- **投资控制**: 严格控制建设成本和投资规模
- **效益分析**: 进行经济效益评价和风险分析

科学的基建计划为矿山的长期稳定生产奠定坚实基础。
    `,images:[{src:"/jijian.png",caption:"矿山建设规划总体布置图",alt:"矿山基建总体规划设计"}],features:["科学编制矿山基本建设规划","优化开采方法和工艺流程","合理安排建设时序和投资计划","采用现代化矿山设计软件","经济效益最大化和环境友好化设计"],stats:{设计规模:"500万吨/年",服务年限:"25年",基建投资:"6.5亿元",建设周期:"24个月",设计定员:"380人"}},3:{title:"穿孔作业",shortDescription:"穿孔作业是露天矿山生产的第一道工序，使用潜孔钻机或回转钻机在岩体中钻凿炮孔，为爆破作业创造条件。穿孔质量直接影响爆破效果和后续作业效率。",longDescription:`
## 穿孔作业概述

穿孔作业是露天矿山生产的第一道工序，通过高精度钻机在岩体中钻凿炮孔，为后续爆破作业创造条件。穿孔质量直接决定了爆破效果和矿山整体生产效率。

### 1. 穿孔设备与技术
我们采用先进的穿孔设备和技术：

- **潜孔钻机**: 高精度潜孔钻机，孔径误差±5mm
- **回转钻机**: 适用于软岩和中硬岩层
- **自动化控制**: 钻进参数自动调节系统
- **GPS定位**: 提高布孔精度和作业效率
- **粉尘控制**: 高效除尘和噪音控制技术

### 2. 穿孔工艺流程
穿孔作业包括以下关键环节：

1. **布孔设计**: 根据爆破设计确定孔位和孔网参数
2. **定位钻孔**: GPS精确导航定位，确保孔位准确
3. **钻进作业**: 自动化钻进，实时监控钻进参数
4. **孔深控制**: 严格控制钻孔深度和角度
5. **清孔护孔**: 钻孔完成后清理孔内岩粉和护孔

### 3. 技术参数控制
- **孔径范围**: 115-200mm，根据岩石性质选择
- **孔深范围**: 12-18米，确保爆破效果
- **孔距排距**: 优化孔网参数，提高爆破质量
- **钻孔角度**: 垂直孔和倾斜孔相结合
- **钻进效率**: 40米/小时，行业领先水平

穿孔质量直接影响后续爆破效果和生产成本，是矿山生产的关键环节。
    `,images:[{src:"/chuankong1.png",caption:"现代化潜孔钻机作业现场",alt:"大型潜孔钻机进行穿孔作业"}],features:["采用高精度潜孔钻机，孔径误差控制在±5mm内","自动化钻进参数控制系统","GPS定位导航提高布孔精度","粉尘收集和噪音控制技术","钻进效率达到40米/小时"],stats:{年穿孔量:"12万米",孔径范围:"115-200mm",孔深范围:"12-18米",设备台效:"150米/台班",穿孔成本:"18元/米"}},4:{title:"爆破作业",shortDescription:"爆破作业是露天矿山剥离和采矿的核心工序，通过精确控制爆破参数，实现岩石的有效破碎和抛掷，同时控制爆破振动、飞石和噪音等有害效应。",longDescription:`
## 爆破作业概述

爆破作业是露天矿山生产的"爆破—铲装—运输"三大环节之首，是决定矿山生产效率和经济效益的关键工序。通过科学合理的爆破设计和精确控制，实现岩石的有效破碎。

### 1. 爆破技术发展
现代矿山爆破技术已经发展到很高水平：

- **数码电子雷管**: 毫秒级精确延时控制
- **智能化设计**: 爆破参数计算机优化
- **实时监测**: 爆破振动和飞石在线监测
- **逐孔起爆**: 提高破碎质量和减少有害效应
- **安全控制**: 综合防控振动、飞石、噪音等危害

### 2. 爆破参数控制
爆破作业需要精确控制以下参数：

- **孔网参数**: 孔距、排距、最小抵抗线
- **装药结构**: 分段装药、空气间隔装药
- **起爆顺序**: 合理的起爆顺序和延时时间
- **单孔药量**: 根据岩石性质确定装药量
- **充填长度**: 保证充填质量和堵塞效果

### 3. 爆破有害效应控制
- **振动控制**: 爆破速度控制在0.5cm/s以下
- **飞石控制**: 设置安全警戒距离200米以上
- **噪音控制**: 采用降噪措施和合理爆破时间
- **粉尘控制**: 爆破前后洒水降尘
- **空气冲击波**: 合理装药结构和延时时间

高质量的爆破作业为后续铲装运输创造良好条件，显著降低生产成本。
    `,images:[{src:"/baopo1.png",caption:"包装型乳化炸药",alt:"包装型乳化炸药"},{src:"/baopo2.png",caption:"露天爆破作业瞬间",alt:"露天爆破作业瞬间"}],features:["采用数码电子雷管实现精确延时控制","智能化爆破参数优化系统","爆破振动实时监测","逐孔起爆技术提高破碎质量","爆破有害效应综合防控"],stats:{年爆破次数:"320次",最大段药量:"2.5吨",爆破震动控制:"0.5cm/s以下",大块率:"3%以下",爆破成本:"2.8元/吨"}},5:{title:"铲装作业",shortDescription:"铲装作业是露天矿山的关键生产环节，使用电铲或液压铲将爆破后的矿岩装入运输设备。铲装效率直接影响矿山的生产能力和经济效益。",longDescription:`
## 铲装作业概述

铲装作业是露天矿山生产的中心环节，连接着爆破作业和运输作业，是实现矿山生产能力的关键工序。铲装效率和质量直接决定了矿山的生产经济效益。

### 1. 铲装设备类型
我们配备多种类型的铲装设备：

- **单斗电铲**: 斗容10-16立方米，适用于大规模装载
- **液压铲**: 斗容8-12立方米，机动灵活
- **轮式装载机**: 适用于辅助装载和场地平整
- **前端装载机**: 多功能铲装设备
- **自动化系统**: 远程操作和无人化技术

### 2. 铲装工艺优化
铲装作业的关键优化措施：

1. **作业面规划**: 合理布置采掘工作面和铲装站位
2. **配车调度**: 优化铲车配比，减少等待时间
3. **铲装路径**: 规划最优铲装轨迹，提高效率
4. **满斗率控制**: 提高铲斗满斗系数到90%以上
5. **安全监控**: 防碰撞系统和作业环境监测

### 3. 技术特点
- **GPS定位**: 实时定位电铲位置，优化调度
- **防碰撞系统**: 多设备安全作业保障
- **远程操作**: 操作人员远离危险区域
- **效率监测**: 实时监测铲装效率和设备状态
- **自动化**: 逐步实现无人化铲装作业

高效的铲装作业是露天矿山生产能力的重要保障，直接决定矿山的经济效益。
    `,images:[{src:"/chanzhuang1.png",caption:"瑞典 Aitik 露天铜矿装载作业：装载设备向矿用汽车装矿",alt:"电铲正在装载矿岩到运输卡车"},{src:"/chanzhuang2.png",caption:"露天矿铲装—矿卡联合作业场景",alt:"现代化电铲远程监控和操作中心"}],features:["斗容10-16立方米大型电铲","自动化铲装控制系统","GPS铲斗定位和防碰撞系统","电铲远程操作和无人化技术","实时铲装效率监测"],stats:{设备台数:"8台电铲+4台液压铲",年铲装量:"1200万吨",铲装效率:"800吨/台班",设备利用率:"85%",作业成本:"1.2元/吨"}},6:{title:"运输作业",shortDescription:"露天矿山运输作业是将铲装的矿岩运至卸载点的关键环节，包括矿岩运输和排土场作业。运输成本占露天矿山总成本的40-50%，是成本控制的重点。",longDescription:`
## 运输作业概述

运输作业是露天矿山生产中成本占比最高的环节，约占总生产成本的40-50%。高效的运输系统是降低矿山生产成本、提高经济效益的关键。

### 1. 运输设备配置
我们配备大型矿用运输设备：

- **矿用自卸卡车**: 载重220-320吨的大型矿用卡车
- **运输车辆**: 25台大型自卸卡车组成运输车队
- **辅助车辆**: 推土机、平路机、洒水车等辅助设备
- **道路维护**: 专业的道路养护设备和队伍
- **GPS调度**: 先进的车辆调度和导航系统

### 2. 运输工艺管理
运输作业的精细化管理：

1. **道路建设**: 高标准的矿山运输道路
2. **车辆调度**: GPS智能调度系统优化车辆配置
3. **装载协调**: 铲装和运输协调配合，减少等待
4. **卸载管理**: 破碎站和排土场卸载优化
5. **道路维护**: 定期维护，保证道路质量

### 3. 成本控制措施
- **路径优化**: GPS最优路径规划，减少空驶距离
- **车辆调度**: 智能调度提高车辆利用率
- **油耗管理**: 燃油消耗监控和节油措施
- **轮胎管理**: 轮胎使用管理和维护，降低成本
- **道路维护**: 良好道路条件降低油耗和维修费用

高效的运输作业是露天矿山经济效益的重要保障，直接决定矿山的生产成本。
    `,images:[{src:"/yunshu1.png",caption:"露天矿卡运输",alt:"矿用卡车在运输道路上行驶"},{src:"/yunshu2.png",caption:"鹿鸣矿业卡车智能调度系统",alt:"现代化车辆调度监控系统"}],features:["大型矿用卡车（载重220-320吨）","GPS车辆调度和导航系统","路面状况实时监测","防疲劳驾驶监控","最优路径规划和调度"],stats:{运输车辆:"25台自卸卡车",单车载重:"220-320吨",年运输量:"1800万吨",运输成本:"3.5元/吨·公里",车辆利用率:"78%"}},7:{title:"破碎作业",shortDescription:"破碎作业是将大块矿石通过破碎机破碎至适合后续处理的粒度，是矿物加工的首道工序。破碎效率和质量直接影响选矿指标和经济效益。",longDescription:`
## 破碎作业概述

破碎作业是矿物加工厂的首道工序，将开采出来的大块矿石破碎至适合后续处理的粒度。破碎效果和能耗水平直接影响选矿指标和加工成本。

### 1. 破碎工艺流程
我们采用多段破碎工艺：

- **粗碎**: 颚式破碎机处理原矿，进料<1200mm
- **中碎**: 圆锥破碎机进一步破碎到中等粒度
- **细碎**: 细碎圆锥破碎机或反击破碎机
- **闭路循环**: 筛分闭路，保证产品粒度
- **粒度控制**: 在线检测和智能控制

### 2. 破碎设备配置
破碎系统的主要设备：

1. **颚式破碎机**: 进料口1200×1500mm，处理能力300t/h
2. **圆锥破碎机**: HP系列圆锥破碎机，高效节能
3. **振动筛分机**: 多层振动筛，保证筛分效率
4. **给料设备**: 振动给料机，均匀给料
5. **输送系统**: 皮带输送机，物料连续输送

### 3. 技术特点
- **多段破碎**: 三段破碎保证产品粒度合格
- **闭路循环**: 筛分闭路，避免过度破碎
- **能耗控制**: 智能控制降低破碎能耗
- **粉尘治理**: 密闭破碎和高效除尘系统
- **自动控制**: PLC控制系统，自动化程度高

高效的破碎作业为选矿作业提供合格的入料粒度，是提高选矿指标的基础。
    `,images:[{src:"/posui1.png",caption:"颚式破碎机",alt:"现代化矿石破碎生产线"},{src:"/posui2.png",caption:"振动筛",alt:"高效圆锥破碎机工作场景"}],features:["颚式破碎机粗碎，圆锥破碎机中细碎","多段破碎闭路循环工艺","破碎粒度在线检测","破碎能耗智能控制","粉尘综合治理系统"],stats:{处理能力:"1200吨/小时",进料粒度:"<1200mm",出料粒度:"<25mm",破碎比:"48:1",能耗:"1.2kWh/t"}},8:{title:"筛分/选矿",shortDescription:"筛分作业是将破碎后的矿石按粒度分级，选矿作业是根据矿石物理化学性质差异分离有用矿物和脉石矿物，是提高产品价值的关键环节。",longDescription:`
## 筛分/选矿作业概述

筛分和选矿作业是提高矿石价值的核心环节，通过物理和化学方法将有用矿物与脉石分离，生产符合质量要求的精矿产品。

### 1. 筛分作业
筛分作业按粒度对矿石进行分级：

- **振动筛分**: 大型直线振动筛和圆振动筛
- **分级粒度**: 多级筛分，生产不同粒级产品
- **筛分效率**: 筛分效率达到90%以上
- **防堵设计**: 高效防堵筛网和清球装置
- **粉尘控制**: 密闭筛分和除尘系统

### 2. 选矿工艺
根据矿石性质选择选矿方法：

- **重选**: 利用比重差异分离矿物，适用于粗粒级
- **浮选**: 利用表面化学性质差异，适用于细粒级
- **磁选**: 利用磁性差异，适用于铁矿石等磁性矿物
- **电选**: 利用导电性差异，适用于稀有金属
- **联合工艺**: 多种选矿方法组合，提高回收率

### 3. 技术优势
- **自动化控制**: 加药系统自动化，参数在线检测
- **工艺优化**: 根据矿石性质变化及时调整工艺参数
- **指标控制**: 精矿品位和回收率双控制
- **水循环**: 选矿废水循环利用，减少外排
- **环保措施**: 废水处理和尾矿干堆技术

高效的选矿作业是实现矿产资源价值最大化的关键环节，直接决定矿山的经济效益。
    `,images:[{src:"/xuankuang1.png",caption:"球磨机",alt:"大型浮选机作业场景"},{src:"/xuankuang2.png",caption:"浮选机",alt:"高效振动筛分设备工作现场"},{src:"/xuankuang3.png",caption:"磁选机",alt:"高效振动筛分设备工作现场"}],features:["多级振动筛分系统","重选、浮选、磁选联合工艺","自动化加药和过程控制","选矿指标在线检测","水循环利用和废水处理"],stats:{处理能力:"800吨/小时",选矿回收率:"92%",精矿品位:"65%",选矿比:"2.8:1",水循环利用率:"90%"}},9:{title:"尾矿处置",shortDescription:"尾矿处置是矿山环境保护的重要组成部分，通过建设尾矿库储存选矿尾砂，并实施尾矿库安全管理、防渗处理、植被恢复等措施，实现尾矿的安全环保处置。",longDescription:`
## 尾矿处置概述

尾矿处置是矿山生产过程中必须重视的环境保护环节，涉及尾矿库设计、建设、运行、闭坑全生命周期管理，关系到矿山安全和生态环境保护。

### 1. 尾矿库建设
高标准建设安全可靠的尾矿库：

- **库址选择**: 经过严格地质勘察和方案比选
- **设计标准**: 按照二等尾矿库标准设计
- **坝体结构**: 分级筑坝，保证坝体稳定
- **防渗处理**: 库底防渗，防止地下水污染
- **排洪设施**: 完善的排洪系统和调洪库容

### 2. 安全管理措施
尾矿库运行期间的安全管理：

1. **在线监测**: 坝体位移、浸润线、库水位实时监测
2. **巡查制度**: 每日巡查和定期检查相结合
3. **预警预报**: 建立完善的预警和应急响应机制
4. **防洪防汛**: 汛期加强巡查和防洪调度
5. **应急预案**: 制定详细的应急预案和演练

### 3. 环境保护
- **尾矿综合利用**: 尾矿作为建筑材料等综合利用
- **干堆技术**: 条件适宜时采用尾矿干堆
- **废水处理**: 尾矿废水处理后回用，达标排放
- **植被恢复**: 库区周边植被恢复和生态修复
- **闭坑治理**: 矿山闭坑后的尾矿库生态修复

科学的尾矿处置是矿山可持续发展的重要保障，实现经济效益和环境效益的统一。
    `,images:[{src:"/weikuang.png",caption:"尾矿库全貌",alt:"现代化尾矿库建设和管理"}],features:["高标准尾矿库建设和安全管理","尾矿库在线监测和预警系统","尾矿综合利用和干堆技术","防渗和防渗漏处理","尾矿库闭坑后的生态恢复"],stats:{尾矿库容积:"8500万立方米",服务年限:"20年",年排放量:"280万吨",尾矿库等级:"二等库",安全监测点:"35个"}},10:{title:"井筒/斜坡道开拓",shortDescription:"井筒/斜坡道开拓是地下矿山建设的基础工程，通过掘进井筒(主井、副井、风井)和斜坡道，建立地面与井下各水平的联系，为井下采矿作业提供通道。",longDescription:`
## 井筒/斜坡道开拓概述

井筒和斜坡道是地下矿山开拓的核心工程，是连接地面与井下的"咽喉"，承担着矿石提升、人员材料运输、通风等关键功能。

### 1. 井筒开拓
井筒是地下矿山的主要开拓方式：

- **主井**: 专门用于矿石提升，装备箕斗或罐笼
- **副井**: 用于人员升降、材料运输、废石提升
- **风井**: 专门用于矿井通风，安装主通风机
- **多绳提升**: 主井采用多绳摩擦提升机，提升能力大
- **井筒装备**: 罐道、梯子间、管路电缆等

### 2. 斜坡道开拓
斜坡道是现代地下矿山的重要开拓方式：

- **无轨运输**: 允许无轨设备直接进出井下
- **灵活性高**: 设备调度灵活，运输效率高
- **基建投资**: 相对井筒开拓投资较低
- **适用条件**: 适用于埋藏较浅的矿体
- **巷道断面**: 一般为4×4米，满足车辆通行

### 3. 关键技术
- **井筒施工**: 冻结法、钻井法、注浆法等特殊施工技术
- **支护技术**: 井壁支护和围岩加固技术
- **提升系统**: 现代化提升设备和安全保护系统
- **井底车场**: 优化设计提高运输效率
- **马头门**: 井筒与巷道连接的关键部位

合理的井筒和斜坡道开拓方案是地下矿山建设和生产的基础，直接影响矿山的投资和生产效率。
    `,images:[{src:"/kaituo.jpg",caption:"巷道实际场景",alt:"大型井筒施工设备和工艺"},{src:"/kaituo2.png",caption:"现代化井筒开拓施工现场",alt:"斜坡道内无轨设备运输"}],features:["主井采用多绳摩擦提升机","副井装备多层罐笼","斜坡道采用无轨运输方式","井筒装备和支护技术","井底车场和马头门优化设计"],stats:{主井深度:"450米",井筒直径:"5.5米",年提升能力:"180万吨",斜坡道长度:"2800米",开拓周期:"36个月"}},11:{title:"掘进作业",shortDescription:"掘进作业是地下矿山开拓和采准的主要工序，通过掘进各种巷道（平巷、斜巷、竖井），形成完整的井下运输、通风、排水系统，为采矿作业创造条件。",longDescription:`
## 掘进作业概述

掘进作业是地下矿山开拓和采准工程的主体，通过掘进各种巷道建立完整的井下生产系统，为采矿作业创造必要的条件和通道。

### 1. 掘进工艺方法
根据巷道用途和岩性条件选择掘进方法：

- **钻爆法**: 最常用的掘进方法，适应性强
- **综掘机掘进**: 适用于煤及软岩巷道，效率高
- **光面爆破**: 控制爆破轮廓，减少超挖
- **全断面掘进**: 适用于大断面平巷掘进
- **特殊施工**: 注浆、冻结等特殊条件下的掘进

### 2. 掘进设备配置
机械化掘进作业线配置：

- **凿岩设备**: 凿岩台车或气动凿岩机
- **装岩设备**: 耙斗装岩机或铲斗装岩机
- **运输设备**: 电机车、梭式矿车、皮带输送机
- **支护设备**: 锚杆钻机、喷浆机、支护台车
- **通风设备**: 局部通风机和风筒

### 3. 技术要点
- **断面优化**: 根据用途优化巷道断面，减少工程量
- **爆破控制**: 精确控制爆破参数，保证成型质量
- **及时支护**: 掘进后及时支护，确保围岩稳定
- **通风防尘**: 加强通风和粉尘治理，改善作业环境
- **测量导向**: 精确测量和激光导向，保证巷道质量

高效的掘进作业是地下矿山建设和采准工程的关键，直接影响矿山的建设和投产速度。
    `,images:[{src:"/juejin1.png",caption:"掘进机",alt:"现代化掘进设备工作场景"}],features:["掘进机械化作业线","光面爆破和锚喷支护技术","巷道断面优化设计","掘进通风和粉尘治理","巷道围岩稳定性监测"],stats:{年掘进量:"8500米",掘进效率:"3.2米/天",巷道合格率:"95%",掘进成本:"6500元/米",支护成本:"2800元/米"}},12:{title:"支护作业",shortDescription:"支护作业是保障地下巷道稳定性的关键环节，采用锚杆、锚索、喷射混凝土、金属支架等支护手段，控制围岩变形，防止冒顶片帮，确保作业安全。",longDescription:`
## 支护作业概述

支护作业是地下矿山安全生产的保障，通过及时有效的支护措施控制围岩变形，防止冒顶片帮等事故，为井下作业创造安全环境。

### 1. 支护技术体系
建立完善的支护技术体系：

- **锚杆支护**: 主要支护方式，加固围岩，充分发挥围岩自承能力
- **锚索支护**: 关键地段加强支护，锚固深度大
- **喷射混凝土**: 及时封闭围岩，防止风化和掉块
- **金属支架**: 适用于软弱破碎围岩的被动支护
- **联合支护**: 多种支护方式组合，适应不同地质条件

### 2. 支护工艺流程
标准化的支护作业流程：

1. **临时支护**: 掘进后及时进行临时支护，确保安全
2. **永久支护**: 滞后工作面一定距离进行永久支护
3. **锚杆施工**: 钻孔、安装、预紧，确保支护质量
4. **喷浆施工**: 清洗岩面、喷射混凝土、养护
5. **质量检测**: 支护质量无损检测和拉拔试验

### 3. 技术特点
- **及时支护**: 掘进后4小时内完成临时支护
- **主动支护**: 锚杆主动加固围岩，充分发挥围岩承载力
- **动态监测**: 围岩变形和支护受力实时监测
- **质量保证**: 标准化施工和质量检测制度
- **安全可靠**: 有效防止冒顶片帮等事故

科学的支护作业是地下矿山安全生产的根本保障，直接关系到井下作业人员的生命安全。
    `,images:[{src:"/zhihu.png",caption:"锚杆支护作业现场",alt:"标准化锚杆支护施工"}],features:["锚杆支护技术标准化施工","锚索加强支护关键地段","喷射混凝土封闭围岩","围岩变形实时监测","支护质量无损检测"],stats:{锚杆间距:"0.8×0.8米",锚杆长度:"1.8-2.5米",喷层厚度:"100-150mm",支护及时性:"掘进后4小时内",支护成本:"1200元/米"}},13:{title:"采矿作业",shortDescription:"采矿作业是地下矿山的核心生产环节，根据矿体赋存条件选择合适的采矿方法（房柱法、充填法、崩落法等），回采矿石并控制地压。",longDescription:`
## 采矿作业概述

采矿作业是地下矿山生产的核心环节，直接决定矿山的产量、效益和资源利用率。根据矿体赋存条件选择合适的采矿方法是采矿成功的关键。

### 1. 采矿方法选择
根据矿体条件和开采技术条件选择：

- **空场法**: 适用于矿石围岩稳固的矿体，回采率高
- **充填法**: 适用于地表需要保护或高价值矿体
- **崩落法**: 适用于围岩不稳固的大厚度矿体
- **房柱法**: 适用于水平和缓倾斜矿体
- **联合采矿**: 针对复杂条件采用多种方法组合

### 2. 回采工艺流程
标准化的回采作业流程：

1. **采准切割**: 形成回采作业的空间和通道
2. **凿岩作业**: 根据设计进行炮孔布置和凿岩
3. **爆破作业**: 控制爆破，实现矿石有效破碎
4. **出矿作业**: 将爆破下的矿石运出采场
5. **地压控制**: 采场地压监测和控制措施

### 3. 技术特点
- **机械化作业**: 凿岩台车、铲运机等机械化设备
- **参数优化**: 优化结构参数，提高回采率和安全性
- **地压控制**: 实时监测采场地压，确保作业安全
- **指标控制**: 控制损失率和贫化率，提高资源利用率
- **充填工艺**: 充填采矿实现采充平衡和地压控制

科学的采矿方法是地下矿山高效安全开采的基础，直接决定了矿山的综合效益。
    `,images:[{src:"/baopo4.png",caption:"凿岩台车",alt:"大型采矿设备井下作业"},{src:"/baopo3.png",caption:"凿岩台车凿出的炮眼",alt:"采场实时地压监测设备"}],features:["采用分段空场采矿法","机械化凿岩和出矿","采场地压实时监测","充填采矿和地压控制","采矿损失率和贫化率控制"],stats:{采矿方法:"分段空场法",年采矿量:"85万吨",采场生产能力:"800吨/天",损失率:"8%",贫化率:"12%"}},14:{title:"装载作业",shortDescription:"地下矿山装载作业是将采下的矿石装入运输设备的过程，使用铲运机、装岩机等设备，实现高效、安全的矿石装载和运输衔接。",longDescription:`
## 装载作业概述

装载作业是地下矿山生产中连接采矿和运输的关键环节，通过高效的装载设备将采下的矿石装入运输设备，实现采矿和运输的有效衔接。

### 1. 装载设备类型
根据开采条件选择合适的装载设备：

- **铲运机**: 电动铲运机或柴油铲运机，适用范围广
- **装岩机**: 适用于小断面巷道的装载作业
- **装运机**: 铲装和运输一体化设备
- **电铲**: 大型矿山采用的大型装载设备
- **遥控设备**: 危险区域采用遥控铲运机

### 2. 装载工艺优化
提高装载效率的优化措施：

1. **设备选型**: 根据运距和产量合理选择装载设备
2. **路径优化**: 规划最优铲运路径，减少空驶距离
3. **配车调度**: 装载和运输设备协调配合
4. **安全管理**: 危险区域采用遥控作业
5. **效率监测**: 实时监测装载效率，及时调整

### 3. 技术特点
- **电动铲运**: 环保节能，减少井下废气污染
- **遥控操作**: 危险区域遥控作业，提高安全性
- **高效作业**: 斗容大，作业效率高
- **机动灵活**: 适应不同的装载条件和工作面
- **自动化**: 逐步实现自动化装载作业

高效的装载作业是地下矿山生产的重要保障，直接影响采矿作业的连续性和矿山产量。
    `,images:[{src:"/chanzhuang3.png",caption:"地下铲运机出矿作业场景",alt:"井下铲运机正在装载矿石"},{src:"/chanzhuang4.png",caption:"哈萨克斯坦巴甫洛达尔矿山地下铲运机运送矿岩",alt:"危险区域的遥控装载作业"}],features:["电动铲运机出矿","遥控铲运机危险区域作业","装载和运输协调优化","铲运路径优化规划","装载效率实时监测"],stats:{铲运机数量:"6台",铲斗容积:"4立方米",年装载量:"95万吨",装载效率:"450吨/台班",设备利用率:"75%"}},15:{title:"井下运输作业",shortDescription:"井下运输作业是将采下的矿石从工作面运至井底车场的过程，包括电机车运输、皮带运输、无轨运输等多种方式，构成完整的井下运输系统。",longDescription:`
## 井下运输作业概述

井下运输作业是地下矿山生产的重要环节，承担着矿石、废石、材料、人员等的运输任务，是连接采掘作业和提升系统的纽带。

### 1. 运输方式选择
根据矿山条件选择合适的运输方式：

- **电机车运输**: 适用于大运量、长距离的轨道运输
- **皮带运输**: 连续运输，运量大，成本相对较低
- **无轨运输**: 柴油或电动无轨车辆运输，灵活方便
- **汽车运输**: 斜坡道开拓时的主要运输方式
- **联合运输**: 多种运输方式组合，发挥各自优势

### 2. 运输系统配置
完善的井下运输系统配置：

- **轨道运输**: 架线式电机车和矿车组成轨道运输系统
- **皮带运输**: 主运输皮带和分支皮带系统
- **信号系统**: 井下运输信号和调度系统
- **转载系统**: 矿石转载和缓冲系统
- **维护系统**: 运输设备维护和检修系统

### 3. 技术特点
- **智能调度**: 运输车辆智能调度和信号系统
- **安全保护**: 完善的安全保护装置和制动系统
- **高效运输**: 合理配置运力，提高运输效率
- **成本控制**: 优化运输方案，降低运输成本
- **环境友好**: 电动运输减少井下废气污染

高效的井下运输作业是地下矿山连续生产的重要保障，直接影响矿山的生产能力和经济效益。
    `,images:[{src:"/yunshu3.png",caption:"井下矿卡车运输系统",alt:"电机车牵引矿车运输矿石"},{src:"/yunshu4.png",caption:"矿用辅助运输智能管理系统",alt:"大功率皮带输送机连续运输"}],features:["10吨架线式电机车运输","皮带输送机连续运输","无轨设备辅助运输","运输调度自动化","井下交通信号和智能调度"],stats:{电机车数量:"8台",矿车数量:"56辆",年运输量:"85万吨",运输距离:"2.8公里",运输成本:"4.2元/吨"}},16:{title:"井下破碎/转运",shortDescription:"井下破碎/转运是将井下采出的矿石在井下进行粗碎，然后通过提升系统运至地表，减少提升负荷，提高系统效率。",longDescription:`
## 井下破碎/转运概述

井下破碎转运系统是地下矿山的重要工艺环节，通过在井下设置破碎设备，对原矿进行粗碎后提升，显著提高提升效率，降低提升能耗。

### 1. 系统组成
井下破碎转运系统的主要组成部分：

- **破碎硐室**: 安装破碎设备的专用硐室
- **粗碎设备**: 颚式破碎机进行矿石粗碎
- **溜井系统**: 矿石溜井和转运系统
- **储矿仓**: 井下储矿仓起缓冲作用
- **给料设备**: 振动给料机均匀给料

### 2. 工艺流程
标准化的井下破碎转运流程：

1. **原矿运输**: 井下运输设备将原矿运至破碎站
2. **给料破碎**: 振动给料机给料，颚式破碎机破碎
3. **溜井下运**: 破碎后的矿石通过溜井下运
4. **储矿缓冲**: 储矿仓储存，起缓冲作用
5. **箕斗提升**: 破碎矿石装入箕斗提升至地表

### 3. 技术优势
- **提高效率**: 破碎后提升，提高提升效率30%以上
- **降低能耗**: 减小矿石粒度，显著降低提升能耗
- **系统协调**: 与采掘和提升系统协调运行
- **自动控制**: 破碎转运系统自动化控制
- **环境改善**: 破碎硐室粉尘综合治理

高效的井下破碎转运系统是地下矿山提高生产效率和降低能耗的重要措施。
    `,images:[{src:"/posui3.png",caption:"井下破碎机",alt:"大型井下破碎系统"},{src:"/zhuanyun.jpg",caption:"井下皮带转运系统",alt:"井下溜井矿石转运系统"}],features:["井下颚式破碎机粗碎","矿石溜井转运系统","井下储矿仓缓冲","破碎粉尘治理","转运系统自动化控制"],stats:{破碎能力:"300吨/小时",破碎粒度:"<150mm",溜井深度:"180米",储矿仓容积:"500吨",系统利用率:"80%"}},17:{title:"提升作业",shortDescription:'提升作业是地下矿山将井下矿石、废石、人员、材料等运至地表的关键环节，通过主井、副井的提升系统实现，是地下矿山的"咽喉"系统。',longDescription:`
## 提升作业概述

提升系统是地下矿山连接井上下的"咽喉"，承担着矿石提升、人员升降、材料运输等关键任务，是地下矿山最重要的生产系统之一。

### 1. 提升系统组成
现代化提升系统的主要组成部分：

- **提升机**: 多绳摩擦提升机，功率大，提升能力高
- **提升容器**: 箕斗提升矿石，罐笼提升人员和材料
- **井架**: 钢结构井架，支撑天轮和承受载荷
- **钢丝绳**: 多根钢丝绳，安全系数高
- **装卸载**: 井底和井口的自动化装卸载系统

### 2. 提升方式
根据用途选择不同的提升方式：

- **箕斗提升**: 专门用于矿石和废石提升，效率高
- **罐笼提升**: 用于人员、材料和设备的升降
- **平衡锤**: 平衡提升载荷，降低电机功率
- **单绳提升**: 小型矿山采用单绳缠绕式提升机
- **多绳提升**: 大型矿山采用多绳摩擦提升机

### 3. 安全保护
- **过卷保护**: 防止提升容器过卷事故
- **超速保护**: 提升速度超限时自动制动
- **过载保护**: 提升载荷超限时保护
- **闸瓦间隙**: 闸瓦磨损和间隙监测
- **定期检测**: 钢丝绳、提升机等定期检测

提升系统是地下矿山安全生产的关键，必须确保其可靠性和安全性。
    `,images:[{src:"/tisheng1.png",caption:"Soudan 矿提升机房及提升卷筒",alt:"大型多绳摩擦提升机房"},{src:"/tisheng2.png",caption:"竖井箕斗主提升系统",alt:"井架箕斗提升作业现场"}],features:["多绳摩擦提升机","箕斗提升矿石","罐笼提升人员和材料","提升系统安全保护","提升自动化和远程监控"],stats:{提升机功率:"1200kW",提升高度:"450米",年提升量:"95万吨",提升速度:"12m/s",系统效率:"85%"}},18:{title:"充填作业",shortDescription:"充填作业是采用充填采矿法的矿山的重要工序，将尾砂、废石等充填材料输送到采空区，控制地压、防止地表沉陷，提高资源回收率。",longDescription:`
## 充填作业概述

充填作业是充填采矿法的重要工序，通过向采空区输送充填材料，控制地压，保护地表，提高资源回收率，是实现绿色开采的重要技术。

### 1. 充填材料
根据矿山条件选择合适的充填材料：

- **尾砂充填**: 利用选矿尾砂作为充填材料，废物利用
- **废石充填**: 井下掘进废石作为充填材料
- **胶结充填**: 添加水泥等胶凝材料，提高充填体强度
- **水砂充填**: 利用水力输送河砂等材料
- **高水充填**: 使用高水材料进行快速充填

### 2. 充填工艺流程
标准化的充填作业流程：

1. **材料制备**: 充填材料的制备和配比
2. **管道输送**: 通过管道系统将充填材料输送至采空区
3. **采场充填**: 向采空区充填，形成充填体
4. **接顶充填**: 最后阶段的接顶充填，确保充填密实
5. **养护固化**: 充填材料养护，达到设计强度

### 3. 技术特点
- **采充平衡**: 采矿和充填协调配合，实现采充平衡
- **强度控制**: 控制充填体强度，满足地压控制需要
- **管道输送**: 高效管道输送，实现连续充填
- **质量监测**: 充填质量和效果实时监测
- **环保效益**: 尾砂和废石得到充分利用

充填作业是实现绿色开采和资源高效利用的重要技术，是现代矿山的发展方向。
    `,images:[{src:"/chongtian1.jpg",caption:"矿山充填系统",alt:"充填材料搅拌制备系统"}],features:["尾砂充填工艺","充填体强度控制","充填系统管道输送","采充平衡协调","充填质量和效果监测"],stats:{充填能力:"120m³/h",充填倍线:"1.8-2.2",充填体强度:"2-4MPa",年充填量:"18万m³",充填成本:"35元/m³"}},19:{title:"通风系统",shortDescription:"通风系统是地下矿山的安全保障系统，通过机械通风和自然通风，为井下作业人员提供新鲜空气，排出粉尘和有害气体，创造安全的作业环境。",longDescription:`
## 通风系统概述

通风系统是地下矿山安全生产的基础保障，通过连续不断的通风，为井下作业人员提供新鲜空气，排除粉尘等有害物质，创造安全的作业环境。

### 1. 通风方式选择
根据矿山条件选择合适的通风方式：

- **机械通风**: 采用主通风机强制通风，可靠性强
- **多级机站**: 多级机站通风，能耗低，调控灵活
- **分区通风**: 大型矿山采用分区通风，提高效率
- **对角式通风**: 新风和污风对角流动，通风效果好
- **混合式通风**: 多种通风方式组合，适应复杂条件

### 2. 通风系统组成
完整的矿井通风系统组成：

- **通风机**: 主通风机、局部通风机组成通风动力系统
- **通风网络**: 进风井、回风井、通风巷道组成网络
- **通风设施**: 风门、风桥、风窗等风流控制设施
- **除尘装置**: 通风除尘装置，净化风流
- **监测系统**: 风量、风速、有害气体监测系统

### 3. 技术特点
- **变频调速**: 风机变频调速，节能效果显著
- **自动控制**: 风门和风机自动控制，提高效率
- **灾害预警**: 有害气体超限自动报警和断电
- **应急通风**: 灾变时期反风和应急通风
- **节能优化**: 通风系统优化设计，降低通风能耗

可靠的通风系统是地下矿山安全生产的根本保障，直接关系到井下作业人员的生命安全。
    `,images:[{src:"/tongfeng2.png",caption:"矿井通风管路",alt:"大型主通风机组"},{src:"/tongfeng1.png",caption:"压入式局部通风机",alt:"自动控制风门系统"}],features:["多级机站通风方式","风门和风桥自动控制","风机变频调速节能","粉尘和有害气体实时监测","灾变时期反风和应急通风"],stats:{总风量:"380m³/min",风机功率:"450kW",矿井等积孔:"2.8m²",有效风量率:"85%",通风能耗:"1.8kWh/t矿石"}},20:{title:"排水系统",shortDescription:"排水系统是地下矿山的重要辅助系统，通过水泵、管路将井下涌水排至地表，防止淹井事故，保障安全生产。",longDescription:`
## 排水系统概述

排水系统是地下矿山的重要安全保障系统，通过水泵、管路、水仓等设施，将井下涌水及时排至地表，防止淹井事故，保障矿山安全生产。

### 1. 排水方式选择
根据矿山涌水条件和开采深度选择排水方式：

- **直接排水**: 浅部矿山直接将水排至地表
- **分段排水**: 深部矿山分段接力排水
- **集中排水**: 涌水集中到主水仓统一排放
- **联合排水**: 多个水平联合排水系统
- **应急排水**: 配备应急排水设备，应对突发涌水

### 2. 排水系统组成
完整的矿井排水系统组成：

- **水泵房**: 安装主排水泵的专用硐室
- **排水泵**: 多级离心泵，扬程高，流量大
- **水仓**: 主水仓和副水仓，储存和沉淀涌水
- **排水管路**: 通往地表的排水管路系统
- **控制装置**: 水泵自动化控制和保护装置

### 3. 技术特点
- **自动控制**: 水泵根据水仓水位自动启停
- **双回路供电**: 重要设备，双回路供电保证可靠
- **防垢处理**: 管路定期防垢处理，保持排水效率
- **应急备用**: 配备应急水泵和备用电源
- **定期检修**: 定期检修和维护，确保系统可靠

可靠的排水系统是地下矿山防止水害事故的重要保障，直接关系到矿井的安全生产。
    `,images:[{src:"/paishui1.jpg",caption:"矿井排水自动化系统",alt:"现代化排水泵系统"},{src:"/paishui2.jpg",caption:"矿井下水泵房",alt:"水仓和排水管路布置"}],features:["分段排水系统","水泵自动化控制","水仓和沉淀池清理","排水管路防垢处理","应急排水系统"],stats:{正常涌水量:"180m³/h",最大涌水量:"320m³/h",水泵功率:"280kW",排水能力:"450m³/h",水仓容积:"1200m³"}},21:{title:"供配电系统",shortDescription:"供配电系统是地下矿山的动力来源，为采矿、提升、通风、排水等设备提供电力供应，确保供电可靠和安全。",longDescription:`
## 供配电系统概述

供配电系统是地下矿山的动力来源，为各种生产设备提供可靠的电力供应，是矿山生产的"动力心脏"，供电可靠性直接影响矿山的生产和安全。

### 1. 供电系统架构
可靠的供电系统架构设计：

- **双回路供电**: 双回路电源，保证供电连续性
- **分级配电**: 地面变电所、井下中央变电所、采区变电所分级
- **环形供电**: 重要负荷采用环形供电，提高可靠性
- **备用电源**: 配备柴油发电机组作为应急电源
- **电压等级**: 35kV、10kV、660V、380V等多级电压

### 2. 配电系统组成
完整的供配电系统组成：

- **地面变电所**: 接受外部电源，变压分配到井下
- **井下变电所**: 井下中央变电所和采区变电所
- **配电装置**: 高低压开关柜、配电箱等
- **电缆网络**: 电力电缆和电缆敷设系统
- **保护装置**: 继电保护和自动化装置

### 3. 技术特点
- **自动化**: 变电所综合自动化系统
- **无功补偿**: 电容无功补偿，提高功率因数
- **防爆设备**: 井下使用防爆电气设备
- **漏电保护**: 井下完善的漏电保护系统
- **节能优化**: 供电系统优化，降低电能损耗

可靠的供配电系统是矿山生产的动力保障，必须确保供电的安全性和可靠性。
    `,images:[{src:"/gongdian1.png",caption:"井下变电所",alt:"现代化矿山变电所"},{src:"/gongdian2.png",caption:"交流发电机",alt:"井下防爆配电装置"}],features:["双回路供电系统","井下变电所自动化","无功功率补偿","井下供电保护装置","防爆电气设备"],stats:{总装机容量:"4500kW",年用电量:"2800万kWh",功率因数:"0.92",供电可靠率:"99.5%",线损率:"4.5%"}},22:{title:"调度与通信系统",shortDescription:"调度与通信系统是地下矿山的信息枢纽，通过调度通信、监控监测、数据传输等手段，实现生产指挥和安全监控的信息化。",longDescription:`
## 调度与通信系统概述

调度与通信系统是地下矿山的信息枢纽，通过现代化的通信技术和信息手段，实现生产调度、安全监控、应急指挥的集成化和信息化。

### 1. 通信系统组成
现代化的矿山通信系统组成：

- **调度通信**: 生产调度电话系统和无线通信系统
- **人员定位**: 井下人员实时定位和考勤系统
- **应急通信**: 应急广播和灾害时期的应急通信
- **视频监控**: 重要场所视频监控和远程监视
- **数据传输**: 生产数据和安全监测数据传输

### 2. 调度指挥功能
完善的调度指挥功能：

1. **生产调度**: 统一指挥日常生产作业和设备调度
2. **安全监控**: 监测各类安全参数和设备状态
3. **应急指挥**: 灾害时期的应急响应和指挥调度
4. **信息发布**: 生产信息和安全指令发布
5. **数据分析**: 生产数据统计分析和趋势预测

### 3. 技术特点
- **全覆盖**: 井下通信信号100%覆盖
- **高精度**: 人员定位精度达到3米以内
- **实时性**: 调度响应时间30秒以内
- **可靠性**: 系统可靠性达到99.9%以上
- **集成化**: 多系统融合，信息共享

完善的调度与通信系统是现代化矿山的重要标志，显著提高生产效率和安全保障能力。
    `,images:[{src:"/tongxin2.png",caption:"矿山调度通信及网络架构",alt:"现代化调度监控中心"}],features:["矿井调度通信系统","人员定位和考勤系统","应急广播和通信","生产数据实时传输","视频监控和远程调度"],stats:{调度电话:"86部",人员定位精度:"3米",通信覆盖率:"100%",数据传输速率:"100Mbps",调度响应时间:"30秒内"}},23:{title:"自动化控制",shortDescription:"自动化控制系统是现代矿山的重要标志，通过PLC、DCS、计算机监控系统，实现生产过程的自动化控制和优化管理。",longDescription:`
## 自动化控制系统概述

自动化控制系统是现代矿山的重要标志，通过先进的自动化技术和计算机监控系统，实现生产过程的自动化控制、优化管理和智能化决策。

### 1. 控制系统架构
分层分布式的控制系统架构：

- **设备层**: 现场设备和仪表，直接控制生产设备
- **控制层**: PLC、DCS等控制器，实现过程控制
- **监控层**: 计算机监控系统，人机界面和操作
- **管理层**: 生产管理信息系统，数据分析和决策
- **网络层**: 工业以太网，实现系统互联

### 2. 主要控制功能
完善的生产过程控制功能：

1. **破碎控制**: 破碎系统自动化控制和保护
2. **提升控制**: 提升系统自动化和安全保护
3. **通风控制**: 通风系统自动调节和节能控制
4. **排水控制**: 排水系统自动化和无人值守
5. **选矿控制**: 选矿过程自动化和参数优化

### 3. 技术特点
- **PLC控制**: 可编程控制器，可靠性和灵活性高
- **DCS系统**: 集散控制系统，适合大型复杂过程
- **现场总线**: 现场总线技术，减少布线，提高可靠性
- **智能仪表**: 智能传感器和执行器，提高精度
- **数据分析**: 大数据分析，优化生产工艺

先进的自动化控制系统是提高矿山生产效率和管理水平的重要手段。
    `,images:[{src:"/zidonghua.png",caption:"自动化控制系统",alt:"矿山自动化监控系统"}],features:["生产过程自动控制","设备状态远程监控","生产工艺参数优化","数据采集和分析","智能制造和数字化转型"],stats:{自动化覆盖率:"85%",监控点位:"480个",控制回路:"65个",数据采集频率:"1秒",系统可用率:"98%"}},24:{title:"安全监测系统",shortDescription:"安全监测系统是地下矿山的安全保障系统，通过监测粉尘、地压、水温等安全参数，实现灾害预警和安全管理。",longDescription:`
## 安全监测系统概述

安全监测系统是地下矿山的安全保障系统，通过实时监测各类安全参数，实现灾害预警和安全管理，是保障井下作业人员生命安全的重要手段。

### 1. 监测系统组成
全面的安全监测系统组成：

- **传感器网络**: 分布式传感器网络，实时监测各类参数
- **数据传输**: 安全监测数据专用传输网络
- **监控中心**: 地面监控中心，集中监控和分析
- **预警系统**: 超限自动报警和预警预报
- **应急联动**: 与应急系统联动，自动启动应急预案

### 2. 监测参数范围
全面的安全参数监测：

- **粉尘监测**: 呼吸性粉尘浓度和总粉尘浓度
- **地压监测**: 巷道围岩应力和变形监测
- **温度监测**: 环境温度和设备温度监测
- **水文监测**: 涌水量、水位等水文地质参数

### 3. 技术特点
- **实时监测**: 传感器实时采集，数据实时传输
- **智能预警**: 多参数融合分析，智能预警预报
- **多级报警**: 预警、报警、断电多级保护
- **历史分析**: 历史数据分析，预测安全趋势
- **应急联动**: 与通风、供电等系统联动应对

完善的安全监测系统是预防矿山灾害事故的重要保障，是现代矿山的必备系统。
    `,images:[{src:"/jiance1.png",caption:"智能视频监控系统",alt:"矿山安全监测监控中心"},{src:"/jiance2.png",caption:"井下安全监测传感器",alt:"各类安全监测传感器布置"}],features:["多参数传感器网络","实时监测和数据分析","灾害预警和预报","应急联动和处置","安全态势评估"],stats:{传感器数量:"156个",监测参数:"12类",预警准确率:"92%",监测覆盖率:"95%",误报率:"<5%"}},25:{title:"综合管控平台",shortDescription:"综合管控平台是现代矿山的信息化集成平台，将生产、安全、设备、人员等各类信息集成管理，实现矿山生产经营的数字化、智能化管理。",longDescription:`
## 综合管控平台概述

综合管控平台是现代矿山的"智慧大脑"，通过信息化手段将生产、安全、设备、人员等各类信息集成管理，实现矿山生产经营的数字化、可视化和智能化。

### 1. 平台架构设计
先进的综合管控平台架构：

- **基础设施层**: 服务器、存储、网络等基础设施
- **数据层**: 统一的数据中心和数据标准
- **平台层**: GIS、BIM、三维可视化等技术平台
- **应用层**: 生产调度、安全监控、设备管理等应用
- **展示层**: 大屏展示、PC终端、移动终端等多种方式

### 2. 主要功能模块
全面的综合管控功能：

1. **GIS三维可视化**: 基于GIS的三维矿山可视化展示
2. **生产调度指挥**: 生产调度和指挥管理
3. **安全监测监控**: 安全监测数据集成和预警
4. **设备全生命周期管理**: 设备台账、维护、检修管理
5. **人员管理**: 人员定位、考勤、培训管理

### 3. 技术特点
- **系统集成**: 集成15个以上子系统
- **数据融合**: 多源数据融合和数据治理
- **三维可视化**: 真实的三维矿山可视化
- **移动应用**: 支持移动终端访问和操作
- **智能决策**: 大数据分析和智能决策支持

综合管控平台是现代矿山信息化建设的重要成果，是实现智慧矿山的关键基础设施。
    `,images:[{src:"/pingtai1.png",caption:"调度指挥中心",alt:"矿山综合管控平台大屏展示"},{src:"/pingtai2.png",caption:"综合管控平台监控大屏",alt:"矿山三维GIS可视化界面"}],features:["GIS三维可视化平台","生产调度指挥系统","安全监测监控集成","设备全生命周期管理","大数据分析和决策支持"],stats:{集成子系统:"15个",数据存储容量:"50TB",平台响应时间:"<2秒",系统可用率:"99.5%",用户数量:"120人"}},101:{title:"尾矿库安全红线",shortDescription:"尾矿库安全红线是不可逾越的安全底线，包括库水位、滩顶高程、坝体坡度、排洪设施等关键安全指标，任何指标超限必须立即停产整改。",longDescription:`
## 尾矿库安全红线概述

尾矿库安全红线是保障尾矿库安全的生命线，规定了尾矿库运行中的关键安全参数限值，是必须严格遵守的强制性安全标准，任何情况下不得突破。

### 1. 核心红线指标
尾矿库的五大核心红线指标：

- **库水位红线**: 库水位不得超过设计规定的最高标高
- **滩顶高程红线**: 干滩长度必须满足防汛要求
- **坝体坡度红线**: 坝体坡比不得陡于设计坡比
- **稳定系数红线**: 坝体稳定系数必须满足规范要求
- **排洪设施红线**: 排洪系统必须畅通无阻

### 2. 红线管理制度
严格的红线管理制度：

1. **每日监测**: 每日监测各项红线指标，做好记录
2. **预警预报**: 接近红线时自动预警，及时采取措施
3. **超限停产**: 任何指标超限必须立即停产整改
4. **责任追究**: 违反红线规定严厉追究责任
5. **定期评估**: 定期评估红线管理的有效性

### 3. 应急响应措施
- **一级响应**: 接近红线时，加强监测，采取措施
- **二级响应**: 达到红线时，预警通报，准备停产
- **三级响应**: 超过红线时，立即停产，整改达标

尾矿库安全红线是不可逾越的安全底线，必须无条件严格执行。
    `,images:[{src:"/weikuang2.png",caption:"尾矿库安全监测预警系统",alt:"尾矿库安全监测设备"},{src:"/weikuang3.jpg",caption:"尾矿库坝体稳定监测",alt:"坝体位移和浸润线监测"}],features:["库水位不超过设计标高","滩顶高程满足防汛要求","坝体坡比和稳定系数达标","排洪设施畅通无阻","24小时安全监测监控"],stats:{红线指标:"5项",监测频率:"实时",预警级别:"3级预警",应急响应:"立即停产",违规后果:"停产整顿"}},102:{title:"边坡安全红线",shortDescription:"边坡安全红线是露天矿山边坡稳定的安全底线，包括边坡角度、台阶高度、坡面线等关键参数，超过红线可能导致边坡失稳、滑坡等重大安全事故。",longDescription:`
## 边坡安全红线概述

边坡安全红线是露天矿山边坡稳定的安全保障，规定了边坡角度、台阶参数等关键限值，是防止边坡失稳、滑坡等重大事故的重要措施。

### 1. 边坡红线指标
露天矿山边坡的关键红线指标：

- **最终边坡角**: 不得超过设计规定的最大边坡角
- **工作边坡角**: 临时工作边坡角度也有严格限制
- **台阶高度**: 单个台阶高度不得超过设计值
- **台阶宽度**: 平台宽度必须满足安全要求
- **坡面线**: 边坡坡面线必须符合设计要求

### 2. 监测管控措施
完善的边坡监测和管控措施：

1. **日常监测**: 每日监测边坡位移和变形情况
2. **爆破控制**: 严格控制爆破震动对边坡的影响
3. **水患防治**: 做好边坡排水，防止水患影响稳定
4. **加固治理**: 不稳定边坡及时加固和治理
5. **预警预报**: 建立边坡失稳预警预报系统

### 3. 应急处置
- **监测预警**: 边坡位移超限时及时预警
- **减载卸荷**: 必要时进行边坡减载卸荷
- **加固支护**: 采取加固措施提高边坡稳定性
- **人员撤离**: 危及安全时及时撤离人员和设备
- **限制作业**: 边坡不稳定时限制相关作业

边坡安全红线是露天矿山安全生产的重要保障，必须严格遵守。
    `,images:[{src:"/bianpo.png",caption:"露天矿边坡监测系统",alt:"边坡位移监测设备"},{src:"/bianpo3.png",caption:"边坡加固治理工程",alt:"边坡锚固加固施工现场"}],features:["最终边坡角不超过设计值","台阶高度和宽度符合规范","边坡稳定性实时监测","爆破震动控制","边坡加固和治理措施"],stats:{最终边坡角:"≤42°",台阶高度:"≤12米",监测点数量:"28个",监测频率:"每日3次",稳定系数:"≥1.15"}},103:{title:"爆破境界红线",shortDescription:"爆破境界红线是露天矿山的开采边界限制，规定了爆破作业的最大范围和安全距离，确保爆破不影响周边设施和人员安全。",longDescription:`
## 爆破境界红线概述

爆破境界红线是露天矿山爆破作业的边界限制，明确了爆破作业的安全范围和最大界限，是保障爆破安全和周边设施安全的重要措施。

### 1. 爆破红线指标
爆破境界的关键红线指标：

- **爆破边界**: 明确的爆破作业边界线
- **安全距离**: 爆破中心到保护物的安全距离
- **震动限值**: 爆破震动速度的限制值
- **飞石距离**: 飞石飞行距离的严格控制
- **警戒范围**: 爆破时的警戒范围

### 2. 安全管控措施
严格的爆破安全管控措施：

1. **边界标识**: 爆破边界线明确标识和标记
2 **安全确认**: 爆破前确认安全距离和保护物
3. **震动监测**: 实时监测爆破震动速度
4. **警戒撤离**: 爆破时人员设备撤离警戒范围
5. **飞石控制**: 控制飞石距离，确保周边安全

### 3. 保护措施
- **设施保护**: 爆破前对周边设施采取保护措施
- **减震措施**: 采用减震爆破技术
- **防护覆盖**: 爆破体表面覆盖防护
- **分段爆破**: 控制单段药量，减少震动
- **参数优化**: 优化爆破参数，控制有害效应

爆破境界红线是确保爆破安全和周边安全的重要保障，必须严格执行。
    `,images:[{src:"/baopoanquan.png",caption:"爆破边界标识现场",alt:"爆破境界线标识和标记"},{src:"/baopoanquan2.png",caption:"爆破震动监测",alt:"爆破震动实时监测设备"}],features:["爆破边界明确标识","安全距离严格控制","爆破震动监测","飞石距离控制","周边设施保护"],stats:{安全距离:"300米",最大一段药量:"2.5吨",震动速度限值:"2cm/s",飞石距离:"<250米",警戒半径:"200米"}},104:{title:"井下安全监测红线",shortDescription:"井下安全监测红线包括有毒有害气体浓度、粉尘浓度、通风风速、温度等关键安全参数，任何参数超限必须立即撤人并进行处理。",longDescription:`
## 井下安全监测红线概述

井下安全监测红线是地下矿山安全生产的生命线，规定了各类安全参数的限值，是防止有毒有害气体、粉尘等灾害事故的重要保障。

### 1. 安全红线指标
井下安全的关键红线指标：

- **粉尘浓度**: 呼吸性粉尘浓度不得超过10mg/m³
- **通风风速**: 作业地点风速不得低于0.25m/s
- **一氧化碳**: 一氧化碳浓度不得超过24ppm
- **温度**: 作业地点温度不得超过28℃

### 2. 监测报警系统
完善的监测报警系统：

1. **实时监测**: 各类安全参数实时监测
2. **自动报警**: 参数超限自动报警并断电
3. **区域控制**: 灾害区域自动切断电源
4. **人员撤离**: 超限时自动启动人员撤离程序
5. **应急响应**: 快速应急响应和处置

### 3. 管控措施
- **班前检查**: 每班作业前检查安全参数
- **班中监测**: 作业过程中持续监测
- **异常处理**: 发现异常立即处理和报告
- **人员培训**: 作业人员安全培训和应急演练
- **系统维护**: 监测系统定期维护和校准

井下安全监测红线是保障井下作业人员生命安全的重要措施，必须无条件严格执行。
    `,images:[{src:"/jianceanquan.png",caption:"地压/微震监测系统",alt:"浓度监测传感器"},{src:"/jianceanquan2.png",caption:"井下人员定位系统",alt:"井下安全参数实时监控"}],features:["粉尘浓度自动报警","通风风速在线监测","人员定位和跟踪","应急逃生系统"],stats:{粉尘浓度限值:"10mg/m³",最低风速:"0.25m/s",监测点覆盖:"100%",报警响应:"≤10秒"}},105:{title:"提升运输安全红线",shortDescription:"提升运输安全红线涉及提升机、钢丝绳、井筒装备、运输设备等关键安全环节，任何故障或异常必须立即停止运行进行检查。",longDescription:`
## 提升运输安全红线概述

提升运输安全红线是地下矿山提升和运输系统的安全保障，规定了关键设备和环节的安全标准，是防止提升运输事故的重要措施。

### 1. 安全红线指标
提升运输的关键红线指标：

- **钢丝绳安全系数**: 必须满足规范规定的最小安全系数
- **提升速度**: 不得超过设计规定的最大提升速度
- **过载保护**: 提升载荷不得超过额定载荷的110%
- **限速保护**: 超速15%时必须自动制动
- **安全装置**: 所有安全保护装置必须齐全有效

### 2. 关键安全环节
提升运输系统的关键安全环节：

1. **钢丝绳管理**: 定期检测和更换，确保安全系数
2. **提升机保护**: 过卷、超速、过载等保护齐全
3. **井筒装备**: 罐道、梯子间等定期检查维护
4. **连接装置**: 提升容器连接装置定期探伤
5. **信号系统**: 提升信号系统可靠清晰

### 3. 管控措施
- **每日检查**: 每日检查钢丝绳和提升机
- **定期检测**: 钢丝绳定期无损检测和探伤
- **保护试验**: 安全保护装置定期试验
- **人员培训**: 提升机操作人员专业培训
- **应急演练**: 定期进行提升事故应急演练

提升运输安全红线是保障井下人员提升安全的重要措施，必须严格执行。
    `,images:[{src:"/tishenganquan.png",caption:"钢丝绳无损检测",alt:"钢丝绳专业检测设备"},{src:"/tishenganquan2.png",caption:"提升机安全保护系统",alt:"提升机安全保护装置"}],features:["钢丝绳定期检测","提升机安全保护","井筒装备检查维护","运输设备安全装置","人员提升严格管理"],stats:{钢丝绳检测:"每日",安全装置:"8套",限速保护:"15%超速保护",过载保护:"110%过载保护",检查频次:"每班"}}},ec=(e,t)=>{const n=e.__vccOpts||e;for(const[s,i]of t)n[s]=i;return n},tc={name:"MiningFlow",data(){return{backgroundImage:"/1.png",selectedDetail:null,editMode:!1,draggingButton:null,dragOffset:{x:0,y:0},originalPositions:{},buttons:this.generateButtons()}},mounted(){this.loadSavedPositions(),this.$nextTick(()=>{this.updateImageContainer()}),window.addEventListener("resize",this.updateImageContainer),this.$refs.sceneImage&&this.$refs.sceneImage.addEventListener("load",this.updateImageContainer)},beforeUnmount(){window.removeEventListener("resize",this.updateImageContainer),this.$refs.sceneImage&&this.$refs.sceneImage.removeEventListener("load",this.updateImageContainer)},methods:{generateButtons(e=null){const t=[],n=e?this.getSavedPositionsForType(e,"blue"):this.generateButtonPositions(en.blueButtons.length,"blue");en.blueButtons.forEach((i,r)=>{let o;e&&n[i.id]?o=n[i.id]:o=Array.isArray(n)?n[r]:this.generateButtonPositions(1,"blue")[0],t.push(this.createButton(i,o,"blue"))});const s=e?this.getSavedPositionsForType(e,"red"):this.generateButtonPositions(en.redButtons.length,"red");return en.redButtons.forEach((i,r)=>{let o;e&&s[i.id]?o=s[i.id]:o=Array.isArray(s)?s[r]:this.generateButtonPositions(1,"red")[0],t.push(this.createButton(i,o,"red"))}),t},getSavedPositionsForType(e,t){const n={};return e.forEach(s=>{s.type===t&&s.id&&s.left&&s.top&&(n[s.id]={left:s.left,top:s.top})}),n},generateButtonPositions(e,t){const n=[],s=Xl[t];if(s.layout==="grid")for(let i=0;i<e;i++){const r=i%s.cols,o=Math.floor(i/s.cols);n.push({left:`${s.startX+r*s.spacingX}%`,top:`${s.startY+o*s.spacingY}%`})}else if(s.layout==="vertical")for(let i=0;i<e;i++)n.push({left:`${s.startX}%`,top:`${s.startY+i*s.spacingY}%`});return n},createButton(e,t,n){const s=Ql[e.id]||{title:e.text,shortDescription:`${e.text}是矿山全生命周期管理的重要组成部分，确保矿山运营的安全、高效和可持续发展。`,longDescription:"",images:[],features:Zl,stats:{状态:"正常运行",重要性:"高",更新时间:"实时更新"}};return{id:e.id,text:e.text,left:t.left,top:t.top,type:n,shortDescription:s.shortDescription,longDescription:s.longDescription,images:s.images,features:s.features,stats:s.stats}},showDetail(e){this.selectedDetail=e},closeDetail(){this.selectedDetail=null},enableEditMode(){this.editMode=!0,this.originalPositions={},this.buttons.forEach(e=>{this.originalPositions[e.id]={left:e.left,top:e.top}})},exitEditMode(){this.editMode=!1,this.draggingButton=null,this.buttons.forEach(e=>{this.originalPositions[e.id]&&(e.left=this.originalPositions[e.id].left,e.top=this.originalPositions[e.id].top)})},saveEditMode(){this.editMode=!1,this.draggingButton=null,this.saveButtonPositions(),console.log("新位置保存:",this.buttons.map(e=>({id:e.id,text:e.text,left:e.left,top:e.top})))},startDrag(e,t){if(!this.editMode)return;this.draggingButton=e.id;const n=t.target.getBoundingClientRect();this.dragOffset={x:t.clientX-n.left,y:t.clientY-n.top}},onDrag(e){if(!this.editMode||!this.draggingButton)return;e.preventDefault();const t=this.buttons.find(c=>c.id===this.draggingButton);if(!t)return;const s=this.$refs.imageContainer.getBoundingClientRect(),i=e.clientX-s.left,r=e.clientY-s.top,o=Math.max(0,Math.min(100,i/s.width*100))+"%",l=Math.max(0,Math.min(100,r/s.height*100))+"%";t.left=o,t.top=l},endDrag(){this.draggingButton=null},saveButtonPositions(){const e=this.buttons.map(t=>({id:t.id,text:t.text,left:t.left,top:t.top,type:t.type}));localStorage.setItem("miningButtonPositions",JSON.stringify(e)),console.log("按钮位置已保存到本地存储")},loadSavedPositions(){try{const e=JSON.parse(localStorage.getItem("miningButtonPositions"));e&&e.length>0?(this.buttons=this.generateButtons(e),console.log("从本地存储加载了保存的按钮位置")):(this.buttons=this.generateButtons(),console.log("使用默认按钮位置"))}catch(e){console.error("加载保存的位置时出错:",e),this.buttons=this.generateButtons()}},resetButtonPositions(){confirm("确定要重置所有按钮位置到默认值吗？")&&(localStorage.removeItem("miningButtonPositions"),this.buttons=this.generateButtons(),console.log("按钮位置已重置到默认值"))},updateImageContainer(){this.$nextTick(()=>{const e=this.$el.querySelector(".scene-section"),t=this.$refs.sceneImage,n=this.$refs.imageContainer;if(!e||!t||!n)return;const s=e.getBoundingClientRect(),i=t.naturalWidth,r=t.naturalHeight;if(!i||!r)return;const o=s.width/s.height,l=i/r;let c,d;l>o?(c=s.width,d=c/l):(d=s.height,c=d*l);const f=(s.width-c)/2,p=(s.height-d)/2;n.style.position="absolute",n.style.left=f+"px",n.style.top=p+"px",n.style.width=c+"px",n.style.height=d+"px"})},renderMarkdown(e){if(!e)return"";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/^### (.*$)/gim,"<h4>$1</h4>"),t=t.replace(/^## (.*$)/gim,"<h3>$1</h3>"),t=t.replace(/^# (.*$)/gim,"<h2>$1</h2>"),t=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/\*(.*?)\*/g,"<em>$1</em>"),t=t.replace(/^\- (.*$)/gim,"<li>$1</li>"),t=t.replace(/^(\d+)\. (.*$)/gim,"<li>$2</li>"),t=t.replace(/\n\n/g,"</p><p>"),t="<p>"+t+"</p>",t=t.replace(/<p><\/p>/g,""),t=t.replace(/<p>(<h[1-6]>)/g,"$1"),t=t.replace(/(<\/h[1-6]>)<\/p>/g,"$1"),t=t.replace(/<p>(<li>)/g,"$1"),t=t.replace(/(<\/li>)<\/p>/g,"$1"),t}}},nc={class:"mining-container"},sc={class:"scene-section"},ic={class:"scene-background"},rc={class:"image-container",ref:"imageContainer"},oc=["src"],lc={key:1,class:"scene-placeholder"},cc=["onClick","onMousedown"],ac={class:"button-text"},fc={key:0,class:"button-coords"},uc={class:"edit-controls"},dc={key:1,class:"edit-mode-active"},pc={class:"detail-content"},hc={class:"detail-header"},gc={class:"detail-icon"},mc={class:"detail-body"},yc={key:0,class:"detail-images"},_c=["src","alt"],bc={class:"image-caption"},vc={class:"detail-description"},xc=["innerHTML"],Sc={key:1},Cc={key:1,class:"detail-features"},Dc={key:2,class:"detail-stats"},Tc={class:"stats-grid"},wc={class:"stat-label"},Ec={class:"stat-value"};function Pc(e,t,n,s,i,r){return te(),ie("div",nc,[t[16]||(t[16]=B("div",{class:"header-title"},[B("h1",null,"矿山全生命周期开采阶段流程图")],-1)),B("div",sc,[B("div",ic,[B("div",rc,[i.backgroundImage?(te(),ie("img",{key:0,src:i.backgroundImage,alt:"矿区实景",class:"scene-image",ref:"sceneImage",onLoad:t[0]||(t[0]=(...o)=>r.updateImageContainer&&r.updateImageContainer(...o))},null,40,oc)):(te(),ie("div",lc,[...t[10]||(t[10]=[B("div",{class:"placeholder-content"},[B("h2",null,"矿产资源综合利用展示平台"),B("p",null,"点击下方按钮查看详细信息")],-1)])])),(te(!0),ie(be,null,Qt(i.buttons,o=>(te(),ie("div",{key:o.id,class:bn(["scene-button",{"edit-mode":i.editMode,dragging:i.draggingButton===o.id,"red-button":o.type==="red","blue-button":o.type==="blue"}]),style:_n({left:o.left,top:o.top,transform:"translate(-50%, -50%)",cursor:i.editMode?"move":"pointer"}),onClick:l=>i.editMode?r.startDrag(o,l):r.showDetail(o),onMousedown:l=>i.editMode&&r.startDrag(o,l),onMousemove:t[1]||(t[1]=l=>i.editMode&&r.onDrag(l)),onMouseup:t[2]||(t[2]=l=>i.editMode&&r.endDrag())},[B("div",ac,we(o.text),1),t[11]||(t[11]=B("div",{class:"button-pulse"},null,-1)),i.editMode?(te(),ie("div",fc,we(o.left)+", "+we(o.top),1)):yt("",!0)],46,cc))),128))],512),B("div",uc,[i.editMode?(te(),ie("div",dc,[t[12]||(t[12]=B("span",{class:"edit-mode-text"},"编辑模式 - 拖拽按钮调整位置",-1)),B("button",{onClick:t[4]||(t[4]=(...o)=>r.saveEditMode&&r.saveEditMode(...o)),class:"save-btn"},"💾 保存"),B("button",{onClick:t[5]||(t[5]=(...o)=>r.exitEditMode&&r.exitEditMode(...o)),class:"exit-btn"},"❌ 取消"),B("button",{onClick:t[6]||(t[6]=(...o)=>r.resetButtonPositions&&r.resetButtonPositions(...o)),class:"reset-btn"},"🔄 重置")])):(te(),ie("button",{key:0,onClick:t[3]||(t[3]=(...o)=>r.enableEditMode&&r.enableEditMode(...o)),class:"edit-btn"}," 🎯 调整按钮位置 "))])])]),ve(bl,{name:"fade"},{default:Mi(()=>[i.selectedDetail?(te(),ie("div",{key:0,class:"detail-overlay",onClick:t[9]||(t[9]=(...o)=>r.closeDetail&&r.closeDetail(...o))},[B("div",{class:"detail-panel",onClick:t[8]||(t[8]=Ul(()=>{},["stop"]))},[B("button",{class:"close-button",onClick:t[7]||(t[7]=(...o)=>r.closeDetail&&r.closeDetail(...o))},"×"),B("div",pc,[B("div",hc,[B("div",gc,we(i.selectedDetail.type==="red"?"🔴":"🔵"),1),B("h2",null,we(i.selectedDetail.text),1)]),B("div",mc,[i.selectedDetail.images&&i.selectedDetail.images.length?(te(),ie("div",yc,[(te(!0),ie(be,null,Qt(i.selectedDetail.images,(o,l)=>(te(),ie("div",{key:l,class:"detail-image-item"},[B("img",{src:o.src,alt:o.alt,class:"detail-image"},null,8,_c),B("div",bc,we(o.caption),1)]))),128))])):yt("",!0),B("div",vc,[t[13]||(t[13]=B("h3",null,"详细说明",-1)),i.selectedDetail.longDescription?(te(),ie("div",{key:0,class:"long-description",innerHTML:r.renderMarkdown(i.selectedDetail.longDescription)},null,8,xc)):(te(),ie("p",Sc,we(i.selectedDetail.shortDescription||i.selectedDetail.description),1))]),i.selectedDetail.features&&i.selectedDetail.features.length?(te(),ie("div",Cc,[t[14]||(t[14]=B("h3",null,"主要特点",-1)),B("ul",null,[(te(!0),ie(be,null,Qt(i.selectedDetail.features,(o,l)=>(te(),ie("li",{key:l},we(o),1))),128))])])):yt("",!0),i.selectedDetail.stats?(te(),ie("div",Dc,[t[15]||(t[15]=B("h3",null,"关键数据",-1)),B("div",Tc,[(te(!0),ie(be,null,Qt(i.selectedDetail.stats,(o,l)=>(te(),ie("div",{key:l,class:"stat-item"},[B("div",wc,we(l),1),B("div",Ec,we(o),1)]))),128))])])):yt("",!0)])])])])):yt("",!0)]),_:1})])}const Ac=ec(tc,[["render",Pc],["__scopeId","data-v-08925c28"]]);Yl(Ac).mount("#app");
