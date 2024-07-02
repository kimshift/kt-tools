import { randomCode, randomNum, returnIp, randomUserAgent } from './util'
import { getUserInfo } from './user'
import requestPromise from './request'

/*******
 * @description: 构造生成运动账号任务队列
 * @author: 琴时
 * @param {String} prefix     前缀
 * @param {Number} count      数量
 * @param {String} password   密码
 * @return {Array}
 */
const tackAccount = params => {
  let { dataSource = [], count = 0, config = {} } = params
  if (dataSource.length > 0) {
    dataSource.forEach(item => {
      let { username, password } = item
      if (parallel) {
        item.task = () => register({ username, password })
      }
    })
    return dataSource
  }
  let { prefix, password = 'aa123456', suffix = '@163.com', parallel, loop } = config
  prefix = prefix || randomCode(3)
  const taskQueue = Array.from({ length: count }, (_, i) => i)
  return taskQueue.map((_, index) => {
    let num = 11 - prefix.length - `${index}`.length
    let username = prefix + (num > 0 ? randomNum(num) : '') + index + suffix
    const params = { username, password, loop }
    if (parallel) {
      params.task = () => register({ username, password, loop })
    }
    return params
  })
}

/*******
 * @description: 递归批量注册
 * @author: 琴时
 * @param {*} concurrency  [并发量]
 * @param {*} dataList     [执行数据]
 * @param {*} dataSource   [数据源]
 * @param {*} deepNum      [循环次数]
 * @param {*} callback     [回调函数]
 * @return {*}
 */
const deepRegister = async (params, callback) => {
  let { concurrency = 20, successList = [], dataSource } = params
  try {
    let tempList = dataSource.splice(0, concurrency) //切割并发请求数据
    //构造并发请求列表
    const requestList = tempList.map(item => register(item))
    //获取并发请求响应数组
    let result = await Promise.all(requestList)
    successList.push(...result)
    if (dataSource.length === 0) {
      console.log('批量注册结束')
      return callback(successList)
    }
    params.dataSource = dataSource
    deepRegister(params, callback)
  } catch (error) {
    console.log('递归执行注册异常:', error.message)
    return callback(successList || [])
  }
}

/*******
 * @description: 注册运动账号
 * @author: 琴时
 * @param {*} params.username
 * @param {*} params.password
 * @return {*}
 */
export const register = async ({ username, password }) => {
  try {
    let ip = returnIp()
    let headers = {
      'User-Agent': randomUserAgent(),
      'X-Forwarded-For': ip,
      'CLIENT-IP': ip,
    }
    const url = `https://api-user.huami.com/registrations/${username}`
    const res = await requestPromise({
      url: url,
      body: {
        client_id: 'HuaMi',
        password: password,
        redirect_uri: 'https://s3-us-west-2.amazonaws.com/hm-registration/successsignin.html',
        region: 'us-west-2',
        marketing: 'AmazFit',
        country_code: 'CN',
        subscriptions: 'marketing',
        name: username,
        state: 'REDIRECTION',
        token: 'access',
        lang: 'zh-CN',
      },
      headers: {
        Host: 'api-user.huami.com',
        'app-name': 'com.xiaomi.hm.health',
        Accept_Language: 'zh-CN',
        'hm-privacy-ceip': true,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Connection: 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        ...headers,
      },
      method: 'POST',
    })
    const reg = /(?<=access=).*?(?=&)/
    const accessToken = reg.exec(res.headers?.location)
    if (!accessToken) {
      return {
        code: 500,
        status: 0,
        data: null,
        message: '注册失败，请稍后重试',
      }
    }
    const responseData = {
      code: 200,
      status: 1,
      data: { username, password },
      message: '注册成功',
    }
    //2.获取登录信息[不执行的话需要手动登录一遍才可以刷步]
    await getUserInfo({
      accessToken: accessToken[0],
      headers,
      register: true,
    })
    console.log(`注册成功:${username}----${password}`)
    return responseData //返回注册账号信息
  } catch (error) {
    const { message, response } = error
    const { status, data } = response || {}
    const responseData = {
      code: 500,
      status: 0,
      data: username,
      message: '注册失败',
    }
    if (data.code === 1) responseData.message = '账号已被注册'
    console.log('注册失败:', responseData)
    return responseData
  }
}

/*******
 * @description: 批量注册运动账号
 * @author: 琴时
 * @param {Number} params.concurrency  [并发量]
 * @param {Number} params.count        [注册总数]
 * @param {Array} params.dataSource   [数据源]
 * @param {Object} params.config       [配置参数]
 * @return {*}
 */
export const batchRegister = async (params, callback) => {
  try {
    let dataSource = tackAccount(params) //构造注册数据
    params.dataSource = JSON.parse(JSON.stringify(dataSource)) //数据源
    params.successList = [] //存储注册成功的数据
    deepRegister(params, data => {
      console.log('本次注册数量:', data?.length)
      let result = data.filter(item => item.code === 200).map(item => item.data)
      callback && callback(result)
    })
  } catch (error) {
    console.log('批量注册异常:', error.message)
    callback && callback([])
    return []
  }
}

/* 注册参数样例 */
const example = {
  username: 'test@163.com',
  password: 'test123',
  count: 1,
  concurrency: 100,
  config: {
    prefix: 'kts',
    password: 'aa123456',
  },
}

/* 单个注册 */
// register(example)

/* 批量注册 */
/* batchRegister(example, result => {
  if (!result || result?.length === 0) {
    console.log('批量注册失败')
    return
  }
  saveTxt({ data: result })
}) */
