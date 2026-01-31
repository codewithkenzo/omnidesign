#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

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
    
    const detectedIde = options.ide || detectIDE();
    
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
  .action(() => {
    console.log(chalk.blue('🎨 Supported IDEs:\n'));
    
    const ides = [
      { name: 'Claude Code', cmd: 'claude', file: '.claude/skills/omnidesign.md' },
      { name: 'Cursor', cmd: 'cursor', file: '.cursor/skills/omnidesign.md' },
      { name: 'OpenCode', cmd: 'opencode', file: '.opencode/skills/omnidesign.md' },
      { name: 'VS Code', cmd: 'vscode', file: '.vscode/settings.json' },
      { name: 'Zed', cmd: 'zed', file: '.zed/omnidesign.json' },
      { name: 'Amp Code', cmd: 'amp', file: '.agents/skills/omnidesign/SKILL.md' },
      { name: 'Kilo Code', cmd: 'kilo', file: '.kilocode/skills/omnidesign/SKILL.md' },
      { name: 'Antigravity', cmd: 'antigravity', file: '.agent/skills/omnidesign/SKILL.md' },
      { name: 'Aider', cmd: 'aider', file: 'CONVENTIONS.md' },
      { name: 'Continue.dev', cmd: 'continue', file: '.continue/config.yaml' },
    ];
    
    ides.forEach(ide => {
      const installed = fs.existsSync(path.join(process.cwd(), ide.file));
      const status = installed ? chalk.green('✓ installed') : chalk.gray('not installed');
      console.log(`  ${chalk.bold(ide.name)}: ${status}`);
      console.log(`    Config: ${ide.file}`);
      console.log();
    });
  });

program
  .command('uninstall')
  .description('Remove OmniDesign skill from your IDE')
  .option('-i, --ide <ide>', 'Target IDE')
  .action(async (options) => {
    const detectedIde = options.ide || detectIDE();
    
    if (!detectedIde) {
      console.log(chalk.yellow('⚠️  Please specify IDE with --ide flag'));
      return;
    }
    
    console.log(chalk.blue(`Removing OmniDesign from ${detectedIde}...`));
    await uninstallSkill(detectedIde);
    console.log(chalk.green('✅ Uninstalled successfully'));
  });

function detectIDE() {
  const cwd = process.cwd();
  
  if (fs.existsSync(path.join(cwd, '.claude'))) return 'claude';
  if (fs.existsSync(path.join(cwd, '.cursor'))) return 'cursor';
  if (fs.existsSync(path.join(cwd, '.opencode'))) return 'opencode';
  if (fs.existsSync(path.join(cwd, '.vscode'))) return 'vscode';
  if (fs.existsSync(path.join(cwd, '.zed'))) return 'zed';
  if (fs.existsSync(path.join(cwd, '.amp'))) return 'amp';
  if (fs.existsSync(path.join(cwd, '.kilocode'))) return 'kilo';
  if (fs.existsSync(path.join(cwd, '.antigravity'))) return 'antigravity';
  if (fs.existsSync(path.join(cwd, '.agents'))) return 'amp';
  if (fs.existsSync(path.join(cwd, '.aider.conf.yml'))) return 'aider';
  if (fs.existsSync(path.join(cwd, '.continue'))) return 'continue';
  if (fs.existsSync(path.join(cwd, 'claude.md'))) return 'claude';
  if (fs.existsSync(path.join(cwd, '.cursorrules'))) return 'cursor';
  if (process.env.CLAUDE_CODE) return 'claude';
  if (process.env.CURSOR_TRACE) return 'cursor';
  
  return null;
}

async function installSkill(ide, global = false) {
  const cwd = process.cwd();
  const skillsDir = path.join(__dirname, '..', 'skills', ide);
  
  if (!fs.existsSync(skillsDir)) {
    throw new Error(`Skill files for ${ide} not found`);
  }
  
  switch (ide) {
    case 'claude':
      await installClaudeSkill(cwd, skillsDir, global);
      break;
    case 'cursor':
      await installCursorSkill(cwd, skillsDir, global);
      break;
    case 'opencode':
      await installOpenCodeSkill(cwd, skillsDir, global);
      break;
    case 'vscode':
      await installVSCodeSkill(cwd, skillsDir, global);
      break;
    case 'aider':
      await installAiderSkill(cwd, skillsDir, global);
      break;
    case 'continue':
      await installContinueSkill(cwd, skillsDir, global);
      break;
    case 'zed':
      await installZedSkill(cwd, skillsDir, global);
      break;
    case 'amp':
      await installAmpSkill(cwd, skillsDir, global);
      break;
    case 'kilo':
      await installKiloSkill(cwd, skillsDir, global);
      break;
    case 'antigravity':
      await installAntigravitySkill(cwd, skillsDir, global);
      break;
    default:
      throw new Error(`Unsupported IDE: ${ide}`);
  }
}

