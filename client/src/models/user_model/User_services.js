import axios from 'axios'
import store from '@/store/store'

export default {

  async isLogged () {
    axios.defaults.headers.common['Authorization'] = store.getters.getToken
    let uri = 'http://localhost:1330/api/auth/is_logged'
    let res = await axios.post(uri)
    return res.data
  },

  async getLoggedUser () {
    axios.defaults.headers.common['Authorization'] = store.getters.getToken
    let uri = 'http://localhost:1330/api/auth/find_logged'
    let res = await axios.post(uri)
    return res.data
  },

  async signIn (identifiant, password) {
    let body = {
      userMail: identifiant,
      userPass: password
    }
    let uri = 'http://localhost:1330/api/auth/log_in'
    let isSigned
    try {
      await axios.post(uri, body)
        .then((res) => {
          // this.storeUserInformation(res.data)
          store.commit('setToken', 'Bearer ' + res.data.token)
          store.commit('setUser', res.data.data)
          isSigned = true
        })
    } catch (e) {
      isSigned = false
    }
    return isSigned
  },

  signUp (body) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/auth/sign_up'
      axios.post(uri, body)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  findAll: function findAll () {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/user/find_all'
      axios.get(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  findAllFriends (userId) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/user/find_all_friends/' + userId
      axios.get(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  findAllFromSearchBar: function findAllFromSearchBar (search) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/user/find_all_from_search_bar'
      let body = {
        search: search
      }
      axios.post(uri, body)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  findOneFromPseudo: function (userPseudo) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/user/find_one_from_pseudo/' + userPseudo
      axios.get(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  /* ========= LOCAL STORAGE ========= */
  storeUserInformation (values) {
    localStorage.setItem('Token', 'Bearer ' + values.token)
  },

  getLocalUserInformations () {
    let informations = {
      userPseudo: localStorage.getItem('Token')
    }
    return informations
  },

  clearLocalUserInformations () {
    store.commit('removeToken')
    store.commit('removeUser')
  }

}
