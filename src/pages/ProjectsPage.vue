<script setup>
import { computed } from 'vue'
import ProjectCard from '../components/work/ProjectCard.vue'
import { projects } from '../data/projects'

const shipped = computed(() => projects.filter((p) => p.status === 'shipped'))
const building = computed(() => projects.filter((p) => p.status === 'building'))
const local = computed(() => projects.filter((p) => p.status === 'local'))
</script>

<template>
  <section id="work">
    <div class="tip-pill"><i class="fa-solid fa-hand-pointer"></i> Click a card to open it</div>
    <div class="topbar">
      <div>
        <div class="eyebrow">Projects</div>
        <h1>Real apps you can open.</h1>
        <p class="sub">Everything here shipped as a working app — from capstone builds to client requests, sketch to release.</p>
      </div>
    </div>

    <div class="project-section">
      <h2 class="project-section-title">
        <span class="status-dot-sm status-dot-sm--shipped"></span> Shipped &amp; live
      </h2>
      <div class="project-grid">
        <ProjectCard v-for="(p, i) in shipped" :key="p.id" :project="p" :reveal-index="i" />
      </div>
    </div>

    <div class="project-section">
      <h2 class="project-section-title">
        <span class="status-dot-sm status-dot-sm--building"></span> Currently building
      </h2>
      <div class="project-grid">
        <ProjectCard v-for="(p, i) in building" :key="p.id" :project="p" :reveal-index="i" />
      </div>
    </div>

    <div class="project-section">
      <h2 class="project-section-title">
        <span class="status-dot-sm status-dot-sm--local"></span> Local — not yet published
      </h2>
      <div class="project-grid">
        <ProjectCard v-for="(p, i) in local" :key="p.id" :project="p" :reveal-index="i" />
      </div>
    </div>
  </section>
</template>