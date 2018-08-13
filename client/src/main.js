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

Vue.use(Vuetify)

sync(store, router)

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
