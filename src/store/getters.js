import variables from '@/styles/variables.scss'
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
const getters = {
  token: (state) => state.user.token,
  cssVar: (state) => variables,
  slidebarList: (state) => {
    const { sidebarLevel, stageConfig } = state

    function deepGetSiderbar(target, level = 3) {
      if (Array.isArray(target)) {
        const acc = target.map((item) => deepGetSiderbar(item, level - 1))
        return acc.filter((item) => item !== null)
      }
      if (!target.isNav) {
        return null
      }
      if (target.type === 'folder' && level !== 0) {
        const sideConfig = {}
        sideConfig.name = target.name
        sideConfig.title = target.title
        sideConfig.icon = target.icon
        sideConfig.path = target.route
        sideConfig.children = target.children.map((item) =>
          deepGetSiderbar(item, level - 1)
        )
        sideConfig.children = sideConfig.children.filter(
          (item) => item !== null
        )
        return sideConfig
      }
      if (target.type === 'view') {
        const sideConfig = {}
        sideConfig.name = target.name
        sideConfig.title = target.title
        sideConfig.icon = target.icon
        sideConfig.path = target.route
        return sideConfig
      }
      return null
    }
    return deepGetSiderbar(stageConfig, sidebarLevel)
  },
  getStageInfo: (state, name) => {
    const { stageConfig } = state
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
      const storageInfo = findStage(stageConfig, name)
      if (storageInfo) {
        cache[name] = storageInfo
      }
      return storageInfo
    }
  },
  stageList: (state) => {
    const { stageConfig } = state
    const list = {}
    deepTravel(stageConfig, (item) => {
      list[item.name] = item
    })
    return list
  },
  language: (state) => state.app.language
}
export default getters
