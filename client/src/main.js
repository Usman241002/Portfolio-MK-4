import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
export const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
