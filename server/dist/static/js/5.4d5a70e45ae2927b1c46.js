webpackJsonp([5],{CZB7:function(e,t){},qfwv:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={props:["name","timerSetting"],data:function(){return{server_response:"",exercise:"",variant:"success"}},components:{cipher_component:function(){return n.e(15).then(n.bind(null,"jEHL"))},sql_injection_component:function(){return n.e(14).then(n.bind(null,"omFH"))},xss_component:function(){return n.e(13).then(n.bind(null,"BWH3"))}},sockets:{exercise:function(e){this.server_response=e.msg,this.variant=e.variant,e.validate&&this.$store.dispatch("addDoneExercise",this.name)}},watch:{$route:function(e,t){var n=this;this.$resource("exercise").get({key:this.name}).then(function(e){n.exercise=e.data,n.server_response="",n.variant="success"},function(e){n.variant="danger",n.server_response="Could not load exercise from the server"})}},mounted:function(){var e=this;this.$resource("exercise").get({key:this.name}).then(function(t){e.exercise=t.data},function(t){e.variant="danger",e.server_response="Could not load exercise from the server"})}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[e.timerSetting.isPaused?n("div",{staticClass:"w-100 position-absolute d-flex align-items-center justify-content-center bg-dark",staticStyle:{height:"100vh","z-index":"1000",opacity:"0.99",top:"0",left:"0"}},[n("h1",{staticClass:"text-danger",staticStyle:{opacity:"1"}},[e._v("The game has been paused by the admin")])]):e._e(),e._v(" "),n("div",{staticClass:"w-100 p-0 m-0"},[n("h2",{staticClass:"title"},[e._v(e._s(e.exercise.title))]),e._v(" "),""!==e.exercise?n("div",[n("p",{staticClass:"indent text-justify",domProps:{innerHTML:e._s(e.exercise.description)}}),e._v(" "),n(e.exercise.exercise.component,{tag:"component",attrs:{name:e.exercise.key,data:e.exercise.exercise,timerSetting:e.timerSetting}})],1):n("b-alert",{staticClass:"text-center w-100",attrs:{variant:"warning",show:""}},[e._v("Loading exercise !")])],1),e._v(" "),e.server_response?n("b-alert",{attrs:{variant:e.variant,show:""}},[e._v(e._s(e.server_response))]):e._e()],1)},staticRenderFns:[]};var i=n("VU/8")(s,r,!1,function(e){n("CZB7")},null,null);t.default=i.exports}});
//# sourceMappingURL=5.4d5a70e45ae2927b1c46.js.map