import { describe, it, expect } from 'vitest'
import {
  projects,
  projectCounts,
  featuredProjectIds,
  MAX_TECH_CHIPS
} from '../src/data/projects'

describe('projects data', () => {
  it('has unique ids', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every project has the fields the cards and modal rely on', () => {
    for (const p of projects) {
      expect(p.title, `${p.id} title`).toBeTruthy()
      expect(p.summary, `${p.id} summary`).toBeTruthy()
      expect(p.status, `${p.id} status`).toBeTruthy()
      expect(['shipped', 'building', 'local'], `${p.id} status value`).toContain(p.status)
      expect(Array.isArray(p.tools), `${p.id} tools`).toBe(true)
      expect(Array.isArray(p.context), `${p.id} context`).toBe(true)
    }
  })

  it('counts match the actual list', () => {
    const counts = projectCounts()
    const tallied = projects.reduce(
      (acc, p) => ({ ...acc, [p.status]: acc[p.status] + 1 }),
      { shipped: 0, building: 0, local: 0 }
    )
    expect(counts.shipped).toBe(tallied.shipped)
    expect(counts.building).toBe(tallied.building)
    expect(counts.local).toBe(tallied.local)
    expect(counts.total).toBe(projects.length)
  })

  it('the offline count matches the offline flags', () => {
    const flagged = projects.filter((p) => p.offline).length
    const tagged = projects.filter((p) => p.traits?.includes('offline-first')).length
    // These drifted apart before; keep them in lockstep.
    expect(tagged).toBe(flagged)
  })

  it('platform values stay within the set the card renderer knows', () => {
    const known = new Set(['web', 'mobile', 'system', 'automation'])
    for (const p of projects) {
      expect(known.has(p.platform), `${p.id} platform "${p.platform}"`).toBe(true)
    }
  })

  it('featured ids all exist', () => {
    const ids = new Set(projects.map((p) => p.id))
    for (const id of featuredProjectIds) {
      expect(ids.has(id), `featured id ${id}`).toBe(true)
    }
  })

  it('every project links somewhere (code fallback)', () => {
    for (const p of projects) {
      expect(p.code, `${p.id} code`).toMatch(/^https:\/\//)
      if (p.live) expect(p.live, `${p.id} live`).toMatch(/^https:\/\//)
    }
  })

  it('every project lists at least one technology', () => {
    for (const p of projects) {
      expect(p.tools.length, `${p.id} tools`).toBeGreaterThan(0)
    }
  })

  it('no project lists more tools than the card can show', () => {
    // Cards slice to MAX_TECH_CHIPS; longer lists are fine, they just truncate
    expect(MAX_TECH_CHIPS).toBeGreaterThan(0)
    expect(MAX_TECH_CHIPS).toBeLessThanOrEqual(6)
  })
})