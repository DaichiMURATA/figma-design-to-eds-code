# EDS Block Generation Process - Complete Workflow

## 🎯 Goal
Generate EDS blocks from Figma designs with:
- ✅ 100% Figma fidelity (pixel-perfect)
- ✅ Full automation (minimal manual intervention)
- ✅ Reproducibility (same input → same output)
- ✅ Variant completeness (1:1 mapping)

---

## 📋 Prerequisites

### Required Environment Variables
```bash
export FIGMA_PERSONAL_ACCESS_TOKEN="figd_xxxxx"
export FIGMA_FILE_ID="MJTwyRbE5EVdlci3UIwsut"
```

### Required Configuration
- `config/figma/figma-urls.json` - Component registry
- `styles/styles.css` - Global design tokens (already extracted)

---

## 🔄 Complete Generation Workflow

### Phase 1: Figma Analysis
**Goal**: Extract all design information from Figma

#### Step 1.1: Identify Component Set
```bash
npm run inspect-figma -- --node-id=<component-set-node-id>
```

**Output**:
- Component Set structure
- All Variant Node IDs
- Variant properties (dimensions, names)
- Suggested config update

**Action**: Update `config/figma/figma-urls.json` with Variant mapping

#### Step 1.2: Extract Component Styles
**For each Variant Node ID**:

```javascript
// Fetch detailed node data
const nodeData = await fetch(`https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`, {
  headers: { 'X-Figma-Token': token }
});

// Extract style information:
{
  // Layout
  layoutMode: "HORIZONTAL",           // → display: flex; flex-direction: row;
  primaryAxisAlignItems: "CENTER",    // → justify-content: center;
  counterAxisAlignItems: "CENTER",    // → align-items: center;
  itemSpacing: 16,                    // → gap: 16px;
  paddingTop: 40,                     // → padding-top: 40px;
  paddingRight: 40,                   // → padding-right: 40px;
  paddingBottom: 40,                  // → padding-bottom: 40px;
  paddingLeft: 40,                    // → padding-left: 40px;
  
  // Visual
  fills: [{ color: { r, g, b, a } }], // → background-color: rgba(...);
  strokes: [{ color: { r, g, b, a } }], // → border: 1px solid rgba(...);
  cornerRadius: 8,                    // → border-radius: 8px;
  opacity: 1,                         // → opacity: 1;
  
  // Effects
  effects: [
    { type: "DROP_SHADOW", radius: 8, offset: { x, y }, color: { r, g, b, a } }
  ],                                  // → box-shadow: 0 4px 8px rgba(...);
  
  // Typography (for text nodes)
  style: {
    fontFamily: "Noto Sans JP",       // → font-family: var(--body-font-family);
    fontSize: 18,                     // → font-size: 18px;
    fontWeight: 700,                  // → font-weight: 700;
    lineHeightPx: 28,                 // → line-height: 28px;
    letterSpacing: 0,                 // → letter-spacing: 0;
  }
}
```

**Action**: Save to `blocks/{block}/figma-styles.json`

#### Step 1.3: Map Styles to Design Tokens
**Cross-reference extracted values with global design tokens**:

```javascript
// Example mapping logic
const paddingTop = 40;
const tokens = loadDesignTokens(); // from styles/styles.css

// Find matching token
const matchingToken = findTokenByValue(tokens, paddingTop);
// Result: --spacing-xl: 40px;

// Generate CSS
const css = matchingToken 
  ? `padding-top: var(${matchingToken.name});`
  : `padding-top: ${paddingTop}px; /* TODO: Create design token */`;
```

**Action**: Create token mapping file `blocks/{block}/token-mapping.json`

#### Step 1.4: Download Assets
```bash
npm run download-all-variants -- --block=<block-name>
```

**Output**:
- All images from all Variants
- `blocks/{block}/assets/` directory
- `metadata.json` per Variant

---

### Phase 2: Code Generation

#### Step 2.1: Generate CSS
**Priority order**:
1. Use existing design tokens (from `styles/styles.css`)
2. Create new tokens if value is reused across components
3. Use literal values only for one-off styles

