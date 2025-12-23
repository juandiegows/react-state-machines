import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-state-machines/',
  server: {
    port: 3000, // Para mantener el puerto que usaba React
    open: true  // Para que se abra el navegador automáticamente
  }
})