import { createRouter, createWebHashHistory } from 'vue-router'

import portalRoutes from '@/modules/portal/routes'
import opendataRoutes from '@/modules/opendata/routes'
import tdocuskyRoutes from '@/modules/tdocusky/routes'


const routes = [
  ...portalRoutes,
  ...opendataRoutes,
  ...tdocuskyRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
