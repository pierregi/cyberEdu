<template>
  <div class="">
    <h2 class="subtitle">{{ exercise.subtitle }}</h2>
    <div v-if="exercise !== ''">
      <p class="indent text-justify" v-html="exercise.description"></p>
      <component
        v-bind:is="exercise.exercise.component" v-bind:name="exercise.key" v-bind:data="exercise.exercise">
      </component>
    </div>
    <div v-else>
      <b-alert variant="info" show class="text-center">Loading exercise !</b-alert>
    </div>
    <b-alert v-if="server_response" :variant="variant" show>{{ server_response }}</b-alert>
  </div>
</template>
<script>
const cipher_component = () => import('@/components/exercises/cipher_component')
const sql_injection_component = () => import('@/components/exercises/sql_injection_component')
const xss_component = () => import('@/components/exercises/xss_component')

export default {
  props: ['name'],
  data () {
    return {
      server_response: '',
      exercise: '',
      error: '',
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
          this.error = ''
          this.variant = 'success'
        },
        (response) => {
          console.error('error', response)
          this.error = true
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
        console.error('error', response)
        this.error = true
      }
    )
  }
}
</script>
<style media="screen">

</style>
