import { ref, onMounted } from 'vue'

/**
 * Animates a number from 0 up to `target` on mount.
 * @param {number} target - final value
 * @param {object} opts - { duration, decimals, divide, suffix }
 */
export function useCounter(target, opts = {}) {
  const { duration = 1100, decimals = 0, divide = 1, suffix = '' } = opts
  const display = ref((0).toFixed(decimals) + suffix)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onMounted(() => {
    if (prefersReduced) {
      display.value = (target / divide).toFixed(decimals) + suffix
      return
    }
    const start = performance.now()
    function tick(now) {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      display.value = ((target * eased) / divide).toFixed(decimals) + suffix
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })

  return { display }
}
