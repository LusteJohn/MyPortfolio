<script setup>
import TheSidebar from './components/layout/TheSidebar.vue'
import CommandPalette from './components/common/CommandPalette.vue'
import ProjectModal from './components/common/ProjectModal.vue'
import { useProjectModal } from './composables/useProjectModal'
import { useCommandPaletteShortcut } from './composables/useCommandPalette'

const { close: closeModal } = useProjectModal()

// Registers the global ⌘K shortcut; Esc closes both the palette and the project modal
useCommandPaletteShortcut(closeModal)
</script>

<template>
  <TheSidebar />

  <main class="content">
    <router-view />
  </main>

  <footer class="credit">© 2026 Maya Delacroix — placeholder content, swap in your own.</footer>

  <CommandPalette />
  <ProjectModal />
</template>
