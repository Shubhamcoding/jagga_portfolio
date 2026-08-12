import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    /* Inline only very small assets (under 4KB) to reduce HTTP requests
       without bloating the JS bundle */
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        /* Split vendor libraries into a separate chunk so they are cached
           independently from your app code. On repeat visits, only the
           small app chunk needs re-downloading. */
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
        },
      },
    },
  },
})
