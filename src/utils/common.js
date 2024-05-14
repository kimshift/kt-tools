/*******
 * @description: 变量类型判断
 * @author: 琴时
 * @param {String} type  [判断的类型]
 * @param {*} params     [判断的参数]
 * @return {Boolean}
 * @example: IsType('String', '123')
 */
export const IsType = (type, params) => {
  return Object.prototype.toString.call(params) === `[object ${type}]`
}

/*******
 * @description: 深拷贝变量-递归算法：
 * 支持->String,Number,Boolean,null,undefined,Object,Array,Date,RegExp,Error,Function 类型-进行深度拷贝
 * @author: 琴时
 * @param {*} params [源变量]
 * @return {*}       [新变量]
 */
export const deepCopy = params => {
  if (typeof params !== 'object' || params === null) {
    // 基础数据类型或空对象
    return params
  }
  const newValue = IsType('Object', params) // 判断是否是对象
    ? {} //需遍历处理
    : IsType('Array', params) // 判断是否是数组
    ? [] //需遍历处理
    : IsType('Date', params) // 判断是否是日期对象
    ? new params.constructor(+params)
    : IsType('RegExp', params) || IsType('Error', params) // 判断是否是正则对象或错误对象
    ? new params.constructor(params)
    : params
  // 判断是否是数组或对象
  if (IsType('Array', params)) {
    // 循环遍历
    for (const key in params) {
      // 防止原型链的值
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        let element = params[key]
        newValue[key] = deepCopy(element)
      }
    }
  } else if (IsType('Object', params)) {
    let keys = Reflect.ownKeys(params)
    for (const key in keys) {
      // 防止原型链的值
      if (Object.prototype.hasOwnProperty.call(keys, key)) {
        let element = keys[key]
        newValue[element] = deepCopy(params[element])
      }
    }
  }
  return newValue
}

/*******
 * @description: 校验空值参数：
 * 在判断参数是否为空时，希望把null,undefined,{},[],"",NaN这六类都判定为空
 * @author: 琴时
 * @param {*} params [需要校验的参数]
 * @return {Boolean} [空：true，非空：false]
 */
export const isEmpty = params => {
  /* 检验字符串类型：空字符串/字符串null/字符串undefined/字符串{}/字符串[]==>也判断为空 */
  const array = ['', 'null', 'undefined', '{}', '[]']
  if (array.some(str => params === str)) return true
  if (params === 0 || params === 1) return false //过滤0/1
  if (!Boolean(params)) return true //校验undefined/null/NaN
  /* 检验空数组|对象 */
  if (IsType('Array', params) && params.length === 0) return true //检验空数组[]
  if (IsType('Object', params) && Object.keys(params).length === 0) return true //检验空对象{}
  return false //非空
}

/*******
 * @description: 判断两个参数是否相等
 * @author: 琴时
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */
export const isEqual = (a, b) => {
  // 类型为基本类型时,如果相等,则返回true
  if (a === b) return true
  if (
    IsType('Object', a) &&
    IsType('Object', b) &&
    Object.keys(a).length === Object.keys(b).length
  ) {
    // 若两个参数都为对象，先判断对象长度是否相同==>遍历对象内元素是否相同
    for (const key in a) {
      if (a.hasOwnProperty(key)) {
        if (!equalsObj(a[key], b[key])) {
          // 对象中具有不相同属性 返回false
          return false
        }
      }
    }
  } else if (IsType('Array', a) && IsType('Array', b) && a.length === b.length) {
    // 若两个参数都为数组，则先判断数组长度是否相同==>遍历数组元素是否相同
    for (let i = 0, length = a.length; i < length; i++) {
      if (!equalsObj(a[i], b[i])) {
        // 如果数组元素中具有不相同元素,返回false
        return false
      }
    }
  } else {
    return false // 其它类型,均返回false
  }
  return true
}
