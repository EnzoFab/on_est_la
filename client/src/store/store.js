import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: (localStorage.getItem('token')) || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loader: true
  },
  getters: {
    getSpinnerVisibility (state) {
      return state.loader
    }
  },
  mutations: {
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    setUser (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    setLoader (state, loader) {
      state.loader = loader
    },
    removeToken (state) {
      localStorage.removeItem('token')
      state.token = null
    },
    removeUser (state) {
      localStorage.removeItem('user')
      state.user = null
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    showLoader ({commit}) { // show loader
      commit('setLoader', true)
    },
    removeUser ({commit}) {
      commit('removeUser')
    },
    hideLoader ({commit}) { // hide loader
      commit('setLoader', false)
    }
  }

})
