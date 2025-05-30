import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Import toàn bộ icon từ Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

// Đăng ký tất cả icon Element Plus toàn cục
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
