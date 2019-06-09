import Vue from 'vue'
import Vuex from 'vuex'
// import caesar from './caesar'
// import vigenere from './vigenere'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    alreadyDone: []
  },
  mutations: {
    ADD_DONE_EXERCISE: (state, value) => {
      state.alreadyDone.push(value)
    },
    DONE_EXERCISE: (state, value) => {
      state.alreadyDone = value
    }
  },
  actions: {
    addDoneExercise: (state, value) => {
      store.commit('ADD_DONE_EXERCISE', value)
    },
    doneExercise: (state, value) => {
      store.commit('DONE_EXERCISE', value)
    }
  },
  getters: {
    getAlreadyDone: state => state.alreadyDone
  }
})

export default store
