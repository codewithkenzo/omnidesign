# 🎨 OmniDesign

<p align="center">
  <img src="logo.jpg" alt="OmniDesign Logo" width="160">
</p>

<p align="center">
  <strong>Universal Design Skills System for AI Coding Assistants</strong>
</p>

<p align="center">
  One package. 10 IDEs. 25 themes. 100+ design tokens.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/omnidesign"><img src="https://img.shields.io/npm/v/omnidesign?style=flat-square&color=blue" alt="npm"></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/bun-runtime-fbf0df?logo=bun" alt="Bun"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/omnidesign?style=flat-square" alt="license"></a>
</p>

---

## Quick Start

### Install for Your IDE

```bash
npx omnidesign
```

Auto-detects and installs globally. That's it.

**Manual install:**
```bash
npx omnidesign install --ide claude      # Claude Code
npx omnidesign install --ide cursor      # Cursor
npx omnidesign install --ide opencode    # OpenCode
npx omnidesign install --ide vscode      # VS Code
npx omnidesign install --ide zed         # Zed
npx omnidesign install --ide amp         # Amp Code
npx omnidesign install --ide kilo        # Kilo Code
npx omnidesign install --ide antigravity # Antigravity
npx omnidesign install --ide aider       # Aider
npx omnidesign install --ide continue    # Continue.dev
```

### Install for Your Agent

Copy-paste to your AI assistant:

> Install OmniDesign skill: `npx omnidesign install --ide <your-ide> --global`

Once installed, your agent has access to 25 themes, design tokens, and AI component patterns.

---

## What's Included

```
omnidesign/
├── SKILL.md              # Entry point for your AI
├── tokens/               # Design tokens
│   ├── themes/          # 25 theme files
│   ├── primitives/      # Base colors, spacing
│   └── semantic/        # Contextual tokens
└── recipes/             # Component patterns
    ├── components/      # AI chat, prompts, forms
    └── motion/          # Animation patterns
```

---

## Themes

25 production-ready themes. Each includes complete color tokens, shadows, and interactive states.

### Professional

| Theme | Palette |
|-------|---------|
| corporate | ![corporate](assets/palettes/corporate.svg) |
| navy | ![navy](assets/palettes/navy.svg) |
| slate | ![slate](assets/palettes/slate.svg) |
| forest | ![forest](assets/palettes/forest.svg) |
| ruby | ![ruby](assets/palettes/ruby.svg) |
| graphite | ![graphite](assets/palettes/graphite.svg) |

### Creative

| Theme | Palette |
|-------|---------|
| sunset | ![sunset](assets/palettes/sunset.svg) |
| ocean | ![ocean](assets/palettes/ocean.svg) |
| berry | ![berry](assets/palettes/berry.svg) |
| mint | ![mint](assets/palettes/mint.svg) |
| coral | ![coral](assets/palettes/coral.svg) |
| lavender | ![lavender](assets/palettes/lavender.svg) |

### Dark Mode

| Theme | Palette |
|-------|---------|
| midnight | ![midnight](assets/palettes/midnight.svg) |
| noir | ![noir](assets/palettes/noir.svg) |
| cyberpunk | ![cyberpunk](assets/palettes/cyberpunk.svg) |
| obsidian | ![obsidian](assets/palettes/obsidian.svg) |
| deep-space | ![deep-space](assets/palettes/deep-space.svg) |
| brutalist | ![brutalist](assets/palettes/brutalist.svg) |

### Light Mode

| Theme | Palette |
|-------|---------|
| daylight | ![daylight](assets/palettes/daylight.svg) |
| paper | ![paper](assets/palettes/paper.svg) |
| cream | ![cream](assets/palettes/cream.svg) |
| snow | ![snow](assets/palettes/snow.svg) |
| spring | ![spring](assets/palettes/spring.svg) |
| solar | ![solar](assets/palettes/solar.svg) |

### Specialty

| Theme | Palette |
|-------|---------|
| starry-night | ![starry-night](assets/palettes/starry-night.svg) |

**Usage:** `"Use the cyberpunk theme"` or `"Apply ocean theme"`

---

## Usage

### Apply a Theme

```
User: "Use the cyberpunk theme"
AI: [Applies cyberpunk color tokens to components]
```

### Create Components

```
User: "Create a login form"
AI: [Generates form using --color-interactive-primary, --spacing-md, --shadow-card]
```

### Access Design Tokens

**Colors:**
- `color.text.default` — Primary text
- `color.surface.raised` — Cards, elevated surfaces
- `color.interactive.primary` — Buttons, links
- `color.status.success/error/warning` — Status states

**Spacing:**
- `spacing.4` (4px), `spacing.8` (8px), `spacing.16` (16px)
- `spacing.24` (24px), `spacing.32` (32px), `spacing.48` (48px)

**Typography:**
- `font.sans` — Geist Sans, Inter
- `font.mono` — JetBrains Mono, Geist Mono
- `font.display` — Space Grotesk

**Shadows:**
- `shadow.card` — Cards, buttons
- `shadow.dropdown` — Dropdowns, popovers
- `shadow.modal` — Modals, dialogs

---

## Supported IDEs

| IDE | Install Command | Config Location |
|-----|-----------------|-----------------|
| Claude Code | `npx omnidesign` | `~/.claude/skills/omnidesign/` |
| Cursor | `npx omnidesign` | `~/.cursor/skills/omnidesign/` |
| OpenCode | `npx omnidesign` | `~/.config/opencode/skills/omnidesign/` |
| VS Code | `npx omnidesign` | `~/.vscode/settings.json` |
| Zed | `npx omnidesign` | `~/.zed/omnidesign/` |
| Amp Code | `npx omnidesign` | `~/.config/agents/skills/omnidesign/` |
| Kilo Code | `npx omnidesign` | `~/.kilocode/skills/omnidesign/` |
| Antigravity | `npx omnidesign` | `~/.gemini/antigravity/skills/omnidesign/` |
| Aider | `npx omnidesign` | `./CONVENTIONS.md` |
| Continue.dev | `npx omnidesign` | `~/.continue/omnidesign/` |

---

## CLI Commands

```bash
npx omnidesign                    # Auto-detect and install
npx omnidesign list               # List installed IDEs  
npx omnidesign install --ide <ide> --global   # Install globally
npx omnidesign uninstall --ide <ide> --global  # Uninstall
```

---

## License

MIT © [codewithkenzo](https://github.com/codewithkenzo)

---

<p align="center">
  <a href="https://x.com/codewithkenzo">X @codewithkenzo</a> •
  <a href="https://discord.gg/omnidesign">Discord</a> •
  <a href="https://omnidesign.dev">Website</a>
</p>
