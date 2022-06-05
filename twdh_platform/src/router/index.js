import { createRouter, createWebHashHistory } from 'vue-router'

import portalRoutes from '@/modules/portal/routes'

const routes = [
  ...portalRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
