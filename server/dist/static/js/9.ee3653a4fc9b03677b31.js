webpackJsonp([9],{ESIZ:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("c/Tr"),e=a.n(n),r={data:function(){return{myInterval:null,tableVariant:["primary","secondary","success","warning","danger","info","light","dark"],i:0,myScript:"",myInput:"",textValue:"",button5:!1,message:"",messageButton3:""}},methods:{clickHandler1:function(){this.button5=!1,this.myScript='\n        <span class="text-danger">&lt;script&gt;</span><br/>\n        <div class="ml-3 p-0">\n          <span class="text-danger">function</span> <span class="text-primary">clickButton1</span> ( ) {<br/>\n          <span class="text-primary ml-3">alert</span> (<span class="text-success">"This is an alert created with Js"</span>) ;<br/>\n          <span>}</span>\n        </div>\n        <span class="text-danger">&lt;/script&gt;</span>\n      ',alert("This is an alert created with Js")},clickHandler2:function(){var s=this;this.button5=!1,this.myScript='\n      <span class="text-danger">&lt;script&gt;</span><br/>\n      <div class="ml-3 p-0">\n        <span class="text-danger">function</span> <span class="text-primary">clickButton2</span> ( ) {\n        <div class="ml-3 p-0">\n          <span class="text-danger">var</span> tableColor <span class="text-primary">=</span> [ <span class="text-success">\'blue\'</span>, <span class="text-success">\'grey\'</span>, <span class="text-success">\'green\'</span>, <span class="text-success">\'orange\'</span>, <span class="text-success">\'red\'</span>, <span class="text-success">\'cyan\'</span>, <span class="text-success">\'white\'</span>, <span class="text-success">\'black\'</span> ] ;<br/>\n          <span class="text-danger">var</span> i <span class="text-primary">=</span> <span class="text-warning">0</span> ;<br/>\n          <span class="text-secondary">/* Create a function that will repeat every 200 ms. */</span><br/>\n          <span class="text-danger">var</span> myInterval <span class="text-primary">=</span> <span class="text-primary">setInterval</span> ( ( ) <span class="text-primary">=&gt;</span> {<br/>\n          <div class="ml-3 p-0">\n            <span class="text-secondary">/* Js takes every buttons one by one by using the getElementById( [id] ) methods of document ( which is the top-level of the web page ) and apply a color from tableColor to their background */</span><br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button1\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ i <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button2\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">1</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button3\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">2</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button4\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">3</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button5\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">4</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>\n            i<span class="text-primary">++</span> ; <span class="text-secondary">// increment i by 1</span><br/>\n          </div>\n          }, <span class="text-warning">200</span>) ;<br/>\n          <span class="text-secondary">/* After 3000 ms it will stop the previous function to be repeated and will reset the background color to the begining ones. */</span><br/>\n          <span class="text-primary">setTimeout</span> ( ( ) <span class="text-primary">=&gt;</span> {<br/>\n          <div class="ml-3 p-0">\n            <span class=" text-primary">clearInterval</span> ( myInterval ) ; <br/>\n            i <span class="text-primary">=</span> <span class="text-warning">0</span> ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button1\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">0</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button2\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">1</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button3\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">2</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button4\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">3</span> ] ;<br/>\n            document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'button5\'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">4</span> ] ;<br/>\n          </div>\n          }, <span class="text-warning">3000</span>) ;<br/>\n        </div>\n        <span>}</span>\n      </div>\n      <span class="text-danger">&lt;/script&gt;</span>\n      ',this.myInterval=setInterval(function(){s.i++},250),setTimeout(function(){clearInterval(s.myInterval),s.i=0},3e3)},clickHandler3:function(){this.button5=!1,this.myScript='\n      <span class="text-danger">&lt;script&gt;</span><br/>\n      <div class="ml-3 p-0">\n        <span class="text-danger">function</span> <span class="text-primary">clickButton3</span> ( ) {\n        <div class="ml-3 p-0">\n          <span class="text-secondary">/* The following line create a virtual node (part of a web page) using the createElement() methods of document and put it in the variable myDiv */</span><br/>\n          <span class="text-danger">var</span> myDiv <span class="text-primary">=</span> document.<span class="text-primary">createElement</span> (<span class="text-success">\'div\'</span>) ;<br/>\n          <span class="text-secondary">/* The two following line set the background and font color. */</span><br/>\n          myDiv.style.backgroundColor <span class="text-primary">=</span> <span class="text-success">\'white\'</span> ;<br/>\n          myDiv.style.color <span class="text-primary">=</span> <span class="text-success">\'blue\'</span> ;<br/>\n          <span class="text-secondary">/* Here, we apply an HTML code to the virtual node. */</span><br/>\n          myDiv.innerHTML <span class="text-primary">=</span> <span class="text-success">\'This html node have been created with Js.&lt;br/&gt;You can delete it by clicking on Button 4\'</span> ;<br/>\n          <span class="text-secondary">/* In the next line, Js gets the node with the id \'groupeButtons\' and adds at the end of it the newly created node \'myDiv\', using the appendChild() function. */</span><br/>\n          document.<span class="text-primary">getElementById</span>( <span class="text-success">\'groupeButtons\'</span> ).<span class="text-primary">appendChild</span>( myDiv ) ;<br/>\n        </div>\n        <span>}</span>\n      </div>\n      <span class="text-danger">&lt;/script&gt;</span>\n      ',this.messageButton3="This html node have been created with Js.<br/>You can delete it by clicking on Button 4"},clickHandler4:function(){this.button5=!1,this.myScript='\n      <span class="text-danger">&lt;script&gt;</span><br/>\n      <div class="ml-3 p-0">\n        <span class="text-danger">function</span> <span class="text-primary">clickButton4</span> ( ) {\n        <div class="ml-3 p-0">\n          <span class="text-secondary">/* Js retrieves the last Child node of groupButtons node ( using the lastChild() document\'s methods ) which is in our case the myDiv node previously created. */</span><br/>\n          <span class="text-danger">var</span> myDiv <span class="text-primary">=</span> document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'groupButtons\'</span> ).lastChild ;<br/>\n          <span class="text-secondary">/*After, we remove it from groupButtons node using the removeChild() document\'s methods */</span><br/>\n          document.<span class="text-primary">getElementById</span>( <span class="text-success">\'groupButtons\'</span> ).<span class="text-primary">removeChild</span>( myDiv ) ;<br/>\n        </div>\n        <span>}</span>\n      </div>\n      <span class="text-danger">&lt;/script&gt;</span>\n      ',this.messageButton3=""},clickHandler5:function(){this.myScript='\n      <span class="text-danger">&lt;script&gt;</span><br/>\n      <div class="ml-3 p-0">\n        <span class="text-danger">function</span> <span class="text-primary">clickButtonSend</span> ( ) {\n        <div class="ml-3 p-0">\n          <span class="text-secondary">/* The following line create retrieves the Message value\'s and put it in the variable inputValue */</span><br/>\n          <span class="text-danger">var</span> inputValue <span class="text-primary">=</span> document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'myInput\'</span> ).value ;<br/>\n          <span class="text-secondary">/* After, Js create a paragraph node (by using the tag "p" instead of "div" tag in the createElement document\'s methods) and put it in myDisplay variable.*/</span><br/>\n          <span class="text-danger">var</span> myDisplay <span class="text-primary">=</span> document.<span class="text-primary">createElement</span> ( <span class="text-success">\'p\'</span> ) ;<br/>\n          <span class="text-secondary">/* We apply the inputValue to our paragraph myDisplay.*/</span><br/>\n          myDisplay.innerHTML <span class="text-primary">=</span> inputValue ; <br/>\n          <span class="text-secondary">/* To finish, we reset the myInput value to an empty string.*/</span><br/>\n          document.<span class="text-primary">getElementById</span> ( <span class="text-success">\'myInput\'</span> ).value = <span class="text-success">\'\'</span> ;\n        </div>\n        <span>}</span>\n      </div>\n      <span class="text-danger">&lt;/script&gt;</span>\n      ',this.button5=!0,this.myInput="",this.textValue=""},newMessage:function(){var s=document.createElement("p");s.innerHTML=this.message,s.className="m-0 p-0 text-break",document.getElementById("messagesDoc").appendChild(s);var t=e()(s.childNodes).filter(function(s){return"script"===s.nodeName.toLowerCase()});t.forEach(function(s){if(void 0!==t){var a=document.createElement("script");a.innerHTML=s.innerHTML,document.getElementById("messagesDoc").appendChild(a)}}),this.message=""}}},p={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{},[a("h2",{staticClass:"text-danger"},[s._v("Documentation")]),s._v(" "),a("p",{staticClass:"indent"},[s._v("Javascript is the programming language that makes your web pages to be dynamic and animated.")]),s._v(" "),s._m(0),s._v(" "),s._m(1),s._v(" "),a("div",{staticClass:"my-4"},[a("h4",{staticClass:"text-danger"},[s._v("Javascript")]),s._v(" "),s._m(2),s._v(" "),a("h5",{staticClass:"text-info"},[s._v("Example :")]),s._v(" "),a("div",{staticClass:"ml-3"},[a("p",{},[s._v("\n        Click on the following buttons to see some annimations.\n      ")]),s._v(" "),a("b-button",{staticStyle:{width:"100px"},attrs:{variant:s.tableVariant[s.i%8]},on:{click:s.clickHandler1}},[s._v("Button 1")]),s._v(" "),a("b-button",{staticStyle:{width:"100px"},attrs:{variant:s.tableVariant[(s.i+1)%8]},on:{click:s.clickHandler2}},[s._v("Button 2")]),s._v(" "),a("b-button",{staticStyle:{width:"100px"},attrs:{variant:s.tableVariant[(s.i+2)%8]},on:{click:s.clickHandler3}},[s._v("Button 3")]),s._v(" "),a("b-button",{staticStyle:{width:"100px"},attrs:{variant:s.tableVariant[(s.i+3)%8]},on:{click:s.clickHandler4}},[s._v("Button 4")]),s._v(" "),a("b-button",{staticStyle:{width:"100px"},attrs:{variant:s.tableVariant[(s.i+4)%8]},on:{click:s.clickHandler5}},[s._v("Button 5")]),s._v(" "),s.messageButton3?a("div",{staticClass:"bg-white mt-3 text-primary",staticStyle:{height:"60px"},domProps:{innerHTML:s._s(s.messageButton3)}}):s._e(),s._v(" "),s.button5?a("div",{staticClass:"bg-white mt-3 p-3 rounded"},[a("p",{staticClass:"m-0 p-0"},[s._v("Type a message that Js will get and write it on the page.")]),s._v(" "),a("b-form",{staticClass:"m-0 p-0",attrs:{inline:""},on:{submit:function(t){t.preventDefault(),s.textValue=s.myInput}}},[a("b-input",{staticClass:"my-2 col-12 col-lg-9 ",attrs:{id:"answer",placeholder:"Message"},model:{value:s.myInput,callback:function(t){s.myInput=t},expression:"myInput"}}),s._v(" "),a("b-button",{staticClass:"ml-auto",staticStyle:{width:"100px"},attrs:{type:"submit"}},[s._v("Send")])],1),s._v(" "),a("p",[s._v(s._s(s.textValue))])],1):s._e()],1),s._v(" "),s.myScript?a("p",{staticClass:"m-3 p-4 w-auto border bg-white border-secondary rounded",domProps:{innerHTML:s._s(s.myScript)}}):s._e()]),s._v(" "),a("div",{staticClass:"mt-4 mb-5"},[a("h3",{staticClass:"text-danger"},[s._v("XSS")]),s._v(" "),a("p",{staticClass:"indent"},[s._v("An XSS use the fact that, sometimes, user entries are not treat and just add to the page.")]),s._v(" "),a("h4",{staticClass:"text-info"},[s._v("Example :")]),s._v(" "),a("p",{staticClass:"indent"},[s._v("We are in a forum where users can send and receive messages.")]),s._v(" "),a("div",{staticClass:"m-3 w-auto p-4 border bg-white border-secondary rounded"},[a("b-form",{staticClass:"m-0 p-0",attrs:{inline:""},on:{submit:function(t){return t.preventDefault(),s.newMessage(t)}}},[a("b-input",{staticClass:"my-2 col-12 col-lg-9 ",attrs:{id:"answer",placeholder:"Message"},model:{value:s.message,callback:function(t){s.message=t},expression:"message"}}),s._v(" "),a("b-button",{staticClass:"ml-auto",staticStyle:{width:"100px"},attrs:{type:"submit"}},[s._v("Send")])],1),s._v(" "),a("div",{attrs:{id:"messagesDoc"}})],1),s._v(" "),s._m(3)])])},staticRenderFns:[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"my-4"},[a("h3",{staticClass:"text-danger"},[s._v("Web page")]),s._v(" "),a("p",{},[s._v("\n      First of all, a web page is composed of 3 different part :\n      "),a("ul",[a("li",[s._v("HTML : this is the content")]),s._v(" "),a("li",[s._v("CSS : this apply a style to the content, for exemple it can change the font color or the position in the page.")]),s._v(" "),a("li",[s._v("Javascript: this make the page dynamic and annimated")])])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"my-4"},[a("h4",{staticClass:"text-danger"},[s._v("HTML")]),s._v(" "),a("p",{staticClass:"indent"},[s._v("An HTML file is composed of tag like "),a("span",{staticClass:"text-danger"},[s._v("<div>")]),s._v(" to open and "),a("span",{staticClass:"text-danger"},[s._v("</div>")]),s._v(" to close the first one.")]),s._v(" "),a("h5",{staticClass:"text-info"},[s._v("Example : ")]),s._v(" "),a("p",{staticClass:"indent"},[s._v("If we put the following lines in an HTML file and open it with a Web browser, it will open a page with in "),a("span",{staticClass:"text-primary"},[s._v("Hello World")]),s._v(" write as a title."),a("br"),s._v(" "),a("span",{staticClass:"text-danger ml-3"},[s._v("<div>")]),a("br"),s._v(" "),a("span",{staticClass:"text-danger ml-5"},[s._v("<h1>")]),s._v(" Hello World "),a("span",{staticClass:"text-danger"},[s._v("</h1>")]),a("br"),s._v(" "),a("span",{staticClass:"text-danger ml-3"},[s._v("</div>")])]),s._v(" "),a("div",{staticClass:"m-3 w-auto "},[a("p",{staticClass:"text-muted m-0 p-0",staticStyle:{"font-size":"18px"}},[s._v("Preview :")]),s._v(" "),a("div",{staticClass:" p-4 border bg-white border-secondary rounded"},[a("h1",[s._v("Hello World")])])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",{staticClass:"indent"},[this._v("To use Javascript, you can put it in a "),t("span",{staticClass:"text-danger"},[this._v("<script>")]),this._v(" tag or load a .js file in your HTML file.")])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",{staticClass:"indent"},[this._v("If we send "),t("span",{staticClass:"text-primary"},[this._v("<script> alert( 'XSS' ); <\/script>")]),this._v(", every body that open the page where this message has been sent will see an alert with XSS write in it.")])}]};var i=a("VU/8")(r,p,!1,function(s){a("Yl4z")},null,null);t.default=i.exports},Yl4z:function(s,t){},"c/Tr":function(s,t,a){s.exports={default:a("5zde"),__esModule:!0}}});
//# sourceMappingURL=9.ee3653a4fc9b03677b31.js.map