//<![CDATA[
0;var logMetaError=function(n){(new Image).src=_G.lsUrl+'&Type=Event.ClientInst&DATA=[{"T":"CI.MetaError","FID":"CI","Name":"MetaJSError","Text":"'+escape(n)+'"}]'},getHref=function(){return location.href},jsve,regexEscape;try{jsve=window.jsve;regexEscape=function(n){return n.replace(/([.?*+^$&[\]\\(){}|<>-])/g,"\\$1")};function jsErrorHandler(n){var d,g,r,u,nt,f,h,c,e;try{jsve&&logMetaError("CanaryStart");var o=n.error||n,a='"noMessage"',v=n.filename,y=n.lineno,p=n.colno,w=n.extra,s=o.severity||"Error",b=o.message||a,i=o.stack,t='"'+escape(b.replace(/"/g,""))+'"',k=new RegExp(regexEscape(getHref()),"g");if(i){for(d=/\(([^\)]+):[0-9]+:[0-9]+\)/g,r={};(g=d.exec(i))!==null;)u=g[1],r[u]?r[u]++:r[u]=1;f=0;for(h in r)r[h]>1&&(c=regexEscape(h),nt=new RegExp(c,"g"),i=i.replace(nt,f),i+="#"+f+"="+c,f++);i=i.replace(k,"self").replace(/"/g,"");t+=',"Stack":"'+(escape(i)+'"')}if(v&&(t+=',"Meta":"'+escape(v.replace(k,"self"))+'"'),y&&(t+=',"Line":"'+y+'"'),p&&(t+=',"Char":"'+p+'"'),w&&(t+=',"ExtraInfo":"'+w+'"'),b===a)if(s="Warning",t+=',"ObjectToString":"'+n.toString()+'"',JSON&&JSON.stringify)t+=',"JSON":"'+escape(JSON.stringify(n))+'"';else for(e in n)n.hasOwnProperty(e)&&(t+=',"'+e+'":"'+n[e]+'"');var tt=(new Date).getTime(),it='"T":"CI.'+s+'","FID":"CI","Name":"JS'+s+'","Text":'+t+"",rt="<E><T>Event.ClientInst<\/T><IG>"+_G.IG+"<\/IG><TS>"+tt+"<\/TS><D><![CDATA[[{"+it+"}]]\]><\/D><\/E>",ut="<ClientInstRequest><Events>"+rt+"<\/Events><STS>"+tt+"<\/STS><\/ClientInstRequest>",l=new XMLHttpRequest;l.open("POST","/fd/ls/lsp.aspx?",!0);l.setRequestHeader("Content-Type","text/xml");l.send(ut);typeof sj_evt!="undefined"&&sj_evt.fire("ErrorInstrumentation",t)}catch(ft){logMetaError("Failed to execute error handler. "+ft.message)}}window.addEventListener&&window.addEventListener("error",jsErrorHandler,!1);!jsve&&window.addEventListener||window.onerror||(window.onerror=function(n,t,i,r,u){var f="",e;typeof n=="object"&&n.srcElement&&n.srcElement.src?f="\"ScriptSrc = '"+escape(n.srcElement.src.replace(/'/g,""))+"'\"":(n=""+n,f='"'+escape(n.replace(/"/g,""))+'","Meta":"'+escape(t)+'","Line":'+i+',"Char": '+r,u&&u.stack&&(e=new RegExp(regexEscape(getHref()),"g"),f+=',"Stack":"'+escape(u.stack.replace(e,"self").replace(/"/g,"")+'"')));(new Image).src=_G.lsUrl+'&Type=Event.ClientInst&DATA=[{"T":"CI.GetError","FID":"CI","Name":"JSGetError","Text":'+f+"}]";typeof sj_evt!="undefined"&&sj_evt.fire("ErrorInstrumentation",f)})}catch(e){logMetaError("Failed to bind error handler "+e.message)};var amd,define,require;(function(n){function e(n,i,u){t[n]||(t[n]={dependencies:i,callback:u},r(n))}function r(n){if(n){if(n)return u(n)}else{if(!f){for(var r in t)u(r);f=!0}return i}}function u(n){var s,e;if(i[n])return i[n];if(t.hasOwnProperty(n)){var h=t[n],f=h.dependencies,l=h.callback,a=r,o={},c=[a,o];if(f.length<2)throw"invalid usage";else if(f.length>2)for(s=f.slice(2,f.length),e=0;e<s.length;e++)c.push(u(s[e]));return l.apply(this,c),i[n]=o,o}}var t={},i={},f=!1;n.define=e;n.require=r})(amd||(amd={}));define=amd.define;require=amd.require;var _w=window,_d=document,sb_ie=window.ActiveXObject!==undefined,sb_i6=sb_ie&&!_w.XMLHttpRequest,_ge=function(n){return _d.getElementById(n)},sb_st=function(n,t){return setTimeout(n,t)},sb_rst=sb_st,sb_ct=function(n){clearTimeout(n)},sb_gt=function(){return(new Date).getTime()},sj_gx=function(){return sb_i6?new ActiveXObject("MSXML2.XMLHTTP"):new XMLHttpRequest};_w.sj_ce=function(n,t,i){var r=_d.createElement(n);return t&&(r.id=t),i&&(r.className=i),r};_w.sj_cook={get:function(n,t){var i=_d.cookie.match(new RegExp("\\b"+n+"=[^;]+")),r;return t&&i?(r=i[0].match(new RegExp("\\b"+t+"=([^&]*)")),r?r[1]:null):i?i[0]:null}};_w.sk_merge||(_w.sk_merge=function(n){_d.cookie=n});define("fallback",["require","exports"],function(n,t){function f(){return function(){for(var r,h,c,t=[],n=0;n<arguments.length;n++)t[+n]=arguments[n];if(r=s(arguments.callee),u&&(h=e(r),h.toString()!=f().toString()))return h.apply(null,arguments);c=i[r].q;t[0]==="onPP"&&o();c.push(t)}}function s(n){for(var t in i)if(i[t].h===n)return t}function e(n,t){for(var u,e=n.split("."),i=_w,r=0;r<e.length;r++)u=e[r],typeof i[u]=="undefined"&&t&&(i[u]=r===e.length-1?f():{}),i=i[u];return i}function o(){var e=i["rms.js"].q,o,f,t,n,r,u;if(e.length>0)for(o=!1,f=0;f<e.length;f++){for(t=e[f],n=0;n<t.length;n++)if(r=t[n]["A:rms:answers:Shared:BingCore.Bundle"],r||(r=t[n]["A:rmsBu0"]),r){u=_d.createElement("script");u.setAttribute("data-rms","1");u.src=r;u.type="text/javascript";setTimeout(function(){_d.body.appendChild(u)},0);t.splice(n,1);o=!0;break}if(o)break}}function h(){var n,t,f;for(u=!1,n=0;n<r.length;n++)t=r[n],f=e(t,!0),i[t]={h:f,q:[]}}function c(){for(var t,n=0;n<r.length;n++){var o=r[n],s=i[o].q,h=e(o);for(t=0;t<s.length;t++)h.toString()!==f().toString()&&h.apply(null,s[t])}u=!0}function l(n,t,i,r){n&&((n===_w||n===_d||n===_d.body)&&t=="load"?_w.sj_evt.bind("onP1",i,!0):n.addEventListener?n.addEventListener(t,i,r):n.attachEvent?n.attachEvent("on"+t,i):n["on"+t]=i)}var r=["rms.js","sj_evt.bind","sj_evt.fire","sj_jb","sj_wf","sj_cook.get","sj_cook.set","sj_pd","sj_sp","sj_be","sj_go","sj_ev","sj_ue","sj_evt.unbind","sj_et","Log.Log","sj_mo","sj_so"],i={},u=!1;_w.fb_is=o;t.replay=c;h();_w.sj_be=l});function lb(){_w.si_sendCReq&&sb_st(_w.si_sendCReq,800);_w.lbc&&_w.lbc()};function sendBeaconWithUrl(n){var t="/fd/ls/GLinkPingPost.aspx?IG="+_G.IG+n;return navigator&&navigator.sendBeacon?navigator.sendBeacon(t,""):!1}_w.si_ct=function(n,t,i){var u="getAttribute",f,r,e;try{for(;n!==document.body;n=n.parentNode){if(f=n.tagName=="A"&&n[u]("h")||n[u]("_ct"),f){r=n[u]("_ctf");r&&_w[r]||(r="si_T");r==="si_T"&&(f+="&url="+encodeURIComponent(n[u]("href")));e="&"+f;sendBeaconWithUrl(e)||_w[r]&&_w[r](e,n,i);break}if(t)break}}catch(o){}return!0},function(){sj_be(document,"mousedown",function(n){si_ct(sb_ie?_w.event.srcElement:n.target,!1,_w.event||n)},!1)}();var wlc_d = 1500, wlc_t =63613870197;;var perf;(function(n){function f(n){return i.hasOwnProperty(n)?i[n]:n}function e(n){var t="S";return n==0?t="P":n==2&&(t="M"),t}function o(n){for(var c,i=[],t={},r,l=0;l<n.length;l++){var a=n[l],o=a.v,s=a.t,h=a.k;s===0&&(h=f(h),o=o.toString(36));s===3?i.push(""+h+":"+o):(r=t[s]=t[s]||[],r.push(""+h+":"+o))}for(c in t)t.hasOwnProperty(c)&&(r=t[c],i.push(""+e(c)+':"'+r.join(",")+'"'));return i.push(u),i}for(var r=["redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","secureConnectionStart","connectEnd","requestStart","responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd","unloadEventStart","unloadEventEnd","firstChunkEnd","secondChunkStart","htmlEnd","pageEnd","msFirstPaint"],u="v:1.1",i={},t=0;t<r.length;t++)i[r[t]]=t;n.compress=o})(perf||(perf={}));window.perf=window.perf||{},function(n){n.log=function(t,i){var u=n.compress(t),r;u.push('T:"CI.Perf",FID:"CI",Name:"PerfV2"');var f="/fd/ls/lsp.aspx?",e="sendBeacon",s="<E><T>Event.ClientInst<\/T><IG>"+_G.IG+"<\/IG><TS>"+i+"<\/TS><D><![CDATA[{"+u.join(",")+"}]\]><\/D><\/E>",o="<ClientInstRequest><Events>"+s+"<\/Events><STS>"+i+"<\/STS><\/ClientInstRequest>";_w.navigator&&navigator[e]&&navigator[e](f,o)||(r=sj_gx(),r.open("POST",f,!0),r.setRequestHeader("Content-Type","text/xml"),r.send(o))}}(window.perf);var perf;(function(n){function a(){return c(Math.random()*1e4)}function o(){return y?c(f.now())+l:+new Date}function v(n,r,f){t.length===0&&i&&sb_st(u,1e3);t.push({k:n,v:r,t:f})}function p(n){return i||(r=n),!i}function w(n,t){t||(t=o());v(n,t,0)}function b(n,t){v(n,t,1)}function u(){var u,f;if(t.length){for(u=0;u<t.length;u++)f=t[u],f.t===0&&(f.v-=r);t.push({k:"id",v:e,t:3});n.log(t,o());t=[];i=!0}}function k(){r=o();e=a();i=!1;sj_evt.bind("onP1",u)}var s="performance",h=!!_w[s],f=_w[s],y=h&&!!f.now,c=Math.round,t=[],i=!1,l,r,e;h?l=r=f.timing.navigationStart:r=_w.si_ST?_w.si_ST:+new Date;e=a();n.setStartTime=p;n.mark=w;n.record=b;n.flush=u;n.reset=k;sj_be(window,"load",u,!1);sj_be(window,"beforeunload",u,!1)})(perf||(perf={}));_w.si_PP=function(n,t,i){var r,o,l,h,e,c;if(!_G.PPS){for(o=["FC","BC","SE","TC","H","BP",null];r=o.shift();)o.push('"'+r+'":'+(_G[r+"T"]?_G[r+"T"]-_G.ST:-1));var u=_w.perf,s="navigation",r,f=i||_w.performance&&_w.performance.timing;if(f&&u){if(l=f.navigationStart,u.setStartTime(l),l>=0)for(r in f)h=f[r],typeof h=="number"&&h>0&&r!=="navigationStart"&&r!==s&&u.mark(r,h);u.record("nav",s in f?f[s]:performance[s].type)}e="connection";c="";_w.navigator&&navigator[e]&&(c=',"net":"'+navigator[e].type+'"',navigator[e].downlinkMax&&(c+=',"dlMax":"'+navigator[e].downlinkMax+'"'));_G.PPImg=new Image;_G.PPImg.src=_G.lsUrl+'&Type=Event.CPT&DATA={"pp":{"S":"'+(t||"L")+'",'+o.join(",")+',"CT":'+(n-_G.ST)+',"IL":'+_d.images.length+"}"+(_G.C1?","+_G.C1:"")+c+"}"+(_G.P?"&P="+_G.P:"")+(_G.DA?"&DA="+_G.DA:"")+(_G.MN?"&MN="+_G.MN:"");_G.PPS=1;sb_st(function(){u&&u.flush();sj_evt.fire("onPP");sj_evt.fire(_w.p1)},1)}};_w.onbeforeunload=function(){si_PP(new Date,"A")};sj_evt.bind("ajax.requestSent",function(){window.perf&&perf.reset()});(function(n){var i,r,t;if(document.querySelector){i=[];r="ad";function u(){var c=sb_gt(),u=document.documentElement,r=document.body,f=-1,e=-1,o=u.clientHeight,s=["#b_results .b_ad",".sb_adsWv2",".ads"],t,h,n;if(r){for(t=0;t<s.length;t++)if(h=s[t],n=document.querySelector(h),n&&n.offsetTop<o){f=n.offsetHeight;e=n.offsetTop;break}i=[e,f,u.clientWidth,o,r.offsetWidth,r.offsetHeight,sb_gt()-c]}}n?(t=n.onbeforefire,n.onbeforefire=function(){t&&t();u();n.mark(r,i)}):(t=si_PP,si_PP=function(){u();var n='"'+r+'":['+i.join()+"]";_G.C1=_G.C1?_G.C1+","+n:n;t.apply(null,[].slice.apply(arguments))})}})(_w.pp);var sj_log=function(n,t,i){var r=new RegExp('"',"g");(new Image).src=_G.lsUrl+'&Type=Event.ClientInst&DATA=[{"T":"'+n+'","FID":"CI","Name":"'+t+'","Text":"'+escape(i.replace(r,""))+'"}]'};_w.AM=["live.com","virtualearth.net","windows.net","onenote","hexun.com","dict.bing.com.cn","msn.com","variflight.com","bing.net","msftoffers.com","chinacloudapp.cn","cbsnews.com","swx.cdn.skype.com","latest-swx.cdn.skype.com","a.config.skype.com","b.config.skype.com"];(function(){function f(t,r){var u=t.tagName;return(u==="SCRIPT"&&(n.href=t.src)||u==="OBJECT"&&t.type&&t.type.indexOf("flash")>0&&(n.href=t.data))&&n.href.length>0&&n.hostname.length>0&&n.hostname!==location.hostname&&!e(n.hostname)?(sj_log("CI.AntiMalware",r,u.substr(0,1)+":"+n.href.substr(0,i)),!1):!0}function e(n){for(var i=0;i<t.length;i++)if(n.indexOf(t[i])>=0)return!0;return!1}var t=_w.AM,i=100,n=document.createElement("A"),r,u;document.write=function(n){n.length>0&&sj_log("CI.AntiMalware","DW",n.substr(0,i))};typeof Element!="undefined"&&Element.prototype&&(r=Element.prototype.appendChild,Element.prototype.appendChild=function(n){return f(n,"AC")?r.apply(this,arguments):null},u=Element.prototype.insertBefore,Element.prototype.insertBefore=function(n){return f(n,"IB")?u.apply(this,arguments):null})})();var BM=BM||{};BM.rules={".b_scopebar":[0,80,0],".b_logo":[-1,-1,0],".b_searchboxForm":[100,19,0],"#id_h":[-1,-1,0],"#b_tween":[-1,-1,1],"#b_results":[100,-1,1],"#b_context":[710,-1,1],".b_ad > ul":[-1,-1,1],"#b_navheader":[-1,-1,0],"#bfb-answer":[-1,-1,1],".tab-menu > ul":[-1,-1,1],".b_footer":[0,-1,0],"#b_notificationContainer":[-1,-1,0],"#ajaxMaskLayer":[-1,-1,0],"img,div[data-src],.rms_img":[-1,-1,0],iframe:[-1,-1,0]};var BM=BM||{};(function(n){function u(n,u){n in t||(t[n]=[]);!u.compute||n in r||(r[n]=u.compute);!u.unload||n in i||(i[n]=u.unload);u.load&&u.load()}function f(n,i){t[n].push({t:s(),i:i})}function e(n){return n in i&&i[n](),n in t?t[n]:void 0}function o(){for(var n in r)r[n]()}function s(){return window.performance&&performance.now?Math.round(performance.now()):new Date-window.si_ST}var t={},i={},r={};n.wireup=u;n.enqueue=f;n.dequeue=e;n.trigger=o})(BM);(function(n){function i(){var i=document.documentElement,r=document.body,u="innerWidth"in window?window.innerWidth:i.clientWidth,f="innerHeight"in window?window.innerHeight:i.clientHeight,e=window.pageXOffset||i.scrollLeft,o=window.pageYOffset||i.scrollTop,s=document.visibilityState||"default";n.enqueue(t,{x:e,y:o,w:u,h:f,dw:r.clientWidth,dh:r.clientHeight,v:s})}var t="V";n.wireup(t,{load:null,compute:i,unload:null})})(BM);(function(n){function i(){var e,o,u,s,f,r;if(document.querySelector&&document.querySelectorAll){e=[];o=n.rules;for(u in o)for(s=o[u],u+=!s[2]?"":" >*",f=document.querySelectorAll(u),r=0;r<f.length;r++){var i=f[r],h=0,c=0,l=i.offsetWidth,a=i.offsetHeight;do h+=i.offsetLeft,c+=i.offsetTop;while(i=i.offsetParent);e.push({_e:f[r],x:h,y:c,w:l,h:a})}n.enqueue(t,e)}}var t="L";n.wireup(t,{load:null,compute:i,unload:null})})(BM);(function(n){function f(){u(sj_be,r)}function r(i){return i&&n.enqueue(t,i),!0}function e(){u(sj_ue,r)}function u(n,t){for(var u,r=0;r<i.length;r++)u=i[r],n(u==="resize"?window:document,window.navigator.pointerEnabled?u.replace("mouse","pointer"):u,t,!1)}var t="EVT",i=["click","mousedown","mouseup","touchstart","touchend","mousemove","touchmove","scroll","keydown","resize"];n.wireup(t,{load:f,compute:null,unload:e})})(BM);
//]]>