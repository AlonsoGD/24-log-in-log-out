(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,a){e.exports={google_button:"Buttons_google_button__aLPFz",google_button__signIn:"Buttons_google_button__signIn__W0EmE",google_button__action:"Buttons_google_button__action__2BuaJ",text:"Buttons_text__I7Ay1",google_icon:"Buttons_google_icon__1LV4z"}},11:function(e,t,a){e.exports={area:"Background_area__bbqqu",circles:"Background_circles__3MSIm",animate:"Background_animate__2y4GV"}},16:function(e,t,a){e.exports=a(28)},2:function(e,t,a){e.exports={header_bar:"App_header_bar__FFx9O",inputDate_section:"App_inputDate_section__1Megm",timeEntries_section:"App_timeEntries_section__2VtBx",header_title:"App_header_title__1BX_J",m_15:"App_m_15__3hG2p",centered:"App_centered__puikv",auth_button_wrapper:"App_auth_button_wrapper__2ADkN"}},26:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(14),s=a.n(l),o=a(12),r=a(3),c=a(4),u=a(6),d=a(5),g=a(7),h=function(e){return i.a.createElement("h1",null,e.title)},p=function(e){if(void 0!==e&&""!==e)return new Date(e).toLocaleTimeString("en-CA",{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},m=function(e,t){var a=(new Date(t)-new Date(e))/1e3;if(a>=0){var n={};n.days=Math.floor(a/86400),n.hours=Math.floor(a/3600%24),n.minutes=Math.floor(a/60%60),n.seconds=Math.floor(a%60);var i="".concat(n.days,"d ").concat(n.hours," h ").concat(n.minutes," m");return i=i.replace(/(?:0. )+/,"")}},E=a(8),_=a.n(E),f=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).state={dateFormat:"default"},a.renderHeaders=function(){return 0===a.props.timeEntries.length?i.a.createElement("tr",null,i.a.createElement("td",{className:_.a.te_cells},"No entries yet...")):i.a.createElement("tr",{className:_.a.te_row},i.a.createElement("th",{className:_.a.te_headers},"START TIME"),i.a.createElement("th",{className:_.a.te_headers},"END TIME"),i.a.createElement("th",{className:_.a.te_headers},"TIME SPENT"))},a.renderTableData=function(){if(0!==a.props.timeEntries.length)return a.props.timeEntries.map(function(e){return i.a.createElement("tr",{key:a.props.timeEntries.indexOf(e)},i.a.createElement("td",{className:_.a.te_cells},p(e[0])),i.a.createElement("td",{className:_.a.te_cells},p(e[1])),i.a.createElement("td",{className:_.a.te_cells},m(e[0],e[1])))})},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("table",{className:_.a.te_table},i.a.createElement("tbody",null,this.renderHeaders(),this.renderTableData()))}}]),t}(i.a.Component),v=a(15),I=a.n(v),S=a(1),b=a.n(S),w=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(i)))).action=function(){!0===a.props.isLogInCellPopulated?a.props.saveLogOut():a.props.saveLogIn()},a.buttonTextHandler=function(){return!0===a.props.isLogInCellPopulated?"Save log out":"Save log in"},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return"load"===this.props.isLogInCellPopulated?i.a.createElement("button",{className:"".concat(b.a.google_button," ").concat(b.a.google_button__action),disabled:!0},i.a.createElement("span",{className:b.a.text},"Saving data...")):i.a.createElement("button",{className:"".concat(b.a.google_button," ").concat(b.a.google_button__action),ref:"btn",onClick:this.action},i.a.createElement("span",{className:b.a.text},this.buttonTextHandler()))}}]),t}(i.a.Component),C=(a(26),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(i)))).state={date:new Date},a.saveLogIn=function(){a.props.saveLogIn(a.state.date)},a.saveLogOut=function(){a.props.saveLogOut(a.state.date)},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(i.a.Fragment,null,i.a.createElement(I.a,{"data-enable-time":!0,value:this.state.date,options:{static:!0},onChange:function(t){e.setState({date:new Date(t)})}}),i.a.createElement(w,{saveLogOut:this.saveLogOut,saveLogIn:this.saveLogIn,isLogInCellPopulated:this.props.isLogInCellPopulated}))}}]),t}(i.a.Component)),O=a(9),L=a.n(O),A=a(10),N=function(){return i.a.createElement("svg",{viewBox:"0 0 366 372",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z",id:"Shape",fill:"#EA4335"}),i.a.createElement("path",{d:"M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z",id:"Shape",fill:"#FBBC05"}),i.a.createElement("path",{d:"M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z",id:"Shape",fill:"#4285F4"}),i.a.createElement("path",{d:"M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z",fill:"#34A853"}))},D=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(i)))).handleAuthClick=function(){var e=Object(A.a)(L.a.mark(function e(t){return L.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a.props.handleAuthClick("load"),e.next=3,window.gapi.auth2.getAuthInstance().signIn();case 3:a.props.handleAuthClick(window.gapi.auth2.getAuthInstance().isSignedIn.get());case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.handleSignoutClick=function(){var e=Object(A.a)(L.a.mark(function e(t){return L.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.gapi.auth2.getAuthInstance().signOut();case 2:a.props.handleSignoutClick(window.gapi.auth2.getAuthInstance().isSignedIn.get());case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.action=function(){!0===a.props.isSignedIn?a.handleSignoutClick():a.handleAuthClick()},a.buttonTextHandler=function(){return!0===a.props.isSignedIn?"Log out":"Sign in with Google"},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("button",{className:"".concat(b.a.google_button," ").concat(b.a.google_button__signIn),onClick:this.action},i.a.createElement("span",{className:b.a.google_icon},i.a.createElement(N,null)),i.a.createElement("span",{className:b.a.text},this.buttonTextHandler()))}}]),t}(i.a.Component),k=a(11),y=a.n(k),j=function(){return i.a.createElement("div",{className:y.a.area},i.a.createElement("ul",{className:y.a.circles},i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null),i.a.createElement("li",null)))},T={CLIENT_ID:"523793257628-l1tsj3jh60tmgi2o94g69da2gbhh6rpv.apps.googleusercontent.com",DISCOVERY_DOCS:["https://sheets.googleapis.com/$discovery/rest?version=v4"],SPREADSHEETID:"1D83m9_MC_9I-Ji2wPDgm0VCpoz4IzPNfIVVnMY5Atqk",SCOPES:"https://www.googleapis.com/auth/spreadsheets"},P=a(2),x=a.n(P),M=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(i)))).state={isSignedIn:"load",timeEntries:[],isLogInCellPopulated:"load"},a.initClient=function(){window.gapi.client.init({clientId:T.CLIENT_ID,discoveryDocs:T.DISCOVERY_DOCS,scope:T.SCOPES}).then(function(){window.gapi.auth2.getAuthInstance(),a.setState({isSignedIn:window.gapi.auth2.getAuthInstance().isSignedIn.get()}),a.retrieveData()},function(e){console.log(JSON.stringify(e,null,2))})},a.handleAuthClick=function(e){a.setState({isSignedIn:e}),a.retrieveData()},a.handleSignoutClick=function(e){a.setState({isSignedIn:e})},a.isLogInCellPopulated=function(){0===a.state.timeEntries.length?a.setState({isLogInCellPopulated:!1}):void 0===a.state.timeEntries[a.state.timeEntries.length-1][1]?a.setState({isLogInCellPopulated:!0}):a.setState({isLogInCellPopulated:!1})},a.retrieveData=function(){!0===a.state.isSignedIn&&window.gapi.client.sheets.spreadsheets.values.get({spreadsheetId:T.SPREADSHEETID,range:"Sheet1!A2:C"}).then(function(e){void 0!==e.result.values&&a.setState({timeEntries:e.result.values})},function(e){alert("Error: "+e.result.error.message)}).then(function(){a.isLogInCellPopulated()})},a.updateLogOutTimeEntriesState=function(e){var t=a.state.timeEntries[a.state.timeEntries.length-1][0],n=a.state.timeEntries;n.pop(),a.setState({timeEntries:[].concat(Object(o.a)(n),[[t,e.toJSON()]])})},a.updateLogInTimeEntriesState=function(e){a.setState({timeEntries:[].concat(Object(o.a)(a.state.timeEntries),[[e.toJSON(),""]])})},a.saveLogIn=function(e){a.updateLogInTimeEntriesState(e),a.setState({isLogInCellPopulated:"load"});var t={values:[[e]]};window.gapi.client.load("sheets","v4",function(){window.gapi.client.sheets.spreadsheets.values.append({spreadsheetId:T.SPREADSHEETID,range:"Sheet1",valueInputOption:"USER_ENTERED",resource:t}).then(function(e){a.retrieveData()})})},a.saveLogOut=function(e){a.updateLogOutTimeEntriesState(e),a.setState({isLogInCellPopulated:"load"});var t="Sheet1!B".concat(a.state.timeEntries.length+2,":C"),n={values:[[e]]};window.gapi.client.load("sheets","v4",function(){window.gapi.client.sheets.spreadsheets.values.update({spreadsheetId:T.SPREADSHEETID,range:t,valueInputOption:"USER_ENTERED",resource:n}).then(function(e){a.retrieveData()})})},a.componentDidMount=function(){window.gapi.load("client:auth2",a.initClient)},a}return Object(g.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return"load"===this.state.isSignedIn?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",null,"LOADING..."),i.a.createElement(j,null)):!1===this.state.isSignedIn?i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:x.a.header_bar},i.a.createElement("div",{className:x.a.header_title},i.a.createElement(h,{title:"Time Logger"})),i.a.createElement("div",{className:x.a.auth_button},i.a.createElement(D,{handleAuthClick:this.handleAuthClick,handleSignoutClick:this.handleSignoutClick,isSignedIn:this.state.isSignedIn}))),i.a.createElement("div",{className:x.a.centered},"Please sign in with your Google Account"),i.a.createElement(j,null)):i.a.createElement(i.a.Fragment,null,i.a.createElement("header",{className:x.a.header_bar},i.a.createElement("div",{className:x.a.header_title},i.a.createElement(h,{title:"Time Logger"}))),i.a.createElement("section",{className:x.a.inputDate_section},i.a.createElement("div",{className:x.a.m_15},i.a.createElement("h3",null,"Select the date and save the entry:")),i.a.createElement("div",null,i.a.createElement(C,{saveLogIn:this.saveLogIn,saveLogOut:this.saveLogOut,isLogInCellPopulated:this.state.isLogInCellPopulated}))),i.a.createElement("section",{className:x.a.timeEntries_section},i.a.createElement(f,{timeEntries:this.state.timeEntries})),i.a.createElement("div",{className:x.a.auth_button_wrapper},i.a.createElement(D,{handleAuthClick:this.handleAuthClick,handleSignoutClick:this.handleSignoutClick,isSignedIn:this.state.isSignedIn})),i.a.createElement(j,null))}}]),t}(i.a.Component);s.a.render(i.a.createElement(M,null),document.getElementById("root"))},8:function(e,t,a){e.exports={te_table:"TimeEntries_te_table__2tY9M",te_headers:"TimeEntries_te_headers__3TRaF",te_cells:"TimeEntries_te_cells__3LXqK"}}},[[16,1,2]]]);
//# sourceMappingURL=main.d52437c3.chunk.js.map