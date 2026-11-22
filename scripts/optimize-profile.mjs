/**
 * Optimises the two profile rasters used for the avatar and favicon.
 * Run after editing them: npm run images:optimize
 */
import sharp from 'sharp'

const jobs = [
  { src: 'src/assets/images/profile.png', out: 'src/assets/images/profile.webp', width: 256 },
  { src: 'src/assets/images/profile_pixel.jpeg', out: 'src/assets/images/profile_pixel.webp', width: 320 }
]

for (const { src, out, width } of jobs) {
  const info = await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  console.log(`${src} -> ${out}  ${(info.size / 1024).toFixed(0)} KB`)
}