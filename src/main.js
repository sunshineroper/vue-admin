import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import 'cropperjs/dist/cropper.css'
import 'element-plus/dist/index.css'
import '@/styles/element-ui.scss'
import installCompoent from '@/components'
import installFilter from '@/filters'
import installDirectives from '@/directives'

const app = createApp(App)
installFilter(app)
installDirectives(app)
installCompoent(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
