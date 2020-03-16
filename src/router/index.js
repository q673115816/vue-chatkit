import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import ChatDashboard from '../views/ChatDashboard'
import NoFound from '../views/404'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/chat'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/chat',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: ChatDashboard
  },
  {
    path: '*',
    name: '404',
    component: NoFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let isLogin = !!localStorage.getItem('vuex')
  if(!isLogin && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
