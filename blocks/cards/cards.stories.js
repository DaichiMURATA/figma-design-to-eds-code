/**
 * @file cards.stories.js
 * @description Storybook stories for the Cards block
 */

import '../../styles/styles.css';
import './cards.css';
import decorate from './cards.js';
import cardImageUrl from './card-image.png';

export default {
  title: 'Blocks/Cards',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Cards Block

Grid of card items, each with image, title, description, and optional CTA.

**Features:**
- ✅ Responsive grid layout
- ✅ Hover effects
- ✅ Auto-fill grid columns
- ✅ Mobile-first design
        `,
      },
    },
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 1200],
    },
  },
};

/**
 * Creates EDS-style cards block DOM structure
 * Matches EDS doc-based authoring output from localhost:3000/vrtest
 * 
 * EDS Structure:
 * - Block: <div class="cards">
 * - Rows: Each <div> child = one card (table row)
 * - Cells: Each <div> inside row = content cell
 * 
 * Two patterns:
 * 1. Image + Content: Row has 2 cells (image cell, content cell)
 * 2. Content only: Row has 1 cell (content cell)
 * 
 * Content cell structure (matches EDS output):
 * - Title: <p><strong>Text</strong></p>
 * - Description: <p>Text</p>
 * - Link: <p><a href="...">Text</a></p>
 */
const createCardsBlock = ({
  cardCount = 3, hasImage = true, hasLink = false, isHover = false,
}) => {
  const block = document.createElement('div');
  block.className = 'cards';
  if (isHover) block.classList.add('hover-state');

  for (let i = 0; i < cardCount; i += 1) {
    // Row (one per card)
    const row = document.createElement('div');
    
    // Cell 1: Image (if hasImage)
    if (hasImage) {
      const imageCell = document.createElement('div');
      const picture = document.createElement('picture');
      const img = document.createElement('img');
      img.src = cardImageUrl;
      img.alt = `Card ${i + 1}`;
      img.loading = 'eager';
      picture.appendChild(img);
      imageCell.appendChild(picture);
      row.appendChild(imageCell);
    }

    // Cell 2 (or Cell 1 if no image): Content cell
    const contentCell = document.createElement('div');

    // Title - as <p><strong>Text</strong></p> (EDS standard)
    const titlePara = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `Card Title ${i + 1}`;
    titlePara.appendChild(strong);
    contentCell.appendChild(titlePara);

    // Description
    const body = document.createElement('p');
    body.textContent = 'This is a description of the card content. It provides context and information.';
    contentCell.appendChild(body);

    // CTA Link (conditional)
    if (hasLink) {
      const ctaPara = document.createElement('p');
      const cta = document.createElement('a');
      cta.href = '#';
      cta.textContent = 'Learn More';
      if (isHover) cta.classList.add('hover');
      ctaPara.appendChild(cta);
      contentCell.appendChild(ctaPara);
    }

    row.appendChild(contentCell);
    block.appendChild(row);
  }

  return block;
};

/**
 * Template function
 * Creates EDS page structure matching decorateSections() and decorateBlock() output
 * 
 * Complete hierarchy from localhost:3000:
 * main
 *   > div.section.highlight.cards-container[data-section-status="loaded"]
 *       > div.default-content-wrapper
 *       > div.cards-wrapper
 *           > div.cards.block[data-block-name="cards"][data-block-status="loaded"]
 * 
 * Key transformations by aem.js:
 * - decorateSections(): adds 'section', wrappers, processes metadata (highlight)
 * - decorateBlock(): adds 'block', 'cards-wrapper', 'cards-container', data attributes
 */
const Template = (args) => {
  const main = document.createElement('main');
  
  // Section (base + metadata Style: highlight + cards-container from decorateBlock)
  const section = document.createElement('div');
  section.className = 'section highlight cards-container';
  section.setAttribute('data-section-status', 'loaded');

  // Default content wrapper (for non-block content)
  const defaultWrapper = document.createElement('div');
  defaultWrapper.className = 'default-content-wrapper';
  const heading = document.createElement('h2');
  heading.textContent = 'Cards Showcase';
  const desc = document.createElement('p');
  desc.textContent = 'Grid of card items with responsive layout';
  defaultWrapper.append(heading, desc);
  
  // Block wrapper (gets 'cards-wrapper' from decorateBlock)
  const blockWrapper = document.createElement('div');
  blockWrapper.className = 'cards-wrapper';
  
  // Block element (gets 'block' class and attributes from decorateBlock)
  const block = createCardsBlock(args);
  block.classList.add('block');
  block.setAttribute('data-block-name', 'cards');
  block.setAttribute('data-block-status', 'loaded');
  
  blockWrapper.appendChild(block);
  section.append(defaultWrapper, blockWrapper);
  main.appendChild(section);

  // Decorate the block (this is what EDS does after loading)
  decorate(block);

  return main;
};

// Figma Variant 1: isImage=true, isLink=false, hover=false
export const WithImageNoLink = {
  render: () => Template({
    cardCount: 3, hasImage: true, hasLink: false, isHover: false,
  }),
  parameters: {
    chromatic: { delay: 300 },
  },
};

// Figma Variant 2: isImage=true, isLink=true, hover=true
export const WithImageAndLinkHover = {
  render: () => Template({
    cardCount: 3, hasImage: true, hasLink: true, isHover: true,
  }),
  parameters: {
    chromatic: { delay: 300 },
  },
};

// Figma Variant 3: isImage=false, isLink=false, hover=false
export const NoImageNoLink = {
  render: () => Template({
    cardCount: 3, hasImage: false, hasLink: false, isHover: false,
  }),
  parameters: {
    chromatic: { delay: 300 },
  },
};

// Figma Variant 4: isImage=true, isLink=true, hover=false
export const WithImageAndLink = {
  render: () => Template({
    cardCount: 3, hasImage: true, hasLink: true, isHover: false,
  }),
  parameters: {
    chromatic: { delay: 300 },
  },
};
