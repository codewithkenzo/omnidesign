# Contributing to OmniDesign

Thank you for your interest in contributing to OmniDesign! This document provides guidelines and best practices for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/codewithkenzo/omnidesign.git`
3. Install dependencies: `bun install`
4. Create a branch: `git checkout -b feature/my-feature`

## Development Workflow

### Building Tokens

```bash
bun run build
```

### Running Checks

```bash
bun run check
```

This runs:
- Format checking (Biome)
- Linting (Biome)
- Token validation (custom scripts)

## Adding Themes

1. Create a new JSON file in `tokens/themes/my-theme.json`
2. Follow the DTCG format:

```json
{
  "theme": {
    "$type": "theme",
    "$value": "my-theme",
    "$description": "Description of your theme"
  },
  "color": {
    "text": { "default": { "$type": "color", "$value": "#1A1A1A" } },
    "surface": { "default": { "$type": "color", "$value": "#FFFFFF" } }
  }
}
```

3. Test with `bun run themes:list`
4. Run `bun run build` to generate outputs
5. Submit a PR with screenshots

## Adding Components

### Recipe Structure

Create `recipes/components/my-component.md`:

```markdown
# My Component

## When to Use
Description of when to use this component.

## Anatomy
ASCII diagram showing structure.

## Token Usage
CSS examples using design tokens.

## State Matrix
| State | Visual |
|-------|--------|
| Default | ... |
| Hover | ... |

## Accessibility
ARIA attributes and keyboard navigation.

## Code Example
\`\`\`tsx
// React implementation
\`\`\`
```

### Component Requirements

- Must use design tokens (no hardcoded values)
- Must include all interactive states
- Must be accessible (WCAG 2.1 AA)
- Must work across all 25 themes
- Must include TypeScript types

## Code Style

We use **Biome** for formatting and linting.

- **Indentation:** 2 spaces
- **Line width:** 80 characters
- **Quotes:** Double
- **Semicolons:** Required

## Commit Messages

Follow conventional commits:

```
feat: add cyberpunk theme
fix: correct token reference in button
docs: update README with new examples
refactor: simplify theme build process
```

## Pull Request Process

1. Update documentation for any changed functionality
2. Ensure all checks pass (`bun run check`)
3. Update the CHANGELOG.md
4. Request review from maintainers
5. Address feedback promptly

## Questions?

- Open an issue for bugs
- Start a discussion for features
- Join our Discord for real-time chat

Thank you for contributing! 🎉
