#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const TOKENS_DIR = path.join(rootDir, 'tokens');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

let errors = 0;
let warnings = 0;

function validateDTCG(token, path = '') {
  const issues = [];
  
  if (typeof token === 'object' && token !== null) {
    if ('$value' in token) {
      if (!('$type' in token)) {
        issues.push(`${path}: Missing $type for token with $value`);
      }
      if (!('$description' in token)) {
        warnings++;
        log(`Warning: ${path} missing $description`, 'yellow');
      }
    } else {
      for (const [key, value] of Object.entries(token)) {
        issues.push(...validateDTCG(value, path ? `${path}.${key}` : key));
      }
    }
  }
  
  return issues;
}

function validateAliases(tokens, primitives, path = '') {
  const issues = [];
  
  if (typeof tokens === 'object' && tokens !== null) {
    if ('$value' in tokens) {
      const value = tokens.$value;
      if (typeof value === 'string') {
        const aliases = value.match(/\{([^}]+)\}/g);
        if (aliases) {
          for (const alias of aliases) {
            const aliasPath = alias.slice(1, -1);
            const found = Object.keys(primitives).some(p => 
              p === aliasPath || p.endsWith(`.${aliasPath}`)
            );
            if (!found) {
              issues.push(`${path}: Unresolved alias ${alias}`);
            }
          }
        }
      }
    } else {
      for (const [key, value] of Object.entries(tokens)) {
        issues.push(...validateAliases(value, primitives, path ? `${path}.${key}` : key));
      }
    }
  }
  
  return issues;
}

function extractPrimitives(tokens, prefix = '') {
  const flat = {};
  
  if (typeof tokens === 'object' && tokens !== null) {
    if ('$value' in tokens) {
      flat[prefix] = tokens.$value;
    } else {
      for (const [key, value] of Object.entries(tokens)) {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        Object.assign(flat, extractPrimitives(value, newPrefix));
      }
    }
  }
  
  return flat;
}

function validate() {
  log('Validating tokens...\n', 'blue');
  
  const primitivesDir = path.join(TOKENS_DIR, 'primitives');
  const semanticDir = path.join(TOKENS_DIR, 'semantic');
  const themesDir = path.join(TOKENS_DIR, 'themes');
  
  const primitiveFiles = ['color.json', 'spacing.json', 'radii.json', 'typography.json', 'shadows.json', 'motion.json'];
  
  log('Checking primitive tokens...');
  const allPrimitives = {};
  for (const file of primitiveFiles) {
    const filePath = path.join(primitivesDir, file);
    if (fs.existsSync(filePath)) {
      const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const issues = validateDTCG(tokens);
      if (issues.length > 0) {
        for (const issue of issues) {
          errors++;
          log(`Error: ${file} - ${issue}`, 'red');
        }
      } else {
        log(`  ✓ ${file}`, 'green');
      }
      Object.assign(allPrimitives, extractPrimitives(tokens));
    } else {
      errors++;
      log(`Error: Missing ${file}`, 'red');
    }
  }
  
  log('\nChecking semantic tokens...');
  for (const file of primitiveFiles) {
    const filePath = path.join(semanticDir, file);
    if (fs.existsSync(filePath)) {
      const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const dtIssues = validateDTCG(tokens);
      const aliasIssues = validateAliases(tokens, allPrimitives);
      
      if (dtIssues.length > 0 || aliasIssues.length > 0) {
        for (const issue of [...dtIssues, ...aliasIssues]) {
          errors++;
          log(`Error: ${file} - ${issue}`, 'red');
        }
      } else {
        log(`  ✓ ${file}`, 'green');
      }
    } else {
      errors++;
      log(`Error: Missing ${file}`, 'red');
    }
  }
  
  log('\nChecking themes...');
  if (fs.existsSync(themesDir)) {
    const themeFiles = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));
    log(`  Found ${themeFiles.length} themes`);
    
    for (const file of themeFiles) {
      const filePath = path.join(themesDir, file);
      const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const issues = validateDTCG(tokens);
      
      if (issues.length > 0) {
        for (const issue of issues) {
          errors++;
          log(`Error: ${file} - ${issue}`, 'red');
        }
      } else {
        log(`  ✓ ${file}`, 'green');
      }
    }
  } else {
    errors++;
    log('Error: themes directory not found', 'red');
  }
  
  log('\n' + '='.repeat(50));
  if (errors === 0) {
    log('✅ All tokens validated successfully', 'green');
    process.exit(0);
  } else {
    log(`❌ Validation failed: ${errors} errors, ${warnings} warnings`, 'red');
    process.exit(1);
  }
}

validate();
