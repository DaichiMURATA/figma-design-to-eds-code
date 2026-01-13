# Block Generation Guide

> **Purpose**: Comprehensive guide for generating production-ready AEM EDS blocks from Figma designs and User Story markdown.

## Quick Reference

```bash
# Figma only (simplest)
@figma https://www.figma.com/design/FILE_ID/...?node-id=NODE_ID

Generate EDS Block for "Accordion"

# Figma + User Story (recommended for complex blocks)
@figma https://www.figma.com/design/FILE_ID/...?node-id=NODE_ID
@file docs/user-stories/hero-block.md

Generate EDS Block
```

## Related Documentation

- **[Visual Regression Strategy](./VISUAL-REGRESSION-STRATEGY.md)** - Guide for designing Storybook stories that maximize Chromatic coverage
- **[Figma MCP Integration](./FIGMA-MCP-INTEGRATION.md)** - Figma MCP setup and usage guide
- **[.cursorrules](./.cursorrules)** - Automated block generation workflow

## Generation Principles

### 1. Design System Source of Truth

**Figma → Code** (Always):
- Figma components and variants define the block structure
- Design tokens (Variables in Figma) map to CSS Custom Properties
- Component hierarchy guides HTML structure
- Interaction states define JavaScript behavior
- Component name determines block functionality

**User Story → Requirements** (Optional, when provided):
- Detailed functional requirements
- Specific interaction requirements
- Custom accessibility requirements (beyond WCAG AA defaults)
- Specific test scenarios → Additional Storybook Story variants
- Edge cases → Additional Story exports

**When User Story is NOT provided:**
- Infer requirements from Figma component structure and naming
- Use EDS Block Collection as pattern reference:
  - **Accordion**: https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion
  - **Tabs**: https://github.com/adobe/aem-block-collection/tree/main/blocks/tabs
  - **Carousel**: https://github.com/adobe/aem-block-collection/tree/main/blocks/carousel
  - **Cards**: https://github.com/adobe/aem-block-collection/tree/main/blocks/cards
  - **Hero**: Standard hero section patterns
- Apply default accessibility standards (WCAG AA)
- Generate test scenarios based on Figma Variants
- Reference AEM.live documentation: https://www.aem.live/docs/

### 2. Mirror EDS Block Collection Patterns (STRICT)

Reference Adobe's EDS Block Collection for standard patterns:
- **GitHub Repository**: https://github.com/adobe/aem-block-collection
- **AEM.live Documentation**: https://www.aem.live/docs/

Match EXACTLY:

- ✅ JS structure → `export default function decorate(block)`
- ✅ Helper import patterns from `../../scripts/aem.js`
- ✅ DOM structure & class naming conventions
- ✅ `block._eds` API patterns
- ✅ CSS structure, selector conventions, tokens
- ✅ Accessibility patterns (ARIA, keyboard nav)
- ✅ Responsive layout patterns (mobile-first)
- ✅ Loading & instrumentation patterns

**Standard Block References:**
- **Accordion**: Expand/collapse pattern with ARIA accordion
- **Tabs**: Tab switching with ARIA tablist/tab/tabpanel
- **Carousel**: Slideshow with navigation controls
- **Cards**: Grid layout with semantic list structure
- **Hero**: Hero section with CTA buttons

❗ **Absolutely DO NOT invent:**
- New runtime conventions
- New helper patterns
- Custom framework patterns

### 3. Required Output Format

For each block, output EXACTLY three files:

1. `{blockName}.js` - JavaScript implementation
2. `{blockName}.css` - Styles using design tokens
3. `{blockName}.stories.js` - Storybook stories for Visual Regression

## JavaScript Requirements

### Structure
```javascript
// blocks/{blockName}/{blockName}.js

// Constants
const BLOCK_NAME = 'block-name';
const SELECTORS = { /* ... */ };
const CLASSES = { /* ... */ };
const ATTRS = { /* ... */ };

// Helper functions
function createSomething() { /* ... */ }
function bindEvents() { /* ... */ }

// Main decorator
export default function decorate(block) {
  // Implementation
  
  // Public API
  block._eds = {
    someMethod() { /* ... */ },
    destroy() { /* cleanup */ }
  };
}
```

