#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const TOKENS_DIR = path.join(rootDir, 'tokens');
const CSS_OUTPUT = path.join(rootDir, 'packages', 'tokens-css', 'dist', 'tokens.css');
const TS_OUTPUT = path.join(rootDir, 'packages', 'tokens-ts', 'dist', 'tokens.ts');

const colors = {
  reset: '\x1b[0m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    log(`Warning: Could not read ${filePath}`, 'yellow');
    return {};
  }
}

function readAllPrimitives() {
  const primitivesDir = path.join(TOKENS_DIR, 'primitives');
  const files = ['color.json', 'spacing.json', 'radii.json', 'typography.json', 'shadows.json', 'motion.json'];
  const result = {};
  
  for (const file of files) {
    const category = file.replace('.json', '');
    result[category] = readJsonFile(path.join(primitivesDir, file));
  }
  
  return result;
}

function readAllSemantic() {
  const semanticDir = path.join(TOKENS_DIR, 'semantic');
  const files = ['color.json', 'spacing.json', 'radii.json', 'typography.json', 'shadows.json', 'motion.json'];
  const result = {};
  
  for (const file of files) {
    const category = file.replace('.json', '');
    result[category] = readJsonFile(path.join(semanticDir, file));
  }
  
  return result;
}

function readThemes() {
  const themesDir = path.join(TOKENS_DIR, 'themes');
  const result = {};
  
  try {
    const files = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const themeName = file.replace('.json', '');
      result[themeName] = readJsonFile(path.join(themesDir, file));
    }
  } catch (e) {
    log('Warning: Could not read themes directory', 'yellow');
  }
  
  return result;
}

function extractPrimitives(primitivesByCategory) {
  const flatMap = {};
  
  for (const [category, tokens] of Object.entries(primitivesByCategory)) {
    extractFromObject(tokens, category, flatMap);
  }
  
  return flatMap;
}

function extractFromObject(obj, prefix, flatMap) {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object') {
      if ('$value' in value) {
        flatMap[fullPath] = value.$value;
        const pathWithoutCategory = fullPath.split('.').slice(1).join('.');
        if (pathWithoutCategory && pathWithoutCategory !== fullPath) {
          flatMap[pathWithoutCategory] = value.$value;
        }
      } else {
        extractFromObject(value, fullPath, flatMap);
      }
    }
  }
}

function resolveAlias(aliasString, primitives) {
  const match = aliasString.match(/^\{(.+)\}$/);
  if (!match) return aliasString;
  
  const aliasPath = match[1];
  
  if (aliasPath in primitives) {
    return primitives[aliasPath];
  }
  
  const categories = ['color', 'spacing', 'radii', 'typography', 'shadows', 'motion'];
  for (const cat of categories) {
    const prefixedPath = `${cat}.${aliasPath}`;
    if (prefixedPath in primitives) {
      return primitives[prefixedPath];
    }
  }
  
  log(`  Warning: Unresolved alias: ${aliasString}`, 'yellow');
  return aliasString;
}

function resolveValue(value, primitives) {
  if (value === null || value === undefined) {
    return value;
  }
  
  if (typeof value === 'string') {
    if (value.startsWith('{') && value.endsWith('}')) {
      return resolveAlias(value, primitives);
    }
    return value.replace(/\{[^}]+\}/g, (match) => {
      const resolved = resolveAlias(match, primitives);
      return typeof resolved === 'string' ? resolved : String(resolved);
    });
  }
  
  if (Array.isArray(value)) {
    return value.map(item => resolveValue(item, primitives));
  }
  
  if (typeof value === 'object') {
    const resolved = {};
    for (const [k, v] of Object.entries(value)) {
      resolved[k] = resolveValue(v, primitives);
    }
    return resolved;
  }
  
  return value;
}

function resolveTokenTree(tokens, primitives) {
  const resolved = {};
  
  for (const [key, value] of Object.entries(tokens)) {
    if (value && typeof value === 'object') {
      if ('$value' in value) {
        resolved[key] = {
          ...value,
          $value: resolveValue(value.$value, primitives)
        };
      } else {
        resolved[key] = resolveTokenTree(value, primitives);
      }
    } else {
      resolved[key] = value;
    }
  }
  
  return resolved;
}

function mergeTokens(primitivesByCategory, semanticByCategory, primitivesFlatMap) {
  const merged = {};
  const resolvedSemantic = {};
  
  for (const [category, tokens] of Object.entries(semanticByCategory)) {
    resolvedSemantic[category] = resolveTokenTree(tokens, primitivesFlatMap);
  }
  
  const allCategories = new Set([
    ...Object.keys(primitivesByCategory),
    ...Object.keys(semanticByCategory)
  ]);
  
  for (const category of allCategories) {
    const primitiveTokens = primitivesByCategory[category] || {};
    const semanticTokens = resolvedSemantic[category] || {};
    merged[category] = deepMerge(primitiveTokens, semanticTokens);
  }
  
  return merged;
}

