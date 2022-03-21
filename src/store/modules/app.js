import { getItem, setItem } from '@/utils/storage'
import * as types from '../mutationType'
import { LANG } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    language: getItem(LANG) || 'zh',
    histories: [] // 用户打开的多窗口
  }),
  mutations: {
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    [types.SET_HISTORIES](state, payload) {
      state.histories = [...payload]
    }
  },
  getters: {
    getHistories:
      (state) =>
      (userMenus = {}) => {
        // 确保每次缓存的窗口都是在用户的授权菜单中
        const histories = []
        state.histories.forEach((item) => {
          let findResult
          if (item.path) {
            if (getStageByRoute(userMenus, item.path)) findResult = item
          }
          if (findResult && findResult.path) histories.push(findResult)
        })
        return histories
      }
  }
}

// const getStageByStageId = (userMenus, name) => userMenus[name]

const getStageByRoute = (userMenus, path) => {
  const result = Object.getOwnPropertySymbols(userMenus).find(
    (key) => userMenus[key].path === path
  )
  return result
}
