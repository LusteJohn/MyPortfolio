<template>
  <div class="contact-hero-illustration" aria-hidden="true">
    <svg viewBox="0 0 360 220" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      <path class="contact-route" d="M36 168H104V126H180V84H246V52H320" />
      <path class="contact-route contact-route--two" d="M54 190H132V154H210V116H286V82H334" />

      <g class="contact-envelope">
        <rect x="28" y="136" width="72" height="48" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
        <path d="M30 140L64 166L98 140" fill="none" stroke="#EE7B33" stroke-width="3"/>
        <path d="M30 180L54 157M98 180L74 157" fill="none" stroke="#171B24" stroke-width="2"/>
      </g>

      <g class="contact-window">
        <rect x="130" y="78" width="132" height="102" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
        <rect x="130" y="78" width="132" height="16" fill="#171B24"/>
        <rect x="140" y="84" width="6" height="5" fill="#EE7B33"/>
        <rect x="152" y="84" width="6" height="5" fill="#FBE6D4"/>
        <rect x="144" y="108" width="66" height="7" fill="#EE7B33"/>
        <rect class="contact-line contact-line--two" x="144" y="124" width="94" height="7" fill="#E7E0CE"/>
        <rect class="contact-line contact-line--three" x="144" y="140" width="54" height="7" fill="#171B24"/>
        <rect class="contact-cursor" x="226" y="122" width="7" height="12" fill="#EE7B33"/>
        <rect x="144" y="157" width="44" height="10" fill="#171B24"/>
        <rect class="contact-send" x="194" y="157" width="44" height="10" fill="#EE7B33"/>
      </g>

      <g class="contact-clock">
        <circle cx="298" cy="118" r="26" fill="#FBE6D4" stroke="#171B24" stroke-width="3"/>
        <rect x="296" y="98" width="5" height="22" fill="#171B24"/>
        <rect x="298" y="116" width="16" height="5" fill="#EE7B33"/>
      </g>

      <rect class="contact-spark contact-spark--one" x="76" y="72" width="7" height="7" fill="#EE7B33"/>
      <rect class="contact-spark contact-spark--two" x="274" y="48" width="6" height="6" fill="#171B24"/>
      <circle class="contact-dot contact-dot--one" cx="108" cy="82" r="4" fill="#171B24"/>
      <circle class="contact-dot contact-dot--two" cx="322" cy="168" r="4" fill="#EE7B33"/>
    </svg>
    <span class="contact-hero-label"><i></i> Let's talk it through</span>
  </div>
</template>

<style scoped>
.contact-hero-illustration {
  position: relative;
  width: min(100%, 430px);
  margin: 0 auto;
}

.contact-hero-illustration svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.contact-route {
  fill: none;
  stroke: #E7E0CE;
  stroke-width: 3;
  stroke-dasharray: 6 8;
  animation: contact-route-march 7s linear infinite;
}

.contact-route--two {
  animation-duration: 9s;
  animation-direction: reverse;
  opacity: .7;
}

.contact-envelope,
.contact-window,
.contact-clock,
.contact-spark,
.contact-dot,
.contact-line,
.contact-cursor,
.contact-send {
  transform-box: fill-box;
  transform-origin: center;
}

.contact-envelope {
  animation: contact-envelope-float 3.8s steps(2, end) infinite;
}

.contact-window {
  animation: contact-window-float 4s steps(2, end) infinite;
}

.contact-clock {
  animation: contact-clock-tick 2.4s steps(2, end) infinite;
}

.contact-line--two { animation: contact-line-type 2.2s steps(4, end) .3s infinite; }
.contact-line--three { animation: contact-line-type 2.2s steps(4, end) .6s infinite; }
.contact-cursor { animation: contact-cursor-blink .8s steps(1, end) infinite; }
.contact-send { animation: contact-send-pulse 2s steps(2, end) infinite; }

.contact-spark,
.contact-dot {
  animation: contact-spark-pop 2s steps(2, end) infinite;
}

.contact-spark--two { animation-delay: .6s; }
.contact-dot--one { animation-delay: 1s; }
.contact-dot--two { animation-delay: 1.5s; }

.contact-hero-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: 6px 0 0 12px;
  font-family: 'Pixelify Sans', sans-serif;
  font-size: .7rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #767258;
}

.contact-hero-label i {
  width: 7px;
  height: 7px;
  background: #3fa66a;
  box-shadow: 2px 2px 0 #171B24;
}

@keyframes contact-route-march {
  to { stroke-dashoffset: -56; }
}

@keyframes contact-envelope-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes contact-window-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes contact-clock-tick {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(8deg); }
}

@keyframes contact-line-type {
  0%, 100% { transform: scaleX(1); opacity: 1; }
  50% { transform: scaleX(.7); opacity: .6; }
}

@keyframes contact-cursor-blink {
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: .2; }
}

@keyframes contact-send-pulse {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(.8); }
}

@keyframes contact-spark-pop {
  0%, 100% { opacity: .35; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.45); }
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero-illustration * {
    animation: none;
  }
}
</style>
