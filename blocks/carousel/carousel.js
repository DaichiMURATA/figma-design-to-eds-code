/**
 * Carousel Block
 * 
 * Figma Component Set: 9392:122
 * Variants: 6
 * 
 * Features:
 * - Multi-slide carousel with navigation
 * - Keyboard accessible (Arrow keys, Home, End)
 * - ARIA attributes for screen readers
 * - Auto-advance support (configurable)
 * - Content positioning variants (center, left, right)
 * - Responsive design
 * 
 * Public API (block._eds):
 * - navigate(direction): Move to next/previous slide
 * - goToSlide(index): Jump to specific slide
 * - play(): Start auto-advance
 * - pause(): Stop auto-advance
 * - destroy(): Cleanup event listeners
 */

// Constants
const CAROUSEL_NAME = 'carousel';

const SELECTORS = {
  CONTAINER: `.${CAROUSEL_NAME}-container`,
  SLIDES_WRAPPER: `.${CAROUSEL_NAME}-slides`,
  SLIDE: `.${CAROUSEL_NAME}-slide`,
  NAVIGATION: `.${CAROUSEL_NAME}-navigation`,
  NAV_BUTTON: `.${CAROUSEL_NAME}-nav-button`,
  INDICATORS: `.${CAROUSEL_NAME}-indicators`,
  INDICATOR: `.${CAROUSEL_NAME}-indicator`,
  CONTENT: `.${CAROUSEL_NAME}-content`,
};

const CLASSES = {
  ACTIVE: `${CAROUSEL_NAME}-slide--active`,
  NAV_PREV: `${CAROUSEL_NAME}-nav-button--prev`,
  NAV_NEXT: `${CAROUSEL_NAME}-nav-button--next`,
  INDICATOR_ACTIVE: `${CAROUSEL_NAME}-indicator--active`,
  CONTENT_CENTER: `${CAROUSEL_NAME}-content--center`,
  CONTENT_LEFT: `${CAROUSEL_NAME}-content--left`,
  CONTENT_RIGHT: `${CAROUSEL_NAME}-content--right`,
  CONTENT_SMALL: `${CAROUSEL_NAME}-content--small`,
  CONTENT_FULL: `${CAROUSEL_NAME}-content--full`,
};

const ATTRS = {
  SLIDE_INDEX: 'data-slide-index',
  ARIA_LABEL: 'aria-label',
  ARIA_CURRENT: 'aria-current',
  ARIA_LIVE: 'aria-live',
  ROLE: 'role',
  TABINDEX: 'tabindex',
};

const CONFIG = {
  AUTO_ADVANCE_INTERVAL: 5000, // 5 seconds
  TRANSITION_DURATION: 300, // ms
};

/**
 * Create navigation buttons
 * @returns {HTMLElement} Navigation container
 */
function createNavigation() {
  const nav = document.createElement('div');
  nav.className = SELECTORS.NAVIGATION.slice(1);
  nav.setAttribute(ATTRS.ROLE, 'group');
  nav.setAttribute(ATTRS.ARIA_LABEL, 'Carousel navigation');

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.className = `${SELECTORS.NAV_BUTTON.slice(1)} ${CLASSES.NAV_PREV}`;
  prevButton.setAttribute(ATTRS.ARIA_LABEL, 'Previous slide');
  prevButton.setAttribute('type', 'button');
  prevButton.innerHTML = '<span aria-hidden="true">‹</span>';

  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = `${SELECTORS.NAV_BUTTON.slice(1)} ${CLASSES.NAV_NEXT}`;
  nextButton.setAttribute(ATTRS.ARIA_LABEL, 'Next slide');
  nextButton.setAttribute('type', 'button');
  nextButton.innerHTML = '<span aria-hidden="true">›</span>';

  nav.append(prevButton, nextButton);
  return nav;
}

/**
 * Create slide indicators
 * @param {number} slideCount - Total number of slides
 * @returns {HTMLElement} Indicators container
 */
