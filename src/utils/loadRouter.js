import Utils from '@/utils/utils'
import adminRouters from '@/config/stage/admin'
import store from '@/store'
// 动态路由添加
const loadRouter = (user, router) => {
  const { menus } = user
  deepReduceName(menus)
  let treeMenu = []

  listTree(menus, treeMenu, 0)
  const menuRouter = []
  if (user.admin) {
    treeMenu = treeMenu.concat(adminRouters)
  }
  treeMenu.push({
    path: '/profile',
    type: 'view',
    component: 'views/profile',
    title: '关于我们',
    isNav: true,
    icon: '',
    name: 'profile'
  })
  deepTrevel(treeMenu, (menu) => {
    const viewRouter = {}
    viewRouter.path = menu.path
    viewRouter.name = menu.name
    viewRouter.component = () => import(`@/${menu.component}`)
    viewRouter.meta = {
      title: menu.title,
      icon: menu.icon
    }
    menuRouter.push(viewRouter)
  })
  menuRouter.forEach((item) => {
    if (item && item.path) {
      router.addRoute('Layout', item)
    }
  })
  router.addRoute({
    path: '/:path(.*)',
    redirect: '/404'
  })
  store.commit('user/SET_USER_TREE_MENUS', treeMenu)
  return menuRouter
}

function deepReduceName(target) {
  if (Array.isArray(target)) {
    target.forEach((item) => {
      if (typeof item !== 'object') {
        return
      }
      deepReduceName(item)
    })
  }
  if (typeof target === 'object') {
    if (typeof target.name !== 'symbol') {
      target.name = target.name || Utils.getRandomStr()
      target.name = Symbol(target.name)
    }
    if (target.children && Array.isArray(target.children)) {
      target.children.forEach((item) => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
    }
  }
}

function listTree(data, tree, parentId) {
  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (item.parent_id === parentId) {
        const child = {
          ...item,
          children: []
        }
        listTree(data, child.children, item.id)
        if (child.length <= 0) delete child.children
        tree.push(child)
      }
    })
  }
}
function deepTrevel(menus, func) {
  if (Array.isArray(menus)) {
    menus.forEach((item) => {
      deepTrevel(item, func)
    })
  } else if (menus.children && menus.children.length > 0) {
    deepTrevel(menus.children, func)
  } else {
    func(menus)
  }
}

export default loadRouter
