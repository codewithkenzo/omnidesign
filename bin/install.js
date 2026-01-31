#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

execSync(`node ${path.join(__dirname, 'cli.js')} install`, { stdio: 'inherit' });
