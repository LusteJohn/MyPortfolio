<script setup>
import { useTheme } from '../../composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" aria-hidden="true"></i>
    <span>{{ isDark ? 'Light' : 'Dark' }}</span>
  </button>
</template>
