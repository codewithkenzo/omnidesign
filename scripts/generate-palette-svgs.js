#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const themesDir = path.join(rootDir, 'tokens/themes');
const outputDir = path.join(rootDir, 'assets/palettes');

const themeFiles = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));

console.log(`Generating enhanced SVG palettes for ${themeFiles.length} themes...\n`);

themeFiles.forEach(themeFile => {
  const themeName = themeFile.replace('.json', '');
  const themeData = JSON.parse(fs.readFileSync(path.join(themesDir, themeFile), 'utf8'));
  
  const colors = {
    primary: themeData.color?.interactive?.primary?.$value || '#0052CC',
    primaryHover: themeData.color?.interactive?.['primary.hover']?.$value || '#003E8F',
    surface: themeData.color?.surface?.default?.$value || '#FFFFFF',
    surfaceRaised: themeData.color?.surface?.raised?.$value || '#F9FAFB',
    text: themeData.color?.text?.default?.$value || '#1F2937',
    textMuted: themeData.color?.text?.muted?.$value || '#6B7280',
    border: themeData.color?.border?.default?.$value || '#E5E7EB',
    accent: themeData.color?.status?.success?.$value || '#22C55E'
  };
  
  const svg = generateEnhancedSVG(themeName, colors, themeData);
  
  const outputPath = path.join(outputDir, `${themeName}.svg`);
  fs.writeFileSync(outputPath, svg);
  
  console.log(`  ✓ ${themeName}.svg`);
});

console.log(`\n✅ Generated ${themeFiles.length} enhanced SVG palettes`);

function generateEnhancedSVG(name, colors, themeData) {
  const description = themeData.theme?.$description || `${name} theme`;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="80" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #0d1117; }
      .text { font-family: system-ui, -apple-system, sans-serif; fill: #e6edf3; }
      .label { font-size: 14px; font-weight: 600; }
      .desc { font-size: 11px; fill: #8b949e; }
      .hex { font-size: 9px; fill: #6e7681; font-family: 'JetBrains Mono', monospace; }
    </style>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="80" fill="#0d1117" rx="12"/>
  
  <!-- Theme name -->
  <text x="20" y="30" class="text label">${name}</text>
  <text x="20" y="50" class="text desc">${description.substring(0, 50)}${description.length > 50 ? '...' : ''}</text>
  
  <!-- Primary color swatch -->
  <rect x="280" y="12" width="32" height="32" rx="8" fill="${colors.primary}" filter="url(#shadow)"/>
  <text x="296" y="56" class="hex" text-anchor="middle">${colors.primary}</text>
  
  <!-- Surface color swatch -->
  <rect x="316" y="12" width="32" height="32" rx="8" fill="${colors.surfaceRaised}" stroke="#30363d" stroke-width="1" filter="url(#shadow)"/>
  <text x="332" y="56" class="hex" text-anchor="middle">${colors.surfaceRaised}</text>
  
  <!-- Text color swatch -->
  <rect x="352" y="12" width="32" height="32" rx="8" fill="${colors.text}" filter="url(#shadow)"/>
  <text x="368" y="56" class="hex" text-anchor="middle">${colors.text}</text>
</svg>`;
}
