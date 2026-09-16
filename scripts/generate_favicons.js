/**
 * INSTITUTO NOVA ESPERANÇA — GERADOR DE FAVICONS & ÍCONES PWA V7.4
 * Gera nativamente (Node.js puro com zlib) sem dependências externas:
 * - favicon.ico (com PNG 32x32)
 * - favicon-16x16.png
 * - favicon-32x32.png
 * - favicon-48x48.png
 * - apple-touch-icon.png (180x180)
 * - icon-192.png
 * - icon-512.png
 * - maskable-192.png
 * - maskable-512.png
 * - assets/img/icon-192.svg
 * - assets/img/icon-512.svg
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT_DIR = path.resolve(__dirname, '..');

// Tabela CRC32 para PNG
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c >>> 0;
}

function calcCRC32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function createPNG(width, height, isMaskable = false) {
  // Cria canvas de pixels RGBA
  const pixels = Buffer.alloc(width * height * 4);

  const bgR = 7, bgG = 94, bgB = 84; // #075E54
  const fgR = 255, fgG = 255, fgB = 255; // #FFFFFF

  const cornerRadius = isMaskable ? 0 : Math.round(width * 0.22);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Cálculo de cantos arredondados (squircle / rounded rect)
      let insideShape = true;
      if (!isMaskable) {
        let dx = 0, dy = 0;
        if (x < cornerRadius) dx = cornerRadius - x;
        else if (x >= width - cornerRadius) dx = x - (width - cornerRadius);

        if (y < cornerRadius) dy = cornerRadius - y;
        else if (y >= height - cornerRadius) dy = y - (height - cornerRadius);

        if (dx > 0 && dy > 0) {
          if (dx * dx + dy * dy > cornerRadius * cornerRadius) {
            insideShape = false;
          }
        }
      }

      if (!insideShape) {
        pixels[idx] = 0;
        pixels[idx + 1] = 0;
        pixels[idx + 2] = 0;
        pixels[idx + 3] = 0;
        continue;
      }

      // Fundo oficial INE
      pixels[idx] = bgR;
      pixels[idx + 1] = bgG;
      pixels[idx + 2] = bgB;
      pixels[idx + 3] = 255;

      // Renderização do monograma "NE" no centro
      // Normaliza coordenadas no range 0..100
      const nx = (x / width) * 100;
      const ny = (y / height) * 100;

      let isLetter = false;

      // Letra 'N' (entre nx: 22 e 46, ny: 26 e 74)
      const strokeW = 4.2;
      // Barra esquerda do N
      if (nx >= 24 && nx <= 24 + strokeW && ny >= 28 && ny <= 72) isLetter = true;
      // Barra direita do N
      if (nx >= 44 - strokeW && nx <= 44 && ny >= 28 && ny <= 72) isLetter = true;
      // Diagonal do N
      if (nx >= 24 && nx <= 44 && ny >= 28 && ny <= 72) {
        const expectedY = 28 + ((nx - 24) / (44 - 24)) * (72 - 28);
        if (Math.abs(ny - expectedY) <= (strokeW * 0.9)) isLetter = true;
      }

      // Letra 'E' (entre nx: 54 e 76, ny: 28 e 72)
      // Barra vertical do E
      if (nx >= 54 && nx <= 54 + strokeW && ny >= 28 && ny <= 72) isLetter = true;
      // Barra horizontal superior do E
      if (nx >= 54 && nx <= 74 && ny >= 28 && ny <= 28 + strokeW) isLetter = true;
      // Barra horizontal do meio do E
      if (nx >= 54 && nx <= 70 && ny >= 50 - strokeW / 2 && ny <= 50 + strokeW / 2) isLetter = true;
      // Barra horizontal inferior do E
      if (nx >= 54 && nx <= 74 && ny >= 72 - strokeW && ny <= 72) isLetter = true;

      if (isLetter) {
        pixels[idx] = fgR;
        pixels[idx + 1] = fgG;
        pixels[idx + 2] = fgB;
        pixels[idx + 3] = 255;
      }
    }
  }

  // Prepara scanlines com byte de filtro 0
  const scanlines = Buffer.alloc(height * (1 + width * 4));
  let scanIdx = 0;
  let pixelIdx = 0;

  for (let y = 0; y < height; y++) {
    scanlines[scanIdx++] = 0; // Filter: None
    pixels.copy(scanlines, scanIdx, pixelIdx, pixelIdx + width * 4);
    scanIdx += width * 4;
    pixelIdx += width * 4;
  }

  const compressedData = zlib.deflateSync(scanlines, { level: 9 });

  // Monta arquivo PNG
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = Buffer.concat([
    Buffer.alloc(4),
    Buffer.from('IHDR'),
    ihdrData,
    Buffer.alloc(4)
  ]);
  ihdrChunk.writeUInt32BE(13, 0);
  const ihdrCRC = calcCRC32(ihdrChunk.subarray(4, 4 + 4 + 13));
  ihdrChunk.writeUInt32BE(ihdrCRC, ihdrChunk.length - 4);

  // IDAT chunk
  const idatChunk = Buffer.concat([
    Buffer.alloc(4),
    Buffer.from('IDAT'),
    compressedData,
    Buffer.alloc(4)
  ]);
  idatChunk.writeUInt32BE(compressedData.length, 0);
  const idatCRC = calcCRC32(idatChunk.subarray(4, 4 + 4 + compressedData.length));
  idatChunk.writeUInt32BE(idatCRC, idatChunk.length - 4);

  // IEND chunk
  const iendChunk = Buffer.concat([
    Buffer.alloc(4),
    Buffer.from('IEND'),
    Buffer.alloc(4)
  ]);
  iendChunk.writeUInt32BE(0, 0);
  const iendCRC = calcCRC32(Buffer.from('IEND'));
  iendChunk.writeUInt32BE(iendCRC, iendChunk.length - 4);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createICO(pngBuffer, size = 32) {
  // Cabeçalho ICONDIR (6 bytes)
  const header = Buffer.from([0x00, 0x00, 0x01, 0x00, 0x01, 0x00]);

  // ICONDIRENTRY (16 bytes)
  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size; // Width
  entry[1] = size >= 256 ? 0 : size; // Height
  entry[2] = 0; // Paleta de cores
  entry[3] = 0; // Reservado
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // Tamanho da imagem
  entry.writeUInt32LE(22, 12); // Offset = 6 + 16 = 22

  return Buffer.concat([header, entry, pngBuffer]);
}

console.log('Gerando suíte completa de favicons e ícones PWA...');

// 1. Gera PNGs de favicons
const faviconSizes = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'favicon-48x48.png', size: 48 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'maskable-192.png', size: 192, maskable: true },
  { file: 'maskable-512.png', size: 512, maskable: true }
];

faviconSizes.forEach(f => {
  const buf = createPNG(f.size, f.size, !!f.maskable);
  fs.writeFileSync(path.join(ROOT_DIR, f.file), buf);
  console.log(`✓ Gerado: ${f.file} (${f.size}x${f.size})`);
});

// 2. Gera favicon.ico
const png32 = createPNG(32, 32);
const icoBuf = createICO(png32, 32);
fs.writeFileSync(path.join(ROOT_DIR, 'favicon.ico'), icoBuf);
console.log('✓ Gerado: favicon.ico (multi-browser)');

// 3. Gera versões SVG para PWA e compatibilidade
function createSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#075E54"/>
  <path d="M${size * 0.24} ${size * 0.72} V${size * 0.28} L${size * 0.44} ${size * 0.65} V${size * 0.28} M${size * 0.54} ${size * 0.28} H${size * 0.74} M${size * 0.54} ${size * 0.50} H${size * 0.70} M${size * 0.54} ${size * 0.72} H${size * 0.74}" stroke="#FFFFFF" stroke-width="${size * 0.045}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`;
}

fs.writeFileSync(path.join(ROOT_DIR, 'assets/img/icon-192.svg'), createSVGIcon(192));
fs.writeFileSync(path.join(ROOT_DIR, 'assets/img/icon-512.svg'), createSVGIcon(512));
console.log('✓ Gerados: assets/img/icon-192.svg e icon-512.svg');
console.log('✓ Suíte de Favicons e Ícones PWA gerada com sucesso!');
