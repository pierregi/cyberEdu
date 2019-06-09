<template>
  <div class="m-0 p-0 w-100 h-50 border-bottom border-dark overflow-auto bg-dark" style="max-height: 50%">
    <h2 v-on:click="unSelectTheme" class="text-center m-0 py-2 text-white nav-link">Menu</h2>
    <b-nav vertical class="m-0 p-0 h-auto text-white" style="font-size: 20px;">
      <div
      v-for="theme in themes"
      v-bind:key="theme.key"
      class="m-0 p-0 h-auto">
      <b-nav-item @click="selectTheme(theme.key)"
        class="m-0 py-1 h-auto text-white"
        v-bind:active="theme.key === $route.name"
        v-bind:link-classes="{'bg-secondary': theme.key === $route.name, 'text-white m-0 pl-2 p-0 h-auto': true }"
        style="font-size: 25px"
      >{{ theme.title }}</b-nav-item>
      <subMenu
        v-bind:theme="theme.key"
        v-bind:myTimer="myTimer"
        v-bind:id="theme.key"
      />
    </div>
    </b-nav>
  </div>
</template>

<script>
import subMenu from '@/components/SubMenu'

export default {
  props: ['myTimer'],
  data () {
    return {
      error: false,
      themes: []
    }
  },
  methods: {
    selectTheme (theme) {
      // this.$store.dispatch('selectTheme', theme)
      this.$router.replace({name: theme})
    },
    unSelectTheme () {
      this.$router.replace({name: 'MainPage'})
      this.$emit('doc', '')
    }
  },
  components: {
    subMenu
  },
  mounted () {
    this.$resource('themes').get().then(
      (response) => {
        this.themes = response.data
      },
      (response) => {
        console.error('error', response)
        this.error = true
      }
    )
  }
}
</script>
<style>
.nav-link:hover {
  background-color: #999;

}
</style>
