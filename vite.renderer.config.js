import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "sofiane-gargouri",
      project: "xanyah-web"
    }),
  ],

  define: {
    global: {},
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      external: false
    }
  }
})
