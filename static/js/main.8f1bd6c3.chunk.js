(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{49:function(t,e,a){t.exports=a(94)},54:function(t,e,a){},56:function(t,e,a){},93:function(t,e,a){t.exports=a.p+"static/media/unbabel-logo.6cbce8d6.svg"},94:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),r=a(43),i=a.n(r),o=(a(54),a(9)),c=a(8),l=a(12),u=a(13),d=a(16),h=a(14),p=a(17),g=(a(56),a(101)),b=a(96),m=a(97),f=a(102),j=a(95),y=a(92),x=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(s)))).state={message:"",text:""},a.getResult=function(t){var e=t.jobId,n=t.id,s=t.text,r=a.props,i=r.addUid,o=r.addTranslation,c=r.updateTranslation,l=r.checkStatus,u=r.sourceLang,d=r.targetLang,h=0;o({id:n,jobId:e,originalText:s,sourceLang:u,targetLang:d,status:"requesting"}),a.setState({showMessage:!0,message:"Your request was sent!",bsStyle:"success"}),setTimeout(function(){a.setState({showMessage:!1})},3e3);var p="".concat("https://unbabel-challenge.herokuapp.com","/check_confirmation?jobId=").concat(e,"&id=").concat(n),g=new Headers;setTimeout(function t(){h++,fetch(p,{method:"get",headers:g}).then(function(t){return t.json()}).then(function(e){if(e.uid)i(n,e.uid),setTimeout(function(){l([{id:n,uid:e.uid}])},3e3);else if(e.status&&"failed"===e.status)c(n,{status:"failed"});else{var s=a.props.translations;Object.keys(s).includes(n)&&setTimeout(t,7-h>=2?1e3*(7-h):2e3)}})},7e3)},a.buttonSubmit=function(){var t=a.state.text,e=a.props,n=e.sourceLang,s=e.targetLang;if(a.setState({text:""}),t){var r=new Headers,i="".concat("https://unbabel-challenge.herokuapp.com","/new_translation"),o=JSON.stringify({text:t,sourceLang:n,targetLang:s});fetch(i,{method:"post",headers:r,body:o}).then(function(t){return t.json()}).then(function(e){return a.getResult({jobId:e.job_id,id:e.translation_job,text:t})}).catch(function(t){a.setState({showMessage:!0,message:"There was an error processing your request. Make sure you are connected to the internet.",bsStyle:"danger"}),setTimeout(function(){a.setState({showMessage:!1})},3e3)})}},a.handleChange=function(t){a.setState({text:t.target.value})},a}return Object(p.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){var t=this.state,e=t.text,a=t.message,n=t.showMessage,r=t.bsStyle;return s.a.createElement("div",{className:"flex-row",style:{width:"80%",maxWidth:"850px",justifyContent:"space-around"}},s.a.createElement(b.a,{style:{width:"77%"}},s.a.createElement(m.a,null,"Text to be translated"),s.a.createElement(f.a,{value:e,onChange:this.handleChange,componentClass:"textarea",placeholder:"Insert your text here",style:{height:"150px"}})),s.a.createElement("div",{className:"flex-row",style:{width:"20%"}},s.a.createElement(j.a,{disabled:!e,bsStyle:"primary",bsSize:"large",onClick:this.buttonSubmit},"Send Request")),s.a.createElement(y.a,{className:"message-to-user flex-column",bsSize:"large",bsStyle:r,style:{top:n?"60px":"-200px"}},a))}}]),e}(n.Component);x.defaultProps={sourceLang:"en",targetLang:"es"};var w=x,v=a(98),T=a(99),O=a(100),k=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(s)))).deleteJob=function(t){var e=t.id,n=new Headers,s=a.props.deleteTranslation,r="".concat("https://unbabel-challenge.herokuapp.com","/delete_job?id=").concat(e);s({id:e}),fetch(r,{method:"get",headers:n}).then(function(t){return t.json()}).then(function(t){t.status})},a}return Object(p.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){var t=this,e=this.props,a=e.translations,n=e.styleOptions,r=e.expandTranslation,i=e.checkStatus;return s.a.createElement("div",{className:"flex-row",style:{width:"80%",maxWidth:"850px",justifyContent:"space-around"}},s.a.createElement(v.a,{style:{width:"100%"}},a&&Object.keys(a).map(function(e){var o=a[e];return s.a.createElement("div",{className:"flex-row",style:{width:"100%",justifyContent:"space-between"}},s.a.createElement(y.a,{key:e,bsStyle:n[o.status],style:{cursor:"pointer",padding:0,width:"77%"},className:"flex-column"},s.a.createElement("div",{onClick:function(){return r(o.id)},className:"flex-column",style:{width:"100%",padding:"20px"}},s.a.createElement("div",{className:"flex-row",style:{width:"100%",justifyContent:"space-between"}},s.a.createElement("div",{style:{width:"60%"},className:"message-header"},o.originalText),s.a.createElement("div",{style:{width:"30%"}},s.a.createElement("strong",null,"status: "),o.status)),o.expanded&&s.a.createElement("div",{style:{width:"100%",marginTop:"15px"}},s.a.createElement("strong",null,"Original Text:"),s.a.createElement(T.a,{style:{width:"100%"}},o.originalText),o.translatedText&&s.a.createElement("div",{style:{width:"100%",marginTop:"15px"}},s.a.createElement("strong",null,"Translated Text:"),s.a.createElement(T.a,{style:{width:"100%"}},o.translatedText))))),s.a.createElement("div",{style:{width:"20%"}},s.a.createElement(O.a,{style:{whiteSpace:"nowrap"}},s.a.createElement(j.a,{onClick:function(){return i([{id:o.id,uid:o.uid}])},disabled:"pending"!==o.status||o.disabled,bsStyle:"info"},o.disabled?"Checking..":"Update"),s.a.createElement(j.a,{bsStyle:"danger",onClick:function(){return t.deleteJob({id:o.id})}},"Delete"))))})))}}]),e}(n.Component);k.defaultProps={styleOptions:{requesting:"warning",pending:"info",completed:"success",failed:"danger"}};var E=k,S=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(s)))).state={},a.checkStatus=function(t){var e=new Headers;t.forEach(function(t){a.updateTranslation(t.id,{disabled:!0});var n="".concat("https://unbabel-challenge.herokuapp.com","/check_status?uid=").concat(t.uid,"&id=").concat(t.id);fetch(n,{method:"get",headers:e}).then(function(t){return t.json()}).then(function(e){a.updateTranslation(t.id,{disabled:!1}),"completed"===e.status&&a.updateTranslation(t.id,{status:"completed",translatedText:e.translatedText})})})},a.addTranslation=function(t){var e=t.jobId,n=t.id,s=t.originalText,r=t.translatedText,i=t.sourceLang,l=t.targetLang,u=t.status,d=t.uid;a.setState(function(t){return{translations:Object(c.a)({},t.translations,Object(o.a)({},n,{id:n,jobId:e,originalText:s,translatedText:r,sourceLang:i,targetLang:l,status:u,uid:d}))}})},a.deleteTranslation=function(t){var e=t.id;a.setState(function(t){return{translations:Object.keys(t.translations).reduce(function(a,n){return n===e?a:Object(c.a)({},a,Object(o.a)({},n,t.translations[n]))},{})}})},a.expandTranslation=function(t){a.setState(function(e){return{translations:Object.keys(e.translations).reduce(function(a,n){return n===t?Object(c.a)({},a,Object(o.a)({},n,Object(c.a)({},e.translations[n],{expanded:!e.translations[n].expanded}))):Object(c.a)({},a,Object(o.a)({},n,e.translations[n]))},{})}})},a.addUid=function(t,e){a.setState(function(a){return{translations:Object.keys(a.translations).reduce(function(n,s){return s===t?Object(c.a)({},n,Object(o.a)({},s,Object(c.a)({},a.translations[s],{uid:e,status:"pending"}))):Object(c.a)({},n,Object(o.a)({},s,a.translations[s]))},{})}})},a.updateTranslation=function(t,e){a.setState(function(a){return{translations:Object.keys(a.translations).reduce(function(n,s){return s===t?Object(c.a)({},n,Object(o.a)({},s,Object(c.a)({},a.translations[s],e))):Object(c.a)({},n,Object(o.a)({},s,a.translations[s]))},{})}})},a}return Object(p.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=new Headers,a="".concat("https://unbabel-challenge.herokuapp.com","/get_jobs");fetch(a,{method:"get",headers:e}).then(function(t){return t.json()}).then(function(e){e.jobs&&e.jobs instanceof Array&&e.jobs.forEach(function(e){t.addTranslation({id:String(e.id),originalText:e.original_text,translatedText:e.translated_text,sourceLang:e.source_lang,targetLang:e.target_lang,status:e.status,uid:e.uid})})})}},{key:"render",value:function(){var t=this.state.translations;return s.a.createElement("div",{className:"app flex-column"},s.a.createElement(g.a,{className:"title"},s.a.createElement("img",{src:a(93)}),"Translation Service"),s.a.createElement(w,{addUid:this.addUid,addTranslation:this.addTranslation,updateTranslation:this.updateTranslation,checkStatus:this.checkStatus,translations:t}),s.a.createElement(E,{translations:t,expandTranslation:this.expandTranslation,checkStatus:this.checkStatus,deleteTranslation:this.deleteTranslation}))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[49,2,1]]]);
//# sourceMappingURL=main.8f1bd6c3.chunk.js.map