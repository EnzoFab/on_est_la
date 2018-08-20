import axios from 'axios'

export default {

  async create (body) {
    let uri = 'http://localhost:1330/api/frequent_user/create'
    try {
      /* eslint-disable */
      let res = axios.post(uri, body)
      return true
    } catch (e) {
      return false
    }
  },

  async delete (body) {
    let uri = 'http://localhost:1330/api/frequent_user/delete'
    try {
      /* eslint-disable */
      let res = axios.post(uri, body)
      return true
    } catch (e) {
      return false
    }
  }
}
