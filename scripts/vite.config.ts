import { resolve } from 'path';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Icons()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: 'binfoe-former',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'antd'],
      output: {
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === 'style.css') return 'index.css';
          return chunkInfo.name ?? 'index.js';
        },
      },
    },
  },
});
