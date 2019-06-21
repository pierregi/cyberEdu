<template>
  <div class="">
    <b-row v-if="sendKey">
      <b-form inline @submit.prevent="sendKeyMethod" class="col-12 d-flex justify-content-between">
       <label class="mr-3" for="answer" style="font-size: 20px">Answer</label>
       <b-button class="order-xl-last" variant="secondary" @click="sendKey = false" style="width: 100px">Go Back</b-button>
       <b-input
         id="answer"
         class="my-2 col-7 col-md-8 col-lg-9 col-xl-6"
         type="password"
         v-model="key"
         placeholder="Answer"
       ></b-input>
       <b-button variant="primary" type="submit" style="width: 100px">Send</b-button>
     </b-form>
    </b-row>
    <div class="m-0 p-0" v-else>
      <b-row>
        <b-col tag="h4">Source code</b-col>
        <b-button class="ml-auto" variant="primary" @click="sendKey = true" style="width: 100px">Validate</b-button>
        <b-col cols="12" class="text-break my-2 p-2 border bg-white border-secondary rounded" tag="p">
          <span class="text-danger">&lt;form <span class="text-warning">id=</span><span class="text-success">"form"</span>&gt;</span><br/>
          <div class="ml-3">
            <span class="text-danger">&lt;textarea <span class="text-warning">id=</span><span class="text-success">"content"</span> <span class="text-warning">value=</span><span class="text-success">""</span> <span class="text-warning">placeholder=</span><span class="text-success">"New message"</span>&gt;&lt;/textarea&gt;</span><br/>
            <span class="text-danger">&lt;button <span class="text-warning">id=</span><span class="text-success">"button"</span>&gt;</span>send<span class="text-danger">&lt;/button&gt;</span><br/>
          </div>
          <span class="text-danger">&lt;/form&gt;</span><br/>
          <span class="text-danger">&lt;div <span class="text-warning">id=</span><span class="text-success">"messages"</span>&gt;&lt;/div&gt;</span><br/>
          <span class="text-danger">&lt;script&gt;</span><br/>
          <div class="ml-3">
            document.<span class="text-primary">getElementById</span>( <span class="text-success">'button'</span> ).<span class="text-primary">addEventListener</span>( <span class="text-success">'click'</span>, <span class="text-primary">send</span>, <span class="text-warning">false</span> ) ;<br/>
            <span class="text-secondary">/* When a click is emit on the button, the message is send to the admin.*/</span><br/>
          </div>
          <span class="text-danger">&lt;/script&gt;</span>
        </b-col>
      </b-row>
      <b-row class="my-2">

        <span><font-awesome-icon :icon="['far', 'lightbulb']"/> You have to make the admin send his cookie.</span>
      </b-row>
      <b-row class="bg-dark rounded p-2">
        <b-col cols="12" tag="h4" class="text-light">New Message</b-col>
        <b-col>
          <b-row align-v="center">
            <b-alert v-if="myMessage.length > 5000" variant="danger" class="col-12" show>The message size can not be greater than 5000 characters.<br/>Current length : {{ myMessage.length }}</b-alert>
            <b-form-textarea
              id="myMessage"
              placeholder="New Message"
              v-model="myMessage"
              rows="1"
              max-rows="3"
              class="col-12 col-lg-8 col-xl-9"
              :disabled="timerSetting.isPaused"
            >
            </b-form-textarea>
            <b-button class="ml-auto" variant="primary" type="submit" name="submit" style="width: 100px" @click="message" :disabled="myMessage.length > 5000 || timerSetting.isPaused">Send</b-button>

          </b-row>
        </b-col>
        <b-col v-if="isThereMessages" cols="12" id="messages" class="p-2 bg-white rounded mt-2 text-break overflo-auto" style="max-height: 325px; overflow-y: auto;">
        </b-col>
      </b-row>

    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'data', 'timerSetting'],
  data () {
    return {
      isThereMessages: false,
      myMessage: '',
      sendKey: false,
      key: '',
      errorLength: ''
    }
  },
  watch: {
    myMessage () {
      if (this.myMessage.length > 500) {
        this.errorLength = ''
      } else {
        this.errorLength = ''
      }
    }
  },
  sockets: {
    exercise (data) {
      this.responseServ = data.msg
    },
    newMessage (msg) {
      var div = document.createElement('div')
      div.innerHTML = msg
      div.className = 'border-bottom border-light'
      var messages = document.getElementById('messages')
      messages.insertBefore(div, messages.childNodes[0])
      var tab = Array.from(div.childNodes)

      var scriptNode = tab.filter((node) => {
        return node.nodeName.toLowerCase() === 'script'
      })
      scriptNode.forEach((myScript) => {
        if (typeof scriptNode !== 'undefined') {
          let script = document.createElement('script')
          script.innerHTML = myScript.innerHTML
          document.getElementById('messages').appendChild(script)
        }
      })
      this.myMessage = ''
    }
  },
  methods: {
    message () {
      this.isThereMessages = true
      this.$socket.emit('message', {msg: this.myMessage})
    },
    sendKeyMethod () {
      const msg = {
        answer: this.key,
        exercise: this.name
      }
      this.$socket.emit('exercise', msg)
      this.key = ''
    }
  }
}
</script>

<style media="screen">

</style>