function deepMerge(target, source) {
  const result = { ...target };
  
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !('$value' in value) && !Array.isArray(value)) {
      result[key] = deepMerge(result[key] || {}, value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

function generateCSS(mergedTokens) {
  const lines = [
    '/* Auto-generated CSS tokens - DO NOT EDIT */',
    '/* Generated by build-tokens.js */',
    '',
    ':root {'
  ];
  
  let count = 0;
  let skipped = 0;
  
  for (const [category, tokens] of Object.entries(mergedTokens)) {
    const categoryVars = generateCSSFromObject(tokens, category);
    for (const { name, value, isComposite } of categoryVars) {
      if (isComposite) {
        lines.push(`  /* Skipping composite token: ${name} (TS-only) */`);
        skipped++;
      } else {
        lines.push(`  --${name}: ${value};`);
        count++;
      }
    }
  }
  
  lines.push('}');
  
  log(`CSS: Generated ${count} variables, skipped ${skipped} composite tokens`, 'green');
  
  return lines.join('\n');
}

function generateCSSFromObject(obj, prefix) {
  const vars = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object') {
      if ('$value' in value) {
        const tokenValue = value.$value;
        
        if (typeof tokenValue === 'object' && tokenValue !== null) {
          vars.push({ name: varName, value: null, isComposite: true });
        } else {
          vars.push({ name: varName, value: String(tokenValue), isComposite: false });
        }
      } else {
        vars.push(...generateCSSFromObject(value, varName));
      }
    }
  }
  
  return vars;
}

function generateTypeScript(mergedTokens, themes) {
  const lines = [
    '/* Auto-generated TypeScript tokens - DO NOT EDIT */',
    '/* Generated by build-tokens.js */',
    '',
    'export const tokens = {'
  ];
  
  const categories = Object.keys(mergedTokens);
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const tokens = mergedTokens[category];
    const isLast = i === categories.length - 1 && Object.keys(themes).length === 0;
    
    lines.push(`  ${category}: ${generateTSObject(tokens, 2)}${isLast ? '' : ','}`);
  }
  
  if (Object.keys(themes).length > 0) {
    lines.push('  themes: {');
    const themeNames = Object.keys(themes);
    for (let i = 0; i < themeNames.length; i++) {
      const themeName = themeNames[i];
      const themeTokens = themes[themeName];
      const isLast = i === themeNames.length - 1;
      
      lines.push(`    "${themeName}": ${generateTSObject(themeTokens, 3)}${isLast ? '' : ','}`);
    }
    lines.push('  }');
  }
  
  lines.push('} as const;');
  lines.push('');
  lines.push('export type Tokens = typeof tokens;');
  
  return lines.join('\n');
}

function generateTSObject(obj, indent) {
  const spaces = '  '.repeat(indent);
  const innerSpaces = '  '.repeat(indent + 1);
  const lines = ['{'];
  
  const entries = Object.entries(obj);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const isLast = i === entries.length - 1;
    const comma = isLast ? '' : ',';
    
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    
    if (value && typeof value === 'object') {
      if ('$value' in value) {
        const tokenValue = value.$value;
        lines.push(`${innerSpaces}${safeKey}: ${JSON.stringify(tokenValue)}${comma}`);
      } else {
        lines.push(`${innerSpaces}${safeKey}: ${generateTSObject(value, indent + 1)}${comma}`);
      }
    } else {
      lines.push(`${innerSpaces}${safeKey}: ${JSON.stringify(value)}${comma}`);
    }
  }
  
  lines.push(`${spaces}}`);
  return lines.join('\n');
}

function build() {
  log('Building tokens...\n', 'blue');
  
  log('Reading primitives...');
  const primitivesByCategory = readAllPrimitives();
  
  log('Reading semantic tokens...');
  const semanticByCategory = readAllSemantic();
  
  log('Reading themes...');
  const themes = readThemes();
  
  log('\nExtracting primitives for alias resolution...');
  const primitivesFlatMap = extractPrimitives(primitivesByCategory);
  log(`  Extracted ${Object.keys(primitivesFlatMap).length} primitive values`);
  
  log('\nMerging and resolving tokens...');
  const mergedTokens = mergeTokens(primitivesByCategory, semanticByCategory, primitivesFlatMap);
  
  log('\nGenerating CSS...');
  const css = generateCSS(mergedTokens);
  
  log('Generating TypeScript...');
  const ts = generateTypeScript(mergedTokens, themes);
  
  fs.mkdirSync(path.dirname(CSS_OUTPUT), { recursive: true });
  fs.mkdirSync(path.dirname(TS_OUTPUT), { recursive: true });
  
  fs.writeFileSync(CSS_OUTPUT, css);
  log(`  Wrote ${CSS_OUTPUT}`, 'green');
  
  fs.writeFileSync(TS_OUTPUT, ts);
  log(`  Wrote ${TS_OUTPUT}`, 'green');
  
  log('\nBuild complete!', 'green');
}

build();
