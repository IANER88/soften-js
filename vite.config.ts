import { defineConfig } from 'vite';
import { join } from 'path'
import dts from 'vite-plugin-dts'
import path from 'path';
import soften from './soften';
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      copyDtsFiles: true,
    }),
    soften(),
    compression({
      algorithm: 'gzip',
      threshold: 10240, // 对大于 10KB 的文件进行压缩
      verbose: true, // 是否在控制台输出压缩结果
      ext: '.gz', // 压缩后文件的扩展名
      deleteOriginFile: true, // 压缩后是否删除原文件
    }),
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

