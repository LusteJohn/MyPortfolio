import { onMounted, onUnmounted, watch, nextTick } from 'vue'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

/**
 * Traps Tab focus inside a container while it is open, moves focus in on open,
 * and restores focus to whatever was focused before on close.
 *
 * Usage:
 *   const panel = ref(null)
 *   useFocusTrap(isOpen, panel)
 *
 * @param {{ value: boolean }} active - reactive open flag
 * @param {{ value: HTMLElement|null }} container - element to trap focus inside
 */
export function useFocusTrap(active, container) {
  let previouslyFocused = null

  function focusables() {
    const el = container.value
    if (!el) return []
    return Array.from(el.querySelectorAll(FOCUSABLE)).filter(
      (node) => node.offsetParent !== null || node === document.activeElement
    )
  }

  function onKeydown(e) {
    if (e.key !== 'Tab') return
    const items = focusables()
    if (!items.length) {
      e.preventDefault()
      return
    }

    const first = items[0]
    const last = items[items.length - 1]
    const current = document.activeElement

    // wrap backwards from the first item, or forwards from the last
    if (e.shiftKey && (current === first || !container.value?.contains(current))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && current === last) {
      e.preventDefault()
      first.focus()
    }
  }

  async function activate() {
    previouslyFocused = document.activeElement
    document.addEventListener('keydown', onKeydown, true)
    document.body.style.overflow = 'hidden'
    await nextTick()
    focusables()[0]?.focus()
  }

  function deactivate() {
    document.removeEventListener('keydown', onKeydown, true)
    document.body.style.overflow = ''
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    previouslyFocused = null
  }

  watch(active, (open) => {
    if (open) activate()
    else deactivate()
  })

  onMounted(() => {
    if (active.value) activate()
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown, true)
    if (active.value) document.body.style.overflow = ''
  })
}