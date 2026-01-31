# Quick Reference Guide

## 🎯 One-Liners

```bash
# Apply a theme
document.documentElement.setAttribute('data-theme', 'cyberpunk');

# Use a token in CSS
.my-class { color: var(--color-text-default); }

# Use a token in JS
import { tokens } from '@omnidesign/tokens-ts';
const color = tokens.color.interactive.primary;
```

## 🎨 Theme Quick Picks

| Vibe | Theme |
|------|-------|
| Enterprise | `corporate`, `slate` |
| Creative | `sunset`, `berry`, `lavender` |
| Dark Mode | `midnight`, `cyberpunk`, `obsidian` |
| Clean | `snow`, `daylight`, `paper` |

## 🔤 Font Quick Picks

| Use Case | Font |
|----------|------|
| UI Text | `Inter`, `Geist Sans` |
| Headlines | `Space Grotesk`, `Clash Display` |
| Code | `JetBrains Mono`, `Fira Code` |
| Dev Tools | `JetBrainsMono Nerd Font` |
| Reading | `Merriweather`, `Source Serif 4` |

## 🧩 Component Quick Picks

| Need | Component |
|------|-----------|
| Chat UI | `AIChat`, `ChatMessage`, `ChatInput` |
| AI Prompt | `PromptInput`, `SuggestedPrompts` |
| Model Selector | `AgentCard`, `ModelGrid` |
| Loading State | `ThinkingIndicator` |
| Code Display | `CodeBlock`, `TerminalBlock` |
| File Upload | `FileUpload`, `FileAttachments` |

## 🎨 Color Tokens

```css
/* Text */
var(--color-text-default)      /* Primary text */
var(--color-text-muted)        /* Secondary text */
var(--color-text-inverted)     /* Text on dark */

/* Surfaces */
var(--color-surface-default)   /* Default background */
var(--color-surface-raised)    /* Cards, elevated */
var(--color-surface-sunken)    /* Inputs, depressed */

/* Interactive */
var(--color-interactive-primary)      /* Buttons, links */
var(--color-interactive-primary-hover)/* Hover state */

/* Status */
var(--color-status-success)    /* Success states */
var(--color-status-warning)    /* Warning states */
var(--color-status-error)      /* Error states */
```

## 📐 Spacing Tokens

```css
var(--spacing-4)    /* 4px - xs */
var(--spacing-8)    /* 8px - sm */
var(--spacing-16)   /* 16px - md */
var(--spacing-24)   /* 24px - lg */
var(--spacing-32)   /* 32px - xl */
var(--spacing-48)   /* 48px - 2xl */
var(--spacing-64)   /* 64px - 3xl */
```

## 🔠 Typography Sizes

```css
var(--font-size-2xs)   /* 10px */
var(--font-size-xs)    /* 12px */
var(--font-size-sm)    /* 14px */
var(--font-size-base)  /* 16px */
var(--font-size-lg)    /* 18px */
var(--font-size-xl)    /* 20px */
var(--font-size-2xl)   /* 24px */
var(--font-size-3xl)   /* 30px */
var(--font-size-4xl)   /* 36px */
var(--font-size-5xl)   /* 48px */
```

## ⏱️ Motion

```css
/* Durations */
var(--motion-duration-fast)     /* 150ms */
var(--motion-duration-normal)   /* 250ms */
var(--motion-duration-slow)     /* 350ms */

/* Easings */
var(--motion-ease-out)          /* ease-out */
var(--motion-ease-in-out)       /* ease-in-out */
var(--motion-ease-spring)       /* cubic-bezier(0.175, 0.885, 0.32, 1.275) */
```

## 🎨 Shadow Tokens

```css
var(--shadow-card)      /* Cards, buttons */
var(--shadow-dropdown)  /* Dropdowns, popovers */
var(--shadow-modal)     /* Modals, dialogs */
var(--shadow-focus)     /* Focus rings */
```

## 🎯 Border Radius

```css
var(--radii-sm)     /* 4px */
var(--radii-md)     /* 8px */
var(--radii-lg)     /* 12px */
var(--radii-xl)     /* 16px */
var(--radii-full)   /* 9999px (pills) */
```

## 💡 Pro Tips

1. **Always use tokens** — Never hardcode colors or spacing
2. **Test in multiple themes** — Components should work everywhere
3. **Use semantic tokens** — `text-default` not `neutral-900`
4. **Respect motion prefs** — `prefers-reduced-motion` support
5. **Nerd Fonts for dev** — One font for code + icons

## 📚 Resources

- [Full Documentation](./README.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
- [Theme Gallery](./docs/THEMES.md) (coming soon)
- [Component Library](./docs/COMPONENTS.md) (coming soon)

---

<p align="center">
  <strong>Need help?</strong> Open an issue or join our Discord!
</p>
