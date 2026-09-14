// Eagerly picks up every image under src/assets/images/projects/<folder>/...
// Vite resolves these to final URLs at build time, so no manual import per file is needed —
// just drop files into the matching folder and they show up automatically.
const imageModules = import.meta.glob(
  '../assets/projects/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true, import: 'default' }
)

/**
 * @param {string} folder - matches the folder name under src/assets/images/projects/
 *   e.g. getProjectImages('agrilearn') looks in src/assets/images/projects/agrilearn/
 * @returns {string[]} resolved image URLs, sorted by filename
 */
export function getProjectImages(folder) {
  if (!folder) return []
  return Object.entries(imageModules)
    .filter(([path]) => path.includes(`/projects/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)
}