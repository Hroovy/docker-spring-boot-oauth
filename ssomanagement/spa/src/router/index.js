import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../components/Landing.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/appList',
    name: 'appList',
    component: () => import('../components/AppList.vue')
  },
  {
    path: '/appUserList',
    name: 'appUserList',
    component: () => import('../components/AppUserList.vue')
  },
  {
    path: '/appUserForm/:id',
    name: 'appUserForm',
    component: () => import('../components/AppUserForm.vue')
  },
  {
    path: '/appUserFormSelf',
    name: 'appUserFormSelf',
    component: () => import('../components/AppUserFormSelf.vue')
  },
  {
    path: '/appRole/:appId',
    name: 'appRoleList',
    component: () => import('../components/AppRoleList.vue')
  },
  {
    path: '/appRoleForm/:appId/:id',
    name: 'appRoleForm',
    component: () => import('../components/AppRoleForm.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
