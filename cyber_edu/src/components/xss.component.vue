<template>
  <div class="">

  </div>
</template>

<script>
// import Vue from 'vue';
// import Vigenerecipherlist from './vigenere_cipher_list';
// import Caesarcipherlist from './caesar_cipher_list';
export default {
  props: ['name'],
  data() {
    return {
      msgConnection: '',
      validate: false,
      responseServ: '',
    };
  },
  sockets: {
    exercise(data) {
      this.responseServ = data.msg;
    },
  },
  methods: {
    connection() {
      this.$resource('').get({ login: this.login, password: this.password }).then(
        (response) => {
          if (response.data.validate) {
            const msg = {
              answer: response.data.password,
              exercise: this.name,
            };
            this.$socket.emit('exercise', msg);
          }
          this.msgConnection = response.data.msg;
          this.validate = response.data.validate;
        },
        (response) => {
          console.error('error', response);
        },
      );
    },
  },
};
</script>

<style media="screen">

</style>
