(this.webpackJsonpstocker=this.webpackJsonpstocker||[]).push([[0],[,,,,function(e,t,n){e.exports={numberCol:"DataTable_numberCol__1rq-P"}},,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(6),l=n.n(c),u=(n(12),n(2)),o=n.n(u),i=n(3),s=n(1),m=(n(14),n(4)),f=n.n(m),b=function(e){var t=e.data;return r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Symbol"),r.a.createElement("th",null,"Industry"),r.a.createElement("th",{className:f.a.numberCol},"Last Price"))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.name),r.a.createElement("td",null,e.symbol),r.a.createElement("td",null,e.industry),r.a.createElement("td",{className:f.a.numberCol},e.lastPrice))}))))};var d=function(){var e=[{name:"All",id:"all"},{name:"Top 100",id:"top_100"},{name:"Bottom 100",id:"bottom_100"}],t=Object(a.useState)(),n=Object(s.a)(t,2),c=n[0],l=n[1],u=Object(a.useState)(!1),m=Object(s.a)(u,2),f=m[0],d=m[1],p=Object(a.useState)(!1),h=Object(s.a)(p,2),E=h[0],y=h[1],O=Object(a.useState)(!1),j=Object(s.a)(O,2),k=j[0],v=j[1],w=Object(a.useState)(!1),C=Object(s.a)(w,2),I=C[0],x=C[1],N=Object(a.useState)([]),T=Object(s.a)(N,2),_=T[0],g=T[1],S=Object(a.useState)(e[0]),L=Object(s.a)(S,2),A=L[0],Y=(L[1],Object(a.useCallback)(Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q();case 2:return t=e.sent,e.abrupt("return",t.reduce(J,{}));case 4:case"end":return e.stop()}}),e)}))),[]));Object(a.useEffect)((function(){Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y();case 2:t=e.sent,console.log(t),l(t);case 5:case"end":return e.stop()}}),e)})))()}),[Y]);var F=Object(a.useCallback)((function(){return c?c.quality.data.slice(1):[]}),[c]),P=Object(a.useCallback)((function(){return c?c.low_volatile.data.slice(1):[]}),[c]),M=Object(a.useCallback)((function(){return c?c.momentum.data.slice(1):[]}),[c]),W=Object(a.useCallback)((function(){return c?c.alpha_low_volatile.data.slice(1):[]}),[c]),B=Object(a.useCallback)((function(){return c?c.nifty_200.data.slice(1):[]}),[c]),q=function(){var e=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://stocker.jijnasu.in/");case 2:return t=e.sent,e.next=5,t.json();case 5:return t=e.sent,e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(e,t){return e[t.name]=t.data,e},U=Object(a.useCallback)((function(){var e=B();return f&&(e=e.filter((function(e){return F().find((function(t){return t.symbol===e.symbol}))}))),E&&(e=e.filter((function(e){return P().find((function(t){return t.symbol===e.symbol}))}))),k&&(e=e.filter((function(e){return M().find((function(t){return t.symbol===e.symbol}))}))),I&&(e=e.filter((function(e){return W().find((function(t){return t.symbol===e.symbol}))}))),e}),[W,P,M,B,I,E,k,f,F]),V=Object(a.useCallback)((function(e){switch(A.id){case"top_100":var t=B().filter((function(e,t){return t<101}));return e.filter((function(e){return t.find((function(t){return t.symbol===e.symbol}))}));case"bottom_100":var n=B().filter((function(e,t){return t>100}));return e.filter((function(e){return n.find((function(t){return t.symbol===e.symbol}))}));default:return e}}),[B,A.id]);return Object(a.useEffect)((function(){var e=U();g(function(e){return e.map((function(e){return{industry:e.meta.industry,symbol:e.meta.symbol,name:e.meta.companyName,lastPrice:parseFloat(e.lastPrice).toFixed(2)}}))}(e))}),[V,E,A,c,U]),r.a.createElement("div",{className:"App"},r.a.createElement("div",{class:"container"},r.a.createElement("h1",null,"Stockist"),r.a.createElement("p",null,"Nifty 200"),r.a.createElement("div",{className:"filters"},r.a.createElement("label",{class:"filterItem"},r.a.createElement("input",{type:"checkbox",checked:f,onChange:function(){d(!f)}}),"NIFTY200 QUALITY 30"),r.a.createElement("label",{class:"filterItem"},r.a.createElement("input",{type:"checkbox",checked:E,onChange:function(){y(!E)}}),"NIFTY100 LOW VOLATILITY 30"),r.a.createElement("label",{class:"filterItem"},r.a.createElement("input",{type:"checkbox",checked:k,onChange:function(){v(!k)}}),"NIFTY200 MOMENTUM 30"),r.a.createElement("label",{class:"filterItem"},r.a.createElement("input",{type:"checkbox",checked:I,onChange:function(){x(!I)}}),"NIFTY ALPHA LOW-VOLATILITY 30")),r.a.createElement("div",{className:"data"},r.a.createElement(b,{data:_}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.e823e47a.chunk.js.map