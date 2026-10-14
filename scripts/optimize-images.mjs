import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const scriptPath = fileURLToPath(import.meta.url)
const projectDir = join(dirname(scriptPath), '..')
const SOURCE_DIR = join(projectDir, '.vscode', 'images')
const OUTPUT_DIR = join(projectDir, 'public', 'images')

// Offsets are pixels from the top-left of the EXIF-corrected original; null centers the crop.
export const TARGETS = {
  'hero.jpg': {
    source: 'KakaoTalk_20261014_083324918.jpg',
    width: 1080, height: 1920, quality: 80,
    offset: { left: null, top: null },
  },
  'divider-1.jpg': {
    source: 'KakaoTalk_20261014_083216806.jpg',
    width: 1200, height: 1500, quality: 78,
    offset: { left: null, top: null },
  },
  'divider-2.jpg': {
    source: 'KakaoTalk_20261014_083241479.jpg',
    width: 1200, height: 1500, quality: 78,
    offset: { left: null, top: null },
  },
  'divider-3.jpg': {
    source: 'KakaoTalk_20261014_083405445.jpg',
    width: 1200, height: 1500, quality: 78,
    offset: { left: null, top: null },
  },
  'og-thumbnail.jpg': {
    source: 'KakaoTalk_20261014_083642020_04.jpg',
    width: 1200, height: 630, quality: 80,
    offset: { left: null, top: 1100 },
  },
}

export function getCropRegion(sourceWidth, sourceHeight, target) {
  const ratio = target.width / target.height
  const width = Math.min(sourceWidth, Math.max(1, Math.round(sourceHeight * ratio)))
  const height = Math.min(sourceHeight, Math.max(1, Math.round(sourceWidth / ratio)))
  const maxLeft = sourceWidth - width
  const maxTop = sourceHeight - height
  const left = target.offset?.left ?? Math.floor(maxLeft / 2)
  const top = target.offset?.top ?? Math.floor(maxTop / 2)

  if (!Number.isInteger(left) || left < 0 || left > maxLeft ||
      !Number.isInteger(top) || top < 0 || top > maxTop) {
    throw new Error(`Invalid crop offset: left must be 0..${maxLeft}, top must be 0..${maxTop} (integer pixels)`)
  }

  return { left, top, width, height }
}

export async function optimizeImages(sourceDir = SOURCE_DIR, outputDir = OUTPUT_DIR, targets = TARGETS) {
  if (resolve(sourceDir) === resolve(outputDir)) {
    throw new Error('Source and output directories must be different')
  }
  await mkdir(outputDir, { recursive: true })

  for (const [file, target] of Object.entries(targets)) {
    const input = await readFile(join(sourceDir, target.source))
    const { data, info } = await sharp(input).rotate().toBuffer({ resolveWithObject: true })
    const region = getCropRegion(info.width, info.height, target)
    const output = await sharp(data)
      .extract(region)
      .resize(target.width, target.height, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: target.quality, mozjpeg: true })
      .toBuffer()

    await writeFile(join(outputDir, file), output)
    const result = await sharp(output).metadata()
    console.log(`optimized: ${target.source} -> ${file} ${result.width}x${result.height}; crop ${JSON.stringify(region)}`)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  optimizeImages().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
