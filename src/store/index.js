import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'
import state from './state'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  localStorage: window.localStorage,
  reducer: (state) => ({
    user: {
      loginIn: state.user.loginIn,
      isCollapse: state.user.isCollapse
    },
    app: {
      histories: state.app.histories
    }
  })
  // modules: ['user']
})
export default createStore({
  modules: {
    user,
    app
  },
  getters,
  state,
  plugins: [vuexLocal.plugin]
})
