import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/mysogi-call-to-action/' : '/',
  plugins: [tailwindcss()],
})
