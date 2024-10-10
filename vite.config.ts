import { defineConfig } from 'vite';
import { join } from 'path'
import dts from 'vite-plugin-dts'
import path from 'path';
import soften from './soften'
export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      copyDtsFiles: true,
    }),
    soften(),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'soften',
      fileName: 'soften',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vite-plugin-soften'],
    },
  },
})
