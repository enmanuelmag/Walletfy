import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    port: 3500, // you can replace this port with any port
  },
  resolve: {
    alias: {
      '@api': resolve(__dirname, './src/api'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@constants': resolve(__dirname, './src/constants'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@shared': resolve(__dirname, './src/shared'),
      '@types': resolve(__dirname, './src/types'),
      '@utils': resolve(__dirname, './src/utils'),
      '@pages': resolve(__dirname, './src/pages'),
      '@store': resolve(__dirname, './src/store'),
      '@customTypes': resolve(__dirname, './src/types'),
      '@services': resolve(__dirname, './src/services'),
    },
  },
});
