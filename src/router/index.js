import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from "../components/Login";

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  }
]

const router =  new Router({
  routes,
  mode: 'history'
})

export default router
