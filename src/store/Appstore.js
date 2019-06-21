import Vue from 'vue'
import Vuex from 'vuex'
// import caesar from './caesar'
// import vigenere from './vigenere'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alreadyDone: []
  },
  mutations: {
    ADD_DONE_EXERCISE: (state, exercise) => {
      state.alreadyDone.push(exercise)
    },
    SET_DONE_EXERCISE: (state, exercises) => {
      state.alreadyDone = exercises
    }
  },
  actions: {
    addDoneExercise: (context, exercise) => {
      context.commit('ADD_DONE_EXERCISE', exercise)
    },
    setDoneExercise: (context, exercises) => {
      context.commit('SET_DONE_EXERCISE', exercises)
    }
  },
  getters: {
    getAlreadyDone: state => state.alreadyDone
  }
})
