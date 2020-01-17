;
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);;
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);

;

/**
 * Slider - jQuery plugin for MetroUiCss framework
 *
 * there is "change" event triggering when marker moving
 * and "changed" event when stop moving
 *
 * you may use this code to handle events:

$(window).ready(function(){
    $('.slider').on('change', function(e, val){
        console.log('change to ' + val);
    }).on('changed', function(e, val){
        console.log('changed to ' + val);
    });
});

 * and this, to retrieve value

$('.slider').data('value')

 *
 */

(function($) {

    var pluginName = 'slider',
        initAllSelector = '[data-role=slider], .slider',
        paramKeys = ['InitValue', 'Accuracy'];

    $[pluginName] = function(element, options) {
        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            // start value of slider
            initValue: 0,
            // accuracy
            accuracy: 1
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var complete, // complete part element
            marker, // marker element
            currentValuePerc, // current percents count
            sliderLength,
            sliderOffset,
            sliderStart,
            sliderEnd,
            percentPerPixel,
            markerSize,
            vertical = false;

        // initialization
        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

            // create inside elements
            complete = $('<div class="complete"></div>');
            marker = $('<div class="marker"></div>');

            complete.appendTo($element);
            marker.appendTo($element);

            vertical = $element.hasClass('vertical');

            initGeometry();

            // start value
            currentValuePerc = correctValuePerc(plugin.settings.initValue);
            placeMarkerByPerc(currentValuePerc);

            // init marker handler
            marker.on('mousedown', function (e) {
                e.preventDefault();
                startMoveMarker(e);
            });

            $element.on('mousedown', function (e) {
                e.preventDefault();
                startMoveMarker(e);
            });

			$element.trigger('inited', [currentValuePerc]);

        };

        /**
         * correct percents using "accuracy" parameter
         */
        var correctValuePerc = function (value) {
            var accuracy = plugin.settings.accuracy;
            if (accuracy === 0) {
                return value;
            }
            if (value === 100) {
                return 100;
            }
            value = Math.floor(value / accuracy) * accuracy + Math.round(value % accuracy / accuracy) * accuracy;
            if (value > 100) {
                return 100;
            }
            return value;
        };

        /**
         * convert pixels to percents
         */
        var pixToPerc = function (valuePix) {
            var valuePerc;
            valuePerc = valuePix * percentPerPixel;
            return correctValuePerc(valuePerc);
        };

        /**
         * convert percents to pixels
         */
        var percToPix = function (value) {
            if (percentPerPixel === 0) {
                return 0;
            }
            return value / percentPerPixel;
        };

        /**
         * place marker
         */
        var placeMarkerByPerc = function (valuePerc) {
            var size, size2;

            if (vertical) {
                size = percToPix(valuePerc) + markerSize;
                size2 = sliderLength - size;
                marker.css('top', size2);
                complete.css('height', size);
            } else {
                size = percToPix(valuePerc);
                marker.css('left', size);
                complete.css('width', size);
            }

        };

        /**
         * when mousedown on marker
         */
        var startMoveMarker = function (e) {
            // register event handlers
            $(document).on('mousemove.sliderMarker', function (event) {
                movingMarker(event);
            });
            $(document).on('mouseup.sliderMarker', function () {
                $(document).off('mousemove.sliderMarker');
                $(document).off('mouseup.sliderMarker');
                $element.data('value', currentValuePerc);
                $element.trigger('changed', [currentValuePerc]);
            });

            initGeometry();

            movingMarker(e)
        };

        /**
         * some geometry slider parameters
         */
        var initGeometry = function () {
            if (vertical) {
                sliderLength = $element.height(); // slider element length
                sliderOffset = $element.offset().top; // offset relative to document edge
                markerSize = marker.height();
            } else {
                sliderLength = $element.width();
                sliderOffset = $element.offset().left;
                markerSize = marker.width();

            }

            percentPerPixel = 100 / (sliderLength - markerSize); // it depends on slider element size
            sliderStart = markerSize / 2;
            sliderEnd = sliderLength - markerSize / 2;
        };

        /**
         * moving marker
         */
        var movingMarker = function (event) {
            var cursorPos,
                percents,
                valuePix;

            // cursor position relative to slider start point
            if (vertical) {
                cursorPos = event.pageY - sliderOffset;
            } else {
                cursorPos = event.pageX - sliderOffset;
            }

            // if outside
            if (cursorPos < sliderStart) {
                cursorPos = sliderStart;
            } else if (cursorPos > sliderEnd) {
                cursorPos = sliderEnd;
            }

            // get pixels count
            if (vertical) {
                valuePix = sliderLength - cursorPos - markerSize / 2;
            } else {
                valuePix = cursorPos - markerSize / 2;
            }

            // convert to percent
            percents = pixToPerc(valuePix);

            // place marker
            placeMarkerByPerc(percents);

            currentValuePerc = percents;

            $element.trigger('change', [currentValuePerc]);
        };

        // public methods

        /**
         * if argument value is defined - correct it, store, place marker and return corrected value
         * else just return current value
         * you can use it like this: $('.slider').data('slider').val(38)
         * @param value (percents)
         */
        plugin.val = function (value) {
            if (typeof value !== 'undefined') {
                currentValuePerc = correctValuePerc(value);
                placeMarkerByPerc(currentValuePerc);
                return currentValuePerc;
            } else {
                return currentValuePerc;
            }
        };

        plugin.init();

    };

    $.fn[pluginName] = function(options) {
        var elements = options.initAll ? $(initAllSelector) : this;
        return elements.each(function() {
            var that = $(this),
                params = {},
                plugin;
            if (undefined == that.data(pluginName)) {
                $.each(paramKeys, function(index, key){
                    params[key[0].toLowerCase() + key.slice(1)] = that.data('param' + key);
                });
                plugin = new $[pluginName](this, params);
                that.data(pluginName, plugin);
            }
        });
    };
    // autoinit
    $(function(){
        $()[pluginName]({initAll: true});
    });

})(jQuery);

/*! colorPicker - v1.0.0 2015-01-31 */

