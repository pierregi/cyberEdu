webpackJsonp([1],{"7Cml":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"m-0 p-0 h-50 overflow-auto"},[i("table",{staticClass:"h-100 m-0 p-0 table table-striped text-center table-hover table-sm"},[t._m(0),t._v(" "),i("tbody",{staticClass:"m-0 p-0",staticStyle:{height:"89%"}},t._l(t.teams,function(e){return i("tr",{key:e.id,staticClass:"m-0 text-center",style:{height:t.height+"%"}},[i("th",{staticClass:"align-middle",attrs:{scope:"row"}},[t._v(t._s(e.placement))]),t._v(" "),i("td",{staticClass:"align-middle text-break"},[t._v(t._s(e.name))]),t._v(" "),i("td",{staticClass:"align-middle"},[t._v(t._s(e.point))])])}),0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",{staticClass:"m-0 p-0 position-sticky sticky-top thead-dark",staticStyle:{height:"10%"}},[e("th",{attrs:{scope:"col"}},[this._v("#")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Teams")]),this._v(" "),e("th",{attrs:{scope:"col"}},[this._v("Points")])])}]};var s=i("VU/8")({data:function(){return{teams:[]}},computed:{height:function(){return 100/this.teams.length}},sockets:{scoreBoard:function(t){this.teams=t}},mounted:function(){this.$socket.emit("scoreBoard")}},n,!1,function(t){i("c9id")},null,null).exports,r={props:["timerSetting"],data:function(){return{error:!1,themes:[]}},methods:{selectTheme:function(t){this.$router.replace({name:t})},unSelectTheme:function(){this.$router.replace({name:"GamePage"}),this.$emit("doc","")}},components:{subMenu:i("dRwo").a},mounted:function(){var t=this;this.$resource("themes").get().then(function(e){t.themes=e.data},function(e){t.error=!0})}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"m-0 p-0 w-100 h-50 border-bottom border-dark overflow-auto bg-dark",staticStyle:{"max-height":"50%"}},[i("h2",{staticClass:"text-center m-0 py-2 text-white nav-link",on:{click:t.unSelectTheme}},[t._v("Menu")]),t._v(" "),t.error?i("b-alert",{staticClass:"m-3 mw-100 text-center text-break",attrs:{variant:"danger",show:""}},[t._v("Could not load menu from server")]):i("b-nav",{staticClass:"m-0 p-0 h-auto text-white",staticStyle:{"font-size":"20px"},attrs:{vertical:""}},t._l(t.themes,function(e){return i("div",{key:e.key,staticClass:"m-0 p-0 h-auto"},[i("b-nav-item",{staticClass:"m-0 py-1 h-auto",staticStyle:{"font-size":"25px"},attrs:{active:e.key===t.$route.name,"link-classes":{"bg-secondary text-warning":e.key===t.$route.name,"text-primary m-0 pl-2 p-0 h-auto ":!0}},on:{click:function(i){return t.selectTheme(e.key)}}},[t._v(t._s(e.title))]),t._v(" "),i("subMenu",{attrs:{theme:e.key,timerSetting:t.timerSetting,id:e.key}})],1)}),0)],1)},staticRenderFns:[]};var o={props:["timerSetting"],data:function(){return{documentation:"",data:"",sideDoc:!1,windowHeight:window.innerHeight,windowWidth:window.innerWidth}},computed:{maxHeight:function(){return window.innerHeight-150}},components:{Menu:i("VU/8")(r,a,!1,function(t){i("hntZ")},null,null).exports,timer:i("6CT3").a,scoreBoard:s,CaesarDoc:function(){return i.e(12).then(i.bind(null,"VP8R"))},VigenereDoc:function(){return i.e(10).then(i.bind(null,"qrP1"))},SQLDoc:function(){return i.e(11).then(i.bind(null,"4XW6"))},JsDoc:function(){return i.e(9).then(i.bind(null,"ESIZ"))}},methods:{doc:function(t){this.documentation=t},side:function(t){this.sideDoc=t},resize:function(){this.windowHeight=window.innerHeight,this.windowWidth=window.innerWidth}},beforeCreate:function(){this.$socket.emit("testId",this.$cookie.get("id"))},created:function(){window.addEventListener("resize",this.resize)},beforeDestroy:function(){window.removeEventListener("resize",this.resize)}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-fluid h-100",attrs:{id:"app"}},[i("div",{staticClass:"row h-100"},[i("div",{staticClass:"col-2 h-100 m-0 p-0 border-right border-dark"},[i("Menu",{attrs:{timerSetting:t.timerSetting},on:{doc:t.doc}}),t._v(" "),i("scoreBoard")],1),t._v(" "),i("div",{staticClass:"col-6 mh-100 m-0 overflow-auto"},["GamePage"!==t.$route.name?i("router-view",{attrs:{timerSetting:t.timerSetting,windowWidth:t.windowWidth},on:{doc:t.doc,sideDoc:t.side}}):i("div",{staticClass:"mx-3 my-4"},[i("h1",{staticClass:"text-center my-5 text-primary"},[t._v("Welcome to CyberEdu")]),t._v(" "),i("p",{staticClass:"indent text-justify"},[t._v("In this platform, you will discover the basis of cryptography and cybersecurity. ")]),t._v(" "),i("h4",{staticClass:"text-danger"},[t._v("Menu")]),t._v(" "),i("p",{staticClass:"indent text-justify"},[t._v("You will compete with other groups on doing the exercises that you can find on the Menu which is on the left side of the page. ")]),t._v(" "),i("h4",{staticClass:"text-danger"},[t._v("Scoreboard")]),t._v(" "),i("p",{staticClass:"indent text-justify"},[t._v("On the left bottom corner, you will find a scoreboard where the other teams and yours will be ranked with they score. Your score is the amout of point you will earn by validate a Challenge. Every Challenge gives you a definite amount of point based on the difficulty, easier they are, less point you will earn. The last way to earn points is to finish all exercises before the timer is at zero and the faster you go the more points you will gain.")]),t._v(" "),i("h4",{staticClass:"text-danger"},[t._v("Challenge & Documentation")]),t._v(" "),i("p",{staticClass:"text-justify"},[t._v("\n          This app is based on four main themes:\n          "),i("ul",[i("li",[t._v("Caesar cipher")]),t._v(" "),i("li",[t._v("Vigenère cipher")]),t._v(" "),i("li",[t._v("SQL")]),t._v(" "),i("li",[t._v("Javascript")])])]),t._v(" "),i("p",{staticClass:"indent text-justify"},[t._v("\n          I suggest you to do them in this order but it is not obligatory. Every themes are provided with a documentation that you should read before doing the exercises becase it will help you to resolve them.\n        ")]),t._v(" "),i("div",{staticClass:"w-100 text-center"},[i("b-link",{staticClass:"text-center w-100",attrs:{to:{name:"caesar"}}},[t._v("Now you can start by the first theme")])],1)])],1),t._v(" "),i("div",{staticClass:"col-4 h-100 m-0 p-0 border-left border-dark"},[i("timer",{staticClass:"m-0 p-0 border-bottom border-dark",attrs:{timerSetting:t.timerSetting}}),t._v(" "),t.sideDoc?i(t.documentation,{tag:"components",staticClass:"overflow-auto p-3",style:{maxHeight:t.maxHeight+"px"},attrs:{sideDoc:!0}}):t._e()],1)])])},staticRenderFns:[]};var l=i("VU/8")(o,c,!1,function(t){i("aYjg")},null,null);e.default=l.exports},Dd8w:function(t,e,i){"use strict";e.__esModule=!0;var n,s=i("woOf"),r=(n=s)&&n.__esModule?n:{default:n};e.default=r.default||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}},Nqn1:function(t,e){},aYjg:function(t,e){},c9id:function(t,e){},dRwo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Dd8w"),s=i.n(n),r=i("NYxO"),a={props:["theme","timerSetting","select"],data:function(){return{subThemes:[],error:!1}},watch:{$route:function(t,e){var i=this;this.$resource("subThemes").get({refer:this.theme}).then(function(t){i.subThemes=t.data,i.error=!1},function(t){i.error=!0})}},computed:s()({},r.a.mapGetters({alreadyDone:"getAlreadyDone"})),methods:{selectSubTheme:function(t){this.timerSetting.isStarted&&!this.timerSetting.isPaused?this.$router.push({name:t}):this.$router.push({name:this.theme})}},mounted:function(){var t=this;this.$resource("subThemes").get({refer:this.theme}).then(function(e){t.subThemes=e.data,t.error=!1},function(e){t.error=!0})}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._l(t.subThemes,function(e){return t.error?i("b-alert",{staticClass:"m-3 mw-100 text-center text-break show",attrs:{variant:"danger"}},[t._v("Could not load the menu from the server")]):i("b-nav-item",{key:e.key,staticClass:"w-100 m-0 p-0 h-auto",attrs:{active:e.key===t.$route.name,"link-classes":{"text-success":-1!==t.alreadyDone.indexOf(e.key),"text-dark":t.select&&-1===t.alreadyDone.indexOf(e.key),"bg-secondary text-warning":e.key===t.$route.name,"text-white w-100 h-auto m-0 px-4 p-0 d-flex justify-content-between":!0},disabled:t.timerSetting.isPaused||!t.timerSetting.isStarted},on:{click:function(i){return t.selectSubTheme(e.key)}}},[i("p",{staticClass:"m-0 p-0"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"m-0 p-0"},[t._v(t._s(e.point))])])}),1)},staticRenderFns:[]};var c=i("VU/8")(a,o,!1,function(t){i("Nqn1")},null,null);e.a=c.exports},hntZ:function(t,e){},woOf:function(t,e,i){t.exports={default:i("V3tA"),__esModule:!0}}});
//# sourceMappingURL=1.20f1135a203abf2234fd.js.map