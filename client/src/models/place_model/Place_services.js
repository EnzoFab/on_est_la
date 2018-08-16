import axios from 'axios'

export default {
  create: function create (body) {
    console.log('body before server : ', body)
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
  }
}
