# Figma Variables to CSS Custom Properties

## 🎯 目的

FigmaのVariables（デザイントークン）をCSS Custom Propertiesに変換し、プロジェクトの`styles/styles.css`に反映します。

---

## 📋 Figma Variables抽出プロセス

### 1. Figma Variables構造

Figmaでは、Variablesは以下のカテゴリで管理されます：

#### Variable Collections
- **Primitives**: 全ての利用可能な値（色のパレット全体、全てのサイズ値など）
- **Brand/Semantic**: 実際に使用される値（primary, secondary, accentなど）
- **Responsive**: デバイス別の値（Mobile, Tablet, Desktop）

#### Variable Types
- **Color**: 色の値（RGB, HEX）
- **Number**: 数値（px, rem, %など）
- **String**: 文字列（フォント名など）
- **Boolean**: 真偽値

---

## 🔄 変換ロジック

### Figma Variable → CSS Custom Property

```javascript
// Figma Variable構造
{
  "name": "color/primary",
  "type": "COLOR",
  "value": { "r": 0.1, "g": 0.36, "b": 0.54, "a": 1 }
}

// CSS Custom Property
:root {
  --color-primary: #1a5d8a;
}
```

### 命名規則のマッピング

| Figma Variable | CSS Custom Property | 説明 |
|---------------|---------------------|------|
| `color/primary` | `--color-primary` | スラッシュをハイフンに |
| `spacing/m` | `--spacing-m` | そのまま変換 |
| `typography/h1/size` | `--typography-h1-size` | 階層をハイフンで |
| `border/radius/m` | `--border-radius-m` | 階層をハイフンで |

---

## 🛠️ 実装方法

### Option 1: Figma APIで直接取得

```bash
# Figma REST API経由でVariablesを取得
FILE_KEY="MJTwyRbE5EVdlci3UIwsut"

curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/${FILE_KEY}/variables/local" \
  | jq > figma-variables.json
```

### Option 2: MCP経由で取得

```javascript
// FigmaファイルからVariablesを抽出
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework

Extract all Variables (design tokens) from this file and convert to CSS Custom Properties.

Categories to extract:
- Colors (Primitives, Semantic)
- Typography (Font sizes, Line heights, Font weights)
- Spacing (Padding, Margin, Gap)
- Border (Radius, Width)
- Shadows
- Breakpoints
```

---

## 📝 CSS出力形式

### 基本構造

```css
/**
 * Design Tokens extracted from Figma
 * File: SandBox 0108-AEM Figma Design Framework
 * Generated: 2026-01-13
 */

:root {
  /* ========================================
     Colors - Primitives
     ======================================== */
  --color-blue-50: #e3f2fd;
  --color-blue-100: #bbdefb;
  --color-blue-500: #1a5d8a;
  --color-blue-900: #0d47a1;
  
  /* ========================================
     Colors - Semantic
     ======================================== */
  --color-primary: var(--color-blue-500);
  --color-secondary: var(--color-gray-600);
  --color-accent: var(--color-orange-500);
  --color-error: var(--color-red-500);
  --color-success: var(--color-green-500);
  
  /* Text colors */
  --text-color: #131313;
  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-600);
  --text-on-dark: #ffffff;
  
  /* Background colors */
  --background-color: white;
  --surface-primary: #ffffff;
  --surface-secondary: #f5f5f5;
  
  /* Border colors */
  --border-primary: var(--color-gray-300);
  --border-accent: var(--color-primary);
  
  /* ========================================
     Typography
     ======================================== */
  /* Font families */
  --font-family-primary: 'Roboto', sans-serif;
  --font-family-heading: 'Roboto Condensed', sans-serif;
  
  /* Font sizes - Desktop */
  --typography-h1-size: 48px;
  --typography-h2-size: 36px;
  --typography-h3-size: 28px;
  --typography-body-size: 16px;
  --typography-body-small-size: 14px;
  
  /* Line heights */
  --typography-h1-line-height: 1.2;
  --typography-h2-line-height: 1.3;
  --typography-body-line-height: 1.6;
  
  /* Font weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  /* ========================================
     Spacing
     ======================================== */
  --spacing-xs: 4px;
  --spacing-s: 8px;
  --spacing-m: 16px;
  --spacing-l: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  /* Gap values */
  --gap-horizontal-xs: 8px;
  --gap-horizontal-s: 12px;
  --gap-horizontal-m: 16px;
  --gap-horizontal-l: 24px;
  
  --gap-vertical-xs: 8px;
  --gap-vertical-s: 12px;
  --gap-vertical-m: 16px;
  --gap-vertical-l: 24px;
  --gap-vertical-xl: 32px;
  
  /* ========================================
     Border
     ======================================== */
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 4px;
  
  --border-radius-s: 4px;
  --border-radius-m: 8px;
  --border-radius-l: 16px;
  --border-radius-full: 9999px;
  
  /* Border shorthands */
  --border-m: var(--border-width-thin) solid;
  --border-l: var(--border-width-medium) solid;
  
  /* ========================================
     Shadows
     ======================================== */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* ========================================
     Transitions
     ======================================== */
  --transition-fast: 0.15s ease-in-out;
  --transition-normal: 0.3s ease-in-out;
  --transition-slow: 0.5s ease-in-out;
}

/* ========================================
   Responsive Overrides - Mobile
   ======================================== */
@media (width < 768px) {
  :root {
    --typography-h1-size: 32px;
    --typography-h2-size: 24px;
    --typography-h3-size: 20px;
    --spacing-xl: 24px;
    --spacing-2xl: 32px;
  }
}

/* ========================================
   Responsive Overrides - Desktop
   ======================================== */
@media (width >= 900px) {
  :root {
    --typography-h1-size: 48px;
    --typography-h2-size: 36px;
    --typography-h3-size: 28px;
  }
}
```

