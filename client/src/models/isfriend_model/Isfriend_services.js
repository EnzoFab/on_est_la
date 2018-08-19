import axios from 'axios'
import store from '@/store/store'

export default {
  create (body) {
    let uri = 'http://localhost:1330/api/isfriend/create'
    return axios.post(uri, body)
  },

  findOneInvitation (body) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/isfriend/find_one_invitation'
      axios.post(uri, body)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  findAllInvitations (userId) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/isfriend/find_all_invitations/' + userId
      axios.get(uri)
        .then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
    })
  },

  update (body) {
    return new Promise((resolve, reject) => {
      let uri = 'http://localhost:1330/api/isfriend/update'
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
