webpackJsonp([4],{EKx1:function(t,e,s){!function(e){"use strict";var n={};void 0!==t&&t.exports?(n.bytesToHex=s("gHj8").bytesToHex,n.convertString=s("ENQ2"),t.exports=u):(n.bytesToHex=e.convertHex.bytesToHex,n.convertString=e.convertString,e.sha256=u);var i=[];!function(){function t(t){for(var e=Math.sqrt(t),s=2;s<=e;s++)if(!(t%s))return!1;return!0}function e(t){return 4294967296*(t-(0|t))|0}for(var s=2,n=0;n<64;)t(s)&&(i[n]=e(Math.pow(s,1/3)),n++),s++}();var r=function(t){for(var e=[],s=0,n=0;s<t.length;s++,n+=8)e[n>>>5]|=t[s]<<24-n%32;return e},a=function(t){for(var e=[],s=0;s<32*t.length;s+=8)e.push(t[s>>>5]>>>24-s%32&255);return e},o=[],c=function(t,e,s){for(var n=t[0],r=t[1],a=t[2],c=t[3],u=t[4],m=t[5],l=t[6],d=t[7],h=0;h<64;h++){if(h<16)o[h]=0|e[s+h];else{var p=o[h-15],v=(p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3,f=o[h-2],w=(f<<15|f>>>17)^(f<<13|f>>>19)^f>>>10;o[h]=v+o[h-7]+w+o[h-16]}var g=n&r^n&a^r&a,_=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),x=d+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&m^~u&l)+i[h]+o[h];d=l,l=m,m=u,u=c+x|0,c=a,a=r,r=n,n=x+(_+g)|0}t[0]=t[0]+n|0,t[1]=t[1]+r|0,t[2]=t[2]+a|0,t[3]=t[3]+c|0,t[4]=t[4]+u|0,t[5]=t[5]+m|0,t[6]=t[6]+l|0,t[7]=t[7]+d|0};function u(t,e){t.constructor===String&&(t=n.convertString.UTF8.stringToBytes(t));var s=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],i=r(t),o=8*t.length;i[o>>5]|=128<<24-o%32,i[15+(o+64>>9<<4)]=o;for(var u=0;u<i.length;u+=16)c(s,i,u);var m=a(s);return e&&e.asBytes?m:e&&e.asString?n.convertString.bytesToString(m):n.bytesToHex(m)}u.x2=function(t,e){return u(u(t,{asBytes:!0}),e)}}(this)},ENQ2:function(t,e){!function(e){"use strict";var s={bytesToString:function(t){return t.map(function(t){return String.fromCharCode(t)}).join("")},stringToBytes:function(t){return t.split("").map(function(t){return t.charCodeAt(0)})}};s.UTF8={bytesToString:function(t){return decodeURIComponent(escape(s.bytesToString(t)))},stringToBytes:function(t){return s.stringToBytes(unescape(encodeURIComponent(t)))}},void 0!==t&&t.exports?t.exports=s:e.convertString=s}(this)},Ha0l:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={props:["newTime"],data:function(){return{h1:0,h2:0,m1:0,m2:0,isArrow:!1,mouseHold:null}},watch:{h1:function(){isNaN(this.h1)&&(this.h1=0);var t=parseInt(this.h1);t>=2&&this.h2>3&&(this.h2=3),this.h1=t<0?2:t%3,this.isArrow?(this.nextInput(1),this.isArrow=!1):this.nextInput(2),this.$emit("update_time",new Date(0,0,0,10*this.h1+this.h2,10*this.m1+this.m2,0,0))},h2:function(){isNaN(this.h2)&&(this.h2=0);var t=parseInt(this.h2);this.h1>=2&&t>3?(this.h1++,t%=4):this.h1<=0&&t<0?(this.h1--,t=4):t>9?(this.h1++,t%=10):t<0&&(this.h1--,t=9),this.h2=t,this.isArrow?(this.nextInput(2),this.isArrow=!1):this.nextInput(3),this.$emit("update_time",new Date(0,0,0,10*this.h1+this.h2,10*this.m1+this.m2,0,0))},m1:function(){isNaN(this.m1)&&(this.m1=0);var t=parseInt(this.m1);t>5?(this.h2++,t%=6):t<0&&(this.h2--,t=5),this.m1=t,this.isArrow?(this.nextInput(3),this.isArrow=!1):this.nextInput(4),this.$emit("update_time",new Date(0,0,0,10*this.h1+this.h2,10*this.m1+this.m2,0,0))},m2:function(){var t=parseInt(this.m2);isNaN(this.m2)&&(t=0),t>9?(this.m1++,t%=10):t<0&&(this.m1--,t=9),this.m2=t,this.isArrow?(this.nextInput(4),this.isArrow=!1):this.nextInput(1),this.$emit("update_time",new Date(0,0,0,10*this.h1+this.h2,10*this.m1+this.m2,0,0))}},mounted:function(){var t=Math.floor(this.newTime.getHours()/10);this.h1=t>0?t:0,this.h2=Math.floor(this.newTime.getHours()%10);var e=Math.floor(this.newTime.getMinutes()/10);this.m1=e>0?e:0,this.m2=Math.floor(this.newTime.getHours%10)},methods:{add:function(t){this.isArrow=!0,this[t]=parseInt(this[t])+1},sub:function(t){this.isArrow=!0,this[t]=parseInt(this[t])-1},nextInput:function(t){document.getElementById("input"+t).focus(),document.getElementById("input"+t).selectionStart=0,document.getElementById("input"+t).selectionEnd=2},mouseDownHandler:function(t,e){this.mouseHold=setInterval(t,200,e)},mouseUpHandler:function(){clearInterval(this.mouseHold)}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex",staticStyle:{height:"75px"}},[s("div",{staticClass:"mr-2 p-0 text-center h-100",staticStyle:{width:"25px"}},[s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-up"},on:{click:function(e){return t.add("h1")},mousedown:function(e){return t.mouseDownHandler(t.add,"h1")},mouseup:t.mouseUpHandler}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.h1,expression:"h1"}],staticClass:"h-50 m-0 p-0 w-100 text-center",attrs:{id:"input1",type:"text"},domProps:{value:t.h1},on:{click:function(e){return t.nextInput(1)},input:function(e){e.target.composing||(t.h1=e.target.value)}}}),t._v(" "),s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-down"},on:{click:function(e){return t.sub("h1")},mousedown:function(e){return t.mouseDownHandler(t.sub,"h1")},mouseup:t.mouseUpHandler}})],1),t._v(" "),s("div",{staticClass:"m-0 p-0 text-center h-100",staticStyle:{width:"25px"}},[s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-up"},on:{click:function(e){return t.add("h2")},mousedown:function(e){return t.mouseDownHandler(t.add,"h2")},mouseup:t.mouseUpHandler}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.h2,expression:"h2"}],staticClass:"h-50 m-0 p-0 w-100 text-center",attrs:{id:"input2",type:"text"},domProps:{value:t.h2},on:{click:function(e){return t.nextInput(2)},input:function(e){e.target.composing||(t.h2=e.target.value)}}}),t._v(" "),s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-down"},on:{click:function(e){return t.sub("h2")},mousedown:function(e){return t.mouseDownHandler(t.sub,"h2")},mouseup:t.mouseUpHandler}})],1),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"mr-2 p-0 text-center h-100",staticStyle:{width:"25px"}},[s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-up"},on:{click:function(e){return t.add("m1")},mousedown:function(e){return t.mouseDownHandler(t.add,"m1")},mouseup:t.mouseUpHandler}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.m1,expression:"m1"}],staticClass:"h-50 m-0 p-0 w-100 text-center",attrs:{id:"input3",type:"text"},domProps:{value:t.m1},on:{click:function(e){return t.nextInput(3)},input:function(e){e.target.composing||(t.m1=e.target.value)}}}),t._v(" "),s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-down"},on:{click:function(e){return t.sub("m1")},mousedown:function(e){return t.mouseDownHandler(t.sub,"m1")},mouseup:t.mouseUpHandler}})],1),t._v(" "),s("div",{staticClass:"m-0 p-0 text-center h-100",staticStyle:{width:"25px"}},[s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-up"},on:{click:function(e){return t.add("m2")},mousedown:function(e){return t.mouseDownHandler(t.add,"m2")},mouseup:t.mouseUpHandler}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.m2,expression:"m2"}],staticClass:"h-50 m-0 p-0 w-100 text-center",attrs:{id:"input4",type:"text"},domProps:{value:t.m2},on:{click:function(e){return t.nextInput(4)},input:function(e){e.target.composing||(t.m2=e.target.value)}}}),t._v(" "),s("font-awesome-icon",{staticClass:"h-25 m-0 p-0",attrs:{icon:"angle-down"},on:{click:function(e){return t.sub("m2")},mousedown:function(e){return t.mouseDownHandler(t.sub,"m2")},mouseup:t.mouseUpHandler}})],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"m-0 p-0h-100 d-flex align-items-center justify-content-center",staticStyle:{width:"25px"}},[e("h1",{staticClass:"m-0 p-0 align-middle"},[this._v(":")])])}]},r=s("VU/8")(n,i,!1,null,null,null).exports,a=s("6CT3"),o=s("EKx1"),c=s.n(o),u={props:["timerSetting"],data:function(){return{password:"",connected:!1,teams:[],newTime:new Date(0,0,0,3,0,0,0),repServ:{msg:"",variant:""},repServTimer:{msg:"",variant:""},repServListName:"",deleteTeam:{},myTimeOut:null}},sockets:{scoreBoard:function(t){this.teams=t},connectAdmin:function(t){this.connected=t.connected,this.connected||(this.password=""),this.repServ=t.repServ,clearTimeout(this.myTimeOut)},timerSetting:function(t){this.repServTimer=t},listName:function(t){this.repServListName=t.rep}},methods:{deletTeam:function(){this.$socket.emit("deletTeam",this.deleteTeam.id)},update_time:function(t){this.newTime=t},connectAdmin:function(){var t=this;this.password=c()(this.password),console.log(this.password),this.$socket.emit("connectAdmin",{password:this.password}),this.myTimeOut=setTimeout(function(){t.repServ={msg:"Could not join server",variant:"danger"}},5e3)},chosenName:function(t){this.$socket.emit("chosenName",{password:this.password,id:t})},chooseDuration:function(){try{var t={hours:this.newTime.getHours(),minutes:this.newTime.getMinutes()};this.timerSetting.isStarted?this.$socket.emit("change",{password:this.password,duration:t}):this.$socket.emit("start",{password:this.password,duration:t})}catch(t){this.repServTimer.msg="Wrong Date type",this.repServTimer.variant="danger"}},play:function(){this.$socket.emit("play",{password:this.password})},pause:function(){this.$socket.emit("pause",{password:this.password})},stop:function(){this.$socket.emit("stop",{password:this.password})},restart:function(){this.$socket.emit("restart",{password:this.password}),this.$socket.emit("scoreBoard")}},components:{Timer:a.a,Timepicker:r},mounted:function(){document.getElementById("password").focus(),this.$socket.emit("scoreBoard")}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid h-100 "},[s("div",{staticClass:"row h-100"},[s("div",{staticClass:"offset-1 col-10 p-0 h-100"},[s("div",{staticClass:"row col-12 p-0 m-0 justify-content-between"},[s("div",{staticClass:"p-0 d-flex col justify-content-center d-flex flex-column"},[s("h1",{staticClass:"m-0"},[t._v("Admin")]),t._v(" "),s("b-link",{attrs:{to:"/"}},[t._v("Return to Home")])],1),t._v(" "),s("div",{staticClass:"col-6 m-0 p-0"},[s("Timer",{staticClass:"m-0 p-0",attrs:{timerSetting:t.timerSetting}})],1)]),t._v(" "),t.connected?s("div",{staticClass:"row col-12 p-0 m-0"},[s("div",{staticClass:"col-12 col-xl-6 mb-5 p-0 pr-xl-5"},[s("h3",[t._v("Clock")]),t._v(" "),s("b-form",{staticClass:"w-100",on:{submit:function(e){return e.preventDefault(),t.chooseDuration(e)}}},[s("div",{staticClass:"form-group row align-items-center m-0 p-0 w-100 d-flex justify-content-between"},[s("label",{staticClass:"col-form-label m-0 p-0 w-auto",staticStyle:{"font-size":"24px"},attrs:{for:"appt-time"}},[t._v(t._s(t.timerSetting.isStarted?"Change Duration :":"Duration of the exercise :"))]),t._v(" "),s("Timepicker",{staticClass:"ml-auto my-2 w-auto",attrs:{id:"appt-time",newTime:t.newTime},on:{update_time:t.update_time}}),t._v(" "),s("b-button",{staticClass:"ml-auto",staticStyle:{width:"100px"},attrs:{variant:"primary",type:"submit",name:"start"}},[t._v(t._s(t.timerSetting.isStarted?"Change":"Start"))])],1)]),t._v(" "),s("div",{staticClass:"mt-5 mb-3 d-flex flex-inline justify-content-left"},[t.timerSetting.isStarted&&t.timerSetting.isPaused?s("b-button",{staticClass:"mr-4",staticStyle:{width:"100px"},attrs:{variant:"success",name:"play"},on:{click:t.play}},[t._v("Play")]):t._e(),t._v(" "),t.timerSetting.isStarted&&!t.timerSetting.isPaused?s("b-button",{staticClass:"mr-4",staticStyle:{width:"100px"},attrs:{variant:"warning",name:"pause"},on:{click:t.pause}},[t._v("Pause")]):t._e(),t._v(" "),t.timerSetting.isStarted?s("b-button",{staticClass:"mr-4",staticStyle:{width:"100px"},attrs:{variant:"warning",id:"buttonStop",name:"stop"},on:{click:t.stop}},[t._v("Stop")]):t._e(),t._v(" "),t.timerSetting.isStarted?s("b-tooltip",{attrs:{target:"buttonStop",placement:"bottom"}},[s("strong",[t._v("If you stop the game, players will be redirected to the score page and the timer will be stoped.")])]):t._e(),t._v(" "),s("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-restart",modifiers:{"modal-restart":!0}}],staticClass:"mr-4",staticStyle:{width:"100px"},attrs:{variant:"danger",id:"buttonRestart",name:"restart"}},[t._v("Restart")]),t._v(" "),s("b-modal",{attrs:{id:"modal-restart",title:"Restart"},on:{ok:t.restart}},[s("p",{staticClass:"my-4"},[t._v("Are you sure you want to restart the game ?")])]),t._v(" "),s("b-tooltip",{attrs:{target:"buttonRestart",placement:"bottom"}},[s("strong",[t._v("If you restart the game, every data (teams and timer) on the current game will be delete.")])])],1),t._v(" "),t.repServTimer.msg?s("b-alert",{staticClass:"text-center",attrs:{show:"",variant:t.repServTimer.variant}},[t._v(t._s(t.repServTimer.msg))]):t._e()],1),t._v(" "),s("b-col",{staticClass:"m-0 p-0 pl-xl-5 d-flex flex-column",attrs:{cols:"12",xl:"6"}},[s("h3",[t._v("Teams")]),t._v(" "),t._l(t.teams,function(e){return s("b-button-group",{key:e.id,staticClass:"p-0 m-0",staticStyle:{height:"40px"}},[s("b-button",{staticClass:"d-flex justify-content-between col-11 rounded-0",attrs:{variant:"outline-dark"},on:{click:function(s){return t.chosenName(e.id)}}},[s("b",[t._v(t._s(e.placement)+". "+t._s(e.name))]),t._v(" "),s("span",[t._v(t._s(e.point))])]),t._v(" "),s("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-delete-team",modifiers:{"modal-delete-team":!0}}],staticClass:"p-0",staticStyle:{"font-size":"25px"},attrs:{variant:"outline-danger","aria-label":"Close"},on:{click:function(s){t.deleteTeam=e}}},[s("span",{staticClass:"m-0 p-0",attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),s("b-modal",{attrs:{id:"modal-delete-team",title:"Delete Team"},on:{ok:function(e){return t.deletTeam()}}},[s("p",{staticClass:"my-4"},[t._v("Do you really want to delete the "),s("b",[t._v(t._s(t.deleteTeam.name))]),t._v(" team ?")])])],1)}),t._v(" "),t.repServListName?s("b-alert",{attrs:{show:"",variant:t.danger}},[t._v(t._s(t.repServListName))]):t._e()],2)],1):s("div",{staticClass:"d-flex flex-column"},[s("b-form",{staticClass:"mb-2",attrs:{inline:""},on:{submit:function(e){return e.preventDefault(),t.connectAdmin(e)}}},[s("label",{staticClass:"mr-2 col-form-label col-form-label-lg",attrs:{for:"password"}},[t._v("Password")]),t._v(" "),s("b-input",{staticClass:"mr-2 col-7 col-md-5 col-lg-3",attrs:{type:"password",id:"password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("b-button",{staticStyle:{width:"100px"},attrs:{variant:"primary",type:"submit",name:"connect"}},[t._v("Connect")])],1),t._v(" "),s("b-alert",{staticClass:"col-5 text-center",attrs:{variant:t.repServ.variant,show:""}},[t._v(t._s(t.repServ.msg))])],1)])])])},staticRenderFns:[]};var l=s("VU/8")(u,m,!1,function(t){s("m76M")},null,null);e.default=l.exports},gHj8:function(t,e){!function(e){"use strict";var s={bytesToHex:function(t){return function(t){return t.map(function(t){return e=t.toString(16),s=2,e.length>s?e:Array(s-e.length+1).join("0")+e;var e,s}).join("")}(t)},hexToBytes:function(t){if(t.length%2==1)throw new Error("hexToBytes can't have a string with an odd number of characters.");return 0===t.indexOf("0x")&&(t=t.slice(2)),t.match(/../g).map(function(t){return parseInt(t,16)})}};void 0!==t&&t.exports?t.exports=s:e.convertHex=s}(this)},m76M:function(t,e){}});
//# sourceMappingURL=4.b268873ab845285fdf96.js.map