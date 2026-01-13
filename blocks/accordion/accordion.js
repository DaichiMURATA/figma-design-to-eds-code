/**
 * @fileoverview Accordion component implementation for AEM EDS
 * @module blocks/accordion
 * @description Interactive accordion with expand/collapse functionality
 *              Supports keyboard navigation and ARIA accessibility patterns
 * @version 1.0.0
 */

/**
 * @constant {string} BLOCK_NAME - Name identifier for the accordion block
 */
const BLOCK_NAME = 'accordion';

/**
 * @constant {Object} SELECTORS - CSS selectors for accordion elements
 */
const SELECTORS = {
  ITEM: '.accordion-item',
  BUTTON: '.accordion-button',
  PANEL: '.accordion-panel',
  ICON: '.accordion-icon',
};

/**
 * @constant {Object} CLASSES - CSS class names for accordion elements
 */
const CLASSES = {
  ITEM: 'accordion-item',
  BUTTON: 'accordion-button',
  PANEL: 'accordion-panel',
  ICON: 'accordion-icon',
  EXPANDED: 'is-expanded',
};

/**
 * @constant {Object} ATTRS - ARIA and HTML attributes for accessibility
 */
const ATTRS = {
  EXPANDED: 'aria-expanded',
  CONTROLS: 'aria-controls',
  LABELLEDBY: 'aria-labelledby',
  HIDDEN: 'hidden',
  ROLE: 'role',
};

/**
 * Counter for generating unique IDs for accordion instances
 * @type {number}
 */
let accordionIdCounter = 0;

/**
 * Creates an accordion button element with proper ARIA attributes
 *
 * @param {HTMLElement} heading - The heading element (h2, h3, etc.)
 * @param {string} buttonId - Unique button ID for accessibility
 * @param {string} panelId - Associated panel ID for ARIA relationships
 * @returns {HTMLButtonElement} The accordion button
 */
function createAccordionButton(heading, buttonId, panelId) {
  const button = document.createElement('button');
  button.className = CLASSES.BUTTON;
  button.id = buttonId;
  button.type = 'button';
  button.setAttribute(ATTRS.EXPANDED, 'false');
  button.setAttribute(ATTRS.CONTROLS, panelId);

  // Preserve the heading content
  button.textContent = heading.textContent;

  // Add icon for expand/collapse indicator (SVG chevron via CSS background)
  const icon = document.createElement('span');
  icon.className = CLASSES.ICON;
  icon.setAttribute('aria-hidden', 'true');
  // No text content - icon is rendered via CSS background-image
  button.appendChild(icon);

  return button;
}

/**
 * Creates an accordion panel element with proper ARIA attributes
 *
 * @param {HTMLElement} contentContainer - The container with panel content
 * @param {string} panelId - Unique panel ID for accessibility
 * @param {string} buttonId - Associated button ID for ARIA relationships
 * @returns {HTMLDivElement} The accordion panel
 */
function createAccordionPanel(contentContainer, panelId, buttonId) {
  const panel = document.createElement('div');
  panel.className = CLASSES.PANEL;
  panel.id = panelId;
  panel.setAttribute(ATTRS.ROLE, 'region');
  panel.setAttribute(ATTRS.LABELLEDBY, buttonId);
  panel.setAttribute(ATTRS.HIDDEN, '');

  // Move all content to panel
  while (contentContainer.firstChild) {
    panel.appendChild(contentContainer.firstChild);
  }

  return panel;
}

/**
 * Toggles the accordion item between expanded and collapsed states
 *
 * @param {HTMLButtonElement} button - The accordion button
 * @param {HTMLDivElement} panel - The accordion panel
 */
function toggleAccordionItem(button, panel) {
  const isExpanded = button.getAttribute(ATTRS.EXPANDED) === 'true';
  const newState = !isExpanded;
  const item = button.closest(SELECTORS.ITEM);

  button.setAttribute(ATTRS.EXPANDED, String(newState));

  if (newState) {
    panel.removeAttribute(ATTRS.HIDDEN);
    item?.classList.add(CLASSES.EXPANDED);
    // Icon rotation is handled via CSS transform: rotate(180deg)
  } else {
    panel.setAttribute(ATTRS.HIDDEN, '');
    item?.classList.remove(CLASSES.EXPANDED);
    // Icon rotation is handled via CSS
  }
}

