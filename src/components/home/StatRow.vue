<script setup>
import { stats } from '../../data/stats'
import { useCounter } from '../../composables/useCounter'

const items = stats.map((s) => ({
  ...s,
  ...useCounter(s.count, { decimals: s.decimals || 0, divide: s.divide || 1, suffix: s.suffix || '' })
}))
</script>

<template>
  <div class="stat-row">
    <div v-for="item in items" :key="item.label" class="stat-item">
      <b>{{ item.display }}</b>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
