import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from "../components/Login";
import ManagerAccount from "../components/ManagerAccount";
import UserAccount from "../components/UserAccount";
import AuditRoom from "../components/AuditRoom";
import Notice from "../components/Notice";
import Complaint from "../components/Complaint";
import Repair from "../components/Repair";
import Visitor from "../components/Visitor";
import Service from "../components/Service";
import Car from "../components/Car";
import Order from "../components/Order";
import House from "../components/House";

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
      },
      {
        path: '/complaint',
        name: 'Complaint',
        component: Complaint
      },
      {
        path: '/repair',
        name: 'Repair',
        component: Repair
      },
      {
        path: '/visitor',
        name: 'Visitor',
        component: Visitor
      },
      {
        path: '/service',
        name: 'Service',
        component: Service
      },
      {
        path: '/car',
        name: 'Car',
        component: Car
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/house',
        name: 'House',
        component: House
      }
    ]
  }
]

const router =  new Router({
  routes,
  mode: 'history'
})

export default router
