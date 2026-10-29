<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import StatusBadge from '../common/StatusBadge.vue'
import StatRow from './StatRow.vue'
import { useTypewriter } from '../../composables/useTypewriter'
import { useNavigation } from '../../composables/useNavigation'

const { goTo } = useNavigation()
const roles = ['Web Developer', 'Design Systems Lead', 'Offline App Developer', 'Simplicity Advocate']
const { text: typedRole } = useTypewriter(roles)

// ---- Languages absorbed by the monitor ----
// Tiny 3x5 pixel font, just the letters we need. '1' = filled pixel.
const GLYPHS = {
  P: ['110', '101', '110', '100', '100'],
  H: ['101', '101', '111', '101', '101'],
  S: ['011', '100', '010', '001', '110'],
  Q: ['111', '101', '101', '111', '001'],
  L: ['100', '100', '100', '100', '111'],
  J: ['001', '001', '001', '101', '010'],
  V: ['101', '101', '101', '101', '010'],
  U: ['101', '101', '101', '101', '111'],
  E: ['111', '100', '110', '100', '111']
}
const CHIP_H = 9
const SCREEN_TARGET = { x: 51, y: 33 } // where chips get absorbed

// delay (s) staggers each chip inside the 14s loop, all while he's seated
const chipDefs = [
  { label: 'PHP', x: 22, y: 1,  fill: '#FFFDF8', delay: 0.3 },
  { label: 'SQL', x: 39, y: 1,  fill: '#FBE6D4', delay: 1.2 },
  { label: 'JS',  x: 26, y: 11, fill: '#FFFDF8', delay: 2.1 },
  { label: 'VUE', x: 39, y: 11, fill: '#EE7B33', delay: 3.0 }
]

const chips = chipDefs.map((c) => {
  const w = c.label.length * 4 + 3
  const px = []
  ;[...c.label].forEach((ch, li) => {
    GLYPHS[ch].forEach((row, r) => {
      ;[...row].forEach((bit, col) => {
        if (bit === '1') px.push({ x: 2 + li * 4 + col, y: 2 + r })
      })
    })
  })
  return {
    ...c,
    w,
    px,
    dx: SCREEN_TARGET.x - (c.x + w / 2),
    dy: SCREEN_TARGET.y - (c.y + CHIP_H / 2)
  }
})

