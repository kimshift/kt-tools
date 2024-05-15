/*******
 * @description: 将txt的blob转文本内容
 * @author: 琴时
 * @param {*} blob
 * @return {*}
 */
export const blobToText = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = function () {
      reject(new Error('无法读取Blob对象'))
    }
    if (blob.constructor !== File) {
      reject(new Error('该数据不是blob'))
      return
    }
    reader.readAsText(blob)
  })
}

/*******
 * @description: 将定制txt文件内容转化成数组对象
 * 将ZFB账号---运动账号---运动密码==>[{'antName','username','password','remark'}]
 * 将运动账号---运动密码==>[{'username','password','remark'}]
 * @author: 琴时
 * @param {Object} params
 * @return {*}
 */
export const textTransform = params => {
  const { content = '', symbol, sign = 'ants', password, remark = '', index = 0 } = params
  // 将每行字符进行切割成数组
  let list = content.split(/[(\r\n)\r\n]+/) // 根据换行或者回车进行识别
  const arrayTemp = []
  list.forEach(item => {
    item = item.trim() // 去除首尾空格
    if (item) {
      // 将每行数据通过[symbol]定制符合进行切割
      let newList = item.split(symbol).map(ele => ele.trim())
      let tempData = {}
      if (sign === 'ants') {
        tempData = {
          antName: newList[index],
          username: index === 1 || newList.length === 1 ? newList[0] : newList[1],
          password: password || newList[2],
          remark: newList[3] || remark,
        }
      } else {
        tempData = {
          username: newList[0],
          password: password || newList[1],
          remark: newList[2] || remark,
        }
      }
      arrayTemp.push(tempData)
    }
  })
  return arrayTemp
}
