<script setup>
import { ref } from 'vue'
import profileImage from '../../assets/images/profile.png'
import { useNavigation } from '../../composables/useNavigation'
import { useCommandPalette } from '../../composables/useCommandPalette'
import { socials } from '../../data/social'

const { currentPage, goTo } = useNavigation()
const { open: openCmdk } = useCommandPalette()
const isMobileNavOpen = ref(false)

const navItems = [
  { page: 'home', icon: 'fa-solid fa-house', label: 'Home' },
  { page: 'work', icon: 'fa-solid fa-folder-open', label: 'Projects' },
  { page: 'contact', icon: 'fa-solid fa-envelope', label: 'Contact' }
]

function select(page) {
  goTo(page)
  isMobileNavOpen.value = false
}
</script>

<template>
  <aside class="sidebar">
    <img class="avatar" :src="profileImage" alt="John Mark Luste">
    <div class="name">John Mark Luste <i class="fa-solid fa-circle-check"></i></div>
    <div class="handle">@myDevDesign</div>

    <div class="social-row">
      <a v-for="s in socials" :key="s.label" :href="s.href" :aria-label="s.label">
        <i :class="s.icon"></i>
      </a>
    </div>

    <button class="menu-toggle" aria-label="Toggle menu" @click="isMobileNavOpen = !isMobileNavOpen">
      <i class="fa-solid fa-bars"></i>
    </button>

    <nav class="side-nav" :class="{ open: isMobileNavOpen }">
      <button
        v-for="item in navItems"
        :key="item.page"
        :class="{ active: currentPage === item.page }"
        @click="select(item.page)"
      >
        <i :class="item.icon"></i> {{ item.label }}
      </button>
    </nav>

    <div class="cmdk-trigger" @click="openCmdk">
      <span><i class="fa-solid fa-magnifying-glass"></i>&nbsp; Quick jump</span>
      <kbd>⌘K</kbd>
    </div>

    <div class="sidebar-foot">© 2026 John Mark Luste</div>
  </aside>
</template>
