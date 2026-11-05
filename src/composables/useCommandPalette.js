import { reactive, onMounted, onUnmounted } from 'vue'

const state = reactive({
  isOpen: false
})

export function useCommandPalette() {
  function open() {
    state.isOpen = true
  }
  function close() {
    state.isOpen = false
  }
  return { state, open, close }
}

/**
 * Registers the global ⌘K / Ctrl+K shortcut and Esc-to-close behaviour.
 * Call once from a top-level component (App.vue).
 */
export function useCommandPaletteShortcut(onEscape) {
  const { open, close } = useCommandPalette()
  const resumeEvent = new CustomEvent('resume-open')

  function handleKeydown(e) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      open()
    }
    if (!e.metaKey && !e.ctrlKey && !e.altKey) {
      const key = e.key.toLowerCase()
      if (key === 'h') window.dispatchEvent(new CustomEvent('shortcut-navigate', { detail: 'home' }))
      if (key === 'p') window.dispatchEvent(new CustomEvent('shortcut-navigate', { detail: 'work' }))
      if (key === 'c') window.dispatchEvent(new CustomEvent('shortcut-navigate', { detail: 'contact' }))
      if (key === 'r') window.dispatchEvent(resumeEvent)
      if (e.key === '/') {
        e.preventDefault()
        open()
      }
    }
    if (e.key === 'Escape') {
      close()
      onEscape?.()
    }
  }

  onMounted(() => document.addEventListener('keydown', handleKeydown))
  onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
}
