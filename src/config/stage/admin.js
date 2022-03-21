const adminRouters = [
  {
    route: null,
    name: null,
    title: '管理员配置',
    menutype: 1,
    icon: 'setting',
    component: '/views/user',
    is_nav: 1,
    children: [
      {
        menutype: 3,
        component: 'views/group-manager/index',
        title: '分组管理',
        path: '/user/group-manager',
        is_nav: 1,
        name: 'group-manager',
        icon: 'group'
      },
      {
        menutype: 3,
        component: 'views/permission-manager/index',
        title: '权限管理',
        path: '/user/permission-manager',
        is_nav: 1,
        name: 'permission-manager',
        icon: 'authorize'
      },
      {
        menutype: 3,
        component: 'views/user-manager/index',
        title: '用户管理',
        path: '/user/user-manager',
        is_nav: 1,
        icon: 'user',
        name: 'user-manager'
      },
      {
        menutype: 3,
        component: 'views/menu-manager/index',
        title: '菜单管理',
        path: '/menu/menu-manager',
        is_nav: 1,
        name: 'menu-manager',
        icon: 'menu'
      }
    ]
  },
  {
    menutype: 3,
    component: 'views/log-manager/index',
    title: '日志管理',
    path: '/log/log-manager',
    is_nav: 1,
    name: 'log-manager',
    icon: 'yonghurizhi'
  }
]
export default adminRouters
