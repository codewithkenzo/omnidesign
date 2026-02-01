#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const homedir = os.homedir();

program
  .name('omnidesign')
  .description('Universal design system skill for AI coding assistants')
  .version(packageJson.version);

program
  .command('install')
  .description('Install OmniDesign skill for your IDE')
  .option('-i, --ide <ide>', 'Target IDE (claude, cursor, opencode, vscode, aider, continue, zed, amp, kilo, antigravity)')
  .option('-g, --global', 'Install to global IDE config (~/.claude, ~/.cursor, etc.)')
  .action(async (options) => {
    console.log(chalk.blue('🎨 OmniDesign Skill Installer\n'));
    
    const detectedIde = options.ide || detectIDE(options.global);
    
    if (!detectedIde) {
      console.log(chalk.yellow('⚠️  Could not auto-detect IDE. Please specify with --ide flag'));
      console.log(chalk.gray('Supported: claude, cursor, opencode, vscode, aider, continue, zed, amp, kilo, antigravity'));
      process.exit(1);
    }
    
    console.log(chalk.green(`✓ Detected IDE: ${detectedIde}\n`));
    
    try {
      await installSkill(detectedIde, options.global);
      console.log(chalk.green('\n✅ OmniDesign skill installed successfully!'));
      console.log(chalk.gray('\nNext steps:'));
      console.log(chalk.gray('  1. Restart your IDE if needed'));
      console.log(chalk.gray('  2. Try: "Use the OmniDesign theme cyberpunk"'));
      console.log(chalk.gray('  3. See: https://omnidesign.dev/docs'));
    } catch (error) {
      console.error(chalk.red('\n❌ Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available IDE integrations and detection status')
  .option('-g, --global', 'Check global installations')
  .action((options) => {
    console.log(chalk.blue('🎨 OmniDesign IDE Status:\n'));

    const ides = [
      { name: 'Claude Code', cmd: 'claude', ...getClaudePaths(options.global) },
      { name: 'Cursor', cmd: 'cursor', ...getCursorPaths(options.global) },
      { name: 'OpenCode', cmd: 'opencode', ...getOpenCodePaths(options.global) },
      { name: 'VS Code', cmd: 'vscode', ...getVSCodePaths(options.global) },
      { name: 'Zed', cmd: 'zed', ...getZedPaths(options.global) },
      { name: 'Amp Code', cmd: 'amp', ...getAmpPaths(options.global) },
      { name: 'Kilo Code', cmd: 'kilo', ...getKiloPaths(options.global) },
      { name: 'Antigravity', cmd: 'antigravity', ...getAntigravityPaths(options.global) },
      { name: 'Aider', cmd: 'aider', ...getAiderPaths(options.global) },
      { name: 'Continue.dev', cmd: 'continue', ...getContinuePaths(options.global) },
    ];

    ides.forEach(ide => {
      const skillInstalled = fs.existsSync(ide.configPath);
      const ideDetected = fs.existsSync(ide.baseDir);
      const skillStatus = skillInstalled ? chalk.green('✓ skill') : chalk.gray('no skill');
      const ideStatus = ideDetected ? chalk.blue('✓ IDE') : chalk.gray('no IDE');
      console.log(`  ${chalk.bold(ide.name)}: ${ideStatus} / ${skillStatus}`);
    });

    console.log(chalk.blue('\n🎯 Auto-detect would find:'));
    const detected = [];
    if (fs.existsSync(path.join(homedir, '.claude'))) detected.push('claude');
    if (fs.existsSync(path.join(homedir, '.cursor'))) detected.push('cursor');
    if (fs.existsSync(path.join(homedir, '.config', 'opencode'))) detected.push('opencode');
    if (fs.existsSync(path.join(homedir, '.config', 'agents'))) detected.push('amp');
    if (fs.existsSync(path.join(homedir, '.config', 'Code'))) detected.push('vscode');
    if (fs.existsSync(path.join(homedir, '.config', 'zed'))) detected.push('zed');
    if (fs.existsSync(path.join(homedir, '.kilocode'))) detected.push('kilo');
    if (fs.existsSync(path.join(homedir, '.gemini', 'antigravity'))) detected.push('antigravity');
    if (fs.existsSync(path.join(homedir, '.continue'))) detected.push('continue');

    if (detected.length === 0) {
      console.log(chalk.gray('  No IDEs detected in home directory'));
    } else {
      detected.forEach(name => console.log(chalk.green(`  ✓ ${name}`)));
    }

    console.log(chalk.gray('\nRun with --global to check global installs'));
  });

program
  .command('uninstall')
  .description('Remove OmniDesign skill from your IDE')
  .option('-i, --ide <ide>', 'Target IDE')
  .option('-g, --global', 'Uninstall globally')
  .action(async (options) => {
    const detectedIde = options.ide || detectIDE(options.global);
    
    if (!detectedIde) {
      console.log(chalk.yellow('⚠️  Please specify IDE with --ide flag'));
      return;
    }
    
    console.log(chalk.blue(`Removing OmniDesign from ${detectedIde}...`));
    await uninstallSkill(detectedIde, options.global);
    console.log(chalk.green('✅ Uninstalled successfully'));
  });

function getClaudePaths(global = false) {
  const baseDir = global ? path.join(homedir, '.claude') : path.join(process.cwd(), '.claude');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md')),
    baseDir
  };
}

function getCursorPaths(global = false) {
  const baseDir = global ? path.join(homedir, '.cursor') : path.join(process.cwd(), '.cursor');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md')),
    baseDir
  };
}

function getOpenCodePaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.config', 'opencode')
    : path.join(process.cwd(), '.opencode');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md')),
    baseDir,
    configJsonPath: path.join(baseDir, 'config.json')
  };
}

function getVSCodePaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.config', 'Code', 'User')
    : path.join(process.cwd(), '.vscode');
  return {
    configPath: path.join(baseDir, global ? 'settings.json' : 'settings.json'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'settings.json')),
    baseDir
  };
}

function getZedPaths(global = false) {
  const baseDir = global ? path.join(homedir, '.config', 'zed') : path.join(process.cwd(), '.zed');
  return {
    configPath: path.join(baseDir, 'omnidesign.json'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'omnidesign.json')),
    baseDir
  };
}

function getAmpPaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.config', 'agents')
    : path.join(process.cwd(), '.agents');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md')),
    baseDir
  };
}

function getKiloPaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.kilocode')
    : path.join(process.cwd(), '.kilocode');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md')),
    baseDir
  };
}

function getAntigravityPaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.gemini', 'antigravity')
    : path.join(process.cwd(), '.agent');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign', 'SKILL.md')),
    baseDir
  };
}

function getAiderPaths(global = false) {
  return {
    configPath: path.join(process.cwd(), 'CONVENTIONS.md'),
    configFile: 'CONVENTIONS.md',
    baseDir: process.cwd()
  };
}

function getContinuePaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.continue')
    : path.join(process.cwd(), '.continue');
  return {
    configPath: path.join(baseDir, 'omnidesign.yaml'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'omnidesign.yaml')),
    baseDir
  };
}

function detectIDE(global = false) {
  const cwd = process.cwd();
  const detected = [];

  const checks = [
    { name: 'claude', path: path.join(homedir, '.claude'), global: true },
    { name: 'cursor', path: path.join(homedir, '.cursor'), global: true },
    { name: 'opencode', path: path.join(homedir, '.config', 'opencode'), global: true },
    { name: 'vscode', path: path.join(homedir, '.config', 'Code'), global: true },
    { name: 'zed', path: path.join(homedir, '.config', 'zed'), global: true },
    { name: 'amp', path: path.join(homedir, '.config', 'agents'), global: true },
    { name: 'kilo', path: path.join(homedir, '.kilocode'), global: true },
    { name: 'antigravity', path: path.join(homedir, '.gemini', 'antigravity'), global: true },
    { name: 'continue', path: path.join(homedir, '.continue'), global: true },
    { name: 'claude', path: path.join(cwd, '.claude'), global: false },
    { name: 'cursor', path: path.join(cwd, '.cursor'), global: false },
    { name: 'opencode', path: path.join(cwd, '.opencode'), global: false },
    { name: 'vscode', path: path.join(cwd, '.vscode'), global: false },
    { name: 'zed', path: path.join(cwd, '.zed'), global: false },
    { name: 'amp', path: path.join(cwd, '.agents'), global: false },
    { name: 'kilo', path: path.join(cwd, '.kilocode'), global: false },
    { name: 'antigravity', path: path.join(cwd, '.antigravity'), global: false },
    { name: 'aider', path: path.join(cwd, '.aider.conf.yml'), global: false },
    { name: 'continue', path: path.join(cwd, '.continue'), global: false },
    { name: 'claude', path: path.join(cwd, 'claude.md'), global: false },
    { name: 'cursor', path: path.join(cwd, '.cursorrules'), global: false },
  ];

  for (const check of checks) {
    if (fs.existsSync(check.path) && !detected.find(d => d.name === check.name)) {
      detected.push({ name: check.name, global: check.global });
    }
  }

  if (process.env.CLAUDE_CODE && !detected.find(d => d.name === 'claude')) {
    detected.push({ name: 'claude', global: true });
  }
  if (process.env.CURSOR_TRACE && !detected.find(d => d.name === 'cursor')) {
    detected.push({ name: 'cursor', global: true });
  }

  if (detected.length === 0) return null;
  if (detected.length === 1) return detected[0].name;

  console.log(chalk.yellow('\n⚠️  Multiple IDEs detected:'));
  detected.forEach((ide, i) => {
    const globalFlag = ide.global ? '--global' : '';
    console.log(chalk.gray(`  ${i + 1}. ${ide.name} ${globalFlag}`));
  });
  console.log(chalk.gray(`\nUsing first: ${detected[0].name}`));
  console.log(chalk.gray(`To use different: npx omnidesign install --ide <name>\n`));

  return detected[0].name;
}

