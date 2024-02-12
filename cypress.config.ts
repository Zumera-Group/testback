import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: "x14wmb",
  e2e: {
    viewportWidth: 2680,
    viewportHeight: 720,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
