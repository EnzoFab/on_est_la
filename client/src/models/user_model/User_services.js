import axios from 'axios'

export default {
  signIn (identifiant, password) {

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
  }
}
