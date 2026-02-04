# 🎨 OmniDesign

<p align="center">
  <img src="logo.jpg" alt="OmniDesign Logo" width="160">
</p>

<p align="center">
  <strong>Universal Design System with Tailwind CSS Integration</strong>
</p>

<p align="center">
  One package. 10 IDEs. 25 themes. 176 colors. 39 Nerd Fonts. Tailwind-ready.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/omnidesign"><img src="https://img.shields.io/npm/v/omnidesign?style=flat-square&color=blue" alt="npm"></a>
  <img src="https://img.shields.io/npm/dw/omnidesign?color=blue&label=downloads" alt="npm downloads">
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/bun-runtime-fbf0df?logo=bun" alt="Bun"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/omnidesign?style=flat-square" alt="license"></a>
</p>

---

## ✨ What's New

### 🚀 Tailwind v4 Migration (Latest)

**Status**: ✅ Complete  
**Branch**: `tailwind-v4-migration`  
**See**: [MIGRATION_SPEC.md](./MIGRATION_SPEC.md) for full details

🎨 **OKLCH Colors** - All 149 colors converted to perceptually uniform OKLCH format  
🧩 **10 Production Components** - 2,547 lines of React 19 + TypeScript components  
🎭 **26 Themes** - Generated theme files with semantic color overrides  
🌗 **Dark Mode** - Built-in support via CSS `prefers-color-scheme`  
📖 **Interactive Demo** - Try all components with live theme switching (`examples/demo.html`)  
⚡ **Type-Safe** - Zero TypeScript errors, ES2024 target, CVA variants

**Components**: AgentCard, BentoGrid, ChatMessage, CodeBlock, FileUpload, Form, HeroSection, Navbar, PromptInput, ThinkingIndicator

### v1.1.0

🎨 **Tailwind CSS Integration** - Full token-to-utility mapping with ready-to-use config  
🌈 **Extended Color Palette** - 16 color families × 11 shades = 176 colors  
🔤 **39 Nerd Fonts** - Complete catalog with CDN links and install commands  
📦 **Component Recipes** - Copy-paste Tailwind snippets for buttons, cards, inputs, alerts  
🤖 **AI-Ready** - Agents can now generate production-ready Tailwind code instantly

---

## 🚀 Quick Start

### Option 1: Install for Your IDE (Recommended)

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
```

### Option 2: Use in Your Project

```bash
npm install omnidesign
```

```javascript
// tailwind.config.js
const omnidesignConfig = require('omnidesign/tailwind');

module.exports = {
  ...omnidesignConfig,
  // Your customizations
};
```

### Option 3: Direct CSS Import

```css
@import 'omnidesign/tokens';
```

---

## 🎨 Tailwind Integration

### Token to Utility Mapping

| Design Token | Tailwind Class | Usage |
|--------------|----------------|-------|
| `color.text-default` | `text-text` | Primary text |
| `color.text-muted` | `text-text-muted` | Secondary text |
| `color.surface-raised` | `bg-surface-raised` | Card backgrounds |
| `color.interactive-primary` | `bg-primary` | Primary buttons |
| `color.status-success` | `text-green-600` | Success states |

### Ready-to-Use Components

**Primary Button**
```tsx
<button className="bg-primary hover:bg-primary-hover text-text-inverted px-4 py-2 rounded-md font-medium shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
  Click me
</button>
```

**Card**
```tsx
<div className="bg-surface-raised rounded-lg shadow-md p-6 border border-border-subtle">
  <h3 className="text-xl font-semibold text-text mb-2">Card Title</h3>
  <p className="text-text-muted">Card content with semantic colors.</p>
