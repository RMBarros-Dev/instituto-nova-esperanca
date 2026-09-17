const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BRAND_DIR = path.join(ROOT_DIR, 'assets', 'img', 'brand');
const IMG_DIR = path.join(ROOT_DIR, 'assets', 'img');

// Load base64 of the 192px PNG icon for embedding in SVGs
const icon192Path = path.join(ROOT_DIR, 'icon-192.png');
const iconBase64 = fs.readFileSync(icon192Path).toString('base64');
const dataUri = `data:image/png;base64,${iconBase64}`;

// 1. logo-symbol.svg
const logoSymbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Símbolo Oficial Instituto Nova Esperança">
  <defs>
    <clipPath id="symbol_clip">
      <rect width="64" height="64" rx="16" />
    </clipPath>
  </defs>
  <image href="${dataUri}" width="64" height="64" clip-path="url(#symbol_clip)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
fs.writeFileSync(path.join(BRAND_DIR, 'logo-symbol.svg'), logoSymbolSvg, 'utf8');

// 2. logo-horizontal.svg (Generous viewBox 380x64 to avoid any text clipping)
const logoHorizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 64" width="380" height="64" role="img" aria-label="Logo Horizontal Instituto Nova Esperança">
  <defs>
    <clipPath id="h_symbol_clip">
      <rect x="6" y="8" width="48" height="48" rx="12" />
    </clipPath>
  </defs>
  <image href="${dataUri}" x="6" y="8" width="48" height="48" clip-path="url(#h_symbol_clip)" preserveAspectRatio="xMidYMid slice" />
  <text x="66" y="34" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#0D1B2A" letter-spacing="-0.4">Instituto Nova Esperança</text>
  <text x="66" y="50" font-family="'Inter', -apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#0A5C46" letter-spacing="1">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`;
fs.writeFileSync(path.join(BRAND_DIR, 'logo-horizontal.svg'), logoHorizontalSvg, 'utf8');

// 3. logo.svg
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 90" width="380" height="90" role="img" aria-label="Logo Oficial Instituto Nova Esperança">
  <defs>
    <clipPath id="v_symbol_clip">
      <rect x="10" y="15" width="60" height="60" rx="15" />
    </clipPath>
  </defs>
  <image href="${dataUri}" x="10" y="15" width="60" height="60" clip-path="url(#v_symbol_clip)" preserveAspectRatio="xMidYMid slice" />
  <text x="82" y="44" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#0D1B2A" letter-spacing="-0.5">Instituto Nova Esperança</text>
  <text x="82" y="65" font-family="'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="700" fill="#0A5C46" letter-spacing="1.2">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`;
fs.writeFileSync(path.join(BRAND_DIR, 'logo.svg'), logoSvg, 'utf8');

// 4. logo-light.svg (For dark backgrounds / footer)
const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 64" width="380" height="64" role="img" aria-label="Logo Claro Instituto Nova Esperança">
  <defs>
    <clipPath id="light_symbol_clip">
      <rect x="6" y="8" width="48" height="48" rx="12" />
    </clipPath>
  </defs>
  <image href="${dataUri}" x="6" y="8" width="48" height="48" clip-path="url(#light_symbol_clip)" preserveAspectRatio="xMidYMid slice" />
  <text x="66" y="34" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#FFFFFF" letter-spacing="-0.4">Instituto Nova Esperança</text>
  <text x="66" y="50" font-family="'Inter', -apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#FBBF24" letter-spacing="1">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`;
fs.writeFileSync(path.join(BRAND_DIR, 'logo-light.svg'), logoLightSvg, 'utf8');

// 5. logo-dark.svg
const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 64" width="380" height="64" role="img" aria-label="Logo Escuro Instituto Nova Esperança">
  <defs>
    <clipPath id="dark_symbol_clip">
      <rect x="6" y="8" width="48" height="48" rx="12" />
    </clipPath>
  </defs>
  <image href="${dataUri}" x="6" y="8" width="48" height="48" clip-path="url(#dark_symbol_clip)" preserveAspectRatio="xMidYMid slice" />
  <text x="66" y="34" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#0A192F" letter-spacing="-0.4">Instituto Nova Esperança</text>
  <text x="66" y="50" font-family="'Inter', -apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#0A5C46" letter-spacing="1">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`;
fs.writeFileSync(path.join(BRAND_DIR, 'logo-dark.svg'), logoDarkSvg, 'utf8');

// 6. logo-monochrome.svg
const logoMonoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 64" width="380" height="64" role="img" aria-label="Logo Monocromático Instituto Nova Esperança">
  <defs>
    <clipPath id="mono_symbol_clip">
      <rect x="6" y="8" width="48" height="48" rx="12" />
    </clipPath>
  </defs>
  <image href="${dataUri}" x="6" y="8" width="48" height="48" clip-path="url(#mono_symbol_clip)" preserveAspectRatio="xMidYMid slice" style="filter: grayscale(100%);" />
  <text x="66" y="34" font-family="'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#1E293B" letter-spacing="-0.4">Instituto Nova Esperança</text>
  <text x="66" y="50" font-family="'Inter', -apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#475569" letter-spacing="1">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`;
fs.writeFileSync(path.join(BRAND_DIR, 'logo-monochrome.svg'), logoMonoSvg, 'utf8');

// 7. icon-192.svg and icon-512.svg
const icon192Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192" role="img" aria-label="Ícone Oficial Instituto Nova Esperança">
  <defs>
    <clipPath id="icon192_clip">
      <rect width="192" height="192" rx="42" />
    </clipPath>
  </defs>
  <image href="${dataUri}" width="192" height="192" clip-path="url(#icon192_clip)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
fs.writeFileSync(path.join(IMG_DIR, 'icon-192.svg'), icon192Svg, 'utf8');

const icon512Path = path.join(ROOT_DIR, 'icon-512.png');
const icon512Base64 = fs.readFileSync(icon512Path).toString('base64');
const dataUri512 = `data:image/png;base64,${icon512Base64}`;

const icon512Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Ícone Oficial Instituto Nova Esperança">
  <defs>
    <clipPath id="icon512_clip">
      <rect width="512" height="512" rx="112" />
    </clipPath>
  </defs>
  <image href="${dataUri512}" width="512" height="512" clip-path="url(#icon512_clip)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
fs.writeFileSync(path.join(IMG_DIR, 'icon-512.svg'), icon512Svg, 'utf8');

console.log('✓ Suíte de SVGs de marca e ícones atualizada com o emblema oficial Nano Banana!');
