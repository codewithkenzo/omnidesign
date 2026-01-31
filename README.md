# OmniDesign

Universal design skills system for AI coding assistants. One package, 10 IDEs, 25 themes.

[Install](#installation) • [Themes](#themes) • [Usage](#usage)

---

## Installation

### For Humans

```bash
npx omnidesign
```

Auto-detects your IDE and installs the skill globally.

**Manual install for specific IDE:**
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

### For Your Agent

Copy-paste this prompt to your AI assistant:

> Install the OmniDesign skill from npm. Run: `npx omnidesign install --ide <your-ide> --global`

Once installed, your agent has access to:
- 25 curated themes with complete design tokens
- AI industry components (chat, prompts, agents)
- 40+ font families including Nerd Fonts
- 100+ design tokens (colors, spacing, typography)

---

## Themes

25 production-ready themes. Each includes complete color tokens, shadows, and interactive states.

### Professional

| Theme | Preview |
|-------|---------|
| corporate | ![corporate](assets/palettes/corporate.svg) |
| navy | ![navy](assets/palettes/navy.svg) |
| slate | ![slate](assets/palettes/slate.svg) |
| forest | ![forest](assets/palettes/forest.svg) |
| ruby | ![ruby](assets/palettes/ruby.svg) |
| graphite | ![graphite](assets/palettes/graphite.svg) |

### Creative

| Theme | Preview |
|-------|---------|
| sunset | ![sunset](assets/palettes/sunset.svg) |
| ocean | ![ocean](assets/palettes/ocean.svg) |
| berry | ![berry](assets/palettes/berry.svg) |
| mint | ![mint](assets/palettes/mint.svg) |
| coral | ![coral](assets/palettes/coral.svg) |
| lavender | ![lavender](assets/palettes/lavender.svg) |

### Dark Mode

| Theme | Preview |
|-------|---------|
| midnight | ![midnight](assets/palettes/midnight.svg) |
| noir | ![noir](assets/palettes/noir.svg) |
| cyberpunk | ![cyberpunk](assets/palettes/cyberpunk.svg) |
| obsidian | ![obsidian](assets/palettes/obsidian.svg) |
| deep-space | ![deep-space](assets/palettes/deep-space.svg) |
| brutalist | ![brutalist](assets/palettes/brutalist.svg) |

### Light Mode

| Theme | Preview |
|-------|---------|
| daylight | ![daylight](assets/palettes/daylight.svg) |
| paper | ![paper](assets/palettes/paper.svg) |
| cream | ![cream](assets/palettes/cream.svg) |
| snow | ![snow](assets/palettes/snow.svg) |
| spring | ![spring](assets/palettes/spring.svg) |
| solar | ![solar](assets/palettes/solar.svg) |

### Specialty

| Theme | Preview |
|-------|---------|
| starry-night | ![starry-night](assets/palettes/starry-night.svg) |

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

Your AI assistant can reference:

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

## What's Included

Each skill installation contains:

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
