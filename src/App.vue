<template>
  <b-container fluid class="h-100 p-0 bg-light">
    <router-view v-bind:myTimer="myTimer" class="h-100"></router-view>
  </b-container>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      myTimer: {
        countDownDate: null,
        datePause: null,
        isStarted: false,
        isPaused: false,
        isStop: false,
        load: false
      }
    }
  },
  sockets: {
    wrongId () {
      this.$router.push({name: 'Name'})
      this.$cookie.delete('id')
    },
    chooseNameSuccess (team) {
      this.$store.dispatch('doneExercise', team.exercise)
      this.$cookie.set('id', team.id)
      this.$router.push('main')
    },
    start (date) {
      this.myTimer.countDownDate = date
      this.myTimer.datePause = null
      this.myTimer.isStarted = true
      this.myTimer.isPaused = false
      this.myTimer.isStop = false
      this.myTimer.load = false
    },
    play (date) {
      this.myTimer.countDownDate = date
      this.myTimer.datePause = null
      this.myTimer.isPaused = false
      this.myTimer.load = false
    },
    pause (date) {
      this.myTimer.datePause = date
      // this.myTimer.countDownDate = null
      this.myTimer.isPaused = true
      this.myTimer.load = false
    },
    stop () {
      this.myTimer.isStarted = false
      this.myTimer.isPaused = false
      this.myTimer.isStop = true
      this.myTimer.countDownDate = null
      this.myTimer.datePause = null
      if (this.$route.name !== 'Admin') {
        this.$router.push({name: 'finish'})
      }
      this.myTimer.load = false
    },
    change  (date) {
      this.myTimer.countDownDate = date
      this.myTimer.load = false
    },
    restart () {
      this.myTimer.isStop = false
      this.myTimer.isStarted = false
      this.myTimer.isPaused = false
      this.myTimer.countDownDate = null
      this.myTimer.datePause = null
      if (this.$route.name !== 'Admin') {
        this.$router.push({name: 'Name'})
      }
      this.$cookie.delete('id')
      this.myTimer.load = false
    },
    notStart () {
      this.myTimer.isStop = false
      this.myTimer.isStarted = false
      this.myTimer.isPaused = false
      this.myTimer.load = false
      // this.myTimer.countDownDate = null
    }
  }
}
</script>
<style>
html,body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
}

.indent {
  text-indent: 2em;
}
</style>
