import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/trainings': 'http://localhost:5000',
      '/tournaments': 'http://localhost:5000',
    },
  },
})
