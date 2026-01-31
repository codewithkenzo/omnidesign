#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themesDir = path.join(__dirname, '..', 'tokens', 'themes');
const outputDir = path.join(__dirname, '..', 'assets', 'palettes');

fs.mkdirSync(outputDir, { recursive: true });

const themeFiles = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));

console.log(`Generating palettes for ${themeFiles.length} themes...\n`);

for (const file of themeFiles) {
  const themeName = file.replace('.json', '');
  const themeData = JSON.parse(fs.readFileSync(path.join(themesDir, file), 'utf8'));
  
  const colors = {
    primary: themeData.color?.interactive?.primary?.$value || '#3b82f6',
    accent: themeData.color?.interactive?.secondary?.$value || '#6366f1',
    surface: themeData.color?.surface?.default?.$value || '#ffffff',
  };

  const svg = generateMinimalPaletteSVG(themeName, colors);
  
  const outputPath = path.join(outputDir, `${themeName}.svg`);
  fs.writeFileSync(outputPath, svg);
  
  console.log(`✓ ${themeName}`);
}

console.log(`\n✅ Generated ${themeFiles.length} minimal palette images in assets/palettes/`);

function generateMinimalPaletteSVG(themeName, colors) {
  const width = 320;
  const height = 40;
  const swatchSize = 28;
  const startX = 8;
  const startY = 6;
  const gap = 6;

  const colorEntries = Object.entries(colors);
  
  let rects = '';
  
  colorEntries.forEach(([name, color], index) => {
    const x = startX + index * (swatchSize + gap);
    const y = startY;
    
    rects += `    <rect x="${x}" y="${y}" width="${swatchSize}" height="${swatchSize}" rx="6" fill="${color}"/>\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#0d1117" rx="8"/>
  <text x="${startX + colorEntries.length * (swatchSize + gap) + 8}" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#e6edf3">${themeName}</text>
${rects}</svg>`;
}
