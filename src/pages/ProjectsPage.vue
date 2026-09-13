<script setup>
import ProjectCard from '../components/work/ProjectCard.vue'
import StackList from '../components/work/StackList.vue'
import { projects } from '../data/projects'
</script>

<template>
  <section id="work">
    <div class="tip-pill"><i class="fa-solid fa-hand-pointer"></i> Click a card to open it</div>
    <div class="topbar">
      <div>
        <div class="eyebrow">Projects</div>
        <h1>Real products and systems you can open.</h1>
        <p class="sub">Everything here shipped. Each card is a real build, from first sketch to production.</p>
      </div>
    </div>

    <div class="bento bento-work">
      <ProjectCard
        v-for="(project, i) in projects"
        :key="project.id"
        :project="project"
        :reveal-index="i"
      />
      <StackList />
    </div>
  </section>
</template>
