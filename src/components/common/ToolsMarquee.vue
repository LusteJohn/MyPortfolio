<script setup>
import { computed } from 'vue'
import { toolGroups } from '../../data/tools'

// Each group is its own track; the list is duplicated so the -50% loop is seamless
const tracks = computed(() =>
  toolGroups.map((group) => ({
    name: group.name,
    items: [...group.items, ...group.items]
  }))
)
</script>

<template>
  <div class="tools-strip">
    <div v-for="track in tracks" :key="track.name" class="tools-row">
      <div class="label"><b>{{ track.name }}</b></div>
      <div class="tool-track-mask">
        <div class="tool-track">
          <div v-for="(tool, i) in track.items" :key="tool.label + i" class="tool-pill">
            <i :class="tool.icon"></i> {{ tool.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
