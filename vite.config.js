import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // '@/...' 만 src로 매핑 (스코프 패키지 @supabase 등과 충돌 방지)
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
    ],
    // react/three 중복 인스턴스 방지
    dedupe: ['react', 'react-dom', 'three'],
  },
  optimizeDeps: {
    // 사전 번들 대상에 3D 관련/기타 의존성 포함
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      '@supabase/supabase-js',
    ],
  },
})
