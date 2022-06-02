import { createRouter, createWebHashHistory } from 'vue-router'

import productRoutes from '@/modules/product/routes'

const routes = [
  ...productRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
