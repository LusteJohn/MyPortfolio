<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useCommandPalette } from '../../composables/useCommandPalette'
import { useNavigation } from '../../composables/useNavigation'
import { commands, CONTACT_EMAIL } from '../../data/commands'

const { state, close } = useCommandPalette()
const { goTo } = useNavigation()

const query = ref('')
const inputEl = ref(null)

const filtered = computed(() =>
  commands.filter((c) => c.label.toLowerCase().includes(query.value.toLowerCase()))
)

watch(
  () => state.isOpen,
  async (isOpen) => {
    if (isOpen) {
      query.value = ''
      await nextTick()
      inputEl.value?.focus()
    }
  }
)

function runCommand(cmd) {
  switch (cmd.type) {
    case 'page':
      goTo(cmd.target)
      break
    case 'copyEmail':
      navigator.clipboard?.writeText(CONTACT_EMAIL).catch(() => {})
      break
    case 'resume':
      alert('Add your résumé link here.')
      break
    case 'link':
      window.open(cmd.target, '_blank')
      break
  }
  close()
}
</script>

<template>
  <div v-if="state.isOpen" class="cmdk-backdrop" @click.self="close">
    <div class="cmdk-panel">
      <div class="cmdk-input-row">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          ref="inputEl"
          v-model="query"
          type="text"
          placeholder="Jump to a page or action…"
          autocomplete="off"
        >
      </div>
      <div class="cmdk-list">
        <div
          v-for="(cmd, i) in filtered"
          :key="cmd.label"
          class="cmdk-item"
          :class="{ hi: i === 0 }"
          @click="runCommand(cmd)"
        >
          <i :class="cmd.icon"></i>
          <span>{{ cmd.label }}</span>
          <span class="cmdk-sub">{{ cmd.sub }}</span>
        </div>
        <div v-if="!filtered.length" class="cmdk-item" style="color:var(--muted)">No matches</div>
      </div>
    </div>
  </div>
</template>
