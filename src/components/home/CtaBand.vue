<script setup>
import BentoCard from '../common/BentoCard.vue'
import { useNavigation } from '../../composables/useNavigation'

const { goTo } = useNavigation()
</script>

<template>
  <div class="cta-wrap">
    <BentoCard icon="fa-solid fa-paper-plane" eyebrow="Open to roles">
      <h2 class="cta-title">Let's talk.</h2>
      <p class="cta-copy">
        Freelance, contract, or full-time — if you're building something that has to keep working, I'd like to hear about it.
      </p>
      <button type="button" class="cta-pill" @click="goTo('contact')">
        Get in touch <i class="fa-solid fa-arrow-right"></i>
      </button>
    </BentoCard>
  </div>
</template>

<style scoped>
.cta-wrap {
  margin: 26px 0 8px;
}

/* match the bento card's proportions and drop the icon's offset */
.cta-wrap :deep(.b-card) {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px;
}

.cta-wrap :deep(.b-icon) {
  display: none;
}

.cta-title {
  font-family: 'Pixelify Sans', sans-serif;
  font-size: clamp(1.6rem, 3.4vw, 2.2rem);
  font-weight: 700;
  letter-spacing: .01em;
  line-height: 1.15;
  color: var(--ink);
  margin: 0;
}

.cta-copy {
  font-family: 'Inter', sans-serif;
  font-size: .95rem;
  line-height: 1.5;
  color: #3A3530;
  margin: 0;
  max-width: 52ch;
}

.cta-pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  background: var(--ink);
  color: #fff;
  border: 2px solid var(--ink);
  border-radius: 0;
  padding: 10px 18px;
  font-family: 'Pixelify Sans', sans-serif;
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
}

.cta-pill:hover {
  transform: translate(-2px, -2px);
  background: #000;
  box-shadow: 3px 3px 0 rgba(238, 123, 51, .55);
}
</style>
