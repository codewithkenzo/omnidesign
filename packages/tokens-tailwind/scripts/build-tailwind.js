import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../..');
const outputDir = path.join(__dirname, '../dist');

const colorFamilies = [
  'neutral', 'slate', 'zinc', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
];

const semanticMapping = {
  light: {
    'text-default': 'slate.900',
    'text-muted': 'slate.500',
    'text-inverted': 'white',
    'surface-default': 'white',
    'surface-raised': 'slate.50',
    'surface-sunken': 'slate.100',
    'border-default': 'slate.200',
    'border-subtle': 'slate.100',
    'interactive-primary': 'blue.600',
    'interactive-primary-hover': 'blue.700',
    'interactive-secondary': 'slate.600',
    'status-success': 'green.600',
    'status-warning': 'amber.500',
    'status-error': 'red.600',
    'status-info': 'blue.500'
  },
  dark: {
    'text-default': 'slate.50',
    'text-muted': 'slate.400',
    'text-inverted': 'slate.950',
    'surface-default': 'slate.950',
    'surface-raised': 'slate.900',
    'surface-sunken': 'slate.950',
    'border-default': 'slate.800',
    'border-subtle': 'slate.900',
    'interactive-primary': 'blue.500',
    'interactive-primary-hover': 'blue.400',
    'interactive-secondary': 'slate.500',
    'status-success': 'green.500',
    'status-warning': 'amber.400',
    'status-error': 'red.500',
    'status-info': 'blue.400'
  }
};

function generateTailwindConfig() {
  const config = {
    theme: {
      extend: {
        colors: {},
        fontFamily: {},
        spacing: {},
        borderRadius: {},
        boxShadow: {}
      }
    }
  };

  colorFamilies.forEach(family => {
    config.theme.extend.colors[family] = {};
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    shades.forEach(shade => {
      config.theme.extend.colors[family][shade] = `var(--color-${family}-${shade})`;
    });
  });

  config.theme.extend.colors.semantic = {};
  Object.entries(semanticMapping.light).forEach(([key, value]) => {
    const [family, shade] = value.split('.');
    config.theme.extend.colors.semantic[key] = `var(--color-${family}-${shade})`;
  });

  config.theme.extend.fontFamily = {
    sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'monospace'],
    display: ['var(--font-clash-display)', 'sans-serif']
  };

  const spacingScale = {
    '0.5': '0.125rem',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem'
  };
  config.theme.extend.spacing = spacingScale;

  config.theme.extend.borderRadius = {
    'none': '0',
    'sm': '0.125rem',
    'DEFAULT': '0.25rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    'full': '9999px'
  };

  return config;
}

function generateCSSVariables() {
  const lines = [
    '/* OmniDesign CSS Variables - Tailwind Compatible */',
    '/* Auto-generated - Do not edit manually */',
    '',
    ':root {'
  ];

  colorFamilies.forEach(family => {
    lines.push(`  /* ${family.charAt(0).toUpperCase() + family.slice(1)} */`);
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    shades.forEach(shade => {
      lines.push(`  --color-${family}-${shade}: var(--color-${family}-${shade}, inherit);`);
    });
    lines.push('');
  });

  lines.push('  /* Semantic Tokens - Light Mode */');
  Object.entries(semanticMapping.light).forEach(([key, value]) => {
    const [family, shade] = value.split('.');
    lines.push(`  --color-${key}: var(--color-${family}-${shade});`);
  });

  lines.push('}');
  lines.push('');

  lines.push('.dark {');
  lines.push('  /* Semantic Tokens - Dark Mode */');
  Object.entries(semanticMapping.dark).forEach(([key, value]) => {
    const [family, shade] = value.split('.');
    lines.push(`  --color-${key}: var(--color-${family}-${shade});`);
  });
  lines.push('}');

  return lines.join('\n');
}

function generateUtilityMapping() {
  const mapping = {
    _meta: {
      version: '1.0.0',
      description: 'Token to Tailwind utility class mapping',
      generated: new Date().toISOString()
    },
    colors: {},
    spacing: {},
    typography: {},
    examples: {}
  };

  Object.entries(semanticMapping.light).forEach(([token, value]) => {
    const [family, shade] = value.split('.');
    const tailwindClass = token.replace(/-/g, '-');
    mapping.colors[token] = {
      token: `color.${token}`,
      tailwindUtility: `bg-${tailwindClass} text-${tailwindClass} border-${tailwindClass}`,
      cssVariable: `var(--color-${token})`,
      hexReference: `{${value}}`,
      usage: getColorUsage(token),
      example: getColorExample(token, tailwindClass)
    };
  });

  mapping.examples = {
    button: {
      primary: `<button class="bg-interactive-primary hover:bg-interactive-primary-hover text-text-inverted px-4 py-2 rounded-md font-medium shadow-card transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring">Primary</button>`,
      secondary: `<button class="bg-surface-raised hover:bg-surface text-text border border-border px-4 py-2 rounded-md font-medium transition-colors">Secondary</button>`,
      destructive: `<button class="bg-status-error hover:bg-red-700 text-text-inverted px-4 py-2 rounded-md font-medium transition-colors">Delete</button>`
    },
    card: `<div class="bg-surface-raised rounded-lg shadow-card p-6 border border-border-subtle"><h3 class="text-xl font-semibold text-text mb-2">Card Title</h3><p class="text-text-muted">Card content with semantic colors.</p></div>`,
    input: `<input class="bg-surface-sunken text-text border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:border-transparent placeholder-text-muted" placeholder="Enter text..." />`,
    alert: {
      success: `<div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md"><p class="font-medium">Success!</p><p class="text-sm">Operation completed successfully.</p></div>`,
      warning: `<div class="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md"><p class="font-medium">Warning!</p><p class="text-sm">Please review your input.</p></div>`,
      error: `<div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md"><p class="font-medium">Error!</p><p class="text-sm">Something went wrong.</p></div>`
    }
  };

  return mapping;
}

