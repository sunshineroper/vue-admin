import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import '@/styles/element-ui.scss'
import installCompoent from '@/components'
// import './permission'
import i18n from '@/i18n'
import installFilter from '@/filters'
import installDirectives from '@/directives'

const app = createApp(App)
installFilter(app)
installDirectives(app)
installCompoent(app)
app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
