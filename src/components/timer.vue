<template>
  <div class="row align-items-center justify-content-around" style="height: 150px">
    <h1 class="col-12 col-lg-7 text-center" v-if="display" style="width: 242px; font-size:41px">{{ display }}</h1>
    <Clock class=" col-12 col-lg-8 text-center" v-else v-bind:timerSetting="timerSetting" style="min-width: 242px"/>
    <img v-if="!hideLogo" class="img-fluid col-0 col-lg-4" style="width: 150px" src="@/assets/1200px-University_of_Sunderland_logo.svg.png"/>
  </div>
</template>

<script>
import Clock from '@/components/clock'

export default {
  props: ['timerSetting', 'hideLogo'],
  data () {
    return {
      display: 'Waiting for start'
    }
  },
  watch: {
    timerSetting: {
      handler () {
        if (this.timerSetting.isStarted) {
          this.display = false
        } else if (this.timerSetting.isStop) {
          this.display = 'Finished'
        } else {
          this.display = 'Waiting for start'
        }
        this.timerSetting.load = false
      },
      deep: true
    }
  },
  mounted () {
    this.$socket.emit('getTimer')
    this.timerSetting.load = true
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  components: {
    Clock
  }
}
</script>

<style>
</style>
