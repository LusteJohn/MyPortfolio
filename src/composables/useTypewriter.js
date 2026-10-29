import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Types and deletes each word in turn.
 * - Starts with the first word already shown (no empty flash / layout shift)
 * - Cleans up its timer on unmount
 * - Respects prefers-reduced-motion by swapping words without typing
 */
export function useTypewriter(
  words,
  { typeMs = 70, deleteMs = 35, holdMs = 1800, gapMs = 300 } = {}
) {
  const text = ref(words[0] ?? '')
  let timer = null
  let index = 0
  let deleting = true // first word is already visible, so hold, then delete

  const schedule = (ms, fn) => { timer = setTimeout(fn, ms) }

  function step() {
    const word = words[index]

    if (!deleting) {
      text.value = word.slice(0, text.value.length + 1)
      if (text.value === word) {
        deleting = true
        return schedule(holdMs, step)
      }
      return schedule(typeMs, step)
    }

    text.value = word.slice(0, Math.max(0, text.value.length - 1))
    if (text.value === '') {
      deleting = false
      index = (index + 1) % words.length
      return schedule(gapMs, step)
    }
    return schedule(deleteMs, step)
  }

  onMounted(() => {
    if (words.length < 2) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Plain swap every few seconds, no per-letter animation
      timer = setInterval(() => {
        index = (index + 1) % words.length
        text.value = words[index]
      }, 3000)
      return
    }
    schedule(holdMs, step)
  })

  onBeforeUnmount(() => {
    clearTimeout(timer)
    clearInterval(timer)
  })

  return { text }
}