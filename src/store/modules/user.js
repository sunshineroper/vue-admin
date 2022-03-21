import * as types from '../mutationType'
const deepTravel = (obj, fuc) => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      deepTravel(item, fuc)
    })
    return
  }
  if (obj.children && obj.children.length) {
    deepTravel(obj.children, fuc)
  }
  if (obj.name) {
    fuc(obj)
  }
}
export default {
  namespaced: true,
  state: () => ({
    isCollapse: false, // 左侧是否折叠
    loginIn: false,
    user: {},
    permisisons: [], // 每个用户的权限
    userMenus: [],
    userTreeMenus: []
  }),
  mutations: {
    [types.SET_LOGININ](state, payload) {
      state.loginIn = payload
    },
    [types.SET_USER_PERMISSIONS](state, payload) {
      state.permisisons = payload
    },
    [types.SET_USER_MENUS](state, payload) {
      state.userMenus = payload
    },
    [types.SET_USER_TREE_MENUS](state, payload) {
      state.userTreeMenus = payload
    },
    [types.SET_USER](state, payload) {
      state.user = payload
    },
    [types.SET_ISCOLLAPSE](state, playload) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    setUserAndUpdate: ({ commit }, user) => {
      commit(types.SET_LOGININ, true)
      commit(types.SET_USER, user)
    },
    loginOut: ({ commit }) => {
      localStorage.clear()
      commit(types.SET_LOGININ, false)
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getStageInfo: (state, name) => {
      const { userTreeMenus } = state
      const cache = {}
      const findStage = (stages, name) => {
        let result
        if (Array.isArray(stages)) {
          for (let i = 0, len = stages.length; i < len; i++) {
            result = findStage(stages[i], name)
            if (result) {
              break
            }
          }
          return result
        }
        if (stages.children && stages.children.length > 0) {
          result = findStage(stages.children, name)
          if (result) {
            result.unshift(stages)
          }
          return result
        }
        if (stages.name === name) {
          return [stages]
        }
        return false
      }
      return (name) => {
        // 避免重复递归查询,缓存上次的结果
        if (cache[name]) {
          return cache[name]
        }
        const storageInfo = findStage(userTreeMenus, name)
        if (storageInfo) {
          cache[name] = storageInfo
        }
        return storageInfo
      }
    },
    slidebarList: (state) => {
      const { sidebarLevel = 3, userTreeMenus } = state
      function deepGetSiderbar(target, level = 3) {
        if (Array.isArray(target)) {
          const acc = target.map((item) => deepGetSiderbar(item, level - 1))
          return acc.filter((item) => item !== null)
        }
        if (!target.is_nav) {
          return null
        }
        if (target.menutype === 1 && level !== 0) {
          const sideConfig = {}
          sideConfig.name = target.name
          sideConfig.title = target.title
          sideConfig.icon = target.icon
          sideConfig.path = target.path
          sideConfig.children = target.children.map((item) =>
            deepGetSiderbar(item, level - 1)
          )
          sideConfig.children = sideConfig.children.filter(
            (item) => item !== null
          )
          return sideConfig
        }
        if (target.menutype === 3) {
          const sideConfig = {}
          sideConfig.name = target.name
          sideConfig.title = target.title
          sideConfig.icon = target.icon
          sideConfig.path = target.path
          return sideConfig
        }
        return null
      }
      return deepGetSiderbar(userTreeMenus, sidebarLevel)
    },
    stageList: (state) => {
      const { userTreeMenus } = state
      const list = {}
      deepTravel(userTreeMenus, (item) => {
        const name =
          typeof item.name === 'symbol' ? item.name : Symbol(item.name)
        list[name] = item
      })
      return list
    },
    getCollapse: (state) => {
      return state.isCollapse
    }
  }
}
