<script setup>
import StatusBadge from '../components/common/StatusBadge.vue'
import BentoCard from '../components/common/BentoCard.vue'
import ContactForm from '../components/contact/ContactForm.vue'
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
          <a href="#" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-arrow-down"></i> Download résumé (PDF)</a>
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
      </BentoCard>

      <BentoCard area="location" icon="fa-solid fa-location-dot" eyebrow="Location" :reveal-index="4">
        <h3>Philippines</h3>
        <p>GMT+8 (PST) — remote-first, comfortable overlapping with APAC, US, and EU hours.</p>
      </BentoCard>
    </div>
  </section>
</template>
