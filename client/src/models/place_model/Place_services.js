import axios from 'axios'

export default {
  async create (body) {
    let uri = 'http://localhost:1330/api/place/create'
    try {
      let res = await axios.post(uri, body)
      return res.data
    } catch (e) {
      return {}
    }
  },

  async findAll () {
    let uri = 'http://localhost:1330/api/place/find_all'
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async update (body) {
    let uri = 'http://localhost:1330/api/place/update'
    try {
      await axios.post(uri, body)
      return true
    } catch (e) {
      return false
    }
  },

  async delete (placeId) {
    let uri = 'http://localhost:1330/api/place/delete/' + placeId
    console.log(placeId)
    try {
      await axios.post(uri)
      return true
    } catch (e) {
        return false
    }

  }
}
