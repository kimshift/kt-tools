const fs = require('fs')
export const deviceId = 'd98c80014a4255ca'
/*******
 * @description: query构造参数
 * @author: 琴时
 * @param {*} obj
 * @return {*}
 */
export const objectToQueryString = obj => {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

//构造请求头-浏览器
export const randomUserAgent = () => {
  const UserAgents = [
    'MiFit6.6.2 (Mi 10; Android 11; Density/2.75)',
    'MiFit6.6.2 (MI 9 Transparent Edition; Android 9; Density/2.5687501)',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2',
  ]
  return UserAgents[Math.floor(Math.random() * (0 - UserAgents.length) + UserAgents.length)]
}
//构造请求头-ip
export const returnIp = () => {
  return (
    Math.floor(Math.random() * (10 - 255) + 255) +
    '.' +
    Math.floor(Math.random() * (10 - 255) + 255) +
    '.' +
    Math.floor(Math.random() * (10 - 255) + 255) +
    '.' +
    Math.floor(Math.random() * (10 - 255) + 255)
  )
}

export const randomCode = params => {
  let result = ''
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const capital = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]
  const lower = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  const arr = [...num, ...capital, ...lower]
  for (let i = 0; i < params; i++) {
    //随机生成一位0~9的数:index作为list的下标
    let index = Math.floor(Math.random() * arr.length)
    result += arr[index]
  }
  return result
}

export const randomNum = params => {
  let result = ''
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  for (let i = 0; i < params; i++) {
    /* 随机生成一位0~9的数:index作为list的下标 */
    let index = Math.floor(Math.random() * arr.length)
    result += arr[index]
  }
  return result
}

const dateFormat = (params, format = 'YYYY-MM-DD hh:mm:ss') => {
  //如果params是时间字符串：2021-05-20 00:00:00 为了兼容ios需要将其转换成 2021/05/20 00:00:00
  const pattern = /^(?=.*T)(?=.*).*$/
  const patternNum = /^\d*$/
  if (!params) {
    params = new Date()
  } else if (patternNum.test(params)) {
    params = parseInt(params)
  } else if (typeof params === 'string' && !pattern.test(params)) {
    params = `${params}`.replace(/-/g, '/')
  }
  /* 处理格式化时间 */
  const dt = new Date(params) //创建时间对象
  const yy = dt.getFullYear() //年
  const qt = Math.floor((dt.getMonth() + 3) / 3) //季度
  const mm = (dt.getMonth() + 1 + '').padStart(2, '0') //月(padStart:字符串不满2位数,开头补全'0')
  const dd = (dt.getDate() + '').padStart(2, '0') //日
  const wk = '星期' + '日一二三四五六'.charAt(dt.getDay()) //星期
  const hh = (dt.getHours() + '').padStart(2, '0') //时
  const mi = (dt.getMinutes() + '').padStart(2, '0') //分
  const ss = (dt.getSeconds() + '').padStart(2, '0') //秒
  const ms = dt.getMilliseconds() //毫秒
  const timeObj = {
    date1: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${qt}${wk}`, //年-月-日 时:分:秒 季度星期
    date2: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${qt}`, //年-月-日 时:分:秒 季度
    date3: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${wk}`, //年-月-日 时:分:秒 星期
    date4: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`, //年-月-日 时:分:秒
    date5: `${yy}-${mm}-${dd}`, //年-月-日
    date6: `${yy}-${mm}`, //年-月
    date7: `${mm}-${dd}`, //月-日
    date8: `${hh}:${mi}:${ss}`, //时:分:秒
    date9: `${yy}`, //年
    date10: `${mm}`, //月
    date11: `${dd}`, //日
    date12: `${hh}`, //时
    date13: `${mm}`, //分
    date14: `${ss}`, //秒
    date15: `${qt}`, //季度
    date16: `${wk}`, //星期
    date17: `${yy}${mm}${dd}${hh}${mi}${ss}`, //时间串
  }
  /* 检测时间格式的标识 */
  const list = [
    /^YYYY\-MM\-DD hh\:mm\:ss qtwk$/, //年-月-日 时:分:秒 季度星期
    /^YYYY\-MM\-DD hh\:mm\:ss qt$/, //年-月-日 时:分:秒 季度
    /^YYYY\-MM\-DD hh\:mm\:ss wk$/, //年-月-日 时:分:秒 星期
    /^YYYY\-MM\-DD hh\:mm\:ss$/, //年-月-日 时:分:秒
    /^YYYY\-MM\-DD$/, //年-月-日
    /^YYYY\-MM$/, //年-月
    /^MM\-DD$/, //月-日
    /^hh\:mm\:ss$/, //时:分:秒
    /^YYYY$/, //年
    /^MM$/, //月
    /^DD$/, //日
    /^hh$/, //时
    /^mm$/, //分
    /^ss$/, //秒
    /^qt$/, //季度
    /^ss$/, //星期
    /^YYYYMMDDhhmmss$/, //时间串
  ]
  let newDate = ''
  const news = list.some((item, index) => {
    if (item.test(format)) {
      newDate = timeObj[`date${index + 1}`]
      return true
    }
    return false
  })
  if (!news) newDate = `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}` //如果传过来的格式化标识符异常则默认返回:年-月-日 时:分:秒
  return newDate
}

/**
 * 创建txt文本：将json转txt并保存到本地
 * 生成指定格式txt文本【多个则换行】
 * 格式：账号----密码
 */
export const saveTxt = params => {
  let { data = [], reg = '----', path } = params
  const time = dateFormat(new Date(), 'YYYYMMDDhhmmss')
  path = path ? `${path + time}-data.txt` : `${time}-data.txt`
  let str = ''
  data.forEach((item, index) => {
    let symbol = ''
    if (index < data.length - 1) symbol = '\n'
    let row = `${item.username}${reg}${item.password}`
    str += row + symbol
  })
  fs.writeFile(path, str, err => {
    if (err) {
      console.log('创建异常:', err)
      return
    }
    console.log(`格式：批量注册的文本===>${path} 生成成功!.`)
  })
}
