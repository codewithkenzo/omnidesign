# AGENTS.md

Guidance for AI coding agents working with the OmniDesign repository.

## Repository Overview

**OmniDesign** is a universal design skills system for AI coding assistants. It provides:
- 25 curated themes with complete design tokens
- 100+ design tokens (colors, spacing, typography, shadows)
- AI industry component recipes (chat, prompts, agents, forms)
- 40+ font families including Nerd Fonts
- Universal installer supporting 10+ IDEs

## Architecture

### Directory Structure

```
omnidesign/
├── README.md                 # Public-facing documentation
├── package.json             # NPM manifest with CLI
├── AGENTS.md               # This file - agent guidance
├── bin/                    # CLI tools
│   ├── cli.js             # Main installer CLI
│   ├── detect-ide.js      # IDE detection
│   └── install.js         # Install script
├── tokens/                 # Design tokens (DTCG format)
│   ├── themes/            # 25 theme files
│   ├── primitives/        # Base values
│   ├── semantic/          # Contextual tokens
│   └── typography/        # Font collections
├── recipes/               # Component patterns
│   ├── components/        # AI chat, prompts, forms
│   ├── motion/           # Animation patterns
│   └── patterns/         # Design patterns
├── skills/               # IDE-specific skills
│   ├── claude/          # Claude Code skill
│   ├── cursor/          # Cursor skill
│   ├── opencode/        # OpenCode skill
│   ├── vscode/          # VS Code extension
│   ├── aider/           # Aider conventions
│   ├── continue/        # Continue.dev config
│   ├── zed/             # Zed config
│   ├── amp/             # Amp Code skill
│   ├── kilo/            # Kilo Code skill
│   └── antigravity/     # Antigravity skill
├── scripts/              # Build/maintenance scripts
│   ├── build-tokens.js
│   ├── validate-tokens.js
│   └── generate-palettes.js
└── assets/              # Static assets
    └── palettes/        # Theme palette images
```

## Agent Skills Format

