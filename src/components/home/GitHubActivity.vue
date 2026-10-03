<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useGithubActivity, GITHUB_URL, timeAgo } from '../../composables/useGithubActivity'

const {
  status, grid, totalLabel, activeDays, streakLabel, topRepos, privateRepos,
  monthLabels, weekdayLabels, level, reload
} = useGithubActivity()

const isOpen = ref(false)

const hovered = ref(null)

function showCell(cell, evt) {
  const rect = evt.currentTarget.getBoundingClientRect()
  hovered.value = {
    date: cell.date,
    count: cell.count,
    level: level(cell.count),
    left: rect.left + rect.width / 2,
    top: rect.top
  }
}

function hideCell() {
  hovered.value = null
}

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return `${DAYS[new Date(y, m - 1, d).getDay()]}, ${MONTHS[m - 1]} ${d}, ${y}`
}

function onKey(e) {
  if (e.key === 'Escape') isOpen.value = false
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <section class="gh-card" aria-label="GitHub activity">
    <header class="gh-head">
      <div>
        <div class="b-eyebrow">GitHub activity</div>
        <a class="gh-user" :href="GITHUB_URL" target="_blank" rel="noopener">
          <i class="fa-brands fa-github"></i> LusteJohn
          <i class="fa-solid fa-arrow-up-right-from-square gh-ext"></i>
        </a>
      </div>
      <span class="gh-state" :class="`is-${status}`">
        <template v-if="status === 'loading'">syncing</template>
        <template v-else-if="status === 'error'">
          <button type="button" class="gh-retry" @click="reload">retry</button>
        </template>
        <template v-else>live</template>
      </span>
    </header>

    <p class="gh-total">{{ totalLabel }}</p>

    <div class="gh-chart">
      <div class="gh-months" aria-hidden="true">
        <span v-for="(label, wi) in monthLabels" :key="`m-${wi}`">{{ label }}</span>
      </div>

      <div class="gh-chart-body">
        <div class="gh-days" aria-hidden="true">
          <span v-for="(label, di) in weekdayLabels" :key="di" :style="{ gridRow: Number(di) + 1 }">{{ label }}</span>
        </div>

        <div class="gh-grid" role="img" aria-label="Daily GitHub contributions over the last year">
          <div v-for="(week, wi) in grid.weeks" :key="wi" class="gh-week">
            <span
              v-for="cell in week"
              :key="cell.date"
              class="gh-cell"
              :class="`lv-${level(cell.count)}`"
              @mouseenter="showCell(cell, $event)"
              @mouseleave="hideCell"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <div class="gh-legend">
      <span>Less</span>
      <i class="gh-cell lv-0"></i>
      <i class="gh-cell lv-1"></i>
      <i class="gh-cell lv-2"></i>
      <i class="gh-cell lv-3"></i>
      <i class="gh-cell lv-4"></i>
      <span>More</span>
    </div>

    <Transition name="gh-tip">
      <div
        v-if="hovered"
        class="gh-tip"
        :style="{ left: `${hovered.left}px`, top: `${hovered.top}px` }"
      >
        <b>{{ hovered.count }}</b>
        {{ hovered.count === 1 ? 'contribution' : 'contributions' }}
        <span class="gh-tip-date">{{ formatDate(hovered.date) }}</span>
      </div>
    </Transition>

    <div class="gh-foot">
      <ul class="gh-stats">
        <li><b>{{ activeDays }}</b><span>Active days</span></li>
        <li><span class="gh-streak">{{ streakLabel }}</span></li>
      </ul>

      <button type="button" class="gh-more" @click="isOpen = true">
        Details
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </button>
    </div>

    <div v-if="isOpen" class="gh-modal-backdrop" @click.self="isOpen = false">
      <div class="gh-modal" role="dialog" aria-modal="true" aria-label="GitHub activity details">
        <button class="gh-modal-close" aria-label="Close" @click="isOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <header class="gh-modal-head">
          <div class="b-eyebrow">GitHub activity</div>
          <a class="gh-user" :href="GITHUB_URL" target="_blank" rel="noopener">
            <i class="fa-brands fa-github"></i> LusteJohn
            <i class="fa-solid fa-arrow-up-right-from-square gh-ext"></i>
          </a>
        </header>

        <ul v-if="topRepos.length" class="gh-repos">
          <li v-for="r in topRepos" :key="r.name">
            <span class="gh-repo-name">{{ r.name }}</span>
            <span class="gh-bar"><i :style="{ width: `${Math.min(100, (r.count / topRepos[0].count) * 100)}%` }"></i></span>
          </li>
        </ul>

        <div v-if="privateRepos.length" class="gh-private">
          <div class="b-eyebrow">
            <i class="fa-solid fa-lock"></i>
            Private repos · {{ privateRepos.length }}
          </div>
          <table class="gh-table">
            <thead>
              <tr>
                <th scope="col">Repo</th>
                <th scope="col">Last commit</th>
                <th scope="col">Pushed</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in privateRepos" :key="r.name">
                <td>
                  <div class="gh-rname">
                    <span v-if="r.language" class="gh-dot" :style="{ background: r.color || 'var(--orange)' }"></span>
                    {{ r.name }}
                  </div>
                  <div class="gh-desc">{{ r.lastCommit || r.description || 'No recent commits' }}</div>
                </td>
                <td class="gh-when">{{ timeAgo(r.lastCommitAt) }}</td>
                <td class="gh-when">{{ timeAgo(r.pushedAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="gh-empty">No private repos exposed by the configured token.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gh-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.gh-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.gh-user {
  font-weight: 700;
  font-size: .95rem;
  color: var(--ink);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.gh-user:hover { color: var(--orange); }

.gh-ext { font-size: .6rem; opacity: .6; }

.gh-state {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.gh-state::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--muted);
}

.gh-state.is-ready::before { background: var(--orange); }
.gh-state.is-error::before { background: #c0392b; }
.gh-state.is-loading::before { background: var(--line); }

.gh-retry {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--orange);
  cursor: pointer;
  text-decoration: underline;
}

.gh-total {
  margin: 0;
  font-size: .82rem;
  font-weight: 600;
  color: var(--ink);
}

.gh-chart {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.gh-months {
  display: flex;
  gap: 3px;
  min-width: max-content;
}

.gh-months span {
  flex: 1 0 9px;
  font-size: .62rem;
  color: var(--muted);
  white-space: nowrap;
  overflow: visible;
}

.gh-chart-body {
  display: flex;
  gap: 5px;
}

.gh-days {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 3px;
  flex: 0 0 auto;
}

.gh-days span {
  font-size: .58rem;
  color: var(--muted);
  align-self: center;
  line-height: 1;
}

.gh-grid {
  display: flex;
  gap: 3px;
  min-width: max-content;
}

.gh-week {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1 0 9px;
}

.gh-cell {
  aspect-ratio: 1;
  border-radius: 2px;
  background: var(--line);
  display: block;
  transition: transform .12s ease, outline-color .12s ease;
  outline: 2px solid transparent;
}

.gh-cell:hover {
  transform: scale(1.35);
  outline-color: var(--orange);
  position: relative;
  z-index: 2;
}

.gh-cell.lv-1 { background: #f7c9a8; }
.gh-cell.lv-2 { background: #f0a273; }
.gh-cell.lv-3 { background: var(--orange); }
.gh-cell.lv-4 { background: var(--ink); }

.gh-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-size: .65rem;
  color: var(--muted);
}

.gh-legend .gh-cell {
  width: 9px;
  height: 9px;
  aspect-ratio: auto;
}

.gh-legend .gh-cell:hover {
  transform: none;
  outline-color: transparent;
}

.gh-stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 18px;
}

.gh-stats li {
  display: flex;
  flex-direction: column;
}

.gh-stats b {
  font-size: 1.15rem;
  color: var(--ink);
}

.gh-stats span {
  font-size: .72rem;
  color: var(--muted);
}

.gh-streak {
  font-size: .95rem;
  font-weight: 600;
  color: var(--ink);
  align-self: flex-end;
}

.gh-tip {
  position: fixed;
  z-index: 80;
  transform: translate(-50%, calc(-100% - 8px));
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--ink);
  color: #fff;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: .72rem;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 6px 18px rgba(23, 27, 36, .22);
}

.gh-tip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--ink);
}

.gh-tip b {
  font-weight: 700;
  color: var(--orange);
}

.gh-tip-date {
  color: rgba(255, 255, 255, .68);
  font-size: .66rem;
}

.gh-tip-enter-active,
.gh-tip-leave-active {
  transition: opacity .14s ease, transform .14s ease;
}

.gh-tip-enter-from,
.gh-tip-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-100% - 4px));
}

