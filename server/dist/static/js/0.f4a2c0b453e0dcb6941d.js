webpackJsonp([0],{"6CT3":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s={props:["timerSetting"],data:function(){return{digit_holder:"",digits:{},digit_to_name:"",positions:[],interval:null}},watch:{timerSetting:{handler:function(){this.timerSetting.isStarted?this.timerSetting.isPaused?(this.update_time(this.timerSetting.datePause),clearInterval(this.interval)):this.interval=setInterval(this.myInterval,1e3):(this.timerSetting.isStop,clearInterval(this.interval)),this.timerSetting.load=!1},deep:!0}},methods:{myInterval:function(){var t=(new Date).getTime();this.update_time(t)},update_time:function(t){var i=this.timerSetting.countDownDate-t,e=Math.floor(i%864e5/36e5),s=Math.floor(i%36e5/6e4),n=Math.floor(i%6e4/1e3);this.digits.h1.attr("class",this.digit_to_name[Math.floor(e/10)]),this.digits.h2.attr("class",this.digit_to_name[e%10]),this.digits.m1.attr("class",this.digit_to_name[Math.floor(s/10)]),this.digits.m2.attr("class",this.digit_to_name[s%10]),this.digits.s1.attr("class",this.digit_to_name[Math.floor(n/10)]),this.digits.s2.attr("class",this.digit_to_name[n%10]),i<0&&clearInterval(this.interval)},createClock:function(){this.digit_holder=$("div#clock").find(".digits"),this.digits={},this.digit_to_name="zero one two three four five six seven eight nine".split(" "),this.positions=["h1","h2",":","m1","m2",":","s1","s2"];var t=this;$.each(this.positions,function(){if(":"===this)t.digit_holder.append($('<div class="dots">'));else{for(var i=$("<div>"),e=1;e<8;e++)i.append('<span class="d'+e+'">');t.digits[this]=i,t.digit_holder.append(i)}})}},mounted:function(){this.$socket.emit("getTimer"),this.timerSetting.load=!0,this.createClock()},beforeDestroy:function(){clearInterval(this.interval)}},n={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"light",attrs:{id:"clock"}},[i("div",{staticClass:"display",staticStyle:{"min-width":"242px"}},[i("div",{staticClass:"digits"})])])}]};var a={props:["timerSetting","hideLogo"],data:function(){return{display:"Waiting for start"}},watch:{timerSetting:{handler:function(){this.timerSetting.isStarted?this.display=!1:this.timerSetting.isStop?this.display="Finished":this.display="Waiting for start",this.timerSetting.load=!1},deep:!0}},mounted:function(){this.$socket.emit("getTimer"),this.timerSetting.load=!0},beforeDestroy:function(){clearInterval(this.interval)},components:{Clock:e("VU/8")(s,n,!1,function(t){e("LMOa")},null,null).exports}},r={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"row align-items-center justify-content-around",staticStyle:{height:"150px"}},[t.display?s("h1",{staticClass:"col-12 col-lg-7 text-center",staticStyle:{width:"242px","font-size":"41px"}},[t._v(t._s(t.display))]):s("Clock",{staticClass:" col-12 col-lg-8 text-center",staticStyle:{"min-width":"242px"},attrs:{timerSetting:t.timerSetting}}),t._v(" "),t.hideLogo?t._e():s("img",{staticClass:"img-fluid col-0 col-lg-4",staticStyle:{width:"150px"},attrs:{src:e("q8ot")}})],1)},staticRenderFns:[]};var o=e("VU/8")(a,r,!1,function(t){e("GXHB")},null,null);i.a=o.exports},GXHB:function(t,i){},LMOa:function(t,i){},q8ot:function(t,i,e){t.exports=e.p+"static/img/1200px-University_of_Sunderland_logo.svg.fbbc0b8.png"}});
//# sourceMappingURL=0.f4a2c0b453e0dcb6941d.js.map