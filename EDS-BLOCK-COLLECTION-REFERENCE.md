# EDS Block Collection Reference

> **Purpose**: Reference guide for Adobe's standard EDS Block Collection patterns

## 📚 Overview

When generating blocks without User Stories, this template project references **Adobe's EDS Block Collection** as the source of truth for standard block patterns.

**Repository**: https://github.com/adobe/aem-block-collection
**Documentation**: https://www.aem.live/docs/

---

## 🎯 Standard Block Patterns

### 1. Accordion

**Pattern**: Expand/collapse content sections
**Reference**: https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion

**Key Features:**
- ARIA accordion pattern (`aria-expanded`, `aria-controls`)
- Keyboard navigation (Enter/Space, Arrow keys, Home/End)
- `role="region"` for panels
- Semantic HTML with `<button>` for triggers
- Progressive enhancement (works without JavaScript)

**Structure:**
```
Row-based authoring:
- First cell: Heading (becomes button)
- Second cell: Content (becomes collapsible panel)
```

**JavaScript API:**
```javascript
block._eds = {
  open(index),
  close(index),
  toggle(index),
  destroy()
}
```

---

### 2. Tabs

**Pattern**: Tab switching interface
**Reference**: https://github.com/adobe/aem-block-collection/tree/main/blocks/tabs

**Key Features:**
- ARIA tablist pattern (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- Keyboard navigation (Arrow keys, Home/End)
- `aria-selected` for active tab
- Tab index management
- Automatic panel switching

**Structure:**
```
Row-based authoring:
- First row: Tab labels
- Subsequent rows: Tab panel content
```

---

### 3. Carousel

**Pattern**: Slideshow/slider with navigation
**Reference**: https://github.com/adobe/aem-block-collection/tree/main/blocks/carousel

**Key Features:**
- Previous/Next buttons
- Optional autoplay
- Keyboard navigation (Arrow keys)
- Touch/swipe support (optional)
- ARIA live region for screen readers
- Indicator dots (optional)

**Structure:**
```
Row-based authoring:
- Each row: One slide
- Slides contain arbitrary content
```

---

### 4. Cards

**Pattern**: Grid layout of card items
**Reference**: https://github.com/adobe/aem-block-collection/tree/main/blocks/cards

**Key Features:**
- Semantic list structure (`<ul>`, `<li>`)
- Responsive grid (CSS Grid)
- Image optimization
- Link treatment
- Uniform card heights (optional)

**Structure:**
```
Row-based authoring:
- Each row: One card
- Cells: Image, title, description, link
```

---

### 5. Hero

**Pattern**: Hero section with headline and CTA
**Reference**: EDS standard hero patterns

**Key Features:**
- Large headline
- Supporting text
- CTA buttons (primary/secondary)
- Background image/video support
- Text overlay positioning
- Responsive typography

**Structure:**
```
Single row or multi-row:
- Headline
- Description
- CTA buttons
- Optional: Background image
```

---

## 🔧 Common Patterns Across All Blocks

### JavaScript Structure

```javascript
// Constants
const BLOCK_NAME = 'block-name';
const SELECTORS = { /* ... */ };
const CLASSES = { /* ... */ };
const ATTRS = { /* ... */ };

// Helper functions
function createSomething() { /* ... */ }

// Main decorator
export default function decorate(block) {
  // Validate
  if (!block) return;
  
  // Transform DOM
  // Add event listeners
  
  // Public API
  block._eds = {
    someMethod() { /* ... */ },
    destroy() { /* cleanup */ }
  };
}
```

### CSS Structure

```css
/* Mobile-first base styles */
.block-name { }

/* Element styles */
.block-name__element { }

/* State modifiers */
.block-name--state { }

/* Desktop responsive */
@media (width >= 900px) {
  .block-name { }
}
```

### Accessibility Checklist

- ✅ Semantic HTML elements
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation (Enter/Space, Arrows, Home/End)
- ✅ Focus indicators (`:focus-visible`)
- ✅ Screen reader support (ARIA labels, live regions)
- ✅ Color contrast (WCAG AA)
- ✅ Progressive enhancement

---

## 📦 Block Authoring Structure

All EDS blocks follow the **row-based authoring** pattern:

```html
<!-- Authored in document -->
<div class="block-name">
  <div> <!-- Row 1 -->
    <div>Cell 1</div>
    <div>Cell 2</div>
  </div>
  <div> <!-- Row 2 -->
    <div>Cell 1</div>
    <div>Cell 2</div>
  </div>
</div>
```

**After `decorate()` transformation:**
```html
<div class="block-name">
  <div class="block-name-item">
    <!-- Transformed structure -->
  </div>
</div>
```

---

## 🎨 Design Token Usage

All blocks should use design tokens from `styles/styles.css`:

```css
/* Colors */
--text-color
--link-color
--link-hover-color
--background-color
--light-color
--dark-color

/* Typography */
--body-font-family
--heading-font-family
--body-font-size-m / -s / -xs
--heading-font-size-xxl / -xl / -l / -m / -s / -xs

/* Spacing */
/* Use consistent spacing values */

/* Responsive breakpoints */
@media (width >= 900px) { }
```

---

## 🔗 Additional Resources

### Official Documentation
- **AEM.live Docs**: https://www.aem.live/docs/
- **Block Collection**: https://github.com/adobe/aem-block-collection
- **Developer Guide**: https://www.aem.live/developer/tutorial

### Helper Functions (`../../scripts/aem.js`)
- `createOptimizedPicture(src, alt, eager, breakpoints)`
- `readBlockConfig(block)`
- `decorateIcons(element, prefix)`
- `decorateButtons(element)`
- `toClassName(name)`
- `loadCSS(href)`, `loadScript(src, attrs)`

### Testing Resources
- **Lighthouse**: Target 100/100 score
- **axe DevTools**: Accessibility testing
- **Storybook**: Component documentation and testing
- **Chromatic**: Visual regression testing

---

## 💡 Block Mapping Strategy

When generating blocks from Figma component names:

| Figma Component | EDS Block Type | Pattern Reference |
|-----------------|----------------|-------------------|
| Accordion | Accordion | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion) |
| Tabs / Tab Panel | Tabs | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/tabs) |
| Carousel / Slider | Carousel | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/carousel) |
| Cards / Card Grid | Cards | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/cards) |
| Hero / Hero Banner | Hero | Standard hero pattern |
| Columns / Multi-column | Columns | Standard columns pattern |
| Fragment / Section | Fragment | Fragment inclusion pattern |

---

## 🎯 When to Use Block Collection References

### ✅ Use Block Collection when:
- Generating standard UI patterns (Accordion, Tabs, Carousel)
- No User Story provided (Figma Only mode)
- Block name matches a standard EDS block type
- Need to infer interaction behavior
- Need to apply standard accessibility patterns

### 📝 Use User Story when:
- Custom business logic required
- Non-standard interaction patterns
- Project-specific requirements
- Complex edge cases
- Custom validation rules

---

**Last Updated**: 2026-01-13
**Template Version**: 1.0.0
