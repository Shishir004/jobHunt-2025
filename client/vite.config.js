import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ✅ Final config
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://jobhunt-2025.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      // 👇 whenever "cookie" is imported, use ESM-safe "cookie-es"
      cookie: 'cookie-es'
    }
  }
})
