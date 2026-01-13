# Figma Design Guidelines for EDS Block Generation

> **Philosophy:** Figma is the Single Source of Truth for all visual and interaction states.

## Overview

This document provides guidelines for designers creating Figma components that will be automatically converted into EDS Blocks with comprehensive visual regression testing.

**Key Principle:**
```
Figma Variants count = Storybook Stories count = Chromatic Snapshots count
```

Every Variant you define in Figma will generate:
1. One Storybook Story
2. One or more Chromatic visual snapshots (depending on viewport settings)

---

## Component Structure

### 1. Component Set Creation

Each EDS Block should be defined as a **Component Set** in Figma with:
- **Component name**: Matches the EDS block name (e.g., `Accordion`, `Hero`, `Tabs`)
- **Variants**: All visual and interaction states you want to test
- **Properties**: Named properties that define variants (e.g., `State`, `Size`, `Theme`)

**Example Structure:**
```
Component Set: Accordion
├── Variant 1: State=Default, isOpen=false
├── Variant 2: State=Hover, isOpen=false
└── Variant 3: State=Hover, isOpen=true
```

---

## Required Variants

### 2. Interaction States (Interactive Elements)

For any interactive component (buttons, accordions, tabs, forms), define these states:

#### ✅ Minimum Required:
- **Default** - Initial state, no interaction
- **Hover** - Mouse hover state
- **Focus** - Keyboard focus state (WCAG requirement)

#### ⚠️ Additional (if applicable):
- **Active** - Click/press state
- **Disabled** - Inactive state
- **Selected** - Current/active selection (for navigation, tabs)

**Property Naming:**
```
State = Default | Hover | Focus | Active | Disabled | Selected
```

**Example:**
```
Component: Button
├── State=Default
├── State=Hover
├── State=Focus
├── State=Active
└── State=Disabled
```

---

### 3. Content States (Dynamic Components)

For components displaying dynamic or user-generated content:

#### ✅ For List/Collection Blocks:
- **Empty** - No items state
- **Normal** - Typical content (2-4 items)
- **Full** - Maximum content (8+ items)

#### ✅ For Form/Input Blocks:
- **Empty** - No value entered
- **Filled** - Value entered
- **Error** - Validation error state
- **Success** - Validation success state

#### ✅ For Async/Loading Blocks:
- **Loading** - Data fetching state
- **Loaded** - Data displayed
- **Error** - Load failed state

**Property Naming:**
```
ContentState = Empty | Normal | Full | Error | Success | Loading
```

**Example:**
```
Component: SearchInput
├── ContentState=Empty
├── ContentState=Filled
├── ContentState=Error (shows error message)
└── State=Focus, ContentState=Filled
```

---

### 4. Responsive Breakpoints

Define responsive behavior as Variants:

#### ✅ Standard Breakpoints:
- **Desktop** - 1200px+ (default)
- **Tablet** - 768px - 1199px
- **Mobile** - 375px - 767px

**Property Naming:**
```
Viewport = Desktop | Tablet | Mobile
```

**Example:**
```
Component: Hero
├── Viewport=Desktop
├── Viewport=Tablet
└── Viewport=Mobile
```

**Alternative Approach:**
Use Figma **Variables (Responsive)** for spacing/sizing that adapts to breakpoints.

---

### 5. Content Variations

Test layout with different content lengths:

#### ✅ Content Length Variants:
- **Minimal** - Single item or short text
- **Normal** - Typical content (3 items, 2-3 paragraphs)
- **Maximum** - Stress test (10+ items, very long text)

**Property Naming:**
```
ContentLength = Minimal | Normal | Maximum
```

**Example:**
```
Component: Accordion
├── ContentLength=Minimal (1 accordion item)
├── ContentLength=Normal (3 accordion items)
└── ContentLength=Maximum (8 accordion items)
```

---

### 6. Theme Variations

If your design system supports themes:

**Property Naming:**
```
Theme = Light | Dark | HighContrast
```

**Example:**
```
Component: Card
├── Theme=Light
├── Theme=Dark
└── Theme=HighContrast
```

---

## Variant Naming Best Practices

### Property Naming Convention

Use clear, semantic property names:

✅ **Good:**
- `State` (Default, Hover, Focus)
- `isOpen` (true, false)
- `Viewport` (Desktop, Tablet, Mobile)
- `ContentState` (Empty, Error, Success)

❌ **Avoid:**
- `Variant1`, `Variant2` (not descriptive)
- `v1`, `v2` (cryptic)
- `Type A`, `Type B` (unclear)

### Value Naming

Use PascalCase for multi-word values:

✅ **Good:**
- `Default`, `Hover`, `Focus`
- `EmptyState`, `ErrorState`
- `FullWidth`, `Centered`

❌ **Avoid:**
- `default state` (spaces)
- `hover-state` (hyphens)
- `FOCUSED` (all caps, unless convention)

---

## Variant Combination Strategies

### Strategy 1: Flat Variants (Simple Components)

One property with all states:

```
Component: Button
├── Variant=Default
├── Variant=Hover
├── Variant=Focus
└── Variant=Disabled
```

**Result:** 4 Figma Variants → 4 Storybook Stories

---

### Strategy 2: Multi-Property Variants (Complex Components)

Multiple properties create combinations:

```
Component: Hero
Properties:
- Layout: Default | Centered | FullWidth
- Theme: Light | Dark
- HasImage: true | false
```

**Figma generates:** 3 × 2 × 2 = 12 possible combinations

