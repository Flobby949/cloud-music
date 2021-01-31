const dayjs = require('dayjs')
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  let tf = dayjs(event.time * 1000).format('mm:ss')
  console.log(tf)
  return tf
}