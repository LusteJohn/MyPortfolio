<script setup>
import { computed, ref } from 'vue'
import ProjectCard from '../components/work/ProjectCard.vue'
import GitHubActivity from '../components/home/GitHubActivity.vue'
import {
  projects,
  featuredProjectIds,
  projectStatusMeta,
  projectCounts
} from '../data/projects'
import { useNavigation } from '../composables/useNavigation'
import { useProjectModal } from '../composables/useProjectModal'

const { goTo } = useNavigation()
const { open } = useProjectModal()

const filters = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'offline', label: 'Offline-first', match: (p) => p.traits?.includes('offline-first') },
  { key: 'mobile', label: 'Mobile', match: (p) => p.platform === 'mobile' },
  { key: 'web', label: 'Web', match: (p) => p.platform === 'web' },
  { key: 'ai', label: 'AI', match: (p) => p.traits?.includes('ai') },
  { key: 'client', label: 'Client work', match: (p) => p.context?.some((c) => /Capstone|OJT|Small business|Client|Local build/.test(c)) }
]

const activeFilter = ref('all')
const localOpen = ref(false)

const active = computed(() => filters.find((f) => f.key === activeFilter.value) || filters[0])

function matches(p) {
  if (active.value.key === 'all') return true
  return active.value.match(p)
}

const featured = computed(() =>
  projects.filter((p) => featuredProjectIds.includes(p.id)).filter(matches)
)

const regular = computed(() =>
  projects.filter((p) => !featuredProjectIds.includes(p.id) && p.status !== 'local').filter(matches)
)

const local = computed(() => projects.filter((p) => p.status === 'local').filter(matches))

/** Per-filter counts so the chips show what's behind them. */
const counts = computed(() =>
  filters.reduce((acc, f) => {
    acc[f.key] = projects.filter(f.match).length
    return acc
  }, {})
)

const summary = computed(() => {
  const c = projectCounts()
  const parts = [
    `${c.shipped} live`,
    `${c.building} in progress`,
    `${c.local} local`
  ]
  return { text: parts.join(' · '), total: c.total }
})

function statusChip(p) {
  return projectStatusMeta[p.status]?.chip || p.status
}

function stack(p) {
  return (p.tools || []).slice(0, 4).join(', ')
}
</script>

<template>
  <section id="work">
    <div class="tip-pill"><i class="fa-solid fa-hand-pointer"></i> Open any card for screenshots, stack, and outcome</div>
    <div class="topbar">
      <div>
        <div class="eyebrow">Projects</div>
        <h1>Shipped, building, and running local.</h1>
        <p class="sub">Deployed apps you can open today, systems still in active development, and local builds that run on the machine they were made for.</p>
        <p class="count-line">
          <span class="count-pill is-shipped">{{ summary.text }}</span>
          <span class="count-total">{{ summary.total }} projects total</span>
        </p>
      </div>
      <div class="hero-side">
        <GitHubActivity />
      </div>
    </div>

    <div class="filter-row" role="group" aria-label="Filter projects">
      <button
        v-for="f in filters"
        :key="f.key"
        type="button"
        class="filter-chip"
        :class="{ active: activeFilter === f.key }"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
        <b>{{ counts[f.key] }}</b>
      </button>
    </div>

    <template v-if="featured.length">
      <h2 class="project-section-title">
        <span class="status-dot-sm status-dot-sm--shipped"></span> Featured
      </h2>
      <div class="featured-grid">
        <ProjectCard v-for="(p, i) in featured" :key="p.id" :project="p" featured :reveal-index="i" />
      </div>
    </template>

    <template v-if="regular.length">
      <h2 class="project-section-title">
        <span class="status-dot-sm status-dot-sm--shipped"></span> Everything else
      </h2>
      <div class="project-grid">
        <ProjectCard v-for="(p, i) in regular" :key="p.id" :project="p" :reveal-index="i" />
      </div>
    </template>

    <template v-if="local.length">
      <div class="local-block">
        <button type="button" class="local-toggle" :aria-expanded="localOpen" @click="localOpen = !localOpen">
          <span>
            <i class="fa-solid fa-hard-drive"></i>
            Local — not yet published
            <b>{{ local.length }}</b>
          </span>
          <i class="fa-solid fa-chevron-down" :class="{ open: localOpen }"></i>
        </button>
        <p class="local-note">Private and client systems that run on-site rather than on a public URL.</p>

        <ul v-show="localOpen" class="local-list">
          <li v-for="p in local" :key="p.id">
            <button type="button" class="local-row" @click="open(p)">
              <span class="local-name">
                {{ p.title }}
                <span class="local-status">{{ statusChip(p) }}</span>
              </span>
              <span class="local-desc">{{ p.caseStudy || p.summary }}</span>
              <span class="local-stack">{{ stack(p) }}</span>
            </button>
          </li>
        </ul>
      </div>
    </template>

    <div v-if="!featured.length && !regular.length && !local.length" class="empty-note">
      No projects match this filter yet.
    </div>

    <div class="work-cta">
      <p>Need something like this built?</p>
      <button type="button" class="cta-pill" @click="goTo('contact')">
        Get in touch <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </section>
</template>
