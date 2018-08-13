import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import topbar from '@/components/topbar/Topbar'
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
      path: '/topbar',
      name: 'topbar',
      component: topbar
    }
  ]
})
