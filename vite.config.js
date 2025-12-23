import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Para mantener el puerto que usaba React
    open: true  // Para que se abra el navegador automáticamente
  }
})