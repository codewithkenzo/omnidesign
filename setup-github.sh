#!/bin/bash
echo "🎨 Setting up OmniDesign GitHub Repository..."
echo ""

echo "Creating private repository..."
gh repo create codewithkenzo/omnidesign \
  --private \
  --description "Universal design system for AI coding assistants - 25 themes, 40+ fonts, AI components" \
  --source=. \
  --remote=origin \
  --push

echo ""
echo "✅ Repository created successfully!"
echo ""
echo "📦 Next steps:"
echo "  1. Enable the repository on GitHub"
echo "  2. Add topics: design-system, design-tokens, ai-components, themes"
echo "  3. Enable GitHub Discussions"
echo "  4. Set up branch protection rules"
echo "  5. Publish to npm: npm publish"
echo ""
echo "🔗 Repository URL: https://github.com/codewithkenzo/omnidesign"