function createIndicators(slideCount) {
  const indicators = document.createElement('div');
  indicators.className = SELECTORS.INDICATORS.slice(1);
  indicators.setAttribute(ATTRS.ROLE, 'tablist');
  indicators.setAttribute(ATTRS.ARIA_LABEL, 'Slide indicators');

  for (let i = 0; i < slideCount; i += 1) {
    const indicator = document.createElement('button');
    indicator.className = SELECTORS.INDICATOR.slice(1);
    indicator.setAttribute(ATTRS.ROLE, 'tab');
    indicator.setAttribute(ATTRS.ARIA_LABEL, `Go to slide ${i + 1}`);
    indicator.setAttribute(ATTRS.SLIDE_INDEX, String(i));
    indicator.setAttribute('type', 'button');
    indicator.setAttribute(ATTRS.TABINDEX, i === 0 ? '0' : '-1');

    if (i === 0) {
      indicator.classList.add(CLASSES.INDICATOR_ACTIVE);
      indicator.setAttribute(ATTRS.ARIA_CURRENT, 'true');
    }

    indicators.appendChild(indicator);
  }

  return indicators;
}

/**
 * Update active slide and UI
 * @param {HTMLElement} block - The carousel block element
 * @param {number} newIndex - Index of slide to activate
 */
function updateActiveSlide(block, newIndex) {
  const { slides, indicators, slidesWrapper } = block._eds;
  const currentIndex = block._eds.currentIndex;

  // Update current index
  block._eds.currentIndex = newIndex;

  // Update slides
  slides.forEach((slide, index) => {
    const isActive = index === newIndex;
    slide.classList.toggle(CLASSES.ACTIVE, isActive);
    slide.setAttribute(ATTRS.ARIA_CURRENT, String(isActive));
    slide.setAttribute(ATTRS.TABINDEX, isActive ? '0' : '-1');
  });

  // Update indicators
  if (indicators) {
    const indicatorButtons = indicators.querySelectorAll(SELECTORS.INDICATOR);
    indicatorButtons.forEach((indicator, index) => {
      const isActive = index === newIndex;
      indicator.classList.toggle(CLASSES.INDICATOR_ACTIVE, isActive);
      indicator.setAttribute(ATTRS.ARIA_CURRENT, String(isActive));
      indicator.setAttribute(ATTRS.TABINDEX, isActive ? '0' : '-1');
    });
  }

  // Announce to screen readers
  slidesWrapper.setAttribute(ATTRS.ARIA_LIVE, 'polite');
}

/**
 * Navigate to next or previous slide
 * @param {HTMLElement} block - The carousel block element
 * @param {number} direction - Direction to navigate (-1 for prev, 1 for next)
 */
function navigate(block, direction) {
  const { currentIndex, slides } = block._eds;
  const newIndex = (currentIndex + direction + slides.length) % slides.length;
  updateActiveSlide(block, newIndex);
}

/**
 * Go to specific slide by index
 * @param {HTMLElement} block - The carousel block element
 * @param {number} index - Target slide index
 */
function goToSlide(block, index) {
  const { slides } = block._eds;
  if (index >= 0 && index < slides.length) {
    updateActiveSlide(block, index);
  }
}

/**
 * Start auto-advance
 * @param {HTMLElement} block - The carousel block element
 */
function play(block) {
  if (block._eds.autoAdvanceTimer) return;

  block._eds.autoAdvanceTimer = setInterval(() => {
    navigate(block, 1);
  }, CONFIG.AUTO_ADVANCE_INTERVAL);
}

/**
 * Stop auto-advance
 * @param {HTMLElement} block - The carousel block element
 */
function pause(block) {
  if (block._eds.autoAdvanceTimer) {
    clearInterval(block._eds.autoAdvanceTimer);
    block._eds.autoAdvanceTimer = null;
  }
}

/**
 * Setup event handlers
 * @param {HTMLElement} block - The carousel block element
 */
function setupEventHandlers(block) {
  const { navigation, indicators } = block._eds;

  // Navigation buttons
  if (navigation) {
    const prevButton = navigation.querySelector(`.${CLASSES.NAV_PREV}`);
    const nextButton = navigation.querySelector(`.${CLASSES.NAV_NEXT}`);

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        pause(block);
        navigate(block, -1);
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        pause(block);
        navigate(block, 1);
      });
    }
  }

  // Indicators
  if (indicators) {
    indicators.addEventListener('click', (e) => {
      const indicator = e.target.closest(SELECTORS.INDICATOR);
      if (indicator) {
        pause(block);
        const index = parseInt(indicator.getAttribute(ATTRS.SLIDE_INDEX), 10);
        goToSlide(block, index);
      }
    });
  }

  // Keyboard navigation
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      pause(block);
      navigate(block, -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      pause(block);
      navigate(block, 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      pause(block);
      goToSlide(block, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      pause(block);
      goToSlide(block, block._eds.slides.length - 1);
    }
  });

  // Pause on hover, resume on leave
  block.addEventListener('mouseenter', () => pause(block));
  block.addEventListener('mouseleave', () => {
    if (block._eds.autoAdvance) {
      play(block);
    }
  });

  // Pause when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause(block);
    } else if (block._eds.autoAdvance) {
      play(block);
    }
  });
}

