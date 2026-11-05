<template>
  <div class="project-hero-illustration" aria-hidden="true">
    <svg viewBox="0 0 360 220" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      <path class="route route--one" d="M32 170H92V126H160V82H224V48H316" />
      <path class="route route--two" d="M54 190H126V154H198V112H278V78H332" />

      <g class="node node--one">
        <rect x="18" y="156" width="28" height="28" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
        <rect x="26" y="164" width="12" height="12" fill="#EE7B33"/>
      </g>
      <g class="node node--two">
        <rect x="146" y="68" width="28" height="28" fill="#FBE6D4" stroke="#171B24" stroke-width="3"/>
        <rect x="154" y="76" width="12" height="12" fill="#171B24"/>
      </g>
      <g class="node node--three">
        <rect x="302" y="34" width="34" height="34" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
        <rect x="312" y="44" width="14" height="14" fill="#EE7B33"/>
      </g>

      <g class="project-window">
        <rect x="94" y="104" width="172" height="82" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
        <rect x="94" y="104" width="172" height="14" fill="#171B24"/>
        <rect x="104" y="109" width="6" height="5" fill="#EE7B33"/>
        <rect x="116" y="109" width="6" height="5" fill="#FBE6D4"/>
        <rect class="window-line window-line--one" x="112" y="132" width="86" height="7" fill="#EE7B33"/>
        <rect class="window-line window-line--two" x="112" y="146" width="122" height="7" fill="#E7E0CE"/>
        <rect class="window-line window-line--three" x="112" y="160" width="58" height="7" fill="#171B24"/>
        <rect class="window-cursor" x="244" y="144" width="7" height="12" fill="#EE7B33"/>
      </g>

      <rect class="spark spark--one" x="74" y="48" width="7" height="7" fill="#EE7B33"/>
      <rect class="spark spark--two" x="276" y="128" width="6" height="6" fill="#171B24"/>
      <rect class="spark spark--three" x="288" y="146" width="4" height="4" fill="#EE7B33"/>
      <circle class="orbit-dot orbit-dot--one" cx="70" cy="94" r="4" fill="#171B24"/>
      <circle class="orbit-dot orbit-dot--two" cx="290" cy="92" r="4" fill="#EE7B33"/>
    </svg>
    <span class="project-hero-label"><i></i> Systems in motion</span>
  </div>
</template>

<style scoped>
.project-hero-illustration {
  position: relative;
  width: min(100%, 460px);
  margin: 0 auto 12px;
  padding: 8px 0 0;
}

.project-hero-illustration svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.route {
  fill: none;
  stroke: #E7E0CE;
  stroke-width: 3;
  stroke-dasharray: 6 8;
  animation: route-march 7s linear infinite;
}

.route--two {
  animation-duration: 9s;
  animation-direction: reverse;
  opacity: .7;
}

.node,
.project-window,
.spark,
.orbit-dot,
.window-line,
.window-cursor {
  transform-box: fill-box;
  transform-origin: center;
}

.node {
  animation: node-pulse 2.8s steps(2, end) infinite;
}

.node--two { animation-delay: .6s; }
.node--three { animation-delay: 1.2s; }

.project-window {
  animation: window-float 4s steps(2, end) infinite;
}

.window-line--one { animation: line-type 2.4s steps(4, end) infinite; }
.window-line--two { animation: line-type 2.4s steps(4, end) .4s infinite; }
.window-line--three { animation: line-type 2.4s steps(4, end) .8s infinite; }

.window-cursor {
  animation: cursor-blink .8s steps(1, end) infinite;
}

.spark,
.orbit-dot {
  animation: spark-pop 2s steps(2, end) infinite;
}

.spark--two { animation-delay: .5s; }
.spark--three { animation-delay: 1s; }
.orbit-dot--one { animation-delay: .8s; }
.orbit-dot--two { animation-delay: 1.4s; }

.project-hero-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: 0 0 0 12px;
  font-family: 'Pixelify Sans', sans-serif;
  font-size: .7rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #767258;
}

.project-hero-label i {
  width: 7px;
  height: 7px;
  background: #3fa66a;
  box-shadow: 2px 2px 0 #171B24;
}

@keyframes route-march {
  to { stroke-dashoffset: -56; }
}

@keyframes node-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

@keyframes window-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes line-type {
  0%, 100% { transform: scaleX(1); opacity: 1; }
  50% { transform: scaleX(.72); opacity: .6; }
}

@keyframes cursor-blink {
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: .2; }
}

@keyframes spark-pop {
  0%, 100% { opacity: .35; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.45); }
}

@media (prefers-reduced-motion: reduce) {
  .project-hero-illustration * {
    animation: none;
  }
}
</style>