</div>
```

**Input**
```tsx
<input className="bg-surface-sunken text-text border border-border rounded-md px-3 py-2 placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Enter text..." />
```

See full documentation in [SKILL.md](skills/opencode/omnidesign-tailwind.md)

---

## 🌈 Color Palette

### Extended Color System

16 color families with 11 shades each (50-950):

**Neutrals:** `neutral`, `slate`, `zinc`, `stone`  
**Warm:** `red`, `orange`, `amber`, `yellow`  
**Nature:** `lime`, `green`, `emerald`, `teal`  
**Cool:** `cyan`, `sky`, `blue`, `indigo`  
**Creative:** `violet`, `purple`, `fuchsia`, `pink`, `rose`

```css
/* Tailwind classes for all shades */
className="bg-blue-600 text-blue-100 border-blue-200"
className="bg-emerald-500 text-emerald-50"
className="bg-purple-600 text-purple-100"
```

### Themes

25 production-ready themes:

**Professional**

| Theme | Palette | Primary Use |
|-------|---------|-------------|
| corporate | ![corporate](assets/palettes/corporate.svg) | Enterprise, SaaS |
| navy | ![navy](assets/palettes/navy.svg) | Professional, trustworthy |
| slate | ![slate](assets/palettes/slate.svg) | Modern tech, clean |
| forest | ![forest](assets/palettes/forest.svg) | Natural, eco-friendly |
| ruby | ![ruby](assets/palettes/ruby.svg) | Bold, confident |
| graphite | ![graphite](assets/palettes/graphite.svg) | Minimal, sophisticated |

**Creative**

| Theme | Palette | Primary Use |
|-------|---------|-------------|
| sunset | ![sunset](assets/palettes/sunset.svg) | Warm, energetic |
| ocean | ![ocean](assets/palettes/ocean.svg) | Calm, refreshing |
| berry | ![berry](assets/palettes/berry.svg) | Playful, vibrant |
| mint | ![mint](assets/palettes/mint.svg) | Fresh, clean |
| coral | ![coral](assets/palettes/coral.svg) | Friendly, warm |
| lavender | ![lavender](assets/palettes/lavender.svg) | Soft, creative |

**Dark Mode**

| Theme | Palette | Primary Use |
|-------|---------|-------------|
| midnight | ![midnight](assets/palettes/midnight.svg) | Classic dark |
| noir | ![noir](assets/palettes/noir.svg) | High contrast |
| cyberpunk | ![cyberpunk](assets/palettes/cyberpunk.svg) | Neon accents |
| obsidian | ![obsidian](assets/palettes/obsidian.svg) | Deep purple |
| deep-space | ![deep-space](assets/palettes/deep-space.svg) | Blue-tinted |
| brutalist | ![brutalist](assets/palettes/brutalist.svg) | Raw, stark |

**Light Mode**

| Theme | Palette | Primary Use |
|-------|---------|-------------|
| daylight | ![daylight](assets/palettes/daylight.svg) | Bright, airy |
| paper | ![paper](assets/palettes/paper.svg) | Reading-optimized |
| cream | ![cream](assets/palettes/cream.svg) | Warm, vintage |
| snow | ![snow](assets/palettes/snow.svg) | Clean white |
| spring | ![spring](assets/palettes/spring.svg) | Fresh, hopeful |
| solar | ![solar](assets/palettes/solar.svg) | Energy, brightness |

**Specialty**

| Theme | Palette | Primary Use |
|-------|---------|-------------|
| starry-night | ![starry-night](assets/palettes/starry-night.svg) | Artistic, dreamy |

---

## 🔤 Nerd Fonts Collection

39 patched fonts with coding ligatures and thousands of glyphs:

### Top Programming Fonts

| Font | Google Fonts | Install |
|------|--------------|---------|
| **JetBrainsMono Nerd** | ✅ Yes | `brew install font-jetbrains-mono-nerd-font` |
| **FiraCode Nerd** | ✅ Yes | `brew install font-fira-code-nerd-font` |
| **Hack Nerd** | ❌ Download | `brew install font-hack-nerd-font` |
| **CaskaydiaCove** | ❌ Download | `brew install font-caskaydia-cove-nerd-font` |
| **Geist Mono** | ❌ NPM | `npm install geist` |

### Quick Import

```css
/* Google Fonts (recommended for web) */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap');
```

```tsx
// Next.js
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
```

### Categories

- **Programming:** JetBrainsMono, FiraCode, CaskaydiaCove, ZedMono, CommitMono
- **Terminal:** IosevkaTerm, MesloLG, Terminus
- **Dense:** Iosevka (narrow, information-dense)
- **Creative:** VictorMono (cursive italics), FantasqueSansMono (handwritten)
- **Accessible:** Atkinson Hyperlegible, OpenDyslexic
- **Retro:** 3270, BigBlueTerminal

See full catalog: `tokens/typography/nerd-fonts-complete.json`

---

## 📦 Package Structure

```
omnidesign/
├── tokens/
│   ├── primitives/
│   │   ├── colors-extended.json      # 16 color families
│   │   └── ...
│   ├── themes/                       # 25 themes
│   └── typography/
│       └── nerd-fonts-complete.json  # 39 fonts
├── packages/
│   ├── tokens-tailwind/              # Tailwind integration
│   │   ├── dist/
│   │   │   ├── tailwind.config.js    # Ready-to-use config
│   │   │   ├── utility-mapping.json  # Token → class mapping
│   │   │   └── tokens.css            # CSS variables
│   │   └── package.json
│   ├── tokens-css/
│   └── tokens-ts/
├── skills/
│   └── opencode/
│       └── omnidesign-tailwind.md    # AI skill documentation
└── README.md
```

---

## 🛠️ CLI Commands

```bash
# Auto-detect and install
npx omnidesign

