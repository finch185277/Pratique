import { createRouter, createWebHashHistory } from 'vue-router'

import portalRoutes from '@/modules/portal/routes'
import userRoutes from '@/modules/user/routes'
import opendataRoutes from '@/modules/opendata/routes'
import tdocuskyRoutes from '@/modules/tdocusky/routes'
import simpleworkflowRoutes from '@/modules/simpleworkflow/routes'


const routes = [
  ...portalRoutes,
  ...userRoutes,
  ...opendataRoutes,
  ...tdocuskyRoutes,
  ...simpleworkflowRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
