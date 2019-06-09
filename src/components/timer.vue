<template>
  <div class="row align-items-center justify-content-around">
    <h1 class="col-12 col-lg-7 text-center" v-if="display" style="width: 242px; font-size:41px">{{ display }}</h1>
    <Clock class=" col-12 col-lg-8 text-center" v-else v-bind:myTimer="myTimer" style="min-width: 242px"/>
    <img class="img-fluid col-0 col-lg-4" style="width: 150px" src="@/assets/1200px-University_of_Sunderland_logo.svg.png"/>
  </div>
</template>

<script>
import Clock from '@/components/clock'

export default {
  props: ['myTimer'],
  data () {
    return {
      display: 'Waiting for start'
    }
  },
  watch: {
    myTimer: {
      handler () {
        if (this.myTimer.isStarted) {
          this.display = false
        } else if (this.myTimer.isStop) {
          this.display = 'Finished'
        } else {
          this.display = 'Waiting for start'
        }
        this.myTimer.load = false
      },
      deep: true
    }
  },
  mounted () {
    this.$socket.emit('getTimer')
    this.myTimer.load = true
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
