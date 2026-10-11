<script setup>
import { stats, statsNote } from '../../data/stats'
import { useCounter } from '../../composables/useCounter'

const items = stats.map((s) => ({
  ...s,
  note: s.note || '',
  ...useCounter(s.count, { decimals: s.decimals || 0, divide: s.divide || 1, suffix: s.suffix || '' })
}))
</script>

<template>
  <div class="stat-row">
    <div v-for="item in items" :key="item.label" class="stat-item">
      <b>{{ item.display }}</b>
      <span class="stat-label">{{ item.label }}</span>
      <span class="stat-note">{{ item.note }}</span>
    </div>
  </div>
  <p class="stat-foot">{{ statsNote }}</p>
</template>
