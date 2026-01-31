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
    text: themeData.color?.text?.default?.$value || '#000000',
    success: themeData.color?.status?.success?.$value || '#22c55e',
    warning: themeData.color?.status?.warning?.$value || '#f59e0b',
    error: themeData.color?.status?.error?.$value || '#ef4444',
  };

  const svg = generatePaletteSVG(themeName, colors);
  
  const outputPath = path.join(outputDir, `${themeName}.svg`);
  fs.writeFileSync(outputPath, svg);
  
  console.log(`✓ ${themeName}`);
}

console.log(`\n✅ Generated ${themeFiles.length} palette images in assets/palettes/`);

function generatePaletteSVG(themeName, colors) {
  const width = 600;
  const height = 120;
  const swatchWidth = 80;
  const swatchHeight = 60;
  const startX = 20;
  const startY = 30;
  const gap = 10;

  const colorEntries = Object.entries(colors);
  
  let rects = '';
  let labels = '';
  
  colorEntries.forEach(([name, color], index) => {
    const x = startX + index * (swatchWidth + gap);
    const y = startY;
    
    rects += `    <rect x="${x}" y="${y}" width="${swatchWidth}" height="${swatchHeight}" rx="8" fill="${color}" stroke="#e5e7eb" stroke-width="1"/>\n`;
    
    labels += `    <text x="${x + swatchWidth/2}" y="${y + swatchHeight + 18}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#6b7280">${name}</text>\n`;
    
    labels += `    <text x="${x + swatchWidth/2}" y="${y + swatchHeight + 32}" text-anchor="middle" font-family="monospace" font-size="9" fill="#9ca3af">${color}</text>\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1"/>
    </filter>
  </defs>
  
  <rect width="${width}" height="${height}" fill="#fafafa" rx="12"/>
  
  <text x="20" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#111827">${themeName}</text>
  
  <g filter="url(#shadow)">
${rects}  </g>
  
${labels}</svg>`;
}
