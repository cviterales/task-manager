(this.webpackJsonptask_manager=this.webpackJsonptask_manager||[]).push([[12],{154:function(e,t,n){"use strict";n(155),n(156);var a=n(1);t.a=function(e){var t=e.children,n=e.hoverCheck,s=void 0!==n&&n,c=e.style,i=void 0===c?"":c,r="wrapper ".concat(i);return s&&(r="wrapper_hover ".concat(i)),Object(a.jsx)("div",{className:r,children:Object(a.jsx)(a.Fragment,{children:t})})}},155:function(e,t,n){},156:function(e,t,n){},157:function(e,t,n){"use strict";n(0);var a=n(352),s=n(1);t.a=function(e){var t=e.index,n=e.children,c=e.delay,i=void 0===c?.05:c;return Object(s.jsx)(a.a.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1,transition:{delay:i*t}},exit:{y:-100,opacity:0},children:n})}},158:function(e,t,n){"use strict";var a=n(163),s=n.n(a),c=n(1);t.a=function(e){var t=e.description,n=e.name;return Object(c.jsx)("div",{className:[s.a.status,t].join(" "),children:n})}},159:function(e,t,n){"use strict";n(0);var a=n(165),s=n.n(a),c=n(56),i=n(41),r=n(1);t.a=function(e){var t=e.type,n=e.message,a=s.a.success,l=i.j;switch(t){case"error":a=s.a.danger,l=i.G;break;case"info":a=s.a.info,l=i.w;break;case"success":a=s.a.success,l=i.j;break;default:a=s.a.success,l=i.j}return Object(r.jsx)("div",{className:a,children:Object(r.jsxs)("div",{className:s.a.title,children:[Object(r.jsx)(c.a,{icon:l,color:"white",size:"lg",className:s.a.icon}),Object(r.jsx)("p",{children:n})]})})}},160:function(e,t,n){"use strict";var a=n(161),s=n(164),c=n.n(s),i=n(1);t.a=function(e){var t=e.data,n=e.form,s=e.name,r=e.id,l=e.onChange,o=e.selectedValue,d=void 0===o?0:o,_=e.disabled,u=void 0!==_&&_,j=[{id:0,name:"Seleccione..."}].concat(Object(a.a)(t));return Object(i.jsx)("select",{disabled:u,"data-testid":s,className:c.a.select,name:s,form:n,id:r,onChange:l,required:!0,value:d,children:function(e){return e.map((function(e,t){return Object(i.jsx)("option",{value:e.id,disabled:0===t,children:e.name?e.name:"No hay datos"},e.name+e.id)}))}(j)})}},163:function(e,t,n){e.exports={status:"style_status__2t8aS"}},164:function(e,t,n){e.exports={select:"style_select__2g3EM"}},165:function(e,t,n){e.exports={success:"style_success__30vSy",danger:"style_danger__3VYR2",info:"style_info__8kZRS",seconds:"style_seconds__2kodu",icon:"style_icon__TW5-W",title:"style_title__1f0lf"}},166:function(e,t,n){"use strict";var a=n(170),s=n.n(a),c=n(56),i=n(41),r=n(1);t.a=function(e){var t=e.onClose,n=e.children,a=e.title;return Object(r.jsx)("div",{className:[s.a.Show].join(" "),children:Object(r.jsxs)("div",{className:[s.a.modalMain].join(" "),children:[Object(r.jsxs)("div",{className:s.a.header,children:[Object(r.jsx)("h3",{children:a}),Object(r.jsx)("button",{className:s.a.closeButton,onClick:function(){return t()},children:Object(r.jsx)(c.a,{icon:i.M})})]}),Object(r.jsx)("div",{className:s.a.children,children:n})]})})}},170:function(e,t,n){e.exports={enabled:"style_enabled__b1wE0",disabled:"style_disabled__oGsvy",assigned:"style_assigned__3HFhx",going:"style_going__3wzGP",working:"style_working__3TMBI",paused:"style_paused__17MEO",finished:"style_finished__3O22G",call:"style_call__2hzsv",confirmed:"style_confirmed__8SqNt",hidden:"style_hidden__3bjb7",Show:"style_Show__1ZiE9",modalMain:"style_modalMain__1BW5E",header:"style_header__2Zpg3",closeButton:"style_closeButton__2bJY7",children:"style_children__2R1Dw"}},195:function(e,t,n){"use strict";n(0);var a=n(196),s=n.n(a),c=n(56),i=n(41),r=n(154),l=n(158),o=n(7),d=n(1);t.a=function(e){var t=e.reclamo,n=e.handlerTask,a=Object(o.g)(),_=new Date(t.created_at).toLocaleString(),u=t.priority?s.a.card_priority:s.a.card;return Object(d.jsx)("div",{className:s.a.card_wrapper,children:Object(d.jsx)(r.a,{children:Object(d.jsxs)("div",{className:u,children:[Object(d.jsxs)("div",{className:s.a.card_container,onClick:function(){return function(e){a.push("/reclamo",{id_task:e.id,id_account:e.id_account})}(t)},children:[Object(d.jsxs)("div",{className:s.a.card_content,children:[Object(d.jsx)("h4",{children:t.account_name}),Object(d.jsx)("div",{className:s.a.card_item,children:Object(d.jsx)(l.a,{description:t.last_state_description,name:t.last_state})})]}),Object(d.jsxs)("div",{className:s.a.card_content,children:[Object(d.jsxs)("div",{className:s.a.card_item,children:[Object(d.jsx)("p",{style:{marginRight:"0.5rem"},children:Object(d.jsxs)("span",{className:s.a.boldText,children:["# ",t.number," "]})}),Object(d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(d.jsx)(c.a,{icon:i.A,color:"#fe6d73",size:"1x"}),Object(d.jsx)("p",{style:{marginLeft:"0.5rem"},children:t.region_name})]})]}),Object(d.jsx)("div",{className:s.a.card_item,children:Object(d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(d.jsx)("div",{style:{marginRight:"0.5rem"},children:Object(d.jsx)(c.a,{className:s.a.icon,color:"#4299e1",icon:i.g,size:"1x"})}),Object(d.jsx)("p",{children:_})]})})]})]}),Object(d.jsx)("div",{className:s.a.button_container,children:Object(d.jsx)("button",{className:s.a.button,onClick:function(){return n(t)},children:Object(d.jsx)(c.a,{icon:i.p,size:"1x"})})})]})})})}},196:function(e,t,n){e.exports={enabled:"style_enabled__3XoN6",disabled:"style_disabled__3B3z0",assigned:"style_assigned__3bAMV",going:"style_going__3DiE_",working:"style_working__2LX7_",paused:"style_paused__3M31y",finished:"style_finished__1_OWv",call:"style_call__3VsAG",confirmed:"style_confirmed__JmuWv",hidden:"style_hidden__33nBI",card_wrapper:"style_card_wrapper__3d4MF",card:"style_card__1pl5g",card_priority:"style_card_priority__6Bgcm",card_container:"style_card_container__32Xwc",card_content:"style_card_content__3b4Eh",card_item:"style_card_item__3obW3",boldText:"style_boldText__1QrRs",mh:"style_mh__3k08v",icon:"style_icon__2jeDj",button_container:"style_button_container__1mXeK",button:"style_button__3hCtO"}},197:function(e,t,n){"use strict";var a=n(2),s=n.n(a),c=n(4),i=n(28),r=n(0),l=n(198),o=n.n(l),d=n(33),_=n(158),u=n(42),j=n(160),b=n(57),h=n(159),m=n(1);t.a=function(e){var t=e.onClose,n=e.task,a=Object(r.useState)([]),l=Object(i.a)(a,2),v=l[0],O=l[1],p=Object(r.useState)([]),x=Object(i.a)(p,2),y=x[0],f=x[1],g=Object(r.useState)(),w=Object(i.a)(g,2),N=w[0],k=w[1],C=Object(r.useState)(),S=Object(i.a)(C,2),T=S[0],z=S[1],B=Object(r.useState)(!1),M=Object(i.a)(B,2),E=M[0],W=M[1],A=function(){var e=Object(c.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!N){e.next=9;break}return W(!0),e.next=4,Object(b.e)(n.id_calendar,N);case 4:t=e.sent,W(!1),z(t),e.next=10;break;case 9:z({error:!0,message:"Seleccione Estado"});case 10:setTimeout((function(){z()}),6e3);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){(function(){var e=Object(c.a)(s.a.mark((function e(){var t,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.p)();case 2:return t=e.sent,e.next=5,Object(b.q)(n.id_task);case 5:a=e.sent,f(a),c=t.filter((function(e){return!a.find((function(t){var n=t.status;return e.name===n}))})),O(c),"Finalizado"===n.last_state_description&&O([]);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[n,T]),Object(m.jsxs)("div",{className:o.a.container,children:[Object(m.jsx)("div",{className:o.a.status_container,children:y.length>0&&y.map((function(e,t){var n=new Date(e.date).toLocaleString(),a=e.status+" "+n;return Object(m.jsx)("div",{className:o.a.m_v,children:Object(m.jsx)(_.a,{name:a,description:e.description})},t+e.id_task)}))}),Object(m.jsxs)("div",{className:o.a.m_v,children:[Object(m.jsx)("h5",{className:o.a.m_v,children:"Nuevo"}),Object(m.jsx)(j.a,{data:v,onChange:function(e){return k(e.target.value)}})]}),Object(m.jsxs)("div",{className:o.a.bottom,children:[Object(m.jsx)("div",{children:E?Object(m.jsx)(d.a,{}):Object(m.jsx)(u.a,{type:"button",variant:"blue",onClick:function(){return A()},children:Object(m.jsx)("p",{children:"Guardar"})})}),Object(m.jsx)("div",{children:Object(m.jsx)(u.a,{type:"button",variant:"outline",onClick:function(){return t()},children:Object(m.jsx)("p",{children:"Cancelar"})})})]}),T&&Object(m.jsx)("div",{className:o.a.m_v,children:Object(m.jsx)(h.a,{type:T.error?"error":"success",message:T.message})})]})}},198:function(e,t,n){e.exports={enabled:"style_enabled__2xzY-",disabled:"style_disabled__1FJgo",assigned:"style_assigned__18mTL",going:"style_going__1vVLf",working:"style_working__3AoKV",paused:"style_paused__379W1",finished:"style_finished__1KtfW",call:"style_call__26yYd",confirmed:"style_confirmed__3-sFb",hidden:"style_hidden__1k6wP",container:"style_container__3F5Yw",status_container:"style_status_container__1uz96",bottom:"style_bottom__2o4qs",m_v:"style_m_v__38T4G"}},221:function(e,t,n){e.exports={wrapper:"style_wrapper__3Mwrc",content:"style_content__2wDwh",graph:"style_graph__3HXw8",graphContainer:"style_graphContainer__-4_Wj",boldText:"style_boldText__2jqLC",header:"style_header__2vYgz"}},350:function(e,t,n){"use strict";n.r(t);var a=n(28),s=n(0),c=n(221),i=n.n(c),r=n(154),l=n(222),o=n(57),d=n(173),_=n(195),u=n(157),j=n(166),b=n(197),h=n(16),m=n(1);t.default=function(){var e,t,n,c,v=Object(h.c)((function(e){var t,n;return null===e||void 0===e||null===(t=e.auth)||void 0===t||null===(n=t.user)||void 0===n?void 0:n.id})),O=Object(s.useState)(),p=Object(a.a)(O,2),x=p[0],y=p[1],f=Object(s.useState)(),g=Object(a.a)(f,2),w=g[0],N=g[1],k=Object(s.useState)(!1),C=Object(a.a)(k,2),S=C[0],T=C[1],z=Object(s.useState)({}),B=Object(a.a)(z,2),M=B[0],E=B[1],W=function(e){E(e),S||T(!0)};Object(s.useEffect)((function(){Object(o.x)(v).then((function(e){return N(e)})),Object(o.w)().then((function(e){return y(e)}))}),[v]);var A={datasets:[{data:null===x||void 0===x||null===(e=x.amount_type)||void 0===e?void 0:e.map((function(e){return e.amount})),backgroundColor:["rgb(34, 124, 157)","rgb(23, 195, 178)","rgb(255, 203, 119)","rgb(254, 109, 115)","rgb(144,221,240)"],hoverBackgroundColor:["rgb(29, 106, 134)","rgb(19, 164, 150)","rgb(255, 185, 71)","rgb(254, 72, 78)","rgb(111,211,235)"]}],labels:null===x||void 0===x||null===(t=x.amount_type)||void 0===t?void 0:t.map((function(e){return e.description_type}))},F={datasets:[{data:null===x||void 0===x||null===(n=x.amount_service)||void 0===n?void 0:n.map((function(e){return e.amount})),backgroundColor:["rgb(34, 124, 157)","rgb(23, 195, 178)","rgb(255, 203, 119)","rgb(254, 109, 115)","rgb(144,221,240)"],hoverBackgroundColor:["rgb(29, 106, 134)","rgb(19, 164, 150)","rgb(255, 185, 71)","rgb(254, 72, 78)","rgb(111,211,235)"]}],labels:null===x||void 0===x||null===(c=x.amount_service)||void 0===c?void 0:c.map((function(e){return e.description_service}))};return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(d.BrowserView,{children:[Object(m.jsx)("div",{className:i.a.header,children:Object(m.jsx)("h3",{style:{marginBottom:"1rem"},children:Object(m.jsx)("span",{className:i.a.boldText,children:"Home"})})}),Object(m.jsx)("div",{className:i.a.wrapper,children:Object(m.jsx)("div",{className:i.a.content,children:Object(m.jsx)(r.a,{children:Object(m.jsxs)("div",{className:i.a.graphContainer,children:[Object(m.jsx)("div",{className:i.a.graph,children:Object(m.jsx)(l.Pie,{data:F,options:{responsive:!0,maintainAspectRatio:!0,title:{display:!0,text:"Tareas por servicio",fontSize:20},legend:{display:!0}}})}),Object(m.jsx)("div",{className:i.a.graph,children:Object(m.jsx)(l.Pie,{data:A,options:{responsive:!0,maintainAspectRatio:!0,title:{display:!0,text:"Tareas pendientes",fontSize:20},legend:{display:!0}}})})]})})})})]}),Object(m.jsxs)(d.MobileView,{children:[w&&function(){if(Array.isArray(w))return w.map((function(e,t){return Object(m.jsx)(u.a,{children:Object(m.jsx)(_.a,{reclamo:e,handlerTask:W})},t+e.id_task)}))}(),S&&Object(m.jsx)(j.a,{title:"Nuevo Estado",onClose:function(){return T(!1)},children:Object(m.jsx)(b.a,{onClose:function(){return T(!1)},task:M})})]})]})}}}]);
//# sourceMappingURL=12.0d2ca09a.chunk.js.map