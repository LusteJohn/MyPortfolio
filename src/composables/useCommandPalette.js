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

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      open()
    }
    if (e.key === 'Escape') {
      close()
      onEscape?.()
    }
  }

  onMounted(() => document.addEventListener('keydown', handleKeydown))
  onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
}
