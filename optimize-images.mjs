import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/images/djs';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const inputPath = path.join(dir, file);
    const parsed = path.parse(file);
    const outputPath = path.join(dir, `${parsed.name}.webp`);
    
    // Skip if we already have the webp
    if (fs.existsSync(outputPath)) continue;

    console.log(`Optimizing ${file}...`);
    await sharp(inputPath)
      .resize(300, 300, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outputPath);
  }
}
console.log('Optimization complete!');
