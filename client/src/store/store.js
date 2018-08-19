import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: (localStorage.getItem('Token')) || null,
    user: (JSON.parse(localStorage.getItem('User'))) || null,
    loader: true,
    isLogged: false
  },
  getters: {
    getSpinnerVisibility (state) {
      return state.loader
    },
    getIsLogged (state) {
      return state.isLogged
    },
    getUser (state) {
      return state.user
    },
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setToken (state, token) {
      localStorage.setItem('Token', token)
      state.token = token
    },
    setUser (state, user) {
      localStorage.setItem('User', JSON.stringify(user))
      state.user = user
    },
    setLoader (state, loader) {
      state.loader = loader
    },
    removeToken (state) {
      localStorage.removeItem('Token')
      state.token = null
    },
    removeUser (state) {
      localStorage.removeItem('user')
      state.user = null
    },
    setIsLogged (state, value) {
      state.isLogged = value
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
