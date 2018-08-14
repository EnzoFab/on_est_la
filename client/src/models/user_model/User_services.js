import axios from 'axios'

export default {
  findAll: function findAll () {
    let uri = 'http://localhost:1330/api/user/find_all'
    axios.get(uri)
      .then((response) => {
        return response.data
      })
  },

  test: function test () {
    let uri = 'http://localhost:1330/api/user/find_all'
    axios.get(uri).then((response) => {
      console.log(response.data)
    })
  }
}
