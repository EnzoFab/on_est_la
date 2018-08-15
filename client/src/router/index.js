import Vue from 'vue'
import Router from 'vue-router'
import profile from '@/components/profile/Profile'
import home from '@/components/home/Home'
import searchUser from '@/components/search_user/Search_user'
import Map from '@/components/map/Map'
import Calendar from '@/components/calendar/Calendar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'source',
      component: home,
      meta: {title: 'On est là hein'} // change the title of the page
    },

    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {title: 'On est là hein'}
    },

    {
      path: '/my-profile',
      name: 'my-profile',
      component: profile
    },

    {
      path: '/cc/:pseudo',
      name: 'user-profile',
      component: profile
    },

    {
      path: '/test',
      name: 'test',
      component: searchUser
    },

    {
      path: '/map',
      map: 'map',
      component: Map
    },

    {
      path: '/search-friends',
      name: 'search-friends',
      component: searchUser
    },

    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    }
  ]
})
