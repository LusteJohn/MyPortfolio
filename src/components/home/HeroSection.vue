<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import StatRow from './StatRow.vue'
import { useTypewriter } from '../../composables/useTypewriter'
import { CONTACT_EMAIL } from '../../data/commands'

const roles = ['Product Engineer', 'Design Systems Lead', 'Frontend Architect', 'Accessibility Advocate']
const { text: typedRole } = useTypewriter(roles)
</script>

<template>
  <div class="topbar">
    <div>
      <StatusBadge />
      <div class="eyebrow"><span class="typed-role">{{ typedRole }}</span></div>
      <h1>Build it once. Make it work anywhere.</h1>
      <p class="sub">Freelancing across personal projects, capstone builds, and client customizations — apps built offline-first, so the work keeps running whether or not the connection does.</p>
      <StatRow />
    </div>
    <a class="cta-pill" :href="`mailto:${CONTACT_EMAIL}`">Get in touch <i class="fa-solid fa-arrow-right"></i></a>
  </div>
</template>
