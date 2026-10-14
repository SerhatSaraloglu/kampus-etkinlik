import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2211012057 değerini 2211010000'e yuvarlıyor; ton 57 yerine 160 (yeşil) çıkıyor
    cssMinify: false,
  },
})
