import axios from 'axios'

export default {
  findAll: function findAll () {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/user/find_all'
      axios.get(uri)
        .then(response => {
          console.log('Server data : ', response.data)
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  test: function test () {
    console.log('bouuh')
  }
}
