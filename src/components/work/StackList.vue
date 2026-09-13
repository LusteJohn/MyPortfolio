<script setup>
import { miniProjects } from '../../data/projects'
import { useProjectModal } from '../../composables/useProjectModal'

const { open } = useProjectModal()
</script>

<template>
  <div id="sidestack">
    <div
      v-for="mini in miniProjects"
      :key="mini.id"
      class="stack-mini clickable"
      tabindex="0"
      @click="open(mini)"
      @keydown.enter="open(mini)"
    >
      <div class="b-icon"><i :class="mini.icon"></i></div>
      <div>
        <h4>{{ mini.title }}</h4>
        <p>{{ mini.summary }}</p>
      </div>
    </div>
  </div>
</template>
