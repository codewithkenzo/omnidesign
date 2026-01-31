# OmniDesign Conventions

Design system guidelines for AI-assisted development.

## Token-First Development

Always use design tokens instead of hardcoded values:

✅ **DO:**
```css
.button {
  background: var(--color-interactive-primary);
  padding: var(--spacing-md);
}
```

❌ **DON'T:**
```css
.button {
  background: #2563EB;
  padding: 16px;
}
```

## 25 Themes Available

Professional: corporate, navy, slate, forest, ruby, graphite
Creative: sunset, ocean, berry, mint, coral, lavender
Dark: midnight, noir, cyberpunk, obsidian, deep-space, brutalist
Light: daylight, paper, cream, snow, spring, solar
Specialty: starry-night

## Component Patterns

### Chat Interface
- Use semantic tokens for message bubbles
- Support streaming states with thinking indicators
- Include copy/regenerate actions

### Forms
- Use `color-surface-sunken` for inputs
- Use `color-border-default` for borders
- Show validation with `color-status-error`

### Cards
- Use `color-surface-raised` for background
- Use `shadow-card` for elevation
- Use `radii-lg` for border radius

## Accessibility Requirements

- Minimum 4.5:1 contrast ratio for text
- Focus rings with `shadow-focus`
- Keyboard navigation support
- Screen reader labels

## Font Usage

- UI: Geist Sans or Inter
- Code: JetBrains Mono or Fira Code
- Display: Space Grotesk or Clash Display
- Dev Tools: JetBrainsMono Nerd Font

## Resources

- Docs: https://omnidesign.dev
- Quick Ref: See QUICKREF.md