### Core Rules

**Imports**
- Only import helpers from `../../scripts/aem.js`
- Common: `createOptimizedPicture`, `readBlockConfig`, `decorateIcons`
- ❌ No external libraries

**Data Sources (Priority Order)**
1. Block DOM content - Authored in document
2. Derived structure - Headings (h1-h3) define items
3. Fallback - Sample content for demo

**DOM Manipulation**
- Use `block.ownerDocument.createElement()` for element creation
- Preserve instrumentation attributes (`data-aue-*`)
- Use `DocumentFragment` for batch DOM operations
- Progressive enhancement - blocks render meaningfully without JS

**Accessibility**
- `<button>` elements for interactive toggles
- Panels: `role="region"`, `aria-labelledby`, `aria-hidden`, `hidden`
- Keyboard: Enter/Space toggle, Arrow keys navigate, Home/End jump
- Tab order and focus management for dynamic content

**IDs**
- Deterministic, collision-safe, instance-safe
- Pattern: `${blockName}-${instanceId}-${index}`
- ❌ Do not use `Math.random()` for IDs

**Security**
- Sanitize dynamic text: use `textContent`, not `innerHTML`
- Defensive coding: null checks, guard clauses
- No global variables
- Avoid XSS vulnerabilities

### Architecture Requirements

**Modularity**
- Use constants for selectors, classnames, attributes
- Encapsulate logic into small internal functions
- Avoid global mutable state
- Event delegation inside block root

**Performance**
- Batch DOM writes/reads to avoid layout thrash
- Minimal JS footprint
- Lazy-init heavy features
- Use `DocumentFragment` for multiple inserts

**Event Handling**
- Use `addEventListener` with cleanup
- Store handlers on instance for removal
- Never use inline event handlers

**block._eds API**
```javascript
block._eds = {
  // Interactive blocks only (accordion, tabs, carousel)
  open(index) { /* ... */ },
  close(index) { /* ... */ },
  toggle(index) { /* ... */ },
  
  // Always required
  destroy() {
    // Remove all event listeners
    // Cancel timers/animation frames
    // Delete DOM references
  }
};
```

### Helper Functions Available

From `../../scripts/aem.js`:
- `createOptimizedPicture(src, alt, eager, breakpoints)` - Responsive images with WebP
- `readBlockConfig(block)` - Parse metadata from block/section
- `decorateIcons(element, prefix)` - Convert `.icon` spans to images
- `decorateButtons(element)` - Style links as buttons
- `toClassName(name)` - Sanitize string to class name
- `toCamelCase(name)` - Convert to camelCase
- `loadCSS(href)` - Dynamically load CSS
- `loadScript(src, attrs)` - Dynamically load JS

## CSS Requirements

### Structure
```css
/* Block CSS — EDS standard patterns */

.block-name {
  /* Mobile-first base styles */
}

.block-name__element {
  /* BEM-style specific elements */
}

.block-name__element:hover {
  /* Interactive states */
}

.block-name__element:focus-visible {
  outline: 2px solid var(--color-focus-ring, #005fcc);
  outline-offset: 2px;
}

/* Variants */
.block-name--variant {
  /* Modifier styles */
}

/* Desktop */
@media (width >= 900px) {
  .block-name {
    /* Desktop styles */
  }
}
```

### Core Rules

**Token Usage**
- ✅ MUST use design tokens from `styles/styles.css`
- ✅ Map Figma Variables → CSS Custom Properties
- ❌ DO NOT create arbitrary values
- ❌ DO NOT hardcode colors, spacing, typography

**Available Token Categories** (Extract from Figma Variables):

Colors:
```css
--color-text-primary, --color-text-secondary
--color-surface-primary, --color-surface-secondary
--color-border-default, --color-border-accent
--color-icon-primary, --color-icon-accent
```

Typography:
```css
--typography-h1-size, --typography-h2-size
--typography-body-size-l, --typography-body-size-m
--typography-line-height-normal, --typography-line-height-relaxed
--typography-font-weight-regular, --typography-font-weight-bold
```

