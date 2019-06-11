<template>
  <div class="">
    <h2>Documentation</h2>
    <p class="indent">Javascript is the programming language that makes your web pages to be dynamic and animated.</p>
    <div class="my-4">
      <h3>Web page</h3>
      <p class="">
        First of all, a web page is composed of 3 different part :
        <ul>
          <li>HTML : this is the content</li>
          <li>CSS : this apply a style to the content, for exemple it can change the font color or the position in the page.</li>
          <li>Javascript: this make the page dynamic and annimated</li>
        </ul>
      </p>
    </div>
    <div class="my-4">
      <h4>HTML</h4>
      <p class="indent">An HTML file is composed of tag like <span class="text-danger">&lt;div&gt;</span> to open and <span class="text-danger">&lt;/div&gt;</span> to close the first one.</p>
      <h5>Example : </h5>
      <p class="indent">If we put the following lines in an HTML file and open it with a Web browser, it will open a page with in <span class="text-primary">Hello World</span> write as a title.<br/>
        <span class="text-danger ml-3">&lt;div&gt;</span><br/>
        <span class="text-danger ml-5">&lt;h1&gt;</span> Hello World <span class="text-danger">&lt;/h1&gt;</span><br/>
        <span class="text-danger ml-3">&lt;/div&gt;</span>
      </p>
      <div class="m-3 w-auto ">
        <p class="text-muted m-0 p-0" style="font-size: 18px">Preview :</p>
        <div class=" p-4 border bg-white border-secondary rounded">
          <h1>Hello World</h1>
        </div>
      </div>
    </div>
    <div class="my-4">
      <h4>Javascript</h4>
      <p class="indent">To use Javascript, you can put it in a <span class="text-danger">&lt;script&gt;</span> tag or load a .js file in your HTML file.</p>
      <h5>Example</h5>
      <div class="ml-3">
        <p class="">
          Click on the following buttons to see some annimations.
        </p>
        <b-button :variant="tableVariant[i%8]" @click="clickHandler1" style="width: 100px">Button 1</b-button>
        <b-button :variant="tableVariant[(i+1)%8]" @click="clickHandler2" style="width: 100px">Button 2</b-button>
        <b-button :variant="tableVariant[(i+2)%8]" @click="clickHandler3" style="width: 100px">Button 3</b-button>
        <b-button :variant="tableVariant[(i+3)%8]" @click="clickHandler4" style="width: 100px">Button 4</b-button>
        <b-button :variant="tableVariant[(i+4)%8]" @click="clickHandler5" style="width: 100px">Button 5</b-button>
        <div v-if="messageButton3" class="bg-white mt-3 text-primary" style="height: 60px" v-html="messageButton3">
        </div>
        <div v-if="button5" class="bg-white mt-3 p-3 rounded">
          <p class="m-0 p-0">Type a message that Js will get and write it on the page.</p>
          <b-form inline @submit.prevent="textValue = myInput" class="m-0 p-0">
            <b-input
              id="answer"
              class="my-2 col-12 col-lg-9 "
              v-model="myInput"
              placeholder="Message"
            ></b-input>
            <b-button class="ml-auto" type="submit" style="width: 100px">Send</b-button>
          </b-form>
          <p>{{textValue}}</p>
        </div>
      </div>
      <p v-if="myScript" class="m-3 p-4 w-auto border bg-white border-secondary rounded" v-html="myScript">
      </p>
    </div>
    <div class="mt-4 mb-5">
      <h3>XSS</h3>
      <p class="indent">An XSS use the fact that, sometimes, user entries are not treat and just add to the page.</p>
      <h4>Example</h4>
      <p class="indent">We are in a forum where users can send and receive messages.</p>
      <div class="m-3 w-auto p-4 border bg-white border-secondary rounded">
        <b-form inline @submit.prevent="newMessage" class="m-0 p-0">
          <b-input
            id="answer"
            class="my-2 col-12 col-lg-9 "
            v-model="message"
            placeholder="Message"
          ></b-input>
          <b-button class="ml-auto" type="submit" style="width: 100px">Send</b-button>
        </b-form>
        <div id="messagesDoc"></div>
      </div>
      <p class="indent">If we send <span class="text-primary">&lt;script&gt; alert( 'XSS' ); &lt;/script&gt;</span>, every body that open the page where this message has been sent will see an alert with XSS write in it.</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      myInterval: null,
      tableVariant: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      i: 0,
      myScript: '',
      myInput: '',
      textValue: '',
      button5: false,
      message: '',
      messageButton3: ''
    }
  },
  methods: {
    clickHandler1 () {
      this.button5 = false
      this.myScript = `
        <span class="text-danger">&lt;script&gt;</span><br/>
        <div class="ml-3 p-0">
          <span class="text-danger">function</span> <span class="text-primary">clickButton1</span> ( ) {<br/>
          <span class="text-primary ml-3">alert</span> (<span class="text-success">"This is an alert created with Js"</span>) ;<br/>
          <span>}</span>
        </div>
        <span class="text-danger">&lt;/script&gt;</span>
      `
      alert('This is an alert created with Js')
    },
    clickHandler2 () {
      this.button5 = false
      this.myScript = `
      <span class="text-danger">&lt;script&gt;</span><br/>
      <div class="ml-3 p-0">
        <span class="text-danger">function</span> <span class="text-primary">clickButton2</span> ( ) {
        <div class="ml-3 p-0">
          <span class="text-danger">var</span> tableColor <span class="text-primary">=</span> [ <span class="text-success">'blue'</span>, <span class="text-success">'grey'</span>, <span class="text-success">'green'</span>, <span class="text-success">'orange'</span>, <span class="text-success">'red'</span>, <span class="text-success">'cyan'</span>, <span class="text-success">'white'</span>, <span class="text-success">'black'</span> ] ;<br/>
          <span class="text-danger">var</span> i <span class="text-primary">=</span> <span class="text-warning">0</span> ;<br/>
          <span class="text-secondary">/* Create a function that will repeat every 200 ms. */</span><br/>
          <span class="text-danger">var</span> myInterval <span class="text-primary">=</span> <span class="text-primary">setInterval</span> ( ( ) <span class="text-primary">=&gt;</span> {<br/>
          <div class="ml-3 p-0">
            <span class="text-secondary">/* Js takes every buttons one by one by using the getElementById( [id] ) methods of document ( which is the top-level of the web page ) and apply a color from tableColor to their background */</span><br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button1'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ i <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button2'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">1</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button3'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">2</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button4'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">3</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button5'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ (i <span class="text-primary">+</span> <span class="text-warning">4</span>) <span class="text-primary">%</span> <span class="text-warning">8</span> ] ;<br/>
            i<span class="text-primary">++</span> ; <span class="text-secondary">// increment i by 1</span><br/>
          </div>
          }, <span class="text-warning">200</span>) ;<br/>
          <span class="text-secondary">/* After 3000 ms it will stop the previous function to be repeated and will reset the background color to the begining ones. */</span><br/>
          <span class="text-primary">setTimeout</span> ( ( ) <span class="text-primary">=&gt;</span> {<br/>
          <div class="ml-3 p-0">
            <span class=" text-primary">clearInterval</span> ( myInterval ) ; <br/>
            i <span class="text-primary">=</span> <span class="text-warning">0</span> ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button1'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">0</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button2'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">1</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button3'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">2</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button4'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">3</span> ] ;<br/>
            document.<span class="text-primary">getElementById</span> ( <span class="text-success">'button5'</span> ).style.backgroundColor <span class="text-primary">=</span> tableColor[ <span class="text-warning">4</span> ] ;<br/>
          </div>
          }, <span class="text-warning">3000</span>) ;<br/>
        </div>
        <span>}</span>
      </div>
      <span class="text-danger">&lt;/script&gt;</span>
      `
      this.myInterval = setInterval(() => {
        this.i++
      }, 250)
      setTimeout(() => {
        clearInterval(this.myInterval)
        this.i = 0
      }, 3000)
    },
    clickHandler3 () {
      this.button5 = false
      this.myScript = `
      <span class="text-danger">&lt;script&gt;</span><br/>
      <div class="ml-3 p-0">
        <span class="text-danger">function</span> <span class="text-primary">clickButton3</span> ( ) {
        <div class="ml-3 p-0">
          <span class="text-secondary">/* The following line create a virtual node (part of a web page) using the createElement() methods of document and put it in the variable myDiv */</span><br/>
          <span class="text-danger">var</span> myDiv <span class="text-primary">=</span> document.<span class="text-primary">createElement</span> (<span class="text-success">'div'</span>) ;<br/>
          <span class="text-secondary">/* The two following line set the background and font color. */</span><br/>
          myDiv.style.backgroundColor <span class="text-primary">=</span> <span class="text-success">'white'</span> ;<br/>
          myDiv.style.color <span class="text-primary">=</span> <span class="text-success">'blue'</span> ;<br/>
          <span class="text-secondary">/* Here, we apply an HTML code to the virtual node. */</span><br/>
          myDiv.innerHTML <span class="text-primary">=</span> <span class="text-success">'This html node have been created with Js.&lt;br/&gt;You can delete it by clicking on Button 4'</span> ;<br/>
          <span class="text-secondary">/* In the next line, Js gets the node with the id 'groupeButtons' and adds at the end of it the newly created node 'myDiv', using the appendChild() function. */</span><br/>
          document.<span class="text-primary">getElementById</span>( <span class="text-success">'groupeButtons'</span> ).<span class="text-primary">appendChild</span>( myDiv ) ;<br/>
        </div>
        <span>}</span>
      </div>
      <span class="text-danger">&lt;/script&gt;</span>
      `
      this.messageButton3 = 'This html node have been created with Js.<br/>You can delete it by clicking on Button 4'
    },
    clickHandler4 () {
      this.button5 = false
      this.myScript = `
      <span class="text-danger">&lt;script&gt;</span><br/>
      <div class="ml-3 p-0">
        <span class="text-danger">function</span> <span class="text-primary">clickButton4</span> ( ) {
        <div class="ml-3 p-0">
          <span class="text-secondary">/* Js retrieves the last Child node of groupButtons node ( using the lastChild() document's methods ) which is in our case the myDiv node previously created. */</span><br/>
          <span class="text-danger">var</span> myDiv <span class="text-primary">=</span> document.<span class="text-primary">getElementById</span> ( <span class="text-success">'groupButtons'</span> ).lastChild ;<br/>
          <span class="text-secondary">/*After, we remove it from groupButtons node using the removeChild() document's methods */</span><br/>
          document.<span class="text-primary">getElementById</span>( <span class="text-success">'groupButtons'</span> ).<span class="text-primary">removeChild</span>( myDiv ) ;<br/>
        </div>
        <span>}</span>
      </div>
      <span class="text-danger">&lt;/script&gt;</span>
      `
      this.messageButton3 = ''
    },
    clickHandler5 () {
      this.myScript = `
      <span class="text-danger">&lt;script&gt;</span><br/>
      <div class="ml-3 p-0">
        <span class="text-danger">function</span> <span class="text-primary">clickButtonSend</span> ( ) {
        <div class="ml-3 p-0">
          <span class="text-secondary">/* The following line create retrieves the Message value's and put it in the variable inputValue */</span><br/>
          <span class="text-danger">var</span> inputValue <span class="text-primary">=</span> document.<span class="text-primary">getElementById</span> ( <span class="text-success">'myInput'</span> ).value ;<br/>
          <span class="text-secondary">/* After, Js create a paragraph node (by using the tag "p" instead of "div" tag in the createElement document's methods) and put it in myDisplay variable.*/</span><br/>
          <span class="text-danger">var</span> myDisplay <span class="text-primary">=</span> document.<span class="text-primary">createElement</span> ( <span class="text-success">'p'</span> ) ;<br/>
          <span class="text-secondary">/* We apply the inputValue to our paragraph myDisplay.*/</span><br/>
          myDisplay.innerHTML <span class="text-primary">=</span> inputValue ; <br/>
          <span class="text-secondary">/* To finish, we reset the myInput value to an empty string.*/</span><br/>
          document.<span class="text-primary">getElementById</span> ( <span class="text-success">'myInput'</span> ).value = <span class="text-success">''</span> ;
        </div>
        <span>}</span>
      </div>
      <span class="text-danger">&lt;/script&gt;</span>
      `
      this.button5 = true
      this.myInput = ''
      this.textValue = ''
    },
    newMessage () {
      var p = document.createElement('p')
      p.innerHTML = this.message
      p.className = 'm-0 p-0 text-break'
      var messages = document.getElementById('messagesDoc')
      messages.appendChild(p)
      var tab = Array.from(p.childNodes)
      // console.log(tab)

      var scriptNode = tab.filter((node) => {
        return node.nodeName.toLowerCase() === 'script'
      })
      scriptNode.forEach((myScript) => {
        if (typeof scriptNode !== 'undefined') {
          let script = document.createElement('script')
          script.innerHTML = myScript.innerHTML
          document.getElementById('messagesDoc').appendChild(script)
        }
      })
      this.message = ''
    }
  }
}
</script>
<style media="screen">

</style>
