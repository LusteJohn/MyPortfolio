import { describe, it, expect } from 'vitest'
import { modShortcut, modKeyLabel } from '../src/utils/modKey'

describe('modShortcut', () => {
  it('returns a non-empty modifier label', () => {
    expect(['⌘', 'Ctrl']).toContain(modKeyLabel())
  })

  it('builds a shortcut string with the label', () => {
    expect(modShortcut()).toMatch(/^(⌘|Ctrl)\+K$/)
    expect(modShortcut('P')).toMatch(/^(⌘|Ctrl)\+P$/)
  })
})