Spacing:
```css
--spacing-xs, --spacing-s, --spacing-m, --spacing-l, --spacing-xl
--gap-vertical-s, --gap-vertical-m, --gap-vertical-l
--gap-horizontal-s, --gap-horizontal-m
```

Borders & Radius:
```css
--border-width-thin, --border-width-thick
--border-radius-s, --border-radius-m, --border-radius-l
```

**Best Practices**
- Mobile-first responsive design
- Scoped under `.block-{blockName}`
- Visible `:focus-visible` outlines
- Keep selectors shallow (avoid deep nesting)
- Avoid `!important`
- No inline `<style>` or JS injection

**Responsive Patterns**
```css
/* Mobile base (< 900px) */
.block-name { display: block; }

/* Desktop (>= 900px) */
@media (width >= 900px) {
  .block-name { display: grid; }
}

/* Large desktop (>= 1200px) */
@media (width >= 1200px) {
  .block-name { max-width: 1200px; }
}
```

## Storybook Requirements

Each block must have a Storybook stories file that follows the **Visual Regression Strategy**.

**Path**
```
blocks/{blockName}/{blockName}.stories.js
```

### Goals

1. **Showcase all Figma Variants** - Each variant = One Story export
2. **Match AEM Authoring** - Use the same DOM structure EDS creates
3. **Execute Real Logic** - Call the actual `decorate()` function
4. **Maximize Chromatic Coverage** - Export stories for all visual states

### Typical Pattern

```javascript
// blocks/{blockName}/{blockName}.stories.js

import '../../styles/styles.css';
import `./${blockName}.css`;
import decorate from `./${blockName}.js`;

export default {
  title: 'Blocks/{BlockName}',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## {BlockName} Block

Brief description of the block's purpose and usage.

**Figma Design**: [Component Name](FIGMA_URL)

**Content Model:**
- **field1** (required): Description
- **field2** (optional): Description

### Features:
- ✅ Feature 1
- ✅ Feature 2
- ✅ WCAG AA Accessibility
- ✅ Responsive design (mobile-first)

### CSS Classes:
- \`.{blockName}\` – Main block root
- \`.{blockName}__element\` – Specific element
        `,
      },
    },
    layout: 'fullscreen', // or 'padded', 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'variant1', 'variant2'],
      description: 'Figma component variant',
      defaultValue: 'default',
    },
    title: {
      control: 'text',
      description: 'Heading text',
      defaultValue: 'Sample Title',
    },
    // Add one argType per content field
  },
};

/**
 * Creates EDS-style block DOM (rows of divs)
 */
const createBlock = (args) => {
  const block = document.createElement('div');
  block.className = '{blockName}';

  // Row 0: variant
  const variantRow = document.createElement('div');
  const variantCell = document.createElement('div');
  variantCell.textContent = args.variant || 'default';
  variantRow.appendChild(variantCell);
  block.appendChild(variantRow);

  // Row 1: title
  const titleRow = document.createElement('div');
  const titleCell = document.createElement('div');
  const heading = document.createElement('h2');
  heading.textContent = args.title || 'Sample Title';
  titleCell.appendChild(heading);
  titleRow.appendChild(titleCell);
  block.appendChild(titleRow);

  // Additional rows for other fields...

  return block;
};

/**
 * Template function - mirrors actual page structure
 */
const Template = (args) => {
  const main = document.createElement('main');
  const section = document.createElement('div');
  section.className = 'section';
  
  const wrapper = document.createElement('div');
  wrapper.className = '{blockName}-wrapper';
  
  const block = createBlock(args);
  wrapper.appendChild(block);
  section.appendChild(wrapper);
  main.appendChild(section);
  
  decorate(block); // Apply real block logic
  
  return main;
};

// Story exports - One per Figma Variant
export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  title: 'Default Layout Example',
};

export const Variant1 = Template.bind({});
Variant1.args = {
  variant: 'variant1',
  title: 'Variant 1 Example',
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  variant: 'dark',
  title: 'Dark Mode Example',
};

