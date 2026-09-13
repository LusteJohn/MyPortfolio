import { ref, onMounted, onUnmounted } from 'vue'

export function useTypewriter(words, options = {}) {
  const { typeSpeed = 70, deleteSpeed = 40, pause = 1400, betweenWords = 300 } = options
  const text = ref('')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let ri = 0
  let ci = 0
  let deleting = false
  let timer = null

  function step() {
    const word = words[ri]
    ci += deleting ? -1 : 1
    text.value = word.slice(0, ci)

    let delay = deleting ? deleteSpeed : typeSpeed
    if (!deleting && ci === word.length) {
      delay = pause
      deleting = true
    } else if (deleting && ci === 0) {
      deleting = false
      ri = (ri + 1) % words.length
      delay = betweenWords
    }
    timer = setTimeout(step, delay)
  }

  onMounted(() => {
    if (prefersReduced || !words.length) {
      text.value = words[0] || ''
      return
    }
    step()
  })
  onUnmounted(() => clearTimeout(timer))

  return { text }
}
