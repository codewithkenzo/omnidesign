# 🎨 OmniDesign

<p align="center">
  <img src="logo.jpg" alt="OmniDesign Logo" width="180">
</p>

<p align="center">
  <strong>The Universal Design System for AI Coding Assistants</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/omnidesign"><img src="https://img.shields.io/npm/v/omnidesign?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/omnidesign"><img src="https://img.shields.io/npm/dm/omnidesign?style=flat-square&color=green" alt="npm downloads"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/omnidesign?style=flat-square" alt="License"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript" alt="TypeScript"></a>
  <a href="https://bun.sh/"><img src="https://img.shields.io/badge/Bun-1.0+-fbbf24?style=flat-square&logo=bun&logoColor=black" alt="Bun"></a>
</p>

<p align="center">
  <a href="#quick-start"><strong>Quick Start</strong></a> •
  <a href="#supported-ides"><strong>Supported IDEs</strong></a> •
  <a href="#themes"><strong>25 Themes</strong></a> •
  <a href="#components"><strong>AI Components</strong></a>
</p>

---

## ✨ What is OmniDesign?

**OmniDesign** is a comprehensive design system that works across **all major AI coding assistants**. One package, universal compatibility.

### 🎯 One Command Install

```bash
npx omnidesign
```

That's it! OmniDesign auto-detects your IDE and installs the appropriate skill.

---

## 🚀 Quick Start

### Option 1: Auto-Install (Recommended)

```bash
# In your project directory
npx omnidesign

# Or install globally
npx omnidesign --global
```

### Option 2: Manual Install

```bash
# Install for specific IDE
npx omnidesign install --ide claude
npx omnidesign install --ide cursor
npx omnidesign install --ide opencode
npx omnidesign install --ide vscode
npx omnidesign install --ide aider
npx omnidesign install --ide continue
npx omnidesign install --ide zed
npx omnidesign install --ide amp
npx omnidesign install --ide kilo
npx omnidesign install --ide antigravity
```

### Option 3: NPM Install

```bash
# Install as dependency
npm install omnidesign

# Or use without installing
npx omnidesign@latest
```

---

## 💻 Supported IDEs

| IDE | Status | Install Command |
|-----|--------|-----------------|
| **Claude Code** | ✅ Full Support | `npx omnidesign` |
| **Cursor** | ✅ Full Support | `npx omnidesign` |
| **OpenCode** | ✅ Full Support | `npx omnidesign` |
| **VS Code** | ✅ Full Support | `npx omnidesign` |
| **Aider** | ✅ Full Support | `npx omnidesign` |
| **Continue.dev** | ✅ Full Support | `npx omnidesign` |
| **Zed** | ✅ Full Support | `npx omnidesign` |
| **Amp Code** | ✅ Full Support | `npx omnidesign` |
| **Kilo Code** | ✅ Full Support | `npx omnidesign` |
| **Antigravity** | ✅ Full Support | `npx omnidesign` |
| **Claude Desktop** | ✅ Via MCP | Manual config |
| **GitHub Copilot** | ⚠️ Partial | VS Code extension |
| **JetBrains** | ⚠️ Partial | Plugin available |

### How It Works

OmniDesign detects your IDE by looking for:
- `.claude/` directory → **Claude Code**
- `.cursor/` directory → **Cursor**
- `.opencode/` directory → **OpenCode**
- `.vscode/` directory → **VS Code**
- `.zed/` directory → **Zed**
- `.amp/` directory → **Amp Code**
- `.kilo/` directory → **Kilo Code**
- `.antigravity/` directory → **Antigravity**
- `.aider.conf.yml` → **Aider**
- `.continue/` directory → **Continue.dev**

---

## 🎨 25 Beautiful Themes

### Professional
<div align="center">

| Theme | Vibe | Preview |
|-------|------|---------|
| `corporate` | Enterprise blue | <span style="color:#0052CC">●</span> |
| `navy` | Deep navy + gold | <span style="color:#1e3a5f">●</span> |
| `slate` | Modern gray + teal | <span style="color:#475569">●</span> |
| `forest` | Sustainability green | <span style="color:#166534">●</span> |
| `ruby` | Luxury burgundy | <span style="color:#9f1239">●</span> |
| `graphite` | Minimalist mono | <span style="color:#374151">●</span> |

</div>

### Creative
<div align="center">

| Theme | Vibe | Preview |
|-------|------|---------|
| `sunset` | Warm gradients | <span style="color:#f97316">●</span> |
| `ocean` | Deep sea blue | <span style="color:#0ea5e9">●</span> |
| `berry` | Raspberry pink | <span style="color:#db2777">●</span> |
| `mint` | Fresh pastel | <span style="color:#22c55e">●</span> |
| `coral` | Friendly peach | <span style="color:#fb7185">●</span> |
| `lavender` | Soft purple | <span style="color:#a855f7">●</span> |

