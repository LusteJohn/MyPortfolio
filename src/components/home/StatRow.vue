<script setup>
import { stats } from '../../data/stats'
import { useCounter } from '../../composables/useCounter'
import { useNavigation } from '../../composables/useNavigation'

const { goTo } = useNavigation()

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
  <button type="button" class="stat-link" @click="goTo('work')">
    See all projects <i class="fa-solid fa-arrow-right"></i>
  </button>
</template>
