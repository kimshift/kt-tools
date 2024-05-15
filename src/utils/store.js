/*******
 * @description: 本地缓存
 * @author: 琴时
 */
import store from 'store2'
export default store

/*******
 * @description: localStorage缓存
 * get:获取缓存|set:设置缓存|remove:删除缓存
 */
export const local = store.local
/*******
 * @description: sessionStorage缓存
 * get:获取缓存|set:设置缓存|remove:删除缓存
 */
export const session = store.session

/*******
 * @description: 设置过期时间
 * @author: 琴时
 * @param {Number} value [过期时间，单位毫秒] [默认30分钟]
 */
export const setExpires = (value = 30 * 60 * 1000) => {
  session.set('user_last_time', +new Date()) //最后一次设置缓存时间
  session.set('user_expires', value) //设置过期时间，单位毫秒
}

/*******
 * @description: 获取过期状态
 * @author: 琴时
 * @return {Boolean} true:未过期 false:已过期
 */
export const getExpires = () => {
  const lastTime = session.get('user_last_time') //最后登录时间
  const expires = session.get('user_expires') //过期时间
  if (!lastTime || !expires) return false //无记录==>过期
  const nowTime = +new Date() // 当前时间戳
  const times = nowTime - (lastTime + expires) // 剩余时间总毫秒数
  return times < 0
}
