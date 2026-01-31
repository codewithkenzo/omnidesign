#!/usr/bin/env node
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

execSync(`node ${path.join(__dirname, 'cli.js')} install`, { stdio: 'inherit' });