!function(a,b){"use strict";function c(a,c,d,f,g){if("string"==typeof c){var c=u.txt2color(c);d=c.type,n[d]=c[d],g=g!==b?g:c.alpha}else if(c)for(var h in c)a[d][h]=k(c[h]/l[d][h][1],0,1);return g!==b&&(a.alpha=+g),e(d,f?a:b)}function d(a,b,c){var d=m.options.grey,e={};return e.RGB={r:a.r,g:a.g,b:a.b},e.rgb={r:b.r,g:b.g,b:b.b},e.alpha=c,e.equivalentGrey=Math.round(d.r*a.r+d.g*a.g+d.b*a.b),e.rgbaMixBlack=i(b,{r:0,g:0,b:0},c,1),e.rgbaMixWhite=i(b,{r:1,g:1,b:1},c,1),e.rgbaMixBlack.luminance=h(e.rgbaMixBlack,!0),e.rgbaMixWhite.luminance=h(e.rgbaMixWhite,!0),m.options.customBG&&(e.rgbaMixCustom=i(b,m.options.customBG,c,1),e.rgbaMixCustom.luminance=h(e.rgbaMixCustom,!0),m.options.customBG.luminance=h(m.options.customBG,!0)),e}function e(a,b){var c,e,k,o=b||n,p=u,q=m.options,r=l,s=o.RND,t="",v="",w={hsl:"hsv",cmyk:"cmy",rgb:a},x=s.rgb;if("alpha"!==a){for(var y in r)if(!r[y][y]){a!==y&&"XYZ"!==y&&(v=w[y]||"rgb",o[y]=p[v+"2"+y](o[v])),s[y]||(s[y]={}),c=o[y];for(t in c)s[y][t]=Math.round(c[t]*("Lab"===y?1:r[y][t][1]))}"Lab"!==a&&delete o._rgb,x=s.rgb,o.HEX=p.RGB2HEX(x),o.equivalentGrey=q.grey.r*o.rgb.r+q.grey.g*o.rgb.g+q.grey.b*o.rgb.b,o.webSave=e=f(x,51),o.webSmart=k=f(x,17),o.saveColor=x.r===e.r&&x.g===e.g&&x.b===e.b?"web save":x.r===k.r&&x.g===k.g&&x.b===k.b?"web smart":"",o.hueRGB=u.hue2RGB(o.hsv.h),b&&(o.background=d(x,o.rgb,o.alpha))}var z,A,B,C,D,E,F,G=o.rgb,H=o.alpha,I="luminance",J=o.background;return z=i(G,{r:0,g:0,b:0},H,1),z[I]=h(z,!0),o.rgbaMixBlack=z,A=i(G,{r:1,g:1,b:1},H,1),A[I]=h(A,!0),o.rgbaMixWhite=A,q.allMixDetails&&(z.WCAG2Ratio=j(z[I],0),A.WCAG2Ratio=j(A[I],1),q.customBG&&(B=i(G,q.customBG,H,1),B[I]=h(B,!0),B.WCAG2Ratio=j(B[I],q.customBG[I]),o.rgbaMixCustom=B),C=i(G,J.rgb,H,J.alpha),C[I]=h(C,!0),o.rgbaMixBG=C,D=i(G,J.rgbaMixBlack,H,1),D[I]=h(D,!0),D.WCAG2Ratio=j(D[I],J.rgbaMixBlack[I]),D.luminanceDelta=Math.abs(D[I]-J.rgbaMixBlack[I]),D.hueDelta=g(J.rgbaMixBlack,D,!0),o.rgbaMixBGMixBlack=D,E=i(G,J.rgbaMixWhite,H,1),E[I]=h(E,!0),E.WCAG2Ratio=j(E[I],J.rgbaMixWhite[I]),E.luminanceDelta=Math.abs(E[I]-J.rgbaMixWhite[I]),E.hueDelta=g(J.rgbaMixWhite,E,!0),o.rgbaMixBGMixWhite=E),q.customBG&&(F=i(G,J.rgbaMixCustom,H,1),F[I]=h(F,!0),F.WCAG2Ratio=j(F[I],J.rgbaMixCustom[I]),o.rgbaMixBGMixCustom=F,F.luminanceDelta=Math.abs(F[I]-J.rgbaMixCustom[I]),F.hueDelta=g(J.rgbaMixCustom,F,!0)),o.RGBLuminance=h(x),o.HUELuminance=h(o.hueRGB),q.convertCallback&&q.convertCallback(o,a),o}function f(a,b){var c={},d=0,e=b/2;for(var f in a)d=a[f]%b,c[f]=a[f]+(d>e?b-d:-d);return c}function g(a,b,c){return(Math.max(a.r-b.r,b.r-a.r)+Math.max(a.g-b.g,b.g-a.g)+Math.max(a.b-b.b,b.b-a.b))*(c?255:1)/765}function h(a,b){for(var c=b?1:255,d=[a.r/c,a.g/c,a.b/c],e=m.options.luminance,f=d.length;f--;)d[f]=d[f]<=.03928?d[f]/12.92:Math.pow((d[f]+.055)/1.055,2.4);return e.r*d[0]+e.g*d[1]+e.b*d[2]}function i(a,c,d,e){var f={},g=d!==b?d:1,h=e!==b?e:1,i=g+h*(1-g);for(var j in a)f[j]=(a[j]*g+c[j]*h*(1-g))/i;return f.a=i,f}function j(a,b){var c=1;return c=a>=b?(a+.05)/(b+.05):(b+.05)/(a+.05),Math.round(100*c)/100}function k(a,b,c){return a>c?c:b>a?b:a}var l={rgb:{r:[0,255],g:[0,255],b:[0,255]},hsv:{h:[0,360],s:[0,100],v:[0,100]},hsl:{h:[0,360],s:[0,100],l:[0,100]},cmy:{c:[0,100],m:[0,100],y:[0,100]},cmyk:{c:[0,100],m:[0,100],y:[0,100],k:[0,100]},Lab:{L:[0,100],a:[-128,127],b:[-128,127]},XYZ:{X:[0,100],Y:[0,100],Z:[0,100]},alpha:{alpha:[0,1]},HEX:{HEX:[0,16777215]}},m={},n={},o={X:[.4124564,.3575761,.1804375],Y:[.2126729,.7151522,.072175],Z:[.0193339,.119192,.9503041],R:[3.2404542,-1.5371385,-.4985314],G:[-.969266,1.8760108,.041556],B:[.0556434,-.2040259,1.0572252]},p={r:.298954,g:.586434,b:.114612},q={r:.2126,g:.7152,b:.0722},r=a.Colors=function(a){this.colors={RND:{}},this.options={color:"rgba(204, 82, 37, 0.8)",XYZMatrix:o,grey:p,luminance:q,valueRanges:l},s(this,a||{})},s=function(a,d){var e,f,g=a.options;t(a);for(var h in d)d[h]!==b&&(g[h]=d[h]);e=g.XYZMatrix,d.XYZReference||(g.XYZReference={X:e.X[0]+e.X[1]+e.X[2],Y:e.Y[0]+e.Y[1]+e.Y[2],Z:e.Z[0]+e.Z[1]+e.Z[2]}),f=g.customBG,g.customBG="string"==typeof f?u.txt2color(f).rgb:f,n=c(a.colors,g.color,b,!0)},t=function(a){m!==a&&(m=a,n=a.colors)};r.prototype.setColor=function(a,d,f){return t(this),a?c(this.colors,a,d,b,f):(f!==b&&(this.colors.alpha=f),e(d))},r.prototype.getColor=function(a){var c=this.colors,d=0;if(a){for(a=a.split(".");c[a[d]];)c=c[a[d++]];a.length!==d&&(c=b)}return c},r.prototype.setCustomBackground=function(a){return t(this),this.options.customBG="string"==typeof a?u.txt2color(a).rgb:a,c(this.colors,b,"rgb")},r.prototype.saveAsBackground=function(){return t(this),c(this.colors,b,"rgb",!0)},r.prototype.convertColor=function(a,b){var c=u,d=l,e=b.split("2"),f=e[0],g=e[1],h=/(?:RG|HS|CM|LA)/,i=h.test(f),j=h.test(g),k={LAB:"Lab"},m=function(a,b,c){var e={},f="Lab"===b?1:0;for(var g in a)e[g]=c?Math.round(a[g]*(f||d[b][g][1])):a[g]/(f||d[b][g][1]);return e};return f=d[f]?f:k[f]||f.toLowerCase(),g=d[g]?g:k[g]||g.toLowerCase(),i&&"RGB2HEX"!==b&&(a=m(a,f)),a=f===g?a:c[f+"2"+g]?c[f+"2"+g](a,!0):"HEX"===g?c.RGB2HEX("RGB2HEX"===b?a:m("rgb"===f?a:c[f+"2rgb"](a,!0),"rgb",!0)):c["rgb2"+g](c[f+"2rgb"](a,!0),!0),j&&(a=m(a,g,!0)),a};var u={txt2color:function(a){var b={},c=a.replace(/(?:#|\)|%)/g,"").split("("),d=(c[1]||"").split(/,\s*/),e=c[1]?c[0].substr(0,3):"rgb",f="";if(b.type=e,b[e]={},c[1])for(var g=3;g--;)f=e[g]||e.charAt(g),b[e][f]=+d[g]/l[e][f][1];else b.rgb=u.HEX2rgb(c[0]);return b.alpha=d[3]?+d[3]:1,b},RGB2HEX:function(a){return((a.r<16?"0":"")+a.r.toString(16)+(a.g<16?"0":"")+a.g.toString(16)+(a.b<16?"0":"")+a.b.toString(16)).toUpperCase()},HEX2rgb:function(a){return a=a.split(""),{r:parseInt(a[0]+a[a[3]?1:0],16)/255,g:parseInt(a[a[3]?2:1]+(a[3]||a[1]),16)/255,b:parseInt((a[4]||a[2])+(a[5]||a[2]),16)/255}},hue2RGB:function(a){var b=6*a,c=~~b%6,d=6===b?0:b-c;return{r:Math.round(255*[1,1-d,0,0,d,1][c]),g:Math.round(255*[d,1,1,1-d,0,0][c]),b:Math.round(255*[0,0,d,1,1,1-d][c])}},rgb2hsv:function(a){var b,c,d,e=a.r,f=a.g,g=a.b,h=0;return g>f&&(f=g+(g=f,0),h=-1),c=g,f>e&&(e=f+(f=e,0),h=-2/6-h,c=Math.min(f,g)),b=e-c,d=e?b/e:0,{h:1e-15>d?n&&n.hsl&&n.hsl.h||0:b?Math.abs(h+(f-g)/(6*b)):0,s:e?b/e:n&&n.hsv&&n.hsv.s||0,v:e}},hsv2rgb:function(a){var b=6*a.h,c=a.s,d=a.v,e=~~b,f=b-e,g=d*(1-c),h=d*(1-f*c),i=d*(1-(1-f)*c),j=e%6;return{r:[d,h,g,g,i,d][j],g:[i,d,d,h,g,g][j],b:[g,g,i,d,d,h][j]}},hsv2hsl:function(a){var b=(2-a.s)*a.v,c=a.s*a.v;return c=a.s?1>b?b?c/b:0:c/(2-b):0,{h:a.h,s:a.v||c?c:n&&n.hsl&&n.hsl.s||0,l:b/2}},rgb2hsl:function(a,b){var c=u.rgb2hsv(a);return u.hsv2hsl(b?c:n.hsv=c)},hsl2rgb:function(a){var b=6*a.h,c=a.s,d=a.l,e=.5>d?d*(1+c):d+c-c*d,f=d+d-e,g=e?(e-f)/e:0,h=~~b,i=b-h,j=e*g*i,k=f+j,l=e-j,m=h%6;return{r:[e,l,f,f,k,e][m],g:[k,e,e,l,f,f][m],b:[f,f,k,e,e,l][m]}},rgb2cmy:function(a){return{c:1-a.r,m:1-a.g,y:1-a.b}},cmy2cmyk:function(a){var b=Math.min(Math.min(a.c,a.m),a.y),c=1-b||1e-20;return{c:(a.c-b)/c,m:(a.m-b)/c,y:(a.y-b)/c,k:b}},cmyk2cmy:function(a){var b=a.k;return{c:a.c*(1-b)+b,m:a.m*(1-b)+b,y:a.y*(1-b)+b}},cmy2rgb:function(a){return{r:1-a.c,g:1-a.m,b:1-a.y}},rgb2cmyk:function(a,b){var c=u.rgb2cmy(a);return u.cmy2cmyk(b?c:n.cmy=c)},cmyk2rgb:function(a,b){var c=u.cmyk2cmy(a);return u.cmy2rgb(b?c:n.cmy=c)},XYZ2rgb:function(a,b){var c=m.options.XYZMatrix,d=a.X,e=a.Y,f=a.Z,g=d*c.R[0]+e*c.R[1]+f*c.R[2],h=d*c.G[0]+e*c.G[1]+f*c.G[2],i=d*c.B[0]+e*c.B[1]+f*c.B[2],j=1/2.4;return c=.0031308,g=g>c?1.055*Math.pow(g,j)-.055:12.92*g,h=h>c?1.055*Math.pow(h,j)-.055:12.92*h,i=i>c?1.055*Math.pow(i,j)-.055:12.92*i,b||(n._rgb={r:g,g:h,b:i}),{r:k(g,0,1),g:k(h,0,1),b:k(i,0,1)}},rgb2XYZ:function(a){var b=m.options.XYZMatrix,c=a.r,d=a.g,e=a.b,f=.04045;return c=c>f?Math.pow((c+.055)/1.055,2.4):c/12.92,d=d>f?Math.pow((d+.055)/1.055,2.4):d/12.92,e=e>f?Math.pow((e+.055)/1.055,2.4):e/12.92,{X:c*b.X[0]+d*b.X[1]+e*b.X[2],Y:c*b.Y[0]+d*b.Y[1]+e*b.Y[2],Z:c*b.Z[0]+d*b.Z[1]+e*b.Z[2]}},XYZ2Lab:function(a){var b=m.options.XYZReference,c=a.X/b.X,d=a.Y/b.Y,e=a.Z/b.Z,f=16/116,g=1/3,h=.008856,i=7.787037;return c=c>h?Math.pow(c,g):i*c+f,d=d>h?Math.pow(d,g):i*d+f,e=e>h?Math.pow(e,g):i*e+f,{L:116*d-16,a:500*(c-d),b:200*(d-e)}},Lab2XYZ:function(a){var b=m.options.XYZReference,c=(a.L+16)/116,d=a.a/500+c,e=c-a.b/200,f=Math.pow(d,3),g=Math.pow(c,3),h=Math.pow(e,3),i=16/116,j=.008856,k=7.787037;return{X:(f>j?f:(d-i)/k)*b.X,Y:(g>j?g:(c-i)/k)*b.Y,Z:(h>j?h:(e-i)/k)*b.Z}},rgb2Lab:function(a,b){var c=u.rgb2XYZ(a);return u.XYZ2Lab(b?c:n.XYZ=c)},Lab2rgb:function(a,b){var c=u.Lab2XYZ(a);return u.XYZ2rgb(b?c:n.XYZ=c,b)}}}(window),function(a){"use strict";var b='^§app alpha-bg-w">^§slds">^§sldl-1">$^§sldl-2">$^§sldl-3">$^§curm">$^§sldr-1">$^§sldr-2">$^§sldr-4">$^§curl">$^§curr">$$^§opacity">|^§opacity-slider">$$$^§memo">^§raster">$^§raster-bg">$|$|$|$|$|$|$|$|$^§memo-store">$^§memo-cursor">$$^§panel">^§hsv">^hsl-mode §ß">$^hsv-h-ß §ß">H$^hsv-h-~ §~">-^§nsarrow">$$^hsl-h-@ §@">H$^hsv-s-ß §ß">S$^hsv-s-~ §~">-$^hsl-s-@ §@">S$^hsv-v-ß §ß">B$^hsv-v-~ §~">-$^hsl-l-@ §@">L$$^§hsl §hide">^hsv-mode §ß">$^hsl-h-ß §ß">H$^hsl-h-~ §~">-$^hsv-h-@ §@">H$^hsl-s-ß §ß">S$^hsl-s-~ §~">-$^hsv-s-@ §@">S$^hsl-l-ß §ß">L$^hsl-l-~ §~">-$^hsv-v-@ §@">B$$^§rgb">^rgb-r-ß §ß">R$^rgb-r-~ §~">-$^rgb-r-@ §ß">&nbsp;$^rgb-g-ß §ß">G$^rgb-g-~ §~">-$^rgb-g-@ §ß">&nbsp;$^rgb-b-ß §ß">B$^rgb-b-~ §~">-$^rgb-b-@ §ß">&nbsp;$$^§cmyk">^Lab-mode §ß">$^cmyk-c-ß §@">C$^cmyk-c-~ §~">-$^Lab-L-@ §@">L$^cmyk-m-ß §@">M$^cmyk-m-~ §~">-$^Lab-a-@ §@">a$^cmyk-y-ß §@">Y$^cmyk-y-~ §~">-$^Lab-b-@ §@">b$^cmyk-k-ß §@">K$^cmyk-k-~ §~">-$^Lab-x-@ §ß">&nbsp;$$^§Lab §hide">^cmyk-mode §ß">$^Lab-L-ß §@">L$^Lab-L-~ §~">-$^cmyk-c-@ §@">C$^Lab-a-ß §@">a$^Lab-a-~ §~">-$^cmyk-m-@ §@">M$^Lab-b-ß §@">b$^Lab-b-~ §~">-$^cmyk-y-@ §@">Y$^Lab-x-ß §@">&nbsp;$^Lab-x-~ §~">-$^cmyk-k-@ §@">K$$^§alpha">^alpha-ß §ß">A$^alpha-~ §~">-$^alpha-@ §ß">W$$^§HEX">^HEX-ß §ß">#$^HEX-~ §~">-$^HEX-@ §ß">M$$^§ctrl">^§raster">$^§cont">$^§cold">$^§col1">|&nbsp;$$^§col2">|&nbsp;$$^§bres">RESET$^§bsav">SAVE$$$^§exit">$^§resize">$^§resizer">|$$$'.replace(/\^/g,'<div class="').replace(/\$/g,"</div>").replace(/~/g,"disp").replace(/ß/g,"butt").replace(/@/g,"labl").replace(/\|/g,"<div>"),c="är^1,äg^1,äb^1,öh^1,öh?1,öh?2,ös?1,öv?1,üh^1,üh?1,üh?2,üs?1,ül?1,.no-rgb-r är?2,.no-rgb-r är?3,.no-rgb-r är?4,.no-rgb-g äg?2,.no-rgb-g äg?3,.no-rgb-g äg?4,.no-rgb-b äb?2,.no-rgb-b äb?3,.no-rgb-b äb?4{visibility:hidden}är^2,är^3,äg^2,äg^3,äb^2,äb^3{@-image:url(_patches.png)}.§slds div{@-image:url(_vertical.png)}öh^2,ös^1,öv^1,üh^2,üs^1,ül^1{@-image:url(_horizontal.png)}ös?4,öv^3,üs?4,ül^3{@:#000}üs?3,ül^4{@:#fff}är?1{@-color:#f00}äg?1{@-color:#0f0}äb?1{@-color:#00f}är^2{@|-1664px 0}är^3{@|-896px 0}är?1,äg?1,äb?1,öh^3,ös^2,öv?2Ü-2432Öär?2Ü-2944Öär?3Ü-4480Öär?4Ü-3202Öäg^2Äöh^2{@|-640px 0}äg^3{@|-384px 0}äg?2Ü-4736Öäg?3Ü-3968Öäg?4Ü-3712Öäb^2{@|-1152px 0}äb^3{@|-1408px 0}äb?2Ü-3456Öäb?3Ü-4224Öäb?4Ü-2688Ööh^2Äär^3Ääb?4Ü0}öh?4,üh?4Ü-1664Öös^1,öv^1,üs^1,ül^1Ääg^3{@|-256px 0}ös^3,öv?4,üs^3,ül?4Ü-2176Öös?2,öv^2Ü-1920Öüh^2{@|-768px 0}üh^3,üs^2,ül?2Ü-5184Öüs?2,ül^2Ü-5824Ö.S är^2{@|-128px -128Ö.S är?1Ääg?1Ääb?1Äöh^3Äös^2Äöv?2Ü-1408Ö.S är?2Ääb^3Ü-128Ö.S är?3Ü-896Ö.S är?4Ü-256Ö.S äg^2{@|-256px -128Ö.S äg?2Ü-1024Ö.S äg?3Ü-640Ö.S äg?4Ü-512Ö.S äb^2{@|-128px 0}.S äb?2Ü-384Ö.S äb?3Ü-768Ö.S öh?4Äüh?4Ü-1536Ö.S ös^1Äöv^1Äüs^1Äül^1{@|-512px 0}.S ös^3Äöv?4Äüs^3Äül?4Ü-1280Ö.S ös?2Äöv^2Ü-1152Ö.S üh^2{@|-1024px 0}.S üh^3Äüs^2Äül?2Ü-5440Ö.S üs?2Äül^2Ü-5696Ö.XXS ös^2,.XXS öv?2Ü-5120Ö.XXS ös^3,.XXS öv?4,.XXS üs^3,.XXS ül^3,.XXS ül?4Ü-5056Ö.XXS ös?2,.XXS öv^2Ü-4992Ö.XXS üs^2,.XXS ül?2Ü-5568Ö.XXS üs?2,.XXS ül^2Ü-5632Ö".replace(/Ü/g,"{@|0 ").replace(/Ö/g,"px}").replace(/Ä/g,",.S ").replace(/\|/g,"-position:").replace(/@/g,"background").replace(/ü/g,".hsl-").replace(/ö/g,".hsv-").replace(/ä/g,".rgb-").replace(/~/g," .no-rgb-}").replace(/\?/g," .§sldr-").replace(/\^/g," .§sldl-"),d='∑{@#bbb;font-family:monospace, "Courier New", Courier, mono;font-size:12¥line-ä15¥font-weight:bold;cursor:default;~412¥ä323¥?top-left-radius:7¥?top-Ü-radius:7¥?bottom-Ü-radius:7¥?bottom-left-radius:7¥ö@#444}.S{~266¥ä177px}.XS{~158¥ä173px}.XXS{ä105¥~154px}.no-alpha{ä308px}.no-alpha .§opacity,.no-alpha .§alpha{display:none}.S.no-alpha{ä162px}.XS.no-alpha{ä158px}.XXS.no-alpha{ä90px}∑,∑ div{border:none;padding:0¥float:none;margin:0¥outline:none;box-sizing:content-box}∑ div{|absolute}^s .§curm,«§disp,«§nsarrow,∑ .§exit,∑ ø-cursor,∑ .§resize{öimage:url(_icons.png)}∑ .do-drag div{cursor:url(_blank.png), auto}∑ .§opacity,ø .§raster-bg,∑ .§raster{öimage:url(_bgs.png)}∑ ^s{~287¥ä256¥top:10¥left:10¥overflow:hidden;cursor:crosshair}.S ^s{~143¥ä128¥left:9¥top:9px}.XS ^s{left:7¥top:7px}.XXS ^s{left:5¥top:5px}^s div{~256¥ä256¥left:0px}.S ^l-1,.S ^l-2,.S ^l-3,.S ^l-4{~128¥ä128px}.XXS ^s,.XXS ^s ^l-1,.XXS ^s ^l-2,.XXS ^s ^l-3,.XXS ^s ^l-4{ä64px}^s ^r-1,^s ^r-2,^s ^r-3,^s ^r-4{~31¥left:256¥cursor:default}.S ^r-1,.S ^r-2,.S ^r-3,.S ^r-4{~15¥ä128¥left:128px}^s .§curm{margin:-5¥~11¥ä11¥ö|-36px -30px}.light .§curm{ö|-7px -30px}^s .§curl,^s .§curr{~0¥ä0¥margin:-3px -4¥border:4px solid;cursor:default;left:auto;öimage:none}^s .§curl,∑ ^s .§curl-dark,.hue-dark div.§curl{Ü:27¥?@† † † #fff}.light .§curl,∑ ^s .§curl-light,.hue-light .§curl{?@† † † #000}.S ^s .§curl,.S ^s .§curr{?~3px}.S ^s .§curl-light,.S ^s .§curl{Ü:13px}^s .§curr,∑ ^s .§curr-dark{Ü:4¥?@† #fff † †}.light .§curr,∑ ^s .§curr-light{?@† #000 † †}∑ .§opacity{bottom:44¥left:10¥ä10¥~287¥ö|0 -87px}.S .§opacity{bottom:27¥left:9¥~143¥ö|0 -100px}.XS .§opacity{left:7¥bottom:25px}.XXS .§opacity{left:5¥bottom:23px}.§opacity div{~100%;ä16¥margin-top:-3¥overflow:hidden}.§opacity .§opacity-slider{margin:0 -4¥~0¥ä8¥?~4¥?style:solid;?@#eee †}∑ ø{bottom:10¥left:10¥~288¥ä31¥ö@#fff}.S ø{ä15¥~144¥left:9¥bottom:9px}.XS ø{left:7¥bottom:7px}.XXS ø{left:5¥bottom:5px}ø div{|relative;float:left;~31¥ä31¥margin-Ü:1px}.S ø div{~15¥ä15px}∑ .§raster,ø .§raster-bg,.S ø .§raster,.S ø .§raster-bg{|absolute;top:0¥Ü:0¥bottom:0¥left:0¥~100%}.S ø .§raster-bg{ö|0 -31px}∑ .§raster{opacity:0.2;ö|0 -49px}.alpha-bg-b ø{ö@#333}.alpha-bg-b .§raster{opacity:1}ø ø-cursor{|absolute;Ü:0¥ö|-26px -87px}∑ .light ø-cursor{ö|3px -87px}.S ø-cursor{ö|-34px -95px}.S .light ø-cursor{ö|-5px -95px}∑ .§panel{|absolute;top:10¥Ü:10¥bottom:10¥~94¥?~1¥?style:solid;?@#222 #555 #555 #222;overflow:hidden;ö@#333}.S .§panel{top:9¥Ü:9¥bottom:9px}.XS .§panel{display:none}.§panel div{|relative}«§hsv,«§hsl,«§rgb,«§cmyk,«§Lab,«§alpha,.no-alpha «§HEX,«§HEX{~86¥margin:-1px 0px 1px 4¥padding:1px 0px 3¥?top-~1¥?top-style:solid;?top-@#444;?bottom-~1¥?bottom-style:solid;?bottom-@#222;float:Ö«§hsv,«§hsl{padding-top:2px}.S .§hsv,.S .§hsl{padding-top:1px}«§HEX{?bottom-style:none;?top-~0¥margin-top:-4¥padding-top:0px}.no-alpha «§HEX{?bottom-style:none}«§alpha{?bottom-style:none}.S .rgb-r .§hsv,.S .rgb-g .§hsv,.S .rgb-b .§hsv,.S .rgb-r .§hsl,.S .rgb-g .§hsl,.S .rgb-b .§hsl,.S .hsv-h .§rgb,.S .hsv-s .§rgb,.S .hsv-v .§rgb,.S .hsl-h .§rgb,.S .hsl-s .§rgb,.S .hsl-l .§rgb,.S .§cmyk,.S .§Lab{display:none}«§butt,«§labl{float:left;~14¥ä14¥margin-top:2¥text-align:center;border:1px solid}«§butt{?@#555 #222 #222 #555}«§butt:active{ö@#444}«§labl{?@†}«Lab-mode,«cmyk-mode,«hsv-mode,«hsl-mode{|absolute;Ü:0¥top:1¥ä50px}«hsv-mode,«hsl-mode{top:2px}«cmyk-mode{ä68px}.hsl-h .hsl-h-labl,.hsl-s .hsl-s-labl,.hsl-l .hsl-l-labl,.hsv-h .hsv-h-labl,.hsv-s .hsv-s-labl,.hsv-v .hsv-v-labl{@#f90}«cmyk-mode,«hsv-mode,.rgb-r .rgb-r-butt,.rgb-g .rgb-g-butt,.rgb-b .rgb-b-butt,.hsv-h .hsv-h-butt,.hsv-s .hsv-s-butt,.hsv-v .hsv-v-butt,.hsl-h .hsl-h-butt,.hsl-s .hsl-s-butt,.hsl-l .hsl-l-butt,«rgb-r-labl,«rgb-g-labl,«rgb-b-labl,«alpha-butt,«HEX-butt,«Lab-x-labl{?@#222 #555 #555 #222;ö@#444}.no-rgb-r .rgb-r-labl,.no-rgb-g .rgb-g-labl,.no-rgb-b .rgb-b-labl,.mute-alpha .alpha-butt,.no-HEX .HEX-butt,.cmy-only .Lab-x-labl{?@#555 #222 #222 #555;ö@#333}.Lab-x-disp,.cmy-only .cmyk-k-disp,.cmy-only .cmyk-k-butt{visibility:hidden}«HEX-disp{öimage:none}«§disp{float:left;~48¥ä14¥margin:2px 2px 0¥cursor:text;text-align:left;text-indent:3¥?~1¥?style:solid;?@#222 #555 #555 #222}∑ .§nsarrow{|absolute;top:0¥left:-13¥~8¥ä16¥display:none;ö|-87px -23px}∑ .start-change .§nsarrow{display:block}∑ .do-change .§nsarrow{display:block;ö|-87px -36px}.do-change .§disp{cursor:default}«§hide{display:none}«§cont,«§cold{|absolute;top:-5¥left:0¥ä3¥border:1px solid #333}«§cold{z-index:1;ö@#c00}«§cont{margin-Ü:-1¥z-index:2}«contrast .§cont{z-index:1;ö@#ccc}«orange .§cold{ö@#f90}«green .§cold{ö@#4d0}«§ctrl{|absolute;bottom:0¥left:0¥~100%;ö@#fff}.alpha-bg-b .§ctrl,«§bres,«§bsav{ö@#333}«§col1,«§col2,«§bres,«§bsav{?~1¥?style:solid;?@#555 #222 #222 #555;float:left;~45¥line-ä28¥text-align:center;top:0px}.§panel div div{ä100%}.S .§ctrl div{line-ä25px}.S «§bres,.S «§bsav{line-ä26px}∑ .§exit,∑ .§resize{Ü:3¥top:3¥~15¥ä15¥ö|0 -52px}∑ .§resize{top:auto;bottom:3¥cursor:nwse-resize;ö|-15px -52px}.S .§exit{ö|1px -52px}.XS .§resize,.XS .§exit{~10¥ä10¥Ü:0¥öimage:none}.XS .§exit{top:0px}.XS .§resize{bottom:0px}∑ .§resizer,∑ .§resizer div{|absolute;border:1px solid #888;top:-1¥Ü:-1¥bottom:-1¥left:-1¥z-index:2;display:none;cursor:nwse-resize}∑ .§resizer div{border:1px dashed #333;opacity:0.3;display:block;ö@#bbb}'.replace(/Ü/g,"right").replace(/Ö/g,"left}").replace(/∑/g,".§app").replace(/«/g,".§panel .").replace(/¥/g,"px;").replace(/\|/g,"position:").replace(/@/g,"color:").replace(/ö/g,"background-").replace(/ä/g,"height:").replace(/ø/g,".§memo").replace(/†/g,"transparent").replace(/\~/g,"width:").replace(/\?/g,"border-").replace(/\^/g,".§sld"),e="iVBORw0KGgoAAAANSUhEUgAABIAAAAABCAYAAACmC9U0AAABT0lEQVR4Xu2S3Y6CMBCFhyqIsjGBO1/B9/F5DC/pK3DHhVkUgc7Zqus2DVlGU/cnQZKTjznttNPJBABA149HyRf1iN//4mIBCg0jV4In+j9xJiuihly1V/Z9X88v//kNeDXVvyO/lK+IPR76B019+1Riab3H1zkmeqerKnL+Bzwxx6PAgZxaSQU8vB62T28pxcQeRQ2sHw6GxCOWHvP78zwHAARBABOfdYtd30rwxXOEPDF+dj2+91r6vV/id3k+/brrXmaGUkqKhX3i+ffSt16HQ/dorTGZTHrs7ev7Tl7XdZhOpzc651nfsm1bRFF0YRiGaJoGs9nsQuN/xafTCXEco65rzOdzHI9HJEmCqqqwXC6x3++RZRnKssRqtUJRFFiv19jtdthutyAi5Hl+Jo9VZg7+7f3yXuvZf5c3KaXYzByb+WIzO5ymKW82G/0BNcFhO/tOuuMAAAAASUVORK5CYII=",f="iVBORw0KGgoAAAANSUhEUgAAAAEAABfACAYAAABn2KvYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHtJREFUeNrtnN9SqzAQxpOF1to6zuiVvoI+j6/gva/lA/kKeqUzjtX+QTi7SzSYBg49xdIzfL34+e1usoQQklCnmLwoCjImNwDQA2xRGMqNAYB+gPEH9IdCgIUA6Aem0P1fLoMQAPYNHYDoCKAv8OMHFgKgX2AjDPQDXn4t1l+gt/1fId//yWgE/hUJ+mAn8EyY5wCwXxhrbaHzn8E9iPlv79DdHxXTqciZ4KROnXRVZMF/6U2OPhcEavtAbZH1SM7wRDD7VoHZItCiyEQf4t6+MW9UOxaZybmdCGKqNrB9Eb5SfMg3wTyiagMtigTmWofiSDCOYNTSNz6sLDIoaCU9GWDd0tdhoMMsRm+r8U/EfB0GfjmLXiqzimDd0tdhoLMsI7la45+I+ToM/HIW0kfGVQTrlr7tA91kaUr//fxrKo8jUFB7VAn6AKpHJf+EKwAAAIYD/f7F7/8MVgMo7P+gBqDKr57Lf72V8x8AAMDgYIuvH4EAAAAMDQX6AACAQcI9GGMjDADA4MA/P2KlP8IEAAAYFCz6AACAgaLA8y8AAIN+CMYXoQAADA7u/UPYCAMAMDjI7z9S+SdwDFQX2C9Gh9GMEOWriz8/Pw1lWQZsi/L3R4czzP678Ve+P8f9nCv/C7hwLq99ah8NfKrU15zPB5pVcwtiJt9qGy0IfEE+jQa+Fn0VtI/fkxUPqBlEfRENeF+tqUpbGpi1iu8epwJzvV5XA4GpWC6XGz7F+/u766EgwJ+ckiTJKU3TnI6OjnI6OzvLZf6zMggt3dzckPhIoiTlSGpQ+eEsVegdz0fbCCi4fRs+Po+4yWdeDXiT+6pBSTeHple1pkz3FZ+avpyavoiPxgLN0B7yprY08PlyQTTm0+PWmkH7ynedNKraar4F/lRj1WpTtYh+ozL/cY2sAvZl0gcbZm0gSLBLvkxGoaogiy/HDXemQk2t5pUm8OAhH8/HH6e0mkJ9q9XKKQXfb07xfZnJbZrRxcVFVt6/t7e3Kc1ms5RGo1Eq5VIZuyl9fHw4k/M5xYeoKj64A7eqCt1ZeqWFVSl8NV9OTV3fmvP5qE9VmzSoEcsXpArK1UHen/hZbgL53BZSdyEXalGau/hU8TEW0u3VcoFPy3EDFrTgT+njydeZ0+l0UV7fu7u7iVzziQQmUm4iqRw4n/NxMxw4s/Mp1NSALxf4NEtQ10cjMDwSl+b+/j6hp6enVGb+jUvrn05iKobm6PboOt8vPISY5Pr6OqGXlxe3fOokoGtAbMUJZmqvYmaLQDP+sdrecOjtO/SXeH69P8Imutm5urqy9PDwYOny8tLS4+OjpfPzc0vPz8+WTk9PLb2+vlpZbCzN53NLx8fHVtYZS5PJxMoEZWWqsjKULY3HYytTi1Pex5OMldXKRVXxuLcy/20onmms3BBOxcr5qCrZtsrd45SPel8sGlOxGoGy0neynQ6VL9fsa1YtWlCrtj9G83G7PjdVush5n5q1iJWLZW6u21a1bUvbVnVzlru0pe3RdmlV1/23fZtbZv4Dx+7FBypx77kAAAAASUVORK5CYII=",g="iVBORw0KGgo^NSUhEUgAAB4^EACAI#DdoPxz#L0UlEQVR4Xu3cQWrDQBREwR7FF8/BPR3wXktnQL+KvxfypuEhvLJXcp06d/bXd71OPt+trIw95zr33Z1bk1/fudEv79wa++7OfayZ59wrO2PBzklcGQmAZggAAOBYgAYBmpWRAGg^BGgRofAENgAAN#I0CBA6w8AG^ECABgEa/QH§AI0CNDoDwAY^QIAGAVp/AM§AjQI0OgPAAY^QoEGARn8Aw§CNAjQ+gMABg#BCgQYCmGQmABgAAEKBBgEZ/AM§AjQI0PoDAAY^QoEGARn8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCgaUYCoAE#RoEKDRHwAw^gAANArT+AIAB^BGgQoNEfAAw^gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaJqRAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^CNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGAZpmJACaBw^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQOsPABg#BAgAYBGv0BAANwCwAAGB6gYeckmpEAa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRomsMAM^IAADQK0/gCAAQ^RoEKDRHwAw^gAANO7fQHwAw^gAANArT+AIAB^BGgQoNEfAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^RIB+Ntg5iea5AD^DAIwI0CND6AwAG^EKBBgEZ/AKAB#EaBCg0R8AM^IAADQK0/gCAAQ^RoEKDRHwAM^IECDAI3+AIAB^BGgQoPUHAAw^gQIMAjf4AY§BGgRo9AcAD^CBAgwCtPwBg§EaBGiakQBo^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQKM/ABg#BAgAYBGv0BAAM^I0CBA6w8AG^ECABgGaZiQAGgAAQIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNDoDwAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGApjkMAAM^I0CBA6w8AG^ECABgEa/QEAAw^jQsIP+AIAB^BGgQoPUHAAw^gQIMAjf4AgAE#Bea/fK+3P5/3PJOvh8t1cO4nflmQAQoAEAAF9Aw/7JHfQHAAw^gQIMArT8AY§BGvwHNPoDAA0AACBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQNOMBEAD#I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNA0IwHQ^AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgEZ/AD^C#0CNPoDAAY^QoEGA1h8AM^IAADQI0DQAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGA1h8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANArT+AIAB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg9QcAD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBgACDhFgC#07t9AfAD^C#0CtP4AgAE^EaBCg0R8Aa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRommEAM^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AIAB^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAGgAAQICGCNBfRfNcABg#BgeICGnVvoDwAY^QIAGAVp/AM§AjQI0OgPADQAAIAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAE0zEgAN#gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIEDTjARAAwAACNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQNIcBY§BGgRo/QEAAw^jQIECjPwBg§EadtAfAD^C#0CtP4AgAE^EaBCgAQABGgAA+AO2TAbHupOgH^ABJRU5ErkJggg==".replace(/§/g,"AAAAAA").replace(/\^/g,"AAAA").replace(/#/g,"AAA"),h="iVBORw0KGgoAAAANSUhEUgAAAGEAAABDCAMAAAC7vJusAAAAkFBMVEUAAAAvLy9ERERubm7///8AAAD///9EREREREREREREREQAAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8cHBwkJCQnJycoKCgpKSkqKiouLi4vLy8/Pz9AQEBCQkJDQ0NdXV1ubm58fHykpKRERERVVVUzMzPx7Ab+AAAAHXRSTlMAAAAAAAQEBQ4QGR4eIyMtLUVFVVVqapKSnJy7u9JKTggAAAFUSURBVHja7dXbUoMwEAbgSICqLYeW88F6KIogqe//dpoYZ0W4AXbv8g9TwkxmvtndZMrEwlw/F8YIRjCCEYxgBCOsFmzqGMEI28J5zzmt0Pc9rdDL0NYgMxIYC5KiKpKAzZphWtZlGm4SjlnkOV6UHeeEUx77rh/npw1dCrI9k9lnwUwF+UG9D3m4ftJJxH4SJdPtaawXcbr+tBaeFrxiur309cIv19+4ytGCU0031a5euPVigLYGqjlAqM4ShOQ+QAYQUO80AMMAAkUGGfMfR9Ul+kmvPq2QGxXKOQBAKdjUgk0t2NiCGEVP+rHT3/iCUMBT90YrPMsKsIWP3x/VolaonJEETchHCS8AYAmaUICQQwaAQnjoXgHAES7jLkEFaHO4bdq/k25HAIpgWY34FwAE5xjCffM+D2DV8B0gRsAZT7hr5gE8wdrJcU+CJqhcqQD7Cx5L7Ph4WnrKAAAAAElFTkSuQmCC",i="iVBORw0KGgoAAAANSUhEUgAAASAAAABvCAYAAABM+h2NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABORJREFUeNrs3VtTW1UYBuCEcxAI4YydWqTWdqr1V7T/2QsvvPDCCy9qjxZbamsrhZIQUHsCEtfafpmJe8qFjpUxfZ4Zuvt2feydJvAOARZUut1u5bRerl692nV913f99/f6QxWAU6KAAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIEABASggQAEBKCBAAQEoIEABASggQAEBKCBAAQEoIGBQC+jatWvd07zxrv9+Xx8fAQEoIEABASggQAEBKCBAAQEoIEABAQoIQAEBCghAAQEKCEABAQOk2u36kS6AAgLetwJKL29toFRM1be+QrVq3rx58//KvM8BAadGAQEKCFBAAAoIGHwnfhneZ+/Nmzf/LufzrI+AAE/BAAUEoIAABQTwztgLZt68eXvBAE/BABQQoIAAFBAweOwFM2/evL1ggKdgAAoIUEAACggYPPaCmTdv3l4wwFMwAAUEKCAABQQMHnvBzJs3by8Y4CkYgAICFBCAAgIGz4lfBQNQQMDgFlCtVisaaHV1tThubW1VInciD0U+ysdnz54N5+PKysphOnRTHsvHlN9EHo/1l5FrkV9Enoz8W87b29tTOS8vLx9EnoncjlyPvBe5EbkZeT4fU96NvBDr2znv7Ows57y0tLQVeSXy08gf5mNfPhPrjyOfrVarlcXFxZ9yfv78+bl8TPlh5LU8n/KDyOuxfj/y+VjfyHl3d/dCKv28fi/yp/m4sLDwQ+SLke9GvhT5Tinfjnw5f4/F/Pz8rZybzeZn+ZjyzVK+EfnzUr4S+Xopf9/L+fxzc3M5d1qt1hf531Mu5k/IxzGf85VYL+fefHH+RqNRrO/t7RW3L+UbkS9Hvhk5/386Kd/qW8/5duRLMV/OdyJfzNebnZ0t7t92u53v/07K9yJfiLwROT9+ef7HyOux/iDyWuSHkT+K+eLtZX9//2xer9frjyOfyY9/Wn8S86v59qT1p7Ge315zLt4RU16K19+O9YXIu5HnYn435hux3opcj9yOPB3z+5E/iPXf43y1yMX778HBQS3f3pTz+28l5bHIr2N+LN3+zszMzGHkoh/S+mHMF98XlNaP8zHd/0W/pMe943NAwKlSQIACAhQQgAICFBCAAgIUEIACAhQQgAIC/n9GqtXqYbfbHa38+RtSu32llPdqdNL6aOSj+LfxyMVekLTem39Ryr/mPDQ0NBznzXtROikPRW6W8k7k3m9rzXthOsPDw73bUuylGRkZ6cR63nvTSfko8oPIr+Pnz96P/DLW816ezujoaN6DdtyX9+P8eS9QZ2xs7Hxf7qa8Xlr/JO6Ljcjrcf6cj1P+OO+N6V1/fHz8XLz+/Tjfubh+sZcorZ+N9Ycxfybyo8ircf6fc56YmFiJ1/8l8mLk7cjzkfP92U15Ns63G+u9nPcKdWq12lQ8Xu3Ixd6f9Pd8P3UmJycnUszzL2N9LM7/anNzs9V7Q2q32395w/q7ubdH6L/KrVbrpPxlKX9Vyl+X8jel/G0pf5f/aDabvXy9tH6ztH63lDdKebOUH5Xyk1LeKuWd/ry2tlap9P125Onp6Zf9eWpq6lW3b8f6zMzM6/71er3+ppSP+u/XNN/pz41Go+sjIMBTMEABASggQAEBKCBAAQEoIEABASggQAEB/CN/CDAAw78uW9AVDw4AAAAASUVORK5CYII=",j="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQI12P4//8/MwAI/wMBbrqo4gAAAABJRU5ErkJggg==";a.ColorPicker={_html:b,_cssFunc:c,_cssMain:d,_horizontalPng:e,_verticalPng:f,_patchesPng:g,_iconsPng:h,_bgsPng:i,_blankPng:j}}(window),function(a,b){"use strict";function c(a,c){var e,j="",k="";for(var l in c)a.options[l]=c[l];_=new Colors(a.options),delete a.options,bb=_.options,bb.scale=1,k=bb.CSSPrefix,a.color=_,S=bb.valueRanges,a.nodes=cb=g(f(a),a),q(bb.mode),d(a),u(),j=" "+bb.mode.type+"-"+bb.mode.z,cb.slds.className+=j,cb.panel.className+=j,bb.noHexButton&&C(cb.HEX_butt,k+"butt",k+"labl"),bb.size!==b&&p(b,bb.size),e={alphaBG:cb.alpha_labl,cmyOnly:cb.HEX_labl};for(var m in e)bb[m]!==b&&o({target:e[m],data:bb[m]});bb.noAlpha&&(cb.colorPicker.className+=" no-alpha"),a.renderMemory(bb.memoryColors),h(a),I=!0,i(b,"init"),N&&(d(N),w())}function d(a){Y=!0,M!==a&&(M=a,ab=a.color.colors,bb=a.color.options,cb=a.nodes,_=a.color,$={},v(ab))}function e(){var a=["L","S","XS","XXS"];bb.sizes={},cb.testNode.style.cssText="position:absolute;left:-1000px;top:-1000px;",document.body.appendChild(cb.testNode);for(var b=a.length;b--;)cb.testNode.className=bb.CSSPrefix+"app "+a[b],bb.sizes[a[b]]=[cb.testNode.offsetWidth,cb.testNode.offsetHeight];cb.testNode.removeNode?cb.testNode.removeNode(!0):document.body.removeChild(cb.testNode)}function f(a){var b=document.createElement("div"),c=bb.CSSPrefix,d="data:image/png;base64,",e=function(a,b){var c=document.createElement("style");c.setAttribute("type","text/css"),b&&c.setAttribute("id",b),c.styleSheet||c.appendChild(document.createTextNode(a)),document.getElementsByTagName("head")[0].appendChild(c),c.styleSheet&&(document.styleSheets[document.styleSheets.length-1].cssText=a)},f=function(a){O._cssFunc=O._cssFunc.replace(/§/g,c).replace("_patches.png",a?d+O._patchesPng:bb.imagePath+"_patches.png").replace("_vertical.png",a?d+O._verticalPng:bb.imagePath+"_vertical.png").replace("_horizontal.png",a?d+O._horizontalPng:bb.imagePath+"_horizontal.png"),e(O._cssFunc,"colorPickerCSS"),bb.customCSS||(O._cssMain=O._cssMain.replace(/§/g,c).replace("_bgs.png",a?d+O._bgsPng:bb.imagePath+"_bgs.png").replace("_icons.png",a?d+O._iconsPng:bb.imagePath+"_icons.png").replace("_blank.png",Q?bb.imagePath+"_blank.cur":d+O._blankPng).replace(/opacity:(\d*\.*(\d+))/g,function(a,b){return R?"-moz-opacity: "+b+"; -khtml-opacity: "+b+"; opacity: "+b:'-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity='+Math.round(100*+b)+')";filter: alpha(opacity='+Math.round(100*+b)+")"}),e(O._cssMain))},g=document.createElement("img");return P?a.color.options.devPicker:(document.getElementById("colorPickerCSS")||(g.onload=g.onerror=function(){O._cssFunc&&f(1===this.width&&1===this.height)},g.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="),(N=M)&&r(),b.insertAdjacentHTML("afterbegin",M?M.nodes.colorPicker.outerHTML||(new XMLSerializer).serializeToString(M.nodes.colorPicker):O._html.replace(/§/g,c)),b=b.children[0],b.style.cssText=bb.initStyle||"",(bb.appendTo||document.body).appendChild(b))}function g(a){var b,c,d=a.getElementsByTagName("*"),e={colorPicker:a},f=new RegExp(bb.CSSPrefix);e.styles={},e.textNodes={},e.memos=[],e.testNode=document.createElement("div");for(var g=0,h=d.length;h>g;g++)b=d[g],(c=b.className)&&f.test(c)?(c=c.split(" ")[0].replace(bb.CSSPrefix,"").replace(/-/g,"_"),/_disp/.test(c)?(c=c.replace("_disp",""),e.styles[c]=b.style,e.textNodes[c]=b.firstChild,b.contentEditable=!0):(/(?:hs|cmyk|Lab).*?(?:butt|labl)/.test(c)||(e[c]=b),/(?:cur|sld[^s]|opacity|cont|col)/.test(c)&&(e.styles[c]=/(?:col\d)/.test(c)?b.children[0].style:b.style))):/memo/.test(b.parentNode.className)&&e.memos.push(b);return e.panelCover=e.panel.appendChild(document.createElement("div")),e}function h(c,f){var g=f?G:F;g(cb.colorPicker,"mousedown",function(f){var g=f||a.event,h=E(g),n=g.target||g.srcElement,o=n.className;return d(c),J=n,i(b,"resetEventListener"),U="",n===cb.sldl_3||n===cb.curm?(J=cb.sldl_3,I=j,U="changeXYValue",C(cb.slds,"do-drag")):/sldr/.test(o)||n===cb.curl||n===cb.curr?(J=cb.sldr_4,I=k,U="changeZValue"):n===cb.opacity.children[0]||n===cb.opacity_slider?(J=cb.opacity,I=l,U="changeOpacityValue"):/-disp/.test(o)&&!/HEX-/.test(o)?(I=m,U="changeInputValue",(3===n.nextSibling.nodeType?n.nextSibling.nextSibling:n.nextSibling).appendChild(cb.nsarrow),K=o.split("-disp")[0].split("-"),K={type:K[0],z:K[1]||""},C(cb.panel,"start-change"),V=0):n!==cb.resize||bb.noResize?I=b:(bb.sizes||e(),J=cb.resizer,I=p,U="resizeApp"),I&&(W={pageX:h.X,pageY:h.Y},J.style.display="block",X=D(J),X.width=cb.opacity.offsetWidth,X.childWidth=cb.opacity_slider.offsetWidth,J.style.display="",I(g),F(Q?document.body:a,"mousemove",I),L=a[eb](w)),/-disp/.test(o)?void 0:B(g)}),g(cb.colorPicker,"click",function(a){d(c),o(a)}),g(cb.colorPicker,"dblclick",o),g(cb.colorPicker,"keydown",function(a){d(c),n(a)}),g(cb.colorPicker,"keypress",n),g(cb.colorPicker,"paste",function(a){return a.target.firstChild.data=a.clipboardData.getData("Text"),B(a)})}function i(c,d){var e=I;I&&(a[fb](L),G(Q?document.body:a,"mousemove",I),V&&(K={type:"alpha"},w()),("function"==typeof I||"number"==typeof I)&&delete bb.webUnsave,V=1,I=b,C(cb.slds,"do-drag",""),C(cb.panel,"(?:start-change|do-change)",""),cb.resizer.style.cssText="",cb.panelCover.style.cssText="",cb.memo_store.style.cssText="background-color: "+y(ab.RND.rgb)+"; "+A(ab.alpha),cb.memo.className=cb.memo.className.replace(/\s+(?:dark|light)/,"")+(ab["rgbaMix"+T[bb.alphaBG]].luminance<.22?" dark":" light"),K=b,s(),bb.actionCallback&&bb.actionCallback(c,U||e.name||d||"external"))}function j(b){var c=b||a.event,d=bb.scale,e=E(c),f=(e.X-X.left)*(4===d?2:d),g=(e.Y-X.top)*d,h=bb.mode;return ab[h.type][h.x]=z(f/255,0,1),ab[h.type][h.y]=1-z(g/255,0,1),t(),B(c)}function k(b){var c=b||a.event,d=E(c),e=(d.Y-X.top)*bb.scale,f=bb.mode;return ab[f.type][f.z]=1-z(e/255,0,1),t(),B(c)}function l(b){var c=b||a.event,d=E(c);return Y=!0,ab.alpha=z(Math.round((d.X-X.left)/X.width*100),0,100)/100,t("alpha"),B(c)}function m(b){var c,d=b||a.event,e=E(d),f=W.pageY-e.Y,g=bb.delayOffset,h=K.type,i="alpha"===h;return V||Math.abs(f)>=g?(V||(V=(f>0?-g:g)+ +J.firstChild.data*(i?100:1),W.pageY+=V,f+=V,V=1,C(cb.panel,"start-change","do-change"),cb.panelCover.style.cssText="position:absolute;left:0;top:0;right:0;bottom:0",document.activeElement.blur(),L=a[eb](w)),"cmyk"===h&&bb.cmyOnly&&(h="cmy"),i?(Y=!0,ab.alpha=z(f/100,0,1)):(c=S[h][K.z],ab[h][K.z]="Lab"===h?z(f,c[0],c[1]):z(f/c[1],0,1)),t(i?"alpha":h),B(d)):void 0}function n(c){var d,e=c||a.event,f=e.which||e.keyCode,g=String.fromCharCode(f),h=document.activeElement,j=h.className.replace(bb.CSSPrefix,"").split("-"),k=j[0],l=j[1],m="alpha"===k,n="HEX"===k,o={k40:-1,k38:1,k34:-10,k33:10}["k"+f]/(m?100:1),p={HEX:/[0-9a-fA-F]/,Lab:/[\-0-9]/,alpha:/[\.0-9]/}[k]||/[0-9]/,q=S[k][k]||S[k][l],r=h.firstChild,s=H(h),u=r.data,w="0"!==u||n?u.split(""):[];
return/^(?:27|13)$/.test(f)?(B(e),h.blur()):"keydown"===e.type?(o?d=z(Math.round(1e6*(+u+o))/1e6,q[0],q[1]):/^(?:8|46)$/.test(f)&&(s.range||(s.range++,s.start-=8===f?1:0),w.splice(s.start,s.range),d=w.join("")||"0"),d!==b&&B(e,!0)):"keypress"===e.type&&(/^(?:37|39|8|46|9)$/.test(f)||B(e,!0),p.test(g)&&(w.splice(s.start,s.range,g),d=w.join("")),s.start++),13===f&&n?r.data.length%3===0||"0"===r.data?M.setColor("0"===r.data?"000":r.data,"rgb",ab.alpha,!0):(B(e,!0),h.focus()):(n&&d!==b&&(d=/^0+/.test(d)?d:parseInt(""+d,16)||0),void(d!==b&&""!==d&&+d>=q[0]&&+d<=q[1]&&(n&&(d=d.toString(16).toUpperCase()||"0"),m?ab[k]=+d:n||(ab[k][l]=+d/("Lab"===k?1:q[1])),t(m?"alpha":k),v(ab),I=!0,i(c,e.type),r.data=d,H(h,Math.min(h.firstChild.data.length,s.start<0?0:s.start)))))}function o(c){var d,e,f=c||a.event,g=f.target||f.srcElement,h=g.className,j=g.parentNode,k=bb,l=ab.RND.rgb,m=bb.mode,n="",o=k.CSSPrefix,p=/(?:hs|rgb)/.test(j.className)&&/^[HSBLRG]$/.test(g.firstChild?g.firstChild.data:""),q=/dblc/.test(f.type),r="";if(!q||p){if(-1!==h.indexOf("-labl "+o+"labl"))C(cb[h.split("-")[0]],o+"hide",""),C(cb[j.className.split("-")[1]],o+"hide");else if(-1!==h.indexOf(o+"butt"))if(p)q&&2===bb.scale&&(n=/hs/.test(m.type)?"rgb":/hide/.test(cb.hsl.className)?"hsv":"hsl",n=n+"-"+n[m.type.indexOf(m.z)]),M.setMode(n?n:h.replace("-butt","").split(" ")[0]),r="modeChange";else if(/^[rgb]/.test(h))n=h.split("-")[1],C(cb.colorPicker,"no-rgb-"+n,(k["noRGB"+n]=!k["noRGB"+n])?b:""),r="noRGB"+n;else if(g===cb.alpha_labl)d=k.customBG,e=k.alphaBG,C(cb.colorPicker,"alpha-bg-"+e,"alpha-bg-"+(e=k.alphaBG=c.data||("w"===e?d?"c":"b":"c"===e?"b":"w"))),g.firstChild.data=e.toUpperCase(),cb.ctrl.style.backgroundColor=cb.memo.style.backgroundColor="c"!==e?"":"rgb("+Math.round(255*d.r)+", "+Math.round(255*d.g)+", "+Math.round(255*d.b)+")",cb.raster.style.cssText=cb.raster_bg.previousSibling.style.cssText="c"!==e?"":A(d.luminance<.22?.5:.4),r="alphaBackground";else if(g===cb.alpha_butt)C(cb.colorPicker,"mute-alpha",(k.muteAlpha=!k.muteAlpha)?b:""),r="alphaState";else if(g===cb.HEX_butt)C(cb.colorPicker,"no-HEX",(k.HEXState=!k.HEXState)?b:""),r="HEXState";else if(g===cb.HEX_labl){var s="web save"===ab.saveColor;"web smart"===ab.saveColor||s?s?M.setColor(k.webUnsave,"rgb"):(k.webUnsave||(k.webUnsave=x(l)),M.setColor(ab.webSave,"rgb")):(k.webUnsave=x(l),M.setColor(ab.webSmart,"rgb")),r="webColorState"}else/Lab-x-labl/.test(h)&&(C(cb.colorPicker,"cmy-only",(k.cmyOnly=!k.cmyOnly)?b:""),r="cmykState");else if(g===cb.bsav)u(),r="saveAsBackground";else if(g===cb.bres){var w=x(l),y=ab.alpha;M.setColor(k.color),u(),M.setColor(w,"rgb",y),r="resetColor"}else if(j===cb.col1)ab.hsv.h-=ab.hsv.h>.5?.5:-.5,t("hsv"),r="shiftColor";else if(j===cb.col2)M.setColor(g.style.backgroundColor,"rgb",ab.background.alpha),r="setSavedColor";else if(j===cb.memo){var z=function(){cb.memos.blinker&&(cb.memos.blinker.style.cssText=cb.memos.cssText)},B=function(b){cb.memos.blinker=b,b.style.cssText="background-color:"+(ab.RGBLuminance>.22?"#333":"#DDD"),a.setTimeout(z,200)};if(g===cb.memo_cursor){z(),cb.memos.blinker=b,cb.testNode.style.cssText=cb.memo_store.style.cssText,cb.memos.cssText=cb.testNode.style.cssText;for(var D=cb.memos.length-1;D--;)if(cb.memos.cssText===cb.memos[D].style.cssText){B(cb.memos[D]);break}if(!cb.memos.blinker){for(var D=cb.memos.length-1;D--;)cb.memos[D+1].style.cssText=cb.memos[D].style.cssText;cb.memos[0].style.cssText=cb.memo_store.style.cssText}r="toMemery"}else z(),M.setColor(g.style.backgroundColor,"rgb",g.style.opacity||1),cb.memos.cssText=g.style.cssText,B(g),I=1,r="fromMemory"}r&&(v(ab),I=I||!0,i(c,r))}}function p(c,d){var e,f=c||a.event,g=f?E(f):{},h=d!==b,i=h?d:g.X-X.left+8,j=h?d:g.Y-X.top+8,k=[" S XS XXS"," S XS"," S",""],l=bb.sizes,m=h?d:j<l.XXS[1]+25?0:i<l.XS[0]+25?1:i<l.S[0]+25||j<l.S[1]+25?2:3,n=k[m],o=!1,p="";$.resizer!==n&&(o=/XX/.test(n),e=bb.mode,!o||/hs/.test(e.type)&&"h"!==e.z?e.original&&M.setMode(e.original):(p=e.type+"-"+e.z,M.setMode(/hs/.test(e.type)?e.type+"-s":"hsv-s"),bb.mode.original=p),cb.colorPicker.className=cb.colorPicker.className.replace(/\s+(?:S|XS|XXS)/g,"")+n,bb.scale=o?4:/S/.test(n)?2:1,bb.currentSize=m,$.resizer=n,Y=!0,w(),s()),cb.resizer.style.cssText="display: block;width: "+(i>10?i:10)+"px;height: "+(j>10?j:10)+"px;"}function q(a){var b={rgb_r:{x:"b",y:"g"},rgb_g:{x:"b",y:"r"},rgb_b:{x:"r",y:"g"},hsv_h:{x:"s",y:"v"},hsv_s:{x:"h",y:"v"},hsv_v:{x:"h",y:"s"},hsl_h:{x:"s",y:"l"},hsl_s:{x:"h",y:"l"},hsl_l:{x:"h",y:"s"}},c=a.replace("-","_"),d="\\b(?:rg|hs)\\w\\-\\w\\b";return C(cb.panel,d,a),C(cb.slds,d,a),a=a.split("-"),bb.mode={type:a[0],x:b[c].x,y:b[c].y,z:a[1]}}function r(){var a=/\s+(?:hue-)*(?:dark|light)/g,b="className";cb.curl[b]=cb.curl[b].replace(a,""),cb.curr[b]=cb.curr[b].replace(a,""),cb.slds[b]=cb.slds[b].replace(a,""),cb.sldr_2[b]=bb.CSSPrefix+"sldr-2",cb.sldr_4[b]=bb.CSSPrefix+"sldr-4",cb.sldl_3[b]=bb.CSSPrefix+"sldl-3";for(var c in cb.styles)c.indexOf("sld")||(cb.styles[c].cssText="");$={}}function s(){cb.styles.curr.cssText=cb.styles.curl.cssText,cb.curl.className=bb.CSSPrefix+"curl"+(Z.noRGBZ?" "+bb.CSSPrefix+"curl-"+Z.noRGBZ:""),cb.curr.className=bb.CSSPrefix+"curr "+bb.CSSPrefix+"curr-"+("h"===bb.mode.z?Z.HUEContrast:Z.noRGBZ?Z.noRGBZ:Z.RGBLuminance)}function t(a){v(_.setColor(b,a||bb.mode.type)),Y=!0}function u(a){return _.saveAsBackground(),cb.styles.col2.cssText="background-color: "+y(ab.background.RGB)+";"+A(ab.background.alpha),a&&v(ab),ab}function v(a){var c=Z,d=T[bb.alphaBG];c.hueDelta=Math.round(100*a["rgbaMixBGMix"+d].hueDelta),c.luminanceDelta=Math.round(100*a["rgbaMixBGMix"+d].luminanceDelta),c.RGBLuminance=a.RGBLuminance>.22?"light":"dark",c.HUEContrast=a.HUELuminance>.22?"light":"dark",c.contrast=c.luminanceDelta>c.hueDelta?"contrast":"",c.readabiltiy=a["rgbaMixBGMix"+d].WCAG2Ratio>=7?"green":a["rgbaMixBGMix"+d].WCAG2Ratio>=4.5?"orange":"",c.noRGBZ=bb["no"+bb.mode.type.toUpperCase()+bb.mode.z]?"g"===bb.mode.z&&a.rgb.g<.59||"b"===bb.mode.z||"r"===bb.mode.z?"dark":"light":b}function w(){if(I){if(!Y)return L=a[eb](w);Y=!1}var c,d,e,f,g=bb,h=g.mode,i=g.scale,l=g.CSSPrefix,m=ab,n=cb,o=n.styles,p=n.textNodes,q=S,r=K,s=Z,t=$,u=0,v=0,x=m[h.type][h.x],z=Math.round(255*x/(4===i?2:i)),B=m[h.type][h.y],C=1-B,D=Math.round(255*C/i),E=1-m[h.type][h.z],F=Math.round(255*E/i),G=[x,B],H="rgb"===h.type,M="h"===h.z,N="hsl"===h.type,O=N&&"s"===h.z,P=I===j,Q=I===k;H&&(G[0]>=G[1]?v=1:u=1,t.sliderSwap!==u&&(n.sldr_2.className=g.CSSPrefix+"sldr-"+(3-u),t.sliderSwap=u)),(H&&!Q||M&&!P||!M&&!Q)&&(o[M?"sldl_2":"sldr_2"][H?"cssText":"backgroundColor"]=H?A((G[u]-G[v])/(1-G[v]||0)):y(m.hueRGB)),M||(Q||(o.sldr_4.cssText=A(H?G[v]:O?Math.abs(1-2*C):C)),P||(o.sldl_3.cssText=A(N&&"l"===h.z?Math.abs(1-2*E):E)),N&&(f=O?"sldr_4":"sldl_3",d=O?"r-":"l-",e=O?C>.5?4:3:E>.5?3:4,t[f]!==e&&(n[f].className=g.CSSPrefix+"sld"+d+e,t[f]=e))),Q||(o.curm.cssText="left: "+z+"px; top: "+D+"px;"),P||(o.curl.top=F+"px"),r&&(o.curr.top=F+"px"),(r&&"alpha"===r.type||J===n.opacity)&&(o.opacity_slider.left=g.opacityPositionRelative?m.alpha*((X.width||n.opacity.offsetWidth)-(X.childWidth||n.opacity_slider.offsetWidth))+"px":100*m.alpha+"%"),o.col1.cssText="background-color: "+y(m.RND.rgb)+"; "+(g.muteAlpha?"":A(m.alpha)),o.opacity.backgroundColor=y(m.RND.rgb),o.cold.width=s.hueDelta+"%",o.cont.width=s.luminanceDelta+"%";for(c in p)d=c.split("_"),g.cmyOnly&&(d[0]=d[0].replace("k","")),e=d[1]?m.RND[d[0]][d[1]]:m.RND[d[0]]||m[d[0]],t[c]!==e&&(t[c]=e,p[c].data=e>359.5&&"HEX"!==c?0:e,"HEX"===c||g.noRangeBackground||(e=m[d[0]][d[1]]!==b?m[d[0]][d[1]]:m[d[0]],"Lab"===d[0]&&(e=(e-q[d[0]][d[1]][0])/(q[d[0]][d[1]][1]-q[d[0]][d[1]][0])),o[c].backgroundPosition=Math.round(100*(1-e))+"% 0%"));d=m._rgb?[m._rgb.r!==m.rgb.r,m._rgb.g!==m.rgb.g,m._rgb.b!==m.rgb.b]:[],d.join("")!==t.outOfGammut&&(n.rgb_r_labl.firstChild.data=d[0]?"!":" ",n.rgb_g_labl.firstChild.data=d[1]?"!":" ",n.rgb_b_labl.firstChild.data=d[2]?"!":" ",t.outOfGammut=d.join("")),s.noRGBZ&&t.noRGBZ!==s.noRGBZ&&(n.curl.className=l+"curl "+l+"curl-"+s.noRGBZ,Q||(n.curr.className=l+"curr "+l+"curr-"+s.noRGBZ),t.noRGBZ=s.noRGBZ),t.HUEContrast!==s.HUEContrast&&"h"===h.z?(n.slds.className=n.slds.className.replace(/\s+hue-(?:dark|light)/,"")+" hue-"+s.HUEContrast,Q||(n.curr.className=l+"curr "+l+"curr-"+s.HUEContrast),t.HUEContrast=s.HUEContrast):t.RGBLuminance!==s.RGBLuminance&&(n.colorPicker.className=n.colorPicker.className.replace(/\s+(?:dark|light)/,"")+" "+s.RGBLuminance,Q||"h"===h.z||s.noRGBZ||(n.curr.className=l+"curr "+l+"curr-"+s.RGBLuminance),t.RGBLuminance=s.RGBLuminance),(t.contrast!==s.contrast||t.readabiltiy!==s.readabiltiy)&&(n.ctrl.className=n.ctrl.className.replace(" contrast","").replace(/\s*(?:orange|green)/,"")+(s.contrast?" "+s.contrast:"")+(s.readabiltiy?" "+s.readabiltiy:""),t.contrast=s.contrast,t.readabiltiy=s.readabiltiy),t.saveColor!==m.saveColor&&(n.HEX_labl.firstChild.data=m.saveColor?"web save"===m.saveColor?"W":"M":"!",t.saveColor=m.saveColor),g.renderCallback&&g.renderCallback(m,h),I&&(L=a[eb](w))}function x(a){var b={};for(var c in a)b[c]=a[c];return b}function y(a,b){for(var c="",d=(b||"rgb").split(""),e=d.length;e--;)c=", "+a[d[e]]+c;return(b||"rgb")+"("+c.substr(2)+")"}function z(a,b,c){return a>c?c:b>a?b:a}function A(a){return a===b&&(a=1),R?"opacity: "+Math.round(1e10*a)/1e10+";":"filter: alpha(opacity="+Math.round(100*a)+");"}function B(b,c){return b.preventDefault?b.preventDefault():b.returnValue=!1,c||(a.getSelection?a.getSelection().removeAllRanges():document.selection.empty()),!1}function C(a,c,d){return a?a.className=d!==b?a.className.replace(new RegExp("\\s+?"+c,"g"),d?" "+d:""):a.className+" "+c:!1}function D(b){var c=b.getBoundingClientRect?b.getBoundingClientRect():{top:0,left:0},d=b&&b.ownerDocument,e=d.body,f=d.defaultView||d.parentWindow||a,g=d.documentElement||e.parentNode,h=g.clientTop||e.clientTop||0,i=g.clientLeft||e.clientLeft||0;return{left:c.left+(f.pageXOffset||g.scrollLeft)-i,top:c.top+(f.pageYOffset||g.scrollTop)-h}}function E(a){return{X:a.pageX||a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,Y:a.pageY||a.clientY+document.body.scrollTop+document.documentElement.scrollTop}}function F(a,b,c){F.cache=F.cache||{_get:function(a,b,c,d){for(var e=F.cache[b]||[],f=e.length;f--;)if(a===e[f].obj&&""+c==""+e[f].func)return c=e[f].func,d||(e[f]=e[f].obj=e[f].func=null,e.splice(f,1)),c},_set:function(a,b,c){var d=F.cache[b]=F.cache[b]||[];return F.cache._get(a,b,c,!0)?!0:void d.push({func:c,obj:a})}},!c.name&&F.cache._set(a,b,c)||"function"!=typeof c||(a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c))}function G(a,b,c){"function"==typeof c&&(c.name||(c=F.cache._get(a,b,c)||c),a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent("on"+b,c))}function H(c,d){var e={};if(d===b){if(a.getSelection){c.focus();var f=a.getSelection().getRangeAt(0),g=f.cloneRange();g.selectNodeContents(c),g.setEnd(f.endContainer,f.endOffset),e={end:g.toString().length,range:f.toString().length}}else{c.focus();var f=document.selection.createRange(),g=document.body.createTextRange();g.moveToElementText(c),g.setEndPoint("EndToEnd",f),e={end:g.text.length,range:f.text.length}}return e.start=e.end-e.range,e}if(-1==d&&(d=c.text().length),a.getSelection)c.focus(),a.getSelection().collapse(c.firstChild,d);else{var h=document.body.createTextRange();h.moveToElementText(c),h.moveStart("character",d),h.collapse(!0),h.select()}return d}var I,J,K,L,M,N,O=a.ColorPicker,P=!O,Q=document.createStyleSheet!==b&&document.getElementById||!!a.MSInputMethodContext,R="undefined"!=typeof document.body.style.opacity,S={},T={w:"White",b:"Black",c:"Custom"},U="",V=1,W={},X={},Y=!0,Z={},$={},_={},ab={},bb={},cb={},db="AnimationFrame",eb="request"+db,fb="cancel"+db,gb=["ms","moz","webkit","o"],hb=function(a){this.options={color:"rgba(204, 82, 37, 0.8)",mode:"rgb-b",fps:60,delayOffset:8,CSSPrefix:"cp-",allMixDetails:!0,alphaBG:"w",imagePath:""},c(this,a||{})};a.ColorPicker=hb,hb.addEvent=F,hb.removeEvent=G,hb.getOrigin=D,hb.limitValue=z,hb.changeClass=C,hb.prototype.setColor=function(a,b,c,e){d(this),K=!0,v(_.setColor.apply(_,arguments)),e&&this.startRender(!0)},hb.prototype.saveAsBackground=function(){return d(this),u(!0)},hb.prototype.setCustomBackground=function(a){return d(this),_.setCustomBackground(a)},hb.prototype.startRender=function(b){d(this),b?(I=!1,w(),this.stopRender()):(I=1,L=a[eb](w))},hb.prototype.stopRender=function(){d(this),a[fb](L),K&&(I=1,i(b,"external"))},hb.prototype.setMode=function(a){d(this),q(a),r(),w()},hb.prototype.destroyAll=function(){var a=this.nodes.colorPicker,b=function(a){for(var c in a)(a[c]&&"[object Object]"===a[c].toString()||a[c]instanceof Array)&&b(a[c]),a[c]=null,delete a[c]};this.stopRender(),h(this,!0),b(this),a.parentNode.removeChild(a),a=null},hb.prototype.renderMemory=function(a){var c=this.nodes.memos,d=[];"string"==typeof a&&(a=a.replace(/^'|'$/g,"").replace(/\s*/,"").split("','"));for(var e=c.length;e--;)a&&"string"==typeof a[e]&&(d=a[e].replace("rgba(","").replace(")","").split(","),a[e]={r:d[0],g:d[1],b:d[2],a:d[3]}),c[e].style.cssText="background-color: "+(a&&a[e]!==b?y(a[e])+";"+A(a[e].a||1):"rgb(0,0,0);")},F(Q?document.body:a,"mouseup",i);for(var ib=gb.length;ib--&&!a[eb];)a[eb]=a[gb[ib]+"Request"+db],a[fb]=a[gb[ib]+"Cancel"+db]||a[gb[ib]+"CancelRequest"+db];a[eb]=a[eb]||function(b){return a.setTimeout(b,1e3/bb.fps)},a[fb]=a[fb]||function(b){return a.clearTimeout(b),L=null}}(window);
;
(function ($, window) {
	$.fn.extend({
		colorPicker: function(config) {
			var renderCallback = function(colors, mode) {
					var options = this,
						$input = $(options.input),
						$patch = $(options.patch),
						RGB = colors.RND.rgb,
						HSL = colors.RND.hsl,
						AHEX = options.isIE8 ? (colors.alpha < 0.16 ? '0' : '') +
							(Math.round(colors.alpha * 100)).toString(16).toUpperCase() + colors.HEX : '',
						RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b,
						RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')',
						isAlpha = colors.alpha !== 1 && !options.isIE8,
						colorMode = $input.data('colorMode');

					$patch.css({
						'color': (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd'), // Black...???
						'background-color': RGBAText,
						'filter' : (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
							'startColorstr=#' + AHEX + ',' + 'endColorstr=#' + AHEX + ')' : '')
					});

					$input.val(colorMode === 'HEX' && !isAlpha ? '#' + (options.isIE8 ? AHEX : colors.HEX) :
						colorMode === 'rgb' || (colorMode === 'HEX' && isAlpha) ?
						(!isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText) :
						('hsl' + (isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' +
							(isAlpha ? ', ' + colors.alpha : '') + ')')
					);

					if( $('#replace-color-all')[0].checked || current_active_wechat_item) {
						setBackgroundColor($input.val(),'#FFFFFF', false);
					}

					if( ! current_active_wechat_item ) {
						$('.editor-component-list li > .recommend-style-content').each(function(){
							parseObject($(this),$input.val(),'#FFFFFF'); //全文替换为对应颜色
						})
					}

					if (options.displayCallback) {
						options.displayCallback(colors, mode, options);
					}
				},
				actionCallback = function(event, action) {

					var options = this,
						colorPicker = colorPickers.current;

					//console.log(action);

					if (action === 'toMemery') {
						var memos = colorPicker.nodes.memos,
							$memo,
							backgroundColor = '',
							opacity = 0,
							cookieTXT = [];

						for (var n = 0, m = memos.length; n < m; n++) {
							$memo = $(memos[n]);
							backgroundColor = $memo.css('background-color');
							opacity = Math.round($memo.css('opacity') * 100) / 100;
							cookieTXT.push(backgroundColor.
								replace(/, /g, ',').
								replace('rgb(', 'rgba(').
								replace(')', ',' + opacity + ')')
							);
						}
						cookieTXT = '\'' + cookieTXT.join('\',\'') + '\'';
						$.docCookies('colorPickerMemos' + (options.noAlpha ? 'NoAlpha' : ''), cookieTXT);
					} else if (action === 'resizeApp') {
						$.docCookies('colorPickerSize', colorPicker.color.options.currentSize);
					} else if (action === 'modeChange') {
						var mode = colorPicker.color.options.mode;

						$.docCookies('colorPickerMode', mode.type + '-' + mode.z);
					}
				},
				createInstance = function(elm, config) {
					var initConfig = {
							klass: window.ColorPicker,
							input: elm,
							patch: elm,
							isIE8: !!document.all && !document.addEventListener, // Opera???
							animationSpeed: 200,
							draggable: true,
							margin: {left: -1, top: 2},
							customBG: '#FFFFFF',
							// displayCallback: displayCallback,
							/* --- regular colorPicker options from this point --- */
							color: elm.value,
							initStyle: 'display: none',
							mode: $.docCookies('colorPickerMode') || 'hsv-h',
							// memoryColors: (function(colors, config) {
							// 	return config.noAlpha ?
							// 		colors.replace(/\,\d*\.*\d*\)/g, ',1)') : colors;
							// })($.docCookies('colorPickerMemos'), config || {}),
							memoryColors: $.docCookies('colorPickerMemos' + ((config || {}).noAlpha ? 'NoAlpha' : '')),
							size: $.docCookies('colorPickerSize') || 1,
							renderCallback: renderCallback,
							actionCallback: actionCallback
						};

					for (var n in config) {
						initConfig[n] = config[n];
					}
					return new initConfig.klass(initConfig);
				},
				doEventListeners = function(elm, multiple, off) {
					var onOff = off ? 'off' : 'on';

					$(elm)[onOff]('focus.colorPicker', function(e) {

						var $input = $(this),
							position = $input.position(),
							index = multiple ? $(that).index(this) : 0,
							colorPicker = colorPickers[index] ||
								(colorPickers[index] = createInstance(this, config)),
							options = colorPicker.color.options,
							$colorPicker = $.ui && options.draggable ?
							$(colorPicker.nodes.colorPicker).draggable(
								{cancel: '.' + options.CSSPrefix + 'app div'}
							) : $(colorPicker.nodes.colorPicker);

						options.color = elm.value; // brings color to default on reset


						//alert(position.left);alert(position.top);
						var left = position.left,top = position.top;
						if($($input).parents('#color-plan').size() > 0) {
							left += $('#color-plan').position().left - 158;
							top += $('#color-plan').position().top + 20;
						}
						if($($input).parents('.edui-popup').size() > 0 ){
							var p_popup = $($input).parents('.edui-popup:first');
							left += p_popup.position().left - 165;
							top += p_popup.position().top - 150;
						}

						$colorPicker.css({
							'position': 'absolute',
							'left': left + options.margin.left,
							'top': top + +$input.outerHeight(true) + options.margin.top
						});
						if (!multiple) {
							options.input = elm;
							options.patch = elm; // check again???
							colorPicker.setColor(elm.value, undefined, undefined, true);
							colorPicker.saveAsBackground();
						}

						colorPickers.current = colorPickers[index];
						$(options.appenTo || document.body).append($colorPicker);
						setTimeout(function() { // compensating late style on onload in colorPicker
							$colorPicker.show(colorPicker.color.options.animationSpeed);
						}, 0);
					});

					if (!colorPickers.evt || off) {
						colorPickers.evt = true; // prevent new eventListener for window

						$(window)[onOff]('mousedown.colorPicker', function(e) {
							var colorPicker = colorPickers.current,
								$colorPicker = $(colorPicker ? colorPicker.nodes.colorPicker : undefined),
								animationSpeed = colorPicker ? colorPicker.color.options.animationSpeed : 0,
								isColorPicker = $(e.target).closest('.cp-app')[0],
								inputIndex = $(that).index(e.target);

							if (isColorPicker && $(colorPickers).index(isColorPicker)) {
								if (colorPicker && e.target === colorPicker.nodes.exit) {
									$colorPicker.hide(animationSpeed);
									$(':focus').trigger('blur');
								} else {
									// buttons on colorPicker don't work any more
									// $(document.body).append(isColorPicker);
								}
							} else if (inputIndex !== -1) {
								// input fireld
							} else {
								$colorPicker.hide(animationSpeed);
							}
						});
					}
				},
				that = this,
				colorPickers = this.colorPickers || [], // this is a way to prevent data binding on HTMLElements
				testColors = new window.Colors({customBG: config.customBG, allMixDetails: true});

			this.colorPickers = colorPickers;

			$(this).each(function(idx, elm) {
				if (config === 'destroy') {
					// doEventListeners(elm, (config && config.multipleInstances), true);
					$(elm).off('.colorPicker');
					$(window).off('.colorPicker');
					if (colorPickers[idx]) {
						colorPickers[idx].destroyAll();
					}
				} else {
					var color = elm.value; //$(elm).data('color') ? $(elm).data('color'):
					var value = color.split('(');

					$(elm).data('colorMode', value[1] ? value[0].substr(0, 3) : 'HEX');
					doEventListeners(elm, (config && config.multipleInstances), false);
					if (config && config.readOnly) {
						elm.readOnly = true;
					}

					testColors.setColor(color);
					if (config && config.init) {
						config.init(elm, testColors.colors);
					}
				}
			});

			return this;
		}
	});

	$.docCookies = function(key, val, options) {
		var encode = encodeURIComponent, decode = decodeURIComponent,
			cookies, n, tmp, cache = {},
			days;

		if (val === undefined) { // all about reading cookies
			cookies = document.cookie.split('; ') || []; // easier for decoding then with RegExp search // .split(/;\s*/)
			for (n = cookies.length; n--; ) {
				tmp = cookies[n].split('=');
				if (tmp[0]) cache[decode(tmp.shift())] = decode(tmp.join('=')); // there might be '='s in the value...
			}

			if (!key) return cache; // return Json for easy access to all cookies
			else return cache[key]; // easy access to cookies from here
		} else { // write/delete cookie
			options = options || {};

			if (val === '' || options.expires < 0) { // prepare deleteing the cookie
				options.expires = -1;
				// options.path = options.domain = options.secure = undefined; // to make shure the cookie gets deleted...
			}

			if (options.expires !== undefined) { // prepare date if any
				days = new Date();
				days.setDate(days.getDate() + options.expires);
			}

			document.cookie = encode(key) + '=' + encode(val) +
				(days            ? '; expires=' + days.toUTCString() : '') +
				(options.path    ? '; path='    + options.path       : '') +
				(options.domain  ? '; domain='  + options.domain     : '') +
				(options.secure  ? '; secure'                        : '');
		}
	};
})(jQuery, this); ;
/*!
 * LESS - Leaner CSS v1.7.0
 * http://lesscss.org
 *
 * Copyright (c) 2009-2014, Alexis Sellier <self@cloudhead.net>
 * Licensed under the Apache v2 License.
 *
 */
 /** * @license Apache v2
 */
!function(a,b){function c(b){return a.less[b.split("/")[1]]}function d(a,b){"undefined"!=typeof console&&w.logLevel>=b&&console.log("less: "+a)}function e(a){return a.replace(/^[a-z-]+:\/+?[^\/]+/,"").replace(/^\//,"").replace(/\.[a-zA-Z]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":")}function f(a,c){var e="{line} {content}",f=a.filename||c,g=[],h=(a.type||"Syntax")+"Error: "+(a.message||"There is an error in your .less file")+" in "+f+" ",i=function(a,c,d){a.extract[c]!==b&&g.push(e.replace(/\{line\}/,(parseInt(a.line,10)||0)+(c-1)).replace(/\{class\}/,d).replace(/\{content\}/,a.extract[c]))};a.extract?(i(a,0,""),i(a,1,"line"),i(a,2,""),h+="on line "+a.line+", column "+(a.column+1)+":\n"+g.join("\n")):a.stack&&(h+=a.stack),d(h,z.errors)}function g(a,b,c){var f=b.href||"",g="less:"+(b.title||e(f)),h=document.getElementById(g),i=!1,j=document.createElement("style");if(j.setAttribute("type","text/css"),b.media&&j.setAttribute("media",b.media),j.id=g,j.styleSheet)try{j.styleSheet.cssText=a}catch(k){throw new Error("Couldn't reassign styleSheet.cssText.")}else j.appendChild(document.createTextNode(a)),i=null!==h&&h.childNodes.length>0&&j.childNodes.length>0&&h.firstChild.nodeValue===j.firstChild.nodeValue;var l=document.getElementsByTagName("head")[0];if(null===h||i===!1){var m=b&&b.nextSibling||null;m?m.parentNode.insertBefore(j,m):l.appendChild(j)}if(h&&i===!1&&h.parentNode.removeChild(h),c&&D){d("saving "+f+" to cache.",z.info);try{D.setItem(f,a),D.setItem(f+":timestamp",c)}catch(k){d("failed to save",z.errors)}}}function h(a){return w.postProcessor&&"function"==typeof w.postProcessor&&(a=w.postProcessor.call(a,a)||a),a}function i(a,c){var d,f,h="less-error-message:"+e(c||""),i='<li><label>{line}</label><pre class="{class}">{content}</pre></li>',j=document.createElement("div"),k=[],l=a.filename||c,m=l.match(/([^\/]+(\?.*)?)$/)[1];j.id=h,j.className="less-error-message",f="<h3>"+(a.type||"Syntax")+"Error: "+(a.message||"There is an error in your .less file")+'</h3><p>in <a href="'+l+'">'+m+"</a> ";var n=function(a,c,d){a.extract[c]!==b&&k.push(i.replace(/\{line\}/,(parseInt(a.line,10)||0)+(c-1)).replace(/\{class\}/,d).replace(/\{content\}/,a.extract[c]))};a.extract?(n(a,0,""),n(a,1,"line"),n(a,2,""),f+="on line "+a.line+", column "+(a.column+1)+":</p><ul>"+k.join("")+"</ul>"):a.stack&&(f+="<br/>"+a.stack.split("\n").slice(1).join("<br/>")),j.innerHTML=f,g([".less-error-message ul, .less-error-message li {","list-style-type: none;","margin-right: 15px;","padding: 4px 0;","margin: 0;","}",".less-error-message label {","font-size: 12px;","margin-right: 15px;","padding: 4px 0;","color: #cc7777;","}",".less-error-message pre {","color: #dd6666;","padding: 4px 0;","margin: 0;","display: inline-block;","}",".less-error-message pre.line {","color: #ff0000;","}",".less-error-message h3 {","font-size: 20px;","font-weight: bold;","padding: 15px 0 5px 0;","margin: 0;","}",".less-error-message a {","color: #10a","}",".less-error-message .error {","color: red;","font-weight: bold;","padding-bottom: 2px;","border-bottom: 1px dashed red;","}"].join("\n"),{title:"error-message"}),j.style.cssText=["font-family: Arial, sans-serif","border: 1px solid #e00","background-color: #eee","border-radius: 5px","-webkit-border-radius: 5px","-moz-border-radius: 5px","color: #e00","padding: 15px","margin-bottom: 15px"].join(";"),"development"==w.env&&(d=setInterval(function(){document.body&&(document.getElementById(h)?document.body.replaceChild(j,document.getElementById(h)):document.body.insertBefore(j,document.body.firstChild),clearInterval(d))},10))}function j(a,b){w.errorReporting&&"html"!==w.errorReporting?"console"===w.errorReporting?f(a,b):"function"==typeof w.errorReporting&&w.errorReporting("add",a,b):i(a,b)}function k(a){var b=document.getElementById("less-error-message:"+e(a));b&&b.parentNode.removeChild(b)}function l(){}function m(a){w.errorReporting&&"html"!==w.errorReporting?"console"===w.errorReporting?l(a):"function"==typeof w.errorReporting&&w.errorReporting("remove",a):k(a)}function n(a){for(var b,c=document.getElementsByTagName("style"),d=0;d<c.length;d++)if(b=c[d],b.type.match(C)){var e=new w.tree.parseEnv(w),f=b.innerHTML||"";e.filename=document.location.href.replace(/#.*$/,""),(a||w.globalVars)&&(e.useFileCache=!0);var g=function(a){return function(b,c){if(b)return j(b,"inline");var d=c.toCSS(w);a.type="text/css",a.styleSheet?a.styleSheet.cssText=d:a.innerHTML=d}}(b);new w.Parser(e).parse(f,g,{globalVars:w.globalVars,modifyVars:a})}}function o(a,b){var c,d,e=/^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,f=a.match(e),g={},h=[];if(!f)throw new Error("Could not parse sheet href - '"+a+"'");if(!f[1]||f[2]){if(d=b.match(e),!d)throw new Error("Could not parse page url - '"+b+"'");f[1]=f[1]||d[1]||"",f[2]||(f[3]=d[3]+f[3])}if(f[3]){for(h=f[3].replace(/\\/g,"/").split("/"),c=0;c<h.length;c++)"."===h[c]&&(h.splice(c,1),c-=1);for(c=0;c<h.length;c++)".."===h[c]&&c>0&&(h.splice(c-1,2),c-=2)}return g.hostPart=f[1],g.directories=h,g.path=f[1]+h.join("/"),g.fileUrl=g.path+(f[4]||""),g.url=g.fileUrl+(f[5]||""),g}function p(a,b){var c,d,e,f,g=o(a),h=o(b),i="";if(g.hostPart!==h.hostPart)return"";for(d=Math.max(h.directories.length,g.directories.length),c=0;d>c&&h.directories[c]===g.directories[c];c++);for(f=h.directories.slice(c),e=g.directories.slice(c),c=0;c<f.length-1;c++)i+="../";for(c=0;c<e.length-1;c++)i+=e[c]+"/";return i}function q(){if(a.XMLHttpRequest&&("file:"!==a.location.protocol||!a.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(b){return d("browser doesn't support AJAX.",z.errors),null}}function r(a,b,c,e){function f(b,c,d){b.status>=200&&b.status<300?c(b.responseText,b.getResponseHeader("Last-Modified")):"function"==typeof d&&d(b.status,a)}var g=q(),h=y?w.fileAsync:w.async;"function"==typeof g.overrideMimeType&&g.overrideMimeType("text/css"),d("XHR: Getting '"+a+"'",z.debug),g.open("GET",a,h),g.setRequestHeader("Accept",b||"text/x-less, text/css; q=0.9, */*; q=0.5"),g.send(null),y&&!w.fileAsync?0===g.status||g.status>=200&&g.status<300?c(g.responseText):e(g.status,a):h?g.onreadystatechange=function(){4==g.readyState&&f(g,c,e)}:f(g,c,e)}function s(b,c,d,e){c&&c.currentDirectory&&!/^([a-z-]+:)?\//.test(b)&&(b=c.currentDirectory+b);var f=o(b,a.location.href),g=f.url,h={currentDirectory:f.path,filename:g};if(c?(h.entryPath=c.entryPath,h.rootpath=c.rootpath,h.rootFilename=c.rootFilename,h.relativeUrls=c.relativeUrls):(h.entryPath=f.path,h.rootpath=w.rootpath||f.path,h.rootFilename=g,h.relativeUrls=e.relativeUrls),h.relativeUrls&&(h.rootpath=e.rootpath?o(e.rootpath+p(f.path,h.entryPath)).path:f.path),e.useFileCache&&E[g])try{var i=E[g];d(null,i,g,h,{lastModified:new Date})}catch(j){d(j,null,g)}else r(g,e.mime,function(a,b){E[g]=a;try{d(null,a,g,h,{lastModified:b})}catch(c){d(c,null,g)}},function(a,b){d({type:"File",message:"'"+b+"' wasn't found ("+a+")"},null,g)})}function t(a,b,c,d,e){var f=new w.tree.parseEnv(w);f.mime=a.type,(e||w.globalVars)&&(f.useFileCache=!0),s(a.href,null,function(h,i,j,k,l){if(l){l.remaining=d;var n=D&&D.getItem(j),o=D&&D.getItem(j+":timestamp");if(!c&&o&&l.lastModified&&new Date(l.lastModified).valueOf()===new Date(o).valueOf())return g(n,a),l.local=!0,void b(null,null,i,a,l,j)}m(j),i?(f.currentFileInfo=k,new w.Parser(f).parse(i,function(c,d){if(c)return b(c,null,null,a);try{b(c,d,i,a,l,j)}catch(c){b(c,null,null,a)}},{modifyVars:e,globalVars:w.globalVars})):b(h,null,null,a,l,j)},f,e)}function u(a,b,c){for(var d=0;d<w.sheets.length;d++)t(w.sheets[d],a,b,w.sheets.length-(d+1),c)}function v(){"development"===w.env?(w.optimization=0,w.watchTimer=setInterval(function(){w.watchMode&&u(function(a,b,c,d,e){if(a)j(a,d.href);else if(b){var f=b.toCSS(w);f=h(f),g(f,d,e.lastModified)}})},w.poll)):w.optimization=3}("undefined"==typeof a.less||"undefined"!=typeof a.less.nodeType)&&(a.less={}),w=a.less,x=a.less.tree={},w.mode="browser";var w,x;w===b&&(w=exports,x=c("./tree"),w.mode="node"),w.Parser=function(a){function d(){D=y,G.push({current:C,i:y,j:z})}function e(){var a=G.pop();C=a.current,D=y=a.i,z=a.j}function f(){G.pop()}function g(){y>D&&(C=C.slice(y-D),D=y)}function h(a,b){var c=a.charCodeAt(0|b);return 32>=c&&(32===c||10===c||9===c)}function i(a){var b,c,d=typeof a;return"string"===d?v.charAt(y)!==a?null:(l(1),a):(g(),(b=a.exec(C))?(c=b[0].length,l(c),"string"==typeof b?b:1===b.length?b[0]:b):null)}function j(a){y>D&&(C=C.slice(y-D),D=y);var b=a.exec(C);return b?(l(b[0].length),"string"==typeof b?b:1===b.length?b[0]:b):null}function k(a){return v.charAt(y)!==a?null:(l(1),a)}function l(a){for(var b,c=y,d=z,e=y-D,f=y+C.length-e,g=y+=a,h=v;f>y&&(b=h.charCodeAt(y),!(b>32))&&(32===b||10===b||9===b||13===b);y++);return C=C.slice(a+y-g+e),D=y,!C.length&&z<B.length-1?(C=B[++z],l(0),!0):c!==y||d!==z}function m(a,b){var c="[object Function]"===Object.prototype.toString.call(a)?a.call(F):i(a);return c?c:void o(b||("string"==typeof a?"expected '"+a+"' got '"+v.charAt(y)+"'":"unexpected token"))}function n(a,b){return v.charAt(y)===a?(l(1),a):void o(b||"expected '"+a+"' got '"+v.charAt(y)+"'")}function o(a,b){var c=new Error(a);throw c.index=y,c.type=b||"Syntax",c}function p(a){return"string"==typeof a?v.charAt(y)===a:a.test(C)}function q(a){return v.charAt(y)===a}function r(a,b){return a.filename&&b.currentFileInfo.filename&&a.filename!==b.currentFileInfo.filename?E.imports.contents[a.filename]:v}function s(a,b){for(var c=a+1,d=null,e=-1;--c>=0&&"\n"!==b.charAt(c);)e++;return"number"==typeof a&&(d=(b.slice(0,a).match(/\n/g)||"").length),{line:d,column:e}}function t(a,b,d){var e=d.currentFileInfo.filename;return"browser"!==w.mode&&"rhino"!==w.mode&&(e=c("path").resolve(e)),{lineNumber:s(a,b).line+1,fileName:e}}function u(a,b){var c=r(a,b),d=s(a.index,c),e=d.line,f=d.column,g=a.call&&s(a.call,c).line,h=c.split("\n");this.type=a.type||"Syntax",this.message=a.message,this.filename=a.filename||b.currentFileInfo.filename,this.index=a.index,this.line="number"==typeof e?e+1:null,this.callLine=g+1,this.callExtract=h[g],this.stack=a.stack,this.column=f,this.extract=[h[e-1],h[e],h[e+1]]}var v,y,z,A,B,C,D,E,F,G=[],H=a&&a.filename;a instanceof x.parseEnv||(a=new x.parseEnv(a));var I=this.imports={paths:a.paths||[],queue:[],files:a.files,contents:a.contents,contentsIgnoredChars:a.contentsIgnoredChars,mime:a.mime,error:null,push:function(b,c,d,e){var f=this;this.queue.push(b);var g=function(a,c,d){f.queue.splice(f.queue.indexOf(b),1);var g=d===H;f.files[d]=c,a&&!f.error&&(f.error=a),e(a,c,g,d)};w.Parser.importer?w.Parser.importer(b,c,g,a):w.Parser.fileLoader(b,c,function(b,e,f,h){if(b)return void g(b);var i=new x.parseEnv(a);i.currentFileInfo=h,i.processImports=!1,i.contents[f]=e,(c.reference||d.reference)&&(h.reference=!0),d.inline?g(null,e,f):new w.Parser(i).parse(e,function(a,b){g(a,b,f)})},a)}},J=j;return u.prototype=new Error,u.prototype.constructor=u,this.env=a=a||{},this.optimization="optimization"in this.env?this.env.optimization:1,E={imports:I,parse:function(d,e,f){var g,h,i,j,k,l=null,m="";if(y=z=D=A=0,j=f&&f.globalVars?w.Parser.serializeVars(f.globalVars)+"\n":"",k=f&&f.modifyVars?"\n"+w.Parser.serializeVars(f.modifyVars):"",(j||f&&f.banner)&&(m=(f&&f.banner?f.banner:"")+j,E.imports.contentsIgnoredChars[a.currentFileInfo.filename]=m.length),d=d.replace(/\r\n/g,"\n"),v=d=m+d.replace(/^\uFEFF/,"")+k,E.imports.contents[a.currentFileInfo.filename]=d,B=function(b){function c(b,c){l=new u({index:c||i,type:"Parse",message:b,filename:a.currentFileInfo.filename},a)}function d(a){var c=i-s;512>c&&!a||!c||(r.push(b.slice(s,i+1)),s=i+1)}var e,f,g,h,i,j,k,m,n,o=b.length,p=0,q=0,r=[],s=0;for(i=0;o>i;i++)if(k=b.charCodeAt(i),!(k>=97&&122>=k||34>k))switch(k){case 40:q++,f=i;continue;case 41:if(--q<0)return c("missing opening `(`");continue;case 59:q||d();continue;case 123:p++,e=i;continue;case 125:if(--p<0)return c("missing opening `{`");p||q||d();continue;case 92:if(o-1>i){i++;continue}return c("unescaped `\\`");case 34:case 39:case 96:for(n=0,j=i,i+=1;o>i;i++)if(m=b.charCodeAt(i),!(m>96)){if(m==k){n=1;break}if(92==m){if(i==o-1)return c("unescaped `\\`");i++}}if(n)continue;return c("unmatched `"+String.fromCharCode(k)+"`",j);case 47:if(q||i==o-1)continue;if(m=b.charCodeAt(i+1),47==m)for(i+=2;o>i&&(m=b.charCodeAt(i),!(13>=m)||10!=m&&13!=m);i++);else if(42==m){for(g=j=i,i+=2;o-1>i&&(m=b.charCodeAt(i),125==m&&(h=i),42!=m||47!=b.charCodeAt(i+1));i++);if(i==o-1)return c("missing closing `*/`",j);i++}continue;case 42:if(o-1>i&&47==b.charCodeAt(i+1))return c("unmatched `/*`");continue}return 0!==p?g>e&&h>g?c("missing closing `}` or `*/`",e):c("missing closing `}`",e):0!==q?c("missing closing `)`",f):(d(!0),r)}(d),l)return e(new u(l,a));C=B[0];try{g=new x.Ruleset(null,this.parsers.primary()),g.root=!0,g.firstRoot=!0}catch(n){return e(new u(n,a))}if(g.toCSS=function(d){return function(e,f){e=e||{};var g,h,i=new x.evalEnv(e);"object"!=typeof f||Array.isArray(f)||(f=Object.keys(f).map(function(a){var b=f[a];return b instanceof x.Value||(b instanceof x.Expression||(b=new x.Expression([b])),b=new x.Value([b])),new x.Rule("@"+a,b,!1,null,0)}),i.frames=[new x.Ruleset(null,f)]);try{var j,k=[],l=[new x.joinSelectorVisitor,new x.processExtendsVisitor,new x.toCSSVisitor({compress:Boolean(e.compress)})],m=this;if(e.plugins)for(j=0;j<e.plugins.length;j++)e.plugins[j].isPreEvalVisitor?k.push(e.plugins[j]):e.plugins[j].isPreVisitor?l.splice(0,0,e.plugins[j]):l.push(e.plugins[j]);for(j=0;j<k.length;j++)k[j].run(m);for(g=d.call(m,i),j=0;j<l.length;j++)l[j].run(g);e.sourceMap&&(g=new x.sourceMapOutput({contentsIgnoredCharsMap:E.imports.contentsIgnoredChars,writeSourceMap:e.writeSourceMap,rootNode:g,contentsMap:E.imports.contents,sourceMapFilename:e.sourceMapFilename,sourceMapURL:e.sourceMapURL,outputFilename:e.sourceMapOutputFilename,sourceMapBasepath:e.sourceMapBasepath,sourceMapRootpath:e.sourceMapRootpath,outputSourceFiles:e.outputSourceFiles,sourceMapGenerator:e.sourceMapGenerator})),h=g.toCSS({compress:Boolean(e.compress),dumpLineNumbers:a.dumpLineNumbers,strictUnits:Boolean(e.strictUnits),numPrecision:8})}catch(n){throw new u(n,a)}if(e.cleancss&&"node"===w.mode){var o=c("clean-css"),p=e.cleancssOptions||{};return p.keepSpecialComments===b&&(p.keepSpecialComments="*"),p.processImport=!1,p.noRebase=!0,p.noAdvanced===b&&(p.noAdvanced=!0),new o(p).minify(h)}return e.compress?h.replace(/(^(\s)+)|((\s)+$)/g,""):h}}(g.eval),y<v.length-1){y=A;var o=s(y,v);i=v.split("\n"),h=o.line+1,l={type:"Parse",message:"Unrecognised input",index:y,filename:a.currentFileInfo.filename,line:h,column:o.column,extract:[i[h-2],i[h-1],i[h]]}}var p=function(b){return b=l||b||E.imports.error,b?(b instanceof u||(b=new u(b,a)),e(b)):e(null,g)};return a.processImports===!1?p():void new x.importVisitor(this.imports,p).run(g)},parsers:F={primary:function(){for(var a,b=this.mixin,c=J,d=[];C;){if(a=this.extendRule()||b.definition()||this.rule()||this.ruleset()||b.call()||this.comment()||this.rulesetCall()||this.directive())d.push(a);else if(!c(/^[\s\n]+/)&&!c(/^;+/))break;if(q("}"))break}return d},comment:function(){var b;if("/"===v.charAt(y))return"/"===v.charAt(y+1)?new x.Comment(j(/^\/\/.*/),!0,y,a.currentFileInfo):(b=j(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/),b?new x.Comment(b,!1,y,a.currentFileInfo):void 0)},comments:function(){for(var a,b=[];;){if(a=this.comment(),!a)break;b.push(a)}return b},entities:{quoted:function(){var b,c,d=y,e=y;return"~"===v.charAt(d)&&(d++,c=!0),'"'===v.charAt(d)||"'"===v.charAt(d)?(c&&k("~"),b=j(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/),b?new x.Quoted(b[0],b[1]||b[2],c,e,a.currentFileInfo):void 0):void 0},keyword:function(){var a;if(a=j(/^%|^[_A-Za-z-][_A-Za-z0-9-]*/)){var b=x.Color.fromKeyword(a);return b?b:new x.Keyword(a)}},call:function(){var b,c,d,e,f=y;if(b=/^([\w-]+|%|progid:[\w\.]+)\(/.exec(C)){if(b=b[1],c=b.toLowerCase(),"url"===c)return null;if(y+=b.length,"alpha"===c&&(e=F.alpha(),"undefined"!=typeof e))return e;if(k("("),d=this.arguments(),k(")"))return b?new x.Call(b,d,f,a.currentFileInfo):void 0}},arguments:function(){for(var a,b=[];;){if(a=this.assignment()||F.expression(),!a)break;if(b.push(a),!k(","))break}return b},literal:function(){return this.dimension()||this.color()||this.quoted()||this.unicodeDescriptor()},assignment:function(){var a,b;return a=j(/^\w+(?=\s?=)/i),a&&k("=")?(b=F.entity(),b?new x.Assignment(a,b):void 0):void 0},url:function(){var b;if("u"===v.charAt(y)&&j(/^url\(/))return b=this.quoted()||this.variable()||j(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/)||"",n(")"),new x.URL(null!=b.value||b instanceof x.Variable?b:new x.Anonymous(b),a.currentFileInfo)},variable:function(){var b,c=y;return"@"===v.charAt(y)&&(b=j(/^@@?[\w-]+/))?new x.Variable(b,c,a.currentFileInfo):void 0},variableCurly:function(){var b,c=y;return"@"===v.charAt(y)&&(b=j(/^@\{([\w-]+)\}/))?new x.Variable("@"+b[1],c,a.currentFileInfo):void 0},color:function(){var a;return"#"===v.charAt(y)&&(a=j(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/))?new x.Color(a[1]):void 0},dimension:function(){var a,b=v.charCodeAt(y);if(!(b>57||43>b||47===b||44==b))return a=j(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/),a?new x.Dimension(a[1],a[2]):void 0},unicodeDescriptor:function(){var a;return a=j(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/),a?new x.UnicodeDescriptor(a[0]):void 0},javascript:function(){var c,d,e=y;return"~"===v.charAt(e)&&(e++,d=!0),"`"===v.charAt(e)?(a.javascriptEnabled===b||a.javascriptEnabled||o("You are using JavaScript, which has been disabled."),d&&k("~"),c=j(/^`([^`]*)`/),c?new x.JavaScript(c[1],y,d):void 0):void 0}},variable:function(){var a;return"@"===v.charAt(y)&&(a=j(/^(@[\w-]+)\s*:/))?a[1]:void 0},rulesetCall:function(){var a;return"@"===v.charAt(y)&&(a=j(/^(@[\w-]+)\s*\(\s*\)\s*;/))?new x.RulesetCall(a[1]):void 0},extend:function(a){var b,c,d,e,f,g=y;if(j(a?/^&:extend\(/:/^:extend\(/)){do{for(d=null,b=null;!(d=j(/^(all)(?=\s*(\)|,))/))&&(c=this.element());)b?b.push(c):b=[c];d=d&&d[1],f=new x.Extend(new x.Selector(b),d,g),e?e.push(f):e=[f]}while(k(","));return m(/^\)/),a&&m(/^;/),e}},extendRule:function(){return this.extend(!0)},mixin:{call:function(){var b,c,g,h,i,l,m=v.charAt(y),o=!1,p=y;if("."===m||"#"===m){for(d();;){if(b=y,h=j(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/),!h)break;g=new x.Element(i,h,b,a.currentFileInfo),c?c.push(g):c=[g],i=k(">")}return c&&(k("(")&&(l=this.args(!0).args,n(")")),F.important()&&(o=!0),F.end())?(f(),new x.mixin.Call(c,l,p,a.currentFileInfo,o)):void e()}},args:function(a){var b,c,g,h,i,l,m=E.parsers,n=m.entities,p={args:null,variadic:!1},q=[],r=[],s=[];for(d();;){if(a)l=m.detachedRuleset()||m.expression();else{if(m.comments(),"."===v.charAt(y)&&j(/^\.{3}/)){p.variadic=!0,k(";")&&!b&&(b=!0),(b?r:s).push({variadic:!0});break}l=n.variable()||n.literal()||n.keyword()}if(!l)break;h=null,l.throwAwayComments&&l.throwAwayComments(),i=l;var t=null;if(a?l.value&&1==l.value.length&&(t=l.value[0]):t=l,t&&t instanceof x.Variable)if(k(":")){if(q.length>0&&(b&&o("Cannot mix ; and , as delimiter types"),c=!0),i=a&&m.detachedRuleset()||m.expression(),!i){if(!a)return e(),p.args=[],p;o("could not understand value for named argument")}h=g=t.name}else{if(!a&&j(/^\.{3}/)){p.variadic=!0,k(";")&&!b&&(b=!0),(b?r:s).push({name:l.name,variadic:!0});break}a||(g=h=t.name,i=null)}i&&q.push(i),s.push({name:h,value:i}),k(",")||(k(";")||b)&&(c&&o("Cannot mix ; and , as delimiter types"),b=!0,q.length>1&&(i=new x.Value(q)),r.push({name:g,value:i}),g=null,q=[],c=!1)}return f(),p.args=b?r:s,p},definition:function(){var a,b,c,g,h=[],i=!1;if(!("."!==v.charAt(y)&&"#"!==v.charAt(y)||p(/^[^{]*\}/)))if(d(),b=j(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/)){a=b[1];var l=this.args(!1);if(h=l.args,i=l.variadic,!k(")"))return A=y,void e();if(F.comments(),j(/^when/)&&(g=m(F.conditions,"expected condition")),c=F.block())return f(),new x.mixin.Definition(a,h,c,g,i);e()}else f()}},entity:function(){var a=this.entities;return a.literal()||a.variable()||a.url()||a.call()||a.keyword()||a.javascript()||this.comment()},end:function(){return k(";")||q("}")},alpha:function(){var a;if(j(/^\(opacity=/i))return a=j(/^\d+/)||this.entities.variable(),a?(n(")"),new x.Alpha(a)):void 0},element:function(){var b,c,g,h=y;return c=this.combinator(),b=j(/^(?:\d+\.\d+|\d+)%/)||j(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/)||k("*")||k("&")||this.attribute()||j(/^\([^()@]+\)/)||j(/^[\.#](?=@)/)||this.entities.variableCurly(),b||(d(),k("(")?(g=this.selector())&&k(")")?(b=new x.Paren(g),f()):e():f()),b?new x.Element(c,b,h,a.currentFileInfo):void 0},combinator:function(){var a=v.charAt(y);if(">"===a||"+"===a||"~"===a||"|"===a||"^"===a){for(y++,"^"===v.charAt(y)&&(a="^^",y++);h(v,y);)y++;return new x.Combinator(a)}return new x.Combinator(h(v,y-1)?" ":null)},lessSelector:function(){return this.selector(!0)},selector:function(b){for(var c,d,e,f,g,h,i,j=y,k=J;(b&&(g=this.extend())||b&&(h=k(/^when/))||(f=this.element()))&&(h?i=m(this.conditions,"expected condition"):i?o("CSS guard can only be used at the end of selector"):g?d?d.push(g):d=[g]:(d&&o("Extend can only be used at the end of selector"),e=v.charAt(y),c?c.push(f):c=[f],f=null),"{"!==e&&"}"!==e&&";"!==e&&","!==e&&")"!==e););return c?new x.Selector(c,d,i,j,a.currentFileInfo):void(d&&o("Extend must be used to extend a selector, it cannot be used on its own"))},attribute:function(){if(k("[")){var a,b,c,d=this.entities;return(a=d.variableCurly())||(a=m(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/)),c=j(/^[|~*$^]?=/),c&&(b=d.quoted()||j(/^[0-9]+%/)||j(/^[\w-]+/)||d.variableCurly()),n("]"),new x.Attribute(a,c,b)}},block:function(){var a;return k("{")&&(a=this.primary())&&k("}")?a:void 0},blockRuleset:function(){var a=this.block();return a&&(a=new x.Ruleset(null,a)),a},detachedRuleset:function(){var a=this.blockRuleset();return a?new x.DetachedRuleset(a):void 0},ruleset:function(){var b,c,g,h;for(d(),a.dumpLineNumbers&&(h=t(y,v,a));;){if(c=this.lessSelector(),!c)break;if(b?b.push(c):b=[c],this.comments(),c.condition&&b.length>1&&o("Guards are only currently allowed on a single selector."),!k(","))break;c.condition&&o("Guards are only currently allowed on a single selector."),this.comments()}if(b&&(g=this.block())){f();var i=new x.Ruleset(b,g,a.strictImports);return a.dumpLineNumbers&&(i.debugInfo=h),i}A=y,e()},rule:function(b){var c,g,h,i,j,k=y,l=v.charAt(k);if("."!==l&&"#"!==l&&"&"!==l)if(d(),c=this.variable()||this.ruleProperty()){if(j="string"==typeof c,j&&(g=this.detachedRuleset()),g||(g=b||!a.compress&&!j?this.anonymousValue()||this.value():this.value()||this.anonymousValue(),h=this.important(),i=!j&&c.pop().value),g&&this.end())return f(),new x.Rule(c,g,h,i,k,a.currentFileInfo);if(A=y,e(),g&&!b)return this.rule(!0)}else f()},anonymousValue:function(){var a;return a=/^([^@+\/'"*`(;{}-]*);/.exec(C),a?(y+=a[0].length-1,new x.Anonymous(a[1])):void 0},"import":function(){var b,c,g=y;d();var h=j(/^@import?\s+/),i=(h?this.importOptions():null)||{};return h&&(b=this.entities.quoted()||this.entities.url())&&(c=this.mediaFeatures(),k(";"))?(f(),c=c&&new x.Value(c),new x.Import(b,c,i,g,a.currentFileInfo)):void e()},importOptions:function(){var a,b,c,d={};if(!k("("))return null;do if(a=this.importOption()){switch(b=a,c=!0,b){case"css":b="less",c=!1;break;case"once":b="multiple",c=!1}if(d[b]=c,!k(","))break}while(a);return n(")"),d},importOption:function(){var a=j(/^(less|css|multiple|once|inline|reference)/);return a?a[1]:void 0},mediaFeature:function(){var b,c,d=this.entities,e=[];do if(b=d.keyword()||d.variable())e.push(b);else if(k("(")){if(c=this.property(),b=this.value(),!k(")"))return null;if(c&&b)e.push(new x.Paren(new x.Rule(c,b,null,null,y,a.currentFileInfo,!0)));else{if(!b)return null;e.push(new x.Paren(b))}}while(b);return e.length>0?new x.Expression(e):void 0},mediaFeatures:function(){var a,b=this.entities,c=[];do if(a=this.mediaFeature()){if(c.push(a),!k(","))break}else if(a=b.variable(),a&&(c.push(a),!k(",")))break;while(a);return c.length>0?c:null},media:function(){var b,c,d,e;return a.dumpLineNumbers&&(e=t(y,v,a)),j(/^@media/)&&(b=this.mediaFeatures(),c=this.block())?(d=new x.Media(c,b,y,a.currentFileInfo),a.dumpLineNumbers&&(d.debugInfo=e),d):void 0},directive:function(){var b,c,g,h,i,l,m,n=y,p=!0;if("@"===v.charAt(y)){if(c=this["import"]()||this.media())return c;if(d(),b=j(/^@[a-z-]+/)){switch(h=b,"-"==b.charAt(1)&&b.indexOf("-",2)>0&&(h="@"+b.slice(b.indexOf("-",2)+1)),h){case"@charset":i=!0,p=!1;break;case"@namespace":l=!0,p=!1;break;case"@keyframes":i=!0;break;case"@host":case"@page":case"@document":case"@supports":m=!0}return i?(c=this.entity(),c||o("expected "+b+" identifier")):l?(c=this.expression(),c||o("expected "+b+" expression")):m&&(c=(j(/^[^{;]+/)||"").trim(),c&&(c=new x.Anonymous(c))),p&&(g=this.blockRuleset()),g||!p&&c&&k(";")?(f(),new x.Directive(b,c,g,n,a.currentFileInfo,a.dumpLineNumbers?t(n,v,a):null)):void e()}}},value:function(){var a,b=[];do if(a=this.expression(),a&&(b.push(a),!k(",")))break;while(a);return b.length>0?new x.Value(b):void 0},important:function(){return"!"===v.charAt(y)?j(/^! *important/):void 0},sub:function(){var a,b;return k("(")&&(a=this.addition())?(b=new x.Expression([a]),n(")"),b.parens=!0,b):void 0},multiplication:function(){var a,b,c,d,e;if(a=this.operand()){for(e=h(v,y-1);;){if(p(/^\/[*\/]/))break;if(c=k("/")||k("*"),!c)break;if(b=this.operand(),!b)break;a.parensInOp=!0,b.parensInOp=!0,d=new x.Operation(c,[d||a,b],e),e=h(v,y-1)}return d||a}},addition:function(){var a,b,c,d,e;if(a=this.multiplication()){for(e=h(v,y-1);;){if(c=j(/^[-+]\s+/)||!e&&(k("+")||k("-")),!c)break;if(b=this.multiplication(),!b)break;a.parensInOp=!0,b.parensInOp=!0,d=new x.Operation(c,[d||a,b],e),e=h(v,y-1)}return d||a}},conditions:function(){var a,b,c,d=y;if(a=this.condition()){for(;;){if(!p(/^,\s*(not\s*)?\(/)||!k(","))break;if(b=this.condition(),!b)break;c=new x.Condition("or",c||a,b,d)}return c||a}},condition:function(){var a,b,c,d,e=this.entities,f=y,g=!1;return j(/^not/)&&(g=!0),n("("),a=this.addition()||e.keyword()||e.quoted(),a?(d=j(/^(?:>=|<=|=<|[<=>])/),d?(b=this.addition()||e.keyword()||e.quoted(),b?c=new x.Condition(d,a,b,f,g):o("expected expression")):c=new x.Condition("=",a,new x.Keyword("true"),f,g),n(")"),j(/^and/)?new x.Condition("and",c,this.condition()):c):void 0},operand:function(){var a,b=this.entities,c=v.charAt(y+1);"-"!==v.charAt(y)||"@"!==c&&"("!==c||(a=k("-"));var d=this.sub()||b.dimension()||b.color()||b.variable()||b.call();return a&&(d.parensInOp=!0,d=new x.Negative(d)),d},expression:function(){var a,b,c=[];do a=this.addition()||this.entity(),a&&(c.push(a),p(/^\/[\/*]/)||(b=k("/"),b&&c.push(new x.Anonymous(b))));while(a);return c.length>0?new x.Expression(c):void 0},property:function(){var a=j(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);return a?a[1]:void 0},ruleProperty:function(){function b(a){var b=a.exec(e);return b?(g.push(y+h),h+=b[0].length,e=e.slice(b[1].length),f.push(b[1])):void 0}var c,d,e=C,f=[],g=[],h=0;for(b(/^(\*?)/);b(/^((?:[\w-]+)|(?:@\{[\w-]+\}))/););if(f.length>1&&b(/^\s*((?:\+_|\+)?)\s*:/)){for(l(h),""===f[0]&&(f.shift(),g.shift()),d=0;d<f.length;d++)c=f[d],f[d]="@"!==c.charAt(0)?new x.Keyword(c):new x.Variable("@"+c.slice(2,-1),g[d],a.currentFileInfo);return f}}}}},w.Parser.serializeVars=function(a){var b="";for(var c in a)if(Object.hasOwnProperty.call(a,c)){var d=a[c];b+=("@"===c[0]?"":"@")+c+": "+d+(";"===(""+d).slice(-1)?"":";")}return b},function(d){function e(a,b,c){if(!(c instanceof d.Dimension))throw{type:"Argument",message:"argument must be a number"};return null==b?b=c.unit:c=c.unify(),new d.Dimension(a(parseFloat(c.value)),b)}function f(a,b,c){var e,f,g,h,i=b.alpha,j=c.alpha,k=[];g=j+i*(1-j);for(var l=0;3>l;l++)e=b.rgb[l]/255,f=c.rgb[l]/255,h=a(e,f),g&&(h=(j*f+i*(e-j*(e+f-h)))/g),k[l]=255*h;return new d.Color(k,g)}function g(){var a,b=d.functions;for(a in l)l.hasOwnProperty(a)&&(b[a]=e.bind(null,Math[a],l[a]));for(a in m)m.hasOwnProperty(a)&&(b[a]=f.bind(null,m[a]));a=d.defaultFunc,b["default"]=a.eval.bind(a)}function h(a){return d.functions.hsla(a.h,a.s,a.l,a.a)}function i(a,b){return a instanceof d.Dimension&&a.unit.is("%")?parseFloat(a.value*b/100):j(a)}function j(a){if(a instanceof d.Dimension)return parseFloat(a.unit.is("%")?a.value/100:a.value);if("number"==typeof a)return a;throw{error:"RuntimeError",message:"color functions take numbers as parameters"}}function k(a){return Math.min(1,Math.max(0,a))}d.functions={rgb:function(a,b,c){return this.rgba(a,b,c,1)},rgba:function(a,b,c,e){var f=[a,b,c].map(function(a){return i(a,255)});return e=j(e),new d.Color(f,e)},hsl:function(a,b,c){return this.hsla(a,b,c,1)},hsla:function(a,b,c,d){function e(a){return a=0>a?a+1:a>1?a-1:a,1>6*a?g+(f-g)*a*6:1>2*a?f:2>3*a?g+(f-g)*(2/3-a)*6:g}a=j(a)%360/360,b=k(j(b)),c=k(j(c)),d=k(j(d));var f=.5>=c?c*(b+1):c+b-c*b,g=2*c-f;return this.rgba(255*e(a+1/3),255*e(a),255*e(a-1/3),d)},hsv:function(a,b,c){return this.hsva(a,b,c,1)},hsva:function(a,b,c,d){a=j(a)%360/360*360,b=j(b),c=j(c),d=j(d);var e,f;e=Math.floor(a/60%6),f=a/60-e;var g=[c,c*(1-b),c*(1-f*b),c*(1-(1-f)*b)],h=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]];return this.rgba(255*g[h[e][0]],255*g[h[e][1]],255*g[h[e][2]],d)},hue:function(a){return new d.Dimension(Math.round(a.toHSL().h))},saturation:function(a){return new d.Dimension(Math.round(100*a.toHSL().s),"%")},lightness:function(a){return new d.Dimension(Math.round(100*a.toHSL().l),"%")},hsvhue:function(a){return new d.Dimension(Math.round(a.toHSV().h))},hsvsaturation:function(a){return new d.Dimension(Math.round(100*a.toHSV().s),"%")},hsvvalue:function(a){return new d.Dimension(Math.round(100*a.toHSV().v),"%")},red:function(a){return new d.Dimension(a.rgb[0])},green:function(a){return new d.Dimension(a.rgb[1])},blue:function(a){return new d.Dimension(a.rgb[2])},alpha:function(a){return new d.Dimension(a.toHSL().a)},luma:function(a){return new d.Dimension(Math.round(a.luma()*a.alpha*100),"%")},luminance:function(a){var b=.2126*a.rgb[0]/255+.7152*a.rgb[1]/255+.0722*a.rgb[2]/255;return new d.Dimension(Math.round(b*a.alpha*100),"%")},saturate:function(a,b){if(!a.rgb)return null;var c=a.toHSL();return c.s+=b.value/100,c.s=k(c.s),h(c)},desaturate:function(a,b){var c=a.toHSL();return c.s-=b.value/100,c.s=k(c.s),h(c)},lighten:function(a,b){var c=a.toHSL();return c.l+=b.value/100,c.l=k(c.l),h(c)},darken:function(a,b){var c=a.toHSL();return c.l-=b.value/100,c.l=k(c.l),h(c)},fadein:function(a,b){var c=a.toHSL();return c.a+=b.value/100,c.a=k(c.a),h(c)},fadeout:function(a,b){var c=a.toHSL();return c.a-=b.value/100,c.a=k(c.a),h(c)},fade:function(a,b){var c=a.toHSL();return c.a=b.value/100,c.a=k(c.a),h(c)},spin:function(a,b){var c=a.toHSL(),d=(c.h+b.value)%360;return c.h=0>d?360+d:d,h(c)},mix:function(a,b,c){c||(c=new d.Dimension(50));var e=c.value/100,f=2*e-1,g=a.toHSL().a-b.toHSL().a,h=((f*g==-1?f:(f+g)/(1+f*g))+1)/2,i=1-h,j=[a.rgb[0]*h+b.rgb[0]*i,a.rgb[1]*h+b.rgb[1]*i,a.rgb[2]*h+b.rgb[2]*i],k=a.alpha*e+b.alpha*(1-e);return new d.Color(j,k)},greyscale:function(a){return this.desaturate(a,new d.Dimension(100))},contrast:function(a,b,c,d){if(!a.rgb)return null;if("undefined"==typeof c&&(c=this.rgba(255,255,255,1)),"undefined"==typeof b&&(b=this.rgba(0,0,0,1)),b.luma()>c.luma()){var e=c;c=b,b=e}return d="undefined"==typeof d?.43:j(d),a.luma()<d?c:b},e:function(a){return new d.Anonymous(a instanceof d.JavaScript?a.evaluated:a)},escape:function(a){return new d.Anonymous(encodeURI(a.value).replace(/=/g,"%3D").replace(/:/g,"%3A").replace(/#/g,"%23").replace(/;/g,"%3B").replace(/\(/g,"%28").replace(/\)/g,"%29"))},replace:function(a,b,c,e){var f=a.value;return f=f.replace(new RegExp(b.value,e?e.value:""),c.value),new d.Quoted(a.quote||"",f,a.escaped)},"%":function(a){for(var b=Array.prototype.slice.call(arguments,1),c=a.value,e=0;e<b.length;e++)c=c.replace(/%[sda]/i,function(a){var c=a.match(/s/i)?b[e].value:b[e].toCSS();return a.match(/[A-Z]$/)?encodeURIComponent(c):c});return c=c.replace(/%%/g,"%"),new d.Quoted(a.quote||"",c,a.escaped)
},unit:function(a,b){if(!(a instanceof d.Dimension))throw{type:"Argument",message:"the first argument to unit must be a number"+(a instanceof d.Operation?". Have you forgotten parenthesis?":"")};return b=b?b instanceof d.Keyword?b.value:b.toCSS():"",new d.Dimension(a.value,b)},convert:function(a,b){return a.convertTo(b.value)},round:function(a,b){var c="undefined"==typeof b?0:b.value;return e(function(a){return a.toFixed(c)},null,a)},pi:function(){return new d.Dimension(Math.PI)},mod:function(a,b){return new d.Dimension(a.value%b.value,a.unit)},pow:function(a,b){if("number"==typeof a&&"number"==typeof b)a=new d.Dimension(a),b=new d.Dimension(b);else if(!(a instanceof d.Dimension&&b instanceof d.Dimension))throw{type:"Argument",message:"arguments must be numbers"};return new d.Dimension(Math.pow(a.value,b.value),a.unit)},_minmax:function(a,c){switch(c=Array.prototype.slice.call(c),c.length){case 0:throw{type:"Argument",message:"one or more arguments required"}}var e,f,g,h,i,j,k,l,m=[],n={};for(e=0;e<c.length;e++)if(g=c[e],g instanceof d.Dimension)if(h=""===g.unit.toString()&&l!==b?new d.Dimension(g.value,l).unify():g.unify(),j=""===h.unit.toString()&&k!==b?k:h.unit.toString(),k=""!==j&&k===b||""!==j&&""===m[0].unify().unit.toString()?j:k,l=""!==j&&l===b?g.unit.toString():l,f=n[""]!==b&&""!==j&&j===k?n[""]:n[j],f!==b)i=""===m[f].unit.toString()&&l!==b?new d.Dimension(m[f].value,l).unify():m[f].unify(),(a&&h.value<i.value||!a&&h.value>i.value)&&(m[f]=g);else{if(k!==b&&j!==k)throw{type:"Argument",message:"incompatible types"};n[j]=m.length,m.push(g)}else Array.isArray(c[e].value)&&Array.prototype.push.apply(c,Array.prototype.slice.call(c[e].value));return 1==m.length?m[0]:(c=m.map(function(a){return a.toCSS(this.env)}).join(this.env.compress?",":", "),new d.Anonymous((a?"min":"max")+"("+c+")"))},min:function(){return this._minmax(!0,arguments)},max:function(){return this._minmax(!1,arguments)},"get-unit":function(a){return new d.Anonymous(a.unit)},argb:function(a){return new d.Anonymous(a.toARGB())},percentage:function(a){return new d.Dimension(100*a.value,"%")},color:function(a){if(a instanceof d.Quoted){var b,c=a.value;if(b=d.Color.fromKeyword(c))return b;if(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(c))return new d.Color(c.slice(1));throw{type:"Argument",message:"argument must be a color keyword or 3/6 digit hex e.g. #FFF"}}throw{type:"Argument",message:"argument must be a string"}},iscolor:function(a){return this._isa(a,d.Color)},isnumber:function(a){return this._isa(a,d.Dimension)},isstring:function(a){return this._isa(a,d.Quoted)},iskeyword:function(a){return this._isa(a,d.Keyword)},isurl:function(a){return this._isa(a,d.URL)},ispixel:function(a){return this.isunit(a,"px")},ispercentage:function(a){return this.isunit(a,"%")},isem:function(a){return this.isunit(a,"em")},isunit:function(a,b){return a instanceof d.Dimension&&a.unit.is(b.value||b)?d.True:d.False},_isa:function(a,b){return a instanceof b?d.True:d.False},tint:function(a,b){return this.mix(this.rgb(255,255,255),a,b)},shade:function(a,b){return this.mix(this.rgb(0,0,0),a,b)},extract:function(a,b){return b=b.value-1,Array.isArray(a.value)?a.value[b]:Array(a)[b]},length:function(a){var b=Array.isArray(a.value)?a.value.length:1;return new d.Dimension(b)},"data-uri":function(b,e){if("undefined"!=typeof a)return new d.URL(e||b,this.currentFileInfo).eval(this.env);var f=b.value,g=e&&e.value,h=c("fs"),i=c("path"),j=!1;if(arguments.length<2&&(g=f),this.env.isPathRelative(g)&&(g=this.currentFileInfo.relativeUrls?i.join(this.currentFileInfo.currentDirectory,g):i.join(this.currentFileInfo.entryPath,g)),arguments.length<2){var k;try{k=c("mime")}catch(l){k=d._mime}f=k.lookup(g);var m=k.charsets.lookup(f);j=["US-ASCII","UTF-8"].indexOf(m)<0,j&&(f+=";base64")}else j=/;base64$/.test(f);var n=h.readFileSync(g),o=32,p=parseInt(n.length/1024,10);if(p>=o&&this.env.ieCompat!==!1)return this.env.silent||console.warn("Skipped data-uri embedding of %s because its size (%dKB) exceeds IE8-safe %dKB!",g,p,o),new d.URL(e||b,this.currentFileInfo).eval(this.env);n=j?n.toString("base64"):encodeURIComponent(n);var q='"data:'+f+","+n+'"';return new d.URL(new d.Anonymous(q))},"svg-gradient":function(a){function e(){throw{type:"Argument",message:"svg-gradient expects direction, start_color [start_position], [color position,]..., end_color [end_position]"}}arguments.length<3&&e();var f,g,h,i,j,k,l,m=Array.prototype.slice.call(arguments,1),n="linear",o='x="0" y="0" width="1" height="1"',p=!0,q={compress:!1},r=a.toCSS(q);switch(r){case"to bottom":f='x1="0%" y1="0%" x2="0%" y2="100%"';break;case"to right":f='x1="0%" y1="0%" x2="100%" y2="0%"';break;case"to bottom right":f='x1="0%" y1="0%" x2="100%" y2="100%"';break;case"to top right":f='x1="0%" y1="100%" x2="100%" y2="0%"';break;case"ellipse":case"ellipse at center":n="radial",f='cx="50%" cy="50%" r="75%"',o='x="-50" y="-50" width="101" height="101"';break;default:throw{type:"Argument",message:"svg-gradient direction must be 'to bottom', 'to right', 'to bottom right', 'to top right' or 'ellipse at center'"}}for(g='<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"><'+n+'Gradient id="gradient" gradientUnits="userSpaceOnUse" '+f+">",h=0;h<m.length;h+=1)m[h].value?(i=m[h].value[0],j=m[h].value[1]):(i=m[h],j=b),i instanceof d.Color&&((0===h||h+1===m.length)&&j===b||j instanceof d.Dimension)||e(),k=j?j.toCSS(q):0===h?"0%":"100%",l=i.alpha,g+='<stop offset="'+k+'" stop-color="'+i.toRGB()+'"'+(1>l?' stop-opacity="'+l+'"':"")+"/>";if(g+="</"+n+"Gradient><rect "+o+' fill="url(#gradient)" /></svg>',p)try{g=c("./encoder").encodeBase64(g)}catch(s){p=!1}return g="'data:image/svg+xml"+(p?";base64":"")+","+g+"'",new d.URL(new d.Anonymous(g))}},d._mime={_types:{".htm":"text/html",".html":"text/html",".gif":"image/gif",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png"},lookup:function(a){var e=c("path").extname(a),f=d._mime._types[e];if(f===b)throw new Error('Optional dependency "mime" is required for '+e);return f},charsets:{lookup:function(a){return a&&/^text\//.test(a)?"UTF-8":""}}};var l={ceil:null,floor:null,sqrt:null,abs:null,tan:"",sin:"",cos:"",atan:"rad",asin:"rad",acos:"rad"},m={multiply:function(a,b){return a*b},screen:function(a,b){return a+b-a*b},overlay:function(a,b){return a*=2,1>=a?m.multiply(a,b):m.screen(a-1,b)},softlight:function(a,b){var c=1,d=a;return b>.5&&(d=1,c=a>.25?Math.sqrt(a):((16*a-12)*a+4)*a),a-(1-2*b)*d*(c-a)},hardlight:function(a,b){return m.overlay(b,a)},difference:function(a,b){return Math.abs(a-b)},exclusion:function(a,b){return a+b-2*a*b},average:function(a,b){return(a+b)/2},negation:function(a,b){return 1-Math.abs(a+b-1)}};d.defaultFunc={eval:function(){var a=this.value_,b=this.error_;if(b)throw b;return null!=a?a?d.True:d.False:void 0},value:function(a){this.value_=a},error:function(a){this.error_=a},reset:function(){this.value_=this.error_=null}},g(),d.fround=function(a,b){var c;return a&&null!=a.numPrecision?(c=Math.pow(10,a.numPrecision),Math.round(b*c)/c):b},d.functionCall=function(a,b){this.env=a,this.currentFileInfo=b},d.functionCall.prototype=d.functions}(c("./tree")),function(a){a.colors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}}(c("./tree")),function(a){a.debugInfo=function(b,c,d){var e="";if(b.dumpLineNumbers&&!b.compress)switch(b.dumpLineNumbers){case"comments":e=a.debugInfo.asComment(c);break;case"mediaquery":e=a.debugInfo.asMediaQuery(c);break;case"all":e=a.debugInfo.asComment(c)+(d||"")+a.debugInfo.asMediaQuery(c)}return e},a.debugInfo.asComment=function(a){return"/* line "+a.debugInfo.lineNumber+", "+a.debugInfo.fileName+" */\n"},a.debugInfo.asMediaQuery=function(a){return"@media -sass-debug-info{filename{font-family:"+("file://"+a.debugInfo.fileName).replace(/([.:\/\\])/g,function(a){return"\\"==a&&(a="/"),"\\"+a})+"}line{font-family:\\00003"+a.debugInfo.lineNumber+"}}\n"},a.find=function(a,b){for(var c,d=0;d<a.length;d++)if(c=b.call(a,a[d]))return c;return null},a.jsify=function(a){return Array.isArray(a.value)&&a.value.length>1?"["+a.value.map(function(a){return a.toCSS(!1)}).join(", ")+"]":a.toCSS(!1)},a.toCSS=function(a){var b=[];return this.genCSS(a,{add:function(a){b.push(a)},isEmpty:function(){return 0===b.length}}),b.join("")},a.outputRuleset=function(a,b,c){var d,e=c.length;if(a.tabLevel=(0|a.tabLevel)+1,a.compress){for(b.add("{"),d=0;e>d;d++)c[d].genCSS(a,b);return b.add("}"),void a.tabLevel--}var f="\n"+Array(a.tabLevel).join("  "),g=f+"  ";if(e){for(b.add(" {"+g),c[0].genCSS(a,b),d=1;e>d;d++)b.add(g),c[d].genCSS(a,b);b.add(f+"}")}else b.add(" {"+f+"}");a.tabLevel--}}(c("./tree")),function(a){a.Alpha=function(a){this.value=a},a.Alpha.prototype={type:"Alpha",accept:function(a){this.value=a.visit(this.value)},eval:function(b){return this.value.eval?new a.Alpha(this.value.eval(b)):this},genCSS:function(a,b){b.add("alpha(opacity="),this.value.genCSS?this.value.genCSS(a,b):b.add(this.value),b.add(")")},toCSS:a.toCSS}}(c("../tree")),function(a){a.Anonymous=function(a,b,c,d){this.value=a.value||a,this.index=b,this.mapLines=d,this.currentFileInfo=c},a.Anonymous.prototype={type:"Anonymous",eval:function(){return new a.Anonymous(this.value,this.index,this.currentFileInfo,this.mapLines)},compare:function(a){if(!a.toCSS)return-1;var b=this.toCSS(),c=a.toCSS();return b===c?0:c>b?-1:1},genCSS:function(a,b){b.add(this.value,this.currentFileInfo,this.index,this.mapLines)},toCSS:a.toCSS}}(c("../tree")),function(a){a.Assignment=function(a,b){this.key=a,this.value=b},a.Assignment.prototype={type:"Assignment",accept:function(a){this.value=a.visit(this.value)},eval:function(b){return this.value.eval?new a.Assignment(this.key,this.value.eval(b)):this},genCSS:function(a,b){b.add(this.key+"="),this.value.genCSS?this.value.genCSS(a,b):b.add(this.value)},toCSS:a.toCSS}}(c("../tree")),function(a){a.Call=function(a,b,c,d){this.name=a,this.args=b,this.index=c,this.currentFileInfo=d},a.Call.prototype={type:"Call",accept:function(a){this.args&&(this.args=a.visitArray(this.args))},eval:function(b){var c,d,e=this.args.map(function(a){return a.eval(b)}),f=this.name.toLowerCase();if(f in a.functions)try{if(d=new a.functionCall(b,this.currentFileInfo),c=d[f].apply(d,e),null!=c)return c}catch(g){throw{type:g.type||"Runtime",message:"error evaluating function `"+this.name+"`"+(g.message?": "+g.message:""),index:this.index,filename:this.currentFileInfo.filename}}return new a.Call(this.name,e,this.index,this.currentFileInfo)},genCSS:function(a,b){b.add(this.name+"(",this.currentFileInfo,this.index);for(var c=0;c<this.args.length;c++)this.args[c].genCSS(a,b),c+1<this.args.length&&b.add(", ");b.add(")")},toCSS:a.toCSS}}(c("../tree")),function(a){function b(a){return"#"+a.map(function(a){return a=c(Math.round(a),255),(16>a?"0":"")+a.toString(16)}).join("")}function c(a,b){return Math.min(Math.max(a,0),b)}a.Color=function(a,b){this.rgb=Array.isArray(a)?a:6==a.length?a.match(/.{2}/g).map(function(a){return parseInt(a,16)}):a.split("").map(function(a){return parseInt(a+a,16)}),this.alpha="number"==typeof b?b:1};var d="transparent";a.Color.prototype={type:"Color",eval:function(){return this},luma:function(){var a=this.rgb[0]/255,b=this.rgb[1]/255,c=this.rgb[2]/255;return a=.03928>=a?a/12.92:Math.pow((a+.055)/1.055,2.4),b=.03928>=b?b/12.92:Math.pow((b+.055)/1.055,2.4),c=.03928>=c?c/12.92:Math.pow((c+.055)/1.055,2.4),.2126*a+.7152*b+.0722*c},genCSS:function(a,b){b.add(this.toCSS(a))},toCSS:function(b,e){var f=b&&b.compress&&!e,g=a.fround(b,this.alpha);if(1>g)return 0===g&&this.isTransparentKeyword?d:"rgba("+this.rgb.map(function(a){return c(Math.round(a),255)}).concat(c(g,1)).join(","+(f?"":" "))+")";var h=this.toRGB();if(f){var i=h.split("");i[1]===i[2]&&i[3]===i[4]&&i[5]===i[6]&&(h="#"+i[1]+i[3]+i[5])}return h},operate:function(b,c,d){for(var e=[],f=this.alpha*(1-d.alpha)+d.alpha,g=0;3>g;g++)e[g]=a.operate(b,c,this.rgb[g],d.rgb[g]);return new a.Color(e,f)},toRGB:function(){return b(this.rgb)},toHSL:function(){var a,b,c=this.rgb[0]/255,d=this.rgb[1]/255,e=this.rgb[2]/255,f=this.alpha,g=Math.max(c,d,e),h=Math.min(c,d,e),i=(g+h)/2,j=g-h;if(g===h)a=b=0;else{switch(b=i>.5?j/(2-g-h):j/(g+h),g){case c:a=(d-e)/j+(e>d?6:0);break;case d:a=(e-c)/j+2;break;case e:a=(c-d)/j+4}a/=6}return{h:360*a,s:b,l:i,a:f}},toHSV:function(){var a,b,c=this.rgb[0]/255,d=this.rgb[1]/255,e=this.rgb[2]/255,f=this.alpha,g=Math.max(c,d,e),h=Math.min(c,d,e),i=g,j=g-h;if(b=0===g?0:j/g,g===h)a=0;else{switch(g){case c:a=(d-e)/j+(e>d?6:0);break;case d:a=(e-c)/j+2;break;case e:a=(c-d)/j+4}a/=6}return{h:360*a,s:b,v:i,a:f}},toARGB:function(){return b([255*this.alpha].concat(this.rgb))},compare:function(a){return a.rgb?a.rgb[0]===this.rgb[0]&&a.rgb[1]===this.rgb[1]&&a.rgb[2]===this.rgb[2]&&a.alpha===this.alpha?0:-1:-1}},a.Color.fromKeyword=function(b){if(b=b.toLowerCase(),a.colors.hasOwnProperty(b))return new a.Color(a.colors[b].slice(1));if(b===d){var c=new a.Color([0,0,0],0);return c.isTransparentKeyword=!0,c}}}(c("../tree")),function(a){a.Comment=function(a,b,c,d){this.value=a,this.silent=!!b,this.currentFileInfo=d},a.Comment.prototype={type:"Comment",genCSS:function(b,c){this.debugInfo&&c.add(a.debugInfo(b,this),this.currentFileInfo,this.index),c.add(this.value.trim())},toCSS:a.toCSS,isSilent:function(a){var b=this.currentFileInfo&&this.currentFileInfo.reference&&!this.isReferenced,c=a.compress&&!this.value.match(/^\/\*!/);return this.silent||b||c},eval:function(){return this},markReferenced:function(){this.isReferenced=!0}}}(c("../tree")),function(a){a.Condition=function(a,b,c,d,e){this.op=a.trim(),this.lvalue=b,this.rvalue=c,this.index=d,this.negate=e},a.Condition.prototype={type:"Condition",accept:function(a){this.lvalue=a.visit(this.lvalue),this.rvalue=a.visit(this.rvalue)},eval:function(a){var b,c=this.lvalue.eval(a),d=this.rvalue.eval(a),e=this.index;return b=function(a){switch(a){case"and":return c&&d;case"or":return c||d;default:if(c.compare)b=c.compare(d);else{if(!d.compare)throw{type:"Type",message:"Unable to perform comparison",index:e};b=d.compare(c)}switch(b){case-1:return"<"===a||"=<"===a||"<="===a;case 0:return"="===a||">="===a||"=<"===a||"<="===a;case 1:return">"===a||">="===a}}}(this.op),this.negate?!b:b}}}(c("../tree")),function(a){a.DetachedRuleset=function(a,b){this.ruleset=a,this.frames=b},a.DetachedRuleset.prototype={type:"DetachedRuleset",accept:function(a){this.ruleset=a.visit(this.ruleset)},eval:function(b){var c=this.frames||b.frames.slice(0);return new a.DetachedRuleset(this.ruleset,c)},callEval:function(b){return this.ruleset.eval(this.frames?new a.evalEnv(b,this.frames.concat(b.frames)):b)}}}(c("../tree")),function(a){a.Dimension=function(c,d){this.value=parseFloat(c),this.unit=d&&d instanceof a.Unit?d:new a.Unit(d?[d]:b)},a.Dimension.prototype={type:"Dimension",accept:function(a){this.unit=a.visit(this.unit)},eval:function(){return this},toColor:function(){return new a.Color([this.value,this.value,this.value])},genCSS:function(b,c){if(b&&b.strictUnits&&!this.unit.isSingular())throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: "+this.unit.toString());var d=a.fround(b,this.value),e=String(d);if(0!==d&&1e-6>d&&d>-1e-6&&(e=d.toFixed(20).replace(/0+$/,"")),b&&b.compress){if(0===d&&this.unit.isLength())return void c.add(e);d>0&&1>d&&(e=e.substr(1))}c.add(e),this.unit.genCSS(b,c)},toCSS:a.toCSS,operate:function(b,c,d){var e=a.operate(b,c,this.value,d.value),f=this.unit.clone();if("+"===c||"-"===c)if(0===f.numerator.length&&0===f.denominator.length)f.numerator=d.unit.numerator.slice(0),f.denominator=d.unit.denominator.slice(0);else if(0===d.unit.numerator.length&&0===f.denominator.length);else{if(d=d.convertTo(this.unit.usedUnits()),b.strictUnits&&d.unit.toString()!==f.toString())throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '"+f.toString()+"' and '"+d.unit.toString()+"'.");e=a.operate(b,c,this.value,d.value)}else"*"===c?(f.numerator=f.numerator.concat(d.unit.numerator).sort(),f.denominator=f.denominator.concat(d.unit.denominator).sort(),f.cancel()):"/"===c&&(f.numerator=f.numerator.concat(d.unit.denominator).sort(),f.denominator=f.denominator.concat(d.unit.numerator).sort(),f.cancel());return new a.Dimension(e,f)},compare:function(b){if(b instanceof a.Dimension){var c,d,e,f;if(this.unit.isEmpty()||b.unit.isEmpty())c=this,d=b;else if(c=this.unify(),d=b.unify(),0!==c.unit.compare(d.unit))return-1;return e=c.value,f=d.value,f>e?-1:e>f?1:0}return-1},unify:function(){return this.convertTo({length:"px",duration:"s",angle:"rad"})},convertTo:function(b){var c,d,e,f,g,h=this.value,i=this.unit.clone(),j={};if("string"==typeof b){for(c in a.UnitConversions)a.UnitConversions[c].hasOwnProperty(b)&&(j={},j[c]=b);b=j}g=function(a,b){return e.hasOwnProperty(a)?(b?h/=e[a]/e[f]:h*=e[a]/e[f],f):a};for(d in b)b.hasOwnProperty(d)&&(f=b[d],e=a.UnitConversions[d],i.map(g));return i.cancel(),new a.Dimension(h,i)}},a.UnitConversions={length:{m:1,cm:.01,mm:.001,"in":.0254,px:.0254/96,pt:.0254/72,pc:.0254/72*12},duration:{s:1,ms:.001},angle:{rad:1/(2*Math.PI),deg:1/360,grad:.0025,turn:1}},a.Unit=function(a,b,c){this.numerator=a?a.slice(0).sort():[],this.denominator=b?b.slice(0).sort():[],this.backupUnit=c},a.Unit.prototype={type:"Unit",clone:function(){return new a.Unit(this.numerator.slice(0),this.denominator.slice(0),this.backupUnit)},genCSS:function(a,b){this.numerator.length>=1?b.add(this.numerator[0]):this.denominator.length>=1?b.add(this.denominator[0]):a&&a.strictUnits||!this.backupUnit||b.add(this.backupUnit)},toCSS:a.toCSS,toString:function(){var a,b=this.numerator.join("*");for(a=0;a<this.denominator.length;a++)b+="/"+this.denominator[a];return b},compare:function(a){return this.is(a.toString())?0:-1},is:function(a){return this.toString()===a},isLength:function(){return Boolean(this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/))},isEmpty:function(){return 0===this.numerator.length&&0===this.denominator.length},isSingular:function(){return this.numerator.length<=1&&0===this.denominator.length},map:function(a){var b;for(b=0;b<this.numerator.length;b++)this.numerator[b]=a(this.numerator[b],!1);for(b=0;b<this.denominator.length;b++)this.denominator[b]=a(this.denominator[b],!0)},usedUnits:function(){var b,c,d={};c=function(a){return b.hasOwnProperty(a)&&!d[e]&&(d[e]=a),a};for(var e in a.UnitConversions)a.UnitConversions.hasOwnProperty(e)&&(b=a.UnitConversions[e],this.map(c));return d},cancel:function(){var a,b,c,d={};for(b=0;b<this.numerator.length;b++)a=this.numerator[b],c||(c=a),d[a]=(d[a]||0)+1;for(b=0;b<this.denominator.length;b++)a=this.denominator[b],c||(c=a),d[a]=(d[a]||0)-1;this.numerator=[],this.denominator=[];for(a in d)if(d.hasOwnProperty(a)){var e=d[a];if(e>0)for(b=0;e>b;b++)this.numerator.push(a);else if(0>e)for(b=0;-e>b;b++)this.denominator.push(a)}0===this.numerator.length&&0===this.denominator.length&&c&&(this.backupUnit=c),this.numerator.sort(),this.denominator.sort()}}}(c("../tree")),function(a){a.Directive=function(a,b,c,d,e,f){this.name=a,this.value=b,c&&(this.rules=c,this.rules.allowImports=!0),this.index=d,this.currentFileInfo=e,this.debugInfo=f},a.Directive.prototype={type:"Directive",accept:function(a){var b=this.value,c=this.rules;c&&(c=a.visit(c)),b&&(b=a.visit(b))},genCSS:function(b,c){var d=this.value,e=this.rules;c.add(this.name,this.currentFileInfo,this.index),d&&(c.add(" "),d.genCSS(b,c)),e?a.outputRuleset(b,c,[e]):c.add(";")},toCSS:a.toCSS,eval:function(b){var c=this.value,d=this.rules;return c&&(c=c.eval(b)),d&&(d=d.eval(b),d.root=!0),new a.Directive(this.name,c,d,this.index,this.currentFileInfo,this.debugInfo)},variable:function(b){return this.rules?a.Ruleset.prototype.variable.call(this.rules,b):void 0},find:function(){return this.rules?a.Ruleset.prototype.find.apply(this.rules,arguments):void 0},rulesets:function(){return this.rules?a.Ruleset.prototype.rulesets.apply(this.rules):void 0},markReferenced:function(){var a,b;if(this.isReferenced=!0,this.rules)for(b=this.rules.rules,a=0;a<b.length;a++)b[a].markReferenced&&b[a].markReferenced()}}}(c("../tree")),function(a){a.Element=function(b,c,d,e){this.combinator=b instanceof a.Combinator?b:new a.Combinator(b),this.value="string"==typeof c?c.trim():c?c:"",this.index=d,this.currentFileInfo=e},a.Element.prototype={type:"Element",accept:function(a){var b=this.value;this.combinator=a.visit(this.combinator),"object"==typeof b&&(this.value=a.visit(b))},eval:function(b){return new a.Element(this.combinator,this.value.eval?this.value.eval(b):this.value,this.index,this.currentFileInfo)},genCSS:function(a,b){b.add(this.toCSS(a),this.currentFileInfo,this.index)},toCSS:function(a){var b=this.value.toCSS?this.value.toCSS(a):this.value;return""===b&&"&"===this.combinator.value.charAt(0)?"":this.combinator.toCSS(a||{})+b}},a.Attribute=function(a,b,c){this.key=a,this.op=b,this.value=c},a.Attribute.prototype={type:"Attribute",eval:function(b){return new a.Attribute(this.key.eval?this.key.eval(b):this.key,this.op,this.value&&this.value.eval?this.value.eval(b):this.value)},genCSS:function(a,b){b.add(this.toCSS(a))},toCSS:function(a){var b=this.key.toCSS?this.key.toCSS(a):this.key;return this.op&&(b+=this.op,b+=this.value.toCSS?this.value.toCSS(a):this.value),"["+b+"]"}},a.Combinator=function(a){this.value=" "===a?" ":a?a.trim():""},a.Combinator.prototype={type:"Combinator",_outputMap:{"":""," ":" ",":":" :","+":" + ","~":" ~ ",">":" > ","|":"|","^":" ^ ","^^":" ^^ "},_outputMapCompressed:{"":""," ":" ",":":" :","+":"+","~":"~",">":">","|":"|","^":"^","^^":"^^"},genCSS:function(a,b){b.add((a.compress?this._outputMapCompressed:this._outputMap)[this.value])},toCSS:a.toCSS}}(c("../tree")),function(a){a.Expression=function(a){this.value=a},a.Expression.prototype={type:"Expression",accept:function(a){this.value&&(this.value=a.visitArray(this.value))},eval:function(b){var c,d=this.parens&&!this.parensInOp,e=!1;return d&&b.inParenthesis(),this.value.length>1?c=new a.Expression(this.value.map(function(a){return a.eval(b)})):1===this.value.length?(this.value[0].parens&&!this.value[0].parensInOp&&(e=!0),c=this.value[0].eval(b)):c=this,d&&b.outOfParenthesis(),this.parens&&this.parensInOp&&!b.isMathOn()&&!e&&(c=new a.Paren(c)),c},genCSS:function(a,b){for(var c=0;c<this.value.length;c++)this.value[c].genCSS(a,b),c+1<this.value.length&&b.add(" ")},toCSS:a.toCSS,throwAwayComments:function(){this.value=this.value.filter(function(b){return!(b instanceof a.Comment)})}}}(c("../tree")),function(a){a.Extend=function(b,c,d){switch(this.selector=b,this.option=c,this.index=d,this.object_id=a.Extend.next_id++,this.parent_ids=[this.object_id],c){case"all":this.allowBefore=!0,this.allowAfter=!0;break;default:this.allowBefore=!1,this.allowAfter=!1}},a.Extend.next_id=0,a.Extend.prototype={type:"Extend",accept:function(a){this.selector=a.visit(this.selector)},eval:function(b){return new a.Extend(this.selector.eval(b),this.option,this.index)},clone:function(){return new a.Extend(this.selector,this.option,this.index)},findSelfSelectors:function(a){var b,c,d=[];for(b=0;b<a.length;b++)c=a[b].elements,b>0&&c.length&&""===c[0].combinator.value&&(c[0].combinator.value=" "),d=d.concat(a[b].elements);this.selfSelectors=[{elements:d}]}}}(c("../tree")),function(a){a.Import=function(a,c,d,e,f){if(this.options=d,this.index=e,this.path=a,this.features=c,this.currentFileInfo=f,this.options.less!==b||this.options.inline)this.css=!this.options.less||this.options.inline;else{var g=this.getPath();g&&/css([\?;].*)?$/.test(g)&&(this.css=!0)}},a.Import.prototype={type:"Import",accept:function(a){this.features&&(this.features=a.visit(this.features)),this.path=a.visit(this.path),!this.options.inline&&this.root&&(this.root=a.visit(this.root))},genCSS:function(a,b){this.css&&(b.add("@import ",this.currentFileInfo,this.index),this.path.genCSS(a,b),this.features&&(b.add(" "),this.features.genCSS(a,b)),b.add(";"))},toCSS:a.toCSS,getPath:function(){if(this.path instanceof a.Quoted){var c=this.path.value;return this.css!==b||/(\.[a-z]*$)|([\?;].*)$/.test(c)?c:c+".less"}return this.path instanceof a.URL?this.path.value.value:null},evalForImport:function(b){return new a.Import(this.path.eval(b),this.features,this.options,this.index,this.currentFileInfo)},evalPath:function(b){var c=this.path.eval(b),d=this.currentFileInfo&&this.currentFileInfo.rootpath;if(!(c instanceof a.URL)){if(d){var e=c.value;e&&b.isPathRelative(e)&&(c.value=d+e)}c.value=b.normalizePath(c.value)}return c},eval:function(b){var c,d=this.features&&this.features.eval(b);if(this.skip&&("function"==typeof this.skip&&(this.skip=this.skip()),this.skip))return[];if(this.options.inline){var e=new a.Anonymous(this.root,0,{filename:this.importedFilename},!0);return this.features?new a.Media([e],this.features.value):[e]}if(this.css){var f=new a.Import(this.evalPath(b),d,this.options,this.index);if(!f.css&&this.error)throw this.error;return f}return c=new a.Ruleset(null,this.root.rules.slice(0)),c.evalImports(b),this.features?new a.Media(c.rules,this.features.value):c.rules}}}(c("../tree")),function(a){a.JavaScript=function(a,b,c){this.escaped=c,this.expression=a,this.index=b},a.JavaScript.prototype={type:"JavaScript",eval:function(b){var c,d=this,e={},f=this.expression.replace(/@\{([\w-]+)\}/g,function(c,e){return a.jsify(new a.Variable("@"+e,d.index).eval(b))});try{f=new Function("return ("+f+")")}catch(g){throw{message:"JavaScript evaluation error: "+g.message+" from `"+f+"`",index:this.index}}var h=b.frames[0].variables();for(var i in h)h.hasOwnProperty(i)&&(e[i.slice(1)]={value:h[i].value,toJS:function(){return this.value.eval(b).toCSS()}});try{c=f.call(e)}catch(g){throw{message:"JavaScript evaluation error: '"+g.name+": "+g.message.replace(/["]/g,"'")+"'",index:this.index}}return"number"==typeof c?new a.Dimension(c):"string"==typeof c?new a.Quoted('"'+c+'"',c,this.escaped,this.index):new a.Anonymous(Array.isArray(c)?c.join(", "):c)}}}(c("../tree")),function(a){a.Keyword=function(a){this.value=a},a.Keyword.prototype={type:"Keyword",eval:function(){return this},genCSS:function(a,b){if("%"===this.value)throw{type:"Syntax",message:"Invalid % without number"};b.add(this.value)},toCSS:a.toCSS,compare:function(b){return b instanceof a.Keyword?b.value===this.value?0:1:-1}},a.True=new a.Keyword("true"),a.False=new a.Keyword("false")}(c("../tree")),function(a){a.Media=function(b,c,d,e){this.index=d,this.currentFileInfo=e;var f=this.emptySelectors();this.features=new a.Value(c),this.rules=[new a.Ruleset(f,b)],this.rules[0].allowImports=!0},a.Media.prototype={type:"Media",accept:function(a){this.features&&(this.features=a.visit(this.features)),this.rules&&(this.rules=a.visitArray(this.rules))},genCSS:function(b,c){c.add("@media ",this.currentFileInfo,this.index),this.features.genCSS(b,c),a.outputRuleset(b,c,this.rules)},toCSS:a.toCSS,eval:function(b){b.mediaBlocks||(b.mediaBlocks=[],b.mediaPath=[]);var c=new a.Media(null,[],this.index,this.currentFileInfo);this.debugInfo&&(this.rules[0].debugInfo=this.debugInfo,c.debugInfo=this.debugInfo);var d=!1;b.strictMath||(d=!0,b.strictMath=!0);try{c.features=this.features.eval(b)}finally{d&&(b.strictMath=!1)}return b.mediaPath.push(c),b.mediaBlocks.push(c),b.frames.unshift(this.rules[0]),c.rules=[this.rules[0].eval(b)],b.frames.shift(),b.mediaPath.pop(),0===b.mediaPath.length?c.evalTop(b):c.evalNested(b)},variable:function(b){return a.Ruleset.prototype.variable.call(this.rules[0],b)},find:function(){return a.Ruleset.prototype.find.apply(this.rules[0],arguments)},rulesets:function(){return a.Ruleset.prototype.rulesets.apply(this.rules[0])},emptySelectors:function(){var b=new a.Element("","&",this.index,this.currentFileInfo),c=[new a.Selector([b],null,null,this.index,this.currentFileInfo)];return c[0].mediaEmpty=!0,c},markReferenced:function(){var a,b=this.rules[0].rules;for(this.rules[0].markReferenced(),this.isReferenced=!0,a=0;a<b.length;a++)b[a].markReferenced&&b[a].markReferenced()},evalTop:function(b){var c=this;if(b.mediaBlocks.length>1){var d=this.emptySelectors();c=new a.Ruleset(d,b.mediaBlocks),c.multiMedia=!0}return delete b.mediaBlocks,delete b.mediaPath,c},evalNested:function(b){var c,d,e=b.mediaPath.concat([this]);for(c=0;c<e.length;c++)d=e[c].features instanceof a.Value?e[c].features.value:e[c].features,e[c]=Array.isArray(d)?d:[d];return this.features=new a.Value(this.permute(e).map(function(b){for(b=b.map(function(b){return b.toCSS?b:new a.Anonymous(b)}),c=b.length-1;c>0;c--)b.splice(c,0,new a.Anonymous("and"));return new a.Expression(b)})),new a.Ruleset([],[])},permute:function(a){if(0===a.length)return[];if(1===a.length)return a[0];for(var b=[],c=this.permute(a.slice(1)),d=0;d<c.length;d++)for(var e=0;e<a[0].length;e++)b.push([a[0][e]].concat(c[d]));return b},bubbleSelectors:function(b){b&&(this.rules=[new a.Ruleset(b.slice(0),[this.rules[0]])])}}}(c("../tree")),function(a){a.mixin={},a.mixin.Call=function(b,c,d,e,f){this.selector=new a.Selector(b),this.arguments=c&&c.length?c:null,this.index=d,this.currentFileInfo=e,this.important=f},a.mixin.Call.prototype={type:"MixinCall",accept:function(a){this.selector&&(this.selector=a.visit(this.selector)),this.arguments&&(this.arguments=a.visitArray(this.arguments))
},eval:function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o=[],p=!1,q=[],r=[],s=a.defaultFunc,t=0,u=1,v=2;for(e=this.arguments&&this.arguments.map(function(a){return{name:a.name,value:a.value.eval(b)}}),f=0;f<b.frames.length;f++)if((c=b.frames[f].find(this.selector)).length>0){for(j=!0,g=0;g<c.length;g++){for(d=c[g],i=!1,h=0;h<b.frames.length;h++)if(!(d instanceof a.mixin.Definition)&&d===(b.frames[h].originalRuleset||b.frames[h])){i=!0;break}if(!i&&d.matchArgs(e,b)){if(l={mixin:d,group:t},d.matchCondition){for(h=0;2>h;h++)s.value(h),r[h]=d.matchCondition(e,b);(r[0]||r[1])&&(r[0]!=r[1]&&(l.group=r[1]?u:v),q.push(l))}else q.push(l);p=!0}}for(s.reset(),n=[0,0,0],g=0;g<q.length;g++)n[q[g].group]++;if(n[t]>0)m=v;else if(m=u,n[u]+n[v]>1)throw{type:"Runtime",message:"Ambiguous use of `default()` found when matching for `"+this.format(e)+"`",index:this.index,filename:this.currentFileInfo.filename};for(g=0;g<q.length;g++)if(l=q[g].group,l===t||l===m)try{d=q[g].mixin,d instanceof a.mixin.Definition||(d=new a.mixin.Definition("",[],d.rules,null,!1),d.originalRuleset=c[g].originalRuleset||c[g]),Array.prototype.push.apply(o,d.evalCall(b,e,this.important).rules)}catch(w){throw{message:w.message,index:this.index,filename:this.currentFileInfo.filename,stack:w.stack}}if(p){if(!this.currentFileInfo||!this.currentFileInfo.reference)for(f=0;f<o.length;f++)k=o[f],k.markReferenced&&k.markReferenced();return o}}throw j?{type:"Runtime",message:"No matching definition was found for `"+this.format(e)+"`",index:this.index,filename:this.currentFileInfo.filename}:{type:"Name",message:this.selector.toCSS().trim()+" is undefined",index:this.index,filename:this.currentFileInfo.filename}},format:function(a){return this.selector.toCSS().trim()+"("+(a?a.map(function(a){var b="";return a.name&&(b+=a.name+":"),b+=a.value.toCSS?a.value.toCSS():"???"}).join(", "):"")+")"}},a.mixin.Definition=function(b,c,d,e,f,g){this.name=b,this.selectors=[new a.Selector([new a.Element(null,b,this.index,this.currentFileInfo)])],this.params=c,this.condition=e,this.variadic=f,this.arity=c.length,this.rules=d,this._lookups={},this.required=c.reduce(function(a,b){return!b.name||b.name&&!b.value?a+1:a},0),this.parent=a.Ruleset.prototype,this.frames=g},a.mixin.Definition.prototype={type:"MixinDefinition",accept:function(a){this.params&&this.params.length&&(this.params=a.visitArray(this.params)),this.rules=a.visitArray(this.rules),this.condition&&(this.condition=a.visit(this.condition))},variable:function(a){return this.parent.variable.call(this,a)},variables:function(){return this.parent.variables.call(this)},find:function(){return this.parent.find.apply(this,arguments)},rulesets:function(){return this.parent.rulesets.apply(this)},evalParams:function(b,c,d,e){var f,g,h,i,j,k,l,m,n=new a.Ruleset(null,null),o=this.params.slice(0),p=0;if(c=new a.evalEnv(c,[n].concat(c.frames)),d)for(d=d.slice(0),p=d.length,h=0;p>h;h++)if(g=d[h],k=g&&g.name){for(l=!1,i=0;i<o.length;i++)if(!e[i]&&k===o[i].name){e[i]=g.value.eval(b),n.prependRule(new a.Rule(k,g.value.eval(b))),l=!0;break}if(l){d.splice(h,1),h--;continue}throw{type:"Runtime",message:"Named argument for "+this.name+" "+d[h].name+" not found"}}for(m=0,h=0;h<o.length;h++)if(!e[h]){if(g=d&&d[m],k=o[h].name)if(o[h].variadic){for(f=[],i=m;p>i;i++)f.push(d[i].value.eval(b));n.prependRule(new a.Rule(k,new a.Expression(f).eval(b)))}else{if(j=g&&g.value)j=j.eval(b);else{if(!o[h].value)throw{type:"Runtime",message:"wrong number of arguments for "+this.name+" ("+p+" for "+this.arity+")"};j=o[h].value.eval(c),n.resetCache()}n.prependRule(new a.Rule(k,j)),e[h]=j}if(o[h].variadic&&d)for(i=m;p>i;i++)e[i]=d[i].value.eval(b);m++}return n},eval:function(b){return new a.mixin.Definition(this.name,this.params,this.rules,this.condition,this.variadic,this.frames||b.frames.slice(0))},evalCall:function(b,c,d){var e,f,g=[],h=this.frames?this.frames.concat(b.frames):b.frames,i=this.evalParams(b,new a.evalEnv(b,h),c,g);return i.prependRule(new a.Rule("@arguments",new a.Expression(g).eval(b))),e=this.rules.slice(0),f=new a.Ruleset(null,e),f.originalRuleset=this,f=f.eval(new a.evalEnv(b,[this,i].concat(h))),d&&(f=this.parent.makeImportant.apply(f)),f},matchCondition:function(b,c){return this.condition&&!this.condition.eval(new a.evalEnv(c,[this.evalParams(c,new a.evalEnv(c,this.frames.concat(c.frames)),b,[])].concat(this.frames).concat(c.frames)))?!1:!0},matchArgs:function(a,b){var c,d=a&&a.length||0;if(this.variadic){if(d<this.required-1)return!1}else{if(d<this.required)return!1;if(d>this.params.length)return!1}c=Math.min(d,this.arity);for(var e=0;c>e;e++)if(!this.params[e].name&&!this.params[e].variadic&&a[e].value.eval(b).toCSS()!=this.params[e].value.eval(b).toCSS())return!1;return!0}}}(c("../tree")),function(a){a.Negative=function(a){this.value=a},a.Negative.prototype={type:"Negative",accept:function(a){this.value=a.visit(this.value)},genCSS:function(a,b){b.add("-"),this.value.genCSS(a,b)},toCSS:a.toCSS,eval:function(b){return b.isMathOn()?new a.Operation("*",[new a.Dimension(-1),this.value]).eval(b):new a.Negative(this.value.eval(b))}}}(c("../tree")),function(a){a.Operation=function(a,b,c){this.op=a.trim(),this.operands=b,this.isSpaced=c},a.Operation.prototype={type:"Operation",accept:function(a){this.operands=a.visit(this.operands)},eval:function(b){var c=this.operands[0].eval(b),d=this.operands[1].eval(b);if(b.isMathOn()){if(c instanceof a.Dimension&&d instanceof a.Color&&(c=c.toColor()),d instanceof a.Dimension&&c instanceof a.Color&&(d=d.toColor()),!c.operate)throw{type:"Operation",message:"Operation on an invalid type"};return c.operate(b,this.op,d)}return new a.Operation(this.op,[c,d],this.isSpaced)},genCSS:function(a,b){this.operands[0].genCSS(a,b),this.isSpaced&&b.add(" "),b.add(this.op),this.isSpaced&&b.add(" "),this.operands[1].genCSS(a,b)},toCSS:a.toCSS},a.operate=function(a,b,c,d){switch(b){case"+":return c+d;case"-":return c-d;case"*":return c*d;case"/":return c/d}}}(c("../tree")),function(a){a.Paren=function(a){this.value=a},a.Paren.prototype={type:"Paren",accept:function(a){this.value=a.visit(this.value)},genCSS:function(a,b){b.add("("),this.value.genCSS(a,b),b.add(")")},toCSS:a.toCSS,eval:function(b){return new a.Paren(this.value.eval(b))}}}(c("../tree")),function(a){a.Quoted=function(a,b,c,d,e){this.escaped=c,this.value=b||"",this.quote=a.charAt(0),this.index=d,this.currentFileInfo=e},a.Quoted.prototype={type:"Quoted",genCSS:function(a,b){this.escaped||b.add(this.quote,this.currentFileInfo,this.index),b.add(this.value),this.escaped||b.add(this.quote)},toCSS:a.toCSS,eval:function(b){var c=this,d=this.value.replace(/`([^`]+)`/g,function(d,e){return new a.JavaScript(e,c.index,!0).eval(b).value}).replace(/@\{([\w-]+)\}/g,function(d,e){var f=new a.Variable("@"+e,c.index,c.currentFileInfo).eval(b,!0);return f instanceof a.Quoted?f.value:f.toCSS()});return new a.Quoted(this.quote+d+this.quote,d,this.escaped,this.index,this.currentFileInfo)},compare:function(a){if(!a.toCSS)return-1;var b=this.toCSS(),c=a.toCSS();return b===c?0:c>b?-1:1}}}(c("../tree")),function(a){function b(a,b){var c,d="",e=b.length,f={add:function(a){d+=a}};for(c=0;e>c;c++)b[c].eval(a).genCSS(a,f);return d}a.Rule=function(b,c,d,e,f,g,h){this.name=b,this.value=c instanceof a.Value||c instanceof a.Ruleset?c:new a.Value([c]),this.important=d?" "+d.trim():"",this.merge=e,this.index=f,this.currentFileInfo=g,this.inline=h||!1,this.variable=b.charAt&&"@"===b.charAt(0)},a.Rule.prototype={type:"Rule",accept:function(a){this.value=a.visit(this.value)},genCSS:function(a,b){b.add(this.name+(a.compress?":":": "),this.currentFileInfo,this.index);try{this.value.genCSS(a,b)}catch(c){throw c.index=this.index,c.filename=this.currentFileInfo.filename,c}b.add(this.important+(this.inline||a.lastRule&&a.compress?"":";"),this.currentFileInfo,this.index)},toCSS:a.toCSS,eval:function(c){var d,e=!1,f=this.name;"string"!=typeof f&&(f=1===f.length&&f[0]instanceof a.Keyword?f[0].value:b(c,f)),"font"!==f||c.strictMath||(e=!0,c.strictMath=!0);try{if(d=this.value.eval(c),!this.variable&&"DetachedRuleset"===d.type)throw{message:"Rulesets cannot be evaluated on a property.",index:this.index,filename:this.currentFileInfo.filename};return new a.Rule(f,d,this.important,this.merge,this.index,this.currentFileInfo,this.inline)}catch(g){throw"number"!=typeof g.index&&(g.index=this.index,g.filename=this.currentFileInfo.filename),g}finally{e&&(c.strictMath=!1)}},makeImportant:function(){return new a.Rule(this.name,this.value,"!important",this.merge,this.index,this.currentFileInfo,this.inline)}}}(c("../tree")),function(a){a.RulesetCall=function(a){this.variable=a},a.RulesetCall.prototype={type:"RulesetCall",accept:function(){},eval:function(b){var c=new a.Variable(this.variable).eval(b);return c.callEval(b)}}}(c("../tree")),function(a){a.Ruleset=function(a,b,c){this.selectors=a,this.rules=b,this._lookups={},this.strictImports=c},a.Ruleset.prototype={type:"Ruleset",accept:function(a){this.paths?a.visitArray(this.paths,!0):this.selectors&&(this.selectors=a.visitArray(this.selectors)),this.rules&&this.rules.length&&(this.rules=a.visitArray(this.rules))},eval:function(b){var c,d,e,f,g=this.selectors,h=a.defaultFunc,i=!1;if(g&&(d=g.length)){for(c=[],h.error({type:"Syntax",message:"it is currently only allowed in parametric mixin guards,"}),f=0;d>f;f++)e=g[f].eval(b),c.push(e),e.evaldCondition&&(i=!0);h.reset()}else i=!0;var j,k,l=this.rules?this.rules.slice(0):null,m=new a.Ruleset(c,l,this.strictImports);m.originalRuleset=this,m.root=this.root,m.firstRoot=this.firstRoot,m.allowImports=this.allowImports,this.debugInfo&&(m.debugInfo=this.debugInfo),i||(l.length=0);var n=b.frames;n.unshift(m);var o=b.selectors;o||(b.selectors=o=[]),o.unshift(this.selectors),(m.root||m.allowImports||!m.strictImports)&&m.evalImports(b);var p=m.rules,q=p?p.length:0;for(f=0;q>f;f++)(p[f]instanceof a.mixin.Definition||p[f]instanceof a.DetachedRuleset)&&(p[f]=p[f].eval(b));var r=b.mediaBlocks&&b.mediaBlocks.length||0;for(f=0;q>f;f++)p[f]instanceof a.mixin.Call?(l=p[f].eval(b).filter(function(b){return b instanceof a.Rule&&b.variable?!m.variable(b.name):!0}),p.splice.apply(p,[f,1].concat(l)),q+=l.length-1,f+=l.length-1,m.resetCache()):p[f]instanceof a.RulesetCall&&(l=p[f].eval(b).rules.filter(function(b){return b instanceof a.Rule&&b.variable?!1:!0}),p.splice.apply(p,[f,1].concat(l)),q+=l.length-1,f+=l.length-1,m.resetCache());for(f=0;f<p.length;f++)j=p[f],j instanceof a.mixin.Definition||j instanceof a.DetachedRuleset||(p[f]=j=j.eval?j.eval(b):j);for(f=0;f<p.length;f++)if(j=p[f],j instanceof a.Ruleset&&j.selectors&&1===j.selectors.length&&j.selectors[0].isJustParentSelector()){p.splice(f--,1);for(var s=0;s<j.rules.length;s++)k=j.rules[s],k instanceof a.Rule&&k.variable||p.splice(++f,0,k)}if(n.shift(),o.shift(),b.mediaBlocks)for(f=r;f<b.mediaBlocks.length;f++)b.mediaBlocks[f].bubbleSelectors(c);return m},evalImports:function(b){var c,d,e=this.rules;if(e)for(c=0;c<e.length;c++)e[c]instanceof a.Import&&(d=e[c].eval(b),d&&d.length?(e.splice.apply(e,[c,1].concat(d)),c+=d.length-1):e.splice(c,1,d),this.resetCache())},makeImportant:function(){return new a.Ruleset(this.selectors,this.rules.map(function(a){return a.makeImportant?a.makeImportant():a}),this.strictImports)},matchArgs:function(a){return!a||0===a.length},matchCondition:function(b,c){var d=this.selectors[this.selectors.length-1];return d.evaldCondition?d.condition&&!d.condition.eval(new a.evalEnv(c,c.frames))?!1:!0:!1},resetCache:function(){this._rulesets=null,this._variables=null,this._lookups={}},variables:function(){return this._variables||(this._variables=this.rules?this.rules.reduce(function(b,c){return c instanceof a.Rule&&c.variable===!0&&(b[c.name]=c),b},{}):{}),this._variables},variable:function(a){return this.variables()[a]},rulesets:function(){if(!this.rules)return null;var b,c,d=a.Ruleset,e=a.mixin.Definition,f=[],g=this.rules,h=g.length;for(b=0;h>b;b++)c=g[b],(c instanceof d||c instanceof e)&&f.push(c);return f},prependRule:function(a){var b=this.rules;b?b.unshift(a):this.rules=[a]},find:function(b,c){c=c||this;var d,e=[],f=b.toCSS();return f in this._lookups?this._lookups[f]:(this.rulesets().forEach(function(f){if(f!==c)for(var g=0;g<f.selectors.length;g++)if(d=b.match(f.selectors[g])){b.elements.length>d?Array.prototype.push.apply(e,f.find(new a.Selector(b.elements.slice(d)),c)):e.push(f);break}}),this._lookups[f]=e,e)},genCSS:function(b,c){var d,e,f,g,h,i,j=[],k=[];b.tabLevel=b.tabLevel||0,this.root||b.tabLevel++;var l,m=b.compress?"":Array(b.tabLevel+1).join("  "),n=b.compress?"":Array(b.tabLevel).join("  ");for(d=0;d<this.rules.length;d++)h=this.rules[d],h.rules||h instanceof a.Media||h instanceof a.Directive||this.root&&h instanceof a.Comment?k.push(h):j.push(h);if(!this.root){g=a.debugInfo(b,this,n),g&&(c.add(g),c.add(n));var o,p=this.paths,q=p.length;for(l=b.compress?",":",\n"+n,d=0;q>d;d++)if(i=p[d],o=i.length)for(d>0&&c.add(l),b.firstSelector=!0,i[0].genCSS(b,c),b.firstSelector=!1,e=1;o>e;e++)i[e].genCSS(b,c);c.add((b.compress?"{":" {\n")+m)}for(d=0;d<j.length;d++)h=j[d],d+1!==j.length||this.root&&0!==k.length&&!this.firstRoot||(b.lastRule=!0),h.genCSS?h.genCSS(b,c):h.value&&c.add(h.value.toString()),b.lastRule?b.lastRule=!1:c.add(b.compress?"":"\n"+m);if(this.root||(c.add(b.compress?"}":"\n"+n+"}"),b.tabLevel--),l=(b.compress?"":"\n")+(this.root?m:n),f=k.length)for(j.length&&l&&c.add(l),k[0].genCSS(b,c),d=1;f>d;d++)l&&c.add(l),k[d].genCSS(b,c);c.isEmpty()||b.compress||!this.firstRoot||c.add("\n")},toCSS:a.toCSS,markReferenced:function(){if(this.selectors)for(var a=0;a<this.selectors.length;a++)this.selectors[a].markReferenced()},joinSelectors:function(a,b,c){for(var d=0;d<c.length;d++)this.joinSelector(a,b,c[d])},joinSelector:function(b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;for(e=0;e<d.elements.length;e++)j=d.elements[e],"&"===j.value&&(h=!0);if(h){for(r=[],i=[[]],e=0;e<d.elements.length;e++)if(j=d.elements[e],"&"!==j.value)r.push(j);else{for(s=[],r.length>0&&this.mergeElementsOnToSelectors(r,i),f=0;f<i.length;f++)if(k=i[f],0===c.length)k.length>0&&(k[0].elements=k[0].elements.slice(0),k[0].elements.push(new a.Element(j.combinator,"",j.index,j.currentFileInfo))),s.push(k);else for(g=0;g<c.length;g++)l=c[g],m=[],n=[],p=!0,k.length>0?(m=k.slice(0),q=m.pop(),o=d.createDerived(q.elements.slice(0)),p=!1):o=d.createDerived([]),l.length>1&&(n=n.concat(l.slice(1))),l.length>0&&(p=!1,o.elements.push(new a.Element(j.combinator,l[0].elements[0].value,j.index,j.currentFileInfo)),o.elements=o.elements.concat(l[0].elements.slice(1))),p||m.push(o),m=m.concat(n),s.push(m);i=s,r=[]}for(r.length>0&&this.mergeElementsOnToSelectors(r,i),e=0;e<i.length;e++)i[e].length>0&&b.push(i[e])}else if(c.length>0)for(e=0;e<c.length;e++)b.push(c[e].concat(d));else b.push([d])},mergeElementsOnToSelectors:function(b,c){var d,e;if(0===c.length)return void c.push([new a.Selector(b)]);for(d=0;d<c.length;d++)e=c[d],e.length>0?e[e.length-1]=e[e.length-1].createDerived(e[e.length-1].elements.concat(b)):e.push(new a.Selector(b))}}}(c("../tree")),function(a){a.Selector=function(a,b,c,d,e,f){this.elements=a,this.extendList=b,this.condition=c,this.currentFileInfo=e||{},this.isReferenced=f,c||(this.evaldCondition=!0)},a.Selector.prototype={type:"Selector",accept:function(a){this.elements&&(this.elements=a.visitArray(this.elements)),this.extendList&&(this.extendList=a.visitArray(this.extendList)),this.condition&&(this.condition=a.visit(this.condition))},createDerived:function(b,c,d){d=null!=d?d:this.evaldCondition;var e=new a.Selector(b,c||this.extendList,null,this.index,this.currentFileInfo,this.isReferenced);return e.evaldCondition=d,e.mediaEmpty=this.mediaEmpty,e},match:function(a){var b,c,d=this.elements,e=d.length;if(a.CacheElements(),b=a._elements.length,0===b||b>e)return 0;for(c=0;b>c;c++)if(d[c].value!==a._elements[c])return 0;return b},CacheElements:function(){var a,b,c,d="";if(!this._elements){for(a=this.elements.length,c=0;a>c;c++)if(b=this.elements[c],d+=b.combinator.value,b.value.value){if("string"!=typeof b.value.value){d="";break}d+=b.value.value}else d+=b.value;this._elements=d.match(/[,&#\.\w-]([\w-]|(\\.))*/g),this._elements?"&"===this._elements[0]&&this._elements.shift():this._elements=[]}},isJustParentSelector:function(){return!this.mediaEmpty&&1===this.elements.length&&"&"===this.elements[0].value&&(" "===this.elements[0].combinator.value||""===this.elements[0].combinator.value)},eval:function(a){var b=this.condition&&this.condition.eval(a),c=this.elements,d=this.extendList;return c=c&&c.map(function(b){return b.eval(a)}),d=d&&d.map(function(b){return b.eval(a)}),this.createDerived(c,d,b)},genCSS:function(a,b){var c,d;if(a&&a.firstSelector||""!==this.elements[0].combinator.value||b.add(" ",this.currentFileInfo,this.index),!this._css)for(c=0;c<this.elements.length;c++)d=this.elements[c],d.genCSS(a,b)},toCSS:a.toCSS,markReferenced:function(){this.isReferenced=!0},getIsReferenced:function(){return!this.currentFileInfo.reference||this.isReferenced},getIsOutput:function(){return this.evaldCondition}}}(c("../tree")),function(a){a.UnicodeDescriptor=function(a){this.value=a},a.UnicodeDescriptor.prototype={type:"UnicodeDescriptor",genCSS:function(a,b){b.add(this.value)},toCSS:a.toCSS,eval:function(){return this}}}(c("../tree")),function(a){a.URL=function(a,b,c){this.value=a,this.currentFileInfo=b,this.isEvald=c},a.URL.prototype={type:"Url",accept:function(a){this.value=a.visit(this.value)},genCSS:function(a,b){b.add("url("),this.value.genCSS(a,b),b.add(")")},toCSS:a.toCSS,eval:function(b){var c,d=this.value.eval(b);if(!this.isEvald&&(c=this.currentFileInfo&&this.currentFileInfo.rootpath,c&&"string"==typeof d.value&&b.isPathRelative(d.value)&&(d.quote||(c=c.replace(/[\(\)'"\s]/g,function(a){return"\\"+a})),d.value=c+d.value),d.value=b.normalizePath(d.value),b.urlArgs&&!d.value.match(/^\s*data:/))){var e=-1===d.value.indexOf("?")?"?":"&",f=e+b.urlArgs;-1!==d.value.indexOf("#")?d.value=d.value.replace("#",f+"#"):d.value+=f}return new a.URL(d,this.currentFileInfo,!0)}}}(c("../tree")),function(a){a.Value=function(a){this.value=a},a.Value.prototype={type:"Value",accept:function(a){this.value&&(this.value=a.visitArray(this.value))},eval:function(b){return 1===this.value.length?this.value[0].eval(b):new a.Value(this.value.map(function(a){return a.eval(b)}))},genCSS:function(a,b){var c;for(c=0;c<this.value.length;c++)this.value[c].genCSS(a,b),c+1<this.value.length&&b.add(a&&a.compress?",":", ")},toCSS:a.toCSS}}(c("../tree")),function(a){a.Variable=function(a,b,c){this.name=a,this.index=b,this.currentFileInfo=c||{}},a.Variable.prototype={type:"Variable",eval:function(b){var c,d=this.name;if(0===d.indexOf("@@")&&(d="@"+new a.Variable(d.slice(1)).eval(b).value),this.evaluating)throw{type:"Name",message:"Recursive variable definition for "+d,filename:this.currentFileInfo.file,index:this.index};if(this.evaluating=!0,c=a.find(b.frames,function(a){var c=a.variable(d);return c?c.value.eval(b):void 0}))return this.evaluating=!1,c;throw{type:"Name",message:"variable "+d+" is undefined",filename:this.currentFileInfo.filename,index:this.index}}}}(c("../tree")),function(a){var b=["paths","optimization","files","contents","contentsIgnoredChars","relativeUrls","rootpath","strictImports","insecure","dumpLineNumbers","compress","processImports","syncImport","javascriptEnabled","mime","useFileCache","currentFileInfo"];a.parseEnv=function(a){if(d(a,this,b),this.contents||(this.contents={}),this.contentsIgnoredChars||(this.contentsIgnoredChars={}),this.files||(this.files={}),!this.currentFileInfo){var c=a&&a.filename||"input",e=c.replace(/[^\/\\]*$/,"");a&&(a.filename=null),this.currentFileInfo={filename:c,relativeUrls:this.relativeUrls,rootpath:a&&a.rootpath||"",currentDirectory:e,entryPath:e,rootFilename:c}}};var c=["silent","verbose","compress","yuicompress","ieCompat","strictMath","strictUnits","cleancss","sourceMap","importMultiple","urlArgs"];a.evalEnv=function(a,b){d(a,this,c),this.frames=b||[]},a.evalEnv.prototype.inParenthesis=function(){this.parensStack||(this.parensStack=[]),this.parensStack.push(!0)},a.evalEnv.prototype.outOfParenthesis=function(){this.parensStack.pop()},a.evalEnv.prototype.isMathOn=function(){return this.strictMath?this.parensStack&&this.parensStack.length:!0},a.evalEnv.prototype.isPathRelative=function(a){return!/^(?:[a-z-]+:|\/)/.test(a)},a.evalEnv.prototype.normalizePath=function(a){var b,c=a.split("/").reverse();for(a=[];0!==c.length;)switch(b=c.pop()){case".":break;case"..":0===a.length||".."===a[a.length-1]?a.push(b):a.pop();break;default:a.push(b)}return a.join("/")};var d=function(a,b,c){if(a)for(var d=0;d<c.length;d++)a.hasOwnProperty(c[d])&&(b[c[d]]=a[c[d]])}}(c("./tree")),function(a){function b(a){return a}function c(a,b){var d,e;for(d in a)if(a.hasOwnProperty(d))switch(e=a[d],typeof e){case"function":e.prototype&&e.prototype.type&&(e.prototype.typeIndex=b++);break;case"object":b=c(e,b)}return b}var d={visitDeeper:!0},e=!1;a.visitor=function(b){this._implementation=b,this._visitFnCache=[],e||(c(a,1),e=!0)},a.visitor.prototype={visit:function(a){if(!a)return a;var c=a.typeIndex;if(!c)return a;var e,f=this._visitFnCache,g=this._implementation,h=c<<1,i=1|h,j=f[h],k=f[i],l=d;if(l.visitDeeper=!0,j||(e="visit"+a.type,j=g[e]||b,k=g[e+"Out"]||b,f[h]=j,f[i]=k),j!==b){var m=j.call(g,a,l);g.isReplacing&&(a=m)}return l.visitDeeper&&a&&a.accept&&a.accept(this),k!=b&&k.call(g,a),a},visitArray:function(a,b){if(!a)return a;var c,d=a.length;if(b||!this._implementation.isReplacing){for(c=0;d>c;c++)this.visit(a[c]);return a}var e=[];for(c=0;d>c;c++){var f=this.visit(a[c]);f.splice?f.length&&this.flatten(f,e):e.push(f)}return e},flatten:function(a,b){b||(b=[]);var c,d,e,f,g,h;for(d=0,c=a.length;c>d;d++)if(e=a[d],e.splice)for(g=0,f=e.length;f>g;g++)h=e[g],h.splice?h.length&&this.flatten(h,b):b.push(h);else b.push(e);return b}}}(c("./tree")),function(a){a.importVisitor=function(b,c,d,e,f){if(this._visitor=new a.visitor(this),this._importer=b,this._finish=c,this.env=d||new a.evalEnv,this.importCount=0,this.onceFileDetectionMap=e||{},this.recursionDetector={},f)for(var g in f)f.hasOwnProperty(g)&&(this.recursionDetector[g]=!0)},a.importVisitor.prototype={isReplacing:!0,run:function(a){var b;try{this._visitor.visit(a)}catch(c){b=c}this.isFinished=!0,0===this.importCount&&this._finish(b)},visitImport:function(b,c){var d,e=this,f=b.options.inline;if(!b.css||f){try{d=b.evalForImport(this.env)}catch(g){g.filename||(g.index=b.index,g.filename=b.currentFileInfo.filename),b.css=!0,b.error=g}if(d&&(!d.css||f)){b=d,this.importCount++;var h=new a.evalEnv(this.env,this.env.frames.slice(0));b.options.multiple&&(h.importMultiple=!0),this._importer.push(b.getPath(),b.currentFileInfo,b.options,function(c,d,g,i){c&&!c.filename&&(c.index=b.index,c.filename=b.currentFileInfo.filename),h.importMultiple||(b.skip=g?!0:function(){return i in e.onceFileDetectionMap?!0:(e.onceFileDetectionMap[i]=!0,!1)});var j=function(a){e.importCount--,0===e.importCount&&e.isFinished&&e._finish(a)};if(d){b.root=d,b.importedFilename=i;var k=g||i in e.recursionDetector;if(!f&&(h.importMultiple||!k))return e.recursionDetector[i]=!0,void new a.importVisitor(e._importer,j,h,e.onceFileDetectionMap,e.recursionDetector).run(d)}j()})}}return c.visitDeeper=!1,b},visitRule:function(a,b){return b.visitDeeper=!1,a},visitDirective:function(a){return this.env.frames.unshift(a),a},visitDirectiveOut:function(){this.env.frames.shift()},visitMixinDefinition:function(a){return this.env.frames.unshift(a),a},visitMixinDefinitionOut:function(){this.env.frames.shift()},visitRuleset:function(a){return this.env.frames.unshift(a),a},visitRulesetOut:function(){this.env.frames.shift()},visitMedia:function(a){return this.env.frames.unshift(a.ruleset),a},visitMediaOut:function(){this.env.frames.shift()}}}(c("./tree")),function(a){a.joinSelectorVisitor=function(){this.contexts=[[]],this._visitor=new a.visitor(this)},a.joinSelectorVisitor.prototype={run:function(a){return this._visitor.visit(a)},visitRule:function(a,b){b.visitDeeper=!1},visitMixinDefinition:function(a,b){b.visitDeeper=!1},visitRuleset:function(a){var b,c=this.contexts[this.contexts.length-1],d=[];this.contexts.push(d),a.root||(b=a.selectors,b&&(b=b.filter(function(a){return a.getIsOutput()}),a.selectors=b.length?b:b=null,b&&a.joinSelectors(d,c,b)),b||(a.rules=null),a.paths=d)},visitRulesetOut:function(){this.contexts.length=this.contexts.length-1},visitMedia:function(a){var b=this.contexts[this.contexts.length-1];a.rules[0].root=0===b.length||b[0].multiMedia}}}(c("./tree")),function(a){a.toCSSVisitor=function(b){this._visitor=new a.visitor(this),this._env=b},a.toCSSVisitor.prototype={isReplacing:!0,run:function(a){return this._visitor.visit(a)},visitRule:function(a){return a.variable?[]:a},visitMixinDefinition:function(a){return a.frames=[],[]},visitExtend:function(){return[]},visitComment:function(a){return a.isSilent(this._env)?[]:a},visitMedia:function(a,b){return a.accept(this._visitor),b.visitDeeper=!1,a.rules.length?a:[]},visitDirective:function(b){if(b.currentFileInfo.reference&&!b.isReferenced)return[];if("@charset"===b.name){if(this.charset){if(b.debugInfo){var c=new a.Comment("/* "+b.toCSS(this._env).replace(/\n/g,"")+" */\n");return c.debugInfo=b.debugInfo,this._visitor.visit(c)}return[]}this.charset=!0}return b},checkPropertiesInRoot:function(b){for(var c,d=0;d<b.length;d++)if(c=b[d],c instanceof a.Rule&&!c.variable)throw{message:"properties must be inside selector blocks, they cannot be in the root.",index:c.index,filename:c.currentFileInfo?c.currentFileInfo.filename:null}},visitRuleset:function(b,c){var d,e=[];if(b.firstRoot&&this.checkPropertiesInRoot(b.rules),b.root)b.accept(this._visitor),c.visitDeeper=!1,(b.firstRoot||b.rules&&b.rules.length>0)&&e.splice(0,0,b);else{b.paths&&(b.paths=b.paths.filter(function(b){var c;for(" "===b[0].elements[0].combinator.value&&(b[0].elements[0].combinator=new a.Combinator("")),c=0;c<b.length;c++)if(b[c].getIsReferenced()&&b[c].getIsOutput())return!0;return!1}));for(var f=b.rules,g=f?f.length:0,h=0;g>h;)d=f[h],d&&d.rules?(e.push(this._visitor.visit(d)),f.splice(h,1),g--):h++;g>0?b.accept(this._visitor):b.rules=null,c.visitDeeper=!1,f=b.rules,f&&(this._mergeRules(f),f=b.rules),f&&(this._removeDuplicateRules(f),f=b.rules),f&&f.length>0&&b.paths.length>0&&e.splice(0,0,b)}return 1===e.length?e[0]:e},_removeDuplicateRules:function(b){if(b){var c,d,e,f={};for(e=b.length-1;e>=0;e--)if(d=b[e],d instanceof a.Rule)if(f[d.name]){c=f[d.name],c instanceof a.Rule&&(c=f[d.name]=[f[d.name].toCSS(this._env)]);var g=d.toCSS(this._env);-1!==c.indexOf(g)?b.splice(e,1):c.push(g)}else f[d.name]=d}},_mergeRules:function(b){if(b){for(var c,d,e,f={},g=0;g<b.length;g++)d=b[g],d instanceof a.Rule&&d.merge&&(e=[d.name,d.important?"!":""].join(","),f[e]?b.splice(g--,1):f[e]=[],f[e].push(d));Object.keys(f).map(function(b){function e(b){return new a.Expression(b.map(function(a){return a.value}))}function g(b){return new a.Value(b.map(function(a){return a}))}if(c=f[b],c.length>1){d=c[0];var h=[],i=[];c.map(function(a){"+"===a.merge&&(i.length>0&&h.push(e(i)),i=[]),i.push(a)}),h.push(e(i)),d.value=g(h)}})}}}}(c("./tree")),function(a){a.extendFinderVisitor=function(){this._visitor=new a.visitor(this),this.contexts=[],this.allExtendsStack=[[]]},a.extendFinderVisitor.prototype={run:function(a){return a=this._visitor.visit(a),a.allExtends=this.allExtendsStack[0],a},visitRule:function(a,b){b.visitDeeper=!1},visitMixinDefinition:function(a,b){b.visitDeeper=!1},visitRuleset:function(b){if(!b.root){var c,d,e,f,g=[],h=b.rules,i=h?h.length:0;for(c=0;i>c;c++)b.rules[c]instanceof a.Extend&&(g.push(h[c]),b.extendOnEveryPath=!0);var j=b.paths;for(c=0;c<j.length;c++){var k=j[c],l=k[k.length-1],m=l.extendList;for(f=m?m.slice(0).concat(g):g,f&&(f=f.map(function(a){return a.clone()})),d=0;d<f.length;d++)this.foundExtends=!0,e=f[d],e.findSelfSelectors(k),e.ruleset=b,0===d&&(e.firstExtendOnThisSelectorPath=!0),this.allExtendsStack[this.allExtendsStack.length-1].push(e)}this.contexts.push(b.selectors)}},visitRulesetOut:function(a){a.root||(this.contexts.length=this.contexts.length-1)},visitMedia:function(a){a.allExtends=[],this.allExtendsStack.push(a.allExtends)},visitMediaOut:function(){this.allExtendsStack.length=this.allExtendsStack.length-1},visitDirective:function(a){a.allExtends=[],this.allExtendsStack.push(a.allExtends)},visitDirectiveOut:function(){this.allExtendsStack.length=this.allExtendsStack.length-1}},a.processExtendsVisitor=function(){this._visitor=new a.visitor(this)},a.processExtendsVisitor.prototype={run:function(b){var c=new a.extendFinderVisitor;return c.run(b),c.foundExtends?(b.allExtends=b.allExtends.concat(this.doExtendChaining(b.allExtends,b.allExtends)),this.allExtendsStack=[b.allExtends],this._visitor.visit(b)):b},doExtendChaining:function(b,c,d){var e,f,g,h,i,j,k,l,m=[],n=this;for(d=d||0,e=0;e<b.length;e++)for(f=0;f<c.length;f++)j=b[e],k=c[f],j.parent_ids.indexOf(k.object_id)>=0||(i=[k.selfSelectors[0]],g=n.findMatch(j,i),g.length&&j.selfSelectors.forEach(function(b){h=n.extendSelector(g,i,b),l=new a.Extend(k.selector,k.option,0),l.selfSelectors=h,h[h.length-1].extendList=[l],m.push(l),l.ruleset=k.ruleset,l.parent_ids=l.parent_ids.concat(k.parent_ids,j.parent_ids),k.firstExtendOnThisSelectorPath&&(l.firstExtendOnThisSelectorPath=!0,k.ruleset.paths.push(h))}));if(m.length){if(this.extendChainCount++,d>100){var o="{unable to calculate}",p="{unable to calculate}";try{o=m[0].selfSelectors[0].toCSS(),p=m[0].selector.toCSS()}catch(q){}throw{message:"extend circular reference detected. One of the circular extends is currently:"+o+":extend("+p+")"}}return m.concat(n.doExtendChaining(m,c,d+1))}return m},visitRule:function(a,b){b.visitDeeper=!1},visitMixinDefinition:function(a,b){b.visitDeeper=!1},visitSelector:function(a,b){b.visitDeeper=!1},visitRuleset:function(a){if(!a.root){var b,c,d,e,f=this.allExtendsStack[this.allExtendsStack.length-1],g=[],h=this;for(d=0;d<f.length;d++)for(c=0;c<a.paths.length;c++)if(e=a.paths[c],!a.extendOnEveryPath){var i=e[e.length-1].extendList;i&&i.length||(b=this.findMatch(f[d],e),b.length&&f[d].selfSelectors.forEach(function(a){g.push(h.extendSelector(b,e,a))}))}a.paths=a.paths.concat(g)}},findMatch:function(a,b){var c,d,e,f,g,h,i,j=this,k=a.selector.elements,l=[],m=[];for(c=0;c<b.length;c++)for(d=b[c],e=0;e<d.elements.length;e++)for(f=d.elements[e],(a.allowBefore||0===c&&0===e)&&l.push({pathIndex:c,index:e,matched:0,initialCombinator:f.combinator}),h=0;h<l.length;h++)i=l[h],g=f.combinator.value,""===g&&0===e&&(g=" "),!j.isElementValuesEqual(k[i.matched].value,f.value)||i.matched>0&&k[i.matched].combinator.value!==g?i=null:i.matched++,i&&(i.finished=i.matched===k.length,i.finished&&!a.allowAfter&&(e+1<d.elements.length||c+1<b.length)&&(i=null)),i?i.finished&&(i.length=k.length,i.endPathIndex=c,i.endPathElementIndex=e+1,l.length=0,m.push(i)):(l.splice(h,1),h--);return m},isElementValuesEqual:function(b,c){if("string"==typeof b||"string"==typeof c)return b===c;if(b instanceof a.Attribute)return b.op!==c.op||b.key!==c.key?!1:b.value&&c.value?(b=b.value.value||b.value,c=c.value.value||c.value,b===c):b.value||c.value?!1:!0;if(b=b.value,c=c.value,b instanceof a.Selector){if(!(c instanceof a.Selector)||b.elements.length!==c.elements.length)return!1;for(var d=0;d<b.elements.length;d++){if(b.elements[d].combinator.value!==c.elements[d].combinator.value&&(0!==d||(b.elements[d].combinator.value||" ")!==(c.elements[d].combinator.value||" ")))return!1;if(!this.isElementValuesEqual(b.elements[d].value,c.elements[d].value))return!1}return!0}return!1},extendSelector:function(b,c,d){var e,f,g,h,i,j=0,k=0,l=[];for(e=0;e<b.length;e++)h=b[e],f=c[h.pathIndex],g=new a.Element(h.initialCombinator,d.elements[0].value,d.elements[0].index,d.elements[0].currentFileInfo),h.pathIndex>j&&k>0&&(l[l.length-1].elements=l[l.length-1].elements.concat(c[j].elements.slice(k)),k=0,j++),i=f.elements.slice(k,h.index).concat([g]).concat(d.elements.slice(1)),j===h.pathIndex&&e>0?l[l.length-1].elements=l[l.length-1].elements.concat(i):(l=l.concat(c.slice(j,h.pathIndex)),l.push(new a.Selector(i))),j=h.endPathIndex,k=h.endPathElementIndex,k>=c[j].elements.length&&(k=0,j++);
return j<c.length&&k>0&&(l[l.length-1].elements=l[l.length-1].elements.concat(c[j].elements.slice(k)),j++),l=l.concat(c.slice(j,c.length))},visitRulesetOut:function(){},visitMedia:function(a){var b=a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length-1]);b=b.concat(this.doExtendChaining(b,a.allExtends)),this.allExtendsStack.push(b)},visitMediaOut:function(){this.allExtendsStack.length=this.allExtendsStack.length-1},visitDirective:function(a){var b=a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length-1]);b=b.concat(this.doExtendChaining(b,a.allExtends)),this.allExtendsStack.push(b)},visitDirectiveOut:function(){this.allExtendsStack.length=this.allExtendsStack.length-1}}}(c("./tree")),function(a){a.sourceMapOutput=function(a){this._css=[],this._rootNode=a.rootNode,this._writeSourceMap=a.writeSourceMap,this._contentsMap=a.contentsMap,this._contentsIgnoredCharsMap=a.contentsIgnoredCharsMap,this._sourceMapFilename=a.sourceMapFilename,this._outputFilename=a.outputFilename,this._sourceMapURL=a.sourceMapURL,a.sourceMapBasepath&&(this._sourceMapBasepath=a.sourceMapBasepath.replace(/\\/g,"/")),this._sourceMapRootpath=a.sourceMapRootpath,this._outputSourceFiles=a.outputSourceFiles,this._sourceMapGeneratorConstructor=a.sourceMapGenerator||c("source-map").SourceMapGenerator,this._sourceMapRootpath&&"/"!==this._sourceMapRootpath.charAt(this._sourceMapRootpath.length-1)&&(this._sourceMapRootpath+="/"),this._lineNumber=0,this._column=0},a.sourceMapOutput.prototype.normalizeFilename=function(a){return a=a.replace(/\\/g,"/"),this._sourceMapBasepath&&0===a.indexOf(this._sourceMapBasepath)&&(a=a.substring(this._sourceMapBasepath.length),("\\"===a.charAt(0)||"/"===a.charAt(0))&&(a=a.substring(1))),(this._sourceMapRootpath||"")+a},a.sourceMapOutput.prototype.add=function(a,b,c,d){if(a){var e,f,g,h,i;if(b){var j=this._contentsMap[b.filename];this._contentsIgnoredCharsMap[b.filename]&&(c-=this._contentsIgnoredCharsMap[b.filename],0>c&&(c=0),j=j.slice(this._contentsIgnoredCharsMap[b.filename])),j=j.substring(0,c),f=j.split("\n"),h=f[f.length-1]}if(e=a.split("\n"),g=e[e.length-1],b)if(d)for(i=0;i<e.length;i++)this._sourceMapGenerator.addMapping({generated:{line:this._lineNumber+i+1,column:0===i?this._column:0},original:{line:f.length+i,column:0===i?h.length:0},source:this.normalizeFilename(b.filename)});else this._sourceMapGenerator.addMapping({generated:{line:this._lineNumber+1,column:this._column},original:{line:f.length,column:h.length},source:this.normalizeFilename(b.filename)});1===e.length?this._column+=g.length:(this._lineNumber+=e.length-1,this._column=g.length),this._css.push(a)}},a.sourceMapOutput.prototype.isEmpty=function(){return 0===this._css.length},a.sourceMapOutput.prototype.toCSS=function(a){if(this._sourceMapGenerator=new this._sourceMapGeneratorConstructor({file:this._outputFilename,sourceRoot:null}),this._outputSourceFiles)for(var b in this._contentsMap)if(this._contentsMap.hasOwnProperty(b)){var c=this._contentsMap[b];this._contentsIgnoredCharsMap[b]&&(c=c.slice(this._contentsIgnoredCharsMap[b])),this._sourceMapGenerator.setSourceContent(this.normalizeFilename(b),c)}if(this._rootNode.genCSS(a,this),this._css.length>0){var d,e=JSON.stringify(this._sourceMapGenerator.toJSON());this._sourceMapURL?d=this._sourceMapURL:this._sourceMapFilename&&(d=this.normalizeFilename(this._sourceMapFilename)),this._writeSourceMap?this._writeSourceMap(e):d="data:application/json,"+encodeURIComponent(e),d&&this._css.push("/*# sourceMappingURL="+d+" */")}return this._css.join("")}}(c("./tree"));var y=/^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol);w.env=w.env||("127.0.0.1"==location.hostname||"0.0.0.0"==location.hostname||"localhost"==location.hostname||location.port&&location.port.length>0||y?"development":"production");var z={debug:3,info:2,errors:1,none:0};if(w.logLevel="undefined"!=typeof w.logLevel?w.logLevel:"development"===w.env?z.debug:z.errors,w.async=w.async||!1,w.fileAsync=w.fileAsync||!1,w.poll=w.poll||(y?1e3:1500),w.functions)for(var A in w.functions)w.functions.hasOwnProperty(A)&&(w.tree.functions[A]=w.functions[A]);var B=/!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);B&&(w.dumpLineNumbers=B[1]);var C=/^text\/(x-)?less$/,D=null,E={};if(w.watch=function(){return w.watchMode||(w.env="development",v()),this.watchMode=!0,!0},w.unwatch=function(){return clearInterval(w.watchTimer),this.watchMode=!1,!1},/!watch/.test(location.hash)&&w.watch(),"development"!=w.env)try{D="undefined"==typeof a.localStorage?null:a.localStorage}catch(F){}var G=document.getElementsByTagName("link");w.sheets=[];for(var H=0;H<G.length;H++)("stylesheet/less"===G[H].rel||G[H].rel.match(/stylesheet/)&&G[H].type.match(C))&&w.sheets.push(G[H]);w.modifyVars=function(a){w.refresh(!1,a)},w.refresh=function(a,b){var c,e;c=e=new Date,u(function(a,b,f,i,k){if(a)return j(a,i.href);if(k.local)d("loading "+i.href+" from cache.",z.info);else{d("parsed "+i.href+" successfully.",z.debug);var l=b.toCSS(w);l=h(l),g(l,i,k.lastModified)}d("css for "+i.href+" generated in "+(new Date-e)+"ms",z.info),0===k.remaining&&d("less has finished. css generated in "+(new Date-c)+"ms",z.info),e=new Date},a,b),n(b)},w.refreshStyles=n,w.Parser.fileLoader=s,w.refresh("development"===w.env),"function"==typeof define&&define.amd&&define(function(){return w})}(window);;
/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2009-2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.2.0
 */
!function(a,b){"use strict";var c,d,e,f=a,g=f.document,h=f.navigator,i=f.setTimeout,j=f.clearTimeout,k=f.setInterval,l=f.clearInterval,m=f.getComputedStyle,n=f.encodeURIComponent,o=f.ActiveXObject,p=f.Error,q=f.Number.parseInt||f.parseInt,r=f.Number.parseFloat||f.parseFloat,s=f.Number.isNaN||f.isNaN,t=f.Date.now,u=f.Object.keys,v=f.Object.defineProperty,w=f.Object.prototype.hasOwnProperty,x=f.Array.prototype.slice,y=function(){var a=function(a){return a};if("function"==typeof f.wrap&&"function"==typeof f.unwrap)try{var b=g.createElement("div"),c=f.unwrap(b);1===b.nodeType&&c&&1===c.nodeType&&(a=f.unwrap)}catch(d){}return a}(),z=function(a){return x.call(a,0)},A=function(){var a,c,d,e,f,g,h=z(arguments),i=h[0]||{};for(a=1,c=h.length;c>a;a++)if(null!=(d=h[a]))for(e in d)w.call(d,e)&&(f=i[e],g=d[e],i!==g&&g!==b&&(i[e]=g));return i},B=function(a){var b,c,d,e;if("object"!=typeof a||null==a||"number"==typeof a.nodeType)b=a;else if("number"==typeof a.length)for(b=[],c=0,d=a.length;d>c;c++)w.call(a,c)&&(b[c]=B(a[c]));else{b={};for(e in a)w.call(a,e)&&(b[e]=B(a[e]))}return b},C=function(a,b){for(var c={},d=0,e=b.length;e>d;d++)b[d]in a&&(c[b[d]]=a[b[d]]);return c},D=function(a,b){var c={};for(var d in a)-1===b.indexOf(d)&&(c[d]=a[d]);return c},E=function(a){if(a)for(var b in a)w.call(a,b)&&delete a[b];return a},F=function(a,b){if(a&&1===a.nodeType&&a.ownerDocument&&b&&(1===b.nodeType&&b.ownerDocument&&b.ownerDocument===a.ownerDocument||9===b.nodeType&&!b.ownerDocument&&b===a.ownerDocument))do{if(a===b)return!0;a=a.parentNode}while(a);return!1},G=function(a){var b;return"string"==typeof a&&a&&(b=a.split("#")[0].split("?")[0],b=a.slice(0,a.lastIndexOf("/")+1)),b},H=function(a){var b,c;return"string"==typeof a&&a&&(c=a.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]?b=c[1]:(c=a.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]&&(b=c[1]))),b},I=function(){var a,b;try{throw new p}catch(c){b=c}return b&&(a=b.sourceURL||b.fileName||H(b.stack)),a},J=function(){var a,c,d;if(g.currentScript&&(a=g.currentScript.src))return a;if(c=g.getElementsByTagName("script"),1===c.length)return c[0].src||b;if("readyState"in c[0])for(d=c.length;d--;)if("interactive"===c[d].readyState&&(a=c[d].src))return a;return"loading"===g.readyState&&(a=c[c.length-1].src)?a:(a=I())?a:b},K=function(){var a,c,d,e=g.getElementsByTagName("script");for(a=e.length;a--;){if(!(d=e[a].src)){c=null;break}if(d=G(d),null==c)c=d;else if(c!==d){c=null;break}}return c||b},L=function(){var a=G(J())||K()||"";return a+"ZeroClipboard.swf"},M=function(){return null==a.opener&&(!!a.top&&a!=a.top||!!a.parent&&a!=a.parent)}(),N={bridge:null,version:"0.0.0",pluginType:"unknown",disabled:null,outdated:null,sandboxed:null,unavailable:null,degraded:null,deactivated:null,overdue:null,ready:null},O="11.0.0",P={},Q={},R=null,S=0,T=0,U={ready:"Flash communication is established",error:{"flash-disabled":"Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.","flash-outdated":"Flash is too outdated to support ZeroClipboard","flash-sandboxed":"Attempting to run Flash in a sandboxed iframe, which is impossible","flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript","flash-degraded":"Flash is unable to preserve data fidelity when communicating with JavaScript","flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.","flash-overdue":"Flash communication was established but NOT within the acceptable time limit","version-mismatch":"ZeroClipboard JS version number does not match ZeroClipboard SWF version number","clipboard-error":"At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard","config-mismatch":"ZeroClipboard configuration does not match Flash's reality","swf-not-found":"The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity"}},V=["flash-unavailable","flash-degraded","flash-overdue","version-mismatch","config-mismatch","clipboard-error"],W=["flash-disabled","flash-outdated","flash-sandboxed","flash-unavailable","flash-degraded","flash-deactivated","flash-overdue"],X=new RegExp("^flash-("+W.map(function(a){return a.replace(/^flash-/,"")}).join("|")+")$"),Y=new RegExp("^flash-("+W.slice(1).map(function(a){return a.replace(/^flash-/,"")}).join("|")+")$"),Z={swfPath:L(),trustedDomains:a.location.host?[a.location.host]:[],cacheBust:!0,forceEnhancedClipboard:!1,flashLoadTimeout:3e4,autoActivate:!0,bubbleEvents:!0,containerId:"global-zeroclipboard-html-bridge",containerClass:"global-zeroclipboard-container",swfObjectId:"global-zeroclipboard-flash-bridge",hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",forceHandCursor:!1,title:null,zIndex:999999999},$=function(a){if("object"==typeof a&&null!==a)for(var b in a)if(w.call(a,b))if(/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b))Z[b]=a[b];else if(null==N.bridge)if("containerId"===b||"swfObjectId"===b){if(!nb(a[b]))throw new Error("The specified `"+b+"` value is not valid as an HTML4 Element ID");Z[b]=a[b]}else Z[b]=a[b];{if("string"!=typeof a||!a)return B(Z);if(w.call(Z,a))return Z[a]}},_=function(){return Tb(),{browser:C(h,["userAgent","platform","appName"]),flash:D(N,["bridge"]),zeroclipboard:{version:Vb.version,config:Vb.config()}}},ab=function(){return!!(N.disabled||N.outdated||N.sandboxed||N.unavailable||N.degraded||N.deactivated)},bb=function(a,d){var e,f,g,h={};if("string"==typeof a&&a)g=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof d)for(e in a)w.call(a,e)&&"string"==typeof e&&e&&"function"==typeof a[e]&&Vb.on(e,a[e]);if(g&&g.length){for(e=0,f=g.length;f>e;e++)a=g[e].replace(/^on/,""),h[a]=!0,P[a]||(P[a]=[]),P[a].push(d);if(h.ready&&N.ready&&Vb.emit({type:"ready"}),h.error){for(e=0,f=W.length;f>e;e++)if(N[W[e].replace(/^flash-/,"")]===!0){Vb.emit({type:"error",name:W[e]});break}c!==b&&Vb.version!==c&&Vb.emit({type:"error",name:"version-mismatch",jsVersion:Vb.version,swfVersion:c})}}return Vb},cb=function(a,b){var c,d,e,f,g;if(0===arguments.length)f=u(P);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)w.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&Vb.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=P[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return Vb},db=function(a){var b;return b="string"==typeof a&&a?B(P[a])||null:B(P)},eb=function(a){var b,c,d;return a=ob(a),a&&!vb(a)?"ready"===a.type&&N.overdue===!0?Vb.emit({type:"error",name:"flash-overdue"}):(b=A({},a),tb.call(this,b),"copy"===a.type&&(d=Db(Q),c=d.data,R=d.formatMap),c):void 0},fb=function(){var a=N.sandboxed;if(Tb(),"boolean"!=typeof N.ready&&(N.ready=!1),N.sandboxed!==a&&N.sandboxed===!0)N.ready=!1,Vb.emit({type:"error",name:"flash-sandboxed"});else if(!Vb.isFlashUnusable()&&null===N.bridge){var b=Z.flashLoadTimeout;"number"==typeof b&&b>=0&&(S=i(function(){"boolean"!=typeof N.deactivated&&(N.deactivated=!0),N.deactivated===!0&&Vb.emit({type:"error",name:"flash-deactivated"})},b)),N.overdue=!1,Bb()}},gb=function(){Vb.clearData(),Vb.blur(),Vb.emit("destroy"),Cb(),Vb.off()},hb=function(a,b){var c;if("object"==typeof a&&a&&"undefined"==typeof b)c=a,Vb.clearData();else{if("string"!=typeof a||!a)return;c={},c[a]=b}for(var d in c)"string"==typeof d&&d&&w.call(c,d)&&"string"==typeof c[d]&&c[d]&&(Q[d]=c[d])},ib=function(a){"undefined"==typeof a?(E(Q),R=null):"string"==typeof a&&w.call(Q,a)&&delete Q[a]},jb=function(a){return"undefined"==typeof a?B(Q):"string"==typeof a&&w.call(Q,a)?Q[a]:void 0},kb=function(a){if(a&&1===a.nodeType){d&&(Lb(d,Z.activeClass),d!==a&&Lb(d,Z.hoverClass)),d=a,Kb(a,Z.hoverClass);var b=a.getAttribute("title")||Z.title;if("string"==typeof b&&b){var c=Ab(N.bridge);c&&c.setAttribute("title",b)}var e=Z.forceHandCursor===!0||"pointer"===Mb(a,"cursor");Rb(e),Qb()}},lb=function(){var a=Ab(N.bridge);a&&(a.removeAttribute("title"),a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px"),d&&(Lb(d,Z.hoverClass),Lb(d,Z.activeClass),d=null)},mb=function(){return d||null},nb=function(a){return"string"==typeof a&&a&&/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a)},ob=function(a){var b;if("string"==typeof a&&a?(b=a,a={}):"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(b=a.type),b){b=b.toLowerCase(),!a.target&&(/^(copy|aftercopy|_click)$/.test(b)||"error"===b&&"clipboard-error"===a.name)&&(a.target=e),A(a,{type:b,target:a.target||d||null,relatedTarget:a.relatedTarget||null,currentTarget:N&&N.bridge||null,timeStamp:a.timeStamp||t()||null});var c=U[a.type];return"error"===a.type&&a.name&&c&&(c=c[a.name]),c&&(a.message=c),"ready"===a.type&&A(a,{target:null,version:N.version}),"error"===a.type&&(X.test(a.name)&&A(a,{target:null,minimumVersion:O}),Y.test(a.name)&&A(a,{version:N.version})),"copy"===a.type&&(a.clipboardData={setData:Vb.setData,clearData:Vb.clearData}),"aftercopy"===a.type&&(a=Eb(a,R)),a.target&&!a.relatedTarget&&(a.relatedTarget=pb(a.target)),qb(a)}},pb=function(a){var b=a&&a.getAttribute&&a.getAttribute("data-clipboard-target");return b?g.getElementById(b):null},qb=function(a){if(a&&/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)){var c=a.target,d="_mouseover"===a.type&&a.relatedTarget?a.relatedTarget:b,e="_mouseout"===a.type&&a.relatedTarget?a.relatedTarget:b,h=Nb(c),i=f.screenLeft||f.screenX||0,j=f.screenTop||f.screenY||0,k=g.body.scrollLeft+g.documentElement.scrollLeft,l=g.body.scrollTop+g.documentElement.scrollTop,m=h.left+("number"==typeof a._stageX?a._stageX:0),n=h.top+("number"==typeof a._stageY?a._stageY:0),o=m-k,p=n-l,q=i+o,r=j+p,s="number"==typeof a.movementX?a.movementX:0,t="number"==typeof a.movementY?a.movementY:0;delete a._stageX,delete a._stageY,A(a,{srcElement:c,fromElement:d,toElement:e,screenX:q,screenY:r,pageX:m,pageY:n,clientX:o,clientY:p,x:o,y:p,movementX:s,movementY:t,offsetX:0,offsetY:0,layerX:0,layerY:0})}return a},rb=function(a){var b=a&&"string"==typeof a.type&&a.type||"";return!/^(?:(?:before)?copy|destroy)$/.test(b)},sb=function(a,b,c,d){d?i(function(){a.apply(b,c)},0):a.apply(b,c)},tb=function(a){if("object"==typeof a&&a&&a.type){var b=rb(a),c=P["*"]||[],d=P[a.type]||[],e=c.concat(d);if(e&&e.length){var g,h,i,j,k,l=this;for(g=0,h=e.length;h>g;g++)i=e[g],j=l,"string"==typeof i&&"function"==typeof f[i]&&(i=f[i]),"object"==typeof i&&i&&"function"==typeof i.handleEvent&&(j=i,i=i.handleEvent),"function"==typeof i&&(k=A({},a),sb(i,j,[k],b))}return this}},ub=function(a){var b=null;return(M===!1||a&&"error"===a.type&&a.name&&-1!==V.indexOf(a.name))&&(b=!1),b},vb=function(a){var b=a.target||d||null,f="swf"===a._source;switch(delete a._source,a.type){case"error":var g="flash-sandboxed"===a.name||ub(a);"boolean"==typeof g&&(N.sandboxed=g),-1!==W.indexOf(a.name)?A(N,{disabled:"flash-disabled"===a.name,outdated:"flash-outdated"===a.name,unavailable:"flash-unavailable"===a.name,degraded:"flash-degraded"===a.name,deactivated:"flash-deactivated"===a.name,overdue:"flash-overdue"===a.name,ready:!1}):"version-mismatch"===a.name&&(c=a.swfVersion,A(N,{disabled:!1,outdated:!1,unavailable:!1,degraded:!1,deactivated:!1,overdue:!1,ready:!1})),Pb();break;case"ready":c=a.swfVersion;var h=N.deactivated===!0;A(N,{disabled:!1,outdated:!1,sandboxed:!1,unavailable:!1,degraded:!1,deactivated:!1,overdue:h,ready:!h}),Pb();break;case"beforecopy":e=b;break;case"copy":var i,j,k=a.relatedTarget;!Q["text/html"]&&!Q["text/plain"]&&k&&(j=k.value||k.outerHTML||k.innerHTML)&&(i=k.value||k.textContent||k.innerText)?(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",i),j!==i&&a.clipboardData.setData("text/html",j)):!Q["text/plain"]&&a.target&&(i=a.target.getAttribute("data-clipboard-text"))&&(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",i));break;case"aftercopy":wb(a),Vb.clearData(),b&&b!==Jb()&&b.focus&&b.focus();break;case"_mouseover":Vb.focus(b),Z.bubbleEvents===!0&&f&&(b&&b!==a.relatedTarget&&!F(a.relatedTarget,b)&&xb(A({},a,{type:"mouseenter",bubbles:!1,cancelable:!1})),xb(A({},a,{type:"mouseover"})));break;case"_mouseout":Vb.blur(),Z.bubbleEvents===!0&&f&&(b&&b!==a.relatedTarget&&!F(a.relatedTarget,b)&&xb(A({},a,{type:"mouseleave",bubbles:!1,cancelable:!1})),xb(A({},a,{type:"mouseout"})));break;case"_mousedown":Kb(b,Z.activeClass),Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_mouseup":Lb(b,Z.activeClass),Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_click":e=null,Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_mousemove":Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}))}return/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)?!0:void 0},wb=function(a){if(a.errors&&a.errors.length>0){var b=B(a);A(b,{type:"error",name:"clipboard-error"}),delete b.success,i(function(){Vb.emit(b)},0)}},xb=function(a){if(a&&"string"==typeof a.type&&a){var b,c=a.target||null,d=c&&c.ownerDocument||g,e={view:d.defaultView||f,canBubble:!0,cancelable:!0,detail:"click"===a.type?1:0,button:"number"==typeof a.which?a.which-1:"number"==typeof a.button?a.button:d.createEvent?0:1},h=A(e,a);c&&d.createEvent&&c.dispatchEvent&&(h=[h.type,h.canBubble,h.cancelable,h.view,h.detail,h.screenX,h.screenY,h.clientX,h.clientY,h.ctrlKey,h.altKey,h.shiftKey,h.metaKey,h.button,h.relatedTarget],b=d.createEvent("MouseEvents"),b.initMouseEvent&&(b.initMouseEvent.apply(b,h),b._source="js",c.dispatchEvent(b)))}},yb=function(){var a=Z.flashLoadTimeout;if("number"==typeof a&&a>=0){var b=Math.min(1e3,a/10),c=Z.swfObjectId+"_fallbackContent";T=k(function(){var a=g.getElementById(c);Ob(a)&&(Pb(),N.deactivated=null,Vb.emit({type:"error",name:"swf-not-found"}))},b)}},zb=function(){var a=g.createElement("div");return a.id=Z.containerId,a.className=Z.containerClass,a.style.position="absolute",a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px",a.style.zIndex=""+Sb(Z.zIndex),a},Ab=function(a){for(var b=a&&a.parentNode;b&&"OBJECT"===b.nodeName&&b.parentNode;)b=b.parentNode;return b||null},Bb=function(){var a,b=N.bridge,c=Ab(b);if(!b){var d=Ib(f.location.host,Z),e="never"===d?"none":"all",h=Gb(A({jsVersion:Vb.version},Z)),i=Z.swfPath+Fb(Z.swfPath,Z);c=zb();var j=g.createElement("div");c.appendChild(j),g.body.appendChild(c);var k=g.createElement("div"),l="activex"===N.pluginType;k.innerHTML='<object id="'+Z.swfObjectId+'" name="'+Z.swfObjectId+'" width="100%" height="100%" '+(l?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+i+'"')+">"+(l?'<param name="movie" value="'+i+'"/>':"")+'<param name="allowScriptAccess" value="'+d+'"/><param name="allowNetworking" value="'+e+'"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="'+h+'"/><div id="'+Z.swfObjectId+'_fallbackContent">&nbsp;</div></object>',b=k.firstChild,k=null,y(b).ZeroClipboard=Vb,c.replaceChild(b,j),yb()}return b||(b=g[Z.swfObjectId],b&&(a=b.length)&&(b=b[a-1]),!b&&c&&(b=c.firstChild)),N.bridge=b||null,b},Cb=function(){var a=N.bridge;if(a){var d=Ab(a);d&&("activex"===N.pluginType&&"readyState"in a?(a.style.display="none",function e(){if(4===a.readyState){for(var b in a)"function"==typeof a[b]&&(a[b]=null);a.parentNode&&a.parentNode.removeChild(a),d.parentNode&&d.parentNode.removeChild(d)}else i(e,10)}()):(a.parentNode&&a.parentNode.removeChild(a),d.parentNode&&d.parentNode.removeChild(d))),Pb(),N.ready=null,N.bridge=null,N.deactivated=null,c=b}},Db=function(a){var b={},c={};if("object"==typeof a&&a){for(var d in a)if(d&&w.call(a,d)&&"string"==typeof a[d]&&a[d])switch(d.toLowerCase()){case"text/plain":case"text":case"air:text":case"flash:text":b.text=a[d],c.text=d;break;case"text/html":case"html":case"air:html":case"flash:html":b.html=a[d],c.html=d;break;case"application/rtf":case"text/rtf":case"rtf":case"richtext":case"air:rtf":case"flash:rtf":b.rtf=a[d],c.rtf=d}return{data:b,formatMap:c}}},Eb=function(a,b){if("object"!=typeof a||!a||"object"!=typeof b||!b)return a;var c={};for(var d in a)if(w.call(a,d))if("errors"===d){c[d]=a[d]?a[d].slice():[];for(var e=0,f=c[d].length;f>e;e++)c[d][e].format=b[c[d][e].format]}else if("success"!==d&&"data"!==d)c[d]=a[d];else{c[d]={};var g=a[d];for(var h in g)h&&w.call(g,h)&&w.call(b,h)&&(c[d][b[h]]=g[h])}return c},Fb=function(a,b){var c=null==b||b&&b.cacheBust===!0;return c?(-1===a.indexOf("?")?"?":"&")+"noCache="+t():""},Gb=function(a){var b,c,d,e,g="",h=[];if(a.trustedDomains&&("string"==typeof a.trustedDomains?e=[a.trustedDomains]:"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(e=a.trustedDomains)),e&&e.length)for(b=0,c=e.length;c>b;b++)if(w.call(e,b)&&e[b]&&"string"==typeof e[b]){if(d=Hb(e[b]),!d)continue;if("*"===d){h.length=0,h.push(d);break}h.push.apply(h,[d,"//"+d,f.location.protocol+"//"+d])}return h.length&&(g+="trustedOrigins="+n(h.join(","))),a.forceEnhancedClipboard===!0&&(g+=(g?"&":"")+"forceEnhancedClipboard=true"),"string"==typeof a.swfObjectId&&a.swfObjectId&&(g+=(g?"&":"")+"swfObjectId="+n(a.swfObjectId)),"string"==typeof a.jsVersion&&a.jsVersion&&(g+=(g?"&":"")+"jsVersion="+n(a.jsVersion)),g},Hb=function(a){if(null==a||""===a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},Ib=function(){var a=function(a){var b,c,d,e=[];if("string"==typeof a&&(a=[a]),"object"!=typeof a||!a||"number"!=typeof a.length)return e;for(b=0,c=a.length;c>b;b++)if(w.call(a,b)&&(d=Hb(a[b]))){if("*"===d){e.length=0,e.push("*");break}-1===e.indexOf(d)&&e.push(d)}return e};return function(b,c){var d=Hb(c.swfPath);null===d&&(d=b);var e=a(c.trustedDomains),f=e.length;if(f>0){if(1===f&&"*"===e[0])return"always";if(-1!==e.indexOf(b))return 1===f&&b===d?"sameDomain":"always"}return"never"}}(),Jb=function(){try{return g.activeElement}catch(a){return null}},Kb=function(a,b){var c,d,e,f=[];if("string"==typeof b&&b&&(f=b.split(/\s+/)),a&&1===a.nodeType&&f.length>0)if(a.classList)for(c=0,d=f.length;d>c;c++)a.classList.add(f[c]);else if(a.hasOwnProperty("className")){for(e=" "+a.className+" ",c=0,d=f.length;d>c;c++)-1===e.indexOf(" "+f[c]+" ")&&(e+=f[c]+" ");a.className=e.replace(/^\s+|\s+$/g,"")}return a},Lb=function(a,b){var c,d,e,f=[];if("string"==typeof b&&b&&(f=b.split(/\s+/)),a&&1===a.nodeType&&f.length>0)if(a.classList&&a.classList.length>0)for(c=0,d=f.length;d>c;c++)a.classList.remove(f[c]);else if(a.className){for(e=(" "+a.className+" ").replace(/[\r\n\t]/g," "),c=0,d=f.length;d>c;c++)e=e.replace(" "+f[c]+" "," ");a.className=e.replace(/^\s+|\s+$/g,"")}return a},Mb=function(a,b){var c=m(a,null).getPropertyValue(b);return"cursor"!==b||c&&"auto"!==c||"A"!==a.nodeName?c:"pointer"},Nb=function(a){var b={left:0,top:0,width:0,height:0};if(a.getBoundingClientRect){var c=a.getBoundingClientRect(),d=f.pageXOffset,e=f.pageYOffset,h=g.documentElement.clientLeft||0,i=g.documentElement.clientTop||0,j=0,k=0;if("relative"===Mb(g.body,"position")){var l=g.body.getBoundingClientRect(),m=g.documentElement.getBoundingClientRect();j=l.left-m.left||0,k=l.top-m.top||0}b.left=c.left+d-h-j,b.top=c.top+e-i-k,b.width="width"in c?c.width:c.right-c.left,b.height="height"in c?c.height:c.bottom-c.top}return b},Ob=function(a){if(!a)return!1;var b=m(a,null),c=r(b.height)>0,d=r(b.width)>0,e=r(b.top)>=0,f=r(b.left)>=0,g=c&&d&&e&&f,h=g?null:Nb(a),i="none"!==b.display&&"collapse"!==b.visibility&&(g||!!h&&(c||h.height>0)&&(d||h.width>0)&&(e||h.top>=0)&&(f||h.left>=0));return i},Pb=function(){j(S),S=0,l(T),T=0},Qb=function(){var a;if(d&&(a=Ab(N.bridge))){var b=Nb(d);A(a.style,{width:b.width+"px",height:b.height+"px",top:b.top+"px",left:b.left+"px",zIndex:""+Sb(Z.zIndex)})}},Rb=function(a){N.ready===!0&&(N.bridge&&"function"==typeof N.bridge.setHandCursor?N.bridge.setHandCursor(a):N.ready=!1)},Sb=function(a){if(/^(?:auto|inherit)$/.test(a))return a;var b;return"number"!=typeof a||s(a)?"string"==typeof a&&(b=Sb(q(a,10))):b=a,"number"==typeof b?b:"auto"},Tb=function(b){var c,d,e,f=N.sandboxed,g=null;if(b=b===!0,M===!1)g=!1;else{try{d=a.frameElement||null}catch(h){e={name:h.name,message:h.message}}if(d&&1===d.nodeType&&"IFRAME"===d.nodeName)try{g=d.hasAttribute("sandbox")}catch(h){g=null}else{try{c=document.domain||null}catch(h){c=null}(null===c||e&&"SecurityError"===e.name&&/(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(e.message.toLowerCase()))&&(g=!0)}}return N.sandboxed=g,f===g||b||Ub(o),g},Ub=function(a){function b(a){var b=a.match(/[\d]+/g);return b.length=3,b.join(".")}function c(a){return!!a&&(a=a.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a)||"chrome.plugin"===a.slice(-13))}function d(a){a&&(i=!0,a.version&&(l=b(a.version)),!l&&a.description&&(l=b(a.description)),a.filename&&(k=c(a.filename)))}var e,f,g,i=!1,j=!1,k=!1,l="";if(h.plugins&&h.plugins.length)e=h.plugins["Shockwave Flash"],d(e),h.plugins["Shockwave Flash 2.0"]&&(i=!0,l="2.0.0.11");else if(h.mimeTypes&&h.mimeTypes.length)g=h.mimeTypes["application/x-shockwave-flash"],e=g&&g.enabledPlugin,d(e);else if("undefined"!=typeof a){j=!0;try{f=new a("ShockwaveFlash.ShockwaveFlash.7"),i=!0,l=b(f.GetVariable("$version"))}catch(m){try{f=new a("ShockwaveFlash.ShockwaveFlash.6"),i=!0,l="6.0.21"}catch(n){try{f=new a("ShockwaveFlash.ShockwaveFlash"),i=!0,l=b(f.GetVariable("$version"))}catch(o){j=!1}}}}N.disabled=i!==!0,N.outdated=l&&r(l)<r(O),N.version=l||"0.0.0",N.pluginType=k?"pepper":j?"activex":i?"netscape":"unknown"};Ub(o),Tb(!0);var Vb=function(){return this instanceof Vb?void("function"==typeof Vb._createClient&&Vb._createClient.apply(this,z(arguments))):new Vb};v(Vb,"version",{value:"2.2.0",writable:!1,configurable:!0,enumerable:!0}),Vb.config=function(){return $.apply(this,z(arguments))},Vb.state=function(){return _.apply(this,z(arguments))},Vb.isFlashUnusable=function(){return ab.apply(this,z(arguments))},Vb.on=function(){return bb.apply(this,z(arguments))},Vb.off=function(){return cb.apply(this,z(arguments))},Vb.handlers=function(){return db.apply(this,z(arguments))},Vb.emit=function(){return eb.apply(this,z(arguments))},Vb.create=function(){return fb.apply(this,z(arguments))},Vb.destroy=function(){return gb.apply(this,z(arguments))},Vb.setData=function(){return hb.apply(this,z(arguments))},Vb.clearData=function(){return ib.apply(this,z(arguments))},Vb.getData=function(){return jb.apply(this,z(arguments))},Vb.focus=Vb.activate=function(){return kb.apply(this,z(arguments))},Vb.blur=Vb.deactivate=function(){return lb.apply(this,z(arguments))},Vb.activeElement=function(){return mb.apply(this,z(arguments))};var Wb=0,Xb={},Yb=0,Zb={},$b={};A(Z,{autoActivate:!0});var _b=function(a){var b=this;b.id=""+Wb++,Xb[b.id]={instance:b,elements:[],handlers:{}},a&&b.clip(a),Vb.on("*",function(a){return b.emit(a)}),Vb.on("destroy",function(){b.destroy()}),Vb.create()},ac=function(a,d){var e,f,g,h={},i=Xb[this.id],j=i&&i.handlers;if(!i)throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");if("string"==typeof a&&a)g=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof d)for(e in a)w.call(a,e)&&"string"==typeof e&&e&&"function"==typeof a[e]&&this.on(e,a[e]);if(g&&g.length){for(e=0,f=g.length;f>e;e++)a=g[e].replace(/^on/,""),h[a]=!0,j[a]||(j[a]=[]),j[a].push(d);if(h.ready&&N.ready&&this.emit({type:"ready",client:this}),h.error){for(e=0,f=W.length;f>e;e++)if(N[W[e].replace(/^flash-/,"")]){this.emit({type:"error",name:W[e],client:this});break}c!==b&&Vb.version!==c&&this.emit({type:"error",name:"version-mismatch",jsVersion:Vb.version,swfVersion:c})}}return this},bc=function(a,b){var c,d,e,f,g,h=Xb[this.id],i=h&&h.handlers;if(!i)return this;if(0===arguments.length)f=u(i);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)w.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=i[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return this},cc=function(a){var b=null,c=Xb[this.id]&&Xb[this.id].handlers;return c&&(b="string"==typeof a&&a?c[a]?c[a].slice(0):[]:B(c)),b},dc=function(a){if(ic.call(this,a)){"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(a=A({},a));var b=A({},ob(a),{client:this});jc.call(this,b)}return this},ec=function(a){if(!Xb[this.id])throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");a=kc(a);for(var b=0;b<a.length;b++)if(w.call(a,b)&&a[b]&&1===a[b].nodeType){a[b].zcClippingId?-1===Zb[a[b].zcClippingId].indexOf(this.id)&&Zb[a[b].zcClippingId].push(this.id):(a[b].zcClippingId="zcClippingId_"+Yb++,Zb[a[b].zcClippingId]=[this.id],Z.autoActivate===!0&&lc(a[b]));var c=Xb[this.id]&&Xb[this.id].elements;-1===c.indexOf(a[b])&&c.push(a[b])}return this},fc=function(a){var b=Xb[this.id];if(!b)return this;var c,d=b.elements;a="undefined"==typeof a?d.slice(0):kc(a);for(var e=a.length;e--;)if(w.call(a,e)&&a[e]&&1===a[e].nodeType){for(c=0;-1!==(c=d.indexOf(a[e],c));)d.splice(c,1);var f=Zb[a[e].zcClippingId];if(f){for(c=0;-1!==(c=f.indexOf(this.id,c));)f.splice(c,1);0===f.length&&(Z.autoActivate===!0&&mc(a[e]),delete a[e].zcClippingId)}}return this},gc=function(){var a=Xb[this.id];return a&&a.elements?a.elements.slice(0):[]},hc=function(){Xb[this.id]&&(this.unclip(),this.off(),delete Xb[this.id])},ic=function(a){if(!a||!a.type)return!1;if(a.client&&a.client!==this)return!1;var b=Xb[this.id],c=b&&b.elements,d=!!c&&c.length>0,e=!a.target||d&&-1!==c.indexOf(a.target),f=a.relatedTarget&&d&&-1!==c.indexOf(a.relatedTarget),g=a.client&&a.client===this;return b&&(e||f||g)?!0:!1},jc=function(a){var b=Xb[this.id];if("object"==typeof a&&a&&a.type&&b){var c=rb(a),d=b&&b.handlers["*"]||[],e=b&&b.handlers[a.type]||[],g=d.concat(e);if(g&&g.length){var h,i,j,k,l,m=this;for(h=0,i=g.length;i>h;h++)j=g[h],k=m,"string"==typeof j&&"function"==typeof f[j]&&(j=f[j]),"object"==typeof j&&j&&"function"==typeof j.handleEvent&&(k=j,j=j.handleEvent),"function"==typeof j&&(l=A({},a),sb(j,k,[l],c))}}},kc=function(a){return"string"==typeof a&&(a=[]),"number"!=typeof a.length?[a]:a},lc=function(a){if(a&&1===a.nodeType){var b=function(a){(a||(a=f.event))&&("js"!==a._source&&(a.stopImmediatePropagation(),a.preventDefault()),delete a._source)},c=function(c){(c||(c=f.event))&&(b(c),Vb.focus(a))};a.addEventListener("mouseover",c,!1),a.addEventListener("mouseout",b,!1),a.addEventListener("mouseenter",b,!1),a.addEventListener("mouseleave",b,!1),a.addEventListener("mousemove",b,!1),$b[a.zcClippingId]={mouseover:c,mouseout:b,mouseenter:b,mouseleave:b,mousemove:b}}},mc=function(a){if(a&&1===a.nodeType){var b=$b[a.zcClippingId];if("object"==typeof b&&b){for(var c,d,e=["move","leave","enter","out","over"],f=0,g=e.length;g>f;f++)c="mouse"+e[f],d=b[c],"function"==typeof d&&a.removeEventListener(c,d,!1);delete $b[a.zcClippingId]}}};Vb._createClient=function(){_b.apply(this,z(arguments))},Vb.prototype.on=function(){return ac.apply(this,z(arguments))},Vb.prototype.off=function(){return bc.apply(this,z(arguments))},Vb.prototype.handlers=function(){return cc.apply(this,z(arguments))},Vb.prototype.emit=function(){return dc.apply(this,z(arguments))},Vb.prototype.clip=function(){return ec.apply(this,z(arguments))},Vb.prototype.unclip=function(){return fc.apply(this,z(arguments))},Vb.prototype.elements=function(){return gc.apply(this,z(arguments))},Vb.prototype.destroy=function(){return hc.apply(this,z(arguments))},Vb.prototype.setText=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("text/plain",a),this},Vb.prototype.setHtml=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("text/html",a),this},Vb.prototype.setRichText=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("application/rtf",a),this},Vb.prototype.setData=function(){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData.apply(this,z(arguments)),this},Vb.prototype.clearData=function(){if(!Xb[this.id])throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.clearData.apply(this,z(arguments)),this},Vb.prototype.getData=function(){if(!Xb[this.id])throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.getData.apply(this,z(arguments))},"function"==typeof define&&define.amd?define(function(){return Vb}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?module.exports=Vb:a.ZeroClipboard=Vb}(function(){return this||window}());
//# sourceMappingURL=ZeroClipboard.min.map

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!(function(a) {
	"function" == typeof define && define.amd
		? define(["jquery"], a)
		: "object" == typeof exports ? (module.exports = a) : a(jQuery);
})(function(a) {
	function b(b) {
		var g = b || window.event,
			h = i.call(arguments, 1),
			j = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
		if (
			((b = a.event.fix(g)), (b.type = "mousewheel"), "detail" in g &&
				(m = -1 * g.detail), "wheelDelta" in g &&
				(m = g.wheelDelta), "wheelDeltaY" in g &&
				(m = g.wheelDeltaY), "wheelDeltaX" in g &&
				(l = -1 * g.wheelDeltaX), "axis" in g &&
				g.axis === g.HORIZONTAL_AXIS &&
				((l = -1 * m), (m = 0)), (j = 0 === m ? l : m), "deltaY" in g &&
				((m = -1 * g.deltaY), (j = m)), "deltaX" in g &&
				((l = g.deltaX), 0 === m && (j = -1 * l)), 0 !== m || 0 !== l)
		) {
			if (1 === g.deltaMode) {
				var q = a.data(this, "mousewheel-line-height");
				(j *= q), (m *= q), (l *= q);
			} else if (2 === g.deltaMode) {
				var r = a.data(this, "mousewheel-page-height");
				(j *= r), (m *= r), (l *= r);
			}
			if (
				((n = Math.max(Math.abs(m), Math.abs(l))), (!f || f > n) &&
					((f = n), d(g, n) && (f /= 40)), d(g, n) &&
					((j /= 40), (l /= 40), (m /= 40)), (j = Math[
					j >= 1 ? "floor" : "ceil"
				](j / f)), (l = Math[l >= 1 ? "floor" : "ceil"](
					l / f
				)), (m = Math[m >= 1 ? "floor" : "ceil"](m / f)), k.settings
					.normalizeOffset && this.getBoundingClientRect)
			) {
				var s = this.getBoundingClientRect();
				(o = b.clientX - s.left), (p = b.clientY - s.top);
			}
			return (b.deltaX = l), (b.deltaY = m), (b.deltaFactor = f), (b.offsetX = o), (b.offsetY = p), (b.deltaMode = 0), h.unshift(
				b,
				j,
				l,
				m
			), e && clearTimeout(e), (e = setTimeout(c, 200)), (a.event
				.dispatch || a.event.handle)
				.apply(this, h);
		}
	}
	function c() {
		f = null;
	}
	function d(a, b) {
		return (
			k.settings.adjustOldDeltas &&
			"mousewheel" === a.type &&
			b % 120 === 0
		);
	}
	var e,
		f,
		g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
		h = "onwheel" in document || document.documentMode >= 9
			? ["wheel"]
			: ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
		i = Array.prototype.slice;
	if (a.event.fixHooks)
		for (var j = g.length; j; )
			a.event.fixHooks[g[--j]] = a.event.mouseHooks;
	var k = (a.event.special.mousewheel = {
		version: "3.1.12",
		setup: function() {
			if (this.addEventListener)
				for (var c = h.length; c; )
					this.addEventListener(h[--c], b, !1);
			else this.onmousewheel = b;
			a.data(
				this,
				"mousewheel-line-height",
				k.getLineHeight(this)
			), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
		},
		teardown: function() {
			if (this.removeEventListener)
				for (var c = h.length; c; )
					this.removeEventListener(h[--c], b, !1);
			else this.onmousewheel = null;
			a.removeData(this, "mousewheel-line-height"), a.removeData(
				this,
				"mousewheel-page-height"
			);
		},
		getLineHeight: function(b) {
			var c = a(b),
				d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
			return d.length || (d = a("body")), parseInt(
				d.css("fontSize"),
				10
			) ||
				parseInt(c.css("fontSize"), 10) ||
				16;
		},
		getPageHeight: function(b) {
			return a(b).height();
		},
		settings: { adjustOldDeltas: !0, normalizeOffset: !0 }
	});
	a.fn.extend({
		mousewheel: function(a) {
			return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
		},
		unmousewheel: function(a) {
			return this.unbind("mousewheel", a);
		}
	});
});

/**!
 * MixItUp v2.0.6
 *
 * @copyright Copyright 2014 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!(function(a, b) {
	(a.MixItUp = function() {
		var b = this;
		b._execAction("_constructor", 0), a.extend(b, {
			selectors: { target: ".mix", filter: ".filter", sort: ".sort" },
			animation: {
				enable: !0,
				effects: "fade scale",
				duration: 600,
				easing: "ease",
				perspectiveDistance: "3000",
				perspectiveOrigin: "50% 50%",
				queue: !0,
				queueLimit: 1,
				animateChangeLayout: !1,
				animateResizeContainer: !0,
				animateResizeTargets: !1,
				staggerSequence: !1,
				reverseOut: !1
			},
			callbacks: {
				onMixLoad: !1,
				onMixStart: !1,
				onMixBusy: !1,
				onMixEnd: !1,
				onMixFail: !1,
				_user: !1
			},
			controls: {
				enable: !0,
				live: !1,
				toggleFilterButtons: !1,
				toggleLogic: "or",
				activeClass: "active"
			},
			layout: {
				display: "inline-block",
				containerClass: "",
				containerClassFail: "fail"
			},
			load: { filter: "all", sort: !1 },
			_$body: null,
			_$container: null,
			_$targets: null,
			_$parent: null,
			_$sortButtons: null,
			_$filterButtons: null,
			_suckMode: !1,
			_mixing: !1,
			_sorting: !1,
			_clicking: !1,
			_loading: !0,
			_changingLayout: !1,
			_changingClass: !1,
			_changingDisplay: !1,
			_origOrder: [],
			_startOrder: [],
			_newOrder: [],
			_activeFilter: null,
			_toggleArray: [],
			_toggleString: "",
			_activeSort: "default:asc",
			_newSort: null,
			_startHeight: null,
			_newHeight: null,
			_incPadding: !0,
			_newDisplay: null,
			_newClass: null,
			_targetsBound: 0,
			_targetsDone: 0,
			_queue: [],
			_$show: a(),
			_$hide: a()
		}), b._execAction("_constructor", 1);
	}), (a.MixItUp.prototype = {
		constructor: a.MixItUp,
		_instances: {},
		_actions: {},
		_filters: {},
		_init: function(b, c) {
			var d = this;
			if (
				(d._execAction("_init", 0, arguments), c &&
					a.extend(!0, d, c), (d._$body = a(
					"body"
				)), (d._domNode = b), (d._$container = a(
					b
				)), d._$container.addClass(d.layout.containerClass), (d._id =
					b.id), d._platformDetect(), (d._brake = d._getPrefixedCSS(
					"transition",
					"none"
				)), d._refresh(!0), (d._$parent = d._$targets.parent().length
					? d._$targets.parent()
					: d._$container), d.load.sort &&
					((d._newSort = d._parseSort(
						d.load.sort
					)), (d._newSortString = d.load.sort), (d._activeSort =
						d.load.sort), d._sort(), d._printSort()), (d._activeFilter = "all" ===
					d.load.filter
					? d.selectors.target
					: "none" === d.load.filter ? "" : d.load.filter), d.controls
					.enable && d._bindHandlers(), d.controls
					.toggleFilterButtons)
			) {
				d._buildToggleArray();
				for (var e = 0; e < d._toggleArray.length; e++)
					d._updateControls(
						{ filter: d._toggleArray[e], sort: d._activeSort },
						!0
					);
			} else
				d.controls.enable &&
					d._updateControls({
						filter: d._activeFilter,
						sort: d._activeSort
					});
			d._filter(), (d._init = !0), d._$container.data(
				"mixItUp",
				d
			), d._execAction(
				"_init",
				1,
				arguments
			), d._buildState(), d._$targets.css(d._brake), d._goMix(
				d.animation.enable
			);
		},
		_platformDetect: function() {
			var a = this,
				c = ["Webkit", "Moz", "O", "ms"],
				d = ["webkit", "moz"],
				e = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || !1,
				f = "undefined" != typeof InstallTrigger,
				g = function(a) {
					for (var b = 0; b < c.length; b++)
						if (c[b] + "Transition" in a.style)
							return {
								prefix: "-" + c[b].toLowerCase() + "-",
								vendor: c[b]
							};
					return "transition" in a.style ? "" : !1;
				},
				h = g(a._domNode);
			a._execAction("_platformDetect", 0), (a._chrome = e
				? parseInt(e[1], 10)
				: !1), (a._ff = f
				? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1])
				: !1), (a._prefix = h.prefix), (a._vendor =
				h.vendor), (a._suckMode = window.atob && a._prefix
				? !1
				: !0), a._suckMode && (a.animation.enable = !1), a._ff &&
				a._ff <= 4 &&
				(a.animation.enable = !1);
			for (var i = 0; i < d.length && !window.requestAnimationFrame; i++)
				window.requestAnimationFrame =
					window[d[i] + "RequestAnimationFrame"];
			"function" != typeof Object.getPrototypeOf &&
				(Object.getPrototypeOf = "object" == typeof "test".__proto__
					? function(a) {
							return a.__proto__;
						}
					: function(a) {
							return a.constructor.prototype;
						}), a._domNode.nextElementSibling === b &&
				Object.defineProperty(Element.prototype, "nextElementSibling", {
					get: function() {
						for (var a = this.nextSibling; a; ) {
							if (1 === a.nodeType) return a;
							a = a.nextSibling;
						}
						return null;
					}
				}), a._execAction("_platformDetect", 1);
		},
		_refresh: function(a) {
			var c = this;
			c._execAction(
				"_refresh",
				0,
				arguments
			), (c._$targets = c._$container.find(c.selectors.target));
			for (var d = 0; d < c._$targets.length; d++) {
				var e = c._$targets[d];
				if (e.dataset === b) {
					e.dataset = {};
					for (var f = 0; f < e.attributes.length; f++) {
						var g = e.attributes[f], h = g.name, i = g.nodeValue;
						if (h.indexOf("data-") > -1) {
							var j = c._helpers._camelCase(
								h.substring(5, h.length)
							);
							e.dataset[j] = i;
						}
					}
				}
				e.mixParent === b && (e.mixParent = c._id);
			}
			if (
				(c._$targets.length && a) ||
				(!c._origOrder.length && c._$targets.length)
			) {
				c._origOrder = [];
				for (var d = 0; d < c._$targets.length; d++) {
					var e = c._$targets[d];
					c._origOrder.push(e);
				}
			}
			c._execAction("_refresh", 1, arguments);
		},
		_bindHandlers: function() {
			var b = this;
			b._execAction("_bindHandlers", 0), b.controls.live
				? b._$body
						.on(
							"click.mixItUp." + b._id,
							b.selectors.sort,
							function() {
								b._processClick(a(this), "sort");
							}
						)
						.on(
							"click.mixItUp." + b._id,
							b.selectors.filter,
							function() {
								b._processClick(a(this), "filter");
							}
						)
				: ((b._$sortButtons = a(
						b.selectors.sort
					)), (b._$filterButtons = a(
						b.selectors.filter
					)), b._$sortButtons.on("click.mixItUp." + b._id, function() {
						b._processClick(a(this), "sort");
					}), b._$filterButtons.on(
						"click.mixItUp." + b._id,
						function() {
							b._processClick(a(this), "filter");
						}
					)), b._execAction("_bindHandlers", 1);
		},
		_processClick: function(b, c) {
			var d = this;
			if (
				(d._execAction("_processClick", 0, arguments), !d._mixing ||
					(d.animation.queue &&
						d._queue.length < d.animation.queueLimit))
			) {
				if (((d._clicking = !0), "sort" === c)) {
					var e = b.attr("data-sort");
					(!b.hasClass(d.controls.activeClass) ||
						e.indexOf("random") > -1) &&
						(a(d.selectors.sort).removeClass(
							d.controls.activeClass
						), b.addClass(d.controls.activeClass), d.sort(e));
				}
				if ("filter" === c) {
					var f,
						g = b.attr("data-filter"),
						h = "or" === d.controls.toggleLogic ? "," : "";
					d.controls.toggleFilterButtons
						? (d._buildToggleArray(), b.hasClass(
								d.controls.activeClass
							)
								? (b.removeClass(
										d.controls.activeClass
									), (f = d._toggleArray.indexOf(
										g
									)), d._toggleArray.splice(f, 1))
								: (b.addClass(
										d.controls.activeClass
									), d._toggleArray.push(
										g
									)), (d._toggleArray = a.grep(
								d._toggleArray,
								function(a) {
									return a;
								}
							)), (d._toggleString = d._toggleArray.join(
								h
							)), d.filter(d._toggleString))
						: b.hasClass(d.controls.activeClass) ||
								(a(d.selectors.filter).removeClass(
									d.controls.activeClass
								), b.addClass(d.controls.activeClass), d.filter(
									g
								));
				}
				d._execAction("_processClick", 1, arguments);
			} else
				"function" == typeof d.callbacks.onMixBusy &&
					d.callbacks.onMixBusy.call(
						d._domNode,
						d._state,
						d
					), d._execAction("_processClickBusy", 1, arguments);
		},
		_buildToggleArray: function() {
			var a = this, b = a._activeFilter.replace(/\s/g, "");
			if (
				(a._execAction("_buildToggleArray", 0, arguments), "or" ===
					a.controls.toggleLogic)
			)
				a._toggleArray = b.split(",");
			else {
				(a._toggleArray = b.split(".")), !a._toggleArray[0] &&
					a._toggleArray.shift();
				for (var c, d = 0; (c = a._toggleArray[d]); d++)
					a._toggleArray[d] = "." + c;
			}
			a._execAction("_buildToggleArray", 1, arguments);
		},
		_updateControls: function(c, d) {
			var e = this,
				f = { filter: c.filter, sort: c.sort },
				g = function(a, b) {
					d && "filter" == h && "none" !== f.filter && "" !== f.filter
						? a.filter(b).addClass(e.controls.activeClass)
						: a
								.removeClass(e.controls.activeClass)
								.filter(b)
								.addClass(e.controls.activeClass);
				},
				h = "filter",
				i = null;
			e._execAction("_updateControls", 0, arguments), c.filter === b &&
				(f.filter = e._activeFilter), c.sort === b &&
				(f.sort = e._activeSort), f.filter === e.selectors.target &&
				(f.filter = "all");
			for (var j = 0; 2 > j; j++)
				(i = e.controls.live
					? a(e.selectors[h])
					: e["_$" + h + "Buttons"]), i &&
					g(i, "[data-" + h + '="' + f[h] + '"]'), (h = "sort");
			e._execAction("_updateControls", 1, arguments);
		},
		_filter: function() {
			var b = this;
			b._execAction("_filter", 0);
			for (var c = 0; c < b._$targets.length; c++) {
				var d = a(b._$targets[c]);
				d.is(b._activeFilter)
					? (b._$show = b._$show.add(d))
					: (b._$hide = b._$hide.add(d));
			}
			b._execAction("_filter", 1);
		},
		_sort: function() {
			var a = this,
				b = function(a) {
					for (var b = a.slice(), c = b.length, d = c; d--; ) {
						var e = parseInt(Math.random() * c), f = b[d];
						(b[d] = b[e]), (b[e] = f);
					}
					return b;
				};
			a._execAction("_sort", 0), (a._startOrder = []);
			for (var c = 0; c < a._$targets.length; c++) {
				var d = a._$targets[c];
				a._startOrder.push(d);
			}
			switch (a._newSort[0].sortBy) {
				case "default":
					a._newOrder = a._origOrder;
					break;
				case "random":
					a._newOrder = b(a._startOrder);
					break;
				case "custom":
					a._newOrder = a._newSort[0].order;
					break;
				default:
					a._newOrder = a._startOrder.concat().sort(function(b, c) {
						return a._compare(b, c);
					});
			}
			a._execAction("_sort", 1);
		},
		_compare: function(a, b, c) {
			c = c ? c : 0;
			var d = this,
				e = d._newSort[c].order,
				f = function(a) {
					return a.dataset[d._newSort[c].sortBy] || 0;
				},
				g = isNaN(1 * f(a)) ? f(a).toLowerCase() : 1 * f(a),
				h = isNaN(1 * f(b)) ? f(b).toLowerCase() : 1 * f(b);
			return h > g
				? "asc" == e ? -1 : 1
				: g > h
						? "asc" == e ? 1 : -1
						: g == h && d._newSort.length > c + 1
								? d._compare(a, b, c + 1)
								: 0;
		},
		_printSort: function(a) {
			var b = this,
				c = a ? b._startOrder : b._newOrder,
				d = b._$parent[0].querySelectorAll(b.selectors.target),
				e = d[d.length - 1].nextElementSibling,
				f = document.createDocumentFragment();
			b._execAction("_printSort", 0, arguments);
			for (var g = 0; g < d.length; g++) {
				var h = d[g], i = h.nextSibling;
				"absolute" !== h.style.position &&
					(i &&
						"#text" == i.nodeName &&
						b._$parent[0].removeChild(i), b._$parent[0].removeChild(
						h
					));
			}
			for (var g = 0; g < c.length; g++) {
				var j = c[g];
				if (
					"default" != b._newSort[0].sortBy ||
					"desc" != b._newSort[0].order ||
					a
				)
					f.appendChild(j), f.appendChild(
						document.createTextNode(" ")
					);
				else {
					var k = f.firstChild;
					f.insertBefore(j, k), f.insertBefore(
						document.createTextNode(" "),
						j
					);
				}
			}
			e
				? b._$parent[0].insertBefore(f, e)
				: b._$parent[0].appendChild(f), b._execAction(
				"_printSort",
				1,
				arguments
			);
		},
		_parseSort: function(a) {
			for (
				var b = this,
					c = "string" == typeof a ? a.split(" ") : [a],
					d = [],
					e = 0;
				e < c.length;
				e++
			) {
				var f = "string" == typeof a
					? c[e].split(":")
					: ["custom", c[e]],
					g = {
						sortBy: b._helpers._camelCase(f[0]),
						order: f[1] || "asc"
					};
				if ((d.push(g), "default" == g.sortBy || "random" == g.sortBy))
					break;
			}
			return b._execFilter("_parseSort", d, arguments);
		},
		_parseEffects: function() {
			var a = this,
				b = {
					opacity: "",
					transformIn: "",
					transformOut: "",
					filter: ""
				},
				c = function(b, c) {
					if (a.animation.effects.indexOf(b) > -1) {
						if (c) {
							var d = a.animation.effects.indexOf(b + "(");
							if (d > -1) {
								var e = a.animation.effects.substring(d),
									f = /\(([^)]+)\)/.exec(e),
									g = f[1];
								return { val: g };
							}
						}
						return !0;
					}
					return !1;
				},
				d = function(a, b) {
					return b
						? "-" === a.charAt(0) ? a.substr(1, a.length) : "-" + a
						: a;
				},
				e = function(a, e) {
					for (
						var f = [
							["scale", ".01"],
							["translateX", "20px"],
							["translateY", "20px"],
							["translateZ", "20px"],
							["rotateX", "90deg"],
							["rotateY", "90deg"],
							["rotateZ", "180deg"]
						],
							g = 0;
						g < f.length;
						g++
					) {
						var h = f[g][0], i = f[g][1], j = e && "scale" !== h;
						b[a] += c(h)
							? h + "(" + d(c(h, !0).val || i, j) + ") "
							: "";
					}
				};
			return (b.opacity = c("fade") ? c("fade", !0).val || "0" : ""), e(
				"transformIn"
			), a.animation.reverseOut
				? e("transformOut", !0)
				: (b.transformOut = b.transformIn), (b.transition = {
			}), (b.transition = a._getPrefixedCSS(
				"transition",
				"all " +
					a.animation.duration +
					"ms " +
					a.animation.easing +
					", opacity " +
					a.animation.duration +
					"ms linear"
			)), (a.animation.stagger = c("stagger")
				? !0
				: !1), (a.animation.staggerDuration = parseInt(
				c("stagger")
					? c("stagger", !0).val ? c("stagger", !0).val : 100
					: 100
			)), a._execFilter("_parseEffects", b);
		},
		_buildState: function(a) {
			var b = this, c = {};
			return b._execAction("_buildState", 0), (c = {
				activeFilter: "" === b._activeFilter ? "none" : b._activeFilter,
				activeSort: b._activeSort,
				fail: !b._$show.length && "" !== b._activeFilter,
				$targets: b._$targets,
				$show: b._$show,
				$hide: b._$hide,
				totalTargets: b._$targets.length,
				totalShow: b._$show.length,
				totalHide: b._$hide.length,
				display: b.layout.display
			}), b._execAction("_buildState", 1), a
				? b._execFilter("_buildState", c)
				: ((b._state = c), void 0);
		},
		_goMix: function(a) {
			var b = this,
				c = function() {
					b._chrome &&
						31 === b._chrome &&
						f(b._$parent[0]), b._setInter(), d();
				},
				d = function() {
					var a = window.scrollY,
						c = window.scrollX,
						d = window.innerHeight;
					b._getInterMixData(), b._setFinal(), b._getFinalMixData(), a +
						d >
						window.innerHeight &&
						window.scrollTo(
							c,
							a
						), b._prepTargets(), window.requestAnimationFrame
						? requestAnimationFrame(e)
						: setTimeout(function() {
								e();
							}, 20);
				},
				e = function() {
					b._animateTargets(), 0 === b._targetsBound && b._cleanUp();
				},
				f = function(a) {
					var b = a.parentElement,
						c = document.createElement("div"),
						d = document.createDocumentFragment();
					b.insertBefore(c, a), d.appendChild(a), b.replaceChild(
						a,
						c
					);
				},
				g = b._buildState(!0);
			b._execAction("_goMix", 0, arguments), !b.animation.duration &&
				(a = !1), (b._mixing = !0), b._$container.removeClass(
				b.layout.containerClassFail
			), "function" == typeof b.callbacks.onMixStart &&
				b.callbacks.onMixStart.call(
					b._domNode,
					b._state,
					g,
					b
				), b._$container.trigger("mixStart", [
				b._state,
				g,
				b
			]), b._getOrigMixData(), a && !b._suckMode
				? window.requestAnimationFrame ? requestAnimationFrame(c) : c()
				: b._cleanUp(), b._execAction("_goMix", 1, arguments);
		},
		_getTargetData: function(a, b) {
			var c, d = this;
			(a.dataset[b + "PosX"] = a.offsetLeft), (a.dataset[b + "PosY"] =
				a.offsetTop), d.animation.animateResizeTargets &&
				((c = window.getComputedStyle(a)), (a.dataset[
					b + "MarginBottom"
				] = parseInt(c.marginBottom)), (a.dataset[
					b + "MarginRight"
				] = parseInt(c.marginRight)), (a.dataset[b + "Width"] =
					a.offsetWidth), (a.dataset[b + "Height"] = a.offsetHeight));
		},
		_getOrigMixData: function() {
			var a = this,
				b = a._suckMode
					? { boxSizing: "" }
					: window.getComputedStyle(a._$parent[0]),
				c = b.boxSizing || b[a._vendor + "BoxSizing"];
			(a._incPadding = "border-box" === c), a._execAction(
				"_getOrigMixData",
				0
			), !a._suckMode &&
				(a.effects = a._parseEffects()), (a._$toHide = a._$hide.filter(
				":visible"
			)), (a._$toShow = a._$show.filter(
				":hidden"
			)), (a._$pre = a._$targets.filter(
				":visible"
			)), (a._startHeight = a._incPadding
				? a._$parent.outerHeight()
				: a._$parent.height());
			for (var d = 0; d < a._$pre.length; d++) {
				var e = a._$pre[d];
				a._getTargetData(e, "orig");
			}
			a._execAction("_getOrigMixData", 1);
		},
		_setInter: function() {
			var a = this;
			a._execAction("_setInter", 0), a._changingLayout &&
				a.animation.animateChangeLayout
				? (a._$toShow.css("display", a._newDisplay), a._changingClass &&
						a._$container
							.removeClass(a.layout.containerClass)
							.addClass(a._newClass))
				: a._$toShow.css("display", a.layout.display), a._execAction(
				"_setInter",
				1
			);
		},
		_getInterMixData: function() {
			var a = this;
			a._execAction("_getInterMixData", 0);
			for (var b = 0; b < a._$toShow.length; b++) {
				var c = a._$toShow[b];
				a._getTargetData(c, "inter");
			}
			for (var b = 0; b < a._$pre.length; b++) {
				var c = a._$pre[b];
				a._getTargetData(c, "inter");
			}
			a._execAction("_getInterMixData", 1);
		},
		_setFinal: function() {
			var a = this;
			a._execAction("_setFinal", 0), a._sorting &&
				a._printSort(), a._$toHide.removeStyle(
				"display"
			), a._changingLayout &&
				a.animation.animateChangeLayout &&
				a._$pre.css("display", a._newDisplay), a._execAction(
				"_setFinal",
				1
			);
		},
		_getFinalMixData: function() {
			var a = this;
			a._execAction("_getFinalMixData", 0);
			for (var b = 0; b < a._$toShow.length; b++) {
				var c = a._$toShow[b];
				a._getTargetData(c, "final");
			}
			for (var b = 0; b < a._$pre.length; b++) {
				var c = a._$pre[b];
				a._getTargetData(c, "final");
			}
			(a._newHeight = a._incPadding
				? a._$parent.outerHeight()
				: a._$parent.height()), a._sorting &&
				a._printSort(!0), a._$toShow.removeStyle(
				"display"
			), a._$pre.css("display", a.layout.display), a._changingClass &&
				a.animation.animateChangeLayout &&
				a._$container
					.removeClass(a._newClass)
					.addClass(a.layout.containerClass), a._execAction(
				"_getFinalMixData",
				1
			);
		},
		_prepTargets: function() {
			var b = this,
				c = {
					_in: b._getPrefixedCSS("transform", b.effects.transformIn),
					_out: b._getPrefixedCSS("transform", b.effects.transformOut)
				};
			b._execAction("_prepTargets", 0), b.animation
				.animateResizeContainer &&
				b._$parent.css("height", b._startHeight + "px");
			for (var d = 0; d < b._$toShow.length; d++) {
				var e = b._$toShow[d], f = a(e);
				(e.style.opacity =
					b.effects.opacity), (e.style.display = b._changingLayout &&
					b.animation.animateChangeLayout
					? b._newDisplay
					: b.layout.display), f.css(c._in), b.animation
					.animateResizeTargets &&
					((e.style.width =
						e.dataset.finalWidth + "px"), (e.style.height =
						e.dataset.finalHeight + "px"), (e.style.marginRight =
						-(e.dataset.finalWidth - e.dataset.interWidth) +
						1 * e.dataset.finalMarginRight +
						"px"), (e.style.marginBottom =
						-(e.dataset.finalHeight - e.dataset.interHeight) +
						1 * e.dataset.finalMarginBottom +
						"px"));
			}
			for (var d = 0; d < b._$pre.length; d++) {
				var e = b._$pre[d],
					f = a(e),
					g = {
						x: e.dataset.origPosX - e.dataset.interPosX,
						y: e.dataset.origPosY - e.dataset.interPosY
					},
					c = b._getPrefixedCSS(
						"transform",
						"translate(" + g.x + "px," + g.y + "px)"
					);
				f.css(c), b.animation.animateResizeTargets &&
					((e.style.width =
						e.dataset.origWidth + "px"), (e.style.height =
						e.dataset.origHeight + "px"), e.dataset.origWidth -
						e.dataset.finalWidth &&
						(e.style.marginRight =
							-(e.dataset.origWidth - e.dataset.interWidth) +
							1 * e.dataset.origMarginRight +
							"px"), e.dataset.origHeight -
						e.dataset.finalHeight &&
						(e.style.marginBottom =
							-(e.dataset.origHeight - e.dataset.interHeight) +
							1 * e.dataset.origMarginBottom +
							"px"));
			}
			b._execAction("_prepTargets", 1);
		},
		_animateTargets: function() {
			var b = this;
			b._execAction(
				"_animateTargets",
				0
			), (b._targetsDone = 0), (b._targetsBound = 0), b._$parent
				.css(
					b._getPrefixedCSS(
						"perspective",
						b.animation.perspectiveDistance + "px"
					)
				)
				.css(
					b._getPrefixedCSS(
						"perspective-origin",
						b.animation.perspectiveOrigin
					)
				), b.animation.animateResizeContainer &&
				b._$parent
					.css(
						b._getPrefixedCSS(
							"transition",
							"height " + b.animation.duration + "ms ease"
						)
					)
					.css("height", b._newHeight + "px");
			for (var c = 0; c < b._$toShow.length; c++) {
				var d = b._$toShow[c],
					e = a(d),
					f = {
						x: d.dataset.finalPosX - d.dataset.interPosX,
						y: d.dataset.finalPosY - d.dataset.interPosY
					},
					g = b._getDelay(c),
					h = {};
				d.style.opacity = "";
				for (var i = 0; 2 > i; i++) {
					var j = 0 === i ? (j = b._prefix) : "";
					b._ff &&
						b._ff <= 20 &&
						((h[j + "transition-property"] = "all"), (h[
							j + "transition-timing-function"
						] =
							b.animation.easing + "ms"), (h[
							j + "transition-duration"
						] =
							b.animation.duration + "ms")), (h[
						j + "transition-delay"
					] =
						g + "ms"), (h[j + "transform"] =
						"translate(" + f.x + "px," + f.y + "px)");
				}
				(b.effects.transform || b.effects.opacity) &&
					b._bindTargetDone(e), b._ff && b._ff <= 20
					? e.css(h)
					: e.css(b.effects.transition).css(h);
			}
			for (var c = 0; c < b._$pre.length; c++) {
				var d = b._$pre[c],
					e = a(d),
					f = {
						x: d.dataset.finalPosX - d.dataset.interPosX,
						y: d.dataset.finalPosY - d.dataset.interPosY
					},
					g = b._getDelay(c);
				(d.dataset.finalPosX !== d.dataset.origPosX ||
					d.dataset.finalPosY !== d.dataset.origPosY) &&
					b._bindTargetDone(e), e.css(
					b._getPrefixedCSS(
						"transition",
						"all " +
							b.animation.duration +
							"ms " +
							b.animation.easing +
							" " +
							g +
							"ms"
					)
				), e.css(
					b._getPrefixedCSS(
						"transform",
						"translate(" + f.x + "px," + f.y + "px)"
					)
				), b.animation.animateResizeTargets &&
					(d.dataset.origWidth - d.dataset.finalWidth &&
						1 * d.dataset.finalWidth &&
						((d.style.width =
							d.dataset.finalWidth + "px"), (d.style.marginRight =
							-(d.dataset.finalWidth - d.dataset.interWidth) +
							1 * d.dataset.finalMarginRight +
							"px")), d.dataset.origHeight -
						d.dataset.finalHeight &&
						1 * d.dataset.finalHeight &&
						((d.style.height =
							d.dataset.finalHeight +
							"px"), (d.style.marginBottom =
							-(d.dataset.finalHeight - d.dataset.interHeight) +
							1 * d.dataset.finalMarginBottom +
							"px")));
			}
			b._changingClass &&
				b._$container
					.removeClass(b.layout.containerClass)
					.addClass(b._newClass);
			for (var c = 0; c < b._$toHide.length; c++) {
				for (
					var d = b._$toHide[c],
						e = a(d),
						g = b._getDelay(c),
						k = {},
						i = 0;
					2 > i;
					i++
				) {
					var j = 0 === i ? (j = b._prefix) : "";
					(k[j + "transition-delay"] = g + "ms"), (k[
						j + "transform"
					] =
						b.effects.transformOut), (k.opacity =
						b.effects.opacity);
				}
				e.css(b.effects.transition).css(k), (b.effects.transform ||
					b.effects.opacity) &&
					b._bindTargetDone(e);
			}
			b._execAction("_animateTargets", 1);
		},
		_bindTargetDone: function(b) {
			var c = this, d = b[0];
			c._execAction("_bindTargetDone", 0, arguments), d.dataset.bound ||
				((d.dataset.bound = !0), c._targetsBound++, b.on(
					"webkitTransitionEnd.mixItUp transitionend.mixItUp",
					function(e) {
						(e.originalEvent.propertyName.indexOf("transform") >
							-1 ||
							e.originalEvent.propertyName.indexOf("opacity") >
								-1) &&
							a(e.originalEvent.target).is(c.selectors.target) &&
							(b.off(".mixItUp"), delete d.dataset
								.bound, c._targetDone());
					}
				)), c._execAction("_bindTargetDone", 1, arguments);
		},
		_targetDone: function() {
			var a = this;
			a._execAction(
				"_targetDone",
				0
			), a._targetsDone++, a._targetsDone === a._targetsBound &&
				a._cleanUp(), a._execAction("_targetDone", 1);
		},
		_cleanUp: function() {
			var b = this,
				c = b.animation.animateResizeTargets
					? "transform opacity width height margin-bottom margin-right"
					: "transform opacity";
			(unBrake = function() {
				b._$targets.removeStyle("transition", b._prefix);
			}), b._execAction("_cleanUp", 0), b._changingLayout
				? b._$show.css("display", b._newDisplay)
				: b._$show.css("display", b.layout.display), b._$targets.css(
				b._brake
			), b._$targets
				.removeStyle(c, b._prefix)
				.removeAttr(
					"data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"
				), b._$hide.removeStyle("display"), b._$parent.removeStyle(
				"height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",
				b._prefix
			), b._sorting &&
				(b._printSort(), (b._activeSort =
					b._newSortString), (b._sorting = !1)), b._changingLayout &&
				(b._changingDisplay &&
					((b.layout.display =
						b._newDisplay), (b._changingDisplay = !1)), b._changingClass &&
					(b._$parent
						.removeClass(b.layout.containerClass)
						.addClass(b._newClass), (b.layout.containerClass =
						b._newClass), (b._changingClass = !1)), (b._changingLayout = !1)), b._refresh(), b._buildState(), b
				._state.fail &&
				b._$container.addClass(
					b.layout.containerClassFail
				), (b._$show = a()), (b._$hide = a()), window.requestAnimationFrame &&
				requestAnimationFrame(unBrake), (b._mixing = !1), "function" ==
				typeof b.callbacks._user &&
				b.callbacks._user.call(b._domNode, b._state, b), "function" ==
				typeof b.callbacks.onMixEnd &&
				b.callbacks.onMixEnd.call(
					b._domNode,
					b._state,
					b
				), b._$container.trigger("mixEnd", [b._state, b]), b._state
				.fail &&
				("function" == typeof b.callbacks.onMixFail &&
					b.callbacks.onMixFail.call(
						b._domNode,
						b._state,
						b
					), b._$container.trigger("mixFail", [
					b._state,
					b
				])), b._loading &&
				("function" == typeof b.callbacks.onMixLoad &&
					b.callbacks.onMixLoad.call(
						b._domNode,
						b._state,
						b
					), b._$container.trigger("mixLoad", [b._state, b])), b
				._queue.length &&
				(b._execAction("_queue", 0), b.multiMix(
					b._queue[0][0],
					b._queue[0][1],
					b._queue[0][2]
				), b._queue.splice(0, 1)), b._execAction(
				"_cleanUp",
				1
			), (b._loading = !1);
		},
		_getPrefixedCSS: function(a, b, c) {
			var d = this, e = {};
			for (i = 0; 2 > i; i++) {
				var f = 0 === i ? d._prefix : "";
				e[f + a] = c ? f + b : b;
			}
			return d._execFilter("_getPrefixedCSS", e, arguments);
		},
		_getDelay: function(a) {
			var b = this,
				c = "function" == typeof b.animation.staggerFunction
					? b.animation.staggerFunction.call(b._domNode, a, b._state)
					: a,
				d = b.animation.stagger ? c * b.animation.staggerDuration : 0;
			return b._execFilter("_getDelay", d, arguments);
		},
		_parseMultiMixArgs: function(a) {
			for (
				var b = this,
					c = {
						command: null,
						animate: b.animation.enable,
						callback: null
					},
					d = 0;
				d < a.length;
				d++
			) {
				var e = a[d];
				null !== e &&
					("object" == typeof e || "string" == typeof e
						? (c.command = e)
						: "boolean" == typeof e
								? (c.animate = e)
								: "function" == typeof e && (c.callback = e));
			}
			return b._execFilter("_parseMultiMixArgs", c, arguments);
		},
		_parseInsertArgs: function(b) {
			for (
				var c = this,
					d = {
						index: 0,
						$object: a(),
						multiMix: { filter: c._state.activeFilter },
						callback: null
					},
					e = 0;
				e < b.length;
				e++
			) {
				var f = b[e];
				"number" == typeof f
					? (d.index = f)
					: "object" == typeof f && f instanceof a
							? (d.$object = f)
							: "object" == typeof f && f instanceof HTMLElement
									? (d.$object = a(f))
									: "object" == typeof f && null !== f
											? (d.multiMix = f)
											: "boolean" != typeof f || f
													? "function" == typeof f &&
															(d.callback = f)
													: (d.multiMix = !1);
			}
			return c._execFilter("_parseInsertArgs", d, arguments);
		},
		_execAction: function(a, b, c) {
			var d = this, e = b ? "post" : "pre";
			if (!d._actions.isEmptyObject && d._actions.hasOwnProperty(a))
				for (var f in d._actions[a][e])
					d._actions[a][e][f].call(d, c);
		},
		_execFilter: function(a, b, c) {
			var d = this;
			if (d._filters.isEmptyObject || !d._filters.hasOwnProperty(a))
				return b;
			for (var e in d._filters[a])
				return d._filters[a][e].call(d, c);
		},
		_helpers: {
			_camelCase: function(a) {
				return a.replace(/-([a-z])/g, function(a) {
					return a[1].toUpperCase();
				});
			}
		},
		isMixing: function() {
			var a = this;
			return a._execFilter("isMixing", a._mixing);
		},
		filter: function() {
			var a = this, b = a._parseMultiMixArgs(arguments);
			a._clicking && (a._toggleString = ""), a.multiMix(
				{ filter: b.command },
				b.animate,
				b.callback
			);
		},
		sort: function() {
			var a = this, b = a._parseMultiMixArgs(arguments);
			a.multiMix({ sort: b.command }, b.animate, b.callback);
		},
		changeLayout: function() {
			var a = this, b = a._parseMultiMixArgs(arguments);
			a.multiMix({ changeLayout: b.command }, b.animate, b.callback);
		},
		multiMix: function() {
			var a = this, c = a._parseMultiMixArgs(arguments);
			if ((a._execAction("multiMix", 0, arguments), a._mixing))
				a.animation.queue && a._queue.length < a.animation.queueLimit
					? (a._queue.push(arguments), a.controls.enable &&
							!a._clicking &&
							a._updateControls(c.command), a._execAction(
							"multiMixQueue",
							1,
							arguments
						))
					: ("function" == typeof a.callbacks.onMixBusy &&
							a.callbacks.onMixBusy.call(
								a._domNode,
								a._state,
								a
							), a._$container.trigger("mixBusy", [
							a._state,
							a
						]), a._execAction("multiMixBusy", 1, arguments));
			else {
				a.controls.enable &&
					!a._clicking &&
					(a.controls.toggleFilterButtons &&
						a._buildToggleArray(), a._updateControls(
						c.command,
						a.controls.toggleFilterButtons
					)), a._queue.length < 2 && (a._clicking = !1), delete a
					.callbacks._user, c.callback &&
					(a.callbacks._user = c.callback);
				var d = c.command.sort,
					e = c.command.filter,
					f = c.command.changeLayout;
				a._refresh(), d &&
					((a._newSort = a._parseSort(
						d
					)), (a._newSortString = d), (a._sorting = !0), a._sort()), e !==
					b &&
					((e = "all" === e
						? a.selectors.target
						: e), (a._activeFilter = e)), a._filter(), f &&
					((a._newDisplay = "string" == typeof f
						? f
						: f.display || a.layout.display), (a._newClass =
						f.containerClass || ""), (a._newDisplay !==
						a.layout.display ||
						a._newClass !== a.layout.containerClass) &&
						((a._changingLayout = !0), (a._changingClass =
							a._newClass !==
							a.layout.containerClass), (a._changingDisplay =
							a._newDisplay !==
							a.layout.display))), a._$targets.css(
					a._brake
				), a._goMix(
					c.animate ^ a.animation.enable
						? c.animate
						: a.animation.enable
				), a._execAction("multiMix", 1, arguments);
			}
		},
		insert: function() {
			var a = this,
				b = a._parseInsertArgs(arguments),
				c = "function" == typeof b.callback ? b.callback : null,
				d = document.createDocumentFragment(),
				e = b.index < a._$targets.length
					? a._$targets[b.index]
					: a._$targets[a._$targets.length - 1].nextElementSibling;
			if ((a._execAction("insert", 0, arguments), b.$object)) {
				for (var f = 0; f < b.$object.length; f++) {
					var g = b.$object[f];
					d.appendChild(g), d.appendChild(
						document.createTextNode(" ")
					);
				}
				a._$parent[0].insertBefore(d, e);
			}
			a._execAction("insert", 1, arguments), "object" == typeof b.multiMix
				? a.multiMix(b.multiMix, c)
				: a._refresh();
		},
		prepend: function() {
			var a = this, b = a._parseInsertArgs(arguments);
			a.insert(0, b.$object, b.multiMix, b.callback);
		},
		append: function() {
			var a = this, b = a._parseInsertArgs(arguments);
			a.insert(a._state.totalTargets, b.$object, b.multiMix, b.callback);
		},
		getOption: function(a) {
			var c = this,
				d = function(a, c) {
					for (
						var d = c.split("."),
							e = d.pop(),
							f = d.length,
							g = 1,
							h = d[0] || c;
						(a = a[h]) && f > g;

					)
						(h = d[g]), g++;
					return a !== b ? a[e] !== b ? a[e] : a : void 0;
				};
			return a ? c._execFilter("getOption", d(c, a), arguments) : c;
		},
		setOptions: function(b) {
			var c = this;
			c._execAction("setOptions", 0, arguments), "object" == typeof b &&
				a.extend(!0, c, b), c._execAction("setOptions", 1, arguments);
		},
		getState: function() {
			var a = this;
			return a._execFilter("getState", a._state, a);
		},
		destroy: function(b) {
			var c = this;
			c._execAction("destroy", 0, arguments), c._$body
				.add(a(c.selectors.sort))
				.add(a(c.selectors.filter))
				.off(".mixItUp");
			for (var d = 0; d < c._$targets.length; d++) {
				var e = c._$targets[d];
				b && (e.style.display = ""), delete e.mixParent;
			}
			c._execAction("destroy", 1, arguments), delete a.MixItUp.prototype
				._instances[c._id];
		}
	}), (a.fn.mixItUp = function() {
		var c,
			d = arguments,
			e = [],
			f = function(b, c) {
				var d = new a.MixItUp(),
					e = function() {
						return ("00000" +
							((16777216 * Math.random()) << 0).toString(16))
							.substr(-6)
							.toUpperCase();
					};
				d._execAction("_instantiate", 0, arguments), (b.id = b.id
					? b.id
					: "MixItUp" + e()), d._instances[b.id] ||
					((d._instances[b.id] = d), d._init(b, c)), d._execAction(
					"_instantiate",
					1,
					arguments
				);
			};
		return (c = this.each(function() {
			if (d && "string" == typeof d[0]) {
				var c = a.MixItUp.prototype._instances[this.id];
				if ("isLoaded" == d[0]) e.push(c ? !0 : !1);
				else {
					var g = c[d[0]](d[1], d[2], d[3]);
					g !== b && e.push(g);
				}
			} else f(this, d[0]);
		})), e.length ? e.length > 1 ? e : e[0] : c;
	}), (a.fn.removeStyle = function(a, c) {
		return (c = c ? c : ""), this.each(function() {
			for (
				var d = this, e = a.split(" "), f = 0;
				f < e.length;
				f++
			) for (var g = 0; 2 > g; g++) {
					var h = g ? e[f] : c + e[f];
					if (
						(d.style[h] !== b &&
							"unknown" != typeof d.style[h] &&
							d.style[h].length > 0 &&
							(d.style[h] = ""), !c)
					)
						break;
				}
			d.attributes &&
				d.attributes.style &&
				d.attributes.style !== b &&
				"" === d.attributes.style.value &&
				d.attributes.removeNamedItem("style");
		});
	});
})(jQuery);

!(function(d, y, k, j) {
	function s(a, b) {
		var c = Math.max(0, a[0] - b[0], b[0] - a[1]),
			e = Math.max(0, a[2] - b[1], b[1] - a[3]);
		return c + e;
	}
	function t(a, b, c, e) {
		for (
			var h = a.length, e = e ? "offset" : "position", c = c || 0;
			h--;

		) {
			var f = a[h].el ? a[h].el : d(a[h]), i = f[e]();
			i.left += parseInt(f.css("margin-left"), 10);
			i.top += parseInt(f.css("margin-top"), 10);
			b[h] = [
				i.left - c,
				i.left + f.outerWidth() + c,
				i.top - c,
				i.top + f.outerHeight() + c
			];
		}
	}
	function m(a, b) {
		var c = b.offset();
		return { left: a.left - c.left, top: a.top - c.top };
	}
	function u(a, b, c) {
		for (
			var b = [b.left, b.top],
				c = c && [c.left, c.top],
				e,
				h = a.length,
				d = [];
			h--;

		)
			(e = a[h]), (d[h] = [h, s(e, b), c && s(e, c)]);
		return (d = d.sort(function(a, b) {
			return b[1] - a[1] || b[2] - a[2] || b[0] - a[0];
		}));
	}
	function n(a) {
		this.options = d.extend({}, l, a);
		this.containers = [];
		this.options.rootGroup ||
			((this.scrollProxy = d.proxy(
				this.scroll,
				this
			)), (this.dragProxy = d.proxy(
				this.drag,
				this
			)), (this.dropProxy = d.proxy(
				this.drop,
				this
			)), (this.placeholder = d(
				this.options.placeholder
			)), a.isValidTarget || (this.options.isValidTarget = j));
	}
	function q(a, b) {
		this.el = a;
		this.options = d.extend({}, w, b);
		this.group = n.get(this.options);
		this.rootGroup = this.options.rootGroup || this.group;
		this.handle =
			this.rootGroup.options.handle ||
			this.rootGroup.options.itemSelector;
		var c = this.rootGroup.options.itemPath;
		this.target = c ? this.el.find(c) : this.el;
		this.target.on(o.start, this.handle, d.proxy(this.dragInit, this));
		this.options.drop && this.group.containers.push(this);
	}
	var o,
		w = { drag: !0, drop: !0, exclude: "", nested: !0, vertical: !0 },
		l = {
			afterMove: function() {},
			containerPath: "",
			containerSelector: "ol, ul",
			distance: 0,
			delay: 0,
			handle: "",
			itemPath: "",
			itemSelector: "li",
			isValidTarget: function() {
				return !0;
			},
			onCancel: function() {},
			onDrag: function(a, b) {
				a.css(b);
			},
			onDragStart: function(a) {
				a.css({ height: a.height(), width: a.width() });
				a.addClass("dragged");
				d("body").addClass("dragging");
			},
			onDrop: function(a) {
				a.removeClass("dragged").removeAttr("style");
				d("body").removeClass("dragging");
			},
			onMousedown: function(a, b, c) {
				if (!c.target.nodeName.match(/^(input|select)$/i))
					return c.preventDefault(), !0;
			},
			placeholder: '<li class="placeholder"/>',
			pullPlaceholder: !0,
			serialize: function(a, b, c) {
				a = d.extend({}, a.data());
				if (c) return [b];
				b[0] && (a.children = b);
				delete a.subContainers;
				delete a.sortable;
				return a;
			},
			tolerance: 0
		},
		p = {},
		v = 0,
		x = { left: 0, top: 0, bottom: 0, right: 0 };
	o = {
		start: "touchstart.sortable mousedown.sortable",
		drop: "touchend.sortable touchcancel.sortable mouseup.sortable",
		drag: "touchmove.sortable mousemove.sortable",
		scroll: "scroll.sortable"
	};
	n.get = function(a) {
		p[a.group] ||
			(a.group === j && (a.group = v++), (p[a.group] = new n(a)));
		return p[a.group];
	};
	n.prototype = {
		dragInit: function(a, b) {
			this.$document = d(b.el[0].ownerDocument);
			this.item = d(a.target).closest(this.options.itemSelector);
			this.itemContainer = b;
			!this.item.is(this.options.exclude) &&
				this.options.onMousedown(this.item, l.onMousedown, a) &&
				(this.setPointer(a), this.toggleListeners(
					"on"
				), this.setupDelayTimer(), (this.dragInitDone = !0));
		},
		drag: function(a) {
			if (!this.dragging) {
				if (!this.distanceMet(a) || !this.delayMet) return;
				this.options.onDragStart(
					this.item,
					this.itemContainer,
					l.onDragStart,
					a
				);
				this.item.before(this.placeholder);
				this.dragging = !0;
			}
			this.setPointer(a);
			this.options.onDrag(
				this.item,
				m(this.pointer, this.item.offsetParent()),
				l.onDrag,
				a
			);
			var b = a.pageX || a.originalEvent.pageX,
				a = a.pageY || a.originalEvent.pageY,
				c = this.sameResultBox,
				e = this.options.tolerance;
			if (
				!c ||
				c.top - e > a ||
				c.bottom + e < a ||
				c.left - e > b ||
				c.right + e < b
			)
				this.searchValidTarget() || this.placeholder.detach();
		},
		drop: function(a) {
			this.toggleListeners("off");
			this.dragInitDone = !1;
			if (this.dragging) {
				if (this.placeholder.closest("html")[0])
					this.placeholder.before(this.item).detach();
				else
					this.options.onCancel(
						this.item,
						this.itemContainer,
						l.onCancel,
						a
					);
				this.options.onDrop(
					this.item,
					this.getContainer(this.item),
					l.onDrop,
					a
				);
				this.clearDimensions();
				this.clearOffsetParent();
				this.lastAppendedItem = this.sameResultBox = j;
				this.dragging = !1;
			}
		},
		searchValidTarget: function(a, b) {
			a ||
				((a = this.relativePointer || this.pointer), (b =
					this.lastRelativePointer || this.lastPointer));
			for (
				var c = u(this.getContainerDimensions(), a, b), e = c.length;
				e--;

			) {
				var d = c[e][0];
				if (!c[e][1] || this.options.pullPlaceholder)
					if (((d = this.containers[d]), !d.disabled)) {
						if (!this.$getOffsetParent())
							var f = d.getItemOffsetParent(),
								a = m(a, f),
								b = m(b, f);
						if (d.searchValidTarget(a, b)) return !0;
					}
			}
			this.sameResultBox && (this.sameResultBox = j);
		},
		movePlaceholder: function(a, b, c, e) {
			var d = this.lastAppendedItem;
			if (e || !(d && d[0] === b[0]))
				b[c](
					this.placeholder
				), (this.lastAppendedItem = b), (this.sameResultBox = e), this.options.afterMove(
					this.placeholder,
					a,
					b
				);
		},
		getContainerDimensions: function() {
			this.containerDimensions ||
				t(
					this.containers,
					(this.containerDimensions = []),
					this.options.tolerance,
					!this.$getOffsetParent()
				);
			return this.containerDimensions;
		},
		getContainer: function(a) {
			return a.closest(this.options.containerSelector).data(k);
		},
		$getOffsetParent: function() {
			if (this.offsetParent === j) {
				var a = this.containers.length - 1,
					b = this.containers[a].getItemOffsetParent();
				if (!this.options.rootGroup)
					for (; a--; )
						if (
							b[0] != this.containers[a].getItemOffsetParent()[0]
						) {
							b = !1;
							break;
						}
				this.offsetParent = b;
			}
			return this.offsetParent;
		},
		setPointer: function(a) {
			a = this.getPointer(a);
			if (this.$getOffsetParent()) {
				var b = m(a, this.$getOffsetParent());
				this.lastRelativePointer = this.relativePointer;
				this.relativePointer = b;
			}
			this.lastPointer = this.pointer;
			this.pointer = a;
		},
		distanceMet: function(a) {
			a = this.getPointer(a);
			return (
				Math.max(
					Math.abs(this.pointer.left - a.left),
					Math.abs(this.pointer.top - a.top)
				) >= this.options.distance
			);
		},
		getPointer: function(a) {
			return {
				left: a.pageX || a.originalEvent.pageX,
				top: a.pageY || a.originalEvent.pageY
			};
		},
		setupDelayTimer: function() {
			var a = this;
			this.delayMet = !this.options.delay;
			this.delayMet ||
				(clearTimeout(
					this._mouseDelayTimer
				), (this._mouseDelayTimer = setTimeout(function() {
					a.delayMet = !0;
				}, this.options.delay)));
		},
		scroll: function() {
			this.clearDimensions();
			this.clearOffsetParent();
		},
		toggleListeners: function(a) {
			var b = this;
			d.each(["drag", "drop", "scroll"], function(c, e) {
				b.$document[a](o[e], b[e + "Proxy"]);
			});
		},
		clearOffsetParent: function() {
			this.offsetParent = j;
		},
		clearDimensions: function() {
			this.traverse(function(a) {
				a._clearDimensions();
			});
		},
		traverse: function(a) {
			a(this);
			for (var b = this.containers.length; b--; )
				this.containers[b].traverse(a);
		},
		_clearDimensions: function() {
			this.containerDimensions = j;
		},
		_destroy: function() {
			p[this.options.group] = j;
		}
	};
	q.prototype = {
		dragInit: function(a) {
			var b = this.rootGroup;
			!this.disabled &&
				!b.dragInitDone &&
				this.options.drag &&
				this.isValidDrag(a) &&
				b.dragInit(a, this);
		},
		isValidDrag: function(a) {
			return (
				1 == a.which ||
				("touchstart" == a.type && 1 == a.originalEvent.touches.length)
			);
		},
		searchValidTarget: function(a, b) {
			var c = u(this.getItemDimensions(), a, b),
				e = c.length,
				d = this.rootGroup,
				f =
					!d.options.isValidTarget ||
					d.options.isValidTarget(d.item, this);
			if (!e && f)
				return d.movePlaceholder(this, this.target, "append"), !0;
			for (; e--; )
				if (((d = c[e][0]), !c[e][1] && this.hasChildGroup(d))) {
					if (this.getContainerGroup(d).searchValidTarget(a, b))
						return !0;
				} else if (f) return this.movePlaceholder(d, a), !0;
		},
		movePlaceholder: function(a, b) {
			var c = d(this.items[a]),
				e = this.itemDimensions[a],
				h = "after",
				f = c.outerWidth(),
				i = c.outerHeight(),
				g = c.offset(),
				g = {
					left: g.left,
					right: g.left + f,
					top: g.top,
					bottom: g.top + i
				};
			this.options.vertical
				? b.top <= (e[2] + e[3]) / 2
						? ((h = "before"), (g.bottom -= i / 2))
						: (g.top += i / 2)
				: b.left <= (e[0] + e[1]) / 2
						? ((h = "before"), (g.right -= f / 2))
						: (g.left += f / 2);
			this.hasChildGroup(a) && (g = x);
			this.rootGroup.movePlaceholder(this, c, h, g);
		},
		getItemDimensions: function() {
			this.itemDimensions ||
				((this.items = this.$getChildren(this.el, "item")
					.filter(":not(.placeholder, .dragged)")
					.get()), t(
					this.items,
					(this.itemDimensions = []),
					this.options.tolerance
				));
			return this.itemDimensions;
		},
		getItemOffsetParent: function() {
			var a = this.el;
			return "relative" === a.css("position") ||
				"absolute" === a.css("position") ||
				"fixed" === a.css("position")
				? a
				: a.offsetParent();
		},
		hasChildGroup: function(a) {
			return this.options.nested && this.getContainerGroup(a);
		},
		getContainerGroup: function(a) {
			var b = d.data(this.items[a], "subContainers");
			if (b === j) {
				var c = this.$getChildren(this.items[a], "container"), b = !1;
				c[0] &&
					((b = d.extend({}, this.options, {
						rootGroup: this.rootGroup,
						group: v++
					})), (b = c[k](b).data(k).group));
				d.data(this.items[a], "subContainers", b);
			}
			return b;
		},
		$getChildren: function(a, b) {
			var c = this.rootGroup.options,
				e = c[b + "Path"],
				c = c[b + "Selector"],
				a = d(a);
			e && (a = a.find(e));
			return a.children(c);
		},
		_serialize: function(a, b) {
			var c = this,
				e = this.$getChildren(a, b ? "item" : "container")
					.not(this.options.exclude)
					.map(function() {
						return c._serialize(d(this), !b);
					})
					.get();
			return this.rootGroup.options.serialize(a, e, b);
		},
		traverse: function(a) {
			d.each(this.items || [], function() {
				var b = d.data(this, "subContainers");
				b && b.traverse(a);
			});
			a(this);
		},
		_clearDimensions: function() {
			this.itemDimensions = j;
		},
		_destroy: function() {
			var a = this;
			this.target.off(o.start, this.handle);
			this.el.removeData(k);
			this.options.drop &&
				(this.group.containers = d.grep(this.group.containers, function(
					b
				) {
					return b != a;
				}));
			d.each(this.items || [], function() {
				d.removeData(this, "subContainers");
			});
		}
	};
	var r = {
		enable: function() {
			this.traverse(function(a) {
				a.disabled = !1;
			});
		},
		disable: function() {
			this.traverse(function(a) {
				a.disabled = !0;
			});
		},
		serialize: function() {
			return this._serialize(this.el, !0);
		},
		refresh: function() {
			this.traverse(function(a) {
				a._clearDimensions();
			});
		},
		destroy: function() {
			this.traverse(function(a) {
				a._destroy();
			});
		}
	};
	d.extend(q.prototype, r);
	d.fn[k] = function(a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return this.map(function() {
			var c = d(this), e = c.data(k);
			if (e && r[a]) return r[a].apply(e, b) || this;
			!e && (a === j || "object" === typeof a) && c.data(k, new q(c, a));
			return this;
		});
	};
})(jQuery, window, "sortable");

/**
 * jQuery jGrowl
 */
!(function(a) {
	var b = (function() {
		return (
			!1 === a.support.boxModel &&
			a.support.objectAll &&
			a.support.leadingWhitespace
		);
	})();
	(a.jGrowl = function(b, c) {
		0 === a("#jGrowl").size() &&
			a('<div id="jGrowl"></div>')
				.addClass(
					c && c.position ? c.position : a.jGrowl.defaults.position
				)
				.appendTo("body"), a("#jGrowl").jGrowl(b, c);
	}), (a.fn.jGrowl = function(b, c) {
		if (a.isFunction(this.each)) {
			var d = arguments;
			return this.each(function() {
				void 0 === a(this).data("jGrowl.instance") &&
					(a(this).data(
						"jGrowl.instance",
						a.extend(new a.fn.jGrowl(), {
							notifications: [],
							element: null,
							interval: null
						})
					), a(this)
						.data("jGrowl.instance")
						.startup(
							this
						)), a.isFunction(a(this).data("jGrowl.instance")[b]) ? a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(d).slice(1)) : a(this).data("jGrowl.instance").create(b, c);
			});
		}
	}), a.extend(a.fn.jGrowl.prototype, {
		defaults: {
			pool: 0,
			header: "",
			group: "",
			sticky: !1,
			position: "top-right",
			glue: "after",
			theme: "default",
			themeState: "highlight",
			corners: "10px",
			check: 250,
			life: 3e3,
			closeDuration: "normal",
			openDuration: "normal",
			easing: "swing",
			closer: false,
			closeTemplate: "&times;",
			closerTemplate: "<div>[ close all ]</div>",
			log: function() {},
			beforeOpen: function() {},
			afterOpen: function() {},
			open: function() {},
			beforeClose: function() {},
			close: function() {},
			animateOpen: { opacity: "show" },
			animateClose: { opacity: "hide" }
		},
		notifications: [],
		element: null,
		interval: null,
		create: function(b, c) {
			var d = a.extend({}, this.defaults, c);
			"undefined" != typeof d.speed &&
				((d.openDuration = d.speed), (d.closeDuration =
					d.speed)), this.notifications.push({
				message: b,
				options: d
			}), d.log.apply(this.element, [this.element, b, d]);
		},
		render: function(b) {
			var c = this, d = b.message, e = b.options;
			e.themeState = "" === e.themeState
				? ""
				: "ui-state-" + e.themeState;
			var f = a("<div/>")
				.addClass(
					"jGrowl-notification " +
						e.themeState +
						" ui-corner-all" +
						(void 0 !== e.group && "" !== e.group
							? " " + e.group
							: "")
				)
				.append(
					a("<div/>").addClass("jGrowl-close").html(e.closeTemplate)
				)
				.append(a("<div/>").addClass("jGrowl-header").html(e.header))
				.append(a("<div/>").addClass("jGrowl-message").html(d))
				.data("jGrowl", e)
				.addClass(e.theme)
				.children("div.jGrowl-close")
				.bind("click.jGrowl", function() {
					a(this).parent().trigger("jGrowl.beforeClose");
				})
				.parent();
			a(f)
				.bind("mouseover.jGrowl", function() {
					a("div.jGrowl-notification", c.element).data(
						"jGrowl.pause",
						!0
					);
				})
				.bind("mouseout.jGrowl", function() {
					a("div.jGrowl-notification", c.element).data(
						"jGrowl.pause",
						!1
					);
				})
				.bind("jGrowl.beforeOpen", function() {
					e.beforeOpen.apply(f, [f, d, e, c.element]) !== !1 &&
						a(this).trigger("jGrowl.open");
				})
				.bind("jGrowl.open", function() {
					e.open.apply(f, [f, d, e, c.element]) !== !1 &&
						("after" == e.glue
							? a(
									"div.jGrowl-notification:last",
									c.element
								).after(f)
							: a(
									"div.jGrowl-notification:first",
									c.element
								).before(f), a(
							this
						).animate(
							e.animateOpen,
							e.openDuration,
							e.easing,
							function() {
								a.support.opacity === !1 &&
									this.style.removeAttribute(
										"filter"
									), null !== a(this).data("jGrowl") &&
									(a(this).data(
										"jGrowl"
									).created = new Date()), a(this).trigger(
									"jGrowl.afterOpen"
								);
							}
						));
				})
				.bind("jGrowl.afterOpen", function() {
					e.afterOpen.apply(f, [f, d, e, c.element]);
				})
				.bind("jGrowl.beforeClose", function() {
					e.beforeClose.apply(f, [f, d, e, c.element]) !== !1 &&
						a(this).trigger("jGrowl.close");
				})
				.bind("jGrowl.close", function() {
					a(this).data("jGrowl.pause", !0), a(
						this
					).animate(
						e.animateClose,
						e.closeDuration,
						e.easing,
						function() {
							a.isFunction(e.close)
								? e.close.apply(f, [f, d, e, c.element]) !==
										!1 && a(this).remove()
								: a(this).remove();
						}
					);
				})
				.trigger("jGrowl.beforeOpen"), "" !== e.corners &&
				void 0 !== a.fn.corner &&
				a(f).corner(e.corners), a(
				"div.jGrowl-notification:parent",
				c.element
			).size() > 1 &&
				0 === a("div.jGrowl-closer", c.element).size() &&
				this.defaults.closer !== !1 &&
				a(this.defaults.closerTemplate)
					.addClass(
						"jGrowl-closer " +
							this.defaults.themeState +
							" ui-corner-all"
					)
					.addClass(this.defaults.theme)
					.appendTo(c.element)
					.animate(
						this.defaults.animateOpen,
						this.defaults.speed,
						this.defaults.easing
					)
					.bind("click.jGrowl", function() {
						a(this)
							.siblings()
							.trigger(
								"jGrowl.beforeClose"
							), a.isFunction(c.defaults.closer) && c.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]]);
					});
		},
		update: function() {
			a(this.element)
				.find("div.jGrowl-notification:parent")
				.each(function() {
					void 0 !== a(this).data("jGrowl") &&
						void 0 !== a(this).data("jGrowl").created &&
						a(this).data("jGrowl").created.getTime() +
							parseInt(a(this).data("jGrowl").life, 10) <
							new Date().getTime() &&
						a(this).data("jGrowl").sticky !== !0 &&
						(void 0 === a(this).data("jGrowl.pause") ||
							a(this).data("jGrowl.pause") !== !0) &&
						a(this).trigger("jGrowl.beforeClose");
				}), this.notifications.length > 0 &&
				(0 === this.defaults.pool ||
					a(this.element)
						.find("div.jGrowl-notification:parent")
						.size() < this.defaults.pool) &&
				this.render(this.notifications.shift()), a(this.element)
				.find("div.jGrowl-notification:parent")
				.size() < 2 &&
				a(this.element)
					.find("div.jGrowl-closer")
					.animate(
						this.defaults.animateClose,
						this.defaults.speed,
						this.defaults.easing,
						function() {
							a(this).remove();
						}
					);
		},
		startup: function(c) {
			(this.element = a(c)
				.addClass("jGrowl")
				.append(
					'<div class="jGrowl-notification"></div>'
				)), (this.interval = setInterval(function() {
				a(c).data("jGrowl.instance").update();
			}, parseInt(this.defaults.check, 10))), b &&
				a(this.element).addClass("ie6");
		},
		shutdown: function() {
			a(this.element)
				.removeClass("jGrowl")
				.find("div.jGrowl-notification")
				.trigger("jGrowl.close")
				.parent()
				.empty(), clearInterval(this.interval);
		},
		close: function() {
			a(this.element).find("div.jGrowl-notification").each(function() {
				a(this).trigger("jGrowl.beforeClose");
			});
		}
	}), (a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults);
})(jQuery);


/**
 * cookie
 */
(function(factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		factory(require("jquery"));
	} else {
		factory(jQuery);
	}
})(function($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
		}
		try {
			s = decodeURIComponent(s.replace(pluses, " "));
			return config.json ? JSON.parse(s) : s;
		} catch (e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = ($.cookie = function(key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === "number") {
				var days = options.expires, t = (options.expires = new Date());
				t.setTime(+t + days * 864e5);
			}
			return (document.cookie = [
				encode(key),
				"=",
				stringifyCookieValue(value),
				options.expires
					? "; expires=" + options.expires.toUTCString()
					: "",
				options.path ? "; path=" + options.path : "",
				options.domain ? "; domain=" + options.domain : "",
				options.secure ? "; secure" : ""
			].join(""));
		}
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split("; ") : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split("=");
			var name = decode(parts.shift());
			var cookie = parts.join("=");
			if (key && key === name) {
				result = read(cookie, value);
				break;
			}
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	});
	config.defaults = {};
	$.removeCookie = function(key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}
		$.cookie(key, "", $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
});