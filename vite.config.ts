import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@pages': '/src/pages',
      '@libs': '/src/libs',
      '@hooks': '/src/hooks',
      '@context': '/src/context',
      '@types': '/src/types',
    }
  }
})
