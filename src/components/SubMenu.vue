<template>
  <div>
    <b-nav-item
    v-if="!error"
    v-for="subTheme in subThemes"
    v-bind:key="subTheme.key"
    @click="selectSubTheme(subTheme.key)"
    class="w-100 m-0 p-0 h-auto"
    v-bind:active="subTheme.key === $route.name"
    v-bind:link-classes="{'text-success': alreadyDone.indexOf(subTheme.key) !== -1, 'text-dark': select && alreadyDone.indexOf(subTheme.key) === -1 , 'bg-secondary text-warning': subTheme.key === $route.name, 'text-white w-100 h-auto m-0 px-4 p-0 d-flex justify-content-between': true}"
    :disabled="timerSetting.isPaused || !timerSetting.isStarted"
    >
      <p class="m-0 p-0">{{ subTheme.title }}</p>
      <p class="m-0 p-0">{{ subTheme.point }}</p>
    </b-nav-item>
    <b-alert v-else variant="danger" class="m-3 mw-100 text-center text-break show">Could not load the menu from the server</b-alert>
  </div>
</template>
<script type='text/javascript'>
import Vuex from 'vuex'

export default {
  props: ['theme', 'timerSetting', 'select'],
  data () {
    return {
      subThemes: [],
      error: false
    }
  },
  watch: {
    $route (to, from) {
      this.$resource('subThemes').get({ refer: this.theme }).then(
        (response) => {
          this.subThemes = response.data
          this.error = false
        },
        (response) => {
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
      if (this.timerSetting.isStarted && !this.timerSetting.isPaused) {
        this.$router.push({name: subTheme})
      } else {
        this.$router.push({name: this.theme})
      }
    }
  },
  mounted () {
    this.$resource('subThemes').get({ refer: this.theme }).then(
      (response) => {
        this.subThemes = response.data
        this.error = false
      },
      (response) => {
        this.error = true
      }
    )
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
