<template>
  <div class="">
    <form v-if="!validate" @submit.prevent="connection">
      <label for="login">Login</label>
      <input type="text" v-model="login" name="login" value="">
      <label for="password">Password</label>
      <input type="password" v-model="password" name="password" value="">
      <button type="submit">Connect</button>
      <p class="wrong">{{msgConnection}}</p>
    </form>
    <div v-else>
      <p class="validate">{{msgConnection}}</p>
      <p class="validate">{{responseServ}}</p>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Vigenerecipherlist from './vigenere_cipher_list';
// import Caesarcipherlist from './caesar_cipher_list';
export default {
  props: ['name', 'data'],
  data() {
    return {
      login: '',
      password: '',
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
      this.$resource('sql_injection').get({ login: this.login, password: this.password }).then(
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
