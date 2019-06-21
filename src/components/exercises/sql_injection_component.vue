<template>
  <div class="">
    <b-form v-if="!validate" @submit.prevent="connection" class="row">
      <label for="login">Login :</label>
      <b-input
        id="login"
        v-model="login"
        :disabled="timerSetting.isPaused">
      </b-input>
      <label for="password">Password :</label>
      <b-input
        id="password"
        v-model="password"
        type="password"
        :disabled="timerSetting.isPaused">
      </b-input>
      <b-button class="ml-auto mt-2" variant="primary" type="submit" :disabled="timerSetting.isPaused" style="width: 100px">Connect</b-button>
    </b-form>
    <b-alert
      v-if="msgConnection"
      :variant="variant"
      show
      v-html="msgConnection">
    </b-alert>
  </div>
</template>

<script>
export default {
  props: ['name', 'data', 'timerSetting'],
  data () {
    return {
      login: '',
      password: '',
      msgConnection: '',
      validate: false
    }
  },
  computed: {
    variant () {
      return this.validate ? 'success' : 'danger'
    }
  },
  methods: {
    connection () {
      this.$resource('sql_injection').get({ login: this.login, password: this.password }).then(
        (response) => {
          if (response.data.validate) {
            const msg = {
              answer: response.data.password,
              exercise: this.name
            }
            this.$socket.emit('exercise', msg)
          }
          this.msgConnection = response.data.msg
          this.validate = response.data.validate
        },
        (response) => {
          this.msgConnection = 'Could not join the server'
          this.validate = false
        }
      )
    }
  }
}
</script>

<style media="screen">

</style>
