<script setup>
import BentoCard from '../common/BentoCard.vue'
import MockBrowser from '../common/MockBrowser.vue'
import MockBlueprint from '../common/MockBlueprint.vue'
import MockStack from '../common/MockStack.vue'
import MockPhones from '../common/MockPhones.vue'
import { useProjectModal } from '../../composables/useProjectModal'

const props = defineProps({
  project: { type: Object, required: true },
  revealIndex: { type: Number, default: 0 }
})

const mockComponents = {
  browser: MockBrowser,
  blueprint: MockBlueprint,
  stack: MockStack,
  phones: MockPhones
}

const { open } = useProjectModal()
</script>

<template>
  <BentoCard
    :area="project.area"
    :icon="project.icon"
    :eyebrow="project.eyebrow"
    clickable
    :reveal-index="revealIndex"
    @click="open(project)"
  >
    <h3>{{ project.title }}</h3>
    <p>{{ project.summary }}</p>

    <component :is="mockComponents[project.mock]" v-if="mockComponents[project.mock]" />
    <div v-else-if="project.mock === 'tags'" class="tag-row">
      <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
    </div>
  </BentoCard>
</template>
