# 🎨 OmniDesign

<p align="center">
  <img src="logo.jpg" alt="OmniDesign Logo" width="180">
</p>

<p align="center">
  <strong>Universal Design Skills System for AI Coding Assistants</strong>
</p>

<p align="center">
  <em>One skill package. 10 IDEs. 25 themes. Infinite possibilities.</em>
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

**OmniDesign** is a **universal design skills system** for AI coding assistants. It installs as a skill/plugin across **10+ IDEs**, giving your AI assistant instant access to:

- 🎨 **25 curated themes** with design tokens
- 🤖 **AI industry components** (chat, prompts, agents)
- 🔤 **40+ font families** including Nerd Fonts
- 🎯 **100+ design tokens** (colors, spacing, typography)
- 📚 **Component recipes** for React, Vue, Svelte

**Think of it as a design system that travels with your AI assistant.**

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

## 🎨 25 Curated Themes

Each theme includes **complete design tokens**: colors, shadows, borders, and interactive states.

### 🏢 Professional

| Theme | Description | Primary | Accent |
|:-----:|-------------|:-------:|:------:|
| `corporate` | Enterprise blue | ![](https://via.placeholder.com/24/0052CC/0052CC?text=+) `#0052CC` | ![](https://via.placeholder.com/24/0747A6/0747A6?text=+) `#0747A6` |
| `navy` | Deep navy + gold | ![](https://via.placeholder.com/24/1e3a5f/1e3a5f?text=+) `#1e3a5f` | ![](https://via.placeholder.com/24/c9a227/c9a227?text=+) `#c9a227` |
| `slate` | Modern gray + teal | ![](https://via.placeholder.com/24/475569/475569?text=+) `#475569` | ![](https://via.placeholder.com/24/14b8a6/14b8a6?text=+) `#14b8a6` |
| `forest` | Sustainability green | ![](https://via.placeholder.com/24/166534/166534?text=+) `#166534` | ![](https://via.placeholder.com/24/15803d/15803d?text=+) `#15803d` |
| `ruby` | Luxury burgundy | ![](https://via.placeholder.com/24/9f1239/9f1239?text=+) `#9f1239` | ![](https://via.placeholder.com/24/f43f5e/f43f5e?text=+) `#f43f5e` |
| `graphite` | Minimalist mono | ![](https://via.placeholder.com/24/374151/374151?text=+) `#374151` | ![](https://via.placeholder.com/24/6b7280/6b7280?text=+) `#6b7280` |

### 🎨 Creative

| Theme | Description | Primary | Accent |
|:-----:|-------------|:-------:|:------:|
| `sunset` | Warm gradients | ![](https://via.placeholder.com/24/f97316/f97316?text=+) `#f97316` | ![](https://via.placeholder.com/24/f43f5e/f43f5e?text=+) `#f43f5e` |
| `ocean` | Deep sea blue | ![](https://via.placeholder.com/24/0ea5e9/0ea5e9?text=+) `#0ea5e9` | ![](https://via.placeholder.com/24/06b6d4/06b6d4?text=+) `#06b6d4` |
| `berry` | Raspberry pink | ![](https://via.placeholder.com/24/db2777/db2777?text=+) `#db2777` | ![](https://via.placeholder.com/24/e879f9/e879f9?text=+) `#e879f9` |
| `mint` | Fresh pastel | ![](https://via.placeholder.com/24/22c55e/22c55e?text=+) `#22c55e` | ![](https://via.placeholder.com/24/34d399/34d399?text=+) `#34d399` |
| `coral` | Friendly peach | ![](https://via.placeholder.com/24/fb7185/fb7185?text=+) `#fb7185` | ![](https://via.placeholder.com/24/fca5a5/fca5a5?text=+) `#fca5a5` |
| `lavender` | Soft purple | ![](https://via.placeholder.com/24/a855f7/a855f7?text=+) `#a855f7` | ![](https://via.placeholder.com/24/c084fc/c084fc?text=+) `#c084fc` |

### 🌙 Dark Mode

| Theme | Description | Primary | Accent |
|:-----:|-------------|:-------:|:------:|
| `midnight` | True black | ![](https://via.placeholder.com/24/0f172a/0f172a?text=+) `#0f172a` | ![](https://via.placeholder.com/24/3b82f6/3b82f6?text=+) `#3b82f6` |
| `noir` | High contrast | ![](https://via.placeholder.com/24/000000/000000?text=+) `#000000` | ![](https://via.placeholder.com/24/ffffff/ffffff?text=+) `#ffffff` |
| `cyberpunk` | Neon synthwave | ![](https://via.placeholder.com/24/d946ef/d946ef?text=+) `#d946ef` | ![](https://via.placeholder.com/24/f472b6/f472b6?text=+) `#f472b6` |
| `obsidian` | Dark gray | ![](https://via.placeholder.com/24/1f2937/1f2937?text=+) `#1f2937` | ![](https://via.placeholder.com/24/6366f1/6366f1?text=+) `#6366f1` |
| `deep-space` | Cosmic void | ![](https://via.placeholder.com/24/2e1065/2e1065?text=+) `#2e1065` | ![](https://via.placeholder.com/24/8b5cf6/8b5cf6?text=+) `#8b5cf6` |
| `brutalist` | Stark contrast | ![](https://via.placeholder.com/24/171717/171717?text=+) `#171717` | ![](https://via.placeholder.com/24/ff0000/ff0000?text=+) `#ff0000` |

### ☀️ Light Mode

| Theme | Description | Primary | Accent |
|:-----:|-------------|:-------:|:------:|
| `daylight` | Bright blue | ![](https://via.placeholder.com/24/3b82f6/3b82f6?text=+) `#3b82f6` | ![](https://via.placeholder.com/24/60a5fa/60a5fa?text=+) `#60a5fa` |
| `paper` | Warm off-white | ![](https://via.placeholder.com/24/faf7f5/faf7f5?text=+) `#faf7f5` | ![](https://via.placeholder.com/24/d97706/d97706?text=+) `#d97706` |
| `cream` | Soft cream | ![](https://via.placeholder.com/24/fef3c7/fef3c7?text=+) `#fef3c7` | ![](https://via.placeholder.com/24/f59e0b/f59e0b?text=+) `#f59e0b` |
| `snow` | Pure white | ![](https://via.placeholder.com/24/ffffff/ffffff?text=+) `#ffffff` | ![](https://via.placeholder.com/24/e5e7eb/e5e7eb?text=+) `#e5e7eb` |
| `spring` | Mint + pink | ![](https://via.placeholder.com/24/86efac/86efac?text=+) `#86efac` | ![](https://via.placeholder.com/24/f9a8d4/f9a8d4?text=+) `#f9a8d4` |
| `solar` | Yellow warmth | ![](https://via.placeholder.com/24/facc15/facc15?text=+) `#facc15` | ![](https://via.placeholder.com/24/fde047/fde047?text=+) `#fde047` |

**💡 Usage:** Ask your AI assistant: *"Use the cyberpunk theme"* or *"Apply the ocean theme"*

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

**Source:** [github.com/codewithkenzo/omnidesign](https://github.com/codewithkenzo/omnidesign)

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
│   ├── cli.js                 # Main CLI - installs skills
│   ├── install.js             # Install script
│   └── detect-ide.js          # IDE detection
├── 🎯 skills/                  # ⭐ IDE-SPECIFIC SKILLS
│   ├── claude/omnidesign.md   # Claude Code skill
│   ├── cursor/omnidesign.md   # Cursor skill
│   ├── opencode/omnidesign.md # OpenCode skill
│   ├── vscode/package.json    # VS Code extension
│   ├── aider/omnidesign.md    # Aider conventions
│   ├── continue/omnidesign.yaml # Continue.dev config
│   ├── zed/omnidesign.json    # Zed config
│   ├── amp/SKILL.md           # Amp Code skill
│   ├── kilo/SKILL.md          # Kilo Code skill
│   └── antigravity/SKILL.md   # Antigravity skill
├── 🎨 tokens/                  # Design tokens
│   ├── primitives/            # Base values (colors, spacing)
│   ├── semantic/              # Contextual tokens
│   ├── themes/                # 25 theme files
│   └── typography/            # Font collection
├── 📚 recipes/                 # Implementation guides
│   ├── components/            # AI component patterns
│   └── motion/                # Animation system
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
  <strong>OmniDesign Skills System</strong> — Design tokens that travel with your AI
</p>

<p align="center">
  <a href="https://x.com/codewithkenzo">X @codewithkenzo</a> •
  <a href="https://discord.gg/omnidesign">Discord</a> •
  <a href="https://omnidesign.dev">Website</a>
</p>
