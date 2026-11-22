/**
 * Moves original (non-WebP) images out of src/assets into design-source/,
 * keeping the same relative folder structure.
 *
 * Run once after `npm run images:optimize`. This keeps the originals
 * recoverable while removing ~38 MB of unused rasters from the bundle.
 *
 *   npm run images:archive
 */
import { readdir, rename, mkdir, stat } from 'node:fs/promises'
import { join, extname, dirname } from 'node:path'

const SRC = 'src/assets'
const DEST = 'design-source'
const KEEP = new Set(['.webp', '.avif', '.svg', '.gif'])

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

let moved = 0
let bytes = 0

for (const file of await walk(SRC)) {
  const ext = extname(file).toLowerCase()
  if (KEEP.has(ext)) continue

  // only archive originals that already have a WebP replacement
  const webp = file.replace(/\.[^.]+$/, '.webp')
  try {
    await stat(webp)
  } catch {
    continue
  }

  const relative = file.replace(/^src\/assets[\\/]/, '')
  const target = join(DEST, relative)
  await mkdir(dirname(target), { recursive: true })
  await rename(file, target)

  bytes += (await stat(target)).size
  moved++
}

console.log(`${moved} originals archived to ${DEST}/ (${(bytes / 1048576).toFixed(1)} MB)`)