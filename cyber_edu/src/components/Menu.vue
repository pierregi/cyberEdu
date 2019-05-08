<template>
  <div class="menu">
    <h3>Menu</h3>
    <ol>
      <li
        v-for="theme in themes"
        v-bind:key="theme.key"
        >
        <p v-on:click="selectTheme(theme)">{{ theme.title }}</p>
        <subMenu
          v-bind:theme="theme"
        />
        </li>
    </ol>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Vigenerecipherlist from './vigenere_cipher_list';
// import Caesarcipherlist from './caesar_cipher_list';
import Vuex from 'vuex';
import subMenu from './SubMenu';

export default {
  data() {
    return {
      error: false,
      themes: [],
    };
  },
  computed: {
    ...Vuex.mapGetters({
      selectedTheme: 'getSelectedTheme',
      isSelect: 'getIsThemeSelected',
    }),
  },
  methods: {
    selectTheme(theme) {
      this.$store.dispatch('selectTheme', theme);
    },
  },
  components: {
    subMenu,
  },
  mounted() {
    this.$resource('themes').get().then(
      (response) => {
        this.themes = response.data;
      },
      (response) => {
        console.error('error', response);
        this.error = true;
      },
    );
  },
};
</script>

<style media="screen">
ol {
  width: 90%;
  padding-left: 5%;
  margin-left: 5%;
}
h3 {
  width: 100%;
  text-align: center;
}
</style>
