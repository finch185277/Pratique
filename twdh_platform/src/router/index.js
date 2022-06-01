import { createRouter, createWebHashHistory } from 'vue-router'

import cartRoutes from '@/modules/cart/routes'
import productRoutes from '@/modules/product/routes'

const routes = [
  ...cartRoutes,
  ...productRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
