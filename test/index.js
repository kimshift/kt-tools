const { batchRegister, saveTxt } = require('../lib/zepplife.umd')

/* 注册参数 */
const registerBody = {
  count: 1,
  concurrency: 100,
  config: {
    prefix: 'kts', //自定义账号前缀
    password: 'aa123456', //批量账号密码
  },
}

/* 执行批量注册 */
batchRegister(registerBody, result => {
  if (!result || result?.length === 0) {
    console.log('批量注册失败')
    return
  }
  saveTxt({ data: result })
})
