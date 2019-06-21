<template>
  <div class="">
    <div v-if="timerSetting.isPaused" class="w-100 position-absolute d-flex align-items-center justify-content-center bg-dark" style="height: 100vh; z-index: 1000; opacity: 0.99; top: 0; left: 0">
      <h1 class="text-danger" style="opacity: 1 ">The game has been paused by the admin</h1>
    </div>
    <div class="w-100 p-0 m-0">
      <h2 class="title">{{ exercise.title }}</h2>
      <div v-if="exercise !== ''">
        <p class="indent text-justify" v-html="exercise.description"></p>
        <component
          v-bind:is="exercise.exercise.component" v-bind:name="exercise.key" v-bind:data="exercise.exercise" v-bind:timerSetting="timerSetting">
        </component>
      </div>
      <b-alert v-else variant="warning" show class="text-center w-100">Loading exercise !</b-alert>
    </div>
    <b-alert v-if="server_response" :variant="variant" show>{{ server_response }}</b-alert>
  </div>
</template>
<script>
const cipher_component = () => import('@/components/exercises/cipher_component')
const sql_injection_component = () => import('@/components/exercises/sql_injection_component')
const xss_component = () => import('@/components/exercises/xss_component')

export default {
  props: ['name', 'timerSetting'],
  data () {
    return {
      server_response: '',
      exercise: '',
      variant: 'success'
    }
  },
  components: {
    cipher_component,
    sql_injection_component,
    xss_component
  },
  sockets: {
    exercise (data) {
      this.server_response = data.msg
      this.variant = data.variant
      if (data.validate) this.$store.dispatch('addDoneExercise', this.name)
    }
  },
  watch: {
    $route (to, from) {
      this.$resource('exercise').get({ key: this.name }).then(
        (response) => {
          this.exercise = response.data
          this.server_response = ''
          this.variant = 'success'
        },
        (response) => {
          this.variant = 'danger'
          this.server_response = 'Could not load exercise from the server'
        }
      )
    }
  },
  mounted () {
    this.$resource('exercise').get({ key: this.name }).then(
      (response) => {
        this.exercise = response.data
      },
      (response) => {
        this.variant = 'danger'
        this.server_response = 'Could not load exercise from the server'
      }
    )
  }
}
</script>
<style media="screen">

</style>
