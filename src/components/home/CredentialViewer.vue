<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  index: { type: Number, default: null }
})

const emit = defineEmits(['close'])

const zoomed = ref(false)

const current = ref(Math.max(0, Math.min(props.index ?? 0, props.items.length - 1)))

watch(
  () => props.index,
  async (val) => {
    if (val === null) return
    current.value = Math.max(0, Math.min(val, props.items.length - 1))
    zoomed.value = false
    await nextTick()
  }
)

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}

watch(
  () => props.index,
  (val) => {
    if (val === null) window.removeEventListener('keydown', onKey)
    else window.addEventListener('keydown', onKey)
  },
  { immediate: true }
)

onUnmounted(() => window.removeEventListener('keydown', onKey))

function step(dir) {
  if (!props.items.length) return
  zoomed.value = false
  current.value = (current.value + dir + props.items.length) % props.items.length
}
</script>

<template>
  <Teleport to="body">
    <div v-if="index !== null && items.length" class="cred-viewer-backdrop" @click.self="emit('close')">
      <div class="cred-viewer" role="dialog" aria-modal="true" aria-label="Credential viewer">
        <button class="cred-viewer-close" aria-label="Close viewer" @click="emit('close')">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="cred-viewer-stage" :class="{ 'is-zoomed': zoomed }">
          <button
            v-if="items.length > 1"
            class="cred-nav cred-nav--prev"
            aria-label="Previous credential"
            @click="step(-1)"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>

          <img
            :src="items[current].image"
            :alt="`${items[current].title} certificate`"
            @click="zoomed = !zoomed"
          >

          <button
            v-if="items.length > 1"
            class="cred-nav cred-nav--next"
            aria-label="Next credential"
            @click="step(1)"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div class="cred-viewer-meta">
          <div>
            <b>{{ items[current].title }}</b>
            <span>{{ items[current].issuer }}</span>
          </div>
          <span class="cred-viewer-count">{{ current + 1 }} / {{ items.length }}</span>
        </div>

        <p class="cred-viewer-hint">Click the image to zoom · arrows to browse · Esc to close</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cred-viewer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(23, 27, 36, .82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  pointer-events: auto;
}

.cred-viewer {
  position: relative;
  width: min(760px, 100%);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--card);
  border: 2px solid var(--ink);
  box-shadow: 8px 8px 0 rgba(238, 123, 51, .35);
  padding: 16px;
}

.cred-viewer-close {
  position: absolute;
  top: -14px;
  right: -14px;
  z-index: 3;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: #fff;
  border: 2px solid var(--ink);
  border-radius: 0;
  cursor: pointer;
}

.cred-viewer-close:hover {
  background: var(--orange);
  border-color: var(--orange);
}

.cred-viewer-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-2);
  border: 2px solid var(--line);
  min-height: 220px;
  overflow: hidden;
}

.cred-viewer-stage img {
  max-width: 100%;
  max-height: 62vh;
  object-fit: contain;
  image-rendering: pixelated;
  cursor: zoom-in;
  transition: transform .25s ease;
}

.cred-viewer-stage.is-zoomed img {
  transform: scale(1.6);
  cursor: zoom-out;
}

.cred-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 0;
  color: var(--ink);
  cursor: pointer;
  z-index: 2;
}

.cred-nav:hover {
  background: var(--orange);
  border-color: var(--ink);
  color: #fff;
}

.cred-nav--prev { left: 10px; }
.cred-nav--next { right: 10px; }

.cred-viewer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.cred-viewer-meta b {
  display: block;
  font-family: 'Pixelify Sans', sans-serif;
  font-size: .95rem;
  color: var(--ink);
}

.cred-viewer-meta > div span {
  font-family: 'Inter', sans-serif;
  font-size: .8rem;
  color: var(--muted);
}

.cred-viewer-count {
  font-family: 'Pixelify Sans', sans-serif;
  font-size: .78rem;
  color: var(--muted);
  border: 2px solid var(--line);
  padding: 2px 8px;
}

.cred-viewer-hint {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: .74rem;
  color: var(--muted-2);
}

@media (max-width: 640px) {
  .cred-viewer {
    padding: 12px;
  }

  .cred-viewer-stage img {
    max-height: 52vh;
  }
}
</style>
