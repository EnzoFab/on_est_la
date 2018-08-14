// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import 'material-design-icons-iconfont/dist/fonts/material-icons.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Vuetify)

sync(store, router)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCt0gdwbDQE54poc617Y527r7szzIoM0aE',
    libraries: 'places' // necessary for places input
  }
})

Vue.config.productionTip = false
// in init router file
router.afterEach(route => {
  document.title = route.meta.title
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
