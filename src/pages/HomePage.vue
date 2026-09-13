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
        <div class="mock-browser">
          <div class="bar"><span></span><span></span><span></span></div>
          <div class="body">
            <div class="row w60"></div>
            <div class="row w80"></div>
            <div class="row w40"></div>
          </div>
        </div>
      </BentoCard>

      <BentoCard area="about" icon="fa-solid fa-user" eyebrow="About" :reveal-index="1">
        <h3>Who I am and how I work.</h3>
        <p>Systems-minded engineer, seven years in.</p>
        <div class="about-illus"><i class="fa-solid fa-compass-drafting"></i></div>
      </BentoCard>

      <BentoCard area="aibuilds" icon="fa-solid fa-shapes" eyebrow="Design systems" :reveal-index="2">
        <h3>Tokens, components, docs.</h3>
        <p>The library that keeps six teams in sync.</p>
        <div class="tag-row"><span>Tokens</span><span>Storybook</span><span>Figma API</span></div>
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
