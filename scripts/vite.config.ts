import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Icons({ compiler: 'jsx', jsx: 'react' }),
    tsconfigPaths({
      projects: [path.resolve(__dirname, '../tsconfig.json')],
    }),
  ],
  build: {
    sourcemap: true,
    // minify: false,
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: 'binfoe-former',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'antd',
        'antd/locale/zh_CN',
        'react-hook-form',
        'date-fns',
        'rc-picker',
        'rc-picker/es/generate/dateFns',
      ],
      output: {
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === 'style.css') return 'index.css';
          return chunkInfo.name ?? 'index.js';
        },
      },
    },
  },
});
