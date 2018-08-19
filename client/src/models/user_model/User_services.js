import axios from 'axios'

export default {

  isLogged () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token')
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/auth/is_logged'
      axios.post(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  async signIn (identifiant, password) {
    let body = {
      userMail: identifiant,
      userPass: password
    }
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/auth/log_in'
      axios.post(uri, body)
        .then(response => {
          this.storeUserInformation(response.data)
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
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
    localStorage.removeItem('Token')
  }

}
