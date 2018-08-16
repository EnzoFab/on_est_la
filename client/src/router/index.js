import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/profile/Profile'
import Home from '@/components/home/Home'
import SearchUser from '@/components/search_user/Search_user'
import MapPage from '@/components/map/MapPage'
import Calendar from '@/components/calendar/Calendar'
import AdminHome from '@/components/admin/AdminHome'
import PlaceManagement from '@/components/admin/placeManagement/PlaceManagement'

Vue.use(Router)

export default new Router({
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
      path: '/cc/:pseudo',
      name: 'my-profile',
      component: Profile
    },

    {
      path: '/cc/:pseudo',
      name: 'user-profile',
      component: Profile
    },

    {
      path: '/soif',
      name: 'MapPage',
      map: 'map',
      component: MapPage
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
        }
      ]
    }
  ]
})
