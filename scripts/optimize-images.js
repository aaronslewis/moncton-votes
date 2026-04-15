/**
 * optimize-images.js
 *
 * Resizes and converts candidate portrait photos to WebP.
 * Output: 168×168px (2× for retina at 84px display size), quality 88.
 *
 * Run: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = join(__dirname, '../public/images');
const OUTPUT_DIR = join(__dirname, '../public/images');
const DISPLAY_PX = 84;   // CSS display size
const SOURCE_PX  = DISPLAY_PX * 2;  // 168 — retina 2×

const files = await readdir(INPUT_DIR);
const jpgs  = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`Found ${jpgs.length} image(s) to process...\n`);

for (const file of jpgs) {
  const inputPath  = join(INPUT_DIR, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(OUTPUT_DIR, outputName);

  const { width, height } = await sharp(inputPath).metadata();

  await sharp(inputPath)
    .resize(SOURCE_PX, SOURCE_PX, {
      fit: 'cover',           // crop to square, centred — matches CSS object-fit:cover
      position: 'attention',  // smart crop: focuses on the most interesting region
    })
    .webp({ quality: 88 })
    .toFile(outputPath);

  const inputKB  = Math.round((await import('fs')).statSync(inputPath).size  / 1024);
  const outputKB = Math.round((await import('fs')).statSync(outputPath).size / 1024);

  console.log(`✓ ${file} (${width}×${height}, ${inputKB} KB) → ${outputName} (${SOURCE_PX}×${SOURCE_PX}, ${outputKB} KB)`);
}

console.log('\nDone! Update candidates.js photo paths from .jpg → .webp');
