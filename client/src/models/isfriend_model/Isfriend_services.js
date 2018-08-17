import axios from 'axios'

export default {
  create: function create (body) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/isfriend/create'
      axios.post(uri, body)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  delete (body) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/isfriend/delete'
      axios.post(uri, body)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  }
}
