#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const homeDir = os.homedir();

function detectAllIDEs() {
  const detected = [];
  const cwd = process.cwd();

  const checks = [
    { name: 'claude', path: path.join(homeDir, '.claude') },
    { name: 'cursor', path: path.join(homeDir, '.cursor') },
    { name: 'opencode', path: path.join(homeDir, '.config', 'opencode') },
    { name: 'vscode', path: path.join(homeDir, '.config', 'Code') },
    { name: 'zed', path: path.join(homeDir, '.config', 'zed') },
    { name: 'amp', path: path.join(homeDir, '.config', 'agents') },
    { name: 'kilo', path: path.join(homeDir, '.kilocode') },
    { name: 'antigravity', path: path.join(homeDir, '.gemini', 'antigravity') },
    { name: 'continue', path: path.join(homeDir, '.continue') },
    { name: 'claude-local', path: path.join(cwd, '.claude') },
    { name: 'cursor', path: path.join(cwd, '.cursor') },
    { name: 'aider', path: path.join(cwd, '.aider.conf.yml') },
  ];

  const envChecks = [
    { name: 'claude', env: 'CLAUDE_CODE' },
    { name: 'cursor', env: 'CURSOR_TRACE' },
  ];

  for (const check of checks) {
    if (fs.existsSync(check.path) && !detected.find(d => d.name === check.name)) {
      detected.push({ name: check.name, source: fs.statSync(check.path).isDirectory() ? 'global' : 'project' });
    }
  }

  for (const check of envChecks) {
    if (process.env[check.env] && !detected.find(d => d.name === check.name)) {
      detected.push({ name: check.name, source: 'env' });
    }
  }

  return detected;
}

function autoInstall() {
  const detected = detectAllIDEs();

  if (detected.length === 0) {
    console.log(chalk.gray('ℹ️  No IDE detected. Run: npx omnidesign install --ide <ide>'));
    console.log(chalk.gray('Supported: claude, cursor, opencode, vscode, zed, amp, kilo, antigravity, aider, continue'));
    return;
  }

  if (detected.length === 1) {
    console.log(chalk.blue(`🎨 OmniDesign detected ${detected[0].name}. Installing...\n`));
    try {
      execSync(`node ${path.join(__dirname, 'cli.js')} install --global`, { stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.gray('ℹ️  Run manually: npx omnidesign install --global'));
    }
    return;
  }

  console.log(chalk.blue(`🎨 OmniDesign detected multiple IDEs:\n`));
  detected.forEach((ide, i) => {
    console.log(chalk.gray(`  ${i + 1}. ${ide.name} (${ide.source})`));
  });
  console.log(chalk.gray(`\nInstall for all: npx omnidesign install --global`));
  console.log(chalk.gray(`Or specify one:  npx omnidesign install --ide <name> --global`));
}

autoInstall();
