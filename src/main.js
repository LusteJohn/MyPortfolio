import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './assets/main.css'
import { vTilt } from './composables/useTilt'
import { vReveal } from './composables/useReveal'
import { initTheme } from './composables/useTheme'

initTheme()
const app = createApp(App)
app.use(router)
app.directive('tilt', vTilt)
app.directive('reveal', vReveal)
app.mount('#app')

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
}
