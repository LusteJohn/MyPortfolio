<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { testimonials } from '../../data/testimonials'

const index = ref(0)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let timer = null

function show(i) {
  index.value = (i + testimonials.length) % testimonials.length
}
function next(manual) {
  show(index.value + 1)
  if (manual) restartTimer()
}
function prev(manual) {
  show(index.value - 1)
  if (manual) restartTimer()
}
function restartTimer() {
  clearInterval(timer)
  if (!prefersReduced) timer = setInterval(() => show(index.value + 1), 5000)
}

onMounted(restartTimer)
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="testi-carousel">
    <div class="testi-slide" :key="index">
      <p class="testi-quote">{{ testimonials[index].quote }}</p>
      <div class="testi-person">
        <span class="testi-avatar" aria-hidden="true">{{ testimonials[index].initial }}</span>
        <span class="testi-who">
          <b>{{ testimonials[index].name }}</b>
          <small>{{ testimonials[index].role }}</small>
        </span>
      </div>
    </div>
  </div>
  <div class="testi-controls">
    <div class="testi-dots">
      <span
        v-for="(t, i) in testimonials"
        :key="t.name"
        :class="{ active: i === index }"
        @click="show(i); restartTimer()"
      ></span>
    </div>
    <div class="testi-arrows">
      <button aria-label="Previous testimonial" @click="prev(true)"><i class="fa-solid fa-chevron-left"></i></button>
      <button aria-label="Next testimonial" @click="next(true)"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </div>
</template>