/**
 * Decorates an accordion block by transforming the original
 * markup into interactive accordion components
 *
 * Expected structure from authoring:
 * - Each row becomes an accordion item
 * - First cell: heading (becomes button)
 * - Subsequent cells: content (becomes panel)
 *
 * @param {HTMLElement} block - The accordion block element to decorate
 * @returns {void}
 */
export default function decorate(block) {
  // Validate block element
  if (!block || !(block instanceof HTMLElement)) {
    // eslint-disable-next-line no-console
    console.warn('Accordion: Invalid block element provided');
    return;
  }

  const instanceId = accordionIdCounter;
  accordionIdCounter += 1;

  // Track items for public API and cleanup
  const items = [];
  const allButtons = [];

  // Process each row as an accordion item
  // Expected: Row contains cells, first cell is heading, rest is content
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Find heading (h2, h3, etc.) in the first cell
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
    if (!heading) return; // Skip rows without headings

    // Get the content cells (everything after the heading's parent)
    const headingCell = heading.closest('div');
    const contentCells = [...row.children].filter((cell) => cell !== headingCell);

    if (contentCells.length === 0) return; // Skip if no content

    // Generate unique IDs
    const buttonId = `${BLOCK_NAME}-button-${instanceId}-${index}`;
    const panelId = `${BLOCK_NAME}-panel-${instanceId}-${index}`;

    // Create accordion item container
    const item = document.createElement('div');
    item.className = CLASSES.ITEM;

    // Create button and panel
    const button = createAccordionButton(heading, buttonId, panelId);

    // Create a container for all content cells
    const contentContainer = document.createElement('div');
    contentCells.forEach((cell) => {
      while (cell.firstChild) {
        contentContainer.appendChild(cell.firstChild);
      }
    });

    const panel = createAccordionPanel(contentContainer, panelId, buttonId);

    // Add click handler
    const clickHandler = () => toggleAccordionItem(button, panel);

    // Store button for keyboard navigation
    allButtons.push(button);

    // Assemble item
    item.append(button, panel);
    row.replaceWith(item);

    items.push({
      button,
      panel,
      clickHandler,
    });
  });

  // Add keyboard navigation after all buttons are created
  items.forEach(({ button }, index) => {
    const keydownHandler = (e) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleAccordionItem(button, items[index].panel);
          break;
        case 'ArrowDown':
          e.preventDefault();
          allButtons[index + 1]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          allButtons[index - 1]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          allButtons[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          allButtons[allButtons.length - 1]?.focus();
          break;
        default:
          break;
      }
    };

    button.addEventListener('click', items[index].clickHandler);
    button.addEventListener('keydown', keydownHandler);
    items[index].keydownHandler = keydownHandler;
  });

  /**
   * Public API for programmatic control of the accordion
   * @type {Object}
   */
  // eslint-disable-next-line no-underscore-dangle
  block._eds = {
    /**
     * Opens the accordion item at the specified index
     * @param {number} index - Zero-based index of the accordion item
     */
    open(index) {
      const item = items[index];
      if (item?.button.getAttribute(ATTRS.EXPANDED) !== 'true' && item) {
        toggleAccordionItem(item.button, item.panel);
      }
    },

    /**
     * Closes the accordion item at the specified index
     * @param {number} index - Zero-based index of the accordion item
     */
    close(index) {
      const item = items[index];
      if (item?.button.getAttribute(ATTRS.EXPANDED) === 'true' && item) {
        toggleAccordionItem(item.button, item.panel);
      }
    },

    /**
     * Toggles the accordion item at the specified index
     * @param {number} index - Zero-based index of the accordion item
     */
    toggle(index) {
      const item = items[index];
      if (item) {
        toggleAccordionItem(item.button, item.panel);
      }
    },

    /**
     * Removes all event listeners and cleans up resources
     */
    destroy() {
      items.forEach(({ button, clickHandler, keydownHandler }) => {
        button.removeEventListener('click', clickHandler);
        button.removeEventListener('keydown', keydownHandler);
      });
      // eslint-disable-next-line no-underscore-dangle
      block._eds = undefined;
    },
  };
}