// Add more Story exports based on Figma Variants
```

### Story Variant Strategy for Visual Regression

**CRITICAL PRINCIPLE**: Figma is the Single Source of Truth

**Story Generation Rule:**
```
Figma Variants count = Storybook Stories count (1:1 mapping)
```

**Figma Variant Detection Methods:**

1. **Component Set Variants (PRIMARY METHOD)**
   - Query Figma API: `type === "COMPONENT_SET"` 
   - Count children: `.children | length`
   - Each child is a distinct variant with unique properties
   - Example: Cards Component Set has 4 variants
     ```
     isImage=true, isLink=false, hover=false
     isImage=true, isLink=true, hover=true
     isImage=false, isLink=false, hover=false
     isImage=true, isLink=true, hover=false
     ```
   - Generate exactly 4 Stories

2. **Sample Instances (FALLBACK METHOD)**
   - Used when no Component Set exists (e.g., Columns, Quote)
   - Query: `.document.children[] | select(.name=="BlockName") | .children[] | select(.name=="Sample") | .children[] | select(.type=="INSTANCE")`
   - Count all instances in Sample section
   - Each instance represents a different configuration
   - Example: Columns has 9 instances (1-col through 9-col)
   - Generate exactly 9 Stories

**What to Generate:**
- ✅ **One Story export per Figma Variant** - No more, no less
- ✅ **Story names should match Figma Variant property values**
- ✅ **All visual states MUST be defined in Figma as Variants**

**What NOT to Generate:**
- ❌ Do NOT add stories for edge cases (minimal/maximum content) unless in Figma
- ❌ Do NOT add stories for interaction states (hover/focus) unless in Figma
- ❌ Do NOT add stories for responsive breakpoints unless in Figma
- ❌ Do NOT add stories for error/loading/empty states unless in Figma
- ❌ Do NOT add stories based on User Story requirements unless they map to Figma Variants

**Figma Design Requirements** (Designer responsibility):
Designers should define Variants in Figma for:
- All interaction states (default, hover, focus, active, disabled)
- All content states (error, loading, empty, success) if applicable
- All responsive breakpoints (desktop, tablet, mobile) if needed
- All content variations (minimal, normal, maximum) if needed
- All theme variations (light, dark) if applicable

**Responsive Testing within Stories:**
Use Chromatic's `viewports` parameter for responsive testing:
```javascript
export const Default = {
  render: () => Template(),
  parameters: {
    chromatic: {
      viewports: [375, 768, 1200], // Test 3 breakpoints in 1 Story
    },
  },
};
```

**Result:** 3 Figma Variants × 3 viewports = 9 Chromatic snapshots

**Example Mapping:**

Figma Component: **Accordion**
- Figma Variants defined (Component Set):
  1. `state=default, isOpen=false` 
  2. `state=hover, isOpen=false`
  3. `state=hover, isOpen=true`

Storybook Stories generated:
```javascript
// Story 1: Matches Figma Variant 1
export const Default = {
  render: () => Template({ state: 'default', isOpen: false }),
  parameters: {
    chromatic: { delay: 300 },
  },
};

// Story 2: Matches Figma Variant 2
export const HoverClosed = {
  render: () => Template({ state: 'hover', isOpen: false }),
  parameters: {
    chromatic: { delay: 300 },
  },
};

// Story 3: Matches Figma Variant 3
export const HoverExpanded = {
  render: () => Template({ state: 'hover', isOpen: true }),
  parameters: {
    chromatic: { delay: 300 },
  },
};
```

**Total:** 3 Stories (exactly matching 3 Figma Variants)

**Example 2: Columns (Sample Instances)**
- Figma has 9 Sample instances (no Component Set)
- Generate 9 Stories: OneColumn, TwoColumns, ... NineColumns

**If Designer needs additional test scenarios:**
→ Add them as Variants in Figma first
→ Then code generation will automatically create corresponding Stories

**Philosophy:**
- **Design-driven testing** - All test scenarios originate from design
- **Predictable generation** - No guesswork or assumptions in code
- **Design system alignment** - Forces design and code to stay in sync

## Image Optimization

Always use `createOptimizedPicture()` for images:

```javascript
import { createOptimizedPicture } from '../../scripts/aem.js';

