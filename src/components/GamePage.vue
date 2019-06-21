<template>
  <div class="container-fluid h-100" id="app">
    <div class="row h-100">
      <div class="col-2 h-100 m-0 p-0 border-right border-dark">
        <Menu v-bind:timerSetting="timerSetting" v-on:doc="doc"/>
        <scoreBoard/>
      </div>
      <div class="col-6 mh-100 m-0 overflow-auto">
        <router-view v-if="$route.name !== 'GamePage'" v-bind:timerSetting="timerSetting" v-bind:windowWidth="windowWidth" v-on:doc="doc" v-on:sideDoc="side"></router-view>
        <div class="mx-3 my-4" v-else>
          <h1 class="text-center my-5 text-primary">Welcome to CyberEdu</h1>
          <p class="indent text-justify">In this platform, you will discover the basis of cryptography and cybersecurity. </p>
          <h4 class="text-danger">Menu</h4>
          <p class="indent text-justify">You will compete with other groups on doing the exercises that you can find on the Menu which is on the left side of the page. </p>
          <h4 class="text-danger">Scoreboard</h4>
          <p class="indent text-justify">On the left bottom corner, you will find a scoreboard where the other teams and yours will be ranked with they score. Your score is the amout of point you will earn by validate a Challenge. Every Challenge gives you a definite amount of point based on the difficulty, easier they are, less point you will earn. The last way to earn points is to finish all exercises before the timer is at zero and the faster you go the more points you will gain.</p>
          <h4 class="text-danger">Challenge & Documentation</h4>
          <p class="text-justify">
            This app is based on four main themes:
            <ul>
              <li>Caesar cipher</li>
              <li>Vigenère cipher</li>
              <li>SQL</li>
              <li>Javascript</li>
            </ul>
          </p>
          <p class="indent text-justify">
            I suggest you to do them in this order but it is not obligatory. Every themes are provided with a documentation that you should read before doing the exercises becase it will help you to resolve them.
          </p>
          <div class="w-100 text-center">
            <b-link :to="{ name: 'caesar'}" class="text-center w-100">Now you can start by the first theme</b-link>
          </div>
        </div>
      </div>
      <div class="col-4 h-100 m-0 p-0 border-left border-dark">
        <timer class="m-0 p-0 border-bottom border-dark" v-bind:timerSetting="timerSetting"/>
        <components
          v-if="sideDoc"
          v-bind:is="documentation"
          v-bind:sideDoc="true"
          class="overflow-auto p-3"
          v-bind:style="{ maxHeight: maxHeight + 'px' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import scoreBoard from '@/components/scoreBoard'
import timer from '@/components/timer'
import Menu from '@/components/Menu'
const CaesarDoc = () => import('@/components/docs/caesar_doc')
const VigenereDoc = () => import('@/components/docs/vigenere_doc')
const SQLDoc = () => import('@/components/docs/sql_doc')
const JsDoc = () => import('@/components/docs/js_doc')

export default {
  props: ['timerSetting'],
  data () {
    return {
      documentation: '',
      data: '',
      sideDoc: false,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    maxHeight () {
      return window.innerHeight - 150
    }
  },
  components: {
    Menu,
    timer,
    scoreBoard,
    CaesarDoc,
    VigenereDoc,
    SQLDoc,
    JsDoc
  },
  methods: {
    doc (data) {
      this.documentation = data
    },
    side (data) {
      this.sideDoc = data
    },
    resize () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    }
  },
  beforeCreate () {
    this.$socket.emit('testId', this.$cookie.get('id'))
  },
  created () {
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style media="screen">
</style>
