import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 根据部署环境设置 base 路径
  // 本地开发：/
  // Gitee Pages：/non-coal-mining/
  // Vercel：/
  base: process.env.NODE_ENV === 'production' ? '/non-coal-mining/' : '/',
})
