(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{130:function(e,t,a){e.exports=a.p+"static/media/unbabel-logo.6cbce8d6.svg"},131:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(15),i=a.n(r),o=(a(80),a(13)),c=a(12),l=a(19),u=a(20),d=a(25),m=a(21),h=a(26),g=(a(82),a(136)),p=a(137),f=a(132),b=a(133),y=a(138),x=a(64),j=a(129),w=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={message:"",text:"",sourceLang:{name:"English",key:"en"},targetLang:{name:"Spanish",key:"es"}},a.getResult=function(e){var t=e.jobId,n=e.id,s=e.text,r=e.timeStamp,i=a.props,o=i.addUid,c=i.addTranslation,l=i.updateTranslation,u=i.checkStatus,d=a.state,m=d.sourceLang,h=d.targetLang,g=0;c({id:n,jobId:t,originalText:s,sourceLang:m,targetLang:h,status:"requesting",timeStamp:r,translatedText:""}),a.setState({showMessage:!0,message:"Your request was sent!",bsStyle:"success"}),setTimeout(function(){a.setState({showMessage:!1})},3e3);var p="".concat("https://unbabel-challenge.herokuapp.com","/check_confirmation?jobId=").concat(t,"&id=").concat(n),f=new Headers;setTimeout(function e(){g++,fetch(p,{method:"get",headers:f}).then(function(e){return e.json()}).then(function(t){if(t.uid)o(n,t.uid),setTimeout(function(){u([{id:n,uid:t.uid}])},3e3);else if(t.status&&"failed"===t.status)a.setState({showMessage:!0,message:"The request failed. Please try again",bsStyle:"danger"}),setTimeout(function(){a.setState({showMessage:!1})},3e3),l(n,{status:"failed"});else{var s=a.props.translations;Object.keys(s).includes(n)&&setTimeout(e,7-g>=2?1e3*(7-g):2e3)}})},7e3)},a.buttonSubmit=function(){var e=a.state.text,t=a.state,n=t.sourceLang,s=t.targetLang;if(a.setState({text:""}),e){var r=new Headers,i="".concat("https://unbabel-challenge.herokuapp.com","/new_translation"),o=(new Date).getTime(),c=JSON.stringify({text:e,sourceLang:n.key,targetLang:s.key,timeStamp:o});fetch(i,{method:"post",headers:r,body:c}).then(function(e){return e.json()}).then(function(t){return a.getResult({jobId:t.job_id,id:t.translation_job,text:e,timeStamp:o})}).catch(function(e){a.setState({showMessage:!0,message:"There was an error processing your request. Make sure you are connected to the internet.",bsStyle:"danger"}),setTimeout(function(){a.setState({showMessage:!1})},3e3)})}},a.handleChange=function(e){a.setState({text:e.target.value})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.text,n=t.message,r=t.showMessage,i=t.bsStyle,o=t.sourceLang,c=t.targetLang,l=this.props,u=l.sourceLangs,d=l.targetLangs;return s.a.createElement("div",{className:"flex-column",style:{width:"80%",maxWidth:"850px",justifyContent:"space-around"}},s.a.createElement("div",{className:"flex-row",style:{justifyContent:"flex-start",alignSelf:"flex-start"}},s.a.createElement("div",null,s.a.createElement("strong",null,"From:"),s.a.createElement(p.a,{title:o.name,id:"dropdown-basic",style:{marginLeft:"10px"}},u.map(function(t){return s.a.createElement(f.a,{onClick:function(){return e.setState({sourceLang:t})},key:t.key,eventKey:"1"},t.name)}))),s.a.createElement("div",{style:{paddingLeft:"20px"}},s.a.createElement("strong",null,"To:"),s.a.createElement(p.a,{style:{marginLeft:"10px"},title:c.name,id:"dropdown-basic"},d.map(function(t){return s.a.createElement(f.a,{onClick:function(){return e.setState({sourceLang:t})},key:t.key,eventKey:"1"},t.name)})))),s.a.createElement("div",{className:"flex-row",style:{width:"100%",justifyContent:"space-between",marginTop:"15px"}},s.a.createElement(b.a,{style:{width:"77%"}},s.a.createElement(y.a,{value:a,onChange:this.handleChange,componentClass:"textarea",placeholder:"Insert your text here",style:{height:"150px"}})),s.a.createElement("div",{className:"flex-row",style:{width:"20%"}},s.a.createElement(x.a,{disabled:!a,bsStyle:"primary",bsSize:"large",onClick:this.buttonSubmit},"Send Request"))),s.a.createElement(j.a,{className:"message-to-user flex-column",bsSize:"large",bsStyle:i,style:{top:r?"60px":"-200px"}},n))}}]),t}(n.Component);w.defaultProps={sourceLangs:[{name:"English",key:"en"}],targetLangs:[{name:"Spanish",key:"es"}]};var v=w,T=a(134),S=a(135),E=a(128),k=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).deleteJob=function(e){var t=e.id,n=new Headers,s=a.props.deleteTranslation,r="".concat("https://unbabel-challenge.herokuapp.com","/delete_job?id=").concat(t);s({id:t}),fetch(r,{method:"get",headers:n}).then(function(e){return e.json()}).then(function(e){e.status})},a.getFormattedDate=function(e){var t=Date.now()-e,a=Math.floor(t/1e3/60/60/24);t-=1e3*a*60*60*24;var n=Math.floor(t/1e3/60/60);t-=1e3*n*60*60;var s=Math.floor(t/1e3/60);t-=1e3*s*60;var r=Math.floor(t/1e3);return a>=1?"".concat(a," ").concat(1===a?"day":"days"," ago"):n>=1?"".concat(n," ").concat(1===n?"hour":"hours"," ago"):s>=1?"".concat(s," ").concat(1===s?"minute":"minutes"," ago"):"".concat(r," ").concat(1===r?"second":"seconds"," ago")},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.translations,n=t.styleOptions,r=t.expandTranslation,i=t.checkStatus,o=a?Object.keys(a).map(function(e){return a[e]}).sort(function(e,t){return t.originalText.length-e.originalText.length}):[];return s.a.createElement("div",{className:"flex-row",style:{width:"80%",maxWidth:"850px",justifyContent:"space-around"}},s.a.createElement(T.a,{style:{width:"100%"}},o&&o.map(function(t){return s.a.createElement("div",{key:t.id,className:"flex-row",style:{width:"100%",justifyContent:"space-between"}},s.a.createElement(j.a,{bsStyle:n[t.status],style:{cursor:"pointer",padding:0,width:"77%"},className:"flex-column"},s.a.createElement("div",{onClick:function(){return r(t.id)},className:"flex-column",style:{width:"100%",padding:"20px"}},s.a.createElement("div",{className:"flex-row",style:{width:"100%",justifyContent:"space-between"}},s.a.createElement("div",{style:{width:"40%"},className:"message-header"},t.originalText),s.a.createElement("div",{style:{width:"25%",textAlign:"center"}},s.a.createElement("strong",null,"time: "),e.getFormattedDate(t.timeStamp)),s.a.createElement("div",{style:{width:"30%",textAlign:"right"}},s.a.createElement("strong",null,"status: "),t.status)),t.expanded&&s.a.createElement("div",{style:{width:"100%",marginTop:"15px"}},s.a.createElement("strong",null,"Original Text:"),s.a.createElement(S.a,{style:{width:"100%"}},t.originalText),t.translatedText&&s.a.createElement("div",{style:{width:"100%",marginTop:"15px"}},s.a.createElement("strong",null,"Translated Text:"),s.a.createElement(S.a,{style:{width:"100%"}},t.translatedText))))),s.a.createElement("div",{style:{width:"20%",textAlign:"center"}},s.a.createElement(E.a,{style:{whiteSpace:"nowrap"}},s.a.createElement(x.a,{onClick:function(){return i([{id:t.id,uid:t.uid}])},disabled:"pending"!==t.status||t.disabled,bsStyle:"info"},t.disabled?"Checking..":"Update"),s.a.createElement(x.a,{bsStyle:"danger",onClick:function(){return e.deleteJob({id:t.id})}},"Delete"))))})))}}]),t}(n.Component);k.defaultProps={styleOptions:{requesting:"warning",pending:"info",completed:"success",failed:"danger"}};var O=k,L=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={},a.checkStatus=function(e){var t=new Headers;e.forEach(function(e){a.updateTranslation(e.id,{disabled:!0});var n="".concat("https://unbabel-challenge.herokuapp.com","/check_status?uid=").concat(e.uid,"&id=").concat(e.id);fetch(n,{method:"get",headers:t}).then(function(e){return e.json()}).then(function(t){a.updateTranslation(e.id,{disabled:!1}),"completed"===t.status&&a.updateTranslation(e.id,{status:"completed",translatedText:t.translatedText})})})},a.addTranslation=function(e){var t=e.jobId,n=e.id,s=e.originalText,r=e.translatedText,i=e.sourceLang,l=e.targetLang,u=e.status,d=e.uid,m=e.timeStamp;a.setState(function(e){return{translations:Object(c.a)({},e.translations,Object(o.a)({},n,{id:n,jobId:t,originalText:s,translatedText:r,sourceLang:i,targetLang:l,status:u,uid:d,timeStamp:m}))}})},a.deleteTranslation=function(e){var t=e.id;a.setState(function(e){return{translations:Object.keys(e.translations).reduce(function(a,n){return n===t?a:Object(c.a)({},a,Object(o.a)({},n,e.translations[n]))},{})}})},a.expandTranslation=function(e){a.setState(function(t){return{translations:Object.keys(t.translations).reduce(function(a,n){return n===e?Object(c.a)({},a,Object(o.a)({},n,Object(c.a)({},t.translations[n],{expanded:!t.translations[n].expanded}))):Object(c.a)({},a,Object(o.a)({},n,t.translations[n]))},{})}})},a.addUid=function(e,t){a.setState(function(a){return{translations:Object.keys(a.translations).reduce(function(n,s){return s===e?Object(c.a)({},n,Object(o.a)({},s,Object(c.a)({},a.translations[s],{uid:t,status:"pending"}))):Object(c.a)({},n,Object(o.a)({},s,a.translations[s]))},{})}})},a.updateTranslation=function(e,t){a.setState(function(a){return{translations:Object.keys(a.translations).reduce(function(n,s){return s===e?Object(c.a)({},n,Object(o.a)({},s,Object(c.a)({},a.translations[s],t))):Object(c.a)({},n,Object(o.a)({},s,a.translations[s]))},{})}})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new Headers,a="".concat("https://unbabel-challenge.herokuapp.com","/get_jobs");fetch(a,{method:"get",headers:t}).then(function(e){return e.json()}).then(function(t){t.jobs&&t.jobs instanceof Array&&t.jobs.forEach(function(t){e.addTranslation({id:String(t.id),originalText:t.original_text,translatedText:t.translated_text,sourceLang:t.source_lang,targetLang:t.target_lang,status:t.status,uid:t.uid,timeStamp:1e3*t.timestamp})})})}},{key:"render",value:function(){var e=this.state.translations;return s.a.createElement("div",{className:"app flex-column"},s.a.createElement(g.a,{className:"title"},s.a.createElement("img",{src:a(130)}),"Translation Service"),s.a.createElement(v,{addUid:this.addUid,addTranslation:this.addTranslation,updateTranslation:this.updateTranslation,checkStatus:this.checkStatus,translations:e}),s.a.createElement(O,{translations:e,expandTranslation:this.expandTranslation,checkStatus:this.checkStatus,deleteTranslation:this.deleteTranslation}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},75:function(e,t,a){e.exports=a(131)},80:function(e,t,a){},82:function(e,t,a){}},[[75,2,1]]]);
//# sourceMappingURL=main.59d2be0b.chunk.js.map