**Template**:
```css
/* blocks/{block}/{block}.css */

/* Root block styles - extracted from Figma Component Set */
.{block} {
  /* Layout - from Figma Auto Layout */
  display: flex;
  flex-direction: var(--layout-direction, row);
  justify-content: var(--layout-justify, center);
  align-items: var(--layout-align, center);
  gap: var(--spacing-m);
  
  /* Spacing - map to tokens */
  padding: var(--spacing-xl);
  margin: 0 auto;
  
  /* Sizing - from absoluteBoundingBox */
  max-width: var(--container-max-width, 1200px);
  width: 100%;
  
  /* Visual - from fills/strokes/effects */
  background-color: var(--background-color);
  border-radius: var(--border-radius-s);
  box-shadow: var(--shadow-m);
}

/* Child elements - from Figma hierarchy */
.{block} .{block}-{element} {
  /* Styles extracted from child nodes */
}
```

**Automation Rule**:
```javascript
// For each Figma node in hierarchy:
function generateCSSForNode(node, parentSelector) {
  const selector = `${parentSelector} .${kebabCase(node.name)}`;
  const styles = extractStyles(node);
  const cssProperties = styles.map(style => mapToCSS(style, designTokens));
  
  return {
    selector,
    properties: cssProperties,
    children: node.children?.map(child => generateCSSForNode(child, selector))
  };
}
```

#### Step 2.2: Generate HTML Structure
**Based on EDS Block specification**:

```javascript
// Figma hierarchy → EDS HTML structure
function generateHTML(figmaNode) {
  const blockName = kebabCase(figmaNode.name);
  
  return `
<div class="${blockName} block" data-block-name="${blockName}">
  ${figmaNode.children.map(child => generateChildHTML(child)).join('\n  ')}
</div>
  `.trim();
}
```

**Reference Living Specification** (if available):
- Check `blocks/{block}/eds-spec.html` for actual EDS output
- Ensure Storybook HTML matches EDS structure

#### Step 2.3: Generate JavaScript
**Pattern**: Follow EDS Block Collection patterns

```javascript
// blocks/{block}/{block}.js
export default function decorate(block) {
  // 1. Parse block structure (from EDS)
  const rows = [...block.children];
  
  // 2. Transform to semantic HTML
  const container = document.createElement('div');
  container.className = `${block.className}-container`;
  
  // 3. Add interactivity (if needed)
  setupEventHandlers(container);
  
  // 4. Replace block content
  block.textContent = '';
  block.append(container);
}
```

#### Step 2.4: Generate Storybook Stories
**1:1 mapping with Figma Variants**:

```javascript
// blocks/{block}/{block}.stories.js
import { loadVariantConfig } from '../../config/figma/figma-urls.json';

const variants = loadVariantConfig('{block}');

// Generate one Story per Variant
export const stories = Object.entries(variants).map(([name, nodeId]) => ({
  [name]: {
    render: () => {
      const block = createBlockHTML(name);
      decorate(block);
      return block;
    },
    parameters: {
      design: {
        type: 'figma',
        url: `https://www.figma.com/file/${FIGMA_FILE_ID}?node-id=${nodeId}`
      },
      chromatic: {
        delay: 500,
      }
    }
  }
}));
```

---

### Phase 3: Validation & Refinement

#### Step 3.1: Automated Visual Validation
**For each Variant**:

```bash
npm run validate-block -- --block=<block-name> --node-id=<variant-node-id> --demo
```

**Process**:
1. Fetch Figma screenshot (scale=2)
2. Capture Storybook screenshot (deviceScaleFactor=2)
3. Compare pixel-by-pixel
4. If diff > threshold:
   - Extract style differences from Figma API
   - Apply CSS fixes
   - Repeat (max 5 iterations)

#### Step 3.2: Element-Level Validation
**Break down into sub-elements**:

```javascript
const elements = [
  { selector: '.{block}-image', priority: 'High' },
  { selector: '.{block}-navigation', priority: 'High' },
  { selector: '.{block}-indicators', priority: 'Medium' },
];

for (const element of elements) {
  await validateElement(element);
}
```

#### Step 3.3: Vision LLM Review (Optional)
**If diff > 10% after automated fixes**:

```javascript
const analysis = await analyzeDiffWithVisionLLM({
  figmaImage,
  storybookImage,
  diffImage
});

