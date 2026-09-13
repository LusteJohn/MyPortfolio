<script setup>
defineProps({
  steps: {
    type: Array,
    default: () => ['Token → Component', 'Component → Docs', 'Docs → Release']
  }
})
</script>

<template>
  <div class="mock-blueprint">
    <span v-for="step in steps" :key="step">{{ step }}</span>
  </div>
</template>
