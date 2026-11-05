const isApple = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '')

/** The modifier key the visitor's keyboard actually uses. */
export function modKeyLabel() {
  return isApple() ? '⌘' : 'Ctrl'
}

/** e.g. "⌘K" on macOS, "Ctrl+K" on Windows/Linux. */
export function modShortcut(label = 'K') {
  return `${modKeyLabel()}+${label}`
}
