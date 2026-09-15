const fs = require('fs');
const zlib = require('zlib');

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makePngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function encodeRGBA(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = makePngChunk('IHDR', ihdrData);

  // Scanlines with filter 0
  const scanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    scanlines[y * (1 + width * 4)] = 0; // filter None
    rgbaBuffer.copy(
      scanlines,
      y * (1 + width * 4) + 1,
      y * width * 4,
      (y + 1) * width * 4
    );
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });
  const idat = makePngChunk('IDAT', compressed);
  const iend = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function processLogo(inPath) {
  const file = fs.readFileSync(inPath);
  let offset = 8;
  let width = 0, height = 0, colorType = 0;
  const idatChunks = [];

  while (offset < file.length) {
    const len = file.readUInt32BE(offset);
    const type = file.toString('ascii', offset + 4, offset + 8);
    const data = file.slice(offset + 8, offset + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
    offset += 12 + len;
  }

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = colorType === 6 ? 4 : colorType === 2 ? 3 : 1;
  const stride = 1 + width * bytesPerPixel;

  // Unfilter scanlines and convert to grayscale/alpha
  const alphaMap = Buffer.alloc(width * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * stride + 1;
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0;
      if (colorType === 6) {
        r = raw[rowOffset + x * 4];
        g = raw[rowOffset + x * 4 + 1];
        b = raw[rowOffset + x * 4 + 2];
        const a = raw[rowOffset + x * 4 + 3];
        if (a < 10) {
          alphaMap[y * width + x] = 0;
          continue;
        }
      } else {
        r = raw[rowOffset + x * 3];
        g = raw[rowOffset + x * 3 + 1];
        b = raw[rowOffset + x * 3 + 2];
      }

      // Calculate darkness (0 = pure black, 255 = pure white)
      const lum = (r * 299 + g * 587 + b * 114) / 1000;
      // Linear falloff between threshold white (245) and black
      if (lum >= 248) {
        alphaMap[y * width + x] = 0;
      } else {
        // Smooth alpha anti-aliasing
        const a = Math.min(255, Math.round(255 * Math.pow(1 - (lum / 248), 0.85)));
        alphaMap[y * width + x] = a > 8 ? a : 0;
      }
    }
  }

  // Find tight bounding box
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alphaMap[y * width + x] > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add 4px breathing room
  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  console.log('Tight cropped dimensions:', { cropW, cropH, ratio: (cropW / cropH).toFixed(2) });

  // Generate Black/Dark Logo (for light theme)
  const blackBuf = Buffer.alloc(cropW * cropH * 4);
  // Generate Pure White Logo (for dark theme)
  const whiteBuf = Buffer.alloc(cropW * cropH * 4);
  // Generate Rich Champagne Gold Logo
  const goldBuf = Buffer.alloc(cropW * cropH * 4);

  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const srcX = minX + cx;
      const srcY = minY + cy;
      const a = alphaMap[srcY * width + srcX];
      const destIdx = (cy * cropW + cx) * 4;

      // Black / Charcoal Luxury
      blackBuf[destIdx] = 26; // R #1A
      blackBuf[destIdx + 1] = 24; // G #18
      blackBuf[destIdx + 2] = 22; // B #16
      blackBuf[destIdx + 3] = a;

      // Pure Crisp White
      whiteBuf[destIdx] = 250;
      whiteBuf[destIdx + 1] = 248;
      whiteBuf[destIdx + 2] = 245;
      whiteBuf[destIdx + 3] = a;

      // Royal Gold (#D4AF37)
      goldBuf[destIdx] = 212;
      goldBuf[destIdx + 1] = 175;
      goldBuf[destIdx + 2] = 55;
      goldBuf[destIdx + 3] = a;
    }
  }

  const pngBlack = encodeRGBA(cropW, cropH, blackBuf);
  const pngWhite = encodeRGBA(cropW, cropH, whiteBuf);
  const pngGold = encodeRGBA(cropW, cropH, goldBuf);

  fs.writeFileSync('public/assets/logo.png', pngBlack);
  fs.writeFileSync('public/assets/logo-white.png', pngWhite);
  fs.writeFileSync('public/assets/logo-gold.png', pngGold);
  fs.writeFileSync('public/assets/brand-logo-clean.png', pngBlack);
  fs.writeFileSync('public/assets/brand-logo-white.png', pngWhite);
  fs.writeFileSync('public/assets/brand-logo-gold.png', pngGold);

  console.log('Saved tightly-cropped transparent logos successfully!');
}

processLogo('public/assets/brand-logo-uploaded.png');
