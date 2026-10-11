<script setup>
import BentoCard from '../common/BentoCard.vue'
import ProjectIllustration from './ProjectIllustration.vue'
import { useProjectModal } from '../../composables/useProjectModal'
import { statusMeta } from '../../data/projectStatus'

defineProps({
  project: { type: Object, required: true },
  featured: { type: Boolean, default: false },
  revealIndex: { type: Number, default: 0 }
})

const { open } = useProjectModal()
</script>

<template>
  <BentoCard
    :icon="project.icon"
    clickable
    class="project-card"
    :class="{ 'is-featured': featured }"
    :reveal-index="revealIndex"
    @click="open(project)"
  >
    <div class="card-flags">
      <div class="status-pill" :class="statusMeta[project.status]?.class">
        {{ statusMeta[project.status]?.label }}
      </div>
      <div v-if="project.offline" class="offline-badge">
        <span class="offline-dot" aria-hidden="true"></span> Works offline
      </div>
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

<style scoped>
.project-card {
  height: 100%;
}

/* featured cards get a screenshot instead of the generic illustration */
.card-flags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
