/**
 * Chromatic + Playwright Configuration for figma-design-to-eds-code
 * 
 * EDS URL Pattern: https://{branch}--figma-design-to-eds-code--daichimurata.aem.live/
 * 
 * Usage:
 *   # Local testing
 *   npx playwright test --config=chromatic.config.js
 *   
 *   # Test specific branch
 *   SOURCE_URL=https://testbranch--figma-design-to-eds-code--daichimurata.aem.live npx playwright test --config=chromatic.config.js
 *   
 *   # Upload to Chromatic
 *   npx chromatic --playwright
 */

import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Include only chromatic test files
  testMatch: /chromatic.*\.spec\.js/,
  
  // Global timeout
  timeout: 60000,
  
  // Expect timeout
  expect: {
    timeout: 10000,
  },
  
  use: {
    // Base URL - EDS URL pattern
    // Pattern: https://{branch}--figma-design-to-eds-code--daichimurata.aem.live/
    baseURL: process.env.SOURCE_URL || 'https://main--figma-design-to-eds-code--daichimurata.aem.live',
    
    // Browser settings
    viewport: { width: 1280, height: 720 },
    
    // Trace and screenshot settings
    trace: 'retain-on-failure',
    screenshot: 'off', // Let Chromatic handle screenshots
    video: 'off',
  },
  
  // Report settings
  reporter: [
    ['list'],
  ],
  
  // Output directory - must be 'test-results' for Chromatic
  outputDir: 'test-results',
});
