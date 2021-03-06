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
          isSigned = [true, null]
        })
    } catch (e) {
      isSigned = [false, e]
    }
    return isSigned
  },

  async update (body) {
    let uri = 'http://localhost:1330/api/user/update'
    try {
      await axios.post(uri, body)
      return true
    } catch (e) {
      return false
    }
  },

  async updateProfilePicture (body) {
    let uri = 'http://localhost:1330/api/user/update_picture'
    try {
      let res = await axios.post(uri, body)
      return res.data
    } catch (e) {
      return false
    }
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

  findAll () {
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

  async findAllFriends (userId) {
    let uri = 'http://localhost:1330/api/user/find_all_friends/' + userId
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
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

  async findOneFromPseudo (userPseudo) {
    let uri = 'http://localhost:1330/api/user/find_one_from_pseudo/' + userPseudo
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async validAccount (userToken) {
    let uri = 'http://localhost:1330/api/auth/account-validation/' + userToken
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  /* ========= LOCAL STORAGE ========= */
  clearLocalUserInformations () {
    store.commit('removeToken')
    store.commit('removeUser')
  }

}
