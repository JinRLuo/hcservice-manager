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
import store from '../store'
import Error from "../components/Error";
import Main from "../components/Main";
import { Message } from 'element-ui';

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
        path: '/main',
        name: 'Main',
        component: Main
      },
      {
        path: '/managerAccount',
        name: 'ManagerAccount',
        component: ManagerAccount,
        meta: [
          'SYSTEM_ADMIN'
        ]
      },
      {
        path: '/userAccount',
        name: 'UserAccount',
        component: UserAccount,
        meta: [
          'SYSTEM_ADMIN'
        ]
      },
      {
        path: '/auditRoom',
        name: 'AuditRoom',
        component: AuditRoom,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN'
        ]
      },
      {
        path: '/notice',
        name: 'Notice',
        component: Notice,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN'
        ]
      },
      {
        path: '/complaint',
        name: 'Complaint',
        component: Complaint,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN'
        ]
      },
      {
        path: '/repair',
        name: 'Repair',
        component: Repair,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN',
          'REPAIRER'
        ]
      },
      {
        path: '/visitor',
        name: 'Visitor',
        component: Visitor,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN',
          'SECURITY_STAFF'
        ]

      },
      {
        path: '/service',
        name: 'Service',
        component: Service,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN'
        ]
      },
      {
        path: '/car',
        name: 'Car',
        component: Car,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN',
          'PARK_ADMIN'
        ]
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: [
          'SYSTEM_ADMIN'
        ]
      },
      {
        path: '/house',
        name: 'House',
        component: House,
        meta: [
          'SYSTEM_ADMIN',
          'HC_ADMIN'
        ]
      },{
        path: '/error',
        name: 'Error',
        component: Error
      }
    ]
  }
]

const router =  new Router({
  base: '/admin/',
  routes,
  mode: 'history'
})

router.beforeEach(function (to, from, next) {
    if(to.path != '/' && to.path != '/main' && to.path != '/error'){
    let flag = 0;
    let roles = to.meta;
    let adminInfo = store.getters.adminInfo;
    for (let i = 0; i < roles.length; i++) {
      for (let j = 0; j < adminInfo.authorities.length; j++) {
        if (roles[i] == adminInfo.authorities[j].authority) {
          flag = 1;
          next();
          break;
        }
      }
      if(flag==1){
        break;
      }
    }
    if(flag == 0) {
      Message.error("您没有此页面的访问权限！");
      next(from.path); // 跳转到错误页
    }
  } else {
    next();
  }
})

export default router