.gh-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.gh-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--ink);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: .74rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: transform .2s ease, background .2s ease;
}

.gh-more:hover {
  transform: translateY(-1px);
  background: #000;
}

.gh-more i { font-size: .62rem; }

.gh-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(23, 27, 36, .55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.gh-modal {
  position: relative;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 22px;
  width: 100%;
  max-width: 560px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gh-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  display: grid;
  place-items: center;
}

.gh-modal-close:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.gh-modal-head .gh-user { font-size: 1.05rem; }

.gh-empty {
  margin: 0;
  color: var(--muted);
  font-size: .8rem;
}

.gh-repos {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gh-repos li {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 8px;
}

.gh-repo-name {
  font-size: .72rem;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gh-bar {
  height: 6px;
  border-radius: 3px;
  background: var(--line);
  overflow: hidden;
}

.gh-bar i {
  display: block;
  height: 100%;
  background: var(--orange);
  border-radius: 3px;
}

.gh-private {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid var(--line);
  padding-top: 12px;
}

.gh-private .b-eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .68rem;
}

.gh-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.gh-table th {
  text-align: left;
  font-size: .62rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 700;
  padding-bottom: 4px;
}

.gh-table th:last-child,
.gh-table td:last-child { width: 58px; }
.gh-table th:nth-child(2),
.gh-table td:nth-child(2) { width: 68px; }

.gh-table td {
  padding: 7px 0;
  border-top: 1px solid var(--line);
  vertical-align: top;
  font-size: .76rem;
}

.gh-rname {
  font-weight: 600;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 6px;
}

.gh-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: 0 0 8px;
}

.gh-desc {
  color: var(--muted);
  font-size: .7rem;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gh-when {
  color: var(--muted);
  white-space: nowrap;
  font-size: .7rem;
}

@media (max-width: 900px) {
  .gh-card { max-width: 420px; }
}
</style>