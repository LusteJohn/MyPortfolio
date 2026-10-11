<script setup>
import TheSidebar from './components/layout/TheSidebar.vue'
import CommandPalette from './components/common/CommandPalette.vue'
import ProjectModal from './components/common/ProjectModal.vue'
import PixelCursor from './components/common/PixelCursor.vue'
import { useProjectModal } from './composables/useProjectModal'
import { useCommandPaletteShortcut } from './composables/useCommandPalette'
import { useCursorGlow } from './composables/useCursorGlow'

const { close: closeModal } = useProjectModal()

// Registers the global ⌘K shortcut; Esc closes both the palette and the project modal
useCommandPaletteShortcut(closeModal)

// Soft glow that follows the pointer inside each section
useCursorGlow()
</script>

<template>
  <TheSidebar />

  <main class="content">
    <router-view />
  </main>

  <footer class="credit">© 2026 John Mark Luste.</footer>

  <CommandPalette />
  <ProjectModal />
  <PixelCursor />
</template>