**Design Decision:** Define only the meaningful combinations you want to test.

**Example Selection:**
```
├── Layout=Default, Theme=Light, HasImage=true
├── Layout=Centered, Theme=Light, HasImage=true
├── Layout=FullWidth, Theme=Light, HasImage=false
├── Layout=Default, Theme=Dark, HasImage=true
└── Layout=Centered, Theme=Dark, HasImage=false
```

**Result:** 5 curated Variants → 5 Storybook Stories

---

## Design Tokens Integration

### Using Figma Variables

Define design tokens as Figma Variables:

#### ✅ Variable Collections:
1. **Primitives** - All available values (colors, spacing, typography)
2. **Semantic** - Meaningful tokens (primary-color, heading-font-size)
3. **Component** - Component-specific tokens (button-padding, card-border-radius)

#### ✅ Variable Naming (follows CSS Custom Property style):
```
color-primary-500
spacing-m
font-size-body
border-radius-lg
```

**These will be automatically extracted to `styles/design-tokens.css`**

---

## Accessibility Requirements

### WCAG AA Compliance

Every component must include:

#### ✅ Focus States
- Visible focus indicator (2px outline or equivalent)
- Color contrast ≥ 3:1 for focus indicator

#### ✅ Color Contrast
- Text: ≥ 4.5:1 (normal text), ≥ 3:1 (large text 24px+)
- UI Components: ≥ 3:1 (borders, icons)

#### ✅ Interactive Element Sizes
- Minimum touch target: 44×44px (mobile)
- Minimum click target: 24×24px (desktop)

**Figma Plugin Recommendation:** Use **Stark** or **A11y** plugins to verify contrast ratios.

---

## Checklist for Designers

Before marking a Figma Component as "Ready for Development":

### Visual States
- [ ] All interaction states defined (Default, Hover, Focus, Active, Disabled)
- [ ] Content states defined if applicable (Empty, Error, Loading)
- [ ] Responsive variants defined for Desktop/Tablet/Mobile

### Content Variations
- [ ] Minimal content variant (1 item or short text)
- [ ] Normal content variant (3 items or typical text)
- [ ] Maximum content variant (stress test)

### Design Tokens
- [ ] All colors use Figma Variables
- [ ] All spacing uses Figma Variables
- [ ] All typography uses Figma Variables

### Accessibility
- [ ] Focus state has visible indicator (≥2px)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Touch targets are ≥44×44px on mobile

### Documentation
- [ ] Component name matches EDS block name
- [ ] Variant properties use semantic naming
- [ ] Related User Story created (if complex behavior)

---

## Examples

### Example 1: Simple Component (Button)

```
Component Set: Button
Properties:
- State: Default | Hover | Focus | Active | Disabled
- Size: Small | Medium | Large

Defined Variants:
1. State=Default, Size=Medium
2. State=Hover, Size=Medium
3. State=Focus, Size=Medium
4. State=Active, Size=Medium
5. State=Disabled, Size=Medium
6. State=Default, Size=Small
7. State=Default, Size=Large

Total: 7 Variants → 7 Stories → 21 Chromatic Snapshots (3 viewports)
```

---

### Example 2: Complex Component (Accordion)

```
Component Set: Accordion
Properties:
- State: Default | Hover | Focus
- isOpen: false | true
- ContentLength: Minimal | Normal | Maximum

Defined Variants:
1. State=Default, isOpen=false, ContentLength=Normal
2. State=Hover, isOpen=false, ContentLength=Normal
3. State=Focus, isOpen=false, ContentLength=Normal
4. State=Hover, isOpen=true, ContentLength=Normal
5. State=Default, isOpen=false, ContentLength=Minimal
6. State=Default, isOpen=false, ContentLength=Maximum

Total: 6 Variants → 6 Stories → 18 Chromatic Snapshots (3 viewports)
```

---

## FAQ

### Q: How many Variants should I create?

**A:** Define all states that have **visual differences**. Typical ranges:
- Simple components (Button, Icon): 5-10 variants
- Medium components (Card, Accordion): 6-12 variants
- Complex components (Hero, Carousel): 8-15 variants

### Q: Should I create every possible combination?

**A:** No. Only create combinations that are:
1. Visually distinct
2. Likely to be used in production
3. Important for testing (edge cases)

### Q: What if I need to add a new state later?

**A:** Add it as a new Variant in Figma, then regenerate the block. The code generation will automatically create the corresponding Story.

### Q: Can I use Figma Auto Layout?

**A:** Yes! Auto Layout is recommended. It helps define responsive behavior and spacing that translates well to CSS Flexbox/Grid.

### Q: What about animations and micro-interactions?

**A:** Define the **before** and **after** states as separate Variants. Animation timing will be implemented in CSS/JS, but visual states should be captured in Figma.

---

## Related Documents

- **BLOCK-GENERATION-GUIDE.md** - How code is generated from Figma
- **VISUAL-REGRESSION-STRATEGY.md** - How Variants map to Chromatic snapshots
- **.cursorrules** - AI rules for automated block generation
- **FIGMA-MCP-INTEGRATION.md** - Technical setup for Figma access

---

## Summary

**Golden Rule:**
> If you want it tested, define it as a Variant in Figma.

By following these guidelines, you ensure:
- ✅ Complete visual regression coverage
- ✅ Design-code consistency
- ✅ Predictable automated code generation
- ✅ WCAG AA accessibility compliance
- ✅ Comprehensive test scenarios

**Questions?** Refer to the related documents or consult the development team.
