<template>
  <div>
    <p v-html="data.text">*</p>
    <form @submit.prevent="sendAnswer">
      <textarea  v-model="answer"></textarea>
      <button type="submit">Send</button>
    </form>
    <p v-bind:class="{'wrong': isWrong, 'validate': !isWrong}">{{ server_response }}</p>
  </div>
</template>
<script type='text/javascript'>

export default {
  props: ['name', 'data'],
  data() {
    return {
      answer: '',
      isWrong: false,
      server_response: '',
    };
  },
  sockets: {
    exercise(data) {
      this.server_response = data.msg;
      this.isWrong = data.class;
    },
  },
  methods: {
    sendAnswer() {
      // $socket is socket.io-client instance
      const msg = {
        answer: this.answer,
        exercise: this.name,
      };
      this.$socket.emit('exercise', msg);
    },
  },
};
</script>

<style>

</style>
