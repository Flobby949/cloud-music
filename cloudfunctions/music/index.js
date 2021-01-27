// 云函数入口文件
const cloud = require('wx-server-sdk')

//引入路由
const TcbRouter = require('tcb-router')
const axios = require('axios')

cloud.init({
  env: 'flobby-9gntrh5195123e3d'
})

//定义基础URL
const BASE_URL = 'http://jcx-cloud.cn1.utools.club/top'

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  console.log('进入 music 方法')
  console.log(event)

  //歌单列表请求，需要传入url，起始记录索引，请求的记录数，按照创建时间降序排列
  app.router('playlist', async(ctx, next) => {
    console.log('进入music--playlist方法')
    ctx.body = await cloud.database().collection('playlist')
       .skip(event.start)
       .limit(event.count)
       .orderBy('createTime', 'desc')
       .get()
       .then((res) => {
         console.log('结束music--playlist方法')
         return res
       })
  })
  return app.serve()
}