This repository follows the [Agent Skills](https://agentskills.io/) open standard.

### SKILL.md Format

Each skill in `skills/{ide}/` follows this structure:

```markdown
---
name: {skill-name}
description: {What it does and when to use it}
---

# {Title}

## Overview

## Usage

## Design Tokens

## Themes

## Components
```

### Required Frontmatter Fields

- **name**: lowercase, alphanumeric + hyphens, max 64 chars
- **description**: max 1024 chars, describes what and when to use

### Optional Fields

- **license**: License name or file reference
- **compatibility**: Environment requirements
- **metadata**: Arbitrary key-value pairs

### Progressive Disclosure

Skills use progressive disclosure for context efficiency:

1. **Metadata** (~100 tokens): `name` and `description` loaded at startup
2. **Instructions** (< 5000 tokens): Full `SKILL.md` loaded when activated
3. **Resources**: Files loaded only when referenced

## Creating New Skills

### 1. Research Phase

Before creating a skill, research:
- Target IDE's skill format and location
- Existing skill patterns in that ecosystem
- User pain points this skill solves
- Trigger phrases users might say

### 2. Directory Structure

```
skills/{ide}/
├── SKILL.md              # Required: skill definition
├── scripts/              # Optional: executable scripts
├── references/           # Optional: additional docs
└── assets/              # Optional: static resources
```

### 3. SKILL.md Template

```markdown
---
name: {skill-name}
description: {One sentence. Include trigger phrases like "Use X theme", "Create Y component"}
---

# {Skill Title}

{Brief description}

## When to Use

{Trigger conditions}

## Capabilities

- {Capability 1}
- {Capability 2}

## Usage Examples

### Example 1: {Use case}
```
User: "{Example prompt}"
AI: [Uses skill to accomplish task]
```

## Reference

- [Detailed docs](references/REFERENCE.md)
- [Token system](tokens/)
```

### 4. IDE-Specific Guidelines

**Claude Code:**
- Location: `~/.claude/skills/{skill-name}/`
- Entry: `SKILL.md` (or `omnidesign.md` for legacy)
- Config: `~/.claude/marketplace.json`

**Cursor:**
- Location: `~/.cursor/skills/{skill-name}/`
- Entry: `SKILL.md`

**OpenCode:**
- Location: `~/.config/opencode/skills/{skill-name}/`
- Entry: `SKILL.md`
- Config: `~/.config/opencode/config.json` (plugins array)

**VS Code:**
- Location: `~/.vscode/settings.json`
- Format: Settings-based configuration

**Zed:**
- Location: `~/.zed/{skill-name}/`
- Entry: Config JSON + supporting files

**Amp Code:**
- Location: `~/.config/agents/skills/{skill-name}/`
- Entry: `SKILL.md`

**Kilo Code:**
- Location: `~/.kilocode/skills/{skill-name}/`
- Entry: `SKILL.md`

**Antigravity:**
- Location: `~/.gemini/antigravity/skills/{skill-name}/`
- Entry: `SKILL.md`

**Aider:**
- Location: Project root
- Entry: `CONVENTIONS.md`
- Supporting: `.omnidesign/` directory

**Continue.dev:**
- Location: `~/.continue/{skill-name}/`
- Entry: YAML config + supporting files

## CLI Architecture

### Installation Flow

1. **Detect IDE**: Check for IDE directories in home folder
2. **Copy Skill Content**: 
   - Copy skill-specific files
   - Copy `tokens/` directory
   - Copy `recipes/` directory
3. **Update Config**: Update IDE-specific config files
4. **Verify**: Confirm installation success

### Path Resolution

```javascript
// Global installation paths
const paths = {
  claude: '~/.claude/skills/omnidesign/',
  cursor: '~/.cursor/skills/omnidesign/',
  opencode: '~/.config/opencode/skills/omnidesign/',
  vscode: '~/.vscode/settings.json',
  zed: '~/.zed/omnidesign/',
  amp: '~/.config/agents/skills/omnidesign/',
  kilo: '~/.kilocode/skills/omnidesign/',
  antigravity: '~/.gemini/antigravity/skills/omnidesign/',
  aider: './CONVENTIONS.md',
  continue: '~/.continue/omnidesign/'
};
```

## Design Token System

### Token Structure (DTCG Format)

```json
{
  "token-name": {
    "$type": "color|dimension|shadow|fontFamily",
    "$value": "#hex|px|...",
    "$description": "Human-readable description"
  }
}
```

### Token Categories

1. **Primitives**: Base values (colors, spacing, typography)
2. **Semantic**: Contextual tokens (text-default, surface-raised)
3. **Themes**: Complete theme definitions
4. **Typography**: Font families and scales

### Theme Format

Each theme includes:
- Color tokens (text, surface, border, interactive, status)
- Shadow tokens (card, dropdown, modal, focus)
- Complete palette for light/dark variants

## Component Recipes

### Recipe Structure

```markdown
# Component Name

## Overview

## Usage

## Design Tokens Used

## Example
```

### Available Recipes

- **ai-chat**: Full chat interface with streaming
- **prompt-input**: Smart input with modifiers
- **agent-card**: Model/agent displays
- **thinking-indicator**: Loading states
- **code-block**: Syntax highlighting
- **file-upload**: Drag-and-drop upload
- **forms**: Input patterns
- **hero-section**: Landing page hero
- **navbar**: Navigation patterns
- **bento-grid**: Content grids

## Branding Guidelines

### Logo
- File: `logo.jpg`
- Usage: README, documentation
- Size: 160px width in README

### Colors
- Primary: `#0052CC` (corporate blue)
- Accent: `#00B8D9` (cyan)
- Dark background: `#0d1117`
- Light text: `#e6edf3`

### Typography
- Headings: System sans-serif
- Code: JetBrains Mono, monospace

### Badges
```markdown
![npm](https://img.shields.io/npm/v/omnidesign?style=flat-square&color=blue)
![bun](https://img.shields.io/badge/bun-runtime-fbf0df?logo=bun)
![license](https://img.shields.io/npm/l/omnidesign?style=flat-square)
```

## Publishing

### NPM Release

```bash
npm version patch|minor|major
npm publish --access public
```

### GitHub Release

1. Update version in `package.json`
2. Commit: `git commit -m "release: vX.Y.Z"`
3. Tag: `git tag vX.Y.Z`
4. Push: `git push && git push --tags`

## Testing

### Manual Testing Checklist

- [ ] Install works for each IDE
- [ ] Uninstall removes all files
- [ ] Tokens are accessible
- [ ] Recipes load correctly
- [ ] CLI list shows correct status

### Test Commands

```bash
# Test install
node bin/cli.js install --ide claude --global

# Test uninstall
node bin/cli.js uninstall --ide claude --global

# List status
node bin/cli.js list --global
```

## Common Tasks

### Adding a New Theme

1. Create `tokens/themes/{theme-name}.json`
2. Run `node scripts/generate-palettes.js`
3. Update README theme tables
4. Test theme application

### Adding a New IDE

1. Create `skills/{ide}/SKILL.md`
2. Add path helper in `bin/cli.js`
3. Add install/uninstall functions
4. Update README supported IDEs table
5. Test install/uninstall cycle

### Updating Skill Content

1. Modify files in `tokens/` or `recipes/`
2. Test locally
3. Version bump
4. Publish

## Resources

- [Agent Skills Spec](https://agentskills.io/specification)
- [DTCG Token Format](https://design-tokens.github.io/)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## License

MIT © [codewithkenzo](https://github.com/codewithkenzo)
