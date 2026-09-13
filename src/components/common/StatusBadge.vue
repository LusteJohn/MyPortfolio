<script setup>
defineProps({
  text: { type: String, default: 'Open to new roles' }
})
</script>

<template>
  <div class="status-badge"><span class="status-dot"></span> {{ text }}</div>
</template>
