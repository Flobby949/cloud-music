// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取微信上下文
  const wxContext = cloud.getWXContext()
  // 生成小程序码
  const result = await cloud.openapi.wxacode.getUnlimited({
    scene: wxContext.OPENID,
  })
  // 小程序码上传云存储
  const upload = await cloud.uploadFile({
    cloudPath: 'qrcode/' + Date.now() + '-' + Math.random() + '.png',
    fileContent: result.buffer
  })
  return upload.fileID
}