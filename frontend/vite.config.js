import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ชี้ไปยัง Backend
        changeOrigin: true, // เปลี่ยน Origin ของคำขอให้ตรงกับ Backend
        secure: false, // ปิดการตรวจสอบใบรับรอง SSL หากใช้งานใน Local
      },
    },
  },
});
