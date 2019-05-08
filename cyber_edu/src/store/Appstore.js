import Vue from 'vue';
import Vuex from 'vuex';
// import caesar from './caesar';
// import vigenere from './vigenere';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedTheme: null,
    isThemeSelected: false,
    selectedSubTheme: null,
    isSubThemeSelected: false,
    hasChange: false,
  },
  mutations: {
    SELECT_SUB_THEME: (state, theme) => {
      state.selectedSubTheme = theme;
      state.isSubThemeSelected = true;
      state.hasChange = true;
    },
    UNSELECT_SUB_THEME: (state) => {
      state.selectedSubTheme = null;
      state.isSubThemeSelected = false;
    },
    SELECT_THEME: (state, theme) => {
      state.selectedTheme = theme;
      state.isThemeSelected = true;
    },
    HAS_CHANGE: (state, value) => {
      state.hasChange = value;
    },
  },
  actions: {
    selectTheme: (state, theme) => {
      store.commit('UNSELECT_SUB_THEME');
      store.commit('SELECT_THEME', theme);
    },
    selectSubTheme: (state, theme) => {
      store.commit('SELECT_SUB_THEME', theme);
      store.commit('HAS_CHANGE', true);
    },
    hasChange: (state, value) => {
      store.commit('HAS_CHANGE', value);
    },
  },
  getters: {
    getSelectedTheme: state => state.selectedTheme,
    getIsThemeSelected: state => state.isThemeSelected,
    getSelectedSubTheme: state => state.selectedSubTheme,
    getIsSubThemeSelected: state => state.isSubThemeSelected,
    hasChange: state => state.hasChange,
  },
});

export default store;
