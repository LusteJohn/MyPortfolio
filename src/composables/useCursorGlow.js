import { onMounted, onUnmounted } from 'vue'

let raf = null
let pending = null
let active = null

function clearActive() {
  if (active) active.style.removeProperty('--glow-o')
  active = null
}

function update() {
  raf = null
  if (!pending) return

  const target = pending.target
  const section = target instanceof Element ? target.closest('section') : null

  if (!section) {
    clearActive()
    return
  }

  const rect = section.getBoundingClientRect()
  const x = pending.clientX - rect.left
  const y = pending.clientY - rect.top

  // only pay the style write when the section changes
  if (active !== section) {
    clearActive()
    active = section
    section.style.setProperty('--glow-o', '1')
  }

  section.style.setProperty('--glow-x', `${x}px`)
  section.style.setProperty('--glow-y', `${y}px`)
}

const options = { passive: true }

function onMove(e) {
  pending = e
  if (raf) return
  raf = requestAnimationFrame(update)
}

function onLeave() {
  pending = null
  clearActive()
}

/**
 * Tracks the pointer and exposes its position per-section through
 * `--glow-x` / `--glow-y` / `--glow-o` custom properties, so CSS can paint
 * a soft glow that follows the cursor inside whatever section is hovered.
 * Call once from a top-level component.
 */
export function useCursorGlow() {
  onMounted(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    window.addEventListener('pointermove', onMove, options)
    document.addEventListener('pointerleave', onLeave)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', onLeave)
    if (raf) cancelAnimationFrame(raf)
    clearActive()
  })
}
