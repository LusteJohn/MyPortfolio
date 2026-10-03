import { ref, computed, onMounted } from 'vue'

const USERNAME = 'LusteJohn'
const WEEKS = 53
const CACHE_KEY = `gh-activity:v4:${USERNAME}`
const CACHE_TTL = 60 * 60 * 1000

export const GITHUB_URL = `https://github.com/${USERNAME}`

const EMPTY = { weeks: [], cells: [] }

export function timeAgo(iso) {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.round(diff / 60000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min}m ago`
  const hrs = Math.round(min / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.round(months / 12)}y ago`
}

function buildGrid(days) {
  const countBy = new Map(days.map((d) => [d.date, d.count]))
  const end = new Date()
  end.setHours(0, 0, 0, 0)
  // align to the most recent Sunday so every column holds a full week
  const lastSunday = new Date(end)
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay())
  const start = new Date(lastSunday)
  start.setDate(start.getDate() - (WEEKS * 7 - 1))

  const cells = []
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    cells.push({ date: key, count: countBy.get(key) || 0, day: d.getDay(), month: d.getMonth() })
  }
  return { cells, weeks: Array.from({ length: WEEKS }, (_, w) => cells.slice(w * 7, w * 7 + 7)) }
}

export function useGithubActivity() {
  const status = ref('idle')
  const grid = ref(EMPTY)
  const total = ref(0)
  const activeDays = ref(0)
  const streak = ref(0)
  const topRepos = ref([])
  const privateRepos = ref([])
  const updatedAt = ref(null)

  const max = computed(() => grid.value.cells.reduce((m, c) => Math.max(m, c.count), 0))

  const streakLabel = computed(() => (streak.value ? `${streak.value} day streak` : 'No active streak'))

  const totalLabel = computed(() => `${total.value.toLocaleString()} contributions in the last year`)

  const monthLabels = computed(() => {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const labels = []
    let prev = null
    for (const week of grid.value.weeks) {
      const first = week[0]
      const show = first && first.month !== prev
      labels.push(show ? MONTHS[first.month] : '')
      if (first) prev = first.month
    }
    return labels
  })

  const weekdayLabels = { 1: 'Mon', 3: 'Wed', 5: 'Fri' }

  function level(count) {
    if (!count || !max.value) return 0
    const ratio = count / max.value
    if (ratio <= 0.25) return 1
    if (ratio <= 0.5) return 2
    if (ratio <= 0.75) return 3
    return 4
  }

  function apply(state, stamp) {
    grid.value = state.grid
    total.value = state.totalContributions
    activeDays.value = state.activeDays
    topRepos.value = state.topRepos
    privateRepos.value = state.privateRepos || []
    updatedAt.value = stamp
    computeStreak()
  }

  async function load() {
    status.value = 'loading'

    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.stamp < CACHE_TTL) {
          apply(parsed.state, parsed.stamp)
          status.value = 'ready'
          return
        }
      } catch { /* fall through to a fresh request */ }
    }

    try {
      let state
      let usedFallback = false
      try {
        state = await fetchFromApi()
      } catch (err) {
        console.warn('[github-activity] /api/github failed, falling back to public events', err)
        state = await fallbackToEvents()
        usedFallback = true
      }
      const stamp = Date.now()
      apply(state, stamp)
      // don't cache the public-only fallback, so the next load retries the full data
      if (!usedFallback) localStorage.setItem(CACHE_KEY, JSON.stringify({ stamp, state }))
      status.value = 'ready'
    } catch (err) {
      console.warn('[github-activity] could not load activity', err)
      status.value = 'error'
    }
  }

  function computeStreak() {
    let run = 0
    for (let i = grid.value.cells.length - 1; i >= 0; i--) {
      if (!grid.value.cells[i].count) break
      run++
    }
    streak.value = run
  }

  // The token lives only in the serverless function (api/github.js)
  async function fetchFromApi() {
    const res = await fetch('/api/github')
    if (!res.ok) throw new Error(`/api/github responded ${res.status}`)
    const data = await res.json()
    return {
      grid: buildGrid(data.days),
      totalContributions: data.totalContributions,
      activeDays: data.activeDays,
      topRepos: data.topRepos,
      privateRepos: data.privateRepos || []
    }
  }

  async function fallbackToEvents() {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
    const events = await res.json()

    const counts = {}
    const repos = {}
    for (const e of events) {
      const day = (e.created_at || '').slice(0, 10)
      if (!day) continue
      counts[day] = (counts[day] || 0) + 1
      const repo = e.repo?.name?.split('/')[1]
      if (repo) repos[repo] = (repos[repo] || 0) + 1
    }

    const days = Object.entries(counts).map(([date, count]) => ({ date, count }))
    return {
      grid: buildGrid(days),
      totalContributions: days.reduce((s, d) => s + d.count, 0),
      activeDays: days.length,
      topRepos: Object.entries(repos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, count]) => ({ name, count })),
      privateRepos: []
    }
  }

  onMounted(load)

  return { status, grid, total, totalLabel, activeDays, streak, streakLabel, topRepos, privateRepos, monthLabels, weekdayLabels, updatedAt, level, reload: load }
}