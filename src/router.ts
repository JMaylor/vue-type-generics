import {createRouter, createWebHistory} from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('./views/HomePage.vue')
    },
    {
      name: 'About',
      path: '/about',
      component: () => import('./views/AboutPage.vue')
    },
  ]
})