async function installSkill(ide, global = false) {
  const skillsDir = path.join(__dirname, '..', 'skills', ide);
  const packageDir = path.join(__dirname, '..');
  
  if (!fs.existsSync(skillsDir)) {
    throw new Error(`Skill files for ${ide} not found`);
  }
  
  switch (ide) {
    case 'claude':
      await installClaudeSkill(skillsDir, packageDir, global);
      break;
    case 'cursor':
      await installCursorSkill(skillsDir, packageDir, global);
      break;
    case 'opencode':
      await installOpenCodeSkill(skillsDir, packageDir, global);
      break;
    case 'vscode':
      await installVSCodeSkill(skillsDir, packageDir, global);
      break;
    case 'aider':
      await installAiderSkill(skillsDir, packageDir, global);
      break;
    case 'continue':
      await installContinueSkill(skillsDir, packageDir, global);
      break;
    case 'zed':
      await installZedSkill(skillsDir, packageDir, global);
      break;
    case 'amp':
      await installAmpSkill(skillsDir, packageDir, global);
      break;
    case 'kilo':
      await installKiloSkill(skillsDir, packageDir, global);
      break;
    case 'antigravity':
      await installAntigravitySkill(skillsDir, packageDir, global);
      break;
    default:
      throw new Error(`Unsupported IDE: ${ide}`);
  }
}

function copyDirSync(src, dest, { overwrite = true } = {}) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, { overwrite });
    } else {
      const copyFlags = overwrite ? undefined : fs.constants.COPYFILE_EXCL;
      fs.copyFileSync(srcPath, destPath, copyFlags);
    }
  }
}

