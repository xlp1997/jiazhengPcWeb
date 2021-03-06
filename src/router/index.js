import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index'),
      meta: {
        foot: true, navbar: 0,keepAlive:true
      }
    }, {
      path: '/job',
      name: 'job',
      component: () => import('@/views/job'),
      meta: {
        keepAlive: true,
        navbar: 2
      }
    }, {
      path: '/news',
      name: 'news',
      component: () => import('@/views/news'),
      meta: {
        keepAlive: true,
        navbar: 1
      }
    }, {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about'),
      meta: {
        keepAlive: true,
        foot: true,
        navbar: 3
      }
    }, {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: () => import('@/views/newsDetail'),
      meta: {
         navbar: 1
      }
    }

  ]
})
