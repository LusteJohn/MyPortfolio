<script setup>
import { useProjectModal } from '../../composables/useProjectModal'

const { state, close } = useProjectModal()
</script>

<template>
  <div v-if="state.isOpen" class="modal-backdrop" @click.self="close">
    <div class="modal-panel">
      <button class="modal-close" aria-label="Close" @click="close"><i class="fa-solid fa-xmark"></i></button>
      <div class="b-icon"><i :class="state.project?.icon"></i></div>
      <div class="b-eyebrow">{{ state.project?.eyebrow }}</div>
      <h3>{{ state.project?.title }}</h3>
      <p>{{ state.project?.description }}</p>
      <div class="tag-row">
        <span v-for="tag in state.project?.tags" :key="tag">{{ tag }}</span>
      </div>
      <a class="modal-cta" href="#">Visit project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </div>
  </div>
</template>
