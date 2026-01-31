---
name: omnidesign
description: Universal design system with Tailwind integration - Use when building UI components, choosing themes, selecting fonts, or configuring Tailwind themes with semantic tokens
---

# OmniDesign - Tailwind-First Design System

## Quick Reference for Agents

When user asks for UI work, follow this workflow:
1. **Check the request type** - Component, theme, or font selection
2. **Use semantic tokens** - Reference the token-to-Tailwind mapping below
3. **Apply proper classes** - Use the provided Tailwind utility classes
4. **Consider dark mode** - All examples work in both light and dark modes

## Token to Tailwind Mapping

### Semantic Colors → Tailwind Classes

| Design Token | Tailwind Utility | CSS Variable | Usage |
|--------------|------------------|--------------|-------|
| `color.text-default` | `text-text` | `--color-text-default` | Primary body text |
| `color.text-muted` | `text-text-muted` | `--color-text-muted` | Secondary/helper text |
| `color.text-inverted` | `text-text-inverted` | `--color-text-inverted` | Text on dark/colored backgrounds |
| `color.surface-default` | `bg-surface` | `--color-surface-default` | Page background |
| `color.surface-raised` | `bg-surface-raised` | `--color-surface-raised` | Cards, elevated surfaces |
| `color.surface-sunken` | `bg-surface-sunken` | `--color-surface-sunken` | Inputs, depressed areas |
| `color.border-default` | `border-border` | `--color-border-default` | Default borders |
| `color.border-subtle` | `border-border-subtle` | `--color-border-subtle` | Subtle dividers |
| `color.interactive-primary` | `bg-primary` | `--color-interactive-primary` | Primary buttons, CTAs |
| `color.interactive-primary-hover` | `hover:bg-primary-hover` | `--color-interactive-primary-hover` | Primary hover state |
| `color.interactive-secondary` | `bg-secondary` | `--color-interactive-secondary` | Secondary buttons |
| `color.status-success` | `text-green-600 bg-green-50` | `--color-status-success` | Success states |
| `color.status-warning` | `text-amber-600 bg-amber-50` | `--color-status-warning` | Warning states |
| `color.status-error` | `text-red-600 bg-red-50` | `--color-status-error` | Error states |

### Primitive Colors → Tailwind Classes

Use primitive colors for specific shade needs:

| Color Family | Example Usage | Tailwind Class |
|--------------|---------------|----------------|
| `color.neutral.50` | Lightest background | `bg-neutral-50` |
| `color.neutral.500` | Neutral base | `text-neutral-500` |
| `color.neutral.950` | Darkest text | `text-neutral-950` |
| `color.blue.500` | Brand color | `bg-blue-500` |
| `color.blue.600` | Primary action | `bg-blue-600` |
| `color.slate.900` | Dark text | `text-slate-900` |

### Spacing → Tailwind Classes

| Token | Tailwind | Value | Usage |
|-------|----------|-------|-------|
| `spacing.4` | `p-1 m-1` | 4px | Tight spacing |
| `spacing.8` | `p-2 m-2 gap-2` | 8px | Default spacing |
| `spacing.16` | `p-4 m-4 gap-4` | 16px | Standard spacing |
| `spacing.24` | `p-6 m-6 gap-6` | 24px | Section spacing |
| `spacing.32` | `p-8 m-8 gap-8` | 32px | Large spacing |
| `spacing.48` | `p-12 m-12` | 48px | Extra large |

### Typography → Tailwind Classes

| Token | Tailwind | Font Stack |
|-------|----------|------------|
| `font.sans` | `font-sans` | Geist Sans, system-ui |
| `font.mono` | `font-mono` | JetBrains Mono, monospace |
| `font.display` | `font-display` | Clash Display |
| `font.nerd` | `font-mono` | JetBrainsMono Nerd Font |

### Shadows → Tailwind Classes

| Token | Tailwind | Usage |
|-------|----------|-------|
| `shadow.card` | `shadow-md` | Cards, buttons |
| `shadow.dropdown` | `shadow-lg` | Dropdowns, popovers |
| `shadow.modal` | `shadow-xl` | Modals, dialogs |

## Component Recipes

### Button Component

**Primary Button**
```tsx
<button className="
  bg-primary hover:bg-primary-hover
  text-text-inverted
  px-4 py-2
  rounded-md
  font-medium
  shadow-md
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-primary
">
  Primary Action
</button>
```

**Secondary Button**
```tsx
<button className="
  bg-surface-raised hover:bg-surface
  text-text
  border border-border
  px-4 py-2
  rounded-md
  font-medium
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-border
">
  Cancel
</button>
```

