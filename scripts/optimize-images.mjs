/**
 * Converts project and credential images to WebP at a sensible max width.
 *
 *   npm run images:optimize
 *
 * Only touches files that actually got smaller, and writes next to the
 * original so the existing import paths keep working via the
 * preferred-format ordering in src/utils/projectImages.js.
 *
 * Delete a source file once its .webp exists and you're happy with the result —
 * the app prefers WebP automatically, and unreferenced sources aren't shipped.
 */
import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const ROOTS = ['src/assets/projects', 'src/assets/credential']
const MAX_WIDTH = 1400
const QUALITY = 78
const SKIP = new Set(['.webp', '.avif', '.svg', '.gif'])

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`
}

let converted = 0
let saved = 0
let skipped = 0

for (const root of ROOTS) {
  let files
  try {
    files = await walk(root)
  } catch {
    console.warn(`skip missing dir: ${root}`)
    continue
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (SKIP.has(ext)) continue

    const target = file.replace(/\.[^.]+$/, '.webp')

    let before
    try {
      before = (await stat(file)).size
    } catch {
      continue
    }

    try {
      const result = await sharp(file)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(target)

      if (result.size >= before) {
        skipped++
        continue
      }

      const pct = Math.round((1 - result.size / before) * 100)
      console.log(
        `${basename(file)}  ${kb(before)} -> ${kb(result.size)}  (-${pct}%)`
      )
      converted++
      saved += before - result.size
    } catch (err) {
      console.warn(`failed: ${file} — ${err.message}`)
    }
  }
}

console.log(
  `\n${converted} converted, ${skipped} left as-is, ${kb(saved)} saved total`
)