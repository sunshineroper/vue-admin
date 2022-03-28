import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import routes from './route'
import User from '@/api/user'
import loadRouter from '@/utils/loadRouter'
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const loginIn = store.state.user.loginIn
  if (loginIn) {
    if (to.path === '/login') {
      next('/')
    } else {
      const { user } = store.state.user
      if (Reflect.ownKeys(user).length <= 0) {
        try {
          const user = await User.getPermissions()
          store.dispatch('user/setUserAndUpdate', user)
          loadRouter(user, router)
          return next(to.path)
        } catch (error) {
          store.dispatch('user/loginOut')
          next('/login')
        }
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  // next()
})
export default router