// Basic usage
const picture = createOptimizedPicture(
  img.src,
  img.alt,
  false, // eager loading
  [{ width: '750' }] // breakpoints
);

// Responsive breakpoints
const picture = createOptimizedPicture(
  img.src,
  img.alt,
  false,
  [
    { media: '(min-width: 900px)', width: '2000' },
    { width: '750' }
  ]
);

// Replace original
img.closest('picture').replaceWith(picture);
```

## Production Checklist

Before finalizing generated block:

- [ ] Follows `export default function decorate(block)` pattern
- [ ] Uses only existing helpers from `../../scripts/aem.js`
- [ ] Implements full accessibility (ARIA, keyboard)
- [ ] Uses design tokens from Figma Variables
- [ ] Mobile-first responsive CSS
- [ ] Proper `block._eds` API with `destroy()`
- [ ] Defensive coding with null checks
- [ ] No XSS vulnerabilities
- [ ] Deterministic IDs (no random)
- [ ] Event cleanup in `destroy()`
- [ ] Storybook stories created (`{blockName}.stories.js`)
- [ ] Stories map to all Figma Variants
- [ ] User Story test scenarios included as Stories
- [ ] Stories render correctly in Storybook
- [ ] Passes `npm run lint`

## Common Patterns

### Accordion/Tabs Pattern
```javascript
// Create deterministic IDs
const buttonId = `${blockName}-button-${instanceId}-${index}`;
const panelId = `${blockName}-panel-${instanceId}-${index}`;

// Button
button.setAttribute('aria-expanded', 'false');
button.setAttribute('aria-controls', panelId);

// Panel
panel.setAttribute('role', 'region');
panel.setAttribute('aria-labelledby', buttonId);
panel.hidden = true;

// Toggle
function toggle(item) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isExpanded));
  panel.hidden = isExpanded;
}
```

### Cards/Grid Pattern
```javascript
// Convert to semantic list
const ul = document.createElement('ul');
[...block.children].forEach((row) => {
  const li = document.createElement('li');
  // Move content
  while (row.firstChild) li.append(row.firstChild);
  ul.append(li);
});
block.textContent = '';
block.append(ul);
```

## Testing Generated Blocks

1. **Storybook Test**: `npm run storybook` → http://localhost:6006
   - Verify all Story variants render correctly
   - Check responsive behavior at different viewports
   - Test keyboard navigation

2. **Visual Regression Test**: Create PR
   - GitHub Action runs Chromatic automatically
   - Review visual diffs in Chromatic dashboard
   - Approve or reject changes

3. **Accessibility Test**: 
   - Keyboard navigation (Tab, Enter, Arrows)
   - Screen reader (VoiceOver, NVDA)
   - Focus indicators visible

4. **Performance Test**: Lighthouse score (target: 100)

5. **Lint Test**: `npm run lint`

## Post-Generation Steps

```bash
# 1. Review generated files
code blocks/{blockName}/

# 2. Run Storybook and review block stories
npm run storybook

# 3. Lint and fix
npm run lint:fix

# 4. Create PR for Visual Regression testing
git add blocks/{blockName}/
git commit -m "feat: add {blockName} block with Storybook stories"
git push origin feature/{blockName}
# Create PR on GitHub
```

## Troubleshooting

### Storybook not showing stories
```bash
# Restart Storybook
npm run storybook
```

### Linting errors
```bash
npm run lint:fix
```

### CSS tokens not found
Check `styles/styles.css` for available tokens. Extract missing tokens from Figma Variables.

### Images not optimized
Ensure `createOptimizedPicture()` is imported and used for all images.

## Additional Resources

- **VISUAL-REGRESSION-STRATEGY.md** - Storybook story strategy for Chromatic
- **FIGMA-MCP-INTEGRATION.md** - Figma MCP setup and usage
- **styles/styles.css** - Available design tokens
- **blocks/*/** - Example block patterns
- **../../scripts/aem.js** - Available helper functions
- **https://www.aem.live/docs/** - Official AEM EDS documentation

---

**Remember**: This template prioritizes **Figma → Code** workflow with **Visual Regression** as a first-class citizen. Every block should have comprehensive Storybook coverage mapping to Figma Variants and User Story test scenarios.
