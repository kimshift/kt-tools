import path from 'path'
import { defineConfig } from 'vite'
const rollupOptions = {
  // input: {},
  output: {
    name: 'zepplife',
    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    globals: {
      vue: 'Vue',
    },
  },
  // 确保外部化处理那些你不想打包进库的依赖
  external: ['vue'],
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置路径别名
    },
    extensions: ['.js'], // 引入省略扩展名
  },
  esbuild: {
    // drop: ['console', 'debugger'],
  }, //删除打印语句
  build: {
    outDir: 'lib', // 设置输出目录为lib
    assetsDir: 'assets', // 设置静态资源目录为 assets
    emptyOutDir: true, // 在每次构建之前清空输出目录
    lib: {
      entry: 'src/index.js', //指定库的入口文件路径
      name: 'zepplife',
    },
    manifest: false,
    commonjsOptions: {},
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制
    rollupOptions,
  },
})
