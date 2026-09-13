const enabled =
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  window.matchMedia('(hover: hover)').matches

function handleMove(e) {
  const el = this
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `translateY(-4px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`
}
function handleLeave() {
  this.style.transform = ''
}

/** v-tilt — 3D tilt-on-hover effect, tracking the cursor position over the element. */
export const vTilt = {
  mounted(el) {
    if (!enabled) return
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', handleMove)
    el.removeEventListener('mouseleave', handleLeave)
  }
}
