import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@purge-icons/generated'

createApp(App).use(router).mount('#app')
