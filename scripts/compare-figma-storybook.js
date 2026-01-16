/**
 * Figma-Storybook Visual Validation Loop
 * 
 * Automatically compare Figma design with Storybook implementation
 * and iteratively fix CSS/JS discrepancies until they match.
 * 
 * Usage:
 *   node scripts/compare-figma-storybook.js --block=hero --node-id=2-1446
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FIGMA_TOKEN = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
const STORYBOOK_URL = 'http://localhost:6006';
const MAX_ITERATIONS = 5;
const HOT_RELOAD_WAIT = 2000; // ms

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const blockArg = args.find(arg => arg.startsWith('--block='));
  const nodeIdArg = args.find(arg => arg.startsWith('--node-id='));
  const fileIdArg = args.find(arg => arg.startsWith('--file-id='));
  const demoMode = args.includes('--demo');

  if (!blockArg || !nodeIdArg) {
    console.error('Usage: node compare-figma-storybook.js --block=<name> --node-id=<id> [--file-id=<id>] [--demo]');
    process.exit(1);
  }

  return {
    blockName: blockArg.split('=')[1],
    nodeId: nodeIdArg.split('=')[1],
    fileId: fileIdArg ? fileIdArg.split('=')[1] : null,
    demoMode,
  };
}

/**
 * Fetch Figma node data via API
 */
async function fetchFigmaStyles(fileId, nodeId) {
  if (!FIGMA_TOKEN) {
    throw new Error('FIGMA_PERSONAL_ACCESS_TOKEN not set');
  }

  console.log(`📥 Fetching Figma styles for node ${nodeId}...`);

  const response = await fetch(
    `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.statusText}`);
  }

  const data = await response.json();
  const node = data.nodes[nodeId]?.document;

  if (!node) {
    throw new Error(`Node ${nodeId} not found in Figma file`);
  }

  // Extract CSS properties from Figma node
  const styles = {
    backgroundColor: extractColor(node.fills),
    color: node.style?.fills ? extractColor(node.style.fills) : null,
    fontSize: node.style?.fontSize ? `${node.style.fontSize}px` : null,
    fontFamily: node.style?.fontFamily || null,
    fontWeight: node.style?.fontWeight || null,
    lineHeight: node.style?.lineHeightPx ? `${node.style.lineHeightPx}px` : null,
    letterSpacing: node.style?.letterSpacing ? `${node.style.letterSpacing}px` : null,
    borderRadius: node.cornerRadius ? `${node.cornerRadius}px` : null,
    padding: node.paddingLeft ? `${node.paddingTop}px ${node.paddingRight}px ${node.paddingBottom}px ${node.paddingLeft}px` : null,
  };

  // Filter out null values
  return Object.fromEntries(
    Object.entries(styles).filter(([_, value]) => value !== null)
  );
}

/**
 * Extract color from Figma fills
 */
function extractColor(fills) {
  if (!fills || fills.length === 0) return null;
  
  const fill = fills.find(f => f.visible !== false);
  if (!fill || fill.type !== 'SOLID') return null;

  const { r, g, b, a = 1 } = fill.color;
  const red = Math.round(r * 255);
  const green = Math.round(g * 255);
  const blue = Math.round(b * 255);

  if (a === 1) {
    return `rgb(${red}, ${green}, ${blue})`;
  } else {
    return `rgba(${red}, ${green}, ${blue}, ${a})`;
  }
}

/**
 * Capture Storybook screenshot and extract computed styles
 */
