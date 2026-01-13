/**
 * @file cards.js
 * @description Cards block - Grid of card items
 * @version 1.0.0
 * 
 * Based on Adobe EDS Block Collection Cards pattern
 * @see https://github.com/adobe/aem-block-collection/tree/main/blocks/cards
 */

/**
 * Decorates the cards block
 * @param {Element} block The cards block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  
  // Convert rows to cards
  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Move row content to card
    card.innerHTML = row.innerHTML;
    
    // Find and style card elements
    const image = card.querySelector('picture');
    if (image) {
      image.parentElement.classList.add('card-image');
    }
    
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.classList.add('card-title');
    }
    
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.querySelector('a')) {
        p.classList.add('card-cta');
      } else {
        p.classList.add('card-body');
      }
    });
    
    row.replaceWith(card);
  });
  
  // Public API
  block._eds = {
    getCards: () => block.querySelectorAll('.card'),
  };
}