// Pause the scene when it's scrolled out of view (saves battery, keeps the loop in sync)
const scene = ref(null)
const paused = ref(false)
let observer
onMounted(() => {
  if (!('IntersectionObserver' in window) || !scene.value) return
  observer = new IntersectionObserver(
    ([entry]) => { paused.value = !entry.isIntersecting },
    { threshold: 0.2 }
  )
  observer.observe(scene.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="topbar">
    <div>
      <StatusBadge />
      <div class="eyebrow" aria-label="Roles: Web Developer, Design Systems Lead, Offline App Developer, Simplicity Advocate">
        <span class="typed-role" aria-hidden="true">{{ typedRole }}</span>
      </div>
      <h1>Build it once.<br>Make it work anywhere.</h1>
      <p class="sub">Offline-first — works even when the connection doesn't.</p>
      <p class="sub-support">Real databases, service workers, and local storage keep the app running on a dead connection. Open to freelance, contract, and full-time work.</p>
      <div class="proof-row">
        <span class="proof-chip"><span class="proof-dot" aria-hidden="true"></span> Works offline</span>
        <span class="proof-chip">Live demos</span>
      </div>
      <div class="cta-row">
        <button type="button" class="cta-pill" @click="goTo('work')">
          View projects <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
        <button type="button" class="cta-pill cta-pill--ghost" @click="goTo('contact')">
          Get in touch
        </button>
      </div>
      <StatRow />
    </div>

    <div class="hero-side">
      <div
        ref="scene"
        class="hero-scene"
        :class="{ 'is-paused': paused }"
        role="img"
        aria-label="Pixel art of a developer typing at a desk while programming languages (PHP, SQL, JS, Vue) are absorbed into the monitor, then standing up to walk through a door to rest and returning to work"
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
          <!-- crescent moon -->
          <rect x="63" y="8" width="7" height="3" fill="#171B24"/>
          <rect x="61" y="11" width="3" height="5" fill="#171B24"/>
          <rect x="63" y="14" width="7" height="3" fill="#171B24"/>
          <rect x="67" y="11" width="3" height="5" fill="#FBE6D4"/>

          <!-- monitor -->
          <rect x="30" y="20" width="42" height="28" fill="#FFFDF8" stroke="#171B24" stroke-width="2"/>
          <rect x="30" y="20" width="42" height="3" fill="#171B24"/>
          <rect x="33" y="27" width="14" height="3" fill="#EE7B33"/>
          <rect class="px-code" x="33" y="33" width="20" height="3" fill="#E7E0CE"/>
          <rect class="px-code2" x="33" y="39" width="14" height="3" fill="#E7E0CE"/>
          <rect class="px-code3" x="33" y="45" width="10" height="3" fill="#E7E0CE"/>
          <rect class="px-cursor" x="55" y="33" width="2" height="3" fill="#171B24"/>
          <rect x="58" y="33" width="6" height="6" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
          <!-- screen dims while the developer is away -->
          <rect class="px-dim" x="31" y="23" width="40" height="24" fill="#171B24"/>
          <!-- offline: wifi-off icon blinks on the dimmed screen while he rests -->
          <g class="px-offline">
            <rect x="45" y="29" width="12" height="2" fill="#FFFDF8"/>
            <rect x="47" y="32" width="8" height="2" fill="#FFFDF8"/>
            <rect x="49" y="35" width="4" height="2" fill="#FFFDF8"/>
            <rect x="50" y="38" width="2" height="2" fill="#FFFDF8"/>
            <line x1="44" y1="28" x2="58" y2="41" stroke="#EE7B33" stroke-width="2"/>
          </g>
          <!-- saved: check mark appears when he returns (nothing was lost) -->
          <g class="px-saved" fill="#EE7B33">
            <rect x="60" y="43" width="2" height="2"/>
            <rect x="62" y="45" width="2" height="2"/>
            <rect x="64" y="43" width="2" height="2"/>
            <rect x="66" y="41" width="2" height="2"/>
            <rect x="68" y="39" width="2" height="2"/>
          </g>

          <!-- languages get absorbed by the monitor (only while he's typing) -->
          <g v-for="c in chips" :key="c.label">
            <!-- screen flash when this chip lands -->
            <rect
              class="px-glow"
              x="31" y="23" width="40" height="24"
              fill="#EE7B33"
              :style="{ animationDelay: c.delay + 's' }"
            />
            <g :transform="`translate(${c.x} ${c.y})`">
              <g
                class="px-chip"
                :style="{ '--dx': c.dx + 'px', '--dy': c.dy + 'px', animationDelay: c.delay + 's' }"
              >
                <rect x="0.5" y="0.5" :width="c.w - 1" :height="9 - 1" :fill="c.fill" stroke="#171B24" stroke-width="1"/>
                <rect
                  v-for="(p, i) in c.px"
                  :key="i"
                  :x="p.x" :y="p.y" width="1" height="1"
                  fill="#171B24"
                />
              </g>
            </g>
          </g>
          <!-- stand -->
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
          <rect x="72" y="60" width="8" height="8" fill="#EE7B33"/>
          <rect x="66" y="60" width="8" height="8" fill="#FBE6D4"/>

          <!-- resting zzz -->
          <rect class="px-zzz" x="8" y="26" width="3" height="3" fill="#EE7B33"/>
          <rect class="px-zzz px-zzz--2" x="13" y="22" width="4" height="4" fill="#EE7B33"/>
          <rect class="px-zzz px-zzz--3" x="19" y="17" width="5" height="5" fill="#EE7B33"/>

          <!-- doorway back wall -->
          <rect x="4" y="14" width="14" height="48" fill="#F6F2E8"/>

          <!-- the walker -->
          <g class="px-walker">
            <g class="px-restfade">
              <!-- typing arms (seated) -->
              <g class="px-seat-only">
                <rect class="px-arm" x="9" y="22" width="9" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
                <rect class="px-arm2" x="9" y="26" width="8" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
              </g>
              <!-- walking arms -->
              <g class="px-away-only">
                <rect class="px-swing-a" x="-1" y="12" width="4" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
                <rect class="px-swing-b" x="7" y="12" width="4" height="3" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
              </g>
              <!-- body -->
              <rect x="0" y="10" width="10" height="14" fill="#EE7B33" stroke="#171B24" stroke-width="1"/>
              <!-- head -->
              <rect x="0" y="0" width="9" height="9" fill="#FBE6D4" stroke="#171B24" stroke-width="1"/>
              <rect x="3" y="4" width="3" height="2" fill="#171B24"/>
              <!-- seated legs (static, bent) -->
              <g class="px-seat-only">
                <rect x="2" y="24" width="9" height="3" fill="#171B24"/>
                <rect x="8" y="27" width="3" height="6" fill="#171B24"/>
              </g>
              <!-- walking legs -->
              <g class="px-away-only">
                <rect class="px-leg-a" x="1" y="24" width="3" height="8" fill="#171B24"/>
                <rect class="px-leg-b" x="6" y="24" width="3" height="8" fill="#171B24"/>
              </g>
            </g>
          </g>

          <!-- keyboard (under the hands) -->
          <g class="px-keys">
            <rect x="46" y="53" width="18" height="4" fill="#E7E0CE" stroke="#171B24" stroke-width="1"/>
            <g class="px-seat-only">
              <rect class="px-key" x="49" y="55" width="3" height="2" fill="#171B24"/>
              <rect class="px-key2" x="54" y="55" width="3" height="2" fill="#171B24"/>
              <rect class="px-key3" x="59" y="55" width="3" height="2" fill="#171B24"/>
            </g>
          </g>

          <!-- the invisible door: two panels, no fill -->
          <rect class="px-door-l" x="3" y="13" width="7" height="50" fill="none" stroke="#171B24" stroke-width="1"/>
          <rect class="px-door-r" x="12" y="13" width="7" height="50" fill="none" stroke="#171B24" stroke-width="1"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  One 14s loop tells the whole story:
   0–38%   seated, typing
  38–48%   stands up, walks to the door (door opens)
  48–52%   steps through and fades out
  52–78%   resting (zzz floats up, screen dims)
  78–82%   steps back out
  82–90%   walks back to the chair
  90–100%  seated, typing again

  Base styles below describe the SEATED state, so with
  prefers-reduced-motion the scene is a clean static frame.
*/
.hero-scene {
  --loop: 14s;
  --ink: #171B24;
  --accent: #EE7B33;
  line-height: 0;
}
.hero-scene svg { width: 100%; height: auto; display: block; }
.hero-scene svg * { transform-box: fill-box; }

/* Offscreen → pause every animation */
.hero-scene.is-paused svg * { animation-play-state: paused; }

/* ---------- Walker path ---------- */
.px-walker {
  transform: translate(38px, 26px);
  animation: walker-path var(--loop) infinite;
  transform-box: view-box;
}
@keyframes walker-path {
  0%, 38%   { transform: translate(38px, 26px); animation-timing-function: steps(10); }
  48%, 78%  { transform: translate(8px, 30px);  animation-timing-function: steps(10); }
  90%, 100% { transform: translate(38px, 26px); }
}

.px-restfade { animation: rest-fade var(--loop) infinite; }
@keyframes rest-fade {
  0%, 48%   { opacity: 1; }
  52%, 78%  { opacity: 0; }
  82%, 100% { opacity: 1; }
}

/* Seated vs walking parts swap at the stand-up / sit-down moments */
.px-seat-only { animation: seat-only var(--loop) infinite; }
.px-away-only { opacity: 0; animation: away-only var(--loop) infinite; }
@keyframes seat-only {
  0%, 37.9% { opacity: 1; }
  38%, 89.9% { opacity: 0; }
  90%, 100% { opacity: 1; }
}
@keyframes away-only {
  0%, 37.9% { opacity: 0; }
  38%, 89.9% { opacity: 1; }
  90%, 100% { opacity: 0; }
}

/* Walking gait: fast loop, only visible while walking */
.px-leg-a, .px-swing-b { animation: gait-a 0.5s steps(1) infinite; }
.px-leg-b, .px-swing-a { animation: gait-b 0.5s steps(1) infinite; }
.px-leg-a, .px-leg-b { transform-origin: top; }
@keyframes gait-a { 0% { transform: scaleY(1); } 50% { transform: scaleY(0.6); } }
@keyframes gait-b { 0% { transform: scaleY(0.6); } 50% { transform: scaleY(1); } }
.px-swing-a, .px-swing-b { transform-origin: top; }

/* Typing: hands bounce alternately, keys flash */
.px-arm  { animation: tap 0.4s steps(1) infinite; }
.px-arm2 { animation: tap 0.4s steps(1) infinite 0.2s; }
@keyframes tap { 0% { transform: translateY(0); } 50% { transform: translateY(1px); } }

.px-key  { animation: key-flash 0.9s steps(1) infinite; }
.px-key2 { animation: key-flash 0.9s steps(1) infinite 0.3s; }
.px-key3 { animation: key-flash 0.9s steps(1) infinite 0.6s; }
@keyframes key-flash { 0% { fill: var(--accent); } 33% { fill: var(--ink); } }

/* ---------- Door ---------- */
.px-door-l { transform-origin: left center;  animation: door-l var(--loop) infinite; }
.px-door-r { transform-origin: right center; animation: door-r var(--loop) infinite; }
@keyframes door-l {
  0%, 44%   { transform: scaleX(1); }
  47%, 54%  { transform: scaleX(0.25); }
  58%, 74%  { transform: scaleX(1); }
  77%, 84%  { transform: scaleX(0.25); }
  88%, 100% { transform: scaleX(1); }
}
@keyframes door-r {
  0%, 44%   { transform: scaleX(1); }
  47%, 54%  { transform: scaleX(0.25); }
  58%, 74%  { transform: scaleX(1); }
  77%, 84%  { transform: scaleX(0.25); }
  88%, 100% { transform: scaleX(1); }
}

/* ---------- Screen ---------- */
.px-code, .px-code2, .px-code3 { transform-origin: left center; animation: type-line 2.4s steps(6) infinite alternate; }
.px-code2 { animation-delay: -0.8s; }
.px-code3 { animation-delay: -1.6s; }
@keyframes type-line { from { transform: scaleX(0.3); } to { transform: scaleX(1); } }

.px-cursor { animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.px-dim { opacity: 0; animation: screen-dim var(--loop) infinite; }
@keyframes screen-dim {
  0%, 40%   { opacity: 0; }
  50%, 80%  { opacity: 0.55; }
  88%, 100% { opacity: 0; }
}

/* Offline-first story: connection drops while he rests, work is saved on return */
.px-offline { opacity: 0; animation: offline-icon var(--loop) infinite; }
@keyframes offline-icon {
  0%, 52%   { opacity: 0; }
  54%, 60%  { opacity: 1; }
  62%, 64%  { opacity: 0.3; }
  66%, 72%  { opacity: 1; }
  74%, 76%  { opacity: 0.3; }
  78%, 80%  { opacity: 1; }
  82%, 100% { opacity: 0; }
}

.px-saved { opacity: 0; animation: saved-check var(--loop) infinite; }
@keyframes saved-check {
  0%, 88%   { opacity: 0; transform: translateY(2px); }
  90%, 96%  { opacity: 1; transform: translateY(0); }
  98%, 100% { opacity: 0; transform: translateY(0); }
}

/* ---------- Ambient (kept small & quiet) ---------- */
.px-star  { animation: twinkle 3s steps(1) infinite; }
.px-star2 { animation: twinkle 4s steps(1) infinite 1s; }
.px-star3 { animation: twinkle 5s steps(1) infinite 2s; }
@keyframes twinkle { 0%, 70% { opacity: 1; } 75%, 90% { opacity: 0.2; } }

/* Language chips: pop in above the monitor, hold, then get pulled into the screen.
   Each chip's --dx/--dy points at the screen; animation-delay staggers them
   inside the seated part of the loop (0.3s – ~4.4s). */
.px-chip {
  opacity: 0;
  transform-origin: center;
  animation: chip-absorb var(--loop) infinite;
}
@keyframes chip-absorb {
  0%    { opacity: 0; transform: translate(0, 0) scale(0.5); animation-timing-function: steps(2); }
  1.2%  { opacity: 1; transform: translate(0, 0) scale(1); }
  6%    { opacity: 1; transform: translate(0, 0) scale(1); animation-timing-function: steps(6); }
  10%   { opacity: 1; transform: translate(var(--dx), var(--dy)) scale(0.35); }
  10.5%, 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.35); }
}

/* Brief orange flash on the screen as each chip lands */
.px-glow { opacity: 0; animation: chip-glow var(--loop) steps(1) infinite; }
@keyframes chip-glow {
  0%, 9.5%  { opacity: 0; }
  10%       { opacity: 0.35; }
  12%, 100% { opacity: 0; }
}

.px-steam  { animation: steam 2.4s steps(6) infinite; }
.px-steam2 { animation: steam 2.4s steps(6) infinite 0.8s; }
.px-steam3 { animation: steam 2.4s steps(6) infinite 1.6s; }
@keyframes steam {
  0%   { transform: translateY(0); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateY(-6px); opacity: 0; }
}

/* zzz only appears during the rest window */
.px-zzz { opacity: 0; animation: zzz var(--loop) infinite; }
.px-zzz--2 { animation-delay: 0.5s; }
.px-zzz--3 { animation-delay: 1s; }
@keyframes zzz {
  0%, 54%   { opacity: 0; transform: translateY(2px); }
  58%       { opacity: 1; transform: translateY(0); }
  72%       { opacity: 1; transform: translateY(-2px); }
  76%, 100% { opacity: 0; transform: translateY(-4px); }
}

/* ---------- Accessibility ---------- */
@media (prefers-reduced-motion: reduce) {
  .hero-scene svg * { animation: none !important; }
}
</style>