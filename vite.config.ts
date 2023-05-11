import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import PurgeIcons from 'vite-plugin-purge-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    PurgeIcons({
      content: [
        '**/*.html',
        '**/*.js',
        '**/*.ts',
        '**/*.vue',
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@resources': fileURLToPath(new URL('./src/resources', import.meta.url)),
    }
  }
})
