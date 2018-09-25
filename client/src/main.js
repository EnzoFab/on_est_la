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
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vue-event-calendar/dist/style.css' // ^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
import moment from 'moment'
import VueClip from 'vue-clip'

// import store from './components/shared/Store'
// import _service from './models'

// locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua', 'no, 'no-nn'
Vue.use(vueEventCalendar, {locale: 'fr', color: '#1a237e'})
Vue.use(require('vue-moment'))
moment.locale('fr')
Vue.use(moment)
Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.use(store)
Vue.use(VueClip)

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
// eslint-disable-next-line
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
