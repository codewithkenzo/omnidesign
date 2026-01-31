#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

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
  .option('-g, --global', 'Install globally (default: project-level)')
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
  .description('List available IDE integrations')
  .option('-g, --global', 'Check global installations')
  .action((options) => {
    console.log(chalk.blue('🎨 Supported IDEs:\n'));
    
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
      const installed = fs.existsSync(ide.configPath);
      const status = installed ? chalk.green('✓ installed') : chalk.gray('not installed');
      console.log(`  ${chalk.bold(ide.name)}: ${status}`);
      console.log(`    Config: ${ide.configFile}`);
      console.log();
    });
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
    configPath: path.join(baseDir, 'skills', 'omnidesign.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign.md')),
    baseDir
  };
}

function getCursorPaths(global = false) {
  const baseDir = global ? path.join(homedir, '.cursor') : path.join(process.cwd(), '.cursor');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign.md')),
    baseDir
  };
}

function getOpenCodePaths(global = false) {
  const baseDir = global 
    ? path.join(homedir, '.config', 'opencode')
    : path.join(process.cwd(), '.opencode');
  return {
    configPath: path.join(baseDir, 'skills', 'omnidesign.md'),
    configFile: path.relative(process.cwd(), path.join(baseDir, 'skills', 'omnidesign.md')),
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
  
  if (fs.existsSync(path.join(cwd, '.claude'))) return 'claude';
  if (fs.existsSync(path.join(cwd, '.cursor'))) return 'cursor';
  if (fs.existsSync(path.join(cwd, '.opencode'))) return 'opencode';
  if (fs.existsSync(path.join(cwd, '.vscode'))) return 'vscode';
  if (fs.existsSync(path.join(cwd, '.zed'))) return 'zed';
  if (fs.existsSync(path.join(cwd, '.agents'))) return 'amp';
  if (fs.existsSync(path.join(cwd, '.kilocode'))) return 'kilo';
  if (fs.existsSync(path.join(cwd, '.antigravity'))) return 'antigravity';
  if (fs.existsSync(path.join(cwd, '.agent'))) return 'antigravity';
  if (fs.existsSync(path.join(cwd, '.aider.conf.yml'))) return 'aider';
  if (fs.existsSync(path.join(cwd, '.continue'))) return 'continue';
  if (fs.existsSync(path.join(cwd, 'claude.md'))) return 'claude';
  if (fs.existsSync(path.join(cwd, '.cursorrules'))) return 'cursor';
  
  if (global || true) {
    if (fs.existsSync(path.join(homedir, '.claude'))) return 'claude';
    if (fs.existsSync(path.join(homedir, '.cursor'))) return 'cursor';
    if (fs.existsSync(path.join(homedir, '.config', 'opencode'))) return 'opencode';
    if (fs.existsSync(path.join(homedir, '.kilocode'))) return 'kilo';
    if (fs.existsSync(path.join(homedir, '.gemini', 'antigravity'))) return 'antigravity';
    if (fs.existsSync(path.join(homedir, '.config', 'Code'))) return 'vscode';
    if (fs.existsSync(path.join(homedir, '.config', 'zed'))) return 'zed';
    if (fs.existsSync(path.join(homedir, '.config', 'agents'))) return 'amp';
    if (fs.existsSync(path.join(homedir, '.continue'))) return 'continue';
  }
  
  if (process.env.CLAUDE_CODE) return 'claude';
  if (process.env.CURSOR_TRACE) return 'cursor';
  
  return null;
}

async function installSkill(ide, global = false) {
  const skillsDir = path.join(__dirname, '..', 'skills', ide);
  
  if (!fs.existsSync(skillsDir)) {
    throw new Error(`Skill files for ${ide} not found`);
  }
  
  switch (ide) {
    case 'claude':
      await installClaudeSkill(skillsDir, global);
      break;
    case 'cursor':
      await installCursorSkill(skillsDir, global);
      break;
    case 'opencode':
      await installOpenCodeSkill(skillsDir, global);
      break;
    case 'vscode':
      await installVSCodeSkill(skillsDir, global);
      break;
    case 'aider':
      await installAiderSkill(skillsDir, global);
      break;
    case 'continue':
      await installContinueSkill(skillsDir, global);
      break;
    case 'zed':
      await installZedSkill(skillsDir, global);
      break;
    case 'amp':
      await installAmpSkill(skillsDir, global);
      break;
    case 'kilo':
      await installKiloSkill(skillsDir, global);
      break;
    case 'antigravity':
      await installAntigravitySkill(skillsDir, global);
      break;
    default:
      throw new Error(`Unsupported IDE: ${ide}`);
  }
}

async function installClaudeSkill(skillsDir, global) {
  const paths = getClaudePaths(global);
  
  fs.mkdirSync(path.dirname(paths.configPath), { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'omnidesign.md'),
    paths.configPath
  );
  
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  
  const marketplacePath = path.join(paths.baseDir, 'marketplace.json');
  
  let marketplace = { name: 'local', plugins: [] };
  if (fs.existsSync(marketplacePath)) {
    marketplace = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
  }
  
  if (!marketplace.plugins.find(p => p.name === 'omnidesign')) {
    marketplace.plugins.push({
      name: 'omnidesign',
      source: './skills/omnidesign.md',
      description: 'Universal design system with 25 themes and AI components',
      version: packageJson.version
    });
    fs.writeFileSync(marketplacePath, JSON.stringify(marketplace, null, 2));
    console.log(chalk.gray(`  Updated: ${path.relative(process.cwd(), marketplacePath)}`));
  }
}

async function installCursorSkill(skillsDir, global) {
  const paths = getCursorPaths(global);
  
  fs.mkdirSync(path.dirname(paths.configPath), { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'omnidesign.md'),
    paths.configPath
  );
  
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
}

async function installOpenCodeSkill(skillsDir, global) {
  const paths = getOpenCodePaths(global);
  
  fs.mkdirSync(path.dirname(paths.configPath), { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'omnidesign.md'),
    paths.configPath
  );
  
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  
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

async function installVSCodeSkill(skillsDir, global) {
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
}

async function installAiderSkill(skillsDir, global) {
  const paths = getAiderPaths(global);
  
  fs.copyFileSync(path.join(skillsDir, 'omnidesign.md'), paths.configPath);
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  
  const configPath = path.join(process.cwd(), '.aider.conf.yml');
  if (fs.existsSync(configPath)) {
    let config = fs.readFileSync(configPath, 'utf8');
    if (!config.includes('CONVENTIONS.md')) {
      config += '\nread: CONVENTIONS.md\n';
      fs.writeFileSync(configPath, config);
      console.log(chalk.gray(`  Updated: ${path.relative(process.cwd(), configPath)}`));
    }
  }
}

async function installContinueSkill(skillsDir, global) {
  const paths = getContinuePaths(global);
  
  fs.mkdirSync(paths.baseDir, { recursive: true });
  
  fs.copyFileSync(path.join(skillsDir, 'omnidesign.yaml'), paths.configPath);
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.yellow('  Note: Please manually add OmniDesign to your Continue config'));
}

async function installZedSkill(skillsDir, global) {
  const paths = getZedPaths(global);
  
  fs.mkdirSync(paths.baseDir, { recursive: true });
  
  const config = {
    name: 'OmniDesign',
    version: packageJson.version,
    description: 'Universal design system skill',
    enabled: true
  };
  
  fs.writeFileSync(paths.configPath, JSON.stringify(config, null, 2));
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.yellow('  Note: Add OmniDesign to your Zed settings.json'));
}

