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
      <h1>Ship it once. Let it scale forever.</h1>
      <p class="sub">Lost polish is never found again. An interface built with care keeps earning trust long after launch.</p>
      <StatRow />
    </div>
    <a class="cta-pill" :href="`mailto:${CONTACT_EMAIL}`">Get in touch <i class="fa-solid fa-arrow-right"></i></a>
  </div>
</template>