**Destructive Button**
```tsx
<button className="
  bg-red-600 hover:bg-red-700
  text-white
  px-4 py-2
  rounded-md
  font-medium
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-red-500
">
  Delete
</button>
```

### Card Component

```tsx
<div className="
  bg-surface-raised
  rounded-lg
  shadow-md
  p-6
  border border-border-subtle
">
  <h3 className="text-xl font-semibold text-text mb-2">
    Card Title
  </h3>
  <p className="text-text-muted">
    Card content with semantic colors.
  </p>
</div>
```

### Input Component

```tsx
<input
  className="
    bg-surface-sunken
    text-text
    border border-border
    rounded-md
    px-3 py-2
    placeholder:text-text-muted
    focus:outline-none
    focus:ring-2
    focus:ring-primary
    focus:border-transparent
  "
  placeholder="Enter text..."
/>
```

### Alert Component

**Success Alert**
```tsx
<div className="
  bg-green-50
  border border-green-200
  text-green-800
  px-4 py-3
  rounded-md
">
  <p className="font-medium">Success!</p>
  <p className="text-sm">Operation completed.</p>
</div>
```

**Warning Alert**
```tsx
<div className="
  bg-amber-50
  border border-amber-200
  text-amber-800
  px-4 py-3
  rounded-md
">
  <p className="font-medium">Warning!</p>
  <p className="text-sm">Please review your input.</p>
</div>
```

**Error Alert**
```tsx
<div className="
  bg-red-50
  border border-red-200
  text-red-800
  px-4 py-3
  rounded-md
">
  <p className="font-medium">Error!</p>
  <p className="text-sm">Something went wrong.</p>
</div>
```

## Tailwind Configuration

### Setup with OmniDesign Tokens

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic tokens
        text: {
          DEFAULT: '#1F2937',
          muted: '#6B7280',
          inverted: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          raised: '#F9FAFB',
          sunken: '#F3F4F6',
        },
        border: {
          DEFAULT: '#E5E7EB',
          subtle: '#F3F4F6',
        },
        primary: {
          DEFAULT: '#0052CC',
          hover: '#003E8F',
        },
        // Color families
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          // ... all 11 shades
          950: '#0A0A0A',
        },
        blue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          // ... all 11 shades
          950: '#0F172A',
        },
        // ... other color families
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
        display: ['Clash Display', 'sans-serif'],
      },
    },
  },
}
```

### CSS Variables Setup

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap');

:root {
  /* Semantic tokens - Light mode */
  --color-text-default: #1F2937;
  --color-text-muted: #6B7280;
  --color-text-inverted: #FFFFFF;
  --color-surface-default: #FFFFFF;
  --color-surface-raised: #F9FAFB;
  --color-surface-sunken: #F3F4F6;
  --color-border-default: #E5E7EB;
  --color-border-subtle: #F3F4F6;
  --color-interactive-primary: #0052CC;
  --color-interactive-primary-hover: #003E8F;
}

.dark {
  /* Semantic tokens - Dark mode */
  --color-text-default: #F9FAFB;
  --color-text-muted: #9CA3AF;
  --color-text-inverted: #111827;
  --color-surface-default: #0A0A0A;
  --color-surface-raised: #171717;
  --color-surface-sunken: #0A0A0A;
  --color-border-default: #262626;
  --color-border-subtle: #171717;
  --color-interactive-primary: #3B82F6;
  --color-interactive-primary-hover: #60A5FA;
}
```

## Available Themes

Apply themes by setting `data-theme` attribute on the HTML element:

```html
<html data-theme="corporate">
```

### Professional Themes
- `corporate` - Classic blue enterprise theme
- `navy` - Deep professional navy
- `slate` - Cool gray professionalism
- `forest` - Natural, trustworthy green
- `ruby` - Bold, confident red
- `graphite` - Modern minimal gray

### Creative Themes
- `sunset` - Warm orange and amber
- `ocean` - Calm teal and cyan
- `berry` - Playful pink and purple
- `mint` - Fresh green
- `coral` - Friendly warm orange
- `lavender` - Soft purple

### Dark Themes
- `midnight` - Classic dark blue
- `noir` - High contrast black
- `cyberpunk` - Neon accents
- `obsidian` - Deep purple dark
- `deep-space` - Blue-tinted dark
- `brutalist` - Raw, stark

## Font Collections

### Nerd Fonts (Programming with Glyphs)