---

## 🔧 変換スクリプト

### JavaScript変換関数

```javascript
/**
 * Converts Figma color value to CSS hex
 */
function figmaColorToHex(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Converts Figma variable name to CSS custom property
 */
function figmaVarToCSSVar(name) {
  return `--${name.toLowerCase().replace(/\//g, '-')}`;
}

/**
 * Converts Figma Variables to CSS Custom Properties
 */
function convertVariablesToCSS(variables) {
  const cssVars = {};
  
  variables.forEach(variable => {
    const cssVarName = figmaVarToCSSVar(variable.name);
    
    let value;
    switch (variable.type) {
      case 'COLOR':
        value = figmaColorToHex(variable.value);
        break;
      case 'FLOAT':
        value = `${variable.value}px`;
        break;
      case 'STRING':
        value = variable.value;
        break;
      default:
        value = variable.value;
    }
    
    cssVars[cssVarName] = value;
  });
  
  return cssVars;
}

/**
 * Generates CSS file content
 */
function generateCSSFile(cssVars) {
  let css = ':root {\n';
  
  Object.entries(cssVars).forEach(([name, value]) => {
    css += `  ${name}: ${value};\n`;
  });
  
  css += '}\n';
  
  return css;
}
```

---

## 📦 自動化スクリプト

`scripts/extract-figma-tokens.js`:

```javascript
#!/usr/bin/env node

/**
 * Extracts Figma Variables and converts to CSS Custom Properties
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || 'MJTwyRbE5EVdlci3UIwsut';
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_ACCESS_TOKEN not set');
  process.exit(1);
}

async function extractVariables() {
  console.log('🔍 Fetching Figma Variables...');
  
  const response = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    }
  );
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(`Figma API Error: ${data.status} - ${data.err}`);
  }
  
  return data;
}

async function main() {
  try {
    const variablesData = await extractVariables();
    
    // Convert to CSS
    const cssVars = convertVariablesToCSS(variablesData.meta.variables);
    const cssContent = generateCSSFile(cssVars);
    
    // Write to file
    const outputPath = path.join(process.cwd(), 'styles', 'design-tokens.css');
    fs.writeFileSync(outputPath, cssContent);
    
    console.log('✅ Design tokens extracted to styles/design-tokens.css');
    console.log(`📊 Total variables: ${Object.keys(cssVars).length}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
```

**実行方法:**
```bash
FIGMA_FILE_KEY="MJTwyRbE5EVdlci3UIwsut" \
FIGMA_ACCESS_TOKEN="$FIGMA_ACCESS_TOKEN" \
node scripts/extract-figma-tokens.js
```

---

## 🎯 次のステップ

### 1. Figma Variablesを抽出

以下のプロンプトを実行：

```
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework

Extract all Variables (design tokens) from this Figma file and generate CSS Custom Properties for:

1. Colors (Primitives and Semantic)
2. Typography (Font families, sizes, line heights, weights)
3. Spacing (All spacing values)
4. Border (Radius, width)
5. Shadows
6. Transitions/Animations

Output format: CSS with :root selector and organized by category with comments.
```

### 2. `styles/styles.css`を更新

抽出されたCSS Custom Propertiesを`styles/styles.css`に統合します。

### 3. Blockコードを更新

生成済みのAccordion Blockなどで、新しいデザイントークンを使用します。

---

**作成日**: 2026-01-13
**対象Figmaファイル**: SandBox 0108-AEM Figma Design Framework
