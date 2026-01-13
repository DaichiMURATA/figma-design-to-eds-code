# Visual Regression Testing Strategy

> **Purpose**: Guide for designing Storybook stories that maximize Visual Regression coverage with Chromatic.

## Core Principle

**Each Story Export = One Visual Snapshot**

Chromatic captures screenshots based on **Story exports** (e.g., `export const Default`, `export const DarkMode`) with their fixed `.args` values, **not** from `argTypes` options.

```javascript
// ❌ BAD: Only ONE snapshot captured (Default story only)
export default {
  argTypes: {
    variant: { 
      control: { type: 'select' },
      options: ['default', 'highlighted', 'compact']  // Not captured by Chromatic
    }
  }
};

export const Default = Template.bind({});
Default.args = { variant: 'default' };  // Only this is captured

// ✅ GOOD: THREE snapshots captured (one per story)
export const Default = Template.bind({});
Default.args = { variant: 'default' };

export const Highlighted = Template.bind({});
Highlighted.args = { variant: 'highlighted' };

export const Compact = Template.bind({});
Compact.args = { variant: 'compact' };
```

## Visual Regression Coverage Formula

```
Total Snapshots = (Number of Story Exports) × (Number of Viewports)
```

**Example**:
- 8 Story exports × 3 viewports (mobile/tablet/desktop) = 24 total snapshots
- Each snapshot is compared between source branch and target branch in PRs

## What to Export as Stories

### ✅ Export These as Separate Stories

1. **Layout Variants**
   ```javascript
   export const Default = Template.bind({});
   export const Compact = Template.bind({});
   export const FullWidth = Template.bind({});
   ```

2. **Style/Theme Variants**
   ```javascript
   export const Default = Template.bind({});
   export const DarkMode = Template.bind({});
   export const OnDarkBackground = Template.bind({});
   export const Highlighted = Template.bind({});
   ```

3. **Size Variants**
   ```javascript
   export const Small = Template.bind({});
   export const Medium = Template.bind({});
   export const Large = Template.bind({});
   ```

4. **Content Length Variants**
   ```javascript
   export const Minimal = Template.bind({});
   export const Default = Template.bind({});
   export const LongContent = Template.bind({});
   export const ManyItems = Template.bind({});
   ```

5. **Visual State Variants** (if they change appearance)
   ```javascript
   export const Default = Template.bind({});
   export const Expanded = Template.bind({});
   export const Collapsed = Template.bind({});
   export const HoverState = Template.bind({});
   ```

6. **Empty States / Edge Cases**
   ```javascript
   export const NoImage = Template.bind({});
   export const NoSecondaryLinks = Template.bind({});
   export const SingleItem = Template.bind({});
   ```

7. **Position/Alignment Variants**
   ```javascript
   export const ImageLeft = Template.bind({});
   export const ImageRight = Template.bind({});
   export const Centered = Template.bind({});
   ```

### ❌ Don't Export These as Stories

1. **Pure Interaction Behaviors** (unless they change appearance)
   - Click handlers that don't change visuals
   - Form submission logic
   - Analytics events
   - API calls

2. **Non-Visual State**
   - Loading states that don't render differently
   - Error handling logic (unless it renders error UI)

3. **Dynamic Data Variations** (unless appearance changes)
   - Different data values that look the same
   - Timestamps, IDs, or other metadata

## Figma Variant Mapping Strategy

### 1. Identify Visual Variants in Figma

**Figma Component Properties** → **Storybook Story Exports**

Example Figma Component:
```
Button
├── Style: Primary | Secondary | Textlink
├── Size: Small | Medium | Large
├── Icon: None | Left | Right
└── Dark Mode: Off | On
```

### 2. Determine Critical Combinations

**Don't export every combination** (3 × 3 × 3 × 2 = 54 stories!)

**Instead, export representative combinations**:

