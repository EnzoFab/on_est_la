import axios from 'axios'

export default {
  create: function create (body) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/place/create'
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
      let uri = 'http://localhost:1330/api/place/find_all'
      axios.get(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  delete: function create (placeId) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/place/delete/' + placeId
      axios.post(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  }
}