// Apply LLM-suggested fixes
for (const fix of analysis.suggestedFixes) {
  await applyFix(fix);
}
```

---

### Phase 4: Documentation & Testing

#### Step 4.1: Generate Documentation
**Auto-generate from Figma + Code**:

```markdown
# {Block} Block

## Figma Design
- **Component Set**: [{Block}](figma-url)
- **Variants**: {variant-count}

## Usage
\`\`\`html
<!-- EDS Authoring (Table in Document) -->
| {Block} |
|---------|
| Content |
\`\`\`

## Variants
{for each variant: name, description, preview}

## Design Tokens Used
{list of CSS custom properties}

## Accessibility
- Keyboard navigation: ✅
- Screen reader: ✅
- ARIA labels: ✅
```

#### Step 4.2: Chromatic Integration
**Automatic on PR**:
- Layer 1: Storybook Stories (changed blocks only)
- Layer 2: E2E Pages (predefined test pages)

---

## 🎯 Success Criteria

### For Each Block:
- ✅ All Figma Variants have corresponding Stories
- ✅ Visual diff < 5% for each Variant
- ✅ All styles use design tokens (no hardcoded values)
- ✅ HTML structure matches EDS specification
- ✅ Assets are downloaded and referenced correctly
- ✅ Chromatic baseline is established
- ✅ Documentation is complete

### For Each Variant:
- ✅ Figma Node ID is documented
- ✅ Dimensions match exactly
- ✅ Colors, spacing, typography match
- ✅ Interactive states work correctly
- ✅ Responsive behavior is correct

---

## 🤖 Automation Commands

### Full Block Generation (End-to-End)
```bash
npm run generate-block -- --figma-node=<component-set-id> --block=<name>
```

**What it does**:
1. Inspect Figma Component Set
2. Extract all Variant styles
3. Map to design tokens
4. Download all assets
5. Generate CSS, JS, Stories
6. Run visual validation
7. Generate documentation

### Individual Steps
```bash
# Analysis
npm run inspect-figma -- --node-id=<id>
npm run extract-styles -- --node-id=<id> --block=<name>
npm run map-tokens -- --block=<name>

# Assets
npm run download-all-variants -- --block=<name>

# Code Generation
npm run generate-css -- --block=<name>
npm run generate-js -- --block=<name>
npm run generate-stories -- --block=<name>

# Validation
npm run validate-block -- --block=<name> --node-id=<id>
npm run validate-all-variants -- --block=<name>

# Documentation
npm run generate-docs -- --block=<name>
```

---

## 📝 Configuration Files

### `config/figma/figma-urls.json`
```json
{
  "components": {
    "{block}": {
      "nodeId": "1234:5678",
      "variants": {
        "VariantName1": "1234:1001",
        "VariantName2": "1234:1002"
      },
      "status": "generated",
      "lastValidated": "2026-01-16"
    }
  }
}
```

### `blocks/{block}/figma-styles.json`
```json
{
  "blockName": "{block}",
  "componentSetId": "1234:5678",
  "variants": {
    "VariantName1": {
      "nodeId": "1234:1001",
      "styles": {
        "layout": { "layoutMode": "HORIZONTAL", ... },
        "spacing": { "paddingTop": 40, ... },
        "visual": { "fills": [...], ... }
      },
      "children": [...]
    }
  }
}
```

### `blocks/{block}/token-mapping.json`
```json
{
  "blockName": "{block}",
  "mappings": {
    "paddingTop": { "value": 40, "token": "--spacing-xl" },
    "cornerRadius": { "value": 8, "token": "--border-radius-m" },
    "backgroundColor": { "value": "#ffffff", "token": "--background-color" }
  }
}
```

---

## 🔄 Continuous Improvement Loop

1. **Figma Design Update** → Webhook notification
2. **Re-extract Styles** → Detect changes
3. **Re-generate Code** → Apply updates
4. **Re-validate** → Check visual diff
5. **Create PR** → Review changes
6. **Update Baseline** → Accept if approved

---

## 🚀 Future Enhancements

- [ ] Figma Plugin for one-click generation
- [ ] Real-time sync (Figma → Code)
- [ ] Vision LLM integration for complex layouts
- [ ] AI-powered interaction code generation
- [ ] Multi-language support (i18n)
- [ ] Accessibility auto-validation (WCAG AA)