```javascript
// Core variants (style × size)
export const PrimaryMedium = Template.bind({});
PrimaryMedium.args = { style: 'primary', size: 'medium' };

export const SecondaryMedium = Template.bind({});
SecondaryMedium.args = { style: 'secondary', size: 'medium' };

export const TextlinkMedium = Template.bind({});
TextlinkMedium.args = { style: 'textlink', size: 'medium' };

// Size variants (primary only)
export const PrimarySmall = Template.bind({});
PrimarySmall.args = { style: 'primary', size: 'small' };

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = { style: 'primary', size: 'large' };

// Icon variants
export const PrimaryWithIconLeft = Template.bind({});
PrimaryWithIconLeft.args = { style: 'primary', icon: 'left' };

export const PrimaryWithIconRight = Template.bind({});
PrimaryWithIconRight.args = { style: 'primary', icon: 'right' };

// Dark mode
export const PrimaryDarkMode = Template.bind({});
PrimaryDarkMode.args = { style: 'primary', darkMode: true };

export const TextlinkDarkMode = Template.bind({});
TextlinkDarkMode.args = { style: 'textlink', darkMode: true };
```

**Result**: 9 stories instead of 54, covering all major visual variations

### 3. Prioritization Matrix

| Priority | Variant Type | Example | Export Count |
|----------|-------------|---------|--------------|
| **P0 - Critical** | Default state | `Default` | 1 |
| **P0 - Critical** | Primary style variants | `Primary`, `Secondary` | 2-4 |
| **P1 - Important** | Layout variants | `ImageLeft`, `ImageRight` | 2-3 |
| **P1 - Important** | Dark mode | `DarkMode`, `OnDarkBackground` | 1-2 |
| **P2 - Nice to have** | Size variants | `Small`, `Large` | 2-3 |
| **P2 - Nice to have** | Content length | `Minimal`, `LongContent` | 2-3 |
| **P3 - Edge cases** | Empty states | `NoImage`, `SingleItem` | 1-2 |

**Recommended Story Count**: 8-15 stories per block

## Real-World Examples from Repository

### Example 1: Accordion Block

```javascript
// blocks/accordion/accordion.stories.js
export default {
  argTypes: {
    itemCount: { options: [1, 2, 3, 5] },  // Used for Storybook UI controls
    darkMode: { control: 'boolean' },
    richContent: { control: 'boolean' },
  },
};

// 10 Story exports = 10 Chromatic snapshots
export const Default = Template.bind({});           // ✅ Default state
export const SingleItem = Template.bind({});        // ✅ Edge case
export const ManyItems = Template.bind({});         // ✅ Content variant
export const DarkMode = Template.bind({});          // ✅ Theme variant
export const RichContent = Template.bind({});       // ✅ Content type
export const RichContentDarkMode = Template.bind({}); // ✅ Combination
export const HoverStates = Template.bind({});       // ✅ Interaction showcase
export const HoverStatesDarkMode = Template.bind({}); // ✅ Combination
export const AccessibilityShowcase = Template.bind({}); // ✅ Documentation
```

**Coverage**: Default + Edge Cases + Dark Mode + Content Variants = Comprehensive

### Example 2: Button Block

```javascript
// blocks/button/button.stories.js

// 11 Story exports = 11 Chromatic snapshots
export const Primary = Template.bind({});           // ✅ Style variant
export const Secondary = Template.bind({});         // ✅ Style variant
export const Textlink = Template.bind({});          // ✅ Style variant
export const TextlinkOnDark = Template.bind({});    // ✅ Theme variant
export const PrimaryWithIcon = Template.bind({});   // ✅ Feature variant
export const SecondaryWithIcon = Template.bind({}); // ✅ Combination
export const BackButton = Template.bind({});        // ✅ Icon direction
export const LinkWithIconAnimation = Template.bind({}); // ✅ Animation
export const LongTextTruncation = Template.bind({}); // ✅ Edge case
export const TextlinkWithLongText = Template.bind({}); // ✅ Edge case
export const AllIcons = Template.bind({});          // ✅ Documentation
```

**Coverage**: All styles + Icons + Dark mode + Edge cases = Complete visual coverage

### Example 3: Teaser Block

```javascript
// blocks/teaser/teaser.stories.js

// 11 Story exports = 11 Chromatic snapshots
export const Default = Template.bind({});           // ✅ Default
export const ImageRight = Template.bind({});        // ✅ Position variant
export const Informative = Template.bind({});       // ✅ Style variant
export const NoImage = Template.bind({});           // ✅ Content variant
export const Highlight = Template.bind({});         // ✅ Style variant
export const Minimal = Template.bind({});           // ✅ Edge case
export const LongContent = Template.bind({});       // ✅ Content length
export const OnDark = Template.bind({});            // ✅ Theme variant
export const WithoutPrimaryLink = Template.bind({}); // ✅ Edge case
export const OnlyPrimaryLink = Template.bind({});   // ✅ Edge case
export const InformativeImageRight = Template.bind({}); // ✅ Combination
```