async function installAmpSkill(skillsDir, global) {
  const paths = getAmpPaths(global);
  
  fs.mkdirSync(path.dirname(paths.configPath), { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'SKILL.md'),
    paths.configPath
  );
  
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.blue('  You can also use: amp skill add owner/omnidesign'));
}

async function installKiloSkill(skillsDir, global) {
  const paths = getKiloPaths(global);
  
  fs.mkdirSync(path.dirname(paths.configPath), { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'SKILL.md'),
    paths.configPath
  );
  
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
  console.log(chalk.yellow('  Reload VS Code window to activate skill'));
}

async function installAntigravitySkill(skillsDir, global) {
  const paths = getAntigravityPaths(global);
  
  fs.mkdirSync(path.dirname(paths.configPath), { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'SKILL.md'),
    paths.configPath
  );
  
  console.log(chalk.gray(`  Created: ${paths.configFile}`));
}

async function uninstallSkill(ide, global = false) {
  switch (ide) {
    case 'claude': {
      const paths = getClaudePaths(global);
      fs.rmSync(paths.configPath, { force: true });
      break;
    }
    case 'cursor': {
      const paths = getCursorPaths(global);
      fs.rmSync(paths.configPath, { force: true });
      break;
    }
    case 'opencode': {
      const paths = getOpenCodePaths(global);
      fs.rmSync(paths.configPath, { force: true });
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
      fs.rmSync(paths.configPath, { force: true });
      break;
    }
    case 'amp': {
      const paths = getAmpPaths(global);
      fs.rmSync(paths.configPath, { force: true, recursive: true });
      break;
    }
    case 'kilo': {
      const paths = getKiloPaths(global);
      fs.rmSync(paths.configPath, { force: true, recursive: true });
      break;
    }
    case 'antigravity': {
      const paths = getAntigravityPaths(global);
      fs.rmSync(paths.configPath, { force: true, recursive: true });
      break;
    }
    case 'aider': {
      const paths = getAiderPaths(global);
      fs.rmSync(paths.configPath, { force: true });
      break;
    }
    case 'continue': {
      const paths = getContinuePaths(global);
      fs.rmSync(paths.configPath, { force: true });
      break;
    }
  }
}

program.parse();
