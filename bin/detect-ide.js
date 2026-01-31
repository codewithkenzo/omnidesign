#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function detectIDE() {
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
  if (process.env.CLAUDE_CODE) return 'claude';
  if (process.env.CURSOR_TRACE) return 'cursor';
  
  return null;
}

function autoInstall() {
  const ide = detectIDE();
  
  if (!ide) {
    console.log(chalk.gray('ℹ️  No IDE detected. Run: npx omnidesign install --ide <ide>'));
    console.log(chalk.gray('Supported: claude, cursor, opencode, vscode, zed, amp, kilo, antigravity, aider, continue'));
    return;
  }
  
  console.log(chalk.blue(`🎨 OmniDesign detected ${ide}. Installing...\n`));
  
  try {
    execSync(`node ${path.join(__dirname, 'cli.js')} install`, { stdio: 'inherit' });
  } catch (_error) {
    console.log(chalk.gray('ℹ️  Run manually: npx omnidesign install'));
  }
}

autoInstall();
