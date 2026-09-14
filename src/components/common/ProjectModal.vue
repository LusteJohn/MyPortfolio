<script setup>
import { ref, computed, watch } from 'vue'
import { useProjectModal } from '../../composables/useProjectModal'
import { statusMeta } from '../../data/projectStatus'
import { getProjectImages } from '../../utils/projectImages'

const { state, close } = useProjectModal()

const activeImage = ref(0)
const isLandscape = ref(false)
const images = computed(() => getProjectImages(state.project?.images))

// Reset back to the first image whenever a new project is opened
watch(() => state.project, () => { activeImage.value = 0 })

// Re-checked every time the displayed image changes (the <img> re-fires @load on src change)
function onImageLoad(e) {
  isLandscape.value = e.target.naturalWidth >= e.target.naturalHeight
}
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

          <div
            v-if="state.project?.status"
            class="status-pill"
            :class="statusMeta[state.project.status]?.class"
          >
            {{ statusMeta[state.project.status]?.label }}
          </div>
          <div v-else class="b-eyebrow">{{ state.project?.eyebrow }}</div>

          <h3>{{ state.project?.title }}</h3>
          <p>{{ state.project?.description }}</p>
          <div class="tag-row">
            <span v-for="tag in state.project?.tags" :key="tag">{{ tag }}</span>
          </div>
          <a v-if="state.project?.status === 'shipped'" class="modal-cta" href="#">
            Visit project <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <span v-else-if="state.project?.status" class="form-note">Not deployed yet — happy to walk through the code on request.</span>
        </div>

        <!-- Right (portrait) / top (landscape): image gallery -->
        <div v-if="images.length" class="modal-media">
          <div class="modal-gallery-main-wrap">
            <img
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