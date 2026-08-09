import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 本地开发使用根路径，构建时使用 GitHub Pages 路径
  base: process.env.NODE_ENV === 'production' ? '/non-coal-mining/' : '/',
})