**Coverage**: All styles + Positions + Edge cases + Dark mode = Comprehensive

## Viewport Strategy

Configure viewports in `.storybook/preview.js`:

```javascript
viewport: {
  viewports: {
    mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
    tablet: { name: 'Tablet', styles: { width: '800px', height: '1024px' } },
    desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
  },
}
```

**Chromatic CLI Configuration**:

```bash
# In package.json or chromatic config
npx chromatic --project-token=$TOKEN --viewport=375,800,1200
```

**Result**: Each story × 3 viewports = 3× snapshot coverage

## Interactive State Testing

For visual states triggered by interaction (hover, focus, active):

### Method 1: Pseudo-Class Decorator (Recommended)

```javascript
export const HoverState = Template.bind({});
HoverState.args = { /* ... */ };
HoverState.parameters = {
  pseudo: { hover: true }  // Requires @storybook/addon-pseudo-states
};
```

### Method 2: Force CSS Class

```javascript
export const HoverState = Template.bind({});
HoverState.decorators = [
  (Story) => {
    const container = Story();
    const button = container.querySelector('.button');
    button.classList.add('force-hover');  // Define .force-hover in CSS
    return container;
  },
];
```

### Method 3: Explicit State in args

```javascript
// If your block supports state props
export const Expanded = Template.bind({});
Expanded.args = { 
  isExpanded: true  // Block renders in expanded state
};
```

## Testing Workflow

### 1. Local Development

```bash
# Run Storybook locally
npm run storybook

# View all stories at http://localhost:6006
# Verify each story renders correctly
```

### 2. Build and Test Locally

```bash
# Build static Storybook
npm run build-storybook

# Test with Chromatic (optional local test)
npm run chromatic
```

### 3. PR Workflow

When you create a PR:

1. **GitHub Action** runs Chromatic automatically
2. Chromatic captures all Story exports
3. Compares against baseline (main branch)
4. Reports visual changes in PR

**Example GitHub Action** (`.github/workflows/chromatic.yml`):

```yaml
name: Chromatic

on: 
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run chromatic
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## Best Practices Summary

### ✅ DO

1. **Export stories for all visual variants**
   - Each Figma variant with visual differences → One Story

2. **Use descriptive story names**
   - `export const PrimaryDarkMode` not `export const Variant3`

3. **Balance coverage and maintainability**
   - 8-15 stories per block is a good target
   - Focus on meaningful visual differences

4. **Document story purpose**
   - Use `parameters.docs.story` to explain what each story demonstrates

5. **Test locally before committing**
   - Verify all stories render correctly in Storybook

6. **Use Template.bind({}) pattern**
   - Consistent with existing blocks
   - Easy to maintain

### ❌ DON'T

1. **Don't rely on argTypes for visual coverage**
   - argTypes are for Storybook UI controls, not Chromatic snapshots

2. **Don't export every possible combination**
   - Focus on representative and edge cases

3. **Don't create stories for non-visual changes**
   - Pure logic/interaction without visual impact

4. **Don't duplicate viewport testing in stories**
   - Use Chromatic viewport config instead

5. **Don't forget edge cases**
   - Empty states, long content, minimal content

## Checklist for Story Generation

When generating a new block, ensure stories cover:

- [ ] **Default state** - The most common use case
- [ ] **All style variants** - From Figma design system
- [ ] **All layout variants** - Different structural arrangements
- [ ] **Dark mode** - If applicable to the block
- [ ] **Content length variants** - Minimal, typical, maximum
- [ ] **Empty states** - Missing optional content
- [ ] **Edge cases** - Single item, many items, etc.
- [ ] **Position variants** - Left, right, center (if applicable)
- [ ] **Interactive states** - Hover, focus (if they change visuals)
- [ ] **Accessibility showcase** - For documentation purposes

## Resources

- **Storybook Documentation**: https://storybook.js.org/docs/react/writing-stories/introduction
- **Chromatic Documentation**: https://www.chromatic.com/docs/
- **Existing Examples**: See `blocks/accordion/accordion.stories.js`, `blocks/button/button.stories.js`
- **Block Generation Guide**: See `BLOCK-GENERATION-GUIDE.md`

---

**Remember**: Visual Regression is not Interaction Testing. Focus on capturing all **visual states**, not all **interactive behaviors**.

