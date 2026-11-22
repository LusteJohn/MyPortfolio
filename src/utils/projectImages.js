import { projects } from '../data/projects'

// Eagerly picks up images under src/assets/projects/<folder>/...
// Vite resolves these to final URLs at build time, so no manual import per file
// is needed — just drop files into a folder referenced by projects.js.
const imageModules = import.meta.glob(
  '../assets/projects/**/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, import: 'default' }
)

// Only ship folders a project actually references. Without this, every stray
// screenshot folder in src/assets/projects/ gets bundled into the build.
const referencedFolders = new Set(
  projects.map((p) => p.images).filter((folder) => typeof folder === 'string' && folder)
)

/**
 * Groups every module by the project folder it belongs to, keeping the
 * preferred (modern) format first when the same shot exists as both
 * WebP/AVIF and a legacy raster.
 */
const byFolder = new Map()
for (const [path, url] of Object.entries(imageModules)) {
  const match = path.match(/\/projects\/([^/]+)\//)
  if (!match) continue
  const folder = match[1]
  if (!referencedFolders.has(folder)) continue

  if (!byFolder.has(folder)) byFolder.set(folder, [])
  byFolder.get(folder).push({ path, url })
}

const PREFERRED = [/\.avif$/i, /\.webp$/i]
const RANK = (path) => {
  const i = PREFERRED.findIndex((re) => re.test(path))
  return i === -1 ? PREFERRED.length : i
}

for (const list of byFolder.values()) {
  list.sort((a, b) => {
    // modern format first, then keep a stable filename order
    const byFormat = RANK(a.path) - RANK(b.path)
    if (byFormat !== 0) return byFormat
    return a.path.localeCompare(b.path)
  })
}

/**
 * @param {string} folder - matches the folder name under src/assets/projects/
 *   e.g. getProjectImages('agrilearn') looks in src/assets/projects/agrilearn/
 * @returns {string[]} resolved image URLs, modern format first, sorted by filename
 */
export function getProjectImages(folder) {
  if (!folder) return []
  return (byFolder.get(folder) || []).map((entry) => entry.url)
}

/** True when a folder has at least one image on disk. */
export function hasProjectImages(folder) {
  return (byFolder.get(folder) || []).length > 0
}