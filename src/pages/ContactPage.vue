<script setup>
import StatusBadge from '../components/common/StatusBadge.vue'
import BentoCard from '../components/common/BentoCard.vue'
import ContactForm from '../components/contact/ContactForm.vue'
import ResumeModal from '../components/common/ResumeModal.vue'
import { socials } from '../data/social'
import { CONTACT_EMAIL } from '../data/commands'
</script>

<template>
  <section id="contact">
    <div class="topbar">
      <div>
        <StatusBadge />
        <div class="eyebrow">Contact</div>
        <h1>Let's build something worth noticing.</h1>
        <p class="sub">Taking on a small number of new engagements this quarter. Send a few details and I'll reply within two business days.</p>
      </div>
    </div>

    <div class="bento bento-contact">
      <BentoCard area="form" icon="fa-solid fa-paper-plane" eyebrow="Message" :reveal-index="0">
        <h3>Tell me about the project</h3>
        <ContactForm />
      </BentoCard>

      <BentoCard area="email" icon="fa-regular fa-envelope" eyebrow="Direct" :reveal-index="1">
        <h3>Email &amp; résumé</h3>
        <div class="contact-list">
          <a :href="`mailto:${CONTACT_EMAIL}`"><i class="fa-regular fa-envelope"></i> {{ CONTACT_EMAIL }}</a>
          <ResumeModal />
        </div>
      </BentoCard>

      <BentoCard area="social" icon="fa-solid fa-share-nodes" eyebrow="Elsewhere" :reveal-index="2">
        <h3>Find me online</h3>
        <div class="social-grid">
          <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer">
            <i :class="s.icon"></i> {{ s.label }}
          </a>
        </div>
      </BentoCard>

      <BentoCard area="availability" icon="fa-regular fa-clock" eyebrow="Availability" :reveal-index="3">
        <h3>Response time</h3>
        <p>Usually replies within 1 business days. Open to full-time, contract, and fractional work.</p>
        <div class="illus-frame illus-frame--sm">
          <svg viewBox="0 0 160 100" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- clock face -->
            <rect x="55" y="14" width="50" height="50" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
            <rect x="78" y="20" width="4" height="8" fill="#171B24"/>
            <rect x="78" y="22" width="12" height="4" fill="#EE7B33"/>
            <rect x="80" y="64" width="4" height="10" fill="#171B24"/>
            <rect x="62" y="75" width="36" height="4" fill="#171B24"/>

            <!-- hour ticks -->
            <rect x="62" y="18" width="4" height="4" fill="#E7E0CE"/>
            <rect x="94" y="18" width="4" height="4" fill="#E7E0CE"/>
            <rect x="62" y="56" width="4" height="4" fill="#E7E0CE"/>
            <rect x="94" y="56" width="4" height="4" fill="#E7E0CE"/>

            <!-- hand -->
            <rect class="px-hand" x="78" y="23" width="4" height="16" fill="#171B24"/>
            <rect class="px-hand" x="77" y="37" width="8" height="4" fill="#EE7B33"/>

            <!-- reply bubble -->
            <rect class="px-bob" x="30" y="40" width="34" height="24" fill="#FBE6D4"/>
            <rect class="px-bob" x="38" y="64" width="8" height="6" fill="#FBE6D4"/>
            <rect x="36" y="46" width="20" height="4" fill="#EE7B33"/>
            <rect x="36" y="54" width="14" height="4" fill="#171B24"/>

            <!-- checkmark tick -->
            <rect class="px-pop" x="112" y="52" width="8" height="8" fill="#EE7B33"/>
            <rect class="px-pop" x="116" y="56" width="8" height="8" fill="#EE7B33"/>
            <rect class="px-pop" x="120" y="60" width="8" height="8" fill="#EE7B33"/>
            <rect class="px-pop" x="124" y="46" width="8" height="8" fill="#EE7B33"/>
          </svg>
        </div>
      </BentoCard>

      <BentoCard area="location" icon="fa-solid fa-location-dot" eyebrow="Location" :reveal-index="4">
        <h3>Philippines</h3>
        <p>GMT+8 (PST) — remote-first, comfortable overlapping with APAC, US, and EU hours.</p>
        <div class="illus-frame illus-frame--sm">
          <svg viewBox="0 0 160 100" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
            <!-- globe -->
            <circle class="px-spin" cx="70" cy="48" r="30" fill="#FBE6D4"/>
            <ellipse class="px-spin" cx="70" cy="48" rx="13" ry="30" fill="none" stroke="#171B24" stroke-width="2"/>
            <line class="px-spin" x1="40" y1="48" x2="100" y2="48" stroke="#171B24" stroke-width="2"/>
            <rect class="px-spin" x="44" y="32" width="52" height="4" fill="#EE7B33"/>

            <!-- map folds -->
            <rect x="66" y="18" width="4" height="60" fill="#E7E0CE"/>

            <!-- pin -->
            <rect class="px-pin" x="106" y="18" width="8" height="8" fill="#EE7B33"/>
            <rect class="px-pin" x="102" y="26" width="16" height="8" fill="#EE7B33"/>
            <rect class="px-pin" x="100" y="34" width="20" height="6" fill="#EE7B33"/>
            <rect class="px-pin" x="102" y="40" width="16" height="6" fill="#EE7B33"/>
            <rect class="px-pin" x="108" y="46" width="4" height="10" fill="#EE7B33"/>
            <rect class="px-pin" x="106" y="24" width="8" height="8" fill="#FBE6D4"/>
            <rect class="px-shadow" x="100" y="58" width="20" height="4" fill="#E7E0CE"/>

            <!-- timezone ring -->
            <rect class="px-ping" x="126" y="30" width="4" height="4" fill="#171B24"/>
            <rect class="px-ping" x="126" y="62" width="4" height="4" fill="#171B24"/>
            <rect x="134" y="32" width="4" height="28" fill="#E7E0CE"/>

            <!-- GMT badge -->
            <rect x="24" y="82" width="40" height="12" fill="#171B24"/>
            <rect x="28" y="84" width="6" height="8" fill="#FBE6D4"/>
            <rect x="38" y="84" width="6" height="8" fill="#FBE6D4"/>
            <rect x="48" y="84" width="6" height="8" fill="#EE7B33"/>
            <rect x="58" y="84" width="6" height="8" fill="#FBE6D4"/>
          </svg>
        </div>
      </BentoCard>
    </div>
  </section>
</template>
