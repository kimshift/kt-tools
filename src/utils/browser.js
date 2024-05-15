/*******
 * @description: 浏览器-网页相关函数
 * @author: 琴时
 */

/*******
 * @description: 下载流文件
 * @author: 琴时
 * @param {*} stream 文件流
 * @param {String} fileName 文件名
 * @return {*}
 */
export const downloadStream = (stream, fileName) => {
  try {
    const fileTypeMime = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      tiff: 'image/tiff',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain',
      pdf: 'application/pdf',
      mp4: 'video/mp4',
      mp3: 'audio/mpeg',
      rar: 'application/x-rar-compressed',
      html: 'text/html',
      xml: 'text/xml',
      json: 'application/json',
      css: 'text/css',
      js: 'text/javascript',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      csv: 'text/csv',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      zip: 'application/zip',
      '7z': 'application/x-7z-compressed',
    }
    let suffix = fileName.slice(fileName.indexOf('.') + 1) //获取文件后缀
    let blob = new Blob([stream], { type: fileTypeMime[suffix] }) //创建blob对象
    let aLink = document.createElement('a') //创建a标签
    document.body.appendChild(aLink) //末尾添加新的子节点
    aLink.style.display = 'none' //将a标签隐藏
    let blobURL = URL.createObjectURL(blob) //将blob转换成URL
    aLink.href = aLink.download = fileName //配置下载文件名
    aLink.click() //自动触发点击a标签[下载文件]
    document.body.removeChild(aLink) //移除a标签
    URL.revokeObjectURL(blobURL) // 释放blob URL地址
  } catch (error) {
    console.log('下载异常:', error.message)
  }
}

let ua = ''
try {
  ua = navigator.userAgent // 获取设备信息
} catch (error) {}

/*******
 * @description: 浏览器内核
 * @author: 琴时
 * @return {Object} 返回内核信息
 */
export const kernelInfo = () => {
  return {
    trident: ua.indexOf('Trident') > -1, //IE内核
    presto: ua.indexOf('Presto') > -1, //opera内核
    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
  }
}

/*******
 * @description: 检测移动端/PC端
 * [移动端:true - PC端:false]
 */
export const isMobile = Boolean(
  ua.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
)

/*******
 * @description: android终端
 */
export const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1

/*******
 * @description: ios终端
 */
export const isIOS = Boolean(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))

/*******
 * @description: 微信环境
 */
export const isWeiXn = ua.toLowerCase().includes('micromessenger')

/*******
 * @description: QQ环境
 */
export const isQQ = ua.toLowerCase().includes('qqbrowser')

/*******
 * @description: 钉钉环境
 */
export const isDingTalk = ua.toLowerCase().includes('dingtalk')

/*******
 * @description: 微博环境
 */
export const isWeiBo = ua.toLowerCase().includes('weibo')
