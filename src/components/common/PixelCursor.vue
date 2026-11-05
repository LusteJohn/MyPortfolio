<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const snapped = ref({ x: -999, y: -999 })
const visible = ref(false)
const pressed = ref(false)

const CELL = 8
const SPOT = 72

let frame = null
let pending = null

function onMove(e) {
  pending = e
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = null
    if (!pending) return
    // snap the spotlight to the 8px background grid so it reads as pixel art
    const { clientX: x, clientY: y } = pending
    snapped.value = {
      x: Math.round((x - SPOT / 2) / CELL) * CELL,
      y: Math.round((y - SPOT / 2) / CELL) * CELL
    }
    visible.value = true
  })
}

function onDown() {
  pressed.value = true
}

function onUp() {
  pressed.value = false
}

function onLeave() {
  visible.value = false
}

onMounted(() => {
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
  }
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
  document.removeEventListener('pointerleave', onLeave)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    class="px-cursor"
    :class="[{ 'is-pressed': pressed, 'is-visible': visible }]"
    :style="{
      transform: `translate3d(${snapped.x}px, ${snapped.y}px, 0)`,
      width: `${SPOT}px`,
      height: `${SPOT}px`
    }"
  ></div>
</template>

<style scoped>
.px-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 95;
  pointer-events: none;
  opacity: 0;
  transition: opacity .18s ease;
  will-change: transform;

  /* no outline: just a faint grid tint aligned to the page's 8px grid */
  background:
    linear-gradient(90deg, var(--line) 0 8px, transparent 8px) 0 0 / 100% 8px repeat-y,
    linear-gradient(0deg, var(--line) 0 8px, transparent 8px) 0 0 / 8px 100% repeat-x;
  mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .55) 45%, transparent 72%);
}

.px-cursor.is-visible { opacity: 1; }

.px-cursor.is-pressed {
  transition: transform .08s steps(1, end), opacity .18s ease;
}

@media (prefers-reduced-motion: reduce) {
  .px-cursor { display: none; }
}
</style>
