import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/shared/styles'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@types': path.resolve(__dirname, './src/shared/types'),
      '@provider': path.resolve(__dirname, './src/shared/provider'),
      '@constants': path.resolve(__dirname, './src/shared/constants'),
      '@domains': path.resolve(__dirname, './src/domains'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@validation': path.resolve(__dirname, './src/shared/validation'),
    },
  },
});