async function installClaudeSkill(cwd, skillsDir, global) {
  const targetDir = global 
    ? path.join(require('os').homedir(), '.claude', 'skills')
    : path.join(cwd, '.claude', 'skills');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'omnidesign.md'),
    path.join(targetDir, 'omnidesign.md')
  );
  
  console.log(chalk.gray(`  Created: ${path.relative(cwd, path.join(targetDir, 'omnidesign.md'))}`));
  
  const marketplacePath = global
    ? path.join(require('os').homedir(), '.claude', 'marketplace.json')
    : path.join(cwd, '.claude', 'marketplace.json');
  
  let marketplace = { name: 'local', plugins: [] };
  if (fs.existsSync(marketplacePath)) {
    marketplace = JSON.parse(fs.readFileSync(marketplacePath, 'utf8'));
  }
  
  if (!marketplace.plugins.find(p => p.name === 'omnidesign')) {
    marketplace.plugins.push({
      name: 'omnidesign',
      source: './skills/omnidesign.md',
      description: 'Universal design system with 25 themes and AI components',
      version: '1.0.0'
    });
    fs.writeFileSync(marketplacePath, JSON.stringify(marketplace, null, 2));
    console.log(chalk.gray(`  Updated: ${path.relative(cwd, marketplacePath)}`));
  }
}

async function installCursorSkill(cwd, skillsDir, global) {
  const targetDir = global
    ? path.join(require('os').homedir(), '.cursor', 'skills')
    : path.join(cwd, '.cursor', 'skills');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'omnidesign.md'),
    path.join(targetDir, 'omnidesign.md')
  );
  
  console.log(chalk.gray(`  Created: ${path.relative(cwd, path.join(targetDir, 'omnidesign.md'))}`));
}

async function installOpenCodeSkill(cwd, skillsDir, global) {
  const targetDir = global
    ? path.join(require('os').homedir(), '.config', 'opencode', 'skills')
    : path.join(cwd, '.opencode', 'skills');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'omnidesign.md'),
    path.join(targetDir, 'omnidesign.md')
  );
  
  console.log(chalk.gray(`  Created: ${path.relative(cwd, path.join(targetDir, 'omnidesign.md'))}`));
  
  const configPath = global
    ? path.join(require('os').homedir(), '.config', 'opencode', 'config.json')
    : path.join(cwd, '.opencode', 'config.json');
  
  let config = { plugins: [] };
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  
  if (!config.plugins.includes('omnidesign')) {
    config.plugins.push('omnidesign');
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.gray(`  Updated: ${path.relative(cwd, configPath)}`));
  }
}

async function installVSCodeSkill(cwd, skillsDir, global) {
  const targetDir = path.join(cwd, '.vscode');
  fs.mkdirSync(targetDir, { recursive: true });
  
  const settingsPath = path.join(targetDir, 'settings.json');
  let settings = {};
  
  if (fs.existsSync(settingsPath)) {
    settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  }
  
  settings['omnidesign.enabled'] = true;
  settings['omnidesign.theme'] = 'corporate';
  
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  console.log(chalk.gray(`  Updated: ${path.relative(cwd, settingsPath)}`));
}

async function installAiderSkill(cwd, skillsDir, global) {
  const conventionsPath = path.join(cwd, 'CONVENTIONS.md');
  
  fs.copyFileSync(path.join(skillsDir, 'omnidesign.md'), conventionsPath);
  console.log(chalk.gray(`  Created: ${path.relative(cwd, conventionsPath)}`));
  
  const configPath = path.join(cwd, '.aider.conf.yml');
  if (fs.existsSync(configPath)) {
    let config = fs.readFileSync(configPath, 'utf8');
    if (!config.includes('CONVENTIONS.md')) {
      config += '\nread: CONVENTIONS.md\n';
      fs.writeFileSync(configPath, config);
      console.log(chalk.gray(`  Updated: ${path.relative(cwd, configPath)}`));
    }
  }
}

