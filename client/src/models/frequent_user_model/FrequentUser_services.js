import axios from 'axios'
import store from '../../store/store'

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
  },

  async findAllFrequentFriends () {
    let uri = 'http://localhost:1330/api/frequent_user/find_all_for_calendar/' + store.getters.getUser.userId
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async findAllFrequentFromUser () {
    let uri = 'http://localhost:1330/api/frequent_user/find_all_frequent_from_user/' + store.getters.getUser.userId
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async findAllFrequentFromUserId (userId) {
    let uri = 'http://localhost:1330/api/frequent_user/find_all_frequent_from_user/' + userId
    try {
      let res = await axios.get(uri)
      return res.data
    } catch (e) {
      return []
    }
  },

  async findAllFrequentFromUserIdPast (userId) {
    let uri = 'http://localhost:1330/api/frequent_user/find_all_frequent_from_user_past/' + userId
    try {
      let res = await axios.get(uri)
      console.log(res.data)
      return res.data
    } catch (e) {
      return []
    }
  }
}
