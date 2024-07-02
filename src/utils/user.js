import { randomUserAgent, returnIp, deviceId } from './util'
import requestPromise from './request'
/*******
 * @description: 获取小米运动登录信息
 * @author: 琴时
 * @param {*} params
 * @param {*} params.accessToken [小米运动登录token]
 * @param {*} params.headers  [请求头信息]
 * @param {*} params.register [true,false]
 * @return {*}
 */
export const getUserInfo = async params => {
  try {
    let { accessToken, headers, register } = params
    headers = headers || {
      'User-Agent': randomUserAgent(),
      'X-Forwarded-For': returnIp(),
    }
    const url = register
      ? 'https://account.huami.com/v1/client/register'
      : 'https://account.huami.com/v2/client/login'
    const res = await requestPromise({
      url: url,
      body: {
        app_name: 'com.xiaomi.hm.health',
        app_version: '6.6.2',
        code: accessToken,
        country_code: 'CN',
        device_id: deviceId,
        device_model: 'android_phone',
        grant_type: 'access_token',
        third_name: 'huami',
        allow_registration: false,
        dn: 'account.zepp.com,api-user.zepp.com,api-mifit.zepp.com,api-watch.zepp.com,app-analytics.zepp.com,api-analytics.huami.com,auth.zepp.com',
        lang: 'zh',
        source: 'com.xiaomi.hm.health:6.6.2:50545',
      },
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Connection: 'Keep-Alive',
      },
    })
    const { user_id, app_token } = res.data?.token_info || {}
    return {
      userid: user_id,
      appToken: app_token,
    }
  } catch (error) {
    console.log('获取登录信息异常:', error.message)
    return {}
  }
}
