<template>
  <div>
    <div v-if="isThemeSelected">
      <h1>{{ selectedtheme.title }}</h1>
      <selectedtheme v-if="isSubThemeSelected"/>
      <div v-else>
        <div class="">
          {{selectedtheme.documentation}}
        </div>
        <subMenu/>
      </div>
    </div>
    <div v-else>
      il y a rien
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import selectedtheme from './selected_theme';
import subMenu from './SubMenu';
// import Vue from 'vue';
// import Caesarcipher from './caesar_cipher';
// import Caesarcipherlist from './caesar_cipher_list';

export default {
  computed: {
    ...Vuex.mapGetters({
      selectedtheme: 'getSelectedTheme',
      isThemeSelected: 'getIsThemeSelected',
      selectedSubTheme: 'getSelectedSubTheme',
      isSubThemeSelected: 'getIsSubThemeSelected',
    }),
  },
  components: {
    selectedtheme,
    subMenu,
  },
};
</script>

<style media="screen">

</style>
