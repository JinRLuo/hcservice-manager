import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from "../components/Login";
import ManagerAccount from "../components/ManagerAccount";
import UserAccount from "../components/UserAccount";
import AuditRoom from "../components/AuditRoom";
import Notice from "../components/Notice";

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
    component: Index,
    children: [
      {
        path: '/managerAccount',
        name: 'ManagerAccount',
        component: ManagerAccount
      },
      {
        path: '/userAccount',
        name: 'UserAccount',
        component: UserAccount
      },
      {
        path: '/auditRoom',
        name: 'AuditRoom',
        component: AuditRoom
      },
      {
        path: '/notice',
        name: 'Notice',
        component: Notice
      }
    ]
  }
]

const router =  new Router({
  routes,
  mode: 'history'
})

export default router
