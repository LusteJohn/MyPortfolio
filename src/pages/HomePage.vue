<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import ToolsMarquee from '../components/common/ToolsMarquee.vue'
import BentoCard from '../components/common/BentoCard.vue'
import TestimonialCarousel from '../components/home/TestimonialCarousel.vue'
import { useProjectModal } from '../composables/useProjectModal'
import { useNavigation } from '../composables/useNavigation'
import { credentials } from '../data/credentials-list.js'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { featuredProjects } from '../data/featuredProjects'
import profileImage from '../assets/images/profile_pixel.jpeg'
import ccsaImage from '../assets/credential/ccsa.png'

const { open } = useProjectModal()
const { goTo } = useNavigation()

const credentialPreview = credentials.credentials.slice(0, 3)

function openCredentials() {
  open(credentials)
}

function openFeatured(p) {
  const project = projects.find((item) => item.id === p.id)
  if (project) open(project)
}
</script>

<template>
  <section id="home">
    <HeroSection />
    <ToolsMarquee />

    <div class="bento bento-home">
      <BentoCard area="projects" icon="fa-solid fa-diagram-project" eyebrow="Projects" :reveal-index="0">
        <h3>Real apps, working offline.</h3>
        <p>Offline-first web and mobile builds — shipped live, with real databases and local storage behind them.</p>
        <ul class="shot-list">
          <li v-for="p in featuredProjects" :key="p.id">
            <button type="button" class="shot" @click="openFeatured(p)">
              <img :src="p.image" :alt="`${p.name} screenshot`" loading="lazy">
              <span class="shot-live"><i class="fa-solid fa-circle"></i> Live</span>
              <span class="shot-meta">
                <b>{{ p.name }}</b>
                <small>{{ p.caption }}</small>
              </span>
            </button>
          </li>
        </ul>
        <div class="card-more">
          <button type="button" class="stat-link" @click="goTo('work')">
            View all projects <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </BentoCard>

      <BentoCard area="about" icon="fa-solid fa-user" eyebrow="About" :reveal-index="1">
        <h3>Who I am and how I work.</h3>
        <p>Web &amp; System Developer, 3 years in. Offline-first apps, system design, and client customizations.</p>
        <div class="about-photo">
          <img :src="profileImage" alt="John Mark Luste, pixel portrait" loading="lazy">
          <div class="about-photo-meta">
            <b>John Mark Luste</b>
            <span>@johnmarkdev</span>
          </div>
        </div>
      </BentoCard>

      <BentoCard area="aibuilds" icon="fa-solid fa-sitemap" eyebrow="System design" :reveal-index="2">
        <h3>Requirements before code.</h3>
        <p>Solo research and system design — ERDs, DFDs, Use Case diagrams, and architecture — before a single feature gets built.</p>
        <div class="tag-row"><span>ERD</span><span>DFD</span><span>Use case</span><span>Class</span><span>Activity</span><span>Component</span><span>Sequence</span><span>State</span><span>Figma</span></div>
      </BentoCard>

      <BentoCard area="credentials" icon="fa-solid fa-award" eyebrow="Credentials" clickable :reveal-index="3" @click="openCredentials">
        <h3>Certificates &amp; recognitions</h3>
        <div class="cred-thumbs">
          <img v-for="c in credentialPreview" :key="c.title" :src="c.image" :alt="`${c.title} certificate`" loading="lazy">
        </div>
        <ul class="services-list">
          <li v-for="c in credentialPreview" :key="c.title">
            <span>{{ c.title }}</span>
            <span class="cred-issuer">{{ c.issuer }}</span>
          </li>
        </ul>
        <div class="card-more">
          <button type="button" class="stat-link" @click.stop="openCredentials">
            View all credentials <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </BentoCard>

      <BentoCard area="services" icon="fa-solid fa-layer-group" eyebrow="Services" :reveal-index="4">
        <h3>What you can hire me for</h3>
        <p>Four ways I usually work with clients and teams.</p>
        <div class="illus-frame">
          <svg viewBox="0 0 86 50" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- spokes -->
            <rect class="px-march" x="22" y="24" width="6" height="2" fill="#171B24"/>
            <rect class="px-march" x="30" y="24" width="6" height="2" fill="#171B24"/>
            <rect class="px-march" x="50" y="24" width="6" height="2" fill="#171B24"/>
            <rect class="px-march" x="58" y="24" width="6" height="2" fill="#171B24"/>
            <rect class="px-march" x="35" y="24" width="2" height="4" fill="#171B24"/>
            <rect class="px-march" x="49" y="24" width="2" height="4" fill="#171B24"/>
            <rect class="px-march" x="41" y="24" width="4" height="2" fill="#171B24"/>

            <!-- nodes -->
            <rect class="px-pop" x="6" y="8" width="14" height="14" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-pop" x="11" y="13" width="4" height="4" fill="#171B24"/>
            <rect class="px-pop" x="66" y="8" width="14" height="14" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-pop" x="71" y="13" width="4" height="4" fill="#EE7B33"/>
            <rect class="px-pop" x="6" y="28" width="14" height="14" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-pop" x="11" y="33" width="4" height="4" fill="#EE7B33"/>
            <rect class="px-pop" x="66" y="28" width="14" height="14" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-pop" x="71" y="33" width="4" height="4" fill="#171B24"/>

            <!-- hub -->
            <rect class="px-hub" x="36" y="17" width="14" height="14" fill="#EE7B33" stroke="#171B24" stroke-width="2"/>
            <rect class="px-hub" x="40" y="21" width="6" height="6" fill="#FBE6D4"/>
          </svg>
        </div>
        <ul class="services-list">
          <li v-for="s in services" :key="s.label"><span>{{ s.label }}</span><span class="cred-issuer">{{ s.count }}</span></li>
        </ul>
      </BentoCard>

      <BentoCard area="testimonials" icon="fa-solid fa-quote-left" eyebrow="Testimonials" :reveal-index="5">
        <h3>What people say about the work</h3>
        <TestimonialCarousel />
      </BentoCard>
    </div>
  </section>
</template>
