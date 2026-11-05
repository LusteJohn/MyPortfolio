<script setup>
import { computed } from 'vue'
import BentoCard from '../common/BentoCard.vue'
import ProjectIllustration from './ProjectIllustration.vue'
import { useProjectModal } from '../../composables/useProjectModal'
import { statusMeta } from '../../data/projectStatus'
import { getProjectImages } from '../../utils/projectImages'
import { getToolIcon } from '../../data/toolIcons'
import { MAX_TECH_CHIPS } from '../../data/projects'

const props = defineProps({
  project: { type: Object, required: true },
  featured: { type: Boolean, default: false },
  revealIndex: { type: Number, default: 0 }
})

const { open } = useProjectModal()

// First screenshot for the thumbnail; falls back to the pixel illustration
const shots = computed(() => getProjectImages(props.project.images))
const thumbnail = computed(() => shots.value[0] || null)
const tech = computed(() => (props.project.tools || []).slice(0, MAX_TECH_CHIPS))
const isMobile = computed(() => props.project.platform === 'mobile')

function openProject() {
  open(props.project)
}

/** Live/Code buttons stop propagation so the card doesn't also open. */
function external(url) {
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <BentoCard
    :icon="project.icon"
    clickable
    class="pcard"
    :class="{ 'pcard--featured': featured }"
    :reveal-index="revealIndex"
    @click="openProject"
  >
    <!-- thumbnail -->
    <div class="pcard-shot" :class="{ 'pcard-shot--phone': isMobile }">
      <template v-if="thumbnail">
        <span v-if="project.offline" class="pcard-offline"><i></i> Offline</span>
        <img :src="thumbnail" :alt="`${project.title} screenshot`" loading="lazy">
      </template>
      <div v-else class="pcard-fallback">
        <span v-if="project.offline" class="pcard-offline"><i></i> Offline</span>
        <ProjectIllustration :id="project.id" />
      </div>
    </div>

    <h3 class="pcard-title">{{ project.title }}</h3>

    <p class="pcard-outcome">{{ project.summary }}</p>

    <div class="pcard-tech">
      <span v-for="t in tech" :key="t" class="tech-chip"><i :class="getToolIcon(t)"></i> {{ t }}</span>
    </div>

    <div class="pcard-context">
      <span v-for="c in project.context" :key="c" class="pcard-context-item">{{ c }}</span>
    </div>

    <div class="pcard-foot">
      <span class="pcard-meta">
        {{ project.role || 'Solo' }}<template v-if="project.year"> · {{ project.year }}</template>
      </span>
      <span class="pcard-actions" v-if="project.live || project.code">
        <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer" @click.stop>
          Live <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <a v-if="project.code" :href="project.code" target="_blank" rel="noopener noreferrer" @click.stop>
          Code <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </span>
    </div>

    <!-- status is shown once here, not as a chip on every card -->
    <span class="pcard-status" :class="statusMeta[project.status]?.class">
      {{ statusMeta[project.status]?.label }}
    </span>
  </BentoCard>
</template>
