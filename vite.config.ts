import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 './'나 '/Miya_JJang/' 대신 무조건 '/' 로 설정해야 합니다!
})
