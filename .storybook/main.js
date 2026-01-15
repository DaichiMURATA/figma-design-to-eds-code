/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../blocks/**/*.stories.js'],
  
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
  ],
  
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  
  core: {
    disableTelemetry: true,
  },
  
  docs: {
    autodocs: true,
  },
};

export default config;