async function installContinueSkill(cwd, skillsDir, global) {
  const targetDir = path.join(cwd, '.continue');
  fs.mkdirSync(targetDir, { recursive: true });
  
  const skillRefPath = path.join(targetDir, 'omnidesign.yaml');
  fs.copyFileSync(path.join(skillsDir, 'omnidesign.yaml'), skillRefPath);
  console.log(chalk.gray(`  Created: ${path.relative(cwd, skillRefPath)}`));
  console.log(chalk.yellow('  Note: Please manually add OmniDesign to your Continue config'));
}

async function installZedSkill(cwd, skillsDir, global) {
  const targetDir = path.join(cwd, '.zed');
  fs.mkdirSync(targetDir, { recursive: true });
  
  const configPath = path.join(targetDir, 'omnidesign.json');
  const config = {
    name: 'OmniDesign',
    version: '1.0.0',
    description: 'Universal design system skill',
    enabled: true
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(chalk.gray(`  Created: ${path.relative(cwd, configPath)}`));
  console.log(chalk.yellow('  Note: Add OmniDesign to your Zed settings.json'));
}

async function installAmpSkill(cwd, skillsDir, global) {
  const targetDir = global
    ? path.join(require('os').homedir(), '.config', 'agents', 'skills', 'omnidesign')
    : path.join(cwd, '.agents', 'skills', 'omnidesign');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'SKILL.md'),
    path.join(targetDir, 'SKILL.md')
  );
  
  console.log(chalk.gray(`  Created: ${path.relative(cwd, path.join(targetDir, 'SKILL.md'))}`));
  console.log(chalk.blue('  You can also use: amp skill add owner/omnidesign'));
}

async function installKiloSkill(cwd, skillsDir, global) {
  const targetDir = global
    ? path.join(require('os').homedir(), '.kilocode', 'skills', 'omnidesign')
    : path.join(cwd, '.kilocode', 'skills', 'omnidesign');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'SKILL.md'),
    path.join(targetDir, 'SKILL.md')
  );
  
  console.log(chalk.gray(`  Created: ${path.relative(cwd, path.join(targetDir, 'SKILL.md'))}`));
  console.log(chalk.yellow('  Reload VS Code window to activate skill'));
}

async function installAntigravitySkill(cwd, skillsDir, global) {
  const targetDir = global
    ? path.join(require('os').homedir(), '.gemini', 'antigravity', 'skills', 'omnidesign')
    : path.join(cwd, '.agent', 'skills', 'omnidesign');
  
  fs.mkdirSync(targetDir, { recursive: true });
  
  fs.copyFileSync(
    path.join(skillsDir, 'SKILL.md'),
    path.join(targetDir, 'SKILL.md')
  );
  
  console.log(chalk.gray(`  Created: ${path.relative(cwd, path.join(targetDir, 'SKILL.md'))}`));
}

async function uninstallSkill(ide) {
  const cwd = process.cwd();
  
  switch (ide) {
    case 'claude':
      fs.rmSync(path.join(cwd, '.claude', 'skills', 'omnidesign.md'), { force: true });
      break;
    case 'cursor':
      fs.rmSync(path.join(cwd, '.cursor', 'skills', 'omnidesign.md'), { force: true });
      break;
    case 'opencode':
      fs.rmSync(path.join(cwd, '.opencode', 'skills', 'omnidesign.md'), { force: true });
      break;
    case 'vscode':
      const settingsPath = path.join(cwd, '.vscode', 'settings.json');
      if (fs.existsSync(settingsPath)) {
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        delete settings['omnidesign.enabled'];
        delete settings['omnidesign.theme'];
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
      break;
    case 'zed':
      fs.rmSync(path.join(cwd, '.zed', 'omnidesign.json'), { force: true });
      break;
    case 'amp':
      fs.rmSync(path.join(cwd, '.agents', 'skills', 'omnidesign'), { force: true, recursive: true });
      break;
    case 'kilo':
      fs.rmSync(path.join(cwd, '.kilocode', 'skills', 'omnidesign'), { force: true, recursive: true });
      break;
    case 'antigravity':
      fs.rmSync(path.join(cwd, '.agent', 'skills', 'omnidesign'), { force: true, recursive: true });
      break;
    case 'aider':
      fs.rmSync(path.join(cwd, 'CONVENTIONS.md'), { force: true });
      break;
    case 'continue':
      fs.rmSync(path.join(cwd, '.continue', 'omnidesign.yaml'), { force: true });
      break;
  }
}

program.parse();
