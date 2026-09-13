<script setup>
import { useProjectModal } from '../../composables/useProjectModal'
import { statusMeta } from '../../data/projectStatus'

const { state, close } = useProjectModal()
</script>

<template>
  <div v-if="state.isOpen" class="modal-backdrop" @click.self="close">
    <div class="modal-panel">
      <button class="modal-close" aria-label="Close" @click="close"><i class="fa-solid fa-xmark"></i></button>
      <div class="b-icon"><i :class="state.project?.icon"></i></div>
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
  </div>
</template>