</div>

### Dark Mode
<div align="center">

| Theme | Vibe | Preview |
|-------|------|---------|
| `midnight` | True black | <span style="color:#0f172a">●</span> |
| `noir` | High contrast | <span style="color:#000000">●</span> |
| `cyberpunk` | Neon synthwave | <span style="color:#d946ef">●</span> |
| `obsidian` | Dark gray | <span style="color:#1f2937">●</span> |
| `deep-space` | Cosmic void | <span style="color:#2e1065">●</span> |
| `brutalist` | Stark contrast | <span style="color:#171717">●</span> |

</div>

### Light Mode
<div align="center">

| Theme | Vibe | Preview |
|-------|------|---------|
| `daylight` | Bright blue | <span style="color:#3b82f6">●</span> |
| `paper` | Warm off-white | <span style="color:#faf7f5">●</span> |
| `cream` | Soft cream | <span style="color:#fef3c7">●</span> |
| `snow` | Pure white | <span style="color:#ffffff">●</span> |
| `spring` | Mint + pink | <span style="color:#86efac">●</span> |
| `solar` | Yellow warmth | <span style="color:#facc15">●</span> |

</div>

### Using Themes

```css
/* Apply theme */
[data-theme="cyberpunk"] {
  /* All tokens update automatically */
}
```

```typescript
// Switch themes dynamically
document.documentElement.setAttribute('data-theme', 'sunset');
```

---

## 🤖 AI Industry Components

### 1. Chat Interface
Full ChatGPT/Claude-style chat UI:
- Message bubbles with markdown
- Code syntax highlighting
- Streaming indicators
- Copy/regenerate actions

### 2. Prompt Input
Smart prompt component:
- Autocomplete suggestions
- Token counter
- Modifier chips (--ar, --v, --style)

### 3. Agent Cards
AI model/agent displays:
- Status indicators
- Capability tags
- One-click selection

### 4. Thinking Indicators
5 animation styles:
- Bouncing dots
- Wave bars
- Pulse rings
- Shimmer skeletons
- Progress steps

### 5. Code Blocks
Syntax-highlighted code:
- Copy to clipboard
- Download file
- Diff view
- Terminal styling

### 6. File Upload
Drag-and-drop upload:
- Image previews
- Progress bars
- AI context preview

---

## 🎯 Design Tokens

### 100+ Tokens Available

**Colors:**
```css
var(--color-text-default)      /* Primary text */
var(--color-text-muted)        /* Secondary text */
var(--color-surface-raised)    /* Cards */
var(--color-interactive-primary) /* Buttons */
var(--color-status-success)    /* Success states */
```

**Spacing:**
```css
var(--spacing-4)   /* 4px */
var(--spacing-8)   /* 8px */
var(--spacing-16)  /* 16px */
var(--spacing-32)  /* 32px */
```

**Typography:**
```css
var(--font-sans)     /* Geist Sans, Inter */
var(--font-mono)     /* JetBrains Mono */
var(--font-display)  /* Space Grotesk */
```

---

## 🔤 40+ Font Families

