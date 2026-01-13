import { initialize, mswDecorator } from 'msw-storybook-addon';
import '../styles/styles.css';

// Initialize MSW
initialize({
  onUnhandledRequest: 'warn',
});

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { 
      disable: true 
    },
    docs: {
      description: {
        component: 'EDS Component Documentation',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '800px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
  decorators: [
    mswDecorator,
    (story) => {
      const container = document.createElement('div');
      container.style.padding = '20px';
      
      const storyElement = story();
      
      if (storyElement instanceof HTMLElement) {
        container.appendChild(storyElement);
      } else {
        container.innerHTML = storyElement;
      }
      
      return container;
    },
  ],
};

export default preview;

