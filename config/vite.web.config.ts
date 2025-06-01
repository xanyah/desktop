import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "sofiane-gargouri",
      project: "xanyah-web"
    }),
  ],

  root: '.',

  define: {
    global: {},
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },

  build: {
    sourcemap: true,
  }
})
