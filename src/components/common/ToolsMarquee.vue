<script setup>
import { computed } from 'vue'
import { tools } from '../../data/tools'

// Duplicate the list so the -50% translateX loop is seamless
const track = computed(() => [...tools, ...tools])
</script>

<template>
  <div class="tools-strip">
    <div class="label"><b>Daily drivers</b>Tools I work with</div>
    <div class="tool-track-mask">
      <div class="tool-track">
        <div v-for="(tool, i) in track" :key="tool.label + i" class="tool-pill">
          <i :class="tool.icon"></i> {{ tool.label }}
        </div>
      </div>
    </div>
  </div>
</template>
