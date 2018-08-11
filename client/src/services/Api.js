import axios from 'axios'
// import store from '../store/store'

export default () => {
  return axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000', //
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${store.state.token}`
    }
  })
}
