import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at https://iampiotr.github.io/ramenrun/
  base: process.env.GITHUB_PAGES === 'true' ? '/ramenrun/' : '/',
  plugins: [react(), tailwindcss()],
})