/**
 * Decorate carousel block
 * @param {HTMLElement} block - The carousel block element
 */
export default function decorate(block) {
  // Extract metadata and slides from EDS block structure
  const rows = [...block.children];

  // Check if first row is metadata
  let metadataRow = null;
  let slideRows = rows;

  if (rows[0]?.children.length === 2) {
    const firstCell = rows[0].children[0];
    if (firstCell?.textContent.trim().toLowerCase() === 'carousel') {
      metadataRow = rows[0];
      slideRows = rows.slice(1);
    }
  }

  // Parse metadata if present
  const config = {
    autoAdvance: false,
    contentPosition: 'center',
    contentSize: 'full',
  };

  if (metadataRow) {
    const metadataText = metadataRow.children[1]?.textContent.trim() || '';
    if (metadataText.includes('auto')) config.autoAdvance = true;
    if (metadataText.includes('left')) config.contentPosition = 'left';
    if (metadataText.includes('right')) config.contentPosition = 'right';
    if (metadataText.includes('small')) config.contentSize = 'small';
  }

  // Create container
  const container = document.createElement('div');
  container.className = SELECTORS.CONTAINER.slice(1);

  // Create slides wrapper
  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = SELECTORS.SLIDES_WRAPPER.slice(1);
  slidesWrapper.setAttribute(ATTRS.ROLE, 'region');
  slidesWrapper.setAttribute(ATTRS.ARIA_LABEL, 'Carousel');
  slidesWrapper.setAttribute(ATTRS.ARIA_LIVE, 'off');

  // Process each row as a slide
  const slides = slideRows.map((row, index) => {
    const slide = document.createElement('div');
    slide.className = SELECTORS.SLIDE.slice(1);
    slide.setAttribute(ATTRS.SLIDE_INDEX, String(index));
    slide.setAttribute(ATTRS.ROLE, 'group');
    slide.setAttribute(ATTRS.ARIA_LABEL, `Slide ${index + 1} of ${slideRows.length}`);
    slide.setAttribute(ATTRS.ARIA_CURRENT, index === 0 ? 'true' : 'false');
    slide.setAttribute(ATTRS.TABINDEX, index === 0 ? '0' : '-1');

    // Extract image and content from row
    const cells = [...row.children];

    // Typically: [image, content] or just [image]
    cells.forEach((cell) => {
      const images = cell.querySelectorAll('picture');
      const content = cell.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol, .button-container');

      // Add images
      images.forEach((img) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = `${CAROUSEL_NAME}-image`;
        imgWrapper.appendChild(img.cloneNode(true));
        slide.appendChild(imgWrapper);
      });

      // Add content
      if (content.length > 0) {
        const contentWrapper = document.createElement('div');
        contentWrapper.className = SELECTORS.CONTENT.slice(1);
        contentWrapper.classList.add(CLASSES[`CONTENT_${config.contentPosition.toUpperCase()}`]);
        contentWrapper.classList.add(CLASSES[`CONTENT_${config.contentSize.toUpperCase()}`]);

        content.forEach((el) => {
          contentWrapper.appendChild(el.cloneNode(true));
        });

        slide.appendChild(contentWrapper);
      }
    });

    if (index === 0) {
      slide.classList.add(CLASSES.ACTIVE);
    }

    slidesWrapper.appendChild(slide);
    return slide;
  });

  // Create navigation
  const navigation = createNavigation();

  // Create indicators
  const indicators = createIndicators(slides.length);

  // Assemble carousel
  container.append(slidesWrapper, navigation, indicators);

  // Replace block content
  block.textContent = '';
  block.appendChild(container);

  // Initialize public API
  block._eds = {
    currentIndex: 0,
    slides,
    slidesWrapper,
    navigation,
    indicators,
    autoAdvance: config.autoAdvance,
    autoAdvanceTimer: null,
    navigate: (direction) => navigate(block, direction),
    goToSlide: (index) => goToSlide(block, index),
    play: () => play(block),
    pause: () => pause(block),
    destroy: () => {
      pause(block);
      block.replaceWith(block.cloneNode(true));
    },
  };

  // Setup event handlers
  setupEventHandlers(block);

  // Start auto-advance if configured
  if (config.autoAdvance) {
    play(block);
  }
}
