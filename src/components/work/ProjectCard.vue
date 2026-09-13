<script setup>
import BentoCard from '../common/BentoCard.vue'
import ProjectIllustration from './ProjectIllustration.vue'
import { useProjectModal } from '../../composables/useProjectModal'
import { statusMeta } from '../../data/projectStatus'

defineProps({
  project: { type: Object, required: true },
  revealIndex: { type: Number, default: 0 }
})

const { open } = useProjectModal()
</script>

<template>
  <BentoCard :icon="project.icon" clickable :reveal-index="revealIndex" @click="open(project)">
    <div class="status-pill" :class="statusMeta[project.status]?.class">
      {{ statusMeta[project.status]?.label }}
    </div>
    <h3>{{ project.title }}</h3>
    <p>{{ project.summary }}</p>
    <div class="illus-frame illus-frame--sm">
      <ProjectIllustration :id="project.id" />
    </div>
    <div class="tag-row">
      <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
    </div>
  </BentoCard>
</template>