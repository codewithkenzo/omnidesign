import fs from 'fs/promises';
import path from 'path';

interface Token {
  $type?: string;
  $value: string;
  $description?: string;
}

interface TokenGroup {
  [key: string]: Token | TokenGroup;
}

async function resolveReference(ref: string, allTokens: any): Promise<string> {
  const cleanRef = ref.replace(/[{}]/g, '');
  const parts = cleanRef.split('.');
  
  let current = allTokens;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return ref;
    }
  }
  
  if (current && typeof current === 'object' && '$value' in current) {
    const value = current.$value;
    if (typeof value === 'string' && value.startsWith('{')) {
      return resolveReference(value, allTokens);
    }
    return value;
  }
  
  return ref;
}

async function loadAllTokens(): Promise<any> {
  const primitivesPath = 'tokens/primitives/color.json';
  const semanticPath = 'tokens/semantic/color.json';
  
  const primitives = JSON.parse(await fs.readFile(primitivesPath, 'utf-8'));
  const semantic = JSON.parse(await fs.readFile(semanticPath, 'utf-8'));
  
  return {
    color: {
      ...primitives,
      ...semantic
    }
  };
}

async function generateBaseTheme() {
  console.log('\n📝 Generating base theme...');
  
  const allTokens = await loadAllTokens();
  const primitives = JSON.parse(await fs.readFile('tokens/primitives/color.json', 'utf-8'));
  const semantic = JSON.parse(await fs.readFile('tokens/semantic/color.json', 'utf-8'));
  
  const cssVars: string[] = [];
  
  for (const [category, shades] of Object.entries(primitives)) {
    for (const [shade, token] of Object.entries(shades as Record<string, Token>)) {
      if (token.$type === 'color') {
        cssVars.push(`  --color-${category}-${shade}: ${token.$value};`);
      }
    }
  }
  
  for (const [category, tokens] of Object.entries(semantic)) {
    for (const [name, token] of Object.entries(tokens as Record<string, Token>)) {
      if (token.$type === 'color') {
        const resolvedValue = await resolveReference(token.$value, allTokens);
        cssVars.push(`  --color-${category}-${name.replace(/\./g, '-')}: ${resolvedValue};`);
      }
    }
  }
  
  const spacing = JSON.parse(await fs.readFile('tokens/primitives/spacing.json', 'utf-8'));
  for (const [key, token] of Object.entries(spacing)) {
    if ((token as Token).$type === 'spacing') {
      cssVars.push(`  --spacing-${key}: ${(token as Token).$value};`);
    }
  }
  
  const radii = JSON.parse(await fs.readFile('tokens/primitives/radii.json', 'utf-8'));
  for (const [key, token] of Object.entries(radii)) {
    if ((token as Token).$type === 'borderRadius') {
      cssVars.push(`  --radius-${key}: ${(token as Token).$value};`);
    }
  }
  
  const css = `@import "tailwindcss";

@theme {
${cssVars.join('\n')}
}
`;
  
  await fs.writeFile('src/theme.css', css);
  console.log('✅ Generated: src/theme.css');
}

async function generateThemeOverride(themeName: string) {
  const themePath = `tokens/themes/${themeName}.json`;
  
  try {
    const themeData = JSON.parse(await fs.readFile(themePath, 'utf-8'));
    const allTokens = await loadAllTokens();
    
    const cssVars: string[] = [];
    
    async function processTokens(obj: TokenGroup, prefix: string = '') {
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object') {
          if ('$type' in value && '$value' in value) {
            const token = value as Token;
            if (token.$type === 'color') {
              let resolvedValue = token.$value;
              if (resolvedValue.startsWith('{')) {
                resolvedValue = await resolveReference(resolvedValue, allTokens);
              }
              const varName = prefix ? `${prefix}-${key}` : key;
              const cleanVarName = varName.replace(/^color-/, '').replace(/\./g, '-');
              cssVars.push(`  --color-${cleanVarName}: ${resolvedValue};`);
            }
          } else {
            await processTokens(value as TokenGroup, prefix ? `${prefix}-${key}` : key);
          }
        }
      }
    }
    
    await processTokens(themeData);
    
    const css = `[data-theme="${themeName}"] {
${cssVars.join('\n')}
}
`;
    
    await fs.writeFile(`dist/themes/${themeName}.css`, css);
    console.log(`✅ Generated: dist/themes/${themeName}.css`);
  } catch (error) {
    console.error(`⚠️  Skipping ${themeName}: ${(error as Error).message}`);
  }
}

async function main() {
  console.log('🎨 OmniDesign Theme Generator\n');
  console.log('━'.repeat(60));
  
  await generateBaseTheme();
  
  console.log('\n📝 Generating theme overrides...');
  const themesDir = await fs.readdir('tokens/themes');
  const themeFiles = themesDir.filter(f => f.endsWith('.json') && f !== 'README.md');
  
  for (const themeFile of themeFiles) {
    const themeName = themeFile.replace('.json', '');
    await generateThemeOverride(themeName);
  }
  
  console.log('\n━'.repeat(60));
  console.log(`🎉 Generated ${themeFiles.length + 1} theme files!`);
  console.log('\n📝 Next steps:');
  console.log('   1. Import themes in your app');
  console.log('   2. Apply via: <html data-theme="cyberpunk">');
  console.log('   3. Use Tailwind utilities: bg-surface-raised text-default');
}

main().catch(console.error);
