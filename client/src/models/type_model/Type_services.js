import axios from 'axios'
// import store from '@/store/store'

export default {
  async create (body) {
    let uri = 'http://localhost:1330/api/type/create'
    try {
      let res = await axios.post(uri, body)
      return res.data
    } catch (e) {
      return {}
    }
  },

  async findAll () {
    let uri = 'http://localhost:1330/api/type/find_all'
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async update (body) {
    let uri = 'http://localhost:1330/api/type/update'
    try {
      await axios.post(uri, body)
      return true
    } catch (e) {
      return false
    }
  },

  async delete (place) {
    let uri = 'http://localhost:1330/api/type/delete'
    try {
      await axios.post(uri, place)
      return true
    } catch (e) {
      return false
    }
  }
}
