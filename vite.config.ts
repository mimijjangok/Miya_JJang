import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Miya_JJang/', // 👈 저장소 이름('/저장소이름/')을 정확히 넣어주어야 합니다!
})
