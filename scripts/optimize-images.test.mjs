import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, mkdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import { getCropRegion, optimizeImages } from './optimize-images.mjs'

test('crop defaults to center and accepts explicit pixel offsets', () => {
  const target = { width: 100, height: 100 }
  assert.deepEqual(getCropRegion(400, 200, target), { left: 100, top: 0, width: 200, height: 200 })
  assert.deepEqual(getCropRegion(200, 400, { ...target, offset: { top: 200 } }),
    { left: 0, top: 200, width: 200, height: 200 })
  assert.throws(() => getCropRegion(400, 200, { ...target, offset: { left: 201 } }), /0\.\.200/)
  assert.throws(() => getCropRegion(400, 200, { ...target, offset: { left: -1 } }), /Invalid crop offset/)
  assert.throws(() => getCropRegion(400, 200, { ...target, offset: { left: 0.5 } }), /integer pixels/)
})

test('reads originals, applies offsets, and preserves sources on repeated runs', async () => {
  const root = await mkdtemp(join(tmpdir(), 'invitation-images-'))
  try {
    const sourceDir = join(root, 'originals')
    const outputDir = join(root, 'output')
    await mkdir(sourceDir)
    const originalPath = join(sourceDir, 'original.png')
    const blue = await sharp({ create: { width: 200, height: 200, channels: 3, background: '#0000ff' } }).png().toBuffer()
    await sharp({ create: { width: 400, height: 200, channels: 3, background: '#ff0000' } })
      .composite([{ input: blue, left: 200, top: 0 }]).png().toFile(originalPath)
    const original = await readFile(originalPath)
    const targets = { 'result.jpg': { source: 'original.png', width: 100, height: 100, quality: 90, offset: { left: 200, top: 0 } } }
    await optimizeImages(sourceDir, outputDir, targets)
    const first = await readFile(join(outputDir, 'result.jpg'))
    const metadata = await sharp(first).metadata()
    assert.equal(metadata.width, 100)
    assert.equal(metadata.height, 100)
    const { data } = await sharp(first).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    assert.ok(data[2] > 240 && data[0] < 10, 'explicit offset selects the blue half')
    await optimizeImages(sourceDir, outputDir, targets)
    assert.deepEqual(await readFile(originalPath), original)
    assert.deepEqual(await readFile(join(outputDir, 'result.jpg')), first)
    await assert.rejects(optimizeImages(sourceDir, sourceDir, targets), /must be different/)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('crop coordinates apply after EXIF orientation correction', async () => {
  const root = await mkdtemp(join(tmpdir(), 'invitation-orientation-'))
  try {
    const sourceDir = join(root, 'originals')
    const outputDir = join(root, 'output')
    await mkdir(sourceDir)
    await sharp({ create: { width: 400, height: 200, channels: 3, background: '#00ff00' } })
      .withMetadata({ orientation: 6 }).jpeg().toFile(join(sourceDir, 'rotated.jpg'))
    await optimizeImages(sourceDir, outputDir, {
      'result.jpg': { source: 'rotated.jpg', width: 100, height: 100, quality: 80, offset: { left: 0, top: 200 } },
    })
    const result = await sharp(await readFile(join(outputDir, 'result.jpg'))).metadata()
    assert.equal(result.width, 100)
    assert.equal(result.height, 100)
    assert.equal(result.orientation, undefined)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})