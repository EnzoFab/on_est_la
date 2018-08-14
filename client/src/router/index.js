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
