import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the same build works on GitHub Pages subpaths and
  // inside the Capacitor iOS shell (file:// URLs).
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
