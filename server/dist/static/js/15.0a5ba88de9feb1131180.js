webpackJsonp([15],{jEHL:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[r("font-awesome-icon",{attrs:{icon:["far","lightbulb"]}}),e._v(" Special characters, spaces or punctuation will not be  considered in the correction.")],1),e._v(" "),r("b-row",[r("b-col",{staticClass:"p-2 bg-white m-0 border border-secondary rounded",attrs:{cols:"12",xl:"6",tag:"p"},domProps:{innerHTML:e._s(e.data.text)}}),e._v(" "),r("b-form-textarea",{staticClass:"col-12 col-xl-6 py-2 border border-secondary rounded",staticStyle:{"font-size":"18px"},attrs:{id:"myMessage",placeholder:"Type your anwser here",disabled:e.timerSetting.isPaused},model:{value:e.answer,callback:function(t){e.answer=t},expression:"answer"}}),e._v(" "),r("b-button",{staticClass:"ml-auto my-3",staticStyle:{width:"100px"},attrs:{variant:"primary",type:"submit",name:"submit",disabled:e.timerSetting.isPaused},on:{click:e.sendAnswer}},[e._v("Send")])],1)],1)},staticRenderFns:[]};var n=r("VU/8")({props:["name","data","timerSetting"],data:function(){return{answer:""}},methods:{sendAnswer:function(){var e={answer:this.answer,exercise:this.name};this.$socket.emit("exercise",e)}},watch:{$route:function(e,t){this.answer=""}}},s,!1,function(e){r("z0XO")},null,null);t.default=n.exports},z0XO:function(e,t){}});
//# sourceMappingURL=15.0a5ba88de9feb1131180.js.map