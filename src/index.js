/*
 * @Description: 工具库导出配置
 * @Author: 琴时
 */

export { saveTxt } from './utils/util'
export { register, batchRegister } from './utils/register'

/* 注册参数 */
const registerBody = {
  count: 5,
  concurrency: 100,
  config: {
    prefix: 'kts', //自定义账号前缀
    password: 'aa123456', //批量账号密码
  },
}

/* 执行批量注册 */
// batchRegister(registerBody, result => {
//   if (!result || result?.length === 0) {
//     console.log('批量注册失败')
//     return
//   }
//   //   saveTxt({ data: result })
// })
