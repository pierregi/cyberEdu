<template>
  <div>
    <p><font-awesome-icon :icon="['far', 'lightbulb']"/> Special characters, spaces or punctuation will not be  considered in the correction.</p>
    <b-row>
      <b-col class="p-2 bg-white m-0 border border-secondary rounded" cols="12" xl="6" tag="p" v-html="data.text"></b-col>
      <b-form-textarea
        id="myMessage"
        placeholder="Type your anwser here"
        v-model="answer"
        class="col-12 col-xl-6 py-2 border border-secondary rounded"
        style="font-size: 18px"
        :disabled="timerSetting.isPaused"
      ></b-form-textarea>
      <b-button class="ml-auto my-3" variant="primary" type="submit" name="submit" style="width: 100px" @click="sendAnswer" :disabled="timerSetting.isPaused">Send</b-button>
    </b-row>
  </div>
</template>
<script type='text/javascript'>

export default {
  props: ['name', 'data', 'timerSetting'],
  data () {
    return {
      answer: ''
    }
  },
  methods: {
    sendAnswer () {
      // $socket is socket.io-client instance
      const msg = {
        answer: this.answer,
        exercise: this.name
      }
      this.$socket.emit('exercise', msg)
    }
  },
  watch: {
    $route (to, from) {
      this.answer = ''
    }
  }
}
</script>

<style>
#textareaCipher {
  resize: none;
}
</style>
