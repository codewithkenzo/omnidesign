# Getting Started with OmniDesign

Welcome! This guide will help you get up and running with OmniDesign in 5 minutes.

## Installation

```bash
# Clone the repository
git clone https://github.com/codewithkenzo/omnidesign.git
cd omnidesign

# Install dependencies
bun install

# Build tokens
bun run build
```

## Your First Component

### 1. Basic HTML/CSS

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="corporate">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My OmniDesign App</title>
  <link rel="stylesheet" href="packages/tokens-css/dist/tokens.css">
  <style>
    body {
      font-family: var(--font-sans);
      background: var(--color-surface-default);
      color: var(--color-text-default);
      padding: var(--spacing-xl);
    }
    
    .card {
      background: var(--color-surface-raised);
      border-radius: var(--radii-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-card);
      max-width: 400px;
    }
    
    .button {
      background: var(--color-interactive-primary);
      color: var(--color-text-inverted);
      border: none;
      border-radius: var(--radii-md);
      padding: var(--spacing-sm) var(--spacing-md);
      font-family: var(--font-sans);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: all var(--motion-duration-fast);
    }
    
    .button:hover {
      background: var(--color-interactive-primary-hover);
      transform: translateY(-1px);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello OmniDesign!</h1>
    <p>This card uses design tokens.</p>
    <button class="button">Click me</button>
  </div>
</body>
</html>
```

### 2. With React

```tsx
import { ThemeProvider, Card, Button } from '@omnidesign/react';

function App() {
  return (
    <ThemeProvider theme="cyberpunk">
      <Card>
        <h1>Hello OmniDesign!</h1>
        <p>This uses React components.</p>
        <Button variant="primary">Click me</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### 3. Theme Switching

```javascript
// Switch themes dynamically
function switchTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
}

// Try different themes
switchTheme('cyberpunk');  // Neon synthwave
switchTheme('sunset');     // Warm gradients
switchTheme('midnight');   // True dark mode
```

## Next Steps

1. **Explore Themes**
   ```bash
   bun run themes:list
   ```

2. **Check Fonts**
   ```bash
   bun run fonts:list
   ```

3. **Read Component Recipes**
   - See `recipes/components/` for implementation guides
   - Each includes anatomy, states, and accessibility

4. **Try AI Components**
   - `AIChat` for chat interfaces
   - `PromptInput` for AI prompts
   - `AgentCard` for model selection

## Common Patterns

### Layout with Tokens

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-section-y) var(--spacing-inline-xl);
}

.grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Responsive Design

```css
.card {
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .card {
    padding: var(--spacing-lg);
  }
}
```

### Dark Mode (Built-in)

All themes handle dark mode automatically. Just set the theme:

```html
<html data-theme="cyberpunk">
  <!-- Everything adapts automatically -->
</html>
```

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🚀 [Quick Reference](./QUICKREF.md)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)
- 💬 [Discord Community](https://discord.gg/omnidesign)

---

**Happy designing!** 🎨