| Font | Import | Tailwind Config |
|------|--------|-----------------|
| **JetBrainsMono Nerd** | Google Fonts: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap` | `'JetBrains Mono', 'JetBrainsMono Nerd Font', monospace` |
| **FiraCode Nerd** | Google Fonts: `https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap` | `'Fira Code', 'FiraCode Nerd Font', monospace` |
| **Hack Nerd** | Download: `https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/Hack.zip` | `'Hack', 'Hack Nerd Font', monospace` |
| **CaskaydiaCove** | Download: `https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/CascadiaCode.zip` | `'CaskaydiaCove Nerd Font', 'Cascadia Code', monospace` |
| **Iosevka** | Download: `https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/Iosevka.zip` | `'Iosevka', 'Iosevka Nerd Font', monospace` |
| **MesloLG** | Download: `https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/Meslo.zip` | `'MesloLG NF', 'Meslo LGS Nerd Font', monospace` |

### UI Fonts

| Font | Import | Usage |
|------|--------|-------|
| **Geist Sans** | NPM: `geist` package | Modern Vercel font |
| **Inter** | Google Fonts | Highly readable UI |
| **Space Grotesk** | Google Fonts | Quirky headlines |

### Font Pairings

**Modern Dev Stack**
```css
font-sans: 'Geist Sans', system-ui;
font-mono: 'JetBrains Mono', monospace;
```

**Professional Terminal**
```css
font-sans: 'Inter', system-ui;
font-mono: 'JetBrains Mono', monospace;
```

**Hacker Aesthetic**
```css
font-sans: 'Space Grotesk', sans-serif;
font-mono: 'Hack Nerd Font', monospace;
```

## Color Palette Reference

### Extended Color Families (All with 11 shades: 50-950)

| Color | Vibe | Best For |
|-------|------|----------|
| Neutral | Pure grayscale | UI structure, backgrounds |
| Slate | Cool gray | Modern tech, professional |
| Zinc | True neutral | Minimal, Swiss design |
| Stone | Warm gray | Editorial, organic |
| Red | Error, danger | Destructive actions |
| Orange | Energy | CTAs, highlights |
| Amber | Caution, gold | Warnings, ratings |
| Yellow | Brightness | Attention, notifications |
| Lime | Fresh | Eco, spring themes |
| Green | Success | Confirmations, growth |
| Emerald | Natural | Premium organic |
| Teal | Calm, trust | Medical, finance |
| Cyan | Fresh, modern | Tech startups |
| Sky | Light, open | Weather, air |
| Blue | Primary | Corporate brand color |
| Indigo | Rich, deep | Premium luxury |
| Violet | Creative | Imagination, art |
| Purple | Royal | Luxury, mystery |
| Fuchsia | Bold, playful | Fun, youth |
| Pink | Warm, friendly | Healthcare, care |
| Rose | Soft, elegant | Romance, beauty |

## Best Practices

1. **Always use semantic tokens** - Never hardcode colors directly
2. **Test both themes** - Components should work in light and dark modes
3. **Follow accessibility** - WCAG 2.1 AA minimum (4.5:1 contrast for text)
4. **Use Nerd Fonts for code** - Better developer experience with icons
5. **Match tokens to context** - Use `text-muted` for secondary text, not a specific gray

## Quick Decision Tree

**What color should I use for...?**

- Primary button? → `bg-primary` (semantic)
- Card background? → `bg-surface-raised`
- Error message? → `text-red-600` + `bg-red-50`
- Secondary text? → `text-text-muted`
- Border? → `border-border` or `border-border-subtle`
- Hover state? → `hover:bg-primary-hover`

**What font should I use for...?**

- Body text? → `font-sans` (Geist or Inter)
- Code blocks? → `font-mono` (JetBrains Mono Nerd)
- Headlines? → `font-display` (Clash Display) or `font-sans`
- Terminal UI? → `font-mono` with Nerd Font

## Resources

- Full token docs: `packages/tokens-tailwind/dist/utility-mapping.json`
- Tailwind config: `packages/tokens-tailwind/dist/tailwind.config.js`
- Color palettes: `tokens/primitives/colors-extended.json`
- Nerd Fonts catalog: `tokens/typography/nerd-fonts-complete.json`
- Component recipes: See examples above

## Installation

```bash
# Install tokens package
npm install @omnidesign/tokens-tailwind

# Or use the full design system
npm install omnidesign
```

```javascript
// Import in your project
import { tailwindConfig } from '@omnidesign/tokens-tailwind';
import utilityMapping from '@omnidesign/tokens-tailwind/mapping';
```
