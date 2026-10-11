<script setup>
import StatusBadge from '../common/StatusBadge.vue'
import StatRow from './StatRow.vue'
import { useTypewriter } from '../../composables/useTypewriter'
import { useNavigation } from '../../composables/useNavigation'

const { goTo } = useNavigation()
const roles = ['Web Developer', 'Design Systems Lead', 'App Developer Offline', 'Simplicity Advocate']
const { text: typedRole } = useTypewriter(roles)
</script>

<template>
  <div class="topbar">
    <div>
      <StatusBadge />
      <div class="eyebrow"><span class="typed-role">{{ typedRole }}</span></div>
      <h1>Build it once. Make it work anywhere.</h1>
      <p class="sub">Offline-first — works even when the connection doesn't.</p>
      <p class="sub-support">Real databases, service workers, and local storage keep the app running on a dead connection. Capstone builds, client customizations, and solo projects across web, mobile, and systems.</p>
      <div class="proof-row">
        <span class="proof-chip"><span class="proof-dot" aria-hidden="true"></span> Works offline</span>
        <span class="proof-chip">Live demos</span>
        <span class="proof-chip">7 shipped</span>
      </div>
      <div class="cta-row">
        <button type="button" class="cta-pill" @click="goTo('work')">
          View projects <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button type="button" class="cta-pill cta-pill--ghost" @click="goTo('contact')">
          Get in touch
        </button>
      </div>
      <StatRow />
    </div>
    <div class="hero-side">
      <div class="hero-scene"
        role="img"
        aria-label="Pixel art of a developer working at a desk, standing up to walk through an invisible door to rest, then returning to work"
      >
        <svg viewBox="0 0 100 70" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
          <!-- window with night sky -->
          <rect x="56" y="4" width="38" height="26" fill="#FBE6D4" stroke="#171B24" stroke-width="2"/>
          <line x1="75" y1="4" x2="75" y2="30" stroke="#171B24" stroke-width="2"/>
          <line x1="56" y1="17" x2="94" y2="17" stroke="#171B24" stroke-width="2"/>
          <rect class="px-star" x="60" y="21" width="3" height="3" fill="#EE7B33"/>
          <rect class="px-star2" x="68" y="7" width="3" height="3" fill="#171B24"/>
          <rect class="px-star3" x="80" y="21" width="3" height="3" fill="#EE7B33"/>
          <rect class="px-star2" x="88" y="8" width="3" height="3" fill="#171B24"/>
          <rect x="63" y="8" width="7" height="3" fill="#171B24"/>
          <rect x="61" y="11" width="3" height="5" fill="#171B24"/>
          <rect x="63" y="14" width="7" height="3" fill="#171B24"/>
          <rect x="67" y="11" width="3" height="5" fill="#FBE6D4"/>

          <!-- floating code blocks -->
          <rect class="px-fly" x="36" y="6" width="5" height="5" fill="#EE7B33"/>
          <rect class="px-fly2" x="44" y="12" width="4" height="4" fill="#171B24"/>
          <rect class="px-fly3" x="26" y="14" width="4" height="4" fill="#EE7B33"/>

          <!-- monitor -->
          <rect x="30" y="20" width="42" height="28" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
          <rect x="30" y="20" width="42" height="3" fill="#171B24"/>
          <rect x="33" y="27" width="14" height="3" fill="#EE7B33"/>
          <rect class="px-code" x="33" y="33" width="20" height="3" fill="#E7E0CE"/>
          <rect class="px-code2" x="33" y="39" width="14" height="3" fill="#E7E0CE"/>
          <rect class="px-code3" x="33" y="45" width="10" height="3" fill="#E7E0CE"/>
          <rect x="58" y="33" width="6" height="6" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
          <rect x="50" y="50" width="4" height="4" fill="#171B24"/>
          <rect x="47" y="48" width="7" height="4" fill="#171B24"/>
          <rect x="34" y="52" width="34" height="3" fill="#171B24"/>

          <!-- chair -->
          <rect x="36" y="28" width="6" height="22" fill="#171B24"/>
          <rect x="36" y="46" width="12" height="4" fill="#E7E0CE"/>

          <!-- desk / floor -->
          <rect x="2" y="62" width="96" height="6" fill="#FFFDF8" stroke="#171B24" stroke-width="1"/>

          <!-- coffee -->
          <rect x="78" y="52" width="9" height="10" fill="#FFFDF8" stroke="#171B24" stroke-width="1"/>
          <rect x="87" y="55" width="3" height="5" fill="#E7E0CE"/>
          <rect class="px-steam" x="80" y="46" width="2" height="2" fill="#171B24"/>
          <rect class="px-steam2" x="84" y="44" width="2" height="2" fill="#171B24"/>
          <rect class="px-steam3" x="82" y="42" width="2" height="2" fill="#171B24"/>

          <!-- sticky notes -->
          <rect class="px-note" x="72" y="60" width="8" height="8" fill="#EE7B33"/>
          <rect class="px-note2" x="66" y="60" width="8" height="8" fill="#FBE6D4"/>

          <!-- resting zzz -->
          <rect class="px-zzz" x="8" y="26" width="3" height="3" fill="#EE7B33"/>
          <rect class="px-zzz" x="13" y="22" width="4" height="4" fill="#EE7B33"/>
          <rect class="px-zzz" x="19" y="17" width="5" height="5" fill="#EE7B33"/>

          <!-- doorway back wall -->
          <rect x="4" y="14" width="14" height="48" fill="#F6F2E8"/>

          <!-- the walker -->
          <g class="px-walker">
            <g class="px-restfade">
              <!-- typing arms -->
              <g class="px-typing-arms">
                <rect class="px-arm" x="9" y="13" width="9" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
                <rect class="px-arm2" x="9" y="17" width="8" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
              </g>
              <!-- walking arms -->
              <g class="px-walk-arms">
                <rect class="px-swing-a" x="-1" y="12" width="4" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
                <rect class="px-swing-b" x="7" y="12" width="4" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
              </g>
              <!-- body -->
              <rect x="0" y="10" width="10" height="14" fill="#EE7B33" stroke="#171B24" stroke-width="1"/>
              <!-- head -->
              <rect x="0" y="0" width="9" height="9" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
              <rect x="3" y="4" width="3" height="2" fill="#171B24"/>
              <!-- legs -->
              <g class="px-legs">
                <rect class="px-leg-a" x="1" y="24" width="3" height="8" fill="#171B24"/>
                <rect class="px-leg-b" x="6" y="24" width="3" height="8" fill="#171B24"/>
              </g>
            </g>
          </g>

          <!-- keyboard (under the hands) -->
          <g class="px-keys">
            <rect x="46" y="53" width="18" height="4" fill="#E7E0CE" stroke="#171B24" stroke-width="1"/>
            <rect class="px-key" x="49" y="55" width="3" height="2" fill="#171B24"/>
            <rect class="px-key2" x="54" y="55" width="3" height="2" fill="#171B24"/>
            <rect class="px-key3" x="59" y="55" width="3" height="2" fill="#171B24"/>
          </g>

          <!-- the invisible door: two panels, no fill -->
          <rect class="px-door-l" x="3" y="13" width="7" height="50" fill="none" stroke="#171B24" stroke-width="1"/>
          <rect class="px-door-r" x="12" y="13" width="7" height="50" fill="none" stroke="#171B24" stroke-width="1"/>
        </svg>
      </div>
    </div>
  </div>
</template>