### Sans-Serif
- Geist Sans (Vercel's modern geometric)
- Inter (Highly legible)
- Poppins, Plus Jakarta Sans, Satoshi, Manrope, Outfit

### Serif
- Merriweather, DM Serif Display, Lora, Source Serif 4, Literata

### Monospace
- Geist Mono, JetBrains Mono, Fira Code, Cascadia Code, SF Mono, IBM Plex Mono

### Nerd Fonts (Code + Icons)
- JetBrainsMono Nerd Font
- FiraCode Nerd Font
- Hack Nerd Font
- CaskaydiaCove Nerd Font

### Display
- Space Grotesk, Clash Display, Syne, Bungee, Archivo Black

---

## 📦 Installation Methods

### Method 1: npx (Recommended)

```bash
# Auto-detect and install
npx omnidesign

# Install for specific IDE
npx omnidesign install --ide cursor

# Install globally
npx omnidesign install --global
```

### Method 2: npm

```bash
# Install as dev dependency
npm install --save-dev omnidesign

# Or install globally
npm install -g omnidesign

# Then run
omnidesign install
```

### Method 3: bun

```bash
bunx omnidesign
```

---

## 🛠️ CLI Commands

```bash
# Install skill for detected IDE
npx omnidesign install

# Install for specific IDE
npx omnidesign install --ide <ide>

# List supported IDEs and status
npx omnidesign list

# Uninstall skill
npx omnidesign uninstall --ide <ide>

# Show help
npx omnidesign --help
```

---

## 📁 Project Structure

```
omnidesign/
├── 🎨 logo.jpg                 # Brand identity
├── 📖 README.md                # This file
├── 📦 package.json             # NPM manifest
├── 🔧 bin/                     # CLI tools
│   ├── cli.js                 # Main CLI
│   ├── install.js             # Install script
│   └── detect-ide.js          # IDE detection
├── 🎨 tokens/                  # Design tokens
│   ├── primitives/            # Base values
│   ├── semantic/              # Contextual tokens
│   ├── themes/                # 25 theme files
│   └── typography/            # Font collection
├── 🧩 components/              # React/Vue components
│   ├── core/                  # Button, Card, Input
│   ├── ai/                    # Chat, Prompt, AgentCard
│   └── layout/                # Grid, Stack
├── 📚 recipes/                 # Implementation guides
│   └── components/            # Component patterns
├── 🎯 skills/                  # IDE-specific skills
│   ├── claude/                # Claude Code skill
│   ├── cursor/                # Cursor skill
│   ├── opencode/              # OpenCode skill
│   ├── vscode/                # VS Code extension
│   ├── aider/                 # Aider conventions
│   ├── continue/              # Continue.dev config
│   ├── zed/                   # Zed config
│   ├── amp/                   # Amp Code skill
│   ├── kilo/                  # Kilo Code skill
│   └── antigravity/           # Antigravity skill
└── 📦 packages/                # Built outputs
    ├── tokens-css/
    ├── tokens-ts/
    └── react/
```

---

## 🔗 IDE-Specific Instructions

### Claude Code

```bash
npx omnidesign
```

Creates:
- `.claude/skills/omnidesign.md`
- `.claude/marketplace.json`

Use: Type `/omnidesign` or ask "Use OmniDesign theme cyberpunk"

### Cursor

```bash
npx omnidesign
```

Creates:
- `.cursor/skills/omnidesign.md`

Use: OmniDesign prompts appear in AI chat

### OpenCode

```bash
npx omnidesign
```

Creates:
- `.opencode/skills/omnidesign.md`
- Updates `.opencode/config.json`

Use: Skill loads automatically

### VS Code

```bash
npx omnidesign
```

Creates:
- `.vscode/settings.json` with OmniDesign config

Or install from VS Code Marketplace: **"OmniDesign"**

### Zed

```bash
npx omnidesign
```

Creates:
- `.zed/omnidesign.json`

Add to Zed settings to enable the assistant.

### Amp Code

```bash
npx omnidesign
```

Creates:
- `.amp/omnidesign.md`

Amp Code will load the skill automatically.

### Kilo Code

```bash
npx omnidesign
```

Creates:
- `.kilo/omnidesign.md`

Kilo Code will use the skill for design guidance.

### Antigravity

```bash
npx omnidesign
```

Creates:
- `.antigravity/skills/omnidesign.md`

Antigravity will apply the design system conventions.

### Aider

```bash
npx omnidesign
```

Creates:
- `CONVENTIONS.md` with design guidelines

Use: Aider reads conventions automatically

### Continue.dev

```bash
npx omnidesign
```

Creates:
- `.continue/omnidesign.yaml`

Add to `.continue/config.yaml`:
```yaml
context:
  - provider: file
    params:
      file: .continue/omnidesign.yaml
```

---

## 🎓 Usage Examples

### Apply a Theme

```
User: "Use the cyberpunk theme"
AI: [Applies cyberpunk color tokens automatically]
```

### Create a Component

```
User: "Create a button component"
AI: [Generates button using --color-interactive-primary, --spacing-md, etc.]
```

### Build AI Chat UI

```
User: "Build a chat interface"
AI: [Uses AI Chat component patterns with streaming indicators]
```

---

## 📚 Documentation

- **Full Docs**: https://omnidesign.dev
- **Quick Reference**: [QUICKREF.md](./QUICKREF.md)
- **Getting Started**: [GETTING_STARTED.md](./GETTING_STARTED.md)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Adding new themes
- Creating component recipes
- IDE integrations
- Documentation improvements

---

## 📄 License

MIT License - see [LICENSE](./LICENSE)

---

## 🙏 Acknowledgments

- Design tokens following [DTCG specification](https://design-tokens.github.io/)
- Font collection from Google Fonts and Nerd Fonts
- AI components inspired by ChatGPT, Claude, and Midjourney
- Universal skill pattern inspired by Vercel Skills

---

<p align="center">
  <strong>Built with 💙 for the AI coding community</strong>
</p>

<p align="center">
  <a href="https://twitter.com/omnidesign">Twitter</a> •
  <a href="https://discord.gg/omnidesign">Discord</a> •
  <a href="https://omnidesign.dev">Website</a>
</p>
