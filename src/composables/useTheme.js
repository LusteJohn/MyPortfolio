import { ref } from 'vue'

const STORAGE_KEY = 'portfolio-theme'
const isDark = ref(false)

function applyTheme(value) {
  isDark.value = value === 'dark'
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
}

export function initTheme() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved || (preferred ? 'dark' : 'light'))
}

export function useTheme() {
  function toggle() {
    const next = isDark.value ? 'light' : 'dark'
    window.localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }

  return { isDark, toggle }
}
