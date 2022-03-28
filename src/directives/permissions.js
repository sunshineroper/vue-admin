import store from '@/store'

function isAllowd(permission, user, permissions = ['impoertUser']) {
  if (user.admin) return true
  if (typeof permission === 'string') return permissions.includes(permission)
  if (permission instanceof Array) {
    return permission.some((auth) => {
      return permissions.indexOf(auth) >= 0
    })
  }
  return false
}
export default {
  beforeMount(el, binding) {
    let type
    let permission
    if (Object.prototype.toString.call(binding.value) === '[object Object]') {
      ; ({ permission } = binding.value)
        ; ({ type } = binding.value)
    } else {
      permission = binding.value
    }
    const { user, permissions } = store.state.user
    const _permissions = []
    Reflect.ownKeys(permissions).forEach((item) => {
      permissions[item].forEach((p) => _permissions.push(p.permission))
    })
    const isAllow = isAllowd(permission, user, _permissions)
    if (!isAllow && permission) {
      if (type) {
        el.disabled = true
        el.style.opacity = 0.4
        el.style.cursor = 'not-allowed'
      } else {
        el.style.display = 'none'
      }
    }
  }
}
