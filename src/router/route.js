// import homeRouter from './home-route'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/profile',
    component: () => import('@/layout/index')
    // children: [...homeRouter]
  }
]
export default routes
