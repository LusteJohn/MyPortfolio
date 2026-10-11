<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useProjectModal } from '../../composables/useProjectModal'
import { statusMeta } from '../../data/projectStatus'
import { getProjectImages } from '../../utils/projectImages'
import { getToolIcon } from '../../data/toolIcons'
import { createImageZoom } from '../../utils/imageZoom'

const { state, close } = useProjectModal()

const activeImage = ref(0)
const isLandscape = ref(false)
const images = computed(() => getProjectImages(state.project?.images))
const imageRef = ref(null)
const galleryWrapRef = ref(null)
let zoom = null

watch(
  () => state.isOpen,
  async (open) => {
    if (open) {
      await nextTick()
      initZoom()
    } else if (zoom) {
      zoom.reset()
      zoom = null
    }
  }
)

watch(
  () => state.project,
  () => {
    activeImage.value = 0
    isLandscape.value = false
    zoom?.reset()
  }
)

watch(activeImage, async () => {
  await nextTick()
  zoom?.reset()
})

function initZoom() {
  if (!imageRef.value || !galleryWrapRef.value) return
  if (zoom) {
    zoom.reset()
  } else {
    zoom = createImageZoom(imageRef.value, galleryWrapRef.value)
  }
}

function onImageLoad(e) {
  isLandscape.value = e.target.naturalWidth >= e.target.naturalHeight
  zoom?.reset()
}

/** "Your role / year" line for the header. */
const roleLine = computed(() => {
  const p = state.project
  if (!p) return ''
  const role = p.role || 'Solo'
  return p.year ? `${role} · ${p.year}` : role
})

const detailRows = computed(() => {
  const p = state.project
  if (!p) return []
  return [
    { label: 'Problem', value: p.problem },
    { label: 'What was hard', value: p.challenge },
    { label: 'Outcome', value: p.outcome }
  ].filter((row) => row.value)
})
</script>

<template>
  <div v-if="state.isOpen" class="modal-backdrop" @click.self="close">
    <div
      class="modal-panel"
      :class="{
        'modal-panel--wide': images.length && !isLandscape,
        'modal-panel--tall': images.length && isLandscape
      }"
    >
      <button class="modal-close" aria-label="Close" @click="close"><i class="fa-solid fa-xmark"></i></button>

      <div class="modal-body" :class="{ 'modal-body--landscape': images.length && isLandscape }">
        <!-- Left: all text content -->
        <div class="modal-info">
          <div v-if="!images.length" class="b-icon"><i :class="state.project?.icon"></i></div>

          <span class="modal-status" :class="statusMeta[state.project?.status]?.class">
            {{ statusMeta[state.project?.status]?.label }}
          </span>

          <div v-if="state.project?.offline" class="offline-badge">
            <span class="offline-dot" aria-hidden="true"></span> Works offline
          </div>

          <h3>{{ state.project?.title }}</h3>
          <p class="modal-role">{{ roleLine }}</p>
          <p class="modal-summary">{{ state.project?.summary }}</p>

          <dl class="modal-details">
            <div v-for="row in detailRows" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>

          <!-- context tags are plain text, tech chips are outlined -->
          <div v-if="state.project?.context?.length" class="modal-context">
            <span v-for="c in state.project.context" :key="c">{{ c }}</span>
          </div>

          <div v-if="state.project?.tools?.length" class="modal-tools">
            <div class="modal-tools-label">Stack</div>
            <div class="tool-row">
              <span v-for="tool in state.project.tools" :key="tool" class="tool-pill">
                <i :class="getToolIcon(tool)"></i> {{ tool }}
              </span>
            </div>
          </div>

          <div v-if="state.project?.credentials?.length" class="credential-list">
            <div v-for="credential in state.project.credentials" :key="credential.title" class="credential-item">
              <img v-if="credential.image" :src="credential.image" :alt="`${credential.title} certificate`" class="credential-image">
              <div class="credential-icon" v-else><i class="fa-solid fa-certificate"></i></div>
              <div>
                <h4>{{ credential.title }}</h4>
                <span>{{ credential.issuer }}</span>
                <p>{{ credential.details }}</p>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <a v-if="state.project?.live" :href="state.project.live" target="_blank" rel="noopener noreferrer" class="modal-cta">
              Live demo <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <a v-if="state.project?.code" :href="state.project.code" target="_blank" rel="noopener noreferrer" class="modal-cta modal-cta--ghost">
              Code <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <span v-if="!state.project?.live && !state.project?.code" class="form-note">
              Happy to walk through the code on request.
            </span>
          </div>
        </div>

        <!-- Right (portrait) / top (landscape): image gallery -->
        <div v-if="images.length" class="modal-media">
          <div class="modal-gallery-main-wrap" ref="galleryWrapRef">
            <img
              ref="imageRef"
              :src="images[activeImage]"
              :alt="state.project?.title"
              class="modal-gallery-main"
              @load="onImageLoad"
            >
          </div>
          <div v-if="images.length > 1" class="modal-gallery-thumbs">
            <button
              v-for="(img, i) in images"
              :key="img"
              class="modal-gallery-thumb"
              :class="{ active: i === activeImage }"
              @click="activeImage = i"
            >
              <img :src="img" :alt="`${state.project?.title} screenshot ${i + 1}`">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