async function captureStorybook(blockName, storyName = 'default') {
  console.log(`📸 Capturing Storybook for ${blockName}...`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const storyUrl = `${STORYBOOK_URL}/iframe.html?id=blocks-${blockName}--${storyName}&viewMode=story`;
  
  try {
    await page.goto(storyUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000); // Wait for any animations

    // Extract computed styles from the block element
    const computedStyles = await page.evaluate((name) => {
      const element = document.querySelector(`.${name}`);
      if (!element) return null;

      const styles = window.getComputedStyle(element);
      
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontSize: styles.fontSize,
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
      };
    }, blockName);

    await browser.close();

    if (!computedStyles) {
      throw new Error(`Block element .${blockName} not found in Storybook`);
    }

    return computedStyles;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

/**
 * Normalize color values for comparison
 */
function normalizeColor(color) {
  if (!color) return null;
  
  // Convert rgb/rgba to consistent format
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    const [, r, g, b, a = '1'] = match;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  
  return color;
}

/**
 * Compare Figma styles with Storybook computed styles
 */
function compareStyles(figmaStyles, storybookStyles) {
  const differences = [];

  for (const [property, figmaValue] of Object.entries(figmaStyles)) {
    let storybookValue = storybookStyles[property];

    // Normalize colors for comparison
    if (property === 'backgroundColor' || property === 'color') {
      figmaValue = normalizeColor(figmaValue);
      storybookValue = normalizeColor(storybookValue);
    }

    // Skip if values match
    if (figmaValue === storybookValue) continue;

    // Check for close-enough values (e.g., 48px vs 48.0px)
    if (typeof figmaValue === 'string' && typeof storybookValue === 'string') {
      const figmaNum = parseFloat(figmaValue);
      const storybookNum = parseFloat(storybookValue);
      if (!isNaN(figmaNum) && !isNaN(storybookNum) && Math.abs(figmaNum - storybookNum) < 0.5) {
        continue;
      }
    }

    differences.push({
      property,
      figma: figmaValue,
      storybook: storybookValue,
    });
  }

  return differences;
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Apply fixes to CSS based on Figma styles
 */
async function applyFixes(blockName, differences) {
  const cssPath = join(__dirname, '..', 'blocks', blockName, `${blockName}.css`);
  let cssContent = readFileSync(cssPath, 'utf-8');

  console.log(`🔧 Applying ${differences.length} fixes to ${blockName}.css...`);

  for (const diff of differences) {
    const { property, figma } = diff;
    const cssProperty = camelToKebab(property);

    console.log(`   - ${cssProperty}: "${diff.storybook}" → "${figma}"`);

    // Try to find and replace existing property
    const selectorRegex = new RegExp(`\\.${blockName}\\s*\\{[^}]*\\}`, 's');
    const match = cssContent.match(selectorRegex);

    if (match) {
      const selectorBlock = match[0];
      const propertyRegex = new RegExp(`${cssProperty}:\\s*[^;]+;`, 'g');

      if (propertyRegex.test(selectorBlock)) {
        // Replace existing property
        const newSelectorBlock = selectorBlock.replace(
          propertyRegex,
          `${cssProperty}: ${figma};`
        );
        cssContent = cssContent.replace(selectorBlock, newSelectorBlock);
      } else {
        // Add new property to selector
        const newSelectorBlock = selectorBlock.replace(
          /\{/,
          `{\n  ${cssProperty}: ${figma};`
        );
        cssContent = cssContent.replace(selectorBlock, newSelectorBlock);
      }
    } else {
      // Add new selector block
      cssContent += `\n\n.${blockName} {\n  ${cssProperty}: ${figma};\n}\n`;
    }
  }

  writeFileSync(cssPath, cssContent);
  console.log(`✅ Fixes applied to ${cssPath}`);
}

/**
 * Check if Storybook is running
 */
async function checkStorybookRunning() {
  try {
    const response = await fetch(STORYBOOK_URL);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Main validation loop
 */
async function validateAndFix(blockName, fileId, nodeId, demoMode = false) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔄 Figma-Storybook Visual Validation Loop`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`📦 Block: ${blockName}`);
  console.log(`🎨 Figma Node: ${nodeId}`);
  console.log(`📁 Figma File: ${fileId}`);
  console.log(`🎭 Demo Mode: ${demoMode ? 'ON' : 'OFF'}\n`);

  // Check if Storybook is running
  const isRunning = await checkStorybookRunning();
  if (!isRunning) {
    console.error(`❌ Storybook is not running at ${STORYBOOK_URL}`);
    console.log(`\n💡 Start Storybook first: npm run storybook\n`);
    process.exit(1);
  }

  let iteration = 0;
  let allMatched = false;

  while (!allMatched && iteration < MAX_ITERATIONS) {
    iteration++;
    console.log(`\n📍 Iteration ${iteration}/${MAX_ITERATIONS}`);
    console.log(`${'-'.repeat(40)}\n`);

    try {
      // 1. Fetch Figma styles
      const figmaStyles = await fetchFigmaStyles(fileId, nodeId);
      console.log(`✅ Fetched ${Object.keys(figmaStyles).length} Figma styles`);

      if (demoMode) {
        console.log('\n📊 Figma Styles:');
        Object.entries(figmaStyles).forEach(([key, value]) => {
          console.log(`   ${key}: ${value}`);
        });
      }

      // 2. Capture Storybook
      const storybookStyles = await captureStorybook(blockName);
      console.log(`✅ Captured Storybook styles`);

      if (demoMode) {
        console.log('\n📊 Storybook Styles:');
        Object.entries(storybookStyles).forEach(([key, value]) => {
          console.log(`   ${key}: ${value}`);
        });
      }

      // 3. Compare
      console.log(`\n🔍 Comparing styles...`);
      const differences = compareStyles(figmaStyles, storybookStyles);

      if (differences.length === 0) {
        console.log(`✅ All styles match! 🎉`);
        allMatched = true;
      } else {
        console.log(`⚠️  Found ${differences.length} difference(s):\n`);
        differences.forEach(diff => {
          console.log(`   ❌ ${diff.property}:`);
          console.log(`      Figma:     "${diff.figma}"`);
          console.log(`      Storybook: "${diff.storybook}"`);
        });

        // 4. Apply fixes
        await applyFixes(blockName, differences);

        // 5. Wait for hot reload
        console.log(`\n⏳ Waiting ${HOT_RELOAD_WAIT}ms for hot reload...`);
        await new Promise(resolve => setTimeout(resolve, HOT_RELOAD_WAIT));
      }
    } catch (error) {
      console.error(`\n❌ Error in iteration ${iteration}:`, error.message);
      
      if (iteration === 1) {
        console.log(`\n💡 Troubleshooting:`);
        console.log(`   1. Is Storybook running? npm run storybook`);
        console.log(`   2. Is FIGMA_PERSONAL_ACCESS_TOKEN set?`);
        console.log(`   3. Is the Figma file ID correct?`);
        console.log(`   4. Does the Story exist in Storybook?\n`);
      }
      
      process.exit(1);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  if (allMatched) {
    console.log(`✅ Validation Complete! ${blockName} matches Figma design.`);
  } else {
    console.log(`⚠️  Max iterations (${MAX_ITERATIONS}) reached.`);
    console.log(`   Some differences may remain. Manual review recommended.`);
  }
  console.log(`${'='.repeat(60)}\n`);
}

// Main execution
const { blockName, nodeId, fileId, demoMode } = parseArgs();

// If file ID not provided, try to extract from figma-urls.json
let finalFileId = fileId;
if (!finalFileId) {
  try {
    const figmaUrlsPath = join(__dirname, '..', 'config', 'figma', 'figma-urls.json');
    const figmaUrls = JSON.parse(readFileSync(figmaUrlsPath, 'utf-8'));
    finalFileId = figmaUrls.fileId;
    console.log(`📁 Using Figma file ID from config: ${finalFileId}`);
  } catch (error) {
    console.error('❌ Could not determine Figma file ID');
    console.log('   Provide --file-id=<id> or ensure config/figma/figma-urls.json exists');
    process.exit(1);
  }
}

validateAndFix(blockName, finalFileId, nodeId, demoMode).catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
