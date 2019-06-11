<template>
  <div class="container-fluid h-100" id="app">
    <div class="row h-100">
      <div class="col-2 h-100 m-0 p-0 border-right border-dark">
        <Menu v-bind:myTimer="myTimer" v-on:doc="doc"/>
        <scoreBoard/>
      </div>
      <div class="col-6 mh-100 m-0 overflow-auto">
        <router-view v-if="$route.name !== 'MainPage'" v-bind:myTimer="myTimer" v-on:doc="doc" v-on:sideDoc="side"></router-view>
        <div v-else>
          <h1 class="text-center my-4">Welcome to CyberEdu</h1>
          <p class="indent">In this platform, you will discover the basis of cryptography and cybersecurity.</p>
        </div>
      </div>
      <div class="col-4 h-100 m-0 p-0 border-left border-dark">
        <timer class="m-0 p-0 border-bottom border-dark" v-bind:myTimer="myTimer" style="height: 150px"/>
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
  props: ['myTimer'],
  data () {
    return {
      documentation: '',
      data: '',
      sideDoc: false,
      maxHeight: window.innerHeight - 150
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
  sockets: {
    goodId (doneExercise) {
      this.$store.dispatch('doneExercise', doneExercise)
    }
  },
  methods: {
    doc (data) {
      this.documentation = data
    },
    side (data) {
      this.sideDoc = data
    },
    resize () {
      this.maxHeight = window.innerHeight - 150
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
