import { converter } from 'culori';
import fs from 'fs/promises';
import path from 'path';

interface ColorToken {
  $type: 'color';
  $value: string;
  $description: string;
  $originalHex?: string;
}

interface ColorCategory {
  [shade: string]: ColorToken;
}

interface ColorTokens {
  [category: string]: ColorCategory;
}

const toOklch = converter('oklch');

function hexToOklch(hex: string): string {
  const color = toOklch(hex);
  if (!color) throw new Error(`Invalid color: ${hex}`);
  
  // Convert to percentage and limit decimal places
  const l = (color.l * 100).toFixed(1);
  const c = (color.c ?? 0).toFixed(3);
  const h = (color.h ?? 0).toFixed(1);
  
  return `oklch(${l}% ${c} ${h})`;
}

async function convertColorFile(inputPath: string, outputPath: string) {
  console.log(`\n📖 Reading: ${inputPath}`);
  const content = await fs.readFile(inputPath, 'utf-8');
  const tokens: ColorTokens = JSON.parse(content);
  
  const converted: ColorTokens = {};
  let hexCount = 0;
  let refCount = 0;
  
  for (const [category, shades] of Object.entries(tokens)) {
    converted[category] = {};
    
    for (const [shade, token] of Object.entries(shades)) {
      if (token.$type === 'color') {
        if (token.$value.startsWith('#')) {
          // Convert hex to OKLCH
          const oklchValue = hexToOklch(token.$value);
          converted[category][shade] = {
            ...token,
            $value: oklchValue,
            $originalHex: token.$value // Keep original for reference
          };
          hexCount++;
          console.log(`  ✓ ${category}.${shade}: ${token.$value} → ${oklchValue}`);
        } else if (token.$value.startsWith('{')) {
          // Keep references as-is
          converted[category][shade] = token;
          refCount++;
        } else {
          // Keep other formats
          converted[category][shade] = token;
        }
      } else {
        converted[category][shade] = token;
      }
    }
  }
  
  await fs.writeFile(outputPath, JSON.stringify(converted, null, 2));
  console.log(`\n✅ Converted: ${outputPath}`);
  console.log(`   📊 ${hexCount} hex colors → OKLCH, ${refCount} references preserved\n`);
}

async function main() {
  console.log('🎨 OmniDesign Color Conversion: Hex → OKLCH\n');
  console.log('━'.repeat(60));
  
  const files = [
    {
      input: 'tokens/primitives/color.json',
      output: 'tokens/primitives/color.json',
      backup: 'tokens/primitives/color.hex-backup.json'
    },
    {
      input: 'tokens/primitives/colors-extended.json',
      output: 'tokens/primitives/colors-extended.json',
      backup: 'tokens/primitives/colors-extended.hex-backup.json'
    }
  ];
  
  for (const file of files) {
    try {
      // Create backup
      const original = await fs.readFile(file.input, 'utf-8');
      await fs.writeFile(file.backup, original);
      console.log(`💾 Backup created: ${file.backup}`);
      
      // Convert
      await convertColorFile(file.input, file.output);
    } catch (error) {
      console.error(`❌ Error processing ${file.input}:`, error);
      throw error;
    }
  }
  
  console.log('\n🎨 Converting theme files...');
  const themesDir = 'tokens/themes';
  const themeFiles = await fs.readdir(themesDir);
  
  for (const filename of themeFiles) {
    if (filename.endsWith('.json')) {
      const themePath = path.join(themesDir, filename);
      const backupPath = path.join(themesDir, filename.replace('.json', '.hex-backup.json'));
      
      try {
        // Create backup
        const original = await fs.readFile(themePath, 'utf-8');
        await fs.writeFile(backupPath, original);
        console.log(`💾 Backup created: ${backupPath}`);
        
        // Convert
        await convertColorFile(themePath, themePath);
      } catch (error) {
        console.error(`❌ Error processing ${themePath}:`, error);
      }
    }
  }
  
  console.log('━'.repeat(60));
  console.log('🎉 Color conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Review converted colors visually');
  console.log('   2. Run: npx tsx scripts/generate-theme.ts');
  console.log('   3. Run: npm run generate:palettes (to regenerate SVGs)');
  console.log('   4. Test theme switching');
}

main().catch(console.error);
