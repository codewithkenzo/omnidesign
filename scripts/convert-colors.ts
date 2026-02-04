import { converter } from 'culori';
import fs from 'fs/promises';
import path from 'path';

interface ConversionStats {
  hexCount: number;
  refCount: number;
  otherCount: number;
}

const toOklch = converter('oklch');

function hexToOklch(hex: string): string {
  const color = toOklch(hex);
  if (!color) throw new Error(`Invalid color: ${hex}`);
  
  const l = (color.l * 100).toFixed(1);
  const c = (color.c ?? 0).toFixed(3);
  const h = (color.h ?? 0).toFixed(1);
  
  return `oklch(${l}% ${c} ${h})`;
}

function convertDeep(obj: unknown, pathStr: string = '', stats: ConversionStats): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map((item, i) => convertDeep(item, `${pathStr}[${i}]`, stats));
  }
  
  const result: Record<string, unknown> = {};
  const record = obj as Record<string, unknown>;
  
  if (record.$type === 'color' && typeof record.$value === 'string') {
    const value = record.$value;
    
    if (value.startsWith('#')) {
      const oklchValue = hexToOklch(value);
      stats.hexCount++;
      console.log(`  ✓ ${pathStr}: ${value} → ${oklchValue}`);
      
      return {
        ...record,
        $value: oklchValue,
        $originalHex: value
      };
    } else if (value.startsWith('{')) {
      stats.refCount++;
      return record;
    } else if (value.startsWith('oklch')) {
      stats.otherCount++;
      return record;
    } else if (value.startsWith('rgba') || value.startsWith('rgb')) {
      stats.otherCount++;
      return record;
    } else {
      stats.otherCount++;
      return record;
    }
  }
  
  for (const [key, value] of Object.entries(record)) {
    const newPath = pathStr ? `${pathStr}.${key}` : key;
    result[key] = convertDeep(value, newPath, stats);
  }
  
  return result;
}

async function convertColorFile(inputPath: string, outputPath: string): Promise<ConversionStats> {
  console.log(`\n📖 Reading: ${inputPath}`);
  const content = await fs.readFile(inputPath, 'utf-8');
  const tokens = JSON.parse(content);
  
  const stats: ConversionStats = { hexCount: 0, refCount: 0, otherCount: 0 };
  const converted = convertDeep(tokens, '', stats);
  
  await fs.writeFile(outputPath, JSON.stringify(converted, null, 2));
  console.log(`\n✅ Converted: ${outputPath}`);
  console.log(`   📊 ${stats.hexCount} hex → OKLCH, ${stats.refCount} refs preserved, ${stats.otherCount} other\n`);
  
  return stats;
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
  
  let totalStats: ConversionStats = { hexCount: 0, refCount: 0, otherCount: 0 };
  
  for (const file of files) {
    try {
      try {
        await fs.access(file.backup);
        console.log(`💾 Backup exists: ${file.backup}`);
      } catch {
        const original = await fs.readFile(file.input, 'utf-8');
        await fs.writeFile(file.backup, original);
        console.log(`💾 Backup created: ${file.backup}`);
      }
      
      const stats = await convertColorFile(file.input, file.output);
      totalStats.hexCount += stats.hexCount;
      totalStats.refCount += stats.refCount;
      totalStats.otherCount += stats.otherCount;
    } catch (error) {
      console.error(`❌ Error processing ${file.input}:`, error);
      throw error;
    }
  }
  
  console.log('\n🎨 Converting theme files...');
  const themesDir = 'tokens/themes';
  const themeFiles = await fs.readdir(themesDir);
  
  for (const filename of themeFiles) {
    if (!filename.endsWith('.json') || filename.endsWith('.hex-backup.json')) {
      continue;
    }
    
    const themePath = path.join(themesDir, filename);
    const backupPath = path.join(themesDir, filename.replace('.json', '.hex-backup.json'));
    
    try {
      try {
        await fs.access(backupPath);
        console.log(`💾 Backup exists: ${backupPath}`);
      } catch {
        const original = await fs.readFile(themePath, 'utf-8');
        await fs.writeFile(backupPath, original);
        console.log(`💾 Backup created: ${backupPath}`);
      }
      
      const stats = await convertColorFile(themePath, themePath);
      totalStats.hexCount += stats.hexCount;
      totalStats.refCount += stats.refCount;
      totalStats.otherCount += stats.otherCount;
    } catch (error) {
      console.error(`❌ Error processing ${themePath}:`, error);
    }
  }
  
  console.log('━'.repeat(60));
  console.log('🎉 Color conversion complete!');
  console.log(`\n📊 TOTAL: ${totalStats.hexCount} hex → OKLCH, ${totalStats.refCount} refs preserved, ${totalStats.otherCount} other`);
  console.log('\n📝 Next steps:');
  console.log('   1. Review converted colors visually');
  console.log('   2. Run: npx tsx scripts/generate-theme.ts');
  console.log('   3. Run: npm run generate:palettes (to regenerate SVGs)');
  console.log('   4. Test theme switching');
}

main().catch(console.error);
