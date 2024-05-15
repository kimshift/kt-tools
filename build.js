import fg from 'fast-glob' // 解决node-fs读取文件夹效率低问题
const rollupOptions = {
  input: {},
  output: {
    name: 'pt-ui',
    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    globals: {
      vue: 'Vue',
    },
  },
  // 确保外部化处理那些你不想打包进库的依赖
  external: ['vue'],
}

const genEntries = async () => {
  const entries = fg.sync(`src/**/*.*`, {
    onlyFiles: false,
    deep: Infinity,
  })

  entries.forEach(entry => {
    const FILE_TYPE_SUFFIX_REG = /\.[t|j]s?$/g
    const TEST_FILE_REG = /__tests__/g

    if (FILE_TYPE_SUFFIX_REG.test(entry) && !TEST_FILE_REG.test(entry)) {
      const fileOutDir = entry.replace(FILE_TYPE_SUFFIX_REG, '')
      rollupOptions.input = {
        ...rollupOptions.input,
        [fileOutDir]: entry,
      }
    }
  })
}

genEntries()

export default rollupOptions
