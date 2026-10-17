const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const files = [
  'rubor-crema-coral01.png',
  'rubor-crema-rosa02.png',
  'rubor-crema-granate03.png',
  'rubor-crema-carmesi04.png'
];

const CANVAS_SIZE = 700;
const TARGET_HEIGHT = 560; // 80% of canvas height

files.forEach(fileName => {
  const inputPath = path.join(__dirname, '../public/products/backup_original', fileName);
  const outputPath = path.join(__dirname, '../public/products', fileName);

  const raw = fs.readFileSync(inputPath);
  const src = PNG.sync.read(raw);
  const w = src.width;
  const h = src.height;

  // 1. Flood-fill background detection
  const isBg = new Uint8Array(w * h);
  const queue = [];

  // Seed with all perimeter pixels
  for (let x = 0; x < w; x++) {
    queue.push(x, 0); isBg[x] = 1;
    queue.push(x, h - 1); isBg[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue.push(0, y); isBg[y * w] = 1;
    queue.push(w - 1, y); isBg[y * w + w - 1] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const cidx = (cy * w + cx) << 2;
    const cr = src.data[cidx], cg = src.data[cidx + 1], cb = src.data[cidx + 2];

    const neighbors = [
      [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!isBg[nidx]) {
          const npx = nidx << 2;
          const nr = src.data[npx], ng = src.data[npx + 1], nb = src.data[npx + 2];
          const maxC = Math.max(nr, ng, nb);
          const minC = Math.min(nr, ng, nb);
          const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;
          const diff = Math.abs(cr - nr) + Math.abs(cg - ng) + Math.abs(cb - nb);

          // Studio backdrop is high lightness, low saturation
          if (minC > 185 && sat < 0.16 && diff < 18) {
            isBg[nidx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // 2. Determine tight bounding box of product
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!isBg[y * w + x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const prodW = maxX - minX + 1;
  const prodH = maxY - minY + 1;

  // 3. Compute alpha mask with edge smoothing
  const alphaMask = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (isBg[idx]) {
        alphaMask[idx] = 0;
      } else {
        // Count how many of 8 neighbors are background
        let bgNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || nx >= w || ny < 0 || ny >= h || isBg[ny * w + nx]) {
              bgNeighbors++;
            }
          }
        }
        if (bgNeighbors === 0) {
          alphaMask[idx] = 1.0;
        } else {
          // Feather edge based on neighboring background ratio
          alphaMask[idx] = Math.max(0.2, 1.0 - (bgNeighbors / 8) * 0.7);
        }
      }
    }
  }

  // 4. Create target square transparent canvas
  const dst = new PNG({ width: CANVAS_SIZE, height: CANVAS_SIZE });
  // Initialized to all zeros (fully transparent)

  // Scale factor to make every bottle have TARGET_HEIGHT
  const scale = TARGET_HEIGHT / prodH;
  const scaledW = prodW * scale;
  const scaledH = TARGET_HEIGHT;

  // Center coordinates in dst
  const dstStartX = Math.round((CANVAS_SIZE - scaledW) / 2);
  const dstStartY = Math.round((CANVAS_SIZE - scaledH) / 2);

  // Resample cropped product into dst using bilinear interpolation
  for (let dy = 0; dy < scaledH; dy++) {
    const dstY = dstStartY + dy;
    if (dstY < 0 || dstY >= CANVAS_SIZE) continue;

    const srcY = minY + dy / scale;
    const y0 = Math.floor(srcY);
    const y1 = Math.min(h - 1, y0 + 1);
    const wy1 = srcY - y0;
    const wy0 = 1 - wy1;

    for (let dx = 0; dx < scaledW; dx++) {
      const dstX = dstStartX + dx;
      if (dstX < 0 || dstX >= CANVAS_SIZE) continue;

      const srcX = minX + dx / scale;
      const x0 = Math.floor(srcX);
      const x1 = Math.min(w - 1, x0 + 1);
      const wx1 = srcX - x0;
      const wx0 = 1 - wx1;

      // Sample 4 pixels
      const i00 = (y0 * w + x0);
      const i10 = (y0 * w + x1);
      const i01 = (y1 * w + x0);
      const i11 = (y1 * w + x1);

      const a00 = alphaMask[i00];
      const a10 = alphaMask[i10];
      const a01 = alphaMask[i01];
      const a11 = alphaMask[i11];

      const a = (a00 * wx0 + a10 * wx1) * wy0 + (a01 * wx0 + a11 * wx1) * wy1;
      if (a < 0.01) continue;

      const p00 = i00 << 2, p10 = i10 << 2, p01 = i01 << 2, p11 = i11 << 2;

      const r = (src.data[p00] * wx0 + src.data[p10] * wx1) * wy0 + (src.data[p01] * wx0 + src.data[p11] * wx1) * wy1;
      const g = (src.data[p00 + 1] * wx0 + src.data[p10 + 1] * wx1) * wy0 + (src.data[p01 + 1] * wx0 + src.data[p11 + 1] * wx1) * wy1;
      const b = (src.data[p00 + 2] * wx0 + src.data[p10 + 2] * wx1) * wy0 + (src.data[p01 + 2] * wx0 + src.data[p11 + 2] * wx1) * wy1;

      const dstIdx = (dstY * CANVAS_SIZE + dstX) << 2;
      dst.data[dstIdx] = Math.round(r);
      dst.data[dstIdx + 1] = Math.round(g);
      dst.data[dstIdx + 2] = Math.round(b);
      dst.data[dstIdx + 3] = Math.round(Math.min(255, Math.max(0, a * 255)));
    }
  }

  // 5. Save standardized transparent PNG
  const outBuffer = PNG.sync.write(dst);
  fs.writeFileSync(outputPath, outBuffer);
  console.log(`Processed ${fileName}: Saved ${CANVAS_SIZE}x${CANVAS_SIZE} transparent PNG (product height: ${TARGET_HEIGHT}px, centered at ${CANVAS_SIZE/2},${CANVAS_SIZE/2})`);
});
