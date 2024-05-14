/*
 * @Description: 工具库导出配置
 * @Author: 琴时
 */
import { version } from '../package.json'
window.JS_UTILS_VERSION = version
// 转换类
export { numToChinese, moneyFormat } from './utils/transform'

// 时间类
export { timeStamp, countDown, dateFormat, getTimeDistance } from './utils/time'

// 常用类
export { isEmpty, isEqual, IsType, deepCopy } from './utils/common'

let a = 123
export { a }
/* **********************测试区********************** */
// import { isEqual } from '../lib/js-utils.mjs'
// console.log('测试:', isEqual(6, 6))
/* **********************测试区********************** */
