const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 }
)

/**
 * v-reveal — add to any element to have it fade/slide in the first time
 * it enters the viewport. Stagger the delay by passing an index:
 *   v-reveal="index"
 */
export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const index = typeof binding.value === 'number' ? binding.value : 0
    el.style.transitionDelay = Math.min(index * 60, 360) + 'ms'
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  }
}
