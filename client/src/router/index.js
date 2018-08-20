import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/profile/Profile'
import Home from '@/components/home/Home'
import SearchUser from '@/components/search_user/Search_user'
import MapPage from '@/components/map/MapPage'
import Calendar from '@/components/calendar/Calendar'
import AdminHome from '@/components/admin/AdminHome'
import PlaceManagement from '@/components/admin/placeManagement/PlaceManagement'
import TypeManagement from '@/components/admin/typeManagement/TypeManagement'
import Sign from '@/components/sign/Sign'
import _service from '../models'
import store from '@/store/store'
import LeafletMap from '../components/map/LeafletMap'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'source',
      component: Home,
      meta: {title: 'On est là hein'} // change the title of the page
    },

    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {title: 'On est là hein'}
    },

    {
      path: '/sign-in',
      name: 'sign',
      component: Sign,
      meta: {title: 'prout'}
    },

    {
      path: '/cc/:pseudo',
      name: 'user-profile',
      component: Profile,
      meta: {title: 'caca'}
    },

    {
      path: '/soif',
      name: 'MapPage',
      map: 'map',
      component: MapPage,
      meta: {title: 'haha'}
    },

    {
      path: '/leaflet',
      name: 'Leaflet',
      component: LeafletMap
    },

    {
      path: '/search-friends',
      name: 'search-friends',
      component: SearchUser
    },

    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },

    {
      path: '/admin',
      name: 'adminHome',
      component: AdminHome,
      children: [
        {
          path: 'place',
          name: 'placeManagement',
          component: PlaceManagement
        },
        {
          path: 'type',
          name: 'typeManagement',
          component: TypeManagement
        }
      ]
    }
  ]
})

/* ======== GLOBAL GUARDS ======== */

// First function triggered
router.beforeEach(async (to, from, next) => {
  // re-route
  if (await _service.user.isLogged()) {
    // User logged
    store.commit('setIsLogged', true)
    if (to.path === '/sign-in') {
      next('/home')
    } else {
      next()
    }
  } else {
    // User not logged
    store.commit('setIsLogged', false)
    if (to.path === '/sign-in') {
      next()
    } else {
      next('./sign-in')
    }
  }
})

export default router
