import '@vant/touch-emulator'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStyle } from '@/style'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(createStyle())

app.mount('#app')