function copySkillContent(skillDir, targetDir, packageDir) {
  const entries = fs.readdirSync(skillDir);
  
  for (const entry of entries) {
    const srcPath = path.join(skillDir, entry);
    const destPath = path.join(targetDir, entry);
    
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  
  const tokensSrc = path.join(packageDir, 'tokens');
  const tokensDest = path.join(targetDir, 'tokens');
  if (fs.existsSync(tokensSrc)) {
    copyDirSync(tokensSrc, tokensDest);
    console.log(chalk.gray(`  Copied: tokens/ → ${path.relative(process.cwd(), tokensDest)}`));
  }
  
  const recipesSrc = path.join(packageDir, 'recipes');
  const recipesDest = path.join(targetDir, 'recipes');
  if (fs.existsSync(recipesSrc)) {
    copyDirSync(recipesSrc, recipesDest);
    console.log(chalk.gray(`  Copied: recipes/ → ${path.relative(process.cwd(), recipesDest)}`));
  }
}

async function installClaudeSkill(skillsDir, packageDir, global) {
  const paths = getClaudePaths(global);
  const targetDir = path.dirname(paths.configPath);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const skillMdSource = path.join(skillsDir, 'omnidesign.md');
  const skillMdTarget = path.join(targetDir, 'SKILL.md');
  if (fs.existsSync(skillMdSource)) {
    fs.copyFileSync(skillMdSource, skillMdTarget);
    console.log(chalk.gray(`  Created: ${path.relative(process.cwd(), skillMdTarget)}`));
  }
  
  const marketplacePath = path.join(paths.baseDir, 'marketplace.json');
  
  let marketplace = { name: 'local', plugins: [] };
  if (fs.existsSync(marketplacePath)) {
    marketplace = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
  }
  
  if (!marketplace.plugins.find(p => p.name === 'omnidesign')) {
    marketplace.plugins.push({
      name: 'omnidesign',
      source: './skills/omnidesign/',
      description: 'Universal design system with 25 themes, tokens, recipes, and AI components',
      version: packageJson.version
    });
    fs.writeFileSync(marketplacePath, JSON.stringify(marketplace, null, 2));
    console.log(chalk.gray(`  Updated: ${path.relative(process.cwd(), marketplacePath)}`));
  }
}

async function installCursorSkill(skillsDir, packageDir, global) {
  const paths = getCursorPaths(global);
  const targetDir = path.dirname(paths.configPath);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const skillMdSource = path.join(skillsDir, 'omnidesign.md');
  const skillMdTarget = path.join(targetDir, 'SKILL.md');
  if (fs.existsSync(skillMdSource)) {
    fs.copyFileSync(skillMdSource, skillMdTarget);
    console.log(chalk.gray(`  Created: ${path.relative(process.cwd(), skillMdTarget)}`));
  }
}

async function installOpenCodeSkill(skillsDir, packageDir, global) {
  const paths = getOpenCodePaths(global);
  const targetDir = path.dirname(paths.configPath);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const skillMdSource = path.join(skillsDir, 'omnidesign.md');
  const skillMdTarget = path.join(targetDir, 'SKILL.md');
  if (fs.existsSync(skillMdSource)) {
    fs.copyFileSync(skillMdSource, skillMdTarget);
    console.log(chalk.gray(`  Created: ${path.relative(process.cwd(), skillMdTarget)}`));
  }
  
  let config = { plugins: [] };
  if (fs.existsSync(paths.configJsonPath)) {
    config = JSON.parse(fs.readFileSync(paths.configJsonPath, 'utf8'));
  }
  
  if (!config.plugins.includes('omnidesign')) {
    config.plugins.push('omnidesign');
    fs.writeFileSync(paths.configJsonPath, JSON.stringify(config, null, 2));
    console.log(chalk.gray(`  Updated: ${path.relative(process.cwd(), paths.configJsonPath)}`));
  }
}

async function installVSCodeSkill(skillsDir, packageDir, global) {
  const paths = getVSCodePaths(global);
  
  fs.mkdirSync(paths.baseDir, { recursive: true });
  
  let settings = {};
  
  if (fs.existsSync(paths.configPath)) {
    settings = JSON.parse(fs.readFileSync(paths.configPath, 'utf8'));
  }
  
  settings['omnidesign.enabled'] = true;
  settings['omnidesign.theme'] = 'corporate';
  
  fs.writeFileSync(paths.configPath, JSON.stringify(settings, null, 2));
  console.log(chalk.gray(`  Updated: ${paths.configFile}`));
  console.log(chalk.yellow('  Note: VS Code extension coming soon. Settings configured.'));
}

async function installAiderSkill(skillsDir, packageDir, global) {
  const paths = getAiderPaths(global);
  const targetDir = path.join(paths.baseDir, '.omnidesign');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const conventionsSource = path.join(skillsDir, 'omnidesign.md');
  fs.copyFileSync(conventionsSource, paths.configPath);
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.gray(`  Created: ${path.relative(process.cwd(), targetDir)}/ (tokens, recipes)`));
  
  const configPath = path.join(paths.baseDir, '.aider.conf.yml');
  if (fs.existsSync(configPath)) {
    let config = fs.readFileSync(configPath, 'utf8');
    if (!config.includes('CONVENTIONS.md')) {
      config += '\nread: CONVENTIONS.md\n';
      fs.writeFileSync(configPath, config);
      console.log(chalk.gray(`  Updated: ${path.relative(process.cwd(), configPath)}`));
    }
  }
}

async function installContinueSkill(skillsDir, packageDir, global) {
  const paths = getContinuePaths(global);
  const targetDir = path.join(paths.baseDir, 'omnidesign');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  fs.copyFileSync(path.join(skillsDir, 'omnidesign.yaml'), paths.configPath);
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.gray(`  Created: ${path.relative(process.cwd(), targetDir)}/ (tokens, recipes)`));
  console.log(chalk.yellow('  Note: Add OmniDesign to your Continue config'));
}

