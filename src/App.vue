<script setup>
import TheSidebar from './components/layout/TheSidebar.vue'
import CommandPalette from './components/common/CommandPalette.vue'
import ProjectModal from './components/common/ProjectModal.vue'
import PixelCursor from './components/common/PixelCursor.vue'
import ResumeModal from './components/common/ResumeModal.vue'
import CtaBand from './components/home/CtaBand.vue'
import { useProjectModal } from './composables/useProjectModal'
import { useCommandPaletteShortcut } from './composables/useCommandPalette'
import { useCursorGlow } from './composables/useCursorGlow'
import { useNavigation } from './composables/useNavigation'
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const { close: closeModal } = useProjectModal()

// Registers the global ⌘K shortcut; Esc closes both the palette and the project modal
useCommandPaletteShortcut(closeModal)

// Soft glow that follows the pointer inside each section
useCursorGlow()

const { goTo } = useNavigation()
const route = useRoute()
const pageMeta = {
  home: {
    title: 'John Mark Luste — Web & System Developer',
    description: 'John Mark Luste builds practical offline-first web and system applications.'
  },
  work: {
    title: 'Projects — John Mark Luste',
    description: 'Explore shipped, in-progress, and local projects by John Mark Luste.'
  },
  contact: {
    title: 'Contact — John Mark Luste',
    description: 'Get in touch with John Mark Luste for web, system, and offline-first application work.'
  }
}

function updateMeta(name = route.name || 'home') {
  const meta = pageMeta[name] || pageMeta.home
  document.title = meta.title
  let description = document.querySelector('meta[name="description"]')
  if (!description) {
    description = document.createElement('meta')
    description.name = 'description'
    document.head.appendChild(description)
  }
  description.content = meta.description
}

watch(() => route.name, updateMeta, { immediate: true })

function onShortcutNavigate(e) {
  goTo(e.detail)
}
onMounted(() => window.addEventListener('shortcut-navigate', onShortcutNavigate))
onUnmounted(() => window.removeEventListener('shortcut-navigate', onShortcutNavigate))
</script>

<template>
  <TheSidebar />

  <main class="content">
    <router-view />
    <CtaBand />
  </main>

  <footer class="credit">© 2026 John Mark Luste.</footer>

  <CommandPalette />
  <ProjectModal />
  <ResumeModal keyboard :visible="false" show-download source="keyboard" />
  <PixelCursor />
</template>
