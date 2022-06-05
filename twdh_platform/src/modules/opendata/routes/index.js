export default [
  {
    path: '/opendataIndex',
    name: 'OpendataIndex',
    component: () => import(/* webpackChunkName: "opendataIndex" */ '../views/OpendataIndex.vue')
  },
]