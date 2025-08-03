// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Import the correct plugin

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // Use the Vite-specific polyfill plugin
  ],
});