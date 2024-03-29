<template>
  <div class="w-100 m-0 p-0">
    <div v-if="!error" class="mx-3 my-4">
      <h1 class="text-center my-4 text-primary"><u>{{ theme.title }}</u></h1>
      <div v-if="!isSubThemeSelected || biggerDoc">
        <components
          v-bind:is="theme.documentation"
          v-bind:windowWidth="windowWidth"
          v-bind:sideDoc="false"
        />
        <h2 v-if="!biggerDoc" class="text-primary">Exercises :</h2>
        <ul class="m-0 p-0 w-100">
          <SubMenu v-if="!biggerDoc" v-bind:theme="name" v-bind:timerSetting="timerSetting" class="offset-1 col-5 col-xl-4 font-weight-bold" v-bind:select="true"/>
        </ul>
      </div>
      <router-view v-if="!biggerDoc" v-bind:timerSetting="timerSetting"></router-view>
      <font-awesome-icon class="buttonBigger" v-bind:icon="icon" v-if="isSubThemeSelected" @click="changeDoc"/>
    </div>
    <b-alert v-else variant="danger" class="my-3 w-100 text-center text-break" show>Could not load exercise from server</b-alert>
  </div>

</template>
<script>
import SubMenu from '@/components/SubMenu'
const CaesarDoc = () => import('@/components/docs/caesar_doc')
const VigenereDoc = () => import('@/components/docs/vigenere_doc')
const SQLDoc = () => import('@/components/docs/sql_doc')
const JsDoc = () => import('@/components/docs/js_doc')

export default {
  props: ['name', 'timerSetting', 'windowWidth'],
  data () {
    return {
      isSubThemeSelected: false,
      biggerDoc: false,
      theme: {},
      error: false
    }
  },
  computed: {
    icon () {
      return this.biggerDoc ? 'compress' : 'expand'
    }
  },
  methods: {
    changeDoc () {
      this.biggerDoc = !this.biggerDoc
      this.$emit('sideDoc', this.isSubThemeSelected && !this.biggerDoc)
    }
  },
  components: {
    SubMenu,
    CaesarDoc,
    VigenereDoc,
    SQLDoc,
    JsDoc
  },
  watch: {
    $route (to, from) {
      this.isSubThemeSelected = (this.$router.currentRoute.name !== this.name)
      this.$emit('sideDoc', this.isSubThemeSelected && !this.biggerDoc)
      this.$resource('selectedTheme').get({ key: this.name }).then(
        (response) => {
          this.error = false
          this.theme = response.data
          this.$emit('doc', this.theme.documentation)
        },
        (response) => {
          this.error = true
        }
      )
    },
    timerSetting: {
      handler () {
        if (!this.timerSetting.isStarted) {
          this.$router.push({name: this.name})
        }
      },
      deep: true
    }
  },
  mounted () {
    this.isSubThemeSelected = (this.$router.currentRoute.name !== this.name)
    this.$emit('sideDoc', this.isSubThemeSelected && !this.biggerDoc)
    this.$resource('selectedTheme').get({ key: this.name }).then(
      (response) => {
        this.theme = response.data
        this.$emit('doc', this.theme.documentation)
      },
      (response) => {
        this.error = true
      }
    )
  }
}
</script>
<style media="screen">
.buttonBigger {
  position: fixed;
  font-size: 30px;
  right: 30px;
  bottom: 25px;
  width: auto;
  height: auto;
  z-index: 90;
}
.buttonBigger:hover {
  width: 40px;
  height: 40px;
  z-index: 90;
}
</style>
