// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

// 引入云数据库，并定义一个常量方便调用
const db = cloud.database()

// 引入云数据库的playlist集合，定义常量
const playlistCollection = db.collection('playlist')

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await playlistCollection.get()
  console.log('######' + res.data)
  return res.data
}