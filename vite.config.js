import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置路径别名
    },
    extensions: ['.js'], // 引入省略扩展名
  },
  esbuild: {
    drop: ['console', 'debugger'],
  }, //删除打印语句
  build: {
    outDir: 'lib', // 设置输出目录为lib
    assetsDir: 'assets', // 设置静态资源目录为 assets
    emptyOutDir: true, // 在每次构建之前清空输出目录
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'), //指定库的入口文件路径
      name: '_jsutils',
    },
  },
})
