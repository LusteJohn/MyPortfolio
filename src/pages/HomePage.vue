<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import ToolsMarquee from '../components/common/ToolsMarquee.vue'
import BentoCard from '../components/common/BentoCard.vue'
import TestimonialCarousel from '../components/home/TestimonialCarousel.vue'
import { useProjectModal } from '../composables/useProjectModal'
import { credentials } from '../data/credentials-list.js'
import { services } from '../data/services'

const { open } = useProjectModal()

function openCredentials() {
  open(credentials)
}
</script>

<template>
  <section id="home">
    <HeroSection />
    <ToolsMarquee />

    <div class="bento bento-home">
      <BentoCard area="projects" icon="fa-solid fa-diagram-project" eyebrow="Projects" :reveal-index="0">
        <h3>Products built to solve real problems.</h3>
        <p>Funnels, dashboards, and design systems shipped end to end.</p>
        <div class="illus-frame">
          <svg viewBox="0 0 86 50" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- screen -->
            <rect class="px-shake" x="6" y="6" width="74" height="36" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-shake" x="6" y="6" width="74" height="4" fill="#171B24"/>
            <rect class="px-blink" x="10" y="3" width="6" height="4" fill="#EE7B33"/>

            <!-- sparkles -->
            <rect class="px-twinkle" x="14" y="13" width="2" height="2" fill="#EE7B33"/>
            <rect class="px-twinkle" x="18" y="11" width="2" height="2" fill="#171B24"/>

            <!-- bars -->
            <rect class="px-rise" x="12" y="32" width="8" height="6" fill="#E7E0CE"/>
            <rect class="px-rise" x="22" y="26" width="8" height="12" fill="#EE7B33"/>
            <rect class="px-rise" x="32" y="22" width="8" height="16" fill="#171B24"/>
            <rect class="px-rise" x="42" y="30" width="8" height="8" fill="#E7E0CE"/>
            <rect class="px-rise" x="52" y="18" width="8" height="20" fill="#EE7B33"/>
            <rect class="px-rise" x="62" y="28" width="8" height="10" fill="#E7E0CE"/>
            <rect class="px-shake" x="10" y="39" width="66" height="2" fill="#171B24"/>

            <!-- pixel avatar -->
            <rect class="px-bob" x="62" y="12" width="7" height="7" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
            <rect class="px-bob" x="60" y="19" width="11" height="9" fill="#EE7B33" stroke="#171B24" stroke-width="1"/>
          </svg>
        </div>
      </BentoCard>

      <BentoCard area="about" icon="fa-solid fa-user" eyebrow="About" :reveal-index="1">
        <h3>Who I am and how I work.</h3>
        <p>Web &amp; System Developer, 3 years in.</p>
        <div class="illus-frame">
          <svg viewBox="0 0 86 50" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- floor -->
            <rect x="2" y="46" width="82" height="2" fill="#171B24"/>

            <!-- monitor -->
            <rect class="px-tilt" x="8" y="12" width="30" height="22" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-tilt" x="12" y="17" width="8" height="10" fill="#EE7B33"/>
            <rect class="px-blink" x="22" y="17" width="12" height="3" fill="#E7E0CE"/>
            <rect class="px-blink" x="22" y="23" width="8" height="3" fill="#E7E0CE"/>
            <rect class="px-tilt" x="20" y="34" width="6" height="4" fill="#171B24"/>
            <rect class="px-tilt" x="14" y="38" width="18" height="3" fill="#171B24"/>

            <!-- person -->
            <rect class="px-bob" x="52" y="14" width="8" height="8" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
            <rect class="px-bob" x="46" y="26" width="12" height="14" fill="#EE7B33" stroke="#171B24" stroke-width="1"/>
            <rect class="px-wave" x="58" y="28" width="4" height="10" fill="#171B24"/>

            <!-- desk -->
            <rect x="2" y="40" width="82" height="4" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>

            <!-- plant -->
            <rect class="px-sway" x="71" y="24" width="2" height="8" fill="#171B24"/>
            <rect class="px-sway" x="76" y="24" width="2" height="8" fill="#171B24"/>
            <rect class="px-sway" x="73" y="20" width="2" height="12" fill="#171B24"/>
            <rect x="69" y="32" width="11" height="8" fill="#EE7B33" stroke="#171B24" stroke-width="1"/>
          </svg>
        </div>
      </BentoCard>

      <BentoCard area="aibuilds" icon="fa-solid fa-sitemap" eyebrow="System design" :reveal-index="2">
        <h3>Requirements before code.</h3>
        <p>Solo research and system design — ERDs, DFDs, Use Case diagrams, and architecture — before a single feature gets built.</p>
        <div class="tag-row"><span>ERD</span><span>DFD</span><span>Use case</span><span>Class</span><span>Activity</span><span>Component</span><span>Sequence</span><span>State</span><span>Figma</span></div>
      </BentoCard>

      <BentoCard area="credentials" icon="fa-solid fa-award" eyebrow="Credentials" clickable :reveal-index="3" @click="openCredentials">
        <h3>Certificates &amp; recognitions</h3>
        <div class="illus-frame">
          <svg viewBox="0 0 86 50" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- certificate -->
            <rect x="10" y="4" width="46" height="34" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-shine" x="16" y="10" width="18" height="4" fill="#EE7B33"/>
            <rect class="px-writing" x="16" y="18" width="30" height="2" fill="#E7E0CE"/>
            <rect class="px-writing" x="16" y="24" width="24" height="2" fill="#E7E0CE"/>
            <rect class="px-writing" x="16" y="30" width="20" height="2" fill="#E7E0CE"/>

            <!-- ribbon -->
            <rect x="30" y="36" width="4" height="9" fill="#171B24"/>
            <rect x="34" y="36" width="4" height="9" fill="#EE7B33"/>

            <!-- medal -->
            <rect class="px-swing" x="30" y="40" width="6" height="2" fill="#EE7B33"/>
            <rect class="px-swing" x="28" y="42" width="10" height="2" fill="#EE7B33"/>
            <rect class="px-swing" x="27" y="44" width="12" height="2" fill="#EE7B33"/>
            <rect class="px-swing" x="28" y="46" width="10" height="2" fill="#EE7B33"/>
            <rect class="px-swing" x="30" y="48" width="6" height="2" fill="#EE7B33"/>
            <rect class="px-swing" x="30" y="43" width="6" height="4" fill="#FBE6D4"/>

            <!-- star badge -->
            <rect class="px-spin" x="62" y="10" width="8" height="8" fill="#171B24"/>
            <rect class="px-spin" x="64" y="12" width="4" height="4" fill="#EE7B33"/>
            <rect class="px-writing" x="62" y="24" width="8" height="2" fill="#E7E0CE"/>
            <rect class="px-writing" x="62" y="30" width="6" height="2" fill="#E7E0CE"/>
          </svg>
        </div>
        <ul class="services-list">
          <li><span>Certified Cloud System Analyst</span><span>Completed</span></li>
          <li><span>IT Innovation Showcase</span><span>Participant</span></li>
          <li><span>More...</span><span>Completed</span></li>
        </ul>
      </BentoCard>

      <BentoCard area="services" icon="fa-solid fa-layer-group" eyebrow="Services" :reveal-index="4">
        <h3>How I work, mostly solo</h3>
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
          <li v-for="s in services" :key="s.label"><span>{{ s.label }}</span><span>{{ s.count }}</span></li>
        </ul>
      </BentoCard>

      <BentoCard area="testimonials" icon="fa-solid fa-quote-left" eyebrow="Testimonials" :reveal-index="5">
        <h3>What people say about the work</h3>
        <div class="illus-frame">
          <svg viewBox="0 0 86 50" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- bubble -->
            <rect class="px-shake" x="6" y="4" width="68" height="28" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect class="px-shake" x="18" y="32" width="10" height="8" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect x="18" y="32" width="10" height="2" fill="#FFFDF8"/>

            <!-- quotation blocks -->
            <rect class="px-quote" x="16" y="11" width="7" height="13" fill="#EE7B33"/>
            <rect class="px-quote" x="26" y="11" width="7" height="13" fill="#EE7B33"/>
            <rect x="16" y="11" width="3" height="3" fill="#FBE6D4"/>
            <rect x="26" y="11" width="3" height="3" fill="#FBE6D4"/>

            <!-- text lines -->
            <rect class="px-writing" x="39" y="13" width="28" height="2" fill="#E7E0CE"/>
            <rect class="px-writing" x="39" y="19" width="22" height="2" fill="#E7E0CE"/>
            <rect class="px-writing" x="39" y="25" width="16" height="2" fill="#E7E0CE"/>

            <!-- avatar row -->
            <rect class="px-hop" x="14" y="38" width="6" height="6" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
            <rect class="px-hop" x="12" y="44" width="10" height="6" fill="#EE7B33" stroke="#171B24" stroke-width="1"/>
            <rect class="px-hop2" x="40" y="38" width="6" height="6" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
            <rect class="px-hop2" x="38" y="44" width="10" height="6" fill="#171B24"/>
            <rect class="px-hop3" x="66" y="38" width="6" height="6" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
            <rect class="px-hop3" x="64" y="44" width="10" height="6" fill="#E7E0CE" stroke="#171B24" stroke-width="1"/>
          </svg>
        </div>
        <TestimonialCarousel />
      </BentoCard>
    </div>
  </section>
</template>
