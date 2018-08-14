import Vue from 'vue'
import Router from 'vue-router'
import profile from '@/components/profile/Profile'
import home from '@/components/home/Home'
import friendlist from '@/components/friendlist/Friendlist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'source',
      component: home
    },

    {
      path: '/home',
      name: 'home',
      component: home
    },

    {
      path: '/my-profile',
      name: 'profile',
      component: profile
    },

    {
      path: '/test',
      name: 'test',
      component: friendlist
    }
  ]
})
