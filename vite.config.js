import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ledgr Workspace',
        short_name: 'Ledgr',
        description: 'Professional Financial Accounting App',
        theme_color: '#1B6EF3',
        background_color: '#ffffff',
        display: 'standalone', // این دستور جادویی مرورگر رو غیب میکنه
        icons: [
          {
            src: '/logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})