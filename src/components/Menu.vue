<template>
  <div class="m-0 p-0 w-100 h-50 border-bottom border-dark overflow-auto bg-dark" style="max-height: 50%">
    <h2 v-on:click="unSelectTheme" class="text-center m-0 py-2 text-white nav-link">Menu</h2>
    <b-nav v-if="!error" vertical class="m-0 p-0 h-auto text-white" style="font-size: 20px;">
      <div
      v-for="theme in themes"
      v-bind:key="theme.key"
      class="m-0 p-0 h-auto">
      <b-nav-item @click="selectTheme(theme.key)"
        class="m-0 py-1 h-auto"
        v-bind:active="theme.key === $route.name"
        v-bind:link-classes="{'bg-secondary text-warning': theme.key === $route.name, 'text-primary m-0 pl-2 p-0 h-auto ': true }"
        style="font-size: 25px"
      >{{ theme.title }}</b-nav-item>
      <subMenu
        v-bind:theme="theme.key"
        v-bind:timerSetting="timerSetting"
        v-bind:id="theme.key"
      />
    </div>
    </b-nav>
    <b-alert v-else variant="danger" class="m-3 mw-100 text-center text-break" show>Could not load menu from server</b-alert>
  </div>
</template>

<script>
import subMenu from '@/components/SubMenu'

export default {
  props: ['timerSetting'],
  data () {
    return {
      error: false,
      themes: []
    }
  },
  methods: {
    selectTheme (theme) {
      this.$router.replace({name: theme})
    },
    unSelectTheme () {
      this.$router.replace({name: 'GamePage'})
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