function getColorUsage(token) {
  const usages = {
    'text-default': 'Primary body text on light surfaces',
    'text-muted': 'Secondary text, captions, helper text',
    'text-inverted': 'Text on dark or colored backgrounds',
    'surface-default': 'Default page/app background',
    'surface-raised': 'Cards, elevated surfaces, modals',
    'surface-sunken': 'Input fields, depressed areas, wells',
    'border-default': 'Default border color for inputs and dividers',
    'border-subtle': 'Very light borders for subtle separation',
    'interactive-primary': 'Primary buttons, links, CTAs',
    'interactive-primary-hover': 'Hover state for primary interactive elements',
    'interactive-secondary': 'Secondary buttons, less prominent actions',
    'status-success': 'Success messages, confirmations, positive indicators',
    'status-warning': 'Warning messages, caution indicators',
    'status-error': 'Error messages, destructive actions, validation errors',
    'status-info': 'Informational messages, tips, neutral alerts'
  };
  return usages[token] || 'General usage';
}

function getColorExample(token, tailwindClass) {
  const examples = {
    'text-default': `<p class="text-text">Primary text content</p>`,
    'text-muted': `<p class="text-text-muted">Secondary helper text</p>`,
    'text-inverted': `<div class="bg-blue-600 text-text-inverted p-4">Text on dark background</div>`,
    'surface-default': `<div class="bg-surface-default min-h-screen">Page content</div>`,
    'surface-raised': `<div class="bg-surface-raised rounded-lg shadow p-6">Card content</div>`,
    'surface-sunken': `<div class="bg-surface-sunken p-4 rounded-md">Input container</div>`,
    'border-default': `<div class="border border-border rounded-md">Bordered element</div>`,
    'border-subtle': `<hr class="border-border-subtle" />`,
    'interactive-primary': `<button class="bg-interactive-primary text-text-inverted px-4 py-2 rounded">Click me</button>`,
    'interactive-primary-hover': `<button class="bg-interactive-primary hover:bg-interactive-primary-hover transition-colors">Hover me</button>`,
    'interactive-secondary': `<button class="bg-interactive-secondary text-text-inverted px-4 py-2 rounded">Secondary</button>`,
    'status-success': `<span class="text-status-success font-medium">✓ Success</span>`,
    'status-warning': `<span class="text-status-warning font-medium">⚠ Warning</span>`,
    'status-error': `<span class="text-status-error font-medium">✕ Error</span>`,
    'status-info': `<span class="text-status-info font-medium">ℹ Info</span>`
  };
  return examples[token] || `<div class="${tailwindClass}">Example</div>`;
}

function build() {
  console.log('Building Tailwind integration...\n');

  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Generating tailwind.config.js...');
  const tailwindConfig = generateTailwindConfig();
  fs.writeFileSync(
    path.join(outputDir, 'tailwind.config.json'),
    JSON.stringify(tailwindConfig, null, 2)
  );

  const configJs = `module.exports = ${JSON.stringify(tailwindConfig, null, 2)};`;
  fs.writeFileSync(path.join(outputDir, 'tailwind.config.js'), configJs);

  console.log('  ✓ tailwind.config.js generated');

  console.log('Generating CSS variables...');
  const cssVariables = generateCSSVariables();
  fs.writeFileSync(path.join(outputDir, 'tokens.css'), cssVariables);
  console.log('  ✓ tokens.css generated');

  console.log('Generating utility mapping...');
  const utilityMapping = generateUtilityMapping();
  fs.writeFileSync(
    path.join(outputDir, 'utility-mapping.json'),
    JSON.stringify(utilityMapping, null, 2)
  );
  console.log('  ✓ utility-mapping.json generated');

  console.log('Generating index...');
  const indexJs = `export { default as tailwindConfig } from './tailwind.config.json' assert { type: 'json' };
export { default as utilityMapping } from './utility-mapping.json' assert { type: 'json' };
export const cssVariables = \`${cssVariables.replace(/`/g, '\\`')}\`;
`;
  fs.writeFileSync(path.join(outputDir, 'index.js'), indexJs);
  console.log('  ✓ index.js generated');

  console.log('\n✅ Tailwind integration build complete!');
  console.log(`\nOutput files in ${outputDir}:`);
  const files = fs.readdirSync(outputDir);
  files.forEach(file => {
    const stats = fs.statSync(path.join(outputDir, file));
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  });
}

build();
