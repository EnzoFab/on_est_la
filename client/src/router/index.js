import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import profile from '@/components/profile/Profile'
import home from '@/components/home/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