# List available IDEs
npx omnidesign list

# Install for specific IDE
npx omnidesign install --ide claude --global

# Uninstall
npx omnidesign uninstall --ide claude --global

# List themes
npm run themes:list

# List fonts
npm run fonts:list

# List colors
npm run colors:list
```

---

## 🔧 Advanced Usage

### Custom Tailwind Config

```javascript
// tailwind.config.js
const omnidesign = require('omnidesign/tailwind');

module.exports = {
  ...omnidesign,
  theme: {
    ...omnidesign.theme,
    extend: {
      ...omnidesign.theme.extend,
      colors: {
        ...omnidesign.theme.extend.colors,
        brand: {
          // Your custom brand colors
          DEFAULT: '#FF6B6B',
          dark: '#EE5A5A',
        }
      }
    }
  }
};
```

### Programmatic Access

```javascript
import colors from 'omnidesign/colors';
import fonts from 'omnidesign/fonts';
import mapping from 'omnidesign/tailwind-mapping';

// Get all blue shades
const blueShades = colors.families.blue.shades;

// Get JetBrainsMono font info
const jetbrains = fonts.fonts['jetbrains-mono-nerd'];

// Get Tailwind class for token
const buttonClass = mapping.colors['interactive-primary'].tailwindUtility;
// → "bg-primary hover:bg-primary-hover..."
```

---

## 🤖 For AI Assistants

### Prompt Examples

**Apply a theme:**
```
"Use the cyberpunk theme for this component"
→ AI applies cyberpunk color tokens
```

**Create components:**
```
"Create a login form with Tailwind"
→ AI uses semantic tokens:
   - bg-surface-raised for card
   - bg-primary for submit button
   - text-text-muted for helper text
```

**Font selection:**
```
"Use JetBrains Mono for code blocks"
→ AI applies font-mono with JetBrains Mono stack
```

### Token Reference

**Colors:**
- Semantic: `text-text`, `bg-surface-raised`, `border-border`
- Primitive: `bg-blue-600`, `text-red-500`, `border-slate-200`

**Spacing:**
- `p-4` (16px), `gap-2` (8px), `m-6` (24px)

**Typography:**
- `font-sans`, `font-mono`, `font-display`

**Shadows:**
- `shadow-md` (card), `shadow-lg` (dropdown), `shadow-xl` (modal)

---

## 📝 Documentation

- [Tailwind Integration Guide](skills/opencode/omnidesign-tailwind.md)
- [Improvement Specification](docs/OMNIDESIGN_IMPROVEMENT_SPEC.md)
- [API Documentation](AGENTS.md)
- [Quick Reference](QUICKREF.md)

---

## 🔗 Supported IDEs

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

## 📄 License

MIT © [codewithkenzo](https://github.com/codewithkenzo)

---

<p align="center">
  <a href="https://x.com/codewithkenzo">X @codewithkenzo</a> •
  <a href="https://discord.gg/omnidesign">Discord</a> •
  <a href="https://omnidesign.dev">Website</a>
</p>

<p align="center">
  <sub>Built with ❤️ for AI assistants everywhere</sub>
</p>
