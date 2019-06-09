<template>
  <div>
    <b-nav-item
    v-for="subTheme in subThemes"
    v-bind:key="subTheme.key"
    @click="selectSubTheme(subTheme.key)"
    class="w-100 m-0 p-0 h-auto"
    v-bind:active="subTheme.key === $route.name"
    v-bind:link-classes="{'text-success': alreadyDone.indexOf(subTheme.key) !== -1, 'text-dark': select && alreadyDone.indexOf(subTheme.key) === -1 , 'bg-secondary': subTheme.key === $route.name, 'text-white w-100 h-auto m-0 px-4 p-0 d-flex justify-content-between': true}"
    >
      <div class="m-0 p-0">{{ subTheme.subtitle }}</div>
      <div class="m-0 p-0">{{ subTheme.point }}</div>
    </b-nav-item>
  </div>
</template>
<script type='text/javascript'>
import Vuex from 'vuex'

export default {
  props: ['theme', 'myTimer', 'select'],
  data () {
    return {
      subThemes: [],
      error: false
    }
  },
  watch: {
    $route (to, from) {
      this.$resource('subThemes').get({ refer: this.theme }).then(
        (response) => { this.subThemes = response.data },
        (response) => {
          console.error('error', response)
          this.error = true
        }
      )
    }
  },
  computed: {
    ...Vuex.mapGetters({
      alreadyDone: 'getAlreadyDone'
    })
  },
  methods: {
    selectSubTheme (subTheme) {
      if (this.myTimer.isStarted && !this.myTimer.isPaused) {
        this.$router.push({name: subTheme})
      } else {
        this.$router.push({name: this.theme})
      }
    }
  },
  mounted () {
    this.$resource('subThemes').get({ refer: this.theme }).then(
      (response) => { this.subThemes = response.data },
      (response) => {
        console.error('error', response)
        this.error = true
      }
    )
    // this.$socket.emit('getTimer')
  }
}
</script>

<style>
.point {
  display: inline;
  text-align: right;
  right: 20px;
}
.done {
  background-color: #ddd;
}
</style>
