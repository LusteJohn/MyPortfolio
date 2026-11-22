<script setup>
import { useNavigation } from '../composables/useNavigation'

const { goTo } = useNavigation()
</script>

<template>
  <section id="not-found" class="notfound">
    <div class="notfound-code">404</div>
    <div class="eyebrow">Page not found</div>
    <h1>That page doesn't exist.</h1>
    <p>
      The link may be old, or the page moved. The projects and contact pages are
      the useful ones.
    </p>
    <div class="cta-row">
      <button type="button" class="cta-pill" @click="goTo('home')">
        Back to home <i class="fa-solid fa-arrow-right"></i>
      </button>
      <button type="button" class="cta-pill cta-pill--ghost" @click="goTo('work')">
        View projects
      </button>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  padding: 40px 0 60px;
  max-width: 44ch;
}

.notfound-code {
  font-family: 'Silkscreen', monospace;
  font-size: clamp(3rem, 12vw, 6rem);
  line-height: 1;
  color: var(--orange);
  margin-bottom: 18px;
}

.notfound h1 {
  font-family: 'Pixelify Sans', sans-serif;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  margin: 6px 0 10px;
  color: var(--ink);
}

.notfound p {
  font-family: 'Inter', sans-serif;
  font-size: .98rem;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;
}</style>