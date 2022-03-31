const commonRouters = [{
  menutype: 3,
  component: 'views/userinfo-setting/index',
  title: '个人中心',
  path: '/user/userinfo-setting',
  is_nav: 0,
  name: 'log-manager',
  icon: 'setting'
},
{
  menutype: 3,
  path: '/profile',
  component: 'views/profile',
  title: '关于我们',
  is_nav: 0,
  icon: '',
  name: 'profile'
}]

export default commonRouters
