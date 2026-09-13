import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './assets/main.css'
import { vTilt } from './composables/useTilt'
import { vReveal } from './composables/useReveal'

const app = createApp(App)
app.use(router)
app.directive('tilt', vTilt)
app.directive('reveal', vReveal)
app.mount('#app')
