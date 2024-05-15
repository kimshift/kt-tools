/*
 * @Description: 工具库导出配置
 * @Author: 琴时
 */

// 转换类
export { numToChinese, moneyFormat } from './utils/transform'

// 时间类
export { timeStamp, countDown, dateFormat, getTimeDistance } from './utils/time'

// 常用类
export { IsType, deepCopy, isEmpty, isEqual, deWeightArray, createUUID } from './utils/common'

// 文件类
export { blobToText, textTransform } from './utils/files'

/* 网页相关操作 */
export { default as store, local, session, setExpires, getExpires } from './utils/store.js'

export {
  downloadStream,
  kernelInfo,
  isMobile,
  isQQ,
  isWeiXn,
  isAndroid,
  isIOS,
} from './utils/browser'

/* **********************测试区********************** */
// import { isEqual } from '../lib/js-utils.mjs'
// console.log('测试:', isEqual(6, 6))
/* **********************测试区********************** */
