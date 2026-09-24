const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processAssets() {
  console.log('Processing brand assets...');
  
  // 1. Process simbolo (remove pure/near-white background to create transparent PNG)
  const symbolImg = sharp('public/brand/simbolo-grupo-norte.png');
  const { data, info } = await symbolImg.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  
  // data is RGBA buffer
  const totalPixels = info.width * info.height;
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Check whiteness
    // If pixel is near pure white:
    if (r > 240 && g > 240 && b > 240) {
      // White fade out
      const minVal = Math.min(r, g, b);
      if (minVal >= 250) {
        data[idx + 3] = 0; // completely transparent
      } else {
        const factor = (255 - minVal) / 15;
        data[idx + 3] = Math.round(255 * factor);
      }
    }
  }
  
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .trim() // trim transparent edges
  .png()
  .toFile('public/brand/simbolo-grupo-norte-transparent.png');
  
  console.log('simbolo-grupo-norte-transparent.png created.');

  // 2. Crop logo banner:
  // Let's inspect the banner and trim it cleanly
  const banner = sharp('public/brand/logo-grupo-norte-banner.png');
  await banner
    .trim({ threshold: 10 })
    .png()
    .toFile('public/brand/logo-grupo-norte-cropped.png');
    
  console.log('logo-grupo-norte-cropped.png created.');

  console.log('Brand asset processing completed successfully.');
}

processAssets().catch(err => {
  console.error('Error processing assets:', err);
  process.exit(1);
});
