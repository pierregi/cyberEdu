<template>
  <b-container fluid class="h-100 p-0 bg-light">
    <router-view v-bind:timerSetting="timerSetting" class="h-100"></router-view>
    <b-modal
      title="Error message"
      id="modal-teamNotExist"
      ok-only
      >
      <span>Your team do not exist or have been delete.</span>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      timerSetting: {
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
    wrongId (msg) {
      this.$store.dispatch('setDoneExercise', [])
      this.$router.push({name: 'Home'})
      this.$cookie.delete('id')
      this.$bvModal.show('modal-teamNotExist')
    },
    goodId (doneExercises) {
      this.$store.dispatch('setDoneExercise', doneExercises)
    },
    chooseNameSuccess (team) {
      this.$store.dispatch('setDoneExercise', team.exercise)
      this.$cookie.set('id', team.id)
      this.$router.push('game')
    },
    start (date) {
      this.timerSetting.countDownDate = date
      this.timerSetting.datePause = null
      this.timerSetting.isStarted = true
      this.timerSetting.isPaused = false
      this.timerSetting.isStop = false
      this.timerSetting.load = false
    },
    play (date) {
      this.timerSetting.countDownDate = date
      this.timerSetting.datePause = null
      this.timerSetting.isPaused = false
      this.timerSetting.load = false
    },
    pause (date) {
      this.timerSetting.datePause = date
      this.timerSetting.isPaused = true
      this.timerSetting.load = false
    },
    stop () {
      this.timerSetting.isStarted = false
      this.timerSetting.isPaused = false
      this.timerSetting.isStop = true
      this.timerSetting.countDownDate = null
      this.timerSetting.datePause = null
      if (this.$route.name !== 'Admin') {
        this.$router.push({name: 'finish'})
      }
      this.timerSetting.load = false
    },
    change  (date) {
      this.timerSetting.countDownDate = date
      this.timerSetting.load = false
    },
    restart () {
      this.timerSetting.isStop = false
      this.timerSetting.isStarted = false
      this.timerSetting.isPaused = false
      this.timerSetting.countDownDate = null
      this.timerSetting.datePause = null
      if (this.$route.name !== 'Admin') {
        this.$router.push({name: 'Home'})
      }
      this.$cookie.delete('id')
      this.timerSetting.load = false
    },
    notStart () {
      this.timerSetting.isStop = false
      this.timerSetting.isStarted = false
      this.timerSetting.isPaused = false
      this.timerSetting.load = false
      // this.timerSetting.countDownDate = null
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
