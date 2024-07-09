import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component : () => import('../views/BoardList.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path : '/detail/:id',
      component : () => import('../views/BoardDetail.vue')
    },
    {
      path : '/login/redirect',
      component : () => import('../components/RedirectPage.vue')
    }
  ]
})

export default router