async function installZedSkill(skillsDir, packageDir, global) {
  const paths = getZedPaths(global);
  const targetDir = path.join(paths.baseDir, 'omnidesign');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const config = {
    name: 'OmniDesign',
    version: packageJson.version,
    description: 'Universal design system skill',
    enabled: true
  };
  
  fs.writeFileSync(paths.configPath, JSON.stringify(config, null, 2));
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.gray(`  Created: ${path.relative(process.cwd(), targetDir)}/ (tokens, recipes)`));
  console.log(chalk.yellow('  Note: Add OmniDesign to your Zed settings.json'));
}

async function installAmpSkill(skillsDir, packageDir, global) {
  const paths = getAmpPaths(global);
  const targetDir = path.dirname(paths.configPath);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const skillMdSource = path.join(skillsDir, 'SKILL.md');
  const skillMdTarget = paths.configPath;
  if (fs.existsSync(skillMdSource)) {
    fs.copyFileSync(skillMdSource, skillMdTarget);
    console.log(chalk.gray(`  Created: ${paths.configFile}`));
  }
  console.log(chalk.blue('  You can also use: amp skill add owner/omnidesign'));
}

async function installKiloSkill(skillsDir, packageDir, global) {
  const paths = getKiloPaths(global);
  const targetDir = path.dirname(paths.configPath);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const skillMdSource = path.join(skillsDir, 'SKILL.md');
  const skillMdTarget = paths.configPath;
  if (fs.existsSync(skillMdSource)) {
    fs.copyFileSync(skillMdSource, skillMdTarget);
    console.log(chalk.gray(`  Created: ${paths.configFile}`));
  }
  console.log(chalk.yellow('  Reload VS Code window to activate skill'));
}

async function installAntigravitySkill(skillsDir, packageDir, global) {
  const paths = getAntigravityPaths(global);
  const targetDir = path.dirname(paths.configPath);
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  copySkillContent(skillsDir, targetDir, packageDir);
  
  const skillMdSource = path.join(skillsDir, 'SKILL.md');
  const skillMdTarget = paths.configPath;
  if (fs.existsSync(skillMdSource)) {
    fs.copyFileSync(skillMdSource, skillMdTarget);
    console.log(chalk.gray(`  Created: ${paths.configFile}`));
  }
}

async function uninstallSkill(ide, global = false) {
  switch (ide) {
    case 'claude': {
      const paths = getClaudePaths(global);
      fs.rmSync(path.dirname(paths.configPath), { force: true, recursive: true });
      break;
    }
    case 'cursor': {
      const paths = getCursorPaths(global);
      fs.rmSync(path.dirname(paths.configPath), { force: true, recursive: true });
      break;
    }
    case 'opencode': {
      const paths = getOpenCodePaths(global);
      fs.rmSync(path.dirname(paths.configPath), { force: true, recursive: true });
      break;
    }
    case 'vscode': {
      const paths = getVSCodePaths(global);
      if (fs.existsSync(paths.configPath)) {
        const settings = JSON.parse(fs.readFileSync(paths.configPath, 'utf8'));
        delete settings['omnidesign.enabled'];
        delete settings['omnidesign.theme'];
        fs.writeFileSync(paths.configPath, JSON.stringify(settings, null, 2));
      }
      break;
    }
    case 'zed': {
      const paths = getZedPaths(global);
      fs.rmSync(path.join(paths.baseDir, 'omnidesign'), { force: true, recursive: true });
      fs.rmSync(paths.configPath, { force: true });
      break;
    }
    case 'amp': {
      const paths = getAmpPaths(global);
      fs.rmSync(path.dirname(paths.configPath), { force: true, recursive: true });
      break;
    }
    case 'kilo': {
      const paths = getKiloPaths(global);
      fs.rmSync(path.dirname(paths.configPath), { force: true, recursive: true });
      break;
    }
    case 'antigravity': {
      const paths = getAntigravityPaths(global);
      fs.rmSync(path.dirname(paths.configPath), { force: true, recursive: true });
      break;
    }
    case 'aider': {
      const paths = getAiderPaths(global);
      fs.rmSync(paths.configPath, { force: true });
      fs.rmSync(path.join(paths.baseDir, '.omnidesign'), { force: true, recursive: true });
      break;
    }
    case 'continue': {
      const paths = getContinuePaths(global);
      fs.rmSync(paths.configPath, { force: true });
      fs.rmSync(path.join(paths.baseDir, 'omnidesign'), { force: true, recursive: true });
      break;
    }
  }
}

program.parse();
