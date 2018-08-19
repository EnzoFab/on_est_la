import axios from 'axios'

export default {
  async create (body) {
    let uri = 'http://localhost:1330/api/isfriend/create'
    try {
      let res = await axios.post(uri, body)
      return res.data.isfriendState
    } catch (e) {
      return 'not-friend'
    }
  },

  async findOneInvitation (body) {
    let uri = 'http://localhost:1330/api/isfriend/find_one_invitation'
    try {
      let res = await axios.post(uri, body)
      return res.data[0].isfriendState
    } catch (e) {
      return 'not-friend'
    }
  },

  async findAllInvitations (userId) {
    let uri = 'http://localhost:1330/api/isfriend/find_all_invitations/' + userId
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async update (body) {
    let uri = 'http://localhost:1330/api/isfriend/update'
    try {
      let res = await axios.post(uri, body)
      return res
    } catch (e) {
      return false
    }
  },

  delete (body) {
    let uri = 'http://localhost:1330/api/isfriend/delete'
    try {
      let res = axios.post(uri, body)
      return res
    } catch (e) {
      return false
    }
  }
}
