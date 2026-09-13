<script setup>
import HeroSection from '../components/home/HeroSection.vue'
import ToolsMarquee from '../components/common/ToolsMarquee.vue'
import BentoCard from '../components/common/BentoCard.vue'
import TestimonialCarousel from '../components/home/TestimonialCarousel.vue'
import { services } from '../data/services'
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
          <svg viewBox="0 0 343 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="42" r="26" fill="#FBE6D4"/>
            <circle cx="300" cy="168" r="16" fill="#FBE6D4"/>
            <rect x="72" y="38" width="200" height="128" rx="10" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
            <rect x="90" y="56" width="164" height="92" rx="6" fill="#F6F2E8"/>
            <rect x="105" y="108" width="18" height="40" rx="3" fill="#E7E0CE"/>
            <rect x="133" y="88" width="18" height="60" rx="3" fill="#EE7B33"/>
            <rect x="161" y="68" width="18" height="80" rx="3" fill="#171B24"/>
            <rect x="189" y="98" width="18" height="50" rx="3" fill="#E7E0CE"/>
            <rect x="150" y="166" width="44" height="8" rx="4" fill="#E7E0CE"/>
            <rect x="164" y="174" width="16" height="14" fill="#E7E0CE"/>
            <circle cx="298" cy="108" r="14" fill="#171B24"/>
            <rect x="284" y="124" width="28" height="46" rx="14" fill="#EE7B33"/>
            <rect x="256" y="112" width="32" height="9" rx="4.5" fill="#171B24" transform="rotate(-18 256 112)"/>
          </svg>
        </div>
      </BentoCard>

      <BentoCard area="about" icon="fa-solid fa-user" eyebrow="About" :reveal-index="1">
        <h3>Who I am and how I work.</h3>
        <p>Web and System Developer, 2 years in.</p>
        <div class="illus-frame">
          <svg viewBox="0 0 343 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="42" r="18" fill="#FBE6D4"/>
            <circle cx="290" cy="50" r="20" fill="#FBE6D4"/>
            <line x1="282" y1="58" x2="298" y2="42" stroke="#171B24" stroke-width="3" stroke-linecap="round"/>
            <line x1="282" y1="42" x2="298" y2="58" stroke="#171B24" stroke-width="3" stroke-linecap="round"/>
            <circle cx="290" cy="50" r="3" fill="#EE7B33"/>

            <rect x="40" y="158" width="260" height="8" rx="3" fill="#E7E0CE"/>
            <rect x="55" y="166" width="8" height="20" fill="#E7E0CE"/>
            <rect x="270" y="166" width="8" height="20" fill="#E7E0CE"/>

            <rect x="140" y="90" width="90" height="60" rx="6" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
            <rect x="148" y="98" width="74" height="40" rx="3" fill="#F6F2E8"/>
            <rect x="154" y="105" width="36" height="6" rx="3" fill="#EE7B33"/>
            <rect x="154" y="116" width="50" height="6" rx="3" fill="#171B24"/>
            <rect x="154" y="127" width="28" height="6" rx="3" fill="#E7E0CE"/>
            <rect x="178" y="150" width="14" height="10" fill="#E7E0CE"/>
            <rect x="168" y="160" width="34" height="6" rx="3" fill="#E7E0CE"/>
            <rect x="130" y="154" width="40" height="8" rx="3" fill="#E7E0CE"/>

            <rect x="70" y="112" width="10" height="50" rx="4" fill="#E7E0CE"/>
            <rect x="70" y="155" width="40" height="8" rx="4" fill="#E7E0CE"/>
            <circle cx="95" cy="100" r="12" fill="#171B24"/>
            <rect x="80" y="112" width="30" height="40" rx="14" fill="#EE7B33"/>
            <rect x="106" y="126" width="28" height="8" rx="4" fill="#171B24" transform="rotate(12 106 126)"/>

            <rect x="255" y="144" width="20" height="16" rx="3" fill="#171B24"/>
            <circle cx="260" cy="138" r="9" fill="#FBE6D4"/>
            <circle cx="268" cy="134" r="10" fill="#FBE6D4"/>
            <circle cx="272" cy="144" r="8" fill="#FBE6D4"/>
          </svg>
        </div>
      </BentoCard>

      <BentoCard area="aibuilds" icon="fa-solid fa-sitemap" eyebrow="System design" :reveal-index="2">
        <h3>Requirements before code.</h3>
        <p>Solo research and system design — ERDs, DFDs, Use Case diagrams, and architecture — before a single feature gets built.</p>
        <div class="tag-row"><span>ERD</span><span>DFD</span><span>Use case</span><span>Class</span><span>Activity</span><span>Component</span><span>Sequence</span><span>State</span><span>Figma</span></div>
      </BentoCard>

      <BentoCard area="credentials" icon="fa-solid fa-award" eyebrow="Credentials" :reveal-index="3">
        <div class="cred-badge"><i class="fa-solid fa-certificate"></i></div>
        <h3 style="text-align:center;font-size:.88rem;">Certified Accessibility Auditor</h3>
      </BentoCard>

      <BentoCard area="services" icon="fa-solid fa-layer-group" eyebrow="Services" :reveal-index="4">
        <h3>What I build for teams</h3>
        <ul class="services-list">
          <li v-for="s in services" :key="s.label"><span>{{ s.label }}</span><span>{{ s.count }}</span></li>
        </ul>
      </BentoCard>

      <BentoCard area="testimonials" icon="fa-solid fa-quote-left" eyebrow="Testimonials" :reveal-index="5">
        <h3>What people say about the work</h3>
        <TestimonialCarousel />
      </BentoCard>
    </div>
  </section>
</template>
