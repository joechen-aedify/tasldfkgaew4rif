import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    watch: {
      // Watch the config file for changes
      ignored: ['!**/public/template_1_config.json'],
    },
    proxy: {
      // Proxy API requests from the frontend dev server to the modules backend
      // so calls like /api/hr/employees hit http://localhost:3008/api/hr/employees.
      '/api': {
        target: 'http://localhost:3008',
        changeOrigin: true,
      },
    },
  },
})
