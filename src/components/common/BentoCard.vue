<script setup>
defineProps({
  area: { type: String, default: null },       // CSS grid-area name, e.g. "projects"
  icon: { type: String, default: null },        // Font Awesome class
  eyebrow: { type: String, default: null },
  clickable: { type: Boolean, default: false }, // shows "Open ↗" hint + hand cursor
  revealIndex: { type: Number, default: 0 }
})
defineEmits(['click'])
</script>

<template>
  <div
    class="b-card"
    :class="{ clickable }"
    :style="area ? { gridArea: area } : null"
    v-reveal="revealIndex"
    v-tilt
    :tabindex="clickable ? 0 : undefined"
    @click="clickable && $emit('click')"
    @keydown.enter="clickable && $emit('click')"
  >
    <span v-if="clickable" class="open-hint">Open <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
    <div v-if="icon" class="b-icon"><i :class="icon"></i></div>
    <div v-if="eyebrow" class="b-eyebrow">{{ eyebrow }}</div>
    <slot />
  </div>
</template>
